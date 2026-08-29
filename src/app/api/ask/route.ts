import { NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";
import { answerQuestion, type AskResult } from "@/lib/rag";

function loadPrecomputedAnswers(): Record<string, Exclude<AskResult, { error: string }>> {
  const precomputedPath = path.resolve(process.cwd(), "src/data/rag/precomputed-answers.json");
  if (!fs.existsSync(precomputedPath)) return {};
  return JSON.parse(fs.readFileSync(precomputedPath, "utf-8"));
}

export async function POST(req: Request) {
  try {
    const { question } = (await req.json()) as { question: string };
    if (!question || typeof question !== "string") {
      return NextResponse.json({ error: "Missing or invalid question parameter." }, { status: 400 });
    }

    // Serve precomputed answers for the fixed suggested prompts instantly,
    // skipping the live NVIDIA calls (and their cold-start latency) entirely.
    const precomputed = loadPrecomputedAnswers()[question.trim()];
    if (precomputed) {
      return NextResponse.json(precomputed);
    }

    const result = await answerQuestion(question);
    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("API error:", err);
    return NextResponse.json({ error: err.message || "An unexpected error occurred." }, { status: 500 });
  }
}
