import type { Metadata } from "next";
import { CaseStudyHeader, CaseStudySection, CaseStudyStats } from "@/components/CaseStudyHeader";

export const metadata: Metadata = {
  title: "Agentic Graph-RAG: The Brain | Pranav Pant",
  description: "How a self-correcting retrieval loop pushed hit rate from 82% to 92% and faithfulness from 0.708 to 0.847.",
};

export default function GraphRagCaseStudy() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <CaseStudyHeader
        meta="Graph-RAG · LangGraph · Self-Correction"
        title="Agentic Graph-RAG: The Brain"
        summary="Most RAG systems retrieve once, generate once, and hope the context was enough. The Brain treats retrieval as something that can fail — and builds a loop around catching that failure before it reaches the user."
        tags={["LangGraph", "Neo4j", "FAISS", "Pinecone", "BM25", "RAG"]}
      />

      <CaseStudySection title="The problem">
        <p>
          Naive RAG has a specific failure mode: it retrieves the top-k chunks for a query, stuffs them into a
          prompt, and generates an answer regardless of whether those chunks actually contain the answer. When
          retrieval quality is high, this works fine. When it isn&apos;t — an ambiguous query, a fact that sits
          across multiple documents, a question the corpus simply doesn&apos;t cover — the model fills the gap with
          fluent, unsupported text. The system has no mechanism to notice it failed.
        </p>
        <p>
          The Brain was built to close that gap: audit whether retrieved evidence is actually sufficient before
          generating an answer, and if it isn&apos;t, do something about it instead of guessing.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Architecture">
        <p>
          The system is a LangGraph agent over a hybrid retrieval stack: dense vector search across FAISS and
          Pinecone (pluggable backends), sparse BM25 retrieval, and neighbor expansion through a Neo4j knowledge
          graph — 311K nodes and 374K edges built from 39K indexed chunks. Candidates from all three paths are
          unified and reranked with NVIDIA and Cross-Encoder rerankers before ever reaching the language model.
        </p>
        <p>
          Queries are expanded with HyDE (Hypothetical Document Embeddings) before retrieval — generating a
          hypothetical answer first and embedding that, rather than the raw question, tends to land closer to
          the actual supporting evidence in vector space, especially for underspecified queries.
        </p>
      </CaseStudySection>

      <CaseStudySection title="The self-correction loop">
        <p>
          After retrieval, an LLM-based sufficiency judge looks at the candidate evidence and asks a narrow
          question: is this actually enough to answer what was asked? If not, the system doesn&apos;t just
          generate anyway — it expands the search to Tavily web search and Wikipedia, re-runs retrieval with a
          refined query, and re-checks sufficiency, bounded to a fixed number of refinement passes so it can&apos;t
          loop forever on an unanswerable question.
        </p>
        <p>
          Every intermediate state — retrieval candidates, the sufficiency judge&apos;s verdict, evidence
          verification results, each query refinement, and which fallback path fired — is captured for
          trajectory-level debugging. That was as much a design goal as the retrieval logic itself: a RAG system
          that can&apos;t show you why it answered the way it did is hard to trust and harder to improve.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Results">
        <p>
          Evaluated naive vs. advanced retrieval on 100 judged SQuAD-style examples:
        </p>
        <CaseStudyStats
          stats={[
            { value: "82% → 92%", label: "Retrieval hit rate on the judged benchmark" },
            { value: "0.708 → 0.847", label: "LLM-judged faithfulness score" },
            { value: "39K", label: "Indexed chunks across the hybrid retrieval stack" },
          ]}
        />
        <p className="mt-2">
          The gap between those two numbers is the point: hit rate measures whether the right evidence was
          found, faithfulness measures whether the final answer actually stuck to it. Both moving together is
          what the self-correction loop was designed to produce — not just better retrieval, but retrieval the
          generation step can actually be held accountable to.
        </p>
      </CaseStudySection>

      <p className="pt-6 text-xs text-slate-500">
        <a href="https://github.com/PranavDS-codes/RAG" className="text-teal hover:text-white" target="_blank" rel="noopener noreferrer">
          View the repository ↗
        </a>
      </p>
    </main>
  );
}
