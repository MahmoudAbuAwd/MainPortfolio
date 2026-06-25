"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Download, ChevronRight } from "lucide-react"

import { useMobile } from "@/hooks/use-mobile"
import { ThemeToggle } from "@/components/theme-toggle"

export function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const isMobile = useMobile()
  const pathname = usePathname()
  const openMenuButtonRef = useRef<HTMLButtonElement>(null)
  const closeMenuButtonRef = useRef<HTMLButtonElement>(null)
  const firstNavLinkRef = useRef<HTMLAnchorElement>(null)

  const navItems = [
    { name: "home", href: "/" },
    { name: "blog", href: "/blog" },
    { name: "resources", href: "/resources" },
    { name: "contact", href: "/contact" },
  ]

  const handleDownloadResume = () => {
    const link = document.createElement("a")
    link.href = "/resume/Resume.pdf"
    link.download = "Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 64)
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      const timeout = window.setTimeout(() => {
        ;(isMobile ? firstNavLinkRef.current : null)?.focus()
      }, 120)
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") setIsOpen(false)
      }
      window.addEventListener("keydown", handleKeyDown)
      return () => {
        window.clearTimeout(timeout)
        window.removeEventListener("keydown", handleKeyDown)
      }
    } else if (isMobile) {
      openMenuButtonRef.current?.focus()
    }
  }, [isOpen, isMobile])

  return (
    <>
      <motion.nav
        className={clsx(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
          isScrolled
            ? "border-hair/[0.08] bg-pal-950/85 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
        aria-label="Primary"
      >
        <div className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-4 md:px-6">
          <div
            className={clsx(
              "flex items-center gap-4 font-mono transition-all duration-300",
              isScrolled ? "h-12" : "h-14"
            )}
          >
            {/* Window dots + prompt path */}
            <Link href="/" className="group flex items-center gap-3 text-sm">
              <span className="hidden items-center gap-1.5 sm:flex" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-acc/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-term-green/80" />
              </span>
              <span className="tracking-tight">
                <span className="text-term-green">mahmoud@abuawd</span>
                <span className="text-pal-400">:</span>
                <span className="text-acc">~</span>
                <span className="text-pal-400 transition-colors group-hover:text-acc">$</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="ml-auto hidden items-center gap-1 md:flex">
              {navItems.map((item) => {
                const active = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={clsx(
                      "rounded-sm px-3 py-1.5 text-sm transition-colors",
                      active
                        ? "text-acc"
                        : "text-pal-300 hover:bg-hair/[0.04] hover:text-pal-50"
                    )}
                  >
                    <span className="text-pal-500">/</span>
                    {item.name}
                  </Link>
                )
              })}
            </div>

            <div className="ml-auto flex items-center gap-2 md:ml-3">
              <ThemeToggle />
              <button
                onClick={handleDownloadResume}
                className="hidden items-center gap-1.5 rounded-sm border border-acc/40 bg-acc/10 px-3 py-1.5 text-sm text-acc transition-colors hover:bg-acc/20 hover:text-acc md:inline-flex"
              >
                <Download className="h-3.5 w-3.5" />
                ./resume.pdf
              </button>

              <button
                className="flex h-9 w-9 items-center justify-center rounded-sm border border-hair/[0.1] bg-hair/[0.03] text-pal-200 transition-colors hover:border-acc/40 hover:text-acc md:hidden"
                onClick={() => setIsOpen(true)}
                aria-label="Open menu"
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
                ref={openMenuButtonRef}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-pal-950/90 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              role="presentation"
            />
            <motion.div
              className="fixed inset-y-0 left-0 z-50 w-72 border-r border-hair/[0.1] bg-pal-900 font-mono"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-navigation-title"
            >
              <div className="flex h-full flex-col p-6">
                <div className="mb-8 flex items-center justify-between">
                  <span id="mobile-navigation-title" className="text-sm">
                    <span className="text-term-green">~/menu</span>
                    <span className="cursor-blink" />
                  </span>
                  <button
                    className="rounded-sm p-2 text-pal-200 transition-colors hover:bg-hair/[0.05] hover:text-acc"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close menu"
                    ref={closeMenuButtonRef}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <nav className="flex-1 space-y-1">
                  {navItems.map((item, index) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-between rounded-sm px-3 py-3 text-pal-200 transition-colors hover:bg-hair/[0.04] hover:text-acc"
                      onClick={() => setIsOpen(false)}
                      ref={index === 0 ? firstNavLinkRef : undefined}
                    >
                      <span>
                        <span className="text-pal-500">cd </span>
                        {item.name}
                      </span>
                      <ChevronRight className="h-4 w-4 text-pal-400" aria-hidden="true" />
                    </Link>
                  ))}
                </nav>

                <button
                  onClick={handleDownloadResume}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-sm border border-acc/40 bg-acc/10 px-4 py-3 text-sm text-acc transition-colors hover:bg-acc/20"
                >
                  <Download className="h-4 w-4" />
                  ./resume.pdf
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
