'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { formatWorkHours, summarizeTimerModalities } from '../dienste/findingTimerSummary'
import { MODALITIES, TARGET_MINUTES, dateValue, dateLabel, duration, serviceDate, editForm, editedTimer, totals } from './timerModel'
import TimerHistory from './TimerHistory'
import Dialog from './TimerDialog'
import Icon from './TimerIcon'
import styles from './timer.module.css'
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
  return <main className={styles.page} lang="de" dir="ltr">
    <header className={styles.pageHead}><h1>Befundtimer</h1><div className={styles.status} aria-live="polite">{loading ? 'Befundzeiten werden geladen …' : notice}</div></header>
    {error && <div className={styles.error} role="alert">{error}<button type="button" onClick={() => setReload(n => n + 1)}>Erneut laden</button></div>}
    <div className={styles.workspace}>
      <section className={styles.timerPanel} aria-label="Befundzeit erfassen"><h2>Diensttag · {dateLabel(today)}</h2>
        <div className={styles.timerControls}>
          <div className={`${styles.dial} ${extra ? styles.overtime : ''}`} style={{ '--progress': `${progress * 360}deg` }}><div><strong aria-label="Aktuelle Befundzeit">{duration(displayMs)}</strong><span>{extra ? `+${Math.ceil(extra / 300000) * 5} min extra` : `${target} min Ziel`}</span></div></div>
          <div className={styles.modalities} aria-label="Timer-Modalität">{MODALITIES.map(m => <button key={m} type="button" aria-pressed={m === modality} disabled={busy} onClick={() => setModality(m)}>{m}</button>)}</div>
          <div className={styles.countRow}><span>{TARGET_MINUTES[modality]} min / Befund</span><div><button type="button" aria-label="Ein Befund weniger" onClick={() => setCount(n => Math.max(1, n - 1))} disabled={busy || count <= 1}><Icon name="minus"/></button><strong>{count}</strong><button type="button" aria-label="Ein Befund mehr" onClick={() => setCount(n => Math.min(20, n + 1))} disabled={busy || count >= 20}><Icon name="plus"/></button></div></div>
          <div className={styles.timerActions}><button type="button" className={styles.primary} aria-label="Timer starten" disabled={!!started || busy} onClick={() => { const time = Date.now(); setNow(time); setStarted(time) }}><Icon name="play"/>Start</button><button type="button" aria-label="Timer halten" disabled={!started || busy} onClick={pause}><Icon name="pause"/>Pause</button><button type="button" aria-label="Timer zurücksetzen" disabled={!displayMs || busy} onClick={() => { setElapsed(0); setStarted(null); setNow(Date.now()) }}><Icon name="reset"/>Reset</button><button type="button" aria-label="Befundzeit speichern" disabled={!displayMs || busy || loading} onClick={finish}><Icon name="save"/>Speichern</button></div>
        </div>
        <div className={styles.todaySummary}><h3>Diensttag – Zusammenfassung</h3><div className={styles.todayTableHead}><span>Modalität</span><span>Befunde</span><span>Gesamt</span><span>Ø / Befund</span></div>{stats.map(stat => <button key={stat.modality} type="button" onClick={() => { setView('week'); setSelection({ date: today, modality: stat.modality }) }}><span><i className={styles.modalityDot} data-modality={stat.modality}/>{stat.modality}</span><strong>{stat.count}</strong><span>{duration(stat.totalMs)}</span><span>{stat.count ? duration(stat.avg) : '—'}</span></button>)}<div className={styles.todayTotal}><span>Gesamt</span><strong>{daily.count}</strong><strong>{formatWorkHours(daily.totalMs)}</strong></div></div>
      </section>
      <TimerHistory timers={timers} shifts={shifts} today={dateValue(now)} onEdit={openEdit} busy={busy} view={view} onViewChange={setView} selection={selection} onSelectionChange={setSelection}/>
    </div>
    {editing && <Dialog title={removing ? 'Befundzeit löschen?' : 'Befundzeit korrigieren'} onClose={() => { if (!busy) setEditing(null) }} busy={busy}>{removing ? <div className={styles.editForm}><p>Diese gespeicherte Befundzeit wird dauerhaft entfernt.</p>{editError && <p className={styles.error} role="alert">{editError}</p>}<footer><button type="button" onClick={() => setRemoving(false)} disabled={busy}>Abbrechen</button><button type="button" className={styles.destructive} onClick={remove} disabled={busy}>Endgültig löschen</button></footer></div> : <form className={styles.editForm} onSubmit={saveEdit}><div className={styles.formGrid}><label>Datum<input type="date" required value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}/></label><label>Modalität<select value={form.modality} onChange={e => setForm(f => ({ ...f, modality: e.target.value }))}>{MODALITIES.map(m => <option key={m}>{m}</option>)}</select></label></div><div className={styles.numberGrid}>{[['Minuten', 'minutes', 0], ['Sekunden', 'seconds', 0, 59], ['Befunde', 'count', 1, 20]].map(([label, field, min, max]) => <NumberField key={field} label={label} value={form[field]} min={min} max={max} onChange={value => setForm(f => ({ ...f, [field]: value }))}/>)}</div>{editError && <p className={styles.error} role="alert">{editError}</p>}<footer><button type="button" className={styles.deleteLink} onClick={() => setRemoving(true)} disabled={busy}>Löschen</button><button type="button" onClick={() => setEditing(null)} disabled={busy}>Abbrechen</button><button type="submit" className={styles.primary} disabled={busy}>{busy ? 'Speichert …' : 'Änderungen speichern'}</button></footer></form>}</Dialog>}
  </main>
}
