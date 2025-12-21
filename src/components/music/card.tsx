import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Music } from '@/types'

export interface MusicCardProps extends Music {
  imageAlt?: string
  className?: string
}

export function MusicCard({
  title,
  artist,
  image,
  imageAlt,
  description,
  tags,
  rating,
  year,
  href,
  className,
}: MusicCardProps) {
  const content = (
    <div
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:border-transparent hover:shadow-lg dark:border-white/10 dark:bg-white/5 dark:hover:shadow-white/10',
        className,
      )}
    >
      <div className='relative aspect-square w-full overflow-hidden bg-gray-100 dark:bg-gray-800'>
        <Image
          src={image}
          alt={imageAlt || title}
          fill
          className='object-cover transition-transform duration-300 group-hover:scale-105'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          placeholder='blur'
        />
        {tags && tags.length > 0 && (
          <div className='absolute top-2 left-2 flex flex-wrap gap-1'>
            {tags.slice(0, 2).map((tag, idx) => (
              <span
                key={idx}
                className='rounded bg-black/60 px-2 py-1 text-white text-xs backdrop-blur-sm'
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {rating && (
          <div className='absolute top-2 right-2 flex items-center gap-1 rounded bg-black/60 px-2 py-1 text-white text-xs backdrop-blur-sm'>
            <Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
            <span>{rating}</span>
          </div>
        )}
      </div>

      <div className='flex flex-1 flex-col p-4'>
        <h3 className='line-clamp-2 font-semibold text-gray-800 text-lg leading-tight transition-colors duration-300 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400'>
          {title}
        </h3>
        <div className='mt-1 flex items-center gap-2'>
          <p className='line-clamp-1 text-gray-600 text-sm dark:text-gray-400'>
            {artist}
          </p>
          {year && (
            <span className='text-gray-400 text-xs dark:text-gray-500'>
              ({year})
            </span>
          )}
        </div>
        {description && (
          <p className='mt-2 line-clamp-2 text-gray-500 text-sm dark:text-gray-500'>
            {description}
          </p>
        )}
      </div>
    </div>
  )

  if (href) {
    return (
      <Link
        href={href}
        target='_blank'
        rel='noopener noreferrer'
      >
        {content}
      </Link>
    )
  }

  return content
}
