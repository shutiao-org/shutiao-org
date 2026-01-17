import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { lanterns } from '@/server/db/schema/lantern'

export const lanternRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(lanterns).orderBy(lanterns.createdAt)
  }),
  create: publicProcedure
    .input(z.object({ content: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const [newLantern] = await ctx.db
        .insert(lanterns)
        .values({
          content: input.content,
        })
        .returning()
      return newLantern
    }),
})
