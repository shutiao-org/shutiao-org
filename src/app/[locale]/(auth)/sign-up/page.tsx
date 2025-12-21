import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { SignUp } from '@/components/auth/sign-up'
import { auth } from '@/lib/auth'
import { DASHBOARD_HOME_PAGE } from '@/routes'

export default async function SignUpPage() {
  // if authenticated: redirect to dashboard
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (session) redirect(DASHBOARD_HOME_PAGE)

  return <SignUp />
}
