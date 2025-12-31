'use client'

import type { LucideIcon } from 'lucide-react'
import {
  SidebarGroup,
  SidebarGroupContent,
  // SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Link } from '@/i18n/navigation'

interface NavGroupProps {
  pathname: string
  projects: {
    name: string
    url: string
    icon: LucideIcon | (() => React.ReactNode)
  }[]
  labelKey: string
}

export function NavGroup({
  pathname,
  projects,
  // labelKey
}: NavGroupProps) {
  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel>{labelKey}</SidebarGroupLabel> */}
      <SidebarGroupContent>
        <SidebarMenu>
          {projects.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.url}
              >
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
