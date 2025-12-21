'use client'

import { SidebarTrigger } from '@/components/ui/sidebar'

export default async function SettingsPage() {
  return (
    <main className='flex w-full flex-col'>
      <div className='flex items-center justify-between px-4 py-2'>
        <SidebarTrigger />
      </div>

      <p className='text-center font-bold text-2xl'>TODO: Settings page</p>
    </main>
  )
}
