import { Nav } from "@/components/nav";

export function TripShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-ink text-ivory">
      <Nav />
      <div className="pointer-events-none fixed inset-x-0 top-16 z-0 h-px bg-gradient-to-r from-transparent via-brass/50 to-transparent" />
      {children}
    </main>
  );
}
