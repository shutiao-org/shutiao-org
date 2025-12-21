'use client'

import { useTranslations } from 'next-intl'
import { Skeleton } from '@/components/ui/skeleton'
import { useIsClient } from '@/hooks/use-client'
import { useUserStore } from '@/stores/user'
import { getGreeting } from '@/utils'

export function Greeting() {
  const { userInfo } = useUserStore()
  const t = useTranslations('dashboard')
  const isClient = useIsClient()

  if (!isClient)
    return (
      <div className='flex gap-1'>
        <Skeleton className='h-8 w-64' />
        <Skeleton className='h-8 w-32' />
      </div>
    )

  return (
    <div className='flex items-center font-bold text-2xl'>
      <div>{getGreeting(t)}</div>
      <p className='mx-1'>,</p>
      <p>{userInfo?.name}</p>
    </div>
  )
}
