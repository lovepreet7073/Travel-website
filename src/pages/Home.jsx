import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "../components/ui/cn";
import PageContainer from "../components/layout/PageContainer";
import SectionHeader from "../components/layout/SectionHeader";
import Panel from "../components/layout/Panel";
import Button from "../components/ui/Button";
import IconButton from "../components/ui/IconButton";
import Card from "../components/ui/Card";
import DestinationCard from "../components/ui/DestinationCard";
import FeatureBlock from "../components/ui/FeatureBlock";
import ProgressBar from "../components/ui/ProgressBar";
import Testimonial from "../components/ui/Testimonial";
import SearchBar from "../components/ui/SearchBar";
import Reveal from "../components/ui/Reveal";
import Input from "../components/ui/Input";
import {
  PlaneIcon,
  PlayIcon,
  BedIcon,
  CompassIcon,
  HeadsetIcon,
  HeartIcon,
  UsersIcon,
  SendIcon,
  MapPinIcon,
  CalendarIcon,
} from "../components/ui/icons";
import { destinations } from "../data/destinations";
import { testimonials } from "../data/testimonials";
import { useMockFetch } from "../lib/useMockFetch";

const services = [
  {
    icon: <CompassIcon className="size-6" />,
    title: "Local Experiences",
    description: "Skip the tourist traps with itineraries built by people who actually live there.",
  },
  {
    icon: <PlaneIcon className="size-6" />,
    title: "Best Flight Deals",
    description: "We track fares across hundreds of routes so you always book at the right price.",
  },
  {
    icon: <BedIcon className="size-6" />,
    title: "Curated Hotels",
    description: "Every hotel on Vendra is visited and vetted by our team before it's listed.",
  },
  {
    icon: <HeadsetIcon className="size-6" />,
    title: "24/7 Support",
    description: "A real person picks up, day or night, wherever your trip takes you.",
  },
];

const steps = [
  {
    tone: "primary",
    icon: <CompassIcon className="size-5" />,
    title: "Choose your destination",
    description: "Browse curated trips or search for exactly where you want to go.",
  },
  {
    tone: "accent",
    icon: <BedIcon className="size-5" />,
    title: "Book in a few taps",
    description: "Flights, hotels and experiences bundled into one simple checkout.",
  },
  {
    tone: "highlight",
    icon: <PlaneIcon className="size-5" />,
    title: "Land and go",
    description: "Your itinerary, tickets and confirmations are all waiting in My Bookings.",
  },
];

const partners = ["Aeroline", "Globalair", "TransitGo", "SkyPass", "VoyageCo"];

// A dedicated hero shot rather than reusing a specific destination's photo —
// picsum's numbered /id/ catalog, visually verified (see destinations.js).
const heroImage = { src: "https://picsum.photos/id/1067/1000/1250", alt: "City skyline at sunset" };

// DESIGN.md section 7: SearchBar overlaps the bottom edge of the hero panel,
// with 4 fields (Location, Check in, Check out, Guests). No picker modals
// are in scope, so every field and the search button share one action —
// jumping into the destinations listing to start a real search.
const heroSearchFields = [
  { label: "Location", placeholder: "Where to?", icon: <MapPinIcon /> },
  { label: "Check in", placeholder: "Add date", icon: <CalendarIcon /> },
  { label: "Check out", placeholder: "Add date", icon: <CalendarIcon /> },
  { label: "Guests", placeholder: "Add guests", icon: <UsersIcon /> },
];

function DotGrid({ className }) {
  return (
    <div className={cn("grid grid-cols-4 gap-2", className)} aria-hidden="true">
      {Array.from({ length: 16 }).map((_, i) => (
        <span key={i} className="size-1 rounded-full bg-border" />
      ))}
    </div>
  );
}

function DestinationsGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="flex flex-col gap-4 p-3">
          <div className="aspect-4-3 animate-pulse rounded-md bg-panel" />
          <div className="flex flex-col gap-2 px-1 pb-1">
            <div className="h-4 w-3/4 animate-pulse rounded-full bg-panel" />
            <div className="h-3 w-1/2 animate-pulse rounded-full bg-panel" />
          </div>
        </Card>
      ))}
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribeState, setSubscribeState] = useState("idle");

  const topDestinations = useMockFetch(() => destinations.slice(0, 3), { delay: 600 });
  const goToDestinations = () => navigate("/destinations");
  const heroFields = heroSearchFields.map((field) => ({ ...field, onClick: goToDestinations }));

  function toggleFavorite(event, slug) {
    event.preventDefault();
    event.stopPropagation();
    setFavorites((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]
    );
  }

  function handleSubscribe(event) {
    event.preventDefault();
    if (!email.includes("@")) {
      setSubscribeState("error");
      return;
    }
    setSubscribeState("loading");
    setTimeout(() => setSubscribeState("success"), 700);
  }

  const activeTestimonial = testimonials[testimonialIndex];

  return (
    <div className="flex flex-col gap-16 pb-16 sm:gap-24 sm:pb-24">
      {/* Hero */}
      <PageContainer className="pt-4 sm:pt-8">
        <div className="grid items-stretch gap-12 lg:grid-cols-2">
          <Reveal className="flex flex-col items-start justify-center gap-6">
            <span className="text-sm font-medium uppercase tracking-wide text-primary">
              Best destinations around the world
            </span>
            <h1 className="text-display font-extrabold text-foreground">
              Travel, enjoy and live a new and full life
            </h1>
            <p className="max-w-xl text-body-lg text-body">
              Vendra plans the flights, hotels and small details so your only job on the trip is
              to show up and enjoy it.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button as={Link} to="/destinations" variant="primary">
                Find out more
              </Button>
              <div className="flex items-center gap-3">
                <IconButton variant="filled" label="Play demo video">
                  <PlayIcon className="size-4" />
                </IconButton>
                <span className="text-sm font-medium text-foreground">Play Demo</span>
              </div>
            </div>
          </Reveal>
          <Reveal
            delay={1}
            className="relative aspect-square overflow-hidden rounded-md shadow-card"
          >
            <img
              src={heroImage.src}
              alt={heroImage.alt}
              className="absolute inset-0 size-full object-cover"
            />
          </Reveal>
        </div>
        <Reveal delay={2}>
          <SearchBar
            fields={heroFields}
            onSearch={goToDestinations}
            className="relative z-10 mx-auto -mt-4 w-full max-w-4xl sm:-mt-6"
          />
        </Reveal>
      </PageContainer>

      {/* Services */}
      <PageContainer>
        <Reveal className="relative">
          <DotGrid className="absolute -top-4 right-0 hidden sm:grid" />
          <SectionHeader
            align="center"
            eyebrow="Category"
            title="We offer the best services"
            intro="Everything you need for a trip that runs itself, from the first search to landing back home."
          />
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index} className={index === 1 ? "relative" : undefined}>
              {index === 1 && (
                <span
                  className="absolute -bottom-4 -left-4 -z-10 hidden size-24 rounded-full bg-accent/20 sm:block"
                  aria-hidden="true"
                />
              )}
              <FeatureBlock
                variant="card"
                bare={index !== 1}
                className={index === 1 ? "shadow-float" : undefined}
                {...service}
              />
            </Reveal>
          ))}
        </div>
      </PageContainer>

      {/* Top destinations */}
      <PageContainer>
        <Reveal>
          <SectionHeader
            eyebrow="Top selling"
            title="Top destinations"
            intro="A handful of the trips our travelers book again and again."
          />
        </Reveal>
        {topDestinations.status === "loading" && <DestinationsGridSkeleton />}
        {topDestinations.status === "error" && (
          <Card className="flex flex-col items-center gap-2 p-8 text-center">
            <p className="text-sm font-medium text-foreground">Couldn't load destinations</p>
            <p className="text-sm text-body">{topDestinations.error.message}</p>
          </Card>
        )}
        {topDestinations.status === "success" && topDestinations.data.length === 0 && (
          <Card className="p-8 text-center text-sm text-body">No destinations to show yet.</Card>
        )}
        {topDestinations.status === "success" && topDestinations.data.length > 0 && (
          <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <svg
              className="pointer-events-none absolute -right-10 top-1/2 hidden size-28 -translate-y-1/2 text-border lg:block"
              viewBox="0 0 100 100"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" />
            </svg>
            {topDestinations.data.map((destination, index) => (
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

      {/* 3 easy steps */}
      <PageContainer>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-8">
            <SectionHeader
              className="mb-0"
              eyebrow="Easy and fast"
              title="Book your next trip in 3 easy steps"
              intro="No spreadsheets, no forty open tabs — just a few taps to a fully planned trip."
            />
            <div className="flex flex-col gap-6">
              {steps.map((step, index) => (
                <Reveal key={step.title} delay={index + 1}>
                  <FeatureBlock variant="row" {...step} />
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal delay={2} className="relative">
            <Card className="overflow-hidden p-3">
              <div className="relative aspect-4-3 overflow-hidden rounded-md">
                <img
                  src="https://picsum.photos/id/1050/700/520"
                  alt="Travelers exploring Santorini"
                  className="size-full object-cover"
                />
                <IconButton variant="on-image" label="Save trip" className="absolute right-2 top-2">
                  <HeartIcon />
                </IconButton>
              </div>
              <div className="flex items-center justify-between gap-2 px-1 pt-4">
                <div>
                  <p className="text-title font-medium text-foreground">Trip to Greece</p>
                  <p className="text-xs text-muted-foreground">14–29 June · by Robbin J.</p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <UsersIcon />
                  24 people going
                </span>
              </div>
            </Card>

            <Card className="absolute -bottom-6 -left-6 hidden w-56 flex-col gap-3 p-4 sm:flex">
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/80?img=14"
                  alt=""
                  className="size-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-xs text-muted-foreground">Ongoing</p>
                  <p className="text-sm font-medium text-foreground">Trip to Rome</p>
                </div>
              </div>
              <ProgressBar value={40} label="40% completed" />
            </Card>
          </Reveal>
        </div>
      </PageContainer>

      {/* Testimonials */}
      <PageContainer>
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeader
              className="mb-0"
              eyebrow="Testimonials"
              title="What people say about us"
              intro="Stories from travelers who let Vendra handle the details."
            />
          </Reveal>
          <Reveal delay={1}>
            <Testimonial
              quote={activeTestimonial.quote}
              author={activeTestimonial.author}
              location={activeTestimonial.location}
              avatar={activeTestimonial.avatar}
              rating={activeTestimonial.rating}
              onPrev={() =>
                setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
              }
              onNext={() => setTestimonialIndex((i) => (i + 1) % testimonials.length)}
            />
          </Reveal>
        </div>
      </PageContainer>

      {/* Partners */}
      <PageContainer>
        <Reveal className="flex flex-wrap items-center justify-between gap-8 border-y border-border py-8">
          {partners.map((partner) => (
            <span key={partner} className="text-title font-medium tracking-wide text-muted-foreground">
              {partner}
            </span>
          ))}
        </Reveal>
      </PageContainer>

      {/* Newsletter */}
      <PageContainer>
        <Reveal>
          <Panel className="relative flex flex-col items-center gap-6 text-center">
            <IconButton
              variant="filled"
              label="Subscribe"
              className="absolute -top-6 right-6 hidden sm:flex"
            >
              <SendIcon />
            </IconButton>
            <h2 className="max-w-xl text-h3 font-bold text-foreground">
              Subscribe to get travel tips, fare drops and new destinations from Vendra
            </h2>
            <form
              onSubmit={handleSubscribe}
              className="flex w-full max-w-md flex-col items-stretch gap-3 sm:flex-row sm:items-start"
              noValidate
            >
              <Input
                type="email"
                placeholder="Your email"
                aria-label="Email address"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (subscribeState !== "idle") setSubscribeState("idle");
                }}
                error={subscribeState === "error" ? "Enter a valid email address." : undefined}
                className="flex-1"
              />
              <Button type="submit" variant="primary" loading={subscribeState === "loading"}>
                Subscribe
              </Button>
            </form>
            {subscribeState === "success" && (
              <p className="text-sm font-medium text-primary">You're on the list — welcome aboard.</p>
            )}
          </Panel>
        </Reveal>
      </PageContainer>
    </div>
  );
}
