import { Fraunces, Manrope } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/providers/ThemeProvider'

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-fraunces',
  style: ['normal', 'italic'],
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
})

export const metadata = {
  title: 'RadYar – Your Guide in Radiology Education',
  description: 'Strukturiertes Wissen, klinische Fälle und Prüfungsvorbereitung für Radiologinnen und Radiologen.',
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="de" data-theme="light" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var theme = localStorage.getItem('radyar-theme');
                  if (theme !== 'dark' && theme !== 'light') theme = 'light';
                  document.documentElement.dataset.theme = theme;
                  document.documentElement.style.colorScheme = theme;
                } catch (e) {
                  document.documentElement.dataset.theme = 'light';
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${fraunces.variable} ${manrope.variable}`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
