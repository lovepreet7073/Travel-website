import { cn } from "./cn";
import IconButton from "./IconButton";
import { MinusIcon, PlusIcon } from "./icons";

/**
 * QuantityStepper — label/description on the left, a decrement/count/increment
 * control on the right. Not in DESIGN.md section 7; added for traveller and
 * add-on quantity pickers (booking flows). Built strictly from existing
 * tokens: IconButton (outline, fixed 44px per DESIGN.md) for the +/- controls
 * and text-title for the count. No new sizes or colors introduced.
 */
export default function QuantityStepper({
  label,
  description,
  value,
  onDecrement,
  onIncrement,
  min = 0,
  max = 99,
  className,
}) {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <IconButton
          variant="outline"
          label={`Decrease ${label}`}
          onClick={onDecrement}
          disabled={value <= min}
        >
          <MinusIcon />
        </IconButton>
        <span className="w-6 text-center text-title font-medium text-foreground">{value}</span>
        <IconButton
          variant="outline"
          label={`Increase ${label}`}
          onClick={onIncrement}
          disabled={value >= max}
        >
          <PlusIcon />
        </IconButton>
      </div>
    </div>
  );
}
