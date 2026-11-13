import localFont from 'next/font/local'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { LanguageProvider } from '@/providers/LanguageProvider'
import RobotAssistant from '@/components/RobotAssistant'
import ActivityTracker from '@/components/ActivityTracker'
import AdminCopyMode from '@/components/AdminCopyMode'
import LehrMode from '@/components/LehrMode'
import LegalNotice from '@/components/LegalNotice'
import ImageLightbox from '@/components/ImageLightbox'
import LessonEnhancer from '@/components/LessonEnhancer'
import LessonPdfExport from '@/components/LessonPdfExport'
import HomeScene from '@/components/HomeScene'

const fraunces = localFont({
  src: [
    { path: '../public/fonts/Fraunces-normal.woff2', weight: '100 900', style: 'normal' },
    { path: '../public/fonts/Fraunces-italic.woff2', weight: '100 900', style: 'italic' }
  ],
  variable: '--font-fraunces',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
})

const manrope = localFont({
  src: [
    { path: '../public/fonts/Manrope-normal.woff2', weight: '200 800', style: 'normal' }
  ],
  variable: '--font-manrope',
  display: 'swap',
  adjustFontFallback: 'Arial',
})

const newsreader = localFont({
  src: [
    { path: '../public/fonts/Newsreader-normal.woff2', weight: '200 800', style: 'normal' },
    { path: '../public/fonts/Newsreader-italic.woff2', weight: '200 800', style: 'italic' }
  ],
  variable: '--font-newsreader',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
})

const inter = localFont({
  src: [
    { path: '../public/fonts/Inter-normal.woff2', weight: '100 900', style: 'normal' }
  ],
  variable: '--font-inter',
  display: 'swap',
  adjustFontFallback: 'Arial',
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
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'RadYar',
    statusBarStyle: 'default',
  },
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
  // Nested calculator layouts override these defaults with their own identity.
  icons: {
    icon: [
      { url: '/radyar/radyar-galaxy-icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/radyar/radyar-galaxy-icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/radyar/radyar-galaxy-icon-32.png',
    apple: [{ url: '/radyar/radyar-galaxy-icon-180.png', sizes: '180x180', type: 'image/png' }],
  },
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/"
    >
      <html lang="de" data-theme="dark" data-scroll-behavior="smooth" suppressHydrationWarning>
        <head>
          {/*
            Blocking Script: läuft synchron VOR dem ersten Paint.
            - Liest ein gespeichertes Theme aus localStorage
            - Verwendet ohne gespeicherte Auswahl standardmäßig Dark
          */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function () {
                  try {
                    var stored = localStorage.getItem('radyar-theme');
                    var theme = (stored === 'dark' || stored === 'light') ? stored : 'dark';
                    document.documentElement.dataset.theme = theme;
                    document.documentElement.style.colorScheme = theme;
                  } catch (e) {
                    document.documentElement.dataset.theme = 'dark';
                  }
                })();
              `,
            }}
          />
        </head>
        <body className={`${fraunces.variable} ${manrope.variable} ${newsreader.variable} ${inter.variable}`}>
          <ThemeProvider>
            <LanguageProvider>
              <ActivityTracker />
              <AdminCopyMode />
              <LehrMode />
              <LessonEnhancer />
              <LessonPdfExport />
              <HomeScene />
              {children}
              <ImageLightbox />
              <RobotAssistant />
              <LegalNotice />
            </LanguageProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
