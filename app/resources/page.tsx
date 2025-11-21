import Link from "next/link"
import { Metadata } from "next"
import { BookOpen, FileText, Link2 } from "lucide-react"

import { FloatingNav } from "@/components/floating-nav"
import { SiteFooter } from "@/components/site-footer"

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

type Resource = {
  title: string
  description: string
  url: string
  type: 'pdf' | 'link' | 'other'
  category: string
}

const resources: Resource[] = [
  {
    title: "Deep Learning Specialization Summary",
    description:
      "Comprehensive course notes distilling Coursera's Deep Learning Specialization into key architectures, optimization tricks, and deployment best practices.",
    url: "/Deep_learning_specialization2.pdf",
    type: "pdf",
    category: "Course Summaries",
  },
  {
    title: "Advanced RAG Techniques – Comprehensive Research Guide",
    description: "Comprehensive guide covering 36 advanced RAG techniques for retrieval-augmented systems.",
    url: "https://cobalt-verdict-599.notion.site/Advanced-RAG-Techniques-Comprehensive-Research-Guide-298193c0f5718019bde0cbcbe8c1a4f3",
    type: "link",
    category: "Retrieval-Augmented Generation",
  },
  {
    title: "AWS AI Practitioner – Security & IAM Roles",
    description: "Notion notes covering access management, shared responsibility, and guardrail best practices.",
    url: "https://cobalt-verdict-599.notion.site/AWS-AI-02-Security-and-IAM-roles-1dc193c0f571808684e8d91bf778c315",
    type: "link",
    category: "AWS AI Practitioner Notes",
  },
  {
    title: "AWS AI Practitioner – Intro to AI",
    description: "Foundational AI concepts, terminology, and AWS positioning summarized for quick review.",
    url: "https://cobalt-verdict-599.notion.site/AWS-AI-03-Intro-to-AI-1dd193c0f5718061a6e1f88742b9334c",
    type: "link",
    category: "AWS AI Practitioner Notes",
  },
  {
    title: "AWS AI Practitioner – Prompt Engineering",
    description: "Prompt design patterns, evaluation tips, and generative AI safety notes for the exam.",
    url: "https://cobalt-verdict-599.notion.site/AWS-AI-04-Prompt-Engineering-1e4193c0f57180e38d62f70ad1aebf2d",
    type: "link",
    category: "AWS AI Practitioner Notes",
  },
  {
    title: "AWS AI Practitioner – AI Challenges & Ethics",
    description: "Key ethical considerations, bias mitigation, and responsible AI guardrails in AWS.",
    url: "https://cobalt-verdict-599.notion.site/AWS-AI-05-AI-Challenges-Ethics-1e8193c0f571800ea4c3eba33b07b8bd",
    type: "link",
    category: "AWS AI Practitioner Notes",
  },
  {
    title: "AWS AI Practitioner – AWS AI Services",
    description: "Service overview cheat-sheet with core capabilities and common use cases.",
    url: "https://cobalt-verdict-599.notion.site/AWS-AI-06-AWS-AI-services-1e8193c0f57180be8f7df39bcb87398d",
    type: "link",
    category: "AWS AI Practitioner Notes",
  },
  {
    title: "AWS AI Practitioner – Amazon Bedrock",
    description: "Bedrock components, model catalog, and orchestration workflows in concise bullet form.",
    url: "https://cobalt-verdict-599.notion.site/AWS-AI-07-Amazon-Bedrock-1ea193c0f5718071b3f3f7bfe4ab2d45",
    type: "link",
    category: "AWS AI Practitioner Notes",
  },
  {
    title: "AWS AI Practitioner – Amazon Q",
    description: "Study notes on Amazon Q’s capabilities, integrations, and security posture.",
    url: "https://cobalt-verdict-599.notion.site/AWS-AI-08-Amazon-Q-1eb193c0f57180a381a6d0335cc12f88",
    type: "link",
    category: "AWS AI Practitioner Notes",
  },
  {
    title: "AWS AI Practitioner – Amazon SageMaker",
    description: "Lifecycle overview, key features, and deployment workflows for SageMaker.",
    url: "https://cobalt-verdict-599.notion.site/AWS-AI-09-Amazon-SageMaker-1ee193c0f571806c9bf6d18a064a219a",
    type: "link",
    category: "AWS AI Practitioner Notes",
  },
  {
    title: "AWS AI Practitioner – AWS Cloud Services",
    description: "Refresher on supporting cloud services, data pipelines, and monitoring touchpoints.",
    url: "https://cobalt-verdict-599.notion.site/AWS-AI-10-AWS-Cloud-Services-1f2193c0f571806dacc4c21b56df8052",
    type: "link",
    category: "AWS AI Practitioner Notes",
  },
]

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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-950 to-black text-white">
      <a
        href="#resources-main"
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

      <main id="resources-main" className="relative pt-28 pb-24" role="main">
        <script
          suppressHydrationWarning
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(resourcesStructuredData) }}
        />
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-1 text-sm text-blue-100">
              Curated learning hub
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
              Resources for Builders & Learners
            </h1>
            <p className="mt-5 text-lg text-zinc-400">
              A living library of PDFs, guides, and must-read links to accelerate your AI and engineering journey.
            </p>
          </div>
        </section>

        {hasResources && (
          <nav className="mt-14 px-4 sm:px-6 lg:px-8" aria-label="Resource categories">
            <div className="mx-auto max-w-5xl rounded-3xl border border-zinc-800/70 bg-zinc-900/60 p-6">
              <h2 className="text-lg font-semibold text-white">Jump to a learning track</h2>
              <p className="mt-2 text-sm text-zinc-500">
                Quickly access the resource category that matches your current AI learning goal.
              </p>
              <ul className="mt-4 flex flex-wrap gap-3">
                {categorizedResources.map(({ category, id, resources }) => (
                  <li key={id}>
                    <Link
                      href={`#${id}`}
                      className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-100 transition-colors hover:border-blue-400 hover:text-blue-50"
                    >
                      <span className="font-semibold">{category}</span>
                      <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-xs text-blue-100" aria-label={`${resources.length} resources`}>
                        {resources.length}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        )}

        <section className="mt-16 px-4 sm:px-6 lg:px-8">
          {hasResources ? (
            <div className="mx-auto max-w-6xl space-y-12">
              {categorizedResources.map(({ category, id, resources: categoryResources }) => (
                <div key={category} id={id} className="space-y-6 scroll-mt-32">
                  <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                    <h2 className="text-2xl font-semibold text-white">
                      {category}
                    </h2>
                    <p className="text-sm text-zinc-500">
                      {categoryResources.length} curated resource{categoryResources.length > 1 ? 's' : ''}
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {categoryResources.map((resource) => (
                      <article
                        key={resource.title}
                        className="group relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-6 transition-all hover:-translate-y-1.5 hover:border-blue-500/40 hover:shadow-[0_25px_60px_-30px_rgba(96,165,250,0.7)]"
                      >
                        <div className="flex items-start gap-3">
                          {resource.type === 'pdf' ? (
                            <FileText className="mt-0.5 h-6 w-6 flex-shrink-0 text-blue-300" />
                          ) : (
                            <Link2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-purple-300" />
                          )}
                          <div>
                            <h3 className="text-lg font-semibold text-white group-hover:text-blue-200">
                              {resource.title}
                            </h3>
                            <p className="mt-2 text-sm text-zinc-400">
                              {resource.description}
                            </p>
                          </div>
                        </div>

                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-6 inline-flex items-center text-sm font-semibold text-blue-300 transition-colors hover:text-blue-200"
                        >
                          {resource.type === 'pdf' ? 'Open PDF' : 'Visit Link'}
                          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-3xl rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 px-8 py-16 text-center">
              <BookOpen className="mx-auto h-12 w-12 text-zinc-600" />
              <h3 className="mt-4 text-xl font-semibold text-white">No resources added yet</h3>
              <p className="mt-2 text-zinc-500">
                Start curating your favorite PDFs, frameworks, and articles. They'll appear here in organized collections.
              </p>
            </div>
          )}
        </section>

        <section className="mt-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-5xl flex-col gap-6 rounded-3xl border border-zinc-800/80 bg-zinc-900/60 px-8 py-10 text-center md:flex-row md:items-center md:text-left">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-white">
                Have a powerful resource to recommend?
              </h2>
              <p className="mt-3 text-sm text-zinc-400">
                Share the guides, courses, and demos that helped you most. Together we can grow a knowledge base for the community.
              </p>
            </div>
            <a
              href="mailto:mahmoodabuawad08@gmail.com"
              className="inline-flex items-center justify-center rounded-full border border-blue-500/40 bg-blue-500/10 px-6 py-3 text-sm font-semibold text-blue-200 transition-colors hover:border-blue-400 hover:text-blue-100"
            >
              Submit a resource
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
