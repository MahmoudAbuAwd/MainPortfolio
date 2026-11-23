"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, Download } from "lucide-react"

import { ROUTES, useTV } from "@/components/tv-frame"

/**
 * On-screen display (OSD) bar, pinned to the top of the glass.
 * Left: the current channel; opens a guide with every section + page.
 * Right (md+): page links and the résumé button.
 */
export function FloatingNav() {
  const { channels, current, goTo, display, scrollRef } = useTV()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const root = scrollRef.current
    if (!root) return
    const onScroll = () => setScrolled(root.scrollTop > 40)
    onScroll()
    root.addEventListener("scroll", onScroll, { passive: true })
    return () => root.removeEventListener("scroll", onScroll)
  }, [scrollRef])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const download = () => {
    const a = document.createElement("a")
    a.href = "/Resume.pdf"
    a.download = "Resume.pdf"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href))

  return (
    <>
      <nav
        aria-label="Primary"
        className={clsx("tv-osd", scrolled && "is-scrolled")}
      >
        <div className="relative flex items-center gap-4">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="channel-guide"
            className="osd-channel"
          >
            <span className="osd-ch">CH</span>
            <span className="osd-num">{String(display.index + 1).padStart(2, "0")}</span>
            <span className="osd-name">{display.label}</span>
            <ChevronDown
              className={clsx("h-4 w-4 transition-transform", open && "rotate-180")}
              aria-hidden
            />
          </button>

          <div className="ml-auto hidden items-center gap-1 md:flex">
            {ROUTES.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                aria-current={isActive(r.href) ? "page" : undefined}
                className={clsx("osd-link", isActive(r.href) && "is-active")}
              >
                {r.label}
              </Link>
            ))}
            <button type="button" onClick={download} className="osd-btn ml-2">
              <Download className="h-3.5 w-3.5" aria-hidden />
              Résumé
            </button>
          </div>

          <AnimatePresence>
            {open && (
              <>
                <div
                  className="fixed inset-0 z-[-1]"
                  onClick={() => setOpen(false)}
                  role="presentation"
                />
                <motion.div
                  id="channel-guide"
                  className="osd-guide"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                >
                  {channels.length >= 2 && (
                    <>
                      <p className="osd-guide-title">On this page</p>
                      <ul>
                        {channels.map((c, i) => (
                          <li key={c.id}>
                            <button
                              type="button"
                              className={clsx("osd-guide-row", i === current && "is-active")}
                              onClick={() => {
                                goTo(i)
                                setOpen(false)
                              }}
                            >
                              <span className="osd-guide-num">{String(i + 1).padStart(2, "0")}</span>
                              {c.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  <p className="osd-guide-title">Pages</p>
                  <ul>
                    {ROUTES.map((r) => (
                      <li key={r.href}>
                        <Link
                          href={r.href}
                          className={clsx("osd-guide-row", isActive(r.href) && "is-active")}
                          onClick={() => setOpen(false)}
                        >
                          {r.label}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <button type="button" className="osd-guide-row" onClick={download}>
                        <Download className="h-3.5 w-3.5" aria-hidden />
                        Download résumé
                      </button>
                    </li>
                  </ul>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  )
}
