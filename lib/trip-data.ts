export type Region = "Europe" | "Asia-Pacific" | "North America";
export type Budget = "Essential" | "Elevated" | "First Class";
export type Interest = "Dining" | "Wellness" | "Nightlife" | "Culture" | "Coast";
export type Sport = "Formula 1" | "Tennis" | "Football" | "Golf" | "Basketball";
export type TravelStyle = "Lounge-led" | "Event-first" | "Slow luxury" | "City sprint";

export type TripPreferences = {
  region: Region;
  budget: Budget;
  interests: Interest[];
  sports: Sport[];
  style: TravelStyle;
  email?: string;
};

export type City = {
  id: string;
  name: string;
  country: string;
  region: Region;
  nights: number;
  tags: Interest[];
  sports: Sport[];
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
  transport: TransportOption[];
};

export type TransportOption = {
  from: string;
  to: string;
  mode: string;
  duration: string;
  note: string;
};

export const regions: Region[] = ["Europe", "Asia-Pacific", "North America"];
export const budgets: Budget[] = ["Essential", "Elevated", "First Class"];
export const interests: Interest[] = ["Dining", "Wellness", "Nightlife", "Culture", "Coast"];
export const sports: Sport[] = ["Formula 1", "Tennis", "Football", "Golf", "Basketball"];
export const travelStyles: TravelStyle[] = ["Lounge-led", "Event-first", "Slow luxury", "City sprint"];

export const cities: City[] = [
  {
    id: "melbourne",
    name: "Melbourne",
    country: "Australia",
    region: "Asia-Pacific",
    nights: 3,
    tags: ["Dining", "Culture", "Nightlife"],
    sports: ["Formula 1", "Tennis", "Football"],
    headline: "Grand prix energy, laneway dining and late checkout recovery.",
    activities: ["Australian Open session planning", "Albert Park circuit walk", "Chef's counter dinner"],
    hotels: [
      { name: "The Collins Club", tier: "Luxury", note: "CBD base near dining and arena transfers.", pointsHint: "Good candidate for transferable bank points." },
      { name: "Southbank Reserve", tier: "Lifestyle", note: "River views with easy stadium access.", pointsHint: "Watch for bonus-night promos." }
    ]
  },
  {
    id: "singapore",
    name: "Singapore",
    country: "Singapore",
    region: "Asia-Pacific",
    nights: 2,
    tags: ["Dining", "Wellness", "Culture"],
    sports: ["Formula 1", "Golf"],
    headline: "A polished stopover with F1 lights, rooftop swims and elite lounges.",
    activities: ["Night race precinct preview", "Hawker-to-fine-dining crawl", "Changi lounge reset"],
    hotels: [
      { name: "Marina Circuit House", tier: "Icon", note: "High-floor rooms near the race atmosphere.", pointsHint: "Premium redemption value on shoulder dates." },
      { name: "Orchard Quiet Suite", tier: "Boutique", note: "Calmer base for shopping and spa time.", pointsHint: "Stack cash rates with portal credits." }
    ]
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    region: "Asia-Pacific",
    nights: 4,
    tags: ["Dining", "Culture", "Nightlife"],
    sports: ["Tennis", "Basketball", "Football"],
    headline: "Precision dining, sleek hotels and arena nights across the city.",
    activities: ["Courtside event shortlist", "Omakase reservation map", "Daikanyama design afternoon"],
    hotels: [
      { name: "Ginza Sky Atelier", tier: "Luxury", note: "Quiet service close to dining bookings.", pointsHint: "Best searched nine months ahead." },
      { name: "Shibuya Members Floor", tier: "Lifestyle", note: "A social base for nightlife and rail links.", pointsHint: "Useful for mid-tier award certificates." }
    ]
  },
  {
    id: "london",
    name: "London",
    country: "United Kingdom",
    region: "Europe",
    nights: 3,
    tags: ["Dining", "Culture", "Nightlife"],
    sports: ["Football", "Tennis"],
    headline: "Premier League weekends, private galleries and classic hotel service.",
    activities: ["Club fixture planner", "Wimbledon ballot strategy", "Mayfair dining shortlist"],
    hotels: [
      { name: "Mayfair Club Rooms", tier: "Heritage", note: "Polished base for dining and match transfers.", pointsHint: "Look for fifth-night-free awards." },
      { name: "The King Street Edit", tier: "Lifestyle", note: "Smart west-end option with strong cash rates.", pointsHint: "Pair with airline hotel portal bonuses." }
    ]
  },
  {
    id: "monaco",
    name: "Monaco",
    country: "Monaco",
    region: "Europe",
    nights: 2,
    tags: ["Coast", "Dining", "Wellness"],
    sports: ["Formula 1", "Tennis"],
    headline: "A Riviera sports icon with yacht-club evenings and coastal resets.",
    activities: ["Circuit de Monaco walk", "Monte-Carlo tennis club afternoon", "Riviera beach club booking"],
    hotels: [
      { name: "Port Hercules Maison", tier: "Icon", note: "Walkable to the harbor and casino quarter.", pointsHint: "Aspirational cash-plus-points target." },
      { name: "Cap View Residence", tier: "Luxury", note: "Quieter views just outside the action.", pointsHint: "Compare nearby French Riviera availability." }
    ]
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    region: "Europe",
    nights: 3,
    tags: ["Dining", "Culture", "Wellness"],
    sports: ["Tennis", "Football", "Basketball"],
    headline: "Grand Slam glamour, palace hotels and long lunches between museums.",
    activities: ["Roland-Garros session builder", "Left Bank gallery route", "Michelin lunch planning"],
    hotels: [
      { name: "Saint-Honore House", tier: "Palace-style", note: "Elegant base for shopping and dining.", pointsHint: "High-value suite upgrade requests." },
      { name: "Rive Gauche Retreat", tier: "Boutique", note: "Calm design-led option near galleries.", pointsHint: "Good for flexible-date redemptions." }
    ]
  },
  {
    id: "new-york",
    name: "New York",
    country: "United States",
    region: "North America",
    nights: 3,
    tags: ["Dining", "Culture", "Nightlife"],
    sports: ["Tennis", "Basketball", "Football"],
    headline: "Big-event nights, rooftop tables and a points-friendly hotel field.",
    activities: ["US Open day-to-night plan", "Madison Square Garden fixture pick", "Downtown tasting menu"],
    hotels: [
      { name: "NoMad Members Hotel", tier: "Lifestyle", note: "Central for dining and arena access.", pointsHint: "Good use of free-night caps off peak." },
      { name: "Uptown Grand", tier: "Luxury", note: "Classic service near museums and park time.", pointsHint: "Search luxury collection award space." }
    ]
  },
  {
    id: "miami",
    name: "Miami",
    country: "United States",
    region: "North America",
    nights: 3,
    tags: ["Coast", "Dining", "Nightlife", "Wellness"],
    sports: ["Formula 1", "Tennis", "Basketball"],
    headline: "Sunlit race weekends, beach recovery and after-dark dining.",
    activities: ["F1 Miami hospitality shortlist", "Beach club recovery day", "Design District dinner"],
    hotels: [
      { name: "South Beach Reserve", tier: "Resort", note: "Beach access with a lively evening scene.", pointsHint: "Use resort credits and elite breakfast." },
      { name: "Brickell Highline", tier: "Urban luxury", note: "Better for dining, transfers and skyline views.", pointsHint: "Often stronger midweek award value." }
    ]
  },
  {
    id: "las-vegas",
    name: "Las Vegas",
    country: "United States",
    region: "North America",
    nights: 2,
    tags: ["Dining", "Nightlife", "Wellness"],
    sports: ["Formula 1", "Basketball", "Golf"],
    headline: "A high-gloss sports weekend with spa mornings and late dinners.",
    activities: ["Night race viewing plan", "Courtside or fight-night shortlist", "Desert golf tee time"],
    hotels: [
      { name: "The Strip Salon", tier: "Icon", note: "Statement rooms at the center of the action.", pointsHint: "Compare partner awards versus cash packages." },
      { name: "Desert Spa Tower", tier: "Wellness", note: "A quieter luxury reset with pool time.", pointsHint: "Good for annual travel credit use." }
    ]
  }
];

