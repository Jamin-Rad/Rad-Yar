'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { formatWorkHours, summarizeTimerModalities } from '../dienste/findingTimerSummary'
import { MODALITIES, TARGET_MINUTES, dateValue, dateLabel, duration, serviceDate, editForm, editedTimer, totals } from './timerModel'
import TimerHistory from './TimerHistory'
import Dialog from './TimerDialog'
import Icon from './TimerIcon'
import styles from './timer.module.css'
import legacy from '../dienste/page.module.css'
async function workRequest(method = 'GET', timer) {
  const response = await fetch(method === 'DELETE' ? `/api/andarun/work?type=findingTimer&id=${encodeURIComponent(timer.id)}` : '/api/andarun/work', {
    method, cache: 'no-store', ...(method === 'POST' ? { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'findingTimer', timer }) } : {}),
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.error || 'Befundzeiten konnten nicht geladen oder gespeichert werden.')
  return data
}
function NumberField({ label, value, min, max, onChange }) {
  function adjust(delta) { onChange(String(Math.max(min, Math.min(max ?? Infinity, (Number(value) || 0) + delta)))) }
  return <label className={styles.numberField}><span>{label}</span><div><button type="button" onClick={() => adjust(-1)} aria-label={`${label} verringern`}><Icon name="minus"/></button><input type="text" inputMode="numeric" pattern="[0-9]+" required aria-label={label} value={value} onChange={e => { if (/^\d*$/.test(e.target.value)) onChange(e.target.value) }} onKeyDown={e => { if (e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); adjust(e.key === 'ArrowUp' ? 1 : -1) } }}/><button type="button" onClick={() => adjust(1)} aria-label={`${label} erhöhen`}><Icon name="plus"/></button></div></label>
}
export default function BefundTimer() {
  const [timers, setTimers] = useState([])
  const [shifts, setShifts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [busy, setBusy] = useState(false)
  const [modality, setModality] = useState('Röntgen')
  const [count, setCount] = useState(1)
  const [elapsed, setElapsed] = useState(0)
  const [started, setStarted] = useState(null)
  const [now, setNow] = useState(Date.now)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [timerAddedMessage, setTimerAddedMessage] = useState('')
  const [view, setView] = useState('week')
  const [selection, setSelection] = useState(null)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(null)
  const [editError, setEditError] = useState('')
  const [removing, setRemoving] = useState(false)
  const [reload, setReload] = useState(0)
  const savingRef = useRef(false)
  useEffect(() => {
    let active = true
    setLoading(true); setError('')
    workRequest().then(data => { if (active) { setTimers(data.findingTimers || []); setShifts(data.shifts || []) } }).catch(e => { if (active) setError(e.message) }).finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [reload])
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), started ? 1000 : 30000)
    const update = () => setNow(Date.now())
    document.addEventListener('visibilitychange', update)
    return () => { clearInterval(id); document.removeEventListener('visibilitychange', update) }
  }, [started])
  useEffect(() => {
    if (!started || !navigator.wakeLock) return
    let lock, cancelled = false
    async function acquire() {
      try { const next = await navigator.wakeLock.request('screen'); if (cancelled) await next.release(); else { lock = next; next.addEventListener('release', () => { if (lock === next) lock = null }) } } catch { /* Screen wake lock is optional. */ }
    }
    function restore() { if (document.visibilityState === 'visible' && !lock) acquire() }
    acquire(); document.addEventListener('visibilitychange', restore)
    return () => { cancelled = true; document.removeEventListener('visibilitychange', restore); lock?.release().catch(() => {}) }
  }, [started])
  useEffect(() => {
    if (!timerAddedMessage) return
    const timeout = setTimeout(() => setTimerAddedMessage(''), 2200)
    return () => clearTimeout(timeout)
  }, [timerAddedMessage])
  const today = serviceDate(now, shifts, timers)
  const dayTimers = useMemo(() => timers.filter(t => t.date === today), [timers, today])
  const stats = useMemo(() => summarizeTimerModalities(dayTimers, MODALITIES), [dayTimers])
  const daily = totals(dayTimers)
  const displayMs = elapsed + (started ? now - started : 0)
  const target = TARGET_MINUTES[modality] * count
  const extra = Math.max(0, displayMs - target * 60000)
  const progress = extra ? ((extra % 300000) || 300000) / 300000 : Math.min(displayMs / (target * 60000), 1)
  function pause() { const time = Date.now(); setElapsed(previous => previous + (started ? time - started : 0)); setStarted(null); setNow(time) }
  const openEdit = useCallback(timer => { setEditing(timer); setForm(editForm(timer)); setEditError(''); setRemoving(false) }, [])
  async function finish() {
    if (savingRef.current) return
    const time = Date.now(), durationMs = elapsed + (started ? time - started : 0)
    if (durationMs < 1000) { setError('Bitte mindestens eine Sekunde erfassen.'); return }
    savingRef.current = true; setBusy(true); setError(''); setNotice(''); setStarted(null); setElapsed(durationMs); setNow(time)
    try {
      const data = await workRequest('POST', { id: `finding-timer-${crypto.randomUUID()}`, date: serviceDate(time, shifts, timers), modality, count, durationMs, examArea: '', createdAt: new Date(time).toISOString() })
      setTimers(data.findingTimers || []); setElapsed(0); setCount(1); setNotice('Befundzeit gespeichert.')
    } catch (e) { setError(e.message) } finally { savingRef.current = false; setBusy(false) }
  }
  async function saveEdit(event) {
    event.preventDefault()
    if (savingRef.current) return
    let timer
    try { timer = editedTimer(editing, form) } catch (e) { setEditError(e.message); return }
    savingRef.current = true; setBusy(true); setEditError('')
    try { const data = await workRequest('POST', timer); setTimers(data.findingTimers || []); setEditing(null); setNotice('Befundzeit aktualisiert.') } catch (e) { setEditError(e.message) } finally { savingRef.current = false; setBusy(false) }
  }
  async function remove() {
    if (savingRef.current) return
    savingRef.current = true; setBusy(true); setEditError('')
    try { const data = await workRequest('DELETE', editing); setTimers(data.findingTimers || []); setEditing(null); setNotice('Befundzeit gelöscht.') } catch (e) { setEditError(e.message) } finally { savingRef.current = false; setBusy(false) }
  }
  function shortDateLabel(value) { return dateLabel(value, { day: '2-digit', month: '2-digit' }) }
  function updateTimerCount(delta) { setCount(n => Math.max(1, Math.min(20, n + delta))); if (delta > 0 && count < 20) setTimerAddedMessage(`+${TARGET_MINUTES[modality]} Minuten Zielzeit hinzugefügt`) }
  function startFindingTimer() { const time = Date.now(); setNow(time); setStarted(time) }
  function resetFindingTimer() { setElapsed(0); setStarted(null); setNow(Date.now()) }
  function openDay(value) { setView('week'); setSelection({ date: today, modality: value }); setHistoryOpen(true) }
  return <main className={`${styles.page} ${styles.restoredPage} ${legacy.findingsPage}`} lang="de" dir="ltr">
    <header className={`${legacy.header} ${styles.restoredHeader}`}><h1>Befundtimer</h1><div className={styles.status} aria-live="polite">{loading ? 'Befundzeiten werden geladen …' : notice}</div></header>
    {error && <div className={styles.error} role="alert">{error}<button type="button" onClick={() => setReload(n => n + 1)}>Erneut laden</button></div>}
    <section className={`${legacy.findings} ${styles.restoredContent}`} aria-label="Befundzeit erfassen">
