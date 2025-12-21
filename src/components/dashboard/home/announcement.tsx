'use client'

import { useTranslations } from 'next-intl'
import { HeroPill } from '@/components/ui/hero-pill'
import { cn } from '@/lib/utils'

export function Announcement() {
  const t = useTranslations('dashboard')

  return (
    <HeroPill
      data-umami-event='dashboard-home-announcement'
      href='https://shutiao.org/updates'
      label={t('check-updates')}
      announcement={t('announcement')}
      isExternal
      className={cn(
        // Light mode: clean and modern with better contrast
        'bg-white/60 ring-1 ring-orange-200/50 backdrop-blur-sm',
        '[&_div]:bg-orange-500 [&_div]:text-white [&_div]:shadow-sm',
        '[&_p]:text-slate-800',
        '[&_svg]:stroke-slate-600',
        'transition-all duration-200',
        'hover:bg-white/80 hover:shadow-sm hover:ring-orange-300/60',
        // Dark mode: dark background with orange accent
        'dark:bg-orange-950/30 dark:ring-orange-800/40',
        'dark:[&_div]:bg-orange-500/80 dark:[&_div]:text-white',
        'dark:[&_p]:text-orange-300',
        'dark:[&_svg]:stroke-orange-400',
        'dark:hover:bg-orange-950/50 dark:hover:ring-orange-700/50',
      )}
    />
  )
}
