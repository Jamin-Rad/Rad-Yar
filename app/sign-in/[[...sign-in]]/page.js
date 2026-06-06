'use client'

import { useState } from 'react'
import { useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from '@/components/AuthLayout.module.css'

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
      const result = await signIn.create({ identifier: email, password })
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        router.push('/')
      }
    } catch (err) {
      setError(err?.errors?.[0]?.message ?? t.errDefault)
    } finally {
      setLoading(false)
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
        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <div className={styles.error}>{error}</div>}
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
