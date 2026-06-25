"use client"

import Link from "next/link"
import { ArrowUpRight, GitBranch } from "lucide-react"
import { motion } from "framer-motion"

import { staggerItem, hoverLift } from "@/lib/animations"

interface ProjectCardProps {
  index?: number
  title: string
  description: string
  tags: string[]
  repoUrl: string
  demoUrl?: string | null
}

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

export function ProjectCard({ index = 0, title, description, tags, repoUrl, demoUrl }: ProjectCardProps) {
  const num = String(index + 1).padStart(2, "0")

  return (
    <motion.div variants={staggerItem} whileHover={hoverLift} className="group h-full">
      <div className="flex h-full flex-col border border-white/[0.08] bg-pal-900/40 p-5 transition-colors duration-300 group-hover:border-amber-400/40 group-hover:bg-pal-900/70">
        {/* Top meta row */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-amber-400">[{num}]</span>
          <span className="truncate text-pal-400">~/projects/{slug(title)}</span>
        </div>

        <h3 className="mt-3 text-lg font-semibold tracking-tight text-pal-50">{title}</h3>

        <p className="mt-2 font-sans text-sm leading-relaxed text-pal-300">{description}</p>

        <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-pal-400">
          {tags.map((tag) => (
            <span key={tag} className="transition-colors group-hover:text-pal-200">
              #{tag.toLowerCase().replace(/\s+/g, "-")}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-5 border-t border-dashed border-white/[0.1] pt-4 text-sm">
          <Link
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-pal-200 transition-colors hover:text-amber-300"
          >
            <GitBranch className="h-3.5 w-3.5" />
            source
          </Link>
          {demoUrl && (
            <Link
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/demo inline-flex items-center gap-1 text-amber-400 transition-colors hover:text-amber-300"
            >
              live
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  )
}
