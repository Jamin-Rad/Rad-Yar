'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { controlSummary, filterControlFindings, findingStatus, findingTitle, STATUSES } from './findingControlData'
import styles from './page.module.css'

const MODALITIES = ['Röntgen', 'CT', 'MRT']
const AREAS = {
  CT: ['Schädel', 'HWS', 'Thorax', 'Abdomen', 'BBA', 'Obere Extremität', 'Untere Extremität'],
  Röntgen: ['Thorax', 'Abdomen', 'Becken', 'HWS', 'BWS', 'LWS', 'Schulter', 'Clavicula', 'Oberarm', 'Ellenbogen', 'Unterarm', 'Handgelenk', 'Hand', 'Finger', 'Hüfte', 'Oberschenkel', 'Knie', 'Unterschenkel', 'OSG', 'Fuß', 'Zehen'],
  MRT: ['Kopf', 'Wirbelsäule', 'Herz', 'Prostata', 'Mamma', 'Oberbauch', 'Becken', 'Sellink', 'Knie', 'Schulter', 'Hand', 'Ellenbogen', 'OSG', 'Sonstiges'],
}
const EMPTY_FILTER = { search: '', type: '', modality: '', status: '', from: '', to: '', sort: 'newest' }
const TODAY = () => {
  const date = new Date()
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
const EMPTY_FORM = () => ({
  type: 'case', examDate: TODAY(), name: '', birthDate: '', modality: 'Röntgen', examArea: 'Thorax',
  exam: '', diagnosis: '', vd: '', organ: '', question: '', status: 'offen',
})

function displayDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return 'Ohne Datum'
  const [year, month, day] = value.split('-')
  return `${day}.${month}.${year}`
}

async function workRequest(method = 'GET', body = null, url = '/api/andarun/work') {
  const response = await fetch(url, { method, headers: body ? { 'Content-Type': 'application/json' } : undefined, body: body ? JSON.stringify(body) : undefined, cache: 'no-store' })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.error || 'Befunde konnten nicht geladen werden.')
  return data
}

