import Link from "next/link";
import { Plane, Sparkles } from "lucide-react";

export function Nav() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-black/10 bg-ivory/78 shadow-[0_10px_40px_rgba(93,72,48,0.08)] backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-sm">
          <span className="flex h-10 w-10 items-center justify-center border border-brass/45 bg-white text-ink shadow-[0_12px_30px_rgba(93,72,48,0.12)]">
            <Plane size={18} aria-hidden="true" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.26em] text-ink sm:text-sm">Flick On Travel</span>
        </Link>
        <div className="hidden items-center gap-6 text-sm text-ink/68 md:flex">
          <Link className="focus-ring rounded-sm hover:text-ink" href="/discover">
            Discover
          </Link>
          <Link className="focus-ring rounded-sm hover:text-ink" href="/destinations">
            Destinations
          </Link>
          <Link className="focus-ring rounded-sm hover:text-ink" href="/quiz">
            Quiz
          </Link>
          <Link className="focus-ring rounded-sm hover:text-ink" href="/itinerary">
            Itinerary
          </Link>
          <Link className="focus-ring rounded-sm hover:text-ink" href="/rewards">
            Rewards
          </Link>
          <Link className="focus-ring rounded-sm hover:text-ink" href="/points">
            Points
          </Link>
        </div>
        <Link className="focus-ring inline-flex h-10 w-10 items-center justify-center border border-black/10 bg-white text-ink shadow-[0_12px_30px_rgba(93,72,48,0.1)] md:hidden" href="/quiz" aria-label="Start quiz">
          <Sparkles size={17} aria-hidden="true" />
        </Link>
      </nav>
    </header>
  );
}
