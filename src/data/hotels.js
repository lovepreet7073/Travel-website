/*
 * Image URLs use picsum.photos' stable numbered catalog (/id/<n>/w/h) — see
 * destinations.js for why (the /seed/ pattern's seed name has no bearing on
 * actual photo content). Each id below was downloaded and visually verified.
 */
export const hotels = [
  {
    slug: "the-colosseo-suites",
    name: "The Colosseo Suites",
    city: "Rome, Italy",
    image: "https://picsum.photos/id/1048/800/600",
    gallery: [
      "https://picsum.photos/id/1048/900/600",
      "https://picsum.photos/id/1067/900/600",
      "https://picsum.photos/id/1043/900/600",
    ],
    price: "$220",
    priceFrom: 220,
    rating: 4.7,
    guests: "2 Guests",
    dates: "Free cancellation",
    amenities: ["Free Wi-Fi", "Rooftop pool", "Breakfast included", "Airport shuttle"],
    description:
      "A quiet courtyard hotel three minutes from the Colosseum, with a rooftop terrace looking over the Forum.",
    rooms: [
      { name: "Classic Room", price: "$220", occupancy: "2 guests" },
      { name: "Deluxe Terrace Room", price: "$310", occupancy: "2 guests" },
      { name: "Family Suite", price: "$420", occupancy: "4 guests" },
    ],
  },
  {
    slug: "notting-hill-townhouse",
    name: "Notting Hill Townhouse",
    city: "London, UK",
    image: "https://picsum.photos/id/1018/800/600",
    gallery: [
      "https://picsum.photos/id/1018/900/600",
      "https://picsum.photos/id/1039/900/600",
      "https://picsum.photos/id/1067/900/600",
    ],
    price: "$185",
    priceFrom: 185,
    rating: 4.5,
    guests: "2 Guests",
    dates: "Free cancellation",
    amenities: ["Free Wi-Fi", "Garden courtyard", "Breakfast included"],
    description:
      "A converted Victorian townhouse steps from Portobello Market, with a private garden for slow mornings.",
    rooms: [
      { name: "Garden Room", price: "$185", occupancy: "2 guests" },
      { name: "Townhouse Suite", price: "$260", occupancy: "3 guests" },
    ],
  },
  {
    slug: "caldera-view-villas",
    name: "Caldera View Villas",
    city: "Santorini, Greece",
    image: "https://picsum.photos/id/1050/800/600",
    gallery: [
      "https://picsum.photos/id/1050/900/600",
      "https://picsum.photos/id/1049/900/600",
      "https://picsum.photos/id/1019/900/600",
    ],
    price: "$340",
    priceFrom: 340,
    rating: 4.9,
    guests: "2 Guests",
    dates: "Free cancellation",
    amenities: ["Private plunge pool", "Caldera view", "Breakfast included", "Airport shuttle"],
    description:
      "Whitewashed villas carved into the caldera cliff, each with a private plunge pool facing the sunset.",
    rooms: [
      { name: "Cave Villa", price: "$340", occupancy: "2 guests" },
      { name: "Honeymoon Villa with Pool", price: "$480", occupancy: "2 guests" },
    ],
  },
  {
    slug: "gion-machiya-inn",
    name: "Gion Machiya Inn",
    city: "Kyoto, Japan",
    image: "https://picsum.photos/id/1039/800/600",
    gallery: [
      "https://picsum.photos/id/1039/900/600",
      "https://picsum.photos/id/1043/900/600",
      "https://picsum.photos/id/1036/900/600",
    ],
    price: "$260",
    priceFrom: 260,
    rating: 4.8,
    guests: "2 Guests",
    dates: "Free cancellation",
    amenities: ["Traditional tatami rooms", "Private onsen bath", "Breakfast included"],
    description:
      "A restored wooden machiya in the Gion district, with a private onsen bath and a tea room facing the garden.",
    rooms: [
      { name: "Tatami Room", price: "$260", occupancy: "2 guests" },
      { name: "Garden Suite with Onsen", price: "$390", occupancy: "2 guests" },
    ],
  },
];

export function getHotelBySlug(slug) {
  return hotels.find((hotel) => hotel.slug === slug);
}
