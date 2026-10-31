import { format, parseISO } from 'date-fns'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { updateCollections } from 'qino/collections/updates'
import { Mdx } from '@/components/common/mdx'
import { Timeline } from '@/components/ui/timeline'
import { routing } from '@/i18n/routing'

export default async function UpdatesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const t = await getTranslations('updates')
  const updates = await updateCollections[locale].getEntries()

  const data = updates.map((update) => ({
    title: format(parseISO(update.date), 'yyyy-MM-dd'),
    content: (
      <div className='prose dark:prose-invert max-w-none'>
        <Mdx source={update.markdown} />
      </div>
    ),
  }))

  return (
    <div className='flex w-full flex-col items-center justify-center pt-20 pb-10'>
      <div className='max-w-3xl space-y-6 text-center'>
        <h1 className='hero-gradient-heading'>{t('title')}</h1>
        <p className='mx-auto text-lg text-neutral-500 md:text-xl'>
          {t('subtitle')}
        </p>
      </div>

      <div className='relative w-full'>
        <Timeline data={data} />
      </div>
    </div>
  )
}
