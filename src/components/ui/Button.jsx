import { forwardRef } from "react";
import { cn } from "./cn";
import Spinner from "./Spinner";

const base =
  "inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium " +
  "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary " +
  "focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const variants = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-hover",
  outline: "border border-border text-foreground hover:bg-panel active:bg-panel",
};

const spinnerTone = {
  primary: "text-primary-foreground",
  outline: "text-foreground",
};

/**
 * Button — primary and outline variants only, per DESIGN.md section 7.
 * Use one primary button per section.
 *
 * `as` renders it as another component (e.g. react-router's `Link`) for
 * navigation CTAs, same polymorphic pattern as Card's `as` prop. Only
 * plain `<button>` gets real `disabled`/loading-disabled behavior — other
 * tags (like `Link`) don't support native disabled, so avoid `disabled`/
 * `loading` on those.
 */
const Button = forwardRef(function Button(
  { as: Tag = "button", variant = "primary", loading = false, disabled = false, className, children, ...props },
  ref
) {
  const isButtonTag = Tag === "button";
  const isDisabled = disabled || loading;

  return (
    <Tag
      ref={ref}
      type={isButtonTag ? props.type ?? "button" : undefined}
      disabled={isButtonTag ? isDisabled : undefined}
      aria-busy={loading || undefined}
      className={cn(base, variants[variant], loading && "relative", className)}
      {...props}
    >
      <span className={cn("inline-flex items-center gap-2", loading && "invisible")}>
        {children}
      </span>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner className={cn("size-4", spinnerTone[variant])} />
        </span>
      )}
    </Tag>
  );
});

export default Button;
