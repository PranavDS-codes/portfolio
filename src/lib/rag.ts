import * as fs from "fs";
import * as path from "path";
import { traceable } from "langsmith/traceable";
import { type KnowledgeChunk } from "@/data/rag/knowledge";
import { langsmithClient } from "./langsmith";

interface IndexEntry {
  chunk: KnowledgeChunk;
  embedding: number[];
}

export type AskResult =
  | { answer: string; citations: KnowledgeChunk[]; diagnostics: { matchedChunks: number } }
  | { error: string; status: number };

function dotProduct(a: number[], b: number[]): number {
  let product = 0;
  for (let i = 0; i < a.length; i++) {
    product += a[i] * b[i];
  }
  return product;
}

function magnitude(arr: number[]): number {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i] * arr[i];
  }
  return Math.sqrt(sum);
}

function cosineSimilarity(a: number[], b: number[]): number {
  const magA = magnitude(a);
  const magB = magnitude(b);
  if (magA === 0 || magB === 0) return 0;
  return dotProduct(a, b) / (magA * magB);
}

const STOP_WORDS = new Set(["what", "is", "how", "who", "are", "do", "does", "did", "to", "the", "a", "an", "and", "or", "in", "on", "at", "for", "with", "about", "his", "he", "him", "her", "she", "they", "them", "their", "it", "its", "pranav", "pranav's", "pant", "s"]);

function calculateKeywordScore(query: string, snippet: string): number {
  const queryWords = query.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/).filter(w => w && !STOP_WORDS.has(w));
  const snippetLower = snippet.toLowerCase().replace(/[^\w\s]/g, "");

  if (queryWords.length === 0) return 0;

  let matches = 0;
  queryWords.forEach(word => {
    if (snippetLower.includes(word)) {
      matches++;
    }
  });

  return matches / queryWords.length;
}

interface EmbedQueryArgs {
  question: string;
  embedModel: string;
  baseUrl: string;
  apiKey: string;
}

const embedQuery = traceable(
  async ({ question, embedModel, baseUrl, apiKey }: EmbedQueryArgs) => {
    const embedRes = await fetch(`${baseUrl}/embeddings`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: [question],
        model: embedModel,
        encoding_format: "float",
        input_type: "query",
      }),
    });

    if (!embedRes.ok) {
      const errText = await embedRes.text();
      throw new Error(`NVIDIA Embed API Error: ${errText}`);
    }

    const embedBody = (await embedRes.json()) as {
      data: Array<{ embedding: number[] }>;
    };
    const queryEmbedding = embedBody.data?.[0]?.embedding;
    if (!queryEmbedding) {
      throw new Error("Failed to parse query embedding vector.");
    }

    return { embedding: queryEmbedding, dimensions: queryEmbedding.length };
  },
  {
    name: "embedQuery",
    run_type: "embedding",
    client: langsmithClient,
    processInputs: ({ question, embedModel }) => ({ question, model: embedModel }),
    processOutputs: ({ dimensions }) => ({ dimensions }),
  }
);

interface RetrieveChunksArgs {
  question: string;
  queryEmbedding: number[];
  indexData: IndexEntry[];
}

const retrieveChunks = traceable(
  async ({ question, queryEmbedding, indexData }: RetrieveChunksArgs) => {
    // Compute hybrid similarity (0.7 * Cosine + 0.3 * Lexical)
    const scoredEntries = indexData
      .map((entry) => {
        const denseScore = cosineSimilarity(queryEmbedding, entry.embedding);
        const sparseScore = calculateKeywordScore(question, entry.chunk.snippet);
        const hybridScore = 0.7 * denseScore + 0.3 * sparseScore;
        return {
          ...entry,
          score: hybridScore,
        };
      })
      .sort((a, b) => b.score - a.score);

    // Filter by similarity threshold. Calibrated against nvidia/nemotron-3-embed-1b's actual
    // score distribution: off-topic queries top out around 0.05-0.08 dense similarity, while
    // genuinely relevant but lexically-mismatched queries (e.g. "what is his expertise?" vs a
    // chunk that says "skillset") score 0.20-0.30. 0.12 keeps clear separation from noise while
    // no longer requiring keyword overlap to carry a relevant match over the line.
    const threshold = 0.12;
    const topEntries = scoredEntries.filter((entry) => entry.score >= threshold).slice(0, 5);

    return { topEntries };
  },
  {
    name: "retrieveChunks",
    run_type: "retriever",
    client: langsmithClient,
    processInputs: ({ question }) => ({ question }),
    processOutputs: ({ topEntries }) => ({
      matchedChunks: topEntries.length,
      chunks: topEntries.map((entry) => ({ id: entry.chunk.id, score: Number(entry.score.toFixed(4)) })),
    }),
  }
);