export function buildItinerary(preferences: TripPreferences): Itinerary {
  const ranked = cities
    .filter((city) => city.region === preferences.region)
    .map((city) => {
      const interestScore = city.tags.filter((tag) => preferences.interests.includes(tag)).length;
      const sportScore = city.sports.filter((sport) => preferences.sports.includes(sport)).length * 2;
      const paceScore = preferences.style === "City sprint" ? 1 : city.nights >= 3 ? 1 : 0;
      return { city, score: interestScore + sportScore + paceScore };
    })
    .sort((a, b) => b.score - a.score)
    .map(({ city }) => city);

  const selected = ranked.length >= 3 ? ranked.slice(0, 3) : cities.filter((city) => city.region === preferences.region).slice(0, 3);
  const citiesWithPace = selected.map((city) => ({
    ...city,
    nights: preferences.style === "City sprint" ? Math.min(city.nights, 2) : preferences.style === "Slow luxury" ? city.nights + 1 : city.nights
  }));

  return {
    title: `${preferences.region} sports-lounge escape`,
    summary: `A ${preferences.budget.toLowerCase()} modular route built around ${preferences.sports.join(", ") || "major events"} with ${preferences.interests.join(", ").toLowerCase() || "premium city time"}.`,
    cities: citiesWithPace,
    transport: buildTransport(citiesWithPace)
  };
}

export function buildTransport(route: City[]): TransportOption[] {
  return route.slice(0, -1).map((city, index) => {
    const next = route[index + 1];
    const sameCountry = city.country === next.country;
    return {
      from: city.name,
      to: next.name,
      mode: sameCountry ? "First-class rail or private transfer" : "Short-haul business flight",
      duration: sameCountry ? "2-4 hrs" : "1.5-8 hrs",
      note: sameCountry ? "Best for luggage-light city hops." : "Optimise with partner awards or stopover rules."
    };
  });
}

export const defaultPreferences: TripPreferences = {
  region: "Europe",
  budget: "Elevated",
  interests: ["Dining", "Culture"],
  sports: ["Tennis", "Football"],
  style: "Lounge-led"
};
