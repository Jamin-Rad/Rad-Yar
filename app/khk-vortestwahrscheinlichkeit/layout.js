export const metadata = {
  title: 'KHK Vortestwahrscheinlichkeit Rechner | RadYar',
  description: 'Interaktiver DISCHARGE-Rechner zur Vortestwahrscheinlichkeit einer stenosierenden KHK bei stabilen Brustschmerzen nach NVL 2024.',
  applicationName: 'KHK Vortestwahrscheinlichkeit',
  manifest: '/khk-vortestwahrscheinlichkeit/manifest.webmanifest',
  appleWebApp: { capable: true, title: 'KHK VTW', statusBarStyle: 'black-translucent' },
  icons: { icon: '/khk-vortestwahrscheinlichkeit/icon.svg', apple: '/khk-vortestwahrscheinlichkeit/icon.svg' },
  alternates: { canonical: '/khk-vortestwahrscheinlichkeit' },
  openGraph: {
    title: 'KHK Vortestwahrscheinlichkeit Rechner',
    description: 'DISCHARGE / COME-CCT nach NVL Chronische KHK 2024.',
    url: '/khk-vortestwahrscheinlichkeit', siteName: 'RadYar', type: 'website',
    images: [{ url: '/khk-vortestwahrscheinlichkeit/icon.svg', width: 512, height: 512, alt: 'KHK Vortestwahrscheinlichkeit' }],
  },
  twitter: { card: 'summary', title: 'KHK Vortestwahrscheinlichkeit', description: 'DISCHARGE-Rechner nach NVL 2024.', images: ['/khk-vortestwahrscheinlichkeit/icon.svg'] },
}

export default function KhkPretestLayout({ children }) { return children }
