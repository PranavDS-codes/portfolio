import { NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";
import { type KnowledgeChunk } from "@/data/rag/knowledge";

interface IndexEntry {
  chunk: KnowledgeChunk;
  embedding: number[];
}

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

const STOP_WORDS = new Set(["what", "is", "how", "who", "are", "do", "does", "did", "to", "the", "a", "an", "and", "or", "in", "on", "at", "for", "with", "about", "his", "pranav", "pranav's", "pant", "s"]);

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

export async function POST(req: Request) {
  try {
    const { question } = (await req.json()) as { question: string };
    if (!question || typeof question !== "string") {
      return NextResponse.json({ error: "Missing or invalid question parameter." }, { status: 400 });
    }

    const apiKey = process.env.NVIDIA_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        answer: "API Key Not Found: The NVIDIA_API_KEY environment variable is not configured. Please add it to your .env.local file to activate this RAG assistant.",
        citations: [],
        diagnostics: { matchedChunks: 0 }
      });
    }

    const embedModel = process.env.NVIDIA_EMBED_MODEL || "nvidia/llama-nemotron-embed-1b-v2";
    const chatModel = process.env.NVIDIA_CHAT_MODEL || "openai/gpt-oss-120b";
    const baseUrl = process.env.NVIDIA_BASE_URL || "https://integrate.api.nvidia.com/v1";

    // 1. Load precomputed index from disk
    const indexPath = path.resolve(process.cwd(), "src/data/rag/index.json");
    if (!fs.existsSync(indexPath)) {
      return NextResponse.json({
        answer: "Database Index Not Found: The embeddings index.json was not found. Please run the build-rag-index script to precompute vector embeddings.",
        citations: [],
        diagnostics: { matchedChunks: 0 }
      });
    }

    const indexData = JSON.parse(fs.readFileSync(indexPath, "utf-8")) as IndexEntry[];

    // 2. Embed the query using NVIDIA embeddings API
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
      return NextResponse.json({ error: `NVIDIA Embed API Error: ${errText}` }, { status: 502 });
    }

    const embedBody = (await embedRes.json()) as {
      data: Array<{ embedding: number[] }>;
    };
    const queryEmbedding = embedBody.data?.[0]?.embedding;
    if (!queryEmbedding) {
      return NextResponse.json({ error: "Failed to parse query embedding vector." }, { status: 502 });
    }

    // 3. Compute hybrid similarity (0.7 * Cosine + 0.3 * Lexical)
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

    // Filter by similarity threshold
    const threshold = 0.22;
    const topEntries = scoredEntries.filter((entry) => entry.score >= threshold).slice(0, 5);

    if (topEntries.length === 0) {
      return NextResponse.json({
        answer: "I couldn't find sufficient information in Pranav's portfolio to answer that question accurately. Try asking about his RAG experience, publications, or technical skills.",
        citations: [],
        diagnostics: { matchedChunks: 0 }
      });
    }

    // 4. Construct Prompt Context
    let contextStr = "";
    topEntries.forEach((entry) => {
      contextStr += `[Source ID: ${entry.chunk.id}]\nSection: ${entry.chunk.section}\nTitle: ${entry.chunk.title}\nFact: ${entry.chunk.snippet}\n\n`;
    });

    // 5. Call NVIDIA OpenAI-compatible Chat endpoint
    const systemPrompt = `You are a professional AI assistant answering questions about Pranav Pant, an AI/ML/Data Engineer.
Answer the question STRICTLY using ONLY the facts provided in the Context below. Do not extrapolate, assume, or pull outside facts.
Your answer should be professional, clear, and descriptive (around 3 to 5 sentences or a structured paragraph), fully answering the user's question using the retrieved facts.
Support every statement you make by citing the Source ID inline, for example: "...developed Brown Heart Assistant [experience-jhf] using FastAPI [experience-jhf-tech]."
If the context does not contain the answer to the question, state: "I couldn't find sufficient information in Pranav's portfolio to answer that."`;

    const chatRes = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: chatModel,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Context:\n${contextStr}\n\nQuestion: ${question}` },
        ],
        temperature: 0.1,
        max_tokens: 1024,
      }),
    });

    if (!chatRes.ok) {
      const errText = await chatRes.text();
      return NextResponse.json({ error: `NVIDIA Chat API Error: ${errText}` }, { status: 502 });
    }

    const chatBody = (await chatRes.json()) as {
      choices: Array<{ message: { content: string } }>;
    };
    const rawAnswer = chatBody.choices?.[0]?.message?.content || "";

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

    return NextResponse.json({
      answer: formattedAnswer,
      citations,
      diagnostics: {
        matchedChunks: topEntries.length,
      },
    });
  } catch (err: any) {
    console.error("API error:", err);
    return NextResponse.json({ error: err.message || "An unexpected error occurred." }, { status: 500 });
  }
}
