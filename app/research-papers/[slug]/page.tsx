import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { BookOpen, CalendarDays, FileText, Globe, ExternalLink } from "lucide-react"

import { FloatingNav } from "@/components/floating-nav"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { DoiCopyButton } from "@/components/doi-copy-button"
import { papers } from "../data"

export async function generateStaticParams() {
  return papers.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const paper = papers.find((p) => p.slug === params.slug)
  if (!paper) return {}
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://abuawd.online"
  const canonical = `${siteUrl}/research-papers/${paper.slug}`
  return {
    title: `${paper.title} | Research Paper`,
    description: paper.abstract ?? "Research paper details",
    alternates: { canonical },
    openGraph: {
      title: paper.title,
      description: paper.abstract,
      url: canonical,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: paper.title,
      description: paper.abstract,
    },
  }
}

function StructuredData({ paper }: { paper: (typeof papers)[number] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    name: paper.title,
    description: paper.abstract ?? paper.description,
    url: paper.url,
    identifier: paper.doi
      ? { "@type": "PropertyValue", propertyID: "DOI", value: paper.doi }
      : undefined,
    author: paper.authors?.map((a) => ({ "@type": "Person", name: a })),
    isAccessibleForFree: true,
    datePublished: paper.year,
    publisher: paper.venue,
  }
  return (
    <script suppressHydrationWarning type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-xs uppercase tracking-wide text-zinc-500 w-28">{label}</span>
      <div className="text-sm text-zinc-300">{children}</div>
    </div>
  )
}

export default function PaperDetailPage({ params }: { params: { slug: string } }) {
  const paper = papers.find((p) => p.slug === params.slug)
  if (!paper) return notFound()

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-950 to-black text-white">
      <a
        href="#paper-main"
        className="sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:rounded-lg focus-visible:bg-zinc-900 focus-visible:px-4 focus-visible:py-2 focus-visible:text-white focus-visible:shadow-lg"
      >
        Skip to main content
      </a>
      <FloatingNav />

      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-36 left-6 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-64 w-64 rounded-full bg-blue-700/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_65%)]" />
      </div>

      <main id="paper-main" className="relative pt-28 pb-24" role="main">
        <StructuredData paper={paper} />

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-1 text-sm text-blue-100">
              Research Paper
            </span>
            <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
              {paper.title}
            </h1>
            {paper.authors && paper.authors.length > 0 && (
              <p className="mt-2 text-sm text-zinc-400">{paper.authors.join("; ")}</p>
            )}
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-zinc-400">
              {paper.venue && (
                <span className="inline-flex items-center gap-1 rounded-full border border-zinc-800/60 bg-zinc-900/50 px-2.5 py-1">
                  <BookOpen className="h-3.5 w-3.5" /> {paper.venue}
                </span>
              )}
              {paper.year && (
                <span className="inline-flex items-center gap-1 rounded-full border border-zinc-800/60 bg-zinc-900/50 px-2.5 py-1">
                  <CalendarDays className="h-3.5 w-3.5" /> {paper.year}
                </span>
              )}
              {paper.languages && (
                <span className="inline-flex items-center gap-1 rounded-full border border-zinc-800/60 bg-zinc-900/50 px-2.5 py-1">
                  <Globe className="h-3.5 w-3.5" /> {paper.languages.join(", ")}
                </span>
              )}
            </div>
          </div>
        </section>

        <section className="mt-10 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-3xl border border-zinc-800/80 bg-zinc-900/60 p-6">
            <div className="flex flex-wrap items-center gap-3">
              {paper.doi && <DoiCopyButton doi={paper.doi} />}
              <a
                href={paper.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border border-blue-500/40 bg-blue-500/10 px-3 py-2 text-sm font-semibold text-blue-200 transition-colors hover:border-blue-400 hover:text-blue-100"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View on DOI
              </a>
              <Link
                href="/research-papers"
                className="inline-flex items-center rounded-lg border border-zinc-800/60 bg-zinc-900/40 px-3 py-2 text-sm font-semibold text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white"
              >
                Back to list
              </Link>
            </div>

            <div className="mt-6 space-y-6">
              {paper.abstract && (
                <InfoRow label="Abstract">
                  <p className="text-zinc-300">{paper.abstract}</p>
                </InfoRow>
              )}
              {paper.description && (
                <InfoRow label="Description">
                  <p className="text-zinc-300 whitespace-pre-line">{paper.description}</p>
                </InfoRow>
              )}
              {paper.keywords && paper.keywords.length > 0 && (
                <InfoRow label="Keywords">
                  <div className="flex flex-wrap gap-2">
                    {paper.keywords.map((k) => (
                      <span key={k} className="inline-flex items-center rounded-full border border-zinc-800/60 bg-zinc-900/50 px-2.5 py-1 text-xs text-zinc-400">
                        {k}
                      </span>
                    ))}
                  </div>
                </InfoRow>
              )}
              {paper.doi && (
                <InfoRow label="DOI">
                  <a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 text-sm">
                    {paper.doi}
                  </a>
                </InfoRow>
              )}
              {/* Removed All Versions DOI row as requested */}
              {paper.license && (
                <InfoRow label="License">
                  <span className="text-sm text-zinc-300">{paper.license}</span>
                </InfoRow>
              )}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
