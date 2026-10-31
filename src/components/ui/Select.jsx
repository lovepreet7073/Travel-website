import { forwardRef, useId } from "react";
import { cn } from "./cn";
import { ChevronDownIcon } from "./icons";

/**
 * Select — labelled native select styled to match Input.
 * DESIGN.md section 7 states table.
 */
const Select = forwardRef(function Select(
  { label, error, disabled = false, className, id, children, ...props },
  ref
) {
  const autoId = useId();
  const selectId = id ?? autoId;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? `${selectId}-error` : undefined}
          className={cn(
            "h-11 w-full appearance-none rounded-md border bg-surface pl-4 pr-10 text-body text-foreground",
            "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-danger" : "border-border focus:border-primary",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute inset-y-0 right-4 my-auto size-4 text-muted-foreground" />
      </div>
      {error && (
        <p id={`${selectId}-error`} className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
});

export default Select;
