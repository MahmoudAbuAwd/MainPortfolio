"use client"

import { motion, useScroll, useSpring } from "framer-motion"

import { useTV } from "@/components/tv-frame"

/**
 * Thin tracking bar along the bottom of the glass. Fills as the screen's
 * own scroll container moves (not the window, which never scrolls here).
 */
export function ScrollProgress() {
  const { scrollRef } = useTV()
  const { scrollYProgress } = useScroll({ container: scrollRef })
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <div className="tv-track" aria-hidden>
      <motion.div className="tv-track-fill" style={{ scaleX }} />
    </div>
  )
}
