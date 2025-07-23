"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Download, ChevronRight, User, Code, Briefcase, Rocket, Award, GitCommit, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

export function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "About", href: "#about", icon: <User className="h-4 w-4" /> },
    { name: "Skills", href: "#skills", icon: <Code className="h-4 w-4" /> },
    { name: "Certifications", href: "#certifications", icon: <Award className="h-4 w-4" /> },
    { name: "Projects", href: "#projects", icon: <Rocket className="h-4 w-4" /> },
    { name: "Work", href: "#experience", icon: <Briefcase className="h-4 w-4" /> },
    { name: "Activity", href: "#activity", icon: <GitCommit className="h-4 w-4" /> },
    { name: "Contact", href: "#contact", icon: <Mail className="h-4 w-4" /> },
  ]

  const handleDownloadResume = () => {
    const link = document.createElement('a')
    link.href = '/CV.pdf'
    link.download = 'CV.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className={`fixed top-6 left-6 z-50 hidden md:block ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        initial={{ x: -100 }}
        animate={{ x: isVisible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-900/80 backdrop-blur-md border border-zinc-800 shadow-lg">
          {/* Name/Logo */}
          <Link href="/" className="flex items-center mr-4">
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              MA
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3.5 py-1.5 text-sm font-medium flex items-center gap-2 text-zinc-300 hover:text-white transition-colors rounded-lg hover:bg-zinc-800/50"
              >
                <span className="opacity-70 hover:opacity-100 transition-opacity">
                  {item.icon}
                </span>
                {item.name}
              </Link>
            ))}
          </div>

          {/* Resume Button */}
          <Button
            size="sm"
            className="ml-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-[0_0_0_1px_rgba(255,255,255,0.05)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1)] transition-all"
            onClick={handleDownloadResume}
          >
            <Download className="h-4 w-4 mr-2" />
            Resume
          </Button>
        </div>
      </motion.nav>

      {/* Mobile Menu Button */}
      <motion.div
        className={`fixed top-6 right-6 z-50 md:hidden ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: isVisible ? 1 : 0.8, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-full bg-zinc-900/80 backdrop-blur-md border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800/50 shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </motion.div>

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
            />

            <motion.div
              className="fixed inset-y-0 left-0 z-50 w-72 bg-zinc-900 border-r border-zinc-800 shadow-xl"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-col h-full p-6">
                {/* Header with Close Button */}
                <div className="flex justify-between items-center mb-8">
                  <Link href="/" className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                    Mahmoud AbuAwd
                  </Link>
                  <button
                    className="p-2 rounded-lg hover:bg-zinc-800/50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-5 w-5 text-zinc-300" />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-between px-4 py-3 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800/50 transition-colors group"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                          {item.icon}
                        </span>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
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