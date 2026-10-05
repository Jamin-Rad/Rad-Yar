export const metadata = {
  applicationName: 'داروی Maman',
  title: 'داروی Maman',
  description: 'برنامهٔ شخصی و آنلاین داروهای Maman',
  manifest: '/maman/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'داروی Maman',
    statusBarStyle: 'default',
  },
  icons: {
    icon: [
      { url: '/andarun/icons/medikamente-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/andarun/icons/medikamente-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/andarun/icons/medikamente-180.png', sizes: '180x180', type: 'image/png' }],
  },
  robots: { index: false, follow: false },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#2f755f',
}

export default function MamanLayout({ children }) {
  return children
}
