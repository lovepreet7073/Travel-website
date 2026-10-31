import { cn } from "../ui/cn";

/**
 * SectionHeader — optional small eyebrow label, H2, and intro paragraph on
 * the left, with optional actions (e.g. carousel arrows) on the right.
 * `align="center"` is for "Inspiration" style sections only. DESIGN.md
 * section 6. `eyebrow` reuses the text-sm/500 "labels" token (section 3),
 * not a new size — same treatment already used ad hoc in the hero.
 */
export default function SectionHeader({ eyebrow, title, intro, align = "left", actions, className }) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-3",
        centered ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className="flex flex-col gap-3">
        {eyebrow && (
          <span className="text-sm font-medium uppercase tracking-wide text-primary">{eyebrow}</span>
        )}
        <h2 className="text-h2 font-extrabold text-foreground">{title}</h2>
        {intro && <p className="max-w-xl text-body text-body">{intro}</p>}
      </div>
      {actions && !centered && <div className="flex shrink-0 items-center gap-3">{actions}</div>}
    </div>
  );
}
