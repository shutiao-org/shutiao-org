'use client'

import { produce } from 'immer'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { BonjourInfo, User } from '@/types'

interface UserStore {
  user: User | null
  bonjourInfo: BonjourInfo | null
  setUser: (user: User | null) => void
  setBonjourInfo: (bonjourInfo: BonjourInfo | null) => void
  updateUser: (updates: Partial<User>) => void
  updateBonjourInfo: (updates: Partial<BonjourInfo>) => void
  updateBonjourId: (bonjourId: string | null) => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      bonjourInfo: null,
      setUser: (user) => set({ user }),
      setBonjourInfo: (bonjourInfo) => set({ bonjourInfo }),
      updateUser: (updates) =>
        set(
          produce((state) => {
            if (state.user) {
              Object.assign(state.user, updates)
            }
          }),
        ),
      updateBonjourInfo: (updates) =>
        set(
          produce((state) => {
            if (state.bonjourInfo) {
              Object.assign(state.bonjourInfo, updates)
            }
          }),
        ),
      updateBonjourId: (bonjourId) =>
        set(
          produce((state) => {
            if (state.bonjourInfo) {
              state.bonjourInfo.bonjourId = bonjourId
            }
          }),
        ),
    }),
    {
      name: 'user-storage',
    },
  ),
)
