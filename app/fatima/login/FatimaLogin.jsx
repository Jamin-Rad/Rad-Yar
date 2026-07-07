'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from './page.module.css'

export default function FatimaLogin() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/fatima/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Access failed.')
      router.push('/fatima')
      router.refresh()
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <main className={styles.page}>
      <form className={styles.panel} onSubmit={handleSubmit}>
        <div className={styles.header}>
          <span>Private access</span>
          <h1>Fatima</h1>
        </div>

        <label className={styles.passwordField}>
          Password
          <input
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            placeholder="Enter password"
            autoFocus
          />
        </label>

        {error && <div className={styles.error}>{error}</div>}

        <button className={styles.submitBtn} type="submit" disabled={loading || !password}>
          {loading ? 'Checking...' : 'Open'}
        </button>

        <Link className={styles.homeLink} href="/fatima">Back</Link>
      </form>
    </main>
  )
}
