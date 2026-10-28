import { redirect } from 'next/navigation'
import { hasFatimaSession } from '@/lib/fatimaPasswordAuth'
import TodoPage from '@/app/andarun/todo/TodoPage'

export const metadata = {
  title: 'Fatima Kalender',
  description: 'Gemeinsame Aufgaben und Termine',
  applicationName: 'Fatima Kalender',
  manifest: '/fatima/todo/manifest.webmanifest?v=2',
  appleWebApp: { capable: true, title: 'Fatima Kalender', statusBarStyle: 'default' },
  icons: {
    icon: [
      { url: '/fatima/heart-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/fatima/heart-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/fatima/heart-192.png',
    apple: [{ url: '/fatima/heart-180.png', sizes: '180x180', type: 'image/png' }],
  },
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = 'force-dynamic'

export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#78405b' }

export default async function FatimaTodoPage() {
  if (!(await hasFatimaSession())) redirect('/fatima/login')

  return <TodoPage apiBase="/api/andarun/todos" homeHref="/fatima" homeLabel="Fatima" title="Kalender" theme="light" />
}
