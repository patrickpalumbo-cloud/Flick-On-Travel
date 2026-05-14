"use client";

import { useEffect, useMemo, useState } from "react";
import type { PointerEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, GripVertical, Heart, RotateCcw, Sparkles, X } from "lucide-react";
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
  recommendRouteOrder,
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

type Step = "country" | "region" | "length" | "destinations" | "route" | "budget" | "interests" | "experiences" | "sports" | "style" | "gems";
const steps: Step[] = ["country", "region", "length", "destinations", "route", "budget", "interests", "experiences", "sports", "style", "gems"];

export default function QuizPage() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [preferences, setPreferences] = useState<TripPreferences>(defaultPreferences);
  const [draggedRouteId, setDraggedRouteId] = useState<string | null>(null);
  const step = steps[stepIndex];
  const progress = Math.round(((stepIndex + 1) / steps.length) * 100);

  const preview = useMemo(() => buildItinerary(preferences), [preferences]);
  const destinationCards = useMemo(
    () => cities.filter((city) => city.country === preferences.country && (preferences.countryRegion === allCountryRegions || city.countryRegion === preferences.countryRegion)),
    [preferences.country, preferences.countryRegion]
  );
  const selectedCities = useMemo(
    () => preferences.destinationLikes.map((cityId) => cities.find((city) => city.id === cityId)).filter((city): city is City => Boolean(city)),
    [preferences.destinationLikes]
  );
  const experienceCards = useMemo(() => {
    const selectedCityIds = new Set(selectedCities.map((city) => city.id));
    return experiences.filter((experience) => selectedCityIds.has(experience.cityId));
  }, [selectedCities]);

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
    const cityExperienceIds = experiences.filter((experience) => experience.cityId === cityId).map((experience) => experience.id);
    setPreferences((current) => ({
      ...current,
      destinationLikes: liked ? Array.from(new Set([...current.destinationLikes, cityId])) : current.destinationLikes.filter((id) => id !== cityId),
      experienceLikes: liked ? current.experienceLikes : current.experienceLikes.filter((id) => !cityExperienceIds.includes(id))
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

  function addDestination(cityId: string) {
    setPreferences((current) => ({
      ...current,
      destinationLikes: current.destinationLikes.includes(cityId) ? current.destinationLikes : [...current.destinationLikes, cityId]
    }));
  }

  function reorderDestination(targetCityId: string) {
    if (!draggedRouteId || draggedRouteId === targetCityId) return;
    setPreferences((current) => {
      const fromIndex = current.destinationLikes.indexOf(draggedRouteId);
      const toIndex = current.destinationLikes.indexOf(targetCityId);
      if (fromIndex < 0 || toIndex < 0) return current;
      const destinationLikes = [...current.destinationLikes];
      const [movedCity] = destinationLikes.splice(fromIndex, 1);
      destinationLikes.splice(toIndex, 0, movedCity);
      return { ...current, destinationLikes };
    });
    setDraggedRouteId(null);
  }

  function generateRecommendedRoute() {
    setPreferences((current) => ({
      ...current,
      destinationLikes: recommendRouteOrder(current.destinationLikes, current)
    }));
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
                  onSelect={(country) => setPreferences({ ...preferences, country, region: regionForCountry(country), countryRegion: allCountryRegions })}
                />
              </Panel>
            ) : null}

            {step === "region" ? (
              <Panel title="Which region should we prioritise?">
                <OptionGrid
                  items={countryRegions[preferences.country] ?? [allCountryRegions]}
                  selected={[preferences.countryRegion]}
                  onSelect={(countryRegion) => setPreferences({ ...preferences, countryRegion })}
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
                <div className="mb-5 grid gap-4">
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {countries.map((country) => (
                      <button
                        key={country}
                        className={`focus-ring shrink-0 rounded-full border px-3 py-2 text-xs font-semibold transition ${
                          preferences.country === country ? "border-ink bg-ink text-ivory" : "border-black/10 bg-white text-ink/62 hover:border-brass/60"
                        }`}
                        onClick={() => setPreferences((current) => ({ ...current, country, region: regionForCountry(country), countryRegion: allCountryRegions }))}
                      >
                        {country}
                      </button>
                    ))}
                  </div>
                  {selectedCities.length ? (
                    <RoutePreview cities={selectedCities} onRemove={(cityId) => chooseDestination(cityId, false)} />
                  ) : null}
                </div>
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

            {step === "route" ? (
              <Panel title="Build My Route.">
                <RouteBuilder
                  preferences={preferences}
                  selectedCities={selectedCities}
                  draggedRouteId={draggedRouteId}
                  onDragStart={setDraggedRouteId}
                  onDragEnd={() => setDraggedRouteId(null)}
                  onDrop={reorderDestination}
                  onAdd={addDestination}
                  onRemove={(cityId) => chooseDestination(cityId, false)}
                  onCountryChange={(country) => setPreferences((current) => ({ ...current, country, region: regionForCountry(country), countryRegion: allCountryRegions }))}
                  onRegionChange={(countryRegion) => setPreferences((current) => ({ ...current, countryRegion }))}
                  onPaceChange={(pace) => setPreferences((current) => ({ ...current, pace }))}
                  onRecommend={generateRecommendedRoute}
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
                {selectedCities.length === 0 ? (
                  <GeneralExperienceCategories selected={preferences.interests} onSelect={toggleInterest} />
                ) : (
                  <div className="grid gap-5">
                    <ExperienceAvailability selectedCities={selectedCities} />
                    {experienceCards.length ? (
                      <SwipeDeck
                        kind="experience"
                        items={experienceCards}
                        likedIds={preferences.experienceLikes}
                        onDecision={chooseExperience}
                        onReset={resetExperienceLikes}
                        renderCard={(experience) => (
                          <>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">{cityNameForExperience(experience)}</p>
                            <h3 className="mt-4 font-serif text-4xl leading-tight text-white">{experience.title}</h3>
                            <p className="mt-5 min-h-20 text-base leading-7 text-white/74">{experience.description}</p>
                            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-sm text-white/62">
                              <span>{experience.eyebrow}</span>
                              <span>{experience.category}</span>
                            </div>
                          </>
                        )}
                      />
                    ) : (
                      <NoCuratedExperiences selectedCities={selectedCities} />
                    )}
                  </div>
                )}
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

            {step === "gems" ? (
              <Panel title="How famous should the route feel?">
                <OptionGrid items={gemPreferences} selected={[preferences.gemPreference]} onSelect={(gemPreference) => setPreferences({ ...preferences, gemPreference })} />
              </Panel>
            ) : null}

            <div className="mt-8 border-t border-black/10 bg-black/[0.035] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/50">Live route preview</p>
              <p className="mt-3 text-xl font-semibold">{preview.cities.map((city) => city.name).join("  /  ")}</p>
              <p className="mt-2 text-sm text-black/48">
                Browse focus: {preferences.country} · {preferences.tripLength} nights · {preferences.destinationLikes.length} destinations added · {preferences.experienceLikes.length} experiences saved
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

function GeneralExperienceCategories({ selected, onSelect }: { selected: Interest[]; onSelect: (interest: Interest) => void }) {
  const categoryOptions: Interest[] = ["sport", "food", "culture", "nightlife", "luxury", "beach", "shopping", "adventure"];

  return (
    <div className="grid gap-5">
      <div className="border border-black/10 bg-white/75 p-5">
        <p className="text-sm font-semibold text-ink">Select destinations first for city-specific experiences.</p>
        <p className="mt-2 text-sm leading-6 text-ink/58">
          For now, choose the experience styles you care about. Once London, Paris or any other destination is in your route, the cards will only show experiences for those selected cities.
        </p>
      </div>
      <OptionGrid items={categoryOptions} selected={selected} onSelect={onSelect} multi />
    </div>
  );
}

function ExperienceAvailability({ selectedCities }: { selectedCities: City[] }) {
  return (
    <div className="grid gap-2">
      {selectedCities.map((city) => {
        const cityExperiences = experiences.filter((experience) => experience.cityId === city.id);
        if (cityExperiences.length) {
          return (
            <div key={city.id} className="flex items-center justify-between border border-black/10 bg-white/70 px-3 py-2 text-sm">
              <span className="font-semibold text-ink">{city.name}</span>
              <span className="text-ink/52">{cityExperiences.length} curated {cityExperiences.length === 1 ? "experience" : "experiences"}</span>
            </div>
          );
        }

        return (
          <div key={city.id} className="border border-black/10 bg-white/70 px-3 py-2 text-sm leading-6">
            <p className="font-semibold text-ink">{city.name}: No curated experiences yet</p>
            <p className="text-ink/52">Suggested themes: {city.tags.slice(0, 3).join(", ")}</p>
          </div>
        );
      })}
    </div>
  );
}

function NoCuratedExperiences({ selectedCities }: { selectedCities: City[] }) {
  return (
    <div className="border border-black/10 bg-white/75 p-5">
      <p className="text-lg font-semibold text-ink">No curated experiences yet</p>
      <div className="mt-3 grid gap-2">
        {selectedCities.map((city) => (
          <p key={city.id} className="text-sm leading-6 text-ink/58">
            {city.name}: consider {city.tags.slice(0, 3).join(", ")} led activities.
          </p>
        ))}
      </div>
    </div>
  );
}

function RouteBuilder({
  preferences,
  selectedCities,
  draggedRouteId,
  onDragStart,
  onDragEnd,
  onDrop,
  onAdd,
  onRemove,
  onCountryChange,
  onRegionChange,
  onPaceChange,
  onRecommend
}: {
  preferences: TripPreferences;
  selectedCities: City[];
  draggedRouteId: string | null;
  onDragStart: (cityId: string) => void;
  onDragEnd: () => void;
  onDrop: (cityId: string) => void;
  onAdd: (cityId: string) => void;
  onRemove: (cityId: string) => void;
  onCountryChange: (country: CountryName) => void;
  onRegionChange: (countryRegion: string) => void;
  onPaceChange: (pace: Pace) => void;
  onRecommend: () => void;
}) {
  const addableCities = cities.filter(
    (city) =>
      city.country === preferences.country &&
      (preferences.countryRegion === allCountryRegions || city.countryRegion === preferences.countryRegion) &&
      !preferences.destinationLikes.includes(city.id)
  );

  return (
    <div className="grid gap-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-2 text-sm text-ink/62">
          Add from country
          <select className="focus-ring h-11 rounded-sm border border-black/10 bg-white px-3 text-ink" value={preferences.country} onChange={(event) => onCountryChange(event.target.value as CountryName)}>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm text-ink/62">
          Region
          <select className="focus-ring h-11 rounded-sm border border-black/10 bg-white px-3 text-ink" value={preferences.countryRegion} onChange={(event) => onRegionChange(event.target.value)}>
            {(countryRegions[preferences.country] ?? [allCountryRegions]).map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </label>
      </div>

      <select
        className="focus-ring h-11 rounded-sm border border-black/10 bg-white px-3 text-ink"
        defaultValue=""
        onChange={(event) => {
          onAdd(event.target.value);
          event.currentTarget.value = "";
        }}
      >
        <option value="" disabled>
          Add destination from any country
        </option>
        {addableCities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name} · {city.country} · {city.countryRegion}
          </option>
        ))}
      </select>

      <div className="grid gap-3">
        {selectedCities.length ? (
          selectedCities.map((city, index) => (
            <article
              key={city.id}
              draggable
              onDragStart={() => onDragStart(city.id)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => onDrop(city.id)}
              onDragEnd={onDragEnd}
              className={`flex items-center gap-3 border border-black/10 bg-white p-3 shadow-[0_18px_40px_rgba(23,19,15,0.07)] transition ${draggedRouteId === city.id ? "scale-[0.99] border-brass/70 opacity-70" : "hover:border-brass/50"}`}
            >
              <button className="focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-black/10 text-ink/50" aria-label={`Drag ${city.name}`}>
                <GripVertical size={16} aria-hidden="true" />
              </button>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brass/15 text-sm font-semibold text-brass">{index + 1}</div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-semibold text-ink">{city.name}</p>
                <p className="text-sm text-ink/52">{city.country} · {city.countryRegion}</p>
              </div>
              <button className="focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-black/10 text-ink/55 transition hover:bg-ink hover:text-ivory" onClick={() => onRemove(city.id)} aria-label={`Remove ${city.name}`}>
                <X size={15} aria-hidden="true" />
              </button>
            </article>
          ))
        ) : (
          <div className="border border-black/10 bg-white/75 p-5 text-sm leading-7 text-ink/58">
            Add at least two destinations to build a multi-city route. You can keep browsing by country, but the final trip can combine any countries.
          </div>
        )}
      </div>

      <div className="grid gap-3 border border-black/10 bg-white/70 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">Trip pace</p>
        <div className="grid gap-2 sm:grid-cols-3">
          {paces.map((pace) => (
            <button
              key={pace}
              className={`focus-ring min-h-11 rounded-sm border px-3 text-sm font-semibold transition ${
                preferences.pace === pace ? "border-ink bg-ink text-ivory" : "border-black/10 bg-white text-ink/64 hover:border-brass/60"
              }`}
              onClick={() => onPaceChange(pace)}
            >
              {pace}
            </button>
          ))}
        </div>
      </div>

      <button
        className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-ink px-5 text-sm font-semibold text-ivory shadow-[0_18px_45px_rgba(23,19,15,0.16)] transition hover:-translate-y-0.5 hover:bg-graphite disabled:opacity-45"
        onClick={onRecommend}
        disabled={selectedCities.length < 2}
      >
        <Sparkles size={16} aria-hidden="true" />
        Generate recommended route
      </button>
    </div>
  );
}

function RoutePreview({ cities, onRemove }: { cities: City[]; onRemove: (cityId: string) => void }) {
  return (
    <div className="border border-black/10 bg-white/75 p-3">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">Selected route modules</p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {cities.map((city, index) => (
          <div key={city.id} className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-brass/35 bg-brass/10 px-3 py-2 text-xs font-semibold text-ink">
              {index + 1}. {city.name}
              <button className="focus-ring rounded-full text-ink/45 hover:text-ink" onClick={() => onRemove(city.id)} aria-label={`Remove ${city.name}`}>
                <X size={13} aria-hidden="true" />
              </button>
            </span>
            {index < cities.length - 1 ? <ArrowRight size={14} className="text-brass" aria-hidden="true" /> : null}
          </div>
        ))}
      </div>
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

  useEffect(() => {
    setIndex(0);
    setMotion(null);
  }, [items]);

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
