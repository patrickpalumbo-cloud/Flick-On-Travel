"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, SlidersHorizontal, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { TripShell } from "@/components/trip-shell";
import { discoveryInterests, recommendDestinations, type DiscoveryInterest } from "@/lib/destination-discovery";
import { getDestinationGuide } from "@/lib/destination-guides";

const defaultInterests: DiscoveryInterest[] = ["sports", "luxury"];

export default function DiscoverPage() {
  const [selected, setSelected] = useState<DiscoveryInterest[]>(defaultInterests);
  const recommendations = useMemo(() => recommendDestinations(selected), [selected]);
  const heroRecommendation = recommendations[0];

  function toggleInterest(interest: DiscoveryInterest) {
    setSelected((current) => (current.includes(interest) ? current.filter((item) => item !== interest) : [...current, interest]));
  }

  return (
    <TripShell>
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 sm:pt-28 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brass">Smart discovery</p>
            <h1 className="mt-3 font-serif text-5xl leading-none text-white sm:text-7xl">Find the destination that fits the brief.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ivory/70">
              Choose the signals that matter and Flick On Travel ranks destinations with curated reasoning, not generic listicles.
            </p>
          </div>

          {heroRecommendation ? (
            <div className="premium-panel p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-brass">Top match</p>
                  <h2 className="mt-2 font-serif text-4xl text-white">{heroRecommendation.city.name}</h2>
                </div>
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-brass bg-black/30 text-2xl font-semibold text-brass">
                  {heroRecommendation.matchPercent}%
                </div>
              </div>
              <p className="mt-5 leading-7 text-ivory/68">{heroRecommendation.reasons[0]}</p>
            </div>
          ) : null}
        </div>

        <section className="mt-10 border-y border-white/10 py-6">
          <div className="mb-5 flex items-center gap-3">
            <SlidersHorizontal className="text-brass" size={19} aria-hidden="true" />
            <h2 className="text-xl font-semibold text-white">Your travel signals</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {discoveryInterests.map((interest) => {
              const active = selected.includes(interest.id);
              return (
                <button
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={`focus-ring min-h-28 rounded-sm border p-4 text-left transition duration-300 hover:-translate-y-0.5 ${
                    active ? "border-brass bg-brass text-ink" : "border-white/10 bg-white/[0.04] text-ivory hover:border-brass/60"
                  }`}
                >
                  <span className="flex items-center justify-between gap-4">
                    <span className="font-semibold">{interest.label}</span>
                    {active ? <Check size={18} aria-hidden="true" /> : null}
                  </span>
                  <span className={`mt-3 block text-sm leading-6 ${active ? "text-black/68" : "text-ivory/58"}`}>{interest.description}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-10 grid gap-5">
          {recommendations.map((recommendation, index) => {
            const guide = getDestinationGuide(recommendation.city.id);
            return (
              <article key={recommendation.city.id} className="premium-panel overflow-hidden">
                <div className="grid gap-0 lg:grid-cols-[0.48fr_0.52fr]">
                  <div className="relative min-h-72">
                    {guide ? <Image src={guide.image} alt={guide.imageAlt} fill className="object-cover" /> : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">Recommendation {index + 1}</p>
                      <h2 className="mt-2 font-serif text-5xl text-white">{recommendation.city.name}</h2>
                      <p className="mt-1 text-sm text-ivory/62">{recommendation.city.country} · {recommendation.city.region}</p>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                      <div>
                        <p className="text-sm text-brass">Curated for {labelFor(recommendation.strongestInterest)}</p>
                        <p className="mt-3 max-w-2xl text-lg leading-8 text-ivory/74">{recommendation.city.headline}</p>
                      </div>
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/30 text-xl font-semibold text-white">
                        {recommendation.matchPercent}%
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3">
                      {recommendation.reasons.map((reason) => (
                        <p key={reason} className="flex gap-3 border-t border-white/10 pt-3 text-sm leading-6 text-ivory/66">
                          <Sparkles className="mt-1 shrink-0 text-brass" size={15} aria-hidden="true" />
                          {reason}
                        </p>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <Link href={`/destinations/${recommendation.city.id}`} className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-ivory px-4 text-sm font-semibold text-ink transition hover:bg-white">
                        Open destination <ArrowRight size={15} aria-hidden="true" />
                      </Link>
                      <Link href="/quiz" className="focus-ring inline-flex min-h-11 items-center justify-center rounded-sm border border-white/15 px-4 text-sm font-semibold text-ivory transition hover:border-brass/70">
                        Build a trip
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </section>
    </TripShell>
  );
}

function labelFor(interest: DiscoveryInterest) {
  return discoveryInterests.find((item) => item.id === interest)?.label.toLowerCase() ?? interest;
}
