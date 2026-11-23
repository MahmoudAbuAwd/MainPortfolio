import { Metadata } from "next"
import Link from "next/link"
import { Calendar, Clock, ArrowUpRight } from "lucide-react"

import { SiteFooter } from "@/components/site-footer"
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal"
import { getAllBlogPosts } from "@/lib/blog"

export const metadata: Metadata = {
  title: "AI Engineering Blog | Mahmoud AbuAwd",
  description:
    "Long-form essays on machine learning, deep learning systems, large language models, and prompt engineering from an AI engineer.",
  keywords: [
    "Machine learning production",
    "Deep learning systems",
    "Large language models",
    "Prompt engineering techniques",
    "AI engineering blog",
  ],
  openGraph: {
    title: "AI Engineering Blog | Mahmoud AbuAwd",
    description:
      "Long-form essays on machine learning, deep learning systems, large language models, and prompt engineering from an AI engineer.",
    url: "https://abuawd.com/blog",
    type: "article",
  },
  alternates: {
    canonical: "https://abuawd.com/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Engineering Blog | Mahmoud AbuAwd",
    description:
      "Long-form essays on machine learning, deep learning systems, large language models, and prompt engineering from an AI engineer.",
  },
}

export default async function BlogPage() {
  const posts = await getAllBlogPosts()

  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Mahmoud AbuAwd Blog",
    description:
      "Long-form essays on machine learning, deep learning systems, large language models, and prompt engineering from an AI engineer.",
    url: "https://abuawd.com/blog",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: `https://abuawd.com/blog/${post.slug}`,
      datePublished: post.publishedAt,
      keywords: post.tags.join(", "),
    })),
  }

  return (
    <div className="relative min-h-[100cqh] overflow-hidden bg-transparent font-mono text-pal-100">
      <div className="terminal-atmosphere" aria-hidden />

      <main className="relative z-10 px-4 pb-24 pt-28 sm:px-6">
        <script
          suppressHydrationWarning
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData) }}
        />
        <section className="mx-auto max-w-5xl">
          <Reveal>
            <h1 className="tv-page-title crt-aberration">
              Notes from an AI Engineer
            </h1>
            <p className="mt-4 max-w-2xl font-sans leading-relaxed text-pal-300">
              Deep dives into production ML systems, generative AI, and the craft of building intelligent products.
            </p>
          </Reveal>
        </section>

        <section className="mx-auto mt-12 max-w-5xl">
          <RevealGroup className="grid grid-cols-1 gap-4 lg:grid-cols-2" stagger={0.07}>
          {posts.map((post, i) => (
            <RevealItem key={post.slug} className="h-full">
            <article
              className="tv-card group flex h-full flex-col justify-between p-6"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-pal-400">
                  <span className="tv-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(post.publishedAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime}
                    </span>
                  </span>
                </div>

                <h2 className="mt-3 font-display text-3xl leading-[1.05] text-pal-50">
                  <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-acc">
                    {post.title}
                  </Link>
                </h2>

                <p className="mt-2 font-sans text-sm leading-relaxed text-pal-300">{post.excerpt}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="tv-chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-4 border-t border-dashed border-hair/[0.1] pt-4">
                <span className="text-xs text-pal-400">
                  <span className="text-pal-200">{post.heroStat.value}</span> {post.heroStat.label}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 font-display text-2xl text-acc"
                >
                  Read article
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </article>
            </RevealItem>
          ))}
          </RevealGroup>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
