import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Trophy } from "lucide-react";
import { TripShell } from "@/components/trip-shell";
import { getDestinationGuides } from "@/lib/destination-guides";

export default function DestinationsPage() {
  const guides = getDestinationGuides();

  return (
    <TripShell>
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 sm:pt-28 lg:px-8">
        <div className="grid gap-6 border-b border-white/10 pb-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brass">Destination dossiers</p>
            <h1 className="mt-3 font-serif text-5xl leading-none text-white sm:text-7xl">Immersive city guides.</h1>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-ivory/70">
            Cinematic destination pages for sports-led travel, premium hotels, nightlife, local experiences and modular itinerary ideas.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.city.id}
              href={`/destinations/${guide.city.id}`}
              className="group premium-panel min-h-[430px] overflow-hidden transition duration-300 hover:-translate-y-1"
            >
              <div className="relative h-56 overflow-hidden">
                <Image src={guide.image} alt={guide.imageAlt} fill className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">{guide.city.country}</p>
                  <h2 className="mt-2 font-serif text-4xl text-white">{guide.city.name}</h2>
                </div>
              </div>
              <div className="p-5">
                <p className="min-h-16 leading-7 text-ivory/70">{guide.city.headline}</p>
                <div className="mt-5 grid gap-3 text-sm text-ivory/62">
                  <p className="flex gap-2">
                    <CalendarDays className="mt-0.5 shrink-0 text-brass" size={15} aria-hidden="true" />
                    {guide.bestTime}
                  </p>
                  <p className="flex gap-2">
                    <Trophy className="mt-0.5 shrink-0 text-brass" size={15} aria-hidden="true" />
                    {guide.events.slice(0, 2).join(" · ")}
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  Explore guide <ArrowRight className="transition group-hover:translate-x-1" size={16} aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </TripShell>
  );
}
