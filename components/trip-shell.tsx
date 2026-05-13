import { Nav } from "@/components/nav";

export function TripShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-ink text-ivory">
      <Nav />
      {children}
    </main>
  );
}
