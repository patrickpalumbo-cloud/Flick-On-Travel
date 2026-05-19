export type CountryName = "Italy" | "France" | "Spain" | "Germany" | "UK" | "Portugal" | "Greece" | "Japan" | "USA" | "Australia";
export type Region = "Europe" | "Asia-Pacific" | "North America";
export type Budget = "Essential" | "Elevated" | "First Class";
export type Interest =
  | "beach"
  | "historical"
  | "nightlife"
  | "culture"
  | "hidden gem"
  | "well known"
  | "quiet / relaxed"
  | "luxury"
  | "sport"
  | "family friendly"
  | "food"
  | "shopping"
  | "adventure"
  | "skiing"
  | "upcoming";
export type Sport = "Formula 1" | "Tennis" | "Football" | "Golf" | "Basketball" | "Skiing";
export type TravelStyle = "Luxury" | "Culture" | "Beach" | "Food" | "Sport" | "Family" | "Adventure";
export type Pace = "Relaxed" | "Balanced" | "Fast";
export type GemPreference = "Iconic" | "Balanced" | "Hidden gems";
export type DestinationPopularity = "popular" | "upcoming" | "hidden gem" | "quiet alternative";
export type DestinationProminence = "well known" | DestinationPopularity;
export type DestinationImageCategory = "Sports" | "Nightlife" | "Food" | "Luxury" | "Landscape" | "Culture" | "Wellness";

export const countries: CountryName[] = ["Italy", "France", "Spain", "Germany", "UK", "Portugal", "Greece", "Japan", "USA", "Australia"];
export const regions: Region[] = ["Europe", "Asia-Pacific", "North America"];
export const budgets: Budget[] = ["Essential", "Elevated", "First Class"];
export const interests: Interest[] = [
  "beach",
  "historical",
  "nightlife",
  "culture",
  "hidden gem",
  "well known",
  "quiet / relaxed",
  "luxury",
  "sport",
  "family friendly",
  "food",
  "shopping",
  "adventure",
  "skiing",
  "upcoming"
];
export const sports: Sport[] = ["Formula 1", "Tennis", "Football", "Golf", "Basketball", "Skiing"];
export const travelStyles: TravelStyle[] = ["Luxury", "Culture", "Beach", "Food", "Sport", "Family", "Adventure"];
export const paces: Pace[] = ["Relaxed", "Balanced", "Fast"];
export const gemPreferences: GemPreference[] = ["Iconic", "Balanced", "Hidden gems"];
export const allCountryRegions = "All regions";



export type ImageGalleryItem = {
  src: string;
  alt: string;
  caption: string;
  category: DestinationImageCategory;
  isFallback?: boolean;
};

export type Destination = {
  id: string;
  name: string;
  country: CountryName;
  region: Region;
  countryRegion: string;
  description: string;
  popularity: DestinationPopularity;
  prominence: DestinationProminence;
  tags: Interest[];
  idealNights: number;
  nearbyDestinations: string[];
  imageGallery: ImageGalleryItem[];
  sportsExperiences: Sport[];
  bestFor: string[];
  airportCode?: string;
  lat: number;
  lon: number;
  activities: string[];
};

export type RouteConnection = {
  fromDestination: string;
  toDestination: string;
  fromDestinationId: string;
  toDestinationId: string;
  approximateDistanceKm: number;
  flightTime: string;
  trainAvailable: boolean;
  trainTime?: string;
  recommendedTransport: string;
  notes: string;
};

type DestinationSeed = {
  name: string;
  country: CountryName;
  countryRegion: string;
  idealNights: number;
  tags: Interest[];
  sportsExperiences: Sport[];
  prominence: DestinationProminence;
  lat: number;
  lon: number;
  description: string;
  activities: string[];
};

const globalRegionByCountry: Record<CountryName, Region> = {
  Italy: "Europe",
  France: "Europe",
  Spain: "Europe",
  Germany: "Europe",
  UK: "Europe",
  Portugal: "Europe",
  Greece: "Europe",
  Japan: "Asia-Pacific",
  USA: "North America",
  Australia: "Asia-Pacific"
};



function destinationSeed(name: string, country: CountryName, countryRegion: string, nights: number, tags: Interest[], sports: Sport[], prominence: DestinationProminence, lat: number, lon: number, headline: string, activities: string[]): DestinationSeed {
  return { name, country, countryRegion, idealNights: nights, tags, sportsExperiences: sports, prominence, lat, lon, description: headline, activities };
}

