import type { Metadata } from "next";
import { CaseStudyHeader, CaseStudySection, CaseStudyStats } from "@/components/CaseStudyHeader";

export const metadata: Metadata = {
  title: "Agentic Graph-RAG: The Brain | Pranav Pant",
  description: "How a self-correcting retrieval loop pushed hit rate from 82% to 92% and faithfulness from 0.708 to 0.847.",
};

export default function GraphRagCaseStudy() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 sm:px-10 sm:py-16">
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
          Pinecone (pluggable backends, NVIDIA NIM-embedded with a local fallback embedder), sparse BM25
          retrieval, and neighbor expansion through a Neo4j knowledge graph — 311K nodes and 374K edges built
          from 39K indexed chunks. Candidates from all three paths are unified and reranked with an NVIDIA NIM
          reranker and a local cross-encoder before ever reaching the language model.
        </p>
        <p>
          Queries are expanded with HyDE (Hypothetical Document Embeddings) before retrieval — generating a
          hypothetical answer first and embedding that, rather than the raw question, tends to land closer to
          the actual supporting evidence in vector space, especially for underspecified queries.
        </p>
        <p>
          Retrieval itself sits behind an orchestrator layer that decides, per turn, whether a query even needs
          it. Given the current query and recent chat history, the orchestrator resolves coreferences into a
          self-contained query and routes to a direct answer, internal retrieval, a live web search, a
          Wikipedia lookup, or a clarifying question — so a follow-up like &quot;what about the second
          one?&quot; gets resolved against context instead of retriggering the whole pipeline from scratch.
          Conversations persist across turns, so this reasoning carries forward rather than resetting on every
          message.
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
          trajectory-level debugging and streamed live over the API as the agent runs, not just logged after
          the fact. That was as much a design goal as the retrieval logic itself: a RAG system that can&apos;t
          show you why it answered the way it did is hard to trust and harder to improve.
        </p>
        <p>
          New findings the scouts turn up don&apos;t get written back into the graph automatically — they land
          in a review queue first, and a human approves or rejects each one before it&apos;s ingested. The
          system proposes what it learned; it doesn&apos;t get to teach itself unsupervised.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Results">
        <p>
          Naive vs. advanced retrieval was evaluated on 100 judged SQuAD-style examples, before the
          self-correction loop, the Neo4j migration, or the NVIDIA dual-engine retrieval/reranking existed:
        </p>
        <CaseStudyStats
          stats={[
            { value: "82% → 92%", label: "Retrieval hit rate on the judged benchmark" },
            { value: "0.708 → 0.847", label: "LLM-judged faithfulness score" },
            { value: "39K", label: "Indexed chunks across the hybrid retrieval stack" },
          ]}
        />
        <p className="mt-2">
          That comparison validated the move from naive top-k retrieval to a hybrid stack — the step this
          system was originally built on top of. The self-correcting loop, the Neo4j graph, and the
          NVIDIA-embedded dual-engine retrieval described above were all added afterward, and haven&apos;t been
          benchmarked against this same judged set yet. A from-scratch run against the current architecture is
          in progress; until it&apos;s done, these numbers should be read as &quot;what motivated the hybrid
          retrieval design,&quot; not as a claim about the system as it exists today.
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
