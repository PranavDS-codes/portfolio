import { NextResponse } from "next/server";

// Pings the NVIDIA embeddings endpoint with a trivial input to keep the
// hosted embed model warm, avoiding the ~60s cold-start latency observed
// on the first request after a period of inactivity. Triggered on a
// schedule by .github/workflows/keep-warm.yml (Vercel Hobby cron only
// allows once/day, too infrequent for this).
export async function GET() {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ warmed: false, reason: "NVIDIA_API_KEY not configured" }, { status: 200 });
  }

  const embedModel = process.env.NVIDIA_EMBED_MODEL || "nvidia/nemotron-3-embed-1b";
  const baseUrl = process.env.NVIDIA_BASE_URL || "https://integrate.api.nvidia.com/v1";

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
    });

    return NextResponse.json({ warmed: res.ok }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ warmed: false, reason: err.message }, { status: 200 });
  }
}
