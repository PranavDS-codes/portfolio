import * as fs from "fs";
import * as path from "path";
import { knowledgeChunks } from "../src/data/rag/knowledge";

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

async function buildIndex() {
  loadEnv();

  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    console.error("❌ Error: NVIDIA_API_KEY environment variable is not defined.");
    console.error("Please add NVIDIA_API_KEY to your .env.local file or pass it when running the command.");
    process.exit(1);
  }

  const model = process.env.NVIDIA_EMBED_MODEL || "nvidia/llama-nemotron-embed-1b-v2";
  const baseUrl = process.env.NVIDIA_BASE_URL || "https://integrate.api.nvidia.com/v1";

  console.log(`🚀 Starting index build using model: ${model}...`);
  console.log(`Found ${knowledgeChunks.length} knowledge chunks to embed.`);

  const indexData = [];

  for (let i = 0; i < knowledgeChunks.length; i++) {
    const chunk = knowledgeChunks[i];
    console.log(`[${i + 1}/${knowledgeChunks.length}] Embedding chunk: ${chunk.id}...`);

    try {
      const res = await fetch(`${baseUrl}/embeddings`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: [chunk.snippet],
          model: model,
          encoding_format: "float",
          input_type: "passage",
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`NVIDIA API HTTP ${res.status}: ${errorText}`);
      }

      const resBody = (await res.json()) as {
        data: Array<{ embedding: number[] }>;
      };
      
      const embedding = resBody.data?.[0]?.embedding;
      if (!embedding) {
        throw new Error("Invalid response format, missing embedding vector.");
      }

      indexData.push({
        chunk,
        embedding,
      });
    } catch (err: any) {
      console.error(`❌ Failed to embed chunk ${chunk.id}:`, err.message);
      process.exit(1);
    }
  }

  const outDir = path.resolve(process.cwd(), "src/data/rag");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outPath = path.join(outDir, "index.json");
  fs.writeFileSync(outPath, JSON.stringify(indexData, null, 2), "utf-8");
  console.log(`\n✔ Success! Saved precomputed embeddings index to: ${outPath}`);
}

buildIndex();
