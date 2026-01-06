'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useBonjourStore } from '@/stores/bonjour'
import { api } from '@/trpc/react'

interface BonjourStudioProps {
  bonjourId?: string
  readonly?: boolean
}

export function BonjourStudio({
  bonjourId,
  readonly = false,
}: BonjourStudioProps) {
  const { bonjourInfo } = useBonjourStore()

  const { data: publicUser } = api.bonjour.getInfoByBonjourId.useQuery(
    bonjourId!,
    {
      enabled: !!bonjourId && readonly,
      retry: false,
    },
  )

  const displayInfo = readonly ? publicUser : bonjourInfo

  if (!displayInfo) {
    return null
  }

  return (
    <div className='mx-auto flex h-full w-full px-20'>
      <div className='flex flex-col gap-8 p-12'>
        <Avatar className='size-48 rounded-full'>
          <AvatarImage
            src={displayInfo.avatar ?? ''}
            alt={displayInfo.displayName}
          />
          <AvatarFallback className='rounded-full text-2xl'></AvatarFallback>
        </Avatar>

        <div className='flex flex-col gap-4'>
          <h1 className='font-bold text-4xl text-black'>
            {displayInfo.displayName}
          </h1>
          <p className='text-black text-xl'>{displayInfo.bio || ''}</p>
        </div>
      </div>
      <div className='flex-1'></div>
    </div>
  )
}
