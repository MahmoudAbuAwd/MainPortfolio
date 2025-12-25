import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Clock,
  Quote,
} from "lucide-react"

import { FloatingNav } from "@/components/floating-nav"
import { SiteFooter } from "@/components/site-footer"
import {
  type BlogBodyNode,
  getBlogPostBySlug,
  getBlogSlugs,
} from "@/lib/blog"

function renderLinkedText(text: string) {
  const parts: Array<{ type: "text" | "link"; value: string; href?: string }> = []
  const linkRegex = /{{link:([^|]+)\|([^}]+)}}/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = linkRegex.exec(text)) !== null) {
    const [token, href, label] = match
    if (match.index > lastIndex) {
      parts.push({ type: "text", value: text.slice(lastIndex, match.index) })
    }
    parts.push({ type: "link", value: label, href })
    lastIndex = match.index + token.length
  }

  if (lastIndex < text.length) {
    parts.push({ type: "text", value: text.slice(lastIndex) })
  }

  return parts.map((part, index) =>
    part.type === "link" && part.href ? (
      <Link
        key={`${part.href}-${index}`}
        href={part.href}
        className="text-blue-300 underline-offset-2 transition-colors hover:text-blue-200"
      >
        {part.value}
      </Link>
    ) : (
      <span key={index}>{part.value}</span>
    ),
  )
}

function renderBodyNode(node: BlogBodyNode) {
  switch (node.type) {
    case "paragraph":
      return (
        <p className="text-base leading-relaxed text-zinc-300">
          {renderLinkedText(node.text)}
        </p>
      )
    case "statGrid":
      return (
        <div className="grid gap-4 sm:grid-cols-3">
          {node.items.map((item) => (
            <div
              key={`${item.value}-${item.label}`}
              className="rounded-2xl border border-purple-500/40 bg-purple-500/10 p-5 text-center"
            >
              <p className="text-2xl font-semibold text-white">{item.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-purple-100">
                {item.label}
              </p>
              {item.sublabel && (
                <p className="mt-1 text-xs text-blue-100/70">{item.sublabel}</p>
              )}
            </div>
          ))}
        </div>
      )
    case "list":
      return node.ordered ? (
        <ol className="ml-5 list-decimal space-y-2 text-zinc-300">
          {node.items.map((item) => (
            <li key={item}>{renderLinkedText(item)}</li>
          ))}
        </ol>
      ) : (
        <ul className="ml-5 list-disc space-y-2 text-zinc-300">
          {node.items.map((item) => (
            <li key={item}>{renderLinkedText(item)}</li>
          ))}
        </ul>
      )
    case "quote":
      return (
        <blockquote className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-6">
          <Quote className="absolute -left-3 -top-3 h-12 w-12 text-blue-500/20" />
          <p className="text-lg leading-relaxed text-zinc-200">
            “{renderLinkedText(node.text)}”
          </p>
          {node.attribution && (
            <footer className="mt-3 text-sm text-zinc-400">— {node.attribution}</footer>
          )}
        </blockquote>
      )
    default:
      return null
  }
}

export async function generateStaticParams() {
  const slugs = await getBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    return {}
  }

  return {
    title: `${post.title} | Mahmoud AbuAwd`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `https://abuawd.online/blog/${post.slug}`,
      tags: post.tags,
    },
  }
}

export default async function BlogArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-950 to-black text-white">
      <FloatingNav />

      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-32 left-6 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-64 w-64 rounded-full bg-blue-700/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_65%)]" />
      </div>

      <main className="relative pt-28 pb-24">
        <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to all articles
          </Link>

          <header className="space-y-6">
            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.publishedAt).toLocaleDateString(undefined, {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              {post.title}
            </h1>

            <p className="max-w-3xl text-lg text-zinc-300">
              {post.description}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-purple-400/40 bg-purple-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-purple-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <section className="rounded-3xl border border-purple-500/40 bg-purple-500/10 p-8 sm:p-10">
            <p className="text-5xl font-bold text-white">{post.heroStat.value}</p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-purple-100">
              {post.heroStat.label}
            </p>
            <p className="mt-2 text-sm text-purple-100/80">{post.heroStat.sublabel}</p>
          </section>

          <div className="space-y-16">
            {post.sections.map((section) => (
              <section key={section.slug} className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800/80 bg-zinc-900/80 text-lg font-semibold text-purple-300">
                    •
                  </span>
                  <h2 className="text-3xl font-semibold text-white">
                    {section.title}
                  </h2>
                </div>

                <div className="space-y-6">
                  {section.body.map((node, index) => (
                    <div key={`${section.slug}-${index}`}>{renderBodyNode(node)}</div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <aside className="rounded-3xl border border-zinc-800/80 bg-zinc-900/70 p-8">
            <h3 className="text-lg font-semibold text-white">Key takeaways</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {post.keyTakeaways.map((takeaway) => (
                <li key={takeaway} className="flex items-start gap-3 text-sm text-zinc-300">
                  <ArrowUpRight className="mt-1 h-4 w-4 flex-shrink-0 text-purple-300" />
                  <span>{renderLinkedText(takeaway)}</span>
                </li>
              ))}
            </ul>
          </aside>

          {post.cta && (
            <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-purple-500/40 bg-purple-500/10 p-8 sm:flex-row">
              <div className="text-sm text-purple-100">
                Ready to go further? Explore the tools and checklists I trust in production.
              </div>
              <Link
                href={post.cta.href}
                className="inline-flex items-center rounded-full border border-purple-500 bg-purple-500/20 px-6 py-2.5 text-sm font-semibold text-purple-100 transition-colors hover:bg-purple-500/30"
              >
                {post.cta.label}
              </Link>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
