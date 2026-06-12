import { Fraunces, Manrope } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { LanguageProvider } from '@/providers/LanguageProvider'
import RobotAssistant from '@/components/RobotAssistant'
import ActivityTracker from '@/components/ActivityTracker'

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
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/"
    >
      <html lang="de" data-theme="light" suppressHydrationWarning>
        <head>
          <link
            href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
          {/*
            Blocking Script: läuft synchron VOR dem ersten Paint.
            - Liest gespeichertes Theme aus localStorage
            - Fällt auf prefers-color-scheme zurück → kein FOUC mehr
          */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function () {
                  try {
                    var stored = localStorage.getItem('radyar-theme');
                    var system = window.matchMedia('(prefers-color-scheme: dark)').matches
                      ? 'dark' : 'light';
                    var theme = (stored === 'dark' || stored === 'light') ? stored : system;
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
          <ThemeProvider>
            <LanguageProvider>
              <ActivityTracker />
              {children}
              <RobotAssistant />
            </LanguageProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
