# COMPONENTS.md

> Companion to `DESIGN.md`. Every shared component, its path, and its variants/sizes.
> Rule: reuse these. Never create page-specific copies — add a variant instead (DESIGN.md section 8).

## src/components/ui/

| Component | Path | Variants | Sizes | States |
|---|---|---|---|---|
| Button | `ui/Button.jsx` | `primary`, `outline`; `as` renders it as another component (e.g. router `Link`) for CTA navigation — same polymorphic pattern as Card's `as` | height 44px (fixed, per DESIGN.md) | hover, focus, active, disabled, loading |
| IconButton | `ui/IconButton.jsx` | `filled`, `outline`, `on-image` | 44px circle (fixed) | hover, focus, active, disabled, loading |
| Chip | `ui/Chip.jsx` | inactive (outline), `active` (primary fill) | height 32px | hover, focus, active, disabled |
| Badge | `ui/Badge.jsx` | `neutral`, `primary`, `danger` — composed from existing tokens only (not in DESIGN.md section 7, no new colors added) | height 24px | static (non-interactive label) |
| Input | `ui/Input.jsx` | text field with `label`; `trailing` slot (a node, e.g. a password show/hide button) shares the loading spinner's position — use one or the other | height 44px | hover (border), focus (primary ring), disabled, loading (trailing spinner), error (danger border + message) |
| Select | `ui/Select.jsx` | native select styled to match Input | height 44px | focus, disabled, error |
| Card | `ui/Card.jsx` | base surface; `interactive` for hoverable/clickable cards | padding 16px default | hover lift (shadow-card → shadow-float) when `interactive`, focus when `interactive` |
| DestinationCard | `ui/DestinationCard.jsx` | single variant, `favorited` boolean toggles heart | image 4:3, card padding 12px, text padding 16px | hover lift, heart IconButton hover/focus |
| StatCard | `ui/StatCard.jsx` | single variant | icon 24px, centered | none (display-only) |
| SearchBar | `ui/SearchBar.jsx` | `fields` array (Location / Check in / Check out / Guests, etc.) | radius-lg, shadow-float | field hover/focus, search IconButton hover/focus/active |
| Rating | `ui/Rating.jsx` | single variant | stars 14px, `max` configurable (default 5) | static (display-only) |
| Testimonial | `ui/Testimonial.jsx` | single variant | avatar 40px | prev/next IconButton hover/focus |
| Modal | `ui/Modal.jsx` | single variant (not in DESIGN.md section 7 — built from surface/radius-lg/shadow-float tokens only, backdrop uses `foreground/50`) | max-w-lg | focus trap via Escape key, close IconButton hover/focus |
| Tabs | `ui/Tabs.jsx` | reuses the Chip visual pattern (not in DESIGN.md section 7) | height 32px per tab | hover, focus, active-selected, disabled |
| DiamondFrame | `ui/DiamondFrame.jsx` | with `image` or custom `children`; `showPlane` toggle | aspect-square | decorative, no interactive states |
| FeatureBlock | `ui/FeatureBlock.jsx` | `variant="card"` (centered icon+title+description in a Card — service/feature grids; `bare` skips the Card surface for spotlighting one card among plain ones) or `variant="row"` (icon in a radius-sm colored square beside the text — step lists); `tone` (`primary`\|`accent`\|`highlight`) picks the row icon square's background, all decorative per DESIGN.md section 2 | row icon square 44px (IconButton's fixed size) | hover/focus only when wrapped by an interactive parent; otherwise static |
| ProgressBar | `ui/ProgressBar.jsx` | single variant, optional `label` | track height 4px (`h-1`), fill width snapped to the nearest Tailwind twelfth (no inline style / arbitrary value) | static (display-only) |
| QuantityStepper | `ui/QuantityStepper.jsx` | single variant (not in DESIGN.md section 7 — built from IconButton `outline` at its fixed 44px size, plus `text-title` for the count; added for traveller/add-on quantity pickers in booking flows) | IconButton's fixed 44px | hover/focus/disabled inherited from IconButton at min/max |
| SectionCard | `ui/SectionCard.jsx` | single variant — numbered label (`text-xs`/muted) + title (`text-title`/medium) above a `Card` | none | inherits Card's static surface |
| PasswordToggle | `ui/PasswordToggle.jsx` | single variant — bare icon button (no border/circle), for `Input`'s `trailing` slot on a password field | icon-only, no fixed container | hover (muted → foreground), focus-visible |

