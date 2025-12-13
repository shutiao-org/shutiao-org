import Image from 'next/image'
import Link from 'next/link'
import lusun from '@/assets/images/png/lusun.png'
import Chuhaiqu from '@/assets/images/svg/chuhaiqu.svg'
import Juchats from '@/assets/images/svg/juchats.svg'
import Mentorbook from '@/assets/images/svg/mentorbook.svg'
import Openbuild from '@/assets/images/svg/openbuild.min.svg'
import Podwise1 from '@/assets/images/svg/podwise-1.svg'
import Podwise2 from '@/assets/images/svg/podwise-2.svg'
import WaytoAGI from '@/assets/images/svg/waytoagi.min.svg'
import Youmind from '@/assets/images/svg/youmind.svg'

export function Friends() {
  return (
    <div className='flex flex-wrap items-center gap-x-10 gap-y-6'>
      <Link
        href='https://waytoagi.com?ref=shutiao.org'
        target='_blank'
        data-umami-event='friends:waytoagi'
      >
        <WaytoAGI className='h-14' />
      </Link>

      <Link
        href='https://youmind.ai?ref=shutiao.org'
        target='_blank'
        data-umami-event='friends:youmind'
      >
        <Youmind />
      </Link>

      <Link
        href='https://tcq.lusun.com?ref=shutiao.org'
        target='_blank'
        data-umami-event='friends:lusun'
        className='flex items-center gap-2'
      >
        <Image
          src={lusun}
          alt='lusun'
          width={36}
          height={36}
        />
        <p className='font-medium text-xl'>芦 笋</p>
      </Link>

      <Link
        href='https://www.chuhaiqu.club/?linkId=lp_905736&sourceId=sun0225SUN&tenantId=velocity1-llc'
        target='_blank'
        data-umami-event='friends:chuhaiqu'
      >
        <div className='flex items-center'>
          <Chuhaiqu className='h-6' />
          <span className='font-medium text-xl leading-2'>出海去社区</span>
        </div>
      </Link>

      <Link
        href='https://podwise.ai?ref=shutiao.org'
        target='_blank'
        data-umami-event='friends:podwise'
      >
        <div className='flex items-center gap-1 text-purple-400'>
          <Podwise1 className='h-10' />
          <Podwise2 className='h-5' />
        </div>
      </Link>

      <Link
        href='https://mentorbook.ai?ref=shutiao.org'
        target='_blank'
        data-umami-event='friends:mentorbook'
      >
        <div className='flex items-center gap-2'>
          <Mentorbook className='h-6' />
          <span className='font-medium text-xl'>MentorBook</span>
        </div>
      </Link>

      <Link
        href='https://openbuild.xyz?ref=shutiao.org'
        target='_blank'
        data-umami-event='friends:openbuild'
        className='scale-80'
      >
        <Openbuild className='h-8' />
      </Link>

      <Link
        href='https://www.juchats.com?ref=shutiao.org'
        target='_blank'
        data-umami-event='friends:juchats'
      >
        <Juchats className='h-6' />
      </Link>
    </div>
  )
}
