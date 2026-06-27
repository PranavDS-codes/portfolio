import type { ReactNode } from "react";
import { Reveal } from "./Motion";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  intro?: string;
};

export function Section({ id, eyebrow, title, intro, children }: SectionProps) {
  return (
    <section id={id} data-section className="scroll-mt-8 py-10 first:pt-0 lg:py-14">
      <Reveal>
        <div className="mb-7 border-b border-line pb-5">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.28em] text-teal">{eyebrow}</p>
          <h2 className="mt-2 max-w-3xl text-xl font-black tracking-tight text-white sm:text-2xl">{title}</h2>
          {intro && <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">{intro}</p>}
        </div>
      </Reveal>
      {children}
    </section>
  );
}
