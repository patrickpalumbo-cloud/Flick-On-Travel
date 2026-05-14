"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { readItinerary, readPreferences } from "@/lib/storage";

type LeadFormProps = {
  type: "waitlist" | "points";
  title: string;
  intro: string;
  showPoints?: boolean;
};

export function LeadForm({ type, title, intro, showPoints = false }: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
        pointsBalance: formData.get("pointsBalance"),
        preferences: readPreferences(),
        itinerary: readItinerary()
      })
    });

    const result = await response.json();
    if (!response.ok) {
      setStatus("error");
      setMessage(result.error ?? "Something went wrong.");
      return;
    }

    setStatus("done");
    setMessage(result.configured ? "You're in. We'll follow up with a polished route." : "Saved locally for now. Add Supabase keys to persist leads.");
  }

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <div className="mb-8 h-px w-32 bg-brass" />
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-brass">{type === "points" ? "Points desk" : "Waitlist"}</p>
      <h1 className="font-serif text-4xl leading-tight text-ink sm:text-6xl">{title}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/68">{intro}</p>

      <form onSubmit={submit} className="premium-panel mt-10 grid gap-4 p-5 sm:p-6">
        <label className="grid gap-2 text-sm text-ink/68">
          Name
          <input name="name" className="focus-ring h-12 rounded-sm border border-black/10 bg-white px-4 text-ink shadow-[inset_0_1px_rgba(255,255,255,0.8)]" placeholder="Your name" />
        </label>
        <label className="grid gap-2 text-sm text-ink/68">
          Email
          <input required name="email" type="email" className="focus-ring h-12 rounded-sm border border-black/10 bg-white px-4 text-ink shadow-[inset_0_1px_rgba(255,255,255,0.8)]" placeholder="you@example.com" />
        </label>
        {showPoints ? (
          <label className="grid gap-2 text-sm text-ink/68">
            Points balance or programs
            <input name="pointsBalance" className="focus-ring h-12 rounded-sm border border-black/10 bg-white px-4 text-ink shadow-[inset_0_1px_rgba(255,255,255,0.8)]" placeholder="Amex 180k, Qantas 90k, Chase 120k" />
          </label>
        ) : null}
        <label className="grid gap-2 text-sm text-ink/68">
          Notes
          <textarea name="message" className="focus-ring min-h-32 rounded-sm border border-black/10 bg-white px-4 py-3 text-ink shadow-[inset_0_1px_rgba(255,255,255,0.8)]" placeholder="Dates, event goals, hotel style, cabin preference..." />
        </label>
        <button
          disabled={status === "loading"}
          className="focus-ring mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-ink px-5 py-3 text-sm font-semibold text-ivory shadow-[0_18px_45px_rgba(23,19,15,0.16)] transition duration-300 hover:-translate-y-0.5 hover:bg-graphite disabled:cursor-wait disabled:opacity-70"
        >
          {status === "loading" ? "Sending" : type === "points" ? "Send points enquiry" : "Join the waitlist"}
          <ArrowRight size={17} aria-hidden="true" />
        </button>
      </form>

      {message ? (
        <p className={`mt-5 flex items-center gap-2 text-sm ${status === "error" ? "text-red-700" : "text-emerald-700"}`}>
          {status === "done" ? <CheckCircle2 size={17} aria-hidden="true" /> : null}
          {message}
        </p>
      ) : null}
    </section>
  );
}
