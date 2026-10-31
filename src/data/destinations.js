/*
 * Image URLs use picsum.photos' stable numbered catalog (/id/<n>/w/h),
 * not the /seed/<name>/ pattern — seeds only make the random pick
 * deterministic, the name has no bearing on actual photo content (this
 * bit us: a "wandera-rome" seed once returned an unrelated product photo).
 * Each numbered id below was downloaded and visually verified to actually
 * be a travel/landscape/city photo before use.
 */
export const destinations = [
  {
    slug: "rome-italy",
    name: "Rome, Italy",
    country: "Italy",
    city: "Rome, Italy",
    image: "https://picsum.photos/id/1048/800/600",
    gallery: [
      "https://picsum.photos/id/1048/900/600",
      "https://picsum.photos/id/1067/900/600",
      "https://picsum.photos/id/1043/900/600",
    ],
    price: "$5,420",
    priceFrom: 5420,
    rating: 4.8,
    duration: "10 Days Trip",
    guests: "2 Guests",
    description:
      "Wander through two thousand years of history, from the Colosseum to hidden trattorias tucked into Trastevere's cobbled lanes.",
    highlights: ["Colosseum & Roman Forum guided tour", "Vatican Museums & Sistine Chapel", "Evening food walk in Trastevere"],
  },
  {
    slug: "london-uk",
    name: "London, UK",
    country: "United Kingdom",
    city: "London, UK",
    image: "https://picsum.photos/id/1018/800/600",
    gallery: [
      "https://picsum.photos/id/1018/900/600",
      "https://picsum.photos/id/1039/900/600",
      "https://picsum.photos/id/1067/900/600",
    ],
    price: "$4,200",
    priceFrom: 4200,
    rating: 4.6,
    duration: "12 Days Trip",
    guests: "2 Guests",
    description:
      "From Big Ben to the West End, this itinerary balances iconic landmarks with quiet mornings in Notting Hill's market streets.",
    highlights: ["Westminster & Big Ben walking tour", "West End evening show", "Notting Hill markets"],
  },
  {
    slug: "full-europe",
    name: "Full Europe",
    country: "Multi-country",
    city: "Paris → Rome → Prague",
    image: "https://picsum.photos/id/1015/800/600",
    gallery: [
      "https://picsum.photos/id/1015/900/600",
      "https://picsum.photos/id/1018/900/600",
      "https://picsum.photos/id/1067/900/600",
    ],
    price: "$15,000",
    priceFrom: 15000,
    rating: 4.9,
    duration: "28 Days Trip",
    guests: "2 Guests",
    description:
      "A grand tour across seven cities and four countries, built for travelers who want the whole continent in one trip.",
    highlights: ["Seven cities, four countries", "First-class rail transfers", "Local guide in every city"],
  },
  {
    slug: "santorini-greece",
    name: "Santorini, Greece",
    country: "Greece",
    city: "Santorini, Greece",
    image: "https://picsum.photos/id/1050/800/600",
    gallery: [
      "https://picsum.photos/id/1050/900/600",
      "https://picsum.photos/id/1049/900/600",
      "https://picsum.photos/id/1019/900/600",
    ],
    price: "$3,850",
    priceFrom: 3850,
    rating: 4.7,
    duration: "7 Days Trip",
    guests: "2 Guests",
    description:
      "Whitewashed villages, caldera sunsets and slow dinners by the water — Santorini at its own pace.",
    highlights: ["Caldera sunset cruise", "Wine tasting in Oia", "Private beach day in Perissa"],
  },
  {
    slug: "kyoto-japan",
    name: "Kyoto, Japan",
    country: "Japan",
    city: "Kyoto, Japan",
    image: "https://picsum.photos/id/1039/800/600",
    gallery: [
      "https://picsum.photos/id/1039/900/600",
      "https://picsum.photos/id/1043/900/600",
      "https://picsum.photos/id/1036/900/600",
    ],
    price: "$6,100",
    priceFrom: 6100,
    rating: 4.9,
    duration: "9 Days Trip",
    guests: "2 Guests",
    description:
      "Temples at dawn, gardens at dusk, and a bullet train ride in between — traditional Japan without the rush.",
    highlights: ["Fushimi Inari at sunrise", "Tea ceremony in Gion", "Day trip to Nara"],
  },
  {
    slug: "bali-indonesia",
    name: "Bali, Indonesia",
    country: "Indonesia",
    city: "Bali, Indonesia",
    image: "https://picsum.photos/id/1049/800/600",
    gallery: [
      "https://picsum.photos/id/1049/900/600",
      "https://picsum.photos/id/1050/900/600",
      "https://picsum.photos/id/1019/900/600",
    ],
    price: "$2,980",
    priceFrom: 2980,
    rating: 4.5,
    duration: "8 Days Trip",
    guests: "2 Guests",
    description:
      "Rice terraces, cliffside temples and unhurried beach afternoons across Ubud, Canggu and Uluwatu.",
    highlights: ["Tegallalang rice terrace trek", "Uluwatu sunset temple", "Surf lesson in Canggu"],
  },
];

export function getDestinationBySlug(slug) {
  return destinations.find((destination) => destination.slug === slug);
}
