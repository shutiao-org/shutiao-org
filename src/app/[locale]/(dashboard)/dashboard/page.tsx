import { redirect } from 'next/navigation'
import { DASHBOARD_HOME_PAGE } from '@/routes'

export default function DashboardPage() {
  redirect(DASHBOARD_HOME_PAGE)
}
