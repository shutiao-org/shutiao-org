import { Courgette as FontLogo, Geist } from 'next/font/google'

export const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

export const fontLogo = FontLogo({
  subsets: ['latin'],
  variable: '--font-logo',
  weight: '400',
  display: 'swap',
  adjustFontFallback: false,
})
