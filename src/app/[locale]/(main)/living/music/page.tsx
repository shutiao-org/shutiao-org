import { useTranslations } from 'next-intl'
import { MusicCard } from '@/components/music/card'
import { MUSIC } from '@/config'

export default function MusicPage() {
  const t = useTranslations('music')

  return (
    <div className='mx-auto mb-5 max-w-340 px-4 py-10 sm:px-6 lg:mb-10 lg:px-8 lg:py-14'>
      <div className='mx-auto mb-10 max-w-3xl space-y-6 text-center lg:mb-14'>
        <h1 className='hero-gradient-heading'>{t('title')}</h1>
        <p className='mx-auto text-lg text-neutral-500 md:text-xl'>
          {t('subtitle')}
        </p>
      </div>

      <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {MUSIC.map((music) => (
          <MusicCard
            key={music.id}
            {...music}
          />
        ))}
      </div>
    </div>
  )
}
