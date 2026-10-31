import { cn } from "./cn";
import { QuoteIcon, ChevronLeftIcon, ChevronRightIcon } from "./icons";
import Rating from "./Rating";
import IconButton from "./IconButton";

/**
 * Testimonial — quote, rating, author with avatar, and prev/next controls.
 * DESIGN.md section 7.
 */
export default function Testimonial({
  quote,
  author,
  location,
  avatar,
  rating = 5,
  onPrev,
  onNext,
  className,
}) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <QuoteIcon className="size-8 text-primary" />
      <p className="text-body text-body">{quote}</p>
      <Rating value={rating} />
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={avatar} alt="" className="size-10 rounded-full object-cover" />
          <div>
            <p className="text-sm font-bold text-foreground">{author}</p>
            <p className="text-xs text-muted-foreground">{location}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <IconButton variant="outline" label="Previous testimonial" onClick={onPrev}>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton variant="outline" label="Next testimonial" onClick={onNext}>
            <ChevronRightIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
