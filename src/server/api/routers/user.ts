import { and, eq, ne } from 'drizzle-orm'
import { z } from 'zod'
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@/server/api/trpc'
import { user } from '@/server/db/schema/auth'
import { bonjour } from '@/server/db/schema/bonjour'

const bonjourIdSchema = z
  .string()
  .min(3, { message: 'Bonjour ID must be at least 3 characters' })
  .max(18, { message: 'Bonjour ID must be at most 18 characters' })
  .regex(/^[a-zA-Z0-9-]+$/, {
    message: 'Bonjour ID can only contain letters, numbers, and hyphens',
  })

export const userRouter = createTRPCRouter({
  info: protectedProcedure.query(async ({ ctx }) => {
    const [result] = await ctx.db
      .select({
        id: user.id,
        memberId: user.memberId,
        name: user.name,
        email: user.email,
        image: user.image,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        bonjourId: bonjour.bonjourId,
        bonjourIdUpdatedAt: bonjour.bonjourIdUpdatedAt,
        bonjourIdUpdateCount: bonjour.bonjourIdUpdateCount,
      })
      .from(user)
      .leftJoin(bonjour, eq(user.id, bonjour.userId))
      .where(eq(user.id, ctx.session.user.id))
      .limit(1)

    if (!result) {
      throw new Error('User not found')
    }

    return {
      id: result.id,
      memberId: result.memberId,
      bonjourId: result.bonjourId ?? null,
      bonjourIdUpdatedAt: result.bonjourIdUpdatedAt ?? null,
      bonjourIdUpdateCount: result.bonjourIdUpdateCount ?? 0,
      name: result.name,
      email: result.email,
      image: result.image,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    }
  }),

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
      if (currentBonjour) {
        // Update existing record
        await ctx.db
          .update(bonjour)
          .set({
            bonjourId: input,
            bonjourIdUpdatedAt: new Date(),
            bonjourIdUpdateCount: updateCount,
            updatedAt: new Date(),
          })
          .where(eq(bonjour.userId, ctx.session.user.id))
      } else {
        // Insert new record
        await ctx.db.insert(bonjour).values({
          userId: ctx.session.user.id,
          bonjourId: input,
          bonjourIdUpdatedAt: new Date(),
          bonjourIdUpdateCount: updateCount,
          avatar: '',
          displayName: '',
          bio: '',
        })
      }

      // Return updated user info
      const [result] = await ctx.db
        .select({
          id: user.id,
          memberId: user.memberId,
          name: user.name,
          email: user.email,
          image: user.image,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          bonjourId: bonjour.bonjourId,
          bonjourIdUpdatedAt: bonjour.bonjourIdUpdatedAt,
          bonjourIdUpdateCount: bonjour.bonjourIdUpdateCount,
        })
        .from(user)
        .leftJoin(bonjour, eq(user.id, bonjour.userId))
        .where(eq(user.id, ctx.session.user.id))
        .limit(1)

      if (!result) {
        throw new Error('User not found')
      }

      return {
        id: result.id,
        memberId: result.memberId,
        bonjourId: result.bonjourId ?? null,
        bonjourIdUpdatedAt: result.bonjourIdUpdatedAt ?? null,
        bonjourIdUpdateCount: result.bonjourIdUpdateCount ?? 0,
        name: result.name,
        email: result.email,
        image: result.image,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      }
    }),

  getByBonjourId: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const [result] = await ctx.db
        .select({
          id: user.id,
          name: user.name,
          image: user.image,
          bio: bonjour.bio,
          displayName: bonjour.displayName,
          avatar: bonjour.avatar,
        })
        .from(bonjour)
        .innerJoin(user, eq(bonjour.userId, user.id))
        .where(eq(bonjour.bonjourId, input))
        .limit(1)

      if (!result) {
        throw new Error('Bonjour ID not found')
      }

      return {
        id: result.id,
        name: result.displayName || result.name,
        image: result.avatar || result.image,
        bio: result.bio,
      }
    }),
})
