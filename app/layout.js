import { Fraunces, Manrope } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { LanguageProvider } from '@/providers/LanguageProvider'
import RobotAssistant from '@/components/RobotAssistant'
import ActivityTracker from '@/components/ActivityTracker'
import AdminCopyMode from '@/components/AdminCopyMode'
import LegalNotice from '@/components/LegalNotice'
import LessonPreviewNotice from '@/components/LessonPreviewNotice'
import ImageLightbox from '@/components/ImageLightbox'

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
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: [{ url: '/radyar/radyar-apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
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
          <link
            href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
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
        <body className={`${fraunces.variable} ${manrope.variable}`}>
          <ThemeProvider>
            <LanguageProvider>
              <ActivityTracker />
              <AdminCopyMode />
              <LessonPreviewNotice />
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
