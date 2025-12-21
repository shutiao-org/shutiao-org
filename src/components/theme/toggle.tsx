'use client'

import '@/styles/view-transition.css'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  className?: string
  size?: number
  strokeWidth?: number
}

export function ThemeToggle({
  strokeWidth = 2.25,
  size = 24,
  className,
}: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme()

  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light'

    if (!document.startViewTransition) {
      setTheme(newTheme)
    } else {
      document.startViewTransition(() => setTheme(newTheme))
    }
  }

  return (
    <button
      type='button'
      onClick={toggleTheme}
      className={cn(
        'flex cursor-pointer items-center justify-center',
        className,
      )}
      aria-label='Toggle theme'
    >
      <Sun
        className={cn('dark:hidden', className)}
        size={size}
        strokeWidth={strokeWidth}
        absoluteStrokeWidth
      />
      <Moon
        className={cn('hidden dark:block', className)}
        size={size}
        strokeWidth={strokeWidth}
        absoluteStrokeWidth
      />
    </button>
  )
}
