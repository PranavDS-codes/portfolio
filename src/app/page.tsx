import { ActiveSectionProvider } from "@/components/ActiveSectionProvider";
import { HoverSyncProvider } from "@/components/HoverSyncProvider";
import { ExperienceItem } from "@/components/ExperienceItem";
import { IntroRail } from "@/components/IntroRail";
import { MetricStrip } from "@/components/MetricStrip";
import { ProjectItem } from "@/components/ProjectItem";
import { Reveal, Stagger } from "@/components/Motion";
import { Section } from "@/components/Section";
import { SkillGrid } from "@/components/SkillGrid";
import { WritingList } from "@/components/WritingList";
import { Publications } from "@/components/Publications";
import { experience, projects } from "@/data/profile";

export default function Home() {
  return (
    <ActiveSectionProvider>
      <HoverSyncProvider>
        <main className="relative min-h-screen overflow-hidden md:h-screen">
          <div className="pointer-events-none fixed inset-0 -z-10">
            <div className="absolute left-[-12rem] top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-teal/10 blur-3xl" />
            <div className="absolute right-[-10rem] top-[20%] h-[30rem] w-[30rem] rounded-full bg-violet/10 blur-3xl" />
            <div className="absolute bottom-[-14rem] left-[35%] h-[28rem] w-[28rem] rounded-full bg-amber/10 blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.035)_1px,transparent_1px)] bg-[size:72px_72px]" />
          </div>

          <div className="mx-auto grid w-full max-w-[1500px] gap-8 px-5 py-7 sm:px-8 md:h-screen md:grid-cols-[minmax(290px,0.38fr)_minmax(0,0.62fr)] md:gap-8 md:overflow-hidden md:px-7 md:py-0 lg:grid-cols-[minmax(320px,0.38fr)_minmax(0,0.62fr)] lg:gap-12 lg:px-10 xl:gap-16">
            <IntroRail />

            <div className="scrollbar-clean pb-12 md:h-screen md:overflow-y-auto md:py-8 md:pr-2 lg:py-10">
              <Reveal className="mb-10 rounded-3xl border border-line bg-white/[0.035] p-5 shadow-glow backdrop-blur sm:p-6">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.28em] text-amber">Currently building</p>
                <h2 className="mt-2 text-xl font-black tracking-tight text-white sm:text-2xl">
                  Citation-grounded AI systems that can show their work.
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
                  My strongest work sits where retrieval quality, backend systems, and product constraints meet:
                  agents that refuse unsupported answers, pipelines that expose evidence, and interfaces that make
                  reliability visible.
                </p>
              </Reveal>

              <MetricStrip />

              <Section
                id="experience"
                eyebrow="Experience"
                title="Applied AI work with real users, stakeholders, and production constraints"
                intro="I care most about systems that leave the notebook, serve people, and make their reliability visible through citations, tests, deployment paths, and operational guardrails."
              >
                <Stagger>
                  {experience.map((item) => (
                    <ExperienceItem key={item.company} item={item} />
                  ))}
                </Stagger>
              </Section>

              <Section
                id="publications"
                eyebrow="Publications"
                title="Research & Academic Contributions"
                intro="Peer-reviewed paper outlining distributed machine learning pipelines and Lithofacies optimization systems."
              >
                <Publications />
              </Section>

              <Section
                id="projects"
                eyebrow="Projects"
                title="Systems built around reliability, evaluation, and scale"
                intro="These projects emphasize retrieval, orchestration, document intelligence, and model behavior that can be inspected instead of blindly trusted."
              >
                <Stagger>
                  {projects.map((item) => (
                    <ProjectItem key={item.title} item={item} />
                  ))}
                </Stagger>
              </Section>

              <Section
                id="skills"
                eyebrow="Skills"
                title="A toolkit centered on applied AI systems"
                intro="I’m strongest where modeling, backend engineering, data quality, and evaluation meet."
              >
                <SkillGrid />
              </Section>

              <Section
                id="writing"
                eyebrow="Writing"
                title="Notes on systems that need to hold up outside demos"
                intro="Short technical reflections on retrieval, data quality, legal AI, and the engineering around LLM systems."
              >
                <WritingList />
              </Section>
            </div>
          </div>
        </main>
      </HoverSyncProvider>
    </ActiveSectionProvider>
  );
}
