import type { Itinerary } from "./types";

type DayInput = [title: string, details: string, tags: string[]];

const inclusions = ["Handpicked accommodation", "Private airport transfers", "Curated experiences shown in the plan", "Daily breakfast", "Local Tentwood assistance"];
const exclusions = ["International flights", "Personal expenses", "Meals not mentioned", "Optional activities", "Travel insurance unless specified"];

const destinationNames: Record<string, string> = {
  dubai: "Dubai", japan: "Japan", switzerland: "Switzerland", kashmir: "Kashmir", kerala: "Kerala", rajasthan: "Rajasthan", goa: "Goa", thailand: "Thailand", malaysia: "Malaysia", maldives: "Maldives", italy: "Italy", singapore: "Singapore", "phu-quoc": "Phu Quoc", turkey: "Turkey", australia: "Australia",
};

function scaledPrice(price: string, factor: number) {
  const value = Number(price.replace(/[^0-9]/g, ""));
  const scaled = Math.round((value * factor) / 500) * 500;
  return `₹${scaled.toLocaleString("en-IN")}`;
}

function durationFor(days: number) {
  return `${days - 1} Nights / ${days} Days`;
}

function normalizeDays(days: DayInput[]) {
  return days.map(([title, details, tags], index) => ({ day: String(index + 1).padStart(2, "0"), title, details, tags }));
}

function journey(slug: string, name: string, duration: string, route: string, price: string, summary: string, image: string, days: DayInput[]): Itinerary[] {
  const place = destinationNames[slug] ?? name;
  const signature: Itinerary = {
    id: `${slug}-signature`, name, duration, route, price, summary, image,
    days: normalizeDays(days),
    inclusions,
    exclusions,
  };
  const shortDayCount = Math.max(4, Math.ceil(days.length * 0.64));
  const departure = days[days.length - 1]!;
  const shortDays: DayInput[] = [...days.slice(0, shortDayCount - 1), departure];
  const shortRoute = route.split(" · ").slice(0, 2).join(" · ");
  const short: Itinerary = {
    id: `${slug}-short`,
    name: `${place} Short Escape`,
    duration: durationFor(shortDays.length),
    route: shortRoute,
    price: scaledPrice(price, 0.72),
    summary: `A focused first taste of ${place}, keeping the defining moments while making the most of a shorter break.`,
    image,
    days: normalizeDays(shortDays),
    inclusions,
    exclusions,
  };
  const middle = Math.max(2, Math.floor(days.length / 2));
  const slowDays: DayInput[] = [
    ...days.slice(0, middle),
    [`A day left open in ${place}`, `A deliberately unplanned day to return to somewhere you loved, follow a local recommendation or simply enjoy the stay at your own pace.`, ["Slow travel", "Your choice"]],
    ...days.slice(middle, -1),
    ["One more day, no rush", `A final full day with space for a favourite neighbourhood, a long lunch or one last experience chosen with your Tentwood expert.`, ["Free time", "Local recommendation"]],
    departure,
  ];
  const slow: Itinerary = {
    id: `${slug}-slow`,
    name: `${place}, Slowly`,
    duration: durationFor(slowDays.length),
    route,
    price: scaledPrice(price, 1.28),
    summary: `The signature ${place} route with two open days added for longer lunches, spontaneous discoveries and the pleasure of not rushing.`,
    image,
    days: normalizeDays(slowDays),
    inclusions,
    exclusions,
  };
  return [short, signature, slow];
}

