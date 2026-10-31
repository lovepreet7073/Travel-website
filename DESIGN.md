# DESIGN.md: Travel Landing Page

> The visual source of truth for this project. All UI work follows this file.
> Token values live in: `src/index.css` (`@theme` block, see section 11). This file and that one must match.
> Values were extracted from a design screenshot. Verify the exact hex values with the designer or an eyedropper before production.

| | |
|---|---|
| Stack | Vite + React + Tailwind v4 |
| Reference screen | Home: hero + "Explore to destination" section |
| Shared UI folder | `src/components/ui/` (see COMPONENTS.md) |
| Last updated | 2026-09-24 |

## 1. Direction

Warm, friendly and adventurous. A sand-beige background panel, deep teal as the main action color, and copper and yellow as accents. Photography is the hero, with people cut out and framed in bold diamond shapes. White cards with soft shadows sit on top of warm panels. The design is generous with space, uses heavy headings and quiet body text.

## 2. Colors

Use tokens by **role**, never raw values.

| Token | Value | Use for |
|---|---|---|
| primary | `#134E5E` | Main buttons, search button, active chip, links, arrow buttons, quote marks |
| primary-hover | `#0E3D4A` | Hover on primary |
| primary-foreground | `#FFFFFF` | Text and icons on primary |
| accent | `#C6794A` | Logo mark, diamond frame stripes, decorative shapes only |
| highlight | `#F7D15C` | Diamond frame fill, decorative shapes only |
| rating | `#F5B400` | Star ratings only |
| background | `#FFFFFF` | Page background |
| panel | `#F3E8DA` | Hero, about and testimonial section panels |
| surface | `#FFFFFF` | Cards, search bar, stat cards |
| foreground | `#1A1A1A` | Headings, card titles, prices |
| body | `#4F4F4F` | Paragraph text |
| muted-foreground | `#8A8A8A` | Meta text (city, guests, dates), placeholders |
| border | `#E7E2DA` | Outline chips, dividers, outline buttons |
| divider-accent | `#E9B9A0` | Vertical dividers inside the search bar |

Rules:
- **Accent and highlight are decorative.** Never use them for buttons, text or status.
- **Only two text colors in body copy:** `foreground` for titles and `body` or `muted-foreground` for everything else.

Key contrast checks:
- foreground on panel: ~15:1 ✅
- primary-foreground on primary: ~9:1 ✅
- muted-foreground on white: ~3.5:1 (meta text only, never body copy)

## 3. Typography

**Font:** Plus Jakarta Sans. It's a free geometric sans that is close to the design's font. Weights: 400, 500, 700, 800. No other fonts.

| Token | Size / line height | Weight | Use for |
|---|---|---|---|
| text-display | 64px / 1.1 (mobile 40px) | 800 | Hero heading only |
| text-h2 | 36px / 1.2 (mobile 28px) | 800 | Section headings ("Explore to destination") |
| text-h3 | 28px / 1.25 | 700 | Panel headings ("Wite our experience…") |
| text-title | 20px / 1.3 | 500 | Card titles, prices |
| text-body-lg | 18px / 1.6 | 400 | Hero paragraph |
| text-body | 16px / 1.6 | 400 | Section intros, paragraphs |
| text-sm | 14px / 1.5 | 500 | Nav links, chips, buttons, labels |
| text-xs | 12px / 1.4 | 400 | Card meta (city, guests, dates), stat labels |

- Headings are always `foreground` and weight 800 (700 for h3).
- Section intros are `body`, with a max width of about 560px.

## 4. Spacing

**Scale:** 4, 8, 12, 16, 24, 32, 48, 64, 96. Use only these values.

- Page container: max-width 1200px, horizontal padding 24px (mobile 16px)
- Gap between sections: 96px (mobile 64px)
- Section heading → intro: 12px
- Intro → content: 48px
- Card grid gap: 24px
- Card inner padding: 12px (image) and 16px (text area)
- Panel inner padding: 64px (mobile 24px)

## 5. Radius and shadows

| Token | Value | Use for |
|---|---|---|
| radius-sm | 8px | Location tiles, small icon boxes |
| radius-md | 16px | Cards, card images, stat cards |
| radius-lg | 20px | Search bar |
| radius-xl | 40px | Section panels (hero, about, testimonial) |
| radius-full | 9999px | Buttons, chips, arrow buttons, heart button, avatars |
| shadow-card | `0 8px 24px rgb(19 78 94 / 0.08)` | Cards, stat cards, location tiles |
| shadow-float | `0 16px 40px rgb(19 78 94 / 0.12)` | Search bar, floating elements over panels |

## 6. Layout

- **Page structure:** navbar (white, 80px tall) → alternating white sections and beige panels → footer. The same order and navbar on every page.
- **Navbar:** logo on the left, links centered, a menu/profile pill and cart icon on the right.
- **Panels:** full-width beige blocks with `radius-xl`, inset from the page edge. They always contain an image-plus-text layout.
- **Section header:** H2 plus an intro paragraph on the left. Carousel arrows go on the right when the section is a carousel. Centered headers are used only for the "Inspiration" style sections.
- **Grid:**
  - Destination cards: 4 columns desktop / 2 tablet / 1 mobile, gap 24px
  - Location tiles: 6 columns desktop / 3 tablet / 2 mobile
- **Breakpoints:** sm 640, md 768, lg 1024, xl 1280

## 7. Components

Details and variants are in COMPONENTS.md.

- **Button**
  - Primary: `primary` fill, white text, `radius-full`, height 44px, padding 0 24px, `text-sm` 500
  - Outline: `border` outline, `foreground` text
  - Use one primary button per section.
