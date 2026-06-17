import { Fraunces, Manrope } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { LanguageProvider } from '@/providers/LanguageProvider'
import RobotAssistant from '@/components/RobotAssistant'
import ActivityTracker from '@/components/ActivityTracker'
import AdminCopyMode from '@/components/AdminCopyMode'

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'RadYar | Learn Radiology',
  description: 'Structured knowledge, clinical cases, and exam preparation for radiologists.',
  applicationName: 'RadYar',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'RadYar | Learn Radiology',
    description: 'Structured knowledge, clinical cases, and exam preparation for radiologists.',
    url: '/',
    siteName: 'RadYar',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RadYar | Learn Radiology',
    description: 'Structured knowledge, clinical cases, and exam preparation for radiologists.',
  },
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
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
              <AdminCopyMode />
              {children}
              <RobotAssistant />
            </LanguageProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
