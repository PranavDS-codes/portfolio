import { skillGroups } from "@/data/profile";
import { Stagger, StaggerItem } from "./Motion";

export function SkillGrid() {
  return (
    <Stagger className="grid gap-5 sm:grid-cols-2">
      {skillGroups.map((group) => (
        <StaggerItem key={group.title} className="border-b border-line pb-5">
          <h3 className="text-base font-bold text-white">{group.title}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <span key={skill} className="rounded-full border border-line bg-white/[0.035] px-2.5 py-1 text-xs text-slate-300">
                {skill}
              </span>
            ))}
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
