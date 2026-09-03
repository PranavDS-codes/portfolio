import { NextResponse, after } from "next/server";
import * as fs from "fs";
import * as path from "path";
import { traceable } from "langsmith/traceable";
import { streamAnswer, type AskResult, type AskStreamEvent } from "@/lib/rag";
import { langsmithClient } from "@/lib/langsmith";

function loadPrecomputedAnswers(): Record<string, Exclude<AskResult, { error: string }>> {
  const precomputedPath = path.resolve(process.cwd(), "src/data/rag/precomputed-answers.json");
  if (!fs.existsSync(precomputedPath)) return {};
  return JSON.parse(fs.readFileSync(precomputedPath, "utf-8"));
}

// The event shape streamed to the client as newline-delimited JSON: every
// AskStreamEvent from rag.ts, plus a cacheHit flag on the "meta" event so the
// UI (and LangSmith) can distinguish an instant precomputed answer from a
// live model race without a separate response shape.
export type AskStreamResponseEvent = AskStreamEvent & { cacheHit?: boolean };

const askPranav = traceable(
  async function* (question: string): AsyncGenerator<AskStreamResponseEvent, void, unknown> {
    // Serve precomputed answers for the fixed suggested prompts instantly,
    // skipping the live model race (and its cold-start latency) entirely.
    const precomputed = loadPrecomputedAnswers()[question.trim()];
    if (precomputed) {
      yield { type: "meta", model: "cache", cacheHit: true };
      yield { type: "done", ...precomputed };
      return;
    }

    for await (const event of streamAnswer(question)) {
      yield event.type === "meta" ? { ...event, cacheHit: false } : event;
    }
  },
  {
    name: "askPranav",
    run_type: "chain",
    client: langsmithClient,
    aggregator: (events: AskStreamResponseEvent[]) => {
      const meta: any = events.find((e) => e.type === "meta");
      const final: any = events.find((e) => e.type === "done" || e.type === "error");
      return { model: meta?.model, cacheHit: meta?.cacheHit ?? false, ...(final ?? {}) };
    },
  }
);

export async function POST(req: Request) {
  let question: string;
  try {
    const body = (await req.json()) as { question: string };
    question = body.question;
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Invalid request body." }, { status: 500 });
  }

  if (!question || typeof question !== "string") {
    return NextResponse.json({ error: "Missing or invalid question parameter." }, { status: 400 });
  }

  // Next.js returns the Response as soon as the stream starts, but the
  // handler function itself returns before the stream finishes draining —
  // `after()` needs a promise that resolves once tracing actually has
  // something to flush, not just once POST() returns.
  let resolveDone!: () => void;
  const streamDone = new Promise<void>((resolve) => {
    resolveDone = resolve;
  });
  let finished = false;
  const finish = () => {
    if (!finished) {
      finished = true;
      resolveDone();
    }
  };

  const encoder = new TextEncoder();
  const iterator = askPranav(question)[Symbol.asyncIterator]();
  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      try {
        const { done, value } = await iterator.next();
        if (done) {
          controller.close();
          finish();
          return;
        }
        controller.enqueue(encoder.encode(JSON.stringify(value) + "\n"));
      } catch (err: any) {
        console.error("API stream error:", err);
        controller.enqueue(
          encoder.encode(
            JSON.stringify({ type: "error", message: err.message || "An unexpected error occurred.", status: 500 }) + "\n"
          )
        );
        controller.close();
        finish();
      }
    },
    // The client disconnecting mid-stream (nav away, head -N, etc.) doesn't
    // stop `pull` from being awaited on its own — this is the spec hook for
    // that case, and closing the iterator here is what actually cascades an
    // abort down into the winning model's in-flight request (see raceModels
    // in rag.ts) instead of leaving it running and its LangSmith span open.
    async cancel(reason) {
      await iterator.return?.(reason);
      finish();
    },
  });

  after(() => streamDone.then(() => langsmithClient.awaitPendingTraceBatches()));

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
