import { format, parseISO } from 'date-fns'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { eventCollections } from 'qino/collections/events'
import { Mdx } from '@/components/common/mdx'
import { EventsTabs } from '@/components/events/tabs'
import { routing } from '@/i18n/routing'

export default async function EventPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const t = await getTranslations('events')
  const events = await eventCollections[locale].getEntries()

  const now = new Date()
  const upcomingEvents = events.filter((event) => new Date(event.date) >= now)
  const pastEvents = events.filter((event) => new Date(event.date) < now)

  const upcomingData = upcomingEvents.map((event) => ({
    title: format(parseISO(event.date), 'yyyy-MM-dd'),
    content: (
      <div className='prose dark:prose-invert max-w-none'>
        <Mdx source={event.markdown} />
      </div>
    ),
  }))

  const pastData = pastEvents.map((event) => ({
    title: format(parseISO(event.date), 'yyyy-MM-dd'),
    content: (
      <div className='prose dark:prose-invert max-w-none'>
        <Mdx source={event.markdown} />
      </div>
    ),
  }))

  return (
    <div className='flex w-full flex-col items-center justify-center pt-12 pb-6 md:pt-20 md:pb-10'>
      <div className='max-w-3xl space-y-4 px-4 text-center md:space-y-6 md:px-0'>
        <h1 className='hero-gradient-heading'>{t('title')}</h1>
        <p className='mx-auto text-base text-neutral-500 md:text-lg lg:text-xl'>
          {t('subtitle')}
        </p>
      </div>

      <div className='relative my-10 w-full'>
        <EventsTabs
          upcomingData={upcomingData}
          pastData={pastData}
          locale={locale}
        />
      </div>
    </div>
  )
}
