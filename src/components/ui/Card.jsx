import { forwardRef } from "react";
import { cn } from "./cn";

/**
 * Card — base surface used by DestinationCard, StatCard and other
 * white/radius-md/shadow-card blocks. DESIGN.md section 5 and 7.
 *
 * A subtle border-border edge gives definition against white page
 * backgrounds. `interactive` cards lift on hover (shadow-card →
 * shadow-float, plus a small upward translate — a literal reading of
 * DESIGN.md section 7's "Cards lift" hover state). Active state is
 * untouched (DESIGN.md: "no movement" on active, for all components).
 *
 * `block` is explicit because `as` can render Card as an anchor (e.g.
 * `as={Link}` for a clickable DestinationCard) — an <a> defaults to
 * `display: inline`, which breaks its box model as a CSS Grid item
 * (stretch-aligned, content taller than the row): the border/background
 * then follow broken inline line-boxes instead of one rectangle, showing
 * as stray corner fragments above/below the card.
 */
const Card = forwardRef(function Card(
  { as: Tag = "div", interactive = false, className, children, ...props },
  ref
) {
  return (
    <Tag
      ref={ref}
      className={cn(
        "block rounded-md border border-border bg-surface p-4 shadow-card transition-all duration-200",
        interactive &&
          "text-left hover:-translate-y-1 hover:shadow-float focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
});

export default Card;
