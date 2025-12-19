import { Github, Mail, MessageCircleMore, Podcast, Youtube } from 'lucide-react'
import Link from 'next/link'
import TelegramIcon from '@/assets/images/svg/tg.svg'
import XIcon from '@/assets/images/svg/x.svg'
import { SOCIAL_LINKS } from '@/config'
import { cn } from '@/lib/utils'

interface SocialMediaProps {
  className?: string
}

export function SocialMedia({ className }: SocialMediaProps) {
  return (
    <div className={cn('flex items-center gap-5', className)}>
      <Link
        href={SOCIAL_LINKS.podcast}
        className='transition-all duration-300 hover:scale-125'
        data-umami-event='social-media:podcast'
      >
        <Podcast className='size-6 cursor-pointer' />
      </Link>

      <Link
        href={SOCIAL_LINKS.x}
        className='transition-all duration-300 hover:scale-125'
        data-umami-event='social-media:x'
      >
        <XIcon className='size-6 cursor-pointer' />
      </Link>

      <Link
        href={SOCIAL_LINKS.github}
        className='transition-all duration-300 hover:scale-125'
        data-umami-event='social-media:github'
      >
        <Github className='size-6 cursor-pointer' />
      </Link>

      <Link
        href={SOCIAL_LINKS.telegram}
        className='transition-all duration-300 hover:scale-125'
        data-umami-event='social-media:telegram'
      >
        <TelegramIcon className='size-6 cursor-pointer' />
      </Link>

      <Link
        href={SOCIAL_LINKS.youtube}
        className='transition-all duration-300 hover:scale-125'
        data-umami-event='social-media:youtube'
      >
        <Youtube className='size-6 cursor-pointer' />
      </Link>

      <Link
        href={SOCIAL_LINKS.wechat}
        className='transition-all duration-300 hover:scale-125'
        data-umami-event='social-media:wechat'
      >
        <MessageCircleMore className='size-6 cursor-pointer' />
      </Link>

      <Link
        href={SOCIAL_LINKS.email}
        className='transition-all duration-300 hover:scale-125'
        data-umami-event='social-media:email'
      >
        <Mail className='size-6 cursor-pointer' />
      </Link>
    </div>
  )
}
