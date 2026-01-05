import { allPages } from 'contentlayer/generated'
import { eq, sql } from 'drizzle-orm'
import { notFound } from 'next/navigation'
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

  const page = allPages.find((page) => page.slug === rest)

  if (!page) {
    notFound()
  }

  return (
    <article className='prose dark:prose-invert mx-auto px-4 py-8'>
      <Mdx code={page?.body.code} />
    </article>
  )
}
