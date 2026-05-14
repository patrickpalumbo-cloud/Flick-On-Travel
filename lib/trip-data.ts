import {
  allCountryRegions,
  countries,
  destinations,
  routeConnections,
  type Budget,
  type CountryName,
  type DestinationProminence,
  type GemPreference,
  type Interest,
  type Pace,
  type Region,
  type Sport,
  type TravelStyle
} from "@/lib/destinations";

export {
  allCountryRegions,
  budgets,
  countries,
  destinations,
  gemPreferences,
  interests,
  paces,
  regions,
  routeConnections,
  sports,
  travelStyles
} from "@/lib/destinations";
export type {
  Budget,
  CountryName,
  Destination,
  DestinationPopularity,
  GemPreference,
  ImageGalleryItem,
  Interest,
  Pace,
  Region,
  RouteConnection,
  Sport,
  TravelStyle
} from "@/lib/destinations";

export type TripPreferences = {
  country: CountryName;
  region: Region;
  countryRegion: string;
  budget: Budget;
  interests: Interest[];
  sports: Sport[];
  style: TravelStyle;
  pace: Pace;
  tripLength: number;
  gemPreference: GemPreference;
  destinationLikes: string[];
  experienceLikes: string[];
  email?: string;
};

export type City = {
  id: string;
  name: string;
  country: CountryName;
  region: Region;
  countryRegion: string;
  nights: number;
  tags: Interest[];
  sports: Sport[];
  prominence: DestinationProminence;
  lat: number;
  lon: number;
  recommendationReason?: string;
  headline: string;
  activities: string[];
  hotels: Hotel[];
};

export type Hotel = {
  name: string;
  tier: string;
  note: string;
  pointsHint: string;
};

export type Itinerary = {
  title: string;
  summary: string;
  cities: City[];
  selectedExperiences: Experience[];
  transport: TransportOption[];
};

export type TransportOption = {
  from: string;
  to: string;
  mode: string;
  duration: string;
  note: string;
  distanceKm: number;
  flightTime: string;
  trainAvailable: boolean;
  trainTime?: string;
  ferryTime?: string;
  recommended: string;
};

export type Experience = {
  id: string;
  title: string;
  cityId: string;
  category: Interest | Sport;
  eyebrow: string;
  description: string;
};

export const cities: City[] = destinations.map((destination) => ({
  id: destination.id,
  name: destination.name,
  country: destination.country,
  region: destination.region,
  countryRegion: destination.countryRegion,
  nights: destination.idealNights,
  tags: destination.tags,
  sports: destination.sportsExperiences,
  prominence: destination.prominence,
  lat: destination.lat,
  lon: destination.lon,
  headline: destination.description,
  activities: destination.activities,
  hotels: [
    { name: `${destination.name} House`, tier: "Premium", note: "Placeholder affiliate hotel card with a polished central base.", pointsHint: "Estimated MVP note: compare cash, award and portal rates." },
    { name: `${destination.name} Reserve`, tier: "Luxury", note: "Placeholder affiliate hotel card for a quieter high-service stay.", pointsHint: "Estimated MVP note: useful for elite perks or credits." }
  ]
}));

export const countryRegions: Record<CountryName, string[]> = countries.reduce((acc, country) => {
  acc[country] = [allCountryRegions, ...Array.from(new Set(cities.filter((city) => city.country === country).map((city) => city.countryRegion))).sort()];
  return acc;
}, {} as Record<CountryName, string[]>);

export const experiences: Experience[] = cities.slice(0, 36).map((city) => ({
  id: `${city.id}-signature`,
  title: city.activities[0],
  cityId: city.id,
  category: city.sports[0] ?? city.tags[0],
  eyebrow: city.prominence,
  description: `${city.activities[0]} in ${city.name}, paired with ${city.activities[1]?.toLowerCase() ?? "a premium local moment"}.`
}));

