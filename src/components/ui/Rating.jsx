import { cn } from "./cn";
import { StarIcon } from "./icons";

/**
 * Rating — 5 stars, 14px, rating color, empty stars outlined.
 * DESIGN.md section 7.
 */
export default function Rating({ value = 0, max = 5, className, ...props }) {
  return (
    <div
      role="img"
      aria-label={`${value} out of ${max} stars`}
      className={cn("inline-flex items-center gap-1 text-rating", className)}
      {...props}
    >
      {Array.from({ length: max }).map((_, i) => (
        <StarIcon key={i} filled={i < Math.round(value)} className="size-3.5" />
      ))}
    </div>
  );
}
