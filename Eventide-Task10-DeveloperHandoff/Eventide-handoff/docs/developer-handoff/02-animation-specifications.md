# Animation & Motion Specifications

All motion in Eventide is CSS-driven (Tailwind transition utilities + two hand-written `@keyframes` blocks in `index.css`). No JS animation libraries are used, which keeps this cheap to reimplement in any stack. Every entry below cites the exact class or inline style in the source.

## Easing curve reference

| Name | Cubic-bezier | Where it's used |
|---|---|---|
| Tailwind default ease (`transition-all`, `transition-colors` with no explicit easing class) | `cubic-bezier(0.4, 0, 0.2, 1)` | Card hover, button hover, pill/toggle state changes |
| `ease` (CSS keyword, used explicitly in inline styles) | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Theme transition, capacity bar fill |
| `ease-in-out` | `cubic-bezier(0.42, 0, 0.58, 1)` | Skeleton shimmer loop |

## Global

| Interaction | Property | Duration | Easing | Source |
|---|---|---|---|---|
| Light/Dark theme switch | `background-color`, `color`, `border-color` | 250ms (bg), 200ms (color/border) | `ease` | `.transition-theme` class, `index.css` — applied at the root `<div>` of the app plus every `min-h-screen` screen wrapper |

## Buttons (atom)

| Interaction | Property | Duration | Easing | Source |
|---|---|---|---|---|
| Hover / state change | `all` (bg-color primarily) | 150ms | Tailwind default | `Button` component, `transition-all duration-150` |
| Press (active) | `transform: scale(0.98)` | inherits 150ms | Tailwind default | `active:scale-[0.98]` on primary variant only |

## Event Card (organism) — Grid & Compact variants

| Interaction | Property | Duration | Easing | Source |
|---|---|---|---|---|
| Hover (border + shadow) | `all` | 200ms | Tailwind default | `transition-all duration-200` on card container |
| Hover shadow intensity | inline `boxShadow` swap | driven by the 200ms container transition | Tailwind default | `hovered` state toggles `0 8px 32px rgba(0,0,0,0.12)` |
| Image zoom on hover | `transform: scale(1.04)` | **500ms** | Tailwind default | `transition-transform duration-500` — deliberately slower than the card border for a subtle parallax-like effect |

## Event Card — List variant

| Interaction | Property | Duration | Easing | Source |
|---|---|---|---|---|
| Hover (border + shadow) | `all` | 200ms | Tailwind default | same pattern as grid variant, inline shadow `0 4px 24px rgba(0,0,0,0.10)` |

## Category pills / View-mode toggle / Save & Share icon buttons

| Interaction | Property | Duration | Easing | Source |
|---|---|---|---|---|
| Selected state swap | `all` / `colors` | 150ms (Tailwind default, no explicit duration class) | Tailwind default | `transition-all` / `transition-colors` with no `duration-*` override |

## Attendee capacity bar

| Location | Property | Duration | Easing | Source |
|---|---|---|---|---|
| Card variant (`AttendeeBar`) | `width` (via `transition-all`) | 150ms default | Tailwind default | small inline bar next to Reserve button |
| Details screen (large bar) | `width` | **600ms**, explicit inline `transition: "width 0.6s ease"` | `ease` | this is the one place the app hand-rolls a CSS transition string instead of a Tailwind utility — worth keeping consistent if refactored |

## Skeleton loader (loading state)

| Property | Value | Source |
|---|---|---|
| Animation | `background-position: -400px 0 → 400px 0` | `@keyframes skeleton-shimmer`, `index.css` |
| Duration | **1.4s**, `infinite` loop | `.skeleton { animation: skeleton-shimmer 1.4s ease-in-out infinite; }` |
| Easing | `ease-in-out` | same rule |
| Trigger | `loading` prop on `EventCard`; toggled by the "Replay" button or a category-filter change (`simulateLoad()`, 1800ms fake fetch) | `ListingScreen` |

## Reduced-motion behavior (added in this handoff pass)

A `prefers-reduced-motion: reduce` media query has been added to `index.css` (see `CHANGELOG-accessibility-fixes.md`) that collapses all `animation-duration` / `transition-duration` to effectively `0` for users who have this OS-level accessibility preference set. This satisfies WCAG 2.3.3 (Animation from Interactions, AAA best-practice) without requiring any component-level changes — it's a single global override.

## Implementation note for the dev handing this off to native (iOS/Android)

None of these durations are exotic — they map cleanly to standard platform curves:
- 150ms/200ms "quick" interactions → `UIView.animate` `easeInEaseOut` / Android `FastOutSlowInInterpolator`
- 500ms/600ms "settle" transitions (image zoom, capacity bar fill) → standard `easeInOut`
- The 1.4s shimmer loop is the only one that needs a genuinely looping animation primitive (`CAKeyframeAnimation` repeat / `ObjectAnimator.setRepeatCount(INFINITE)`)
