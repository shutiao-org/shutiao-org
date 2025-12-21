'use client'

import type { LucideIcon } from 'lucide-react'
import { Home, LifeBuoy, Send, Settings } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { NavGroup } from '@/components/dashboard/sidebar/nav-group'
import { NavLogo } from '@/components/dashboard/sidebar/nav-logo'
import { NavSecondary } from '@/components/dashboard/sidebar/nav-secondary'
import { NavUser } from '@/components/dashboard/sidebar/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { DASHBOARD_HOME_PAGE, SETTINGS_PAGE } from '@/routes'

type MenuItem = {
  nameKey: string
  url: string
  icon: LucideIcon
}

export function AppSidebar({
  user,
}: {
  user: {
    name: string
    email: string
    image?: string | null
  }
}) {
  const pathname = usePathname()
  const t = useTranslations('dashboard')

  const homeItem: MenuItem[] = [
    {
      nameKey: 'home',
      url: DASHBOARD_HOME_PAGE,
      icon: Home,
    },
    {
      nameKey: 'settings',
      url: SETTINGS_PAGE,
      icon: Settings,
    },
  ]

  const navSecondary: MenuItem[] = [
    {
      nameKey: 'support',
      url: 'mailto:shutiaoorg@gmail.com',
      icon: LifeBuoy,
    },
    {
      nameKey: 'feedback',
      url: 'https://github.com/shutiao-org/shutiao-org/issues',
      icon: Send,
    },
  ]

  return (
    <Sidebar
      collapsible='icon'
      variant='inset'
    >
      <SidebarRail />
      <SidebarHeader>
        <NavLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavGroup
          pathname={pathname}
          projects={homeItem.map((item) => ({
            name: t(item.nameKey),
            url: item.url,
            icon: item.icon,
          }))}
          labelKey={t('application')}
        />
        <NavSecondary
          items={navSecondary.map((item) => ({
            title: t(item.nameKey),
            url: item.url,
            icon: item.icon,
          }))}
          className='mt-auto'
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user.name,
            email: user.email,
            avatar: user.image || '',
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
