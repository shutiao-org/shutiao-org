import { useTranslations } from 'next-intl'

export default function MoviesPage() {
  const t = useTranslations('movies')

  return (
    <section className='z-10 flex w-full flex-1 flex-col items-center justify-center gap-20 px-4 py-16 md:px-8 md:py-20'>
      <div className='max-w-3xl space-y-6 text-center'>
        <h1 className='hero-gradient-heading'>{t('title')}</h1>
        <p className='mx-auto text-lg text-neutral-500 md:text-xl'>
          {t('subtitle')}
        </p>
      </div>
    </section>
  )
}
