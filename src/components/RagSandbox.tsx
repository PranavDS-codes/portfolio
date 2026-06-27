"use client";

import { useState, useEffect } from "react";
import { Reveal } from "./Motion";

type Step = "IDLE" | "REFORMULATE" | "RETRIEVAL" | "GRAPH" | "AUDIT" | "RESPONSE";

interface Preset {
  query: string;
  steps: {
    reformulate: string;
    retrieval: string;
    graph: string[];
    audit: string;
    response: string;
    citations: { text: string; source: string }[];
  };
}

const PRESETS: Record<string, Preset> = {
  "hal-prevention": {
    query: "How does Pranav prevent hallucinations in RAG systems?",
    steps: {
      reformulate: `Analyzed user query: "How does Pranav prevent hallucinations in RAG systems?"\n→ Intent: Technical Query / Implementation details\n→ Sub-queries generated:\n  1. "Pranav Pant RAG evaluation confidence gating"\n  2. "Agentic Graph-RAG self-correcting sufficiency audits"`,
      retrieval: "Querying BM25 and FAISS vector index...\n✔ FAISS top-k embeddings match (similarity score: 0.94)\n✔ BM25 keyword matches found (term: 'hallucinations', 'audits')\n✔ Reciprocal Rank Fusion (RRF) rank unified.",
      graph: ["Agentic Graph-RAG: The Brain", "Brown Heart Assistant", "Sufficiency Audit", "Source Verification"],
      audit: "Sufficiency Audit Running:\n→ Verification score: 96%\n→ Groundedness audit: PASSED (Zero unsupported claims found)\n→ Medical safety refusal filter: N/A\n→ Gating action: PASS to generation.",
      response: "Pranav prevents hallucinations in RAG systems by implementing **self-correcting verification loops** [1]. In his Capstone and Volunteer work, he built systems that audit evidence sufficiency before generating an answer. If the retrieved snippets are insufficient, the system self-corrects by expanding its query to Wikipedia or the web instead of guessing [2]. Furthermore, strict confidence gating and post-generation verification filters refuse unsupported claims, ensuring every answer is strictly grounded in validated database chunks [3].",
      citations: [
        { text: "Graph-RAG: The Brain uses a self-correcting graph loop to audit evidence sufficiency.", source: "Project: Agentic Graph-RAG" },
        { text: "Self-correcting search expansion audits snippets and refines failed searches.", source: "Readme: RAG Repository" },
        { text: "Brown Heart Assistant implements medical-safety refusals and source-grounded prompts.", source: "Experience: Joshi Health Foundation" },
      ],
    },
  },
  "brown-heart": {
    query: "What is Brown Heart Assistant?",
    steps: {
      reformulate: `Analyzed user query: "What is Brown Heart Assistant?"\n→ Intent: Project details / Experience details\n→ Sub-queries generated:\n  1. "Joshi Health Foundation Brown Heart Assistant platform"\n  2. "Brown Heart FAQ MASALA study agents"`,
      retrieval: "Querying BM25 and FastEmbed indexes...\n✔ FastEmbed match found (similarity score: 0.96)\n✔ Hybrid search Unified (RRF score: 0.98)\n✔ Azure PostgreSQL row hydration: SUCCESS.",
      graph: ["Brown Heart Assistant", "FAQ Agent", "MASALA Study Agent", "Azure PostgreSQL", "FastAPI"],
      audit: "Sufficiency Audit Running:\n→ Verification score: 99%\n→ Groundedness audit: PASSED\n→ Medical safety refusal filter: PASS (educational context only)\n→ Gating action: PASS to generation.",
      response: "The **Brown Heart Assistant** is a full-stack, citation-grounded health education platform developed by Pranav Pant [1]. Deployed as a web application, it serves over 5,000+ users. It features specialized FAQ and MASALA Study agents that deliver streamed, source-grounded responses [2]. The backend is built using FastAPI and hybrid retrieval (BM25 + FastEmbed), backed by Azure Blob artifacts and Azure PostgreSQL database hydration [3].",
      citations: [
        { text: "Brown Heart Assistant serves 5,000+ users with specialized FAQ and MASALA study agents.", source: "Experience: Joshi Health Foundation" },
        { text: "Hybrid retrieval combines BM25 and FastEmbed/NVIDIA embeddings.", source: "Tech Specs: Brown Heart Assistant" },
        { text: "Backend utilizes Azure Blob storage and Azure PostgreSQL for chunk hydration.", source: "Architecture: Brown Heart Assistant" },
      ],
    },
  },
};

