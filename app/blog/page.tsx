import { Metadata } from "next"
import Link from "next/link"
import { Calendar, Clock, ArrowUpRight } from "lucide-react"

import { FloatingNav } from "@/components/floating-nav"
import { SiteFooter } from "@/components/site-footer"
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
    url: "https://abuawd.online/blog",
    type: "article",
  },
  alternates: {
    canonical: "https://abuawd.online/blog",
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
    url: "https://abuawd.online/blog",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: `https://abuawd.online/blog/${post.slug}`,
      datePublished: post.publishedAt,
      keywords: post.tags.join(", "),
    })),
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-pal-950 font-mono text-pal-100">
      <div className="terminal-atmosphere" aria-hidden />
      <FloatingNav />

      <main className="relative z-10 px-4 pb-24 pt-28 sm:px-6">
        <script
          suppressHydrationWarning
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData) }}
        />
        <section className="mx-auto max-w-5xl">
          <p className="text-sm text-pal-400">
            <span className="text-term-green">~/blog</span> $ ls -1 --latest
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-pal-50 sm:text-4xl lg:text-5xl">
            Notes from an AI Engineer
          </h1>
          <p className="mt-4 max-w-2xl font-sans leading-relaxed text-pal-300">
            Deep dives into production ML systems, generative AI, and the craft of building intelligent products.
          </p>
        </section>

        <section className="mx-auto mt-12 grid max-w-5xl gap-4 lg:grid-cols-2">
          {posts.map((post, i) => (
            <article
              key={post.slug}
              className="group flex h-full flex-col justify-between border border-hair/[0.08] bg-pal-900/40 p-6 transition-colors duration-300 hover:border-acc/40 hover:bg-pal-900/70"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-pal-400">
                  <span className="text-acc">[{String(i + 1).padStart(2, "0")}]</span>
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

                <h2 className="mt-3 text-xl font-semibold leading-snug text-pal-50">
                  <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-acc">
                    {post.title}
                  </Link>
                </h2>

                <p className="mt-2 font-sans text-sm leading-relaxed text-pal-300">{post.excerpt}</p>

                <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-pal-400">
                  {post.tags.map((tag) => (
                    <span key={tag} className="transition-colors group-hover:text-pal-200">
                      #{tag.toLowerCase().replace(/\s+/g, "-")}
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
                  className="inline-flex items-center gap-1 text-sm text-acc transition-colors hover:text-acc"
                >
                  read
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
