import type { NavEntry } from '@/types'

export const NAV_ENTRIES: NavEntry[] = [
  {
    title: 'products',
    items: [{ href: '/products', label: 'products', icon: '📦' }],
  },
  {
    title: 'events',
    items: [{ href: '/events', label: 'events', icon: '🎉' }],
  },
  {
    title: 'work',
    items: [
      { href: '/work/recruit', label: 'recruit', icon: '💼' },
      { href: '/work/seek', label: 'seek', icon: '🔍' },
    ],
  },
  {
    title: 'living',
    items: [
      { href: '/living/books', label: 'books', icon: '📚' },
      { href: '/living/movies', label: 'movies', icon: '🎬' },
      { href: '/living/music', label: 'music', icon: '🎵' },
      { href: '/living/podcasts', label: 'podcasts', icon: '🎙️' },
      { href: 'https://cyc.earth', label: 'cycling', icon: '🚴' },
      { href: 'https://camlife.app', label: 'photography', icon: '📷' },
      { href: '/living/things', label: 'things', icon: '🎁' },
    ],
  },
  {
    title: 'communities',
    items: [
      { href: 'https://dalifornia.org', label: 'dali', icon: '☁️' },
      { href: 'https://chiangmai.cool', label: 'chiangmai', icon: '🐘' },
      { href: '/communities/explore', label: 'explore', icon: '🗺️' },
    ],
  },
  {
    title: 'more',
    items: [
      { href: '/blogs', label: 'blogs', icon: '📝' },
      { href: '/updates', label: 'updates', icon: '✨' },
      { href: '/about', label: 'about', icon: 'ℹ️' },
      { href: 'https://shutiao.earth', label: 'knowledge', icon: '🧠' },
    ],
  },
]
