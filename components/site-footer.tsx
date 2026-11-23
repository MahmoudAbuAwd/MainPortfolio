import Link from "next/link"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
]

const socialLinks = [
  { label: "GitHub", href: "https://github.com/MahmoudAbuAwd" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mahmoud-abuawd-247290225/" },
  { label: "Twitter", href: "https://twitter.com/s9mod" },
  { label: "Email", href: "mailto:mahmoodabuawad08@gmail.com" },
]

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 mt-24 border-t border-hair/[0.08] font-mono">
      <div className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-4 py-12 sm:px-6">
        <p className="crt-glow font-display text-4xl text-acc sm:text-5xl">End of broadcast</p>
        <p className="mt-2 text-sm text-pal-300">Thanks for stopping by.</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="font-display text-xl text-pal-300">Pages</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-pal-300 transition-colors hover:text-acc">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-display text-xl text-pal-300">Find me</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {socialLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    target={l.href.startsWith("mailto") ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    className="text-pal-300 transition-colors hover:text-acc"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-dashed border-hair/[0.1] pt-6 text-xs text-pal-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Mahmoud AbuAwd. All rights reserved.</p>
          <p className="cursor-blink">Built with Next.js, Tailwind and Framer Motion</p>
        </div>
      </div>
    </footer>
  )
}
