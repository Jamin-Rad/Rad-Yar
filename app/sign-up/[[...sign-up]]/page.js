'use client'

import { useState } from 'react'
import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from '@/components/AuthLayout.module.css'

/* ── Daten ─────────────────────────────────────────── */
const FACHRICHTUNGEN = {
  de: ['Radiologie','Allgemeinmedizin','Chirurgie','Innere Medizin','Neurologie','Pädiatrie','Andere'],
  en: ['Radiology','General Medicine','Surgery','Internal Medicine','Neurology','Paediatrics','Other'],
  fa: ['رادیولوژی','پزشکی عمومی','جراحی','داخلی','نورولوژی','اطفال','سایر'],
}

const STUFEN = {
  de: ['Medizinstudent/in','PJ (Praktisches Jahr)','Assistenzarzt/-ärztin','Facharzt/-ärztin','Oberarzt/-ärztin','Andere'],
  en: ['Medical student','Final year (PJ)','Resident','Specialist','Senior physician','Other'],
  fa: ['دانشجوی پزشکی','کارآموز (PJ)','دستیار','متخصص','فوق تخصص','سایر'],
}

const T = {
  de: {
    heading1:     'Konto erstellen',
    sub1:         'Tritt der RadYar-Community bei.',
    heading2:     'Fast geschafft!',
    sub2:         (email) => `Wir haben einen Code an ${email} gesendet.`,
    spitzname:    'Spitzname',
    spitznamePh:  'Wie sollen wir dich nennen?',
    email:        'E-Mail-Adresse',
    password:     'Passwort',
    passwordHint: 'Mindestens 8 Zeichen',
    fachrichtung: 'Fachrichtung',
    stufe:        'Ausbildungsstufe',
    select:       '– Bitte wählen –',
    next:         'Weiter',
    loading:      'Bitte warten…',
    verify:       'Code bestätigen',
    verifying:    'Wird geprüft…',
    codePh:       '6-stelliger Code',
    resend:       'Code erneut senden',
    hasAccount:   'Bereits ein Konto?',
    signIn:       'Anmelden',
    errDefault:   'Ein Fehler ist aufgetreten. Bitte versuche es erneut.',
    step1:        'Profil', step2: 'Bestätigung',
  },
  en: {
    heading1:     'Create account',
    sub1:         'Join the RadYar community.',
    heading2:     'Almost there!',
    sub2:         (email) => `We sent a code to ${email}.`,
    spitzname:    'Nickname',
    spitznamePh:  'What should we call you?',
    email:        'Email address',
    password:     'Password',
    passwordHint: 'At least 8 characters',
    fachrichtung: 'Specialty',
    stufe:        'Training level',
    select:       '– Please select –',
    next:         'Continue',
    loading:      'Please wait…',
    verify:       'Verify code',
    verifying:    'Verifying…',
    codePh:       '6-digit code',
    resend:       'Resend code',
    hasAccount:   'Already have an account?',
    signIn:       'Sign in',
    errDefault:   'Something went wrong. Please try again.',
    step1:        'Profile', step2: 'Verification',
  },
  fa: {
    heading1:     'ساخت حساب',
    sub1:         'به جامعه رادیار بپیوند.',
    heading2:     'تقریباً تموم شد!',
    sub2:         (email) => `یک کد به ${email} فرستادیم.`,
    spitzname:    'اسم مستعار',
    spitznamePh:  'چی صدات کنیم؟',
    email:        'آدرس ایمیل',
    password:     'رمز عبور',
    passwordHint: 'حداقل ۸ کاراکتر',
    fachrichtung: 'تخصص',
    stufe:        'مرحله تحصیلی',
    select:       '– انتخاب کن –',
    next:         'ادامه',
    loading:      'لطفاً صبر کن…',
    verify:       'تأیید کد',
    verifying:    'در حال بررسی…',
    codePh:       'کد ۶ رقمی',
    resend:       'ارسال مجدد کد',
    hasAccount:   'قبلاً حساب داری؟',
    signIn:       'ورود',
    errDefault:   'خطایی رخ داد. دوباره امتحان کن.',
    step1:        'پروفایل', step2: 'تأیید',
  },
}

