export const metadata = {
  title: 'Node-RADS Rechner | RadYar',
  description: 'Interaktive Node-RADS-1.0-Einstufung von Lymphknoten nach Region, Größe und Konfiguration.',
  applicationName: 'Node-RADS',
  manifest: '/node-rads/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'Node-RADS',
    statusBarStyle: 'black-translucent',
  },
  icons: {
    icon: [
      { url: '/node-rads/node-rads-icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/node-rads/node-rads-icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/node-rads/node-rads-apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  alternates: { canonical: '/node-rads' },
  openGraph: {
    title: 'Node-RADS',
    description: 'Node-RADS',
    url: '/node-rads',
    siteName: 'Node-RADS',
    type: 'website',
    images: [{ url: '/node-rads/app-icon.png', width: 1024, height: 1024, alt: 'Node-RADS' }],
  },
  twitter: {
    card: 'summary',
    title: 'Node-RADS',
    description: 'Node-RADS',
    images: ['/node-rads/app-icon.png'],
  },
}

export default function NodeRadsLayout({ children }) {
  return children
}
