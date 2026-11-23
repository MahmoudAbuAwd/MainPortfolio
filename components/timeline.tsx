"use client"

import { motion } from "framer-motion"

import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations"

const experiences: { title?: string; company: string; period: string; description: string }[] = [
  {
    company: "Ministry of Interior of Jordan (MOI)",
    period: "Aug 2026 — Present",
    description: "Working with the Ministry of Interior of Jordan.",
  },
  {
    title: "AI Engineer",
    company: "Kawkab AI",
    period: "Sep 2025 — Present",
    description:
      "Designing and developing intelligent, scalable solutions including chatbots, agentic AI systems, and RAG-based applications using LangChain and LLM frameworks.",
  },
  {
    title: "Intern",
    company: "Coach You",
    period: "Jun 2025 — Aug 2026",
    description:
      "Developing entrepreneurial skills through practical training in startup building — idea validation, product development, market research, and team leadership.",
  },
  {
    title: "AI Engineer",
    company: "Future Advance Internet Solutions",
    period: "Oct 2024 — Feb 2025",
    description:
      "Developed AI solutions for real-world applications, leveraging Python, machine learning, and deep learning frameworks.",
  },
  {
    title: "Intern",
    company: "Youth Innovation Club",
    period: "Jun 2024 — Aug 2024",
    description:
      "Completed training in 3D modeling and robotic design, focusing on practical applications and prototyping.",
  },
]

/**
 * Experience laid out like a TV guide: the time slot on the left, the
 * programme on the right. Roles that are still running are "on air".
 */
export function Timeline() {
  return (
    <motion.ol
      className="divide-y divide-hair/[0.1] border-y border-hair/[0.1]"
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {experiences.map((exp) => {
        const live = /present/i.test(exp.period)
        return (
          <motion.li
            key={exp.company}
            variants={staggerItem}
            className="grid grid-cols-1 gap-x-10 gap-y-3 py-7 sm:grid-cols-[12rem_minmax(0,1fr)]"
          >
            <div>
              <p className="crt-glow font-display text-3xl leading-none text-acc">
                {exp.period.replace(" — ", " to ")}
              </p>
              {live && (
                <span className="tv-onair">
                  <i aria-hidden />
                  On air
                </span>
              )}
            </div>

            <div>
              <h3 className="font-display text-3xl leading-[1.05] text-pal-50 sm:text-4xl">
                {exp.title && (
                  <>
                    {exp.title}
                    <span className="text-pal-400"> at </span>
                  </>
                )}
                <span className="text-term-green">{exp.company}</span>
              </h3>
              <p className="mt-3 max-w-2xl font-sans text-base leading-relaxed text-pal-300">
                {exp.description}
              </p>
            </div>
          </motion.li>
        )
      })}
    </motion.ol>
  )
}
