"use client"

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react"

import { tick } from "@/lib/tv-audio"

const MIN = -135
const MAX = 135

interface KnobProps {
  /** Position, 0..1. */
  value: number
  /** Called while dragging (final = false) and when a change is settled (final = true). */
  onChange: (value: number, final: boolean) => void
  /** Number of detents. 0 = a smooth knob. */
  steps?: number
  /** A press without dragging. */
  onTap?: () => void
  /** Diameter of the knob itself, px. */
  size: number
  label: string
  valueText?: string
  /** Draw a printed dial scale around the knob. */
  scale?: boolean
  disabled?: boolean
}

/**
 * A turnable knob. Drag it round like the real thing, scroll over it, or use
 * the arrow keys. Detented knobs click into place.
 */
export function Knob({ value, onChange, steps = 0, onTap, size, label, valueText, scale, disabled }: KnobProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [drag, setDrag] = useState<number | null>(null)
  const st = useRef({ x: 0, y: 0, down: false, moved: false, last: -1, v: 0 })
  const live = useRef({ value, steps, onChange, disabled })
  live.current = { value, steps, onChange, disabled }

  const shown = drag ?? value
  const angle = MIN + shown * (MAX - MIN)
  const snap = (v: number) => (steps > 1 ? Math.round(v * (steps - 1)) / (steps - 1) : v)

  const fromPointer = (e: PointerEvent) => {
    const r = ref.current!.getBoundingClientRect()
    const a = (Math.atan2(e.clientX - (r.left + r.width / 2), -(e.clientY - (r.top + r.height / 2))) * 180) / Math.PI
    return (Math.min(MAX, Math.max(MIN, a)) - MIN) / (MAX - MIN)
  }

  const onDown = (e: PointerEvent) => {
    if (disabled) return
    ref.current?.setPointerCapture(e.pointerId)
    st.current = { x: e.clientX, y: e.clientY, down: true, moved: false, last: -1, v: value }
  }
  const onMove = (e: PointerEvent) => {
    const s = st.current
    if (!s.down) return
    if (!s.moved && Math.hypot(e.clientX - s.x, e.clientY - s.y) < 5) return
    s.moved = true
    const v = fromPointer(e)
    s.v = v
    setDrag(v)
    const key = steps > 1 ? Math.round(v * (steps - 1)) : Math.floor(v * 12)
    if (key !== s.last) {
      if (s.last !== -1) tick()
      s.last = key
      onChange(snap(v), false)
    }
  }
  const onUp = (e: PointerEvent, cancelled = false) => {
    const s = st.current
    if (!s.down) return
    s.down = false
    ref.current?.releasePointerCapture?.(e.pointerId)
    if (s.moved) {
      onChange(snap(s.v), true)
      setDrag(null)
    } else if (!cancelled) {
      onTap?.()
    }
  }

  const nudge = (dir: 1 | -1) => {
    const { value: v, steps: n, onChange: cb } = live.current
    const next = n > 1 ? Math.min(1, Math.max(0, Math.round(v * (n - 1)) / (n - 1) + dir / (n - 1))) : Math.min(1, Math.max(0, v + dir * 0.08))
    if (Math.abs(next - v) < 1e-6) return false
    tick()
    cb(next, true)
    return true
  }

  const onKey = (e: KeyboardEvent) => {
    if (disabled) return
    if (e.key === "ArrowUp" || e.key === "ArrowRight") {
      e.preventDefault()
      nudge(1)
    } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
      e.preventDefault()
      nudge(-1)
    } else if (e.key === "Home") {
      e.preventDefault()
      live.current.onChange(0, true)
    } else if (e.key === "End") {
      e.preventDefault()
      live.current.onChange(1, true)
    } else if ((e.key === "Enter" || e.key === " ") && onTap) {
      e.preventDefault()
      onTap()
    }
  }

  /* Wheel needs a non-passive listener to stop the page scrolling under it. */
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let last = 0
    const onWheel = (e: WheelEvent) => {
      if (live.current.disabled) return
      const now = performance.now()
      if (now - last < 90) {
        e.preventDefault()
        return
      }
      if (nudge(e.deltaY < 0 ? 1 : -1)) {
        last = now
        e.preventDefault()
      }
    }
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const ring = size * 1.5
  const marks = steps > 1 ? steps : 11

  return (
    <div className="tv-dial" style={{ width: scale ? ring : size, height: scale ? ring : size }}>
      {scale && (
        <svg className="tv-dial-scale" viewBox="-50 -50 100 100" aria-hidden>
          {Array.from({ length: marks }, (_, i) => {
            const p = marks > 1 ? i / (marks - 1) : 0
            const a = ((MIN + p * (MAX - MIN)) * Math.PI) / 180
            const lit = steps > 1 ? i === Math.round(shown * (steps - 1)) : p <= shown + 1e-6
            const r1 = 40
            const r2 = lit && steps > 1 ? 49 : 45
            return (
              <line
                key={i}
                className={lit ? "tv-tick is-lit" : "tv-tick"}
                x1={Math.sin(a) * r1}
                y1={-Math.cos(a) * r1}
                x2={Math.sin(a) * r2}
                y2={-Math.cos(a) * r2}
              />
            )
          })}
        </svg>
      )}
      <div
        ref={ref}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(value * 100)}
        aria-valuetext={valueText}
        aria-disabled={disabled || undefined}
        className={`tv-knob ${drag !== null ? "is-grabbed" : ""}`}
        style={{ width: size, height: size, transform: `rotate(${angle}deg)` }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={(e) => onUp(e)}
        onPointerCancel={(e) => onUp(e, true)}
        onKeyDown={onKey}
      >
        <span className="tv-knob-mark" />
      </div>
    </div>
  )
}
