import { LeadForm } from "@/components/lead-form";
import { TripShell } from "@/components/trip-shell";

export default function PointsPage() {
  return (
    <TripShell>
      <LeadForm
        type="points"
        showPoints
        title="Optimise this trip with points."
        intro="Share your route, points balances and travel notes. The enquiry captures enough context to plan cabins, hotel redemptions and transfer partners."
      />
    </TripShell>
  );
}
