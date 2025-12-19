import { allUpdates } from 'contentlayer/generated'
import { compareDesc, format, parseISO } from 'date-fns'
import { getTranslations } from 'next-intl/server'
import { Mdx } from '@/components/common/mdx'
import { Timeline } from '@/components/ui/timeline'

export default async function UpdatesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations('updates')

  const updates = allUpdates
    .filter((update) => update.locale === locale)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  const data = updates.map((update) => ({
    title: format(parseISO(update.date), 'yyyy-MM-dd'),
    content: (
      <div className='prose dark:prose-invert max-w-none'>
        <Mdx code={update.body.code} />
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

      <Timeline data={data} />
    </div>
  )
}
