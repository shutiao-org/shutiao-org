import Link from 'next/link'
import { Logo } from '@/components/common/logo'
import { ThemeToggle } from '@/components/theme/toggle'
import { cn } from '@/lib/utils'

export function Header() {
  return (
    <header
      className={cn(
        'sticky top-0 z-50 mx-auto h-20 w-full max-w-7xl',
        'flex items-center px-4 sm:px-6 lg:px-10',
        'bg-white/80 backdrop-blur-md dark:bg-transparent dark:backdrop-blur-xs',
      )}
    >
      <Link
        href='/'
        className='flex-1'
      >
        <Logo />
      </Link>

      <div className='hidden flex-1 items-center justify-end gap-5 xl:flex'>
        <ThemeToggle />
      </div>
    </header>
  )
}
