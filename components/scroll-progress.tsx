"use client"

import { motion, useScroll, useSpring } from "framer-motion"

/**
 * Thin progress bar pinned to the very top of the viewport that fills as the
 * page scrolls. Visible on all breakpoints, styled with the site palette.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-amber-500 via-amber-400 to-term-green"
      style={{ scaleX }}
      aria-hidden
    />
  )
}
