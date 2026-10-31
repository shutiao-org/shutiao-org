import { z } from 'zod'
import qino from '..'

const schema = z.object({
  title: z.string(),
  date: z.iso.date(),
  location: z.string().optional(),
})

export const eventEnCollection = qino.defineCollection({
  directory: 'events/en',
  extension: '.mdx',
  schema,
  views: (view) => ({
    default: view({ sort: (a, b) => b.date.localeCompare(a.date) }),
  }),
})

export const eventZhCollection = qino.defineCollection({
  directory: 'events/zh',
  extension: '.mdx',
  schema,
  views: (view) => ({
    default: view({ sort: (a, b) => b.date.localeCompare(a.date) }),
  }),
})

export const eventCollections = {
  en: eventEnCollection,
  zh: eventZhCollection,
}
