import { cities, experiences, type City, type Experience } from "@/lib/trip-data";

export type DestinationGuide = {
  city: City;
  image: string;
  imageAlt: string;
  gallery: DestinationImage[];
  bestTime: string;
  events: string[];
  nightlife: string[];
  localExperiences: string[];
  itinerarySuggestions: string[];
  experiences: Experience[];
};

export type DestinationImage = {
  src: string;
  alt: string;
  category: "Sports" | "Nightlife" | "Food" | "Luxury" | "Landscape" | "Culture" | "Wellness";
  caption: string;
};

const galleryThemes: Record<string, string[]> = {
  melbourne: ["melbourne tennis stadium", "melbourne laneway bar", "melbourne fine dining", "melbourne luxury hotel", "melbourne skyline yarra", "melbourne coffee culture", "melbourne grand prix"],
  singapore: ["singapore formula 1 night", "singapore rooftop bar", "singapore hawker food", "singapore luxury hotel", "singapore marina bay skyline", "singapore gardens by the bay", "singapore airport lounge"],
  tokyo: ["tokyo sports arena", "tokyo cocktail bar", "tokyo omakase sushi", "tokyo luxury hotel", "tokyo skyline night", "tokyo street culture", "japanese onsen luxury"],
  london: ["london football stadium", "london soho nightlife", "london fine dining", "london luxury hotel", "london skyline thames", "london gallery interior", "wimbledon tennis"],
  monaco: ["monaco grand prix", "monaco harbor nightlife", "monaco fine dining", "monaco luxury hotel", "monaco riviera coastline", "monte carlo casino", "monaco yacht club"],
  paris: ["roland garros paris", "paris cocktail bar", "paris michelin dining", "paris palace hotel", "paris seine skyline", "paris art gallery", "paris cafe luxury"],
  "new-york": ["new york tennis stadium", "new york rooftop bar", "new york fine dining", "new york luxury hotel", "new york skyline", "new york museum", "madison square garden"],
  miami: ["miami formula 1", "miami beach nightlife", "miami fine dining", "miami luxury resort", "miami beach aerial", "miami design district", "miami tennis"],
  "las-vegas": ["las vegas grand prix", "las vegas nightlife", "las vegas fine dining", "las vegas luxury hotel", "las vegas desert landscape", "las vegas spa", "las vegas arena"],
  niseko: ["niseko skiing powder", "niseko apres ski bar", "niseko japanese dining", "niseko luxury chalet", "niseko mountain landscape", "niseko onsen", "niseko family ski"],
  aspen: ["aspen skiing", "aspen apres ski", "aspen fine dining", "aspen luxury hotel", "aspen mountain landscape", "aspen gallery", "aspen family ski"]
};

const galleryCategories: DestinationImage["category"][] = ["Sports", "Nightlife", "Food", "Luxury", "Landscape", "Culture", "Wellness"];

