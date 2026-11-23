"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react"
import { usePathname, useRouter } from "next/navigation"

import { Chatbot } from "@/components/chatbot"
import { FloatingNav } from "@/components/floating-nav"
import { ScrollProgress } from "@/components/scroll-progress"
import { Knob } from "@/components/tv-knob"
import { powerOff, powerOn, setMasterVolume, staticBurst, tick } from "@/lib/tv-audio"

/* ------------------------------------------------------------------ */
/*  State shared with the on-screen nav + progress bar                 */
/* ------------------------------------------------------------------ */

export type Tint = "amber" | "green" | "ice"
const TINTS: Tint[] = ["ice", "amber", "green"]
/** How long the loading screen stays up on a visit, ms. */
const BOOT_MS = 7000

export interface Channel {
  id: string
  label: string
}

export const ROUTES = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
]

interface TVState {
  scrollRef: RefObject<HTMLDivElement | null>
  /** Sections on the current page that the dial can tune to. */
  channels: Channel[]
  current: number
  goTo: (index: number) => void
  step: (dir: 1 | -1) => void
  /** Number + name shown on the display for the knob's current position. */
  display: { index: number; count: number; label: string }
  tint: Tint
  cycleTint: () => void
  chooseTint: (t: Tint) => void
  power: boolean
  togglePower: () => void
  volume: number
  setVolume: (v: number) => void
  brightness: number
  setBrightness: (v: number) => void
  /** Bumps whenever the speaker makes a noise (drives the grille). */
  pulse: number
}

const TVContext = createContext<TVState | null>(null)

