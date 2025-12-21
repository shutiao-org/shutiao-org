'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WelcomeStore {
  welcomedUsers: Record<string, boolean>
  markUserWelcomed: (userId: string) => void
  hasUserBeenWelcomed: (userId: string) => boolean
}

export const useWelcomeStore = create<WelcomeStore>()(
  persist(
    (set, get) => ({
      welcomedUsers: {},
      markUserWelcomed: (userId: string) => {
        set((state) => ({
          welcomedUsers: {
            ...state.welcomedUsers,
            [userId]: true,
          },
        }))
      },
      hasUserBeenWelcomed: (userId: string) => {
        const { welcomedUsers } = get()
        return welcomedUsers[userId] === true
      },
    }),
    {
      name: 'welcome-storage',
    },
  ),
)
