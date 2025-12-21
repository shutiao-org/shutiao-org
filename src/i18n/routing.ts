import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'zh'],

  // Used when no locale matches
  defaultLocale: 'en',

  localePrefix: 'as-needed',
})

export const languages = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '简体中文' },
]
