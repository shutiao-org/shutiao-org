import { allEvents } from 'contentlayer/generated'
import { compareDesc, format, parseISO } from 'date-fns'
import { getTranslations } from 'next-intl/server'
import { Mdx } from '@/components/common/mdx'
import { Timeline } from '@/components/ui/timeline'

export default async function EventPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations('events')

  const events = allEvents
    .filter((event) => event.locale === locale)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  const data = events.map((event) => ({
    title: format(parseISO(event.date), 'yyyy-MM-dd'),
    content: (
      <div className='prose dark:prose-invert max-w-none'>
        <Mdx code={event.body.code} />
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

      <div className='timeline-wrapper relative w-full'>
        <Timeline data={data} />
      </div>
    </div>
  )
}
