import { eq, sql } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { pageCollection } from 'qino/collections/pages'
import { Mdx } from '@/components/common/mdx'
import { BonjourStudio } from '@/components/dashboard/bonjour/studio'
import { db } from '@/server/db'
import { bonjour } from '@/server/db/schema/bonjour'

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ locale: string; rest: string }>
}) {
  const { rest } = await params

  const [result] = await db
    .select({ _: sql<number>`1` })
    .from(bonjour)
    .where(eq(bonjour.bonjourId, rest))
    .limit(1)

  if (result) {
    return (
      <BonjourStudio
        bonjourId={rest}
        readonly
      />
    )
  }

  const slugs = await pageCollection.getAllSlugs()
  const slug = slugs.find((slug) => slug === rest)

  if (!slug) {
    notFound()
  }

  const page = await pageCollection.getEntry(slug)

  return (
    <article className='prose dark:prose-invert mx-auto px-4 py-8'>
      <Mdx source={page.markdown} />
    </article>
  )
}
