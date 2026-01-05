'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { MemberCard } from '@/components/common/member-card'
import { BackgroundLines } from '@/components/ui/background-lines'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RainbowButton } from '@/components/ui/rainbow-button'
import { Spinner } from '@/components/ui/spinner'
import { useConfetti } from '@/hooks/use-confetti'
import { cn } from '@/lib/utils'
import { BONJOUR_STUDIO_PAGE } from '@/routes'
import { useUserStore } from '@/stores/user'
import { api } from '@/trpc/react'

export function BonjourStarter() {
  const t = useTranslations('dashboard.claim-link')
  const { updateBonjourId, updateBonjourInfo } = useUserStore()
  const { playConfetti } = useConfetti()
  const router = useRouter()

  const updateBonjourIdMutation = api.user.updateBonjourId.useMutation({
    onSuccess: (data) => {
      const bonjourUpdates = {
        bonjourId: data.bonjourId,
        bonjourIdUpdatedAt: data.bonjourIdUpdatedAt
          ? data.bonjourIdUpdatedAt instanceof Date
            ? data.bonjourIdUpdatedAt
            : new Date(data.bonjourIdUpdatedAt)
          : null,
        bonjourIdUpdateCount: data.bonjourIdUpdateCount,
      }
      updateBonjourInfo(bonjourUpdates)
      playConfetti(3000)
      router.push(BONJOUR_STUDIO_PAGE)
    },
  })

  const claimLinkSchema = z.object({
    uniqueId: z
      .string()
      .min(3, { message: t('min-length') })
      .max(18, { message: t('max-length') })
      .regex(/^[a-zA-Z0-9-]+$/, { message: t('invalid') }),
  })

  type ClaimLinkFormData = z.infer<typeof claimLinkSchema>

  const form = useForm<ClaimLinkFormData>({
    resolver: zodResolver(claimLinkSchema),
    mode: 'onChange',
    defaultValues: {
      uniqueId: '',
    },
  })

  const watchedValue = form.watch('uniqueId')

  const onSubmit = async (formData: ClaimLinkFormData) => {
    try {
      await updateBonjourIdMutation.mutateAsync(formData.uniqueId)
    } catch (error) {
      form.setError('root', {
        message: error instanceof Error ? error.message : t('taken'),
      })
    }
  }

  return (
    <BackgroundLines className='flex h-full w-full flex-col items-center justify-center px-4 py-8'>
      <div className='flex flex-col gap-2 text-center md:gap-4'>
        <p className='text-base md:text-xl'>{t('greeting')}</p>
        <h1 className='font-bold text-3xl tracking-tight md:text-4xl lg:text-5xl'>
          {t('title')}
        </h1>
        <p className='text-muted-foreground text-xs md:text-sm'>
          {t('subtitle')}
        </p>
      </div>

      <div className='my-6 scale-75 md:my-10 md:scale-100'>
        <MemberCard />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='min-h-[250px] w-full max-w-[400px]'
        >
          <FormField
            control={form.control}
            name='uniqueId'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='relative'>
                    <span className='-translate-y-1/2 pointer-events-none absolute top-1/2 left-2 text-muted-foreground text-xs md:left-3 md:text-sm'>
                      {t('prefix')}
                    </span>
                    <Input
                      type='text'
                      placeholder={t('placeholder')}
                      className={cn(
                        'h-11 rounded-xl pr-3 pl-[85px] text-sm md:h-12 md:pl-[92px] md:text-base',
                      )}
                      autoComplete='off'
                      autoFocus
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/[^a-zA-Z0-9-]/g, '')
                          .slice(0, 18)
                        field.onChange(value)
                        updateBonjourId(value || null)
                        form.trigger('uniqueId')
                      }}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <div className='flex min-h-10 items-center'>
            {form.formState.errors.uniqueId && (
              <p className='text-destructive text-sm'>
                {form.formState.errors.uniqueId.message}
              </p>
            )}
            {form.formState.errors.root && (
              <p className='text-destructive text-sm'>
                {form.formState.errors.root.message}
              </p>
            )}
          </div>

          <RainbowButton
            type='submit'
            size='lg'
            disabled={
              updateBonjourIdMutation.isPending ||
              !form.formState.isValid ||
              !watchedValue
            }
            className='w-full'
          >
            {updateBonjourIdMutation.isPending ? (
              <>
                <Spinner className='mr-2' />
                {t('validating')}
              </>
            ) : (
              t('button')
            )}
          </RainbowButton>
        </form>
      </Form>
    </BackgroundLines>
  )
}
