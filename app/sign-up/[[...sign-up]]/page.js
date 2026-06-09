'use client'

import { useState } from 'react'
import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from '@/components/AuthLayout.module.css'

const SPECIALTIES = ['Radiology','General Medicine','Surgery','Internal Medicine','Neurology','Paediatrics','Other']
const LEVELS      = ['Medical student','Final year (PJ)','Resident','Specialist','Senior physician','Other']

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
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [step,     setStep]     = useState(1)
  const [name,     setName]     = useState('')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [spec,     setSpec]     = useState('')
  const [level,    setLevel]    = useState('')
  const [code,     setCode]     = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  function showError(err) {
    setError(err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message || 'Something went wrong. Please try again.')
  }

  async function handleRegister(e) {
    e.preventDefault()
    if (!isLoaded) return
    setLoading(true); setError('')
    try {
      await signUp.create({
        emailAddress: email,
        password,
        firstName: name,
        unsafeMetadata: { specialty: spec, level },
      })
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setStep(2)
    } catch (err) { showError(err) }
    finally { setLoading(false) }
  }

  async function handleVerify(e) {
    e.preventDefault()
    if (!isLoaded) return
    setLoading(true); setError('')
    try {
      const result = await signUp.attemptEmailAddressVerification({ code })
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        router.push('/')
      }
    } catch (err) { showError(err) }
    finally { setLoading(false) }
  }

  async function handleResend() {
    try { await signUp.prepareEmailAddressVerification({ strategy: 'email_code' }) }
    catch (_) {}
  }

  function ErrorBox() {
    if (!error) return null
    return (
      <div className={styles.error}>
        <span>{error}</span>
        <button type="button" onClick={() => setError('')}
          style={{background:'none',border:'none',cursor:'pointer',color:'#b91c1c',fontWeight:700,fontSize:16,lineHeight:1,padding:'0 0 0 8px',flexShrink:0}}>×</button>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        {/* Close button */}
        <button type="button" onClick={() => router.back()} aria-label="Close"
          style={{position:'absolute',top:16,right:16,background:'none',border:'none',
            cursor:'pointer',color:'#94a3b8',fontSize:24,lineHeight:1,padding:4,borderRadius:8}}>
          ×
        </button>

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

        {/* ── STEP 1: Profile ── */}
        {step === 1 && (
          <>
            <h1 className={styles.heading}>Create account</h1>
            <p className={styles.sub}>Join the RadYar community.</p>
            <form className={styles.form} onSubmit={handleRegister}>
              <ErrorBox />

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Nickname</label>
                <input className={styles.input} type="text" value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="What should we call you?" required autoComplete="nickname" />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Email address</label>
                <input className={styles.input} type="email" value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@example.com" required autoComplete="email" />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Password</label>
                <input className={styles.input} type="password" value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="At least 8 characters" required minLength={8}
                  autoComplete="new-password" />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Specialty</label>
                <select className={styles.select} value={spec}
                  onChange={e => setSpec(e.target.value)} required>
                  <option value="">– Please select –</option>
                  {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Training level</label>
                <select className={styles.select} value={level}
                  onChange={e => setLevel(e.target.value)} required>
                  <option value="">– Please select –</option>
                  {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              <button className={styles.submitBtn} type="submit"
                disabled={loading || !email || !password || !name || !spec || !level}>
                {loading ? 'Please wait…' : 'Continue'}
              </button>
            </form>
          </>
        )}

        {/* ── STEP 2: Verification ── */}
        {step === 2 && (
          <>
            <h1 className={styles.heading}>Almost there!</h1>
            <p className={styles.sub}>We sent a code to <strong>{email}</strong>.</p>
            <form className={styles.form} onSubmit={handleVerify}>
              <ErrorBox />

              <div className={styles.fieldGroup}>
                <input
                  className={`${styles.input} ${styles.codeInput}`}
                  type="text" inputMode="numeric" maxLength={6}
                  value={code}
                  onChange={e => setCode(e.target.value.replace(/\D/g,'').slice(0,6))}
                  placeholder="______" required autoFocus
                />
              </div>

              <button className={styles.submitBtn} type="submit" disabled={loading || code.length < 6}>
                {loading ? 'Verifying…' : 'Verify code'}
              </button>

              <button type="button" className={styles.resendBtn} onClick={handleResend}>
                Resend code
              </button>
            </form>
          </>
        )}

        <p className={styles.footerText}>
          Already have an account?{' '}
          <Link href="/sign-in" className={styles.footerLink}>Sign in</Link>
        </p>

      </div>
    </div>
  )
}
