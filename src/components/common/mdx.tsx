import { MDXRemote } from 'next-mdx-remote/rsc'

interface MdxProps {
  source: string
}

export const Mdx = ({ source }: MdxProps) => {
  return <MDXRemote source={source} />
}