export const destinationItineraryLibrary: Record<string, Itinerary[]> = {
  dubai: journey("dubai", "Dubai in Layers", "5 Nights / 6 Days", "Old Dubai · Desert · Jumeirah", "₹62,000", "A city-and-desert journey that balances landmark moments with the quieter side of the Emirates.", "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=85", [
    ["Arrive beneath the skyline", "A private welcome, an easy hotel check-in and an unhurried evening beside the creek.", ["Arrival", "Private transfer"]],
    ["Old Dubai, slowly", "Cross the creek by abra, walk the textile and spice lanes, then share an Emirati lunch with a local host.", ["Culture", "Local table"]],
    ["Architecture and the new city", "See Dubai through its design story, from the museum district to an evening above Downtown.", ["Design", "City"]],
    ["Into the desert", "Leave the city after lunch for a private dune drive, sunset pause and intimate dinner under the stars.", ["Desert", "Sunset"]],
    ["The coast, your way", "A free morning for the beach or spa, followed by a private boat hour as the skyline lights up.", ["Coast", "Free time"]],
    ["A final Arabic coffee", "Breakfast at leisure and a private airport transfer timed around your flight.", ["Breakfast", "Departure"]],
  ]),
  japan: journey("japan", "Japan, in Detail", "9 Nights / 10 Days", "Tokyo · Hakone · Kyoto", "₹1,46,000", "A considered first journey through Japan, from Tokyo’s energy to Kyoto’s quieter rituals.", "https://images.unsplash.com/photo-1665706896821-319040b81753?auto=format&fit=crop&w=1400&q=85", [
    ["Tokyo, first impressions", "Arrive to a private transfer and a neighbourhood dinner chosen around the hour and your appetite.", ["Arrival", "Tokyo"]],
    ["The city behind the skyline", "Walk old Yanaka with a local, pause for tea, then spend the evening in contemporary Tokyo.", ["Culture", "Local guide"]],
    ["Market morning", "Begin at the market, join a small cooking table and keep the afternoon open for design or art.", ["Food", "Craft"]],
    ["Tokyo at your pace", "A flexible day shaped around architecture, gardens, vintage finds or a counter-seat lunch.", ["Free time", "City"]],
    ["Tokyo → Hakone", "Travel by rail into the mountains and settle into a ryokan for onsen time and a seasonal kaiseki dinner.", ["Rail", "Ryokan"]],
    ["Hakone → Kyoto", "A slow breakfast, mountain views and the shinkansen west to Kyoto’s old streets.", ["Scenic", "Transfer"]],
    ["Kyoto before the crowds", "Enter a temple garden early, meet a tea practitioner and wander Gion toward dusk.", ["Temple", "Tea"]],
    ["Craft and countryside", "Spend the day with a maker outside the city, returning for an intimate chef-led dinner.", ["Craft", "Local table"]],
    ["A day to notice", "Choose a forest walk, Nara excursion or a deliberately unscheduled Kyoto day.", ["Choice", "Nature"]],
    ["Until next season", "Breakfast and a private transfer for your onward flight or rail connection.", ["Departure", "Breakfast"]],
  ]),
  switzerland: journey("switzerland", "The Alpine Route", "7 Nights / 8 Days", "Zurich · Lucerne · Interlaken · Montreux", "₹1,28,000", "A scenic rail journey built around bright lakes, mountain air and beautifully timed pauses.", "https://images.unsplash.com/photo-1567250948107-98bf56ae6207?auto=format&fit=crop&w=1400&q=85", [
    ["Arrive in Zurich", "A direct rail welcome and a relaxed first evening beside the old city and the Limmat.", ["Arrival", "Rail"]],
    ["Zurich → Lucerne", "Travel to the lake, check into a waterside stay and take a private sunset walk through Lucerne.", ["Lake", "Old town"]],
    ["Above the clouds", "Ride the mountain railway for panoramic trails and a long alpine lunch.", ["Mountain", "Scenic rail"]],
    ["Lucerne → Interlaken", "Take the GoldenPass line through meadows and settle beneath the Bernese peaks.", ["Rail", "Landscape"]],
    ["The high Alps", "Choose Jungfraujoch or a quieter valley day, with every connection carefully timed.", ["Alps", "Choice"]],
    ["Interlaken → Montreux", "Continue west by panoramic train to vineyards and the softer light of Lake Geneva.", ["Rail", "Vineyards"]],
    ["A lakeside day", "Visit a family cellar, cross the lake by boat and linger over your final dinner.", ["Wine", "Boat"]],
    ["Departure", "A scenic transfer to Geneva or Zurich for your onward flight.", ["Departure", "Transfer"]],
  ]),
  kashmir: journey("kashmir", "The Valley, Gently", "6 Nights / 7 Days", "Srinagar · Pahalgam · Gulmarg", "₹42,000", "Houseboat mornings, cedar valleys and mountain days paced with room to breathe.", "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1400&q=85", [
    ["A Srinagar welcome", "Arrive to kahwa, a private transfer and a quiet evening on a handpicked houseboat.", ["Arrival", "Houseboat"]],
    ["Gardens and old lanes", "See Mughal gardens in the morning, then walk the old city with a local storyteller.", ["Culture", "Local guide"]],
    ["Srinagar → Pahalgam", "Follow the river into the Lidder Valley with a village lunch along the way.", ["Scenic drive", "Village"]],
    ["The valley on foot", "Choose a gentle meadow walk or a longer guided trail, returning for tea by the river.", ["Nature", "Walking"]],
    ["Pahalgam → Gulmarg", "Cross changing valleys toward Gulmarg and settle into mountain stillness.", ["Transfer", "Mountains"]],
    ["High meadows", "Ride the gondola when conditions allow and spend the afternoon among pine paths.", ["Gondola", "Scenic"]],
    ["Back to Srinagar", "A final valley breakfast and transfer to the airport.", ["Breakfast", "Departure"]],
  ]),
  kerala: journey("kerala", "The Green & the Blue", "5 Nights / 6 Days", "Kochi · Munnar · Kumarakom", "₹36,500", "A gentle southern route from old port streets to tea hills and the backwaters.", "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1400&q=85", [
    ["Arrive in Fort Kochi", "Check into a character stay and take a sunset walk through old trading streets.", ["Arrival", "Heritage"]],
    ["Kochi through its kitchens", "Visit the market with a local cook, share lunch and end with a small cultural performance.", ["Food", "Culture"]],
    ["Kochi → Munnar", "Climb into the Western Ghats with spice and waterfall stops along the road.", ["Scenic drive", "Hills"]],
    ["Tea country", "Walk a working estate at first light and keep the afternoon for a picnic or spa.", ["Tea", "Nature"]],
    ["Munnar → Kumarakom", "Descend to the backwaters and board a private boat for lunch on the lake.", ["Backwaters", "Boat"]],
    ["A slow farewell", "Wake to birdsong, breakfast by the water and transfer to Kochi airport.", ["Breakfast", "Departure"]],
  ]),
  rajasthan: journey("rajasthan", "The Royal Route", "7 Nights / 8 Days", "Jaipur · Jodhpur · Udaipur", "₹48,000", "A richly textured route of forts, makers, blue lanes and beautifully hosted stays.", "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1400&q=85", [
    ["The pink city", "Arrive in Jaipur for a private transfer and an evening walk through the old bazaars.", ["Arrival", "Old city"]],
    ["Jaipur with an insider", "Enter Amber early, meet a block printer and share lunch in a restored haveli.", ["Heritage", "Craft"]],
    ["A day of design", "Explore hidden courtyards, contemporary studios and a chef-led Rajasthani dinner.", ["Design", "Food"]],
    ["Jaipur → Jodhpur", "Travel west with a countryside stop before sunset over the blue city.", ["Transfer", "Sunset"]],
    ["Mehrangarh and beyond", "See the fort with a private guide, then walk into lesser-known neighbourhoods below.", ["Fort", "Local guide"]],
    ["Jodhpur → Udaipur", "Pause at Ranakpur’s marble temple en route to the lakes.", ["Architecture", "Scenic drive"]],
    ["The city of lakes", "Take a quiet morning boat, visit an artist’s studio and dress for a final courtyard dinner.", ["Boat", "Art"]],
    ["Departure", "Breakfast overlooking the lake and a private airport transfer.", ["Breakfast", "Departure"]],
  ]),
  goa: journey("goa", "Goa, Unhurried", "4 Nights / 5 Days", "Panjim · South Goa", "₹29,500", "Old lanes, thoughtful tables and enough coast time to forget what day it is.", "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1400&q=85", [
    ["Arrive by the sea", "A private transfer to your design-led stay and a sunset table close to the water.", ["Arrival", "Coast"]],
    ["Old Goa and Panjim", "Walk Latin Quarter lanes with an architect, then settle into a long Goan lunch.", ["Heritage", "Food"]],
    ["The quieter coast", "Move south for a beach day shaped around swimming, reading and a hidden seafood table.", ["Beach", "Slow travel"]],
    ["A day without plans", "Keep the day open or choose a forest walk, pottery studio or private boat hour.", ["Free time", "Choice"]],
    ["One last swim", "Breakfast at leisure and a private airport transfer.", ["Breakfast", "Departure"]],
  ]),
  thailand: journey("thailand", "Thailand, in Full Colour", "6 Nights / 7 Days", "Bangkok · Chiang Mai · Krabi", "₹52,000", "A bright, generous route through market kitchens, northern craft and Andaman light.", "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1400&q=85", [
    ["Bangkok after dark", "Arrive to a riverside stay and ease into the city with a small neighbourhood food walk.", ["Arrival", "Street food"]],
    ["The old city by water", "Travel by longtail boat, enter a temple early and share lunch in a family kitchen.", ["Boat", "Culture"]],
    ["Bangkok → Chiang Mai", "Fly north and spend the evening among craft lanes and lantern-lit tables.", ["Flight", "Craft"]],
    ["Northern rhythms", "Meet a maker outside the city, cook over charcoal and visit a forest temple at dusk.", ["Local table", "Temple"]],
    ["Chiang Mai → Krabi", "Fly south and check into the easy rhythm of the Andaman coast.", ["Flight", "Beach"]],
    ["Limestone and blue water", "Take a private early boat to quieter coves, returning before the afternoon crowds.", ["Private boat", "Island"]],
    ["Departure", "A final beach breakfast and private transfer to the airport.", ["Breakfast", "Departure"]],
  ]),
  malaysia: journey("malaysia", "Many Malaysias", "6 Nights / 7 Days", "Kuala Lumpur · Penang · Langkawi", "₹49,500", "A layered journey through city architecture, Penang kitchens and the island edge.", "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1400&q=85", [
    ["Arrive in Kuala Lumpur", "Private transfer, a calm check-in and a first dinner in one of the city’s old neighbourhoods.", ["Arrival", "City"]],
    ["Architecture and appetite", "Explore modernist landmarks, market streets and the city’s many culinary histories.", ["Design", "Food"]],
    ["Kuala Lumpur → Penang", "Travel north by air and settle into a restored George Town shophouse.", ["Flight", "Heritage"]],
    ["George Town at table", "Walk with a food historian, meet a traditional maker and keep sunset for the waterfront.", ["Food", "Craft"]],
    ["Penang → Langkawi", "Cross to Langkawi and arrive at a quiet resort between rainforest and sea.", ["Transfer", "Island"]],
    ["Rainforest to coast", "Choose a mangrove boat, canopy walk or a completely unscheduled beach day.", ["Nature", "Choice"]],
    ["Departure", "Breakfast in the shade and transfer to Langkawi airport.", ["Breakfast", "Departure"]],
  ]),
  maldives: journey("maldives", "The Blue Hour", "5 Nights / 6 Days", "Malé · Private Island", "₹1,12,000", "A private island pause where the day follows the water, light and your own appetite.", "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1400&q=85", [
    ["Into the blue", "Arrive in Malé, meet your island host and transfer by seaplane or speedboat.", ["Arrival", "Island transfer"]],
    ["Your first full horizon", "Breakfast over the water, a guided house-reef swim and an afternoon with nowhere to be.", ["Reef", "Slow travel"]],
    ["Ocean morning", "Join a marine naturalist for a private snorkel before a long lunch back on the island.", ["Ocean", "Naturalist"]],
    ["A day entirely yours", "Choose a treatment, sandbank picnic or the rare luxury of leaving the day blank.", ["Wellness", "Choice"]],
    ["The last light", "Sail at sunset, then share a private dinner close to the water.", ["Sailing", "Private dinner"]],
    ["Return to Malé", "One final swim, breakfast and your island transfer for the flight home.", ["Breakfast", "Departure"]],
  ]),
  italy: journey("italy", "The Italian Table", "8 Nights / 9 Days", "Rome · Florence · Val d’Orcia", "₹1,34,000", "Cities, villages and long lunches connected by rail and a love of making things well.", "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1400&q=85", [
    ["Rome, gently", "Arrive to a private transfer and a neighbourhood aperitivo close to your hotel.", ["Arrival", "Rome"]],
    ["The layers of Rome", "Walk the city early with an art historian, then keep the afternoon for a long trattoria lunch.", ["History", "Food"]],
    ["A Roman kitchen", "Shop a local market and cook at a private home before an unscheduled evening.", ["Market", "Cooking"]],
    ["Rome → Florence", "Travel by fast rail and see Florence first from the quieter side of the Arno.", ["Rail", "Florence"]],
    ["Art before opening", "Enter a landmark collection early, meet an artisan and finish with a wine-bar dinner.", ["Art", "Craft"]],
    ["Into Val d’Orcia", "Collect a private car and move through cypress roads to your countryside stay.", ["Scenic drive", "Countryside"]],
    ["The Tuscan table", "Visit a family vineyard, share a cellar lunch and keep the afternoon for the pool.", ["Wine", "Local table"]],
    ["A village day", "Follow the market calendar through hill towns with time to wander without a guide.", ["Village", "Free time"]],
    ["Arrivederci", "Breakfast in the valley and private transfer to Florence or Rome airport.", ["Breakfast", "Departure"]],
  ]),
  singapore: journey("singapore", "A City in a Garden", "4 Nights / 5 Days", "Civic District · Tiong Bahru · Sentosa", "₹46,500", "A compact city break built around design, neighbourhood flavour and lush urban pauses.", "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1400&q=85", [
    ["Arrive in the garden city", "A smooth airport welcome, hotel check-in and a first evening on the bay.", ["Arrival", "City"]],
    ["Neighbourhood Singapore", "Walk Tiong Bahru with a local, share a hawker breakfast and visit independent design studios.", ["Food", "Design"]],
    ["Green architecture", "Explore the Botanic Gardens and the city’s future-facing architecture before a rooftop dinner.", ["Gardens", "Architecture"]],
    ["A day of choice", "Choose museums and shopping, a Sentosa beach pause or a family wildlife experience after dark.", ["Choice", "Family"]],
    ["One last kopi", "Breakfast and a direct private transfer to Changi.", ["Breakfast", "Departure"]],
  ]),
  "phu-quoc": journey("phu-quoc", "The Quiet Island", "5 Nights / 6 Days", "Duong Dong · Southern Coast", "₹44,000", "A softer Vietnamese escape of fishing villages, warm water and unhurried seafood tables.", "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1400&q=85", [
    ["Land at the island edge", "Private transfer to your coastal stay and a quiet first dinner near the water.", ["Arrival", "Coast"]],
    ["Market and fishing village", "Begin in Duong Dong market, then follow a local host to a village lunch by the sea.", ["Market", "Village"]],
    ["The southern water", "Take a private boat between small islands with time to swim away from the busy stops.", ["Boat", "Swimming"]],
    ["Forest morning", "Walk a shaded national-park trail and return for an open afternoon at the resort.", ["Forest", "Free time"]],
    ["The day left blank", "Choose a spa ritual, a cooking table or simply another long beach afternoon.", ["Wellness", "Choice"]],
    ["Departure", "Breakfast, a final sea view and private airport transfer.", ["Breakfast", "Departure"]],
  ]),
  turkey: journey("turkey", "Between Two Seas", "8 Nights / 9 Days", "Istanbul · Cappadocia · Bodrum", "₹1,08,000", "Ancient cities, generous tables and a bright Aegean finish connected with thoughtful private guiding.", "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1400&q=85", [
    ["Arrive on the Bosphorus", "A private welcome and a first dinner where Europe looks across to Asia.", ["Arrival", "Istanbul"]],
    ["The old city, early", "Enter landmark courtyards before the crowds and share lunch in a centuries-old neighbourhood.", ["History", "Local table"]],
    ["Markets and modern Istanbul", "Meet a culinary guide, cross by ferry and discover the city’s contemporary side.", ["Market", "Ferry"]],
    ["Istanbul → Cappadocia", "Fly inland and settle into a cave hotel before a valley sunset.", ["Flight", "Landscape"]],
    ["Cappadocia from above", "Take an optional dawn balloon, walk a quiet valley and lunch in a village home.", ["Balloon", "Walking"]],
    ["Cappadocia → Bodrum", "Fly west to the Aegean and move into the easy rhythm of the coast.", ["Flight", "Coast"]],
    ["Aegean by boat", "Spend the day on a private gulet, swimming in coves and lingering over lunch on deck.", ["Private boat", "Swimming"]],
    ["Bodrum, your way", "A free day for markets, a beach club or a quiet table in the old town.", ["Free time", "Choice"]],
    ["Departure", "Breakfast by the sea and private airport transfer.", ["Breakfast", "Departure"]],
  ]),
  australia: journey("australia", "The Open Horizon", "10 Nights / 11 Days", "Sydney · Uluru · Cairns", "₹1,78,000", "A wide-open route from harbour life to red earth and the living colour of the reef.", "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d0?auto=format&fit=crop&w=1400&q=85", [
    ["Sydney harbour welcome", "Private transfer, a harbour-side check-in and an easy first dinner close to the water.", ["Arrival", "Sydney"]],
    ["The harbour on foot", "Walk the city with an architect and take a private afternoon sail beneath the bridge.", ["Architecture", "Sailing"]],
    ["A coastal day", "Choose Bondi’s cliff walk, a hidden-beach picnic or a Blue Mountains day with a naturalist.", ["Coast", "Choice"]],
    ["Sydney at your pace", "Keep a day for galleries, neighbourhood tables and whatever you discovered yesterday.", ["Free time", "City"]],
    ["Sydney → Uluru", "Fly to the red centre and watch the rock change colour over a private sundowner.", ["Flight", "Outback"]],
    ["Stories of the land", "Walk with an Indigenous guide, rest through the heat and dine under the desert sky.", ["Culture", "Desert"]],
    ["Uluru → Cairns", "Fly north to tropical Queensland and settle between rainforest and reef.", ["Flight", "Tropics"]],
    ["The outer reef", "Join a small-vessel marine biologist for a full day on the Great Barrier Reef.", ["Reef", "Naturalist"]],
    ["Ancient rainforest", "Travel into the Daintree with a local guide and lunch beneath the canopy.", ["Rainforest", "Walking"]],
    ["A final open day", "Choose another water day, a spa pause or simply stay close to the pool.", ["Free time", "Choice"]],
    ["Departure", "Breakfast and private airport transfer from Cairns.", ["Breakfast", "Departure"]],
  ]),
};