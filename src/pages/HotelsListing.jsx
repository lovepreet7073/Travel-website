import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import SectionHeader from "../components/layout/SectionHeader";
import Card from "../components/ui/Card";
import DestinationCard from "../components/ui/DestinationCard";
import Input from "../components/ui/Input";
import Reveal from "../components/ui/Reveal";
import { SearchIcon } from "../components/ui/icons";
import { hotels } from "../data/hotels";
import { useMockFetch } from "../lib/useMockFetch";

function HotelsGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
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

export default function HotelsListing() {
  const [favorites, setFavorites] = useState([]);
  const [query, setQuery] = useState("");

  const result = useMockFetch(() => hotels, { delay: 500 });

  const filtered = useMemo(() => {
    if (!result.data) return [];
    const q = query.trim().toLowerCase();
    if (!q) return result.data;
    return result.data.filter(
      (hotel) => hotel.name.toLowerCase().includes(q) || hotel.city.toLowerCase().includes(q)
    );
  }, [result.data, query]);

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
          title="Hotels"
          intro="Stays we've checked in on ourselves, from courtyard hotels to cliffside villas."
        />
      </Reveal>

      <Input
        label="Search hotels"
        placeholder="Search by hotel name or city"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="max-w-sm"
      />

      {result.status === "loading" && <HotelsGridSkeleton />}

      {result.status === "error" && (
        <Card className="flex flex-col items-center gap-2 p-8 text-center">
          <p className="text-sm font-medium text-foreground">Couldn't load hotels</p>
          <p className="text-sm text-body">{result.error.message}</p>
        </Card>
      )}

      {result.status === "success" && filtered.length === 0 && (
        <Card className="flex flex-col items-center gap-2 p-8 text-center">
          <SearchIcon className="size-6 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">No hotels match "{query}"</p>
          <p className="text-sm text-body">Try a different hotel name or city.</p>
        </Card>
      )}

      {result.status === "success" && filtered.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((hotel, index) => (
            <Reveal key={hotel.slug} delay={index}>
              <DestinationCard
                as={Link}
                to={`/hotels/${hotel.slug}`}
                interactive
                image={hotel.image}
                alt={hotel.name}
                name={hotel.name}
                price={hotel.price}
                city={hotel.city}
                guests={hotel.guests}
                rating={hotel.rating}
                dates={hotel.dates}
                favorited={favorites.includes(hotel.slug)}
                onToggleFavorite={(event) => toggleFavorite(event, hotel.slug)}
              />
            </Reveal>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
