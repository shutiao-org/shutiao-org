import '@/styles/globals.css'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import NextTopLoader from 'nextjs-toploader'
import { AntdWrapper } from '@/components/antd-wrapper'
import { Analytics } from '@/components/common/analytics'
import { ThemeProvider } from '@/components/theme/provider'
import { geist } from '@/fonts'
import { routing } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { TRPCReactProvider } from '@/trpc/react'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return {
    title: t('title'),
    description: t('description'),
    icons: [{ rel: 'icon', url: '/favicon.ico' }],
  }
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html
      lang={locale}
      className={cn(geist.variable)}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <TRPCReactProvider>
              <AntdWrapper>
                {children}
                <NextTopLoader />
                <Analytics />
              </AntdWrapper>
            </TRPCReactProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
