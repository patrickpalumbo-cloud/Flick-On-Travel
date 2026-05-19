import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Hotel, MapPinned, Moon, Sparkles, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { TripShell } from "@/components/trip-shell";
import { DestinationGallery } from "@/components/destination-gallery";
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
  const heroImage = guide.gallery.find((image) => typeof image.src === "string" && image.src.trim().length > 0);

  return (
    <TripShell>
      <article className="snap-scroll">
        <section className="snap-panel relative min-h-screen overflow-hidden">
          {heroImage ? (
            <Image src={heroImage.src} alt={heroImage.alt} fill priority className="cinematic-pan object-cover" />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(184,150,87,0.24),transparent_30%),linear-gradient(135deg,#fffaf1,#e8ddce)]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-ivory/95 via-ivory/72 to-white/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-ivory via-transparent to-white/20" />

          <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-4 pb-12 pt-28 sm:px-6 lg:px-8">
            <Link href="/destinations" className="focus-ring mb-8 inline-flex w-fit items-center gap-2 rounded-sm border border-black/10 bg-white/70 px-4 py-2 text-sm text-ink shadow-[0_18px_45px_rgba(93,72,48,0.08)] backdrop-blur">
              <ArrowLeft size={15} aria-hidden="true" />
              Destinations
            </Link>
            <div className="animate-fade-up max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brass">{guide.city.country} · {guide.city.region}</p>
              <h1 className="mt-4 font-serif text-6xl leading-none text-ink sm:text-8xl">{guide.city.name}</h1>
              <div className="shimmer-line mt-6 h-px w-56 bg-brass/70" />
              <p className="mt-6 max-w-2xl text-xl leading-9 text-ink/70">{guide.city.headline}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {guide.city.sports.map((sport) => (
                  <span key={sport} className="border border-black/10 bg-white/70 px-3 py-2 text-xs uppercase tracking-[0.16em] text-ink/70 shadow-[0_12px_30px_rgba(93,72,48,0.08)] backdrop-blur">
                    {sport}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="snap-panel mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-6 grid gap-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brass">Immersive gallery</p>
              <h2 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">See the trip before it exists.</h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-ink/64">
              Sports, nightlife, food, luxury, landscape and local texture, composed as a cinematic destination moodboard.
            </p>
          </div>
          <DestinationGallery images={guide.gallery} title={guide.city.name} />
        </section>

        <section className="snap-panel mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brass">When to go</p>
            <h2 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">Best time to visit.</h2>
          </div>
          <div className="scroll-reveal premium-panel p-6">
            <CalendarDays className="text-brass" size={24} aria-hidden="true" />
            <p className="mt-5 text-xl leading-9 text-ink/68">{guide.bestTime}</p>
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
              <h2 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">Moments worth building around.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[...guide.localExperiences, ...guide.experiences.map((experience) => experience.title)].map((item) => (
                <div key={item} className="scroll-reveal border border-black/10 bg-white/70 p-5 shadow-[0_18px_45px_rgba(93,72,48,0.08)]">
                  <Sparkles className="text-brass" size={18} aria-hidden="true" />
                  <p className="mt-4 leading-7 text-ink/66">{item}</p>
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
            <h2 className="mt-3 font-serif text-4xl text-ink">Turn the guide into a route.</h2>
          </div>
          <Link href="/quiz" className="focus-ring inline-flex min-h-12 items-center gap-2 rounded-sm bg-ink px-5 text-sm font-semibold text-ivory shadow-[0_18px_45px_rgba(23,19,15,0.16)] transition duration-300 hover:-translate-y-0.5 hover:bg-graphite">
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
    <section className={`snap-panel border-y ${light ? "border-black/10 bg-white/66 text-ink" : "border-black/10 bg-linen/54 text-ink"} py-16`}>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <p className={`text-sm font-semibold uppercase tracking-[0.22em] ${light ? "text-black/55" : "text-brass"}`}>{eyebrow}</p>
          <h2 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">{title}</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <div key={item} className={`scroll-reveal p-5 ${light ? "border border-black/10 bg-white shadow-[0_18px_45px_rgba(93,72,48,0.08)]" : "premium-panel"}`}>
              <Icon className={light ? "text-ink" : "text-brass"} size={19} aria-hidden="true" />
              <p className="mt-5 leading-7 text-ink/66">{item}</p>
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
        <h2 className="text-2xl font-semibold text-ink">{title}</h2>
      </div>
      <div className="mt-6 grid gap-3">
        {items.map((item) => (
          <p key={item} className="border-t border-black/10 pt-3 leading-7 text-ink/66">
            {item}
          </p>
        ))}
      </div>
    </section>
  );
}
