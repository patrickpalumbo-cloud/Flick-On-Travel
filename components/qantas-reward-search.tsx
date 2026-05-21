"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CalendarDays, ExternalLink, Plane, Search, ShieldCheck, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  buildQantasRewardFinderUrl,
  qantasDestinationOptions,
  qantasOriginOptions
} from "@/lib/qantas-reward-finder";

const cabinOptions = ["Any cabin", "Economy", "Premium Economy", "Business", "First"];
const passengerOptions = ["1 passenger", "2 passengers", "3 passengers", "4 passengers"];

export function QantasRewardSearch() {
  const [origin, setOrigin] = useState("SYD");
  const [destination, setDestination] = useState(";UK");
  const [cabin, setCabin] = useState(cabinOptions[0]);
  const [passengers, setPassengers] = useState(passengerOptions[0]);
  const [travelWindow, setTravelWindow] = useState("Any date");

  const qantasUrl = useMemo(() => buildQantasRewardFinderUrl({ origin, destination }), [destination, origin]);
  const originLabel = qantasOriginOptions.find((option) => option.value === origin)?.label ?? origin;
  const destinationOption = qantasDestinationOptions.find((option) => option.value === destination);
  const destinationLabel = destinationOption?.label ?? destination;

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 sm:pt-28 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brass">Reward seat finder</p>
          <h1 className="mt-3 font-serif text-5xl leading-none text-ink sm:text-7xl">Search Qantas rewards from Flick.</h1>
        </div>
        <p className="max-w-2xl text-lg leading-8 text-ink/66">
          Build a reward-flight search here, then open Qantas&apos; Flight Reward Finder with the route preloaded. Flick keeps the trip planning context; Qantas remains the booking source of truth.
        </p>
      </div>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="premium-panel p-5 sm:p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm text-ink/68">
              Departure
              <select value={origin} onChange={(event) => setOrigin(event.target.value)} className="focus-ring h-12 rounded-sm border border-black/10 bg-white px-4 text-ink">
                {qantasOriginOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label} ({option.value})
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm text-ink/68">
              Arrival
              <select value={destination} onChange={(event) => setDestination(event.target.value)} className="focus-ring h-12 rounded-sm border border-black/10 bg-white px-4 text-ink">
                {qantasDestinationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm text-ink/68">
              Cabin preference
              <select value={cabin} onChange={(event) => setCabin(event.target.value)} className="focus-ring h-12 rounded-sm border border-black/10 bg-white px-4 text-ink">
                {cabinOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm text-ink/68">
              Passengers
              <select value={passengers} onChange={(event) => setPassengers(event.target.value)} className="focus-ring h-12 rounded-sm border border-black/10 bg-white px-4 text-ink">
                {passengerOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm text-ink/68 md:col-span-2">
              Travel window
              <input value={travelWindow} onChange={(event) => setTravelWindow(event.target.value)} className="focus-ring h-12 rounded-sm border border-black/10 bg-white px-4 text-ink" placeholder="Any date, July 2026, school holidays..." />
            </label>
          </div>

          <div className="mt-6 rounded-sm border border-black/10 bg-white/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass">Native search summary</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <SearchPill icon={Plane} label="Route" value={`${originLabel} to ${destinationLabel}`} />
              <SearchPill icon={Sparkles} label="Cabin" value={cabin} />
              <SearchPill icon={CalendarDays} label="Window" value={`${travelWindow} · ${passengers}`} />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={qantasUrl} target="_blank" rel="noreferrer" className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-ink px-5 text-sm font-semibold text-ivory shadow-[0_18px_45px_rgba(23,19,15,0.16)] transition duration-300 hover:-translate-y-0.5 hover:bg-graphite">
              Search Qantas rewards <ExternalLink size={15} aria-hidden="true" />
            </a>
            <a href="/points" className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-black/10 bg-white px-5 text-sm font-semibold text-ink">
              Send to points desk <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>

        <aside className="grid gap-4">
          <div className="border border-brass/25 bg-[linear-gradient(135deg,#f7e9cd,#d8b979)] p-5 text-ink shadow-[0_24px_90px_rgba(184,150,87,0.18)]">
            <ShieldCheck size={21} aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-semibold">Why this opens Qantas</h2>
            <p className="mt-3 text-sm leading-7 text-black/68">
              Qantas controls live reward inventory, booking confirmation, taxes and seat release rules. Flick prepares the search and keeps your trip strategy clean, then sends you to Qantas to verify availability.
            </p>
          </div>

          <div className="premium-panel p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">Finder URL</p>
            <p className="mt-3 break-all rounded-sm bg-white/70 p-3 text-xs leading-5 text-ink/58">{qantasUrl}</p>
            <p className="mt-4 text-sm leading-7 text-ink/62">{destinationOption?.hint}</p>
          </div>
        </aside>
      </section>
    </section>
  );
}

function SearchPill({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="border border-black/10 bg-white p-4 shadow-[0_12px_30px_rgba(93,72,48,0.08)]">
      <Icon className="text-brass" size={17} aria-hidden="true" />
      <p className="mt-3 text-xs uppercase tracking-[0.18em] text-ink/42">{label}</p>
      <p className="mt-1 text-sm font-semibold text-ink">{value}</p>
    </div>
  );
}
