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
  const linkRegex = /\{\{link:([^|]+)\|([^}]+)\}\}/g
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
        className="text-acc underline underline-offset-2 transition-colors hover:opacity-80"
      >
        {part.value}
      </Link>
    ) : (
      <span key={index}>{part.value}</span>
    ),
  )
}

function renderBodyNode(node: BlogBodyNode) {
  if (node.type === "paragraph") {
    return <p className="font-sans text-base leading-relaxed text-pal-300">{renderLinkedText(node.text)}</p>
  }
  if (node.type === "statGrid") {
    return (
      <div className="grid gap-4 sm:grid-cols-3">
        {node.items.map((item) => (
          <div key={`${item.value}-${item.label}`} className="rounded-2xl bg-hair/[0.05] border border-hair/[0.08] p-5 text-center">
            <p className="text-2xl font-semibold text-pal-50">{item.value}</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-pal-100">{item.label}</p>
            {item.sublabel && <p className="mt-1 text-xs text-pal-300">{item.sublabel}</p>}
          </div>
        ))}
      </div>
    )
  }
  if (node.type === "list") {
    const Tag = node.ordered ? "ol" : "ul"
    return (
      <Tag className={`ml-5 ${node.ordered ? "list-decimal" : "list-disc"} space-y-2 font-sans text-pal-300`}>
        {node.items.map((item) => <li key={item}>{renderLinkedText(item)}</li>)}
      </Tag>
    )
  }
  if (node.type === "quote") {
    return (
      <blockquote className="relative overflow-hidden rounded-2xl glass p-6">
        <Quote className="absolute -left-3 -top-3 h-12 w-12 text-acc/20" />
        <p className="text-lg leading-relaxed text-pal-100">{renderLinkedText(node.text)}</p>
        {node.attribution && <footer className="mt-3 text-sm text-pal-300">{node.attribution}</footer>}
      </blockquote>
    )
  }
  if (node.type === "image") {
    return (
      <figure className="space-y-3">
        <div className="overflow-hidden rounded-2xl glass p-1">
          <img src={node.src} alt={node.alt} className="w-full rounded-xl object-cover" loading="lazy" />
        </div>
        {node.caption && <figcaption className="text-center text-sm text-pal-300 italic">{node.caption}</figcaption>}
      </figure>
    )
  }
  return null
}

export async function generateStaticParams() {
  const slugs = await getBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

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
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-pal-950 font-mono text-pal-100">
      <div className="terminal-atmosphere" aria-hidden />
      <FloatingNav />

      <main className="relative z-10 px-4 pb-24 pt-28 sm:px-6">
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-pal-400 transition-colors hover:text-acc"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> cd ../blog
          </Link>

          <header className="space-y-5">
            <div className="flex flex-wrap items-center gap-4 text-xs text-pal-400">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(post.publishedAt).toLocaleDateString(undefined, {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
            </div>

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-pal-50 sm:text-4xl">
              {post.title}
            </h1>

            <p className="max-w-2xl font-sans text-lg leading-relaxed text-pal-300">{post.description}</p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-pal-400">
              {post.tags.map((tag) => (
                <span key={tag}>#{tag.toLowerCase().replace(/\s+/g, "-")}</span>
              ))}
            </div>
          </header>

          <section className="rounded-md border border-hair/[0.08] bg-pal-900/40 p-6">
            <p className="text-xs text-pal-400">
              <span className="text-acc">$</span> echo $HEADLINE_STAT
            </p>
            <p className="mt-3 text-4xl font-bold text-acc">{post.heroStat.value}</p>
            <p className="mt-1 text-sm font-semibold text-pal-100">{post.heroStat.label}</p>
            <p className="mt-1 font-sans text-sm text-pal-300">{post.heroStat.sublabel}</p>
          </section>

          <div className="space-y-14">
            {post.sections.map((section) => (
              <section key={section.slug} className="space-y-5">
                <h2 className="text-2xl font-semibold tracking-tight text-pal-50">
                  <span className="text-acc">## </span>
                  {section.title}
                </h2>
                <div className="space-y-5">
                  {section.body.map((node, index) => (
                    <div key={`${section.slug}-${index}`}>{renderBodyNode(node)}</div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <aside className="rounded-md border border-hair/[0.08] bg-pal-900/40 p-6">
            <h3 className="text-sm font-semibold text-pal-50">
              <span className="text-acc">$</span> cat takeaways.md
            </h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {post.keyTakeaways.map((takeaway) => (
                <li key={takeaway} className="flex items-start gap-2.5 font-sans text-sm text-pal-300">
                  <span className="mt-0.5 shrink-0 font-mono text-term-green">✓</span>
                  <span>{renderLinkedText(takeaway)}</span>
                </li>
              ))}
            </ul>
          </aside>

          {post.cta && (
            <div className="flex flex-col items-center justify-between gap-4 rounded-md border border-hair/[0.08] bg-pal-900/40 p-6 sm:flex-row">
              <div className="font-sans text-sm text-pal-300">
                Ready to go further? Explore the tools and checklists I trust in production.
              </div>
              <Link
                href={post.cta.href}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-sm border border-acc/40 bg-acc/10 px-5 py-2.5 text-sm text-acc transition-colors hover:bg-acc/20"
              >
                {post.cta.label}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
