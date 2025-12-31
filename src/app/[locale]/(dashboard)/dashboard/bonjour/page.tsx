import { BonjourStarter } from '@/components/dashboard/bonjour/starter'
import { BonjourStudio } from '@/components/dashboard/bonjour/studio'
import { api } from '@/trpc/server'

export default async function BonjourPage() {
  const userInfo = await api.user.info()

  const needStarter = !userInfo.bonjourId || userInfo.bonjourIdUpdateCount === 0

  if (needStarter) {
    return <BonjourStarter />
  }

  return <BonjourStudio />
}
