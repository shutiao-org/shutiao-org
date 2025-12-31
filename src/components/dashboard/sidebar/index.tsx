'use client'

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
import { HOME_MENU_ITEMS, NAV_SECONDARY_ITEMS } from '@/config'
import { usePathname } from '@/i18n/navigation'

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
          projects={HOME_MENU_ITEMS.map((item) => ({
            name: t(item.nameKey),
            url: item.url,
            icon: item.icon,
          }))}
          labelKey={t('application')}
        />
        <NavSecondary
          items={NAV_SECONDARY_ITEMS.map((item) => ({
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
