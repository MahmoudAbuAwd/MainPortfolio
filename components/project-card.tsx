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

export function ProjectCard({ index = 0, title, description, tags, repoUrl, demoUrl }: ProjectCardProps) {
  const num = String(index + 1).padStart(2, "0")

  return (
    <motion.div variants={staggerItem} whileHover={hoverLift} className="group h-full">
      <div className="tv-card flex h-full flex-col p-5">
        <span className="tv-num">{num}</span>

        <h3 className="mt-2 font-display text-3xl leading-[1.05] text-pal-50">{title}</h3>

        <p className="mt-2 font-sans text-sm leading-relaxed text-pal-300">{description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="tv-chip">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-5 border-t border-dashed border-hair/[0.1] pt-4 font-display text-2xl leading-none">
          <Link
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-pal-200 transition-colors hover:text-acc"
          >
            <GitBranch className="h-3.5 w-3.5" />
            Source code
          </Link>
          {demoUrl && (
            <Link
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/demo inline-flex items-center gap-1 text-acc transition-colors hover:text-acc"
            >
              Live demo
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  )
}
