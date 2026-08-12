# Eventide — Scalable Events App with Design Token System

A fully token-driven Events App built with React, Vite, and Tailwind CSS v4. Designed for rebrandability — swap the token values in one file and the entire UI updates across Light and Dark mode instantly.

## Live Features

- **Event Listing Screen** — searchable, filterable grid with category pills and view mode switcher (Grid / Compact / List)
- **Event Details Screen** — full hero, meta grid, attendee capacity bar, sticky ticket purchase panel, and related events sidebar
- **Light / Dark Mode** — one toggle, zero hardcoded hex values anywhere in component code
- **Skeleton Loader** — shimmer animation for every card variant while data is fetching
- **Card Component** — three variants: Medium (grid), Small (compact), List View

---

## Design System

### Atomic Design Hierarchy

```
Atoms
  Button        (primary / secondary / ghost) × (sm / md / lg)
  Badge         going | sold-out | free | paid | featured
  Tag           category label
  Avatar        image or initials fallback
  Divider       hairline rule

Molecules
  Skel          skeleton shimmer block
  AttendeeBar   capacity progress bar
  RelatedCard   mini horizontal card

Organisms
  EventCard     variant: medium | small | list  +  loading skeleton state
  ListingScreen full listing page with filters
  DetailsScreen full detail page with ticket panel
```

### Semantic Design Tokens

All colors are referenced as CSS custom properties — **no raw hex codes in component code**.

| Token | Role |
|---|---|
| `--primary-action-bg` | CTA button background |
| `--background` | Page background |
| `--card` | Card / panel surface |
| `--text-heading` | Primary heading text |
| `--text-body` | Body copy |
| `--text-subdued` | Labels, captions, metadata |
| `--muted` | Subdued surface (inputs, pills) |
| `--border` | Hairline rules and outlines |
| `--skeleton-base` | Skeleton loader base color |
| `--skeleton-shine` | Skeleton loader shimmer highlight |
| `--badge-going-bg/fg` | "Going" badge surface + text |
| `--badge-sold-bg/fg` | "Sold Out" badge surface + text |
| `--badge-free-bg/fg` | "Free" badge surface + text |

Tokens are defined in `src/index.css` under `:root` (light) and `.dark` (dark). To rebrand, edit only those two blocks.

---

## Skeleton Loader

Each card variant has a matching skeleton that mirrors the real card's layout — same image height, same text block positions — preventing layout shift on load.

```
EventCard  loading={true}
  ├── variant="medium"  →  image rect + date + title + tags + CTA
  ├── variant="small"   →  image rect + title + two tag pills
  └── variant="list"    →  thumbnail + three text lines + button
```

The shimmer is a CSS gradient animation driven by `--skeleton-base` and `--skeleton-shine` tokens, so it automatically respects dark mode. Trigger it via the **Replay** button or by switching category filters.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 19 |
| Build tool | Vite 8 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Language | TypeScript 5.7 |
| Fonts | Outfit (sans) + JetBrains Mono (labels/data) via Google Fonts |
| Images | Unsplash (CDN, no API key required) |

---

## Project Structure

```
src/
  App.tsx        # All components: atoms → molecules → organisms → screens
  index.css      # Design tokens (:root + .dark) + Tailwind import + skeleton animation
  main.tsx       # React entrypoint
index.html       # Vite HTML shell
vite.config.ts   # Vite + Tailwind v4 + React plugin
```

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

Requires Node.js 20+ and pnpm.

---

## Rebranding in 6 Months

Because every color is a semantic token, a rebrand is a single-file edit:

1. Open `src/index.css`
2. Update the values in `:root` (light theme) and `.dark` (dark theme)
3. Done — no component files need to change

---

## Screenshots

| Listing — Light | Listing — Dark |
|---|---|
| Grid, Compact, and List card variants | Same layout, tokens swap automatically |

| Details — Light | Skeleton Loader |
|---|---|
| Sticky ticket panel + related events | Shimmer state while data fetches |

---

## License

MIT
