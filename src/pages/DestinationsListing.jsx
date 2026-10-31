import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import SectionHeader from "../components/layout/SectionHeader";
import Card from "../components/ui/Card";
import DestinationCard from "../components/ui/DestinationCard";
import Input from "../components/ui/Input";
import Reveal from "../components/ui/Reveal";
import { destinations } from "../data/destinations";
import { useMockFetch } from "../lib/useMockFetch";

function DestinationsGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} className="flex flex-col gap-4 p-3">
          <div className="aspect-4-3 animate-pulse rounded-md bg-panel" />
          <div className="flex flex-col gap-2 px-1 pb-1">
            <div className="h-4 w-3/4 animate-pulse rounded-full bg-panel" />
            <div className="h-3 w-1/2 animate-pulse rounded-full bg-panel" />
            <div className="h-3 w-2/3 animate-pulse rounded-full bg-panel" />
          </div>
        </Card>
      ))}
    </div>
  );
}

export default function DestinationsListing() {
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const result = useMockFetch(() => destinations, { delay: 500 });

  const filtered = useMemo(() => {
    if (result.status !== "success") return [];
    const term = query.trim().toLowerCase();
    if (!term) return result.data;
    return result.data.filter(
      (destination) =>
        destination.name.toLowerCase().includes(term) || destination.city.toLowerCase().includes(term)
    );
  }, [result, query]);

  function toggleFavorite(event, slug) {
    event.preventDefault();
    event.stopPropagation();
    setFavorites((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]
    );
  }

  return (
    <PageContainer className="flex flex-col gap-8 py-8 sm:py-12">
      <Reveal>
        <SectionHeader
          className="mb-0"
          title="Destinations"
          intro="Every trip Wandera curates, in one place — search by name or city to find the one that fits."
        />
      </Reveal>

      <Input
        type="text"
        placeholder="Search by destination or city"
        aria-label="Search destinations"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="max-w-sm"
      />

      {result.status === "loading" && <DestinationsGridSkeleton />}

      {result.status === "error" && (
        <Card className="flex flex-col items-center gap-2 p-8 text-center">
          <p className="text-sm font-medium text-foreground">Couldn't load destinations</p>
          <p className="text-sm text-body">{result.error.message}</p>
        </Card>
      )}

      {result.status === "success" && filtered.length === 0 && (
        <Card className="flex flex-col items-center gap-2 p-8 text-center">
          <p className="text-sm font-medium text-foreground">No destinations match &ldquo;{query}&rdquo;</p>
          <p className="text-sm text-body">Try a different name or city.</p>
        </Card>
      )}

      {result.status === "success" && filtered.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((destination, index) => (
            <Reveal key={destination.slug} delay={index}>
              <DestinationCard
                as={Link}
                to={`/destinations/${destination.slug}`}
                interactive
                image={destination.image}
                alt={destination.name}
                name={destination.name}
                price={destination.price}
                city={destination.city}
                guests={destination.guests}
                rating={destination.rating}
                dates={destination.duration}
                favorited={favorites.includes(destination.slug)}
                onToggleFavorite={(event) => toggleFavorite(event, destination.slug)}
              />
            </Reveal>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
