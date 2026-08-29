import Link from "next/link";

type CaseStudyHeaderProps = {
  meta: string;
  title: string;
  summary: string;
  tags: string[];
};

export function CaseStudyHeader({ meta, title, summary, tags }: CaseStudyHeaderProps) {
  return (
    <header className="border-b border-line pb-8">
      <Link href="/#case-studies" className="text-xs font-bold text-slate-400 transition hover:text-amber">
        <span aria-hidden="true">&lt;-</span> Back to portfolio
      </Link>

      <p className="mt-6 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-amber">{meta}</p>
      <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">{title}</h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">{summary}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full bg-amber/10 px-3 py-1 text-xs font-semibold text-amber">
            {tag}
          </span>
        ))}
      </div>
    </header>
  );
}

export function CaseStudySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-line py-8 last:border-0">
      <h2 className="text-lg font-black tracking-tight text-white">{title}</h2>
      <div className="mt-4 grid gap-4 text-sm leading-7 text-slate-300">{children}</div>
    </section>
  );
}

export function CaseStudyStats({ stats }: { stats: Array<{ value: string; label: string }> }) {
  const gridClass = stats.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : stats.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3";

  return (
    <div className={`grid gap-4 ${gridClass}`}>
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-2xl border border-line bg-white/[0.025] p-4">
          <p className="text-2xl font-black text-amber">{stat.value}</p>
          <p className="mt-1 text-xs leading-5 text-slate-400">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
