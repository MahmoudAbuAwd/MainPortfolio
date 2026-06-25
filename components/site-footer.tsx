import Link from "next/link"

const navLinks = [
  { label: "home", href: "/" },
  { label: "blog", href: "/blog" },
  { label: "resources", href: "/resources" },
  { label: "contact", href: "/contact" },
]

const socialLinks = [
  { label: "github", href: "https://github.com/MahmoudAbuAwd" },
  { label: "linkedin", href: "https://www.linkedin.com/in/mahmoud-abuawd-247290225/" },
  { label: "twitter", href: "https://twitter.com/s9mod" },
  { label: "email", href: "mailto:mahmoodabuawad08@gmail.com" },
]

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 mt-24 border-t border-white/[0.08] font-mono">
      <div className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-4 py-12 sm:px-6">
        <p className="text-sm">
          <span className="text-term-green">mahmoud@abuawd</span>
          <span className="text-pal-400">:</span>
          <span className="text-amber-400">~</span>
          <span className="text-pal-400">$ </span>
          <span className="text-pal-200">echo &quot;thanks for stopping by&quot;</span>
        </p>
        <p className="mt-2 text-sm text-pal-300">&gt; thanks for stopping by</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-pal-400">links</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-pal-300 transition-colors hover:text-amber-300">
                    <span className="text-pal-500">/</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-pal-400">connect</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {socialLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    target={l.href.startsWith("mailto") ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    className="text-pal-300 transition-colors hover:text-amber-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-dashed border-white/[0.1] pt-6 text-xs text-pal-400 sm:flex-row sm:items-center sm:justify-between">
          <p># © {year} Mahmoud AbuAwd — all rights reserved</p>
          <p className="cursor-blink">built with next.js, tailwind &amp; framer-motion</p>
        </div>
      </div>
    </footer>
  )
}
