"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type ActiveSectionContextValue = {
  activeSection: string;
};

const ActiveSectionContext = createContext<ActiveSectionContextValue>({
  activeSection: "experience",
});

export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState("experience");

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const value = useMemo(() => ({ activeSection }), [activeSection]);

  return <ActiveSectionContext.Provider value={value}>{children}</ActiveSectionContext.Provider>;
}

export function useActiveSection() {
  return useContext(ActiveSectionContext);
}
