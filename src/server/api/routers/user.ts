import { eq } from 'drizzle-orm'
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { user } from '@/server/db/schema/auth'
import { bonjour } from '@/server/db/schema/bonjour'

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
})
