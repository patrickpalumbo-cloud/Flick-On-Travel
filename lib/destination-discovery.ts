import { cities, type City } from "@/lib/trip-data";

export type DiscoveryInterest = "sports" | "nightlife" | "luxury" | "beaches" | "skiing" | "family";

export type DestinationProfile = {
  cityId: string;
  scores: Record<DiscoveryInterest, number>;
  cues: Record<DiscoveryInterest, string>;
};

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

const destinationProfiles: DestinationProfile[] = [
  profile("melbourne", [9, 7, 7, 2, 0, 7], {
    sports: "Grand prix, tennis and football give Melbourne a dense sports calendar.",
    nightlife: "Laneway bars and chef counters keep evenings compact and interesting.",
    luxury: "CBD luxury hotels make stadium transfers easy.",
    beaches: "Better for city culture than beach-first travel.",
    skiing: "Not a ski-led destination.",
    family: "Walkable precincts and varied dining suit flexible family pacing."
  }),
  profile("singapore", [8, 7, 9, 4, 0, 8], {
    sports: "Night-race energy and golf windows make it event-friendly.",
    nightlife: "Rooftop bars and Marina Bay terraces create polished nights out.",
    luxury: "One of the strongest lounge, hotel and stopover cities in the set.",
    beaches: "Sentosa adds a light resort angle, but this is not purely beach-led.",
    skiing: "No ski angle.",
    family: "Clean transport, compact attractions and premium hotels make family travel easy."
  }),
  profile("tokyo", [8, 8, 9, 1, 2, 7], {
    sports: "Arena events and tennis can anchor a high-energy city route.",
    nightlife: "Listening bars, cocktail counters and late dining are world-class.",
    luxury: "Service standards and dining depth make Tokyo feel deeply premium.",
    beaches: "Tokyo is a city-led recommendation, not a beach one.",
    skiing: "Can pair with Japanese alpine extensions, but Niseko is stronger.",
    family: "Transit, food variety and culture make it rewarding with planning."
  }),
  profile("london", [9, 8, 8, 1, 0, 7], {
    sports: "Football and Wimbledon make London an elite sports base.",
    nightlife: "Mayfair, Soho and hotel lounges give strong after-dark options.",
    luxury: "Heritage hotels and member-style service match premium tastes.",
    beaches: "Not a beach-first destination.",
    skiing: "No ski angle.",
    family: "Museums, parks and short transfers help family itineraries."
  }),
  profile("monaco", [9, 7, 10, 8, 0, 5], {
    sports: "Formula 1 and tennis make Monaco a compact event icon.",
    nightlife: "Casino square, harbor terraces and Riviera evenings are the draw.",
    luxury: "This is one of the highest-luxury matches.",
    beaches: "Riviera beach clubs and coastal transfers are built in.",
    skiing: "Not ski-led.",
    family: "Beautiful but better suited to couples or adult groups than family-first travel."
  }),
  profile("paris", [8, 7, 10, 1, 0, 7], {
    sports: "Roland-Garros and football fixtures create strong sports hooks.",
    nightlife: "Palace bars, jazz rooms and late dinners suit refined evenings.",
    luxury: "Paris is a top luxury hotel and dining recommendation.",
    beaches: "Not a beach destination.",
    skiing: "No ski angle.",
    family: "Culture, parks and short stays work well for families."
  }),
  profile("new-york", [9, 10, 8, 1, 0, 7], {
    sports: "US Open, basketball and major arenas give New York huge sports range.",
    nightlife: "The strongest pure nightlife score in the system.",
    luxury: "Premium hotels and dining are broad, especially around NoMad and uptown.",
    beaches: "Beach time is possible but not the reason to go.",
    skiing: "No ski angle.",
    family: "Museums, parks and flexible food options make family routing workable."
  }),
  profile("miami", [9, 9, 8, 10, 0, 7], {
    sports: "F1, tennis, basketball and football make it sports-rich.",
    nightlife: "South Beach, Brickell and Design District keep nights lively.",
    luxury: "Resorts, dining and wellness create a premium warm-weather route.",
    beaches: "The strongest beach match in the system.",
    skiing: "No ski angle.",
    family: "Beach pacing and resort infrastructure can work well for families."
  }),
  profile("las-vegas", [9, 10, 8, 0, 0, 4], {
    sports: "Race weekends, fight nights and arena events are the core reason to go.",
    nightlife: "Late-night dining and high-floor lounges are central.",
    luxury: "High-gloss resorts and spas make it premium, but intense.",
    beaches: "No beach fit.",
    skiing: "No ski fit.",
    family: "Better for adults than family-first travel."
  }),
  profile("niseko", [7, 5, 9, 0, 10, 8], {
    sports: "Skiing is the main event, with private guides and alpine pacing.",
    nightlife: "Hirafu has cosy sake bars, though nightlife is not the main draw.",
    luxury: "Lodge service, onsen rituals and private transfers make it high-end.",
    beaches: "No beach fit.",
    skiing: "The strongest Japan powder and alpine wellness recommendation.",
    family: "Lodges, ski schools and slower pacing suit family travel."
  }),
  profile("aspen", [8, 7, 10, 0, 10, 7], {
    sports: "Skiing and summer golf give Aspen year-round sports relevance.",
    nightlife: "Apres, hotel bars and fireside dinners give polished nights out.",
    luxury: "A top luxury mountain recommendation.",
    beaches: "No beach fit.",
    skiing: "One of the strongest ski recommendations.",
    family: "Works for families who want high-service mountain logistics."
  })
];

export function recommendDestinations(selected: DiscoveryInterest[]): DestinationRecommendation[] {
  const active = selected.length ? selected : ["sports", "luxury"];
  const maxScore = active.length * 10;

  return destinationProfiles
    .map((destinationProfile) => {
      const city = cities.find((item) => item.id === destinationProfile.cityId);
      if (!city) return null;

      const score = active.reduce((total, interest) => total + destinationProfile.scores[interest], 0);
      const sortedInterests = [...active].sort((a, b) => destinationProfile.scores[b] - destinationProfile.scores[a]);
      const strongestInterest = sortedInterests[0];
      const reasons = sortedInterests
        .filter((interest) => destinationProfile.scores[interest] >= 6)
        .slice(0, 3)
        .map((interest) => destinationProfile.cues[interest]);

      return {
        city,
        score,
        matchPercent: Math.round((score / maxScore) * 100),
        reasons: reasons.length ? reasons : [destinationProfile.cues[strongestInterest]],
        strongestInterest
      };
    })
    .filter((item): item is DestinationRecommendation => Boolean(item))
    .sort((a, b) => b.score - a.score || a.city.name.localeCompare(b.city.name));
}

function profile(cityId: string, values: [number, number, number, number, number, number], cues: Record<DiscoveryInterest, string>): DestinationProfile {
  const [sports, nightlife, luxury, beaches, skiing, family] = values;
  return {
    cityId,
    scores: { sports, nightlife, luxury, beaches, skiing, family },
    cues
  };
}