const destinationSeeds: DestinationSeed[] = [
  destinationSeed("Rome", "Italy", "Lazio", 3, ["historical", "culture", "food", "well known", "luxury"], ["Football", "Tennis"], "well known", 41.9028, 12.4964, "Ancient history, cinematic hotels and late Roman dining.", ["Colosseum and private guide", "Trastevere dinner", "Olympico fixture"]),
  destinationSeed("Florence", "Italy", "Tuscany", 2, ["historical", "culture", "food", "shopping", "well known"], ["Football"], "well known", 43.7696, 11.2558, "Renaissance art, Tuscan dining and boutique hotel elegance.", ["Uffizi morning", "Leather ateliers", "Tuscan wine bar"]),
  destinationSeed("Venice", "Italy", "Veneto", 2, ["historical", "culture", "luxury", "well known", "quiet / relaxed"], [], "well known", 45.4408, 12.3155, "Waterfront palaces and slow, atmospheric luxury.", ["Private water taxi", "Cicchetti crawl", "Island lunch"]),
  destinationSeed("Milan", "Italy", "Lombardy", 2, ["shopping", "nightlife", "luxury", "food", "sport"], ["Football", "Formula 1"], "popular", 45.4642, 9.19, "Fashion, design hotels and San Siro energy.", ["Quadrilatero shopping", "San Siro night", "Aperitivo route"]),
  destinationSeed("Lake Como", "Italy", "Lombardy", 2, ["luxury", "quiet / relaxed", "hidden gem", "adventure"], ["Golf"], "popular", 45.984, 9.257, "Lakeside villas, boat days and polished calm.", ["Private boat day", "Villa gardens", "Lakeside dinner"]),
  destinationSeed("Naples", "Italy", "Campania", 2, ["food", "historical", "nightlife", "upcoming"], ["Football"], "upcoming", 40.8518, 14.2681, "Raw energy, elite pizza and access to Pompeii.", ["Pizza pilgrimage", "Pompeii day", "Seafront walk"]),
  destinationSeed("Amalfi Coast", "Italy", "Campania", 3, ["beach", "luxury", "well known", "quiet / relaxed"], [], "well known", 40.6333, 14.6029, "Cliffside hotels, beach clubs and slow coastal days.", ["Positano beach club", "Ravello lunch", "Coastal drive"]),
  destinationSeed("Puglia", "Italy", "Puglia", 3, ["beach", "food", "hidden gem", "quiet / relaxed", "family friendly"], [], "hidden gem", 40.7928, 17.1012, "Whitewashed towns, beaches and relaxed southern dining.", ["Ostuni afternoon", "Masseria dinner", "Cove swim"]),
  destinationSeed("Bologna", "Italy", "Emilia-Romagna", 2, ["food", "historical", "hidden gem", "culture"], ["Football"], "hidden gem", 44.4949, 11.3426, "Italy's most delicious city with elegant porticoes.", ["Pasta class", "Portico walk", "Market lunch"]),
  destinationSeed("Sicily", "Italy", "Sicily", 4, ["beach", "historical", "food", "adventure", "hidden gem"], [], "popular", 37.599, 14.0154, "Ancient ruins, volcanic landscapes and coastal hotels.", ["Taormina dinner", "Etna day", "Beach club reset"]),

  destinationSeed("Paris", "France", "Ile-de-France", 3, ["well known", "culture", "food", "shopping", "luxury", "sport"], ["Tennis", "Football", "Basketball"], "well known", 48.8566, 2.3522, "Palace hotels, grand-slam glamour and long lunches.", ["Roland-Garros", "Left Bank galleries", "Palace bar"]),
  destinationSeed("Nice", "France", "French Riviera", 2, ["beach", "luxury", "food", "well known"], ["Football"], "popular", 43.7102, 7.262, "Sunlit Riviera base with beach clubs and coastal rail.", ["Promenade walk", "Beach club", "Old town dinner"]),
  destinationSeed("Monaco", "France", "French Riviera", 2, ["luxury", "sport", "nightlife", "well known"], ["Formula 1", "Tennis"], "well known", 43.7384, 7.4246, "Compact Riviera spectacle for F1, tennis and yacht-club evenings.", ["Harbor circuit", "Casino square", "Coastal lunch"]),
  destinationSeed("Lyon", "France", "Auvergne-Rhone-Alpes", 2, ["food", "historical", "culture", "hidden gem"], ["Football"], "hidden gem", 45.764, 4.8357, "France's culinary capital with calmer luxury value.", ["Bouchon dinner", "Old Lyon", "Rhone wine bar"]),
  destinationSeed("Bordeaux", "France", "Nouvelle-Aquitaine", 2, ["food", "culture", "luxury", "quiet / relaxed"], ["Football"], "popular", 44.8378, -0.5792, "Wine country polish with riverfront architecture.", ["Wine tasting", "Riverfront dinner", "Museum afternoon"]),
  destinationSeed("Provence", "France", "Provence", 3, ["quiet / relaxed", "food", "culture", "hidden gem", "luxury"], [], "quiet alternative", 43.9493, 4.8055, "Lavender landscapes, market towns and villa-style stays.", ["Market morning", "Vineyard lunch", "Hill town drive"]),
  destinationSeed("Chamonix", "France", "French Alps", 3, ["adventure", "sport", "skiing", "luxury"], ["Skiing", "Golf"], "popular", 45.9237, 6.8694, "Alpine drama with ski days and fireplace dining.", ["Aiguille du Midi", "Ski guide", "Spa recovery"]),
  destinationSeed("Annecy", "France", "Auvergne-Rhone-Alpes", 2, ["quiet / relaxed", "hidden gem", "family friendly", "adventure"], [], "hidden gem", 45.8992, 6.1294, "Lake swims, alpine scenery and a softer pace.", ["Lake cycle", "Old town lunch", "Mountain viewpoint"]),

  destinationSeed("Barcelona", "Spain", "Catalonia", 3, ["beach", "food", "nightlife", "culture", "sport", "well known"], ["Football", "Formula 1"], "well known", 41.3874, 2.1686, "Gaudi architecture, beach energy and elite football.", ["Gaudi route", "Beach lunch", "Match night"]),
  destinationSeed("Madrid", "Spain", "Community of Madrid", 3, ["culture", "food", "nightlife", "shopping", "sport"], ["Football", "Tennis", "Basketball"], "well known", 40.4168, -3.7038, "Museums, late dinners and big-club football.", ["Prado morning", "Tapas crawl", "Bernabeu night"]),
  destinationSeed("Seville", "Spain", "Andalusia", 2, ["historical", "culture", "food", "quiet / relaxed"], ["Football"], "popular", 37.3891, -5.9845, "Moorish palaces, orange trees and warm evenings.", ["Alcazar visit", "Flamenco night", "Rooftop dinner"]),
  destinationSeed("Ibiza", "Spain", "Balearic Islands", 3, ["beach", "nightlife", "luxury", "well known"], [], "well known", 38.9067, 1.4206, "Beach clubs, villas and late-night energy.", ["Beach club", "Old town dinner", "Sunset table"]),
  destinationSeed("Mallorca", "Spain", "Balearic Islands", 3, ["beach", "family friendly", "quiet / relaxed", "luxury"], ["Golf"], "popular", 39.6953, 3.0176, "Resort polish, coves and mountain drives.", ["Cove swim", "Palma dinner", "Tramuntana drive"]),
  destinationSeed("San Sebastian", "Spain", "Basque Country", 2, ["food", "beach", "hidden gem", "culture"], ["Football"], "hidden gem", 43.3183, -1.9812, "Pintxos, surf and a refined smaller-city rhythm.", ["Pintxos crawl", "La Concha walk", "Basque tasting menu"]),
  destinationSeed("Valencia", "Spain", "Valencian Community", 2, ["beach", "food", "family friendly", "upcoming"], ["Football"], "upcoming", 39.4699, -0.3763, "Paella, design-forward architecture and beach calm.", ["Market lunch", "City of Arts", "Beach afternoon"]),
  destinationSeed("Granada", "Spain", "Andalusia", 2, ["historical", "culture", "hidden gem", "quiet / relaxed"], [], "hidden gem", 37.1773, -3.5986, "Alhambra drama with a slower southern pace.", ["Alhambra", "Albaicin walk", "Tapas evening"]),

  destinationSeed("Berlin", "Germany", "Berlin-Brandenburg", 3, ["culture", "nightlife", "historical", "upcoming"], ["Football", "Basketball"], "well known", 52.52, 13.405, "Creative culture, history and electric nightlife.", ["Museum Island", "Club lounge", "Match night"]),
  destinationSeed("Munich", "Germany", "Bavaria", 2, ["luxury", "food", "culture", "sport"], ["Football", "Skiing"], "popular", 48.1351, 11.582, "Polished Bavarian hotels, football and alpine access.", ["Beer hall dinner", "Allianz Arena", "Alpine day"]),
  destinationSeed("Hamburg", "Germany", "Northern Germany", 2, ["nightlife", "food", "culture", "hidden gem"], ["Football"], "hidden gem", 53.5511, 9.9937, "Harbor style, music venues and waterfront dining.", ["Harbor cruise", "Reeperbahn night", "Warehouse district"]),
  destinationSeed("Cologne", "Germany", "North Rhine-Westphalia", 2, ["historical", "culture", "family friendly"], ["Football"], "quiet alternative", 50.9375, 6.9603, "Cathedral grandeur and relaxed Rhine-side routing.", ["Cathedral", "Rhine walk", "Brauhaus dinner"]),
  destinationSeed("Frankfurt", "Germany", "Hesse", 1, ["shopping", "food", "well known"], ["Football"], "popular", 50.1109, 8.6821, "A practical premium hub with skyline hotels.", ["Old town", "Skyline bar", "Transfer night"]),
  destinationSeed("Dresden", "Germany", "Saxony", 2, ["historical", "culture", "hidden gem", "quiet / relaxed"], [], "hidden gem", 51.0504, 13.7373, "Baroque beauty with gentler crowds.", ["Old masters gallery", "Elbe walk", "Opera square"]),
  destinationSeed("Black Forest", "Germany", "Baden-Wurttemberg", 3, ["quiet / relaxed", "adventure", "family friendly", "hidden gem"], [], "quiet alternative", 48.2775, 8.185, "Spa towns, forest drives and family-friendly nature.", ["Thermal spa", "Forest hike", "Village lunch"]),
  destinationSeed("Garmisch-Partenkirchen", "Germany", "Bavarian Alps", 3, ["adventure", "sport", "quiet / relaxed"], ["Skiing", "Golf"], "hidden gem", 47.4917, 11.0955, "Alpine scenery without the flashier resort crowds.", ["Zugspitze", "Ski day", "Mountain dinner"]),

  destinationSeed("London", "UK", "England", 3, ["well known", "culture", "food", "shopping", "sport", "luxury"], ["Football", "Tennis", "Basketball"], "well known", 51.5074, -0.1278, "Premier League weekends, galleries and heritage hotels.", ["Fixture planner", "West End dinner", "Wimbledon strategy"]),
  destinationSeed("Bath", "UK", "England", 2, ["historical", "quiet / relaxed", "luxury", "hidden gem"], [], "quiet alternative", 51.3811, -2.359, "Georgian elegance and spa-town calm.", ["Roman baths", "Afternoon tea", "Country inn dinner"]),
  destinationSeed("Cotswolds", "UK", "England", 3, ["quiet / relaxed", "luxury", "family friendly", "hidden gem"], [], "hidden gem", 51.833, -1.843, "Soft countryside, manor hotels and village lunches.", ["Village drive", "Manor lunch", "Garden walk"]),
  destinationSeed("Edinburgh", "UK", "Scotland", 2, ["historical", "culture", "food", "well known"], ["Football", "Golf"], "popular", 55.9533, -3.1883, "Castle drama, whisky bars and festival energy.", ["Castle walk", "Whisky tasting", "New Town dinner"]),
  destinationSeed("St Andrews", "UK", "Scotland", 2, ["sport", "quiet / relaxed", "luxury"], ["Golf"], "popular", 56.3398, -2.7967, "Golf pilgrimage with coastal calm.", ["Old Course walk", "Coastal lunch", "Whisky bar"]),
  destinationSeed("Manchester", "UK", "England", 2, ["sport", "nightlife", "food", "upcoming"], ["Football"], "popular", 53.4808, -2.2426, "Football, music heritage and confident dining.", ["Stadium tour", "Northern Quarter", "Music night"]),
  destinationSeed("Cornwall", "UK", "England", 3, ["beach", "family friendly", "quiet / relaxed", "adventure"], ["Golf"], "quiet alternative", 50.266, -5.0527, "Coastal walks, surf beaches and boutique inns.", ["Coastal walk", "Seafood lunch", "Surf lesson"]),
  destinationSeed("Lake District", "UK", "England", 3, ["adventure", "quiet / relaxed", "family friendly", "hidden gem"], [], "quiet alternative", 54.4609, -3.0886, "Lakes, hiking and fireside hotels.", ["Lake cruise", "Hill walk", "Inn dinner"]),

  destinationSeed("Lisbon", "Portugal", "Lisbon Region", 3, ["food", "culture", "nightlife", "well known"], ["Football"], "well known", 38.7223, -9.1393, "Tile-lined hills, Atlantic light and polished boutique stays.", ["Alfama walk", "Fado dinner", "Rooftop drinks"]),
  destinationSeed("Porto", "Portugal", "North", 2, ["food", "historical", "culture", "quiet / relaxed"], ["Football"], "popular", 41.1579, -8.6291, "Riverfront wine lodges and atmospheric dining.", ["Port tasting", "Ribeira walk", "Seafood dinner"]),
  destinationSeed("Comporta", "Portugal", "Alentejo Coast", 3, ["beach", "luxury", "quiet / relaxed", "hidden gem"], [], "hidden gem", 38.3804, -8.7868, "Barefoot luxury, dunes and long seafood lunches.", ["Beach day", "Rice-field dinner", "Design hotel reset"]),
  destinationSeed("Algarve", "Portugal", "Algarve", 3, ["beach", "family friendly", "luxury", "well known"], ["Golf"], "popular", 37.0179, -7.9308, "Cliff beaches, resorts and golf-friendly days.", ["Cove swim", "Golf morning", "Marina dinner"]),
  destinationSeed("Madeira", "Portugal", "Madeira", 4, ["adventure", "hidden gem", "quiet / relaxed", "food"], [], "upcoming", 32.7607, -16.9595, "Island hikes, ocean views and a rising luxury scene.", ["Levada hike", "Ocean lunch", "Funchal market"]),
  destinationSeed("Azores", "Portugal", "Azores", 4, ["adventure", "hidden gem", "quiet / relaxed", "family friendly"], [], "hidden gem", 37.7412, -25.6756, "Volcanic lakes, whale watching and deep nature.", ["Sete Cidades", "Whale watching", "Thermal pools"]),
  destinationSeed("Douro Valley", "Portugal", "North", 2, ["food", "luxury", "quiet / relaxed", "hidden gem"], [], "hidden gem", 41.1579, -7.789, "Vineyard hotels and slow river landscapes.", ["Wine estate lunch", "River cruise", "Terrace dinner"]),
  destinationSeed("Sintra", "Portugal", "Lisbon Region", 1, ["historical", "culture", "family friendly", "well known"], [], "popular", 38.8029, -9.3817, "Palaces and forested hills close to Lisbon.", ["Pena Palace", "Old town", "Coastal viewpoint"]),

  destinationSeed("Athens", "Greece", "Attica", 2, ["historical", "culture", "food", "well known"], ["Basketball", "Football"], "well known", 37.9838, 23.7275, "Ancient history, rooftop dining and island access.", ["Acropolis", "Rooftop dinner", "Basketball night"]),
  destinationSeed("Santorini", "Greece", "Cyclades", 3, ["beach", "luxury", "well known", "quiet / relaxed"], [], "well known", 36.3932, 25.4615, "Caldera views, cave hotels and sunset dining.", ["Caldera walk", "Winery lunch", "Sunset dinner"]),
  destinationSeed("Mykonos", "Greece", "Cyclades", 3, ["beach", "nightlife", "luxury", "well known"], [], "well known", 37.4467, 25.3289, "Beach clubs, villas and high-summer energy.", ["Beach club", "Old port dinner", "Late table"]),
  destinationSeed("Crete", "Greece", "Crete", 4, ["beach", "historical", "food", "family friendly", "adventure"], [], "popular", 35.2401, 24.8093, "Big-island variety: beaches, villages and ancient sites.", ["Beach cove", "Knossos", "Village lunch"]),
  destinationSeed("Naxos", "Greece", "Cyclades", 3, ["beach", "family friendly", "hidden gem", "quiet / relaxed"], [], "hidden gem", 37.1021, 25.3764, "A calmer Cycladic island with beaches and local food.", ["Beach day", "Old town", "Farm dinner"]),
  destinationSeed("Paros", "Greece", "Cyclades", 3, ["beach", "upcoming", "nightlife", "food"], [], "upcoming", 37.0856, 25.1488, "Stylish but softer island energy.", ["Naoussa dinner", "Boat day", "Village lunch"]),
  destinationSeed("Corfu", "Greece", "Ionian Islands", 3, ["beach", "historical", "family friendly", "quiet / relaxed"], [], "popular", 39.6243, 19.9217, "Ionian color, beaches and old-town charm.", ["Old town walk", "Cove swim", "Seafood lunch"]),
  destinationSeed("Meteora", "Greece", "Thessaly", 2, ["historical", "adventure", "hidden gem", "quiet / relaxed"], [], "hidden gem", 39.7217, 21.6306, "Monasteries suspended above dramatic rock landscapes.", ["Monastery visit", "Sunset viewpoint", "Hike"]),

  destinationSeed("Tokyo", "Japan", "Kanto", 4, ["food", "culture", "shopping", "nightlife", "sport", "luxury"], ["Tennis", "Basketball", "Football"], "well known", 35.6762, 139.6503, "Precision dining, design hotels and arena nights.", ["Omakase", "Ginza lounge", "Arena night"]),
  destinationSeed("Kyoto", "Japan", "Kansai", 3, ["historical", "culture", "food", "well known", "quiet / relaxed"], [], "well known", 35.0116, 135.7681, "Temples, ryokan calm and graceful dining.", ["Temple morning", "Kaiseki", "Gion walk"]),
  destinationSeed("Osaka", "Japan", "Kansai", 2, ["food", "nightlife", "shopping", "sport"], ["Basketball", "Football"], "popular", 34.6937, 135.5023, "Street food, neon nights and easy Kansai routing.", ["Dotonbori", "Market lunch", "Baseball night"]),
  destinationSeed("Hakone", "Japan", "Kanto", 2, ["quiet / relaxed", "luxury", "hidden gem", "family friendly"], [], "popular", 35.2324, 139.1069, "Onsen ryokan, mountain views and Tokyo decompression.", ["Onsen", "Lake Ashi", "Ryokan dinner"]),
  destinationSeed("Niseko", "Japan", "Hokkaido", 4, ["sport", "adventure", "luxury", "quiet / relaxed"], ["Skiing", "Golf"], "popular", 42.8048, 140.6874, "Powder mornings, onsen and lodge luxury.", ["Ski guide", "Onsen", "Izakaya"]),
  destinationSeed("Sapporo", "Japan", "Hokkaido", 2, ["food", "culture", "sport", "hidden gem"], ["Skiing"], "hidden gem", 43.0618, 141.3545, "Snow festivals, ramen and Hokkaido gateway comfort.", ["Ramen alley", "Snow festival", "Beer hall"]),
  destinationSeed("Kanazawa", "Japan", "Chubu", 2, ["culture", "historical", "food", "hidden gem"], [], "hidden gem", 36.5613, 136.6562, "Gardens, crafts and calm cultural depth.", ["Kenrokuen", "Sushi lunch", "Craft district"]),
  destinationSeed("Naoshima", "Japan", "Setouchi", 2, ["culture", "hidden gem", "quiet / relaxed", "luxury"], [], "hidden gem", 34.4592, 133.995, "Art island minimalism with a reflective pace.", ["Museum day", "Island cycle", "Design hotel"]),

  destinationSeed("New York", "USA", "Northeast", 3, ["well known", "nightlife", "food", "shopping", "sport", "luxury"], ["Tennis", "Basketball", "Football"], "well known", 40.7128, -74.006, "Big-event nights, rooftop tables and broad hotel choice.", ["US Open", "MSG night", "Downtown dinner"]),
  destinationSeed("Miami", "USA", "Florida", 3, ["beach", "nightlife", "luxury", "sport"], ["Formula 1", "Tennis", "Basketball"], "well known", 25.7617, -80.1918, "Sunlit race weekends, beaches and late dinners.", ["Beach club", "F1 weekend", "Design District"]),
  destinationSeed("Las Vegas", "USA", "Nevada", 2, ["nightlife", "food", "sport", "luxury"], ["Formula 1", "Basketball", "Golf"], "well known", 36.1699, -115.1398, "High-gloss sport weekends with spa mornings.", ["Arena night", "Desert golf", "Chef dinner"]),
  destinationSeed("Los Angeles", "USA", "California", 3, ["beach", "food", "shopping", "sport", "well known"], ["Basketball", "Football", "Tennis"], "well known", 34.0522, -118.2437, "Beach-to-arena travel with design hotels.", ["Courtside night", "Malibu lunch", "Gallery hop"]),
  destinationSeed("San Francisco", "USA", "California", 2, ["food", "culture", "family friendly", "luxury"], ["Basketball", "Golf"], "popular", 37.7749, -122.4194, "Bay views, dining and wine country access.", ["Ferry Building", "Warriors night", "Napa day"]),
  destinationSeed("Aspen", "USA", "Colorado", 4, ["sport", "luxury", "quiet / relaxed", "adventure"], ["Skiing", "Golf"], "well known", 39.1911, -106.8175, "Iconic mountain luxury, slopes and galleries.", ["Ski day", "Apres", "Gallery walk"]),
  destinationSeed("Charleston", "USA", "Southeast", 2, ["food", "historical", "hidden gem", "quiet / relaxed"], ["Golf"], "hidden gem", 32.7765, -79.9311, "Southern charm, dining and coastal ease.", ["Historic walk", "Lowcountry dinner", "Beach drive"]),
  destinationSeed("Austin", "USA", "Texas", 2, ["nightlife", "food", "upcoming", "sport"], ["Formula 1", "Football"], "upcoming", 30.2672, -97.7431, "Music, barbecue and race-weekend energy.", ["Live music", "BBQ lunch", "COTA weekend"]),
  destinationSeed("Maui", "USA", "Hawaii", 4, ["beach", "luxury", "family friendly", "quiet / relaxed", "adventure"], ["Golf"], "well known", 20.7984, -156.3319, "Resort calm, beaches and road-trip drama.", ["Beach day", "Haleakala", "Golf morning"]),

  destinationSeed("Sydney", "Australia", "New South Wales", 3, ["beach", "food", "sport", "well known", "luxury"], ["Tennis", "Football", "Basketball", "Golf"], "well known", -33.8688, 151.2093, "Harbor glamour, beach days and stadium energy.", ["Harbor lunch", "Bondi morning", "Stadium night"]),
  destinationSeed("Melbourne", "Australia", "Victoria", 3, ["food", "culture", "nightlife", "sport"], ["Formula 1", "Tennis", "Football"], "well known", -37.8136, 144.9631, "Grand prix energy, laneway dining and late checkout recovery.", ["Australian Open", "Albert Park", "Laneway dinner"]),
  destinationSeed("Byron Bay", "Australia", "New South Wales", 3, ["beach", "quiet / relaxed", "food", "upcoming"], [], "popular", -28.6474, 153.602, "Barefoot luxury, wellness mornings and surf-town dining.", ["Beach walk", "Wellness morning", "Farm dinner"]),
  destinationSeed("Gold Coast", "Australia", "Queensland", 3, ["beach", "family friendly", "nightlife", "sport"], ["Golf"], "popular", -28.0167, 153.4, "Beach towers, theme parks and relaxed resort pacing.", ["Surf lesson", "Theme park", "Rooftop dinner"]),
  destinationSeed("Whitsundays", "Australia", "Queensland", 4, ["beach", "luxury", "quiet / relaxed", "adventure"], [], "well known", -20.344, 148.957, "Island resorts, reef flights and bright-blue escapes.", ["Whitehaven Beach", "Reef flight", "Sailing day"]),
  destinationSeed("Tasmania", "Australia", "Tasmania", 4, ["food", "adventure", "hidden gem", "quiet / relaxed"], ["Golf"], "hidden gem", -42.0409, 146.8087, "Wild landscapes, art hotels and serious produce.", ["MONA", "Coastal hike", "Wine dinner"]),
  destinationSeed("Perth", "Australia", "Western Australia", 3, ["beach", "food", "quiet / relaxed", "upcoming"], ["Football", "Golf"], "upcoming", -31.9523, 115.8613, "Indian Ocean beaches and a polished slower city rhythm.", ["Cottesloe", "Fremantle lunch", "Swan Valley"]),
  destinationSeed("Adelaide", "Australia", "South Australia", 2, ["food", "hidden gem", "quiet / relaxed", "culture"], ["Football", "Golf"], "hidden gem", -34.9285, 138.6007, "Wine regions, festivals and an easy premium base.", ["Central Market", "Barossa day", "Festival night"]),
  destinationSeed("Noosa", "Australia", "Queensland", 3, ["beach", "family friendly", "luxury", "quiet / relaxed"], [], "quiet alternative", -26.397, 153.09, "Polished beach calm with national-park walks.", ["Main Beach", "National park", "River dinner"])

];

