"use client"

import { Mail, Phone, MapPin, ArrowUpRight, Github, Linkedin, Download } from "lucide-react"
import Link from "next/link"

import { FloatingNav } from "@/components/floating-nav"
import { SiteFooter } from "@/components/site-footer"
import { ContactForm } from "@/components/contact-form"
import { WindowBar } from "@/components/window-bar"
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal"

const contactRows = [
  { icon: Mail, key: "email", value: "mahmoodabuawad08@gmail.com", href: "mailto:mahmoodabuawad08@gmail.com" },
  { icon: Phone, key: "phone", value: "+962 79 103 4222", href: "tel:+962791034222" },
  { icon: MapPin, key: "location", value: "Amman, Jordan", href: null },
]

const quickLinks = [
  { icon: Github, label: "github", sub: "projects & contributions", href: "https://github.com/MahmoudAbuAwd" },
  { icon: Linkedin, label: "linkedin", sub: "connect professionally", href: "https://www.linkedin.com/in/mahmoud-abuawd-247290225/" },
]

function handleDownloadResume() {
  const link = document.createElement("a")
  link.href = "/Resume.pdf"
  link.download = "Resume.pdf"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export default function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-pal-950 font-mono text-pal-100">
      <div className="terminal-atmosphere" aria-hidden />

      <a
        href="#contact-main"
        className="sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-50 focus-visible:rounded-sm focus-visible:bg-pal-900 focus-visible:px-4 focus-visible:py-2 focus-visible:text-acc focus-visible:ring-2 focus-visible:ring-acc"
      >
        Skip to main content
      </a>
      <FloatingNav />

      <main id="contact-main" className="relative z-10 px-4 pb-24 pt-28 sm:px-6" role="main">
        {/* Hero */}
        <section className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-sm text-pal-400">
              <span className="text-term-green">~/contact</span> $ ./reach-out
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-pal-50 sm:text-4xl lg:text-5xl">
              Get in Touch
            </h1>
            <p className="mt-4 max-w-xl font-sans leading-relaxed text-pal-300">
              Have a project in mind or want to collaborate? I&rsquo;d love to hear from you.
            </p>
          </Reveal>
        </section>

        {/* Info + form */}
        <section className="mx-auto mt-14 max-w-5xl">
          <RevealGroup className="grid gap-6 lg:grid-cols-2" stagger={0.12}>
          {/* Left column */}
          <RevealItem className="space-y-6">
            <div className="rounded-md border border-hair/[0.08] bg-pal-900/40 p-6">
              <p className="text-xs text-pal-400">
                <span className="text-acc">$</span> cat contact.json
              </p>
              <div className="mt-4 space-y-3">
                {contactRows.map((row) => (
                  <div key={row.key} className="flex items-center gap-3 text-sm">
                    <row.icon className="h-4 w-4 shrink-0 text-acc" />
                    <span className="w-20 shrink-0 text-pal-400">{row.key}</span>
                    {row.href ? (
                      <a href={row.href} className="truncate text-pal-100 transition-colors hover:text-acc">
                        {row.value}
                      </a>
                    ) : (
                      <span className="truncate text-pal-100">{row.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-md border border-hair/[0.08] bg-pal-900/40 p-6">
              <p className="text-xs text-pal-400">
                <span className="text-acc">$</span> ls ./links
              </p>
              <div className="mt-4 space-y-2">
                {quickLinks.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-sm border border-hair/[0.08] bg-hair/[0.02] px-3 py-2.5 transition-colors hover:border-acc/40 hover:bg-acc/[0.06]"
                  >
                    <l.icon className="h-4 w-4 text-pal-300 transition-colors group-hover:text-acc" />
                    <span className="flex-1">
                      <span className="block text-sm text-pal-100">{l.label}</span>
                      <span className="block text-xs text-pal-400">{l.sub}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-pal-400 transition-colors group-hover:text-acc" />
                  </a>
                ))}
                <button
                  onClick={handleDownloadResume}
                  className="group flex w-full items-center gap-3 rounded-sm border border-hair/[0.08] bg-hair/[0.02] px-3 py-2.5 text-left transition-colors hover:border-acc/40 hover:bg-acc/[0.06]"
                >
                  <Download className="h-4 w-4 text-pal-300 transition-colors group-hover:text-acc" />
                  <span className="flex-1">
                    <span className="block text-sm text-pal-100">./resume.pdf</span>
                    <span className="block text-xs text-pal-400">download latest CV</span>
                  </span>
                </button>
              </div>
            </div>
          </RevealItem>

          {/* Right column — form */}
          <RevealItem className="overflow-hidden rounded-md term-panel">
            <WindowBar path="new-message.txt" />
            <div className="p-6">
              <ContactForm />
            </div>
          </RevealItem>
          </RevealGroup>
        </section>

        {/* CTA */}
        <section className="mx-auto mt-16 max-w-5xl">
          <Reveal className="flex flex-col gap-4 rounded-md border border-hair/[0.08] bg-pal-900/40 p-8 text-center md:flex-row md:items-center md:text-left">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-pal-50">Looking for my work?</h2>
              <p className="mt-2 font-sans text-sm text-pal-300">
                Check out my projects to see what I&rsquo;ve been building.
              </p>
            </div>
            <Link
              href="/#projects"
              className="inline-flex items-center justify-center gap-1.5 rounded-sm border border-acc/40 bg-acc/10 px-5 py-2.5 text-sm text-acc transition-colors hover:bg-acc/20"
            >
              view projects
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
