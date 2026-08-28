'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from './page.module.css'

export default function DigitDALogin() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const response = await fetch('/api/digitda/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.error || 'Anmeldung fehlgeschlagen.')
      router.replace('/digitda')
      router.refresh()
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.brand}>Digit<span>DA</span></div>
      <form className={styles.panel} onSubmit={submit}>
        <div className={styles.intro}>
          <span>Unternehmensbereich</span>
          <h1>Willkommen<br/>zurück.</h1>
          <p>Finanzen, Projekte und Unternehmenszahlen an einem geschützten Ort.</p>
        </div>
        <label className={styles.field}>
          Passwort
          <input value={password} onChange={event => setPassword(event.target.value)} type="password" autoFocus autoComplete="current-password" placeholder="Passwort eingeben" />
        </label>
        {error ? <p className={styles.error} role="alert">{error}</p> : null}
        <button className={styles.submit} disabled={!password || loading} type="submit">
          <span>{loading ? 'Wird geöffnet …' : 'Dashboard öffnen'}</span>
          <span aria-hidden="true">↗</span>
        </button>
      </form>
      <Link className={styles.back} href="/andarun">← Zurück zu Andarun</Link>
    </main>
  )
}