export function useTV() {
  const ctx = useContext(TVContext)
  if (!ctx) throw new Error("useTV must be used inside <TVFrame>")
  return ctx
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

/* ------------------------------------------------------------------ */
/*  Frame                                                              */
/* ------------------------------------------------------------------ */

export function TVFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const scrollRef = useRef<HTMLDivElement>(null)

  const [channels, setChannels] = useState<Channel[]>([])
  const [current, setCurrent] = useState(0)
  const [tint, setTint] = useState<Tint>("ice")
  const [static_, setStatic] = useState(false)
  const [power, setPower] = useState(true)
  const [powerKey, setPowerKey] = useState(0)
  const [volume, setVolumeState] = useState(0.5)
  const [brightness, setBrightnessState] = useState(0.7)
  const [pulse, setPulse] = useState(0)
  const [booting, setBooting] = useState(true)

  /* Boot screen: held until fonts + page are ready (never less than a beat). */
  useEffect(() => {
    let done = false
    let seen = false
    try {
      seen = sessionStorage.getItem("tv-booted") === "1"
    } catch {}
    const min = seen ? 0 : prefersReducedMotion() ? 500 : BOOT_MS
    const started = performance.now()
    const finish = () => {
      if (done) return
      done = true
      try {
        sessionStorage.setItem("tv-booted", "1")
      } catch {}
      setBooting(false)
    }
    const ready = Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((r) => window.addEventListener("load", () => r(), { once: true })),
    ])
    const wait = () => window.setTimeout(finish, Math.max(0, min - (performance.now() - started)))
    let t = 0
    ready.then(() => (t = wait()))
    const cap = window.setTimeout(finish, BOOT_MS + 4000) // never trap anyone behind it
    return () => {
      window.clearTimeout(t)
      window.clearTimeout(cap)
    }
  }, [])

  /* Find the sections on this page and which one is on screen. */
  const scan = useCallback(() => {
    const root = scrollRef.current
    if (!root) return
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-channel]"))
    const next = els.map((el) => ({ id: el.id, label: el.dataset.channel ?? el.id }))
    setChannels((prev) =>
      prev.length === next.length && prev.every((c, i) => c.id === next[i].id) ? prev : next,
    )
    const rootTop = root.getBoundingClientRect().top
    const probe = root.clientHeight * 0.35
    let idx = 0
    els.forEach((el, i) => {
      if (el.getBoundingClientRect().top - rootTop <= probe) idx = i
    })
    setCurrent(idx)
  }, [])

  useEffect(() => {
    const root = scrollRef.current
    if (!root) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(scan)
    }
    root.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      root.removeEventListener("scroll", onScroll)
    }
  }, [scan])

  /* New page = new channel: back to the top, burst of static, re-scan. */
  useEffect(() => {
    const root = scrollRef.current
    if (root) root.scrollTop = 0
    setStatic(true)
    if (root) staticBurst(0.25)
    setPulse((n) => n + 1)
    const t1 = window.setTimeout(() => setStatic(false), 320)
    const t2 = window.setTimeout(scan, 150)
    const t3 = window.setTimeout(scan, 900)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.clearTimeout(t3)
    }
  }, [pathname, scan])

  /* Phosphor tint (replaces the light/dark toggle). */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("tv-tint-v2") as Tint | null
      if (saved && TINTS.includes(saved)) setTint(saved)
    } catch {}
  }, [])
  useEffect(() => {
    document.documentElement.dataset.tint = tint
  }, [tint])

  const chooseTint = useCallback((next: Tint) => {
    setTint(next)
    try {
      localStorage.setItem("tv-tint-v2", next)
    } catch {}
  }, [])
  const cycleTint = useCallback(
    () => chooseTint(TINTS[(TINTS.indexOf(tint) + 1) % TINTS.length]),
    [tint, chooseTint],
  )

  /* Power, volume, brightness: remembered between visits. */
  useEffect(() => {
    try {
      const v = parseFloat(localStorage.getItem("tv-vol") ?? "")
      if (!Number.isNaN(v)) setVolumeState(Math.min(1, Math.max(0, v)))
      const b = parseFloat(localStorage.getItem("tv-bright") ?? "")
      if (!Number.isNaN(b)) setBrightnessState(Math.min(1, Math.max(0, b)))
    } catch {}
  }, [])
  useEffect(() => setMasterVolume(volume), [volume])

  const setVolume = useCallback((v: number) => {
    setVolumeState(v)
    setMasterVolume(v)
    setPulse((n) => n + 1)
    try {
      localStorage.setItem("tv-vol", String(v))
    } catch {}
  }, [])
  const setBrightness = useCallback((v: number) => {
    setBrightnessState(v)
    try {
      localStorage.setItem("tv-bright", String(v))
    } catch {}
  }, [])

  const togglePower = useCallback(() => {
    if (power) powerOff()
    else {
      powerOn()
      setPowerKey((k) => k + 1)
    }
    setPower(!power)
    setPulse((n) => n + 1)
  }, [power])

  const goTo = useCallback(
    (index: number) => {
      const root = scrollRef.current
      const target = channels[index]
      if (!root || !target) return
      document.getElementById(target.id)?.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start",
      })
    },
    [channels],
  )

  const routeIndex = Math.max(
    0,
    ROUTES.findIndex((r) => (r.href === "/" ? pathname === "/" : pathname.startsWith(r.href))),
  )
  const useSections = channels.length >= 2

  const step = useCallback(
    (dir: 1 | -1) => {
      if (useSections) {
        goTo((current + dir + channels.length) % channels.length)
      } else {
        router.push(ROUTES[(routeIndex + dir + ROUTES.length) % ROUTES.length].href)
      }
    },
    [useSections, goTo, current, channels.length, router, routeIndex],
  )

  const display = useSections
    ? { index: current, count: channels.length, label: channels[current]?.label ?? "" }
    : { index: routeIndex, count: ROUTES.length, label: ROUTES[routeIndex].label }

  const value = useMemo<TVState>(
    () => ({
      scrollRef, channels, current, goTo, step, display, tint, cycleTint, chooseTint,
      power, togglePower, volume, setVolume, brightness, setBrightness, pulse,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [channels, current, goTo, step, tint, cycleTint, chooseTint, routeIndex, useSections, power, togglePower, volume, setVolume, brightness, setBrightness, pulse],
  )

  return (
    <TVContext.Provider value={value}>
      <div className="tv-room">
        <div className="tv-stage">
          <div className="tv-cabinet">
            <div className="tv-bezel">
              <div
                className={`tv-screen ${power ? "" : "is-off"}`}
                style={{ "--tv-bright": 0.6 + brightness * 0.65 } as React.CSSProperties}
              >
                {/* inert while the set is off: nothing underneath can be tabbed to */}
                <div style={{ display: "contents" }} inert={!power || booting}>
                  <div id="tv-scroll" ref={scrollRef} className="tv-scroll">
                    {children}
                  </div>

                  {/* Pinned to the glass, not to the scrolling content. */}
                  <FloatingNav />
                  <ScrollProgress />
                  <Chatbot />
                </div>

                <div className="tv-fx tv-scanlines" aria-hidden />
                <div className="tv-fx tv-vignette" aria-hidden />
                <div className="tv-fx tv-glare" aria-hidden />
                <div className={`tv-fx tv-static ${static_ ? "is-on" : ""}`} aria-hidden />
                {!booting && <div key={powerKey} className="tv-poweron" aria-hidden />}
                <div className={`tv-boot ${booting ? "" : "is-done"}`} role="status" aria-live="polite" aria-label={booting ? "Loading" : undefined}>
                  <div className="tv-boot-bars" aria-hidden />
                  <div className="tv-boot-panel">
                    <p className="tv-boot-name">ABUAWD</p>
                    <p className="tv-boot-msg">Warming up the tube<span className="tv-boot-dots" aria-hidden /></p>
                    <div className="tv-boot-meter" aria-hidden>
                      <i />
                    </div>
                    <p className="tv-boot-sub">Please stand by</p>
                  </div>
                </div>
                <div className="tv-off" aria-hidden />
              </div>
            </div>
            <ControlPanel />
          </div>
        </div>
      </div>
    </TVContext.Provider>
  )
}

/* ------------------------------------------------------------------ */
/*  Side control panel (desktop)                                       */
/* ------------------------------------------------------------------ */

function ControlPanel() {
  const { step, display, cycleTint, chooseTint, tint, power, togglePower, volume, setVolume, brightness, setBrightness, goTo, pulse } = useTV()
  const router = useRouter()
  const { channels } = useTV()
  const pathname = usePathname()
  // while the channel knob is being dragged, the display shows where it points
  const [preview, setPreview] = useState<number | null>(null)
  const count = display.count
  const shownIndex = preview ?? display.index
  const label =
    preview === null
      ? display.label
      : channels.length >= 2
        ? (channels[preview]?.label ?? "")
        : ROUTES[preview]?.label ?? ""
  const pos = count > 1 ? display.index / (count - 1) : 0

  const commit = (index: number) => {
    setPreview(null)
    if (index === display.index) return
    if (channels.length >= 2) goTo(index)
    else if (ROUTES[index] && ROUTES[index].href !== pathname) router.push(ROUTES[index].href)
  }

  return (
    <aside className={`tv-panel ${power ? "" : "is-off"}`} aria-label="TV controls">
      <div className="tv-plate">
        <span className="tv-plate-name">ABUAWD</span>
        <span className="tv-plate-sub">AI series · Model 01</span>
      </div>

      <div className="tv-display" role="status" aria-live="polite">
        {power ? (
          <>
            <span className="tv-display-ch">CH</span>
            <span key={shownIndex} className="tv-display-num">
              {String(shownIndex + 1).padStart(2, "0")}
            </span>
            <span className="tv-display-label">{label}</span>
          </>
        ) : (
          <span className="tv-display-label tv-display-standby">standby</span>
        )}
      </div>

      <div className="tv-knob-group">
        <Knob
          size={78}
          scale
          steps={Math.max(count, 2)}
          value={pos}
          label={`Channel, now on ${display.label}`}
          valueText={`${display.index + 1} of ${count}: ${display.label}`}
          disabled={!power}
          onTap={() => step(1)}
          onChange={(v, final) => {
            const idx = Math.round(v * (Math.max(count, 2) - 1))
            if (final) commit(Math.min(idx, count - 1))
            else setPreview(Math.min(idx, count - 1))
          }}
        />
        <div className="tv-rocker" role="group" aria-label="Channel">
          <button type="button" disabled={!power} onClick={() => { tick(); step(-1) }} aria-label="Previous channel">
            ▲
          </button>
          <button type="button" disabled={!power} onClick={() => { tick(); step(1) }} aria-label="Next channel">
            ▼
          </button>
        </div>
        <span className="tv-knob-label">channel</span>
      </div>

      <div className="tv-knob-row">
        <div className="tv-knob-group">
          <Knob
            size={40}
            steps={TINTS.length}
            value={TINTS.indexOf(tint) / (TINTS.length - 1)}
            label={`Screen tint: ${tint}`}
            valueText={tint}
            onTap={() => { tick(); cycleTint() }}
            onChange={(v, final) => {
              const next = TINTS[Math.round(v * (TINTS.length - 1))]
              if (next !== tint) chooseTint(next)
            }}
          />
          <span className="tv-knob-label">tint</span>
        </div>
        <div className="tv-knob-group">
          <Knob
            size={40}
            value={volume}
            label="Volume"
            valueText={`${Math.round(volume * 100)} percent`}
            onChange={(v) => setVolume(v)}
          />
          <span className="tv-knob-label">volume</span>
        </div>
        <div className="tv-knob-group">
          <Knob
            size={40}
            value={brightness}
            label="Brightness"
            valueText={`${Math.round(brightness * 100)} percent`}
            onChange={(v) => setBrightness(v)}
          />
          <span className="tv-knob-label">bright</span>
        </div>
      </div>

      <div key={pulse} className={`tv-grille ${pulse ? "is-pulse" : ""}`} aria-hidden />

      <button
        type="button"
        className="tv-power"
        onClick={togglePower}
        aria-pressed={power}
        aria-label={power ? "Turn the TV off" : "Turn the TV on"}
      >
        <span className="tv-led" />
        <span className="tv-power-cap" aria-hidden>⏻</span>
        <span className="tv-knob-label">power</span>
      </button>
    </aside>
  )
}
