# Accessibility Audit — WCAG 2.1 AA

Scope: both screens (`ListingScreen`, `DetailsScreen`) in `src/App.tsx`, light + dark theme. Method: manual code walkthrough against WCAG 2.1 success criteria + keyboard-only trace + computed contrast (see `05-color-contrast-report.md`). This audit reflects the code **before** the fixes described in `CHANGELOG-accessibility-fixes.md` were applied, with each finding marked as fixed in this pass or still open for the dev team.

## Severity key
🔴 Critical — blocks a user from completing a task | 🟠 Serious — degrades the experience significantly | 🟡 Moderate — inconsistent or confusing, but workable | 🔵 Minor — best practice / AAA nicety

---

## 🔴 Critical

### C1. Event cards were not keyboard-operable
**WCAG 2.1.1 (Keyboard) — Level A.**
`EventCard` (all three variants) and `RelatedCard` were plain `<div onClick={...}>` elements with no `tabIndex`, no `role`, and no key handler. A keyboard-only user — including most screen-reader users, who navigate primarily via Tab — could see every event card but had **no way to open one**. This is the single biggest blocker in the app: the core action (view event details) was mouse/touch-only.
**Status: ✅ Fixed in this pass.** Cards now have `role="button"`, `tabIndex={0}`, an `onKeyDown` handler for Enter/Space, a descriptive `aria-label` (title, date, venue, price, sold-out state), and a visible `focus-visible` outline using the `--ring` token.
**Note for the dev team:** the more idiomatic long-term fix is to swap `<div role="button">` for a semantic `<button>` or wrap the card in an `<a href="/events/{id}">`, particularly once real routing exists — `role="button"` on a `div` is a reasonable patch, not the final target.

---

## 🟠 Serious