Shared internals (not directly used on pages):

| File | Purpose |
|---|---|
| `ui/cn.js` | Tiny className-join helper used by every component. |
| `ui/icons.jsx` | Inline SVG icon set (star, heart, search, chevrons, close, map pin, users, calendar, plane, quote, play, menu, plus, minus, check, cart, bed, compass, headset, clock, send, eye, eye-off, facebook, google, apple). All use `currentColor` — no raw colors, including the three social-provider glyphs (see "Auth pages" note below). |
| `ui/Spinner.jsx` | Loading spinner used by Button, IconButton, Input. |
| `lib/useMockFetch.js` | Hook simulating an async load (loading/error/success) against local `src/data/` arrays, so data-driven pages get real loading/error/empty states without a backend. |

## src/components/layout/

| Component | Path | Purpose |
|---|---|---|
| Navbar | `layout/Navbar.jsx` | White, 80px tall. Logo left, links centered. Right side defaults to the documented menu pill + cart icon; pass `actions` (a node) to replace it entirely — used site-wide for Login/Sign up buttons since this site has no cart. Nav links use router `NavLink` (active link turns `text-primary`). Same on every page via RootLayout. |
| Footer | `layout/Footer.jsx` | Closes every page. Panel background, brand + link columns + social icon row (uses `/icons.svg` symbols). Internal links use router `Link`. |
| PageContainer | `layout/PageContainer.jsx` | Max-width 1200px (`max-w-page`), horizontal padding 24px / 16px mobile. |
| SectionHeader | `layout/SectionHeader.jsx` | Optional `eyebrow` label (reuses the text-sm/500 "labels" token, section 3) + H2 + intro on the left, optional actions (e.g. carousel arrows) on the right. `align="center"` for Inspiration-style sections. |
| Panel | `layout/Panel.jsx` | Full-width beige (`panel`) block, radius-xl, inner padding 64px / 24px mobile. |
| RootLayout | `layout/RootLayout.jsx` | The route shell: Navbar + `<Outlet/>` + Footer, with the site's logo/nav links/footer columns/login-signup actions wired once. Every route renders inside this — individual pages return only their own content, never Navbar/Footer. |

## Notes on components not detailed in DESIGN.md section 7

DESIGN.md section 7 documents Button, IconButton, SearchBar, DestinationCard, StatCard, Chip, LocationTile, Testimonial and Rating in detail. This setup was asked to also include **Input, Select, Card, Badge, Modal and Tabs**. Since DESIGN.md gives no dedicated spec for these, they were built strictly from:
- existing color/type/radius/shadow tokens (section 11),
- the generic interactive-states table (section 7, "States"),
- and the closest documented sibling pattern (e.g. Tabs reuses Chip's pill styling; Modal reuses the search bar's `radius-lg` + `shadow-float` "floating element" treatment).

No new colors, fonts, sizes, radii or shadows were introduced. One structural (non-visual) token was added to `src/index.css`: `--aspect-4-3: 4 / 3`, needed to build DestinationCard's mandated 4:3 image ratio without an arbitrary Tailwind value — aspect ratio is not one of the restricted categories in DESIGN.md section 8 (colors, fonts, sizes, radii, shadows).

