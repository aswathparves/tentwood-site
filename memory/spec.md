# Tentwood Trips living spec

## Product
Premium editorial travel showcase for Tentwood Trips. It presents curated international and domestic journeys, reusable destination detail pages, itinerary exploration and WhatsApp-first enquiry flows. V1 intentionally has no authentication, payment, CRM, booking engine, AI features or persisted enquiry backend.

## Routes
`/`, `/destinations`, `/destinations/bali`, `/destinations/dubai`, `/destinations/japan`, `/destinations/switzerland`, `/about`, `/contact`, `/careers`. A reusable `/destinations/:slug` route also supports domestic and expanded destinations: Thailand, Malaysia, Maldives, Italy, Singapore, Phu Quoc, Turkey and Australia.

## Data model
Local TypeScript data files hold `Destination`, `Journey`, `Itinerary`, `JourneyDay`, `Experience`, `Review` and `Campaign` concepts. Every non-Bali destination has three selectable, fully detailed variants: a shorter escape, the signature route and a slower journey with two extra open days. Prices scale by trip length, and every variant has its own route, duration, complete daily timeline, inclusions and exclusions. Bali retains its three bespoke selectable journeys; all destination pages use the same editorial itinerary timeline.

## Key flows
- Search destinations from the homepage or destinations listing, then open a destination page.
- Filter homepage journeys by destination, budget, traveller type and parsed trip duration (3–5, 6–9, or 10+ days).
- On any destination, choose among three journey lengths, see the overview and price update, and expand the complete day-by-day editorial timeline.
- Submit destination, contact or career forms to see a ready-to-send state; no form claims data was saved.
- All primary conversion actions open WhatsApp with a pre-filled message.
- Internal route changes reset the document scroll to the top, including clicks made after a deep homepage scroll; hash links remain anchor-based.

## Auth
None. No credentials required.

## Brand
Warm editorial minimalism with Playfair Display + Plus Jakarta Sans, warm linen surfaces, charcoal text, and a turquoise header/primary accent. The refined UI uses cinematic image reveals, square-edged image-led cards, generous section spacing, a transparent-to-solid sticky nav, a hover-safe editorial mega menu, a native mobile drawer and a branded Tentwood WhatsApp concierge control.