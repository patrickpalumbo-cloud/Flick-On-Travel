"use client";

import { useMemo, useState } from "react";
import type { PointerEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Heart, RotateCcw, X } from "lucide-react";
import { TripShell } from "@/components/trip-shell";
import {
  budgets,
  buildItinerary,
  cities,
  countries,
  countryRegions,
  defaultPreferences,
  experiences,
  gemPreferences,
  interests,
  paces,
  sports,
  travelStyles,
  allCountryRegions,
  type City,
  type CountryName,
  type Experience,
  type Interest,
  type Pace,
  type Sport,
  type TripPreferences
} from "@/lib/trip-data";
import { writeItinerary, writePreferences } from "@/lib/storage";

type Step = "country" | "region" | "length" | "destinations" | "budget" | "interests" | "experiences" | "sports" | "style" | "pace" | "gems";
const steps: Step[] = ["country", "region", "length", "destinations", "budget", "interests", "experiences", "sports", "style", "pace", "gems"];

export default function QuizPage() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [preferences, setPreferences] = useState<TripPreferences>(defaultPreferences);
  const step = steps[stepIndex];
  const progress = Math.round(((stepIndex + 1) / steps.length) * 100);

  const preview = useMemo(() => buildItinerary(preferences), [preferences]);
  const destinationCards = useMemo(
    () => cities.filter((city) => city.country === preferences.country && (preferences.countryRegion === allCountryRegions || city.countryRegion === preferences.countryRegion)),
    [preferences.country, preferences.countryRegion]
  );
  const experienceCards = useMemo(() => {
    const regionCityIds = new Set(destinationCards.map((city) => city.id));
    return experiences.filter((experience) => regionCityIds.has(experience.cityId));
  }, [destinationCards]);

  function toggleInterest(interest: Interest) {
    setPreferences((current) => ({
      ...current,
      interests: current.interests.includes(interest) ? current.interests.filter((item) => item !== interest) : [...current.interests, interest]
    }));
  }

  function toggleSport(sport: Sport) {
    setPreferences((current) => ({
      ...current,
      sports: current.sports.includes(sport) ? current.sports.filter((item) => item !== sport) : [...current.sports, sport]
    }));
  }

  function chooseDestination(cityId: string, liked: boolean) {
    setPreferences((current) => ({
      ...current,
      destinationLikes: liked ? Array.from(new Set([...current.destinationLikes, cityId])) : current.destinationLikes.filter((id) => id !== cityId)
    }));
  }

  function chooseExperience(experienceId: string, liked: boolean) {
    setPreferences((current) => ({
      ...current,
      experienceLikes: liked ? Array.from(new Set([...current.experienceLikes, experienceId])) : current.experienceLikes.filter((id) => id !== experienceId)
    }));
  }

  function resetDestinationLikes() {
    setPreferences((current) => ({ ...current, destinationLikes: [], experienceLikes: [] }));
  }

  function resetExperienceLikes() {
    setPreferences((current) => ({ ...current, experienceLikes: [] }));
  }

  function next() {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
      return;
    }

    const itinerary = buildItinerary(preferences);
    writePreferences(preferences);
    writeItinerary(itinerary);
    router.push("/itinerary");
  }

  return (
    <TripShell>
      <section className="mx-auto grid min-h-screen max-w-7xl gap-8 px-4 pb-10 pt-24 sm:px-6 sm:pt-28 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brass">Trip quiz</p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-6xl">Swipe into the right kind of escape.</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-ink/66">Pick fast. The route can be customised after the first recommendation.</p>
          <div className="mt-8 h-1 overflow-hidden bg-black/10">
            <div className="h-full bg-brass transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-ink/45">Step {stepIndex + 1} of {steps.length}</p>
        </div>

        <div className="premium-panel self-center p-3 sm:p-5">
          <div className="min-h-[430px] bg-white/80 p-5 text-ink shadow-[inset_0_1px_rgba(255,255,255,0.65)] sm:p-8">
            {step === "country" ? (
              <Panel title="Which country should we build around?">
                <OptionGrid
                  items={countries}
                  selected={[preferences.country]}
                  onSelect={(country) => setPreferences({ ...preferences, country, region: regionForCountry(country), countryRegion: allCountryRegions, destinationLikes: [], experienceLikes: [] })}
                />
              </Panel>
            ) : null}

            {step === "region" ? (
              <Panel title="Which region should we prioritise?">
                <OptionGrid
                  items={countryRegions[preferences.country] ?? [allCountryRegions]}
                  selected={[preferences.countryRegion]}
                  onSelect={(countryRegion) => setPreferences({ ...preferences, countryRegion, destinationLikes: [], experienceLikes: [] })}
                />
              </Panel>
            ) : null}

            {step === "length" ? (
              <Panel title="How long is the trip?">
                <NumberPanel
                  label="Nights"
                  value={preferences.tripLength}
                  min={3}
                  max={14}
                  onChange={(tripLength) => setPreferences({ ...preferences, tripLength })}
                />
              </Panel>
            ) : null}

            {step === "destinations" ? (
              <Panel title="Swipe the destinations that feel like you.">
                <SwipeDeck
                  kind="destination"
                  items={destinationCards}
                  likedIds={preferences.destinationLikes}
                  onDecision={chooseDestination}
                  onReset={resetDestinationLikes}
                  renderCard={(city) => (
                    <>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">{city.country}</p>
                      <h3 className="mt-4 font-serif text-5xl leading-none text-white">{city.name}</h3>
                      <p className="mt-5 min-h-20 text-base leading-7 text-white/74">{city.headline}</p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {city.sports.slice(0, 3).map((sport) => (
                          <span key={sport} className="border border-white/15 px-3 py-1 text-xs text-white/78">
                            {sport}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                />
              </Panel>
            ) : null}

            {step === "budget" ? (
              <Panel title="What is the spend posture?">
                <OptionGrid items={budgets} selected={[preferences.budget]} onSelect={(budget) => setPreferences({ ...preferences, budget })} />
              </Panel>
            ) : null}

            {step === "interests" ? (
              <Panel title="What should fill the non-event hours?">
                <OptionGrid items={interests} selected={preferences.interests} onSelect={toggleInterest} multi />
              </Panel>
            ) : null}

            {step === "experiences" ? (
              <Panel title="Swipe the moments worth flying for.">
                <SwipeDeck
                  kind="experience"
                  items={experienceCards}
                  likedIds={preferences.experienceLikes}
                  onDecision={chooseExperience}
                  onReset={resetExperienceLikes}
                  renderCard={(experience) => (
                    <>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">{experience.eyebrow}</p>
                      <h3 className="mt-4 font-serif text-4xl leading-tight text-white">{experience.title}</h3>
                      <p className="mt-5 min-h-20 text-base leading-7 text-white/74">{experience.description}</p>
                      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-sm text-white/62">
                        <span>{cityNameForExperience(experience)}</span>
                        <span>{experience.category}</span>
                      </div>
                    </>
                  )}
                />
              </Panel>
            ) : null}

            {step === "sports" ? (
              <Panel title="Which sports should anchor the route?">
                <OptionGrid items={sports} selected={preferences.sports} onSelect={toggleSport} multi />
              </Panel>
            ) : null}

            {step === "style" ? (
              <Panel title="Choose the holiday style.">
                <OptionGrid items={travelStyles} selected={[preferences.style]} onSelect={(style) => setPreferences({ ...preferences, style })} />
              </Panel>
            ) : null}

            {step === "pace" ? (
              <Panel title="Choose the route pace.">
                <OptionGrid items={paces} selected={[preferences.pace]} onSelect={(pace) => setPreferences({ ...preferences, pace })} />
              </Panel>
            ) : null}

            {step === "gems" ? (
              <Panel title="How famous should the route feel?">
                <OptionGrid items={gemPreferences} selected={[preferences.gemPreference]} onSelect={(gemPreference) => setPreferences({ ...preferences, gemPreference })} />
              </Panel>
            ) : null}

            <div className="mt-8 border-t border-black/10 bg-black/[0.035] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/50">Live route preview</p>
              <p className="mt-3 text-xl font-semibold">{preview.cities.map((city) => city.name).join("  /  ")}</p>
              <p className="mt-2 text-sm text-black/48">
                {preferences.country} · {preferences.tripLength} nights · {preferences.destinationLikes.length} destinations liked · {preferences.experienceLikes.length} experiences saved
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button
              className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-sm border border-black/10 bg-white/70 px-4 text-sm text-ink transition hover:border-brass/70 hover:bg-white disabled:opacity-40"
              disabled={stepIndex === 0}
              onClick={() => setStepIndex(stepIndex - 1)}
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back
            </button>
            <button className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-sm bg-ink px-5 text-sm font-semibold text-ivory shadow-[0_18px_45px_rgba(23,19,15,0.16)] transition duration-300 hover:-translate-y-0.5 hover:bg-graphite" onClick={next}>
              {stepIndex === steps.length - 1 ? "Generate itinerary" : "Next"}
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </TripShell>
  );
}

function cityNameForExperience(experience: Experience) {
  return cities.find((city) => city.id === experience.cityId)?.name ?? "Selected city";
}

function regionForCountry(country: CountryName) {
  return cities.find((city) => city.country === country)?.region ?? "Europe";
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <Heart size={20} aria-hidden="true" />
      <h2 className="mt-5 font-serif text-3xl leading-tight sm:text-5xl">{title}</h2>
      <div className="mt-8">{children}</div>
    </div>
  );
}

function OptionGrid<T extends string>({
  items,
  selected,
  onSelect
}: {
  items: readonly T[];
  selected: readonly T[];
  onSelect: (item: T) => void;
  multi?: boolean;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => {
        const active = selected.includes(item);
        return (
          <button
            key={item}
            onClick={() => onSelect(item)}
            className={`focus-ring flex min-h-16 items-center justify-between rounded-sm border px-4 text-left text-sm font-semibold transition duration-300 hover:-translate-y-0.5 ${
              active ? "border-ink bg-ink text-ivory shadow-[0_18px_40px_rgba(23,19,15,0.16)]" : "border-black/15 bg-white text-ink hover:border-black/50"
            }`}
          >
            {item}
            {active ? <Check size={17} aria-hidden="true" /> : null}
          </button>
        );
      })}
    </div>
  );
}

function NumberPanel({
  label,
  value,
  min,
  max,
  onChange
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between border border-black/10 bg-white p-4 shadow-[0_18px_40px_rgba(23,19,15,0.08)]">
        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-black/50">{label}</span>
        <span className="font-serif text-5xl">{value}</span>
      </div>
      <input
        className="accent-brass"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <div className="flex justify-between text-xs uppercase tracking-[0.16em] text-black/45">
        <span>{min} nights</span>
        <span>{max} nights</span>
      </div>
    </div>
  );
}

function SwipeDeck<T extends City | Experience>({
  items,
  likedIds,
  onDecision,
  onReset,
  renderCard,
  kind
}: {
  items: T[];
  likedIds: string[];
  onDecision: (id: string, liked: boolean) => void;
  onReset: () => void;
  renderCard: (item: T) => ReactNode;
  kind: "destination" | "experience";
}) {
  const [index, setIndex] = useState(0);
  const [motion, setMotion] = useState<"left" | "right" | null>(null);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const current = items[index];
  const remaining = Math.max(items.length - index, 0);

  function decide(liked: boolean) {
    if (!current) return;
    setMotion(liked ? "right" : "left");
    onDecision(current.id, liked);
    window.setTimeout(() => {
      setIndex((value) => Math.min(value + 1, items.length));
      setMotion(null);
    }, 160);
  }

  function startDrag(event: PointerEvent<HTMLElement>) {
    if ((event.target as HTMLElement).closest("button")) return;
    setDragStart(event.clientX);
  }

  function finishDrag(event: PointerEvent<HTMLElement>) {
    if ((event.target as HTMLElement).closest("button") || dragStart === null) return;
    const delta = event.clientX - dragStart;
    setDragStart(null);
    if (Math.abs(delta) < 70) return;
    decide(delta > 0);
  }

  function restart() {
    setIndex(0);
    setMotion(null);
    onReset();
  }

  if (!current) {
    return (
      <div className="grid min-h-80 place-items-center border border-black/10 bg-white p-6 text-center">
        <div>
          <Check className="mx-auto" size={28} aria-hidden="true" />
          <h3 className="mt-4 text-2xl font-semibold">Deck complete</h3>
          <p className="mt-3 max-w-sm leading-7 text-black/58">
            You saved {likedIds.length} {kind === "destination" ? "destinations" : "experiences"} for the recommendation engine.
          </p>
          <button onClick={restart} className="focus-ring mt-6 inline-flex min-h-11 items-center gap-2 rounded-sm border border-black/20 px-4 text-sm font-semibold">
            <RotateCcw size={16} aria-hidden="true" />
            Replay deck
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="relative mx-auto h-[380px] max-w-md touch-pan-y">
        {items.slice(index, index + 3).reverse().map((item, stackedIndex, stack) => {
          const isTop = item.id === current.id;
          const depth = stack.length - stackedIndex - 1;
          return (
            <article
              key={item.id}
              onPointerDown={isTop ? startDrag : undefined}
              onPointerUp={isTop ? finishDrag : undefined}
              className={`absolute inset-0 flex flex-col justify-between overflow-hidden rounded-sm border border-black/10 bg-[linear-gradient(145deg,#2b241e,#17130f)] p-6 text-white shadow-lounge transition duration-200 ${
                isTop && motion === "right" ? "translate-x-16 rotate-6 opacity-0" : ""
              } ${isTop && motion === "left" ? "-translate-x-16 -rotate-6 opacity-0" : ""}`}
              style={{ transform: isTop ? undefined : `translateY(${depth * 10}px) scale(${1 - depth * 0.035})`, zIndex: 10 - depth }}
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-brass" />
              {renderCard(item)}
              <div className="mt-8 flex justify-center gap-4">
                <button
                  aria-label={`Pass on ${kind}`}
                  onClick={() => decide(false)}
                  className="focus-ring flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition duration-300 hover:scale-105 hover:bg-white hover:text-ink"
                >
                  <X size={22} aria-hidden="true" />
                </button>
                <button
                  aria-label={`Like ${kind}`}
                  onClick={() => decide(true)}
                  className="focus-ring flex h-14 w-14 items-center justify-center rounded-full bg-brass text-ink transition duration-300 hover:scale-105 hover:bg-white"
                >
                  <Heart size={22} aria-hidden="true" />
                </button>
              </div>
            </article>
          );
        })}
      </div>
      <div className="mt-5 flex items-center justify-between text-sm text-black/56">
        <span>{remaining} cards left</span>
        <span>{likedIds.length} liked</span>
      </div>
    </div>
  );
}
