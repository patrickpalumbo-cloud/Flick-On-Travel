"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays, Plus, Save, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { TripShell } from "@/components/trip-shell";
import { ItineraryView } from "@/components/itinerary-view";
import { buildItinerary, buildTransport, cities, defaultPreferences, experiences, type City, type Experience, type Itinerary } from "@/lib/trip-data";
import { readItinerary, writeItinerary } from "@/lib/storage";

export default function CustomisePage() {
  const [itinerary, setItinerary] = useState<Itinerary>(() => buildItinerary(defaultPreferences));

  useEffect(() => {
    setItinerary(normalizeItinerary(readItinerary()));
  }, []);

  const cityPool = useMemo(() => cities.filter((city) => city.region === itinerary.cities[0]?.region), [itinerary.cities]);
  const selectedExperienceIds = useMemo(() => new Set((itinerary.selectedExperiences ?? []).map((experience) => experience.id)), [itinerary.selectedExperiences]);
  const routeCityIds = useMemo(() => new Set(itinerary.cities.map((city) => city.id)), [itinerary.cities]);
  const availableExperiences = useMemo(
    () => experiences.filter((experience) => routeCityIds.has(experience.cityId) && !selectedExperienceIds.has(experience.id)),
    [routeCityIds, selectedExperienceIds]
  );
  const totalNights = itinerary.cities.reduce((total, city) => total + city.nights, 0);

  function updateItinerary(next: Itinerary) {
    const routeCityIds = new Set(next.cities.map((city) => city.id));
    const withTransport = {
      ...next,
      selectedExperiences: (next.selectedExperiences ?? []).filter((experience) => routeCityIds.has(experience.cityId)),
      transport: buildTransport(next.cities)
    };
    setItinerary(withTransport);
    writeItinerary(withTransport);
  }

  function swapCity(cityId: string) {
    const currentIndex = itinerary.cities.findIndex((city) => city.id === cityId);
    const unused = cityPool.find((city) => !itinerary.cities.some((selected) => selected.id === city.id));
    if (currentIndex < 0 || !unused) return;

    const nextCities = itinerary.cities.map((city, index) => (index === currentIndex ? { ...unused, nights: city.nights } : city));
    updateItinerary({ ...itinerary, cities: nextCities });
  }

  function changeCity(cityId: string, nextCityId: string) {
    const replacement = cityPool.find((city) => city.id === nextCityId);
    if (!replacement) return;

    const nextCities = itinerary.cities.map((city) => (city.id === cityId ? { ...replacement, nights: city.nights } : city));
    updateItinerary({ ...itinerary, cities: nextCities });
  }

  function changeNights(cityId: string, nights: number) {
    const nextCities = itinerary.cities.map((city) => (city.id === cityId ? { ...city, nights: Math.max(1, Math.min(7, nights || 1)) } : city));
    updateItinerary({ ...itinerary, cities: nextCities });
  }

  function addExperience(experience: Experience) {
    updateItinerary({
      ...itinerary,
      selectedExperiences: [...(itinerary.selectedExperiences ?? []), experience]
    });
  }

  function removeExperience(experienceId: string) {
    updateItinerary({
      ...itinerary,
      selectedExperiences: (itinerary.selectedExperiences ?? []).filter((experience) => experience.id !== experienceId)
    });
  }

  return (
    <TripShell>
      <section className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brass">Customise</p>
            <h1 className="mt-3 font-serif text-4xl text-white sm:text-5xl">Tune the route before it goes human.</h1>
          </div>
          <Link href="/waitlist" className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-ivory px-5 text-sm font-semibold text-ink">
            <Save size={16} aria-hidden="true" />
            Save preferences
          </Link>
        </div>
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <BuilderStat icon={CalendarDays} label="Total nights" value={`${totalNights}`} />
          <BuilderStat icon={Sparkles} label="Experiences added" value={`${(itinerary.selectedExperiences ?? []).length}`} />
          <BuilderStat icon={Save} label="Route modules" value={`${itinerary.cities.length}`} />
        </div>

        <ItineraryView
          itinerary={itinerary}
          editable
          cityOptions={cityPool}
          onSwap={swapCity}
          onDestinationChange={changeCity}
          onNightChange={changeNights}
          onExperienceRemove={removeExperience}
        />

        <section className="mt-10 border-y border-white/10 py-6">
          <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brass">Experience library</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Add moments to the route.</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-ivory/62">Experiences are scoped to the current destinations, so swapping a city automatically keeps the itinerary coherent.</p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {availableExperiences.map((experience) => (
              <article key={experience.id} className="border border-white/10 bg-ink p-5 transition duration-300 hover:-translate-y-1 hover:border-brass/50">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass">{experience.eyebrow}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{experience.title}</h3>
                <p className="mt-2 text-sm text-ivory/52">{cityName(experience.cityId, cityPool)} · {experience.category}</p>
                <p className="mt-4 min-h-20 text-sm leading-6 text-ivory/66">{experience.description}</p>
                <button
                  className="focus-ring mt-5 inline-flex min-h-10 items-center gap-2 rounded-sm bg-ivory px-4 text-sm font-semibold text-ink transition duration-300 hover:bg-white"
                  onClick={() => addExperience(experience)}
                >
                  <Plus size={15} aria-hidden="true" />
                  Add experience
                </button>
              </article>
            ))}
          </div>

          {availableExperiences.length === 0 ? (
            <div className="mt-6 border border-white/10 bg-ink p-5 text-sm leading-7 text-ivory/64">
              Every available experience for this route has been added. Remove one from a city card or swap destinations to reveal more options.
            </div>
          ) : null}
        </section>
      </section>
    </TripShell>
  );
}

function normalizeItinerary(itinerary: Itinerary): Itinerary {
  return {
    ...itinerary,
    selectedExperiences: itinerary.selectedExperiences ?? []
  };
}

function cityName(cityId: string, cityPool: City[]) {
  return cityPool.find((city) => city.id === cityId)?.name ?? "Route stop";
}

function BuilderStat({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="premium-panel p-5">
      <Icon className="text-brass" size={19} aria-hidden="true" />
      <p className="mt-4 text-sm text-ivory/52">{label}</p>
      <p className="mt-1 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}
