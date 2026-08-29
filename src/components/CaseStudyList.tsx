"use client";

import Link from "next/link";
import { caseStudies } from "@/data/profile";
import { Stagger, StaggerItem } from "./Motion";
import { useHoverSync } from "./HoverSyncProvider";

export function CaseStudyList() {
  const { hoveredSkill } = useHoverSync();

  return (
    <Stagger className="grid gap-6">
      {caseStudies.map((item) => {
        const hasMatchingSkill = hoveredSkill
          ? item.tags.some((tag) => tag.toLowerCase() === hoveredSkill.toLowerCase())
          : false;

        return (
          <StaggerItem key={item.slug}>
            <Link
              href={`/case-studies/${item.slug}`}
              className={`group block border-b py-6 transition-all duration-300 ${
                hasMatchingSkill
                  ? "border-amber/70 bg-amber/5 -translate-y-1 shadow-[0_4px_20px_rgba(251,191,36,0.08)] px-4 rounded-3xl"
                  : "border-line hover:border-amber/50"
              }`}
            >
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-amber">{item.meta}</p>
              <h3
                className={`mt-2 text-lg font-black tracking-tight transition duration-300 ${
                  hasMatchingSkill ? "text-amber" : "text-white group-hover:text-amber"
                }`}
              >
                {item.title}
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">{item.summary}</p>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-amber/10 px-3 py-1 text-xs font-semibold text-amber">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-bold text-amber transition group-hover:text-white">
                  Read case study <span aria-hidden="true">-&gt;</span>
                </span>
              </div>
            </Link>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
