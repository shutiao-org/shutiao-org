import { fontLogo } from '@/fonts'
import { cn } from '@/lib/utils'

interface LogoProps {
  textClassName?: string
}

export function Logo({ textClassName }: LogoProps) {
  return (
    <div className='flex h-16 items-center gap-2 font-bold text-4xl'>
      <span>🍟</span>
      <div
        className={cn(
          fontLogo.className,
          'shrink-0 tracking-wide',
          textClassName,
        )}
      >
        Fries Bar
      </div>
    </div>
  )
}
