import { LeadForm } from "@/components/lead-form";
import { QantasRewardFinderCard } from "@/components/qantas-reward-finder-card";
import { TripShell } from "@/components/trip-shell";

export default function PointsPage() {
  return (
    <TripShell>
      <QantasRewardFinderCard />
      <LeadForm
        type="points"
        showPoints
        compactTop
        title="Optimise this trip with points."
        intro="Share your route, points balances and travel notes. The enquiry captures enough context to plan cabins, hotel redemptions and transfer partners."
      />
    </TripShell>
  );
}
