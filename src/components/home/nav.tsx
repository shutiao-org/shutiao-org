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

export function Nav() {
  const t = useTranslations('nav')
  return (
    <NavigationMenu>
      <NavigationMenuList className='flex-wrap'>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(
              navigationMenuTriggerStyle(),
              'bg-transparent! hover:bg-transparent!',
            )}
          >
            <Link
              href='/'
              className='opacity-70 transition-all duration-150 hover:opacity-100'
            >
              {t('home')}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(
              navigationMenuTriggerStyle(),
              'bg-transparent! hover:bg-transparent!',
            )}
          >
            <Link
              href='/event'
              className='opacity-70 transition-all duration-150 hover:opacity-100'
            >
              {t('event')}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(
              navigationMenuTriggerStyle(),
              'bg-transparent! hover:bg-transparent!',
            )}
          >
            <Link
              href='/blog'
              className='opacity-70 transition-all duration-150 hover:opacity-100'
            >
              {t('blog')}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(
              navigationMenuTriggerStyle(),
              'bg-transparent! hover:bg-transparent!',
            )}
          >
            <Link
              href='/about'
              className='opacity-70 transition-all duration-150 hover:opacity-100'
            >
              {t('about')}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
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
            <Link
              href='/'
              className='flex items-center px-6 py-4 text-lg transition-colors hover:bg-muted/50'
            >
              {t('home')}
            </Link>

            <Link
              href='/event'
              className='flex items-center px-6 py-4 text-lg transition-colors hover:bg-muted/50'
            >
              {t('event')}
            </Link>

            <Link
              href='/blog'
              className='flex items-center px-6 py-4 text-lg transition-colors hover:bg-muted/50'
            >
              {t('blog')}
            </Link>

            <Link
              href='/about'
              className='flex items-center px-6 py-4 text-lg transition-colors hover:bg-muted/50'
            >
              {t('about')}
            </Link>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
