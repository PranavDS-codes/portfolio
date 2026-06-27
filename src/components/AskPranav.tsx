"use client";

import { useState } from "react";
import { Reveal } from "./Motion";

interface Citation {
  id: string;
  section: string;
  title: string;
  snippet: string;
  href?: string;
}

interface AskResponse {
  answer: string;
  citations: Citation[];
  diagnostics?: {
    matchedChunks: number;
  };
  error?: string;
}

const SUGGESTED_PROMPTS = [
  "What roles is Pranav looking for?",
  "What are Pranav's hobbies?",
  "How to contact?",
  "Is he open to remote or relocation?",
  "What is Pranav's AI/ML toolkit?",
  "Why hire Pranav for AI/ML roles?",
  "Summarize Brown Heart Assistant.",
  "How does he approach RAG reliability?",
];

export function AskPranav() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [citations, setCitations] = useState<Citation[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleAsk = async (queryText: string) => {
    if (!queryText.trim() || loading) return;

    setLoading(true);
    setError(null);
    setAnswer(null);
    setCitations([]);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: queryText }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = (await res.json()) as AskResponse;

      if (data.error) {
        setError(data.error);
      } else {
        setAnswer(data.answer);
        setCitations(data.citations || []);
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch response. Please verify server status.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAsk(question);
  };

  return (
    <div className="mt-6 border-t border-line pt-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-teal">Ask Pranav</p>
          <h3 className="mt-1 text-xs text-slate-400">RAG Assistant powered by NVIDIA NIM</h3>
        </div>
        <span className="flex h-2 w-2 items-center justify-center">
          <span className={`absolute inline-flex h-2 w-2 rounded-full opacity-75 ${loading ? "animate-ping bg-teal" : "bg-teal/40"}`} />
          <span className={`relative inline-flex h-2 w-2 rounded-full ${loading ? "bg-teal" : "bg-teal/55"}`} />
        </span>
      </div>

      {/* Suggested prompts list */}
      <div className="mt-3 flex flex-wrap gap-2">
        {SUGGESTED_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            disabled={loading}
            onClick={() => {
              setQuestion(prompt);
              handleAsk(prompt);
            }}
            className="rounded-xl border border-line bg-white/[0.015] px-3 py-1.5 text-[0.7rem] text-slate-400 hover:border-teal hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            💡 {prompt}
          </button>
        ))}
      </div>

      {/* Input box */}
      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={loading}
          placeholder="Ask a custom question..."
          className="flex-1 rounded-xl border border-line bg-ink/70 px-3 py-2 text-[0.7rem] text-white placeholder:text-slate-600 outline-none focus:border-teal disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading || !question.trim()}
          className="rounded-xl bg-teal px-3 py-2 text-[0.7rem] font-bold text-ink hover:bg-teal/90 disabled:bg-slate-800 disabled:text-slate-500 transition"
        >
          {loading ? "..." : "Ask"}
        </button>
      </form>

      {/* Error display */}
      {error && (
        <div className="mt-3 rounded-xl border border-rose-500/20 bg-rose-500/5 p-3 text-[0.7rem] text-rose-300">
          ⚠️ {error}
        </div>
      )}

      {/* Loading state indicator */}
      {loading && (
        <div className="mt-3 rounded-xl border border-line bg-white/[0.01] p-3 text-[0.7rem] text-slate-500 flex items-center gap-2">
          <div className="h-3 w-3 animate-spin rounded-full border border-teal border-t-transparent" />
          Embedding query & searching facts...
        </div>
      )}

      {/* Response Box */}
      {answer && (
        <Reveal className="mt-3 rounded-xl border border-line bg-white/[0.025] p-3 shadow-glow backdrop-blur">
          <p className="text-[0.72rem] leading-5 text-slate-200">{answer}</p>

          {/* Citations list */}
          {citations.length > 0 && (
            <div className="mt-3 border-t border-line/60 pt-2">
              <p className="text-[0.6rem] font-bold uppercase tracking-wider text-slate-500">Citations</p>
              <div className="mt-1.5 flex flex-col gap-1.5">
                {citations.map((cite, idx) => (
                  <div key={cite.id} className="text-[0.62rem] text-slate-400">
                    <span className="font-semibold text-teal">[{idx + 1}] </span>
                    {cite.href ? (
                      <a
                        href={cite.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-slate-300 hover:text-white"
                      >
                        {cite.title} ({cite.section}) ↗
                      </a>
                    ) : (
                      <span className="text-slate-300">
                        {cite.title} ({cite.section})
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </Reveal>
      )}
    </div>
  );
}
