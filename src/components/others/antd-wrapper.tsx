'use client'

import { AntdRegistry } from '@ant-design/nextjs-registry'
import { theme as antdTheme, ConfigProvider } from 'antd'
import enUS from 'antd/es/locale/en_US'
import zhCN from 'antd/es/locale/zh_CN'
import { useLocale } from 'next-intl'
import { useTheme } from 'next-themes'
import { useIsClient } from '@/hooks/use-client'

export function AntdWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme()
  const mounted = useIsClient()
  const locale = useLocale()

  if (!mounted) return null

  return (
    <AntdRegistry>
      <ConfigProvider
        locale={locale === 'zh' ? zhCN : enUS}
        theme={{
          algorithm:
            resolvedTheme === 'dark'
              ? antdTheme.darkAlgorithm
              : antdTheme.defaultAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </AntdRegistry>
  )
}