const guideDetails: Record<string, Omit<DestinationGuide, "city" | "experiences" | "gallery">> = {
  melbourne: {
    image: "/terminal-brand.jpg",
    imageAlt: "Cinematic luxury terminal scene for Melbourne sports travel",
    bestTime: "January for tennis, March for grand prix energy, and October to April for long restaurant-led weekends.",
    events: ["Australian Open", "Melbourne Grand Prix", "AFL feature fixtures"],
    nightlife: ["Late laneway wine bars", "Southbank hotel lounges", "Chef's counter dinners"],
    localExperiences: ["Albert Park circuit walk", "Fitzroy gallery afternoon", "Morning coffee crawl before a day session"],
    itinerarySuggestions: ["3 nights: tennis, laneways, recovery brunch", "4 nights: add Yarra Valley dining", "2 nights: event-first city sprint"]
  },
  singapore: {
    image: "/lounge-hero.jpg",
    imageAlt: "Cinematic airport lounge scene for Singapore sports travel",
    bestTime: "September for night-race atmosphere, February to April for clearer skies, and year-round for polished stopovers.",
    events: ["Singapore Grand Prix", "Sentosa golf events", "Regional football and arena nights"],
    nightlife: ["Rooftop cocktail rooms", "Marina Bay race-week terraces", "Quiet hotel bars near Orchard"],
    localExperiences: ["Changi lounge reset", "Hawker-to-fine-dining crawl", "Gardens by the Bay night walk"],
    itinerarySuggestions: ["2 nights: stopover and race precinct", "3 nights: dining, spa and rooftop circuit", "4 nights: pair with Tokyo or Melbourne"]
  },
  tokyo: {
    image: "/terminal-brand.jpg",
    imageAlt: "Cinematic premium travel scene for Tokyo sports travel",
    bestTime: "March to May for spring atmosphere, September to November for crisp city nights, and event windows around arena fixtures.",
    events: ["Japan Open tennis", "International football fixtures", "Basketball and arena events"],
    nightlife: ["Ginza listening bars", "Shibuya cocktail counters", "Hotel sky lounges"],
    localExperiences: ["Omakase reservation route", "Daikanyama design afternoon", "Private-feeling onsen reset outside the city"],
    itinerarySuggestions: ["4 nights: food, design and event night", "5 nights: add Hakone recovery", "3 nights: premium city sprint"]
  },
  london: {
    image: "/lounge-hero.jpg",
    imageAlt: "Cinematic luxury lounge scene for London sports travel",
    bestTime: "May to July for tennis and summer sport, August to May for football weekends, and December for festive hotel service.",
    events: ["Premier League weekends", "Wimbledon", "Champions League nights"],
    nightlife: ["Mayfair members-style bars", "Soho dining rooms", "West End hotel lounges"],
    localExperiences: ["Fixture-led club route", "Private gallery morning", "Sunday roast after matchday"],
    itinerarySuggestions: ["3 nights: football, Mayfair and galleries", "5 nights: add Wimbledon and countryside reset", "2 nights: matchday sprint"]
  },
  monaco: {
    image: "/terminal-brand.jpg",
    imageAlt: "Cinematic luxury terminal scene for Monaco Riviera travel",
    bestTime: "May for grand prix intensity, April for tennis, and June to September for yacht-club evenings.",
    events: ["Monaco Grand Prix", "Monte-Carlo Masters", "Riviera yacht calendar"],
    nightlife: ["Harbor terraces", "Casino square lounges", "Riviera beach clubs"],
    localExperiences: ["Circuit de Monaco walk", "Helicopter transfer from Nice", "Coastal lunch toward Cap Ferrat"],
    itinerarySuggestions: ["2 nights: Monaco icon weekend", "4 nights: add Nice and Cap Ferrat", "3 nights: tennis, harbor and beach club"]
  },
  paris: {
    image: "/lounge-hero.jpg",
    imageAlt: "Cinematic luxury lounge scene for Paris sports travel",
    bestTime: "May to June for Roland-Garros and long lunches, September for fashion-week energy, and spring for galleries.",
    events: ["Roland-Garros", "Paris football fixtures", "Arena basketball events"],
    nightlife: ["Palace hotel bars", "Left Bank jazz rooms", "Late supper clubs"],
    localExperiences: ["Michelin lunch planning", "Left Bank gallery route", "Seine-side recovery walk"],
    itinerarySuggestions: ["3 nights: tennis, palace lunch and galleries", "4 nights: add Champagne", "2 nights: grand-slam city sprint"]
  },
  "new-york": {
    image: "/terminal-brand.jpg",
    imageAlt: "Cinematic premium airport scene for New York sports travel",
    bestTime: "August to September for the US Open, October to June for basketball, and autumn for rooftop dining.",
    events: ["US Open", "Madison Square Garden fixtures", "NFL and major arena weekends"],
    nightlife: ["Downtown tasting menus", "NoMad cocktail rooms", "Rooftop bars with late checkout nearby"],
    localExperiences: ["Queens tennis day-to-night plan", "Museum morning uptown", "Brooklyn dining extension"],
    itinerarySuggestions: ["3 nights: slam, dining and arena night", "4 nights: add Brooklyn and museums", "2 nights: courtside sprint"]
  },
  miami: {
    image: "/lounge-hero.jpg",
    imageAlt: "Cinematic luxury lounge scene for Miami sports travel",
    bestTime: "March to May for tennis, F1 and beach weather, plus November to April for warm winter escapes.",
    events: ["Miami Grand Prix", "Miami Open", "Basketball and football weekends"],
    nightlife: ["South Beach dining rooms", "Brickell cocktail lounges", "Design District after-dark route"],
    localExperiences: ["Beach club recovery day", "Art and design afternoon", "Private boat window before dinner"],
    itinerarySuggestions: ["3 nights: race, beach and dining", "4 nights: add Keys-style recovery", "2 nights: sunlit event sprint"]
  },
  "las-vegas": {
    image: "/terminal-brand.jpg",
    imageAlt: "Cinematic luxury terminal scene for Las Vegas sports travel",
    bestTime: "November for night-race spectacle, March to May for golf weather, and key fight or arena weekends year-round.",
    events: ["Las Vegas Grand Prix", "NBA showcase events", "Fight nights and desert golf"],
    nightlife: ["High-floor cocktail rooms", "Chef-led casino dining", "Late-night lounge tables"],
    localExperiences: ["Desert golf tee time", "Spa recovery tower", "Private transfer to canyon viewpoints"],
    itinerarySuggestions: ["2 nights: arena or race weekend", "3 nights: add golf and spa", "4 nights: desert recovery extension"]
  },
  niseko: {
    image: "/terminal-brand.jpg",
    imageAlt: "Cinematic premium travel scene for Niseko ski travel",
    bestTime: "December to February for peak powder, March for softer spring skiing, and summer for golf and alpine wellness.",
    events: ["Powder ski season", "Private guide days", "Summer golf windows"],
    nightlife: ["Hirafu sake bars", "Fireplace lodge lounges", "Chef-led izakaya dinners"],
    localExperiences: ["Onsen recovery ritual", "Private ski guide morning", "Sapporo dining extension"],
    itinerarySuggestions: ["4 nights: powder, onsen and dining", "6 nights: add Sapporo and Lake Toya", "3 nights: alpine reset sprint"]
  },
  aspen: {
    image: "/lounge-hero.jpg",
    imageAlt: "Cinematic luxury lounge scene for Aspen mountain travel",
    bestTime: "December to March for skiing, June to September for mountain festivals and golf, and January for peak apres atmosphere.",
    events: ["Winter ski season", "Mountain festival weekends", "Summer golf and culture calendar"],
    nightlife: ["Champagne apres tables", "Fireplace hotel bars", "Private dining rooms near the gondola"],
    localExperiences: ["Private ski day", "Gallery and design walk", "Fireside tasting menu"],
    itinerarySuggestions: ["4 nights: ski, apres and gallery time", "5 nights: add Snowmass and spa recovery", "3 nights: luxury mountain sprint"]
  }
};

export function getDestinationGuides() {
  return cities.map((city) => getDestinationGuide(city.id)).filter((guide): guide is DestinationGuide => Boolean(guide));
}

export function getDestinationGuide(id: string): DestinationGuide | undefined {
  const city = cities.find((item) => item.id === id);
  const details = guideDetails[id];
  if (!city || !details) return undefined;

  return {
    city,
    ...details,
    gallery: buildGallery(city.id, city.name),
    experiences: experiences.filter((experience) => experience.cityId === id)
  };
}

function buildGallery(cityId: string, cityName: string): DestinationImage[] {
  const themes = galleryThemes[cityId] ?? [cityName, `${cityName} nightlife`, `${cityName} food`, `${cityName} luxury hotel`, `${cityName} landscape`];

  return themes.map((theme, index) => ({
    src: `/images/destinations/${cityId}-${index + 1}.jpg`,
    alt: `${cityName} ${galleryCategories[index % galleryCategories.length].toLowerCase()} cinematic travel imagery`,
    category: galleryCategories[index % galleryCategories.length],
    caption: theme
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }));
}
