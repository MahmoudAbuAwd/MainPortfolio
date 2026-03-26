"use client"

import Link from "next/link"
import { ArrowUpRight, Github } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  repoUrl: string
  demoUrl?: string | null
}

export function ProjectCard({ title, description, tags, repoUrl, demoUrl }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="group h-full"
    >
      <div className="flex h-full flex-col rounded-2xl glass p-6 transition-all duration-500 hover:border-white/[0.14] hover:shadow-[0_16px_48px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.1)]">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-pal-200">{description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="glass-pill rounded-lg px-2.5 py-0.5 text-xs text-pal-200"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-2 border-t border-white/[0.06] pt-4 mt-6">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-pal-200 hover:text-white hover:bg-white/[0.06]"
            asChild
          >
            <Link href={repoUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-1.5 h-3.5 w-3.5" />
              Source
            </Link>
          </Button>
          {demoUrl && (
            <Button
              size="sm"
              className="h-8 bg-pal-500 hover:bg-pal-400 text-white border-0"
              asChild
            >
              <Link href={demoUrl} target="_blank" rel="noopener noreferrer">
                Live Demo
                <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
