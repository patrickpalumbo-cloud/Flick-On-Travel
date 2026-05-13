"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Heart } from "lucide-react";
import { TripShell } from "@/components/trip-shell";
import { budgets, buildItinerary, defaultPreferences, interests, regions, sports, travelStyles, type Interest, type Sport, type TripPreferences } from "@/lib/trip-data";
import { writeItinerary, writePreferences } from "@/lib/storage";

type Step = "region" | "budget" | "interests" | "sports" | "style";
const steps: Step[] = ["region", "budget", "interests", "sports", "style"];

export default function QuizPage() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [preferences, setPreferences] = useState<TripPreferences>(defaultPreferences);
  const step = steps[stepIndex];
  const progress = Math.round(((stepIndex + 1) / steps.length) * 100);

  const preview = useMemo(() => buildItinerary(preferences), [preferences]);

  function toggleInterest(interest: Interest) {
    setPreferences((current) => ({
      ...current,
      interests: current.interests.includes(interest) ? current.interests.filter((item) => item !== interest) : [...current.interests, interest]
    }));
  }

  function toggleSport(sport: Sport) {
    setPreferences((current) => ({
      ...current,
      sports: current.sports.includes(sport) ? current.sports.filter((item) => item !== sport) : [...current.sports, sport]
    }));
  }

  function next() {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
      return;
    }

    const itinerary = buildItinerary(preferences);
    writePreferences(preferences);
    writeItinerary(itinerary);
    router.push("/itinerary");
  }

  return (
    <TripShell>
      <section className="mx-auto grid min-h-screen max-w-7xl gap-8 px-4 pb-10 pt-28 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brass">Trip quiz</p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-white sm:text-6xl">Swipe into the right kind of escape.</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-ivory/72">Pick fast. The route can be customised after the first recommendation.</p>
          <div className="mt-8 h-1 bg-white/10">
            <div className="h-full bg-brass transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="self-center border border-white/10 bg-white/[0.04] p-4 shadow-lounge sm:p-6">
          <div className="min-h-[430px] bg-ivory p-5 text-ink sm:p-8">
            {step === "region" ? (
              <Panel title="Where should we point the lounge pass?">
                <OptionGrid items={regions} selected={[preferences.region]} onSelect={(region) => setPreferences({ ...preferences, region })} />
              </Panel>
            ) : null}

            {step === "budget" ? (
              <Panel title="What is the spend posture?">
                <OptionGrid items={budgets} selected={[preferences.budget]} onSelect={(budget) => setPreferences({ ...preferences, budget })} />
              </Panel>
            ) : null}

            {step === "interests" ? (
              <Panel title="What should fill the non-event hours?">
                <OptionGrid items={interests} selected={preferences.interests} onSelect={toggleInterest} multi />
              </Panel>
            ) : null}

            {step === "sports" ? (
              <Panel title="Which sports should anchor the route?">
                <OptionGrid items={sports} selected={preferences.sports} onSelect={toggleSport} multi />
              </Panel>
            ) : null}

            {step === "style" ? (
              <Panel title="Choose the pace of the trip.">
                <OptionGrid items={travelStyles} selected={[preferences.style]} onSelect={(style) => setPreferences({ ...preferences, style })} />
              </Panel>
            ) : null}

            <div className="mt-8 border-t border-black/10 pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/50">Live route preview</p>
              <p className="mt-3 text-xl font-semibold">{preview.cities.map((city) => city.name).join("  /  ")}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button
              className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-sm border border-white/15 px-4 text-sm text-ivory disabled:opacity-40"
              disabled={stepIndex === 0}
              onClick={() => setStepIndex(stepIndex - 1)}
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back
            </button>
            <button className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-sm bg-ivory px-5 text-sm font-semibold text-ink" onClick={next}>
              {stepIndex === steps.length - 1 ? "Generate itinerary" : "Next"}
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </TripShell>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <Heart size={20} aria-hidden="true" />
      <h2 className="mt-5 font-serif text-3xl leading-tight sm:text-5xl">{title}</h2>
      <div className="mt-8">{children}</div>
    </div>
  );
}

function OptionGrid<T extends string>({
  items,
  selected,
  onSelect
}: {
  items: readonly T[];
  selected: readonly T[];
  onSelect: (item: T) => void;
  multi?: boolean;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => {
        const active = selected.includes(item);
        return (
          <button
            key={item}
            onClick={() => onSelect(item)}
            className={`focus-ring flex min-h-16 items-center justify-between rounded-sm border px-4 text-left text-sm font-semibold transition ${
              active ? "border-black bg-black text-white" : "border-black/15 bg-white text-black hover:border-black/50"
            }`}
          >
            {item}
            {active ? <Check size={17} aria-hidden="true" /> : null}
          </button>
        );
      })}
    </div>
  );
}
