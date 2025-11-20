import { Metadata } from "next"
import Link from "next/link"
import { Calendar, Clock, ArrowUpRight, Tag } from "lucide-react"

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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-950 to-black text-white">
      <FloatingNav />

      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-32 -right-20 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute bottom-10 left-10 h-64 w-64 rounded-full bg-pink-600/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(168,85,247,0.08),_transparent_60%)]" />
      </div>

      <main className="relative pt-28 pb-24">
        <script
          suppressHydrationWarning
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData) }}
        />
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-purple-500/10 px-4 py-1 text-sm text-purple-200">
              <Tag className="h-4 w-4" />
              Latest insights
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
              Notes from an AI Engineer
            </h1>
            <p className="mt-5 text-lg text-zinc-400">
              Deep dives into production ML systems, generative AI, and the craft of building intelligent products.
            </p>
          </div>
        </section>

        <section className="mt-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/60 p-8 shadow-[0_20px_50px_-25px_rgba(147,51,234,0.45)] transition-all hover:-translate-y-1 hover:border-purple-500/40"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400">
                    <span className="inline-flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.publishedAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="mt-4 text-3xl font-semibold text-white">
                    <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-purple-300">
                      {post.title}
                    </Link>
                  </h2>

                  <p className="mt-4 text-base leading-relaxed text-zinc-300">
                    {post.excerpt}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-purple-400/40 bg-purple-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-purple-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between gap-4">
                  <div className="rounded-2xl border border-purple-500/40 bg-purple-500/10 px-5 py-4 text-center">
                    <p className="text-2xl font-semibold text-white">{post.heroStat.value}</p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-purple-100">
                      {post.heroStat.label}
                    </p>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-sm font-semibold text-purple-300 transition-colors hover:text-purple-200"
                  >
                    Read full article
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
