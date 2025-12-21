import { GoogleOneTap } from '@/components/auth/google-one-tap'
import { NoiseBg } from '@/components/common/noise-bg'
import { SocialMedia } from '@/components/common/social-media'
import { Footer } from '@/components/home/footer'
import { Header } from '@/components/home/header'
import { Hero } from '@/components/home/hero'

export default async function HomePage() {
  return (
    <div className='flex min-h-screen flex-col items-center'>
      <Header />
      <div className='mt-30 flex flex-1 flex-col items-center justify-center'>
        <Hero />
        <SocialMedia className='mt-20 md:scale-200' />
      </div>
      <Footer />
      <NoiseBg />
      <GoogleOneTap />
    </div>
  )
}
