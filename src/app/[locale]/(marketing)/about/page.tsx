import { pageCollection } from 'qino/collections/pages'
import { Mdx } from '@/components/common/mdx'

export default async function AboutPage() {
  const page = await pageCollection.getEntry('about')

  return (
    <section className='flex flex-1 flex-col items-center justify-center gap-50'>
      <article className='prose dark:prose-invert mx-auto px-4 py-8'>
        <Mdx source={page.markdown} />
      </article>
    </section>
  )
}
