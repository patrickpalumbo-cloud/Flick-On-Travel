import { ExternalLink, Plane, Search } from "lucide-react";
import { qantasRewardFinderUrl } from "@/lib/qantas-reward-finder";

export function QantasRewardFinderCard() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 pt-24 sm:px-6 sm:pt-28 lg:px-8">
      <div className="premium-panel overflow-hidden">
        <div className="grid gap-0 md:grid-cols-[0.95fr_1.05fr]">
          <div className="bg-ink p-6 text-ivory sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-brass/40 bg-white/8 text-brass">
              <Plane size={19} aria-hidden="true" />
            </div>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.24em] text-brass">Qantas reward seats</p>
            <h2 className="mt-3 font-serif text-4xl leading-none text-white">Search Classic Flight Rewards.</h2>
            <p className="mt-5 text-sm leading-7 text-ivory/72">
              Use Qantas&apos; Flight Reward Finder to scan one-way international reward availability before sending your route for points optimisation.
            </p>
          </div>

          <div className="bg-[linear-gradient(135deg,#fffaf1,#f1e3cf)] p-6 sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-brass shadow-[0_16px_40px_rgba(93,72,48,0.1)]">
              <Search size={18} aria-hidden="true" />
            </div>
            <p className="mt-7 text-sm leading-7 text-ink/68">
              The finder shows estimated Classic Flight Reward availability and last-checked timing. Always confirm seats, taxes and booking rules on Qantas before making plans.
            </p>
            <a
              href={qantasRewardFinderUrl}
              target="_blank"
              rel="noreferrer"
              className="focus-ring mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-ink px-5 text-sm font-semibold text-ivory shadow-[0_18px_45px_rgba(23,19,15,0.16)] transition duration-300 hover:-translate-y-0.5 hover:bg-graphite"
            >
              Open Qantas finder <ExternalLink size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

