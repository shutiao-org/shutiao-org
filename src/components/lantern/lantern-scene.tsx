'use client'

import { OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

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

      attribute vec3 instPos;
      attribute float instSpeed;
      attribute vec2 instLight;

      varying vec2 vInstLight;
      varying float vY;

      void main() {
        vInstLight = instLight;
        vY = position.y;

        vec3 pos = vec3(position) * 2.;
        vec3 iPos = instPos * 200.;

        iPos.xz += vec2(
          cos(instLight.x + instLight.y * uTime),
          sin(instLight.x + instLight.y * uTime * fract(sin(instLight.x)))
        );

        iPos.y = mod(iPos.y + 100. + (uTime * instSpeed), 200.) - 100.;
        pos += iPos;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
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

function Lanterns() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

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

    const num = 500
    const instPos: number[] = []
    const instSpeed: number[] = []
    const instLight: number[] = []

    for (let i = 0; i < num; i++) {
      instPos.push(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5,
      )
      instSpeed.push(Math.random() * 0.1 + 0.3)
      instLight.push(Math.PI + Math.PI * Math.random(), Math.random() + 5)
    }

    instGeom.setAttribute(
      'instPos',
      new THREE.InstancedBufferAttribute(new Float32Array(instPos), 3),
    )
    instGeom.setAttribute(
      'instSpeed',
      new THREE.InstancedBufferAttribute(new Float32Array(instSpeed), 1),
    )
    instGeom.setAttribute(
      'instLight',
      new THREE.InstancedBufferAttribute(new Float32Array(instLight), 2),
    )

    return instGeom
  }, [])

  const material = useMemo(() => createLanternMaterial(), [])

  useFrame((state: { clock: { elapsedTime: number } }) => {
    if (materialRef.current?.uniforms?.uTime) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh
      ref={(m) => {
        meshRef.current = m
        if (m) {
          materialRef.current = m.material as THREE.ShaderMaterial
        }
      }}
      geometry={instGeom}
      material={material}
    />
  )
}

export function LanternScene() {
  return (
    <>
      <color
        attach='background'
        args={[0x000000]}
      />
      <ambientLight intensity={0.5} />
      <Lanterns />
      <OrbitControls maxDistance={150} />
    </>
  )
}
