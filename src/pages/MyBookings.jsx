import { useMemo, useState } from "react";
import PageContainer from "../components/layout/PageContainer";
import SectionHeader from "../components/layout/SectionHeader";
import Badge from "../components/ui/Badge";
import Card from "../components/ui/Card";
import ProgressBar from "../components/ui/ProgressBar";
import Tabs from "../components/ui/Tabs";
import Reveal from "../components/ui/Reveal";
import { CalendarIcon, ClockIcon, UsersIcon } from "../components/ui/icons";
import { bookings } from "../data/bookings";
import { useMockFetch } from "../lib/useMockFetch";

const STATUS_TABS = [
  { label: "All", value: "all" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Ongoing", value: "ongoing" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

const STATUS_META = {
  upcoming: { label: "Upcoming", variant: "neutral" },
  ongoing: { label: "Ongoing", variant: "primary" },
  completed: { label: "Completed", variant: "neutral" },
  cancelled: { label: "Cancelled", variant: "danger" },
};

const TYPE_LABELS = {
  trip: "Trip",
  hotel: "Hotel",
  flight: "Flight",
};

function BookingsSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
          <div className="aspect-4-3 w-full shrink-0 animate-pulse rounded-md bg-panel sm:w-48" />
          <div className="flex flex-1 flex-col gap-3">
            <div className="h-4 w-1/3 animate-pulse rounded-full bg-panel" />
            <div className="h-3 w-1/2 animate-pulse rounded-full bg-panel" />
            <div className="h-3 w-1/4 animate-pulse rounded-full bg-panel" />
          </div>
        </Card>
      ))}
    </div>
  );
}

export default function MyBookings() {
  const [statusFilter, setStatusFilter] = useState("all");
  const result = useMockFetch(() => bookings, { delay: 500 });

  const filtered = useMemo(() => {
    if (!result.data) return [];
    if (statusFilter === "all") return result.data;
    return result.data.filter((booking) => booking.status === statusFilter);
  }, [result.data, statusFilter]);

  const activeTabLabel = STATUS_TABS.find((tab) => tab.value === statusFilter)?.label ?? "bookings";

  return (
    <PageContainer className="flex flex-col gap-8 py-8 sm:py-12">
      <Reveal>
        <SectionHeader
          className="mb-0"
          title="My Bookings"
          intro="Every trip, stay and flight you've booked with Vendra, all in one place."
        />
      </Reveal>

      <Tabs items={STATUS_TABS} value={statusFilter} onChange={setStatusFilter} />

      {result.status === "loading" && <BookingsSkeleton />}

      {result.status === "error" && (
        <Card className="flex flex-col items-center gap-2 p-8 text-center">
          <p className="text-sm font-medium text-foreground">Couldn't load your bookings</p>
          <p className="text-sm text-body">{result.error.message}</p>
        </Card>
      )}

      {result.status === "success" && filtered.length === 0 && (
        <Card className="flex flex-col items-center gap-2 p-8 text-center">
          <ClockIcon className="size-6 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">
            No {activeTabLabel.toLowerCase()} bookings
          </p>
          <p className="text-sm text-body">Bookings in this category will show up here once you have some.</p>
        </Card>
      )}

      {result.status === "success" && filtered.length > 0 && (
        <div className="flex flex-col gap-4">
          {filtered.map((booking, index) => {
            const meta = STATUS_META[booking.status] ?? { label: booking.status, variant: "neutral" };
            return (
              <Reveal key={booking.id} as={Card} delay={index} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                <div className="aspect-4-3 w-full shrink-0 overflow-hidden rounded-md sm:w-48">
                  <img src={booking.image} alt="" className="size-full object-cover" />
                </div>

                <div className="flex flex-1 flex-col gap-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-medium text-muted-foreground">
                        {TYPE_LABELS[booking.type] ?? booking.type}
                      </span>
                      <h3 className="text-title font-medium text-foreground">{booking.title}</h3>
                    </div>
                    <Badge variant={meta.variant}>{meta.label}</Badge>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <CalendarIcon />
                        {booking.dates}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <UsersIcon />
                        {booking.peopleGoing} going
                      </span>
                    </div>
                    <span className="text-title font-bold text-foreground">{booking.price}</span>
                  </div>

                  {booking.status === "ongoing" && (
                    <ProgressBar value={booking.progress} label={`${booking.progress}% complete`} className="max-w-xs" />
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      )}
    </PageContainer>
  );
}
