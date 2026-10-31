import { Link, useParams } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Rating from "../components/ui/Rating";
import StatCard from "../components/ui/StatCard";
import Reveal from "../components/ui/Reveal";
import { CheckIcon, ClockIcon, MapPinIcon, StarIcon, UsersIcon } from "../components/ui/icons";
import { getDestinationBySlug } from "../data/destinations";
import { useMockFetch } from "../lib/useMockFetch";

function DestinationDetailSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="aspect-4-3 w-full animate-pulse rounded-md bg-panel" />
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="aspect-4-3 animate-pulse rounded-md bg-panel" />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="h-8 w-1/2 animate-pulse rounded-full bg-panel" />
        <div className="h-4 w-1/3 animate-pulse rounded-full bg-panel" />
      </div>
      <div className="grid gap-6 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-md bg-panel" />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-4 w-full animate-pulse rounded-full bg-panel" />
        <div className="h-4 w-5/6 animate-pulse rounded-full bg-panel" />
        <div className="h-4 w-2/3 animate-pulse rounded-full bg-panel" />
      </div>
    </div>
  );
}

function DestinationDetailContent({ destination }) {
  return (
    <div className="flex flex-col gap-12">
      <Reveal className="flex flex-col gap-4">
        <div className="aspect-4-3 w-full overflow-hidden rounded-md">
          <img src={destination.image} alt={destination.name} className="size-full object-cover" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {destination.gallery.map((src, i) => (
            <div key={src} className="aspect-4-3 overflow-hidden rounded-md">
              <img
                src={src}
                alt={`${destination.name} — view ${i + 1}`}
                className="size-full object-cover"
              />
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal
        delay={1}
        className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between"
      >
        <div className="flex flex-col gap-3">
          <h1 className="text-h2 font-extrabold text-foreground">{destination.name}</h1>
          <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
            <MapPinIcon className="size-3.5" />
            {destination.city}
          </span>
          <Rating value={destination.rating} />
        </div>
        <div className="flex flex-col items-start gap-4 sm:items-end">
          <span className="text-title font-bold text-foreground">{destination.price}</span>
          <Button as={Link} to={`/booking/${destination.slug}`} variant="primary">
            Book this trip
          </Button>
        </div>
      </Reveal>

      <Reveal delay={2} className="grid gap-6 sm:grid-cols-3">
        <StatCard
          icon={<ClockIcon className="size-6" />}
          value={destination.duration.split(" ")[0]}
          label="Days trip"
        />
        <StatCard
          icon={<UsersIcon className="size-6" />}
          value={destination.guests.split(" ")[0]}
          label="Guests"
        />
        <StatCard
          icon={<StarIcon className="size-6" />}
          value={destination.rating.toFixed(1)}
          label="Rating"
        />
      </Reveal>

      <Reveal delay={3} className="flex flex-col gap-3">
        <h2 className="text-h3 font-bold text-foreground">About this trip</h2>
        <p className="max-w-2xl text-body text-body">{destination.description}</p>
      </Reveal>

      <Reveal delay={4} className="flex flex-col gap-3">
        <h2 className="text-h3 font-bold text-foreground">Trip highlights</h2>
        <ul className="flex flex-col gap-3">
          {destination.highlights.map((highlight) => (
            <li key={highlight} className="flex items-center gap-3 text-sm text-body">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-panel text-primary">
                <CheckIcon className="size-4" />
              </span>
              {highlight}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

export default function DestinationDetail() {
  const { slug } = useParams();
  const result = useMockFetch(() => getDestinationBySlug(slug), { delay: 500, deps: [slug] });

  return (
    <PageContainer className="flex flex-col gap-8 py-8 sm:py-12">
      {result.status === "loading" && <DestinationDetailSkeleton />}

      {result.status === "error" && (
        <Card className="flex flex-col items-center gap-2 p-8 text-center">
          <p className="text-sm font-medium text-foreground">Couldn't load this destination</p>
          <p className="text-sm text-body">{result.error.message}</p>
        </Card>
      )}

      {result.status === "success" && !result.data && (
        <Card className="flex flex-col items-center gap-4 p-12 text-center">
          <p className="text-title font-medium text-foreground">We couldn't find that destination</p>
          <p className="max-w-md text-sm text-body">
            It may have been renamed or removed from the catalog. Take a look at everywhere else
            Wandera goes.
          </p>
          <Button as={Link} to="/destinations" variant="primary">
            Back to destinations
          </Button>
        </Card>
      )}

      {result.status === "success" && result.data && (
        <DestinationDetailContent destination={result.data} />
      )}
    </PageContainer>
  );
}
