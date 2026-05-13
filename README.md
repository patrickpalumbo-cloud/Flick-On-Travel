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
- Recommended itinerary generated from preloaded city data
- Modular itinerary builder with destination swaps, nights controls and add/remove experiences
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
