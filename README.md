# Flick On Travel

A responsive MVP web app for premium sports, points and experience-based travel planning.

## Stack

- Next.js App Router
- Tailwind CSS
- Supabase lead capture
- Vercel-ready project structure

## MVP flow

- Premium landing page
- Swipe-style quiz with destination and experience decks
- Immersive destination pages with cinematic imagery, sports/events, hotels, nightlife and itinerary ideas
- Recommended itinerary generated from preloaded city data
- Premium concierge itinerary builder with timeline layout, drag-and-drop destinations, animated route map, nights controls and add/remove experiences
- Luxury airline-inspired UI with cinematic imagery, black/white styling and subtle motion
- Waitlist and points-flight enquiry capture

## Run locally

```bash
npm install
npm run dev
```

## Supabase

Create a `trip_leads` table with columns matching the API payload:

```sql
create table trip_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  lead_type text not null,
  email text not null,
  name text,
  trip_preferences jsonb,
  itinerary jsonb,
  message text,
  points_balance text
);
```

Add these values in `.env.local` and in Vercel project settings:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

Without Supabase keys, the forms validate and return the captured payload without persisting it.
