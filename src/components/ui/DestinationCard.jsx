import { cn } from "./cn";
import Card from "./Card";
import IconButton from "./IconButton";
import Rating from "./Rating";
import { HeartIcon, MapPinIcon, UsersIcon, CalendarIcon } from "./icons";

/**
 * DestinationCard — white, radius-md, shadow-card, 12px image padding,
 * 16px text padding. DESIGN.md section 7.
 */
export default function DestinationCard({
  image,
  alt = "",
  name,
  price,
  city,
  guests,
  rating = 0,
  dates,
  favorited = false,
  onToggleFavorite,
  className,
  ...props
}) {
  return (
    <Card className={cn("p-3", className)} {...props}>
      <div className="relative aspect-4-3 overflow-hidden rounded-md">
        <img src={image} alt={alt} className="size-full object-cover" />
        <IconButton
          variant="on-image"
          label={favorited ? "Remove from favorites" : "Add to favorites"}
          onClick={onToggleFavorite}
          className="absolute right-2 top-2"
        >
          <HeartIcon filled={favorited} className={cn("size-5", favorited && "text-primary")} />
        </IconButton>
      </div>

      <div className="px-1 pt-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-title font-medium text-foreground">{name}</span>
          <span className="text-title font-bold text-foreground">{price}</span>
        </div>

        {(city || guests) && (
          <div className="mt-2 flex items-center justify-between gap-2 text-xs text-muted-foreground">
            {city && (
              <span className="inline-flex items-center gap-1">
                <MapPinIcon />
                {city}
              </span>
            )}
            {guests && (
              <span className="inline-flex items-center gap-1">
                <UsersIcon />
                {guests}
              </span>
            )}
          </div>
        )}

        {(rating > 0 || dates) && (
          <div className="mt-1 flex items-center justify-between gap-2 text-xs text-muted-foreground">
            {rating > 0 ? <Rating value={rating} /> : <span />}
            {dates && (
              <span className="inline-flex items-center gap-1">
                <CalendarIcon />
                {dates}
              </span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