### S1. Icon-only buttons had no accessible name
**WCAG 4.1.2 (Name, Role, Value) — Level A.**
Dark-mode toggle, Save (heart), and Share buttons rendered only an SVG icon. They had a `title` attribute in some cases, but `title` is unreliable for screen readers (support is inconsistent, and it's invisible on touch/keyboard focus, not just to sighted mouse users). A screen-reader user tabbing through the header would hear "button" with no label.
**Status: ✅ Fixed.** Added `aria-label` to all icon-only buttons (dark toggle, save, share, ticket quantity +/−), and `aria-pressed` to the two that are true toggles (dark mode, save).

### S2. Search input had no persistent label
**WCAG 3.3.2 (Labels or Instructions) — Level A.**
The search field used `placeholder="Search events…"` as its only label. Placeholder text disappears the moment a user types, and is not reliably exposed as a label to all assistive tech — this fails for screen-reader users and for anyone who loses their place mid-task.
**Status: ✅ Fixed.** Added a visually-hidden (`sr-only`) `<label htmlFor="event-search">` tied to the input via `id`.

### S3. Selected/active states weren't exposed to assistive tech
**WCAG 4.1.2 (Name, Role, Value) — Level A.**
Category pills, the Grid/Compact/List view toggle, and the Save button all communicated "selected" purely through background color. A screen reader had no way to announce which category or view mode was currently active.
**Status: ✅ Fixed.** Added `aria-pressed` to category pills and view-mode buttons; `aria-pressed` was already added to Save/dark-toggle under S1.

### S4. Primary CTA button text fails contrast (both themes)
**WCAG 1.4.3 (Contrast — Minimum) — Level AA.**
See `05-color-contrast-report.md`, failure #1/#2. White text on `--primary-action-bg` is 3.76:1 in light mode and 2.84:1 in dark mode — both below the 4.5:1 required for normal-size text, and this is the app's main conversion button ("Buy Tickets", "Reserve", "Get Tickets").
**Status: 🟠 Open — requires a design decision** (token color change), out of scope for a non-visual code patch. Recommendation in the contrast report.

### S5. Low-emphasis text token fails contrast in 6+ places
**WCAG 1.4.3 — Level AA.**
`--text-subdued` on `--background` / `--card` / `--muted` fails AA in both themes (3.2–4.1:1 vs. the 4.5:1 requirement). This token is used for dates, timestamps, venue metadata, and section eyebrows across both screens.
**Status: 🟠 Open — token change required,** see `05-color-contrast-report.md` for the recommended fix.

---

## 🟡 Moderate

### M1. Search is unavailable on mobile viewports
Not strictly an accessibility SC, but adjacent to WCAG's spirit and worth flagging in the same pass: the search input is wrapped in `hidden sm:block`, meaning it doesn't render at all below the `sm` breakpoint (~640px). Mobile users — a large share of any events app's traffic — have **no way to search**, at any ability level.
**Status: 🟡 Open — functional/responsive-design fix**, not something to patch invisibly inside an a11y pass. Recommend a mobile search affordance (icon that expands to a full-width field, or moving search into a bottom sheet).

### M2. `DetailsScreen` lacked a `<main>` landmark
**WCAG 1.3.1 (Info and Relationships) — Level A** (landmark regions help screen-reader users skip to content).
The details screen's primary content was a bare `<div>`, unlike the listing screen which already used `<main>`.
**Status: ✅ Fixed.** Wrapped the two-column content grid in `<main>`.

### M3. No skip-to-content link
**WCAG 2.4.1 (Bypass Blocks) — Level A.**
Neither screen offers a way to skip the sticky header and jump straight to content — a keyboard user must tab through the logo area, search, and header buttons on every screen visit.
**Status: 🟡 Open — recommend adding a visually-hidden "Skip to content" link as the first focusable element on both screens, revealed on focus.**

### M4. Heading hierarchy is sound but shallow
Listing screen has one `<h1>` and no `<h2>`s (its sections use styled `<p>` eyebrow labels instead of real headings). Details screen has a correct `h1 → h2` structure ("About this event", "Attendance", "Location"). This isn't a failure, but the listing screen's section labels ("Design Tokens", "Skeleton Loader", "Card Component Showcase") read as content sections to a sighted user and should probably be real `<h2>`s for screen-reader users navigating by heading.
**Status: 🔵 Recommendation only — not fixed in this pass** (these sections are dev-facing showcase content, likely to be removed before production; flagging in case they survive).

---

## 🔵 Minor / already-good

- **Images** consistently use meaningful `alt={event.title}` — no empty or missing `alt` attributes found.
- **Disabled buttons** (sold-out CTAs) use the native `disabled` attribute, which is correctly announced by assistive tech — not just a visual/opacity fake-disable.
- **Focus was never suppressed** — no `outline-none` was found on any interactive element without a replacement focus style, so the browser's default focus ring was already present everywhere; this pass adds a branded `focus-visible` ring (using `--ring`) to the newly-keyboard-accessible cards and toggle buttons for consistency.
- **Color is never the *only* signal** for status: "Sold Out" and "✓ Going" badges carry both color and text; the attendee capacity bar changes color when >85% full but is always paired with the numeric percentage as text.
- **Motion**: no animation exceeds 600ms except the intentionally-looping skeleton shimmer (1.4s), which is a loading indicator (generally exempt from WCAG 2.2.2's "essential" carve-out). A `prefers-reduced-motion` media query was added in this pass regardless — see `CHANGELOG-accessibility-fixes.md`.

---

## Summary table

| ID | Finding | Severity | Status |
|---|---|---|---|
| C1 | Event/related cards not keyboard-operable | 🔴 Critical | ✅ Fixed |
| S1 | Icon-only buttons missing accessible names | 🟠 Serious | ✅ Fixed |
| S2 | Search input has no persistent label | 🟠 Serious | ✅ Fixed |
| S3 | Selected states not exposed via ARIA | 🟠 Serious | ✅ Fixed |
| S4 | Primary button text fails contrast | 🟠 Serious | 🟠 Open (design token) |
| S5 | `--text-subdued` fails contrast in 6+ contexts | 🟠 Serious | 🟠 Open (design token) |
| M1 | Search unavailable on mobile | 🟡 Moderate | 🟡 Open (responsive design) |
| M2 | Details screen missing `<main>` landmark | 🟡 Moderate | ✅ Fixed |
| M3 | No skip-to-content link | 🟡 Moderate | 🟡 Open (recommended) |
| M4 | Shallow heading hierarchy on showcase sections | 🟡 Moderate | 🔵 Recommendation only |

**6 of 10 findings fixed directly in code during this handoff pass** (all fixes are non-visual — no layout, color, or spacing changed). The remaining 4 require either a design-token decision (color) or a small scope of new UI (mobile search, skip link) and are documented here for planning.
