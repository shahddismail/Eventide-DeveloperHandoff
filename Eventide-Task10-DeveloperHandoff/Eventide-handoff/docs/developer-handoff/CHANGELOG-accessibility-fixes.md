# Changelog — Accessibility Fixes Applied in This Handoff Pass

These are real edits made to `src/App.tsx` and `src/index.css` as part of this Task 10 pass — not just recommendations. All changes are **non-visual**: no layout, spacing, color, or copy was touched. Verified with `tsc --noEmit` (zero new type errors introduced — the one pre-existing type warning at `App.tsx:728` predates this pass and is unrelated) and a successful dependency install.

## `src/App.tsx`

1. **`EventCard` (list variant)** — added `role="button"`, `tabIndex={0}`, `onKeyDown` (Enter/Space), a descriptive `aria-label`, and a `focus-visible` ring. *(Fixes audit finding C1.)*
2. **`EventCard` (medium/small variant)** — same fix as above. *(C1)*
3. **`RelatedCard`** — same fix as above. *(C1)*
4. **Listing header search input** — added `<label htmlFor="event-search" className="sr-only">` + matching `id` on the input. *(S2)*
5. **Listing header dark-mode toggle** — added `aria-label` (dynamic: "Switch to light/dark mode") and `aria-pressed={darkMode}`. *(S1, S3)*
6. **Category pills** — added `aria-pressed={category === c}`. *(S3)*
7. **View-mode toggle buttons** — added `aria-pressed={viewMode === v}` and `aria-label`. *(S3)*
8. **Details header: Save (heart) button** — added `aria-label` (dynamic) and `aria-pressed={saved}`. *(S1, S3)*
9. **Details header: Share button** — added `aria-label="Share this event"`. *(S1)*
10. **Details header: dark-mode toggle** — same as #5. *(S1, S3)*
11. **Details screen content wrapper** — changed the outer `<div>` to `<main>` so the page has a proper landmark. *(M2)*
12. **Ticket quantity stepper buttons** — added `aria-label` ("Decrease/Increase ticket quantity"), and now use the native `disabled` attribute at the min (1) / max (10) bounds instead of only clamping the value silently. Added `aria-live="polite"` to the quantity display so screen readers announce the new count after each click.

## `src/index.css`

13. **Added `.sr-only` utility class** (standard visually-hidden pattern) — used by the new search label.
14. **Added a `prefers-reduced-motion: reduce` media query** that collapses all animation/transition durations to near-zero for users with that OS-level preference set, without needing to touch any component.

## Verification performed

- `npm install` in `Design Event Details Screens/` completed cleanly (44 packages).
- `npx tsc --noEmit -p tsconfig.json` — same single pre-existing error as the unmodified source (`CardVariant`/`"all"` comparison at line 728), confirming no new type errors were introduced by these edits.
- Manual brace/paren balance check on the full file post-edit.

## Not fixed in this pass (requires a design or scope decision — see `03-accessibility-audit.md`)

- Primary button text contrast (light + dark mode) — needs a token color change (S4).
- `--text-subdued` contrast failures — needs a token color change (S5).
- Mobile search availability — needs new responsive UI, not an a11y attribute (M1).
- Skip-to-content link — small new UI element, straightforward to add next (M3).
