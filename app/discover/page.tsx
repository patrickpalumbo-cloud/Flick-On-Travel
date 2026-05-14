"use client";

import Link from "next/link";
import { ArrowRight, Check, SlidersHorizontal, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { TripShell } from "@/components/trip-shell";
import { DestinationGallery } from "@/components/destination-gallery";
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
            <h1 className="mt-3 font-serif text-5xl leading-none text-ink sm:text-7xl">Find the destination that fits the brief.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/66">
              Choose the signals that matter and Flick On Travel ranks destinations with curated reasoning, not generic listicles.
            </p>
          </div>

          {heroRecommendation ? (
            <div className="premium-panel p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-brass">Top match</p>
                  <h2 className="mt-2 font-serif text-4xl text-ink">{heroRecommendation.city.name}</h2>
                </div>
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-brass/45 bg-white text-2xl font-semibold text-brass shadow-[0_18px_45px_rgba(93,72,48,0.12)]">
                  {heroRecommendation.matchPercent}%
                </div>
              </div>
              <p className="mt-5 leading-7 text-ink/64">{heroRecommendation.reasons[0]}</p>
            </div>
          ) : null}
        </div>

        <section className="mt-10 border-y border-black/10 py-6">
          <div className="mb-5 flex items-center gap-3">
            <SlidersHorizontal className="text-brass" size={19} aria-hidden="true" />
            <h2 className="text-xl font-semibold text-ink">Your travel signals</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {discoveryInterests.map((interest) => {
              const active = selected.includes(interest.id);
              return (
                <button
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={`focus-ring min-h-28 rounded-sm border p-4 text-left transition duration-300 hover:-translate-y-0.5 ${
                    active ? "border-brass bg-brass text-ink shadow-[0_18px_45px_rgba(184,150,87,0.18)]" : "border-black/10 bg-white/70 text-ink shadow-[0_18px_45px_rgba(93,72,48,0.08)] hover:border-brass/60"
                  }`}
                >
                  <span className="flex items-center justify-between gap-4">
                    <span className="font-semibold">{interest.label}</span>
                    {active ? <Check size={18} aria-hidden="true" /> : null}
                  </span>
                  <span className={`mt-3 block text-sm leading-6 ${active ? "text-black/68" : "text-ink/58"}`}>{interest.description}</span>
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
                  <div>
                    {guide ? (
                      <DestinationGallery images={guide.gallery} title={`${recommendation.city.name} · Recommendation ${index + 1}`} variant="card" />
                    ) : null}
                  </div>

                  <div className="p-5 sm:p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">Recommendation {index + 1}</p>
                    <h2 className="mt-2 font-serif text-5xl text-ink">{recommendation.city.name}</h2>
                    <p className="mt-1 text-sm text-ink/58">{recommendation.city.country} · {recommendation.city.region}</p>
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                      <div>
                        <p className="text-sm text-brass">Curated for {labelFor(recommendation.strongestInterest)}</p>
                        <p className="mt-3 max-w-2xl text-lg leading-8 text-ink/66">{recommendation.city.headline}</p>
                      </div>
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-brass/35 bg-white text-xl font-semibold text-ink shadow-[0_18px_45px_rgba(93,72,48,0.12)]">
                        {recommendation.matchPercent}%
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3">
                      {recommendation.reasons.map((reason) => (
                        <p key={reason} className="flex gap-3 border-t border-black/10 pt-3 text-sm leading-6 text-ink/62">
                          <Sparkles className="mt-1 shrink-0 text-brass" size={15} aria-hidden="true" />
                          {reason}
                        </p>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <Link href={`/destinations/${recommendation.city.id}`} className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-ink px-4 text-sm font-semibold text-ivory shadow-[0_18px_45px_rgba(23,19,15,0.16)] transition hover:bg-graphite">
                        Open destination <ArrowRight size={15} aria-hidden="true" />
                      </Link>
                      <Link href="/quiz" className="focus-ring inline-flex min-h-11 items-center justify-center rounded-sm border border-black/12 bg-white/70 px-4 text-sm font-semibold text-ink transition hover:border-brass/70 hover:bg-white">
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
