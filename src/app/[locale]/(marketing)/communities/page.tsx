import { ExternalLink, MapPin } from 'lucide-react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { buttonVariants } from '@/components/ui/button'
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { MagicCard } from '@/components/ui/magic-card'
import { cn } from '@/lib/utils'

export default function CommunitiesPage() {
  const t = useTranslations('communities')
  const locale = useLocale()

  const communities = [
    {
      name: t('dali.name'),
      englishName: 'Dali',
      url: 'https://dalifornia.org',
      description: t('dali.description'),
    },
    {
      name: t('chiangmai.name'),
      englishName: 'Chiang Mai',
      url: 'https://chiangmai.cool',
      description: t('chiangmai.description'),
    },
  ]

  return (
    <section className='z-10 flex w-full flex-1 flex-col items-center justify-center gap-20 px-4 py-16 md:px-8 md:py-20'>
      <div className='max-w-3xl space-y-6 text-center'>
        <h1 className='bg-linear-to-b from-neutral-200 to-neutral-600 bg-clip-text font-bold text-4xl text-transparent md:text-6xl dark:from-neutral-50 dark:to-neutral-400'>
          {t('title')}
        </h1>
        <p className='mx-auto text-lg text-neutral-500 md:text-xl'>
          {t('subtitle')}
        </p>
      </div>

      <div className='grid w-full max-w-5xl grid-cols-1 place-items-center gap-8 sm:grid-cols-2 md:gap-12'>
        {communities.map((community) => (
          <MagicCard
            key={community.name}
            className='w-full max-w-[380px] cursor-pointer rounded-xl border-none py-6 shadow-2xl transition-all duration-300 hover:scale-105'
            backgroundClassName='bg-white dark:bg-black/20 backdrop-blur-xl'
            gradientClassName='md:hidden dark:md:block'
            gradientFrom='#38bdf8'
            gradientTo='#3b82f6'
          >
            <Link
              href={community.url}
              target='_blank'
              rel='noopener noreferrer'
              className='flex h-full flex-col gap-6'
              data-umami-event={`communities:${community.name}`}
            >
              <CardHeader>
                <CardTitle className='flex items-center gap-3 text-2xl'>
                  <MapPin className='h-6 w-6' />
                  {locale === 'en' ? community.englishName : community.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>{community.description}</p>
              </CardContent>
              <CardFooter className='mt-auto'>
                <div
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'w-full',
                  )}
                >
                  {t('visit')} <ExternalLink className='ml-2 h-4 w-4' />
                </div>
              </CardFooter>
            </Link>
          </MagicCard>
        ))}
      </div>
    </section>
  )
}
