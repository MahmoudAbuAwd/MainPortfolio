import fs from "fs/promises"
import path from "path"

export type BlogBodyNode =
  | { type: "paragraph"; text: string }
  | {
      type: "statGrid"
      items: { value: string; label: string; sublabel?: string }[]
    }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "quote"; text: string; attribution?: string }

export interface BlogSection {
  title: string
  slug: string
  body: BlogBodyNode[]
}

export interface BlogPost {
  slug: string
  title: string
  description: string
  excerpt: string
  publishedAt: string
  readTime: string
  tags: string[]
  heroStat: {
    value: string
    label: string
    sublabel: string
  }
  sections: BlogSection[]
  keyTakeaways: string[]
  cta?: {
    label: string
    href: string
  }
}

const BLOG_CONTENT_DIR = path.join(process.cwd(), "content", "blog")

async function readBlogJson(filePath: string): Promise<BlogPost> {
  const fileContent = await fs.readFile(filePath, "utf-8")
  const data = JSON.parse(fileContent) as BlogPost

  if (!data.slug) {
    const fallbackSlug = path.basename(filePath, path.extname(filePath))
    data.slug = fallbackSlug
  }

  return data
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const fileNames = await fs.readdir(BLOG_CONTENT_DIR)
  const posts = await Promise.all(
    fileNames
      .filter((name) => name.endsWith(".json"))
      .map((name) => readBlogJson(path.join(BLOG_CONTENT_DIR, name)))
  )

  return posts.sort((a, b) => {
    const aTime = new Date(a.publishedAt).getTime()
    const bTime = new Date(b.publishedAt).getTime()
    return bTime - aTime
  })
}

export async function getBlogSlugs(): Promise<string[]> {
  const posts = await getAllBlogPosts()
  return posts.map((post) => post.slug)
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(BLOG_CONTENT_DIR, `${slug}.json`)
    return await readBlogJson(filePath)
  } catch (error) {
    return null
  }
}
