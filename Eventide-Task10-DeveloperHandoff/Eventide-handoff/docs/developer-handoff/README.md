# Eventide — Developer Handoff Package (Task 10)

This folder is the handoff bridge between the **Task 9 design** (`Eventide` — the token-driven Events App in `/Design Event Details Screens`) and the engineers who have to build it. Everything here is derived directly from the shipped source (`src/App.tsx`, `src/index.css`) — not redrawn from a Figma file — so every number is verifiable by opening the code next to this doc.

> "A beautiful design that developers can't build — or blind users can't see — is useless."
> This package exists to close both gaps.

## What's in here

| Doc | Purpose |
|---|---|
| [`01-spacing-annotations.md`](./01-spacing-annotations.md) | Every padding/margin/gap value used across both screens, mapped to px, grouped by component |
| [`02-animation-specifications.md`](./02-animation-specifications.md) | Every transition/animation in the app: duration, easing curve, trigger, and purpose |
| [`03-accessibility-audit.md`](./03-accessibility-audit.md) | Full WCAG 2.1 AA audit: what passes, what fails, severity, and fixes |
| [`04-focus-order.md`](./04-focus-order.md) | Tab order documentation for both screens (keyboard-only walkthrough) |
| [`05-color-contrast-report.md`](./05-color-contrast-report.md) | Computed contrast ratios (WCAG formula) for every text/background token pair, light + dark |
| [`06-user-story-search-filter.md`](./06-user-story-search-filter.md) | **Bonus** — user story + acceptance criteria for the Search + Filter logic |
| [`CHANGELOG-accessibility-fixes.md`](./CHANGELOG-accessibility-fixes.md) | Code-level a11y fixes already applied to `App.tsx` / `index.css` in this handoff pass |

## Audit method

Colors weren't eyeballed. Contrast ratios in `05-color-contrast-report.md` were computed programmatically from the exact hex values in `src/index.css` (`:root` and `.dark` blocks) using the WCAG relative-luminance formula (`(L1 + 0.05) / (L2 + 0.05)`). Spacing and animation values were extracted directly from the Tailwind utility classes and inline styles in `src/App.tsx` — nothing here is estimated.

## Scope

Two screens, both audited:
- **Listing Screen** (`ListingScreen` in `App.tsx`) — search, category filters, view-mode switcher, event grid/list, skeleton loading state
- **Details Screen** (`DetailsScreen` in `App.tsx`) — hero, meta grid, description, organizer, attendance bar, sticky ticket panel, related events

Both Light and Dark theme are audited (tokens swap via the `.dark` class on `<html>`).
