'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import lusun from '@/assets/images/png/lusun.png'
import Twitfast from '@/assets/images/png/twitfast.png'
import Juchats from '@/assets/images/svg/juchats.svg'
import Mentorbook from '@/assets/images/svg/mentorbook.svg'
import Podwise1 from '@/assets/images/svg/podwise-1.svg'
import Podwise2 from '@/assets/images/svg/podwise-2.svg'
import Youmind from '@/assets/images/svg/youmind.svg'

type Product = {
  name: string
  href: string
  umamiEvent: string
  logo: React.ReactNode
}

export default function ProductPage() {
  const t = useTranslations('products')

  const products: Product[] = [
    {
      name: 'YouMind',
      href: 'https://youmind.ai?ref=shutiao.org',
      umamiEvent: 'products:youmind',
      logo: <Youmind className='h-8 w-auto' />,
    },
    {
      name: '芦笋',
      href: 'https://tcq.lusun.com/i/?icode=1093712',
      umamiEvent: 'products:lusun',
      logo: (
        <div className='flex items-center gap-3'>
          <Image
            src={lusun}
            alt='lusun'
            width={40}
            height={40}
            className='rounded-lg'
          />
          <span className='font-medium text-xl'>芦 笋</span>
        </div>
      ),
    },
    {
      name: 'Podwise',
      href: 'https://podwise.ai?ref=shutiao.org',
      umamiEvent: 'products:podwise',
      logo: (
        <div className='flex items-center gap-1 text-purple-400'>
          <Podwise1 className='h-10 w-auto' />
          <Podwise2 className='h-5 w-auto' />
        </div>
      ),
    },
    {
      name: 'MentorBook',
      href: 'https://mentorbook.ai?ref=shutiao.org',
      umamiEvent: 'products:mentorbook',
      logo: (
        <div className='flex items-center gap-3'>
          <Mentorbook className='h-7 w-auto' />
          <span className='font-medium text-xl'>MentorBook</span>
        </div>
      ),
    },
    {
      name: 'Juchats',
      href: 'https://www.juchats.com?ref=shutiao.org',
      umamiEvent: 'products:juchats',
      logo: <Juchats className='h-7 w-auto' />,
    },
    {
      name: 'TwitFast',
      href: 'https://twitfast.com?ref=shutiao.org',
      umamiEvent: 'products:twitfast',
      logo: (
        <div className='flex items-center gap-3'>
          <Image
            src={Twitfast}
            alt='twitfast'
            width={40}
            height={40}
            className='rounded-lg'
          />
          <span className='font-medium text-xl'>TwitFast</span>
        </div>
      ),
    },
  ]

  return (
    <div className='mx-auto mb-5 max-w-340 px-4 py-10 sm:px-6 lg:mb-10 lg:px-8 lg:py-14'>
      <div className='mx-auto mb-10 max-w-3xl space-y-6 text-center lg:mb-14'>
        <h1 className='hero-gradient-heading'>{t('title')}</h1>
        <p className='mx-auto text-lg text-neutral-500 md:text-xl'>
          {t('subtitle')}
        </p>
      </div>

      <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {products.map((product) => (
          <Link
            key={product.name}
            href={product.href}
            target='_blank'
            rel='noopener noreferrer'
            data-umami-event={product.umamiEvent}
            className='group flex h-full flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:border-transparent hover:shadow-gray-200/50 hover:shadow-lg focus:border-transparent focus:shadow-lg focus:outline-none dark:border-white/10 dark:bg-white/5 dark:focus:shadow-white/10 dark:hover:shadow-white/10'
          >
            <div className='flex h-full w-full flex-col items-center justify-center gap-4 transition-transform duration-300 group-hover:scale-105'>
              <div className='flex items-center justify-center'>
                {product.logo}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
