import { Space_Grotesk } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space',
})

export const metadata = {
  title: 'RadYar – Your Guide in Radiology Education',
  description: 'Strukturiertes Wissen, klinische Fälle und Prüfungsvorbereitung für Radiologinnen und Radiologen.',
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <head>
        {/* IRANSans für persischen Text */}
        <link
          rel="stylesheet"
          href="https://fonts.cdnfonts.com/css/iran-sans"
        />
      </head>
      <body className={spaceGrotesk.variable}>
        {children}
      </body>
    </html>
  )
}
