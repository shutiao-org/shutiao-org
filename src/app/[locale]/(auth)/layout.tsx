import { EtherealShadow } from '@/components/ui/ethereal-shadow'
import { GridPattern } from '@/components/ui/grid-pattern'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className='flex min-h-screen flex-col items-center justify-center pb-20'>
        <div className='w-full max-w-sm'>{children}</div>
      </div>

      <div className='-z-10 absolute inset-0 dark:hidden'>
        <GridPattern
          width={20}
          height={20}
          x={-1}
          y={-1}
          className='mask-[linear-gradient(to_bottom_right,white,transparent,transparent)]'
        />
      </div>

      <div className='-z-10 absolute inset-0 hidden dark:block'>
        <EtherealShadow
          color='rgba(128, 128, 128, 1)'
          animation={{ scale: 100, speed: 90 }}
          noise={{ opacity: 1, scale: 1.2 }}
          sizing='fill'
        />
      </div>
    </>
  )
}
