import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Hotel, MapPinned, Moon, Sparkles, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { TripShell } from "@/components/trip-shell";
import { getDestinationGuide, getDestinationGuides } from "@/lib/destination-guides";

export function generateStaticParams() {
  return getDestinationGuides().map((guide) => ({ id: guide.city.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const guide = getDestinationGuide(params.id);
  if (!guide) return {};

  return {
    title: `${guide.city.name} | Flick On Travel`,
    description: `${guide.city.name} destination guide for sports, luxury hotels, nightlife and modular itinerary planning.`
  };
}

export default function DestinationPage({ params }: { params: { id: string } }) {
  const guide = getDestinationGuide(params.id);
  if (!guide) notFound();

  return (
    <TripShell>
      <article className="snap-scroll">
        <section className="snap-panel relative min-h-screen overflow-hidden">
          <Image src={guide.image} alt={guide.imageAlt} fill priority className="cinematic-pan object-cover" />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-black/30" />

          <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-4 pb-12 pt-28 sm:px-6 lg:px-8">
            <Link href="/destinations" className="focus-ring mb-8 inline-flex w-fit items-center gap-2 rounded-sm border border-white/15 bg-black/30 px-4 py-2 text-sm text-ivory backdrop-blur">
              <ArrowLeft size={15} aria-hidden="true" />
              Destinations
            </Link>
            <div className="animate-fade-up max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brass">{guide.city.country} · {guide.city.region}</p>
              <h1 className="mt-4 font-serif text-6xl leading-none text-white sm:text-8xl">{guide.city.name}</h1>
              <div className="shimmer-line mt-6 h-px w-56 bg-brass/70" />
              <p className="mt-6 max-w-2xl text-xl leading-9 text-ivory/78">{guide.city.headline}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {guide.city.sports.map((sport) => (
                  <span key={sport} className="border border-white/15 bg-black/30 px-3 py-2 text-xs uppercase tracking-[0.16em] text-ivory/78 backdrop-blur">
                    {sport}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="snap-panel mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brass">When to go</p>
            <h2 className="mt-3 font-serif text-4xl text-white sm:text-5xl">Best time to visit.</h2>
          </div>
          <div className="scroll-reveal premium-panel p-6">
            <CalendarDays className="text-brass" size={24} aria-hidden="true" />
            <p className="mt-5 text-xl leading-9 text-ivory/78">{guide.bestTime}</p>
          </div>
        </section>

        <GuideBand
          eyebrow="Sports and events"
          title="Anchor the trip around the calendar."
          icon={Trophy}
          items={guide.events}
        />

        <section className="snap-panel mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <GuidePanel icon={Hotel} title="Premium Hotels" items={guide.city.hotels.map((hotel) => `${hotel.name} · ${hotel.tier} · ${hotel.note}`)} />
          <GuidePanel icon={Moon} title="Nightlife" items={guide.nightlife} />
        </section>

        <section className="snap-panel mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brass">Local experiences</p>
              <h2 className="mt-3 font-serif text-4xl text-white sm:text-5xl">Moments worth building around.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[...guide.localExperiences, ...guide.experiences.map((experience) => experience.title)].map((item) => (
                <div key={item} className="scroll-reveal border border-white/10 bg-white/[0.04] p-5">
                  <Sparkles className="text-brass" size={18} aria-hidden="true" />
                  <p className="mt-4 leading-7 text-ivory/74">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <GuideBand
          eyebrow="Itinerary suggestions"
          title="Modular route ideas."
          icon={MapPinned}
          items={guide.itinerarySuggestions}
          light
        />

        <section className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brass">Build from this city</p>
            <h2 className="mt-3 font-serif text-4xl text-white">Turn the guide into a route.</h2>
          </div>
          <Link href="/quiz" className="focus-ring inline-flex min-h-12 items-center gap-2 rounded-sm bg-ivory px-5 text-sm font-semibold text-ink transition duration-300 hover:-translate-y-0.5 hover:bg-white">
            Start trip quiz <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </section>
      </article>
    </TripShell>
  );
}

function GuideBand({
  eyebrow,
  title,
  icon: Icon,
  items,
  light = false
}: {
  eyebrow: string;
  title: string;
  icon: LucideIcon;
  items: string[];
  light?: boolean;
}) {
  return (
    <section className={`snap-panel border-y ${light ? "border-black/10 bg-ivory text-ink" : "border-white/10 bg-black/20 text-ivory"} py-16`}>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <p className={`text-sm font-semibold uppercase tracking-[0.22em] ${light ? "text-black/55" : "text-brass"}`}>{eyebrow}</p>
          <h2 className={`mt-3 font-serif text-4xl sm:text-5xl ${light ? "text-black" : "text-white"}`}>{title}</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <div key={item} className={`scroll-reveal p-5 ${light ? "border border-black/10 bg-white" : "premium-panel"}`}>
              <Icon className={light ? "text-black" : "text-brass"} size={19} aria-hidden="true" />
              <p className={`mt-5 leading-7 ${light ? "text-black/68" : "text-ivory/72"}`}>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GuidePanel({ icon: Icon, title, items }: { icon: LucideIcon; title: string; items: string[] }) {
  return (
    <section className="scroll-reveal premium-panel p-6">
      <div className="flex items-center gap-3">
        <Icon className="text-brass" size={21} aria-hidden="true" />
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
      </div>
      <div className="mt-6 grid gap-3">
        {items.map((item) => (
          <p key={item} className="border-t border-white/10 pt-3 leading-7 text-ivory/70">
            {item}
          </p>
        ))}
      </div>
    </section>
  );
}
