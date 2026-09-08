# Tentwood Trips living spec

## Product
Premium editorial travel showcase for Tentwood Trips. It presents curated international and domestic journeys, reusable destination detail pages, itinerary exploration and WhatsApp-first enquiry flows. V1 intentionally has no authentication, payment, CRM, booking engine, AI features or persisted enquiry backend.

## Routes
`/`, `/destinations`, `/destinations/bali`, `/destinations/dubai`, `/destinations/japan`, `/destinations/switzerland`, `/about`, `/contact`, `/careers`. A reusable `/destinations/:slug` route also supports the structured domestic destination cards.

## Data model
Local TypeScript data files hold `Destination`, `Journey`, `Itinerary`, `JourneyDay`, `Experience`, `Review` and `Campaign` concepts. Bali has the richest itinerary content; other destination pages use the same reusable structure with tailored editorial content.

## Key flows
- Search destinations from the homepage or destinations listing, then open a destination page.
- Filter homepage journeys by destination, budget and traveller type.
- On Bali, choose an itinerary and expand day-by-day timeline rows.
- Submit destination, contact or career forms to see a ready-to-send state; no form claims data was saved.
- All primary conversion actions open WhatsApp with a pre-filled message.

## Auth
None. No credentials required.

## Brand
Warm editorial minimalism with Playfair Display + Plus Jakarta Sans, warm linen surfaces, charcoal text, and a turquoise header/primary accent.