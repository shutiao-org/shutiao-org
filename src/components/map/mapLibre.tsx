'use client'

import 'maplibre-gl/dist/maplibre-gl.css'
// @ts-expect-error
import { BasemapStyle } from '@esri/maplibre-arcgis'
import { useTheme } from 'next-themes'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  GeolocateControl,
  Map as MapLibreMap,
  type MapRef,
  NavigationControl,
} from 'react-map-gl/maplibre'
import { env } from '@/env'
import { useIsMobile } from '@/hooks/use-mobile'
import '@/styles/maplibre.css'

interface MapLibreProps extends React.ComponentProps<typeof MapLibreMap> {
  hideControls?: boolean
  style?: React.CSSProperties
}

const EMPTY_MAP_STYLE = { version: 8, sources: {}, layers: [] }

export default function MapLibre({
  hideControls,
  style,
  ...props
}: MapLibreProps) {
  const { resolvedTheme } = useTheme()
  const isMobile = useIsMobile()

  const mapRef = useRef<MapRef>(null)
  const [isRotating, setIsRotating] = useState(true)

  const initialViewState = useMemo(
    () => ({
      longitude: 116.38,
      latitude: 39.9,
      zoom: isMobile ? 0 : 1.5,
      pitch: 0,
      bearing: 0,
    }),
    [isMobile],
  )

  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    const apiKey = env.NEXT_PUBLIC_ARCGIS_ACCESS_TOKEN
    if (!mapRef.current || !apiKey || !mapLoaded) return

    const map = mapRef.current.getMap()
    // https://developers.arcgis.com/documentation/mapping-and-location-services/mapping/basemaps/arcgis-styles/
    const styleName =
      resolvedTheme === 'dark'
        ? 'arcgis/charted-territory'
        : 'arcgis/colored-pencil'

    BasemapStyle.applyStyle(map, {
      style: styleName,
      token: apiKey,
    })
  }, [resolvedTheme, mapLoaded])

  useEffect(() => {
    if (!isRotating || !mapRef.current) return

    const interval = setInterval(() => {
      if (mapRef.current) {
        const map = mapRef.current.getMap()
        if (map.getZoom() < 5) {
          const center = map.getCenter()
          center.lng -= 0.2
          map.jumpTo({ center })
        }
      }
    }, 50)

    return () => clearInterval(interval)
  }, [isRotating])

  const handleInteraction = useCallback(() => {
    setIsRotating(false)
  }, [])

  return (
    <div className='relative h-full w-full'>
      <MapLibreMap
        ref={mapRef}
        initialViewState={initialViewState}
        style={style || { width: '100%', height: '100%' }}
        // @ts-expect-error
        mapStyle={EMPTY_MAP_STYLE}
        onLoad={() => setMapLoaded(true)}
        onMoveStart={handleInteraction}
        onMouseDown={handleInteraction}
        onTouchStart={handleInteraction}
        minZoom={isMobile ? -2 : 0}
        maxZoom={18}
        attributionControl={false}
        projection={{ type: 'globe' }}
        {...props}
      >
        {!hideControls && (
          <>
            <NavigationControl position='bottom-right' />
            <GeolocateControl position='bottom-right' />
          </>
        )}
      </MapLibreMap>
    </div>
  )
}
