"use client";

import Link from "next/link";
import { ArrowRight, Building2, Plane, Repeat2, Ticket, TrainFront } from "lucide-react";
import type { Itinerary } from "@/lib/trip-data";

export function ItineraryView({ itinerary, editable = false, onSwap, onNightChange }: {
  itinerary: Itinerary;
  editable?: boolean;
  onSwap?: (cityId: string) => void;
  onNightChange?: (cityId: string, nights: number) => void;
}) {
  return (
    <div className="grid gap-8">
      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brass">Recommended route</p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-white sm:text-6xl">{itinerary.title}</h1>
        </div>
        <p className="self-end text-lg leading-8 text-ivory/72">{itinerary.summary}</p>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {itinerary.cities.map((city, index) => (
          <article key={city.id} className="border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-brass">Stop {index + 1}</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">{city.name}</h2>
                <p className="text-sm text-ivory/55">{city.country}</p>
              </div>
              <span className="border border-white/10 px-3 py-1 text-sm text-ivory/75">{city.nights} nights</span>
            </div>
            <p className="mt-5 min-h-20 leading-7 text-ivory/72">{city.headline}</p>
            <div className="mt-5 grid gap-2">
              {city.activities.map((activity) => (
                <p key={activity} className="flex gap-2 text-sm text-ivory/72">
                  <Ticket className="mt-0.5 shrink-0 text-brass" size={15} aria-hidden="true" />
                  {activity}
                </p>
              ))}
            </div>
            {editable ? (
              <div className="mt-6 flex items-center gap-3">
                <button className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-sm border border-white/15 px-3 text-sm" onClick={() => onSwap?.(city.id)}>
                  <Repeat2 size={15} aria-hidden="true" />
                  Swap
                </button>
                <label className="flex items-center gap-2 text-sm text-ivory/70">
                  Nights
                  <input
                    className="focus-ring h-10 w-16 rounded-sm border border-white/15 bg-white px-2 text-center text-ink"
                    type="number"
                    min={1}
                    max={7}
                    value={city.nights}
                    onChange={(event) => onNightChange?.(city.id, Number(event.target.value))}
                  />
                </label>
              </div>
            ) : null}
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <Building2 size={20} className="text-brass" aria-hidden="true" />
            <h2 className="text-2xl font-semibold text-white">Recommended hotels</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {itinerary.cities.flatMap((city) =>
              city.hotels.slice(0, 1).map((hotel) => (
                <article key={`${city.id}-${hotel.name}`} className="border border-white/10 bg-ivory p-5 text-ink">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/48">{city.name}</p>
                  <h3 className="mt-3 text-xl font-semibold">{hotel.name}</h3>
                  <p className="mt-1 text-sm text-black/52">{hotel.tier}</p>
                  <p className="mt-4 leading-7 text-black/66">{hotel.note}</p>
                  <p className="mt-4 border-t border-black/10 pt-4 text-sm font-semibold text-black">{hotel.pointsHint}</p>
                </article>
              ))
            )}
          </div>
        </div>

        <div>
          <div className="mb-5 flex items-center gap-3">
            <TrainFront size={20} className="text-brass" aria-hidden="true" />
            <h2 className="text-2xl font-semibold text-white">Transport</h2>
          </div>
          <div className="grid gap-3">
            {itinerary.transport.map((option) => (
              <article key={`${option.from}-${option.to}`} className="border border-white/10 bg-white/[0.04] p-5">
                <p className="font-semibold text-white">{option.from} to {option.to}</p>
                <p className="mt-2 text-sm text-brass">{option.mode} · {option.duration}</p>
                <p className="mt-3 text-sm leading-6 text-ivory/65">{option.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-between gap-4 border border-brass/40 bg-brass px-5 py-6 text-ink md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-semibold">Optimise this trip with points</h2>
          <p className="mt-2 text-black/68">Send your route for cabin, hotel and transfer-partner strategy.</p>
        </div>
        <Link href="/points" className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-ink px-5 text-sm font-semibold text-ivory">
          Start enquiry <Plane size={16} aria-hidden="true" />
        </Link>
      </section>

      {!editable ? (
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/customise" className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-ivory px-5 text-sm font-semibold text-ink">
            Customise itinerary <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link href="/waitlist" className="focus-ring inline-flex min-h-12 items-center justify-center rounded-sm border border-white/15 px-5 text-sm font-semibold text-ivory">
            Save my trip
          </Link>
        </div>
      ) : null}
    </div>
  );
}
