# CLAUDE.md

## Design system

- **`DESIGN.md` is the only source of design truth.** Read it before any UI work.
- Token values live in `src/index.css` (`@theme` block). `DESIGN.md` section 11 and that file must always match.
- Shared components live in `src/components/ui/` and `src/components/layout/`. Every component is listed in `COMPONENTS.md` with its path, variants and sizes — reuse them, never create a page-specific copy (e.g. no `HomeCard`); add a variant instead.
- Use tokens by **role**, never raw values: colors, fonts, font sizes, spacing, radii and shadows all come from the tokens in `DESIGN.md` section 11 / `src/index.css`. Don't invent new ones.
- `accent` and `highlight` are decorative only (logo mark, diamond frame stripes) — never use them for buttons, text or status.
- No hardcoded values, arbitrary Tailwind values (e.g. `p-[13px]`), or inline styles.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96 — no other spacing values.
- Before building a new screen, look at the reference screen (Home: hero + "Explore to destination") and reuse its patterns: navbar → alternating white sections / beige panels → footer.
- **Imported designs** (screenshots, Stitch, Claude Design, etc.): keep the layout, but map every value to existing tokens and components. List anything that doesn't map, and ask before adding it.
- Don't change `DESIGN.md`, the tokens, or `COMPONENTS.md` to make a task easier. If the system genuinely can't support a requirement: name the limitation, propose a change (check if an existing pattern can be extended first), get approval, then update `DESIGN.md`, the tokens and `COMPONENTS.md` together.

**Check command:** `npm run lint && npm run lint:design`

`lint:design` runs `scripts/check-design.mjs`, which scans `src/` for raw hex/rgb colors, arbitrary Tailwind bracket values, and inline `style=` usage outside of the token system. It can't judge layout structure or the diamond decoration — those rely on visual review against the reference screen.
