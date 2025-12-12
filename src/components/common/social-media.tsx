import { Github, Mail, MessageCircleMore, Podcast, Youtube } from 'lucide-react'
import Link from 'next/link'
import TelegramIcon from '@/assets/images/svg/tg.svg'
import XIcon from '@/assets/images/svg/x.svg'
import { socialLinks } from '@/config'

export function SocialMedia() {
  return (
    <div className='flex items-center gap-5 md:scale-200'>
      <Link
        href={socialLinks.podcast}
        data-umami-event='homepage:header:podcast'
      >
        <Podcast className='size-6 cursor-pointer' />
      </Link>

      <Link
        href={socialLinks.x}
        data-umami-event='homepage:header:x'
      >
        <XIcon className='size-6 cursor-pointer' />
      </Link>

      <Link
        href={socialLinks.github}
        data-umami-event='homepage:header:github'
      >
        <Github className='size-6 cursor-pointer' />
      </Link>

      <Link
        href={socialLinks.telegram}
        data-umami-event='homepage:header:telegram'
      >
        <TelegramIcon className='size-6 cursor-pointer' />
      </Link>

      <Link
        href={socialLinks.youtube}
        data-umami-event='homepage:header:youtube'
      >
        <Youtube className='size-6 cursor-pointer' />
      </Link>

      <Link
        href={socialLinks.wechat}
        data-umami-event='homepage:header:wechat'
      >
        <MessageCircleMore className='size-6 cursor-pointer' />
      </Link>

      <Link
        href={socialLinks.email}
        data-umami-event='homepage:header:email'
      >
        <Mail className='size-6 cursor-pointer' />
      </Link>
    </div>
  )
}
