'use client'

import { useState } from 'react'
import { useSignIn, useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  )
}

function needsClientTrust(status) {
  const normalizedStatus = status?.replaceAll('-', '_')
  return normalizedStatus === 'needs_client_trust' || normalizedStatus === 'need_client_trust'
}

function needsSecondFactor(status) {
  return status?.replaceAll('-', '_') === 'needs_second_factor'
}

export default function AndarunLogin() {
  const { isLoaded: signInLoaded, signIn, setActive: setSignInActive } = useSignIn()
  const { isLoaded: signUpLoaded, signUp, setActive: setSignUpActive } = useSignUp()
  const router = useRouter()

  const [mode, setMode] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [code, setCode] = useState('')
  const [trustCode, setTrustCode] = useState('')
  const [trustFactor, setTrustFactor] = useState(null)
  const [view, setView] = useState('form')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function showError(err) {
    setError(err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message || err?.message || 'Sign-in failed.')
  }

  function resetForm(nextMode) {
    setMode(nextMode)
    setError('')
    setPassword('')
    setCode('')
    setTrustCode('')
    setTrustFactor(null)
    setView('form')
  }

  async function completeSignIn(result) {
    await setSignInActive({ session: result.createdSessionId })
    router.push('/andarun')
  }

  async function prepareClientTrust(result) {
    const emailFactor = result.supportedSecondFactors?.find(factor => factor.strategy === 'email_code')
    if (!emailFactor) throw new Error('This device needs confirmation, but email code is not available.')

    await result.prepareSecondFactor({
      strategy: 'email_code',
      emailAddressId: emailFactor.emailAddressId,
    })
    setTrustFactor(emailFactor)
    setTrustCode('')
    setView('trust')
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
    if (needsSecondFactor(result.status)) {
      await prepareClientTrust(result)
      return
    }
    setError(`Unexpected status: ${result.status}`)
  }

  async function handleSocial() {
    if (!signInLoaded) return
    setError('')
    try {
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/andarun',
      })
    } catch (err) {
      showError(err)
    }
  }

  async function handleEmailSignIn(event) {
    event.preventDefault()
    if (!signInLoaded) return
    setLoading(true)
    setError('')
    try {
      const attempt = await signIn.create({ identifier: email })
      if (attempt.status === 'needs_first_factor') {
        const result = await signIn.attemptFirstFactor({ strategy: 'password', password })
        await handleSignInResult(result)
      } else {
        await handleSignInResult(attempt)
      }
    } catch (err) {
      showError(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleEmailSignUp(event) {
    event.preventDefault()
    if (!signUpLoaded) return
    setLoading(true)
    setError('')
    try {
      await signUp.create({
        emailAddress: email,
        password,
        firstName: nickname,
        unsafeMetadata: { app: 'andarun' },
      })
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setView('verify')
    } catch (err) {
      showError(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleVerify(event) {
    event.preventDefault()
    if (!signUpLoaded) return
    setLoading(true)
    setError('')
    try {
      const result = await signUp.attemptEmailAddressVerification({ code })
      if (result.status === 'complete') {
        await setSignUpActive({ session: result.createdSessionId })
        router.push('/andarun')
      } else {
        setError(`Unexpected status: ${result.status}`)
      }
    } catch (err) {
      showError(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleClientTrust(event) {
    event.preventDefault()
    if (!signInLoaded) return
    setLoading(true)
    setError('')
    try {
      const result = await signIn.attemptSecondFactor({
        strategy: 'email_code',
        code: trustCode,
      })
      await handleSignInResult(result)
    } catch (err) {
      showError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.panel}>
        <div className={styles.header}>
          <span>Andarun</span>
          <h1>{mode === 'signin' ? 'Log in' : 'Create account'}</h1>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        {view === 'form' && (
          <>
            <button className={styles.googleBtn} type="button" onClick={handleSocial}>
              <GoogleIcon />
              Continue with Google
            </button>

            <div className={styles.divider}><span /></div>

            <form className={styles.form} onSubmit={mode === 'signin' ? handleEmailSignIn : handleEmailSignUp}>
              {mode === 'signup' && (
                <label>
                  Nickname
                  <input value={nickname} onChange={event => setNickname(event.target.value)} placeholder="e.g. Ben" required />
                </label>
              )}

              <label>
                Email
                <input type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="name@example.com" required autoComplete="email" />
              </label>

              <label>
                Password
                <input type="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="At least 8 characters" required minLength={8} autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} />
              </label>

              <button className={styles.submitBtn} type="submit" disabled={loading || !email || !password || (mode === 'signup' && !nickname)}>
                {loading ? 'Please wait...' : mode === 'signin' ? 'Log in' : 'Create account'}
              </button>
            </form>

            <button className={styles.switchBtn} type="button" onClick={() => resetForm(mode === 'signin' ? 'signup' : 'signin')}>
              {mode === 'signin' ? 'Create a new Andarun account' : 'I already have an account'}
            </button>
          </>
        )}

        {view === 'verify' && (
          <form className={styles.form} onSubmit={handleVerify}>
            <p className={styles.note}>We sent a code to your email.</p>
            <label>
              Code
              <input value={code} onChange={event => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="______" inputMode="numeric" maxLength={6} required />
            </label>
            <button className={styles.submitBtn} type="submit" disabled={loading || code.length < 6}>
              {loading ? 'Checking...' : 'Verify email'}
            </button>
          </form>
        )}

        {view === 'trust' && (
          <form className={styles.form} onSubmit={handleClientTrust}>
            <p className={styles.note}>This device needs a security code.</p>
            <label>
              Security code
              <input value={trustCode} onChange={event => setTrustCode(event.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="______" inputMode="numeric" maxLength={6} required />
            </label>
            <button className={styles.submitBtn} type="submit" disabled={loading || trustCode.length < 6 || !trustFactor}>
              {loading ? 'Checking...' : 'Confirm device'}
            </button>
          </form>
        )}
      </section>
    </main>
  )
}
