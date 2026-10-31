export const airports = [
  { code: "NYC", city: "New York" },
  { code: "LON", city: "London" },
  { code: "ROM", city: "Rome" },
  { code: "PAR", city: "Paris" },
  { code: "TYO", city: "Tokyo" },
  { code: "SIN", city: "Singapore" },
];

export const flights = [
  {
    id: "wa-101",
    airline: "Wandera Air",
    from: "New York",
    fromCode: "JFK",
    to: "London",
    toCode: "LHR",
    departTime: "08:20",
    arriveTime: "20:05",
    duration: "7h 45m",
    stops: "Nonstop",
    price: "$482",
    priceFrom: 482,
    cabin: "Economy",
  },
  {
    id: "wa-204",
    airline: "Skyline Air",
    from: "New York",
    fromCode: "JFK",
    to: "London",
    toCode: "LHR",
    departTime: "13:10",
    arriveTime: "02:55",
    duration: "8h 45m",
    stops: "1 stop · Dublin",
    price: "$356",
    priceFrom: 356,
    cabin: "Economy",
  },
  {
    id: "wa-317",
    airline: "Northwind",
    from: "New York",
    fromCode: "JFK",
    to: "London",
    toCode: "LHR",
    departTime: "22:40",
    arriveTime: "10:15",
    duration: "6h 35m",
    stops: "Nonstop",
    price: "$610",
    priceFrom: 610,
    cabin: "Premium Economy",
  },
  {
    id: "wa-420",
    airline: "Wandera Air",
    from: "New York",
    fromCode: "JFK",
    to: "London",
    toCode: "LHR",
    departTime: "06:05",
    arriveTime: "19:50",
    duration: "8h 45m",
    stops: "1 stop · Reykjavík",
    price: "$298",
    priceFrom: 298,
    cabin: "Economy",
  },
];

export function searchFlights({ from, to } = {}) {
  return flights.filter(
    (flight) =>
      (!from || flight.from.toLowerCase().includes(from.toLowerCase())) &&
      (!to || flight.to.toLowerCase().includes(to.toLowerCase()))
  );
}

export function getFlightById(id) {
  return flights.find((flight) => flight.id === id);
}
