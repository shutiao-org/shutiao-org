import { NoiseBg } from '@/components/common/noise-bg'
import { Footer } from '@/components/home/footer'
import { Header } from '@/components/home/header'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex flex-col items-center'>
      <Header />
      {children}
      <Footer />
      <NoiseBg />
    </div>
  )
}
