"use client"

import { motion, MotionConfig } from "framer-motion"

import { easeOutExpo } from "@/lib/animations"

/**
 * App Router re-renders this `template` on every navigation (unlike `layout`),
 * so it's the natural place for route-transition motion. The MotionConfig
 * gate honors the user's OS "reduce motion" setting across the whole tree.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: easeOutExpo }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  )
}
