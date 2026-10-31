import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import SectionHeader from "../components/layout/SectionHeader";
import Card from "../components/ui/Card";
import Select from "../components/ui/Select";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Chip from "../components/ui/Chip";
import Reveal from "../components/ui/Reveal";
import { PlaneIcon } from "../components/ui/icons";
import { airports } from "../data/flights";

const CABIN_OPTIONS = [
  { value: "1-economy", label: "1 traveller · Economy" },
  { value: "2-economy", label: "2 travellers · Economy" },
  { value: "1-premium", label: "1 traveller · Premium Economy" },
  { value: "1-business", label: "1 traveller · Business" },
];

const POPULAR_ROUTES = [
  { from: "New York", to: "London" },
  { from: "London", to: "Rome" },
  { from: "Paris", to: "Tokyo" },
  { from: "Singapore", to: "New York" },
];

export default function FlightsSearch() {
  const navigate = useNavigate();
  const [from, setFrom] = useState(airports[0].city);
  const [to, setTo] = useState(airports[1].city);
  const [date, setDate] = useState("");
  const [cabin, setCabin] = useState(CABIN_OPTIONS[0].value);

  function goToResults(fromCity, toCity) {
    const params = new URLSearchParams({ from: fromCity, to: toCity });
    navigate(`/flights/results?${params.toString()}`);
  }

  function handleSubmit(event) {
    event.preventDefault();
    goToResults(from, to);
  }

  function handlePopularRoute(route) {
    setFrom(route.from);
    setTo(route.to);
    goToResults(route.from, route.to);
  }

  return (
    <PageContainer className="flex flex-col gap-16 py-8 sm:gap-24 sm:py-12">
      <Reveal className="flex flex-col gap-3">
        <span className="text-sm font-medium uppercase tracking-wide text-primary">Flights</span>
        <h1 className="text-h2 font-extrabold text-foreground sm:text-display">Find your next flight</h1>
        <p className="max-w-xl text-body text-body">
          Compare nonstop and connecting fares across Wandera's partner airlines, then pick the one that
          fits your trip.
        </p>
      </Reveal>

      <Reveal as={Card} delay={1} className="flex flex-col gap-6 p-6 shadow-float sm:p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Select label="From" value={from} onChange={(event) => setFrom(event.target.value)}>
              {airports.map((airport) => (
                <option key={airport.code} value={airport.city}>
                  {airport.city} ({airport.code})
                </option>
              ))}
            </Select>
            <Select label="To" value={to} onChange={(event) => setTo(event.target.value)}>
              {airports.map((airport) => (
                <option key={airport.code} value={airport.city}>
                  {airport.city} ({airport.code})
                </option>
              ))}
            </Select>
            <Input
              label="Departure date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
            <Select label="Travellers & cabin" value={cabin} onChange={(event) => setCabin(event.target.value)}>
              {CABIN_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Button type="submit" variant="primary">
              <PlaneIcon className="size-4" />
              Search flights
            </Button>
          </div>
        </form>
      </Reveal>

      <Reveal delay={2} className="flex flex-col gap-6">
        <SectionHeader
          className="mb-0"
          title="Popular routes"
          intro="Jump straight to results for the routes travelers search most."
        />
        <div className="flex flex-wrap gap-3">
          {POPULAR_ROUTES.map((route) => (
            <Chip key={`${route.from}-${route.to}`} onClick={() => handlePopularRoute(route)}>
              {route.from} → {route.to}
            </Chip>
          ))}
        </div>
      </Reveal>
    </PageContainer>
  );
}
