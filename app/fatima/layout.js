export const metadata = {
  applicationName: 'Fatima',
  manifest: '/fatima/manifest.webmanifest?v=1',
  appleWebApp: { capable: true, title: 'Fatima', statusBarStyle: 'default' },
  icons: {
    icon: [
      { url: '/fatima/heart-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/fatima/heart-192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/fatima/heart-32.png',
    apple: [{ url: '/fatima/heart-180.png', sizes: '180x180', type: 'image/png' }],
  },
}

export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#78405b' }

export default function FatimaLayout({ children }) {
  return children
}
