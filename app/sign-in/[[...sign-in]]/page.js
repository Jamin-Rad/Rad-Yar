'use client'

import { useState } from 'react'
import { useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from '@/components/AuthLayout.module.css'

const SOCIAL = {
  de: { google: 'Mit Google anmelden', apple: 'Mit Apple anmelden', or: 'oder' },
  en: { google: 'Sign in with Google', apple: 'Sign in with Apple', or: 'or' },
  fa: { google: 'ورود با گوگل', apple: 'ورود با اپل', or: 'یا' },
}

const T = {
  de: {
    heading:    'Willkommen zurück',
    sub:        'Melde dich an, um deinen Fortschritt zu sehen.',
    email:      'E-Mail-Adresse',
    password:   'Passwort',
    submit:     'Anmelden',
    loading:    'Wird angemeldet…',
    noAccount:  'Noch kein Konto?',
    register:   'Jetzt registrieren',
    errDefault: 'Anmeldung fehlgeschlagen. Bitte prüfe deine Eingaben.',
  },
  en: {
    heading:    'Welcome back',
    sub:        'Sign in to access your learning progress.',
    email:      'Email address',
    password:   'Password',
    submit:     'Sign in',
    loading:    'Signing in…',
    noAccount:  'No account yet?',
    register:   'Create account',
    errDefault: 'Sign in failed. Please check your details.',
  },
  fa: {
    heading:    'خوش برگشتی',
    sub:        'وارد شو تا پیشرفتت رو ببینی.',
    email:      'آدرس ایمیل',
    password:   'رمز عبور',
    submit:     'ورود',
    loading:    'در حال ورود…',
    noAccount:  'هنوز حساب نداری؟',
    register:   'ثبت‌نام کن',
    errDefault: 'ورود ناموفق بود. اطلاعات را بررسی کن.',
  },
}

function HexLogo() {
  return (
    <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" fill="url(#authLogoBg)" />
      <path d="M13.8 8.6A20.2 20.2 0 0 1 39 13.3" stroke="url(#authLogoArc)" strokeWidth="2.7" strokeLinecap="round"/>
      <path d="M39.8 13.9A20.1 20.1 0 0 1 40.2 33.6" stroke="#f97316" strokeWidth="2.7" strokeLinecap="round"/>
      <circle cx="39.8" cy="14" r="3.2" fill="#ff8a1d"/>
      <text x="17.1" y="31.8" fill="#fff" fontSize="24" fontWeight="900" fontFamily="system-ui" letterSpacing="-.9">R</text>
      <text x="27.1" y="32.2" fill="#f97316" fontSize="23" fontWeight="900" fontFamily="system-ui" letterSpacing="-.8">Y</text>
      <defs>
        <radialGradient id="authLogoBg" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(16 12) rotate(50) scale(38)">
          <stop stopColor="#102a44"/><stop offset=".62" stopColor="#071a2f"/><stop offset="1" stopColor="#020617"/>
        </radialGradient>
        <linearGradient id="authLogoArc" x1="11" y1="8" x2="42" y2="15" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff"/><stop offset="1" stopColor="#f97316"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function SignInPage() {
  const { lang } = useLanguage()
  const t   = T[lang] ?? T.de
  const s   = SOCIAL[lang] ?? SOCIAL.de
  const dir = lang === 'fa' ? 'rtl' : 'ltr'

  const { isLoaded, signIn, setActive } = useSignIn()
  const router = useRouter()

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!isLoaded) return
    setLoading(true)
    setError('')
    try {
      // Schritt 1: Nur E-Mail senden
      const attempt = await signIn.create({ identifier: email })

      if (attempt.status === 'needs_first_factor') {
        // Schritt 2: Passwort separat senden
        const result = await signIn.attemptFirstFactor({
          strategy: 'password',
          password,
        })
        if (result.status === 'complete') {
          await setActive({ session: result.createdSessionId })
          router.push('/')
        } else {
          setError(`Status: ${result.status} — ${t.errDefault}`)
        }
      } else if (attempt.status === 'complete') {
        await setActive({ session: attempt.createdSessionId })
        router.push('/')
      } else {
        setError(`Status: ${attempt.status} — ${t.errDefault}`)
      }
    } catch (err) {
      const msg = err?.errors?.[0]?.longMessage
        || err?.errors?.[0]?.message
        || err?.message
        || t.errDefault
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  async function handleSocial(provider) {
    if (!isLoaded) return
    try {
      await signIn.authenticateWithRedirect({
        strategy: `oauth_${provider}`,
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/',
      })
    } catch (err) {
      setError(err?.errors?.[0]?.message ?? t.errDefault)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card} dir={dir}>
        <div className={styles.logoRow}>
          <HexLogo />
          <div className={styles.wordmark}>
            <span className={styles.rad}>RAD</span>
            <span className={styles.yar}>YAR</span>
          </div>
        </div>
        <div className={styles.divider} />
        <h1 className={styles.heading}>{t.heading}</h1>
        <p className={styles.sub}>{t.sub}</p>

        {/* Social Login Buttons */}
        <div className={styles.socialBtns}>
          <button className={styles.socialBtn} type="button" onClick={() => handleSocial('google')}>
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            {s.google}
          </button>
          <button className={styles.socialBtn} type="button" onClick={() => handleSocial('apple')}>
            <svg width="18" height="18" viewBox="0 0 814 1000" fill="currentColor">
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 376.6 0 249.1 0 128.4 0 56.9 31.4 -1.4 88.9-47.4c52.9-41.7 117-65.9 183.4-65.9 69.3 0 126.8 27.2 170.2 27.2 41.3 0 105.5-29.5 183.4-29.5zM532.6 47.4c36.6-43.9 63.1-105.5 63.1-167.1 0-8.3-.6-16.6-2-24.9-59.9 2.3-130.8 40.3-172.9 89.9-33.2 37.6-64.5 99.2-64.5 161.4 0 9 1.4 17.9 2.3 20.8 3.7.6 9.7 1.4 15.7 1.4 53.7 0 120.1-36 158.3-81.5z"/>
            </svg>
            {s.apple}
          </button>
        </div>

        <div className={styles.orDivider}>
          <span className={styles.orLine} />
          <span className={styles.orText}>{s.or}</span>
          <span className={styles.orLine} />
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {error && (
            <div className={styles.error}>
              <span>{error}</span>
              <button
                type="button"
                onClick={() => setError('')}
                style={{ background:'none', border:'none', cursor:'pointer', color:'#b91c1c', fontWeight:700, fontSize:16, lineHeight:1, padding:'0 0 0 8px', flexShrink:0 }}
              >×</button>
            </div>
          )}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>{t.email}</label>
            <input className={styles.input} type="email" value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="name@beispiel.de" required autoComplete="email" />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>{t.password}</label>
            <input className={styles.input} type="password" value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••" required autoComplete="current-password" />
          </div>
          <button className={styles.submitBtn} type="submit"
            disabled={loading || !email || !password}>
            {loading ? t.loading : t.submit}
          </button>
        </form>
        <p className={styles.footerText}>
          {t.noAccount}{' '}
          <Link href="/sign-up" className={styles.footerLink}>{t.register}</Link>
        </p>
      </div>
    </div>
  )
}