export function buildItinerary(preferences: TripPreferences): Itinerary {
  const scoped = cities.filter((city) => city.country === preferences.country && (preferences.countryRegion === allCountryRegions || city.countryRegion === preferences.countryRegion));
  const pool = scoped.length ? scoped : cities.filter((city) => city.country === preferences.country);
  const targetStops = stopsFor(preferences.tripLength, preferences.pace);

  const ranked = pool
    .map((city) => ({ city, score: scoreCity(city, preferences) }))
    .sort((a, b) => b.score - a.score || a.city.name.localeCompare(b.city.name))
    .map(({ city }) => city);

  const selected = orderByProximity(ranked.slice(0, Math.min(targetStops, ranked.length))).map((city) => ({
    ...city,
    recommendationReason: reasonFor(city, preferences)
  }));
  const citiesWithNights = distributeNights(selected, preferences.tripLength, preferences.pace);
  const selectedCityIds = new Set(citiesWithNights.map((city) => city.id));
  const selectedExperiences = preferences.experienceLikes
    .map((experienceId) => experiences.find((experience) => experience.id === experienceId))
    .filter((experience): experience is Experience => Boolean(experience))
    .filter((experience) => selectedCityIds.has(experience.cityId));

  return {
    title: `${preferences.country} ${preferences.style.toLowerCase()} itinerary`,
    summary: `Estimated MVP route for ${preferences.tripLength} nights at a ${preferences.pace.toLowerCase()} pace, balancing ${preferences.interests.join(", ") || "premium travel"} with ${preferences.gemPreference.toLowerCase()} discovery.`,
    cities: citiesWithNights,
    selectedExperiences,
    transport: buildTransport(citiesWithNights)
  };
}

export function buildTransport(route: City[]): TransportOption[] {
  return route.slice(0, -1).map((city, index) => {
    const next = route[index + 1];
    const storedConnection = findRouteConnection(city.id, next.id);
    if (storedConnection) {
      return {
        from: city.name,
        to: next.name,
        mode: storedConnection.recommendedTransport,
        duration: storedConnection.trainAvailable && storedConnection.trainTime ? storedConnection.trainTime : storedConnection.flightTime,
        note: storedConnection.notes,
        distanceKm: storedConnection.approximateDistanceKm,
        flightTime: storedConnection.flightTime,
        trainAvailable: storedConnection.trainAvailable,
        trainTime: storedConnection.trainTime,
        recommended: storedConnection.recommendedTransport
      };
    }

    const distanceKm = Math.round(distanceBetween(city, next));
    const sameCountry = city.country === next.country;
    const islandHop = isIslandHop(city, next);
    const trainAvailable = sameCountry && !islandHop && distanceKm <= 850;
    const trainTime = trainAvailable ? estimatedTrainTime(distanceKm) : undefined;
    const flightTime = distanceKm <= 400 && trainAvailable ? "not recommended" : `approx. ${formatHours(Math.max(0.8, distanceKm / 760 + 0.25))}`;
    const ferryTime = islandHop ? estimatedFerryTime(distanceKm) : undefined;
    const recommended = trainAvailable && distanceKm <= 520 ? "Train" : islandHop && distanceKm <= 180 ? "Ferry or flight" : distanceKm < 180 ? "Private transfer" : "Flight";

    return {
      from: city.name,
      to: next.name,
      distanceKm,
      trainAvailable,
      trainTime,
      ferryTime,
      flightTime,
      recommended,
      mode: recommended,
      duration: recommended === "Train" && trainTime ? trainTime : recommended.includes("Ferry") && ferryTime ? ferryTime : flightTime,
      note: "Estimated MVP transport data based on approximate distance and route type. Confirm schedules before booking."
    };
  });
}

function findRouteConnection(fromDestinationId: string, toDestinationId: string) {
  return routeConnections.find(
    (connection) =>
      (connection.fromDestinationId === fromDestinationId && connection.toDestinationId === toDestinationId) ||
      (connection.fromDestinationId === toDestinationId && connection.toDestinationId === fromDestinationId)
  );
}

export const defaultPreferences: TripPreferences = {
  country: "Italy",
  region: "Europe",
  countryRegion: allCountryRegions,
  budget: "Elevated",
  interests: ["food", "culture", "luxury"],
  sports: ["Tennis", "Football"],
  style: "Culture",
  pace: "Balanced",
  tripLength: 8,
  gemPreference: "Balanced",
  destinationLikes: [],
  experienceLikes: []
};

