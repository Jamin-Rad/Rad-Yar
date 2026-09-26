export const metadata = {
  applicationName: 'داروی من',
  appleWebApp: {
    capable: true,
    title: 'داروی من',
    statusBarStyle: 'default',
  },
  icons: {
    icon: '/andarun/andarun-icon-192.png',
    apple: '/andarun/andarun-apple-touch-icon.png',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#2f755f',
}

export default function Layout({ children }) {
  return children
}
