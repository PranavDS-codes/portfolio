"use client";

import { skillGroups } from "@/data/profile";
import { Stagger, StaggerItem } from "./Motion";
import { useHoverSync } from "./HoverSyncProvider";

export function SkillGrid() {
  const { hoveredSkill, setHoveredSkill } = useHoverSync();

  return (
    <Stagger className="grid gap-5 sm:grid-cols-2">
      {skillGroups.map((group) => (
        <StaggerItem key={group.title} className="border-b border-line pb-5">
          <h3 className="text-base font-bold text-white">{group.title}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {group.skills.map((skill) => {
              const isHovered = hoveredSkill?.toLowerCase() === skill.toLowerCase();
              return (
                <span
                  key={skill}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className={`cursor-default rounded-full border px-2.5 py-1 text-xs transition duration-200 ${
                    isHovered
                      ? "border-teal bg-teal/10 text-teal shadow-[0_0_12px_rgba(45,212,191,0.2)]"
                      : "border-line bg-white/[0.035] text-slate-300"
                  }`}
                >
                  {skill}
                </span>
              );
            })}
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