const airportCodes: Record<string, string> = {
  rome: "FCO", florence: "FLR", venice: "VCE", milan: "MXP", naples: "NAP", paris: "CDG", nice: "NCE", monaco: "NCE", lyon: "LYS", bordeaux: "BOD", barcelona: "BCN", madrid: "MAD", seville: "SVQ", ibiza: "IBZ", mallorca: "PMI", valencia: "VLC", berlin: "BER", munich: "MUC", hamburg: "HAM", frankfurt: "FRA", london: "LHR", edinburgh: "EDI", manchester: "MAN", lisbon: "LIS", porto: "OPO", algarve: "FAO", madeira: "FNC", azores: "PDL", athens: "ATH", santorini: "JTR", mykonos: "JMK", crete: "HER", corfu: "CFU", tokyo: "HND", kyoto: "KIX", osaka: "KIX", hakone: "HND", niseko: "CTS", sapporo: "CTS", kanazawa: "KMQ", "new-york": "JFK", miami: "MIA", "las-vegas": "LAS", "los-angeles": "LAX", "san-francisco": "SFO", aspen: "ASE", charleston: "CHS", austin: "AUS", maui: "OGG", sydney: "SYD", melbourne: "MEL", "byron-bay": "BNK", "gold-coast": "OOL", whitsundays: "HTI", tasmania: "HBA", perth: "PER", adelaide: "ADL"
};

