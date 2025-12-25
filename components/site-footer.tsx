import Link from "next/link"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/MahmoudAbuAwd",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mahmoud-abuawd-247290225/",
    icon: Linkedin,
  },
  {
    label: "Twitter",
    href: "https://twitter.com/s9mod",
    icon: Twitter,
  },
  {
    label: "Email",
    href: "mailto:mahmoodabuawad08@gmail.com",
    icon: Mail,
  },
]

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-24 border-t border-zinc-800/70 bg-zinc-950/30 backdrop-blur pt-12 pb-10">
      <div className="container grid gap-8 md:grid-cols-[1.6fr_1fr] lg:grid-cols-[1.8fr_1fr_1fr]">
        <div className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-2 text-xl font-semibold">
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Mahmoud
            </span>
            <span className="text-white">AbuAwd</span>
          </Link>
          <p className="max-w-lg text-sm text-zinc-500">
            Crafting intelligent products that blend AI, thoughtful design, and reliable engineering.
            Follow along for insights, experiments, and resources.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">Quick Links</h3>
          <ul className="space-y-2 text-sm text-zinc-500">
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/blog" className="transition-colors hover:text-white">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/resources" className="transition-colors hover:text-white">
                Resources
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition-colors hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">Stay Connected</h3>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <Link key={label} href={href} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full border border-zinc-800/60 bg-zinc-900/60 text-zinc-400 transition-colors hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{label}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container mt-10 flex flex-col gap-4 border-t border-zinc-800/70 pt-6 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
        <p>© {year} Mahmoud AbuAwd. All rights reserved.</p>
        <p className="text-xs text-zinc-600">
          Designed & built with passion for AI, machine learning, and meaningful digital experiences.
        </p>
      </div>
    </footer>
  )
}
