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
export type DestinationProminence = "well known" | "popular" | "upcoming" | "hidden gem" | "quiet alternative";

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

type DestinationSeed = Omit<City, "id" | "hotels"> & {
  hotelStyle?: string;
};

export const countries: CountryName[] = ["Italy", "France", "Spain", "Germany", "UK", "Portugal", "Greece", "Japan", "USA", "Australia"];
export const regions: Region[] = ["Europe", "Asia-Pacific", "North America"];
export const budgets: Budget[] = ["Essential", "Elevated", "First Class"];
export const interests: Interest[] = ["beach", "historical", "nightlife", "culture", "hidden gem", "well known", "quiet / relaxed", "luxury", "sport", "family friendly", "food", "shopping", "adventure", "skiing", "upcoming"];
export const sports: Sport[] = ["Formula 1", "Tennis", "Football", "Golf", "Basketball", "Skiing"];
export const travelStyles: TravelStyle[] = ["Luxury", "Culture", "Beach", "Food", "Sport", "Family", "Adventure"];
export const paces: Pace[] = ["Relaxed", "Balanced", "Fast"];
export const gemPreferences: GemPreference[] = ["Iconic", "Balanced", "Hidden gems"];
export const allCountryRegions = "All regions";

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

const seeds: DestinationSeed[] = [
  d("Rome", "Italy", "Lazio", 3, ["historical", "culture", "food", "well known", "luxury"], ["Football", "Tennis"], "well known", 41.9028, 12.4964, "Ancient history, cinematic hotels and late Roman dining.", ["Colosseum and private guide", "Trastevere dinner", "Olympico fixture"]),
  d("Florence", "Italy", "Tuscany", 2, ["historical", "culture", "food", "shopping", "well known"], ["Football"], "well known", 43.7696, 11.2558, "Renaissance art, Tuscan dining and boutique hotel elegance.", ["Uffizi morning", "Leather ateliers", "Tuscan wine bar"]),
  d("Venice", "Italy", "Veneto", 2, ["historical", "culture", "luxury", "well known", "quiet / relaxed"], [], "well known", 45.4408, 12.3155, "Waterfront palaces and slow, atmospheric luxury.", ["Private water taxi", "Cicchetti crawl", "Island lunch"]),
  d("Milan", "Italy", "Lombardy", 2, ["shopping", "nightlife", "luxury", "food", "sport"], ["Football", "Formula 1"], "popular", 45.4642, 9.19, "Fashion, design hotels and San Siro energy.", ["Quadrilatero shopping", "San Siro night", "Aperitivo route"]),
  d("Lake Como", "Italy", "Lombardy", 2, ["luxury", "quiet / relaxed", "hidden gem", "adventure"], ["Golf"], "popular", 45.984, 9.257, "Lakeside villas, boat days and polished calm.", ["Private boat day", "Villa gardens", "Lakeside dinner"]),
  d("Naples", "Italy", "Campania", 2, ["food", "historical", "nightlife", "upcoming"], ["Football"], "upcoming", 40.8518, 14.2681, "Raw energy, elite pizza and access to Pompeii.", ["Pizza pilgrimage", "Pompeii day", "Seafront walk"]),
  d("Amalfi Coast", "Italy", "Campania", 3, ["beach", "luxury", "well known", "quiet / relaxed"], [], "well known", 40.6333, 14.6029, "Cliffside hotels, beach clubs and slow coastal days.", ["Positano beach club", "Ravello lunch", "Coastal drive"]),
  d("Puglia", "Italy", "Puglia", 3, ["beach", "food", "hidden gem", "quiet / relaxed", "family friendly"], [], "hidden gem", 40.7928, 17.1012, "Whitewashed towns, beaches and relaxed southern dining.", ["Ostuni afternoon", "Masseria dinner", "Cove swim"]),
  d("Bologna", "Italy", "Emilia-Romagna", 2, ["food", "historical", "hidden gem", "culture"], ["Football"], "hidden gem", 44.4949, 11.3426, "Italy's most delicious city with elegant porticoes.", ["Pasta class", "Portico walk", "Market lunch"]),
  d("Sicily", "Italy", "Sicily", 4, ["beach", "historical", "food", "adventure", "hidden gem"], [], "popular", 37.599, 14.0154, "Ancient ruins, volcanic landscapes and coastal hotels.", ["Taormina dinner", "Etna day", "Beach club reset"]),

  d("Paris", "France", "Ile-de-France", 3, ["well known", "culture", "food", "shopping", "luxury", "sport"], ["Tennis", "Football", "Basketball"], "well known", 48.8566, 2.3522, "Palace hotels, grand-slam glamour and long lunches.", ["Roland-Garros", "Left Bank galleries", "Palace bar"]),
  d("Nice", "France", "French Riviera", 2, ["beach", "luxury", "food", "well known"], ["Football"], "popular", 43.7102, 7.262, "Sunlit Riviera base with beach clubs and coastal rail.", ["Promenade walk", "Beach club", "Old town dinner"]),
  d("Monaco", "France", "French Riviera", 2, ["luxury", "sport", "nightlife", "well known"], ["Formula 1", "Tennis"], "well known", 43.7384, 7.4246, "Compact Riviera spectacle for F1, tennis and yacht-club evenings.", ["Harbor circuit", "Casino square", "Coastal lunch"]),
  d("Lyon", "France", "Auvergne-Rhone-Alpes", 2, ["food", "historical", "culture", "hidden gem"], ["Football"], "hidden gem", 45.764, 4.8357, "France's culinary capital with calmer luxury value.", ["Bouchon dinner", "Old Lyon", "Rhone wine bar"]),
  d("Bordeaux", "France", "Nouvelle-Aquitaine", 2, ["food", "culture", "luxury", "quiet / relaxed"], ["Football"], "popular", 44.8378, -0.5792, "Wine country polish with riverfront architecture.", ["Wine tasting", "Riverfront dinner", "Museum afternoon"]),
  d("Provence", "France", "Provence", 3, ["quiet / relaxed", "food", "culture", "hidden gem", "luxury"], [], "quiet alternative", 43.9493, 4.8055, "Lavender landscapes, market towns and villa-style stays.", ["Market morning", "Vineyard lunch", "Hill town drive"]),
  d("Chamonix", "France", "French Alps", 3, ["adventure", "sport", "skiing", "luxury"], ["Skiing", "Golf"], "popular", 45.9237, 6.8694, "Alpine drama with ski days and fireplace dining.", ["Aiguille du Midi", "Ski guide", "Spa recovery"]),
  d("Annecy", "France", "Auvergne-Rhone-Alpes", 2, ["quiet / relaxed", "hidden gem", "family friendly", "adventure"], [], "hidden gem", 45.8992, 6.1294, "Lake swims, alpine scenery and a softer pace.", ["Lake cycle", "Old town lunch", "Mountain viewpoint"]),

  d("Barcelona", "Spain", "Catalonia", 3, ["beach", "food", "nightlife", "culture", "sport", "well known"], ["Football", "Formula 1"], "well known", 41.3874, 2.1686, "Gaudi architecture, beach energy and elite football.", ["Gaudi route", "Beach lunch", "Match night"]),
  d("Madrid", "Spain", "Community of Madrid", 3, ["culture", "food", "nightlife", "shopping", "sport"], ["Football", "Tennis", "Basketball"], "well known", 40.4168, -3.7038, "Museums, late dinners and big-club football.", ["Prado morning", "Tapas crawl", "Bernabeu night"]),
  d("Seville", "Spain", "Andalusia", 2, ["historical", "culture", "food", "quiet / relaxed"], ["Football"], "popular", 37.3891, -5.9845, "Moorish palaces, orange trees and warm evenings.", ["Alcazar visit", "Flamenco night", "Rooftop dinner"]),
  d("Ibiza", "Spain", "Balearic Islands", 3, ["beach", "nightlife", "luxury", "well known"], [], "well known", 38.9067, 1.4206, "Beach clubs, villas and late-night energy.", ["Beach club", "Old town dinner", "Sunset table"]),
  d("Mallorca", "Spain", "Balearic Islands", 3, ["beach", "family friendly", "quiet / relaxed", "luxury"], ["Golf"], "popular", 39.6953, 3.0176, "Resort polish, coves and mountain drives.", ["Cove swim", "Palma dinner", "Tramuntana drive"]),
  d("San Sebastian", "Spain", "Basque Country", 2, ["food", "beach", "hidden gem", "culture"], ["Football"], "hidden gem", 43.3183, -1.9812, "Pintxos, surf and a refined smaller-city rhythm.", ["Pintxos crawl", "La Concha walk", "Basque tasting menu"]),
  d("Valencia", "Spain", "Valencian Community", 2, ["beach", "food", "family friendly", "upcoming"], ["Football"], "upcoming", 39.4699, -0.3763, "Paella, design-forward architecture and beach calm.", ["Market lunch", "City of Arts", "Beach afternoon"]),
  d("Granada", "Spain", "Andalusia", 2, ["historical", "culture", "hidden gem", "quiet / relaxed"], [], "hidden gem", 37.1773, -3.5986, "Alhambra drama with a slower southern pace.", ["Alhambra", "Albaicin walk", "Tapas evening"]),

  d("Berlin", "Germany", "Berlin-Brandenburg", 3, ["culture", "nightlife", "historical", "upcoming"], ["Football", "Basketball"], "well known", 52.52, 13.405, "Creative culture, history and electric nightlife.", ["Museum Island", "Club lounge", "Match night"]),
  d("Munich", "Germany", "Bavaria", 2, ["luxury", "food", "culture", "sport"], ["Football", "Skiing"], "popular", 48.1351, 11.582, "Polished Bavarian hotels, football and alpine access.", ["Beer hall dinner", "Allianz Arena", "Alpine day"]),
  d("Hamburg", "Germany", "Northern Germany", 2, ["nightlife", "food", "culture", "hidden gem"], ["Football"], "hidden gem", 53.5511, 9.9937, "Harbor style, music venues and waterfront dining.", ["Harbor cruise", "Reeperbahn night", "Warehouse district"]),
  d("Cologne", "Germany", "North Rhine-Westphalia", 2, ["historical", "culture", "family friendly"], ["Football"], "quiet alternative", 50.9375, 6.9603, "Cathedral grandeur and relaxed Rhine-side routing.", ["Cathedral", "Rhine walk", "Brauhaus dinner"]),
  d("Frankfurt", "Germany", "Hesse", 1, ["shopping", "food", "well known"], ["Football"], "popular", 50.1109, 8.6821, "A practical premium hub with skyline hotels.", ["Old town", "Skyline bar", "Transfer night"]),
  d("Dresden", "Germany", "Saxony", 2, ["historical", "culture", "hidden gem", "quiet / relaxed"], [], "hidden gem", 51.0504, 13.7373, "Baroque beauty with gentler crowds.", ["Old masters gallery", "Elbe walk", "Opera square"]),
  d("Black Forest", "Germany", "Baden-Wurttemberg", 3, ["quiet / relaxed", "adventure", "family friendly", "hidden gem"], [], "quiet alternative", 48.2775, 8.185, "Spa towns, forest drives and family-friendly nature.", ["Thermal spa", "Forest hike", "Village lunch"]),
  d("Garmisch-Partenkirchen", "Germany", "Bavarian Alps", 3, ["adventure", "sport", "quiet / relaxed"], ["Skiing", "Golf"], "hidden gem", 47.4917, 11.0955, "Alpine scenery without the flashier resort crowds.", ["Zugspitze", "Ski day", "Mountain dinner"]),

  d("London", "UK", "England", 3, ["well known", "culture", "food", "shopping", "sport", "luxury"], ["Football", "Tennis", "Basketball"], "well known", 51.5074, -0.1278, "Premier League weekends, galleries and heritage hotels.", ["Fixture planner", "West End dinner", "Wimbledon strategy"]),
  d("Bath", "UK", "England", 2, ["historical", "quiet / relaxed", "luxury", "hidden gem"], [], "quiet alternative", 51.3811, -2.359, "Georgian elegance and spa-town calm.", ["Roman baths", "Afternoon tea", "Country inn dinner"]),
  d("Cotswolds", "UK", "England", 3, ["quiet / relaxed", "luxury", "family friendly", "hidden gem"], [], "hidden gem", 51.833, -1.843, "Soft countryside, manor hotels and village lunches.", ["Village drive", "Manor lunch", "Garden walk"]),
  d("Edinburgh", "UK", "Scotland", 2, ["historical", "culture", "food", "well known"], ["Football", "Golf"], "popular", 55.9533, -3.1883, "Castle drama, whisky bars and festival energy.", ["Castle walk", "Whisky tasting", "New Town dinner"]),
  d("St Andrews", "UK", "Scotland", 2, ["sport", "quiet / relaxed", "luxury"], ["Golf"], "popular", 56.3398, -2.7967, "Golf pilgrimage with coastal calm.", ["Old Course walk", "Coastal lunch", "Whisky bar"]),
  d("Manchester", "UK", "England", 2, ["sport", "nightlife", "food", "upcoming"], ["Football"], "popular", 53.4808, -2.2426, "Football, music heritage and confident dining.", ["Stadium tour", "Northern Quarter", "Music night"]),
  d("Cornwall", "UK", "England", 3, ["beach", "family friendly", "quiet / relaxed", "adventure"], ["Golf"], "quiet alternative", 50.266, -5.0527, "Coastal walks, surf beaches and boutique inns.", ["Coastal walk", "Seafood lunch", "Surf lesson"]),
  d("Lake District", "UK", "England", 3, ["adventure", "quiet / relaxed", "family friendly", "hidden gem"], [], "quiet alternative", 54.4609, -3.0886, "Lakes, hiking and fireside hotels.", ["Lake cruise", "Hill walk", "Inn dinner"]),

  d("Lisbon", "Portugal", "Lisbon Region", 3, ["food", "culture", "nightlife", "well known"], ["Football"], "well known", 38.7223, -9.1393, "Tile-lined hills, Atlantic light and polished boutique stays.", ["Alfama walk", "Fado dinner", "Rooftop drinks"]),
  d("Porto", "Portugal", "North", 2, ["food", "historical", "culture", "quiet / relaxed"], ["Football"], "popular", 41.1579, -8.6291, "Riverfront wine lodges and atmospheric dining.", ["Port tasting", "Ribeira walk", "Seafood dinner"]),
  d("Comporta", "Portugal", "Alentejo Coast", 3, ["beach", "luxury", "quiet / relaxed", "hidden gem"], [], "hidden gem", 38.3804, -8.7868, "Barefoot luxury, dunes and long seafood lunches.", ["Beach day", "Rice-field dinner", "Design hotel reset"]),
  d("Algarve", "Portugal", "Algarve", 3, ["beach", "family friendly", "luxury", "well known"], ["Golf"], "popular", 37.0179, -7.9308, "Cliff beaches, resorts and golf-friendly days.", ["Cove swim", "Golf morning", "Marina dinner"]),
  d("Madeira", "Portugal", "Madeira", 4, ["adventure", "hidden gem", "quiet / relaxed", "food"], [], "upcoming", 32.7607, -16.9595, "Island hikes, ocean views and a rising luxury scene.", ["Levada hike", "Ocean lunch", "Funchal market"]),
  d("Azores", "Portugal", "Azores", 4, ["adventure", "hidden gem", "quiet / relaxed", "family friendly"], [], "hidden gem", 37.7412, -25.6756, "Volcanic lakes, whale watching and deep nature.", ["Sete Cidades", "Whale watching", "Thermal pools"]),
  d("Douro Valley", "Portugal", "North", 2, ["food", "luxury", "quiet / relaxed", "hidden gem"], [], "hidden gem", 41.1579, -7.789, "Vineyard hotels and slow river landscapes.", ["Wine estate lunch", "River cruise", "Terrace dinner"]),
  d("Sintra", "Portugal", "Lisbon Region", 1, ["historical", "culture", "family friendly", "well known"], [], "popular", 38.8029, -9.3817, "Palaces and forested hills close to Lisbon.", ["Pena Palace", "Old town", "Coastal viewpoint"]),

  d("Athens", "Greece", "Attica", 2, ["historical", "culture", "food", "well known"], ["Basketball", "Football"], "well known", 37.9838, 23.7275, "Ancient history, rooftop dining and island access.", ["Acropolis", "Rooftop dinner", "Basketball night"]),
  d("Santorini", "Greece", "Cyclades", 3, ["beach", "luxury", "well known", "quiet / relaxed"], [], "well known", 36.3932, 25.4615, "Caldera views, cave hotels and sunset dining.", ["Caldera walk", "Winery lunch", "Sunset dinner"]),
  d("Mykonos", "Greece", "Cyclades", 3, ["beach", "nightlife", "luxury", "well known"], [], "well known", 37.4467, 25.3289, "Beach clubs, villas and high-summer energy.", ["Beach club", "Old port dinner", "Late table"]),
  d("Crete", "Greece", "Crete", 4, ["beach", "historical", "food", "family friendly", "adventure"], [], "popular", 35.2401, 24.8093, "Big-island variety: beaches, villages and ancient sites.", ["Beach cove", "Knossos", "Village lunch"]),
  d("Naxos", "Greece", "Cyclades", 3, ["beach", "family friendly", "hidden gem", "quiet / relaxed"], [], "hidden gem", 37.1021, 25.3764, "A calmer Cycladic island with beaches and local food.", ["Beach day", "Old town", "Farm dinner"]),
  d("Paros", "Greece", "Cyclades", 3, ["beach", "upcoming", "nightlife", "food"], [], "upcoming", 37.0856, 25.1488, "Stylish but softer island energy.", ["Naoussa dinner", "Boat day", "Village lunch"]),
  d("Corfu", "Greece", "Ionian Islands", 3, ["beach", "historical", "family friendly", "quiet / relaxed"], [], "popular", 39.6243, 19.9217, "Ionian color, beaches and old-town charm.", ["Old town walk", "Cove swim", "Seafood lunch"]),
  d("Meteora", "Greece", "Thessaly", 2, ["historical", "adventure", "hidden gem", "quiet / relaxed"], [], "hidden gem", 39.7217, 21.6306, "Monasteries suspended above dramatic rock landscapes.", ["Monastery visit", "Sunset viewpoint", "Hike"]),

  d("Tokyo", "Japan", "Kanto", 4, ["food", "culture", "shopping", "nightlife", "sport", "luxury"], ["Tennis", "Basketball", "Football"], "well known", 35.6762, 139.6503, "Precision dining, design hotels and arena nights.", ["Omakase", "Ginza lounge", "Arena night"]),
  d("Kyoto", "Japan", "Kansai", 3, ["historical", "culture", "food", "well known", "quiet / relaxed"], [], "well known", 35.0116, 135.7681, "Temples, ryokan calm and graceful dining.", ["Temple morning", "Kaiseki", "Gion walk"]),
  d("Osaka", "Japan", "Kansai", 2, ["food", "nightlife", "shopping", "sport"], ["Basketball", "Football"], "popular", 34.6937, 135.5023, "Street food, neon nights and easy Kansai routing.", ["Dotonbori", "Market lunch", "Baseball night"]),
  d("Hakone", "Japan", "Kanto", 2, ["quiet / relaxed", "luxury", "hidden gem", "family friendly"], [], "popular", 35.2324, 139.1069, "Onsen ryokan, mountain views and Tokyo decompression.", ["Onsen", "Lake Ashi", "Ryokan dinner"]),
  d("Niseko", "Japan", "Hokkaido", 4, ["sport", "adventure", "luxury", "quiet / relaxed"], ["Skiing", "Golf"], "popular", 42.8048, 140.6874, "Powder mornings, onsen and lodge luxury.", ["Ski guide", "Onsen", "Izakaya"]),
  d("Sapporo", "Japan", "Hokkaido", 2, ["food", "culture", "sport", "hidden gem"], ["Skiing"], "hidden gem", 43.0618, 141.3545, "Snow festivals, ramen and Hokkaido gateway comfort.", ["Ramen alley", "Snow festival", "Beer hall"]),
  d("Kanazawa", "Japan", "Chubu", 2, ["culture", "historical", "food", "hidden gem"], [], "hidden gem", 36.5613, 136.6562, "Gardens, crafts and calm cultural depth.", ["Kenrokuen", "Sushi lunch", "Craft district"]),
  d("Naoshima", "Japan", "Setouchi", 2, ["culture", "hidden gem", "quiet / relaxed", "luxury"], [], "hidden gem", 34.4592, 133.995, "Art island minimalism with a reflective pace.", ["Museum day", "Island cycle", "Design hotel"]),

  d("New York", "USA", "Northeast", 3, ["well known", "nightlife", "food", "shopping", "sport", "luxury"], ["Tennis", "Basketball", "Football"], "well known", 40.7128, -74.006, "Big-event nights, rooftop tables and broad hotel choice.", ["US Open", "MSG night", "Downtown dinner"]),
  d("Miami", "USA", "Florida", 3, ["beach", "nightlife", "luxury", "sport"], ["Formula 1", "Tennis", "Basketball"], "well known", 25.7617, -80.1918, "Sunlit race weekends, beaches and late dinners.", ["Beach club", "F1 weekend", "Design District"]),
  d("Las Vegas", "USA", "Nevada", 2, ["nightlife", "food", "sport", "luxury"], ["Formula 1", "Basketball", "Golf"], "well known", 36.1699, -115.1398, "High-gloss sport weekends with spa mornings.", ["Arena night", "Desert golf", "Chef dinner"]),
  d("Los Angeles", "USA", "California", 3, ["beach", "food", "shopping", "sport", "well known"], ["Basketball", "Football", "Tennis"], "well known", 34.0522, -118.2437, "Beach-to-arena travel with design hotels.", ["Courtside night", "Malibu lunch", "Gallery hop"]),
  d("San Francisco", "USA", "California", 2, ["food", "culture", "family friendly", "luxury"], ["Basketball", "Golf"], "popular", 37.7749, -122.4194, "Bay views, dining and wine country access.", ["Ferry Building", "Warriors night", "Napa day"]),
  d("Aspen", "USA", "Colorado", 4, ["sport", "luxury", "quiet / relaxed", "adventure"], ["Skiing", "Golf"], "well known", 39.1911, -106.8175, "Iconic mountain luxury, slopes and galleries.", ["Ski day", "Apres", "Gallery walk"]),
  d("Charleston", "USA", "Southeast", 2, ["food", "historical", "hidden gem", "quiet / relaxed"], ["Golf"], "hidden gem", 32.7765, -79.9311, "Southern charm, dining and coastal ease.", ["Historic walk", "Lowcountry dinner", "Beach drive"]),
  d("Austin", "USA", "Texas", 2, ["nightlife", "food", "upcoming", "sport"], ["Formula 1", "Football"], "upcoming", 30.2672, -97.7431, "Music, barbecue and race-weekend energy.", ["Live music", "BBQ lunch", "COTA weekend"]),
  d("Maui", "USA", "Hawaii", 4, ["beach", "luxury", "family friendly", "quiet / relaxed", "adventure"], ["Golf"], "well known", 20.7984, -156.3319, "Resort calm, beaches and road-trip drama.", ["Beach day", "Haleakala", "Golf morning"]),

  d("Sydney", "Australia", "New South Wales", 3, ["beach", "food", "sport", "well known", "luxury"], ["Tennis", "Football", "Basketball", "Golf"], "well known", -33.8688, 151.2093, "Harbor glamour, beach days and stadium energy.", ["Harbor lunch", "Bondi morning", "Stadium night"]),
  d("Melbourne", "Australia", "Victoria", 3, ["food", "culture", "nightlife", "sport"], ["Formula 1", "Tennis", "Football"], "well known", -37.8136, 144.9631, "Grand prix energy, laneway dining and late checkout recovery.", ["Australian Open", "Albert Park", "Laneway dinner"]),
  d("Byron Bay", "Australia", "New South Wales", 3, ["beach", "quiet / relaxed", "food", "upcoming"], [], "popular", -28.6474, 153.602, "Barefoot luxury, wellness mornings and surf-town dining.", ["Beach walk", "Wellness morning", "Farm dinner"]),
  d("Gold Coast", "Australia", "Queensland", 3, ["beach", "family friendly", "nightlife", "sport"], ["Golf"], "popular", -28.0167, 153.4, "Beach towers, theme parks and relaxed resort pacing.", ["Surf lesson", "Theme park", "Rooftop dinner"]),
  d("Whitsundays", "Australia", "Queensland", 4, ["beach", "luxury", "quiet / relaxed", "adventure"], [], "well known", -20.344, 148.957, "Island resorts, reef flights and bright-blue escapes.", ["Whitehaven Beach", "Reef flight", "Sailing day"]),
  d("Tasmania", "Australia", "Tasmania", 4, ["food", "adventure", "hidden gem", "quiet / relaxed"], ["Golf"], "hidden gem", -42.0409, 146.8087, "Wild landscapes, art hotels and serious produce.", ["MONA", "Coastal hike", "Wine dinner"]),
  d("Perth", "Australia", "Western Australia", 3, ["beach", "food", "quiet / relaxed", "upcoming"], ["Football", "Golf"], "upcoming", -31.9523, 115.8613, "Indian Ocean beaches and a polished slower city rhythm.", ["Cottesloe", "Fremantle lunch", "Swan Valley"]),
  d("Adelaide", "Australia", "South Australia", 2, ["food", "hidden gem", "quiet / relaxed", "culture"], ["Football", "Golf"], "hidden gem", -34.9285, 138.6007, "Wine regions, festivals and an easy premium base.", ["Central Market", "Barossa day", "Festival night"]),
  d("Noosa", "Australia", "Queensland", 3, ["beach", "family friendly", "luxury", "quiet / relaxed"], [], "quiet alternative", -26.397, 153.09, "Polished beach calm with national-park walks.", ["Main Beach", "National park", "River dinner"])
];

export const cities: City[] = seeds.map((seed) => ({
  ...seed,
  id: slug(seed.name),
  hotels: [
    { name: `${seed.name} House`, tier: seed.hotelStyle ?? "Premium", note: "Placeholder affiliate hotel card with a polished central base.", pointsHint: "Estimated MVP note: compare cash, award and portal rates." },
    { name: `${seed.name} Reserve`, tier: "Luxury", note: "Placeholder affiliate hotel card for a quieter high-service stay.", pointsHint: "Estimated MVP note: useful for elite perks or credits." }
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

function d(name: string, country: CountryName, countryRegion: string, nights: number, tags: Interest[], sports: Sport[], prominence: DestinationProminence, lat: number, lon: number, headline: string, activities: string[]): DestinationSeed {
  return { name, country, countryRegion, region: globalRegionByCountry[country], nights, tags, sports, prominence, lat, lon, headline, activities };
}

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

function slug(value: string) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
