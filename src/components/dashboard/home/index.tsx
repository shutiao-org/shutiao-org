'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import TelegramIcon from '@/assets/images/svg/tg.svg'
import { Announcement } from '@/components/dashboard/home/announcement'
import { Greeting } from '@/components/dashboard/home/greeting'
import { MemberCard } from '@/components/dashboard/home/member-card'
import { ThemeToggle } from '@/components/theme/toggle'
import { Typewriter } from '@/components/ui/typewriter-text'
import { SOCIAL_LINKS } from '@/config'

export function DashboardHome() {
  const t = useTranslations('dashboard')

  return (
    <div className='flex h-full w-full items-center justify-center'>
      <main className='mx-auto flex w-full max-w-5xl flex-col gap-24'>
        <div className='flex items-center justify-between'>
          <Announcement />
          <ThemeToggle size={20} />
        </div>

        <div className='flex justify-center'>
          <MemberCard />
        </div>

        <div className='flex items-center justify-between'>
          <Greeting />
          <Link
            target='_blank'
            href={SOCIAL_LINKS.telegram}
            className='flex items-center gap-4'
            data-umami-event='dashboard-home-telegram'
          >
            <Typewriter
              text={[t('have-question'), t('join-telegram')]}
              speed={100}
              loop={true}
              className='font-medium text-sm'
            />
            <TelegramIcon className='size-6' />
          </Link>
        </div>
      </main>
    </div>
  )
}
