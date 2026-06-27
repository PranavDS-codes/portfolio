"use client";

import { externalLinkProps } from "@/lib/utils";
import { StaggerItem } from "./Motion";
import { useHoverSync } from "./HoverSyncProvider";

type ProjectItemProps = {
  item: {
    title: string;
    meta: string;
    summary: string;
    bullets: string[];
    links: Array<{ label: string; href: string }>;
    tags: string[];
  };
};

export function ProjectItem({ item }: ProjectItemProps) {
  const { hoveredSkill } = useHoverSync();

  // Check if any tag of this project matches the hovered skill
  const hasMatchingSkill = hoveredSkill
    ? item.tags.some((tag) => tag.toLowerCase() === hoveredSkill.toLowerCase())
    : false;

  return (
    <StaggerItem>
      <article
        className={`group border-b py-6 transition-all duration-300 ${
          hasMatchingSkill
            ? "border-violet/70 bg-violet/5 -translate-y-1 shadow-[0_4px_20px_rgba(167,139,250,0.08)] px-4 rounded-3xl"
            : "border-line hover:border-violet/50"
        }`}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-violet">{item.meta}</p>
            <h3
              className={`mt-2 text-lg font-black tracking-tight transition duration-300 ${
                hasMatchingSkill ? "text-violet" : "text-white group-hover:text-violet"
              }`}
            >
              {item.title}
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {item.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full border border-line px-3 py-1.5 text-xs font-bold text-slate-300 transition hover:border-violet hover:text-white"
                {...externalLinkProps(link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">{item.summary}</p>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {item.bullets.map((bullet) => (
            <p key={bullet} className="rounded-2xl border border-line bg-white/[0.035] p-3 text-xs leading-5 text-slate-400">
              {bullet}
            </p>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((tag) => {
            const isTagMatch = hoveredSkill?.toLowerCase() === tag.toLowerCase();
            return (
              <span
                key={tag}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-all duration-300 ${
                  isTagMatch
                    ? "bg-violet text-ink font-bold shadow-[0_0_12px_rgba(167,139,250,0.5)]"
                    : "bg-violet/10 text-violet"
                }`}
              >
                {tag}
              </span>
            );
          })}
        </div>
      </article>
    </StaggerItem>
  );
}

