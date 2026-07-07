'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from './login.module.css'

export default function MobinLogin() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/mobin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Fehler beim Anmelden')
      router.push('/mobin')
      router.refresh()
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <main className={styles.shell}>
      <form className={styles.panel} onSubmit={handleSubmit}>
        <div className={styles.brand}>
          <span className={styles.brandLabel}>Privater Bereich</span>
          <h1 className={styles.brandName}>Mobin</h1>
        </div>

        <label className={styles.field}>
          <span>Passwort</span>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            autoFocus
            autoComplete="current-password"
          />
        </label>

        {error && <p className={styles.error}>{error}</p>}

        <button
          className={styles.btn}
          type="submit"
          disabled={loading || !password}
        >
          {loading ? 'Prüfen…' : 'Einloggen'}
        </button>
      </form>
    </main>
  )
}
