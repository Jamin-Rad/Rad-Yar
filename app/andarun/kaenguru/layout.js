export const metadata = {
  applicationName: 'Känguru',
  manifest: '/kanguru/manifest.webmanifest?v=1',
  appleWebApp: {
    capable: true,
    title: 'Känguru',
    statusBarStyle: 'default',
  },
  icons: {
    icon: [{ url: '/kanguru/kanguru-app-icon.png', sizes: '1254x1254', type: 'image/png' }],
    apple: [{ url: '/kanguru/kanguru-app-icon.png', sizes: '1254x1254', type: 'image/png' }],
  },
  other: { 'mobile-web-app-capable': 'yes' },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#eef8ff',
}

export default function KaenguruLayout({ children }) {
  return children
}
