import type { MetadataRoute } from 'next'
import { env } from '@/env'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${env.BETTER_AUTH_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${env.BETTER_AUTH_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${env.BETTER_AUTH_URL}/zh/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${env.BETTER_AUTH_URL}/zh/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]
}
