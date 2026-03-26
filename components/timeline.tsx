"use client"

import { motion } from "framer-motion"

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

export function Timeline() {
  return (
    <div className="relative space-y-0 border-l border-white/[0.08] ml-3">
      {experiences.map((exp, index) => (
        <motion.div
          key={index}
          className="relative pl-8 pb-10 last:pb-0"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          viewport={{ once: true }}
        >
          <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-pal-200 bg-pal-950 shadow-[0_0_8px_rgba(166,177,225,0.3)]" />

          <div className="glass rounded-2xl p-5 transition-all duration-500 hover:border-white/[0.14] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)]">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold text-white">{exp.title}</h3>
                <p className="text-sm text-pal-200">{exp.company}</p>
              </div>
              <span className="text-xs font-medium text-pal-300">{exp.period}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-pal-200">{exp.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
