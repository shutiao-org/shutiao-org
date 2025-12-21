import { Logo } from '@/components/common/logo'
import { useSidebar } from '@/components/ui/sidebar'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

export function NavLogo() {
  const { open } = useSidebar()
  return (
    <Link href='/'>
      <div className='relative flex items-center justify-center overflow-hidden border-b pb-2'>
        <div
          className={cn(
            'transition-all duration-300 ease-in-out',
            open
              ? 'translate-x-0 scale-100 opacity-100'
              : '-translate-x-2 absolute scale-75 opacity-0',
          )}
        >
          <Logo />
        </div>
        <div
          className={cn(
            'transition-all duration-300 ease-in-out',
            open
              ? 'absolute translate-x-2 scale-75 opacity-0'
              : 'translate-x-0 scale-100 opacity-100',
          )}
        >
          🍟
        </div>
      </div>
    </Link>
  )
}
