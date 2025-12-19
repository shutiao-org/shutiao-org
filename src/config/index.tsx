import type { NavEntry } from '@/types'

export const SOCIAL_LINKS = {
  telegram: 'https://t.me/guoqisun',
  x: 'https://x.com/shutiaoorg',
  github: 'https://github.com/shutiao-org/shutiao-org',
  podcast: 'https://shutiao.life',
  youtube: 'https://www.youtube.com/@sun0225SUN',
  wechat: 'https://mp.guoqi.dev',
  email: 'mailto:shutiaoorg@gmail.com',
}

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
    ],
  },
  {
    title: 'communities',
    items: [
      { href: 'https://dalifornia.org', label: 'dali', icon: '☁️' },
      { href: 'https://chiangmai.cool', label: 'chiangmai', icon: '🐘' },
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