function HexLogo() {
  return (
    <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" fill="url(#suLogoBg)" />
      <path d="M13.8 8.6A20.2 20.2 0 0 1 39 13.3" stroke="url(#suLogoArc)" strokeWidth="2.7" strokeLinecap="round"/>
      <path d="M39.8 13.9A20.1 20.1 0 0 1 40.2 33.6" stroke="#f97316" strokeWidth="2.7" strokeLinecap="round"/>
      <circle cx="39.8" cy="14" r="3.2" fill="#ff8a1d"/>
      <text x="17.1" y="31.8" fill="#fff" fontSize="24" fontWeight="900" fontFamily="system-ui" letterSpacing="-.9">R</text>
      <text x="27.1" y="32.2" fill="#f97316" fontSize="23" fontWeight="900" fontFamily="system-ui" letterSpacing="-.8">Y</text>
      <defs>
        <radialGradient id="suLogoBg" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(16 12) rotate(50) scale(38)">
          <stop stopColor="#102a44"/><stop offset=".62" stopColor="#071a2f"/><stop offset="1" stopColor="#020617"/>
        </radialGradient>
        <linearGradient id="suLogoArc" x1="11" y1="8" x2="42" y2="15" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff"/><stop offset="1" stopColor="#f97316"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function SignUpPage() {
  const { lang } = useLanguage()
  const t   = T[lang] ?? T.de
  const dir = lang === 'fa' ? 'rtl' : 'ltr'

  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [step,         setStep]         = useState(1)
  const [spitzname,    setSpitzname]    = useState('')
  const [email,        setEmail]        = useState('')
  const [password,     setPassword]     = useState('')
  const [fachrichtung, setFachrichtung] = useState('')
  const [stufe,        setStufe]        = useState('')
  const [code,         setCode]         = useState('')
  const [error,        setError]        = useState('')
  const [loading,      setLoading]      = useState(false)

  /* Schritt 1: Konto anlegen + Email-Verifizierung starten */
  async function handleRegister(e) {
    e.preventDefault()
    if (!isLoaded) return
    setLoading(true)
    setError('')
    try {
      await signUp.create({
        emailAddress: email,
        password,
        firstName: spitzname,
        unsafeMetadata: { fachrichtung, ausbildungsstufe: stufe },
      })
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setStep(2)
    } catch (err) {
      setError(err?.errors?.[0]?.message ?? t.errDefault)
    } finally {
      setLoading(false)
    }
  }

  /* Schritt 2: Code bestätigen */
  async function handleVerify(e) {
    e.preventDefault()
    if (!isLoaded) return
    setLoading(true)
    setError('')
    try {
      const result = await signUp.attemptEmailAddressVerification({ code })
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

  async function handleResend() {
    try { await signUp.prepareEmailAddressVerification({ strategy: 'email_code' }) }
    catch (_) {}
  }

  const fachList = FACHRICHTUNGEN[lang] ?? FACHRICHTUNGEN.de
  const stufeList = STUFEN[lang] ?? STUFEN.de

  return (
    <div className={styles.page}>
      <div className={styles.card} dir={dir}>

        {/* Logo */}
        <div className={styles.logoRow}>
          <HexLogo />
          <div className={styles.wordmark}>
            <span className={styles.rad}>RAD</span>
            <span className={styles.yar}>YAR</span>
          </div>
        </div>

        {/* Step indicator */}
        <div className={styles.steps}>
          <div className={`${styles.step} ${step >= 1 ? styles.stepActive : ''} ${step > 1 ? styles.stepDone : ''}`}>
            {step > 1 ? '✓' : '1'}
          </div>
          <div className={`${styles.stepLine} ${step > 1 ? styles.stepLineDone : ''}`} />
          <div className={`${styles.step} ${step >= 2 ? styles.stepActive : ''}`}>2</div>
        </div>

        <div className={styles.divider} />

        {/* ── SCHRITT 1: Profil ── */}
        {step === 1 && (
          <>
            <h1 className={styles.heading}>{t.heading1}</h1>
            <p className={styles.sub}>{t.sub1}</p>
            <form className={styles.form} onSubmit={handleRegister}>
              {error && <div className={styles.error}>{error}</div>}

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t.spitzname}</label>
                <input className={styles.input} type="text" value={spitzname}
                  onChange={e => setSpitzname(e.target.value)}
                  placeholder={t.spitznamePh} required autoComplete="nickname" />
              </div>

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
                  placeholder="••••••••" required minLength={8}
                  autoComplete="new-password" />
                <span style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{t.passwordHint}</span>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t.fachrichtung}</label>
                <select className={styles.select} value={fachrichtung}
                  onChange={e => setFachrichtung(e.target.value)} required>
                  <option value="">{t.select}</option>
                  {fachList.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t.stufe}</label>
                <select className={styles.select} value={stufe}
                  onChange={e => setStufe(e.target.value)} required>
                  <option value="">{t.select}</option>
                  {stufeList.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <button className={styles.submitBtn} type="submit"
                disabled={loading || !email || !password || !spitzname || !fachrichtung || !stufe}>
                {loading ? t.loading : t.next}
              </button>
            </form>
          </>
        )}

        {/* ── SCHRITT 2: Verifizierung ── */}
        {step === 2 && (
          <>
            <h1 className={styles.heading}>{t.heading2}</h1>
            <p className={styles.sub}>{t.sub2(email)}</p>
            <form className={styles.form} onSubmit={handleVerify}>
              {error && <div className={styles.error}>{error}</div>}

              <div className={styles.fieldGroup}>
                <input
                  className={`${styles.input} ${styles.codeInput}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={code}
                  onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder={t.codePh}
                  required
                  autoFocus
                />
              </div>

              <button className={styles.submitBtn} type="submit"
                disabled={loading || code.length < 6}>
                {loading ? t.verifying : t.verify}
              </button>

              <button type="button" className={styles.resendBtn} onClick={handleResend}>
                {t.resend}
              </button>
            </form>
          </>
        )}

        <p className={styles.footerText}>
          {t.hasAccount}{' '}
          <Link href="/sign-in" className={styles.footerLink}>{t.signIn}</Link>
        </p>

      </div>
    </div>
  )
}
