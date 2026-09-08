import type { Destination } from "./types";

const baliHero =
  "https://images.unsplash.com/photo-1675657144361-98ae33e6b6f9?auto=format&fit=crop&w=1800&q=85";
const baliVilla =
  "https://images.unsplash.com/photo-1651108066220-f61c22fc281f?auto=format&fit=crop&w=1200&q=85";

export const destinations: Destination[] = [
  {
    slug: "bali",
    name: "Bali",
    country: "Indonesia",
    region: "Southeast Asia",
    descriptor: "Island rituals, slow mornings and tropical shores",
    heroDescription: "An island of quiet mornings, tropical shores and unforgettable experiences.",
    image: baliHero,
    secondaryImage: baliVilla,
    category: "International",
    tags: ["Couples", "Wellness", "Beach"],
    duration: "6 Nights",
    bestTime: "April – October",
    popularWith: "Couples & families",
    priceFrom: "₹58,500",
    about:
      "Bali rewards the curious. Start among Ubud’s rice terraces and temple bells, move slowly toward the coast, and leave room for the kind of discoveries that never make an itinerary. Our Bali journeys pair considered stays with local moments, from a private cooking table to a sunrise above the clouds.",
    reasons: [
      { title: "Culture", copy: "Temple ceremonies, village craft and a living rhythm that invites you to slow down." },
      { title: "Wellness", copy: "Begin the day with a forest-side treatment, a quiet swim or a long breakfast in the shade." },
      { title: "Nature", copy: "Emerald rice terraces, volcanic highlands and warm water framed by jungle." },
      { title: "The table", copy: "From market spice to a chef’s tasting menu, Bali is best understood through its food." },
    ],
    experiences: [
      { title: "Ubud, at an unhurried pace", description: "A morning walk through the terraces, followed by a village lunch and time to wander.", duration: "Half day", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=82" },
      { title: "A private Balinese kitchen", description: "Shop with a local cook, grind the spices and sit down to a meal you made together.", duration: "3 hours", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=82" },
      { title: "Sunrise above the clouds", description: "A guided dawn walk on Mount Batur with a quiet breakfast waiting at the summit.", duration: "Full morning", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=82" },
      { title: "A day on Nusa Penida", description: "Clear water, limestone coves and a boat day designed around your own pace.", duration: "Full day", image: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=1000&q=82" },
    ],
    itineraries: [
      {
        id: "bali-escape",
        name: "Bali Escape",
        duration: "5 Nights / 6 Days",
        route: "Ubud · Seminyak",
        price: "₹58,500",
        summary: "A beautifully paced first taste of Bali, from the terraces of Ubud to Seminyak’s easy coastal rhythm.",
        image: baliHero,
        days: [
          { day: "01", title: "Arrive into Bali", details: "A warm welcome at the airport, then a private transfer through the island’s green interior to Ubud.", tags: ["Arrival", "Private transfer"] },
          { day: "02", title: "Ubud, in full colour", details: "Rice terraces, a village temple and a long lunch made with ingredients from the morning market.", tags: ["Culture", "Local table"] },
          { day: "03", title: "A slower morning", details: "Time for a treatment or a late breakfast before an afternoon at the Ayung River valley.", tags: ["Wellness", "Nature"] },
          { day: "04", title: "Ubud → Seminyak", details: "Move to the coast with a stop at a sea temple and a sunset check-in by the beach.", tags: ["Transfer", "Sunset"] },
          { day: "05", title: "The coast, your way", details: "A free day for a beach club, a cooking class, or simply the pleasure of nowhere to be.", tags: ["Free time", "Coast"] },
          { day: "06", title: "Until next time", details: "A relaxed breakfast and private transfer to the airport for your flight home.", tags: ["Breakfast", "Departure"] },
        ],
        inclusions: ["Boutique hotel accommodation", "Private airport transfers", "Selected experiences", "Daily breakfast", "Local Tentwood assistance"],
        exclusions: ["International flights", "Personal expenses", "Meals not mentioned", "Optional activities", "Travel insurance unless specified"],
      },
      {
        id: "bali-highlights",
        name: "Bali Highlights",
        duration: "6 Nights / 7 Days",
        route: "Ubud · Canggu · Uluwatu",
        price: "₹74,900",
        summary: "For travellers who want the island’s essential landscapes, a little more space and a final exhale by the cliffs.",
        image: baliVilla,
        days: [
          { day: "01", title: "A soft landing", details: "Meet your local host and settle into the green calm of Ubud.", tags: ["Arrival"] },
          { day: "02", title: "The art of Ubud", details: "A private introduction to Balinese craft, gardens and food.", tags: ["Culture"] },
          { day: "03", title: "Into the highlands", details: "A day of volcano views and lakeside villages.", tags: ["Nature"] },
          { day: "04", title: "Toward the coast", details: "Head south for Canggu’s creative energy and a sunset dinner.", tags: ["Transfer"] },
          { day: "05", title: "Open horizons", details: "A free day by the sea, with a private surf lesson available.", tags: ["Beach"] },
          { day: "06", title: "The Uluwatu light", details: "Clifftop temples, a seafood table and your final Bali sunset.", tags: ["Sunset"] },
          { day: "07", title: "Departure", details: "Private transfer to the airport.", tags: ["Departure"] },
        ],
        inclusions: ["Handpicked stays", "Private transfers", "Three curated experiences", "Daily breakfast", "On-trip assistance"],
        exclusions: ["International flights", "Personal expenses", "Meals not mentioned", "Visa fees if applicable", "Travel insurance"],
      },
      {
        id: "bali-nusa-penida",
        name: "Bali & Nusa Penida",
        duration: "7 Nights / 8 Days",
        route: "Ubud · Nusa Penida · Seminyak",
        price: "₹91,000",
        summary: "An island pairing for travellers who like their Bali with wild coastlines, clear water and more time outdoors.",
        image: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=1200&q=85",
        days: [
          { day: "01", title: "Arrive in Ubud", details: "A private welcome and a quiet first evening among the palms.", tags: ["Arrival"] },
          { day: "02", title: "Ubud rituals", details: "Temple water, rice terraces and a long local lunch.", tags: ["Culture"] },
          { day: "03", title: "The island crossing", details: "Speedboat to Nusa Penida and a sunset above the cliffs.", tags: ["Transfer"] },
          { day: "04", title: "Blue water day", details: "A private boat to the island’s most beautiful coves.", tags: ["Ocean"] },
          { day: "05", title: "Back to Bali", details: "Return to the coast and settle into a beachside stay.", tags: ["Coast"] },
          { day: "06", title: "A day without plans", details: "A day to swim, rest or follow the island’s best table.", tags: ["Free time"] },
          { day: "07", title: "The last light", details: "Uluwatu cliffs and a final dinner by the sea.", tags: ["Sunset"] },
          { day: "08", title: "Departure", details: "Private transfer to the airport.", tags: ["Departure"] },
        ],
        inclusions: ["Accommodation across three stays", "Ferry tickets", "Private transfers", "Selected boat experience", "Daily breakfast"],
        exclusions: ["International flights", "Personal expenses", "Meals not mentioned", "Optional activities", "Travel insurance"],
      },
    ],
    reviews: [
      { quote: "Every detail felt considered, but never over-planned. We had the freedom to be present.", name: "Ananya & Rohan", trip: "Bali Escape · October 2024" },
      { quote: "Tentwood found the version of Bali we were looking for — quietly beautiful and deeply personal.", name: "Meera S.", trip: "Bali Highlights · February 2025" },
    ],
  },
  {
    slug: "dubai", name: "Dubai", country: "United Arab Emirates", region: "Middle East", descriptor: "A city of remarkable contrasts", heroDescription: "From desert stillness to skyline evenings, Dubai is best discovered in layers.", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1800&q=85", secondaryImage: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=85", category: "International", tags: ["Luxury", "Family", "City"], duration: "5 Nights", bestTime: "November – March", popularWith: "Families & couples", priceFrom: "₹62,000", about: "Dubai is more than its skyline. Look past the glass and find old creek-side neighbourhoods, a desert that quiets the senses and tables that stay open late. Our journeys balance the city’s energy with considered pauses.", reasons: [{ title: "Contrast", copy: "Move from a contemporary art space to a desert camp in the same afternoon." }, { title: "The desert", copy: "A private sunset drive, followed by dinner beneath a sky without a horizon." }, { title: "Architecture", copy: "A city shaped by ambition, best understood with an expert eye." }, { title: "The table", copy: "From Emirati kitchens to some of the region’s most exciting new restaurants." }], experiences: [{ title: "Desert after dark", description: "A private sunset drive and an intimate dinner under the stars.", duration: "Evening", image: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=1000&q=82" }, { title: "Old Dubai, slowly", description: "Creek boats, spice lanes and the stories behind the city’s first neighbourhoods.", duration: "Half day", image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1000&q=82" }, { title: "A day on the water", description: "A private boat charter with the skyline as your changing backdrop.", duration: "4 hours", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=82" }], itineraries: [], reviews: [{ quote: "The balance of big city moments and quiet desert time was perfect for our family.", name: "The Nair family", trip: "Dubai in Layers · December 2024" }] },
  {
    slug: "japan", name: "Japan", country: "Japan", region: "East Asia", descriptor: "A journey in detail", heroDescription: "A country of quiet rituals, luminous cities and landscapes that reward attention.", image: "https://images.unsplash.com/photo-1665706896821-319040b81753?auto=format&fit=crop&w=1800&q=85", secondaryImage: "https://images.unsplash.com/photo-1582603455714-a46aaf41e5d9?auto=format&fit=crop&w=1200&q=85", category: "International", tags: ["Culture", "Food", "Couples"], duration: "9 Nights", bestTime: "March – May / October – November", popularWith: "Couples & culture lovers", priceFrom: "₹1,46,000", about: "Japan is a study in attention: the sound of a train arriving, the first tea of the morning, the changing light on a temple roof. We shape each route with room for both the essential and the unexpected.", reasons: [{ title: "Ritual", copy: "Tea rooms, ryokans and small moments of considered hospitality." }, { title: "Craft", copy: "A culture where making something well is its own form of storytelling." }, { title: "The table", copy: "From an early-market breakfast to a counter seat in Kyoto." }, { title: "The seasons", copy: "Japan changes character with the calendar, and every season has its own poetry." }], experiences: [{ title: "Kyoto before the crowds", description: "A private morning through quiet temple paths and a tea room hidden in the old city.", duration: "Morning", image: "https://images.unsplash.com/photo-1558862127-9c4ba9794f31?auto=format&fit=crop&w=1000&q=82" }, { title: "A seat at the counter", description: "An intimate evening at a small restaurant chosen around your tastes.", duration: "Evening", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=82" }, { title: "The art of the ryokan", description: "A night of tatami, onsen and a seasonal kaiseki dinner.", duration: "Overnight", image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1000&q=82" }], itineraries: [], reviews: [{ quote: "Japan felt both effortless and full of meaning. The pacing gave us time to notice it.", name: "Siddharth K.", trip: "Japan, in detail · November 2024" }] },
  {
    slug: "switzerland", name: "Switzerland", country: "Switzerland", region: "Europe", descriptor: "Alpine days, beautifully paced", heroDescription: "A journey through bright lakes, mountain railways and the quiet luxury of time outdoors.", image: "https://images.unsplash.com/photo-1567250948107-98bf56ae6207?auto=format&fit=crop&w=1800&q=85", secondaryImage: "https://images.unsplash.com/photo-1517079810336-d39e72287591?auto=format&fit=crop&w=1200&q=85", category: "International", tags: ["Scenic", "Family", "Luxury"], duration: "7 Nights", bestTime: "June – September / December – February", popularWith: "Families & first-time Europe", priceFrom: "₹1,28,000", about: "Switzerland is a country best experienced through its transitions: a train slipping into the mountains, a lakeside lunch, a hotel where the view becomes the evening’s entertainment.", reasons: [{ title: "The journey", copy: "The route itself is part of the experience, from lake steamers to mountain railways." }, { title: "Alpine air", copy: "Days made for walking, with beautiful places to pause." }, { title: "Small cities", copy: "Zurich, Lucerne and Lausanne each reward a slower look." }, { title: "A little theatre", copy: "Snow, sunlight and the changing mood of the mountains." }], experiences: [{ title: "The scenic railway", description: "A private guide and the best window seat for a day across the Alps.", duration: "Full day", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=82" }, { title: "Lakeside afternoon", description: "A picnic, a boat and a summer afternoon with nowhere else to be.", duration: "Half day", image: "https://images.unsplash.com/photo-1517079810336-d39e72287591?auto=format&fit=crop&w=1000&q=82" }, { title: "A table in the mountains", description: "Regional flavours and a view that stays with you long after dinner.", duration: "Evening", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=82" }], itineraries: [], reviews: [{ quote: "The journey felt like a beautiful film — every train, lake and hotel was exactly right.", name: "Priya & Arjun", trip: "Swiss Summer · July 2024" }] },
];

export const domesticDestinations: Destination[] = [
  { slug: "kashmir", name: "Kashmir", country: "India", region: "North India", descriptor: "Houseboats, cedar air and quiet valleys", heroDescription: "A softer way to see the valley, from Srinagar mornings to the high meadows.", image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1000&q=82", secondaryImage: "https://images.unsplash.com/photo-1532664189809-02133fee698d?auto=format&fit=crop&w=1000&q=82", category: "Domestic", tags: ["Scenic", "Family"], duration: "6 Nights", bestTime: "April – October", popularWith: "Families", priceFrom: "₹42,000", about: "A considered route through Kashmir’s lakes, gardens and mountain villages.", reasons: [], experiences: [], itineraries: [], reviews: [] },
  { slug: "kerala", name: "Kerala", country: "India", region: "South India", descriptor: "Backwaters, spice and a slower coast", heroDescription: "A green, generous journey from the hills to the sea.", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=82", secondaryImage: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1000&q=82", category: "Domestic", tags: ["Wellness", "Family"], duration: "5 Nights", bestTime: "September – March", popularWith: "Couples", priceFrom: "₹36,500", about: "A gentle route through Kerala’s backwaters, forests and coast.", reasons: [], experiences: [], itineraries: [], reviews: [] },
  { slug: "rajasthan", name: "Rajasthan", country: "India", region: "North India", descriptor: "Palaces, desert light and living craft", heroDescription: "A richly textured journey through India’s royal heartland.", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=82", secondaryImage: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=82", category: "Domestic", tags: ["Culture", "Luxury"], duration: "7 Nights", bestTime: "October – March", popularWith: "Culture lovers", priceFrom: "₹48,000", about: "A route of forts, old cities and beautifully hosted stays.", reasons: [], experiences: [], itineraries: [], reviews: [] },
  { slug: "goa", name: "Goa", country: "India", region: "West India", descriptor: "A more considered kind of coastal escape", heroDescription: "Long lunches, old lanes and the freedom to do very little.", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=82", secondaryImage: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1000&q=82", category: "Domestic", tags: ["Beach", "Food"], duration: "4 Nights", bestTime: "November – February", popularWith: "Couples & friends", priceFrom: "₹29,500", about: "An easy, design-led pause by the Arabian Sea.", reasons: [], experiences: [], itineraries: [], reviews: [] },
];

export const additionalInternationalDestinations: Destination[] = [
  { slug: "thailand", name: "Thailand", country: "Thailand", region: "Southeast Asia", descriptor: "Island time, night markets and generous food", heroDescription: "A warm, sensory journey from Bangkok’s old lanes to the Andaman coast.", image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=84", secondaryImage: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1000&q=82", category: "Visa-Free", tags: ["Beach", "Food", "Friends"], duration: "6 Nights", bestTime: "November – April", popularWith: "Couples & friends", priceFrom: "₹52,000", about: "Thailand is a study in contrast: the pulse of Bangkok, the calm of a longtail boat and a table that keeps arriving with something new.", reasons: [{ title: "The table", copy: "Street-side spice, family recipes and the best kind of abundance." }, { title: "Island light", copy: "Clear water, limestone shores and slow afternoons in the shade." }], experiences: [], itineraries: [], reviews: [] },
  { slug: "malaysia", name: "Malaysia", country: "Malaysia", region: "Southeast Asia", descriptor: "Rainforest, city and coast in one beautiful arc", heroDescription: "A richly layered journey through Kuala Lumpur, the rainforest and the sea.", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=84", secondaryImage: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1000&q=82", category: "Visa-Free", tags: ["Nature", "Food", "Family"], duration: "6 Nights", bestTime: "December – March", popularWith: "Families & food lovers", priceFrom: "₹49,500", about: "Malaysia moves between modern city life and ancient forest with an ease that makes it a joy to travel through.", reasons: [{ title: "Many cultures", copy: "A place where Malay, Chinese, Indian and indigenous traditions meet." }, { title: "The forest", copy: "Wild landscapes, canopy walks and a quieter kind of adventure." }], experiences: [], itineraries: [], reviews: [] },
  { slug: "maldives", name: "Maldives", country: "Maldives", region: "Indian Ocean", descriptor: "The art of doing less", heroDescription: "A private island pause built around water, light and your own pace.", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=84", secondaryImage: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1000&q=82", category: "Visa-Free", tags: ["Beach", "Wellness", "Couples"], duration: "5 Nights", bestTime: "November – April", popularWith: "Couples & celebrations", priceFrom: "₹1,12,000", about: "There is a particular luxury in having nowhere else to be. In the Maldives, the day follows the tide, the light and the table you are looking forward to.", reasons: [{ title: "The water", copy: "A whole palette of blue, changing from morning to late afternoon." }, { title: "Stillness", copy: "A rare chance to let the world become beautifully small." }], experiences: [], itineraries: [], reviews: [] },
  { slug: "italy", name: "Italy", country: "Italy", region: "Europe", descriptor: "Long lunches and a life well lived", heroDescription: "A beautifully paced route through Italian tables, towns and timeless landscapes.", image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1200&q=84", secondaryImage: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=82", category: "International", tags: ["Culture", "Food", "Couples"], duration: "8 Nights", bestTime: "April – June / September – October", popularWith: "Couples & families", priceFrom: "₹1,34,000", about: "Italy is best taken slowly: one city, one village, one long table at a time. We build routes that leave room for the pleasures in between.", reasons: [{ title: "The table", copy: "Regional cooking, market mornings and a good bottle shared without hurry." }, { title: "The art", copy: "A living history that rewards looking up, looking closer and staying longer." }], experiences: [], itineraries: [], reviews: [] },
  { slug: "singapore", name: "Singapore", country: "Singapore", region: "Southeast Asia", descriptor: "A city of gardens, design and flavour", heroDescription: "A compact, considered city break with a surprising amount of room to wander.", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=84", secondaryImage: "https://images.unsplash.com/photo-1496939376851-89342e90adcd?auto=format&fit=crop&w=1000&q=82", category: "International", tags: ["City", "Food", "Family"], duration: "4 Nights", bestTime: "February – April", popularWith: "Families & first-time Asia", priceFrom: "₹46,500", about: "Singapore makes the city feel generous: lush, precise, wonderfully easy to navigate and full of tables worth crossing town for.", reasons: [{ title: "The garden city", copy: "A rare urban landscape where green space is part of the architecture." }, { title: "The table", copy: "Hawker stalls and destination restaurants, often on the same street." }], experiences: [], itineraries: [], reviews: [] },
  { slug: "phu-quoc", name: "Phu Quoc", country: "Vietnam", region: "Southeast Asia", descriptor: "A quiet island at the edge of the map", heroDescription: "A softer Vietnamese escape for clear water, seafood and unhurried days.", image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=84", secondaryImage: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1000&q=82", category: "Visa-Free", tags: ["Beach", "Food", "Wellness"], duration: "5 Nights", bestTime: "November – April", popularWith: "Couples & slow travellers", priceFrom: "₹44,000", about: "Phu Quoc is for travellers who want a little more quiet: fishing villages, warm water and seafood at the end of the road.", reasons: [{ title: "The coast", copy: "Long beaches and water that invites you to stay until sunset." }, { title: "The pace", copy: "A place that makes doing less feel like the right choice." }], experiences: [], itineraries: [], reviews: [] },
  { slug: "turkey", name: "Turkey", country: "Türkiye", region: "Eurasia", descriptor: "Where continents meet over a long table", heroDescription: "A journey of ancient cities, bright coastlines and remarkable hospitality.", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=84", secondaryImage: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1000&q=82", category: "International", tags: ["Culture", "Food", "Scenic"], duration: "8 Nights", bestTime: "April – June / September – October", popularWith: "Couples & culture lovers", priceFrom: "₹1,08,000", about: "Turkey brings together old cities, generous tables and landscapes that change character every few hours.", reasons: [{ title: "The crossroads", copy: "Centuries of movement and culture are visible in every neighbourhood." }, { title: "The coast", copy: "Clear water, small harbours and days measured by the sun." }], experiences: [], itineraries: [], reviews: [] },
  { slug: "australia", name: "Australia", country: "Australia", region: "Oceania", descriptor: "Big landscapes, warm cities and open horizons", heroDescription: "A wide-open journey from city tables to red earth and the reef.", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d0?auto=format&fit=crop&w=1200&q=84", secondaryImage: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1000&q=82", category: "International", tags: ["Adventure", "Scenic", "Family"], duration: "10 Nights", bestTime: "September – November / March – May", popularWith: "Families & curious travellers", priceFrom: "₹1,78,000", about: "Australia gives you scale: a city with a great table, a reef that changes the light and a landscape that makes you feel small in the best way.", reasons: [{ title: "The outdoors", copy: "Wild coast, red earth and experiences that begin outside." }, { title: "The cities", copy: "Design, food and culture with a relaxed Australian warmth." }], experiences: [], itineraries: [], reviews: [] },
];

export const internationalDestinations = [...destinations, ...additionalInternationalDestinations];
export const visaFreeDestinations = [destinations.find((item) => item.slug === "bali")!, ...additionalInternationalDestinations.filter((item) => item.category === "Visa-Free")];

export const allDestinations = [...destinations, ...additionalInternationalDestinations, ...domesticDestinations];

export function getDestination(slug?: string) {
  return allDestinations.find((destination) => destination.slug === slug);
}