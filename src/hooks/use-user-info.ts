'use client'

import { useEffect } from 'react'
import { useUserStore } from '@/stores/user'
import { api } from '@/trpc/react'

export function useUserInfo() {
  const { user, bonjourInfo, setUser, setBonjourInfo } = useUserStore()
  const { data, error } = api.user.info.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (error) {
      if (error.data?.code === 'UNAUTHORIZED') {
        setUser(null)
        setBonjourInfo(null)
      }
      return
    }

    if (data) {
      const userData = {
        id: data.id,
        memberId: data.memberId,
        name: data.name,
        email: data.email,
        image: data.image,
        createdAt:
          data.createdAt instanceof Date
            ? data.createdAt
            : new Date(data.createdAt),
        updatedAt:
          data.updatedAt instanceof Date
            ? data.updatedAt
            : new Date(data.updatedAt),
      }

      const bonjourData = {
        bonjourId: data.bonjourId ?? null,
        bonjourIdUpdatedAt: data.bonjourIdUpdatedAt
          ? data.bonjourIdUpdatedAt instanceof Date
            ? data.bonjourIdUpdatedAt
            : new Date(data.bonjourIdUpdatedAt)
          : null,
        bonjourIdUpdateCount: data.bonjourIdUpdateCount ?? 0,
        avatar: '',
        displayName: '',
        bio: '',
      }

      setUser(userData)
      setBonjourInfo(bonjourData)
    }
  }, [data, error, setUser, setBonjourInfo])

  if (user && bonjourInfo) {
    return { ...user, ...bonjourInfo }
  }
  return null
}
