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
          className="crt-glow font-display text-4xl leading-none text-pal-50 sm:text-5xl 2xl:text-6xl"
        >
          {title}
        </motion.h2>
        <motion.span
          variants={staggerItem}
          className="shrink-0 font-display text-xl text-acc/80"
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
