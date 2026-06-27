"use client";

import { navItems } from "@/data/profile";
import { cn } from "@/lib/utils";
import { useActiveSection } from "./ActiveSectionProvider";

export function FloatingNav() {
  const { activeSection } = useActiveSection();

  return (
    <nav aria-label="Section navigation" className="hidden md:block">
      <ul className="mt-7 grid gap-2.5 md:mt-5 md:gap-2 lg:mt-7 lg:gap-2.5">
        {navItems.map((item) => {
          const id = item.href.replace("#", "");
          const isActive = activeSection === id;

          return (
            <li key={item.href}>
              <a
                href={item.href}
                className={cn(
                  "group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.24em] transition",
                  isActive ? "text-white" : "text-slate-500 hover:text-slate-200",
                )}
              >
                <span
                  className={cn(
                    "h-px rounded-full transition-all",
                    isActive ? "w-12 bg-teal" : "w-7 bg-slate-700 group-hover:w-10 group-hover:bg-slate-300",
                  )}
                />
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
