import type { Podcast } from '@/types'

export const PODCASTS: Podcast[] = [
  {
    id: '1',
    title: '整点薯条吧',
    host: '小孙同学',
    image: '/images/podcasts/1.png',
    description:
      '整点薯条吧开发者社区的播客节目，分享技术、产品和社区相关的精彩内容。',
    tags: ['技术', '社区'],
    href: 'https://shutiao.life',
  },
  {
    id: '2',
    title: '硬地骇客',
    host: 'skoowoo',
    image: '/images/podcasts/2.jpg',
    description:
      '来自三位拥有10年+互联网创业者的深度思考和对话，我们关注前沿科技，分享创业故事，打造 "超级个体"，寻找利基市场，构建小而美的生意，同时也希望和广大 Hacker 一起探讨技术、产品和商业之美。',
    tags: ['商业科技'],
    href: 'https://www.douban.com/podcast/36935706/',
  },
  {
    id: '3',
    title: '乱翻书',
    host: '潘乱',
    image: '/images/podcasts/3.jpg',
    description:
      '乱翻书是一档关注商业、科技和历史的对话节目，关心How和Why，以及少有人注意到的What。内容主要方向是科技考古、行业观察和前沿思考，研究明星公司的创新、竞争和兴衰循环，希望能够为你提供信息增量。「乱翻书」主理人是潘乱，科技评论作者，单列双列产品概念提出人，代表作《腾讯没有梦想》。',
    tags: ['商业科技', '闲趣找乐'],
    href: 'https://www.douban.com/podcast/36725812/',
  },
  {
    id: '4',
    title: 'Web Worker',
    host: '辛宝、小白菜、Smart',
    image: '/images/podcasts/4.png',
    description:
      'Web Worker 播客是几个前端程序员闲聊的前端中文音频播客节目。节目将围绕程序员领域来瞎聊，聊资讯、聊职场、聊技术选型...... 只要是和 web 开发有关的都可以聊。',
    tags: ['技术', '前端'],
    href: 'https://www.webworker.tech/',
  },
  {
    id: '5',
    title: '代码之外 Beyond Code',
    host: 'GeekPlux、Randy',
    image: '/images/podcasts/5.jpg',
    description:
      '代码之外 Beyond Code 是一档由 GeekPlux 和 Randy 共同主持的程序员闲聊播客节目。节目会发布视频版，在 YouTube 和 Bilibili 搜索「代码之外」都能找到我们。',
    tags: ['技术', '程序员'],
    href: 'https://www.xiaoyuzhoufm.com/podcast/6194d973c14c9a0db82de1ea',
  },
]
