# Focus Order Documentation

WCAG 2.4.3 (Focus Order — Level A) requires that the sequence in which elements receive focus preserves meaning and operability. Eventide uses **pure DOM-order tab sequence** — no `tabIndex` overrides (positive `tabIndex` values), which is the correct approach. The order below is what a keyboard-only user experiences pressing `Tab` repeatedly, verified against the actual JSX order in `src/App.tsx`.

Legend: 🆕 = only reachable by keyboard after the fixes in `CHANGELOG-accessibility-fixes.md`.

## Listing Screen (`ListingScreen`) — top to bottom

| # | Element | Element type | Notes |
|---|---|---|---|
| — | (recommended: Skip-to-content link) | `<a>` | Not yet implemented — see audit finding M3 |
| 1 | Search field | `<input>` | Hidden below `sm` breakpoint — not focusable/visible on mobile (see audit M1) |
| 2 | Dark/Light mode toggle | `<button>` | Icon-only, now has `aria-label` + `aria-pressed` |
| 3 | "+ Create Event" | `<button>` | Primary CTA |
| 4–8 | Category pills: All → Music → Conference → Festival → Experience | `<button>` × 5 | Now expose `aria-pressed` for the active category |
| 9–11 | View mode: Grid → Compact → List | `<button>` × 3 | Now expose `aria-pressed` |
| 12 | "Replay" (skeleton demo trigger) | `<button>` | Dev-facing showcase control |
| 13+ | Event cards, in grid/list order (left→right, top→bottom) | 🆕 `role="button"` `div`, `tabIndex=0` | **Previously unreachable by keyboard** — now focusable in natural reading order, Enter/Space opens details |
| N | Small-variant showcase cards | 🆕 same as above | Bottom "Card Component Showcase" section |
| N+1 | List-variant showcase cards | 🆕 same as above | |

**Logo** ("EV" mark + "Eventide" wordmark) is not focusable — correct, it's not currently a link (no home route to return to besides the listing screen itself, which is the default view).

## Details Screen (`DetailsScreen`) — top to bottom

| # | Element | Element type | Notes |
|---|---|---|---|
| — | (recommended: Skip-to-content link) | `<a>` | Not yet implemented |
| 1 | "← Back to events" | `<button>` | Has visible text, already accessible |
| 2 | Save (heart) | `<button>` | 🆕 `aria-label` + `aria-pressed` added |
| 3 | Share | `<button>` | 🆕 `aria-label` added |
| 4 | Dark/Light mode toggle | `<button>` | 🆕 `aria-label` + `aria-pressed` added |
| 5 | "Follow" (organizer) | `<button>` | Secondary button, visible text |
| 6 | Decrease ticket quantity (−) | `<button>` | 🆕 `aria-label="Decrease ticket quantity"`, disables at min (1) |
| 7 | Increase ticket quantity (+) | `<button>` | 🆕 `aria-label="Increase ticket quantity"`, disables at max (10) |
| 8 | "Buy Tickets" / "Register for Free" / "Sold Out" | `<button>` | Primary CTA, disabled natively when sold out (correctly skipped by screen readers when disabled) |
| 9–11 | Related event cards (up to 3) | 🆕 `role="button"` `div`, `tabIndex=0` | **Previously unreachable** — now focusable, Enter/Space navigates back with that event selected |

## Design intent notes for developers

1. **Ticket quantity buttons only render when the event is paid and not sold out** (`!soldOut && event.priceRaw > 0`) — the focus order above reflects the paid-event path. For free events, focus skips straight from "Follow" to the "Register for Free" button. For sold-out events, the quantity stepper is also absent and the CTA is a disabled "Sold Out" button (still reachable by Tab, but not activatable — this matches native `<button disabled>` behavior and is correct per WCAG).
2. **The map placeholder is not, and should not be, focusable.** It's decorative (`<svg>` grid pattern) with real venue text already present as static content above it — no interactive map library is wired up yet.
3. **Sticky elements** (header, ticket panel) don't trap focus — verified there's no `overflow: hidden` + custom scroll container that would break native Tab behavior.
4. **Focus-visible styling**: the app relied on browser-default focus rings prior to this pass. Newly-keyboard-accessible cards and the pill/toggle buttons now use a consistent `focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ring)] focus-visible:outline-offset-2` so the focus indicator matches the brand accent color instead of the OS default blue — this keeps focus visibility (WCAG 2.4.7) consistent across the whole click surface, not just form fields.
