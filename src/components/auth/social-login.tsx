'use client'

import { Github } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { toast } from 'sonner'
import GoogleIcon from '@/assets/images/logos/google.svg'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import { signIn } from '@/lib/auth/client'
import { DASHBOARD_HOME_PAGE } from '@/routes'

type SocialProvider = 'google' | 'github'

export function SocialLogin() {
  const t = useTranslations('auth')
  const router = useRouter()

  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isGithubLoading, setIsGithubLoading] = useState(false)

  const handleSocialLogin = async (
    provider: SocialProvider,
    setLoading: (loading: boolean) => void,
  ) => {
    setLoading(true)

    try {
      const { data, error } = await signIn.social({
        provider,
        callbackURL: DASHBOARD_HOME_PAGE,
      })

      if (error) {
        toast.error(t('sign-in-error'))
        setLoading(false)
        return
      }

      if (data?.url) {
        window.location.href = data.url
        return
      }

      if (data) {
        toast.success(t('sign-in-success'))
        router.push(DASHBOARD_HOME_PAGE)
        router.refresh()
        setLoading(false)
      }
    } catch (_err) {
      toast.error(t('network-error'))
      setLoading(false)
    }
  }

  const handleGoogleLogin = () =>
    handleSocialLogin('google', setIsGoogleLoading)

  const handleGithubLogin = () =>
    handleSocialLogin('github', setIsGithubLoading)

  return (
    <>
      <div className='my-6 flex items-center'>
        <Separator className='flex-1' />
        <span className='px-4 text-muted-foreground text-xs uppercase'>
          {t('or')}
        </span>
        <Separator className='flex-1' />
      </div>

      <div className='flex flex-col gap-6'>
        <Button
          onClick={handleGoogleLogin}
          variant='outline'
          className='h-10 w-full cursor-pointer'
          disabled={isGoogleLoading}
          data-umami-event='login-google'
        >
          {isGoogleLoading ? (
            <Spinner />
          ) : (
            <>
              <GoogleIcon className='size-5' />
              {t('continue-with-google')}
            </>
          )}
        </Button>

        <Button
          onClick={handleGithubLogin}
          variant='outline'
          className='h-10 w-full cursor-pointer'
          disabled={isGithubLoading}
          data-umami-event='login-github'
        >
          {isGithubLoading ? (
            <Spinner />
          ) : (
            <>
              <Github className='size-5' />
              {t('continue-with-github')}
            </>
          )}
        </Button>
      </div>
    </>
  )
}