export default function BefundKontrollePage() {
  const [findings, setFindings] = useState([])
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
      setFindings(data.findings || [])
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

  const shown = useMemo(() => filterControlFindings(findings, filter), [findings, filter])
  const summary = useMemo(() => controlSummary(findings), [findings])
  const selected = shown.find(item => item.id === selectedId) || shown[0] || null
  const hasFilter = Object.entries(filter).some(([key, value]) => key !== 'sort' && value)

  function updateFilter(key, value) {
    setFilter(previous => ({ ...previous, [key]: value }))
  }

  function startNew(type = 'case') {
    setForm({ ...EMPTY_FORM(), type })
    setError('')
  }

  function startEdit(item) {
    setForm({ ...EMPTY_FORM(), ...item, status: findingStatus(item.status) })
    setError('')
  }

  function duplicate(item) {
    const copy = { ...EMPTY_FORM(), ...item, examDate: TODAY(), status: 'offen' }
    delete copy.id
    delete copy.createdAt
    delete copy.updatedAt
    setForm(copy)
    setError('')
  }

  async function save(event) {
    event.preventDefault()
    if (!form.examDate && !form.question.trim()) {
      setError('Bitte Untersuchungsdatum oder Fragestellung eingeben.')
      return
    }
    setSaving(true)
    setError('')
    try {
      const finding = { ...form, id: form.id || `finding-${crypto.randomUUID()}` }
      const data = await workRequest('POST', { type: 'finding', finding })
      setFindings(data.findings || [])
      setSelectedId(finding.id)
      setForm(null)
      setMessage(form.id ? 'Eintrag aktualisiert.' : 'Eintrag gespeichert.')
    } catch (cause) {
      setError(cause.message)
    } finally {
      setSaving(false)
    }
  }

  async function changeStatus(item, status) {
    setError('')
    try {
      const data = await workRequest('POST', { type: 'finding', finding: { ...item, status } })
      setFindings(data.findings || [])
      setSelectedId(item.id)
      setMessage('Status aktualisiert.')
    } catch (cause) {
      setError(cause.message)
    }
  }

  async function remove(item) {
    if (!window.confirm('Diesen Eintrag dauerhaft löschen?')) return
    setError('')
    try {
      const data = await workRequest('DELETE', null, `/api/andarun/work?type=finding&id=${encodeURIComponent(item.id)}`)
      setFindings(data.findings || [])
      if (selectedId === item.id) setSelectedId(null)
      setForm(null)
      setMessage('Eintrag gelöscht.')
    } catch (cause) {
      setError(cause.message)
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>ANDARUN / BEFUNDE</span>
            <h1>Befundkontrolle</h1>
            <p>Relevante Fälle und Verlaufskontrollen im Blick behalten.</p>
          </div>
          <div className={styles.heroActions}>
            <nav className={styles.tabs} aria-label="Befunde Bereiche">
              <Link href="/andarun/befunde">Befundtimer</Link>
              <span aria-current="page">Befundkontrolle</span>
            </nav>
            <button className={styles.primary} type="button" onClick={() => startNew()}>＋ Neuer Eintrag</button>
          </div>
        </header>

        {(error || message) && <div className={error ? styles.error : styles.message} role={error ? 'alert' : 'status'}>{error || message}</div>}

        <section className={styles.overview} aria-label="Überblick">
          {[
            ['Alle Befunde', summary.all, 'all'], ['Offen', summary.open, 'open'],
            ['In Bearbeitung', summary.progress, 'progress'], ['Erledigt', summary.done, 'done'],
          ].map(([label, count, key]) => (
            <button type="button" key={key} className={`${styles.metric} ${filter.status === (key === 'progress' ? 'in_bearbeitung' : key === 'done' ? 'erledigt' : key === 'open' ? 'offen' : '') ? styles.metricActive : ''}`}
              onClick={() => updateFilter('status', key === 'all' ? '' : key === 'progress' ? 'in_bearbeitung' : key === 'done' ? 'erledigt' : 'offen')}>
              <span className={styles.metricIcon} aria-hidden="true">{key === 'all' ? '▤' : key === 'open' ? '◷' : key === 'progress' ? '↻' : '✓'}</span>
              <span><small>{label}</small><strong>{loading ? '…' : count}</strong></span>
            </button>
          ))}
        </section>

        <section className={styles.workspace} aria-label="Befunde verwalten">
          <div className={styles.filterBar}>
            <label className={styles.search}><span>Suche</span><input ref={searchRef} type="search" placeholder="Name, Diagnose, Frage, Gebiet …" value={filter.search} onChange={event => updateFilter('search', event.target.value)} /><kbd>/</kbd></label>
            <label><span>Art</span><select value={filter.type} onChange={event => updateFilter('type', event.target.value)}><option value="">Alle</option><option value="case">Relevante Fälle</option><option value="question">Verlauf / Fragen</option></select></label>
            <label><span>Modalität</span><select value={filter.modality} onChange={event => updateFilter('modality', event.target.value)}><option value="">Alle</option>{MODALITIES.map(item => <option key={item}>{item}</option>)}</select></label>
            <label><span>Status</span><select value={filter.status} onChange={event => updateFilter('status', event.target.value)}><option value="">Alle</option>{STATUSES.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
            <label><span>Sortierung</span><select value={filter.sort} onChange={event => updateFilter('sort', event.target.value)}><option value="newest">Neueste zuerst</option><option value="oldest">Älteste zuerst</option><option value="name">Name / Thema</option></select></label>
            <div className={styles.dateFilters}>
              <label><span>Von</span><input type="date" value={filter.from} onChange={event => updateFilter('from', event.target.value)} /></label>
              <label><span>Bis</span><input type="date" value={filter.to} onChange={event => updateFilter('to', event.target.value)} /></label>
              {hasFilter && <button type="button" className={styles.reset} onClick={() => setFilter(EMPTY_FILTER)}>Filter zurücksetzen</button>}
            </div>
          </div>

          <div className={styles.split}>
            <section className={styles.listPanel} aria-label="Befundliste">
              <div className={styles.panelHeader}><div><span className={styles.eyebrow}>ARBEITSLISTE</span><h2>Befunde <em>{shown.length}</em></h2></div><div className={styles.typeButtons}><button type="button" className={!filter.type ? styles.pillActive : ''} onClick={() => updateFilter('type', '')}>Alle</button><button type="button" className={filter.type === 'case' ? styles.pillActive : ''} onClick={() => updateFilter('type', 'case')}>Fälle</button><button type="button" className={filter.type === 'question' ? styles.pillActive : ''} onClick={() => updateFilter('type', 'question')}>Fragen</button></div></div>
              <div className={styles.tableHead}><span>Datum</span><span>Art / Person</span><span>Modalität</span><span>Gebiet</span><span>Thema</span><span>Status</span></div>
              <div className={styles.rows}>
                {shown.map(item => <button type="button" key={item.id} className={`${styles.row} ${selected?.id === item.id ? styles.rowActive : ''}`} onClick={() => setSelectedId(item.id)} aria-pressed={selected?.id === item.id}>
                  <span>{displayDate(item.examDate)}</span><span><strong>{item.name || (item.type === 'question' ? 'Verlauf / Frage' : 'Relevanter Fall')}</strong><small>{item.type === 'question' ? 'Verlaufskontrolle' : 'Fall'}</small></span><span>{item.modality || '—'}</span><span>{item.examArea || '—'}</span><span className={styles.rowTopic}>{findingTitle(item)}</span><span className={`${styles.status} ${styles[findingStatus(item.status)]}`}>{STATUSES.find(status => status.id === findingStatus(item.status))?.label}</span>
                </button>)}
                {!loading && !shown.length && <div className={styles.empty}><span aria-hidden="true">◇</span><h3>{hasFilter ? 'Keine passenden Befunde' : 'Noch keine Befunde erfasst'}</h3><p>{hasFilter ? 'Passe die Filter an oder setze sie zurück.' : 'Erfasse einen relevanten Fall oder eine Verlaufskontrolle.'}</p><button type="button" onClick={hasFilter ? () => setFilter(EMPTY_FILTER) : () => startNew()}>{hasFilter ? 'Filter zurücksetzen' : 'Neuen Eintrag erfassen'}</button></div>}
                {loading && <div className={styles.empty}>Befunde werden geladen …</div>}
              </div>
            </section>

            <aside className={styles.detailPanel} aria-label="Befunddetails">
              {selected ? <>
                <div className={styles.panelHeader}><div><span className={styles.eyebrow}>AUSGEWÄHLTER EINTRAG</span><h2>Details</h2></div><span className={`${styles.status} ${styles[findingStatus(selected.status)]}`}>{STATUSES.find(status => status.id === findingStatus(selected.status))?.label}</span></div>
                <div className={styles.detailBody}>
                  <span className={styles.detailType}>{selected.type === 'question' ? 'Verlaufskontrolle / Frage' : 'Relevanter Fall'}</span>
                  <h3>{findingTitle(selected)}</h3>
                  <div className={styles.meta}><span>{selected.modality || 'Modalität offen'}</span><span>{selected.examArea || 'Gebiet offen'}</span><span>{displayDate(selected.examDate)}</span></div>
                  <div className={styles.factGrid}>
                    <div><small>Name</small><strong>{selected.name || '—'}</strong></div><div><small>Geburtsdatum</small><strong>{selected.birthDate ? displayDate(selected.birthDate) : '—'}</strong></div>
                    <div><small>Untersuchung</small><strong>{selected.exam || '—'}</strong></div><div><small>Organ</small><strong>{selected.organ || '—'}</strong></div>
                  </div>
                  {selected.diagnosis && <div className={styles.textBlock}><small>Diagnose</small><p>{selected.diagnosis}</p></div>}
                  {selected.vd && <div className={styles.textBlock}><small>Verdachtsdiagnose</small><p>{selected.vd}</p></div>}
                  {selected.question && <div className={styles.textBlock}><small>Fragestellung / Verlauf</small><p>{selected.question}</p></div>}
                  <label className={styles.statusEditor}><span>Status ändern</span><select value={findingStatus(selected.status)} onChange={event => changeStatus(selected, event.target.value)}>{STATUSES.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
                </div>
                <div className={styles.detailActions}><button type="button" className={styles.primary} onClick={() => startEdit(selected)}>Bearbeiten</button><button type="button" onClick={() => duplicate(selected)}>Duplizieren</button><button type="button" className={styles.danger} onClick={() => remove(selected)}>Löschen</button></div>
              </> : <div className={styles.noSelection}><span aria-hidden="true">◎</span><h2>Ein Befund. Alle Details.</h2><p>Wähle links einen Eintrag, um ihn hier anzusehen und zu bearbeiten.</p><button type="button" onClick={() => startNew()}>Neuen Eintrag erfassen</button></div>}
            </aside>
          </div>
        </section>
      </div>

      {form && <div className={styles.backdrop} role="presentation" onMouseDown={() => setForm(null)}><div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="form-title" onMouseDown={event => event.stopPropagation()}>
        <div className={styles.modalHead}><div><span className={styles.eyebrow}>{form.id ? 'BEFUND BEARBEITEN' : 'BEFUND ERFASSEN'}</span><h2 id="form-title">{form.id ? 'Eintrag bearbeiten' : 'Neuer Eintrag'}</h2></div><button type="button" aria-label="Schließen" onClick={() => setForm(null)}>×</button></div>
        <form className={styles.form} onSubmit={save}>
          <div className={styles.formGrid}>
            <label><span>Art</span><select value={form.type} onChange={event => setForm(previous => ({ ...previous, type: event.target.value }))}><option value="case">Relevanter Fall</option><option value="question">Verlaufskontrolle / Frage</option></select></label>
            <label><span>Untersuchungsdatum</span><input type="date" value={form.examDate || ''} onChange={event => setForm(previous => ({ ...previous, examDate: event.target.value }))} /></label>
            <label><span>Name</span><input value={form.name || ''} onChange={event => setForm(previous => ({ ...previous, name: event.target.value }))} /></label>
            <label><span>Geburtsdatum</span><input type="date" value={form.birthDate || ''} onChange={event => setForm(previous => ({ ...previous, birthDate: event.target.value }))} /></label>
            <label><span>Modalität</span><select value={form.modality || 'Röntgen'} onChange={event => setForm(previous => ({ ...previous, modality: event.target.value, examArea: AREAS[event.target.value]?.[0] || '' }))}>{MODALITIES.map(item => <option key={item}>{item}</option>)}</select></label>
            <label><span>Untersuchungsgebiet</span><select value={form.examArea || ''} onChange={event => setForm(previous => ({ ...previous, examArea: event.target.value }))}>{!AREAS[form.modality]?.includes(form.examArea) && form.examArea && <option>{form.examArea}</option>}{(AREAS[form.modality] || []).map(item => <option key={item}>{item}</option>)}</select></label>
            <label><span>Untersuchung</span><input value={form.exam || ''} onChange={event => setForm(previous => ({ ...previous, exam: event.target.value }))} /></label>
            <label><span>Organ</span><input value={form.organ || ''} onChange={event => setForm(previous => ({ ...previous, organ: event.target.value }))} /></label>
            <label><span>Diagnose</span><input value={form.diagnosis || ''} onChange={event => setForm(previous => ({ ...previous, diagnosis: event.target.value }))} /></label>
            <label><span>Verdachtsdiagnose</span><input value={form.vd || ''} onChange={event => setForm(previous => ({ ...previous, vd: event.target.value }))} /></label>
            <label><span>Status</span><select value={findingStatus(form.status)} onChange={event => setForm(previous => ({ ...previous, status: event.target.value }))}>{STATUSES.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
          </div>
          <label className={styles.wide}><span>Fragestellung / Verlauf</span><textarea rows="4" value={form.question || ''} onChange={event => setForm(previous => ({ ...previous, question: event.target.value }))} placeholder="Was soll kontrolliert oder geklärt werden?" /></label>
          {error && <div className={styles.error} role="alert">{error}</div>}
          <div className={styles.formActions}><button type="button" onClick={() => setForm(null)}>Abbrechen</button><button type="submit" className={styles.primary} disabled={saving}>{saving ? 'Speichern …' : 'Eintrag speichern'}</button></div>
        </form>
      </div></div>}
    </main>
  )
}
