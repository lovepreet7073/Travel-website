import { forwardRef, useId } from "react";
import { cn } from "./cn";
import Spinner from "./Spinner";

/**
 * Input — labelled text field with error and loading states.
 * DESIGN.md section 7 states table.
 *
 * `trailing` renders a node (e.g. a password show/hide IconButton) inside
 * the field on the right — mutually exclusive with `loading`'s spinner,
 * which uses the same slot.
 */
const Input = forwardRef(function Input(
  { label, error, disabled = false, loading = false, trailing, className, id, ...props },
  ref
) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={cn(
            "h-11 w-full rounded-md border bg-surface px-4 text-body text-foreground placeholder:text-muted-foreground",
            "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-danger" : "border-border focus:border-primary",
            (loading || trailing) && "pr-10",
            className
          )}
          {...props}
        />
        {loading && (
          <span className="absolute inset-y-0 right-3 flex items-center text-muted-foreground">
            <Spinner className="size-4" />
          </span>
        )}
        {!loading && trailing && (
          <span className="absolute inset-y-0 right-3 flex items-center">{trailing}</span>
        )}
      </div>
      {error && (
        <p id={`${inputId}-error`} className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;
