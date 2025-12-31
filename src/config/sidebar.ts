import type { LucideIcon } from 'lucide-react'
import { Github, LifeBuoy, Send } from 'lucide-react'
import React from 'react'
import { BONJOUR_PAGE, SETTINGS_PAGE } from '@/routes'
import { SOCIAL_LINKS } from './social'

export type MenuItem = {
  nameKey: string
  url: string
  icon: LucideIcon | (() => React.ReactNode)
}

export const HOME_MENU_ITEMS: MenuItem[] = [
  {
    nameKey: 'bonjour',
    url: BONJOUR_PAGE,
    icon: () => React.createElement('span', { className: 'text-lg' }, '👋'),
  },
  {
    nameKey: 'settings',
    url: SETTINGS_PAGE,
    icon: () => React.createElement('span', { className: 'text-lg' }, '⚙️'),
  },
]

export const NAV_SECONDARY_ITEMS: MenuItem[] = [
  {
    nameKey: 'github',
    url: SOCIAL_LINKS.github,
    icon: Github,
  },
  {
    nameKey: 'support',
    url: 'mailto:shutiaoorg@gmail.com',
    icon: LifeBuoy,
  },
  {
    nameKey: 'feedback',
    url: SOCIAL_LINKS.telegram,
    icon: Send,
  },
]
