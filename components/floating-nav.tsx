"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import clsx from "clsx"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Download, ChevronRight, Mail, BookOpen, PenSquare, Home, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

const brandFontClass = "font-sans"

export function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const isMobile = useMobile()
  const openMenuButtonRef = useRef<HTMLButtonElement>(null)
  const closeMenuButtonRef = useRef<HTMLButtonElement>(null)
  const firstNavLinkRef = useRef<HTMLAnchorElement>(null)

  const navItems = [
    { name: "Home", href: "/", icon: <Home className="h-4 w-4" /> },
    { name: "Blog", href: "/blog", icon: <PenSquare className="h-4 w-4" /> },
    { name: "Resources", href: "/resources", icon: <BookOpen className="h-4 w-4" /> },
    { name: "Contact", href: "/contact", icon: <Mail className="h-4 w-4" /> },
  ]

  const handleDownloadResume = () => {
    const link = document.createElement('a')
    link.href = '/Resume.pdf'
    link.download = 'Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 64)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      const timeout = window.setTimeout(() => {
        (isMobile ? firstNavLinkRef.current : null)?.focus()
      }, 120)

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setIsOpen(false)
        }
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
      {/* Top Navigation (always visible) */}
      <motion.nav
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          "supports-[backdrop-filter]:backdrop-blur",
          isScrolled
            ? "border-b border-zinc-800/70 bg-zinc-950/85 backdrop-blur-xl shadow-[0_20px_45px_-30px_rgba(0,0,0,0.75)]"
            : "border-transparent bg-transparent"
        )}
        aria-label="Primary"
      >
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div
            className={clsx(
              "flex items-center gap-4 transition-all duration-300",
              isScrolled ? "h-14" : "h-16"
            )}
          >
            {/* Logo / Name */}
            <Link href="/" className="flex items-center">
              <span
                className={clsx(
                  brandFontClass,
                  "font-semibold tracking-tight uppercase text-white drop-shadow-[0_3px_20px_rgba(168,85,247,0.35)] transition-all duration-300",
                  isScrolled ? "text-xl" : "text-2xl"
                )}
              >
                Mahmoud
              </span>
            </Link>

            {/* Desktop nav */}
            <div
              className={clsx(
                "hidden md:flex items-center gap-1 ml-auto transition-all duration-300",
                isScrolled ? "gap-0.5" : "gap-1"
              )}
            >
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    "px-3.5 py-2 text-sm font-medium flex items-center gap-2 rounded-lg transition-all duration-200",
                    "text-zinc-300 hover:text-white",
                    isScrolled ? "hover:bg-zinc-900/60" : "hover:bg-zinc-800/50"
                  )}
                >
                  <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              ))}
            </div>

            <div
              className={clsx(
                "flex items-center gap-2 ml-auto md:ml-4 transition-all duration-300",
                isScrolled ? "gap-1" : "gap-2"
              )}
            >
              {/* Resume CTA */}
              <Button
                size="sm"
                className="hidden md:inline-flex rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-[0_0_0_1px_rgba(255,255,255,0.05)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1)] transition-all"
                onClick={handleDownloadResume}
              >
                <Download className="h-4 w-4 mr-2" />
                Resume
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className={clsx(
                  "md:hidden w-10 h-10 rounded-lg border text-zinc-300 transition-all duration-300",
                  isScrolled
                    ? "border-zinc-800 bg-zinc-950/80 hover:bg-zinc-900/70 hover:text-white"
                    : "border-zinc-800/70 bg-zinc-900/80 hover:bg-zinc-800/60 hover:text-white"
                )}
                onClick={() => setIsOpen(true)}
                aria-label="Open menu"
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
                ref={openMenuButtonRef}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-zinc-900/95 backdrop-blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={() => setIsOpen(false)}
              role="presentation"
            />

            <motion.div
              className="fixed inset-y-0 left-0 z-50 w-72 bg-zinc-900 border-r border-zinc-800 shadow-xl"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-navigation-title"
            >
              <div className="flex flex-col h-full p-6">
                {/* Header with Close Button */}
                <div className="flex justify-between items-center mb-8">
                  <Link
                    href="/"
                    className={clsx(
                      brandFontClass,
                      "text-2xl font-semibold tracking-tight uppercase text-white"
                    )}
                    id="mobile-navigation-title"
                    onClick={() => setIsOpen(false)}
                  >
                    Mahmoud AbuAwd
                  </Link>
                  <button
                    className="p-2 rounded-lg hover:bg-zinc-800/50 transition-colors"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close menu"
                    ref={closeMenuButtonRef}
                  >
                    <X className="h-5 w-5 text-zinc-300" />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 space-y-2">
                  {navItems.map((item, index) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-between px-4 py-3 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800/50 transition-colors group"
                      onClick={() => setIsOpen(false)}
                      ref={index === 0 ? firstNavLinkRef : undefined}
                    >
                      <div className="flex items-center gap-3">
                        <span className="opacity-70 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                          {item.icon}
                        </span>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" aria-hidden="true" />
                    </Link>
                  ))}
                </nav>

                {/* Resume Button */}
                <Button
                  className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]"
                  onClick={handleDownloadResume}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Resume
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
