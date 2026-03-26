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
    <footer className="mt-24 border-t border-white/[0.06] bg-pal-950/40 backdrop-blur-xl pt-12 pb-10">
      <div className="container grid gap-8 md:grid-cols-[1.6fr_1fr] lg:grid-cols-[1.8fr_1fr_1fr]">
        <div className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-2 text-xl font-semibold">
            <span className="text-pal-200">Mahmoud</span>
            <span className="text-white"> AbuAwd</span>
          </Link>
          <p className="max-w-lg text-sm text-pal-300">
            Crafting intelligent products that blend AI, thoughtful design, and reliable engineering.
            Follow along for insights, experiments, and resources.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-pal-200">Quick Links</h3>
          <ul className="space-y-2 text-sm text-pal-300">
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
          <h3 className="text-sm font-semibold uppercase tracking-wide text-pal-200">Stay Connected</h3>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <Link key={label} href={href} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full border border-pal-800 bg-pal-900/60 text-pal-200 transition-colors hover:border-pal-700 hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{label}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container mt-10 flex flex-col gap-4 border-t border-pal-800/70 pt-6 text-sm text-pal-300 md:flex-row md:items-center md:justify-between">
        <p>© {year} Mahmoud AbuAwd. All rights reserved.</p>
        <p className="text-xs text-pal-300">
          Designed & built with passion for AI, machine learning, and meaningful digital experiences.
        </p>
      </div>
    </footer>
  )
}
