'use client'

import { ThemeToggle } from '@/components/theme/toggle'
import { SidebarTrigger } from '@/components/ui/sidebar'

export default async function DashboardPage() {
  return (
    <main className='flex h-screen w-full flex-col'>
      <div className='flex items-center justify-between px-4 py-2'>
        <SidebarTrigger />
        <ThemeToggle />
      </div>
    </main>
  )
}
