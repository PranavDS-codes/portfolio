import Image from "next/image";
import { profile } from "@/data/profile";
import { externalLinkProps } from "@/lib/utils";
import { ContactForm } from "./ContactForm";
import { FloatingNav } from "./FloatingNav";

export function IntroRail() {
  return (
    <aside className="scrollbar-clean md:sticky md:top-0 md:flex md:h-screen md:flex-col md:justify-between md:overflow-hidden md:py-7 md:pr-1 lg:py-10 lg:pr-2">
      <div className="md:shrink-0">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-line bg-panel md:h-14 md:w-14 lg:h-[4.5rem] lg:w-[4.5rem]">
            <Image src={profile.headshot} alt="Portrait of Pranav Pant" fill sizes="72px" className="object-cover object-[center_18%]" priority />
          </div>
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-teal">Portfolio</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-white md:text-[1.65rem] lg:text-3xl">{profile.name}</h1>
          </div>
        </div>

        <div className="mt-6 max-w-xl md:mt-4 lg:mt-6">
          <p className="text-base font-semibold text-slate-100">{profile.role}</p>
          <p className="mt-1.5 text-xs leading-5 text-slate-400">
            {profile.location} · {profile.status}
          </p>
          <p className="mt-4 text-sm leading-6 text-slate-300 md:mt-3 md:text-xs md:leading-5 lg:text-sm lg:leading-6">{profile.bio}</p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2 md:mt-4">
          {profile.focus.map((item, index) => (
            <span
              key={item}
              className={[
                "rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold",
                index === 0 && "border-teal/30 bg-teal/10 text-teal",
                index === 1 && "border-violet/30 bg-violet/10 text-violet",
                index === 2 && "border-amber/30 bg-amber/10 text-amber",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2.5 md:mt-4 lg:mt-6">
          <a
            href="#projects"
            className="rounded-full bg-teal px-4 py-2.5 text-xs font-bold text-ink transition hover:-translate-y-0.5 hover:bg-teal/90"
          >
            View Projects
          </a>
          <a
            href={profile.resumeUrl}
            className="rounded-full border border-line px-4 py-2.5 text-xs font-bold text-slate-200 transition hover:-translate-y-0.5 hover:border-violet hover:text-white"
            {...externalLinkProps(profile.resumeUrl)}
          >
            Resume
          </a>
        </div>

        <FloatingNav />
      </div>

      <div className="mt-8 border-t border-line pt-6 md:mt-4 md:shrink-0 md:pt-4 lg:mt-8 lg:pt-6">
        <div className="rounded-3xl border border-line bg-white/[0.035] p-4 md:p-3.5 lg:p-4">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-amber">Contact</p>
          <h2 className="mt-2 text-base font-bold text-white md:text-sm lg:text-base">Let&apos;s build something sharp</h2>
          <p className="mt-2 text-xs leading-5 text-slate-400 md:leading-4 lg:leading-5">
            I&apos;m especially interested in roles involving LLM infrastructure, retrieval systems, AI platform
            engineering, and applied ML research.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 md:mt-3 lg:mt-4">
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full bg-teal px-3.5 py-2 text-xs font-bold text-ink transition hover:-translate-y-0.5 hover:bg-teal/90"
            >
              Email Pranav
            </a>
            <a
              href={profile.resumeUrl}
              className="rounded-full border border-line px-3.5 py-2 text-xs font-bold text-slate-200 transition hover:-translate-y-0.5 hover:border-amber hover:text-white"
              {...externalLinkProps(profile.resumeUrl)}
            >
              Download Resume
            </a>
          </div>
        </div>
        <div className="md:hidden xl:block">
          <ContactForm />
        </div>
        <div className="mt-5 flex flex-wrap gap-3 text-xs text-slate-400">
          {profile.socials.map((social) => (
            <a key={social.href} href={social.href} className="transition hover:text-teal" {...externalLinkProps(social.href)}>
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