const SYSTEM_PROMPT = `You are a professional AI assistant answering questions about Pranav Pant, an AI/ML/Data Engineer.
Answer the question STRICTLY using ONLY the facts provided in the Context below. Do not extrapolate, assume, or pull outside facts.
Your answer should be professional, clear, and descriptive (around 3 to 5 sentences or a structured paragraph), fully answering the user's question using the retrieved facts.
Support every statement you make by citing the Source ID inline, for example: "...developed Brown Heart Assistant [experience-jhf] using FastAPI [experience-jhf-tech]."
If the context does not contain the answer to the question, state: "I couldn't find sufficient information in Pranav's portfolio to answer that."`;

// Every live question races these chat models concurrently; whichever streams
// its first token soonest wins and the other two are aborted immediately.
// Benchmarked 2026-09-03 (20 sequential calls/model, thinking disabled):
// nemotron-3.5-lightning had the lowest median (1.4s) but a 37.8s p95 tail;
// nemotron-3-ultra was slower still and 15% of calls hit 503 overloaded;
// gpt-oss-20b was the only one with a tight, reliable spread (1.7-5.1s, 20/20
// success). Racing all three keeps the tail-latency upside of the faster
// models while gpt-oss-20b's reliability bounds the worst case.
export const RACE_MODELS = (
  process.env.NVIDIA_CHAT_MODELS ||
  "nvidia/nemotron-3.5-lightning-30b-a3b,nvidia/nemotron-3-ultra-550b-a55b,openai/gpt-oss-20b"
)
  .split(",")
  .map((m) => m.trim())
  .filter(Boolean);

// Least-thinking config per model family, matching the benchmark run. Shared
// with the /api/warm keep-warm ping so warmup requests exercise the same
// request shape as real traffic.
export function leastThinkingParams(model: string): Record<string, unknown> {
  return model.startsWith("openai/gpt-oss") ? { reasoning_effort: "low" } : { chat_template_kwargs: { thinking: false } };
}

function buildChatRequestBody(model: string, question: string, contextStr: string) {
  return {
    model,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: `Context:\n${contextStr}\n\nQuestion: ${question}` },
    ],
    temperature: 0.1,
    max_tokens: 1024,
    stream: true,
    ...leastThinkingParams(model),
  };
}

interface StreamChatArgs {
  model: string;
  question: string;
  contextStr: string;
  baseUrl: string;
  apiKey: string;
  signal: AbortSignal;
}

