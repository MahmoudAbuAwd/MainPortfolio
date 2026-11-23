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
      <span className="h-2 w-2 rounded-full bg-acc shadow-[0_0_8px_rgb(var(--acc)/0.8)]" aria-hidden />
      {path != null && <span className="ml-1 font-display text-xl leading-none text-pal-200">{path}</span>}
      {actions != null && <div className="ml-auto flex items-center gap-0.5">{actions}</div>}
    </div>
  )
}
