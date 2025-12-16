'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/', label: 'home' },
  { href: '/products', label: 'products' },
  { href: '/events', label: 'events' },
  { href: '/communities', label: 'communities' },
  { href: '/blogs', label: 'blogs' },
  { href: '/about', label: 'about' },
  { href: '/updates', label: 'updates' },
]

export function Nav() {
  const t = useTranslations('nav')
  return (
    <NavigationMenu>
      <NavigationMenuList className='flex-wrap'>
        {NAV_ITEMS.map((item) => (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuLink
              asChild
              className={cn(
                navigationMenuTriggerStyle(),
                'bg-transparent! hover:bg-transparent!',
              )}
            >
              <Link
                href={item.href}
                data-umami-event={`nav:${item.label}`}
                className='opacity-70 transition-all duration-150 hover:opacity-100'
              >
                {t(item.label)}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export function NavMobile() {
  const t = useTranslations('nav')
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className='size-6' />
      </SheetTrigger>

      <SheetContent side='right'>
        <SheetHeader className='border-b px-6 py-4 text-left'>
          <SheetTitle className='text-lg'>{t('menu')}</SheetTitle>
        </SheetHeader>

        <div className='flex flex-1 flex-col overflow-y-auto'>
          <nav className='flex flex-col divide-y divide-border'>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-umami-event={`nav-mobile:${item.label}`}
                className='flex items-center px-6 py-4 text-lg transition-colors hover:bg-muted/50'
              >
                {t(item.label)}
              </Link>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
