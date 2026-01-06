'use client'

import { produce } from 'immer'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { BonjourInfo } from '@/types'

interface BonjourStore {
  bonjourInfo: BonjourInfo | null
  setBonjourInfo: (bonjourInfo: BonjourInfo | null) => void
  updateBonjourInfo: (updates: Partial<BonjourInfo>) => void
  updateBonjourId: (bonjourId: string | null) => void
}

export const useBonjourStore = create<BonjourStore>()(
  persist(
    (set) => ({
      bonjourInfo: null,
      setBonjourInfo: (bonjourInfo) => set({ bonjourInfo }),
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
      name: 'bonjour-storage',
    },
  ),
)
