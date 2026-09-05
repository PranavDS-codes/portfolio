import { NextResponse } from "next/server";
import { RACE_MODELS, leastThinkingParams } from "@/lib/rag";

// Pings the NVIDIA embeddings endpoint and every chat model in the race
// (see RACE_MODELS in rag.ts) with a trivial input to keep them warm. This
// isn't just precautionary: the model benchmark run (see rag.ts) showed
// nemotron-3.5-lightning and nemotron-3-ultra hitting 10-40s latency spikes
// (and ultra hitting 503 overloaded) on otherwise-idle requests, the same
// cold-start pattern already observed on the embedding model — racing three
// models is only a latency win if none of them are cold. Triggered on a
// schedule by .github/workflows/keep-warm.yml (Vercel Hobby cron only allows
// once/day, too infrequent for this).
export async function GET() {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ warmed: false, reason: "NVIDIA_API_KEY not configured" }, { status: 200 });
  }

  const embedModel = process.env.NVIDIA_EMBED_MODEL || "nvidia/nemotron-3-embed-1b";
  const baseUrl = process.env.NVIDIA_BASE_URL || "https://integrate.api.nvidia.com/v1";

  // A single stuck upstream model must not stall the whole route until the
  // platform kills the function (observed: a hung chat model held this
  // route open ~5min before Vercel's edge returned a 504). Bound each
  // warmup call independently so one cold/overloaded model just reports
  // warmed: false instead of taking the others down with it.
  const PING_TIMEOUT_MS = 8000;

  async function pingEmbed() {
    try {
      const res = await fetch(`${baseUrl}/embeddings`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: ["warmup"],
          model: embedModel,
          encoding_format: "float",
          input_type: "query",
        }),
        signal: AbortSignal.timeout(PING_TIMEOUT_MS),
      });
      return { model: embedModel, warmed: res.ok };
    } catch (err: any) {
      return { model: embedModel, warmed: false, reason: err.message };
    }
  }

  async function pingChat(model: string) {
    try {
      const res = await fetch(`${baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: "warmup" }],
          max_tokens: 1,
          ...leastThinkingParams(model),
        }),
        signal: AbortSignal.timeout(PING_TIMEOUT_MS),
      });
      return { model, warmed: res.ok };
    } catch (err: any) {
      return { model, warmed: false, reason: err.message };
    }
  }

  const results = await Promise.all([pingEmbed(), ...RACE_MODELS.map(pingChat)]);

  return NextResponse.json({ warmed: results.every((r) => r.warmed), results }, { status: 200 });
}
