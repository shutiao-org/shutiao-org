import { and, eq, ne } from 'drizzle-orm'
import { z } from 'zod'
import { bonjourIdSchema } from '@/schemas/bonjour.server'
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@/server/api/trpc'
import { bonjour } from '@/server/db/schema/bonjour'

export const bonjourRouter = createTRPCRouter({
  updateBonjourId: protectedProcedure
    .input(bonjourIdSchema)
    .mutation(async ({ ctx, input }) => {
      // Check if Bonjour ID is already taken by another user
      const [existingBonjour] = await ctx.db
        .select()
        .from(bonjour)
        .where(
          and(
            eq(bonjour.bonjourId, input),
            ne(bonjour.userId, ctx.session.user.id),
          ),
        )
        .limit(1)

      if (existingBonjour) {
        throw new Error('This Bonjour ID is already taken')
      }

      // Get current bonjour info to calculate update count
      const [currentBonjour] = await ctx.db
        .select()
        .from(bonjour)
        .where(eq(bonjour.userId, ctx.session.user.id))
        .limit(1)

      const updateCount = currentBonjour
        ? currentBonjour.bonjourIdUpdateCount + 1
        : 1

      // Upsert bonjour record
      await ctx.db
        .insert(bonjour)
        .values({
          userId: ctx.session.user.id,
          bonjourId: input,
          bonjourIdUpdatedAt: new Date(),
          bonjourIdUpdateCount: updateCount,
        })
        .onConflictDoUpdate({
          target: bonjour.userId,
          set: {
            bonjourId: input,
            bonjourIdUpdatedAt: new Date(),
            bonjourIdUpdateCount: updateCount,
          },
        })
    }),

  getInfoByBonjourId: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const [result] = await ctx.db
        .select({
          displayName: bonjour.displayName,
          avatar: bonjour.avatar,
          bio: bonjour.bio,
        })
        .from(bonjour)
        .where(eq(bonjour.bonjourId, input))
        .limit(1)

      if (!result) {
        throw new Error('Bonjour ID not found')
      }

      return result
    }),
})
