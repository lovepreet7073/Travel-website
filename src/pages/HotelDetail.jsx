import { useParams, Link } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Rating from "../components/ui/Rating";
import Reveal from "../components/ui/Reveal";
import { CheckIcon, MapPinIcon } from "../components/ui/icons";
import { getHotelBySlug } from "../data/hotels";
import { useMockFetch } from "../lib/useMockFetch";

function HotelDetailSkeleton() {
  return (
    <PageContainer className="flex flex-col gap-8 py-8 sm:py-12">
      <div className="flex flex-col gap-3">
        <div className="h-8 w-64 animate-pulse rounded-full bg-panel" />
        <div className="h-4 w-40 animate-pulse rounded-full bg-panel" />
      </div>
      <div className="aspect-4-3 w-full animate-pulse rounded-md bg-panel sm:aspect-auto sm:h-96" />
      <div className="grid gap-3 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="aspect-4-3 animate-pulse rounded-md bg-panel" />
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <div className="h-4 w-full animate-pulse rounded-full bg-panel" />
        <div className="h-4 w-2/3 animate-pulse rounded-full bg-panel" />
      </div>
    </PageContainer>
  );
}

export default function HotelDetail() {
  const { slug } = useParams();
  const result = useMockFetch(() => getHotelBySlug(slug) ?? null, { deps: [slug], delay: 500 });

  if (result.status === "loading") return <HotelDetailSkeleton />;

  if (result.status === "error") {
    return (
      <PageContainer className="py-8 sm:py-12">
        <Card className="flex flex-col items-center gap-3 p-8 text-center">
          <p className="text-sm font-medium text-foreground">Couldn't load this hotel</p>
          <p className="text-sm text-body">{result.error.message}</p>
          <Button as={Link} to="/hotels" variant="primary">
            Back to hotels
          </Button>
        </Card>
      </PageContainer>
    );
  }

  const hotel = result.data;

  if (!hotel) {
    return (
      <PageContainer className="py-8 sm:py-12">
        <Card className="flex flex-col items-center gap-3 p-8 text-center">
          <p className="text-sm font-medium text-foreground">We couldn't find that hotel</p>
          <p className="text-sm text-body">It may have been removed, or the link might be out of date.</p>
          <Button as={Link} to="/hotels" variant="primary">
            Back to hotels
          </Button>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="flex flex-col gap-8 py-8 sm:py-12">
      <Reveal className="flex flex-col gap-3">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-2">
            <h1 className="text-h2 font-extrabold text-foreground">{hotel.name}</h1>
            <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
              <MapPinIcon />
              {hotel.city}
            </span>
          </div>
          <div className="flex flex-col items-start gap-1 sm:items-end">
            <span className="text-title font-bold text-foreground">{hotel.price}</span>
            <span className="text-xs text-muted-foreground">per night</span>
          </div>
        </div>
        <Rating value={hotel.rating} />
      </Reveal>

      <Reveal delay={1} className="flex flex-col gap-3">
        <div className="aspect-4-3 w-full overflow-hidden rounded-md sm:aspect-auto sm:h-96">
          <img src={hotel.image} alt={hotel.name} className="size-full object-cover" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {hotel.gallery.map((src, i) => (
            <div key={src} className="aspect-4-3 overflow-hidden rounded-md">
              <img src={src} alt={`${hotel.name} photo ${i + 1}`} className="size-full object-cover" />
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={2} className="grid gap-12 lg:grid-cols-3 lg:gap-10">
        <div className="flex flex-col gap-8 lg:col-span-2">
          <div className="flex flex-col gap-3">
            <h2 className="text-h3 font-bold text-foreground">About this stay</h2>
            <p className="text-body text-body">{hotel.description}</p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-h3 font-bold text-foreground">Amenities</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {hotel.amenities.map((amenity) => (
                <li key={amenity} className="flex items-center gap-2 text-sm text-body">
                  <CheckIcon className="size-4 shrink-0 text-primary" />
                  {amenity}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Card className="flex flex-col items-start gap-4 p-6">
          <div className="flex flex-col gap-1">
            <span className="text-title font-bold text-foreground">{hotel.price}</span>
            <span className="text-xs text-muted-foreground">per night · {hotel.dates}</span>
          </div>
          <Button as={Link} to={`/booking/${slug}`} variant="primary" className="w-full">
            Book this stay
          </Button>
        </Card>
      </Reveal>

      <Reveal delay={3} className="flex flex-col gap-6">
        <h2 className="text-h3 font-bold text-foreground">Choose a room</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hotel.rooms.map((room) => (
            <Card key={room.name} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-title font-medium text-foreground">{room.name}</span>
                <span className="text-xs text-muted-foreground">{room.occupancy}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-title font-bold text-foreground">{room.price}</span>
                <Button as={Link} to={`/booking/${slug}`} variant="outline">
                  Select
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Reveal>
    </PageContainer>
  );
}
