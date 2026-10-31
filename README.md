# Vendra

A travel booking web app concept — search and book flights, hotels and curated destinations, built around a strict, token-based design system rather than one-off styling.

**Live demo:** _add your Vercel URL here once redeployed under the new project name_
**Repo:** https://github.com/lovepreet7073/Travel-website

![Vendra preview](./src/assets/hero.png)

## Why this project

Most portfolio clones restyle a template page by page. Vendra is built the other way around: a single `DESIGN.md` defines every color, font size, spacing step, radius and shadow as a named token, and every screen — 16 in total — is assembled only from a shared component library (`src/components/ui`, `src/components/layout`) that consumes those tokens. Nothing is hardcoded per page, which is what makes the UI consistent across Home, listings, detail pages, multi-step booking flows and account screens.

## Features

- **16 full pages** — Home, destination/hotel listings + detail pages, flight search/results, multi-step flight & hotel booking, login/sign up, account (profile, my bookings), about, contact, 404.
- **Token-driven design system** — colors, typography, spacing, radii and shadows are all roles defined once in `src/index.css` (`@theme`) and documented in `DESIGN.md`; a custom lint script (`npm run lint:design`) scans the codebase for raw hex values, arbitrary Tailwind values and inline styles so drift gets caught automatically.
- **Shared component library** — ~20 reusable UI primitives (Button, Card, Input, Modal, Tabs, Rating, SearchBar, …) documented with their variants in `COMPONENTS.md`, so new screens reuse instead of re-implement.
- **Scroll-reveal animations & hover depth** — a lightweight `IntersectionObserver`-based `Reveal` component fades/slides content in as it enters the viewport (respects `prefers-reduced-motion`), and interactive cards lift on hover for visual depth.
- **Fully responsive**, keyboard-accessible focus states, and simulated async flows (loading/success/error states) on forms and bookings.

## Tech stack

React 19 · React Router v7 · Vite 6 · Tailwind CSS v4 · Oxlint

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build
npm run lint          # oxlint
npm run lint:design   # design-token/consistency check
```

## Project structure

```
src/
  components/
    ui/        shared primitives (Button, Card, Input, Modal, ...)
    layout/    page shell (Navbar, Footer, PageContainer, ...)
  pages/       one file per route
  data/        mock data (destinations, hotels, flights, bookings, ...)
  lib/         small hooks (useInView, useMockFetch)
DESIGN.md       the single source of design truth (tokens, rules)
COMPONENTS.md   catalog of every shared component + build decisions log
```

## Design system

`DESIGN.md` and `COMPONENTS.md` aren't just docs after the fact — they governed every decision while building this (see `CLAUDE.md`). Read `DESIGN.md` first if you want to see the token system itself; `COMPONENTS.md` has a running log of real bugs found and fixed during an audit pass (a font-loading bug, a mis-seeded stock photo, a CSS `display: inline` bug that broke card borders inside a grid), which doubles as a record of how the project was actually debugged, not just built.
