"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Save } from "lucide-react";
import { TripShell } from "@/components/trip-shell";
import { ItineraryView } from "@/components/itinerary-view";
import { buildItinerary, buildTransport, cities, defaultPreferences, type Itinerary } from "@/lib/trip-data";
import { readItinerary, writeItinerary } from "@/lib/storage";

export default function CustomisePage() {
  const [itinerary, setItinerary] = useState<Itinerary>(() => buildItinerary(defaultPreferences));

  useEffect(() => {
    setItinerary(readItinerary());
  }, []);

  const cityPool = useMemo(() => cities.filter((city) => city.region === itinerary.cities[0]?.region), [itinerary.cities]);

  function updateItinerary(next: Itinerary) {
    const withTransport = { ...next, transport: buildTransport(next.cities) };
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

  function changeNights(cityId: string, nights: number) {
    const nextCities = itinerary.cities.map((city) => (city.id === cityId ? { ...city, nights: Math.max(1, Math.min(7, nights || 1)) } : city));
    updateItinerary({ ...itinerary, cities: nextCities });
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
        <ItineraryView itinerary={itinerary} editable onSwap={swapCity} onNightChange={changeNights} />
      </section>
    </TripShell>
  );
}
