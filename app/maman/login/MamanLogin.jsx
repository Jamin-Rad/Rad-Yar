'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from '@/app/andarun/login/page.module.css'

export default function MamanLogin() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event) {
    event.preventDefault()
    if (!username.trim() || loading) return
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/maman/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || 'ورود انجام نشد.')
      router.replace('/maman')
      router.refresh()
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'ورود انجام نشد.')
      setLoading(false)
    }
  }

  return (
    <main className={styles.page} dir="rtl">
      <form className={styles.panel} onSubmit={submit}>
        <div className={styles.header}>
          <span>برنامهٔ شخصی داروها</span>
          <h1>داروی من</h1>
        </div>
        <label className={styles.passwordField}>
          نام کاربری
          <input
            type="text"
            value={username}
            onChange={event => setUsername(event.target.value)}
            placeholder="Maman"
            autoCapitalize="none"
            autoCorrect="off"
            autoFocus
          />
        </label>
        {error ? <div className={styles.error}>{error}</div> : null}
        <button className={styles.submitBtn} type="submit" disabled={loading || !username.trim()}>
          {loading ? 'در حال ورود…' : 'ورود'}
        </button>
        <p className={styles.homeLink}>فقط بار اول نام Maman را وارد کن.</p>
      </form>
    </main>
  )
}
