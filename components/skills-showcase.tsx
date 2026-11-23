"use client"

import { motion } from "framer-motion"

import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations"

/* Skills grouped by area. */
const groups: { dir: string; items: string[] }[] = [
  { dir: "Machine learning", items: ["Python", "PyTorch", "TensorFlow", "Deep learning", "Computer vision", "Scikit-learn"] },
  { dir: "Language models", items: ["Transformers", "RAG", "LLMs", "Prompt engineering", "Agentic AI", "Generative AI"] },
  { dir: "Infrastructure", items: ["AWS", "Docker", "MLOps", "Git", "FastAPI", "Flask"] },
  { dir: "Data", items: ["Pandas", "NumPy", "Power BI", "Jupyter", "Data analysis"] },
  { dir: "Web", items: ["React", "Next.js", "REST APIs", "SEO"] },
]

export function SkillsShowcase() {
  return (
    <div className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-4 sm:px-6">
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
            className="grid grid-cols-1 items-center gap-x-6 gap-y-3 py-5 sm:grid-cols-[13rem_1fr]"
          >
            <div className="font-display text-3xl leading-none text-acc crt-glow">{g.dir}</div>
            <div className="flex flex-wrap gap-2">
              {g.items.map((item) => (
                <span key={item} className="tv-chip tv-chip-lg">
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
