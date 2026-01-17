'use client'

import { OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import type { Lantern } from '@/server/db/schema/lantern'

function createLanternGeometry() {
  const geoms: THREE.BufferGeometry[] = []

  const pts = [
    new THREE.Vector2(0, 1.0 - 0),
    new THREE.Vector2(0.25, 1.0 - 0),
    new THREE.Vector2(0.25, 1.0 - 0.125),
    new THREE.Vector2(0.45, 1.0 - 0.125),
    new THREE.Vector2(0.45, 1.0 - 0.95),
  ]
  const geom = new THREE.LatheGeometry(pts, 20)
  geoms.push(geom)

  const geomLight = new THREE.CylinderGeometry(0.1, 0.1, 0.05, 20)
  geoms.push(geomLight)

  const fullGeom = mergeGeometries(geoms)
  return fullGeom
}

function createLanternMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uLight: { value: new THREE.Color('red').multiplyScalar(1.5) },
      uColor: { value: new THREE.Color('maroon').multiplyScalar(1) },
      uFire: { value: new THREE.Color(1, 0.75, 0) },
    },
    vertexShader: `
      uniform float uTime;
      attribute vec2 instLight;

      varying vec2 vInstLight;
      varying float vY;

      void main() {
        vInstLight = instLight;
        vY = position.y;

        vec3 pos = position;
        gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uLight;
      uniform vec3 uColor;
      uniform vec3 uFire;

      varying vec2 vInstLight;
      varying float vY;

      void main() {
        vec3 col = vec3(0);
        float baseLight = vInstLight.x * 0.1 + 0.9;
        float li = baseLight;

        float f = smoothstep(0.12, 0.37, vY);
        col = mix(uLight * li, uColor * (0.75 + li * 0.25), f);

        col = mix(col, uFire, step(vY, 0.05) * li);

        gl_FragColor = vec4(col, 1);
      }
    `,
    side: THREE.DoubleSide,
  })
}

function Lanterns({
  lanterns,
  onLanternClick,
}: {
  lanterns: Lantern[]
  onLanternClick: (lantern: Lantern) => void
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const hoveredIndexRef = useRef<number | null>(null)

  const instData = useMemo(() => {
    const num = lanterns.length
    const data = []
    for (let i = 0; i < num; i++) {
      data.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 200,
          (Math.random() - 0.5) * 200,
          (Math.random() - 0.5) * 200,
        ),
        speed: Math.random() * 0.1 + 0.3,
        offset: Math.PI + Math.PI * Math.random(),
        phase: Math.random() + 5,
        randomScale: 0.8 + Math.random() * 0.4,
      })
    }
    return data
  }, [lanterns])

  const instGeom = useMemo(() => {
    const fullGeom = createLanternGeometry()
    const instGeom = new THREE.InstancedBufferGeometry()
    const position = fullGeom.getAttribute('position')
    const normal = fullGeom.getAttribute('normal')
    const uv = fullGeom.getAttribute('uv')

    if (position) instGeom.setAttribute('position', position)
    if (normal) instGeom.setAttribute('normal', normal)
    if (uv) instGeom.setAttribute('uv', uv)

    instGeom.setIndex(fullGeom.getIndex())

    const num = lanterns.length
    const instLight: number[] = []

    for (let i = 0; i < num; i++) {
      instLight.push(instData[i]!.offset, instData[i]!.phase)
    }

    instGeom.setAttribute(
      'instLight',
      new THREE.InstancedBufferAttribute(new Float32Array(instLight), 2),
    )

    // Compute bounding volumes for raycasting
    instGeom.computeBoundingBox()
    instGeom.computeBoundingSphere()

    return instGeom
  }, [lanterns, instData])

  const material = useMemo(() => createLanternMaterial(), [])

  const tempMatrix = useMemo(() => new THREE.Matrix4(), [])
  const tempPos = useMemo(() => new THREE.Vector3(), [])

  useFrame((state: { clock: { elapsedTime: number } }) => {
    const time = state.clock.elapsedTime
    if (materialRef.current?.uniforms?.uTime) {
      materialRef.current.uniforms.uTime.value = time
    }

    if (meshRef.current) {
      for (let i = 0; i < lanterns.length; i++) {
        // If this lantern is hovered, stop its movement
        if (i === hoveredIndexRef.current) continue

        const d = instData[i]!
        tempPos.copy(d.pos)

        // Floating animation on CPU so raycasting works
        tempPos.x += Math.cos(d.offset + d.phase * time)
        tempPos.z += Math.sin(d.offset + d.phase * time * Math.sin(d.offset))
        tempPos.y = ((d.pos.y + 100 + time * d.speed) % 200) - 100

        tempMatrix.makeTranslation(tempPos.x, tempPos.y, tempPos.z)
        tempMatrix.scale(
          new THREE.Vector3(
            d.randomScale * 2,
            d.randomScale * 2,
            d.randomScale * 2,
          ),
        )
        meshRef.current.setMatrixAt(i, tempMatrix)
      }
      meshRef.current.instanceMatrix.needsUpdate = true
      // Update bounding sphere for raycasting
      if (!meshRef.current.geometry.boundingSphere) {
        meshRef.current.geometry.computeBoundingSphere()
      }
    }
  })

  return (
    <instancedMesh
      key={lanterns.length}
      ref={(m) => {
        meshRef.current = m as unknown as THREE.InstancedMesh
        if (m) {
          materialRef.current = m.material as THREE.ShaderMaterial
        }
      }}
      args={[undefined, undefined, lanterns.length]}
      geometry={instGeom}
      material={material}
      onClick={(e) => {
        e.stopPropagation()
        if (typeof e.instanceId === 'number') {
          const lantern = lanterns[e.instanceId]
          if (lantern) onLanternClick(lantern)
        }
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
        if (typeof e.instanceId === 'number') {
          hoveredIndexRef.current = e.instanceId
        }
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto'
        hoveredIndexRef.current = null
      }}
    />
  )
}

export function LanternScene({
  lanterns,
  onLanternClick,
}: {
  lanterns: Lantern[]
  onLanternClick: (lantern: Lantern) => void
}) {
  return (
    <>
      <color
        attach='background'
        args={[0x000000]}
      />
      <ambientLight intensity={0.5} />
      <Lanterns
        lanterns={lanterns}
        onLanternClick={onLanternClick}
      />
      <OrbitControls maxDistance={150} />
    </>
  )
}
