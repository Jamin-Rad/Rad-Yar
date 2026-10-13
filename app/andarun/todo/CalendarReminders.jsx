'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './page.module.css'

const API = '/api/andarun/reminders'
function applicationKey(key) {
  const value = atob(key.replace(/-/g, '+').replace(/_/g, '/'))
  return Uint8Array.from(value, char => char.charCodeAt(0))
}

export default function CalendarReminders() {
  const [open, setOpen] = useState(false)
  const [config, setConfig] = useState(null)
  const [subscription, setSubscription] = useState(null)
  const [enabled, setEnabled] = useState(false)
  const [leads, setLeads] = useState([1440, 30])
  const [details, setDetails] = useState(false)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [support, setSupport] = useState({ supported: false, needsInstall: false })
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const previousFocus = document.activeElement
    dialogRef.current?.querySelector('button')?.focus()
    const onKey = event => {
      if (event.key === 'Escape') { event.preventDefault(); setOpen(false) }
      if (event.key !== 'Tab') return
      const controls = [...dialogRef.current.querySelectorAll('button:not(:disabled), input:not(:disabled)')]
      const first = controls[0], last = controls.at(-1)
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('keydown', onKey); previousFocus?.focus() }
  }, [open])

  async function send(body) {
    const response = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    const result = await response.json()
    if (!response.ok) throw new Error(result.error || 'Verbindung fehlgeschlagen.')
    return result
  }

  useEffect(() => {
    let active = true
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    const standalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true
    const supported = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window
    setSupport({ supported, needsInstall: ios && !standalone })
    async function load() {
      try {
        const response = await fetch(API, { cache: 'no-store' })
        if (!response.ok) throw new Error('Einstellungen konnten nicht geladen werden.')
        const data = await response.json()
        if (!active) return
        setConfig(data)
        if (!supported) return
        const registration = await navigator.serviceWorker.getRegistration('/andarun/')
        const saved = await registration?.pushManager.getSubscription()
        if (!saved || !active) return
        const status = await send({ action: 'status', subscription: saved.toJSON() })
        if (!active) return
        setSubscription(saved)
        setEnabled(status.enabled && Notification.permission === 'granted')
        if (status.enabled) { setLeads(status.leads); setDetails(status.showDetails) }
      } catch (error) { if (active) setMessage(error.message) }
    }
    load()
    return () => { active = false }
  }, [])

  async function enable() {
    if (!config?.ready || busy) return
    // Permission must be requested directly from the tap, before any network await on iOS.
    const permissionPromise = Notification.requestPermission()
    setBusy(true); setMessage('')
    let current
    try {
      const permission = await permissionPromise
      if (permission !== 'granted') throw new Error('Benachrichtigungen bitte in den Geräte-Einstellungen erlauben.')
      const registration = await navigator.serviceWorker.register('/andarun/sw.js', { scope: '/andarun/' })
      await navigator.serviceWorker.ready
      current = await registration.pushManager.getSubscription()
      if (!current) current = await registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: applicationKey(config.publicKey) })
      await send({ subscription: current.toJSON(), leads, showDetails: details })
      setSubscription(current); setEnabled(true); setMessage('Auf diesem Gerät aktiviert.')
    } catch (error) { setMessage(error.message) }
    finally { setBusy(false) }
  }

  async function action(name) {
    if (!subscription || busy) return
    setBusy(true); setMessage('')
    try {
      await send({ action: name, subscription: subscription.toJSON(), leads, showDetails: details })
      if (name === 'disable') {
        setEnabled(false)
        await subscription.unsubscribe()
        setSubscription(null)
      }
      setMessage(name === 'test' ? 'Test gesendet. Bitte Benachrichtigungen prüfen.' : name === 'disable' ? 'Auf diesem Gerät deaktiviert.' : 'Einstellungen gespeichert.')
    } catch (error) { setMessage(error.message) }
    finally { setBusy(false) }
  }

  return <>
    <button type="button" onClick={() => setOpen(true)} className={enabled && config?.ready ? styles.notificationActive : styles.notificationBtn}>Erinnerungen</button>
    {open && createPortal(<div dir="ltr" className={styles.modalBackdrop} onMouseDown={() => setOpen(false)}>
      <section ref={dialogRef} className={`${styles.detailModal} ${styles.reminderModal}`} role="dialog" aria-modal="true" aria-labelledby="reminder-title" onMouseDown={event => event.stopPropagation()}>
        <header className={styles.modalHeader}><h2 id="reminder-title">Erinnerungen</h2><button type="button" className={styles.modalClose} onClick={() => setOpen(false)} aria-label="Schließen">×</button></header>
        <div className={styles.reminderBody}>
          <p>Für Termine mit Uhrzeit · Europe/Berlin</p>
          {support.needsInstall && <p>Auf dem iPhone: Safari → Teilen → Zum Home-Bildschirm. Danach Jaminova über das Symbol öffnen (iOS 16.4 oder neuer).</p>}
          {!support.supported && !support.needsInstall && <p>Push-Benachrichtigungen werden hier nicht unterstützt.</p>}
          {!config?.ready && <p className={styles.workPlanNotice}>{config?.reason || 'Server-Verbindung wird geprüft …'}</p>}
          <fieldset disabled={busy} className={styles.reminderOptions}>
            <legend>Wann?</legend>
            {[[1440, '1 Tag vorher (24 Stunden)'], [30, '30 Minuten vorher']].map(([lead, label]) => <label key={lead}>
              <input type="checkbox" checked={leads.includes(lead)} onChange={event => setLeads(previous => event.target.checked ? [...previous, lead] : previous.filter(value => value !== lead))} />{label}
            </label>)}
            <label><input type="checkbox" checked={details} onChange={event => setDetails(event.target.checked)} />Termintitel auf dem Sperrbildschirm zeigen</label>
          </fieldset>
          {message && <p role="status">{message}</p>}
          <div className={styles.reminderActions}>
            {!enabled ? <button className={styles.addBtn} type="button" disabled={busy || !config?.ready || !support.supported || support.needsInstall || !leads.length} onClick={enable}>Auf diesem Gerät aktivieren</button> : <>
              <button className={styles.addBtn} type="button" disabled={busy || !config?.ready} onClick={() => action('save')}>Speichern</button>
              <button className={styles.detailGhostBtn} type="button" disabled={busy || !config?.ready} onClick={() => action('test')}>Test senden</button>
              <button className={styles.detailDeleteBtn} type="button" disabled={busy} onClick={() => action('disable')}>Deaktivieren</button>
            </>}
          </div>
        </div>
      </section>
    </div>, document.body)}
  </>
}
