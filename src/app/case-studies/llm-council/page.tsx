import type { Metadata } from "next";
import { CaseStudyHeader, CaseStudySection, CaseStudyStats } from "@/components/CaseStudyHeader";

export const metadata: Metadata = {
  title: "LLM Council | Pranav Pant",
  description: "Five personas draft, one rubric scores them, and a rules-based selector decides what makes the final answer.",
};

export default function LlmCouncilCaseStudy() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 sm:px-10 sm:py-16">
      <CaseStudyHeader
        meta="Agents · LLM Orchestration · Deliberation"
        title="LLM Council"
        summary="Ask five independent drafts for an opinion and you get five opinions, not an answer. LLM Council doesn't average them or let a model freely pick a favorite — it scores every draft against a fixed rubric, plans the final answer's structure before writing it, and keeps every handoff in between schema-validated and traced."
        tags={["FastAPI", "Pydantic", "NVIDIA NIM", "LangSmith", "Multi-Agent Systems"]}
      />

      <CaseStudySection title="The problem">
        <p>
          Most &quot;ask several models and combine the answers&quot; systems have two quiet failure modes: the
          judging step is itself just another LLM call with no fixed criteria, so &quot;the winner&quot; is
          often whichever draft matched the judge&apos;s stylistic preference that run — and there&apos;s no
          separation between deciding what the final answer should contain and actually writing it, so quality
          depends entirely on one model&apos;s ability to do both at once. Neither failure is visible from the
          outside; the system just produces an answer, with no way to ask why it looks the way it does. LLM
          Council&apos;s bet is to treat answer generation like an editorial process instead of a single
          generation call — draft, review against a rubric, plan, then write — with a machine-checkable
          contract at every handoff, so the path from five raw drafts to one final answer can actually be
          inspected.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Architecture">
        <p>
          Four stages run over one streamed SSE connection: generators draft independently and concurrently, a
          critic scores every draft, an architect turns the winning drafts and their critique into a structured
          plan, and a finalizer writes from that plan. Reasoning effort is tuned per stage — low for drafting
          and final prose, medium for critique and planning — trading latency against quality where each stage
          actually needs it.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Scoring instead of voting">
        <p>
          Drafts are batched in groups of up to three (batch count scales with roster size, so the rubric stays
          consistent whether there are 2 personas or 12) and scored 1–10 across five fixed metrics: accuracy,
          relevance, completeness, clarity, practical usefulness. Finalists are the top two by a deterministic
          sort — average score, then accuracy, then generator order — moving &quot;who won&quot; out of
          free-form model judgment and into a rule a reader can check against the raw scores.
        </p>
      </CaseStudySection>

      <CaseStudySection title="A blueprint before prose">
        <p>
          Before the finalizer writes anything, an architect stage produces a schema-validated blueprint:
          section order, tone guidelines, specific facts the finalists missed, and a strategy for integrating
          the critique. This is the step that turns &quot;whichever draft scored highest&quot; into a genuinely
          synthesized answer.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Grounded follow-up, on purpose">
        <p>
          Once the council finishes, a follow-up chat lets a user ask more questions — but its system prompt is
          scoped strictly to the final report text, and explicitly instructed not to reference internal
          generator drafts, scores, or the blueprint, even though that data exists in the same session.
          It&apos;s a small, deliberate boundary: the system knows more than it&apos;s willing to say through
          that particular surface.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Built to fail gracefully">
        <p>
          A single generator or critic batch can fail without killing the run — errors surface as recoverable
          events and the pipeline continues with what it has. Transient NVIDIA API errors retry with
          exponential backoff and jitter; requests that fail on unsupported parameters automatically drop{" "}
          <code className="text-xs">response_format</code>, then <code className="text-xs">reasoning_effort</code>,
          then usage reporting, and retry rather than hard-failing. SSE heartbeats keep the connection alive
          through proxy idle timeouts during long reasoning pauses.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Results">
        <p>
          Measured, not estimated: 10 fixed prompts (spanning technical explainers, ethical/legal tradeoffs,
          personal-finance advice, and org-design questions) were each sent through a single raw call to the
          pipeline&apos;s default model and through the full 5-persona council. Both answers were graded blind —
          order randomized to remove position bias — by an independent judge call scoring the council&apos;s own
          five-metric rubric, 1–10 each.
        </p>
        <CaseStudyStats
          stats={[
            { value: "+0.09", label: "Avg. score edge, council vs. single model (10-pt scale)" },
            { value: "6–1–3", label: "Council wins – ties – baseline wins" },
            { value: "8.2×", label: "More tokens per answer" },
          ]}
        />
        <p className="mt-2">
          The honest read: council answers won more often than they lost, and the gain concentrated exactly
          where the architecture predicts it should — practical usefulness (+0.20) and completeness (+0.15)
          improved the most, consistent with an architect stage whose whole job is injecting missing facts and
          imposing structure. Clarity dipped very slightly (−0.05) — the tradeoff of synthesizing multiple
          drafts into one longer answer. That edge isn&apos;t free: the council pipeline used roughly 8.2× the
          tokens of a single call and took about 2.4× as long under typical conditions (median 71s vs. 31s).
          This is a small, real, consistent edge bought at a real, measurable cost — not a blowout, and
          it&apos;s described that way on purpose.
        </p>
      </CaseStudySection>

      <p className="pt-6 text-xs text-slate-500">
        <a href="https://llm-council-three.vercel.app/" className="text-teal hover:text-white" target="_blank" rel="noopener noreferrer">
          Live app ↗
        </a>
        <span className="mx-2">·</span>
        <a href="https://github.com/PranavDS-codes/LLM-Council" className="text-teal hover:text-white" target="_blank" rel="noopener noreferrer">
          GitHub ↗
        </a>
      </p>
    </main>
  );
}
