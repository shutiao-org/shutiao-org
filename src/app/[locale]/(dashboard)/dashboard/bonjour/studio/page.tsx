import { redirect } from 'next/navigation'
import { BonjourStudio } from '@/components/dashboard/bonjour/studio'
import { BONJOUR_STARTER_PAGE } from '@/routes'
import { api } from '@/trpc/server'

export default async function BonjourPage() {
  const userInfo = await api.user.info()

  const needStarter = !userInfo.bonjourId || userInfo.bonjourIdUpdateCount === 0

  if (needStarter) {
    return redirect(BONJOUR_STARTER_PAGE)
  }

  return <BonjourStudio />
}
