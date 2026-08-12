# Spacing Annotations

Eventide is built with Tailwind CSS v4, whose default spacing scale is **1 unit = 0.25rem = 4px** (at the browser default of 16px root font-size). Every value below was pulled directly from the utility classes actually present in `src/App.tsx` — this is not a redesign, it's a legend for what's already shipping.

## Spacing scale reference (Tailwind → px)

| Tailwind token | px | Used for |
|---|---|---|
| `0.5` | 2px | hairline offsets |
| `1` | 4px | icon-to-text gaps, tight badge padding |
| `1.5` | 6px | badge vertical padding, icon gaps |
| `2` | 8px | default inline gap (icon+label, pill groups) — **most-used spacing value in the app (18 occurrences)** |
| `2.5` | 10px | tag padding |
| `3` | 12px | card internal gaps, small button padding |
| `3.5` | 14px | input horizontal padding |
| `4` | 16px | card padding, grid gaps, section gaps |
| `5` | 20px | page gutters (`px-5`), ticket panel padding |
| `6` | 24px | card padding (ticket panel), section vertical rhythm |
| `7` | 28px | large button horizontal padding |
| `8` | 32px | section margin-bottom (hero → toolbar) |
| `10` | 40px | two-column layout gap (Details screen) |
| `16` | 64px | major section break (listing → showcase footer) |
| `20` | 80px | empty-state vertical padding |

## Page-level layout

| Region | Property | Value | Notes |
|---|---|---|---|
| Page gutter (both screens) | `px-5` | 20px | horizontal margin from viewport edge, all breakpoints |
| Content max-width | `max-w-6xl` | 1152px | centered via `mx-auto` |
| Header padding | `py-4` | 16px vertical | inside sticky header, both screens |
| Listing main padding | `py-8` | 32px | top/bottom of `<main>` |
| Details content padding | `py-8` | 32px | top/bottom of two-column grid |
| Details two-column gap | `gap-10` | 40px | between article column and sticky ticket sidebar |
| Details sidebar column width | fixed | 360px | `lg:grid-cols-[1fr_360px]` — content column is fluid, sidebar is fixed |

## Component-level spacing

### EventCard (Grid / Medium variant)
| Element | Property | Value |
|---|---|---|
| Card body padding | `p-4` | 16px all sides |
| Body internal stack gap | `flex flex-col gap-2` | 8px between date row / title / subtitle / location |
| Image height | fixed | 192px (`h-48`) |
| Badge cluster inset from image edge | `top-3 left-3` | 12px |
| Grid gap between cards | `gap-6` | 24px (Grid mode) |

### EventCard (Compact / Small variant)
| Element | Property | Value |
|---|---|---|
| Image height | fixed | 144px (`h-36`) |
| Grid gap between cards | `gap-4` | 16px (Compact mode) |
| Tag row top margin | `mt-1` | 4px |

### EventCard (List variant)
| Element | Property | Value |
|---|---|---|
| Row padding | `p-4` | 16px |
| Thumbnail → text gap | `gap-4` | 16px |
| Thumbnail size | fixed | 96×80px |
| Stack gap between rows | `gap-3` | 12px (`flex flex-col gap-3` in list container) |

### Buttons
| Size | Padding | Font size |
|---|---|---|
| `sm` | `px-3 py-1.5` → 12px / 6px | 14px (`text-sm`) |
| `md` (default) | `px-5 py-2.5` → 20px / 10px | 14px |
| `lg` | `px-7 py-3.5` → 28px / 14px | 16px (`text-base`) |
| Icon-only buttons (dark toggle, save, share) | `p-2` | 8px all sides, 16–18px icon |

### Badges & Tags
| Element | Padding | Radius |
|---|---|---|
| Badge | `px-2 py-0.5` → 8px / 2px | `rounded-full` |
| Tag | `px-2.5 py-0.5` → 10px / 2px | `rounded-md` (6px) |

### Search input & toolbar
| Element | Padding | Notes |
|---|---|---|
| Search field | `px-3.5 py-2` → 14px / 8px | `rounded-[var(--radius)]` = 10px |
| Category pill | `px-4 py-1.5` → 16px / 6px | pill gap between items: 8px (`gap-2`) |
| View-mode toggle group | `p-1` | 4px outer padding on the segmented-control track |
| View-mode toggle item | `px-3 py-1` → 12px / 4px | |

### Details screen — meta info grid
| Element | Value |
|---|---|
| Grid gap | `gap-4` → 16px between the 4 meta cards |
| Card padding | `p-3` → 12px |
| Bottom margin before divider | `mb-8` → 32px |

### Details screen — ticket purchase panel (sticky sidebar)
| Element | Value |
|---|---|
| Panel padding | `p-6` → 24px all sides |
| Sticky offset from top | `top-20` → 80px (clears the sticky header) |
| Price → quantity gap | `mb-5` → 20px |
| Quantity stepper button size | fixed | 36×36px (`w-9 h-9`) |
| Quantity stepper item gap | `gap-3` → 12px |

### Related events card
| Element | Value |
|---|---|
| Row padding | `p-2` → 8px |
| Thumbnail → text gap | `gap-3` → 12px |
| Thumbnail size | fixed | 56×48px |

## Radius token
All rounded corners reference a single CSS variable, `--radius: 10px`, applied via `rounded-[var(--radius)]`. Small chrome (badges, buttons inside dense rows) sometimes uses Tailwind's fixed `rounded-lg` (8px) or `rounded-full` instead of the token — flagged here so engineers don't "fix" it into a bug. Full corner radius is `rounded-full` for avatars, pills, and badges.

## Border
Structural dividers use `border-t border-[var(--border)]` where `--border` is `rgba(12,13,17,0.12)` in light mode and `rgba(240,237,231,0.10)` in dark mode — a **1px hairline**, not a solid gray, so it stays subtle against both themes without needing a separate dark-mode override.
