import { useState } from "react"

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS — consumed via CSS variables (see index.css)
   Raw hex codes are NEVER used in component code; all colors
   reference semantic tokens set in :root / .dark.
═══════════════════════════════════════════════════════════════ */

/* ─── ATOM: Badge ─────────────────────────────────────────────── */
type BadgeVariant = "going" | "sold-out" | "free" | "paid" | "featured"

function Badge({ variant, children }: { variant: BadgeVariant; children: React.ReactNode }) {
  const styles: Record<BadgeVariant, string> = {
    going: "bg-[var(--badge-going-bg)] text-[var(--badge-going-fg)]",
    "sold-out": "bg-[var(--badge-sold-bg)] text-[var(--badge-sold-fg)]",
    free: "bg-[var(--badge-free-bg)] text-[var(--badge-free-fg)]",
    paid: "bg-[var(--muted)] text-[var(--muted-foreground)]",
    featured: "bg-[var(--primary)] text-[var(--primary-foreground)]",
  }
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-[10px] font-semibold uppercase tracking-wider ${styles[variant]}`}
    >
      {children}
    </span>
  )
}

/* ─── ATOM: Tag ───────────────────────────────────────────────── */
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md font-mono text-[11px] font-medium bg-[var(--tag-bg)] text-[var(--tag-fg)]">
      {children}
    </span>
  )
}

/* ─── ATOM: Button ────────────────────────────────────────────── */
type ButtonVariant = "primary" | "secondary" | "ghost"
type ButtonSize = "sm" | "md" | "lg"

function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
  fullWidth,
  disabled,
}: {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
  onClick?: () => void
  fullWidth?: boolean
  disabled?: boolean
}) {
  const base = "inline-flex items-center justify-center gap-2 font-semibold rounded-[var(--radius)] transition-all duration-150 cursor-pointer select-none"
  const variants: Record<ButtonVariant, string> = {
    primary: "bg-[var(--primary-action-bg)] text-[var(--text-on-primary)] hover:bg-[var(--primary-action-hover)] active:scale-[0.98]",
    secondary: "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--muted)] border border-[var(--border)]",
    ghost: "bg-transparent text-[var(--muted-foreground)] hover:bg-[var(--surface-overlay)] hover:text-[var(--foreground)]",
  }
  const sizes: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${disabled ? "opacity-40 pointer-events-none" : ""}`}
    >
      {children}
    </button>
  )
}

/* ─── ATOM: Avatar ────────────────────────────────────────────── */
function Avatar({ src, name, size = 32 }: { src?: string; name: string; size?: number }) {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
  return src ? (
    <img src={src} alt={name} width={size} height={size}
      className="rounded-full object-cover border border-[var(--border)]"
      style={{ width: size, height: size }} />
  ) : (
    <div
      className="rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center font-mono font-bold"
      style={{ width: size, height: size, fontSize: size * 0.35 }}
    >
      {initials}
    </div>
  )
}

/* ─── ATOM: Divider ───────────────────────────────────────────── */
function Divider() {
  return <div className="border-t border-[var(--border)]" />
}

/* ─── MOLECULE: Skeleton Block ────────────────────────────────── */
function Skel({ w, h, className = "" }: { w?: string; h?: string; className?: string }) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{ width: w ?? "100%", height: h ?? "1rem" }}
    />
  )
}

/* ═══════════════════════════════════════════════════════════════
   DATA MODEL
═══════════════════════════════════════════════════════════════ */
interface EventData {
  id: string
  title: string
  subtitle: string
  date: string
  time: string
  location: string
  venue: string
  category: string
  image: string
  price: string
  priceRaw: number
  attendees: number
  capacity: number
  organizer: string
  organizerAvatar: string
  description: string
  tags: string[]
  isFeatured?: boolean
  isGoing?: boolean
}

