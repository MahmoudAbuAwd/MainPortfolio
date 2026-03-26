"use client"

import { motion } from "framer-motion"

interface SectionHeadingProps {
  title: string
  subtitle: string
  className?: string
}

export function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <div className={`space-y-3 ${className ?? ""}`}>
      <motion.p
        className="text-sm font-medium uppercase tracking-widest text-pal-200"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
      >
        {subtitle}
      </motion.p>
      <motion.h2
        className="text-3xl font-bold text-white sm:text-4xl"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h2>
    </div>
  )
}