This setup was later asked to build a booking-flow screen (`src/pages/Booking.jsx`, route `/booking/:slug`, resolving either a trip or a hotel by slug — see "Screens build" below): departure/stay-date picker, traveller counts, accommodation choice, add-ons, lead traveller form, sticky price summary. **QuantityStepper** was added the same way — composed only from IconButton and text-title, no new tokens. Four glyphs (`PlusIcon`, `MinusIcon`, `CheckIcon`, `SendIcon`) were added to `ui/icons.jsx` following the existing pattern (currentColor, no raw colors) since none of the existing icons covered increment/decrement/checkmark/send. The booking page's date, room and add-on selection cards reuse documented **states** (DESIGN.md section 7 states table) rather than inventing new visual treatments: selected = the same 2px primary focus-ring treatment made persistent, sold-out = the documented Disabled state (50% opacity, not-allowed cursor), and the "X left" / "Sold out" tags reuse Badge's existing `neutral`/`danger` variants.

`LocationTile` (listed in DESIGN.md section 7) was **not** built — it wasn't in this task's requested component list. Add it as a follow-up before any page uses location tiles.

## Screens build (React Router shell + pages)

Building out the actual site (Home, Destinations, Hotels, Flights, booking, account and content pages) against a Jadoo-template screenshot (layout reference only — no colors/fonts/spacing/copy/images carried over; brand name "Wandera"). Two more gaps came up and were approved before building:

- **FeatureBlock** (see row above) — the screenshot's services grid and 3-step list both needed an icon+title+description block, which nothing in the system covered.
- **ProgressBar** (see row above) — a floating "trip 40% completed" card needed a progress indicator, which didn't exist.
- **Navbar's `actions` override** (see row above) — DESIGN.md's navbar spec is "menu pill + cart," but this site has real `/login` and `/signup` routes and no cart, so the default right-side content is now replaceable.
- **Button's `as` prop** — added so Button can render as router `Link` for CTAs (`Button as={Link} to="/...">`), matching the polymorphic pattern Card already used for `as`.

`RootLayout` (see row above) was added so every route shares one Navbar/Footer/PageContainer wiring instead of each page re-declaring it.

### Home fidelity pass

After the first build, asked for tighter visual fidelity to the reference screenshot's proportions/spacing (still no colors/fonts/copy/images copied — only DESIGN.md tokens). Changes, all composed from existing tokens:
- **SectionHeader's `eyebrow` prop** (see row above) — every section in the reference has a small label above its heading; this reuses the existing text-sm/500 "labels" token rather than introducing a new type size.
- **FeatureBlock's `bare` prop** (see row above) — the reference spotlights one service card (elevated, shadowed) among three plain ones; `bare` lets a `variant="card"` instance skip the Card surface so Home can mix both in the same grid without hand-duplicating FeatureBlock's markup.
- Small decorative flourishes on Home only (dot-grid, a soft accent-colored blob behind the spotlighted card, a dashed swirl near the destinations grid) — all built from existing tokens at reduced opacity (e.g. `bg-accent/20`), the same alpha-modifier pattern already used by IconButton's on-image variant and Modal's backdrop. These aren't reusable components, just page-local decoration, since DESIGN.md doesn't name them as a pattern beyond DiamondFrame's own stripes/plane/path.
- Navbar's `actions` on this site render Login/Sign up as Buttons (see "Navbar fidelity pass" below for the current outline/primary pairing — this changed again after a second reference screenshot).
- Top destinations grid changed from 4 columns to 3 to match the reference's trio, still within DESIGN.md's documented "Destination cards: 4 columns desktop / 2 tablet / 1 mobile" as a maximum, not a fixed count.

### Auth pages (Login / SignUp)

First pass matched a split form/image login reference. **Superseded by "Auth pages, take 2" below** — kept here for the parts that are still true.

