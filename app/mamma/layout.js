import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Mamma - RadYar',
  description: 'Strukturiertes Wissen, Fälle und Prüfungsvorbereitung für die Mammadiagnostik.',
  applicationName: 'Mamma - RadYar',
  manifest: '/mamma/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'Mamma - RadYar',
    statusBarStyle: 'black-translucent',
  },
  icons: {
    icon: [
      { url: '/mamma/mamma-icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/mamma/mamma-icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/mamma/mamma-apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'Mamma - RadYar',
    description: 'Strukturiertes Wissen, Fälle und Prüfungsvorbereitung für die Mammadiagnostik.',
    url: '/mamma',
    siteName: 'RadYar',
    type: 'website',
    images: [{ url: '/mamma/app-icon.png', width: 1024, height: 1024, alt: 'Mamma - RadYar' }],
  },
}

export default function MammaLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
