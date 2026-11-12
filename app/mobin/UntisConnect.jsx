'use client'

import { useEffect, useState } from 'react'
import styles from './learning.module.css'

export function useUntis(target) {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const endpoint = '/api/mobin/untis?target=' + target
  useEffect(() => {
    const abort = new AbortController()
    fetch(endpoint, { cache: 'no-store', signal: abort.signal })
      .then(response => {
        if (!response.ok) throw new Error()
        return response.json()
      })
      .then(setData)
      .catch(error => { if (error.name !== 'AbortError') setError('Untis-Status konnte nicht geladen werden.') })
    return () => abort.abort()
  }, [endpoint])

  async function connect(body) {
    setBusy(true)
    setError('')
    try {
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Die Verbindung ist fehlgeschlagen.')
      setData(result)
      return true
    } catch (error) {
      setError(error.message)
      return false
    } finally { setBusy(false) }
  }
  return { data, error, busy, connect }
}

export default function UntisConnect({ state, update = false }) {
  const [open, setOpen] = useState(false)
  const { data, error, busy, connect } = state
  async function apply(body) {
    if (await connect(body)) setOpen(false)
  }
  if (data?.connected && !update) return null
  return <div className={styles.untis}>
    {data?.connected
      ? <button disabled={busy} onClick={() => apply({ refresh: true })}>{busy ? 'Wird aktualisiert …' : 'Unterricht aktualisieren'}</button>
      : <button disabled={busy} onClick={() => data?.available ? apply({}) : setOpen(!open)}>Mit Untis verbinden</button>}
    {data?.connected && error && !open && <button onClick={() => setOpen(true)}>iCal-Link ersetzen</button>}
    {open && <form className={styles.untisForm} onSubmit={event => {
      event.preventDefault()
      apply({ link: new FormData(event.currentTarget).get('link') })
    }}>
      <p>Öffne in WebUntis „Mein Stundenplan“ → „iCal-Abo verwalten“ und kopiere den privaten Standard-Link hierher.</p>
      <a href="https://privates-gym-esslingen.webuntis.com/" target="_blank" rel="noreferrer">WebUntis der Schule öffnen ↗</a>
      <label>Privater iCal-Link<input name="link" type="url" required maxLength={2500} autoComplete="off" /></label>
      <button disabled={busy}>Verbinden</button>
    </form>}
    {error && <p role="status">{error}</p>}
  </div>
}