- **Input's `trailing` prop** (see row above) — added for the password show/hide toggle; a plain unstyled icon button (`text-muted-foreground` → `text-foreground` on hover), not IconButton, since it needs to sit inside the input's 44px height without its own border/circle chrome.
- **Eye / EyeOff icons** — added to `ui/icons.jsx` for the toggle, same currentColor pattern as every other icon.
- `Facebook`/`Google`/`Apple` icons and the social-provider button row from this pass were **removed** in take 2 (the chosen reference didn't have social login) — the icons stay exported in `ui/icons.jsx` in case a later screen wants them, just unused for now.
- "Forgot password?" has no destination screen in this task's scope, so it's a button that reveals an inline mock confirmation message rather than a dead link.

### Navbar fidelity pass + hero correction

A third reference screenshot (a floating rounded-pill navbar) came with explicit feedback that the Home hero still didn't match the earlier Jadoo reference closely enough. Two fixes:

- **Navbar is now a floating pill**, not the edge-to-edge bar DESIGN.md section 6 literally describes: `sticky` header with page-edge padding, and inside it a `max-w-page` bar with `rounded-full`, `border-border`, `shadow-float`, `bg-white` — all existing tokens, just applied to the nav container itself instead of a page section. This is a real deviation from DESIGN.md's literal navbar description (a plain white 80px bar); if kept, section 6 should be updated to match (section 9's process). Its content (logo/links/actions) is unchanged, so `RootLayout`'s usage didn't need to change beyond the actions below.
- **Navbar's `actions` are now both Buttons** — `Log in` (`outline`) and `Sign up` (`primary`) — matching this reference's light-button + solid-button pairing, replacing the previous plain-link + outline-button pairing from the Golobe-inspired pass. `Sign up` being `primary` alongside Home's own `primary` "Find out more" CTA is a small tension with DESIGN.md's "one primary button per section" rule; treated as acceptable since Navbar is persistent chrome, not part of any one page section.
- **Home's hero no longer wraps the text column in `Panel`** — only the image column does now (`Panel` sized to just the `DiamondFrame`, `p-6 sm:p-8`), matching the Jadoo reference's actual color-blocking (text on the plain page background, beige only behind the photo) instead of the earlier single-Panel-wraps-everything reading of DESIGN.md section 6's "panels... contain an image-plus-text layout." `DiamondFrame` itself is unchanged — DESIGN.md explicitly names hero as one of its three intended contexts.

### Auth pages, take 2

Two more login/signup references came in (a centered-card minimal-input style, and a two-panel card with a text-overlay travel photo). Picked the second — its boxed inputs already match our `Input` component, versus the first reference's borderless underline-input style, which would've needed a whole new Input visual treatment. Then corrected further: no extra decorative background around the card — just `PageContainer` → one `overflow-hidden rounded-xl shadow-float` card, `grid lg:grid-cols-2`, form panel left / photo panel right. The photo itself is "the travel element," not a color substitute for one.

