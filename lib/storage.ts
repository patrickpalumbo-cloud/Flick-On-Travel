"use client";

import { buildItinerary, defaultPreferences, type Itinerary, type TripPreferences } from "@/lib/trip-data";

const preferenceKey = "flick-on-preferences";
const itineraryKey = "flick-on-itinerary";

export function readPreferences(): TripPreferences {
  if (typeof window === "undefined") return defaultPreferences;

  const saved = window.localStorage.getItem(preferenceKey);
  if (!saved) return defaultPreferences;

  try {
    return { ...defaultPreferences, ...JSON.parse(saved) };
  } catch {
    return defaultPreferences;
  }
}

export function writePreferences(preferences: TripPreferences) {
  window.localStorage.setItem(preferenceKey, JSON.stringify(preferences));
}

export function readItinerary(): Itinerary {
  if (typeof window === "undefined") return buildItinerary(defaultPreferences);

  const saved = window.localStorage.getItem(itineraryKey);
  if (!saved) return buildItinerary(readPreferences());

  try {
    return JSON.parse(saved);
  } catch {
    return buildItinerary(readPreferences());
  }
}

export function writeItinerary(itinerary: Itinerary) {
  window.localStorage.setItem(itineraryKey, JSON.stringify(itinerary));
}
