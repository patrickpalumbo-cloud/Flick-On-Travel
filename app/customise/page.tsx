"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, GripVertical, Hotel, MapPinned, Minus, Plane, Plus, Save, Sparkles, TrainFront, Trophy, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { TripShell } from "@/components/trip-shell";
import { allCountryRegions, buildItinerary, buildTransport, cities, countries, countryRegions, defaultPreferences, experiences, type City, type CountryName, type Experience, type Itinerary } from "@/lib/trip-data";
import { readItinerary, writeItinerary } from "@/lib/storage";

export default function CustomisePage() {
  const [itinerary, setItinerary] = useState<Itinerary>(() => buildItinerary(defaultPreferences));
  const [draggedCityId, setDraggedCityId] = useState<string | null>(null);
  const [browseCountry, setBrowseCountry] = useState<CountryName>(defaultPreferences.country);
  const [browseRegion, setBrowseRegion] = useState<string>(allCountryRegions);

  useEffect(() => {
    setItinerary(normalizeItinerary(readItinerary()));
  }, []);

  const addableCities = useMemo(
    () =>
      cities.filter(
        (city) =>
          city.country === browseCountry &&
          (browseRegion === allCountryRegions || city.countryRegion === browseRegion) &&
          !itinerary.cities.some((selectedCity) => selectedCity.id === city.id)
      ),
    [browseCountry, browseRegion, itinerary.cities]
  );
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
    const unused = cities
      .filter((city) => !itinerary.cities.some((selected) => selected.id === city.id))
      .map((city) => ({ city, distance: currentIndex > 0 ? distanceHint(itinerary.cities[currentIndex - 1], city) : 0 }))
      .sort((a, b) => a.distance - b.distance)[0]?.city;
    if (currentIndex < 0 || !unused) return;

    const nextCities = itinerary.cities.map((city, index) => (index === currentIndex ? { ...unused, nights: city.nights } : city));
    updateItinerary({ ...itinerary, cities: nextCities });
  }

  function changeCity(cityId: string, nextCityId: string) {
    const replacement = cities.find((city) => city.id === nextCityId);
    if (!replacement) return;

    const nextCities = itinerary.cities.map((city) => (city.id === cityId ? { ...replacement, nights: city.nights } : city));
    updateItinerary({ ...itinerary, cities: nextCities });
  }

  function changeNights(cityId: string, nights: number) {
    const nextCities = itinerary.cities.map((city) => (city.id === cityId ? { ...city, nights: Math.max(1, Math.min(7, nights || 1)) } : city));
    updateItinerary({ ...itinerary, cities: nextCities });
  }

  function addDestination(cityId: string) {
    const nextCity = cities.find((city) => city.id === cityId);
    if (!nextCity || itinerary.cities.some((city) => city.id === cityId)) return;
    updateItinerary({ ...itinerary, cities: [...itinerary.cities, nextCity] });
  }

  function removeDestination(cityId: string) {
    if (itinerary.cities.length <= 1) return;
    updateItinerary({
      ...itinerary,
      cities: itinerary.cities.filter((city) => city.id !== cityId)
    });
  }

  function moveCity(targetCityId: string) {
    if (!draggedCityId || draggedCityId === targetCityId) return;

    const fromIndex = itinerary.cities.findIndex((city) => city.id === draggedCityId);
    const toIndex = itinerary.cities.findIndex((city) => city.id === targetCityId);
    if (fromIndex < 0 || toIndex < 0) return;

    const nextCities = [...itinerary.cities];
    const [movedCity] = nextCities.splice(fromIndex, 1);
    nextCities.splice(toIndex, 0, movedCity);
    setDraggedCityId(null);
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
        <div className="mb-8 flex flex-col justify-between gap-4 border-b border-black/10 pb-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brass">Customise</p>
            <h1 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">Tune the route before it goes human.</h1>
          </div>
          <Link href="/waitlist" className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-ink px-5 text-sm font-semibold text-ivory shadow-[0_18px_45px_rgba(23,19,15,0.16)]">
            <Save size={16} aria-hidden="true" />
            Save preferences
          </Link>
        </div>
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <BuilderStat icon={CalendarDays} label="Total nights" value={`${totalNights}`} />
          <BuilderStat icon={Sparkles} label="Experiences added" value={`${(itinerary.selectedExperiences ?? []).length}`} />
          <BuilderStat icon={Save} label="Route modules" value={`${itinerary.cities.length}`} />
        </div>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)]">
          <div className="grid gap-6">
            <RouteMap itinerary={itinerary} />

            <div className="border-y border-black/10 py-6">
              <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brass">Concierge timeline</p>
                  <h2 className="mt-2 font-serif text-4xl text-ink">Drag the route into shape.</h2>
                </div>
                <p className="max-w-md text-sm leading-6 text-ink/58">Reorder destinations, adjust nights, swap cities and layer sports-led experiences into each stop.</p>
              </div>

              <div className="mb-6 grid gap-3 border border-black/10 bg-white/70 p-4 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
                <label className="grid gap-2 text-sm text-ink/62">
                  Add from country
                  <select
                    className="focus-ring h-11 rounded-sm border border-black/10 bg-white px-3 text-ink"
                    value={browseCountry}
                    onChange={(event) => {
                      setBrowseCountry(event.target.value as CountryName);
                      setBrowseRegion(allCountryRegions);
                    }}
                  >
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm text-ink/62">
                  Region
                  <select className="focus-ring h-11 rounded-sm border border-black/10 bg-white px-3 text-ink" value={browseRegion} onChange={(event) => setBrowseRegion(event.target.value)}>
                    {(countryRegions[browseCountry] ?? [allCountryRegions]).map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </label>
                <select className="focus-ring h-11 rounded-sm border border-black/10 bg-white px-3 text-ink" defaultValue="" onChange={(event) => {
                  addDestination(event.target.value);
                  event.currentTarget.value = "";
                }}>
                  <option value="" disabled>
                    Add destination
                  </option>
                  {addableCities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name} · {city.countryRegion}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative grid gap-5">
                <div className="absolute bottom-10 left-5 top-10 hidden w-px bg-gradient-to-b from-brass via-black/10 to-brass/20 md:block" />
                {itinerary.cities.map((city, index) => {
                  const cityExperiences = (itinerary.selectedExperiences ?? []).filter((experience) => experience.cityId === city.id);
                  const cityRecommendations = experiences.filter((experience) => experience.cityId === city.id && !selectedExperienceIds.has(experience.id));
                  return (
                    <article
                      key={city.id}
                      draggable
                      onDragStart={() => setDraggedCityId(city.id)}
                      onDragOver={(event) => event.preventDefault()}
                      onDrop={() => moveCity(city.id)}
                      onDragEnd={() => setDraggedCityId(null)}
                      className={`premium-panel grid gap-5 p-5 transition duration-300 md:grid-cols-[auto_minmax(0,1fr)] ${draggedCityId === city.id ? "scale-[0.99] border-brass/70 opacity-70" : "hover:-translate-y-1"}`}
                    >
                      <div className="relative z-10 flex items-start gap-3 md:block">
                        <button className="focus-ring flex h-11 w-11 items-center justify-center border border-black/10 bg-white/70 text-ink/58" aria-label={`Drag ${city.name}`}>
                          <GripVertical size={18} aria-hidden="true" />
                        </button>
                        <div className="mt-0 flex h-11 w-11 items-center justify-center border border-brass/50 bg-brass text-ink md:mt-4">
                          {index + 1}
                        </div>
                      </div>

                      <div>
                        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                          <div>
                            <p className="text-sm text-brass">{city.country} · {city.region}</p>
                            <h3 className="mt-2 font-serif text-4xl text-ink">{city.name}</h3>
                            <p className="mt-3 max-w-2xl leading-7 text-ink/64">{city.headline}</p>
                            {city.recommendationReason ? (
                              <p className="mt-3 border-l-2 border-brass/50 bg-white/60 px-3 py-2 text-sm leading-6 text-ink/58">{city.recommendationReason}</p>
                            ) : null}
                            <Link href={`/destinations/${city.id}`} className="focus-ring mt-4 inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-brass transition hover:text-ink">
                              Destination dossier <ArrowRight size={14} aria-hidden="true" />
                            </Link>
                          </div>
                          <div className="grid gap-3 sm:grid-cols-2 lg:min-w-64 lg:grid-cols-1">
                            <label className="grid gap-2 text-sm text-ink/62">
                              Destination
                              <select
                                className="focus-ring h-11 rounded-sm border border-black/10 bg-white px-3 text-ink"
                                value={city.id}
                                onChange={(event) => changeCity(city.id, event.target.value)}
                              >
                                {cities.map((option) => (
                                  <option key={option.id} value={option.id} disabled={option.id !== city.id && itinerary.cities.some((selectedCity) => selectedCity.id === option.id)}>
                                    {option.name} · {option.country}
                                  </option>
                                ))}
                              </select>
                            </label>
                            <div className="grid gap-2 text-sm text-ink/62">
                              Nights
                              <div className="flex h-11 items-center justify-between border border-black/10 bg-white/70 px-2">
                                <button className="focus-ring flex h-8 w-8 items-center justify-center rounded-sm border border-black/10" onClick={() => changeNights(city.id, city.nights - 1)} aria-label={`Reduce nights in ${city.name}`}>
                                  <Minus size={14} aria-hidden="true" />
                                </button>
                                <span className="text-lg font-semibold text-ink">{city.nights}</span>
                                <button className="focus-ring flex h-8 w-8 items-center justify-center rounded-sm border border-black/10" onClick={() => changeNights(city.id, city.nights + 1)} aria-label={`Add nights in ${city.name}`}>
                                  <Plus size={14} aria-hidden="true" />
                                </button>
                              </div>
                            </div>
                            <button className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-black/10 bg-white/70 px-3 text-sm transition hover:border-brass/70 hover:bg-white" onClick={() => swapCity(city.id)}>
                              <MapPinned size={15} aria-hidden="true" />
                              Smart swap
                            </button>
                            <button className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-black/10 bg-white/70 px-3 text-sm transition hover:border-red-300 hover:bg-white disabled:opacity-40" onClick={() => removeDestination(city.id)} disabled={itinerary.cities.length <= 1}>
                              <X size={15} aria-hidden="true" />
                              Remove
                            </button>
                          </div>
                        </div>

                        <div className="mt-6 grid gap-4 lg:grid-cols-2">
                          <ConciergeList icon={Trophy} title="Recommended sports experiences" items={cityRecommendations.map((experience) => experience.title)} empty="All matching sports experiences have been added." />
                          <ConciergeList icon={Hotel} title="Premium hotel suggestions" items={city.hotels.map((hotel) => `${hotel.name} · ${hotel.tier}`)} />
                        </div>

                        <div className="mt-5 grid gap-3">
                          {cityExperiences.map((experience) => (
                            <div key={experience.id} className="flex items-start justify-between gap-3 border border-brass/25 bg-brass/10 p-3">
                              <div>
                                <p className="text-sm font-semibold text-ink">{experience.title}</p>
                                <p className="mt-1 text-xs text-ink/52">{experience.category} · {experience.eyebrow}</p>
                              </div>
                              <button className="focus-ring flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-black/10 text-ink/58 hover:bg-ink hover:text-ivory" onClick={() => removeExperience(experience.id)} aria-label={`Remove ${experience.title}`}>
                                <X size={14} aria-hidden="true" />
                              </button>
                            </div>
                          ))}
                        </div>

                        {cityRecommendations.length ? (
                          <div className="mt-5 flex flex-wrap gap-2">
                            {cityRecommendations.slice(0, 2).map((experience) => (
                              <button key={experience.id} className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-sm bg-ink px-3 text-sm font-semibold text-ivory transition hover:bg-graphite" onClick={() => addExperience(experience)}>
                                <Plus size={14} aria-hidden="true" />
                                Add {experience.title}
                              </button>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="grid gap-5 xl:sticky xl:top-28 xl:self-start">
            <section className="premium-panel p-5">
              <div className="flex items-center gap-3">
                <TrainFront className="text-brass" size={20} aria-hidden="true" />
                <h2 className="text-xl font-semibold text-ink">Transport suggestions</h2>
              </div>
              <div className="mt-5 grid gap-3">
                {itinerary.transport.map((option) => (
                  <article key={`${option.from}-${option.to}`} className="border-t border-black/10 pt-3">
                    <p className="font-semibold text-ink">{option.from} to {option.to}</p>
                    <p className="mt-1 text-sm text-brass">Approx. {option.distanceKm}km · Recommended: {option.recommended}</p>
                    <p className="mt-2 text-sm leading-6 text-ink/58">
                      Train: {option.trainAvailable ? option.trainTime : "not available / not recommended"} · Flight: {option.flightTime}
                      {option.ferryTime ? ` · Ferry: ${option.ferryTime}` : ""}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-ink/45">{option.note}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="border border-brass/30 bg-[linear-gradient(135deg,#f7e9cd,#d8b979)] p-5 text-ink shadow-[0_24px_90px_rgba(184,150,87,0.18)]">
              <Plane size={20} aria-hidden="true" />
              <h2 className="mt-4 text-2xl font-semibold">Optimise this trip with points</h2>
              <p className="mt-2 text-black/68">Send this route for cabin, hotel and transfer-partner strategy.</p>
              <Link href="/points" className="focus-ring mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-ink px-5 text-sm font-semibold text-ivory">
                Start enquiry <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </section>
          </aside>
        </section>

        <section className="mt-10 border-y border-black/10 py-6">
          <div className="flex flex-col justify-between gap-4 border-b border-black/10 pb-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brass">Experience library</p>
              <h2 className="mt-2 text-2xl font-semibold text-ink">Add moments to the route.</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-ink/60">Experiences are scoped to the current destinations, so swapping a city automatically keeps the itinerary coherent.</p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {availableExperiences.map((experience) => (
              <article key={experience.id} className="border border-black/10 bg-white/72 p-5 shadow-[0_18px_45px_rgba(93,72,48,0.08)] transition duration-300 hover:-translate-y-1 hover:border-brass/50">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass">{experience.eyebrow}</p>
                <h3 className="mt-3 text-xl font-semibold text-ink">{experience.title}</h3>
                <p className="mt-2 text-sm text-ink/52">{cityName(experience.cityId, cities)} · {experience.category}</p>
                <p className="mt-4 min-h-20 text-sm leading-6 text-ink/62">{experience.description}</p>
                <button
                  className="focus-ring mt-5 inline-flex min-h-10 items-center gap-2 rounded-sm bg-ink px-4 text-sm font-semibold text-ivory transition duration-300 hover:bg-graphite"
                  onClick={() => addExperience(experience)}
                >
                  <Plus size={15} aria-hidden="true" />
                  Add experience
                </button>
              </article>
            ))}
          </div>

          {availableExperiences.length === 0 ? (
            <div className="mt-6 border border-black/10 bg-white/70 p-5 text-sm leading-7 text-ink/62">
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

function distanceHint(a: City, b: City) {
  const dLat = b.lat - a.lat;
  const dLon = b.lon - a.lon;
  return dLat * dLat + dLon * dLon;
}

function BuilderStat({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="premium-panel p-5">
      <Icon className="text-brass" size={19} aria-hidden="true" />
      <p className="mt-4 text-sm text-ink/52">{label}</p>
      <p className="mt-1 text-3xl font-semibold text-ink">{value}</p>
    </div>
  );
}

function ConciergeList({ icon: Icon, title, items, empty = "No suggestions yet." }: { icon: LucideIcon; title: string; items: string[]; empty?: string }) {
  return (
    <div className="border border-black/10 bg-white/62 p-4 shadow-[0_18px_45px_rgba(93,72,48,0.06)]">
      <div className="flex items-center gap-2">
        <Icon className="text-brass" size={17} aria-hidden="true" />
        <h4 className="text-sm font-semibold text-ink">{title}</h4>
      </div>
      <div className="mt-3 grid gap-2">
        {(items.length ? items : [empty]).map((item) => (
          <p key={item} className="text-sm leading-6 text-ink/58">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

function RouteMap({ itinerary }: { itinerary: Itinerary }) {
  const points = itinerary.cities.map((city, index) => ({
    city,
    x: itinerary.cities.length <= 1 ? 50 : 12 + index * (76 / (itinerary.cities.length - 1)),
    y: index % 2 === 0 ? 36 : 62
  }));
  const path = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");

  return (
    <section className="premium-panel overflow-hidden p-5">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brass">Animated route map</p>
          <h2 className="mt-2 font-serif text-4xl text-ink">A living route preview.</h2>
        </div>
        <p className="text-sm text-ink/55">{itinerary.cities.map((city) => city.name).join(" / ")}</p>
      </div>

      <div className="relative mt-6 min-h-72 overflow-hidden border border-black/10 bg-[linear-gradient(135deg,#fffaf1,#efe1cf)]">
        <div className="absolute -left-20 -top-24 h-96 w-96 rounded-full bg-brass/18 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.18]" style={{ backgroundImage: "linear-gradient(rgba(23,19,15,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(23,19,15,0.12) 1px, transparent 1px)", backgroundSize: "42px 42px" }} />
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
          <path d={path} fill="none" stroke="rgba(23,19,15,0.16)" strokeWidth="1.1" />
          <path className="route-line" d={path} fill="none" stroke="#b89657" strokeLinecap="round" strokeWidth="1.25" />
        </svg>
        {points.map((point, index) => (
          <div
            key={point.city.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-brass bg-white text-sm font-semibold text-brass shadow-[0_18px_45px_rgba(93,72,48,0.16)]">
              {index + 1}
            </div>
            <p className="mt-2 min-w-24 text-center text-xs font-semibold uppercase tracking-[0.14em] text-ink">{point.city.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
