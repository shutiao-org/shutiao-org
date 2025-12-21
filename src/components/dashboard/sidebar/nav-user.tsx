'use client'

import { Check, ChevronsUpDown, Globe, LogOut, Palette } from 'lucide-react'
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
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { useLanguageToggle } from '@/hooks/use-language-toggle'
import { languages } from '@/i18n/routing'
import { signOut } from '@/lib/auth/client'
import { cn } from '@/lib/utils'
import { SIGN_IN_PAGE } from '@/routes'

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const router = useRouter()
  const { isMobile } = useSidebar()
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

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage
                  src={user.avatar}
                  alt={user.name}
                />
                <AvatarFallback className='rounded-lg'>
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-medium'>{user.name}</span>
                <span className='truncate text-xs'>{user.email}</span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage
                    src={user.avatar}
                    alt={user.name}
                  />
                  <AvatarFallback className='rounded-lg'>
                    {user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-medium'>{user.name}</span>
                  <span className='truncate text-xs'>{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

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
                    {currentTheme === 'light' && (
                      <Check className='ml-2 size-4' />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => toggleTheme('dark')}
                    className={cn(
                      'flex cursor-pointer items-center justify-between rounded-sm px-2 py-1',
                      currentTheme === 'dark' && 'bg-accent',
                    )}
                  >
                    <span>{t('dark')}</span>
                    {currentTheme === 'dark' && (
                      <Check className='ml-2 size-4' />
                    )}
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
              <LogOut className='size-4 text-red-500' />
              <span className='text-red-500'>{t('log-out')}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
