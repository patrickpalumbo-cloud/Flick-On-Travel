export type QantasRewardSearch = {
  origin: string;
  destination: string;
};

export const qantasRewardFinderBaseUrl = "https://flightrewardfinder.qantas.com/";

export const qantasRewardFinderUrl = buildQantasRewardFinderUrl({
  origin: "SYD",
  destination: ";UK"
});

export const qantasOriginOptions = [
  { label: "Sydney", value: "SYD" },
  { label: "Melbourne", value: "MEL" },
  { label: "Brisbane", value: "BNE" },
  { label: "Perth", value: "PER" },
  { label: "Adelaide", value: "ADL" },
  { label: "Canberra", value: "CBR" },
  { label: "Gold Coast", value: "OOL" }
];

export const qantasDestinationOptions = [
  { label: "United Kingdom", value: ";UK", hint: "Best for London and broader UK reward scans" },
  { label: "London", value: "LHR", hint: "Direct London airport search" },
  { label: "Paris", value: "CDG", hint: "France and Europe gateway" },
  { label: "Rome", value: "FCO", hint: "Italy gateway" },
  { label: "Tokyo", value: "HND", hint: "Japan gateway" },
  { label: "Singapore", value: "SIN", hint: "Asia stopover and onward routing" },
  { label: "Hong Kong", value: "HKG", hint: "Cathay and oneworld routing" },
  { label: "Dubai", value: "DXB", hint: "Emirates long-haul gateway" },
  { label: "Los Angeles", value: "LAX", hint: "North America west coast" },
  { label: "Auckland", value: "AKL", hint: "Trans-Tasman reward scan" }
];

export function buildQantasRewardFinderUrl(search: QantasRewardSearch) {
  const url = new URL(qantasRewardFinderBaseUrl);
  url.searchParams.set("utm_source", "qantas");
  url.searchParams.set("utm_medium", "internal-referral");
  url.searchParams.set("utm_campaign", "flight-reward-finder");
  url.searchParams.set("utm_content", "campaign-cfr-may-2026");
  url.searchParams.set("pg", "1");
  url.searchParams.set("o", search.origin);
  url.searchParams.set("d", search.destination);
  return url.toString();
}
