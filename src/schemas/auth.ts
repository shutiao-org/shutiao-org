'use client'

import { useTranslations } from 'next-intl'
import { z } from 'zod'

export function useSignInSchema() {
  const t = useTranslations('auth')

  return z.object({
    email: z.email({ message: t('email-invalid') }),
    password: z.string().min(1, { message: t('password-required') }),
  })
}

export function useSignUpSchema() {
  const t = useTranslations('auth')

  return z
    .object({
      name: z
        .string()
        .min(2, { message: t('username-required') })
        .max(50, { message: t('username-required') }),
      email: z.email({ message: t('email-invalid') }),
      password: z
        .string()
        .min(8, { message: t('password-length') })
        .regex(/[A-Z]/, { message: t('password-uppercase') })
        .regex(/[a-z]/, { message: t('password-lowercase') })
        .regex(/[0-9]/, { message: t('password-number') }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('passwords-do-not-match'),
      path: ['confirmPassword'],
    })
}

export type SignInFormData = z.infer<ReturnType<typeof useSignInSchema>>
export type SignUpFormData = z.infer<ReturnType<typeof useSignUpSchema>>
