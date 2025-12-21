'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface HeroPillProps {
  href: string
  label: string
  announcement: string
  isExternal?: boolean
  className?: string
  'data-umami-event'?: string
}

export function HeroPill({
  href,
  label,
  announcement,
  isExternal = false,
  className,
  'data-umami-event': umamiEvent,
}: HeroPillProps) {
  const content = (
    <div
      className={cn(
        'group inline-flex items-center gap-2 rounded-full px-4 py-1.5',
        'ring-1 transition-all hover:ring-2',
        className,
      )}
      data-umami-event={umamiEvent}
    >
      <div className='rounded-full px-2 py-0.5 text-xs font-medium'>
        {announcement}
      </div>
      <p className='text-sm font-medium'>{label}</p>
      <ArrowRight className='size-4 transition-transform group-hover:translate-x-0.5' />
    </div>
  )

  if (isExternal) {
    return (
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className='inline-block'
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className='inline-block'>
      {content}
    </Link>
  )
}

