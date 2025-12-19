import { defineDocumentType, makeSource } from 'contentlayer2/source-files'

const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blogs/**/*.{md,mdx}',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    description: {
      type: 'string',
      description: 'The description of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    cover: {
      type: 'string',
      description: 'The cover image of the post',
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
    },
  },
}))

const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: 'pages/**/*.{md,mdx}',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    description: {
      type: 'string',
      description: 'The description of the page',
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
    },
  },
}))

const Update = defineDocumentType(() => ({
  name: 'Update',
  filePathPattern: 'updates/**/*.{md,mdx}',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the update',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the update',
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
    },
    locale: {
      type: 'string',
      resolve: (doc) => {
        const pathParts = doc._raw.flattenedPath.split('/')
        const localeIndex = pathParts.indexOf('updates')
        return localeIndex >= 0 && localeIndex + 1 < pathParts.length
          ? pathParts[localeIndex + 1]!
          : 'zh'
      },
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Blog, Page, Update],
})
