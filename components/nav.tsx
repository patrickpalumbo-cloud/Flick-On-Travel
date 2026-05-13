import Link from "next/link";
import { Plane } from "lucide-react";

export function Nav() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-ink/78 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-sm">
          <span className="flex h-9 w-9 items-center justify-center border border-brass/50 bg-white/5">
            <Plane size={18} aria-hidden="true" />
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.24em] text-ivory">Flick On Travel</span>
        </Link>
        <div className="hidden items-center gap-6 text-sm text-ivory/74 md:flex">
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
      </nav>
    </header>
  );
}
