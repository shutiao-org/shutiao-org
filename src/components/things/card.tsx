import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Thing } from '@/types'

export interface ThingsCardProps extends Thing {
  imageAlt?: string
  className?: string
}

export function ThingsCard({
  title,
  image,
  imageAlt,
  tags,
  price,
  originalPrice,
  href,
  className,
}: ThingsCardProps) {
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
        />
        {tags.length > 0 && (
          <div className='absolute top-2 left-2 flex flex-wrap gap-1'>
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className='rounded bg-black/60 px-2 py-1 text-white text-xs backdrop-blur-sm'
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className='flex flex-1 flex-col p-4'>
        <h3 className='line-clamp-2 font-semibold text-gray-800 text-lg leading-tight transition-colors duration-300 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400'>
          {title}
        </h3>

        <div className='mt-auto flex items-baseline gap-2 pt-4'>
          <span className='font-bold text-red-600 text-xl dark:text-red-400'>
            {price}
          </span>
          {originalPrice && (
            <span className='text-gray-400 text-sm line-through'>
              {originalPrice}
            </span>
          )}
        </div>
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
