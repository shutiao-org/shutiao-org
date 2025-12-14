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
              data-umami-event='nav:home'
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
              href='/products'
              data-umami-event='nav:products'
              className='opacity-70 transition-all duration-150 hover:opacity-100'
            >
              {t('products')}
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
              href='/events'
              data-umami-event='nav:event'
              className='opacity-70 transition-all duration-150 hover:opacity-100'
            >
              {t('events')}
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
              href='/communities'
              data-umami-event='nav:communities'
              className='opacity-70 transition-all duration-150 hover:opacity-100'
            >
              {t('communities')}
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
              href='/blogs'
              data-umami-event='nav:blogs'
              className='opacity-70 transition-all duration-150 hover:opacity-100'
            >
              {t('blogs')}
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
              data-umami-event='nav:about'
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
              data-umami-event='nav-mobile:home'
              className='flex items-center px-6 py-4 text-lg transition-colors hover:bg-muted/50'
            >
              {t('home')}
            </Link>

            <Link
              href='/event'
              data-umami-event='nav-mobile:products'
              className='flex items-center px-6 py-4 text-lg transition-colors hover:bg-muted/50'
            >
              {t('products')}
            </Link>

            <Link
              href='/events'
              data-umami-event='nav-mobile:event'
              className='flex items-center px-6 py-4 text-lg transition-colors hover:bg-muted/50'
            >
              {t('events')}
            </Link>

            <Link
              href='/communities'
              data-umami-event='nav-mobile:products'
              className='flex items-center px-6 py-4 text-lg transition-colors hover:bg-muted/50'
            >
              {t('communities')}
            </Link>

            <Link
              href='/blogs'
              data-umami-event='nav-mobile:blogs'
              className='flex items-center px-6 py-4 text-lg transition-colors hover:bg-muted/50'
            >
              {t('blogs')}
            </Link>

            <Link
              href='/about'
              data-umami-event='nav-mobile:about'
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
