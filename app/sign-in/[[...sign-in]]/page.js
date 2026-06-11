'use client'

import { useState } from 'react'
import { useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from '@/components/AuthLayout.module.css'

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

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z"/>
    </svg>
  )
}

function needsClientTrust(status) {
  const normalizedStatus = status?.replaceAll('-', '_')
  return normalizedStatus === 'needs_client_trust' || normalizedStatus === 'need_client_trust'
}

// view: 'login' | 'client-trust' | 'reset-email' | 'reset-code'
export default function SignInPage() {
  const { isLoaded, signIn, setActive } = useSignIn()
  const router = useRouter()

  const [view,        setView]        = useState('login')
  const [email,       setEmail]       = useState('')
  const [password,    setPassword]    = useState('')
  const [resetEmail,  setResetEmail]  = useState('')
  const [code,        setCode]        = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [trustCode,   setTrustCode]   = useState('')
  const [trustEmail,  setTrustEmail]  = useState('')
  const [trustFactor, setTrustFactor] = useState(null)
  const [error,       setError]       = useState('')
  const [success,     setSuccess]     = useState('')
  const [loading,     setLoading]     = useState(false)

  function showError(err) {
    setError(err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message || err?.message || 'Something went wrong. Please try again.')
  }

  async function completeSignIn(result) {
    await setActive({ session: result.createdSessionId })
    router.push('/')
  }

  async function prepareClientTrust(result) {
    const emailFactor = result.supportedSecondFactors?.find(factor => factor.strategy === 'email_code')
    if (!emailFactor) {
      throw new Error('Dieses Gerät muss bestätigt werden, aber für dieses Konto ist keine E-Mail-Bestätigung verfügbar.')
    }

    await result.prepareSecondFactor({
      strategy: 'email_code',
      emailAddressId: emailFactor.emailAddressId,
    })
    setTrustFactor(emailFactor)
    setTrustEmail(emailFactor.safeIdentifier || email)
    setTrustCode('')
    setSuccess('')
    setView('client-trust')
  }

  async function handleSignInResult(result) {
    if (result.status === 'complete') {
      await completeSignIn(result)
      return
    }
    if (needsClientTrust(result.status)) {
      await prepareClientTrust(result)
      return
    }
    setError(`Unexpected status: ${result.status}`)
  }

  // ── Sign in ──────────────────────────────────────────
  async function handleLogin(e) {
    e.preventDefault()
    if (!isLoaded) return
    setLoading(true); setError('')
    try {
      const attempt = await signIn.create({ identifier: email })
      if (attempt.status === 'needs_first_factor') {
        const result = await signIn.attemptFirstFactor({ strategy: 'password', password })
        await handleSignInResult(result)
      } else {
        await handleSignInResult(attempt)
      }
    } catch (err) { showError(err) }
    finally { setLoading(false) }
  }

  // ── Confirm a new mobile device ─────────────────────
  async function handleClientTrust(e) {
    e.preventDefault()
    if (!isLoaded) return
    setLoading(true); setError('')
    try {
      const result = await signIn.attemptSecondFactor({
        strategy: 'email_code',
        code: trustCode,
      })
      await handleSignInResult(result)
    } catch (err) { showError(err) }
    finally { setLoading(false) }
  }

  async function handleResendTrustCode() {
    if (!isLoaded || !trustFactor) return
    setLoading(true); setError('')
    try {
      await signIn.prepareSecondFactor({
        strategy: 'email_code',
        emailAddressId: trustFactor.emailAddressId,
      })
      setSuccess('Ein neuer Code wurde gesendet.')
    } catch (err) { showError(err) }
    finally { setLoading(false) }
  }

  // ── Social ───────────────────────────────────────────
  async function handleSocial(provider) {
    if (!isLoaded) return
    try {
      await signIn.authenticateWithRedirect({
        strategy: `oauth_${provider}`,
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/',
      })
    } catch (err) { showError(err) }
  }

  // ── Forgot password: send code ───────────────────────
  async function handleResetRequest(e) {
    e.preventDefault()
    if (!isLoaded) return
    setLoading(true); setError('')
    try {
      await signIn.create({ strategy: 'reset_password_email_code', identifier: resetEmail })
      setView('reset-code')
    } catch (err) { showError(err) }
    finally { setLoading(false) }
  }

  // ── Forgot password: confirm code + new password ─────
  async function handleResetConfirm(e) {
    e.preventDefault()
    if (!isLoaded) return
    setLoading(true); setError('')
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password: newPassword,
      })
      if (result.status === 'complete') {
        setSuccess('Password changed! Redirecting…')
        await setActive({ session: result.createdSessionId })
        setTimeout(() => router.push('/'), 1500)
      } else {
        setError(`Unexpected status: ${result.status}`)
      }
    } catch (err) { showError(err) }
    finally { setLoading(false) }
  }

  async function handleResendCode() {
    try { await signIn.create({ strategy: 'reset_password_email_code', identifier: resetEmail }) }
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
        <div className={styles.divider} />

        {/* ── LOGIN VIEW ── */}
        {view === 'login' && (
          <>
            <h1 className={styles.heading}>Welcome back</h1>
            <p className={styles.sub}>Sign in to access your learning progress.</p>

            <div className={styles.socialBtns}>
              <button className={styles.socialBtn} type="button" onClick={() => handleSocial('google')}>
                <GoogleIcon /> Continue with Google
              </button>
              <button className={styles.socialBtn} type="button" onClick={() => handleSocial('apple')}>
                <AppleIcon /> Continue with Apple
              </button>
            </div>

            <div className={styles.orDivider}>
              <span className={styles.orLine} />
              <span className={styles.orText}>or</span>
              <span className={styles.orLine} />
            </div>

            <form className={styles.form} onSubmit={handleLogin}>
              <ErrorBox />
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Email address</label>
                <input className={styles.input} type="email" value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@example.com" required autoComplete="email" />
              </div>
              <div className={styles.fieldGroup}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <label className={styles.label}>Password</label>
                  <button type="button" className={styles.forgotBtn}
                    onClick={() => { setResetEmail(email); setError(''); setView('reset-email') }}>
                    Forgot password?
                  </button>
                </div>
                <input className={styles.input} type="password" value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" required autoComplete="current-password" />
              </div>
              <button className={styles.submitBtn} type="submit" disabled={loading || !email || !password}>
                {loading ? 'Signing in…' : 'Sign in'}
              </button>
            </form>

            <p className={styles.footerText}>
              No account yet?{' '}
              <Link href="/sign-up" className={styles.footerLink}>Create account</Link>
            </p>
          </>
        )}

        {/* ── NEW DEVICE CONFIRMATION ── */}
        {view === 'client-trust' && (
          <>
            <h1 className={styles.heading}>Gerät bestätigen</h1>
            <p className={styles.sub}>
              Dieses Smartphone ist neu. Wir haben einen 6-stelligen Sicherheitscode an <strong>{trustEmail}</strong> gesendet.
            </p>
            <form className={styles.form} onSubmit={handleClientTrust}>
              <ErrorBox />
              {success && (
                <div style={{padding:'10px 14px',borderRadius:10,background:'#f0fdf4',border:'1px solid #bbf7d0',color:'#166534',fontSize:13}}>
                  {success}
                </div>
              )}
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Sicherheitscode</label>
                <input className={`${styles.input} ${styles.codeInput}`}
                  type="text" inputMode="numeric" autoComplete="one-time-code" maxLength={6}
                  value={trustCode}
                  onChange={e => setTrustCode(e.target.value.replace(/\D/g,'').slice(0,6))}
                  placeholder="______" required autoFocus />
              </div>
              <button className={styles.submitBtn} type="submit"
                disabled={loading || trustCode.length < 6}>
                {loading ? 'Wird bestätigt…' : 'Gerät bestätigen'}
              </button>
              <button type="button" className={styles.resendBtn}
                onClick={handleResendTrustCode} disabled={loading}>
                Code erneut senden
              </button>
            </form>
            <p className={styles.footerText}>
              <button type="button" className={styles.footerLink}
                style={{background:'none',border:'none',cursor:'pointer',padding:0}}
                onClick={() => {
                  setError('')
                  setSuccess('')
                  setTrustCode('')
                  setTrustFactor(null)
                  setView('login')
                }}>
                ← Zurück zur Anmeldung
              </button>
            </p>
          </>
        )}

        {/* ── RESET EMAIL VIEW ── */}
        {view === 'reset-email' && (
          <>
            <h1 className={styles.heading}>Reset password</h1>
            <p className={styles.sub}>Enter your email and we'll send you a reset code.</p>
            <form className={styles.form} onSubmit={handleResetRequest}>
              <ErrorBox />
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Email address</label>
                <input className={styles.input} type="email" value={resetEmail}
                  onChange={e => setResetEmail(e.target.value)}
                  placeholder="name@example.com" required autoComplete="email" />
              </div>
              <button className={styles.submitBtn} type="submit" disabled={loading || !resetEmail}>
                {loading ? 'Sending…' : 'Send reset code'}
              </button>
            </form>
            <p className={styles.footerText}>
              <button type="button" className={styles.footerLink}
                style={{background:'none',border:'none',cursor:'pointer',padding:0}}
                onClick={() => { setError(''); setView('login') }}>
                ← Back to sign in
              </button>
            </p>
          </>
        )}

        {/* ── RESET CODE VIEW ── */}
        {view === 'reset-code' && (
          <>
            <h1 className={styles.heading}>Enter code</h1>
            <p className={styles.sub}>We sent a 6-digit code to <strong>{resetEmail}</strong>.</p>
            <form className={styles.form} onSubmit={handleResetConfirm}>
              <ErrorBox />
              {success && (
                <div style={{padding:'10px 14px',borderRadius:10,background:'#f0fdf4',border:'1px solid #bbf7d0',color:'#166534',fontSize:13}}>
                  {success}
                </div>
              )}
              <div className={styles.fieldGroup}>
                <label className={styles.label}>6-digit code</label>
                <input className={`${styles.input} ${styles.codeInput}`}
                  type="text" inputMode="numeric" maxLength={6}
                  value={code} onChange={e => setCode(e.target.value.replace(/\D/g,'').slice(0,6))}
                  placeholder="______" required autoFocus />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>New password</label>
                <input className={styles.input} type="password" value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="At least 8 characters" required minLength={8}
                  autoComplete="new-password" />
              </div>
              <button className={styles.submitBtn} type="submit"
                disabled={loading || code.length < 6 || newPassword.length < 8}>
                {loading ? 'Setting password…' : 'Set new password'}
              </button>
              <button type="button" className={styles.resendBtn} onClick={handleResendCode}>
                Resend code
              </button>
            </form>
            <p className={styles.footerText}>
              <button type="button" className={styles.footerLink}
                style={{background:'none',border:'none',cursor:'pointer',padding:0}}
                onClick={() => { setError(''); setCode(''); setNewPassword(''); setView('login') }}>
                ← Back to sign in
              </button>
            </p>
          </>
        )}

      </div>
    </div>
  )
}