function scoreCity(city: City, preferences: TripPreferences) {
  const interestScore = city.tags.filter((tag) => preferences.interests.includes(tag)).length * 3;
  const sportScore = city.sports.filter((sport) => preferences.sports.includes(sport)).length * 2;
  const destinationScore = preferences.destinationLikes.includes(city.id) ? 8 : 0;
  const styleScore = city.tags.includes(styleToTag(preferences.style)) ? 3 : 0;
  const prominenceScore = preferences.gemPreference === "Iconic" && ["well known", "popular"].includes(city.prominence) ? 4 : preferences.gemPreference === "Hidden gems" && ["hidden gem", "quiet alternative", "upcoming"].includes(city.prominence) ? 4 : 2;
  const paceScore = preferences.pace === "Relaxed" && city.tags.includes("quiet / relaxed") ? 2 : preferences.pace === "Fast" && city.tags.includes("well known") ? 2 : 1;
  return interestScore + sportScore + destinationScore + styleScore + prominenceScore + paceScore;
}

function reasonFor(city: City, preferences: TripPreferences) {
  const matchedTags = city.tags.filter((tag) => preferences.interests.includes(tag));
  const matchedSports = city.sports.filter((sport) => preferences.sports.includes(sport));
  const tagText = matchedTags.length ? `matches ${matchedTags.slice(0, 3).join(", ")}` : `adds ${city.prominence} texture`;
  const sportText = matchedSports.length ? ` with ${matchedSports.slice(0, 2).join(" and ")} appeal` : "";
  return `Chosen because it ${tagText}${sportText} and sits logically in the estimated route order.`;
}

function styleToTag(style: TravelStyle): Interest {
  const map: Record<TravelStyle, Interest> = {
    Luxury: "luxury",
    Culture: "culture",
    Beach: "beach",
    Food: "food",
    Sport: "sport",
    Family: "family friendly",
    Adventure: "adventure"
  };
  return map[style];
}

function stopsFor(nights: number, pace: Pace) {
  if (pace === "Relaxed") return Math.max(2, Math.min(4, Math.round(nights / 3)));
  if (pace === "Fast") return Math.max(3, Math.min(5, Math.round(nights / 2)));
  return Math.max(2, Math.min(4, Math.round(nights / 2.5)));
}

function distributeNights(route: City[], totalNights: number, pace: Pace) {
  if (!route.length) return [];
  const base = pace === "Fast" ? 1 : pace === "Relaxed" ? 3 : 2;
  const nights = route.map((city) => ({ ...city, nights: Math.max(1, Math.min(city.nights, base)) }));
  let remaining = Math.max(totalNights - nights.reduce((sum, city) => sum + city.nights, 0), 0);
  let index = 0;
  while (remaining > 0) {
    nights[index % nights.length].nights += 1;
    remaining -= 1;
    index += 1;
  }
  return nights;
}

function orderByProximity(route: City[]) {
  if (route.length <= 2) return route;
  const ordered = [route[0]];
  const remaining = route.slice(1);
  while (remaining.length) {
    const last = ordered[ordered.length - 1];
    const nextIndex = remaining.reduce((bestIndex, city, index) => (distanceBetween(last, city) < distanceBetween(last, remaining[bestIndex]) ? index : bestIndex), 0);
    ordered.push(remaining.splice(nextIndex, 1)[0]);
  }
  return ordered;
}

function distanceBetween(a: Pick<City, "lat" | "lon">, b: Pick<City, "lat" | "lon">) {
  const earthKm = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * earthKm * Math.asin(Math.sqrt(h));
}

function toRad(value: number) {
  return (value * Math.PI) / 180;
}

function estimatedTrainTime(distanceKm: number) {
  return `approx. ${formatHours(Math.max(1, distanceKm / 170))}`;
}

function estimatedFerryTime(distanceKm: number) {
  return `approx. ${formatHours(Math.max(1.5, distanceKm / 35))}`;
}

function formatHours(hours: number) {
  const rounded = Math.round(hours * 2) / 2;
  return `${rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(1)} ${rounded === 1 ? "hour" : "hours"}`;
}

function isIslandHop(a: City, b: City) {
  const islandRegions = ["Balearic Islands", "Cyclades", "Crete", "Ionian Islands", "Sicily", "Madeira", "Azores", "Hawaii", "Queensland", "Tasmania", "Western Australia", "Hokkaido", "Setouchi"];
  return islandRegions.includes(a.countryRegion) || islandRegions.includes(b.countryRegion);
}
