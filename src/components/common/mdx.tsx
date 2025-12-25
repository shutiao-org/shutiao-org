'use client'

import { useMDXComponent } from 'next-contentlayer2/hooks'
import '@/styles/markdown.css'

interface MdxProps {
  code: string
}

export const Mdx = ({ code }: MdxProps) => {
  const MDXComponent = useMDXComponent(code)

  return <MDXComponent />
}
