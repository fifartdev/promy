import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Promy — Discover Local Promotions',
  description:
    'Promy alerts you the moment you walk near a participating business. Discover hyperlocal deals, no searching required.',
  openGraph: {
    title: 'Promy',
    description: 'Get notified the moment you arrive near your favorite local businesses.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
