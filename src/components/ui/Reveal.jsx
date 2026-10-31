import { useInView } from "../../lib/useInView";
import { cn } from "./cn";

// Standard (non-arbitrary) Tailwind delay utilities, used to stagger grid
// items by index without inline styles or bracket values.
const DELAY_CLASSES = ["delay-0", "delay-75", "delay-150", "delay-200", "delay-300", "delay-500"];

/**
 * Reveal — fades/slides content up into place the first time it scrolls
 * into view. Not a DESIGN.md token or component (motion isn't one of the
 * restricted categories in section 8 — colors, fonts, sizes, radii,
 * shadows); built only from plain opacity/transform/transition utilities,
 * no new tokens. `delay` (0-5) staggers siblings, e.g. a card grid.
 */
export default function Reveal({ children, className, delay = 0, as: Tag = "div", ...props }) {
  const [ref, inView] = useInView();
  const delayClass = DELAY_CLASSES[Math.min(Math.max(delay, 0), DELAY_CLASSES.length - 1)];

  return (
    <Tag
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        delayClass,
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
