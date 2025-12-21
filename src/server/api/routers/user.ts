import { eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { user } from '@/server/db/schema/auth'

export const userRouter = createTRPCRouter({
  info: protectedProcedure.query(async ({ ctx }) => {
    const [userInfo] = await ctx.db
      .select()
      .from(user)
      .where(eq(user.id, ctx.session.user.id))
      .limit(1)

    if (!userInfo) {
      throw new Error('User not found')
    }

    if (!userInfo.uuid) {
      const newUuid = nanoid()
      await ctx.db
        .update(user)
        .set({ uuid: newUuid })
        .where(eq(user.id, userInfo.id))

      return {
        id: userInfo.id,
        memberId: userInfo.memberId,
        uuid: newUuid,
        name: userInfo.name,
        email: userInfo.email,
        image: userInfo.image,
        createdAt: userInfo.createdAt,
        updatedAt: userInfo.updatedAt,
      }
    }

    return {
      id: userInfo.id,
      memberId: userInfo.memberId,
      uuid: userInfo.uuid,
      name: userInfo.name,
      email: userInfo.email,
      image: userInfo.image,
      createdAt: userInfo.createdAt,
      updatedAt: userInfo.updatedAt,
    }
  }),
})
