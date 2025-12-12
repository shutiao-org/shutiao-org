import Link from 'next/link'
import Chuhaiqu from '@/assets/images/svg/chuhaiqu.svg'
import Juchats from '@/assets/images/svg/juchats.svg'
import Mentorbook from '@/assets/images/svg/mentorbook.svg'
import Openbuild from '@/assets/images/svg/openbuild.min.svg'
import Podwise1 from '@/assets/images/svg/podwise-1.svg'
import Podwise2 from '@/assets/images/svg/podwise-2.svg'
import WaytoAGI from '@/assets/images/svg/waytoagi.min.svg'

export function Friends() {
  return (
    <div className='flex flex-wrap items-center gap-x-10 gap-y-6'>
      <Link
        href='https://waytoagi.com'
        target='_blank'
      >
        <WaytoAGI className='h-14' />
      </Link>

      <Link
        href='https://www.chuhaiqu.club/?linkId=lp_905736&sourceId=sun0225SUN&tenantId=velocity1-llc'
        target='_blank'
      >
        <div className='flex items-center'>
          <Chuhaiqu className='h-6' />
          <span className='font-medium text-xl'>出海去社区</span>
        </div>
      </Link>

      <Link
        href='https://podwise.ai?ref=sun0225SUN'
        target='_blank'
      >
        <div className='flex items-center gap-1 text-purple-400'>
          <Podwise1 className='h-10' />
          <Podwise2 className='h-5' />
        </div>
      </Link>

      <Link
        href='https://mentorbook.ai?ref=sun0225SUN'
        target='_blank'
      >
        <div className='flex items-center gap-2'>
          <Mentorbook className='h-6' />
          <span className='font-medium text-xl'>Mentorbook</span>
        </div>
      </Link>

      <Link
        href='https://openbuild.xyz?ref=sun0225SUN'
        target='_blank'
        className='scale-80'
      >
        <Openbuild className='h-8' />
      </Link>

      <Link
        href='https://www.juchats.com?ref=sun0225SUN'
        target='_blank'
      >
        <Juchats className='h-6' />
      </Link>
    </div>
  )
}
