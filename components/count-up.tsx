"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion, animate } from "framer-motion"

interface CountUpProps {
  /** Target value, optionally wrapped with prefix/suffix e.g. "15+", "$2k", "30+". */
  value: string
  /** Animation duration in seconds. */
  duration?: number
  className?: string
}

/** Split "15+" → { prefix: "", number: 15, suffix: "+" }. */
function parse(value: string) {
  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/)
  if (!match) return { prefix: "", number: null as number | null, suffix: value }
  return { prefix: match[1], number: Number(match[2]), suffix: match[3] }
}

/**
 * Ticks a number from 0 → target when it scrolls into view. Renders the final
 * value instantly for users who prefer reduced motion, or for non-numeric input.
 */
export function CountUp({ value, duration = 1.4, className }: CountUpProps) {
  const { prefix, number, suffix } = parse(value)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const reduceMotion = useReducedMotion()
  const [display, setDisplay] = useState(number ?? 0)

  useEffect(() => {
    if (number === null) return
    if (!inView || reduceMotion) {
      setDisplay(number)
      return
    }
    const controls = animate(0, number, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    })
    return () => controls.stop()
  }, [inView, number, duration, reduceMotion])

  if (number === null) {
    return <span className={className}>{value}</span>
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}
