import { cities, destinations, experiences, type City, type Experience } from "@/lib/trip-data";

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

type GalleryImageSource = Pick<DestinationImage, "src" | "category" | "caption">;

const destinationGalleries: Record<string, GalleryImageSource[]> = {
  melbourne: [
    { src: "https://images.unsplash.com/photo-1595434971780-79d5c20c5090?auto=format&fit=crop&w=1800&q=82", category: "Landscape", caption: "Melbourne Skyline" },
    { src: "https://images.unsplash.com/photo-1572479076096-e7889766e7fe?auto=format&fit=crop&w=1800&q=82", category: "Food", caption: "Melbourne Restaurant Culture" },
    { src: "https://images.unsplash.com/photo-1545151414-8a948e1ea54f?auto=format&fit=crop&w=1800&q=82", category: "Sports", caption: "Tennis Court Energy" },
    { src: "https://images.unsplash.com/photo-1755868725256-3369f8a6448c?auto=format&fit=crop&w=1800&q=82", category: "Luxury", caption: "Melbourne Luxury Hotel" },
    { src: "https://images.unsplash.com/photo-1689866015007-4f7b02bf04a4?auto=format&fit=crop&w=1800&q=82", category: "Nightlife", caption: "Melbourne Nightlife" }
  ],
  singapore: [
    { src: "https://images.unsplash.com/photo-1496939376851-89342e90adcd?auto=format&fit=crop&w=1800&q=82", category: "Landscape", caption: "Marina Bay Skyline" },
    { src: "https://images.unsplash.com/photo-1584198414538-f469f6fad430?auto=format&fit=crop&w=1800&q=82", category: "Food", caption: "Singapore Hawker Food" },
    { src: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1800&q=82", category: "Sports", caption: "Singapore Race Week" },
    { src: "https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=1800&q=82", category: "Luxury", caption: "Singapore Luxury Hotel" },
    { src: "https://images.unsplash.com/photo-1542114740389-9b46fb1e5be7?auto=format&fit=crop&w=1800&q=82", category: "Nightlife", caption: "Singapore Nightlife" }
  ],
  tokyo: [
    { src: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=1800&q=82", category: "Landscape", caption: "Tokyo Skyline" },
    { src: "https://images.unsplash.com/photo-1592466741848-20145fe5d6d7?auto=format&fit=crop&w=1800&q=82", category: "Food", caption: "Tokyo Sushi Counter" },
    { src: "https://images.unsplash.com/photo-1630999002837-8b560d13ee36?auto=format&fit=crop&w=1800&q=82", category: "Sports", caption: "Tokyo Stadium Night" },
    { src: "https://images.unsplash.com/photo-1604928141064-207cea6f571f?auto=format&fit=crop&w=1800&q=82", category: "Luxury", caption: "Tokyo Luxury Hotel" },
    { src: "https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?auto=format&fit=crop&w=1800&q=82", category: "Nightlife", caption: "Tokyo Nightlife" }
  ],
  london: [
    { src: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1800&q=82", category: "Landscape", caption: "London Skyline" },
    { src: "https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?auto=format&fit=crop&w=1800&q=82", category: "Food", caption: "London Dining" },
    { src: "https://images.unsplash.com/photo-1563580853176-38535245e8b6?auto=format&fit=crop&w=1800&q=82", category: "Sports", caption: "London Football Stadium" },
    { src: "https://images.unsplash.com/photo-1588021624472-f8345116c8f2?auto=format&fit=crop&w=1800&q=82", category: "Luxury", caption: "London Luxury Hotel" },
    { src: "https://images.unsplash.com/photo-1514729797186-944d57303199?auto=format&fit=crop&w=1800&q=82", category: "Nightlife", caption: "London Nightlife" }
  ],
  monaco: [
    { src: "https://images.unsplash.com/photo-1594161673326-7f91671d8e3b?auto=format&fit=crop&w=1800&q=82", category: "Landscape", caption: "Monaco Harbor" },
    { src: "https://images.unsplash.com/photo-1683290845590-a119b41e557c?auto=format&fit=crop&w=1800&q=82", category: "Food", caption: "Monaco Fine Dining" },
    { src: "https://images.unsplash.com/photo-1596109898239-d8f0b19790a2?auto=format&fit=crop&w=1800&q=82", category: "Sports", caption: "Monaco Grand Prix" },
    { src: "https://images.unsplash.com/photo-1491251880772-1fe1c8b6d5f6?auto=format&fit=crop&w=1800&q=82", category: "Luxury", caption: "Monaco Luxury Hotel" },
    { src: "https://images.unsplash.com/photo-1566806925366-46c8926ec71c?auto=format&fit=crop&w=1800&q=82", category: "Nightlife", caption: "Monte Carlo Nightlife" }
  ],
  paris: [
    { src: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?auto=format&fit=crop&w=1800&q=82", category: "Landscape", caption: "Paris Skyline" },
    { src: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1800&q=82", category: "Food", caption: "Paris Cafe Culture" },
    { src: "https://images.unsplash.com/photo-1749205530242-4c1779aacf99?auto=format&fit=crop&w=1800&q=82", category: "Sports", caption: "Roland-Garros Tennis" },
    { src: "https://images.unsplash.com/photo-1581262177533-1b1760b87952?auto=format&fit=crop&w=1800&q=82", category: "Luxury", caption: "Paris Luxury Hotel" },
    { src: "https://images.unsplash.com/photo-1507666664345-c49223375e33?auto=format&fit=crop&w=1800&q=82", category: "Nightlife", caption: "Paris Nightlife" }
  ],
  "new-york": [
    { src: "https://images.unsplash.com/photo-1570304816841-906a17d7b067?auto=format&fit=crop&w=1800&q=82", category: "Landscape", caption: "New York Skyline" },
    { src: "https://images.unsplash.com/photo-1634874495432-cb368c167e9b?auto=format&fit=crop&w=1800&q=82", category: "Food", caption: "New York Restaurant Scene" },
    { src: "https://images.unsplash.com/photo-1674327175233-51f4d1430eac?auto=format&fit=crop&w=1800&q=82", category: "Sports", caption: "Madison Square Garden" },
    { src: "https://images.unsplash.com/photo-1512498369875-56977abee2e8?auto=format&fit=crop&w=1800&q=82", category: "Luxury", caption: "New York Luxury Hotel" },
    { src: "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?auto=format&fit=crop&w=1800&q=82", category: "Nightlife", caption: "New York Nightlife" }
  ],
  miami: [
    { src: "https://images.unsplash.com/photo-1719422244246-93f887d610fc?auto=format&fit=crop&w=1800&q=82", category: "Landscape", caption: "Miami Skyline And Beach" },
    { src: "https://images.unsplash.com/photo-1585608234056-42814f70ff7a?auto=format&fit=crop&w=1800&q=82", category: "Food", caption: "Miami Restaurant Scene" },
    { src: "https://images.unsplash.com/photo-1711378329038-620af48ace51?auto=format&fit=crop&w=1800&q=82", category: "Sports", caption: "Miami Race Weekend" },
    { src: "https://images.unsplash.com/photo-1589083130544-0d6a2926e519?auto=format&fit=crop&w=1800&q=82", category: "Luxury", caption: "Miami Luxury Hotel" },
    { src: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&w=1800&q=82", category: "Nightlife", caption: "Miami Nightlife" }
  ],
  "las-vegas": [
    { src: "https://images.unsplash.com/photo-1581351721010-8cf859cb14a4?auto=format&fit=crop&w=1800&q=82", category: "Landscape", caption: "Las Vegas Strip" },
    { src: "https://images.unsplash.com/photo-1577334928618-2ff2bf09e827?auto=format&fit=crop&w=1800&q=82", category: "Food", caption: "Las Vegas Dining" },
    { src: "https://images.unsplash.com/photo-1705766291313-aacb20e419d1?auto=format&fit=crop&w=1800&q=82", category: "Sports", caption: "Las Vegas Arena" },
    { src: "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?auto=format&fit=crop&w=1800&q=82", category: "Luxury", caption: "Las Vegas Luxury Hotel" },
    { src: "https://images.unsplash.com/photo-1634400139456-292e44ca5327?auto=format&fit=crop&w=1800&q=82", category: "Nightlife", caption: "Las Vegas Nightlife" }
  ],
  niseko: [
    { src: "https://images.unsplash.com/photo-1695059564034-a6f547b330cd?auto=format&fit=crop&w=1800&q=82", category: "Landscape", caption: "Niseko Snow" },
    { src: "https://images.unsplash.com/photo-1629684782790-385ed5adb497?auto=format&fit=crop&w=1800&q=82", category: "Food", caption: "Japanese Izakaya Food" },
    { src: "https://images.unsplash.com/photo-1565992441121-4367c2967103?auto=format&fit=crop&w=1800&q=82", category: "Sports", caption: "Ski Resort" },
    { src: "https://images.unsplash.com/photo-1603038976282-a934dd09b746?auto=format&fit=crop&w=1800&q=82", category: "Luxury", caption: "Niseko Chalet" },
    { src: "https://images.unsplash.com/photo-1576829139489-09a55ddbb420?auto=format&fit=crop&w=1800&q=82", category: "Nightlife", caption: "Niseko Nightlife" }
  ],
  aspen: [
    { src: "https://images.unsplash.com/photo-1588222804969-1908b87afd88?auto=format&fit=crop&w=1800&q=82", category: "Landscape", caption: "Aspen Mountain" },
    { src: "https://images.unsplash.com/photo-1658865695766-181a1ea9bac6?auto=format&fit=crop&w=1800&q=82", category: "Food", caption: "Colorado Restaurant" },
    { src: "https://images.unsplash.com/photo-1614444894791-c0c4d4286c35?auto=format&fit=crop&w=1800&q=82", category: "Sports", caption: "Aspen Skiing" },
    { src: "https://images.unsplash.com/photo-1777612914411-0151f5fca99f?auto=format&fit=crop&w=1800&q=82", category: "Luxury", caption: "Aspen Luxury Hotel" },
    { src: "https://images.unsplash.com/photo-1578451779798-c250e75fd0e1?auto=format&fit=crop&w=1800&q=82", category: "Nightlife", caption: "Aspen Nightlife" }
  ]
};

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
  if (!city) return undefined;
  const details = guideDetails[id] ?? fallbackGuideDetails(city);

  return {
    city,
    ...details,
    gallery: buildGallery(city.id, city.name),
    experiences: experiences.filter((experience) => experience.cityId === id)
  };
}

function buildGallery(cityId: string, cityName: string): DestinationImage[] {
  const destination = destinations.find((item) => item.id === cityId);
  const gallery = destination?.imageGallery ?? destinationGalleries[cityId] ?? [];

  return gallery.map((image): DestinationImage => ({
    ...image,
    alt:
      "alt" in image && typeof image.alt === "string" && image.alt.trim().length > 0
        ? image.alt
        : `${cityName} ${image.category.toLowerCase()} cinematic travel imagery`
  }));
}

function fallbackGuideDetails(city: City): Omit<DestinationGuide, "city" | "experiences" | "gallery"> {
  return {
    image: "/lounge-hero.jpg",
    imageAlt: `Premium travel imagery for ${city.name}`,
    bestTime: `Estimated MVP guidance: choose shoulder seasons where possible for ${city.name}, then align dates around major events, weather and hotel value.`,
    events: city.sports.length ? city.sports.map((sport) => `${sport} calendar windows`) : ["Seasonal festivals", "Food and culture weekends", "Local event windows"],
    nightlife: city.tags.includes("nightlife") ? ["Hotel lounges", "Late dining rooms", "Neighbourhood bars"] : ["Low-key hotel bar", "Sunset drinks", "Dinner-led evenings"],
    localExperiences: city.activities,
    itinerarySuggestions: [`${city.nights} nights: ${city.activities.slice(0, 2).join(" and ")}`, `Pair with nearby ${city.country} destinations for a modular route`, `Use as a ${city.prominence} stop in a smarter route`]
  };
}
