import NumberedAnswers from './NumberedAnswers'
import StudyTimeTracker from './StudyTimeTracker'

export const metadata = {
  applicationName: 'Mobin',
  manifest: '/mobin/manifest.webmanifest?v=1',
  appleWebApp: { capable: true, title: 'Mobin', statusBarStyle: 'black-translucent' },
  icons: {
    icon: [
      { url: '/mobin/icons/mobin-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/mobin/icons/mobin-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/mobin/icons/mobin-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/mobin/icons/mobin-32.png',
    apple: [{ url: '/mobin/icons/mobin-180.png', sizes: '180x180', type: 'image/png' }],
  },
  other: { 'mobile-web-app-capable': 'yes' },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#172c60',
}

export default function MobinLayout({ children }) {
  return <><NumberedAnswers /><StudyTimeTracker />{children}</>
}
