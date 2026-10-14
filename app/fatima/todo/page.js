import { redirect } from 'next/navigation'
import { hasFatimaSession } from '@/lib/fatimaPasswordAuth'
import TodoPage from '@/app/andarun/todo/TodoPage'

export const metadata = {
  title: 'Fatemeh ToDo',
  description: 'Gemeinsame Aufgaben und Termine',
  applicationName: 'Fatemeh ToDo',
  manifest: '/fatima/todo/manifest.webmanifest?v=1',
  appleWebApp: { capable: true, title: 'Fatemeh ToDo', statusBarStyle: 'default' },
  icons: {
    icon: [
      { url: '/fatima/todo/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/fatima/todo/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/fatima/todo/icon-192.png',
    apple: [{ url: '/fatima/todo/icon-180.png', sizes: '180x180', type: 'image/png' }],
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

  return <TodoPage apiBase="/api/andarun/todos" homeHref="/fatima" homeLabel="Fatima" theme="light" />
}
