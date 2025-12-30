/* Ref: https://codepen.io/Kaffeewerfer/pen/dyOBbzj */
'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { KoiFish } from '@/components/lantern/koi-fish'
import { LanternScene } from '@/components/lantern/lantern-scene'

function LoadingFallback() {
  return null
}

export default function LanternPage() {
  return (
    <div className='fixed inset-0 overflow-hidden'>
      <Canvas
        camera={{
          position: [0, -25, 80],
          fov: 60,
          near: 0.1,
          far: 500,
        }}
        gl={{ antialias: true }}
      >
        <LanternScene />
        <Suspense fallback={<LoadingFallback />}>
          <KoiFish
            url='/models/fish.stl'
            offset={0}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
