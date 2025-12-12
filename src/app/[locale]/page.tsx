import { getTranslations } from 'next-intl/server'
import { SocialMedia } from '@/components/common/social-media'
import { Header } from '@/components/home/header'

export default async function HomePage() {
  const t = await getTranslations('common')
  return (
    <div className='flex min-h-screen flex-col items-center'>
      <Header />
      <div className='flex flex-1 flex-col items-center justify-center gap-50'>
        <h1 className='font-bold text-5xl md:text-7xl'>{t('title')}</h1>
        <SocialMedia />
      </div>
    </div>
  )
}
