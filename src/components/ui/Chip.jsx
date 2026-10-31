import { forwardRef } from "react";
import { cn } from "./cn";

/**
 * Chip — filter tab pill. Outline by default, primary fill when active.
 * DESIGN.md section 7.
 */
const Chip = forwardRef(function Chip(
  { active = false, disabled = false, className, children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type={props.type ?? "button"}
      aria-pressed={active}
      disabled={disabled}
      className={cn(
        "inline-flex h-8 items-center justify-center whitespace-nowrap rounded-full px-4 text-sm font-medium",
        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        "focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        active
          ? "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-hover"
          : "border border-border text-muted-foreground hover:bg-panel active:bg-panel",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

export default Chip;
