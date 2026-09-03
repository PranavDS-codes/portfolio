import * as fs from "fs";
import * as path from "path";
import { SUGGESTED_PROMPTS } from "../src/data/rag/suggested-prompts";
import { answerQuestion } from "../src/lib/rag";

// Simple helper to load environment variables from .env.local if present
function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf-8");
    content.split("\n").forEach((line) => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || "";
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.substring(1, value.length - 1);
        } else if (value.startsWith("'") && value.endsWith("'")) {
          value = value.substring(1, value.length - 1);
        }
        process.env[key] = value;
      }
    });
  }
}

async function buildSuggestedAnswers() {
  loadEnv();

  // Precomputing the suggested-prompt cache is a build step, not real visitor
  // traffic — keep it out of the LangSmith project so traces only reflect
  // live /api/ask requests.
  process.env.LANGSMITH_TRACING = "false";

  if (!process.env.NVIDIA_API_KEY) {
    console.error("❌ Error: NVIDIA_API_KEY environment variable is not defined.");
    process.exit(1);
  }

  console.log(`🚀 Precomputing answers for ${SUGGESTED_PROMPTS.length} suggested prompts...`);

  const answers: Record<string, unknown> = {};

  for (let i = 0; i < SUGGESTED_PROMPTS.length; i++) {
    const prompt = SUGGESTED_PROMPTS[i];
    console.log(`[${i + 1}/${SUGGESTED_PROMPTS.length}] Answering: "${prompt}"...`);

    const result = await answerQuestion(prompt);
    if ("error" in result) {
      console.error(`❌ Failed to answer "${prompt}":`, result.error);
      process.exit(1);
    }

    answers[prompt] = result;
  }

  const outDir = path.resolve(process.cwd(), "src/data/rag");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outPath = path.join(outDir, "precomputed-answers.json");
  fs.writeFileSync(outPath, JSON.stringify(answers, null, 2), "utf-8");
  console.log(`\n✔ Success! Saved precomputed answers to: ${outPath}`);
}

buildSuggestedAnswers();