const EVENTS: EventData[] = [
  {
    id: "evt-01",
    title: "Neon Futures",
    subtitle: "Electronic Music Festival",
    date: "SAT · AUG 16",
    time: "20:00 – 04:00",
    location: "Brooklyn, NY",
    venue: "The Steel Yard",
    category: "Music",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=500&fit=crop&auto=format",
    price: "$75",
    priceRaw: 75,
    attendees: 1240,
    capacity: 1500,
    organizer: "Pulse Events",
    organizerAvatar: "",
    description: "A sprawling all-night electronic experience across three stages. Featuring artists pushing the boundaries of ambient, techno, and experimental club sound. Curated lighting installations by Studio FLOAT.",
    tags: ["Electronic", "Techno", "Ambient", "All-Ages"],
    isFeatured: true,
    isGoing: true,
  },
  {
    id: "evt-02",
    title: "Design Minds Summit",
    subtitle: "Annual Product Design Conference",
    date: "THU · SEP 04",
    time: "09:00 – 18:00",
    location: "San Francisco, CA",
    venue: "Yerba Buena Center",
    category: "Conference",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop&auto=format",
    price: "$299",
    priceRaw: 299,
    attendees: 880,
    capacity: 900,
    organizer: "Craft Studio",
    organizerAvatar: "",
    description: "Two days of talks, workshops, and critiques from product designers at Figma, Notion, Linear, and Vercel. Hands-on sessions on systems thinking, motion, and cross-functional collaboration.",
    tags: ["Design", "Product", "UX", "Workshop"],
    isFeatured: false,
    isGoing: false,
  },
  {
    id: "evt-03",
    title: "Roots & Routes",
    subtitle: "World Music & Food Festival",
    date: "SUN · SEP 21",
    time: "12:00 – 22:00",
    location: "Austin, TX",
    venue: "Zilker Park",
    category: "Festival",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=500&fit=crop&auto=format",
    price: "Free",
    priceRaw: 0,
    attendees: 4300,
    capacity: 8000,
    organizer: "Austin Arts Collective",
    organizerAvatar: "",
    description: "A free outdoor celebration of global culture — live music from 14 countries, food vendors from 30+ cuisines, and artisan markets spanning the park grounds.",
    tags: ["World Music", "Food", "Outdoor", "Free"],
    isFeatured: false,
    isGoing: false,
  },
  {
    id: "evt-04",
    title: "The Dark Room",
    subtitle: "Immersive Horror Experience",
    date: "FRI · OCT 31",
    time: "19:00 – 23:59",
    location: "Chicago, IL",
    venue: "Warehouse 17",
    category: "Experience",
    image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=800&h=500&fit=crop&auto=format",
    price: "$55",
    priceRaw: 55,
    attendees: 500,
    capacity: 500,
    organizer: "Labyrinth Productions",
    organizerAvatar: "",
    description: "Sold out. An actor-led immersive experience across 18 rooms. No jump scares — only dread. Recommended for ages 18+.",
    tags: ["Immersive", "Horror", "18+", "Adults"],
    isFeatured: false,
    isGoing: false,
  },
]

/* ═══════════════════════════════════════════════════════════════
   ORGANISM: Event Card — variants: medium | small | list
═══════════════════════════════════════════════════════════════ */
type CardVariant = "medium" | "small" | "list"

