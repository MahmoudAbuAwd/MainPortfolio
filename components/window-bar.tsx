import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface WindowBarProps {
  /** Text/nodes shown after the traffic-light dots, e.g. a terminal path or filename. */
  path?: ReactNode
  /** Optional content pinned to the right edge (status text, action buttons). */
  actions?: ReactNode
  /** Tighter padding for compact chrome (e.g. the chatbot titlebar). */
  compact?: boolean
  className?: string
}

/**
 * Shared terminal-window chrome: the red/amber/green traffic-light dots plus an
 * optional path label. Single source of truth for the "window bar" used across
 * the hero, contact panels, the success modal, and the chatbot titlebar.
 */
export function WindowBar({ path, actions, compact = false, className }: WindowBarProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 border-b border-hair/[0.08] bg-hair/[0.02]",
        compact ? "px-3 py-2" : "px-4 py-2.5",
        className,
      )}
    >
      <span className="flex items-center gap-1.5" aria-hidden>
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-acc/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-term-green/80" />
      </span>
      {path != null && <span className="ml-2 text-xs text-pal-400">{path}</span>}
      {actions != null && <div className="ml-auto flex items-center gap-0.5">{actions}</div>}
    </div>
  )
}
