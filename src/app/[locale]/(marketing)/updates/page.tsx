import { useTranslations } from 'next-intl'
import { Timeline } from '@/components/ui/timeline'

export default function UpdatesPage() {
  const t = useTranslations('updates')

  const data = [
    {
      title: '2025-12-14',
      content: (
        <div>
          <h3 className='mb-2 font-bold text-xl'>{t('v0_0_2.title')}</h3>
          <ul className='mt-4 list-disc space-y-2 pl-5 text-neutral-600 dark:text-neutral-400'>
            <li>
              {t.rich('v0_0_2.digital_nomads_text', {
                link: (chunks) => (
                  <a
                    href='/communities'
                    className='text-blue-500 hover:underline'
                  >
                    {chunks}
                  </a>
                ),
              })}
            </li>
            <li>
              {t.rich('v0_0_2.blogs_text', {
                link: (chunks) => (
                  <a
                    href='/blogs'
                    className='text-blue-500 hover:underline'
                  >
                    {chunks}
                  </a>
                ),
              })}
            </li>
            <li>
              {t.rich('v0_0_2.updates_text', {
                link: (chunks) => (
                  <a
                    href='/updates'
                    className='text-blue-500 hover:underline'
                  >
                    {chunks}
                  </a>
                ),
              })}
            </li>
            <li>{t('v0_0_2.other')}</li>
          </ul>
        </div>
      ),
    },
    {
      title: '2025-12-13',
      content: (
        <div>
          <h3 className='mb-2 font-bold text-xl'>{t('v0_0_1.title')}</h3>
          <ul className='mt-4 list-disc space-y-2 pl-5 text-neutral-600 dark:text-neutral-400'>
            <li>{t('v0_0_1.header')}</li>
            <li>{t('v0_0_1.hero')}</li>
            <li>{t('v0_0_1.footer')}</li>
            <li>{t('v0_0_1.mobile')}</li>
            <li>{t('v0_0_1.partners')}</li>
          </ul>
        </div>
      ),
    },
    {
      title: '2025-12-12',
      content: (
        <div>
          <h3 className='mb-2 font-bold text-xl'>
            {t('brand_founding.title')}
          </h3>
          <ul className='mt-4 list-disc space-y-2 pl-5 text-neutral-600 dark:text-neutral-400'>
            <li>
              {t.rich('brand_founding.website_switch_text', {
                link: (chunks) => (
                  <a
                    href='https://shutiao.org'
                    className='text-blue-500 hover:underline'
                  >
                    <code>{chunks}</code>
                  </a>
                ),
              })}
            </li>
            <li>
              {t.rich('brand_founding.x_text', {
                link: (chunks) => (
                  <a
                    href='https://x.com/shutiaoorg'
                    className='text-blue-500 hover:underline'
                  >
                    {chunks}
                  </a>
                ),
              })}
            </li>
            <li>
              {t.rich('brand_founding.github_text', {
                link: (chunks) => (
                  <a
                    href='https://github.com/shutiao-org'
                    className='text-blue-500 hover:underline'
                  >
                    {chunks}
                  </a>
                ),
              })}
            </li>
          </ul>
          <blockquote className='mt-4 border-neutral-300 border-l-2 pl-4 text-neutral-600 italic dark:border-neutral-700 dark:text-neutral-400'>
            {t('brand_founding.uv')}
          </blockquote>
        </div>
      ),
    },
    {
      title: '2025-12-11',
      content: (
        <>
          <h3 className='mb-2 font-bold text-xl'>{t('daily_updates.title')}</h3>

          <ul className='mt-4 list-disc space-y-2 pl-5 text-neutral-600 dark:text-neutral-400'>
            <li>{t('daily_updates.logo')}</li>
            <li>{t('daily_updates.dark_mode')}</li>
            <li>{t('daily_updates.i18n')}</li>
          </ul>

          <blockquote className='mt-4 border-neutral-300 border-l-2 pl-4 text-neutral-600 italic dark:border-neutral-700 dark:text-neutral-400'>
            {t('daily_updates.uv')}
          </blockquote>
        </>
      ),
    },
    {
      title: '2025-12-10',
      content: (
        <>
          <h3 className='mb-2 font-bold text-xl'>
            {t('community_founding.title')}
          </h3>
          <ul className='mt-4 list-disc space-y-2 pl-5 text-neutral-600 dark:text-neutral-400'>
            <li>
              {t.rich('community_founding.website_text', {
                link: (chunks) => (
                  <a
                    href='https://shutiao.dev'
                    className='text-blue-500 hover:underline'
                  >
                    <code>{chunks}</code>
                  </a>
                ),
              })}
            </li>
            <li>{t('community_founding.kol')}</li>
            <li>
              {t.rich('community_founding.official_account_text', {
                link: (chunks) => (
                  <a
                    href='https://mp.guoqi.dev'
                    className='text-blue-500 hover:underline'
                  >
                    {chunks}
                  </a>
                ),
              })}
            </li>
          </ul>
        </>
      ),
    },
  ]

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
