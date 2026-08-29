import type { Metadata } from "next";
import { CaseStudyHeader, CaseStudySection, CaseStudyStats } from "@/components/CaseStudyHeader";

export const metadata: Metadata = {
  title: "Brown Heart Assistant | Pranav Pant",
  description: "Designing a medical Q&A assistant that knows when to refuse and hand off to a human instead of guessing.",
};

export default function BrownHeartCaseStudy() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <CaseStudyHeader
        meta="Medical RAG · HITL · Multi-Agent"
        title="Brown Heart Assistant"
        summary="In most RAG products, a wrong answer is an annoyance. In medical Q&A, it's a safety incident. Brown Heart Assistant was built around that asymmetry from the start."
        tags={["FastAPI", "pgvector", "HITL", "LangSmith", "Azure OpenAI"]}
      />

      <CaseStudySection title="The problem">
        <p>
          Joshi Health Foundation needed a way to answer cardiovascular health questions at scale — thousands of
          users, a curated FAQ and MASALA Study knowledge base, and no way to have a clinician review every
          response. The constraint that shaped everything else: a confident wrong answer about medication or
          symptoms is worse than no answer at all. The system needed to be citation-grounded by default, and it
          needed a real answer for &quot;what happens when the knowledge base doesn&apos;t cover this?&quot; that
          wasn&apos;t just hoping the model stays in its lane.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Architecture">
        <p>
          The assistant is a router-orchestrated multi-agent system: dedicated agents for FAQ, MASALA Study,
          Instagram, YouTube, and movie-timestamp content sources, each with its own source-aware prompts and
          confidence thresholds, so a query gets routed to the agent actually equipped to answer it rather than
          one generic prompt trying to cover everything.
        </p>
        <p>
          Retrieval is hybrid — BM25 for lexical matching plus vector search over Azure PostgreSQL using a
          pgvector HNSW index, unified with reciprocal rank fusion and NVIDIA reranking. Chat generation runs on
          Azure OpenAI; NVIDIA handles embeddings and reranking only — splitting those responsibilities let each
          piece use the model best suited to it rather than routing everything through one provider.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Refuse-and-route beats guessing">
        <p>
          The core safety mechanism is a confidence gate paired with MCP-style human-in-the-loop (HITL) tool
          interfaces. When a query comes in with low retrieval confidence — the kind of question the corpus
          doesn&apos;t clearly answer — the system doesn&apos;t stretch the available evidence to cover it. It
          triggers a HITL path instead: doctor-specialty matching, a clinician-contact flow, or an
          appointment-booking handoff, depending on what the query needs.
        </p>
        <p>
          That&apos;s a deliberate product tradeoff. A system optimized purely for &quot;always answer&quot; will
          eventually answer something it shouldn&apos;t. Optimizing instead for &quot;answer only when the
          evidence supports it, escalate otherwise&quot; costs some coverage but is the only version of this
          product that&apos;s honest about what a RAG system actually knows.
        </p>
      </CaseStudySection>

      <CaseStudySection title="The same discipline upstream">
        <p>
          Refuse-and-route only works if the content it&apos;s grounded in is trustworthy to begin with — so the
          same &quot;don&apos;t ship confidence you can&apos;t back up&quot; rule applies to how the FAQ
          knowledge base itself gets built, not just to what the assistant says at query time. The data pipeline
          tracks exactly one file in git: the curated FAQ corpus, 244 Q&amp;A rows. Every pipeline run rewrites it
          in place, which means every run produces a reviewable diff — and that diff is the actual publish gate.
          Nothing reaches the production database until a human has looked at exactly what changed and how it
          was enriched. It&apos;s the HITL principle applied one step earlier: don&apos;t let unreviewed
          confidence into the system in the first place.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Production hardening">
        <p>
          Confidence thresholds and refusal behavior only matter if you can verify they&apos;re actually firing
          correctly in production. LangSmith tracing runs across every agent call — retrieval scores, citation
          generation, refusal triggers, and HITL escalations are all logged, so a review of &quot;why did it
          refuse this one&quot; is a trace lookup, not a guess. The backend runs on FastAPI with Azure Blob
          artifact hydration, checksum validation, signed sessions, admin health checks, and 420+ passing tests
          covering retrieval, auth, citations, and medical-safety behavior specifically.
        </p>
        <p>
          Non-browser integrations — a WhatsApp bot, a partner service — can&apos;t satisfy the browser-only
          session flow, so a separate <code className="text-xs">/service/chat</code> API exposes the same
          request/response contract behind per-caller API keys, per-caller rate limiting, and its own LangSmith
          tagging, keeping that traffic attributable and rate-bounded without touching the primary auth path.
        </p>
        <p>
          The FAQ knowledge base is also presented as its own thing: a companion FAQ dashboard is rebuilt daily
          from the same production database through a dedicated read-only role, and citations in the assistant
          deep-link straight to the matching entry there — presentation logic kept out of the assistant&apos;s
          own runtime rather than bolted onto it.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Results">
        <CaseStudyStats
          stats={[
            { value: "5,000+", label: "Users served in production" },
            { value: "420+", label: "Passing tests across retrieval, auth, citations, and safety behavior" },
            { value: "5", label: "Specialized agents behind one router (FAQ, MASALA, Instagram, YouTube, movie)" },
          ]}
        />
      </CaseStudySection>

      <p className="pt-6 text-xs text-slate-500">
        <a href="https://bhai.thebrownheart.com/" className="text-teal hover:text-white" target="_blank" rel="noopener noreferrer">
          Try BHAI ↗
        </a>
        <span className="mx-2">·</span>
        <a href="https://faq.thebrownheart.com/" className="text-teal hover:text-white" target="_blank" rel="noopener noreferrer">
          FAQ Website ↗
        </a>
      </p>
    </main>
  );
}
