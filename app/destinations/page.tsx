"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Search, SlidersHorizontal } from "lucide-react";
import { TripShell } from "@/components/trip-shell";
import { countries, destinations, type CountryName, type Destination, type Interest } from "@/lib/destinations";

const styleFilters: Array<{ label: string; value: Interest }> = [
  { label: "Beach", value: "beach" },
  { label: "Historical", value: "historical" },
  { label: "Nightlife", value: "nightlife" },
  { label: "Culture", value: "culture" },
  { label: "Hidden gem", value: "hidden gem" },
  { label: "Well known", value: "well known" },
  { label: "Quiet", value: "quiet / relaxed" },
  { label: "Luxury", value: "luxury" },
  { label: "Sport", value: "sport" },
  { label: "Family", value: "family friendly" },
  { label: "Food", value: "food" },
  { label: "Adventure", value: "adventure" }
];

const countryDescriptions: Record<CountryName, string> = {
  Italy: "Historic cities, coastal glamour, food-led routing and football energy.",
  France: "Palace hotels, Riviera polish, alpine escapes and grand-slam moments.",
  Spain: "Beach clubs, late dinners, football cities and softer island alternatives.",
  Germany: "Efficient city hopping, football weekends, culture and alpine access.",
  UK: "Heritage hotels, Premier League weekends, countryside resets and golf.",
  Portugal: "Atlantic light, design hotels, wine valleys and barefoot beach luxury.",
  Greece: "Island pacing, ancient history, villa-style stays and bright coastal routes.",
  Japan: "Precision dining, temple calm, powder skiing and design-rich city nights.",
  USA: "Big-event weekends, mountain luxury, beach escapes and arena energy.",
  Australia: "Harbor cities, beach resorts, food culture and sport-led summers."
};

const allCountries = "All countries";

