'use client'

import { useTranslations } from 'next-intl'
import { z } from 'zod'

// Client-side schema (uses translations)
export function useClaimLinkSchema() {
  const t = useTranslations('dashboard.bonjour-starter')

  return z.object({
    uniqueId: z
      .string()
      .min(3, { message: t('min-length') })
      .max(18, { message: t('max-length') })
      .regex(/^[a-zA-Z0-9_-]+$/, { message: t('invalid') }),
  })
}

export type ClaimLinkFormData = z.infer<ReturnType<typeof useClaimLinkSchema>>