function EventCard({
  event,
  variant = "medium",
  loading = false,
  onClick,
}: {
  event: EventData
  variant?: CardVariant
  loading?: boolean
  onClick?: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const soldOut = event.attendees >= event.capacity

  /* ── Skeleton state ─────────────────────────────────────────── */
  if (loading) {
    if (variant === "list") {
      return (
        <div className="flex gap-4 p-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)]">
          <Skel w="96px" h="80px" className="rounded-lg flex-shrink-0" />
          <div className="flex-1 flex flex-col gap-2 pt-1">
            <Skel w="60%" h="14px" />
            <Skel w="40%" h="11px" />
            <div className="flex gap-2 mt-1">
              <Skel w="56px" h="20px" className="rounded-full" />
              <Skel w="56px" h="20px" className="rounded-full" />
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 pt-1">
            <Skel w="48px" h="14px" />
            <Skel w="64px" h="32px" className="rounded-lg" />
          </div>
        </div>
      )
    }
    return (
      <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] overflow-hidden">
        <Skel w="100%" h={variant === "medium" ? "192px" : "140px"} className="rounded-none" />
        <div className="p-4 flex flex-col gap-2">
          <Skel w="30%" h="10px" />
          <Skel w="80%" h="18px" />
          <Skel w="55%" h="12px" />
          <div className="flex gap-2 pt-1">
            <Skel w="52px" h="20px" className="rounded-full" />
            <Skel w="52px" h="20px" className="rounded-full" />
          </div>
          <div className="flex justify-between items-center pt-2">
            <Skel w="40px" h="16px" />
            <Skel w="80px" h="36px" className="rounded-lg" />
          </div>
        </div>
      </div>
    )
  }

  /* ── List variant ───────────────────────────────────────────── */
  if (variant === "list") {
    return (
      <div
        className="flex gap-4 p-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] cursor-pointer transition-all duration-200 hover:border-[var(--primary)] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ring)] focus-visible:outline-offset-2"
        style={{ boxShadow: hovered ? "0 4px 24px rgba(0,0,0,0.10)" : undefined }}
        role="button"
        tabIndex={0}
        aria-label={`${event.title}, ${event.date}, ${event.venue}, ${event.priceRaw === 0 ? "free" : event.price}${soldOut ? ", sold out" : ""}`}
        onClick={onClick}
        onKeyDown={(e) => { if ((e.key === "Enter" || e.key === " ") && onClick) { e.preventDefault(); onClick() } }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden bg-[var(--muted)]">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          {event.isFeatured && (
            <span className="absolute top-1 left-1">
              <Badge variant="featured">★ Pick</Badge>
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-mono text-[11px] text-[var(--text-subdued)] tracking-wider">{event.date}</span>
            <span className="text-[var(--border)] font-mono">·</span>
            <span className="font-mono text-[11px] text-[var(--text-subdued)]">{event.time}</span>
          </div>
          <h3 className="font-bold text-[var(--text-heading)] text-base leading-tight truncate">{event.title}</h3>
          <p className="text-[var(--text-subdued)] text-xs mt-0.5 truncate">{event.venue} · {event.location}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {event.tags.slice(0, 2).map(t => <Tag key={t}>{t}</Tag>)}
            {soldOut && <Badge variant="sold-out">Sold Out</Badge>}
            {event.isGoing && <Badge variant="going">✓ Going</Badge>}
          </div>
        </div>
        <div className="flex flex-col items-end justify-between flex-shrink-0">
          <span className="font-mono font-bold text-[var(--primary)] text-sm">
            {event.priceRaw === 0 ? "FREE" : event.price}
          </span>
          <Button variant={soldOut ? "secondary" : "primary"} size="sm" disabled={soldOut}>
            {soldOut ? "Sold Out" : "Get Tickets"}
          </Button>
        </div>
      </div>
    )
  }

  /* ── Medium / Small variants ────────────────────────────────── */
  const imgHeight = variant === "medium" ? "h-48" : "h-36"

  return (
    <div
      className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] overflow-hidden cursor-pointer transition-all duration-200 flex flex-col hover:border-[var(--primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ring)] focus-visible:outline-offset-2"
      style={{ boxShadow: hovered ? "0 8px 32px rgba(0,0,0,0.12)" : "none" }}
      role="button"
      tabIndex={0}
      aria-label={`${event.title}, ${event.date}, ${event.venue}, ${event.priceRaw === 0 ? "free" : event.price}${soldOut ? ", sold out" : ""}`}
      onClick={onClick}
      onKeyDown={(e) => { if ((e.key === "Enter" || e.key === " ") && onClick) { e.preventDefault(); onClick() } }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className={`relative w-full ${imgHeight} bg-[var(--muted)] overflow-hidden`}>
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {event.isFeatured && <Badge variant="featured">★ Featured</Badge>}
          {soldOut && <Badge variant="sold-out">Sold Out</Badge>}
          {event.priceRaw === 0 && <Badge variant="free">Free</Badge>}
        </div>
        {/* Category */}
        <div className="absolute bottom-3 left-3">
          <Tag>{event.category}</Tag>
        </div>
        {/* Price badge */}
        <div className="absolute bottom-3 right-3">
          <span className="font-mono font-bold text-white text-sm drop-shadow">
            {event.priceRaw === 0 ? "FREE" : event.price}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-[var(--primary)] font-semibold tracking-wider">{event.date}</span>
          <span className="font-mono text-[11px] text-[var(--text-subdued)]">· {event.time}</span>
        </div>
        <h3 className={`font-bold text-[var(--text-heading)] leading-tight ${variant === "medium" ? "text-lg" : "text-base"}`}>
          {event.title}
        </h3>
        {variant === "medium" && (
          <p className="text-xs text-[var(--text-subdued)] leading-relaxed line-clamp-2">{event.subtitle}</p>
        )}
        <p className="text-xs text-[var(--text-subdued)] flex items-center gap-1 mt-auto">
          <LocationIcon /> {event.venue} · {event.location}
        </p>

        {variant === "medium" && (
          <>
            <Divider />
            <div className="flex items-center justify-between">
              <AttendeeBar total={event.capacity} current={event.attendees} />
              <Button variant={soldOut ? "secondary" : "primary"} size="sm" disabled={soldOut}>
                {soldOut ? "Sold Out" : "Reserve"}
              </Button>
            </div>
          </>
        )}

        {variant === "small" && (
          <div className="flex gap-1 flex-wrap mt-1">
            {event.tags.slice(0, 2).map(t => <Tag key={t}>{t}</Tag>)}
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Molecule: Attendee bar ──────────────────────────────────── */
function AttendeeBar({ total, current }: { total: number; current: number }) {
  const pct = Math.min(100, (current / total) * 100)
  const almostFull = pct >= 85
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[10px] text-[var(--text-subdued)]">
        {current.toLocaleString()} / {total.toLocaleString()} going
      </span>
      <div className="w-24 h-1.5 rounded-full bg-[var(--muted)] overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${pct}%`,
            backgroundColor: almostFull ? "var(--badge-sold-fg)" : "var(--primary)",
          }}
        />
      </div>
    </div>
  )
}

/* ─── Molecule: Related Event mini card ───────────────────────── */
function RelatedCard({ event, onClick }: { event: EventData; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View related event: ${event.title}, ${event.date}, ${event.priceRaw === 0 ? "free" : event.price}`}
      onKeyDown={(e) => { if ((e.key === "Enter" || e.key === " ") && onClick) { e.preventDefault(); onClick() } }}
      className="flex gap-3 cursor-pointer hover:bg-[var(--surface-overlay)] p-2 rounded-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ring)] focus-visible:outline-offset-2"
    >
      <div className="w-14 h-12 rounded-lg overflow-hidden bg-[var(--muted)] flex-shrink-0">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-[var(--text-heading)] text-sm leading-tight truncate">{event.title}</p>
        <p className="font-mono text-[10px] text-[var(--text-subdued)] mt-0.5">{event.date}</p>
        <p className="font-mono text-[11px] text-[var(--primary)] font-bold">
          {event.priceRaw === 0 ? "FREE" : event.price}
        </p>
      </div>
    </div>
  )
}

/* ─── SVG Icon atoms ──────────────────────────────────────────── */
function LocationIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
      <path d="M6 1C4.067 1 2.5 2.567 2.5 4.5c0 2.625 3.5 6.5 3.5 6.5s3.5-3.875 3.5-6.5C9.5 2.567 7.933 1 6 1Zm0 4.75a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z"
        fill="currentColor" />
    </svg>
  )
}
function CalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 7h12M5 2v2M11 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 5v3.5l2 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function PeopleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M1 13c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M14.5 13c0-2-1.4-3.6-3-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}
function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
      <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function BackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function ShareIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <circle cx="12" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="4" cy="8" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="13" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 7.1l5-2.7M5.5 8.9l5 2.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}
function HeartIcon({ filled }: { filled?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill={filled ? "var(--primary)" : "none"}>
      <path d="M8 13.7S1.5 9.8 1.5 5.5a3.5 3.5 0 0 1 6.5-1.8 3.5 3.5 0 0 1 6.5 1.8C14.5 9.8 8 13.7 8 13.7Z"
        stroke={filled ? "var(--primary)" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SCREEN: Event Listing
═══════════════════════════════════════════════════════════════ */
type CardVariantFilter = "all" | "medium" | "small" | "list"
type Category = "All" | "Music" | "Conference" | "Festival" | "Experience"

function ListingScreen({
  onSelect,
  darkMode,
  onToggleDark,
}: {
  onSelect: (event: EventData) => void
  darkMode: boolean
  onToggleDark: () => void
}) {
  const [category, setCategory] = useState<Category>("All")
  const [viewMode, setViewMode] = useState<CardVariantFilter>("medium")
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")

  const categories: Category[] = ["All", "Music", "Conference", "Festival", "Experience"]

  const filtered = EVENTS.filter(e => {
    const matchCat = category === "All" || e.category === category
    const matchSearch = !search || e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  function simulateLoad() {
    setLoading(true)
    setTimeout(() => setLoading(false), 1800)
  }

  const gridClass =
    viewMode === "list"
      ? "flex flex-col gap-3"
      : viewMode === "small"
        ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"

  const cardVariant: CardVariant = viewMode === "all" ? "medium" : (viewMode as CardVariant)

  return (
    <div className="min-h-screen bg-[var(--background)] transition-theme">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[var(--background)] border-b border-[var(--border)] backdrop-blur-md bg-opacity-90">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center">
              <span className="font-mono font-bold text-white text-xs">EV</span>
            </div>
            <span className="font-bold text-[var(--text-heading)] text-lg tracking-tight">Eventide</span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xs relative hidden sm:block">
            <label htmlFor="event-search" className="sr-only">Search events by title or location</label>
            <input
              id="event-search"
              type="text"
              placeholder="Search events…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[var(--muted)] text-[var(--foreground)] border border-[var(--border)] rounded-[var(--radius)] px-3.5 py-2 text-sm placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleDark}
              className="p-2 rounded-lg bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--secondary)] transition-colors"
              title="Toggle dark mode"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              aria-pressed={darkMode}
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>
            <Button variant="primary" size="sm">+ Create Event</Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 py-8">
        {/* Hero section */}
        <div className="mb-8">
          <p className="font-mono text-[var(--primary)] text-xs font-semibold uppercase tracking-widest mb-2">
            Upcoming · {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </p>
          <h1 className="font-bold text-[var(--text-heading)] text-4xl sm:text-5xl leading-tight mb-3">
            Events near<br className="hidden sm:block" /> <span style={{ color: "var(--primary)" }}>you.</span>
          </h1>
          <p className="text-[var(--text-subdued)] text-base max-w-lg">
            Discover live music, conferences, festivals, and experiences curated for your city.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* Category pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => { setCategory(c); simulateLoad() }}
                aria-pressed={category === c}
                className={`px-4 py-1.5 rounded-full font-semibold text-sm whitespace-nowrap transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ring)] focus-visible:outline-offset-2 ${category === c
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                  : "bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--secondary)]"
                  }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* View mode */}
          <div className="flex items-center gap-1 bg-[var(--muted)] rounded-lg p-1">
            {(["medium", "small", "list"] as const).map(v => (
              <button
                key={v}
                onClick={() => setViewMode(v)}
                aria-pressed={viewMode === v}
                aria-label={`${v === "medium" ? "Grid" : v === "small" ? "Compact" : "List"} view`}
                className={`px-3 py-1 rounded-md font-mono text-xs font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ring)] focus-visible:outline-offset-2 ${viewMode === v
                  ? "bg-[var(--card)] text-[var(--foreground)] shadow-sm"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  }`}
              >
                {v === "medium" ? "Grid" : v === "small" ? "Compact" : "List"}
              </button>
            ))}
          </div>
        </div>

        {/* Token showcase strip */}
        <div className="mb-8 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] p-4">
          <p className="font-mono text-[10px] text-[var(--text-subdued)] uppercase tracking-widest mb-3">
            Design Tokens · Semantic Variables
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { name: "--primary-action-bg", color: "var(--primary-action-bg)" },
              { name: "--background", color: "var(--background)", border: true },
              { name: "--card", color: "var(--card)", border: true },
              { name: "--muted", color: "var(--muted)", border: true },
              { name: "--text-subdued", color: "var(--text-subdued)" },
              { name: "--accent", color: "var(--accent)" },
            ].map(t => (
              <div key={t.name} className="flex items-center gap-2">
                <div
                  className="w-5 h-5 rounded-md flex-shrink-0"
                  style={{
                    background: t.color,
                    border: t.border ? "1px solid var(--border)" : "none",
                  }}
                />
                <span className="font-mono text-[10px] text-[var(--text-subdued)]">{t.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skeleton loader demo row */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <p className="font-mono text-[11px] text-[var(--text-subdued)] uppercase tracking-widest">
              Skeleton Loader · fetching state
            </p>
            <button
              onClick={simulateLoad}
              className="font-mono text-[11px] text-[var(--primary)] underline underline-offset-2"
            >
              Replay
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading
              ? EVENTS.slice(0, 3).map((_, i) => <EventCard key={i} event={EVENTS[0]} variant="medium" loading />)
              : null
            }
          </div>
        </div>

        {/* Event grid */}
        <div className={gridClass}>
          {loading
            ? filtered.map((_, i) => (
              <EventCard
                key={i}
                event={EVENTS[0]}
                variant={cardVariant === "all" ? "medium" : cardVariant}
                loading
              />
            ))
            : filtered.map(e => (
              <EventCard
                key={e.id}
                event={e}
                variant={cardVariant}
                onClick={() => onSelect(e)}
              />
            ))
          }
        </div>

        {filtered.length === 0 && !loading && (
          <div className="text-center py-20">
            <p className="text-[var(--text-subdued)] font-mono text-sm">No events found.</p>
          </div>
        )}

        {/* Card variant showcase */}
        <div className="mt-16 border-t border-[var(--border)] pt-10">
          <p className="font-mono text-[11px] text-[var(--text-subdued)] uppercase tracking-widest mb-6">
            Card Component · Variant Showcase
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <p className="font-mono text-[10px] text-[var(--text-subdued)] mb-3 uppercase tracking-wider">Small</p>
              <div className="grid grid-cols-2 gap-3">
                {EVENTS.slice(0, 2).map(e => (
                  <EventCard key={e.id} event={e} variant="small" onClick={() => onSelect(e)} />
                ))}
              </div>
            </div>
            <div>
              <p className="font-mono text-[10px] text-[var(--text-subdued)] mb-3 uppercase tracking-wider">List View</p>
              <div className="flex flex-col gap-3">
                {EVENTS.slice(0, 3).map(e => (
                  <EventCard key={e.id} event={e} variant="list" onClick={() => onSelect(e)} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SCREEN: Event Details
═══════════════════════════════════════════════════════════════ */
function DetailsScreen({
  event,
  onBack,
  darkMode,
  onToggleDark,
}: {
  event: EventData
  onBack: () => void
  darkMode: boolean
  onToggleDark: () => void
}) {
  const [saved, setSaved] = useState(false)
  const [ticketCount, setTicketCount] = useState(1)
  const soldOut = event.attendees >= event.capacity
  const related = EVENTS.filter(e => e.id !== event.id).slice(0, 3)

  return (
    <div className="min-h-screen bg-[var(--background)] transition-theme">
      {/* Nav bar */}
      <header className="sticky top-0 z-20 bg-[var(--background)] border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[var(--text-subdued)] hover:text-[var(--foreground)] transition-colors font-medium text-sm"
          >
            <BackIcon /> Back to events
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSaved(s => !s)}
              className="p-2 rounded-lg bg-[var(--muted)] transition-colors hover:bg-[var(--secondary)]"
              title="Save event"
              aria-label={saved ? "Remove from saved events" : "Save event"}
              aria-pressed={saved}
            >
              <HeartIcon filled={saved} />
            </button>
            <button
              className="p-2 rounded-lg bg-[var(--muted)] text-[var(--muted-foreground)] transition-colors hover:bg-[var(--secondary)]"
              title="Share"
              aria-label="Share this event"
            >
              <ShareIcon />
            </button>
            <button
              onClick={onToggleDark}
              className="p-2 rounded-lg bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--secondary)] transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              aria-pressed={darkMode}
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero image */}
      <div className="w-full h-64 sm:h-96 relative bg-[var(--muted)] overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent" />
        <div className="absolute top-4 left-5 flex gap-2">
          {event.isFeatured && <Badge variant="featured">★ Featured</Badge>}
          <Badge variant={event.priceRaw === 0 ? "free" : "paid"}>
            {event.category}
          </Badge>
        </div>
      </div>

      {/* Layout: 2-col */}
      <main className="max-w-6xl mx-auto px-5 py-8 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
        {/* Left: content */}
        <div>
          {/* Title block */}
          <div className="mb-6">
            <p className="font-mono text-[var(--primary)] text-xs font-semibold uppercase tracking-widest mb-1">
              {event.category}
            </p>
            <h1 className="font-bold text-[var(--text-heading)] text-3xl sm:text-4xl leading-tight mb-1">
              {event.title}
            </h1>
            <p className="text-[var(--text-subdued)] text-lg">{event.subtitle}</p>
          </div>

          {/* Meta info grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { icon: <CalIcon />, label: "Date", value: event.date },
              { icon: <ClockIcon />, label: "Time", value: event.time },
              { icon: <LocationIcon />, label: "Venue", value: event.venue },
              { icon: <PeopleIcon />, label: "Capacity", value: `${event.attendees.toLocaleString()} attending` },
            ].map(m => (
              <div key={m.label} className="bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] p-3">
                <div className="text-[var(--text-subdued)] mb-1.5 flex items-center gap-1.5">
                  {m.icon}
                  <span className="font-mono text-[10px] uppercase tracking-wider">{m.label}</span>
                </div>
                <p className="font-semibold text-[var(--text-heading)] text-sm">{m.value}</p>
              </div>
            ))}
          </div>

          <Divider />

          {/* Description */}
          <div className="py-6">
            <h2 className="font-bold text-[var(--text-heading)] text-xl mb-3">About this event</h2>
            <p className="text-[var(--text-body)] leading-relaxed text-base">{event.description}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {event.tags.map(t => <Tag key={t}>{t}</Tag>)}
          </div>

          <Divider />

          {/* Organizer */}
          <div className="py-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar name={event.organizer} size={44} />
              <div>
                <p className="font-mono text-[10px] text-[var(--text-subdued)] uppercase tracking-wider">Organizer</p>
                <p className="font-semibold text-[var(--text-heading)]">{event.organizer}</p>
              </div>
            </div>
            <Button variant="secondary" size="sm">Follow</Button>
          </div>

          <Divider />

          {/* Attendee capacity */}
          <div className="py-6">
            <h2 className="font-bold text-[var(--text-heading)] text-lg mb-4">Attendance</h2>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-sm text-[var(--text-subdued)]">
                {event.attendees.toLocaleString()} of {event.capacity.toLocaleString()} spots filled
              </span>
              <span className="font-mono text-sm font-bold text-[var(--primary)]">
                {Math.round((event.attendees / event.capacity) * 100)}%
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-[var(--muted)] overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.min(100, (event.attendees / event.capacity) * 100)}%`,
                  backgroundColor: event.attendees >= event.capacity ? "var(--badge-sold-fg)" : "var(--primary)",
                  transition: "width 0.6s ease",
                }}
              />
            </div>
            {soldOut && (
              <p className="font-mono text-[11px] text-[var(--badge-sold-fg)] mt-2">This event is sold out.</p>
            )}
          </div>

          {/* Location map placeholder */}
          <Divider />
          <div className="py-6">
            <h2 className="font-bold text-[var(--text-heading)] text-lg mb-3">Location</h2>
            <div className="rounded-[var(--radius)] overflow-hidden border border-[var(--border)] h-40 bg-[var(--muted)] flex items-center justify-center relative">
              <div className="text-center">
                <div className="text-[var(--text-subdued)] mb-1"><LocationIcon /></div>
                <p className="font-semibold text-[var(--text-heading)] text-sm">{event.venue}</p>
                <p className="text-[var(--text-subdued)] text-xs">{event.location}</p>
              </div>
              {/* Decorative grid lines */}
              <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="map-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M 24 0 L 0 0 0 24" fill="none" stroke="var(--border)" strokeWidth="0.8" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#map-grid)" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right: sticky ticket panel + related */}
        <div className="flex flex-col gap-6">
          {/* Ticket purchase card */}
          <div className="sticky top-20 bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] p-6 shadow-lg">
            <p className="font-mono text-[10px] text-[var(--text-subdued)] uppercase tracking-widest mb-1">Ticket Price</p>
            <p className="font-bold text-[var(--text-heading)] text-4xl mb-1">
              {event.priceRaw === 0 ? "Free" : event.price}
            </p>
            {event.priceRaw > 0 && (
              <p className="font-mono text-[11px] text-[var(--text-subdued)] mb-5">per person · incl. fees</p>
            )}

            {!soldOut && event.priceRaw > 0 && (
              <div className="mb-5">
                <p className="font-mono text-[10px] text-[var(--text-subdued)] uppercase tracking-wider mb-2">Quantity</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setTicketCount(n => Math.max(1, n - 1))}
                    aria-label="Decrease ticket quantity"
                    disabled={ticketCount <= 1}
                    className="w-9 h-9 rounded-lg bg-[var(--muted)] text-[var(--foreground)] font-bold hover:bg-[var(--secondary)] transition-colors disabled:opacity-40 disabled:pointer-events-none"
                  >−</button>
                  <span aria-live="polite" className="font-mono font-bold text-[var(--text-heading)] text-lg w-6 text-center">{ticketCount}</span>
                  <button
                    onClick={() => setTicketCount(n => Math.min(10, n + 1))}
                    aria-label="Increase ticket quantity"
                    disabled={ticketCount >= 10}
                    className="w-9 h-9 rounded-lg bg-[var(--muted)] text-[var(--foreground)] font-bold hover:bg-[var(--secondary)] transition-colors disabled:opacity-40 disabled:pointer-events-none"
                  >+</button>
                  {event.priceRaw > 0 && (
                    <span className="ml-auto font-mono font-bold text-[var(--primary)] text-lg">
                      ${(event.priceRaw * ticketCount).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            )}

            <Button variant={soldOut ? "secondary" : "primary"} size="lg" fullWidth disabled={soldOut}>
              {soldOut ? "Sold Out" : event.priceRaw === 0 ? "Register for Free" : "Buy Tickets"}
            </Button>

            {event.isGoing && (
              <div className="mt-3 text-center">
                <Badge variant="going">✓ You are going</Badge>
              </div>
            )}

            <Divider />
            <div className="pt-4 flex flex-col gap-2">
              {[
                { label: "Date", value: event.date },
                { label: "Time", value: event.time },
                { label: "Venue", value: event.venue },
              ].map(r => (
                <div key={r.label} className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[var(--text-subdued)]">{r.label}</span>
                  <span className="font-mono text-[11px] font-semibold text-[var(--text-heading)]">{r.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related events */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] p-5">
            <p className="font-mono text-[10px] text-[var(--text-subdued)] uppercase tracking-widest mb-4">Related Events</p>
            <div className="flex flex-col gap-1">
              {related.map((e, i) => (
                <div key={e.id}>
                  <RelatedCard event={e} onClick={onBack} />
                  {i < related.length - 1 && <Divider />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   ROOT: App shell — routes between screens
═══════════════════════════════════════════════════════════════ */
export default function App() {
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null)
  const [darkMode, setDarkMode] = useState(false)

  function toggleDark() {
    const next = !darkMode
    setDarkMode(next)
    if (next) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return (
    <div className="transition-theme">
      {selectedEvent ? (
        <DetailsScreen
          event={selectedEvent}
          onBack={() => setSelectedEvent(null)}
          darkMode={darkMode}
          onToggleDark={toggleDark}
        />
      ) : (
        <ListingScreen
          onSelect={setSelectedEvent}
          darkMode={darkMode}
          onToggleDark={toggleDark}
        />
      )}
    </div>
  )
}
