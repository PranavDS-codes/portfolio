"use client";
import { createContext, useContext, useState, useMemo, type ReactNode } from "react";

type HoverSyncContextValue = {
  hoveredSkill: string | null;
  setHoveredSkill: (skill: string | null) => void;
};

const HoverSyncContext = createContext<HoverSyncContextValue>({
  hoveredSkill: null,
  setHoveredSkill: () => {},
});

export function HoverSyncProvider({ children }: { children: ReactNode }) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const value = useMemo(() => ({ hoveredSkill, setHoveredSkill }), [hoveredSkill]);

  return <HoverSyncContext.Provider value={value}>{children}</HoverSyncContext.Provider>;
}

export function useHoverSync() {
  return useContext(HoverSyncContext);
}
