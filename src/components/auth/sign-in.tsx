'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { SocialLogin } from '@/components/auth/social-login'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { MagicCard } from '@/components/ui/magic-card'
import { PasswordInput } from '@/components/ui/password-input'
import { Spinner } from '@/components/ui/spinner'
import { signIn } from '@/lib/auth/client'
import { REDIRECT_DASHBOARD_PAGE, SIGN_UP_PAGE } from '@/routes'
import { type SignInFormData, useSignInSchema } from '@/schemas'

export function SignIn() {
  const t = useTranslations('auth')
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { theme } = useTheme()
  const gradientColor = theme === 'dark' ? '#262626' : '#D9D9D955'

  const signInSchema = useSignInSchema()

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true)

    try {
      const { data: signInData, error } = await signIn.email({
        email: data.email,
        password: data.password,
      })

      if (error) {
        form.setError('root', {
          message: t('sign-in-error'),
        })
        return
      }

      if (signInData) {
        toast.success(t('sign-in-success'))
        router.push(REDIRECT_DASHBOARD_PAGE)
        router.refresh()
      }
    } catch (_err) {
      form.setError('root', {
        message: t('network-error'),
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <p className='text-center text-5xl'>🍟</p>
      <p className='mt-3 mb-6 text-center font-bold text-2xl'>{t('sign-in')}</p>

      <Card className='relative border-none p-0'>
        <MagicCard
          gradientColor={gradientColor}
          className='p-10'
        >
          <CardContent className='p-0'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
                autoComplete='on'
              >
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem className='flex flex-col gap-3'>
                      <FormLabel className='font-medium text-sm'>
                        {t('email')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type='email'
                          placeholder={t('email-placeholder')}
                          className='h-10'
                          autoComplete='email'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem className='flex flex-col gap-3'>
                      <FormLabel className='font-medium text-sm'>
                        {t('password')}
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder={t('password-placeholder')}
                          autoComplete='current-password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.formState.errors.root && (
                  <p className='text-destructive text-sm'>
                    {form.formState.errors.root.message}
                  </p>
                )}

                <Button
                  type='submit'
                  className='mt-4 h-10 w-full cursor-pointer'
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner /> : t('sign-in')}
                </Button>

                <SocialLogin />
              </form>

              <div className='mt-6 text-center'>
                <p className='text-muted-foreground text-sm'>
                  {t('no-account-yet')}{' '}
                  <Link
                    href={SIGN_UP_PAGE}
                    className='font-medium text-primary hover:underline'
                  >
                    {t('go-to-sign-up')}
                  </Link>
                </p>
              </div>
            </Form>
          </CardContent>
        </MagicCard>
      </Card>
    </>
  )
}
