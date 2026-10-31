import { format, parseISO } from 'date-fns'
import { enUS, zhCN } from 'date-fns/locale'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { blogCollection } from 'qino/collections/blogs'
import { Mdx } from '@/components/common/mdx'

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params
  const t = await getTranslations('blogs')

  const slugs = await blogCollection.getAllSlugs()
  const blogSlug = slugs.find((s) => s === slug)

  if (!blogSlug) {
    return <div>{t('not-found')}</div>
  }

  const post = await blogCollection.getEntry(blogSlug)

  const dateLocale = locale === 'zh' ? zhCN : enUS

  return (
    <article className='mx-auto mb-16 max-w-3xl px-4 py-12 sm:px-6 lg:px-8'>
      <Link
        href={`/${locale}/blogs`}
        className='group mb-8 inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground'
      >
        <ArrowLeft className='group-hover:-translate-x-1 h-4 w-4 transition-transform' />
        <span>{t('back')}</span>
      </Link>

      <div className='mb-12 space-y-6 text-center'>
        <div className='space-y-4'>
          <time
            dateTime={post.date}
            className='block text-muted-foreground text-sm'
          >
            {format(parseISO(post.date), 'MMMM d, yyyy', {
              locale: dateLocale,
            })}
          </time>
          <h1 className='font-bold text-3xl text-foreground tracking-tight sm:text-4xl md:text-5xl'>
            {post.title}
          </h1>
        </div>

        <div className='relative aspect-video w-full overflow-hidden rounded-xl shadow-lg'>
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className='object-cover transition-transform duration-500 hover:scale-105'
            priority
          />
        </div>
      </div>

      <div className='prose prose-neutral dark:prose-invert max-w-none'>
        <Mdx source={post.markdown} />
      </div>
    </article>
  )
}
