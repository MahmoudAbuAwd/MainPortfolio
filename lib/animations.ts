import type { Variants } from "framer-motion"

/* ------------------------------------------------------------------ */
/*  Shared motion vocabulary                                           */
/*  One source of truth so every section reveals with the same         */
/*  easing + rhythm instead of an identical flat fade everywhere.      */
/* ------------------------------------------------------------------ */

/** Expressive ease-out (matches the curve already used in floating-nav). */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const

/** Softer ease-out for gentler reveals. */
export const easeOutQuart = [0.25, 1, 0.5, 1] as const

/** Default viewport trigger — fire slightly before the element scrolls in, once. */
export const viewportOnce = { once: true, margin: "-80px" } as const

/* ── Single-element presets ─────────────────────────────────────── */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOutExpo },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.6, ease: easeOutQuart },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 16 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
}

/* ── Stagger orchestration ──────────────────────────────────────── */

/**
 * Container that cascades its children. Pair with `staggerItem` on each child.
 * @param stagger     gap between each child (s)
 * @param delayChildren  delay before the first child starts (s)
 */
export function staggerContainer(stagger = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  }
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
}

/* ── Hover presets ──────────────────────────────────────────────── */

/** Gentle lift used on cards. Spring keeps it responsive, not floaty. */
export const hoverLift = {
  y: -6,
  transition: { duration: 0.3, ease: easeOutExpo },
} as const

export const tapShrink = { scale: 0.97 } as const
