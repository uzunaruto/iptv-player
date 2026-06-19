import { CHANNELS, COUNTRIES } from "@/data/channels";
import HomePage from "@/components/HomePage";

export default function Page() {
  // Mainstream Indonesia first (priority), pick hero
  const featured = CHANNELS.filter((c) =>
    ["RCTI.id", "SCTV.id", "MNCTV.id", "Indosiar.id", "ANTV.id", "TransTV.id", "iNews.id", "tvOne.id"].includes(c.id)
  );

  // Compute count per country
  const countriesWithCount = COUNTRIES.map((c) => ({
    ...c,
    count: CHANNELS.filter((ch) => ch.country === c.name).length,
  })).filter((c) => c.count > 0);

  return <HomePage channels={CHANNELS} countries={countriesWithCount} featured={featured} />;
}
