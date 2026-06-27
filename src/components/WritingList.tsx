import { writing } from "@/data/profile";
import { Stagger, StaggerItem } from "./Motion";

export function WritingList() {
  return (
    <Stagger className="grid gap-0">
      {writing.map((post) => (
        <StaggerItem key={post.title}>
          <article className="grid gap-3 border-b border-line py-5 sm:grid-cols-[130px_minmax(0,1fr)]">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-amber">{post.date}</p>
            <div>
              <h3 className="text-base font-bold text-white">{post.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{post.summary}</p>
            </div>
          </article>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
