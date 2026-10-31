import { forwardRef } from "react";
import { cn } from "./cn";
import Spinner from "./Spinner";

const base =
  "inline-flex size-11 shrink-0 items-center justify-center rounded-full transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 " +
  "disabled:cursor-not-allowed disabled:opacity-50";

const variants = {
  filled: "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-hover",
  outline: "border border-border text-foreground hover:bg-panel active:bg-panel",
  "on-image": "bg-white/90 text-foreground hover:bg-white active:bg-white",
};

/**
 * IconButton — 44px round button. Variants: filled, outline, on-image
 * (used for the heart button over destination photos), per DESIGN.md section 7.
 */
const IconButton = forwardRef(function IconButton(
  { variant = "outline", loading = false, disabled = false, label, className, children, ...props },
  ref
) {
  const isDisabled = disabled || loading;
  return (
    <button
      ref={ref}
      type={props.type ?? "button"}
      aria-label={label}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {loading ? <Spinner className="size-4" /> : children}
    </button>
  );
});

export default IconButton;
