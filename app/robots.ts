import type { MetadataRoute } from 'next'

const FALLBACK_SITE_URL = 'https://abuawd.online'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
