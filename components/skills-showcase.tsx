"use client"

import { motion } from "framer-motion"

import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations"

/* Skills grouped like directories in a project tree. */
const groups: { dir: string; items: string[] }[] = [
  { dir: "ml", items: ["python", "pytorch", "tensorflow", "deep-learning", "computer-vision", "scikit-learn"] },
  { dir: "nlp", items: ["transformers", "rag", "llms", "prompt-engineering", "agentic-ai", "generative-ai"] },
  { dir: "infra", items: ["aws", "docker", "mlops", "git", "fastapi", "flask"] },
  { dir: "data", items: ["pandas", "numpy", "power-bi", "jupyter", "data-analysis"] },
  { dir: "web", items: ["react", "next.js", "rest-apis", "seo"] },
]

export function SkillsShowcase() {
  return (
    <div className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-4 font-mono sm:px-6">
      <p className="mb-6 text-xs text-pal-400">
        <span className="text-term-green">~/skills</span> $ ls -1 --group
      </p>

      <motion.div
        className="divide-y divide-hair/[0.06] border-y border-hair/[0.06]"
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {groups.map((g) => (
          <motion.div
            key={g.dir}
            variants={staggerItem}
            className="grid grid-cols-1 gap-x-6 gap-y-2 py-4 sm:grid-cols-[7rem_1fr]"
          >
            <div className="text-sm text-acc">{g.dir}/</div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {g.items.map((item) => (
                <span
                  key={item}
                  className="text-pal-300 transition-colors duration-200 hover:text-pal-50"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
