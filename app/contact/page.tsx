"use client"

import { Metadata } from "next"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import Link from "next/link"

import { FloatingNav } from "@/components/floating-nav"
import { SiteFooter } from "@/components/site-footer"
import { ContactForm } from "@/components/contact-form"

const metadata: Metadata = {
  title: "Contact Me | Mahmoud AbuAwd",
  description: "Get in touch with Mahmoud AbuAwd for collaborations, opportunities, or inquiries about AI and machine learning projects.",
  keywords: [
    "contact",
    "Mahmoud AbuAwd",
    "AI consultant",
    "machine learning expert",
    "collaboration",
  ],
  openGraph: {
    title: "Contact Me | Mahmoud AbuAwd",
    description: "Get in touch for collaborations, opportunities, or inquiries about AI and machine learning projects.",
    url: "https://abuawd.online/contact",
    type: "website",
  },
  alternates: {
    canonical: "https://abuawd.online/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Me | Mahmoud AbuAwd",
    description: "Get in touch for collaborations, opportunities, or inquiries about AI and machine learning projects.",
  },
}

export default function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-950 to-black text-white">
      <a
        href="#contact-main"
        className="sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:rounded-lg focus-visible:bg-zinc-900 focus-visible:px-4 focus-visible:py-2 focus-visible:text-white focus-visible:shadow-lg"
      >
        Skip to main content
      </a>
      <FloatingNav />

      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-36 left-6 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-64 w-64 rounded-full bg-purple-700/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(147,51,234,0.08),_transparent_65%)]" />
      </div>

      <main id="contact-main" className="relative pt-28 pb-24" role="main">
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-purple-500/10 px-4 py-1 text-sm text-purple-100">
              Let's Connect
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
              Get in Touch
            </h1>
            <p className="mt-5 text-lg text-zinc-400">
              Have a project in mind or want to collaborate? I'd love to hear from you.
            </p>
          </div>
        </section>

        <section className="mt-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-2">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-8">
                <h2 className="text-2xl font-semibold text-white mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-full bg-purple-500/10 p-3">
                      <Mail className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Email</h3>
                      <a 
                        href="mailto:mahmoodabuawad08@gmail.com" 
                        className="text-zinc-400 hover:text-purple-300 transition-colors"
                      >
                        mahmoodabuawad08@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-full bg-purple-500/10 p-3">
                      <Phone className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Phone</h3>
                      <p className="text-zinc-400">+962791034222</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-full bg-purple-500/10 p-3">
                      <MapPin className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Location</h3>
                      <p className="text-zinc-400">Amman, Jordan</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-8">
                <h2 className="text-xl font-semibold text-white mb-4">Quick Links</h2>
                <p className="text-zinc-400 mb-6">
                  Connect with me or download my resume to learn more about my experience.
                </p>
                <div className="space-y-3">
                  <a
                    href="https://github.com/MahmoudAbuAwd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors group"
                  >
                    <svg className="h-5 w-5 text-zinc-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    <div className="flex-1">
                      <div className="font-medium text-white group-hover:text-purple-300 transition-colors">GitHub Profile</div>
                      <div className="text-xs text-zinc-500">View my projects and contributions</div>
                    </div>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/mahmoud-abuawd/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors group"
                  >
                    <svg className="h-5 w-5 text-zinc-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <div className="flex-1">
                      <div className="font-medium text-white group-hover:text-purple-300 transition-colors">LinkedIn Profile</div>
                      <div className="text-xs text-zinc-500">Connect with me professionally</div>
                    </div>
                  </a>

                  <button
                    onClick={() => {
                      const link = document.createElement('a')
                      link.href = '/Resume.pdf'
                      link.download = 'Resume.pdf'
                      document.body.appendChild(link)
                      link.click()
                      document.body.removeChild(link)
                    }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors group w-full"
                  >
                    <svg className="h-5 w-5 text-zinc-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-white group-hover:text-purple-300 transition-colors">Download Resume</div>
                      <div className="text-xs text-zinc-500">Get my latest CV (PDF)</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Send a Message</h2>
              <ContactForm />
            </div>
          </div>
        </section>

        <section className="mt-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-5xl flex-col gap-6 rounded-3xl border border-zinc-800/80 bg-zinc-900/60 px-8 py-10 text-center md:flex-row md:items-center md:text-left">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-white">
                Looking for my work?
              </h2>
              <p className="mt-3 text-sm text-zinc-400">
                Check out my portfolio and projects to see what I've been working on.
              </p>
            </div>
            <Link
              href="/#projects"
              className="inline-flex items-center justify-center rounded-full border border-purple-500/40 bg-purple-500/10 px-6 py-3 text-sm font-semibold text-purple-200 transition-colors hover:border-purple-400 hover:text-purple-100"
            >
              View Projects
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
