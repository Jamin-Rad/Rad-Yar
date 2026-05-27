import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
})

export const metadata = {
  title: 'RadYar – Your Guide in Radiology Education',
  description:
    'Strukturiertes Wissen, klinische Fälle und Prüfungsvorbereitung für Radiologinnen und Radiologen.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className={`${syne.variable} ${dmSans.variable}`}>
        {children}
      </body>
    </html>
  )
}
