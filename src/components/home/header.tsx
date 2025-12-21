'use client'

import { Github } from 'lucide-react'
import Link from 'next/link'
import { Logo } from '@/components/common/logo'
import { Nav, NavMobile } from '@/components/home/nav'
import { UserAvatar } from '@/components/home/user-avatar'
import { ThemeToggle } from '@/components/theme/toggle'
import { ShinyButton } from '@/components/ui/shiny-button'
import { SOCIAL_LINKS } from '@/config'
import { useSession } from '@/lib/auth/client'
import { cn } from '@/lib/utils'
import { SIGN_IN_PAGE } from '@/routes'

export function Header() {
  const { data: session, isPending } = useSession()

  return (
    <>
      <header
        className={cn(
          'sticky top-0 right-0 left-0 z-50 mx-auto flex h-20 w-full max-w-7xl items-center px-4',
          'rounded-full bg-white/80 backdrop-blur-md dark:bg-transparent dark:backdrop-blur-xs',
        )}
      >
        <Link
          href='/'
          className='flex-1'
        >
          <Logo />
        </Link>

        <div className='hidden items-center justify-center lg:flex'>
          <Nav />
        </div>

        <div className='flex flex-1 items-center justify-end gap-6'>
          <div className='hidden items-center lg:flex'>
            <Link
              href={SOCIAL_LINKS.github}
              target='_blank'
              data-umami-event='header:github-repo'
            >
              <Github className='size-6 cursor-pointer' />
            </Link>
          </div>

          <div className='hidden items-center lg:flex'>
            <ThemeToggle data-umami-event='header:theme-toggle' />
          </div>

          {isPending ? (
            <div className='flex h-10 w-10 items-center justify-center'>
              <div className='size-8 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700' />
            </div>
          ) : session?.user ? (
            <UserAvatar />
          ) : (
            <Link
              href={SIGN_IN_PAGE}
              data-umami-event='header:login'
              className='flex items-center'
            >
              <ShinyButton>Login</ShinyButton>
            </Link>
          )}

          <div className='lg:hidden'>
            <NavMobile />
          </div>
        </div>
      </header>
      <div
        className='h-20'
        aria-hidden='true'
      />
    </>
  )
}
