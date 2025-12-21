import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { AppSidebar } from '@/components/dashboard/sidebar'
import { UserInfoProvider } from '@/components/dashboard/user-info-provider'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { auth } from '@/lib/auth'
import { SIGN_IN_PAGE } from '@/routes'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect(SIGN_IN_PAGE)
  }

  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar_state')?.value !== 'false'

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <UserInfoProvider />
      <AppSidebar user={session.user} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
