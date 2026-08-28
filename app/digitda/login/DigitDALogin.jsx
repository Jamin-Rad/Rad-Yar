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
      if (!response.ok) throw new Error(data.error || 'ورود ناموفق بود.')
      router.replace('/digitda')
      router.refresh()
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <main className={styles.page} dir="rtl">
      <div className={styles.brand} lang="en" dir="ltr">Digit<span>DA</span></div>
      <form className={styles.panel} onSubmit={submit}>
        <div className={styles.intro}>
          <span>پنل مالی شرکت</span>
          <h1>خوش<br/>آمدید.</h1>
          <p>درآمد، هزینه‌ها و سهم شرکا در یک فضای امن و یکپارچه.</p>
        </div>
        <label className={styles.field}>
          رمز عبور
          <input value={password} onChange={event => setPassword(event.target.value)} type="password" autoFocus autoComplete="current-password" placeholder="رمز عبور را وارد کنید" />
        </label>
        {error ? <p className={styles.error} role="alert">{error}</p> : null}
        <button className={styles.submit} disabled={!password || loading} type="submit">
          <span>{loading ? 'در حال ورود…' : 'ورود به داشبورد'}</span>
          <span aria-hidden="true">↖</span>
        </button>
      </form>
      <Link className={styles.back} href="/andarun">بازگشت به اندرون ←</Link>
    </main>
  )
}