// Streams raw content deltas for a single model's chat completion. Wrapped in
// traceable so every race attempt shows up as its own LangSmith span with
// per-token timing; losers get cut off via `signal` and their span closes out
// as "Cancelled" instead of hanging open (see raceModels below).
async function* streamChatModelImpl({ model, question, contextStr, baseUrl, apiKey, signal }: StreamChatArgs) {
  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(buildChatRequestBody(model, question, contextStr)),
    signal,
  });

  if (!res.ok || !res.body) {
    const errText = res.body ? await res.text() : `HTTP ${res.status}`;
    throw new Error(`NVIDIA Chat API Error (${model}): ${errText}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const payload = trimmed.slice("data:".length).trim();
        if (payload === "[DONE]") return;
        let parsed: any;
        try {
          parsed = JSON.parse(payload);
        } catch {
          continue;
        }
        const delta = parsed.choices?.[0]?.delta?.content;
        if (delta) yield delta as string;
      }
    }
  } finally {
    reader.releaseLock();
  }
}

const streamChatModel = traceable(streamChatModelImpl, {
  name: "generateAnswer",
  run_type: "llm",
  client: langsmithClient,
  processInputs: ({ question, contextStr, model }: StreamChatArgs) => ({ model, question, context: contextStr }),
  aggregator: (chunks: string[]) => ({ answer: chunks.join("") }),
});

interface RaceWinner {
  model: string;
  firstChunk: string;
}

// Fires all race models' streaming requests concurrently, keyed off each
// stream's FIRST content chunk (not full completion) so the race rewards
// whichever model starts responding soonest. Losers are aborted and their
// wrapped generator is explicitly `.return()`-ed so their LangSmith span
// closes out immediately instead of staying open until process exit.
async function raceFirstChunk(
  models: string[],
  question: string,
  contextStr: string,
  baseUrl: string,
  apiKey: string
): Promise<{ winner: RaceWinner; iterator: AsyncIterator<string>; controller: AbortController }> {
  const controllers = new Map<string, AbortController>();
  const iterators = new Map<string, AsyncIterator<string>>();

  const attempts = models.map((model) => {
    const controller = new AbortController();
    controllers.set(model, controller);
    const traced = streamChatModel({ model, question, contextStr, baseUrl, apiKey, signal: controller.signal });
    const iterator = traced[Symbol.asyncIterator]();
    iterators.set(model, iterator);
    return iterator.next().then((result) => {
      if (result.done || result.value === undefined) {
        throw new Error(`${model} produced no output`);
      }
      return { model, firstChunk: result.value } satisfies RaceWinner;
    });
  });

  let winner: RaceWinner;
  try {
    winner = await Promise.any(attempts);
  } catch (aggregateError: any) {
    const messages = (aggregateError?.errors ?? [aggregateError]).map((e: any) => e?.message || String(e));
    throw new Error(`All race models failed: ${messages.join("; ")}`);
  }

  controllers.forEach((controller, model) => {
    if (model !== winner.model) {
      controller.abort();
      iterators
        .get(model)
        ?.return?.(undefined)
        ?.catch(() => {});
    }
  });

  return { winner, iterator: iterators.get(winner.model)!, controller: controllers.get(winner.model)! };
}

async function* raceModels(
  question: string,
  contextStr: string,
  baseUrl: string,
  apiKey: string
): AsyncGenerator<AskStreamEvent, void, unknown> {
  const { winner, iterator, controller } = await raceFirstChunk(RACE_MODELS, question, contextStr, baseUrl, apiKey);
  yield { type: "meta", model: winner.model };
  yield { type: "token", text: winner.firstChunk };

  // Manually driving `iterator.next()` (rather than `for await...of`) means
  // JS's automatic IteratorClose won't propagate a downstream cancellation
  // (e.g. the client disconnecting) into the winner's stream on its own —
  // this try/finally is what actually aborts its in-flight request and closes
  // its LangSmith span, whether we finish normally or get cancelled mid-race.
  try {
    while (true) {
      const { done, value } = await iterator.next();
      if (done) break;
      yield { type: "token", text: value };
    }
  } finally {
    controller.abort();
    iterator.return?.(undefined)?.catch(() => {});
  }
}

export type AskStreamEvent =
  | { type: "meta"; model: string }
  | { type: "token"; text: string }
  | { type: "done"; answer: string; citations: KnowledgeChunk[]; diagnostics: { matchedChunks: number } }
  | { type: "error"; message: string; status: number };

export async function* streamAnswer(question: string): AsyncGenerator<AskStreamEvent, void, unknown> {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    yield {
      type: "done",
      answer: "API Key Not Found: The NVIDIA_API_KEY environment variable is not configured. Please add it to your .env.local file to activate this RAG assistant.",
      citations: [],
      diagnostics: { matchedChunks: 0 },
    };
    return;
  }

  const embedModel = process.env.NVIDIA_EMBED_MODEL || "nvidia/nemotron-3-embed-1b";
  const baseUrl = process.env.NVIDIA_BASE_URL || "https://integrate.api.nvidia.com/v1";

  // 1. Load precomputed index from disk
  const indexPath = path.resolve(process.cwd(), "src/data/rag/index.json");
  if (!fs.existsSync(indexPath)) {
    yield {
      type: "done",
      answer: "Database Index Not Found: The embeddings index.json was not found. Please run the build-rag-index script to precompute vector embeddings.",
      citations: [],
      diagnostics: { matchedChunks: 0 },
    };
    return;
  }

  const indexData = JSON.parse(fs.readFileSync(indexPath, "utf-8")) as IndexEntry[];

  // 2. Embed the query using NVIDIA embeddings API
  let queryEmbedding: number[];
  try {
    const embedResult = await embedQuery({ question, embedModel, baseUrl, apiKey });
    queryEmbedding = embedResult.embedding;
  } catch (err: any) {
    yield { type: "error", message: err.message || "Embedding request failed.", status: 502 };
    return;
  }

  // 3. Compute hybrid similarity (0.7 * Cosine + 0.3 * Lexical) and retrieve top chunks
  const { topEntries } = await retrieveChunks({ question, queryEmbedding, indexData });

  if (topEntries.length === 0) {
    yield {
      type: "done",
      answer: "I couldn't find sufficient information in Pranav's portfolio to answer that question accurately. Try asking about his RAG experience, publications, or technical skills.",
      citations: [],
      diagnostics: { matchedChunks: 0 },
    };
    return;
  }

  // 4. Construct Prompt Context
  let contextStr = "";
  topEntries.forEach((entry) => {
    contextStr += `[Source ID: ${entry.chunk.id}]\nSection: ${entry.chunk.section}\nTitle: ${entry.chunk.title}\nFact: ${entry.chunk.snippet}\n\n`;
  });

  // 5. Race the chat models and stream the winner's tokens as they arrive
  let rawAnswer = "";
  try {
    for await (const event of raceModels(question, contextStr, baseUrl, apiKey)) {
      if (event.type === "token") rawAnswer += event.text;
      yield event;
    }
  } catch (err: any) {
    yield { type: "error", message: err.message || "Chat completion request failed.", status: 502 };
    return;
  }

  // 6. Resolve citations used in answer
  const citations: KnowledgeChunk[] = [];
  const idRegex = /[\[【]([a-zA-Z0-9-]+)[\]】]/g;
  let match;
  const matchedIds = new Set<string>();

  while ((match = idRegex.exec(rawAnswer)) !== null) {
    matchedIds.add(match[1]);
  }

  // Map matched IDs back to chunks in our index
  matchedIds.forEach((id) => {
    const found = indexData.find((entry) => entry.chunk.id === id);
    if (found) {
      citations.push(found.chunk);
    }
  });

  // Format cited references in text to be user-friendly numbers: [1], [2]
  let formattedAnswer = rawAnswer;
  const citationMap: Record<string, number> = {};
  citations.forEach((cit, idx) => {
    citationMap[cit.id] = idx + 1;
  });

  Object.keys(citationMap).forEach((id) => {
    const displayNum = citationMap[id];
    // Replace standard "[id]" or thick "【id】" with "[displayNum]"
    const regex = new RegExp(`([\\[【])\\s*${id}\\s*([\\]】])`, "g");
    formattedAnswer = formattedAnswer.replace(regex, `[${displayNum}]`);
  });

  yield {
    type: "done",
    answer: formattedAnswer,
    citations,
    diagnostics: {
      matchedChunks: topEntries.length,
    },
  };
}

// Drains the stream into a single result — used only by the build-time
// precompute script (scripts/build-suggested-answers.ts), which needs one
// finished AskResult to write into precomputed-answers.json, not a live
// stream. Real requests go through streamAnswer directly (see api/ask/route.ts).
export async function answerQuestion(question: string): Promise<AskResult> {
  for await (const event of streamAnswer(question)) {
    if (event.type === "done") {
      return { answer: event.answer, citations: event.citations, diagnostics: event.diagnostics };
    }
    if (event.type === "error") {
      return { error: event.message, status: event.status };
    }
  }
  return { error: "Stream ended without a result.", status: 500 };
}
