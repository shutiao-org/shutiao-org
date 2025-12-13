import { ExternalLink, MapPin } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Footer } from '@/components/home/footer'
import { Header } from '@/components/home/header'
import { buttonVariants } from '@/components/ui/button'
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { MagicCard } from '@/components/ui/magic-card'
import { Spotlight } from '@/components/ui/spotlight'
import { cn } from '@/lib/utils'

export default function CommunitiesPage() {
  const t = useTranslations('communities')

  const communities = [
    {
      name: t('dali.name'),
      englishName: 'Dali',
      url: 'https://dalifornia.org',
      description: t('dali.description'),
      color: '#3b82f6', // blue-500
    },
    {
      name: t('chiangmai.name'),
      englishName: 'Chiang Mai',
      url: 'https://chiangmai.cool',
      description: t('chiangmai.description'),
      color: '#10b981', // emerald-500
    },
  ]

  return (
    <div className='relative flex min-h-screen flex-col items-center overflow-hidden bg-background'>
      <Spotlight
        className='-top-40 md:-top-20 left-0 md:left-60'
        fill='white'
      />

      <Header />

      <main className='z-10 flex w-full max-w-[1400px] flex-1 flex-col items-center justify-center gap-12 px-4 py-12 md:px-8 md:py-24'>
        <div className='space-y-4 text-center'>
          <h1 className='bg-linear-to-b from-neutral-200 to-neutral-600 bg-clip-text font-bold text-4xl text-transparent md:text-6xl dark:from-neutral-50 dark:to-neutral-400'>
            {t('title')}
          </h1>
          <p className='mx-auto max-w-lg text-lg text-neutral-500 md:text-xl'>
            {t('subtitle')}
          </p>
        </div>

        <div className='grid w-full max-w-4xl grid-cols-1 place-items-center gap-6 sm:grid-cols-2 md:gap-10'>
          {communities.map((community) => (
            <MagicCard
              key={community.name}
              className='w-full max-w-[380px] cursor-pointer rounded-xl border-none py-6 shadow-2xl'
              gradientColor={community.color}
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
                    <MapPin
                      className='h-6 w-6'
                      style={{ color: community.color }}
                    />
                    {community.name}
                  </CardTitle>
                  <CardDescription className='text-lg'>
                    {community.englishName}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className='text-muted-foreground'>
                    {community.description}
                  </p>
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
      </main>

      <Footer />
    </div>
  )
}
