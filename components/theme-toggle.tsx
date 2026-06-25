"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // Default theme is dark, so before hydration assume dark to avoid an
  // empty/flashing button. After mount, read the real resolved theme.
  const isDark = !mounted ? true : (resolvedTheme ?? theme) !== "light"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-sm border border-acc/40 bg-acc/10 px-2.5 text-sm text-acc transition-colors hover:bg-acc/20 focus:outline-none",
        className
      )}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="hidden sm:inline">{isDark ? "light" : "dark"}</span>
    </button>
  )
}