- Photo panel uses real `destinations.js` images (Santorini for Login, Bali for SignUp) rather than generic placeholder photos, for both authenticity and continuity with the rest of the site.
- Text overlay for legibility: `bg-gradient-to-t from-foreground/80 to-transparent` behind white (`text-white`) copy — reuses the `foreground` token at reduced opacity via Tailwind's gradient utility, the same alpha-token pattern used elsewhere (Modal's backdrop, IconButton's on-image variant), not a new color. Emphasis on part of the line is weight-only (`font-extrabold`), never a color swap, since `accent`/`highlight` can't be used for text.
- Small circular logo-style badge (`bg-white/90`, on-image treatment) top-right of the photo, holding a plane/compass icon — decorative brand mark, same corner-badge idea as the reference.
- No social-login row this time (dropped from take 1 — this reference doesn't have one); `Remember me` / `Forgot password?` (Login) and the Terms checkbox (SignUp) carried over unchanged.

### Navbar reverted, hero decoration removed

Two corrections: the floating-pill Navbar was undone — `Navbar.jsx` is back to the plain edge-to-edge white 80px bar DESIGN.md section 6 describes (using `PageContainer` again internally), since that floating treatment was never adopted into DESIGN.md itself and wasn't wanted after all.

Home's hero image was also still showing `DiamondFrame` (the layered primary/accent/highlight diamond stripes) and its `Panel` (beige) backdrop, which wasn't wanted either — removed both. The hero now shows a single plain photo: `rounded-md`, `shadow-card` (same tokens as a card image), no decorative shape or colored background behind it. Pulled from `destinations.js` (Kyoto) rather than a random placeholder photo, so it's genuinely travel-related — Login/SignUp already do the same with Santorini/Bali, so all three now draw from real site content instead of generic stock images.

A structural (non-visual) token was added to `src/index.css` for this, same category as `--aspect-4-3`: a portrait ratio for the hero image, applied at every breakpoint (not just mobile) — avoids an arbitrary pixel height while still giving the image real height (grid `items-stretch` then centers the text column to match). Requested shorter four times in a row: `--aspect-3-4` → `--aspect-4-5` → `--aspect-5-6` → now plain Tailwind `aspect-square` (1:1), at which point the custom token was removed entirely — `aspect-square` is one of Tailwind's built-in utilities, not something namespaced under `--aspect-*`, so no theme entry is needed for it.

`DiamondFrame` is unchanged and still used on `About.jsx` (one of DESIGN.md's three named contexts for it), so it isn't an orphaned component — just no longer used on Home.

### Mock image sources: picsum.photos, but the verified numbered catalog

`picsum.photos`'s `/seed/<name>/` only makes the random pick *deterministic* per seed — the seed text has no bearing on actual photo content (a `wandera-rome` seed could return, and did return, an unrelated product photo).

First fix attempt swapped every mock image to `loremflickr.com` (keyword-matched placeholders) and `i.pravatar.cc` (face placeholders). Pravatar worked and stayed. **Loremflickr had to be reverted** — it serves a JavaScript "bot check" challenge page to non-browser requests, confirmed via curl (a real 401 from `loremflickr.com` itself, HTML titled "Bot check", not a network-level block). Since `<img src>` requests are passive subresource fetches with no JS execution context, that challenge would never resolve for an embedded image the same way it might for a full page load — the images would show as broken in every visitor's browser, not just in testing.

What actually shipped instead: picsum.photos' numbered catalog, `/id/<n>/w/h` (a fixed, non-random photo per id, unlike `/seed/`). Each id used across `src/data/*.js`, `Home.jsx`, and `About.jsx` was downloaded and **visually inspected** (via the Read tool's image support) before being committed, screening out non-travel shots (a coffee pour-over, a lion portrait, a bird in flight all turned up in the same sampling batch and were excluded). The verified set — landscapes, coastlines, mountains, a city skyline, forests — is reused thematically: Santorini/Bali destinations and hotels use the coastal/cliff photos, Kyoto uses the misty-forest ones, Rome/London/Europe use the city and highland shots, and Home's hero uses a dedicated skyline shot not tied to any one destination's own photo.

Lesson for future mock-data additions in this repo: don't add an unauthenticated placeholder-image service without first curling it (checking for non-200 status, and for challenge/interstitial HTML disguised as a success-looking response) — a service being reachable in a browser tab is not the same as it working for programmatic `<img>` embeds.

### design-consistent full check (2026-09-30)

Ran a full `check` pass (lint + code review + Playwright visual audit across all 16 routes at desktop 1280 / mobile 390) via the `design-consistent` skill. Findings and outcomes:

- **Font never actually loaded, site-wide** — `src/index.css`'s Google Fonts `@import url(...)` was silently dropped by Vite's CSS pipeline: `@import "tailwindcss"` expands into real CSS rules before Lightning CSS's final pass, which pushes the font `@import` out of valid leading position (CSS requires all `@import`s before other rules) and it gets dropped rather than erroring — visible the whole session as an easy-to-dismiss `@import rules must precede all rules` build warning, but the real effect was every page rendering in the browser's fallback sans-serif instead of Plus Jakarta Sans. **Fixed**: font now loads via `<link>`/`<link rel="preconnect">` tags in `index.html`, independent of CSS import ordering. Verified via `document.fonts` (now reports all 4 weights `loaded`, previously empty).
- **`index.html`'s `<title>`** was leftover placeholder text, `Package Details — Callback Modal`, present since before this design-system work started, never touched. **Fixed** → `Wandera — Travel, enjoy and live a new and full life`.
- **Kyoto / Gion Machiya Inn used the wrong photo** — picsum id `1024`, mislabeled "misty forest" during the original curation pass, is actually a vulture in flight (also present as a gallery photo on London / Notting Hill Townhouse). **Fixed**: every `1024` reference swapped to `1039` (re-verified: a waterfall in misty forest), across both `image` and `gallery` fields in `destinations.js` and `hotels.js`.
- **`FlightsResults.jsx`: stops Badge stretched full-width on mobile** — its wrapping `flex flex-col` had no `items-start`, so the flex-item Badge stretched to the column's full width once the layout stacked at narrow widths. **Fixed**: added `items-start`.
- **`SectionCard` duplicated** (byte-for-byte) in `Booking.jsx` and `FlightBooking.jsx`. **Fixed**: extracted to `ui/SectionCard.jsx` (see row above); both pages now import it.
- **`PasswordToggle` duplicated** (byte-for-byte) in `Login.jsx` and `SignUp.jsx`. **Fixed**: extracted to `ui/PasswordToggle.jsx` (see row above); both pages now import it.
- **`SearchBar` was fully built to DESIGN.md section 7's spec but never placed anywhere** — DESIGN.md's own reference screen description ("Home: hero + ...") explicitly calls for it "overlapping the bottom edge of the hero panel." **Fixed**: added to Home's hero, positioned with a negative top margin (`-mt-8 sm:-mt-12`) so it overlaps the hero image's bottom edge, matching the spec. Its 4 fields (Location / Check in / Check out / Guests) and the search button all navigate to `/destinations` — no date/guest picker modals are in scope, so every action shares the one real destination.

No console errors found on any of the 16 routes at either viewport. The two intentionally-triggered empty/error states (`/destinations/nonexistent-place`, `/flights/results?from=Nowhere&to=Nowhere`) both render the same styled Card-based empty-state pattern used elsewhere, not a raw blank screen.

### Animations + hover/shadow polish, and a real bug it surfaced

Asked to add motion throughout the site and more visual depth (the UI "felt all white"). Two kinds of change:

- **`ui/Reveal.jsx`** (new, see row above) + **`lib/useInView.js`** — a one-shot scroll-triggered fade/slide-up, built only from `opacity`/`translate`/`transition` utilities (motion isn't one of DESIGN.md section 8's restricted categories — colors, fonts, sizes, radii, shadows — so this needed no approval). Staggering uses Tailwind's standard `delay-0/75/150/200/300/500` classes, never an arbitrary value. A `prefers-reduced-motion` media query in `index.css` disables all of it for users who've asked for reduced motion. Applied across all 16 pages — every section header, card grid (staggered), and form block.
- **`Card`** now has a `border-border` edge by default (previously just `shadow-card`, nothing to define its edge against a white page) and `interactive` cards get a real hover-lift — `shadow-card → shadow-float` plus a 4px upward `translate` — a literal reading of DESIGN.md section 7's "Cards lift" hover state, which was shadow-only before (no actual movement). Cascades everywhere `Card`/`DestinationCard` is used.

**Adding that border surfaced a real, pre-existing bug**: every clickable `DestinationCard` (rendered `as={Link}`, used on Home/Destinations/Hotels) showed stray corner-shaped border fragments floating above and beside the card instead of one clean rounded rectangle. Root cause: `Card`'s base classes never set an explicit `display`, and an `<a>` tag defaults to CSS `display: inline` — inline elements don't establish a proper block box, so inside a CSS Grid with default stretch-alignment and card content taller than the grid's row, the border/background followed broken inline line-boxes instead of the element's actual rectangle. This bug predates the animation work (Card never had `display` set), it just wasn't visually obvious without a border to reveal it. **Fixed**: added `block` to Card's base classes, so it always establishes a block box regardless of what `as` renders it as. Verified via `getBoundingClientRect()` before/after (child and parent heights matched exactly after the fix, vs. a 29px symmetric mismatch before) and visually across Home, `/destinations` and `/hotels`.
