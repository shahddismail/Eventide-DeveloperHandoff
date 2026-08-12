# Color Contrast Report (WCAG 2.1 AA)

Every ratio below was computed from the exact hex values in `src/index.css` using the WCAG relative-luminance formula, not estimated by eye. Script used:

```python
def rel_lum(rgb):
    def lin(c):
        c = c / 255
        return c/12.92 if c <= 0.04045 else ((c+0.055)/1.055) ** 2.4
    r, g, b = rgb
    return 0.2126*lin(r) + 0.7152*lin(g) + 0.0722*lin(b)

def contrast(hex1, hex2):
    l1, l2 = rel_lum(hex_to_rgb(hex1)), rel_lum(hex_to_rgb(hex2))
    lighter, darker = max(l1, l2), min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)
```

**WCAG 2.1 AA thresholds:** 4.5:1 for normal text, 3:1 for large text (≥24px, or ≥19px bold) and for UI component boundaries/graphics.

## Light Mode

| Pair | Foreground | Background | Ratio | AA Normal Text (4.5:1) | AA Large/UI (3:1) |
|---|---|---|---|---|---|
| `--text-heading` on `--background` | `#0C0D11` | `#F4F3EF` | **17.49:1** | ✅ PASS | ✅ PASS |
| `--text-heading` on `--card` | `#0C0D11` | `#FFFFFF` | **19.42:1** | ✅ PASS | ✅ PASS |
| `--text-body` on `--background` | `#2E2D2A` | `#F4F3EF` | **12.40:1** | ✅ PASS | ✅ PASS |
| `--text-body` on `--card` | `#2E2D2A` | `#FFFFFF` | **13.77:1** | ✅ PASS | ✅ PASS |
| `--text-subdued` on `--background` | `#7A7670` | `#F4F3EF` | **4.06:1** | ❌ **FAIL** | ✅ PASS |
| `--text-subdued` on `--card` | `#7A7670` | `#FFFFFF` | **4.51:1** | ✅ PASS (barely) | ✅ PASS |
| `--text-subdued` on `--muted` | `#7A7670` | `#ECEAE4` | **3.75:1** | ❌ **FAIL** | ✅ PASS |
| `--primary-foreground` on `--primary-action-bg` (button label) | `#FFFFFF` | `#E8500A` | **3.76:1** | ❌ **FAIL** | ✅ PASS |
| `--primary` text on `--background` (mono date/price labels) | `#E8500A` | `#F4F3EF` | **3.39:1** | ❌ **FAIL** | ✅ PASS |
| `--primary` text on `--card` | `#E8500A` | `#FFFFFF` | **3.76:1** | ❌ **FAIL** | ✅ PASS |
| `--secondary-foreground` on `--secondary` (secondary button) | `#3A3832` | `#EDE9E3` | **9.69:1** | ✅ PASS | ✅ PASS |
| `--badge-going-fg` on `--badge-going-bg` | `#166534` | `#D4EDDA` | **5.75:1** | ✅ PASS | ✅ PASS |
| `--badge-sold-fg` on `--badge-sold-bg` | `#991B1B` | `#FEE2E2` | **6.80:1** | ✅ PASS | ✅ PASS |
| `--badge-free-fg` on `--badge-free-bg` | `#1E40AF` | `#DBEAFE` | **7.15:1** | ✅ PASS | ✅ PASS |
| `--tag-fg` on `--tag-bg` | `#5C5750` | `#F0EDE7` | **6.13:1** | ✅ PASS | ✅ PASS |

## Dark Mode

