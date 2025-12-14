import Link from 'next/link'
import { Logo } from '@/components/common/logo'
import { Nav, NavMobile } from '@/components/home/nav'
import { ThemeToggle } from '@/components/theme/toggle'
import { ShinyButton } from '@/components/ui/shiny-button'
import { cn } from '@/lib/utils'
import { SIGN_IN_PAGE } from '@/routes'

export function Header() {
  return (
    <>
      <header
        className={cn(
          'sticky top-0 right-0 left-0 z-50 mx-auto flex h-20 w-full max-w-7xl items-center px-4',
          'bg-white/80 backdrop-blur-md dark:bg-transparent dark:backdrop-blur-xs',
        )}
      >
        <Link
          href='/'
          className='flex-1'
        >
          <Logo />
        </Link>

        <div className='hidden items-center justify-center md:flex'>
          <Nav />
        </div>

        <div className='flex flex-1 items-center justify-end gap-5'>
          <div className='hidden md:block'>
            <ThemeToggle data-umami-event='header:theme-toggle' />
          </div>

          <Link
            href={SIGN_IN_PAGE}
            data-umami-event='header:login'
          >
            <ShinyButton>Login</ShinyButton>
          </Link>

          <div className='md:hidden'>
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
