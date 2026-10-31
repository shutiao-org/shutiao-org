import { z } from 'zod'
import qino from '..'

export const pageCollection = qino.defineCollection({
  directory: 'pages',
  extension: '.mdx',
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
})
