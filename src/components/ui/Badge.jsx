import { cn } from "./cn";

/**
 * Badge — small status/meta label. Not detailed in DESIGN.md as its own
 * component, so variants are composed only from existing role tokens
 * (primary, border/muted-foreground, danger) — no new colors introduced.
 */
const variants = {
  neutral: "border border-border text-muted-foreground bg-surface",
  primary: "bg-primary text-primary-foreground",
  danger: "border border-danger text-danger bg-surface",
};

export default function Badge({ variant = "neutral", className, children, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center justify-center rounded-full px-3 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
