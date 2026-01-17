/* Ref: https://codepen.io/Kaffeewerfer/pen/dyOBbzj */
'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import { KoiFish } from '@/components/lantern/koi-fish'
import { LanternScene } from '@/components/lantern/lantern-scene'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import type { Lantern } from '@/server/db/schema/lantern'
import { api } from '@/trpc/react'

function LoadingFallback() {
  return null
}

export default function LanternPage() {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [selectedLantern, setSelectedLantern] = useState<Lantern | null>(null)
  const [newWish, setNewWish] = useState('')

  const { data: lanterns = [], refetch } = api.lantern.getAll.useQuery()
  const createMutation = api.lantern.create.useMutation({
    onSuccess: () => {
      setIsAddOpen(false)
      setNewWish('')
      refetch()
    },
  })

  const handleAddWish = () => {
    if (newWish.trim()) {
      createMutation.mutate({ content: newWish })
    }
  }

  const handleLanternClick = (lantern: Lantern) => {
    setSelectedLantern(lantern)
    setIsViewOpen(true)
  }

  return (
    <div
      className='fixed inset-0 overflow-hidden'
      onDoubleClick={() => setIsAddOpen(true)}
    >
      <Canvas
        camera={{
          position: [0, -25, 80],
          fov: 60,
          near: 0.1,
          far: 500,
        }}
        gl={{ antialias: true }}
      >
        <LanternScene
          lanterns={lanterns}
          onLanternClick={handleLanternClick}
        />
        <Suspense fallback={<LoadingFallback />}>
          <KoiFish
            url='/models/fish.stl'
            offset={0}
          />
        </Suspense>
      </Canvas>

      <div className='-translate-x-1/2 pointer-events-none fixed bottom-8 left-1/2 text-center'>
        <p className='animate-pulse text-[#ffbf00]/40 text-sm uppercase tracking-[0.3em]'>
          双击任意处许愿 · 点击灯笼观愿
        </p>
      </div>

      {/* Add Wish Dialog */}
      <Dialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
      >
        <DialogContent className='border-[#ffbf00]/30 bg-black/90 text-[#ffbf00] shadow-[0_0_20px_rgba(255,191,0,0.2)]'>
          <DialogHeader>
            <DialogTitle className='text-center font-light text-2xl text-[#ffbf00] tracking-[0.2em]'>
              许下一个愿望
            </DialogTitle>
          </DialogHeader>
          <div className='py-6'>
            <Input
              value={newWish}
              onChange={(e) => setNewWish(e.target.value)}
              placeholder='在此输入你的期许...'
              className='border-[#ffbf00]/20 bg-transparent text-center text-lg placeholder:text-[#ffbf00]/30 focus-visible:border-[#ffbf00] focus-visible:ring-0'
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddWish()
              }}
            />
          </div>
          <DialogFooter className='sm:justify-center'>
            <Button
              onClick={handleAddWish}
              disabled={createMutation.isPending || !newWish.trim()}
              className='min-w-[120px] rounded-full border border-[#ffbf00]/50 bg-transparent text-[#ffbf00] tracking-[0.3em] shadow-[0_0_10px_rgba(255,191,0,0.1)] transition-all duration-300 hover:bg-[#ffbf00] hover:text-black'
            >
              祈愿
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Wish Dialog */}
      <Dialog
        open={isViewOpen}
        onOpenChange={setIsViewOpen}
      >
        <DialogContent className='border-[#ff4d4d]/30 bg-black/90 text-[#ff4d4d] shadow-[0_0_20px_rgba(255,77,77,0.2)]'>
          <DialogHeader>
            <DialogTitle className='text-center font-light text-[#ff4d4d]/70 text-xl tracking-[0.2em]'>
              愿望内容
            </DialogTitle>
          </DialogHeader>
          <div className='py-10 text-center font-serif text-2xl text-[#ff4d4d] italic tracking-wide drop-shadow-[0_0_8px_rgba(255,77,77,0.5)]'>
            「 {selectedLantern?.content} 」
          </div>
          <DialogFooter className='sm:justify-center'>
            <Button
              onClick={() => setIsViewOpen(false)}
              className='min-w-[100px] rounded-full border border-[#ff4d4d]/50 bg-transparent text-[#ff4d4d] transition-all duration-300 hover:bg-[#ff4d4d] hover:text-black'
            >
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