export function RagSandbox() {
  const [currentStep, setCurrentStep] = useState<Step>("IDLE");
  const [selectedPresetKey, setSelectedPresetKey] = useState<string>("");
  const [typedResponse, setTypedResponse] = useState<string>("");
  const [customQuery, setCustomQuery] = useState<string>("");
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

  // Simulation runner
  const runSimulation = (presetKey: string) => {
    const preset = PRESETS[presetKey];
    if (!preset) return;

    setSelectedPresetKey(presetKey);
    setTypedResponse("");
    setConsoleLogs(["Initializing Self-RAG execution graph..."]);
    setCurrentStep("REFORMULATE");
  };

  useEffect(() => {
    if (currentStep === "IDLE") return;

    const preset = PRESETS[selectedPresetKey];
    if (!preset) return;

    let timer: NodeJS.Timeout;

    if (currentStep === "REFORMULATE") {
      timer = setTimeout(() => {
        setConsoleLogs((prev) => [...prev, "✔ Query reformulated.", preset.steps.reformulate]);
        setCurrentStep("RETRIEVAL");
      }, 1500);
    } else if (currentStep === "RETRIEVAL") {
      timer = setTimeout(() => {
        setConsoleLogs((prev) => [...prev, "✔ Retrieval completed.", preset.steps.retrieval]);
        setCurrentStep("GRAPH");
      }, 1500);
    } else if (currentStep === "GRAPH") {
      timer = setTimeout(() => {
        setConsoleLogs((prev) => [
          ...prev,
          "✔ Neo4j Knowledge Graph expanded.",
          `Traversing entity nodes: [${preset.steps.graph.join(" ➔ ")}]`,
        ]);
        setCurrentStep("AUDIT");
      }, 1500);
    } else if (currentStep === "AUDIT") {
      timer = setTimeout(() => {
        setConsoleLogs((prev) => [...prev, "✔ Sufficiency audit check complete.", preset.steps.audit]);
        setCurrentStep("RESPONSE");
      }, 1200);
    } else if (currentStep === "RESPONSE") {
      // Typewriter effect using robust slice pattern
      let currentLength = 0;
      const responseText = preset.steps.response;
      setTypedResponse("");
      const interval = setInterval(() => {
        currentLength++;
        setTypedResponse(responseText.slice(0, currentLength));
        if (currentLength >= responseText.length) {
          clearInterval(interval);
          setConsoleLogs((prev) => [...prev, "✔ Streaming output complete.", "Execution finished successfully."]);
        }
      }, 15);
      return () => clearInterval(interval);
    }

    return () => clearTimeout(timer);
  }, [currentStep, selectedPresetKey]);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim()) return;

    // Map custom query to the closest preset for demonstration
    const lowerQuery = customQuery.toLowerCase();
    if (lowerQuery.includes("prevent") || lowerQuery.includes("hallucination") || lowerQuery.includes("rag") || lowerQuery.includes("brain")) {
      runSimulation("hal-prevention");
    } else {
      runSimulation("brown-heart");
    }
  };

  const presetData = PRESETS[selectedPresetKey];

  return (
    <Reveal className="mb-10 rounded-3xl border border-line bg-[#08111f]/65 p-5 shadow-glow backdrop-blur sm:p-6">
      <div className="flex items-center justify-between border-b border-line pb-4">
        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-teal">Self-RAG Simulator</p>
          <h2 className="mt-1 text-lg font-black text-white">Interactive Graph-RAG Workspace</h2>
        </div>
        <span className="flex h-2.5 w-2.5 items-center justify-content">
          <span className={`absolute inline-flex h-2.5 w-2.5 rounded-full opacity-75 ${currentStep !== "IDLE" ? "animate-ping bg-teal" : "bg-teal/40"}`} />
          <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${currentStep !== "IDLE" ? "bg-teal" : "bg-teal/55"}`} />
        </span>
      </div>

      <p className="mt-3 text-xs leading-5 text-slate-400">
        Demo how the *Self-Correcting Graph-RAG* pipeline handles evidence audits, intent reformulation, graph traversal, and cited answers.
      </p>

      {/* Preset Buttons */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => runSimulation("hal-prevention")}
          disabled={currentStep !== "IDLE" && currentStep !== "RESPONSE"}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
            selectedPresetKey === "hal-prevention"
              ? "bg-teal text-ink"
              : "border border-line bg-white/[0.02] text-slate-300 hover:border-teal hover:text-white"
          } disabled:opacity-50`}
        >
          🔍 Hallucination Prevention Flow
        </button>
        <button
          onClick={() => runSimulation("brown-heart")}
          disabled={currentStep !== "IDLE" && currentStep !== "RESPONSE"}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
            selectedPresetKey === "brown-heart"
              ? "bg-teal text-ink"
              : "border border-line bg-white/[0.02] text-slate-300 hover:border-teal hover:text-white"
          } disabled:opacity-50`}
        >
          🏥 Brown Heart Assistant Flow
        </button>
      </div>

      {/* Custom query input */}
      <form onSubmit={handleCustomSubmit} className="mt-4 flex gap-2">
        <input
          type="text"
          value={customQuery}
          onChange={(e) => setCustomQuery(e.target.value)}
          disabled={currentStep !== "IDLE" && currentStep !== "RESPONSE"}
          placeholder="Ask something else... (e.g. 'How does it work?')"
          className="flex-1 rounded-2xl border border-line bg-ink/50 px-4 py-2.5 text-xs text-white placeholder:text-slate-600 outline-none focus:border-teal disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={(currentStep !== "IDLE" && currentStep !== "RESPONSE") || !customQuery.trim()}
          className="rounded-2xl bg-teal px-4 py-2.5 text-xs font-bold text-ink hover:bg-teal/90 disabled:bg-slate-800 disabled:text-slate-500 transition"
        >
          Run
        </button>
      </form>

      {/* Graph Visualizer Area */}
      {currentStep !== "IDLE" && (
        <div className="mt-6 rounded-2xl border border-line bg-ink/30 p-4">
          <h4 className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">LangGraph Pipeline Execution State</h4>

          {/* Graphical nodes */}
          <div className="mt-4 flex flex-wrap items-center justify-around gap-4 text-center">
            {[
              { id: "REFORMULATE", label: "Query Analysis" },
              { id: "RETRIEVAL", label: "Hybrid Match" },
              { id: "GRAPH", label: "Graph Traversal" },
              { id: "AUDIT", label: "Sufficiency Audit" },
              { id: "RESPONSE", label: "Stream Generation" },
            ].map((node, index, arr) => {
              const isActive = currentStep === node.id;
              const isPast = arr.findIndex((n) => n.id === currentStep) > index;
              return (
                <div key={node.id} className="flex items-center gap-2">
                  <div
                    className={`rounded-xl border px-3 py-2 text-[0.68rem] font-bold transition-all duration-300 ${
                      isActive
                        ? "border-teal bg-teal/15 text-teal shadow-[0_0_15px_rgba(45,212,191,0.3)] animate-pulse scale-105"
                        : isPast
                        ? "border-violet/40 bg-violet/5 text-violet"
                        : "border-line bg-white/[0.02] text-slate-600"
                    }`}
                  >
                    {node.label}
                  </div>
                  {index < arr.length - 1 && (
                    <span
                      className={`text-[0.65rem] ${
                        isPast ? "text-violet/60 font-bold" : "text-slate-700"
                      }`}
                    >
                      ➔
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Console Output */}
          <div className="mt-5 rounded-xl border border-line/60 bg-black/60 p-3 font-mono text-[0.65rem] leading-5 text-teal/80">
            <div className="flex items-center gap-1.5 border-b border-line pb-1.5 text-slate-500 mb-2">
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="ml-1 font-sans font-semibold tracking-wider">EXECUTION CONSOLE LOGS</span>
            </div>
            <div className="max-h-[140px] overflow-y-auto scrollbar-clean">
              {consoleLogs.map((log, i) => (
                <pre key={i} className="whitespace-pre-wrap break-all border-b border-white/[0.02] pb-1 last:border-0 last:pb-0">
                  {log}
                </pre>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Answer & Citations Area */}
      {typedResponse && presetData && (
        <div className="mt-5 rounded-2xl border border-line bg-white/[0.025] p-4">
          <h4 className="text-[0.65rem] font-bold uppercase tracking-wider text-teal">Grounded Output</h4>
          <p className="mt-2.5 text-sm leading-6 text-slate-200 whitespace-pre-wrap">{typedResponse}</p>

          {/* Interactive Citations list */}
          <div className="mt-4 border-t border-line pt-3">
            <h5 className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">Cited Knowledge Sources</h5>
            <div className="mt-2 grid gap-2">
              {presetData.steps.citations.map((cite, idx) => (
                <div key={idx} className="rounded-xl border border-line/50 bg-ink/40 p-2.5 text-xs text-slate-400 flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal/10 text-[0.68rem] font-bold text-teal">
                    [{idx + 1}]
                  </span>
                  <div>
                    <p className="leading-5 text-slate-300">{cite.text}</p>
                    <p className="mt-1 text-[0.65rem] font-bold text-violet uppercase tracking-wide">{cite.source}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Reveal>
  );
}
