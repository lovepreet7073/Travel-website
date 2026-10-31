import { useState } from "react";
import { cn } from "./cn";

/**
 * Tabs — self-managing tablist. Not itemized in DESIGN.md section 7, so it
 * reuses the Chip visual pattern (outline / primary-fill pill) rather than
 * inventing a new style. `items` is [{ label, value, disabled }].
 */
export default function Tabs({ items, value, defaultValue, onChange, className }) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? items[0]?.value);
  const isControlled = value !== undefined;
  const activeValue = isControlled ? value : internalValue;

  function select(next) {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  }

  return (
    <div role="tablist" className={cn("inline-flex flex-wrap items-center gap-2", className)}>
      {items.map((item) => {
        const isActive = item.value === activeValue;
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={item.disabled}
            onClick={() => select(item.value)}
            className={cn(
              "inline-flex h-8 items-center justify-center whitespace-nowrap rounded-full px-4 text-sm font-medium",
              "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              "focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              isActive
                ? "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-hover"
                : "border border-border text-muted-foreground hover:bg-panel active:bg-panel"
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
