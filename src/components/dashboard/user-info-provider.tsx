'use client'

import { useEffect } from 'react'
import { useConfetti } from '@/hooks/use-confetti'
import { useUserInfo } from '@/hooks/use-user-info'
import { useWelcomeStore } from '@/stores/welcome'

export function UserInfoProvider() {
  const userInfo = useUserInfo()

  const { playConfetti2 } = useConfetti()
  const { hasUserBeenWelcomed, markUserWelcomed } = useWelcomeStore()

  useEffect(() => {
    if (userInfo?.id) {
      if (!hasUserBeenWelcomed(userInfo.id)) {
        playConfetti2(3000)
        markUserWelcomed(userInfo.id)
      }
    }
  }, [userInfo?.id, hasUserBeenWelcomed, markUserWelcomed, playConfetti2])

  return null
}
