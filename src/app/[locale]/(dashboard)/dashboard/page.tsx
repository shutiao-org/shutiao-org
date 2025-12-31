import { redirect } from 'next/navigation'
import { REDIRECT_DASHBOARD_PAGE } from '@/routes'

export default function DashboardPage() {
  redirect(REDIRECT_DASHBOARD_PAGE)
}
