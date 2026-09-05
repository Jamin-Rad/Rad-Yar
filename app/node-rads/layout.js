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
    title: 'Node-RADS Rechner · RadYar',
    description: 'Region wählen, Größe und Konfiguration erfassen und Node-RADS strukturiert bestimmen.',
    url: '/node-rads',
    siteName: 'RadYar',
    type: 'website',
  },
}

export default function NodeRadsLayout({ children }) {
  return children
}
