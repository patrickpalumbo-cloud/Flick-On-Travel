"use client";

import Link from "next/link";
import { ArrowRight, Building2, ExternalLink, Plane, Repeat2, Ticket, TrainFront, X } from "lucide-react";
import { qantasRewardFinderUrl } from "@/lib/qantas-reward-finder";
import { experiences, type City, type Itinerary } from "@/lib/trip-data";

export function ItineraryView({ itinerary, editable = false, cityOptions = [], onSwap, onDestinationChange, onNightChange, onExperienceRemove }: {
  itinerary: Itinerary;
  editable?: boolean;
  cityOptions?: City[];
  onSwap?: (cityId: string) => void;
  onDestinationChange?: (cityId: string, nextCityId: string) => void;
  onNightChange?: (cityId: string, nights: number) => void;
  onExperienceRemove?: (experienceId: string) => void;
}) {
  const selectedExperiences = itinerary.selectedExperiences ?? [];

  return (
    <div className="grid gap-8">
      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brass">Recommended route</p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-6xl">{itinerary.title}</h1>
        </div>
        <p className="self-end text-lg leading-8 text-ink/66">{itinerary.summary}</p>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {itinerary.cities.map((city, index) => (
          <article key={city.id} className="premium-panel p-5 transition duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-brass">Stop {index + 1}</p>
                <h2 className="mt-2 text-2xl font-semibold text-ink">{city.name}</h2>
                <p className="text-sm text-ink/54">{city.country}</p>
              </div>
              <span className="border border-black/10 bg-white/70 px-3 py-1 text-sm text-ink/70">{city.nights} nights</span>
            </div>
            <p className="mt-5 min-h-20 leading-7 text-ink/64">{city.headline}</p>
            {city.recommendationReason ? (
              <p className="mt-4 border-l-2 border-brass/50 bg-white/60 px-3 py-2 text-sm leading-6 text-ink/62">
                {city.recommendationReason}
              </p>
            ) : null}
            <Link
              href={`/destinations/${city.id}`}
              className="focus-ring mt-4 inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-brass transition hover:text-ink"
            >
              Destination guide <ArrowRight size={14} aria-hidden="true" />
            </Link>
            {selectedExperiences.filter((experience) => experience.cityId === city.id).length ? (
              <div className="mt-5 grid gap-2 border-y border-black/10 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass">Added experiences</p>
                {selectedExperiences
                  .filter((experience) => experience.cityId === city.id)
                  .map((experience) => (
                    <div key={experience.id} className="flex items-start justify-between gap-3 border border-black/10 bg-white/70 p-3">
                      <div>
                        <p className="text-sm font-semibold text-ink">{experience.title}</p>
                        <p className="mt-1 text-xs text-ink/52">{experience.category} · {experience.eyebrow}</p>
                      </div>
                      {editable ? (
                        <button
                          aria-label={`Remove ${experience.title}`}
                          className="focus-ring flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-black/10 text-ink/60 hover:bg-ink hover:text-ivory"
                          onClick={() => onExperienceRemove?.(experience.id)}
                        >
                          <X size={14} aria-hidden="true" />
                        </button>
                      ) : null}
                    </div>
                  ))}
              </div>
            ) : null}
            {experiences.filter((experience) => experience.cityId === city.id).length === 0 ? (
              <div className="mt-5 border-y border-black/10 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass">No curated experiences yet</p>
                <p className="mt-2 text-sm leading-6 text-ink/58">Suggested themes: {city.tags.slice(0, 3).join(", ")}</p>
              </div>
            ) : null}
            <div className="mt-5 grid gap-2">
              {city.activities.map((activity) => (
                <p key={activity} className="flex gap-2 text-sm text-ink/64">
                  <Ticket className="mt-0.5 shrink-0 text-brass" size={15} aria-hidden="true" />
                  {activity}
                </p>
              ))}
            </div>
            {editable ? (
              <div className="mt-6 grid gap-3">
                <label className="grid gap-2 text-sm text-ink/64">
                  Destination
                  <select
                    className="focus-ring h-11 rounded-sm border border-black/10 bg-white px-3 text-ink"
                    value={city.id}
                    onChange={(event) => onDestinationChange?.(city.id, event.target.value)}
                  >
                    {cityOptions.map((option) => (
                      <option
                        key={option.id}
                        value={option.id}
                        disabled={option.id !== city.id && itinerary.cities.some((selectedCity) => selectedCity.id === option.id)}
                      >
                        {option.name}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="flex items-center gap-3">
                  <button className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-sm border border-black/10 bg-white/70 px-3 text-sm transition hover:border-brass/70 hover:bg-white" onClick={() => onSwap?.(city.id)}>
                    <Repeat2 size={15} aria-hidden="true" />
                    Swap
                  </button>
                  <label className="flex items-center gap-2 text-sm text-ink/64">
                    Nights
                    <input
                      className="focus-ring h-11 w-16 rounded-sm border border-black/10 bg-white px-2 text-center text-ink"
                      type="number"
                      min={1}
                      max={7}
                      value={city.nights}
                      onChange={(event) => onNightChange?.(city.id, Number(event.target.value))}
                    />
                  </label>
                </div>
              </div>
            ) : null}
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <Building2 size={20} className="text-brass" aria-hidden="true" />
            <h2 className="text-2xl font-semibold text-ink">Recommended hotels</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {itinerary.cities.flatMap((city) =>
              city.hotels.slice(0, 1).map((hotel) => (
                <article key={`${city.id}-${hotel.name}`} className="border border-black/10 bg-white p-5 text-ink shadow-[0_24px_70px_rgba(93,72,48,0.12)] transition duration-300 hover:-translate-y-1">
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
            <h2 className="text-2xl font-semibold text-ink">Transport</h2>
          </div>
          <div className="grid gap-3">
            {itinerary.transport.map((option) => (
              <article key={`${option.from}-${option.to}`} className="premium-panel p-5">
                <p className="font-semibold text-ink">{option.from} to {option.to}</p>
                <p className="mt-2 text-sm text-brass">Distance: approx. {option.distanceKm}km</p>
                <div className="mt-3 grid gap-2 text-sm leading-6 text-ink/62">
                  <p>Train: {option.trainAvailable ? option.trainTime : "not available / not recommended"}</p>
                  {option.ferryTime ? <p>Ferry: {option.ferryTime}</p> : null}
                  <p>Flight: {option.flightTime}</p>
                  <p className="font-semibold text-ink">Recommended: {option.recommended}</p>
                </div>
                <p className="mt-3 text-xs leading-5 text-ink/48">{option.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-panel p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brass">Route timeline</p>
        <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center">
          {itinerary.cities.map((city, index) => (
            <div key={city.id} className="flex items-center gap-3">
              <div className="border border-black/10 bg-white px-4 py-3 shadow-[0_12px_30px_rgba(93,72,48,0.08)]">
                <p className="text-xs uppercase tracking-[0.16em] text-black/45">Destination {index + 1}</p>
                <p className="font-semibold text-ink">{city.name}</p>
              </div>
              {index < itinerary.cities.length - 1 ? <ArrowRight className="hidden text-brass md:block" size={18} aria-hidden="true" /> : null}
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col justify-between gap-4 border border-brass/30 bg-[linear-gradient(135deg,#f7e9cd,#d8b979)] px-5 py-6 text-ink shadow-[0_24px_90px_rgba(184,150,87,0.18)] md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-semibold">Optimise this trip with points</h2>
          <p className="mt-2 text-black/68">Send your route for cabin, hotel and transfer-partner strategy.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link href="/points" className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-ink px-5 text-sm font-semibold text-ivory">
            Start enquiry <Plane size={16} aria-hidden="true" />
          </Link>
          <a href={qantasRewardFinderUrl} target="_blank" rel="noreferrer" className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-black/10 bg-white/80 px-5 text-sm font-semibold text-ink">
            Check Qantas rewards <ExternalLink size={15} aria-hidden="true" />
          </a>
        </div>
      </section>

      {!editable ? (
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/customise" className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-ink px-5 text-sm font-semibold text-ivory shadow-[0_18px_45px_rgba(23,19,15,0.16)]">
            Customise itinerary <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link href="/waitlist" className="focus-ring inline-flex min-h-12 items-center justify-center rounded-sm border border-black/10 bg-white/70 px-5 text-sm font-semibold text-ink">
            Save my trip
          </Link>
        </div>
      ) : null}
    </div>
  );
}
