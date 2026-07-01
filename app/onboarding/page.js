'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from '@/components/AuthLayout.module.css'

const SPECIALTIES = ['Radiology','General Medicine','Surgery','Internal Medicine','Neurology','Paediatrics','Other']
const LEVELS = ['Medical student','Final year (PJ)','Resident','Specialist','Senior physician','Other']

async function api(method = 'GET', body) {
  const res = await fetch('/api/account/onboarding', {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || 'Profil konnte nicht gespeichert werden.')
  return data
}

export default function OnboardingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [needsPassword, setNeedsPassword] = useState(true)
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [level, setLevel] = useState('')

  useEffect(() => {
    let cancelled = false
    api()
      .then(data => {
        if (cancelled) return
        if (data.completed) {
          router.replace('/')
          return
        }
        setNickname(data.firstName || '')
        setNeedsPassword(data.needsPassword)
      })
      .catch(err => setError(err.message))
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [router])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (needsPassword && password !== confirmPassword) {
      setError('Passwörter stimmen nicht überein.')
      return
    }
    setSaving(true)
    try {
      await api('PATCH', { nickname, password, specialty, level })
      router.replace('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.heading}>Profil fertigstellen</h1>
        <p className={styles.sub}>Lege einen Nickname und ein Passwort fest. Danach kannst du dich mit Google/Apple oder E-Mail und Passwort in dasselbe RadYar-Konto einloggen.</p>

        {loading ? (
          <p className={styles.sub}>Wird geladen...</p>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Nickname</label>
              <input className={styles.input} value={nickname} onChange={e => setNickname(e.target.value)} required autoComplete="nickname" />
            </div>

            {needsPassword && (
              <>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Passwort</label>
                  <input className={styles.input} type="password" value={password} onChange={e => setPassword(e.target.value)} minLength={8} required autoComplete="new-password" />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Passwort wiederholen</label>
                  <input className={styles.input} type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} minLength={8} required autoComplete="new-password" />
                </div>
              </>
            )}

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Specialty</label>
              <select className={styles.select} value={specialty} onChange={e => setSpecialty(e.target.value)}>
                <option value="">- Optional -</option>
                {SPECIALTIES.map(item => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Training level</label>
              <select className={styles.select} value={level} onChange={e => setLevel(e.target.value)}>
                <option value="">- Optional -</option>
                {LEVELS.map(item => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>

            <button className={styles.submitBtn} type="submit" disabled={saving || !nickname || (needsPassword && (password.length < 8 || password !== confirmPassword))}>
              {saving ? 'Speichern...' : 'Speichern und weiter'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
