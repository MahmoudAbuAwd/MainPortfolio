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
  {
    title: "The Role of Artificial Intelligence in Enhancing the Criminal Justice System to Reduce Arbitrary Detention",
    description: "Comprehensive research examining AI's role in reducing arbitrary detention and protecting human rights, balancing technological advancement with privacy, fairness, and accountability across justice systems. Published in Zenodo (2025).",
    url: "https://zenodo.org/records/17727308",
    type: "link",
    category: "Research Papers",
  },
  {
    title: "MLA C01 - 1 - Getting Started with ML, DevOps, and AWS",
    description: "Foundational course covering machine learning concepts, DevOps practices, and AWS essentials for ML professionals.",
    url: "https://cobalt-verdict-599.notion.site/MLA-C01-1-Getting-Started-with-ML-DevOps-and-AWS-25d193c0f57180e693cbd69a626ca8c1?pvs=74",
    type: "link",
    category: "Machine Learning Associate (MLA)",
  },
  {
    title: "MLA C01 - 2 - Data Preparation for Machine Learning",
    description: "Comprehensive guide on data ingestion, cleaning, transformation, and preparation techniques for ML workflows.",
    url: "https://cobalt-verdict-599.notion.site/MLA-C01-2-Data-Preparation-for-Machine-Learning-279193c0f57180549543cb97858bbfb1?source=copy_link",
    type: "link",
    category: "Machine Learning Associate (MLA)",
  },
  {
    title: "MLA C01 - 3 - Machine Learning Model Development",
    description: "Detailed exploration of model architecture design, training strategies, evaluation metrics, and optimization techniques.",
    url: "https://cobalt-verdict-599.notion.site/MLA-C01-3-Machine-Learning-Model-Development-285193c0f57180329c39d9c1b81c14a7?source=copy_link",
    type: "link",
    category: "Machine Learning Associate (MLA)",
  },
  {
    title: "MLA C01 - 4 - Deployment and Orchestration of ML Workflows",
    description: "Best practices for containerizing models, orchestrating workflows, and scaling ML systems in production environments.",
    url: "https://cobalt-verdict-599.notion.site/MLA-C01-4-Deployment-and-Orchestration-of-ML-Workflows-285193c0f5718008b2a1e7e2ea719953?source=copy_link",
    type: "link",
    category: "Machine Learning Associate (MLA)",
  },
  {
    title: "MLA C01 - 5 - ML Solution Monitoring, Maintenance, and Security",
    description: "Essential practices for monitoring model performance, maintaining system health, implementing security measures, and ensuring compliance.",
    url: "https://cobalt-verdict-599.notion.site/MLA-C01-5-ML-Solution-Monitoring-Maintenance-and-Security-285193c0f57180c59b73d482f71ccbc7?source=copy_link",
    type: "link",
    category: "Machine Learning Associate (MLA)",
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
          <p className="text-sm text-pal-400">
            <span className="text-term-green">~/resources</span> $ find . -type f
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-pal-50 sm:text-4xl lg:text-5xl">
            Resources for Builders &amp; Learners
          </h1>
          <p className="mt-4 max-w-2xl font-sans leading-relaxed text-pal-300">
            A living library of PDFs, guides, and must-read links to accelerate your AI and engineering journey.
          </p>
        </section>

        {hasResources && (
          <nav className="mx-auto mt-12 max-w-5xl" aria-label="Resource categories">
            <div className="rounded-md border border-hair/[0.08] bg-pal-900/40 p-6">
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
            </div>
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

                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {categoryResources.map((resource) => (
                      <a
                        key={resource.title}
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
                          <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </span>
                      </a>
                    ))}
                  </div>
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
          <div className="flex flex-col gap-4 rounded-md border border-hair/[0.08] bg-pal-900/40 p-8 text-center md:flex-row md:items-center md:text-left">
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
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