export default function DestinationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countryFilter, setCountryFilter] = useState<CountryName | typeof allCountries>(allCountries);
  const [activeTags, setActiveTags] = useState<Interest[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredByGlobalControls = useMemo(() => {
    const normalisedSearch = searchTerm.trim().toLowerCase();

    return destinations.filter((destination) => {
      const matchesCountry = countryFilter === allCountries || destination.country === countryFilter;
      const matchesTags = activeTags.length === 0 || activeTags.every((tag) => destination.tags.includes(tag));
      const searchHaystack = [
        destination.name,
        destination.country,
        destination.countryRegion,
        destination.region,
        destination.popularity,
        ...destination.tags
      ]
        .join(" ")
        .toLowerCase();
      const matchesSearch = !normalisedSearch || searchHaystack.includes(normalisedSearch);

      return matchesCountry && matchesTags && matchesSearch;
    });
  }, [activeTags, countryFilter, searchTerm]);

  const visibleCountries = countries.filter((country) => filteredByGlobalControls.some((destination) => destination.country === country));

  function toggleTag(tag: Interest) {
    setActiveTags((current) => (current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]));
  }

  return (
    <TripShell>
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 sm:pt-28 lg:px-8">
        <div className="grid gap-6 border-b border-black/10 pb-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brass">Destination dossiers</p>
            <h1 className="mt-3 font-serif text-5xl leading-none text-ink sm:text-7xl">Browse by country.</h1>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-ink/66">
            A cleaner country-led library for building modular sports, luxury and experience-led routes without misleading destination imagery.
          </p>
        </div>

        <section className="sticky top-16 z-30 -mx-4 border-b border-black/10 bg-ivory/92 px-4 py-4 backdrop-blur sm:top-20 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <label className="focus-within:ring-brass/35 flex min-h-12 items-center gap-3 rounded-sm border border-black/10 bg-white px-4 shadow-[0_18px_45px_rgba(93,72,48,0.07)] focus-within:ring-2">
              <Search size={17} className="text-ink/42" aria-hidden="true" />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search city, country, region or tag"
                className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink/38"
              />
            </label>

            <button
              className="focus-ring mt-3 inline-flex min-h-10 items-center gap-2 rounded-sm border border-black/10 bg-white px-3 text-sm font-semibold text-ink md:hidden"
              onClick={() => setFiltersOpen((value) => !value)}
            >
              <SlidersHorizontal size={15} aria-hidden="true" />
              Filters
            </button>

            <div className={`${filtersOpen ? "grid" : "hidden"} mt-4 gap-4 md:grid`}>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {[allCountries, ...countries].map((country) => {
                  const active = countryFilter === country;
                  return (
                    <button
                      key={country}
                      className={`focus-ring shrink-0 rounded-full border px-3 py-2 text-xs font-semibold transition ${
                        active ? "border-ink bg-ink text-ivory" : "border-black/10 bg-white text-ink/62 hover:border-brass/60"
                      }`}
                      onClick={() => setCountryFilter(country as CountryName | typeof allCountries)}
                    >
                      {country}
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1">
                {styleFilters.map((filter) => {
                  const active = activeTags.includes(filter.value);
                  return (
                    <button
                      key={filter.value}
                      className={`focus-ring shrink-0 rounded-full border px-3 py-2 text-xs font-semibold transition ${
                        active ? "border-brass bg-brass text-ink" : "border-black/10 bg-white text-ink/62 hover:border-brass/60"
                      }`}
                      onClick={() => toggleTag(filter.value)}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-12">
          {visibleCountries.map((country) => (
            <CountryDestinationRow
              key={country}
              country={country}
              destinations={filteredByGlobalControls.filter((destination) => destination.country === country)}
            />
          ))}
        </div>

        {visibleCountries.length === 0 ? (
          <div className="mt-10 border border-black/10 bg-white/75 p-6 text-center shadow-[0_24px_80px_rgba(93,72,48,0.08)]">
            <p className="text-lg font-semibold text-ink">No destinations match those filters.</p>
            <p className="mt-2 text-sm text-ink/58">Try a broader country, region or style tag.</p>
          </div>
        ) : null}
      </section>
    </TripShell>
  );
}

function CountryDestinationRow({ country, destinations }: { country: CountryName; destinations: Destination[] }) {
  const [regionFilter, setRegionFilter] = useState("All regions");
  const regions = ["All regions", ...Array.from(new Set(destinations.map((destination) => destination.countryRegion))).sort()];
  const effectiveRegionFilter = regions.includes(regionFilter) ? regionFilter : "All regions";
  const rowDestinations = effectiveRegionFilter === "All regions" ? destinations : destinations.filter((destination) => destination.countryRegion === effectiveRegionFilter);

  return (
    <section className="border-b border-black/10 pb-10 last:border-b-0">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brass">{destinations.length} destinations</p>
          <h2 className="mt-2 font-serif text-4xl text-ink sm:text-5xl">{country}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/58">{countryDescriptions[country]}</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 md:max-w-xl">
          {regions.map((region) => {
            const active = effectiveRegionFilter === region;
            return (
              <button
                key={region}
                className={`focus-ring shrink-0 rounded-full border px-3 py-2 text-xs font-semibold transition ${
                  active ? "border-ink bg-ink text-ivory" : "border-black/10 bg-white text-ink/58 hover:border-brass/60"
                }`}
                onClick={() => setRegionFilter(region)}
              >
                {region}
              </button>
            );
          })}
        </div>
      </div>

      <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        {rowDestinations.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </section>
  );
}

function DestinationCard({ destination }: { destination: Destination }) {
  const [imageFailed, setImageFailed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const image = destination.imageGallery[0];
  const imageSrc = typeof image?.src === "string" ? image.src.trim() : "";
  const showFallback = !imageSrc || imageFailed;

  return (
    <article className="premium-panel min-w-[82vw] max-w-[82vw] snap-start overflow-hidden transition duration-300 hover:-translate-y-1 sm:min-w-[360px] sm:max-w-[360px]">
      <Link href={`/destinations/${destination.id}`} className="block">
        <div className="relative h-64 overflow-hidden bg-[radial-gradient(circle_at_30%_20%,rgba(184,150,87,0.24),transparent_30%),linear-gradient(135deg,#fffaf1,#e8ddce)]">
          {showFallback ? (
            <div className="absolute inset-0 grid place-items-center p-6 text-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brass">{destination.country}</p>
                <p className="mt-3 font-serif text-4xl leading-none text-ink">{destination.name}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.16em] text-ink/45">Destination image unavailable</p>
              </div>
            </div>
          ) : (
            <>
              <div
                className={`absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(184,150,87,0.2),transparent_30%),linear-gradient(135deg,#fffaf1,#e8ddce)] transition duration-500 ${
                  imageLoaded ? "opacity-0" : "opacity-100"
                }`}
                aria-hidden="true"
              />
              <Image
                src={imageSrc}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 82vw, 360px"
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageFailed(true)}
                className={`object-cover transition duration-700 hover:scale-105 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
              />
            </>
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/12 to-transparent p-4">
            <span className="inline-flex bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-ink">
              {destination.popularity}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">{destination.country} · {destination.countryRegion}</p>
        <h3 className="mt-2 font-serif text-3xl text-ink">{destination.name}</h3>
        <p className="mt-3 min-h-20 text-sm leading-6 text-ink/58">{destination.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {destination.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-ink/58">
              {tag === "quiet / relaxed" ? "quiet" : tag}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4">
          <p className="inline-flex items-center gap-2 text-sm text-ink/58">
            <CalendarDays size={15} className="text-brass" aria-hidden="true" />
            {destination.idealNights} ideal nights
          </p>
          <Link href={`/destinations/${destination.id}`} className="focus-ring inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-ink">
            Guide <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
