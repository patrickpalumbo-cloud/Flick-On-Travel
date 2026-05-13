import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

type LeadPayload = {
  type: "waitlist" | "points";
  email: string;
  name?: string;
  preferences?: unknown;
  itinerary?: unknown;
  message?: string;
  pointsBalance?: string;
};

export async function POST(request: Request) {
  const payload = (await request.json()) as LeadPayload;

  if (!payload.email || !payload.email.includes("@")) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }

  const lead = {
    lead_type: payload.type,
    email: payload.email,
    name: payload.name ?? null,
    trip_preferences: payload.preferences ?? null,
    itinerary: payload.itinerary ?? null,
    message: payload.message ?? null,
    points_balance: payload.pointsBalance ?? null
  };

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({
      saved: false,
      configured: false,
      lead,
      message: "Supabase env vars are not configured yet. Payload validated locally."
    });
  }

  const { error } = await supabase.from("trip_leads").insert(lead);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ saved: true, configured: true });
}
