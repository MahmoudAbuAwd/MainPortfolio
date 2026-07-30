import Link from "next/link"
import { Metadata } from "next"
import { BookOpen, FileText, Link2, ArrowUpRight } from "lucide-react"

import { FloatingNav } from "@/components/floating-nav"
import { SiteFooter } from "@/components/site-footer"
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal"
import { resources } from "@/content/resources"
import type { Resource } from "@/content/types"

export const metadata: Metadata = {
  title: "AI Resources Library | Mahmoud AbuAwd",
  description: "A collection of useful resources, PDFs, and links curated by Mahmoud AbuAwd",
  keywords: [
    "AI resources",
    "MLOps playbooks",
    "LLM orchestration guides",
    "Prompt engineering resources",
    "Mahmoud AbuAwd resources",
  ],
  openGraph: {
    title: "AI Resources Library | Mahmoud AbuAwd",
    description:
      "Curated PDFs, frameworks, and external links covering LLM orchestration, MLOps, and prompt engineering.",
    url: "https://abuawd.online/resources",
    type: "website",
  },
  alternates: {
    canonical: "https://abuawd.online/resources",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Resources Library | Mahmoud AbuAwd",
    description:
      "Curated PDFs, frameworks, and external links covering LLM orchestration, MLOps, and prompt engineering.",
  },
}


export default function ResourcesPage() {
  const resourcesByCategory = resources.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = []
    }
    acc[resource.category].push(resource)
    return acc
  }, {} as Record<string, Resource[]>)

  const hasResources = Object.keys(resourcesByCategory).length > 0

  const slugify = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")

  const categorizedResources = Object.entries(resourcesByCategory).map(([category, categoryResources]) => ({
    category,
    id: slugify(category),
    resources: categoryResources,
  }))

  const resourcesStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI Engineering Resources by Mahmoud AbuAwd",
    description:
      "Curated PDFs, frameworks, and external links covering LLM orchestration, MLOps, and prompt engineering.",
    url: "https://abuawd.online/resources",
    mainEntity: {
      "@type": "ItemList",
      name: "Featured AI resources",
      itemListElement: resources.map((resource, index) => ({
        "@type": resource.type === 'pdf' ? 'DigitalDocument' : 'WebPage',
        name: resource.title,
        description: resource.description,
        url: resource.url,
        position: index + 1,
        isAccessibleForFree: true,
      })),
    },
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-pal-950 font-mono text-pal-100">
      <div className="terminal-atmosphere" aria-hidden />
      <a
        href="#resources-main"
        className="sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-50 focus-visible:rounded-sm focus-visible:bg-pal-900 focus-visible:px-4 focus-visible:py-2 focus-visible:text-acc focus-visible:ring-2 focus-visible:ring-acc"
      >
        Skip to main content
      </a>
      <FloatingNav />

      <main id="resources-main" className="relative z-10 px-4 pb-24 pt-28 sm:px-6" role="main">
        <script
          suppressHydrationWarning
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(resourcesStructuredData) }}
        />
        <section className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-sm text-pal-400">
              <span className="text-term-green">~/resources</span> $ find . -type f
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-pal-50 sm:text-4xl lg:text-5xl">
              Resources for Builders &amp; Learners
            </h1>
            <p className="mt-4 max-w-2xl font-sans leading-relaxed text-pal-300">
              A living library of PDFs, guides, and must-read links to accelerate your AI and engineering journey.
            </p>
          </Reveal>
        </section>

        {hasResources && (
          <nav className="mx-auto mt-12 max-w-5xl" aria-label="Resource categories">
            <Reveal className="rounded-md border border-hair/[0.08] bg-pal-900/40 p-6">
              <p className="text-xs text-pal-400">
                <span className="text-acc">$</span> cd ./&lt;track&gt;
              </p>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {categorizedResources.map(({ category, id, resources }) => (
                  <li key={id}>
                    <Link
                      href={`#${id}`}
                      className="inline-flex items-center gap-2 rounded-sm border border-hair/[0.1] bg-hair/[0.02] px-3 py-1.5 text-sm text-pal-200 transition-colors hover:border-acc/40 hover:text-acc"
                    >
                      <span>{category}</span>
                      <span className="text-xs text-pal-400" aria-label={`${resources.length} resources`}>
                        [{resources.length}]
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </nav>
        )}

        <section className="mx-auto mt-14 max-w-5xl">
          {hasResources ? (
            <div className="space-y-12">
              {categorizedResources.map(({ category, id, resources: categoryResources }) => (
                <div key={category} id={id} className="scroll-mt-28 space-y-5">
                  <div className="flex items-baseline justify-between gap-4 border-b border-dashed border-hair/[0.12] pb-3">
                    <h2 className="text-xl font-semibold tracking-tight text-pal-50 sm:text-2xl">
                      <span className="text-acc">## </span>
                      {category}
                    </h2>
                    <p className="shrink-0 text-xs text-pal-400">
                      {categoryResources.length} file{categoryResources.length > 1 ? "s" : ""}
                    </p>
                  </div>

                  <RevealGroup className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
                    {categoryResources.map((resource) => (
                      <RevealItem key={resource.title} className="h-full">
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex h-full flex-col border border-hair/[0.08] bg-pal-900/40 p-5 transition-colors duration-300 hover:border-acc/40 hover:bg-pal-900/70"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="flex items-center gap-1.5 text-term-green">
                            {resource.type === "pdf" ? (
                              <FileText className="h-3.5 w-3.5" />
                            ) : (
                              <Link2 className="h-3.5 w-3.5" />
                            )}
                            {resource.type === "pdf" ? "pdf" : "link"}
                          </span>
                          <span className="text-pal-400">→</span>
                        </div>

                        <h3 className="mt-3 text-sm font-semibold leading-snug text-pal-50">
                          {resource.title}
                        </h3>
                        <p className="mt-2 font-sans text-sm leading-relaxed text-pal-300">
                          {resource.description}
                        </p>

                        <span className="mt-4 inline-flex items-center gap-1 border-t border-dashed border-hair/[0.1] pt-3 text-sm text-acc">
                          {resource.type === "pdf" ? "open" : "visit"}
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </a>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-md border border-dashed border-hair/[0.12] bg-pal-900/40 px-8 py-16 text-center">
              <BookOpen className="mx-auto h-10 w-10 text-pal-400" />
              <h3 className="mt-4 text-base font-semibold text-pal-50">No resources added yet</h3>
              <p className="mt-2 font-sans text-sm text-pal-300">
                Start curating your favorite PDFs, frameworks, and articles. They&rsquo;ll appear here in organized collections.
              </p>
            </div>
          )}
        </section>

        <section className="mx-auto mt-16 max-w-5xl">
          <Reveal className="flex flex-col gap-4 rounded-md border border-hair/[0.08] bg-pal-900/40 p-8 text-center md:flex-row md:items-center md:text-left">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-pal-50">Have a resource to recommend?</h2>
              <p className="mt-2 font-sans text-sm text-pal-300">
                Share the guides, courses, and demos that helped you most. Together we can grow a knowledge base.
              </p>
            </div>
            <a
              href="mailto:mahmoodabuawad08@gmail.com"
              className="inline-flex items-center justify-center gap-1.5 rounded-sm border border-acc/40 bg-acc/10 px-5 py-2.5 text-sm text-acc transition-colors hover:bg-acc/20"
            >
              submit a resource
            </a>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
