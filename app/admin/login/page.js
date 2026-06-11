'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from './login.module.css'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login fehlgeschlagen')
      router.push('/admin')
      router.refresh()
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <div className={styles.logo}>
          <span className={styles.rad}>RAD</span>
          <span className={styles.yar}>YAR</span>
        </div>
        <h1 className={styles.title}>Admin-Login</h1>
        <input
          type="password"
          className={styles.input}
          placeholder="Passwort"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoFocus
        />
        {error && <div className={styles.error}>{error}</div>}
        <button type="submit" className={styles.button} disabled={loading || !password}>
          {loading ? 'Prüfe…' : 'Anmelden'}
        </button>
      </form>
    </div>
  )
}
