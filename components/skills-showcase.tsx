"use client"

/* ──────────────────────────────────────────────────────────────────
   Skills Showcase — Infinite scrolling text marquees
   Each row slides continuously; alternating directions + speeds.
   Skills rendered as large serif/italic text with a glass separator dot.
────────────────────────────────────────────────────────────────── */

const rows = [
  {
    skills: [
      "Python",
      "PyTorch",
      "TensorFlow",
      "Deep Learning",
      "Computer Vision",
      "NLP",
      "LLMs",
      "Generative AI",
    ],
    speed: 30,
    reverse: false,
  },
  {
    skills: [
      "RAG",
      "Transformers",
      "Prompt Engineering",
      "Scikit-learn",
      "Agentic AI",
      "MLOps",
      "AWS",
      "Docker",
    ],
    speed: 38,
    reverse: true,
  },
  {
    skills: [
      "React",
      "Next.js",
      "SEO",
      "Flask",
      "FastAPI",
      "REST APIs",
      "Git & GitHub",
      "Pandas",
      "NumPy",
    ],
    speed: 34,
    reverse: false,
  },
  {
    skills: [
      "Power BI",
      "Jupyter",
      "Data Analysis",
      "Computer Vision",
      "Agentic AI",
      "Generative AI",
      "LLMs",
      "Deep Learning",
    ],
    speed: 42,
    reverse: true,
  },
]

function MarqueeRow({
  skills,
  speed,
  reverse,
}: {
  skills: string[]
  speed: number
  reverse: boolean
}) {
  // duplicate for seamless loop
  const doubled = [...skills, ...skills]

  return (
    <div className="relative overflow-hidden select-none">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 sm:w-32 bg-gradient-to-r from-pal-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 sm:w-32 bg-gradient-to-l from-pal-950 to-transparent" />

      <div
        className={`flex w-max items-center gap-0 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
        style={{ "--marquee-duration": `${speed}s` } as React.CSSProperties}
      >
        {doubled.map((skill, i) => (
          <span key={`${skill}-${i}`} className="flex items-center">
            <span className="whitespace-nowrap px-3 sm:px-5 text-lg sm:text-xl md:text-2xl font-serif italic font-bold tracking-tight text-white/80 transition-colors duration-300 hover:text-white cursor-default">
              {skill}
            </span>
            <span className="text-pal-400/50 text-lg select-none">/</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export function SkillsShowcase() {
  return (
    <div className="space-y-5 sm:space-y-6">
      {rows.map((row, i) => (
        <MarqueeRow key={i} {...row} />
      ))}
    </div>
  )
}
