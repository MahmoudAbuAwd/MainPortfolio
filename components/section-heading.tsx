"use client"

import { motion } from "framer-motion"

import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations"

interface SectionHeadingProps {
  title: string
  subtitle: string
  className?: string
}

export function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <motion.div
      className={`font-mono ${className ?? ""}`}
      variants={staggerContainer(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      <div className="flex items-baseline justify-between gap-4">
        <motion.h2
          variants={staggerItem}
          className="text-2xl font-bold tracking-tight text-pal-50 sm:text-3xl 2xl:text-4xl"
        >
          <span className="text-acc">## </span>
          {title.toLowerCase()}
        </motion.h2>
        <motion.span
          variants={staggerItem}
          className="shrink-0 text-xs uppercase tracking-[0.2em] text-pal-400"
        >
          {subtitle}
        </motion.span>
      </div>
      <motion.div
        variants={staggerItem}
        className="mt-3 border-t border-dashed border-hair/[0.12]"
      />
    </motion.div>
  )
}
