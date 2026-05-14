import { Nav } from "@/components/nav";

export function TripShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.95),transparent_34rem),linear-gradient(180deg,#fffaf1,#fbf7ef_42%,#f1e7dc)] text-ink">
      <Nav />
      <div className="pointer-events-none fixed inset-x-0 top-16 z-0 h-px bg-gradient-to-r from-transparent via-brass/35 to-transparent" />
      {children}
    </main>
  );
}
