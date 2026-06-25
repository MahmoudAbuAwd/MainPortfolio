"use client"

import { motion } from "framer-motion"

import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations"

const experiences = [
  {
    title: "AI Engineer",
    company: "Kawkab AI",
    period: "Sep 2025 — Present",
    description:
      "Designing and developing intelligent, scalable solutions including chatbots, agentic AI systems, and RAG-based applications using LangChain and LLM frameworks.",
  },
  {
    title: "Founder",
    company: "MedGAN AI",
    period: "Feb 2025 — Present",
    description:
      "Founded an AI startup specializing in generative models and intelligent solutions for the healthcare industry.",
  },
  {
    title: "Intern",
    company: "Coach You",
    period: "Jun 2025 — Present",
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

/** Deterministic short "commit hash" derived from the company name. */
function hash(seed: string) {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  return h.toString(16).padStart(7, "0").slice(0, 7)
}

export function Timeline() {
  return (
    <motion.div
      className="relative ml-2 border-l border-hair/[0.1] font-mono"
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      <p className="mb-6 pl-6 text-xs text-pal-400">$ git log --author=&quot;mahmoud&quot; --oneline</p>

      {experiences.map((exp) => (
        <motion.div key={exp.company} variants={staggerItem} className="group relative pb-9 pl-6 last:pb-0">
          {/* commit marker */}
          <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-acc bg-pal-950 transition-shadow duration-300 group-hover:shadow-[0_0_12px_rgba(245,166,35,0.5)]" />

          <div className="flex flex-wrap items-baseline gap-x-3 text-sm">
            <span className="text-acc/80">{hash(exp.company)}</span>
            <span className="font-semibold text-pal-50">{exp.title}</span>
            <span className="text-pal-400">·</span>
            <span className="text-term-green">{exp.company}</span>
          </div>

          <p className="mt-1 text-xs text-pal-400">Date: {exp.period}</p>

          <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-pal-300">
            {exp.description}
          </p>
        </motion.div>
      ))}
    </motion.div>
  )
}
