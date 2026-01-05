import type { MetadataRoute } from 'next'
import { env } from '@/env'

export default function robots(): MetadataRoute.Robots {
  if (env.NODE_ENV === 'production') {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
      },
    }
  }

  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
    sitemap: `${env.BETTER_AUTH_URL}/sitemap.xml`,
  }
}
