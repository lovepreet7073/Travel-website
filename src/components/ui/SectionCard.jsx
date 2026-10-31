import Card from "./Card";

/**
 * SectionCard — a numbered section label (text-xs muted-foreground) above a
 * title (text-title/medium), wrapping its content in a Card. Not in
 * DESIGN.md section 7; extracted from the identical local copies in
 * Booking.jsx and FlightBooking.jsx (design-consistent cleanup) — built
 * for numbered multi-step booking flows.
 */
export default function SectionCard({ number, title, children }) {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-muted-foreground">{number}</span>
        <h3 className="text-title font-medium text-foreground">{title}</h3>
      </div>
      <Card>{children}</Card>
    </section>
  );
}
