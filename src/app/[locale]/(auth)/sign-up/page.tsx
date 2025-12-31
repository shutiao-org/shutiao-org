import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { SignUp } from '@/components/auth/sign-up'
import { auth } from '@/lib/auth'
import { REDIRECT_DASHBOARD_PAGE } from '@/routes'

export default async function SignUpPage() {
  // if authenticated: redirect to dashboard
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (session) redirect(REDIRECT_DASHBOARD_PAGE)

  return <SignUp />
}
