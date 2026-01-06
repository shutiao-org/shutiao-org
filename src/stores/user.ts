'use client'

import { produce } from 'immer'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'

interface UserStore {
  user: User | null
  setUser: (user: User | null) => void
  updateUser: (updates: Partial<User>) => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      updateUser: (updates) =>
        set(
          produce((state) => {
            if (state.user) {
              Object.assign(state.user, updates)
            }
          }),
        ),
    }),
    {
      name: 'user-storage',
    },
  ),
)
