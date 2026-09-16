export const metadata = {
  title: 'Andarun | Dein persönlicher Raum',
  description: 'Dein persönlicher Raum für Alltag, Gesundheit, Lernen und Finanzen.',
  applicationName: 'Andarun',
  manifest: '/andarun/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'Andarun',
    statusBarStyle: 'black-translucent',
  },
  icons: {
    icon: [
      { url: '/andarun/andarun-icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/andarun/andarun-icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/andarun/andarun-icon-32.png',
    apple: [
      { url: '/andarun/andarun-apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export default function AndarunLayout({ children }) {
  return children
}
