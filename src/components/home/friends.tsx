'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import NWOS_Dark from '@/assets/images/png/nwos_dark.png'
import NWOS_Light from '@/assets/images/png/nwos_light.png'
import Chuhaiqu from '@/assets/images/svg/chuhaiqu.svg'
import CMI from '@/assets/images/svg/cmi.svg'
import OpenBuild from '@/assets/images/svg/openbuild.svg'
import SocialLayer from '@/assets/images/svg/social-layer.svg'
import WaytoAGI from '@/assets/images/svg/waytoagi.svg'
import ZWJZ from '@/assets/images/svg/zwjz.svg'

export function Friends() {
  const { resolvedTheme } = useTheme()
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
        href='https://www.sociallayer.im'
        target='_blank'
        data-umami-event='friends:sociallayer'
      >
        <SocialLayer className='h-10' />
      </Link>

      <Link
        href='https://zwjz.flowus.cn'
        target='_blank'
        data-umami-event='friends:zwjz'
        className='flex items-center gap-0.5'
      >
        <ZWJZ className='h-8' />
        <p className="font-['SimSun','Songti_SC',serif] font-medium text-[1.4rem] tracking-[0.2rem]">
          物矩阵
        </p>
      </Link>

      <Link
        href='https://openbuild.xyz?ref=shutiao.org'
        target='_blank'
        data-umami-event='friends:openbuild'
        className='scale-80'
      >
        <OpenBuild className='h-8' />
      </Link>

      <Link
        href='https://www.networkedos.com?ref=shutiao.org'
        target='_blank'
        data-umami-event='friends:networkedos'
      >
        <Image
          src={resolvedTheme === 'dark' ? NWOS_Light : NWOS_Dark}
          alt='networkedos'
          width={140}
          height={100}
        />
      </Link>

      <Link
        href='https://www.chiangmai-inn.com?ref=shutiao.org'
        target='_blank'
        data-umami-event='friends:chiangmai-inn'
      >
        <CMI className='h-9' />
      </Link>
    </div>
  )
}