| Pair | Foreground | Background | Ratio | AA Normal Text (4.5:1) | AA Large/UI (3:1) |
|---|---|---|---|---|---|
| `--text-heading` on `--background` | `#F0EDE7` | `#0C0D11` | **16.62:1** | ✅ PASS | ✅ PASS |
| `--text-heading` on `--card` | `#F0EDE7` | `#16181F` | **15.17:1** | ✅ PASS | ✅ PASS |
| `--text-body` on `--background` | `#C8C4BC` | `#0C0D11` | **11.17:1** | ✅ PASS | ✅ PASS |
| `--text-body` on `--card` | `#C8C4BC` | `#16181F` | **10.20:1** | ✅ PASS | ✅ PASS |
| `--text-subdued` on `--background` | `#6E6B63` | `#0C0D11` | **3.65:1** | ❌ **FAIL** | ✅ PASS |
| `--text-subdued` on `--card` | `#6E6B63` | `#16181F` | **3.33:1** | ❌ **FAIL** | ✅ PASS |
| `--text-subdued` on `--muted` | `#6E6B63` | `#1A1C23` | **3.20:1** | ❌ **FAIL** | ❌ **FAIL** (below even the 3:1 UI floor) |
| `--primary-foreground` on `--primary-action-bg` (button label) | `#FFFFFF` | `#FF6B2B` | **2.84:1** | ❌ **FAIL** | ❌ **FAIL** |
| `--primary` text on `--background` | `#FF6B2B` | `#0C0D11` | **6.83:1** | ✅ PASS | ✅ PASS |
| `--primary` text on `--card` | `#FF6B2B` | `#16181F` | **6.24:1** | ✅ PASS | ✅ PASS |
| `--secondary-foreground` on `--secondary` | `#C8C4BC` | `#1E2028` | **9.35:1** | ✅ PASS | ✅ PASS |
| `--badge-going-fg` on `--badge-going-bg` | `#86efac` | `#052e16` | **10.62:1** | ✅ PASS | ✅ PASS |
| `--badge-sold-fg` on `--badge-sold-bg` | `#fca5a5` | `#450a0a` | **8.51:1** | ✅ PASS | ✅ PASS |
| `--badge-free-fg` on `--badge-free-bg` | `#93c5fd` | `#172554` | **8.15:1** | ✅ PASS | ✅ PASS |
| `--tag-fg` on `--tag-bg` | `#9E9A93` | `#1E2028` | **5.80:1** | ✅ PASS | ✅ PASS |

## Failures ranked by severity

| # | Issue | Ratio | Where it appears | Fix |
|---|---|---|---|---|
| 1 | **Dark-mode primary button text** | 2.84:1 | "Buy Tickets", "Reserve", "Get Tickets", "+ Create Event" — the app's main CTA, in dark mode | Darken `--primary` in dark mode from `#FF6B2B` toward `#E8500A`/`#D94A0A`, or keep `#FFFFFF` text but add a 1px darker inset border/shadow won't fix contrast — **color must change**. Target ≥4.5:1: `#D14300` on white text gives ~4.6:1. |
| 2 | **Light-mode primary button text** | 3.76:1 | Same CTAs, light mode | Darken `--primary-action-bg` from `#E8500A` to roughly `#C93E00` (already defined as `--primary-action-hover`!) for the *default* state, not just hover — `#C93E00` on white is ~4.9:1. Cheapest fix: swap default and hover values. |
| 3 | **`--text-subdued` on `--muted`** | 3.75 (light) / 3.20 (dark) | View-mode toggle inactive labels, quantity-stepper hint text, mono captions inside muted-background chips | Either raise text weight/size to qualify as "large text" (not recommended, changes hierarchy), or darken `--text-subdued` ~10% in both themes. |
| 4 | **`--text-subdued` on `--background`** | 4.06 (light) / 3.65 (dark) | Section eyebrow labels, metadata captions, timestamps throughout both screens | Same token, same fix as #3 — this single token drives most of the failures. Recommend: light `#6E6A63` (was `#7A7670`), dark `#8A867E` (was `#6E6B63`) — re-verify after change. |
| 5 | **`--primary` as standalone text (date/price labels)** | 3.39–3.76 (light) | Small mono date labels on cards (`SAT · AUG 16`), price text | These are ~11px, below the "large text" threshold, so they need the full 4.5:1. Either bump to the hover color for text-only use, or increase weight/size past the large-text cutoff (19px bold / 24px regular) — not recommended for a metadata label. |

## What already passes and shouldn't be touched
Heading and body text (`--text-heading`, `--text-body`) are excellent in both themes (10:1–19:1) — there's real headroom there if any of the fixes above need to borrow contrast budget. All badge pairs (going/sold-out/free) and the tag chip pass comfortably in both themes.

## Net recommendation for the dev team
The single highest-leverage fix is **`--text-subdued`** — it's reused across ~6 failing pairs. Nudging it 8–10% darker (light) / lighter (dark) likely clears every "on background/card" failure without a visible design shift, since it's a low-emphasis label color by design. The **primary button text** failure is separate and higher-priority (it's the paid-conversion CTA) — swapping default/hover values for `--primary-action-bg` is a one-line fix already sitting in the token file as `--primary-action-hover`.
