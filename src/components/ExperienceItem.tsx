import { externalLinkProps } from "@/lib/utils";
import { StaggerItem } from "./Motion";

type ExperienceItemProps = {
  item: {
    company: string;
    role: string;
    dates: string;
    location: string;
    featured?: boolean;
    summary: string;
    bullets: string[];
    links?: Array<{ label: string; href: string }>;
    tags: string[];
  };
};

export function ExperienceItem({ item }: ExperienceItemProps) {
  return (
    <StaggerItem>
      <article className="group grid gap-4 border-b border-line py-6 transition lg:grid-cols-[165px_minmax(0,1fr)] lg:hover:border-teal/40">
        <div>
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-slate-500">{item.dates}</p>
          <p className="mt-1.5 text-xs text-slate-500">{item.location}</p>
        </div>

        <div>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-white transition group-hover:text-teal">{item.company}</h3>
              <p className="mt-1 text-xs font-semibold text-violet">{item.role}</p>
            </div>
            {item.featured && <span className="rounded-full border border-amber/30 bg-amber/10 px-3 py-1 text-xs font-bold text-amber">Current</span>}
          </div>

          <p className="mt-3 text-sm leading-6 text-slate-300">{item.summary}</p>

          <ul className="mt-4 grid gap-2.5 text-xs leading-5 text-slate-400">
            {item.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-white/[0.055] px-3 py-1 text-xs font-semibold text-slate-300">
                {tag}
              </span>
            ))}
          </div>

          {item.links && (
            <div className="mt-4 flex flex-wrap gap-4">
              {item.links.map((link) => (
                <a key={link.href} href={link.href} className="text-xs font-bold text-teal transition hover:text-white" {...externalLinkProps(link.href)}>
                  {link.label} <span aria-hidden="true">-&gt;</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </article>
    </StaggerItem>
  );
}
