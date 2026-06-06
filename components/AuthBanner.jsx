'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SignedOut } from '@clerk/nextjs'
import styles from './AuthBanner.module.css'

const T = {
  de: {
    text:    'Kein Konto: Dein Fortschritt wird nur auf diesem Gerät gespeichert und kann verloren gehen.',
    signIn:  'Anmelden',
    signUp:  'Konto erstellen',
  },
  en: {
    text:    'Not signed in: Your progress is only saved on this device and may be lost.',
    signIn:  'Sign in',
    signUp:  'Create account',
  },
  fa: {
    text:    'وارد نشده‌ای: پیشرفتت فقط روی این دستگاه ذخیره می‌شود و ممکن است از بین برود.',
    signIn:  'ورود',
    signUp:  'ساخت حساب',
  },
}

export default function AuthBanner({ lang = 'de' }) {
  const [dismissed, setDismissed] = useState(false)
  const t = T[lang] ?? T.de
  const dir = lang === 'fa' ? 'rtl' : 'ltr'

  if (dismissed) return null

  return (
    <SignedOut>
      <div className={styles.banner} dir={dir}>
        <span className={styles.icon}>⚠️</span>
        <p className={styles.text}>{t.text}</p>
        <div className={styles.actions}>
          <Link href="/sign-in" className={styles.signInBtn}>{t.signIn}</Link>
          <Link href="/sign-up" className={styles.signUpBtn}>{t.signUp}</Link>
        </div>
        <button
          className={styles.dismiss}
          onClick={() => setDismissed(true)}
          aria-label="Schließen"
        >×</button>
      </div>
    </SignedOut>
  )
}
