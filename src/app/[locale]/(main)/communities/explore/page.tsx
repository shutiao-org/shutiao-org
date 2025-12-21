'use client'

import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'

const MapLibre = dynamic(() => import('@/components/map/mapLibre'), {
  ssr: false,
  loading: () => <div className='h-[600px] sm:h-[800px]' />,
})

export default function MapPage() {
  const t = useTranslations('explore')

  return (
    <section className='z-10 flex w-full flex-1 flex-col items-center gap-20 px-4 py-16 md:px-8 md:py-20'>
      <div className='max-w-3xl space-y-6 text-center'>
        <h1 className='hero-gradient-heading'>{t('title')}</h1>
        <p className='mx-auto text-lg text-neutral-500 md:text-xl'>
          {t('subtitle')}
        </p>
      </div>

      <MapLibre
        hideControls={true}
        style={{ width: '100%', height: '100%', minHeight: '500px' }}
        scrollZoom={false}
      />
    </section>
  )
}
