'use client'

import { useFrame, useLoader } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'

interface KoiFishProps {
  url: string
  reverse?: boolean
  offset?: number
  onClick?: () => void
}

export function KoiFish({ url, reverse = false, offset = 0 }: KoiFishProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const uniformsRef = useRef<{
    uSpatialTexture: { value: THREE.DataTexture | null }
    uTextureSize: { value: THREE.Vector2 }
    uTime: { value: number }
    uLengthRatio: { value: number }
    uObjSize: { value: THREE.Vector3 }
  } | null>(null)

  const geometry = useLoader(STLLoader, url) as THREE.BufferGeometry | null

  useEffect(() => {
    if (geometry) {
      console.log('STL geometry loaded:', geometry)
      const posAttr = geometry.getAttribute('position')
      console.log('Position attribute:', posAttr)
      console.log('Vertex count:', posAttr?.count)
      console.log(
        'Bounding box:',
        new THREE.Box3().setFromBufferAttribute(
          posAttr as THREE.BufferAttribute,
        ),
      )
    } else {
      console.warn('STL geometry not loaded')
    }
  }, [geometry])

  const { uniforms, processedGeometry, curve } = useMemo(() => {
    if (!geometry)
      return { uniforms: null, processedGeometry: null, curve: null }

    const baseVector = new THREE.Vector3(40, 0, 0)
    const axis = new THREE.Vector3(0, 1, 0)
    const cPts: THREE.Vector3[] = []
    const cSegments = 6
    const cStep = (Math.PI * 2) / cSegments

    for (let i = 0; i < cSegments; i++) {
      cPts.push(
        new THREE.Vector3()
          .copy(baseVector)
          .applyAxisAngle(axis, cStep * i)
          .setY(THREE.MathUtils.randFloat(-10, 10)),
      )
    }

    const curve = new THREE.CatmullRomCurve3(cPts)
    curve.closed = true

    const numPoints = 511
    const cPoints = curve.getSpacedPoints(numPoints)
    const cObjects = curve.computeFrenetFrames(numPoints, true)

    const data: number[] = []
    cPoints.forEach((v) => {
      data.push(v.x, v.y, v.z, 0)
    })
    cObjects.binormals.forEach((v) => {
      data.push(v.x, v.y, v.z, 0)
    })
    cObjects.normals.forEach((v) => {
      data.push(v.x, v.y, v.z, 0)
    })
    cObjects.tangents.forEach((v) => {
      data.push(v.x, v.y, v.z, 0)
    })

    const dataArray = new Float32Array(data)
    const tex = new THREE.DataTexture(
      dataArray,
      numPoints + 1,
      4,
      THREE.RGBAFormat as THREE.PixelFormat,
      THREE.FloatType,
    )
    tex.magFilter = THREE.NearestFilter
    tex.minFilter = THREE.NearestFilter
    tex.wrapS = THREE.ClampToEdgeWrapping
    tex.wrapT = THREE.ClampToEdgeWrapping
    tex.needsUpdate = true

    const processedGeometry = geometry.clone()

    processedGeometry.center()
    processedGeometry.rotateX(-Math.PI * 0.5)
    processedGeometry.scale(0.9, 0.8, 0.4)

    if (reverse) {
      processedGeometry.scale(1, 1, -1)
    }

    const objBox = new THREE.Box3().setFromBufferAttribute(
      processedGeometry.getAttribute('position') as THREE.BufferAttribute,
    )
    const objSize = new THREE.Vector3()
    objBox.getSize(objSize)

    const samplePoint = Math.floor((200 / numPoints) * (numPoints - 1))
    const sampleLength = curve.getLength() * (samplePoint / numPoints)
    const lengthRatio = objSize.z / (sampleLength || objSize.z)

    const objUniforms = {
      uSpatialTexture: { value: tex },
      uTextureSize: { value: new THREE.Vector2(numPoints + 1, 4) },
      uTime: { value: 0 },
      uLengthRatio: { value: lengthRatio },
      uObjSize: { value: objSize },
    }

    return { uniforms: objUniforms, processedGeometry, curve }
  }, [geometry, reverse])

  const material = useMemo(() => {
    if (!processedGeometry || !uniforms) return null

    const objMat = new THREE.MeshBasicMaterial({
      color: 0xff6600,
      wireframe: true,
    })

    objMat.onBeforeCompile = (shader) => {
      shader.uniforms.uSpatialTexture = uniforms.uSpatialTexture
      shader.uniforms.uTextureSize = uniforms.uTextureSize
      shader.uniforms.uTime = uniforms.uTime
      shader.uniforms.uLengthRatio = uniforms.uLengthRatio
      shader.uniforms.uObjSize = uniforms.uObjSize

      shader.vertexShader = `
        uniform sampler2D uSpatialTexture;
        uniform vec2 uTextureSize;
        uniform float uTime;
        uniform float uLengthRatio;
        uniform vec3 uObjSize;

        struct splineData {
          vec3 point;
          vec3 binormal;
          vec3 normal;
        };

        splineData getSplineData(float t){
          float step = 1. / uTextureSize.y;
          float halfStep = step * 0.5;
          splineData sd;
          sd.point    = texture2D(uSpatialTexture, vec2(t, step * 0. + halfStep)).rgb;
          sd.binormal = texture2D(uSpatialTexture, vec2(t, step * 1. + halfStep)).rgb;
          sd.normal   = texture2D(uSpatialTexture, vec2(t, step * 2. + halfStep)).rgb;
          return sd;
        }
      ${shader.vertexShader}`

      shader.vertexShader = shader.vertexShader.replace(
        `#include <begin_vertex>`,
        `#include <begin_vertex>

        vec3 pos = position;

        float wStep = 1. / uTextureSize.x;
        float hWStep = wStep * 0.5;

        float d = pos.z / uObjSize.z;
        float timeDirection = ${reverse ? '-1.0' : '1.0'};
        float pathOffset = ${reverse ? (offset + 0.5).toFixed(3) : offset.toFixed(3)};
        float t = fract((uTime * 0.05 * timeDirection) + (d * uLengthRatio) + pathOffset);
        float numPrev = floor(t / uTextureSize.x); // Corrected indexing
        
        // Use a simpler approach for the shader since we move the mesh on CPU
        // We only want the local deformation relative to the mesh position
        splineData sdCenter = getSplineData(fract(uTime * 0.05 * timeDirection + pathOffset));
        splineData sdVertex = getSplineData(t);

        transformed = (sdVertex.point - sdCenter.point) + (sdVertex.normal * pos.x) + (sdVertex.binormal * pos.y);
      `,
      )
    }

    return objMat
  }, [processedGeometry, uniforms, offset, reverse])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    if (uniformsRef.current) {
      uniformsRef.current.uTime.value = time
    }

    if (curve && meshRef.current) {
      const timeDirection = reverse ? -1 : 1
      const pathOffset = reverse ? offset + 0.5 : offset
      const t = (((time * 0.05 * timeDirection + pathOffset) % 1) + 1) % 1

      // Move the whole mesh object to the center of the fish on the curve
      // This helps the raycaster find the mesh
      curve.getPointAt(t, meshRef.current.position)

      // Also make the bounding box very large as a fallback
      if (!meshRef.current.geometry.boundingBox) {
        meshRef.current.geometry.computeBoundingBox()
      }
    }
  })

  if (!processedGeometry || !material || !uniforms) {
    return null
  }

  uniformsRef.current = uniforms

  return (
    <>
      <mesh
        ref={meshRef}
        geometry={processedGeometry}
        material={material}
      />
      {/* Invisible hitbox that follows the fish for reliable clicking */}
      <mesh position={meshRef.current?.position}>
        <sphereGeometry args={[15, 16, 16]} />
        <meshBasicMaterial
          visible={false}
          transparent
          opacity={0}
        />
      </mesh>
    </>
  )
}
