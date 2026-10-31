// See destinations.js: picsum's numbered /id/ catalog, visually verified.
export const bookings = [
  {
    id: "bk-1042",
    type: "trip",
    title: "Trip to Santorini",
    image: "https://picsum.photos/id/1050/400/300",
    status: "ongoing",
    progress: 40,
    dates: "14–29 June",
    price: "$3,850",
    peopleGoing: 24,
  },
  {
    id: "bk-1039",
    type: "hotel",
    title: "The Colosseo Suites",
    image: "https://picsum.photos/id/1048/400/300",
    status: "upcoming",
    progress: 0,
    dates: "3–8 August",
    price: "$1,100",
    peopleGoing: 2,
  },
  {
    id: "bk-1021",
    type: "flight",
    title: "JFK → LHR · Wandera Air",
    image: "https://picsum.photos/id/1019/400/300",
    status: "completed",
    progress: 100,
    dates: "12 March",
    price: "$482",
    peopleGoing: 1,
  },
  {
    id: "bk-1015",
    type: "trip",
    title: "Full Europe Tour",
    image: "https://picsum.photos/id/1015/400/300",
    status: "cancelled",
    progress: 0,
    dates: "2–30 January",
    price: "$15,000",
    peopleGoing: 2,
  },
];

export function getBookingById(id) {
  return bookings.find((booking) => booking.id === id);
}
