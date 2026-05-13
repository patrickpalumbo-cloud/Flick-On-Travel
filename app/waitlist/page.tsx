import { LeadForm } from "@/components/lead-form";
import { TripShell } from "@/components/trip-shell";

export default function WaitlistPage() {
  return (
    <TripShell>
      <LeadForm
        type="waitlist"
        title="Save the route and join the waitlist."
        intro="Send your email and trip preferences so Flick On Travel can turn the MVP itinerary into a polished planning workflow."
      />
    </TripShell>
  );
}
