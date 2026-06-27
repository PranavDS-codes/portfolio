"use client";

import { externalLinkProps } from "@/lib/utils";
import { StaggerItem } from "./Motion";
import { useHoverSync } from "./HoverSyncProvider";

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
  const { hoveredSkill } = useHoverSync();

  const hasMatchingSkill = hoveredSkill
    ? item.tags.some((tag) => tag.toLowerCase() === hoveredSkill.toLowerCase())
    : false;

  return (
    <StaggerItem>
      <article
        className={`group grid gap-4 border-b py-6 transition-all duration-300 lg:grid-cols-[165px_minmax(0,1fr)] ${
          hasMatchingSkill
            ? "border-teal/70 bg-teal/5 -translate-y-1 shadow-[0_4px_20px_rgba(45,212,191,0.08)] px-4 rounded-3xl"
            : "border-line lg:hover:border-teal/40"
        }`}
      >
        <div>
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-slate-500">{item.dates}</p>
          <p className="mt-1.5 text-xs text-slate-500">{item.location}</p>
        </div>

        <div>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3
                className={`text-lg font-bold transition duration-300 ${
                  hasMatchingSkill ? "text-teal" : "text-white group-hover:text-teal"
                }`}
              >
                {item.company}
              </h3>
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
            {item.tags.map((tag) => {
              const isTagMatch = hoveredSkill?.toLowerCase() === tag.toLowerCase();
              return (
                <span
                  key={tag}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-all duration-300 ${
                    isTagMatch
                      ? "bg-teal text-ink font-bold shadow-[0_0_12px_rgba(45,212,191,0.5)]"
                      : "bg-white/[0.055] text-slate-300"
                  }`}
                >
                  {tag}
                </span>
              );
            })}
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

