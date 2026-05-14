import { cities, type City, type Interest } from "@/lib/trip-data";

export type DiscoveryInterest = "sports" | "nightlife" | "luxury" | "beaches" | "skiing" | "family";

export type DestinationRecommendation = {
  city: City;
  score: number;
  matchPercent: number;
  reasons: string[];
  strongestInterest: DiscoveryInterest;
};

export const discoveryInterests: Array<{
  id: DiscoveryInterest;
  label: string;
  description: string;
}> = [
  { id: "sports", label: "Sports", description: "Major events, matchday energy and arena access." },
  { id: "nightlife", label: "Nightlife", description: "Late tables, lounges and after-dark momentum." },
  { id: "luxury", label: "Luxury", description: "Premium hotels, polished service and high-touch pacing." },
  { id: "beaches", label: "Beaches", description: "Coastal recovery, beach clubs and warm-weather resets." },
  { id: "skiing", label: "Skiing", description: "Alpine stays, powder days and fireside recovery." },
  { id: "family", label: "Family", description: "Lower-friction routes, safer pacing and flexible activities." }
];

const interestTags: Record<DiscoveryInterest, Interest[]> = {
  sports: ["sport"],
  nightlife: ["nightlife"],
  luxury: ["luxury", "shopping"],
  beaches: ["beach", "quiet / relaxed"],
  skiing: ["adventure", "sport"],
  family: ["family friendly", "quiet / relaxed"]
};

export function recommendDestinations(selected: DiscoveryInterest[]): DestinationRecommendation[] {
  const active: DiscoveryInterest[] = selected.length ? selected : ["sports", "luxury"];
  const maxScore = active.length * 10;

  return cities
    .map((city) => {
      const scores = active.map((interest) => scoreFor(city, interest));
      const score = scores.reduce((total, item) => total + item, 0);
      const strongestInterest = [...active].sort((a, b) => scoreFor(city, b) - scoreFor(city, a))[0];
      const reasons = active
        .filter((interest) => scoreFor(city, interest) >= 5)
        .slice(0, 3)
        .map((interest) => reasonFor(city, interest));

      return {
        city,
        score,
        matchPercent: Math.min(99, Math.round((score / maxScore) * 100)),
        reasons: reasons.length ? reasons : [`${city.name} adds ${city.prominence} texture to a ${city.country} route.`],
        strongestInterest
      };
    })
    .sort((a, b) => b.score - a.score || a.city.name.localeCompare(b.city.name))
    .slice(0, 12);
}

function scoreFor(city: City, interest: DiscoveryInterest) {
  const tagScore = interestTags[interest].filter((tag) => city.tags.includes(tag)).length * 4;
  const sportScore = interest === "sports" ? Math.min(6, city.sports.length * 2) : interest === "skiing" && city.sports.includes("Skiing") ? 6 : 0;
  const prominenceScore = city.prominence === "well known" || city.prominence === "popular" ? 1 : 2;
  return Math.min(10, tagScore + sportScore + prominenceScore);
}

function reasonFor(city: City, interest: DiscoveryInterest) {
  const labels: Record<DiscoveryInterest, string> = {
    sports: `${city.name} has ${city.sports.length ? city.sports.join(", ") : "event-friendly"} appeal for a sports-led route.`,
    nightlife: `${city.name} is strong for after-dark dining, bars or late hotel-lounge energy.`,
    luxury: `${city.name} fits a premium stay with luxury hotels, shopping or polished service moments.`,
    beaches: `${city.name} works for coast, beach clubs or a softer reset between cities.`,
    skiing: `${city.name} supports alpine, ski or adventure-led travel.`,
    family: `${city.name} has a lower-friction pace for family-friendly planning.`
  };
  return labels[interest];
}
