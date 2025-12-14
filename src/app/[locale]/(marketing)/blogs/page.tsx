import { allBlogs } from 'contentlayer/generated'
import { compareDesc, format, parseISO } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const posts = allBlogs.sort((a, b) =>
  compareDesc(new Date(a.date), new Date(b.date)),
)

console.log(posts.length)

export default function Home() {
  const t = useTranslations('blogs')

  return (
    <div className='mx-auto mb-5 max-w-[85rem] px-4 py-10 sm:px-6 lg:mb-10 lg:px-8 lg:py-14'>
      <div className='mx-auto mb-10 max-w-3xl space-y-6 text-center lg:mb-14'>
        <h1 className='hero-gradient-heading'>{t('title')}</h1>
        <p className='mx-auto text-lg text-neutral-500 md:text-xl'>
          {t('subtitle')}
        </p>
      </div>

      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {posts.map((post, idx) => (
          <Link
            key={idx}
            className='group flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 transition duration-300 hover:border-transparent hover:shadow-lg focus:border-transparent focus:shadow-lg focus:outline-none dark:border-white/10 dark:bg-white/5 dark:focus:shadow-white/10 dark:hover:shadow-white/10'
            href={`/blogs/${post.slug}`}
            data-umami-event={`homepage-blog-${post.title}`}
          >
            <div className='aspect-[16/9] overflow-hidden rounded-xl'>
              <Image
                src={post.cover}
                alt={post.title}
                width={1280}
                height={720}
                className='h-full w-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-105'
              />
            </div>

            <div className='my-6 flex-grow'>
              <h3 className='line-clamp-2 font-semibold text-gray-800 text-xl transition duration-300 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400'>
                {post.title}
              </h3>
              <p className='mt-5 line-clamp-3 text-gray-600 dark:text-gray-400'>
                {post.description}
              </p>
            </div>

            <time
              dateTime={post.date}
              className='text-gray-500 text-xs dark:text-gray-400'
            >
              {format(parseISO(post.date), 'LLLL d, yyyy')}
            </time>
          </Link>
        ))}
      </div>
    </div>
  )
}
