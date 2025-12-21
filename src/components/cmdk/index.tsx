'use client'

import { Command } from 'cmdk'
import { type Locale, useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'
import { useIsClient } from '@/hooks/use-client'
import { useLanguageToggle } from '@/hooks/use-language-toggle'
import { useRouter } from '@/i18n/navigation'

import '@/styles/cmdk.css'

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const t = useTranslations()
  const { locale, onSelectChange } = useLanguageToggle()
  const isClient = useIsClient()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
    }
  }, [open])

  const handleNavigation = (path: string) => {
    router.push(path)
    setOpen(false)
  }

  const getCurrentTheme = () => {
    if (typeof window === 'undefined') return 'light'
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    }
    return theme
  }

  const currentTheme = getCurrentTheme()

  const handleThemeToggle = () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  const handleLanguageToggle = () => {
    const newLocale: Locale = locale === 'zh' ? 'en' : 'zh'
    onSelectChange(newLocale)
    setOpen(false)
  }

  if (!isClient) {
    return null
  }

  return (
    <>
      {open && (
        <div
          className='command-menu-overlay'
          onClick={() => setOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setOpen(false)
            }
          }}
        >
          <div
            className='command-menu-content'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='raycast'>
              <Command>
                <div>
                  <Command.Input
                    ref={inputRef}
                    placeholder={t('cmdk.searchPlaceholder')}
                  />
                </div>
                <Command.List>
                  <Command.Empty>{t('cmdk.noResults')}</Command.Empty>

                  <Command.Group heading={t('cmdk.suggestions')}>
                    <Command.Item onSelect={handleThemeToggle}>
                      <span>🌓</span>
                      {t('cmdk.toggle')}{' '}
                      {currentTheme === 'dark'
                        ? t('cmdk.light')
                        : t('cmdk.dark')}{' '}
                      {t('cmdk.mode')}
                      <span className='raycast-meta'>{t('cmdk.command')}</span>
                    </Command.Item>
                    <Command.Item onSelect={handleLanguageToggle}>
                      <span>🌐</span>
                      {t('cmdk.switchTo')}{' '}
                      {locale === 'zh' ? t('language.en') : t('language.zh')}
                      <span className='raycast-meta'>{t('cmdk.command')}</span>
                    </Command.Item>
                  </Command.Group>

                  <Command.Separator />

                  <Command.Group heading={t('cmdk.commands')}>
                    <Command.Item onSelect={() => handleNavigation('/')}>
                      <span>🏠</span>
                      {t('nav.home')}
                      <span className='raycast-meta'>
                        {t('cmdk.application')}
                      </span>
                    </Command.Item>
                  </Command.Group>
                </Command.List>

                <div className='raycast-footer'>
                  <div className='raycast-footer-left'>
                    <span>{t('cmdk.openApplication')}</span>
                    <kbd>↵</kbd>
                  </div>
                  <div className='raycast-footer-right'>
                    <span>{t('cmdk.actions')}</span>
                    <kbd>⌘</kbd>
                    <kbd>K</kbd>
                  </div>
                </div>
              </Command>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
