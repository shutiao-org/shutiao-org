import { z } from 'zod'
import qino from '..'

const schema = z.object({
  title: z.string(),
  date: z.iso.date(),
})

export const updateEnCollection = qino.defineCollection({
  directory: 'updates/en',
  extension: '.mdx',
  schema,
  views: (view) => ({
    default: view({ sort: (a, b) => b.date.localeCompare(a.date) }),
  }),
})

export const updateZhCollection = qino.defineCollection({
  directory: 'updates/zh',
  extension: '.mdx',
  schema,
  views: (view) => ({
    default: view({ sort: (a, b) => b.date.localeCompare(a.date) }),
  }),
})

export const updateCollections = {
  en: updateEnCollection,
  zh: updateZhCollection,
}
