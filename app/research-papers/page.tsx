import Link from "next/link"
import { Metadata } from "next"
import { FileText, BookOpen, ExternalLink } from "lucide-react"

import { FloatingNav } from "@/components/floating-nav"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Research Papers | Mahmoud AbuAwd",
  description: "Peer-reviewed papers and technical writings authored by Mahmoud AbuAwd.",
  keywords: [
    "research papers",
    "scholarly articles",
    "AI research",
    "Mahmoud AbuAwd publications",
  ],
  openGraph: {
    title: "Research Papers | Mahmoud AbuAwd",
    description: "Browse authored research papers, preprints, and publications.",
    url: "https://abuawd.online/research-papers",
    type: "website",
  },
  alternates: {
    canonical: "https://abuawd.online/research-papers",
  },
  twitter: {
    card: "summary_large_image",
    title: "Research Papers | Mahmoud AbuAwd",
    description: "Browse authored research papers, preprints, and publications.",
  },
}

import { papers } from "./data"

export default function ResearchPapersPage() {
  const hasPapers = papers.length > 0

  const papersStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Research Papers by Mahmoud AbuAwd",
    description: "Peer-reviewed papers and technical writings authored by Mahmoud AbuAwd.",
    url: "https://abuawd.online/research-papers",
    mainEntity: {
      "@type": "ItemList",
      name: "Authored publications",
      itemListElement: papers.map((paper, index) => ({
        "@type": "ScholarlyArticle",
        name: paper.title,
        description: paper.abstract,
        url: paper.url,
        isAccessibleForFree: true,
        position: index + 1,
        publication: paper.venue,
        datePublished: paper.year,
        identifier: paper.doi
          ? { "@type": "PropertyValue", propertyID: "DOI", value: paper.doi }
          : undefined,
        author: paper.authors
          ? paper.authors.map((a) => ({ "@type": "Person", name: a }))
          : undefined,
      })),
    },
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-950 to-black text-white">
      <a
        href="#papers-main"
        className="sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:rounded-lg focus-visible:bg-zinc-900 focus-visible:px-4 focus-visible:py-2 focus-visible:text-white focus-visible:shadow-lg"
      >
        Skip to main content
      </a>
      <FloatingNav />

      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-36 left-6 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-64 w-64 rounded-full bg-pink-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_65%)]" />
      </div>

      <main id="papers-main" className="relative pt-28 pb-24" role="main">
        <script
          suppressHydrationWarning
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(papersStructuredData) }}
        />

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-1 text-sm text-blue-100">
              Publications & Preprints
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
              Research Papers
            </h1>
            <p className="mt-5 text-lg text-zinc-400">
              A curated list of my authored publications, preprints, and technical writings.
            </p>
          </div>
        </section>

        <section className="mt-16 px-4 sm:px-6 lg:px-8">
          {hasPapers ? (
            <div className="mx-auto max-w-7xl grid gap-8 md:grid-cols-2 lg:grid-cols-2">
              {papers.map((paper) => (
                <article
                  key={paper.title}
                  className="group relative overflow-hidden rounded-2xl border border-zinc-700/80 bg-zinc-900/85 p-8 md:p-10 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-400/50 hover:shadow-[0_25px_60px_-30px_rgba(96,165,250,0.5)]"
                >
                  <div className="flex items-start gap-3">
                    <FileText className="mt-0.5 h-6 w-6 flex-shrink-0 text-blue-300" />
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white group-hover:text-blue-200 break-words">
                        {paper.title}
                      </h3>
                      {paper.venue || paper.year ? (
                        <p className="mt-1 text-xs text-zinc-300">
                          {[paper.venue, paper.year].filter(Boolean).join(" · ")}
                        </p>
                      ) : null}
                      {paper.authors && paper.authors.length > 0 ? (
                        <p className="mt-1 text-xs text-zinc-300">
                          {paper.authors.join("; ")}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <Link
                      href={`/research-papers/${paper.slug}`}
                      className="inline-flex items-center rounded-lg border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-200 transition-colors hover:border-blue-400 hover:text-blue-100"
                    >
                      View details
                    </Link>
                    <a
                      href={paper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-200 transition-colors hover:text-white"
                    >
                      DOI
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-3xl rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 px-8 py-16 text-center">
              <BookOpen className="mx-auto h-12 w-12 text-zinc-600" />
              <h3 className="mt-4 text-xl font-semibold text-white">No papers added yet</h3>
              <p className="mt-2 text-zinc-500">
                Upload your PDFs to the site and add entries here to showcase your publications.
              </p>
            </div>
          )}
        </section>

        </main>

      <SiteFooter />
    </div>
  )
}

