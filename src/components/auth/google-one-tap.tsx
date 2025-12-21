'use client'

import { useRouter } from 'next/navigation'
import Script from 'next/script'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect } from 'react'
import { toast } from 'sonner'
import { env } from '@/env'
import { getSession, signIn } from '@/lib/auth/client'
import { DASHBOARD_HOME_PAGE } from '@/routes'

interface CredentialResponse {
  credential: string
  select_by: string
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string
            callback: (response: CredentialResponse) => void
            use_fedcm_for_prompt?: boolean
            cancel_on_tap_outside?: boolean
            prompt_parent_id?: string
          }) => void
          prompt: (callback?: () => void) => void
        }
      }
    }
  }
}

export function GoogleOneTap() {
  const t = useTranslations('auth')
  const router = useRouter()

  const initializeGoogleOneTap = useCallback(async () => {
    // Check if user is already logged in
    try {
      const session = await getSession()
      if (session?.data?.user) return
    } catch {
      // Session check failed, continue with One Tap
    }

    const clientId = env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    if (!clientId) {
      return
    }

    if (!window.google?.accounts?.id) {
      return
    }

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: async (_response: CredentialResponse) => {
        try {
          // Use better-auth's social sign-in with Google
          // Since better-auth doesn't directly support One Tap credentials,
          // we'll trigger the OAuth flow instead
          // Note: The credential from One Tap could be used for a custom implementation
          const { data, error } = await signIn.social({
            provider: 'google',
          })

          if (error) {
            toast.error(t('google-sign-in-error'))
            return
          }

          // If sign-in was successful, redirect to dashboard
          if (data) {
            toast.success(t('sign-in-success'))
            router.push(DASHBOARD_HOME_PAGE)
            router.refresh()
          }
        } catch (error) {
          console.error('Error logging in with Google One Tap', error)
          toast.error(t('network-error'))
        }
      },
      use_fedcm_for_prompt: true,
      cancel_on_tap_outside: false,
      prompt_parent_id: 'oneTap',
    })

    window.google.accounts.id.prompt(() => {})
  }, [router, t])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.google?.accounts?.id) {
        initializeGoogleOneTap()
      } else {
        window.addEventListener('google-loaded', initializeGoogleOneTap)
      }
    }, 1000)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('google-loaded', initializeGoogleOneTap)
    }
  }, [initializeGoogleOneTap])

  return (
    <>
      <Script
        src='https://accounts.google.com/gsi/client'
        strategy='afterInteractive'
        onLoad={() => {
          window.dispatchEvent(new Event('google-loaded'))
        }}
      />
      <div
        id='oneTap'
        className='fixed top-0 right-0 z-100'
      />
    </>
  )
}
