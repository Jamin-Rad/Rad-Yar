'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { controlSummary, filterControlFindings, findingStatus, findingTitle, PRIORITIES, STATUSES } from './findingControlData'
import styles from './page.module.css'

const MODALITIES = ['Röntgen', 'CT', 'MRT']
const AREAS = {
  CT: ['Schädel', 'HWS', 'Thorax', 'Abdomen', 'BBA', 'Obere Extremität', 'Untere Extremität'],
  Röntgen: ['Thorax', 'Abdomen', 'Becken', 'HWS', 'BWS', 'LWS', 'Schulter', 'Clavicula', 'Oberarm', 'Ellenbogen', 'Unterarm', 'Handgelenk', 'Hand', 'Finger', 'Hüfte', 'Oberschenkel', 'Knie', 'Unterschenkel', 'OSG', 'Fuß', 'Zehen'],
  MRT: ['Kopf', 'Wirbelsäule', 'Herz', 'Prostata', 'Mamma', 'Oberbauch', 'Becken', 'Sellink', 'Knie', 'Schulter', 'Hand', 'Ellenbogen', 'OSG', 'Sonstiges'],
}
const EMPTY_FILTER = { search: '', status: '', priority: '', modality: '', overdue: false, sort: 'due' }

function todayValue() {
  const date = new Date()
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function emptyForm() {
  return {
    type: 'question', examDate: todayValue(), dueDate: todayValue(), name: '', birthDate: '',
    modality: 'Röntgen', examArea: 'Thorax', reviewReason: '', reviewResult: '',
    priority: 'normal', status: 'offen',
  }
}

function displayDate(value, fallback = 'Ohne Datum') {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return fallback
  const [year, month, day] = value.split('-')
  return `${day}.${month}.${year}`
}

function controlsOnly(items) {
  return (items || []).filter(item => item.type === 'question')
}

function isOverdue(item) {
  return item.dueDate && item.dueDate < todayValue() && findingStatus(item.status) !== 'erledigt'
}

async function workRequest(method = 'GET', body = null, url = '/api/andarun/work') {
  const response = await fetch(url, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.error || 'Befundkontrollen konnten nicht geladen werden.')
  return data
}

export default function BefundKontrollePage() {
  const [controls, setControls] = useState([])
  const [filter, setFilter] = useState(EMPTY_FILTER)
  const [selectedId, setSelectedId] = useState(null)
  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const searchRef = useRef(null)

  useEffect(() => {
    let live = true
    workRequest().then(data => {
      if (!live) return
      setControls(controlsOnly(data.findings))
      setLoading(false)
    }).catch(cause => {
      if (!live) return
      setError(cause.message)
      setLoading(false)
    })
    return () => { live = false }
  }, [])

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') setForm(null)
      if (event.key === '/' && !form && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        event.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [form])

  const shown = useMemo(() => filterControlFindings(controls, filter), [controls, filter])
  const summary = useMemo(() => controlSummary(controls), [controls])
  const selected = shown.find(item => item.id === selectedId) || shown[0] || null
  const hasFilter = Object.entries(filter).some(([key, value]) => key !== 'sort' && value)

  function updateFilter(key, value) {
    setFilter(previous => ({ ...previous, [key]: value }))
  }

  function startNew() {
    setForm(emptyForm())
    setError('')
  }

  function startEdit(item) {
    setForm({
      ...emptyForm(),
      ...item,
      type: 'question',
      reviewReason: item.reviewReason || item.question || '',
      reviewResult: item.reviewResult || '',
      priority: item.priority || 'normal',
      status: findingStatus(item.status),
    })
    setError('')
  }

  async function save(event) {
    event.preventDefault()
    if (!form.reviewReason.trim()) {
      setError('Bitte eingeben, was kontrolliert oder geklärt werden muss.')
      return
    }
    setSaving(true)
    setError('')
    try {
      const finding = {
        ...form,
        type: 'question',
        question: form.reviewReason,
        id: form.id || `finding-${crypto.randomUUID()}`,
      }
      const data = await workRequest('POST', { type: 'finding', finding })
      setControls(controlsOnly(data.findings))
      setSelectedId(finding.id)
      setForm(null)
      setMessage(form.id ? 'Kontrolle aktualisiert.' : 'Kontrolle eingeplant.')
    } catch (cause) {
      setError(cause.message)
    } finally {
      setSaving(false)
    }
  }

  async function changeStatus(item, status) {
    setError('')
    try {
      const data = await workRequest('POST', { type: 'finding', finding: { ...item, type: 'question', status } })
      setControls(controlsOnly(data.findings))
      setSelectedId(item.id)
      setMessage(status === 'erledigt' ? 'Kontrolle erledigt.' : 'Status aktualisiert.')
    } catch (cause) {
      setError(cause.message)
    }
  }

  async function remove(item) {
    if (!window.confirm('Diese Befundkontrolle dauerhaft löschen?')) return
    setError('')
    try {
      const data = await workRequest('DELETE', null, `/api/andarun/work?type=finding&id=${encodeURIComponent(item.id)}`)
      setControls(controlsOnly(data.findings))
      if (selectedId === item.id) setSelectedId(null)
      setForm(null)
      setMessage('Kontrolle gelöscht.')
    } catch (cause) {
      setError(cause.message)
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>ANDARUN / BEFUNDE / KONTROLLE</span>
            <h1>Befundkontrolle</h1>
            <p>Offene Fragen gezielt nachverfolgen, klären und abschließen.</p>
          </div>
          <div className={styles.heroActions}>
            <nav className={styles.tabs} aria-label="Befunde Bereiche">
              <Link href="/andarun/befunde">Befundtimer</Link>
              <Link href="/andarun/befunde/faelle">Interessante Befunde</Link>
              <span aria-current="page">Befundkontrolle</span>
            </nav>
            <button className={styles.primary} type="button" onClick={startNew}>＋ Kontrolle einplanen</button>
          </div>
        </header>

        {(error || message) && <div className={error ? styles.error : styles.message} role={error ? 'alert' : 'status'}>{error || message}</div>}

        <section className={styles.overview} aria-label="Kontrollübersicht">
          {[
            ['Offen', summary.open, 'offen', '◷'],
            ['In Bearbeitung', summary.progress, 'in_bearbeitung', '↻'],
            ['Überfällig', summary.overdue, 'overdue', '!'],
            ['Erledigt', summary.done, 'erledigt', '✓'],
          ].map(([label, count, key, icon]) => (
            <button
              type="button"
              key={key}
              className={`${styles.metric} ${key === 'overdue' ? styles.metricAlert : ''} ${(key === 'overdue' ? filter.overdue : filter.status === key) ? styles.metricActive : ''}`}
              onClick={() => {
                if (key === 'overdue') setFilter(previous => ({ ...previous, overdue: !previous.overdue, status: '', sort: 'due' }))
                else setFilter(previous => ({ ...previous, overdue: false, status: previous.status === key ? '' : key }))
              }}
            >
              <span className={styles.metricIcon} aria-hidden="true">{icon}</span>
              <span><small>{label}</small><strong>{loading ? '…' : count}</strong></span>
            </button>
          ))}
        </section>

        <section className={styles.workspace} aria-label="Befundkontrollen verwalten">
          <div className={styles.filterBar}>
            <label className={styles.search}><span>Suche</span><input ref={searchRef} type="search" placeholder="Patient, Aufgabe, Ergebnis …" value={filter.search} onChange={event => updateFilter('search', event.target.value)} /><kbd>/</kbd></label>
            <label><span>Status</span><select value={filter.status} onChange={event => updateFilter('status', event.target.value)}><option value="">Alle</option>{STATUSES.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
            <label><span>Priorität</span><select value={filter.priority} onChange={event => updateFilter('priority', event.target.value)}><option value="">Alle</option>{PRIORITIES.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
            <label><span>Modalität</span><select value={filter.modality} onChange={event => updateFilter('modality', event.target.value)}><option value="">Alle</option>{MODALITIES.map(item => <option key={item}>{item}</option>)}</select></label>
            <label><span>Sortierung</span><select value={filter.sort} onChange={event => updateFilter('sort', event.target.value)}><option value="due">Fälligkeit</option><option value="priority">Priorität</option><option value="newest">Neueste zuerst</option><option value="oldest">Älteste zuerst</option></select></label>
            {hasFilter && <button type="button" className={styles.reset} onClick={() => setFilter(EMPTY_FILTER)}>Filter zurücksetzen</button>}
          </div>

          <div className={styles.split}>
            <section className={styles.listPanel} aria-label="Kontrollliste">
              <div className={styles.panelHeader}><div><span className={styles.eyebrow}>ARBEITSLISTE</span><h2>Zu kontrollieren <em>{shown.length}</em></h2></div></div>
              <div className={styles.reviewTableHead}><span>Fällig</span><span>Patient</span><span>Kontrollauftrag</span><span>Bereich</span><span>Priorität</span><span>Status</span></div>
              <div className={styles.rows}>
                {shown.map(item => (
                  <button type="button" key={item.id} className={`${styles.reviewRow} ${selected?.id === item.id ? styles.rowActive : ''} ${isOverdue(item) ? styles.reviewRowOverdue : ''}`} onClick={() => setSelectedId(item.id)} aria-pressed={selected?.id === item.id}>
                    <span className={isOverdue(item) ? styles.dueOverdue : ''}>{displayDate(item.dueDate, 'Keine Frist')}</span>
                    <span><strong>{item.name || 'Ohne Namen'}</strong><small>{displayDate(item.examDate, 'Untersuchungsdatum offen')}</small></span>
                    <span className={styles.rowTopic}>{findingTitle(item)}</span>
                    <span>{item.modality || '—'}<small>{item.examArea || '—'}</small></span>
                    <span className={`${styles.priority} ${styles[item.priority || 'normal']}`}>{PRIORITIES.find(priority => priority.id === (item.priority || 'normal'))?.label}</span>
                    <span className={`${styles.status} ${styles[findingStatus(item.status)]}`}>{STATUSES.find(status => status.id === findingStatus(item.status))?.label}</span>
                  </button>
                ))}
                {!loading && !shown.length && <div className={styles.empty}><span aria-hidden="true">✓</span><h3>{hasFilter ? 'Keine passenden Kontrollen' : 'Keine offenen Kontrollen'}</h3><p>{hasFilter ? 'Passe die Filter an oder setze sie zurück.' : 'Plane hier nur Befunde ein, die noch geprüft oder geklärt werden müssen.'}</p><button type="button" onClick={hasFilter ? () => setFilter(EMPTY_FILTER) : startNew}>{hasFilter ? 'Filter zurücksetzen' : 'Kontrolle einplanen'}</button></div>}
                {loading && <div className={styles.empty}>Kontrollen werden geladen …</div>}
              </div>
            </section>

            <aside className={styles.detailPanel} aria-label="Kontrolldetails">
              {selected ? <>
                <div className={styles.panelHeader}><div><span className={styles.eyebrow}>KONTROLLAUFTRAG</span><h2>Details</h2></div><span className={`${styles.status} ${styles[findingStatus(selected.status)]}`}>{STATUSES.find(status => status.id === findingStatus(selected.status))?.label}</span></div>
                <div className={styles.detailBody}>
                  <div className={styles.controlDeadline}><span>{findingStatus(selected.status) === 'erledigt' ? 'ERLEDIGT' : isOverdue(selected) ? 'ÜBERFÄLLIG' : 'FÄLLIG'}</span><strong>{displayDate(selected.dueDate, 'Keine Frist')}</strong></div>
                  <h3>{findingTitle(selected)}</h3>
                  <div className={styles.meta}><span>{selected.modality || 'Modalität offen'}</span><span>{selected.examArea || 'Gebiet offen'}</span><span className={`${styles.priority} ${styles[selected.priority || 'normal']}`}>{PRIORITIES.find(priority => priority.id === (selected.priority || 'normal'))?.label}</span></div>
                  <div className={styles.factGrid}>
                    <div><small>Patient</small><strong>{selected.name || '—'}</strong></div>
                    <div><small>Geburtsdatum</small><strong>{displayDate(selected.birthDate, '—')}</strong></div>
                    <div><small>Untersuchungsdatum</small><strong>{displayDate(selected.examDate, '—')}</strong></div>
                    <div><small>Bereich</small><strong>{selected.modality || '—'} · {selected.examArea || '—'}</strong></div>
                  </div>
                  <div className={styles.textBlock}><small>Was muss geprüft werden?</small><p>{findingTitle(selected)}</p></div>
                  {selected.reviewResult && <div className={styles.resultBlock}><small>Ergebnis / Rückmeldung</small><p>{selected.reviewResult}</p></div>}
                  <label className={styles.statusEditor}><span>Status ändern</span><select value={findingStatus(selected.status)} onChange={event => changeStatus(selected, event.target.value)}>{STATUSES.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
                </div>
                <div className={styles.detailActions}><button type="button" className={styles.primary} onClick={() => startEdit(selected)}>Bearbeiten</button>{findingStatus(selected.status) !== 'erledigt' && <button type="button" onClick={() => changeStatus(selected, 'erledigt')}>Als erledigt markieren</button>}<button type="button" className={styles.danger} onClick={() => remove(selected)}>Löschen</button></div>
              </> : <div className={styles.noSelection}><span aria-hidden="true">◷</span><h2>Kontrollen statt Sammlung</h2><p>Hier erscheinen ausschließlich Befunde, bei denen noch eine konkrete Prüfung offen ist.</p><button type="button" onClick={startNew}>Kontrolle einplanen</button></div>}
            </aside>
          </div>
        </section>
      </div>

      {form && <div className={styles.backdrop} role="presentation" onMouseDown={() => setForm(null)}><div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="form-title" onMouseDown={event => event.stopPropagation()}>
        <div className={styles.modalHead}><div><span className={styles.eyebrow}>{form.id ? 'KONTROLLE BEARBEITEN' : 'KONTROLLE EINPLANEN'}</span><h2 id="form-title">{form.id ? 'Kontrollauftrag bearbeiten' : 'Neue Befundkontrolle'}</h2></div><button type="button" aria-label="Schließen" onClick={() => setForm(null)}>×</button></div>
        <form className={styles.form} onSubmit={save}>
          <div className={styles.controlFormIntro}><strong>Was ist noch offen?</strong><span>Ein klarer Auftrag mit Frist und Priorität – kein Fallarchiv.</span></div>
          <label className={styles.wide}><span>Kontrollauftrag *</span><textarea rows="4" value={form.reviewReason || ''} onChange={event => setForm(previous => ({ ...previous, reviewReason: event.target.value }))} placeholder="Was muss geprüft, verglichen oder rückgefragt werden?" /></label>
          <div className={styles.formGrid}>
            <label><span>Fällig am</span><input type="date" value={form.dueDate || ''} onChange={event => setForm(previous => ({ ...previous, dueDate: event.target.value }))} /></label>
            <label><span>Priorität</span><select value={form.priority || 'normal'} onChange={event => setForm(previous => ({ ...previous, priority: event.target.value }))}>{PRIORITIES.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
            <label><span>Patient</span><input value={form.name || ''} onChange={event => setForm(previous => ({ ...previous, name: event.target.value }))} /></label>
            <label><span>Geburtsdatum</span><input type="date" value={form.birthDate || ''} onChange={event => setForm(previous => ({ ...previous, birthDate: event.target.value }))} /></label>
            <label><span>Untersuchungsdatum</span><input type="date" value={form.examDate || ''} onChange={event => setForm(previous => ({ ...previous, examDate: event.target.value }))} /></label>
            <label><span>Status</span><select value={findingStatus(form.status)} onChange={event => setForm(previous => ({ ...previous, status: event.target.value }))}>{STATUSES.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
            <label><span>Modalität</span><select value={form.modality || 'Röntgen'} onChange={event => setForm(previous => ({ ...previous, modality: event.target.value, examArea: AREAS[event.target.value]?.[0] || '' }))}>{MODALITIES.map(item => <option key={item}>{item}</option>)}</select></label>
            <label><span>Untersuchungsgebiet</span><select value={form.examArea || ''} onChange={event => setForm(previous => ({ ...previous, examArea: event.target.value }))}>{!AREAS[form.modality]?.includes(form.examArea) && form.examArea && <option>{form.examArea}</option>}{(AREAS[form.modality] || []).map(item => <option key={item}>{item}</option>)}</select></label>
          </div>
          <label className={styles.wide}><span>Ergebnis / Rückmeldung</span><textarea rows="3" value={form.reviewResult || ''} onChange={event => setForm(previous => ({ ...previous, reviewResult: event.target.value }))} placeholder="Nach der Kontrolle hier das Ergebnis dokumentieren." /></label>
          {error && <div className={styles.error} role="alert">{error}</div>}
          <div className={styles.formActions}><button type="button" onClick={() => setForm(null)}>Abbrechen</button><button type="submit" className={styles.primary} disabled={saving}>{saving ? 'Speichern …' : 'Kontrolle speichern'}</button></div>
        </form>
      </div></div>}
    </main>
  )
}
