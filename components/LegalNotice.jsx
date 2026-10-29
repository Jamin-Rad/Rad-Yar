'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import styles from './LegalNotice.module.css'

export const PRIVACY_CHOICE_KEY = 'radyar_privacy_choice_v1'
export const PRIVACY_CHOICE_VERSION = '2026-09-05'
export const PRIVACY_CHOICE_EVENT = 'radyar:privacy-choice'

const AUTOMATIC_NOTICE_EXCLUDED_PREFIXES = [
  '/mamma/rechner',
  '/design-lab',
  '/andarun',
  '/mobin/kaenguru',
]

function excludesAutomaticNotice(pathname) {
  return AUTOMATIC_NOTICE_EXCLUDED_PREFIXES.some(prefix => (
    pathname === prefix || pathname?.startsWith(`${prefix}/`)
  ))
}

const COPY = {
  de: {
    eyebrow: 'Willkommen bei RadYar',
    title: 'Kurz vor dem Start',
    text: 'RadYar dient ausschließlich dem Lernen und Üben. Die Inhalte und Werkzeuge sind keine medizinische Beratung und dürfen nicht als Grundlage für klinische Entscheidungen, Diagnosen oder Behandlungen verwendet werden. Inhalte können fehlerhaft, unvollständig oder veraltet sein.',
    analytics: 'Mit deiner Zustimmung erfassen wir anonym Seitenaufrufe und Nutzungsdauer, um RadYar zu verbessern. Deine Eingaben und Berechnungsergebnisse bleiben privat und werden nicht gespeichert.',
    necessary: 'Nur notwendige', allow: 'Zustimmen', settings: 'Datenschutzeinstellungen',
  },
  en: {
    eyebrow: 'Welcome to RadYar',
    title: 'Before you start',
    text: 'RadYar is for learning and practice only. Its content and tools do not provide medical advice and must not be used as the basis for clinical decisions, diagnosis or treatment. Content may be inaccurate, incomplete or out of date.',
    analytics: 'With your consent, we anonymously record page views and usage time to improve RadYar. Your inputs and calculation results remain private and are not stored.',
    necessary: 'Necessary only', allow: 'Agree', settings: 'Privacy settings',
  },
  fa: {
    eyebrow: 'به رادیار خوش آمدید',
    title: 'پیش از شروع',
    text: 'رادیار صرفاً برای یادگیری و تمرین است. محتوا و ابزارهای آن توصیه پزشکی ارائه نمی‌کنند و نباید مبنای تصمیم‌گیری بالینی، تشخیص یا درمان قرار بگیرند. محتوا ممکن است نادرست، ناقص یا قدیمی باشد.',
    analytics: 'با موافقت شما، بازدید صفحات و مدت استفاده به‌صورت ناشناس برای بهبود رادیار ثبت می‌شود. ورودی‌ها و نتایج محاسبات شما خصوصی می‌مانند و ذخیره نمی‌شوند.',
    necessary: 'فقط ضروری', allow: 'موافقم', settings: 'تنظیمات حریم خصوصی',
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
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const primaryButtonRef = useRef(null)
  const copy = COPY.en

  useEffect(() => {
    const showSettings = () => setOpen(true)
    window.addEventListener('radyar:open-privacy-settings', showSettings)
    if (excludesAutomaticNotice(pathname)) {
      setOpen(false)
    } else if (pathname !== '/ueber-radyar' && !readPrivacyChoice()) {
      setOpen(true)
    }
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
    <div className={styles.overlay} role="presentation" data-print-exclude>
      <section className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="legal-notice-title" dir="ltr" lang="en">
        <div className={styles.icon} aria-hidden="true">RY</div>
        <p className={styles.eyebrow}>{copy.eyebrow}</p>
        <h2 id="legal-notice-title">{copy.title}</h2>
        <p className={styles.text}>{copy.text}</p>
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
