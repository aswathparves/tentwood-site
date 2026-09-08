export type DestinationCategory = "International" | "Domestic" | "Visa-Free";

export interface JourneyDay {
  day: string;
  title: string;
  details: string;
  tags: string[];
}

export interface Itinerary {
  id: string;
  name: string;
  duration: string;
  route: string;
  price: string;
  summary: string;
  image: string;
  days: JourneyDay[];
  inclusions: string[];
  exclusions: string[];
}

export interface Experience {
  title: string;
  description: string;
  duration?: string;
  image: string;
}

export interface Destination {
  slug: string;
  name: string;
  country: string;
  region: string;
  descriptor: string;
  heroDescription: string;
  image: string;
  secondaryImage: string;
  category: DestinationCategory;
  tags: string[];
  duration: string;
  bestTime: string;
  popularWith: string;
  priceFrom: string;
  about: string;
  reasons: { title: string; copy: string }[];
  experiences: Experience[];
  itineraries: Itinerary[];
  reviews: { quote: string; name: string; trip: string }[];
}

export interface Journey {
  id: string;
  destination: string;
  slug: string;
  title: string;
  duration: string;
  travelType: "Solo" | "Couple" | "Family" | "Friends";
  budget: "Under ₹50K" | "₹50K–₹1.5L" | "₹1.5L–₹2.5L" | "Luxury";
  price: string;
  image: string;
  descriptor: string;
}