"use client";

import { useEffect, useState } from "react";
import { TripShell } from "@/components/trip-shell";
import { ItineraryView } from "@/components/itinerary-view";
import { buildItinerary, defaultPreferences, type Itinerary } from "@/lib/trip-data";
import { readItinerary } from "@/lib/storage";

export default function ItineraryPage() {
  const [itinerary, setItinerary] = useState<Itinerary>(() => buildItinerary(defaultPreferences));

  useEffect(() => {
    setItinerary(readItinerary());
  }, []);

  return (
    <TripShell>
      <section className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
        <ItineraryView itinerary={itinerary} />
      </section>
    </TripShell>
  );
}
