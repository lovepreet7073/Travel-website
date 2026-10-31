import { Link, useSearchParams } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { ClockIcon } from "../components/ui/icons";
import Reveal from "../components/ui/Reveal";
import { searchFlights } from "../data/flights";
import { useMockFetch } from "../lib/useMockFetch";

function ResultsSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
            <div className="h-4 w-28 animate-pulse rounded-full bg-panel" />
            <div className="h-4 w-20 animate-pulse rounded-full bg-panel" />
            <div className="h-4 w-32 animate-pulse rounded-full bg-panel" />
          </div>
          <div className="h-11 w-24 animate-pulse rounded-full bg-panel" />
        </Card>
      ))}
    </div>
  );
}

export default function FlightsResults() {
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from") ?? "";
  const to = searchParams.get("to") ?? "";

  const result = useMockFetch(() => searchFlights({ from, to }), { deps: [from, to], delay: 600 });

  return (
    <PageContainer className="flex flex-col gap-8 py-8 sm:py-12">
      <Reveal className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium uppercase tracking-wide text-primary">Flight results</span>
          <h1 className="text-h2 font-extrabold text-foreground">
            {from && to ? `${from} → ${to}` : "All flights"}
          </h1>
        </div>
        <Button as={Link} to="/flights" variant="outline">
          Search again
        </Button>
      </Reveal>

      {result.status === "loading" && <ResultsSkeleton />}

      {result.status === "error" && (
        <Card className="flex flex-col items-center gap-2 p-8 text-center">
          <p className="text-sm font-medium text-foreground">Couldn't load flights</p>
          <p className="text-sm text-body">{result.error.message}</p>
        </Card>
      )}

      {result.status === "success" && result.data.length === 0 && (
        <Card className="flex flex-col items-center gap-4 p-8 text-center">
          <p className="text-title font-medium text-foreground">No flights found for this route</p>
          <p className="max-w-md text-sm text-body">
            We couldn't match any flights for {from || "your origin"} to {to || "your destination"} in our
            current schedule. Our mock schedule currently only covers New York to London — try that route,
            or search again with a different one.
          </p>
          <Button as={Link} to="/flights" variant="primary">
            Search again
          </Button>
        </Card>
      )}

      {result.status === "success" && result.data.length > 0 && (
        <div className="flex flex-col gap-4">
          {result.data.map((flight, index) => (
            <Reveal
              key={flight.id}
              as={Card}
              delay={index}
              interactive
              className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
                <div className="flex flex-col gap-1 sm:w-36">
                  <span className="text-sm font-medium text-foreground">{flight.airline}</span>
                  <span className="text-xs text-muted-foreground">{flight.cabin}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <span className="text-title font-medium text-foreground">{flight.departTime}</span>
                    <span className="text-xs text-muted-foreground">{flight.fromCode}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">→</span>
                  <div className="flex flex-col">
                    <span className="text-title font-medium text-foreground">{flight.arriveTime}</span>
                    <span className="text-xs text-muted-foreground">{flight.toCode}</span>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-2">
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <ClockIcon />
                    {flight.duration}
                  </span>
                  <Badge variant={flight.stops === "Nonstop" ? "primary" : "neutral"}>{flight.stops}</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-start">
                <span className="text-title font-bold text-foreground">{flight.price}</span>
                <Button as={Link} to={`/flights/book?flightId=${flight.id}`} variant="primary">
                  Select
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
