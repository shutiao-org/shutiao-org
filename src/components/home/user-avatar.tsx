'use client'

import { Check, Globe, LogOut, Palette, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLanguageToggle } from '@/hooks/use-language-toggle'
import { languages } from '@/i18n/routing'
import { signOut, useSession } from '@/lib/auth/client'
import { cn } from '@/lib/utils'
import { DASHBOARD_HOME_PAGE, SIGN_IN_PAGE } from '@/routes'

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function UserAvatar() {
  const router = useRouter()
  const { data: session } = useSession()
  const { setTheme, resolvedTheme } = useTheme()
  const { locale: currentLocale, onSelectChange } = useLanguageToggle()
  const t = useTranslations('dashboard')

  const handleSignOut = async () => {
    await signOut()
    router.push(SIGN_IN_PAGE)
    router.refresh()
  }

  const toggleTheme = (newTheme: 'light' | 'dark') => {
    if (!document.startViewTransition) {
      setTheme(newTheme)
    } else {
      document.startViewTransition(() => {
        setTheme(newTheme)
      })
    }
  }

  const currentTheme = resolvedTheme === 'dark' ? 'dark' : 'light'

  if (!session?.user) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type='button'
          className='relative flex size-10 cursor-pointer items-center justify-center overflow-hidden rounded-full'
          data-umami-event='header:user-menu'
        >
          <Avatar className='size-8 rounded-full'>
            <AvatarImage
              src={session.user.image || undefined}
              alt={session.user.name}
            />
            <AvatarFallback className='rounded-full'>
              {getInitials(session.user.name)}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='min-w-56 rounded-lg'
        sideOffset={4}
      >
        <DropdownMenuLabel className='p-0 font-normal'>
          <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
            <Avatar className='h-8 w-8 rounded-lg'>
              <AvatarImage
                src={session.user.image || undefined}
                alt={session.user.name}
              />
              <AvatarFallback className='rounded-lg'>
                {getInitials(session.user.name)}
              </AvatarFallback>
            </Avatar>
            <div className='grid flex-1 text-left text-sm leading-tight'>
              <span className='truncate font-medium'>{session.user.name}</span>
              <span className='truncate text-xs'>{session.user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link
            href={DASHBOARD_HOME_PAGE}
            className='flex cursor-pointer items-center gap-2'
          >
            <User className='size-4' />
            <span>{t('dashboard')}</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className='flex cursor-pointer items-center gap-2'>
            <Palette size={16} />
            <p>{t('theme')}</p>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className='mb-4 ml-2 flex flex-col gap-1 p-2'>
              <DropdownMenuItem
                onClick={() => toggleTheme('light')}
                className={cn(
                  'flex cursor-pointer items-center justify-between rounded-sm px-2 py-1',
                  currentTheme === 'light' && 'bg-accent',
                )}
              >
                <span>{t('light')}</span>
                {currentTheme === 'light' && <Check className='ml-2 size-4' />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => toggleTheme('dark')}
                className={cn(
                  'flex cursor-pointer items-center justify-between rounded-sm px-2 py-1',
                  currentTheme === 'dark' && 'bg-accent',
                )}
              >
                <span>{t('dark')}</span>
                {currentTheme === 'dark' && <Check className='ml-2 size-4' />}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className='flex cursor-pointer items-center gap-2'>
            <Globe size={16} />
            <p>{t('language')}</p>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className='mb-4 ml-2 flex flex-col gap-1 p-2'>
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => onSelectChange(lang.code)}
                  className={cn(
                    'flex cursor-pointer items-center justify-between rounded-sm px-2 py-1',
                    currentLocale === lang.code && 'bg-accent',
                  )}
                >
                  <span>{lang.label}</span>
                  {currentLocale === lang.code && (
                    <Check className='ml-2 size-4' />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          variant='destructive'
          className='flex cursor-pointer items-center gap-2'
        >
          <LogOut className='size-4' />
          <span className='text-red-500'>{t('log-out')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
