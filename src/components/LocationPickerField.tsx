'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useField } from '@payloadcms/ui'

export function LocationPickerField() {
  const { value: lat, setValue: setLat } = useField<number>({ path: 'location.latitude' })
  const { value: lng, setValue: setLng } = useField<number>({ path: 'location.longitude' })

  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<import('leaflet').Map | null>(null)
  const markerRef = useRef<import('leaflet').Marker | null>(null)
  const skipSyncRef = useRef(false) // prevent re-entrancy when map itself sets lat/lng

  // Inject Leaflet CSS once
  useEffect(() => {
    if (document.getElementById('leaflet-css')) return
    const link = document.createElement('link')
    link.id = 'leaflet-css'
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(link)
  }, [])

  // Init map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    let cancelled = false

    import('leaflet').then((mod) => {
      if (cancelled || !containerRef.current) return
      const L = mod.default

      // Fix broken default marker icon paths when bundled
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      const defaultLat = (typeof lat === 'number' && !isNaN(lat)) ? lat : 37.9838
      const defaultLng = (typeof lng === 'number' && !isNaN(lng)) ? lng : 23.7275

      const map = L.map(containerRef.current!).setView([defaultLat, defaultLng], 14)
      mapRef.current = map

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map)

      function addDraggableMarker(markerLat: number, markerLng: number) {
        markerRef.current = L.marker([markerLat, markerLng], { draggable: true }).addTo(map)
        markerRef.current.on('dragend', () => {
          const pos = markerRef.current!.getLatLng()
          skipSyncRef.current = true
          setLat(Math.round(pos.lat * 1_000_000) / 1_000_000)
          setLng(Math.round(pos.lng * 1_000_000) / 1_000_000)
        })
      }

      function placeMarker(clickLat: number, clickLng: number) {
        if (markerRef.current) {
          markerRef.current.setLatLng([clickLat, clickLng])
        } else {
          addDraggableMarker(clickLat, clickLng)
        }
        skipSyncRef.current = true
        setLat(Math.round(clickLat * 1_000_000) / 1_000_000)
        setLng(Math.round(clickLng * 1_000_000) / 1_000_000)
      }

      // If a pin already exists, show it WITHOUT touching form fields (avoids dirty-on-load)
      if (typeof lat === 'number' && typeof lng === 'number' && !isNaN(lat) && !isNaN(lng)) {
        addDraggableMarker(lat, lng)
      }

      map.on('click', (e) => {
        placeMarker(e.latlng.lat, e.latlng.lng)
      })
    })

    return () => {
      cancelled = true
    }
  }, []) // runs once on mount

  // Sync map → marker when fields are edited manually
  useEffect(() => {
    if (skipSyncRef.current) {
      skipSyncRef.current = false
      return
    }
    if (!mapRef.current) return
    if (typeof lat !== 'number' || typeof lng !== 'number' || isNaN(lat) || isNaN(lng)) return

    if (markerRef.current) {
      markerRef.current.setLatLng([lat, lng])
    } else {
      import('leaflet').then((mod) => {
        if (!mapRef.current) return
        const L = mod.default
        markerRef.current = L.marker([lat, lng], { draggable: true }).addTo(mapRef.current!)
        markerRef.current.on('dragend', () => {
          const pos = markerRef.current!.getLatLng()
          skipSyncRef.current = true
          setLat(Math.round(pos.lat * 1_000_000) / 1_000_000)
          setLng(Math.round(pos.lng * 1_000_000) / 1_000_000)
        })
      })
    }

    mapRef.current.setView([lat, lng], mapRef.current.getZoom())
  }, [lat, lng])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mapRef.current?.remove()
      mapRef.current = null
      markerRef.current = null
    }
  }, [])

  return (
    <div style={{ marginBottom: 8 }}>
      <p style={{ fontSize: 12, color: '#6b7280', margin: '0 0 6px' }}>
        Click the map to drop a pin or drag it to adjust. Latitude and longitude fields update automatically.
      </p>
      <div
        ref={containerRef}
        style={{
          height: 340,
          width: '100%',
          borderRadius: 6,
          overflow: 'hidden',
          border: '1px solid #e5e7eb',
        }}
      />
    </div>
  )
}
