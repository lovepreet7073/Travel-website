import { useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import QuantityStepper from "../components/ui/QuantityStepper";
import SectionCard from "../components/ui/SectionCard";
import Reveal from "../components/ui/Reveal";
import PageContainer from "../components/layout/PageContainer";
import { getDestinationBySlug } from "../data/destinations";
import { getHotelBySlug } from "../data/hotels";

const DEPARTURE_MONTHS = [
  { month: "MAY", multiplier: 0.94, status: "left", left: 6 },
  { month: "JUN", multiplier: 1, status: "available" },
  { month: "JUL", multiplier: 1.06, status: "soldout" },
  { month: "SEP", multiplier: 1.13, status: "left", left: 2 },
];

const ROOM_TIERS = [
  { id: "standard", name: "Standard room", description: "Comfortable double, city or garden view", deltaRatio: 0 },
  { id: "deluxe", name: "Deluxe room", description: "More space, upgraded views and amenities", deltaRatio: 0.18 },
  { id: "suite", name: "Suite", description: "Separate lounge and premium location", deltaRatio: 0.45 },
];

const addonList = [
  {
    id: "transfer",
    name: "Private airport transfer",
    description: "Airport to hotel, both ways",
    price: 180,
    perPerson: false,
  },
  {
    id: "insurance",
    name: "Comprehensive travel insurance",
    description: "Medical, cancellation and baggage",
    price: 95,
    perPerson: true,
  },
  {
    id: "tour",
    name: "Guided city tour",
    description: "Half-day tour with a local guide",
    price: 140,
    perPerson: true,
  },
];

function currency(value) {
  return `$${Math.round(value).toLocaleString()}`;
}

function buildDeparture(month, index, priceFrom) {
  const id = `${month.month.toLowerCase()}-${index}`;
  return {
    id,
    month: `${month.month} 2027`,
    range: `${8 + index * 4}–${14 + index * 4}`,
    price: Math.round((priceFrom / 6) * month.multiplier),
    status: month.status,
    left: month.left,
  };
}

function buildRoom(tier, priceFrom) {
  const delta = Math.round((priceFrom / 6) * tier.deltaRatio);
  return {
    ...tier,
    delta,
    priceLabel: delta === 0 ? "Included" : `+${currency(delta)} per person`,
  };
}

function cardButtonClass(isSelected, isDisabled, extra = "") {
  return [
    "flex flex-col gap-2 rounded-md border p-4 text-left transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
    isDisabled
      ? "cursor-not-allowed border-border opacity-50"
      : isSelected
        ? "border-primary ring-2 ring-primary ring-offset-2"
        : "border-border hover:bg-panel",
    extra,
  ]
    .filter(Boolean)
    .join(" ");
}

export default function Booking() {
  const { slug } = useParams();
  const destination = getDestinationBySlug(slug);
  const hotel = destination ? null : getHotelBySlug(slug);
  const entity = destination ?? hotel;
  const kind = destination ? "trip" : hotel ? "hotel" : null;

  const departures = useMemo(
    () => (entity ? DEPARTURE_MONTHS.map((m, i) => buildDeparture(m, i, entity.priceFrom)) : []),
    [entity]
  );
  const rooms = useMemo(
    () => (entity ? ROOM_TIERS.map((tier) => buildRoom(tier, entity.priceFrom)) : []),
    [entity]
  );

  const [departureId, setDepartureId] = useState(departures[1]?.id);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [roomId, setRoomId] = useState(rooms[1]?.id);
  const [addons, setAddons] = useState({ transfer: true, insurance: false, tour: false });
  const [lead, setLead] = useState({ fullName: "", email: "", phone: "" });

  const departure = departures.find((d) => d.id === departureId) ?? departures[0];
  const room = rooms.find((r) => r.id === roomId) ?? rooms[0];
  const travelers = adults + children;

  const breakdown = useMemo(() => {
    if (!departure || !room) return { base: 0, roomCost: 0, total: 0 };
    const base = departure.price * adults + departure.price * 0.8 * children;
    const roomCost = room.delta * travelers;
    const addonCost = addonList.reduce((sum, a) => {
      if (!addons[a.id]) return sum;
      return sum + (a.perPerson ? a.price * travelers : a.price);
    }, 0);
    return {
      base: Math.round(base),
      roomCost,
      total: Math.round(base) + roomCost + addonCost,
    };
  }, [departure, adults, children, room, travelers, addons]);

  const deposit = Math.round((breakdown.total * 0.2) / 10) * 10;

  if (!entity) return <Navigate to="/" replace />;

  return (
    <PageContainer className="flex flex-col gap-8 py-8">
      <nav className="text-xs text-muted-foreground">
        <span className="text-primary">{kind === "hotel" ? "Hotels" : "Destinations"}</span> /{" "}
        <span className="text-primary">{kind === "hotel" ? entity.city : entity.country}</span>{" "}
        / <span className="text-foreground">{entity.name}</span>
      </nav>

      <Reveal className="flex flex-col gap-3">
        <h1 className="text-h2 font-extrabold text-foreground">{entity.name}</h1>
        <p className="text-sm text-body">
          {kind === "hotel" ? entity.dates : `${entity.duration} · Small group, max 12`}
          <br />
          {entity.city}
        </p>
      </Reveal>

      <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-10">
        <div className="flex flex-1 flex-col gap-12">
          <Reveal delay={0}>
            <SectionCard number="01" title={kind === "hotel" ? "Choose your stay dates" : "Choose a departure"}>
              <div className="grid gap-4 sm:grid-cols-2">
                {departures.map((d) => {
                  const isSoldOut = d.status === "soldout";
                  const isSelected = d.id === departureId;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      disabled={isSoldOut}
                      onClick={() => setDepartureId(d.id)}
                      aria-pressed={isSelected}
                      className={cardButtonClass(isSelected, isSoldOut)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground">{d.month}</span>
                        {isSoldOut ? (
                          <Badge variant="danger">Sold out</Badge>
                        ) : (
                          <Badge variant="neutral">{d.status === "left" ? `${d.left} left` : "Available"}</Badge>
                        )}
                      </div>
                      <span className="text-title font-medium text-foreground">{d.range}</span>
                      <span className="text-sm text-body">from {currency(d.price)}</span>
                    </button>
                  );
                })}
              </div>
            </SectionCard>
          </Reveal>

          <Reveal delay={1}>
            <SectionCard number="02" title="Travellers">
              <div className="flex flex-col gap-6">
                <QuantityStepper
                  label="Adults"
                  description="Age 12+"
                  value={adults}
                  min={1}
                  onDecrement={() => setAdults((n) => Math.max(1, n - 1))}
                  onIncrement={() => setAdults((n) => n + 1)}
                />
                <div className="h-px bg-border" />
                <QuantityStepper
                  label="Children"
                  description="Age 2–11 · 20% off"
                  value={children}
                  onDecrement={() => setChildren((n) => Math.max(0, n - 1))}
                  onIncrement={() => setChildren((n) => n + 1)}
                />
              </div>
            </SectionCard>
          </Reveal>

          <Reveal delay={2}>
            <SectionCard number="03" title="Accommodation">
              <div className="grid gap-4 sm:grid-cols-2">
                {rooms.map((r, i) => {
                  const isSelected = r.id === roomId;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRoomId(r.id)}
                      aria-pressed={isSelected}
                      className={cardButtonClass(isSelected, false, "gap-0 overflow-hidden p-0")}
                    >
                      <div className="aspect-4-3 w-full overflow-hidden rounded-md">
                        <img
                          src={entity.gallery[i % entity.gallery.length]}
                          alt=""
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col gap-1 p-4">
                        <span className="text-sm font-medium text-foreground">{r.name}</span>
                        <span className="text-xs text-muted-foreground">{r.description}</span>
                        <span className="mt-1 text-sm font-medium text-primary">{r.priceLabel}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </SectionCard>
          </Reveal>

          <Reveal delay={3}>
            <SectionCard number="04" title="Add to your trip">
              <div className="flex flex-col gap-4">
                {addonList.map((a, i) => (
                  <label key={a.id}>
                    {i > 0 && <div className="mb-4 h-px bg-border" />}
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={addons[a.id]}
                        onChange={(e) => setAddons((prev) => ({ ...prev, [a.id]: e.target.checked }))}
                        className="size-5 shrink-0 rounded-sm border-border accent-primary"
                      />
                      <div className="flex flex-1 flex-col gap-1">
                        <span className="text-sm font-medium text-foreground">{a.name}</span>
                        <span className="text-xs text-muted-foreground">{a.description}</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {currency(a.price)}
                        {a.perPerson ? " pp" : ""}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </SectionCard>
          </Reveal>

          <Reveal delay={4}>
            <SectionCard number="05" title="Lead traveller">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Full name"
                  placeholder="As on passport"
                  value={lead.fullName}
                  onChange={(e) => setLead((f) => ({ ...f, fullName: e.target.value }))}
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  value={lead.email}
                  onChange={(e) => setLead((f) => ({ ...f, email: e.target.value }))}
                />
                <Input
                  label="Phone"
                  type="tel"
                  placeholder="+1 555 000 0000"
                  value={lead.phone}
                  onChange={(e) => setLead((f) => ({ ...f, phone: e.target.value }))}
                  className="sm:col-span-2"
                />
              </div>
            </SectionCard>
          </Reveal>
        </div>

        <Reveal as="aside" delay={2} className="w-full shrink-0 lg:sticky lg:top-24 lg:w-96">
          <Card className="flex flex-col gap-4 p-0 shadow-float">
            <div className="aspect-4-3 w-full overflow-hidden rounded-t-md">
              <img src={entity.image} alt={entity.name} className="size-full object-cover" />
            </div>

            <div className="flex flex-col gap-4 px-4 pb-4">
              <div>
                <p className="text-title font-medium text-foreground">{entity.name}</p>
                {departure && (
                  <p className="text-xs text-muted-foreground">
                    {departure.range} {departure.month}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-body">
                    {adults} adult{adults > 1 ? "s" : ""}
                    {children > 0 ? ` + ${children} child${children > 1 ? "ren" : ""}` : ""}
                  </span>
                  <span className="font-medium text-foreground">{currency(breakdown.base)}</span>
                </div>
                {room && room.delta > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-body">{room.name}</span>
                    <span className="font-medium text-foreground">+{currency(breakdown.roomCost)}</span>
                  </div>
                )}
                {addonList
                  .filter((a) => addons[a.id])
                  .map((a) => (
                    <div key={a.id} className="flex items-center justify-between">
                      <span className="text-body">{a.name}</span>
                      <span className="font-medium text-foreground">
                        +{currency(a.perPerson ? a.price * travelers : a.price)}
                      </span>
                    </div>
                  ))}
              </div>

              <div className="h-px bg-border" />

              <div className="flex items-center justify-between">
                <span className="text-title font-medium text-foreground">Total</span>
                <span className="text-title font-bold text-foreground">{currency(breakdown.total)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {currency(deposit)} deposit today · Balance due 60 days prior
              </p>

              <Button className="w-full">Add lead traveller to continue</Button>

              <p className="text-center text-xs text-muted-foreground">
                Free cancellation up to 60 days before departure
              </p>
            </div>
          </Card>
        </Reveal>
      </div>
    </PageContainer>
  );
}
