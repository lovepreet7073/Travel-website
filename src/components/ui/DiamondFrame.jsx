import { cn } from "./cn";
import { PlaneIcon } from "./icons";

/**
 * DiamondFrame — the brand decoration: a rotated square built from layered
 * primary/accent/highlight stripes, with an optional cut-out photo on top
 * and a small plane + dashed flight path. Use only in panels (hero, about,
 * testimonial) — never in cards or plain sections. DESIGN.md section 7.
 */
export default function DiamondFrame({ image, alt = "", showPlane = true, className, children }) {
  return (
    <div className={cn("relative aspect-square", className)}>
      <span className="absolute inset-0 rotate-45 rounded-lg bg-highlight" />
      <span className="absolute inset-0 rotate-45 scale-75 rounded-lg bg-accent" />
      <span className="absolute inset-0 rotate-45 scale-50 rounded-lg bg-primary" />

      {showPlane && (
        <svg
          viewBox="0 0 200 200"
          className="pointer-events-none absolute inset-0 size-full text-white"
          aria-hidden="true"
        >
          <path
            d="M40 150 C 80 90, 120 90, 165 45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="6 6"
            strokeLinecap="round"
          />
          <PlaneIcon className="" x="150" y="30" width="24" height="24" />
        </svg>
      )}

      <div className="absolute inset-0 flex items-end justify-center">
        {image ? (
          <img src={image} alt={alt} className="relative z-10 max-h-full w-auto object-contain" />
        ) : (
          children
        )}
      </div>
    </div>
  );
}
