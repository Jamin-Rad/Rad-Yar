export const metadata = {
  title: 'Fleischner Rechner | RadYar',
  description: 'Interaktiver Assistent nach den Fleischner-Society-Empfehlungen 2017 für inzidentelle solide und subsolide Lungenrundherde.',
  applicationName: 'Fleischner',
  robots: { index: true, follow: true },
  manifest: '/fleischner/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'Fleischner',
    statusBarStyle: 'black-translucent',
  },
  icons: {
    icon: [
      { url: '/fleischner/fleischner-icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/fleischner/fleischner-icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/fleischner/fleischner-apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  alternates: { canonical: '/fleischner' },
  openGraph: {
    title: 'Fleischner Rechner',
    description: 'Strukturierte Follow-up-Empfehlungen für inzidentelle Lungenrundherde nach Fleischner 2017.',
    url: '/fleischner',
    siteName: 'RadYar',
    type: 'website',
    images: [{ url: '/fleischner/app-icon.png', width: 1024, height: 1024, alt: 'Fleischner Rechner' }],
  },
  twitter: {
    card: 'summary',
    title: 'Fleischner Rechner',
    description: 'Follow-up-Empfehlungen für inzidentelle Lungenrundherde.',
    images: ['/fleischner/app-icon.png'],
  },
}

export default function FleischnerLayout({ children }) {
  return children
}
