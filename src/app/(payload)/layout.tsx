import '@payloadcms/next/css'
import { RootLayout } from '@payloadcms/next/layouts'
import config from '@payload-config'
import { importMap } from './admin/importMap.js'
import { serverFunction } from './admin/actions'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}
