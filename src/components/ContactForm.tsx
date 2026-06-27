"use client";

import { useState, type FormEvent } from "react";

const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "";

type FormState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!endpoint) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    setState("loading");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      form.reset();
      setState("success");
    } catch {
      setState("error");
    }
  }

  const disabled = !endpoint || state === "loading";

  return (
    <form onSubmit={handleSubmit} className="mt-4 rounded-3xl border border-line bg-white/[0.035] p-4 shadow-glow backdrop-blur">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-teal">Message</p>
          <h2 className="mt-1 text-sm font-semibold text-white">Send a quick note</h2>
        </div>
        <span className="h-2 w-2 rounded-full bg-teal shadow-[0_0_18px_rgba(45,212,191,0.9)]" />
      </div>

      <div className="grid gap-2.5">
        <label className="grid gap-1.5 text-xs text-slate-300">
          Name
          <input
            required
            name="name"
            autoComplete="name"
            disabled={!endpoint}
            className="rounded-2xl border border-line bg-ink/70 px-3 py-2.5 text-xs text-white outline-none transition placeholder:text-slate-600 focus:border-teal disabled:cursor-not-allowed disabled:opacity-60"
            placeholder="Your name"
          />
        </label>

        <label className="grid gap-1.5 text-xs text-slate-300">
          Email
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            disabled={!endpoint}
            className="rounded-2xl border border-line bg-ink/70 px-3 py-2.5 text-xs text-white outline-none transition placeholder:text-slate-600 focus:border-teal disabled:cursor-not-allowed disabled:opacity-60"
            placeholder="you@example.com"
          />
        </label>

        <label className="grid gap-1.5 text-xs text-slate-300">
          Message
          <textarea
            required
            name="message"
            rows={3}
            disabled={!endpoint}
            className="resize-none rounded-2xl border border-line bg-ink/70 px-3 py-2.5 text-xs text-white outline-none transition placeholder:text-slate-600 focus:border-teal disabled:cursor-not-allowed disabled:opacity-60"
            placeholder="Tell me what you are building..."
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="mt-3 w-full rounded-2xl border border-teal/40 bg-teal px-3 py-2.5 text-xs font-bold text-ink transition hover:-translate-y-0.5 hover:bg-teal/90 disabled:cursor-not-allowed disabled:border-line disabled:bg-slate-800 disabled:text-slate-500 disabled:hover:translate-y-0"
      >
        {state === "loading" ? "Sending..." : "Send message"}
      </button>

      {!endpoint && (
        <p className="mt-3 text-xs leading-5 text-amber">
          Add NEXT_PUBLIC_FORMSPREE_ENDPOINT in Vercel to enable submissions.
        </p>
      )}
      {state === "success" && <p className="mt-3 text-xs leading-5 text-teal">Message sent. I will get back to you soon.</p>}
      {state === "error" && <p className="mt-3 text-xs leading-5 text-rose-300">Something failed. Email me directly for now.</p>}
    </form>
  );
}
