'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from '../page.module.css'

export default function PrisonerAidLogin({ nextPath }) {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event) {
    event.preventDefault()
    setLoading(true); setError('')
    try {
      const response = await fetch('/api/andarun/prisoner-aid/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'ورود ناموفق بود.')
      router.push(nextPath)
      router.refresh()
    } catch (cause) {
      setError(cause.message)
      setLoading(false)
    }
  }

  return <main className={styles.loginPage} dir="rtl"><form className={styles.loginPanel} onSubmit={submit}>
    <span>Andarun / Finanzen</span><h1>کمک به زندانیان</h1><p>برای دیدن گزارش و ویرایش کمک‌ها وارد شوید.</p>
    <label>رمز ورود<input autoFocus type="password" value={password} onChange={event => setPassword(event.target.value)} /></label>
    {error ? <p className={styles.error} role="alert">{error}</p> : null}
    <button type="submit" disabled={!password || loading}>{loading ? 'در حال بررسی…' : 'ورود'}</button>
    <Link href="/andarun">بازگشت به اندرون</Link>
  </form></main>
}
