import { useState } from "react";
import PageContainer from "../components/layout/PageContainer";
import SectionHeader from "../components/layout/SectionHeader";
import Panel from "../components/layout/Panel";
import DiamondFrame from "../components/ui/DiamondFrame";
import StatCard from "../components/ui/StatCard";
import FeatureBlock from "../components/ui/FeatureBlock";
import Testimonial from "../components/ui/Testimonial";
import Reveal from "../components/ui/Reveal";
import { UsersIcon, MapPinIcon, StarIcon, ClockIcon, CompassIcon, CheckIcon, HeadsetIcon, HeartIcon } from "../components/ui/icons";
import { testimonials } from "../data/testimonials";

const stats = [
  { icon: <UsersIcon className="size-6" />, value: "82k+", label: "Travelers served" },
  { icon: <MapPinIcon className="size-6" />, value: "64", label: "Countries covered" },
  { icon: <StarIcon className="size-6" />, value: "4.8", label: "Average rating" },
  { icon: <ClockIcon className="size-6" />, value: "9", label: "Years running" },
];

const values = [
  {
    icon: <CompassIcon className="size-6" />,
    title: "Real people, not travel-industry jargon",
    description: "Every itinerary is written and checked by someone who has actually made the trip.",
  },
  {
    icon: <CheckIcon className="size-6" />,
    title: "No hidden fees, ever",
    description: "The price you see at search is the price you pay at checkout. No surprise add-ons.",
  },
  {
    icon: <HeadsetIcon className="size-6" />,
    title: "24/7 support, wherever you are",
    description: "Flight cancelled at 2am in a country you've never been to? We pick up.",
  },
  {
    icon: <HeartIcon className="size-6" />,
    title: "Trips that actually fit your life",
    description: "We plan around your budget and your pace, not a one-size-fits-all package.",
  },
];

/**
 * About — /about. Intro panel (story + DiamondFrame), stats row, values
 * grid (FeatureBlock variant="card"), and a testimonial pulled from
 * src/data/testimonials.js with prev/next wired through local state,
 * same pattern as Home.
 */
export default function About() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const activeTestimonial = testimonials[testimonialIndex];

  return (
    <div className="flex flex-col gap-16 pb-16 sm:gap-24 sm:pb-24">
      {/* Intro */}
      <PageContainer className="pt-8 sm:pt-12">
        <Panel className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal delay={1} className="order-first mx-auto w-full max-w-sm lg:order-last">
            <DiamondFrame
              image="https://picsum.photos/id/1044/700/860"
              alt="A traveler pausing beside a mountain river"
              className="w-full"
            />
          </Reveal>
          <Reveal className="flex flex-col items-start gap-6">
            <span className="text-sm font-medium uppercase tracking-wide text-primary">
              Our story
            </span>
            <h1 className="text-h3 font-bold text-foreground">Why Wandera exists</h1>
            <p className="text-body text-body">
              Wandera started with a shared annoyance: booking a trip meant twenty open tabs,
              three currencies of confusion and a hotel photo that never quite matched what
              showed up. We wanted a way to plan a trip that felt as good as the trip itself.
            </p>
            <p className="text-body text-body">
              So we built one. Every flight, hotel and experience on Wandera is checked by
              someone on our team before it's listed, and every itinerary leaves room to
              wander off it. We're not trying to plan your trip down to the minute — we're
              trying to clear the busywork so you can actually enjoy the planning part too.
            </p>
            <p className="text-body text-body">
              Nine years and 64 countries later, that's still the whole job.
            </p>
          </Reveal>
        </Panel>
      </PageContainer>

      {/* Stats */}
      <PageContainer>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index}>
              <StatCard {...stat} />
            </Reveal>
          ))}
        </div>
      </PageContainer>

      {/* Values */}
      <PageContainer>
        <Reveal>
          <SectionHeader
            align="center"
            className="mb-0"
            title="What we hold ourselves to"
            intro="The things that don't change no matter how big Wandera gets."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <Reveal key={value.title} delay={index}>
              <FeatureBlock variant="card" {...value} />
            </Reveal>
          ))}
        </div>
      </PageContainer>

      {/* Testimonial */}
      <PageContainer>
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeader
              className="mb-0"
              title="What people say about us"
              intro="Stories from travelers who let Wandera handle the details."
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
    </div>
  );
}
