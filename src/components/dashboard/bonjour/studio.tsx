'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUserStore } from '@/stores/user'
import { api } from '@/trpc/react'

interface BonjourStudioProps {
  bonjourId?: string
  readonly?: boolean
}

export function BonjourStudio({
  bonjourId,
  readonly = false,
}: BonjourStudioProps) {
  const user = useUserStore((state) => state.user)
  const bonjourInfo = useUserStore((state) => state.bonjourInfo)

  const { data: publicUser } = api.user.getByBonjourId.useQuery(bonjourId!, {
    enabled: !!bonjourId,
    retry: false,
  })

  const displayName =
    readonly && publicUser ? publicUser.name : user?.name || ''
  const displayImage =
    readonly && publicUser ? publicUser.image : user?.image || undefined
  const displayBio =
    readonly && publicUser
      ? publicUser.bio
      : bonjourInfo?.bio || 'placeholder bio'

  if (readonly && bonjourId) {
    if (!publicUser) {
      return null
    }
  } else {
    if (!user) {
      return null
    }
  }

  return (
    <div className='mx-auto flex h-full w-full px-20'>
      <div className='flex flex-col gap-8 p-12'>
        <Avatar className='size-48 rounded-full'>
          <AvatarImage
            src={displayImage ?? ''}
            alt={displayName}
          />
          <AvatarFallback className='rounded-full text-2xl'></AvatarFallback>
        </Avatar>

        <div className='flex flex-col gap-4'>
          <h1 className='font-bold text-4xl text-black'>{displayName}</h1>

          <p className='text-black text-xl'>{displayBio}</p>
        </div>
      </div>

      <div className='flex-1'></div>
    </div>
  )
}
