"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "@/lib/animations"

/**
 * Client reveal primitives so the framer-motion scroll vocabulary used on the
 * homepage can be dropped into the (server-rendered) secondary pages without
 * turning those pages into client components. Reuse `@/lib/animations` so the
 * easing + rhythm match the rest of the site.
 */

/** Reveal a single block as it scrolls into view. */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  )
}

/** Container that cascades its `RevealItem` children on scroll into view. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0,
}: {
  children: ReactNode
  className?: string
  stagger?: number
  delayChildren?: number
}) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer(stagger, delayChildren)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  )
}

/** A single item inside a `RevealGroup`. */
export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  )
}
