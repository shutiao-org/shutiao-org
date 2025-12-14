import Image from 'next/image'
import noise from '@/assets/images/background/noise.png'
import wave from '@/assets/images/background/wave.webp'
import { Spotlight } from '@/components/ui/spotlight'

export function NoiseBg() {
  return (
    <div
      className='fixed inset-0 z-[-1] hidden h-screen w-screen dark:block'
      id='noise-bg'
    >
      <Spotlight
        className='-top-40 md:-top-20 left-0 md:left-60'
        fill='white'
      />

      <div className='absolute inset-0 opacity-50'>
        <Image
          src={wave}
          alt='wave'
          fill
          className='object-cover'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </div>

      <div className='absolute inset-0 opacity-5'>
        <Image
          src={noise}
          alt='noise'
          fill
          className='object-cover'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </div>

      <div
        className='absolute inset-0 opacity-30'
        style={{
          background:
            'radial-gradient(56.32% 64.60% at 50% 0%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)',
        }}
      />
    </div>
  )
}
