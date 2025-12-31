'use client'

import { produce } from 'immer'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserInfo } from '@/types'

interface UserStore {
  userInfo: UserInfo | null
  setUserInfo: (userInfo: UserInfo | null) => void
  updateUserInfo: (updates: Partial<UserInfo>) => void
  updateBonjourId: (bonjourId: string | null) => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (userInfo) => set({ userInfo }),
      updateUserInfo: (updates) =>
        set(
          produce((state) => {
            if (state.userInfo) {
              Object.assign(state.userInfo, updates)
            }
          }),
        ),
      updateBonjourId: (bonjourId) =>
        set(
          produce((state) => {
            if (state.userInfo) {
              state.userInfo.bonjourId = bonjourId
            }
          }),
        ),
    }),
    {
      name: 'user-storage',
    },
  ),
)