- **IconButton (round)**
  - 44px circle
  - Variants: filled (`primary`), outline (`border`) and on-image (white 90% with a dark icon, used for the heart)
- **SearchBar:** white, `radius-lg`, `shadow-float`, overlapping the bottom edge of the hero panel
  - 4 fields (Location, Check in, Check out, Guests), each with a label (`text-sm` 500 `foreground`) and a value (`text-body` `muted-foreground`)
  - `divider-accent` vertical dividers between the fields
  - A round primary search button on the right
- **DestinationCard:** white, `radius-md`, `shadow-card`, padding 12px
  - Image with 4:3 ratio, `radius-md`, heart IconButton in the top-right corner
  - Row: name on the left (`text-title`), price on the right (`text-title` 700)
  - Meta rows: city and guests, stars and dates (`text-xs` `muted-foreground`, icons 14px)
- **StatCard:** white, `radius-md`, `shadow-card`, centered
  - Icon (24px, `primary`), number (`text-h3` 700), label (`text-xs`)
  - Floats over panel images.
- **Chip (filter tab)**
  - Outline pill (`border`, `muted-foreground`)
  - Active state: `primary` fill with white text
  - Height 32px, `text-sm`
- **LocationTile:** white, `radius-sm`, `shadow-card`, centered
  - Name (`text-sm` `primary`) and region (`text-xs` `muted-foreground`)
- **Testimonial**
  - Large quote mark (`primary`)
  - Quote in `text-body` `body`
  - Stars, then avatar (40px) with name (`text-sm` 700) and location (`text-xs`)
  - Prev/next IconButtons
- **Rating:** 5 stars, 14px, `rating` color, empty stars outlined

### Diamond image frame (brand decoration)

The cut-out person photo sits in front of a rotated square made of layered stripes: `primary`, `accent` and `highlight`. It may include a small plane icon and a dashed curved flight path in white.

- Use it **only** in panels (hero, about, testimonial). Never use it in cards or plain sections.
- Build it once as a shared `DiamondFrame` component.

### States (all interactive components)

| State | Treatment |
|---|---|
| Hover | Primary → `primary-hover`. Outline → `panel` background. Cards lift: shadow-card → shadow-float |
| Focus | 2px `primary` ring with a 2px offset. Always visible when using the keyboard. |
| Active | Slightly darker than hover, no movement |
| Disabled | 50% opacity, `not-allowed` cursor |
| Loading | Spinner replaces the icon, the button keeps its width |
| Error | Input border in danger red `#C0392B` plus a message below in `text-xs` |

## 8. Consistency rules

- Don't invent new colors, fonts, font sizes, spacing, radii or shadows. Use the tokens above.
- Don't use hardcoded values, arbitrary values (for example `p-[13px]`) or inline styles.
- Reuse shared components. Never create page-specific copies (for example `HomeCard`). Add a variant instead.
- Keep the navbar, section-header pattern and panel style the same on every page.
- Before building a new screen, look at the reference screen and reuse its patterns.
- **Imported designs** (screenshots, Stitch, Claude Design): keep their layout, but map every value to these tokens and components. List anything that doesn't map, and ask before adding it.

## 9. Changing the design system

Don't change this file or the tokens just to make a task easier. If the system can't support a requirement:

1. Name the limitation.
2. Propose the change, and check whether an existing pattern can be extended instead.
3. Get approval.
4. Update this file, the tokens and COMPONENTS.md together.

## 10. Enforcement

- Check command: `npm run lint && npm run lint:design`
- Rules: `@shadcn/lint`, with no-raw-colors, no-arbitrary-values, no-inline-styles and no-restyle (allow: layout) all set to error, plus `scripts/check-design.mjs`
- Known gaps: the linter can't judge layout structure or the diamond decoration. Those rely on visual review against the reference screen.

## 11. Tokens (Tailwind v4)

Paste this into `src/index.css`:

```css
@import "tailwindcss";
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap");

@theme {
  --color-*: initial; /* remove Tailwind's default palette */
  --color-white: #ffffff;
  --color-transparent: transparent;

  --color-primary: #134e5e;
  --color-primary-hover: #0e3d4a;
  --color-primary-foreground: #ffffff;
  --color-accent: #c6794a;
  --color-highlight: #f7d15c;
  --color-rating: #f5b400;
  --color-danger: #c0392b;

  --color-background: #ffffff;
  --color-panel: #f3e8da;
  --color-surface: #ffffff;
  --color-foreground: #1a1a1a;
  --color-body: #4f4f4f;
  --color-muted-foreground: #8a8a8a;
  --color-border: #e7e2da;
  --color-divider-accent: #e9b9a0;

  --font-sans: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif;

  --text-display: 4rem;      --text-display--line-height: 1.1;
  --text-h2: 2.25rem;        --text-h2--line-height: 1.2;
  --text-h3: 1.75rem;        --text-h3--line-height: 1.25;
  --text-title: 1.25rem;     --text-title--line-height: 1.3;
  --text-body-lg: 1.125rem;  --text-body-lg--line-height: 1.6;
  --text-body: 1rem;         --text-body--line-height: 1.6;
  --text-sm: 0.875rem;       --text-sm--line-height: 1.5;
  --text-xs: 0.75rem;        --text-xs--line-height: 1.4;

  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 20px;
  --radius-xl: 40px;

  --shadow-card: 0 8px 24px rgb(19 78 94 / 0.08);
  --shadow-float: 0 16px 40px rgb(19 78 94 / 0.12);

  --container-page: 1200px;
}
```
