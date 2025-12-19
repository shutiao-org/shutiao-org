import { useTranslations } from 'next-intl'
import { Logo } from '@/components/common/logo'
import { SocialMedia } from '@/components/common/social-media'
import { Friends } from '@/components/home/friends'
import { LanguageToggle } from '@/components/language/toggle'
import { SOCIAL_LINKS } from '@/config'

export function Footer() {
  const t = useTranslations('footer')
  const menuItems = [
    {
      title: t('social'),
      links: [
        { text: 'X', url: SOCIAL_LINKS.x },
        { text: 'GitHub', url: SOCIAL_LINKS.github },
        { text: 'WeChat', url: SOCIAL_LINKS.wechat },
        { text: 'Telegram', url: SOCIAL_LINKS.telegram },
        { text: 'YouTube', url: SOCIAL_LINKS.youtube },
      ],
    },
    {
      title: t('friends'),
      links: [
        {
          text: 'Dalifornia',
          url: 'https://dalifornia.org',
        },
        {
          text: 'WaytoAGI',
          url: 'https://waytoagi.com',
        },
        {
          text: 'OpenBuild',
          url: 'https://openbuild.xyz',
        },
        {
          text: '出海去社区',
          url: 'https://www.chuhaiqu.club',
        },
      ],
    },
    {
      title: t('products'),
      links: [
        { text: 'Camlife App', url: 'https://camlife.app' },
        { text: 'Camlife Tools', url: 'https://camlife.tools' },
        { text: 'MindMap Best', url: 'https://mindmap.best' },
        { text: 'Cyc Earth', url: 'https://cyc.earth' },
        { text: 'YoLo Earth', url: 'https://yolo.earth' },
      ],
    },
    {
      title: t('company'),
      links: [
        { text: t('terms'), url: '/terms' },
        { text: t('privacy'), url: '/privacy' },
        { text: t('members'), url: 'https://guoqi.dev' },
        { text: t('contact'), url: SOCIAL_LINKS.email },
      ],
    },
  ]

  const bottomLinks = [
    { text: t('terms-full'), url: '/terms' },
    { text: t('privacy-full'), url: '/privacy' },
  ]

  return (
    <footer className='mx-auto flex w-full max-w-7xl flex-col justify-center px-8 py-32'>
      <div className='grid grid-cols-2 gap-8 lg:grid-cols-6'>
        <div className='col-span-2 mb-8 flex flex-col gap-4 lg:mb-0'>
          <div className='flex items-center gap-2 lg:justify-start'>
            <Logo />
          </div>

          <p className='text-sm'>{t('description')}</p>

          <SocialMedia className='mt-2' />
        </div>

        {menuItems.map((section, sectionIdx) => (
          <div key={sectionIdx}>
            <h3 className='mb-4 font-bold'>{section.title}</h3>
            <ul className='space-y-4 text-muted-foreground'>
              {section.links.map((link, linkIdx) => (
                <li
                  key={linkIdx}
                  className='font-medium hover:text-primary'
                  data-umami-event={`footer:${section.title}:${link.text}`}
                >
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className='my-10 border-border border-y py-10'>
        <Friends />
      </div>

      <div className='flex flex-col justify-between gap-4 font-medium text-muted-foreground text-sm md:flex-row md:items-center'>
        <p>{t('copyright')}</p>
        <ul className='flex items-center gap-5'>
          {bottomLinks.map((link, linkIdx) => (
            <li
              key={linkIdx}
              className='underline hover:text-primary'
            >
              <a href={link.url}>{link.text}</a>
            </li>
          ))}
          <LanguageToggle variant='select' />
        </ul>
      </div>
    </footer>
  )
}
