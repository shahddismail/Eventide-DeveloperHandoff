# User Story — Search + Category Filter Logic

*(Bonus deliverable — a developer-facing story for the combined search/filter behavior in `ListingScreen`.)*

## Story

> **As** an attendee browsing Eventide,
> **I want** to type a keyword and/or pick a category, and see the event grid update to match both at once,
> **so that** I can narrow hundreds of events down to the handful I actually care about without extra taps.

## Current implementation (what's already shipped, for reference)

```tsx
const filtered = EVENTS.filter(e => {
  const matchCat = category === "All" || e.category === category
  const matchSearch = !search || e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.location.toLowerCase().includes(search.toLowerCase())
  return matchCat && matchSearch
})
```

Search and category are **combined with AND logic** — an event must match both the active category (or "All") and the search term (or an empty search) to appear.

## Exact behavior the developer should implement/preserve

1. **Two filters, one result set.** Category selection and the search box are independent inputs that both narrow the *same* array — never two separate result lists. Selecting "Music" and typing "brooklyn" should show only Music events whose title or location contains "brooklyn."
2. **Search fields checked:** `title` and `location` only (not `venue`, `description`, `organizer`, or `tags` in the current build). Case-insensitive, substring match (`.includes()`), not fuzzy/tokenized matching, and not matched against the start of the string only — "yn" would still match "Brooklyn."
3. **Empty search = no-op filter.** An empty string doesn't hide everything — `!search` short-circuits the search check to `true`, so category alone still drives the list.
4. **"All" is not a real category value** — it's a sentinel meaning "skip the category check entirely." Don't add "All" as a literal `category` string on any event object.
5. **Filtering is client-side and synchronous** on the in-memory `EVENTS` array — there's no debounce, no API call, and no loading state tied to typing (the loading/skeleton state is currently only triggered by category clicks via `simulateLoad()`, not by typing in search — see open question #2 below).
6. **Empty state:** when `filtered.length === 0`, the grid is replaced with a centered "No events found." message — this must stay in sync with *both* filters, not just search.

## Acceptance criteria

- [ ] Typing in search and clicking a category pill produce a combined (AND) filter, never additive/OR.
- [ ] Search matches are case-insensitive substring matches against `title` and `location`.
- [ ] Clearing the search box (empty string) falls back to category-only filtering, not to "show nothing."
- [ ] Selecting "All" clears the category constraint without needing to also clear search.
- [ ] The empty state message appears exactly when the combined filter yields zero results, and disappears the moment either filter is relaxed to produce ≥1 match.
- [ ] View mode (Grid/Compact/List) is a **display-only** setting — switching it must never change which events are in `filtered`, only how they're rendered.
- [ ] Filtering must not run against `EVENTS.slice(0, 3)` (used elsewhere for the skeleton/showcase demo rows) — those are static demo content, unrelated to the live filtered set.

## Open questions for product/design (flag before extending this logic)

1. **Should search also match `venue`, `tags`, or `organizer`?** Right now "Yerba Buena" (a venue) won't surface "Design Minds Summit" even though a user might reasonably search for the venue name. Worth a product decision before broadening the match fields, since it changes result volume.
2. **Should typing in search trigger the skeleton loading state**, the way clicking a category pill does via `simulateLoad()`? Currently search filtering is instant with no loading flicker, which is arguably better UX for local data — flagging in case the intent was for search to feel like a "real" async query once this is wired to a backend.
3. **Debounce for a real API-backed search:** if/when `EVENTS` is replaced by a network call, this filter logic needs a debounce (~250–300ms is standard) on the search input before firing a request — the current instant-filter behavior only works because the data is already in memory.
4. **Should the category filter also live in the URL** (e.g. `?category=Music&q=brooklyn`) so results are shareable/bookmarkable and survive a page refresh? Not implemented in the current build — `category` and `search` are local component state only.
