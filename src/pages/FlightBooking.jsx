import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import QuantityStepper from "../components/ui/QuantityStepper";
import SectionCard from "../components/ui/SectionCard";
import Reveal from "../components/ui/Reveal";
import { CheckIcon, ClockIcon, PlaneIcon, UsersIcon } from "../components/ui/icons";
import PageContainer from "../components/layout/PageContainer";
import { getFlightById } from "../data/flights";

function currency(value) {
  return `$${Math.round(value).toLocaleString()}`;
}

function buildBookingReference(flight, fullName) {
  const initials =
    fullName
      .trim()
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "WA";
  const stamp = Date.now().toString(36).slice(-4).toUpperCase();
  return `WA-${flight.id.toUpperCase()}-${initials}${stamp}`;
}

export default function FlightBooking() {
  const [searchParams] = useSearchParams();
  const flightId = searchParams.get("flightId");
  const flight = getFlightById(flightId);

  const [status, setStatus] = useState("form");
  const [submitting, setSubmitting] = useState(false);
  const [passengers, setPassengers] = useState(1);
  const [traveller, setTraveller] = useState({ fullName: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [bookingRef, setBookingRef] = useState("");

  if (!flight) {
    return (
      <PageContainer className="flex flex-col gap-8 py-8 sm:py-12">
        <Reveal as={Card} className="flex flex-col items-center gap-3 p-8 text-center sm:p-12">
          <PlaneIcon className="size-6 text-muted-foreground" />
          <p className="text-title font-medium text-foreground">We couldn't find that flight</p>
          <p className="max-w-sm text-sm text-body">
            The flight you're trying to book may have expired or the link is incorrect. Search again to find
            available flights.
          </p>
          <Button as={Link} to="/flights" className="mt-2">
            Search flights
          </Button>
        </Reveal>
      </PageContainer>
    );
  }

  const total = flight.priceFrom * passengers;

  function handleChange(field) {
    return (event) => {
      setTraveller((current) => ({ ...current, [field]: event.target.value }));
      setErrors((current) => ({ ...current, [field]: undefined }));
    };
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = {};
    if (!traveller.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!traveller.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!traveller.email.includes("@")) {
      nextErrors.email = "Enter a valid email address.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setTimeout(() => {
      setBookingRef(buildBookingReference(flight, traveller.fullName));
      setSubmitting(false);
      setStatus("confirmed");
    }, 700);
  }

  if (status === "confirmed") {
    return (
      <PageContainer className="flex flex-col gap-8 py-8 sm:py-12">
        <Reveal as={Card} className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4 p-8 text-center sm:p-12">
          <span className="inline-flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <CheckIcon className="size-6" />
          </span>
          <div className="flex flex-col gap-1">
            <p className="text-h3 font-bold text-foreground">Booking confirmed</p>
            <p className="text-sm text-body">
              We've sent the itinerary to {traveller.email}. Have a great trip, {traveller.fullName.split(" ")[0]}.
            </p>
          </div>

          <Badge variant="primary" className="mt-2">
            {bookingRef}
          </Badge>

          <div className="mt-4 flex w-full flex-col gap-4 rounded-md border border-border p-4 text-left">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-title font-medium text-foreground">
                  {flight.fromCode} → {flight.toCode}
                </span>
                <span className="text-xs text-muted-foreground">
                  {flight.from} to {flight.to} · {flight.airline}
                </span>
              </div>
              <Badge variant="neutral">{flight.cabin}</Badge>
            </div>

            <div className="h-px bg-border" />

            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-body">Departs · arrives</span>
                <span className="font-medium text-foreground">
                  {flight.departTime} · {flight.arriveTime}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-body">Duration</span>
                <span className="font-medium text-foreground">{flight.duration}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-body">Passengers</span>
                <span className="font-medium text-foreground">{passengers}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-body">Lead traveller</span>
                <span className="font-medium text-foreground">{traveller.fullName}</span>
              </div>
            </div>

            <div className="h-px bg-border" />

            <div className="flex items-center justify-between">
              <span className="text-title font-medium text-foreground">Total paid</span>
              <span className="text-title font-bold text-foreground">{currency(total)}</span>
            </div>
          </div>

          <div className="mt-4 flex w-full flex-col gap-4 sm:flex-row sm:justify-center">
            <Button as={Link} to="/bookings" className="sm:w-auto">
              View my bookings
            </Button>
            <Button as={Link} to="/" variant="outline" className="sm:w-auto">
              Back to home
            </Button>
          </div>
        </Reveal>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="flex flex-col gap-8 py-8 sm:py-12">
      <nav className="text-xs text-muted-foreground">
        <Link to="/flights" className="text-primary">
          Flights
        </Link>{" "}
        / <span className="text-foreground">Review &amp; pay</span>
      </nav>

      <Reveal className="flex flex-col gap-3">
        <h1 className="text-h2 font-extrabold text-foreground">Confirm your flight</h1>
        <p className="text-sm text-body">
          {flight.from} ({flight.fromCode}) to {flight.to} ({flight.toCode})
        </p>
      </Reveal>

      <form onSubmit={handleSubmit} className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-10">
        <div className="flex flex-1 flex-col gap-12">
          <Reveal delay={0}>
            <SectionCard number="01" title="Flight details">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-foreground">{flight.airline}</span>
                  <Badge variant="neutral">{flight.cabin}</Badge>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col">
                    <span className="text-title font-medium text-foreground">{flight.departTime}</span>
                    <span className="text-xs text-muted-foreground">
                      {flight.fromCode} · {flight.from}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col items-center gap-1 px-4">
                    <span className="flex items-center gap-2 text-xs text-muted-foreground">
                      <ClockIcon className="size-3.5" />
                      {flight.duration}
                    </span>
                    <div className="flex w-full items-center gap-2 text-primary">
                      <span className="h-px flex-1 bg-border" />
                      <PlaneIcon className="size-4" />
                      <span className="h-px flex-1 bg-border" />
                    </div>
                    <span className="text-xs text-muted-foreground">{flight.stops}</span>
                  </div>

                  <div className="flex flex-col sm:text-right">
                    <span className="text-title font-medium text-foreground">{flight.arriveTime}</span>
                    <span className="text-xs text-muted-foreground">
                      {flight.toCode} · {flight.to}
                    </span>
                  </div>
                </div>

                <div className="h-px bg-border" />

                <div className="flex items-center justify-between">
                  <span className="text-sm text-body">Price per passenger</span>
                  <span className="text-title font-bold text-foreground">{flight.price}</span>
                </div>
              </div>
            </SectionCard>
          </Reveal>

          <Reveal delay={1}>
            <SectionCard number="02" title="Passengers">
              <QuantityStepper
                label="Travellers"
                description="Age 12+, including the lead traveller"
                value={passengers}
                min={1}
                max={9}
                onDecrement={() => setPassengers((n) => Math.max(1, n - 1))}
                onIncrement={() => setPassengers((n) => Math.min(9, n + 1))}
              />
            </SectionCard>
          </Reveal>

          <Reveal delay={2}>
            <SectionCard number="03" title="Passenger details">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Full name"
                  placeholder="As on passport"
                  value={traveller.fullName}
                  onChange={handleChange("fullName")}
                  error={errors.fullName}
                  className="sm:col-span-2"
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  value={traveller.email}
                  onChange={handleChange("email")}
                  error={errors.email}
                />
                <Input
                  label="Phone"
                  type="tel"
                  placeholder="+1 555 000 0000"
                  value={traveller.phone}
                  onChange={handleChange("phone")}
                />
              </div>
            </SectionCard>
          </Reveal>
        </div>

        <Reveal as="aside" delay={3} className="w-full shrink-0 lg:sticky lg:top-24 lg:w-96">
          <Card className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-title font-medium text-foreground">
                {flight.fromCode} → {flight.toCode}
              </p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <UsersIcon className="size-3.5" />
                {passengers} passenger{passengers > 1 ? "s" : ""}
              </p>
            </div>

            <div className="h-px bg-border" />

            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-body">
                  {flight.price} × {passengers}
                </span>
                <span className="font-medium text-foreground">{currency(total)}</span>
              </div>
            </div>

            <div className="h-px bg-border" />

            <div className="flex items-center justify-between">
              <span className="text-title font-medium text-foreground">Total</span>
              <span className="text-title font-bold text-foreground">{currency(total)}</span>
            </div>

            <Button type="submit" loading={submitting} className="w-full">
              Confirm &amp; pay
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Free date change up to 24 hours after booking
            </p>
          </Card>
        </Reveal>
      </form>
    </PageContainer>
  );
}
