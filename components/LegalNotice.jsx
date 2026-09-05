'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './LegalNotice.module.css'

export const PRIVACY_CHOICE_KEY = 'radyar_privacy_choice_v1'
export const PRIVACY_CHOICE_VERSION = '2026-09-05'
export const PRIVACY_CHOICE_EVENT = 'radyar:privacy-choice'

const COPY = {
  de: {
    eyebrow: 'Willkommen bei RadYar',
    title: 'Wichtige Hinweise vor dem Start',
    text: 'RadYar dient ausschließlich der medizinischen Aus-, Fort- und Weiterbildung. Die Inhalte ersetzen keine individuelle Beratung und dürfen nicht als alleinige Grundlage diagnostischer oder therapeutischer Entscheidungen verwendet werden.',
    privacy: 'Datenschutz', terms: 'Nutzungsbedingungen', medical: 'Medizinischer Hinweis', imprint: 'Impressum',
    analytics: 'Mit deiner Erlaubnis erfassen wir Seitenaufrufe und Nutzungsdauer, um RadYar zu verbessern. Ohne Erlaubnis bleibt diese Analyse ausgeschaltet.',
    necessary: 'Nur notwendige Funktionen', allow: 'Analyse erlauben', settings: 'Datenschutzeinstellungen',
  },
  en: {
    eyebrow: 'Welcome to RadYar',
    title: 'Important information before you start',
    text: 'RadYar is intended solely for medical education and professional development. Its content is not individual medical advice and must not be used as the sole basis for diagnostic or therapeutic decisions.',
    privacy: 'Privacy', terms: 'Terms of use', medical: 'Medical notice', imprint: 'Legal notice',
    analytics: 'With your permission, we record page views and usage time to improve RadYar. This analytics function stays off without permission.',
    necessary: 'Necessary functions only', allow: 'Allow analytics', settings: 'Privacy settings',
  },
  fa: {
    eyebrow: 'به رادیار خوش آمدید',
    title: 'نکات مهم پیش از شروع',
    text: 'رادیار فقط برای آموزش و توسعه حرفه‌ای پزشکی است. مطالب آن جایگزین مشاوره فردی نیست و نباید تنها مبنای تصمیم‌های تشخیصی یا درمانی قرار گیرد.',
    privacy: 'حریم خصوصی', terms: 'شرایط استفاده', medical: 'راهنمای پزشکی', imprint: 'اطلاعات مسئول سایت',
    analytics: 'با اجازه شما، بازدید صفحات و مدت استفاده برای بهبود رادیار ثبت می‌شود. بدون اجازه، این تحلیل غیرفعال می‌ماند.',
    necessary: 'فقط امکانات ضروری', allow: 'اجازه تحلیل', settings: 'تنظیمات حریم خصوصی',
  },
}

export function readPrivacyChoice() {
  if (typeof window === 'undefined') return null
  try {
    const choice = JSON.parse(window.localStorage.getItem(PRIVACY_CHOICE_KEY) || 'null')
    return choice?.version === PRIVACY_CHOICE_VERSION ? choice : null
  } catch {
    return null
  }
}

export default function LegalNotice() {
  const { lang } = useLanguage()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const primaryButtonRef = useRef(null)
  const copy = COPY[lang] || COPY.de

  useEffect(() => {
    const showSettings = () => setOpen(true)
    window.addEventListener('radyar:open-privacy-settings', showSettings)
    if (pathname !== '/ueber-radyar' && !readPrivacyChoice()) setOpen(true)
    return () => window.removeEventListener('radyar:open-privacy-settings', showSettings)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    primaryButtonRef.current?.focus()
    return () => { document.body.style.overflow = previousOverflow }
  }, [open])

  const saveChoice = analytics => {
    const choice = { version: PRIVACY_CHOICE_VERSION, analytics, decidedAt: new Date().toISOString() }
    window.localStorage.setItem(PRIVACY_CHOICE_KEY, JSON.stringify(choice))
    if (!analytics) {
      window.localStorage.removeItem('radyar_visitor_id')
      window.sessionStorage.removeItem('radyar_analytics_session')
    }
    window.dispatchEvent(new CustomEvent(PRIVACY_CHOICE_EVENT, { detail: choice }))
    setOpen(false)
  }

  if (!open) return null

  return (
    <div className={styles.overlay} role="presentation">
      <section className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="legal-notice-title" dir={lang === 'fa' ? 'rtl' : 'ltr'}>
        <div className={styles.icon} aria-hidden="true">RY</div>
        <p className={styles.eyebrow}>{copy.eyebrow}</p>
        <h2 id="legal-notice-title">{copy.title}</h2>
        <p className={styles.text}>{copy.text}</p>
        <nav className={styles.links} aria-label={copy.title}>
          <Link href="/ueber-radyar#medical-notice" onClick={() => setOpen(false)}>{copy.medical}</Link>
          <Link href="/ueber-radyar#terms" onClick={() => setOpen(false)}>{copy.terms}</Link>
          <Link href="/ueber-radyar#privacy" onClick={() => setOpen(false)}>{copy.privacy}</Link>
          <Link href="/ueber-radyar#imprint" onClick={() => setOpen(false)}>{copy.imprint}</Link>
        </nav>
        <p className={styles.analytics}>{copy.analytics}</p>
        <div className={styles.actions}>
          <button ref={primaryButtonRef} type="button" className={styles.secondary} onClick={() => saveChoice(false)}>{copy.necessary}</button>
          <button type="button" className={styles.primary} onClick={() => saveChoice(true)}>{copy.allow}</button>
        </div>
      </section>
    </div>
  )
}

export { COPY as LEGAL_NOTICE_COPY }
