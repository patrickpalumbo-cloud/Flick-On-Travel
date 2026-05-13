import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, CircleDollarSign, Clock3, Sparkles } from "lucide-react";
import { CtaButton } from "@/components/cta-button";
import { Nav } from "@/components/nav";

const steps = [
  "Choose your region, budget, sports and travel mood.",
  "Review a modular route built from preloaded city intelligence.",
  "Swap cities, tune nights and send it for points optimisation."
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-ink text-ivory">
      <Nav />
      <section className="relative min-h-[92vh] overflow-hidden">
        <Image src="/lounge-hero.jpg" alt="Luxury airport lounge with sports travel details" fill priority className="cinematic-pan object-cover" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-4 pb-10 pt-28 sm:px-6 sm:pb-16 lg:px-8">
          <div className="animate-fade-up max-w-3xl">
            <p className="mb-5 inline-flex border border-brass/50 bg-black/40 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-brass backdrop-blur">
              Sports. Points. Private-feeling escapes.
            </p>
            <h1 className="font-serif text-5xl leading-none text-white sm:text-7xl lg:text-8xl">Flick On Travel</h1>
            <div className="shimmer-line mt-5 h-px w-48 bg-brass/70" />
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ivory/80 sm:text-xl">
              A premium travel planner for people who build trips around centre court, grand prix weekends,
              hard-to-get tables and smarter redemptions.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CtaButton href="/quiz">
                Start the trip quiz <ArrowRight size={17} aria-hidden="true" />
              </CtaButton>
              <CtaButton href="/points" variant="ghost">
                Optimise this trip with points
              </CtaButton>
            </div>
          </div>
          <div className="mt-10 grid gap-2 text-xs uppercase tracking-[0.18em] text-ivory/58 sm:grid-cols-3">
            {["Award cabins", "Event weekends", "Hotel credits"].map((item) => (
              <div key={item} className="border border-white/10 bg-black/30 px-4 py-3 backdrop-blur">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1fr_1.3fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brass">How it works</p>
          <h2 className="mt-4 font-serif text-4xl text-white sm:text-5xl">From instinctive swipes to a polished route.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step} className="premium-panel p-5 transition duration-300 hover:-translate-y-1">
              <span className="text-sm text-brass">0{index + 1}</span>
              <p className="mt-6 leading-7 text-ivory/76">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-16 sm:px-6 sm:pb-24 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <div className="relative min-h-[360px] overflow-hidden border border-white/10">
          <Image src="/terminal-brand.jpg" alt="Cinematic private airport terminal with sports travel details" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brass">Cinematic routing</p>
            <h2 className="mt-3 font-serif text-4xl text-white">Luxury planning with match-day precision.</h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {[
            { icon: Sparkles, title: "Experience-led", copy: "Dining, wellness, culture and event logic sit inside every itinerary module." },
            { icon: BadgeCheck, title: "Sports-first", copy: "Preloaded city picks surface F1, tennis, football, golf and arena moments." },
            { icon: CircleDollarSign, title: "Points-ready", copy: "Every route has a handoff for award flights, hotel credits and upgrade strategy." }
          ].map(({ icon: Icon, title, copy }) => (
            <div key={title} className="premium-panel p-5">
              <Icon size={22} className="text-brass" aria-hidden="true" />
              <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 leading-7 text-ivory/66">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-ivory py-14 text-ink sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            { label: "Swipe to signal intent", value: "01" },
            { label: "Build a modular route", value: "02" },
            { label: "Optimise flights and hotels", value: "03" }
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between border-b border-black/15 py-4">
              <p className="max-w-40 text-sm font-semibold uppercase tracking-[0.18em] text-black/58">{label}</p>
              <p className="font-serif text-5xl text-black">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 py-16 sm:px-6 sm:py-20 md:flex-row md:items-center lg:px-8">
        <div>
          <p className="mb-3 flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-brass">
            <Clock3 size={15} aria-hidden="true" /> Under two minutes
          </p>
          <h2 className="font-serif text-4xl text-white">Ready for a sample route?</h2>
          <p className="mt-3 max-w-xl text-ivory/70">Answer a few pointed questions and Flick On Travel will assemble the first version.</p>
        </div>
        <Link className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-ivory px-5 py-3 text-sm font-semibold text-ink transition duration-300 hover:-translate-y-0.5 hover:bg-white" href="/quiz">
          Build mine <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}