const curatedDestinationImages: Record<string, Array<Omit<ImageGalleryItem, "alt">>> = {
  tokyo: [
    { src: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=1800&q=82", category: "Landscape", caption: "Tokyo skyline" },
    { src: "https://images.unsplash.com/photo-1592466741848-20145fe5d6d7?auto=format&fit=crop&w=1800&q=82", category: "Food", caption: "Tokyo sushi counter" },
    { src: "https://images.unsplash.com/photo-1630999002837-8b560d13ee36?auto=format&fit=crop&w=1800&q=82", category: "Sports", caption: "Tokyo stadium night" },
    { src: "https://images.unsplash.com/photo-1604928141064-207cea6f571f?auto=format&fit=crop&w=1800&q=82", category: "Luxury", caption: "Tokyo hotel calm" },
    { src: "https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?auto=format&fit=crop&w=1800&q=82", category: "Nightlife", caption: "Tokyo after dark" }
  ],
  london: [
    { src: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1800&q=82", category: "Landscape", caption: "London skyline" },
    { src: "https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?auto=format&fit=crop&w=1800&q=82", category: "Food", caption: "London dining" },
    { src: "https://images.unsplash.com/photo-1563580853176-38535245e8b6?auto=format&fit=crop&w=1800&q=82", category: "Sports", caption: "London football stadium" },
    { src: "https://images.unsplash.com/photo-1588021624472-f8345116c8f2?auto=format&fit=crop&w=1800&q=82", category: "Luxury", caption: "London luxury hotel" },
    { src: "https://images.unsplash.com/photo-1514729797186-944d57303199?auto=format&fit=crop&w=1800&q=82", category: "Nightlife", caption: "London nightlife" }
  ],
  monaco: [
    { src: "https://images.unsplash.com/photo-1594161673326-7f91671d8e3b?auto=format&fit=crop&w=1800&q=82", category: "Landscape", caption: "Monaco harbor" },
    { src: "https://images.unsplash.com/photo-1683290845590-a119b41e557c?auto=format&fit=crop&w=1800&q=82", category: "Food", caption: "Monaco fine dining" },
    { src: "https://images.unsplash.com/photo-1596109898239-d8f0b19790a2?auto=format&fit=crop&w=1800&q=82", category: "Sports", caption: "Monaco grand prix" },
    { src: "https://images.unsplash.com/photo-1491251880772-1fe1c8b6d5f6?auto=format&fit=crop&w=1800&q=82", category: "Luxury", caption: "Monaco luxury hotel" },
    { src: "https://images.unsplash.com/photo-1566806925366-46c8926ec71c?auto=format&fit=crop&w=1800&q=82", category: "Nightlife", caption: "Monte Carlo nightlife" }
  ],
  paris: [
    { src: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?auto=format&fit=crop&w=1800&q=82", category: "Landscape", caption: "Paris skyline" },
    { src: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1800&q=82", category: "Food", caption: "Paris cafe culture" },
    { src: "https://images.unsplash.com/photo-1749205530242-4c1779aacf99?auto=format&fit=crop&w=1800&q=82", category: "Sports", caption: "Roland-Garros tennis" },
    { src: "https://images.unsplash.com/photo-1581262177533-1b1760b87952?auto=format&fit=crop&w=1800&q=82", category: "Luxury", caption: "Paris luxury hotel" },
    { src: "https://images.unsplash.com/photo-1507666664345-c49223375e33?auto=format&fit=crop&w=1800&q=82", category: "Nightlife", caption: "Paris nightlife" }
  ],
  "new-york": [
    { src: "https://images.unsplash.com/photo-1570304816841-906a17d7b067?auto=format&fit=crop&w=1800&q=82", category: "Landscape", caption: "New York skyline" },
    { src: "https://images.unsplash.com/photo-1634874495432-cb368c167e9b?auto=format&fit=crop&w=1800&q=82", category: "Food", caption: "New York restaurant scene" },
    { src: "https://images.unsplash.com/photo-1674327175233-51f4d1430eac?auto=format&fit=crop&w=1800&q=82", category: "Sports", caption: "Madison Square Garden" },
    { src: "https://images.unsplash.com/photo-1512498369875-56977abee2e8?auto=format&fit=crop&w=1800&q=82", category: "Luxury", caption: "New York luxury hotel" },
    { src: "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?auto=format&fit=crop&w=1800&q=82", category: "Nightlife", caption: "New York nightlife" }
  ],
  miami: [
    { src: "https://images.unsplash.com/photo-1719422244246-93f887d610fc?auto=format&fit=crop&w=1800&q=82", category: "Landscape", caption: "Miami skyline and beach" },
    { src: "https://images.unsplash.com/photo-1585608234056-42814f70ff7a?auto=format&fit=crop&w=1800&q=82", category: "Food", caption: "Miami restaurant scene" },
    { src: "https://images.unsplash.com/photo-1711378329038-620af48ace51?auto=format&fit=crop&w=1800&q=82", category: "Sports", caption: "Miami race weekend" },
    { src: "https://images.unsplash.com/photo-1589083130544-0d6a2926e519?auto=format&fit=crop&w=1800&q=82", category: "Luxury", caption: "Miami luxury hotel" },
    { src: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&w=1800&q=82", category: "Nightlife", caption: "Miami nightlife" }
  ],
  "las-vegas": [
    { src: "https://images.unsplash.com/photo-1581351721010-8cf859cb14a4?auto=format&fit=crop&w=1800&q=82", category: "Landscape", caption: "Las Vegas Strip" },
    { src: "https://images.unsplash.com/photo-1577334928618-2ff2bf09e827?auto=format&fit=crop&w=1800&q=82", category: "Food", caption: "Las Vegas dining" },
    { src: "https://images.unsplash.com/photo-1705766291313-aacb20e419d1?auto=format&fit=crop&w=1800&q=82", category: "Sports", caption: "Las Vegas arena" },
    { src: "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?auto=format&fit=crop&w=1800&q=82", category: "Luxury", caption: "Las Vegas luxury hotel" },
    { src: "https://images.unsplash.com/photo-1634400139456-292e44ca5327?auto=format&fit=crop&w=1800&q=82", category: "Nightlife", caption: "Las Vegas nightlife" }
  ],
  niseko: [
    { src: "https://images.unsplash.com/photo-1695059564034-a6f547b330cd?auto=format&fit=crop&w=1800&q=82", category: "Landscape", caption: "Niseko snow" },
    { src: "https://images.unsplash.com/photo-1629684782790-385ed5adb497?auto=format&fit=crop&w=1800&q=82", category: "Food", caption: "Japanese izakaya food" },
    { src: "https://images.unsplash.com/photo-1565992441121-4367c2967103?auto=format&fit=crop&w=1800&q=82", category: "Sports", caption: "Ski resort" },
    { src: "https://images.unsplash.com/photo-1603038976282-a934dd09b746?auto=format&fit=crop&w=1800&q=82", category: "Luxury", caption: "Niseko chalet" },
    { src: "https://images.unsplash.com/photo-1576829139489-09a55ddbb420?auto=format&fit=crop&w=1800&q=82", category: "Nightlife", caption: "Niseko nightlife" }
  ],
  aspen: [
    { src: "https://images.unsplash.com/photo-1588222804969-1908b87afd88?auto=format&fit=crop&w=1800&q=82", category: "Landscape", caption: "Aspen mountain" },
    { src: "https://images.unsplash.com/photo-1658865695766-181a1ea9bac6?auto=format&fit=crop&w=1800&q=82", category: "Food", caption: "Colorado restaurant" },
    { src: "https://images.unsplash.com/photo-1614444894791-c0c4d4286c35?auto=format&fit=crop&w=1800&q=82", category: "Sports", caption: "Aspen skiing" },
    { src: "https://images.unsplash.com/photo-1777612914411-0151f5fca99f?auto=format&fit=crop&w=1800&q=82", category: "Luxury", caption: "Aspen luxury hotel" },
    { src: "https://images.unsplash.com/photo-1578451779798-c250e75fd0e1?auto=format&fit=crop&w=1800&q=82", category: "Nightlife", caption: "Aspen nightlife" }
  ],
  melbourne: [
    { src: "https://images.unsplash.com/photo-1595434971780-79d5c20c5090?auto=format&fit=crop&w=1800&q=82", category: "Landscape", caption: "Melbourne skyline" },
    { src: "https://images.unsplash.com/photo-1572479076096-e7889766e7fe?auto=format&fit=crop&w=1800&q=82", category: "Food", caption: "Melbourne restaurant culture" },
    { src: "https://images.unsplash.com/photo-1545151414-8a948e1ea54f?auto=format&fit=crop&w=1800&q=82", category: "Sports", caption: "Tennis court energy" },
    { src: "https://images.unsplash.com/photo-1755868725256-3369f8a6448c?auto=format&fit=crop&w=1800&q=82", category: "Luxury", caption: "Melbourne luxury hotel" },
    { src: "https://images.unsplash.com/photo-1689866015007-4f7b02bf04a4?auto=format&fit=crop&w=1800&q=82", category: "Nightlife", caption: "Melbourne nightlife" }
  ]
};

const baseDestinations: Destination[] = destinationSeeds.map((destination) => ({
  ...destination,
  id: slug(destination.name),
  region: globalRegionByCountry[destination.country],
  popularity: toPopularity(destination.prominence),
  nearbyDestinations: [],
  imageGallery: destinationImageGallery(destination),
  bestFor: destination.tags.slice(0, 4),
  airportCode: airportCodes[slug(destination.name)]
}));

export const destinations: Destination[] = baseDestinations.map((destination) => ({
  ...destination,
  nearbyDestinations: baseDestinations
    .filter((candidate) => candidate.country === destination.country && candidate.id !== destination.id)
    .sort((a, b) => distanceBetween(destination, a) - distanceBetween(destination, b))
    .slice(0, 4)
    .map((candidate) => candidate.id)
}));

export const routeConnections: RouteConnection[] = buildRouteConnections(destinations);

function toPopularity(prominence: DestinationProminence): DestinationPopularity {
  return prominence === "well known" ? "popular" : prominence;
}

function destinationImageGallery(destination: DestinationSeed): ImageGalleryItem[] {
  const destinationSlug = slug(destination.name);
  const curated = curatedDestinationImages[destinationSlug];
  const images = curated ?? neutralFallbackGallery(destination);

  return images.map((image) => ({
    ...image,
    alt: image.src
      ? `${destination.name} ${image.category.toLowerCase()} imagery`
      : `${destination.name} premium travel fallback imagery`
  }));
}

function neutralFallbackGallery(destination: DestinationSeed): Array<Omit<ImageGalleryItem, "alt">> {
  return [
    { src: "", category: "Landscape", caption: `${destination.name} landmark image pending`, isFallback: true },
    { src: "", category: "Food", caption: `${destination.name} food and lifestyle image pending`, isFallback: true },
    { src: "", category: destination.sportsExperiences.length ? "Sports" : "Culture", caption: `${destination.name} ${destination.sportsExperiences[0] ?? "culture"} image pending`, isFallback: true },
    { src: "", category: "Luxury", caption: `${destination.name} luxury travel image pending`, isFallback: true },
    { src: "", category: destination.tags.includes("nightlife") ? "Nightlife" : "Culture", caption: `${destination.name} evening image pending`, isFallback: true }
  ];
}

function buildRouteConnections(items: Destination[]): RouteConnection[] {
  const byCountry = new Map<CountryName, Destination[]>();
  items.forEach((item) => byCountry.set(item.country, [...(byCountry.get(item.country) ?? []), item]));
  return Array.from(byCountry.values()).flatMap((countryDestinations) =>
    countryDestinations.slice(0, -1).map((from, index) => routeConnection(from, countryDestinations[index + 1]))
  );
}

function routeConnection(from: Destination, to: Destination): RouteConnection {
  const approximateDistanceKm = Math.round(distanceBetween(from, to));
  const trainAvailable = !isIslandHop(from, to) && approximateDistanceKm <= 850;
  const trainTime = trainAvailable ? estimatedTrainTime(approximateDistanceKm) : undefined;
  const flightTime = approximateDistanceKm <= 400 && trainAvailable ? "not recommended" : "approx. " + formatHours(Math.max(0.8, approximateDistanceKm / 760 + 0.25));
  const recommendedTransport = trainAvailable && approximateDistanceKm <= 520 ? "Train" : approximateDistanceKm < 180 ? "Private transfer" : "Flight";
  return {
    fromDestination: from.name,
    toDestination: to.name,
    fromDestinationId: from.id,
    toDestinationId: to.id,
    approximateDistanceKm,
    flightTime,
    trainAvailable,
    trainTime,
    recommendedTransport,
    notes: "Estimated MVP transport data for planning only; confirm live schedules before booking."
  };
}

function distanceBetween(a: Pick<Destination, "lat" | "lon">, b: Pick<Destination, "lat" | "lon">) {
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
  return "approx. " + formatHours(Math.max(1, distanceKm / 170));
}

function formatHours(hours: number) {
  const rounded = Math.round(hours * 2) / 2;
  return (rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(1)) + " " + (rounded === 1 ? "hour" : "hours");
}

function isIslandHop(a: Destination, b: Destination) {
  const islandRegions = ["Balearic Islands", "Cyclades", "Crete", "Ionian Islands", "Sicily", "Madeira", "Azores", "Hawaii", "Queensland", "Tasmania", "Western Australia", "Hokkaido", "Setouchi"];
  return islandRegions.includes(a.countryRegion) || islandRegions.includes(b.countryRegion);
}

function slug(value: string) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
