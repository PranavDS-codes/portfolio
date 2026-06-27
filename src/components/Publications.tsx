"use client";

import { useState } from "react";
import { publications } from "@/data/profile";
import { Stagger, StaggerItem } from "./Motion";
import { useHoverSync } from "./HoverSyncProvider";
import { externalLinkProps } from "@/lib/utils";

export function Publications() {
  const { hoveredSkill } = useHoverSync();
  const [expandedAbstract, setExpandedAbstract] = useState<number | null>(null);

  return (
    <Stagger className="grid gap-6">
      {publications.map((pub, idx) => {
        const hasMatchingSkill = hoveredSkill
          ? pub.tags.some((tag) => tag.toLowerCase() === hoveredSkill.toLowerCase())
          : false;

        const isExpanded = expandedAbstract === idx;

        return (
          <StaggerItem key={pub.title}>
            <article
              className={`group border-b py-6 transition-all duration-300 ${
                hasMatchingSkill
                  ? "border-teal/70 bg-teal/5 -translate-y-1 shadow-[0_4px_20px_rgba(45,212,191,0.08)] px-4 rounded-3xl"
                  : "border-line hover:border-teal/40"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-teal">
                      {pub.venue} · {pub.year}
                    </span>
                    {pub.note && (
                      <span className="rounded-full bg-amber/10 px-2 py-0.5 text-[0.6rem] font-bold text-amber">
                        {pub.note}
                      </span>
                    )}
                  </div>
                  <h3
                    className={`mt-2 text-base font-bold transition duration-300 ${
                      hasMatchingSkill ? "text-teal" : "text-white group-hover:text-teal"
                    }`}
                  >
                    {pub.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">{pub.authors}</p>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  <button
                    onClick={() => setExpandedAbstract(isExpanded ? null : idx)}
                    className="rounded-full border border-line px-3 py-1.5 text-xs font-bold text-slate-300 transition hover:border-teal hover:text-white"
                  >
                    {isExpanded ? "Hide Abstract" : "View Abstract"}
                  </button>
                  {pub.doi && (
                    <a
                      href={pub.doi}
                      className="rounded-full border border-line px-3 py-1.5 text-xs font-bold text-slate-300 transition hover:border-teal hover:text-white"
                      {...externalLinkProps(pub.doi)}
                    >
                      DOI / Publisher
                    </a>
                  )}
                </div>
              </div>

              {isExpanded && (
                <div className="mt-4 rounded-2xl border border-line bg-white/[0.02] p-4 text-xs leading-5 text-slate-400">
                  <p className="font-semibold text-slate-200 mb-1">Abstract:</p>
                  {pub.abstract}
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                {pub.tags.map((tag) => {
                  const isTagMatch = hoveredSkill?.toLowerCase() === tag.toLowerCase();
                  return (
                    <span
                      key={tag}
                      className={`rounded-full px-2.5 py-0.5 text-[0.68rem] font-semibold transition-all duration-300 ${
                        isTagMatch
                          ? "bg-teal text-ink font-bold shadow-[0_0_10px_rgba(45,212,191,0.5)]"
                          : "bg-white/[0.055] text-slate-400"
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
      })}
    </Stagger>
  );
}
