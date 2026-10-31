import { cn } from "./cn";
import Card from "./Card";

const toneClasses = {
  primary: "bg-primary text-primary-foreground",
  accent: "bg-accent text-primary-foreground",
  highlight: "bg-highlight text-foreground",
};

/**
 * FeatureBlock — icon + title + description. Not in DESIGN.md section 7;
 * added for icon/title/description content (service grids, step lists).
 * Uses only existing tokens — see COMPONENTS.md for rationale.
 *
 * variant="card": centered, wrapped in Card (or plain, see `bare`). Icon
 * plain (text-primary), matching StatCard's icon treatment.
 * variant="row": icon in a radius-sm colored square beside the text.
 * `tone` picks the square's background (primary/accent/highlight — all
 * decorative per DESIGN.md section 2) and an accessible icon color for it.
 * `bare` (card variant only): skip the Card surface — same content,
 * un-boxed — for spotlighting one card in a grid of otherwise-plain items.
 */
export default function FeatureBlock({
  icon,
  title,
  description,
  variant = "card",
  tone = "primary",
  bare = false,
  className,
}) {
  if (variant === "row") {
    return (
      <div className={cn("flex items-start gap-4", className)}>
        <span
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-sm",
            toneClasses[tone]
          )}
        >
          {icon}
        </span>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-foreground">{title}</p>
          <p className="text-sm text-body">{description}</p>
        </div>
      </div>
    );
  }

  const content = (
    <>
      <span className="flex size-6 items-center justify-center text-primary">{icon}</span>
      <p className="text-title font-medium text-foreground">{title}</p>
      <p className="text-sm text-body">{description}</p>
    </>
  );

  if (bare) {
    return (
      <div className={cn("flex flex-col items-center gap-3 p-6 text-center", className)}>
        {content}
      </div>
    );
  }

  return (
    <Card className={cn("flex flex-col items-center gap-3 p-6 text-center", className)}>
      {content}
    </Card>
  );
}
