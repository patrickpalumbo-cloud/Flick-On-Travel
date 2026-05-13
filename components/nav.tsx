import Link from "next/link";
import { Plane, Sparkles } from "lucide-react";

export function Nav() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/72 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-sm">
          <span className="flex h-10 w-10 items-center justify-center border border-brass/60 bg-white/[0.06] shadow-[inset_0_1px_rgba(255,255,255,0.14)]">
            <Plane size={18} aria-hidden="true" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.26em] text-ivory sm:text-sm">Flick On Travel</span>
        </Link>
        <div className="hidden items-center gap-6 text-sm text-ivory/74 md:flex">
          <Link className="focus-ring rounded-sm hover:text-white" href="/discover">
            Discover
          </Link>
          <Link className="focus-ring rounded-sm hover:text-white" href="/destinations">
            Destinations
          </Link>
          <Link className="focus-ring rounded-sm hover:text-white" href="/quiz">
            Quiz
          </Link>
          <Link className="focus-ring rounded-sm hover:text-white" href="/itinerary">
            Itinerary
          </Link>
          <Link className="focus-ring rounded-sm hover:text-white" href="/points">
            Points
          </Link>
        </div>
        <Link className="focus-ring inline-flex h-10 w-10 items-center justify-center border border-white/15 bg-white/[0.04] text-ivory md:hidden" href="/quiz" aria-label="Start quiz">
          <Sparkles size={17} aria-hidden="true" />
        </Link>
      </nav>
    </header>
  );
}
