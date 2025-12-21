'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserInfo {
  id: string
  memberId: number
  uuid: string | null
  name: string
  email: string
  image?: string | null
  createdAt: Date
  updatedAt: Date
}

interface UserStore {
  userInfo: UserInfo | null
  setUserInfo: (userInfo: UserInfo | null) => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (userInfo) => set({ userInfo }),
    }),
    {
      name: 'user-storage',
    },
  ),
)
