'use client'

import Link from 'next/link'
import { useState } from 'react'
import styles from './page.module.css'

export default function AndarunLogin({ nextPath = '/andarun' }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/andarun/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Zugang fehlgeschlagen.')
      // A new document also gives home-screen installers the destination app's
      // manifest instead of retaining the login/parent identity.
      window.location.assign(nextPath)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <main className={styles.page}>
      <form className={styles.panel} onSubmit={handleSubmit}>
        <div className={styles.header}>
          <span>Privater Zugang</span>
          <h1>Jaminova</h1>
        </div>

        <label className={styles.passwordField}>
          Passwort
          <input
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            placeholder="Passwort eingeben"
            autoFocus
          />
        </label>

        {error && <div className={styles.error}>{error}</div>}

        <button className={styles.submitBtn} type="submit" disabled={loading || !password}>
          {loading ? 'Wird geprüft …' : 'Öffnen'}
        </button>

        <Link className={styles.homeLink} href="/andarun">Zurück</Link>
      </form>
    </main>
  )
}