<div className={`${legacy.timerHero} ${styles.restoredHero}`}>
          <div className={styles.srOnly}>
            <div>
              <span className={legacy.kicker}>Befundtimer</span>
              <h2>Befundtimer</h2>
            </div>
          </div>
          <div className={`${legacy.timerHeroGrid} ${styles.restoredGrid}`}>
            <div className={`${legacy.timerDialCard} ${styles.restoredDialCard}`}>
              <div
                className={[
                  Boolean(started) ? legacy.timerDialRunning : legacy.timerDial,
                  Boolean(extra) ? legacy.timerDialOverdue : '',
                ].filter(Boolean).join(' ')}
                style={{ '--progress': `${progress * 360}deg` }}
              >
                <div>
                  <strong>{duration(displayMs)}</strong>
                  <span>{Boolean(extra) ? `+${Math.ceil(extra / 300000) * 5} min extra` : `${target} min Ziel`}</span>
                </div>
              </div>
              <div className={legacy.timerModalityPills}>
                {MODALITIES.map(item => (
                  <button
                    key={item}
                    type="button"
                    disabled={busy}
                    aria-pressed={modality === item}
                    className={modality === item ? legacy.timerModalityActive : legacy.timerModality}
                    onClick={() => setModality(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className={legacy.timerCountControl}>
                <span>{TARGET_MINUTES[modality]} min / Befund</span>
                <div>
                  <button type="button" onClick={() => updateTimerCount(-1)} disabled={count <= 1 || busy} aria-label="Ein Befund weniger">−</button>
                  <strong>×{count}</strong>
                  <button type="button" onClick={() => updateTimerCount(1)} disabled={count >= 20 || busy} aria-label="Ein Befund mehr">+</button>
                </div>
                {timerAddedMessage && <em className={styles.countNotice}>{timerAddedMessage}</em>}
              </div>
              <div className={legacy.timerIconButtons}>
                <button type="button" onClick={startFindingTimer} disabled={Boolean(started) || busy || loading} aria-label="Timer starten">
                  <span className={legacy.iconPlay} aria-hidden="true" /><span>Start</span>
                </button>
                <button type="button" onClick={pause} disabled={!Boolean(started) || busy} aria-label="Timer halten">
                  <span className={legacy.iconPause} aria-hidden="true" /><span>Pause</span>
                </button>
                <button type="button" onClick={resetFindingTimer} disabled={!displayMs || busy || loading} aria-label="Timer zurücksetzen">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" /></svg><span>Reset</span>
                </button>
                <button type="button" onClick={finish} disabled={!displayMs || busy || loading} aria-label="Befundzeit speichern">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h13l3 3v13H4zM8 4v6h8V4M8 20v-7h8v7" /></svg><span>Speichern</span>
                </button>
              </div>
            </div>

            <div className={legacy.timerStatsCard}>
              <button aria-label="Verlauf öffnen" className={legacy.timerStatsHeader} type="button" onClick={() => { setSelection(null); setHistoryOpen(true) }}>
                <span className={legacy.timerStatsDate}><span className={legacy.kicker}>Diensttag {shortDateLabel(today)}</span><strong>Arbeitszeit: {formatWorkHours(daily.totalMs)}</strong></span>
                <em>Verlauf</em>
              </button>
              <div className={legacy.timerStatsGrid}>
                {stats.map(stat => (
                  <button type="button" key={stat.modality} onClick={() => openDay(stat.modality)}>
                    <strong>{stat.modality}</strong>
                    <span>{stat.count} Befund{stat.count === 1 ? '' : 'e'}</span>
                    <span className={legacy.timerStatTimes}><em>Ø {stat.avg ? duration(stat.avg) : '--:--'}</em><small>Gesamt {duration(stat.totalMs)}</small></span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
    </section>
    {historyOpen && <Dialog title="Befundzeiten · Verlauf" wide onClose={() => setHistoryOpen(false)}><TimerHistory timers={timers} shifts={shifts} today={dateValue(now)} onEdit={openEdit} busy={busy} view={view} onViewChange={setView} selection={selection} onSelectionChange={setSelection}/></Dialog>}
    {editing && <Dialog title={removing ? 'Befundzeit löschen?' : 'Befundzeit korrigieren'} onClose={() => { if (!busy) setEditing(null) }} busy={busy}>{removing ? <div className={styles.editForm}><p>Diese gespeicherte Befundzeit wird dauerhaft entfernt.</p>{editError && <p className={styles.error} role="alert">{editError}</p>}<footer><button type="button" onClick={() => setRemoving(false)} disabled={busy}>Abbrechen</button><button type="button" className={styles.destructive} onClick={remove} disabled={busy}>Endgültig löschen</button></footer></div> : <form className={styles.editForm} onSubmit={saveEdit}><div className={styles.formGrid}><label>Datum<input type="date" required value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}/></label><label>Modalität<select value={form.modality} onChange={e => setForm(f => ({ ...f, modality: e.target.value }))}>{MODALITIES.map(m => <option key={m}>{m}</option>)}</select></label></div><div className={styles.numberGrid}>{[['Minuten', 'minutes', 0], ['Sekunden', 'seconds', 0, 59], ['Befunde', 'count', 1, 20]].map(([label, field, min, max]) => <NumberField key={field} label={label} value={form[field]} min={min} max={max} onChange={value => setForm(f => ({ ...f, [field]: value }))}/>)}</div>{editError && <p className={styles.error} role="alert">{editError}</p>}<footer><button type="button" className={styles.deleteLink} onClick={() => setRemoving(true)} disabled={busy}>Löschen</button><button type="button" onClick={() => setEditing(null)} disabled={busy}>Abbrechen</button><button type="submit" className={styles.primary} disabled={busy}>{busy ? 'Speichert …' : 'Änderungen speichern'}</button></footer></form>}</Dialog>}
  </main>
}
