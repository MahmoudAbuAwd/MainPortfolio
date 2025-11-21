import type { MetadataRoute } from 'next'

import { getAllBlogPosts } from '@/lib/blog'

const FALLBACK_SITE_URL = 'https://abuawd.online'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/#hero`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#skills`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#experience`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#projects`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  const blogPosts = await getAllBlogPosts().catch(() => [])

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => {
    const publishedDate = post.publishedAt ? new Date(post.publishedAt) : now
    const lastModified = Number.isNaN(publishedDate.valueOf()) ? now : publishedDate

    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    }
  })

  return [...staticRoutes, ...blogRoutes]
}

