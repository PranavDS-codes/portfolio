import type { Metadata } from "next";
import { CaseStudyHeader, CaseStudySection, CaseStudyStats } from "@/components/CaseStudyHeader";

export const metadata: Metadata = {
  title: "Legal Sentinel | Pranav Pant",
  description: "Turning a contract into a risk-ranked clause graph, without ever letting documents leak across sessions.",
};

export default function LegalSentinelCaseStudy() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <CaseStudyHeader
        meta="Legal AI · Clause Graphs · Document Intelligence"
        title="Legal Sentinel"
        summary="Contract review is slow because it's structural work disguised as reading: cross-references, obligations, and risk live in the relationships between clauses, not just the text of any one of them. Legal Sentinel makes those relationships explicit instead of asking a human to hold them in their head."
        tags={["FastAPI", "Pydantic", "RAG", "NVIDIA", "Python"]}
      />

      <CaseStudySection title="The problem">
        <p>
          Reviewing a legal agreement means tracking which clauses reference which, where risk actually
          concentrates across dozens of sections, and what the practical implications are — work that&apos;s slow
          and easy to get subtly wrong under time pressure. The goal wasn&apos;t to replace that judgment, but to
          turn a flat PDF into a structure a reviewer can actually navigate: sections, the graph of references
          between them, and a ranked list of what needs attention first.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Architecture">
        <p>
          PDF extraction runs through a dual-parser pipeline with heuristic quality routing — different contract
          PDFs (scanned, native-text, mixed) parse better with different extraction strategies, and the pipeline
          picks based on measured extraction quality rather than assuming one parser handles everything.
        </p>
        <p>
          Clause graph construction combines regex-based reference mining with LLM verification: cheap pattern
          matching finds candidate references, and the model confirms and labels them, enforcing known-section
          IDs, grounded evidence quotes, and relation labels rather than letting the model hallucinate a
          reference structure that isn&apos;t actually in the document. Follow-up chat runs on a lightweight RAG
          layer with NVIDIA embeddings and cosine-search indexing over the extracted sections and risk findings.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Risk analysis, schema-validated">
        <p>
          The risk-analysis step is graph-aware: it doesn&apos;t score clauses in isolation, it reasons about them
          in the context of what they reference and what references them. Every flag it emits is
          schema-validated — a risk type, a severity, a rationale, a grounded evidence quote, and a confidence
          score — specifically so the output can be trusted as structured data, not just prose a reviewer has to
          re-verify from scratch.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Keeping documents from leaking across sessions">
        <p>
          A contract-review tool handling multiple users&apos; documents has an obvious failure mode: retrieval
          for one user&apos;s follow-up question pulling context from a different user&apos;s uploaded contract.
          Legal Sentinel&apos;s retrieval is run-local by design — each session&apos;s index is scoped to that
          session&apos;s documents only, which closes off cross-document leakage at the architecture level instead
          of relying on query-time filtering to catch it.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Results">
        <p>On a sample 19-page agreement, the pipeline identified:</p>
        <CaseStudyStats
          stats={[
            { value: "26", label: "Risk flags identified" },
            { value: "31", label: "Sections structurally extracted" },
            { value: "33", label: "Clause links in the reference graph" },
          ]}
        />
      </CaseStudySection>

      <p className="pt-6 text-xs text-slate-500">
        <a href="https://bored26-legal-sentinel.hf.space/" className="text-teal hover:text-white" target="_blank" rel="noopener noreferrer">
          Live app ↗
        </a>
        <span className="mx-2">·</span>
        <a href="https://github.com/PranavDS-codes/DSE_CAPSTONE" className="text-teal hover:text-white" target="_blank" rel="noopener noreferrer">
          GitHub ↗
        </a>
      </p>
    </main>
  );
}
