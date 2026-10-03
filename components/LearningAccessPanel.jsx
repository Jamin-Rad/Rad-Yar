'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './LearningAccessPanel.module.css'

const COPY = {
  de: {
    sign_in: {
      title: 'Melde dich an, um weiterzulernen',
      text: 'Lektionen und Übungen sind für RadYar-Mitglieder reserviert. Die Mitgliedschaft ist kostenlos.',
      cta: 'Anmelden oder registrieren',
    },
    pro: {
      title: 'Für diese Inhalte brauchst du Pro',
      textWelcome: 'Du kannst als neues Mitglied sechs Monate kostenlosen Pro-Zugang anfragen.',
      textRenewal: 'Dein Pro-Zugang ist abgelaufen. Du kannst eine kostenlose Verlängerung um drei Monate anfragen.',
      ctaWelcome: '6 Monate Pro anfragen',
      ctaRenewal: '3 Monate verlängern',
    },
    early_access: {
      title: 'Diese Lektion wird noch fertiggestellt',
      text: 'Pro-Mitglieder können Frühzugriff anfragen. Nach deiner Anfrage prüft der Administrator die Freigabe.',
      cta: 'Frühzugriff anfragen',
    },
    pending: 'Deine Anfrage wurde gesendet und wartet auf Freigabe.',
    approved: 'Deine Anfrage wurde freigegeben. Bitte lade die Seite neu.',
    rejected: 'Die letzte Anfrage wurde nicht freigegeben. Du kannst eine neue Anfrage senden.',
    success: 'Anfrage gespeichert. Der Administrator wurde benachrichtigt.',
    emailFallback: 'Anfrage gespeichert. Die E-Mail-Benachrichtigung konnte gerade nicht versendet werden.',
    error: 'Die Anfrage konnte nicht gesendet werden. Bitte versuche es später erneut.',
    sending: 'Wird gesendet…',
    back: 'Zur Themenübersicht',
  },
  en: {
    sign_in: {
      title: 'Sign in to continue learning',
      text: 'Lessons and exercises are reserved for RadYar members. Membership is free.',
      cta: 'Sign in or register',
    },
    pro: {
      title: 'Pro is required for this content',
      textWelcome: 'As a new member, you can request six months of free Pro access.',
      textRenewal: 'Your Pro access has expired. You can request a free three-month extension.',
      ctaWelcome: 'Request 6 months Pro',
      ctaRenewal: 'Extend for 3 months',
    },
    early_access: {
      title: 'This lesson is still being completed',
      text: 'Pro members can request early access. An administrator will review your request.',
      cta: 'Request early access',
    },
    pending: 'Your request was sent and is awaiting approval.',
    approved: 'Your request was approved. Please reload the page.',
    rejected: 'Your last request was not approved. You can submit a new request.',
    success: 'Request saved. The administrator has been notified.',
    emailFallback: 'Request saved. The email notification could not be sent right now.',
    error: 'The request could not be sent. Please try again later.',
    sending: 'Sending…',
    back: 'Back to topics',
  },
  fa: {
    sign_in: {
      title: 'برای ادامه یادگیری وارد شوید',
      text: 'درس‌ها و تمرین‌ها مخصوص اعضای رادیار هستند. عضویت رایگان است.',
      cta: 'ورود یا ثبت‌نام',
    },
    pro: {
      title: 'برای این محتوا به دسترسی Pro نیاز دارید',
      textWelcome: 'به‌عنوان عضو جدید می‌توانید شش ماه دسترسی رایگان Pro درخواست کنید.',
      textRenewal: 'دسترسی Pro شما پایان یافته است. می‌توانید سه ماه تمدید رایگان درخواست کنید.',
      ctaWelcome: 'درخواست ۶ ماه Pro',
      ctaRenewal: 'تمدید رایگان ۳ ماهه',
    },
    early_access: {
      title: 'این درس هنوز در حال تکمیل است',
      text: 'اعضای Pro می‌توانند درخواست دسترسی زودهنگام بدهند. مدیر درخواست شما را بررسی می‌کند.',
      cta: 'درخواست دسترسی زودهنگام',
    },
    pending: 'درخواست شما ارسال شده و منتظر تأیید است.',
    approved: 'درخواست شما تأیید شده است. صفحه را دوباره بارگذاری کنید.',
    rejected: 'درخواست قبلی تأیید نشد. می‌توانید دوباره درخواست بدهید.',
    success: 'درخواست ثبت شد و به مدیر اطلاع داده شد.',
    emailFallback: 'درخواست ثبت شد، اما ارسال اعلان ایمیلی فعلاً ممکن نبود.',
    error: 'ارسال درخواست ممکن نبود. لطفاً بعداً دوباره تلاش کنید.',
    sending: 'در حال ارسال…',
    back: 'بازگشت به موضوعات',
  },
}

export default function LearningAccessPanel({ kind, pathname, requestKind = 'welcome', requestStatus }) {
  const { lang } = useLanguage()
  const t = COPY[lang] || COPY.de
  const isRTL = lang === 'fa'
  const [state, setState] = useState(requestStatus || 'idle')
  const [message, setMessage] = useState('')

  const config = t[kind]
  const isPending = state === 'pending'
  const title = config.title
  const text = kind === 'pro'
    ? (requestKind === 'renewal' ? config.textRenewal : config.textWelcome)
    : config.text
  const cta = kind === 'pro'
    ? (requestKind === 'renewal' ? config.ctaRenewal : config.ctaWelcome)
    : config.cta

  async function requestAccess() {
    setState('sending')
    setMessage('')
    try {
      const response = await fetch('/api/access-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: kind === 'pro' ? 'pro' : 'early_access',
          pathname,
          title: document.title,
        }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || t.error)
      setState('pending')
      setMessage(data.emailSent === false ? t.emailFallback : t.success)
    } catch (error) {
      setState('error')
      setMessage(error.message || t.error)
    }
  }

  return (
    <main className={styles.page} dir={isRTL ? 'rtl' : 'ltr'}>
      <section className={styles.panel}>
        <div className={`${styles.icon} ${kind === 'early_access' ? styles.iconEarly : ''}`} aria-hidden="true">
          {kind === 'sign_in' ? '↗' : kind === 'pro' ? 'P' : '◷'}
        </div>
        <h1>{title}</h1>
        <p>{text}</p>

        {kind === 'sign_in' ? (
          <Link className={styles.primaryButton} href={`/sign-in?redirect_url=${encodeURIComponent(pathname || '/lernen')}`}>{config.cta}</Link>
        ) : isPending ? (
          <div className={styles.status} role="status">{t.pending}</div>
        ) : (
          <button className={styles.primaryButton} type="button" onClick={requestAccess} disabled={state === 'sending'}>
            {state === 'sending' ? t.sending : cta}
          </button>
        )}

        {state === 'approved' ? <div className={styles.status} role="status">{t.approved}</div> : null}
        {state === 'rejected' ? <div className={styles.statusMuted}>{t.rejected}</div> : null}
        {message ? <div className={state === 'error' ? styles.error : styles.notice} role="status">{message}</div> : null}
        <Link className={styles.backLink} href="/lernen">{t.back}</Link>
      </section>
    </main>
  )
}
