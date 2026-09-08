# Tentwood Trips living spec

## Product
Premium editorial travel showcase for Tentwood Trips. It presents curated international and domestic journeys, reusable destination detail pages, itinerary exploration and WhatsApp-first enquiry flows. V1 intentionally has no authentication, payment, CRM, booking engine, AI features or persisted enquiry backend.

## Routes
`/`, `/destinations`, `/destinations/bali`, `/destinations/dubai`, `/destinations/japan`, `/destinations/switzerland`, `/about`, `/contact`, `/careers`. A reusable `/destinations/:slug` route also supports domestic and expanded destinations: Thailand, Malaysia, Maldives, Italy, Singapore, Phu Quoc, Turkey and Australia.

## Data model
Local TypeScript data files hold `Destination`, `Journey`, `Itinerary`, `JourneyDay`, `Experience`, `Review` and `Campaign` concepts. Every listed destination now has a detailed signature itinerary with day-by-day editorial copy, route, price, inclusions and exclusions. Bali retains three selectable journeys; all destination pages use the same editorial itinerary timeline.

## Key flows
- Search destinations from the homepage or destinations listing, then open a destination page.
- Filter homepage journeys by destination, budget, traveller type and parsed trip duration (3–5, 6–9, or 10+ days).
- On any destination, inspect its signature itinerary and expand day-by-day editorial timeline rows; Bali offers three selectable journeys.
- Submit destination, contact or career forms to see a ready-to-send state; no form claims data was saved.
- All primary conversion actions open WhatsApp with a pre-filled message.
- Internal route changes reset the document scroll to the top, including clicks made after a deep homepage scroll; hash links remain anchor-based.

## Auth
None. No credentials required.

## Brand
Warm editorial minimalism with Playfair Display + Plus Jakarta Sans, warm linen surfaces, charcoal text, and a turquoise header/primary accent. The refined UI uses cinematic image reveals, square-edged image-led cards, generous section spacing, a transparent-to-solid sticky nav, a hover-safe editorial mega menu, a native mobile drawer and a branded Tentwood WhatsApp concierge control.