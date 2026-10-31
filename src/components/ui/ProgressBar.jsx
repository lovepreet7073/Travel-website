import { cn } from "./cn";

/**
 * ProgressBar — track (border token) + filled primary portion, rounded-full.
 * Not in DESIGN.md section 7; added for trip-status displays (Home's
 * "ongoing trip" card, My Bookings). Uses only existing tokens.
 *
 * The fill width is expressed as a Tailwind fraction-width utility (twelfths)
 * rather than an inline style or arbitrary value, so it stays compliant with
 * the no-inline-styles / no-arbitrary-values rules — it's rounded to the
 * nearest ~8%, which is precise enough for a status indicator.
 */
const WIDTH_STEPS = [
  "w-0", "w-1/12", "w-1/6", "w-1/4", "w-1/3", "w-5/12",
  "w-1/2", "w-7/12", "w-2/3", "w-3/4", "w-5/6", "w-11/12", "w-full",
];

function widthClassFor(value) {
  const clamped = Math.min(100, Math.max(0, value));
  const step = Math.round((clamped / 100) * 12);
  return WIDTH_STEPS[step];
}

export default function ProgressBar({ value = 0, label, className }) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label && <span className="text-xs text-muted-foreground">{label}</span>}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-1 w-full overflow-hidden rounded-full bg-border"
      >
        <div className={cn("h-full rounded-full bg-primary transition-all", widthClassFor(clamped))} />
      </div>
    </div>
  );
}
