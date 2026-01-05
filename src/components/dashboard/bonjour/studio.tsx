'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUserStore } from '@/stores/user'

export function BonjourStudio() {
  const user = useUserStore((state) => state.user)
  const bonjourInfo = useUserStore((state) => state.bonjourInfo)

  if (!user) {
    return null
  }

  return (
    <div className='mx-auto flex h-full w-full px-20'>
      <div className='flex flex-col gap-8 p-12'>
        <Avatar className='size-48 rounded-full'>
          <AvatarImage
            src={user.image || undefined}
            alt={user.name}
          />
          <AvatarFallback className='rounded-full text-2xl'></AvatarFallback>
        </Avatar>

        <div className='flex flex-col gap-4'>
          <h1 className='font-bold text-4xl text-black'>{user.name}</h1>

          <p className='text-black text-xl'>
            {bonjourInfo?.bio || 'placeholder bio'}
          </p>
        </div>
      </div>

      <div className='flex-1'></div>
    </div>
  )
}
