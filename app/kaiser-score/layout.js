export const metadata = {
  title: 'Kaiser Score Rechner | RadYar',
  description: 'Interaktiver Kaiser Score für kontrastmittelverstärkte Mamma-MRT – strukturierte Einordnung von Läsionen anhand morphologischer und kinetischer Kriterien.',
  applicationName: 'Kaiser Score',
  manifest: '/kaiser-score/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'Kaiser Score',
    statusBarStyle: 'black-translucent',
  },
  icons: {
    icon: [
      { url: '/kaiser-score/kaiser-score-icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/kaiser-score/kaiser-score-icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/kaiser-score/kaiser-score-apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  alternates: { canonical: '/kaiser-score' },
  openGraph: {
    title: 'Kaiser Score Rechner',
    description: 'Ein strukturierter Entscheidungsweg für kontrastmittelverstärkte Mamma-MRT.',
    url: '/kaiser-score',
    siteName: 'RadYar',
    type: 'website',
    images: [{ url: '/kaiser-score/app-icon.png', width: 1024, height: 1024, alt: 'Kaiser Score' }],
  },
  twitter: {
    card: 'summary',
    title: 'Kaiser Score Rechner',
    description: 'Ein strukturierter Entscheidungsweg für kontrastmittelverstärkte Mamma-MRT.',
    images: ['/kaiser-score/app-icon.png'],
  },
}

export default function KaiserScoreLayout({ children }) {
  return children
}
