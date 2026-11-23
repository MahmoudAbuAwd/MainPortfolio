import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Clock,
} from "lucide-react"

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
          <div key={`${item.value}-${item.label}`} className="rounded-md border border-hair/[0.08] bg-hair/[0.02] p-5 text-center">
            <p className="text-2xl font-bold text-pal-50">{item.value}</p>
            <p className="mt-1 text-[11px] uppercase tracking-wide text-pal-400">{item.label}</p>
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
      <blockquote className="border-l-2 border-acc/50 bg-hair/[0.02] py-4 pl-5 pr-4">
        <p className="font-sans text-lg italic leading-relaxed text-pal-100">{renderLinkedText(node.text)}</p>
        {node.attribution && (
          <footer className="mt-3 text-sm text-pal-400">
            <span className="text-pal-500">- </span>
            {node.attribution}
          </footer>
        )}
      </blockquote>
    )
  }
  if (node.type === "image") {
    return (
      <figure className="space-y-3">
        <div className="overflow-hidden rounded-md border border-hair/[0.08] bg-hair/[0.02] p-1">
          <img src={node.src} alt={node.alt} className="w-full rounded-sm object-cover" loading="lazy" />
        </div>
        {node.caption && <figcaption className="text-center font-sans text-sm text-pal-300 italic">{node.caption}</figcaption>}
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
    <div className="relative min-h-[100cqh] overflow-hidden bg-transparent font-mono text-pal-100">
      <div className="terminal-atmosphere" aria-hidden />

      <main className="relative z-10 px-4 pb-24 pt-28 sm:px-6">
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-pal-400 transition-colors hover:text-acc"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> All articles
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

            <h1 className="tv-page-title crt-aberration !text-[clamp(2.6rem,5vw,4.5rem)] !leading-[0.95]">
              {post.title}
            </h1>

            <p className="max-w-2xl font-sans text-lg leading-relaxed text-pal-300">{post.description}</p>

            <div className="flex flex-wrap items-center gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="tv-chip">{tag}</span>
              ))}
            </div>
          </header>

          <section className="tv-card p-6">
            <p className="tv-label">Headline stat</p>
            <p className="crt-glow mt-3 font-display text-6xl leading-none text-acc">{post.heroStat.value}</p>
            <p className="mt-1 text-sm font-semibold text-pal-100">{post.heroStat.label}</p>
            <p className="mt-1 font-sans text-sm text-pal-300">{post.heroStat.sublabel}</p>
          </section>

          <div className="space-y-14">
            {post.sections.map((section) => (
              <section key={section.slug} className="space-y-5">
                <h2 className="tv-h2">
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

          <aside className="tv-card p-6">
            <h3 className="tv-label">Key takeaways</h3>
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
            <div className="tv-card flex flex-col items-center justify-between gap-4 p-6 sm:flex-row">
              <div className="font-sans text-sm text-pal-300">
                Ready to go further? Explore the tools and checklists I trust in production.
              </div>
              <Link
                href={post.cta.href}
                className="osd-btn shrink-0 !px-5 !py-1.5 !text-2xl"
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
