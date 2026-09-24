'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './page.module.css'

const MODALITIES = ['Röntgen', 'CT', 'MRT']
const AREAS = {
  CT: ['Schädel', 'HWS', 'Thorax', 'Abdomen', 'BBA', 'Obere Extremität', 'Untere Extremität'],
  Röntgen: ['Thorax', 'Abdomen', 'Becken', 'HWS', 'BWS', 'LWS', 'Schulter', 'Clavicula', 'Oberarm', 'Ellenbogen', 'Unterarm', 'Handgelenk', 'Hand', 'Finger', 'Hüfte', 'Oberschenkel', 'Knie', 'Unterschenkel', 'OSG', 'Fuß', 'Zehen'],
  MRT: ['Kopf', 'Wirbelsäule', 'Herz', 'Prostata', 'Mamma', 'Oberbauch', 'Becken', 'Sellink', 'Knie', 'Schulter', 'Hand', 'Ellenbogen', 'OSG', 'Sonstiges'],
}
const EMPTY_FILTER = { search: '', modality: '', area: '', sort: 'newest' }

function todayValue() {
  const date = new Date()
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function emptyForm() {
  return {
    type: 'case', examDate: todayValue(), name: '', birthDate: '', modality: 'Röntgen',
    examArea: 'Thorax', organ: '', diagnosis: '', keyFinding: '', learningPoint: '', tags: '',
  }
}

function displayDate(value, fallback = 'Ohne Datum') {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return fallback
  const [year, month, day] = value.split('-')
  return `${day}.${month}.${year}`
}

function archiveOnly(items) {
  return (items || []).filter(item => item.type !== 'question')
}

function archiveTitle(item) {
  return item.diagnosis || item.exam || item.vd || 'Interessanter Befund'
}

function archiveFinding(item) {
  return item.keyFinding || item.vd || item.question || ''
}

function archiveTags(value) {
  return [...new Set(String(value || '').split(',').map(tag => tag.trim()).filter(Boolean))]
}

function filterArchive(items, filter) {
  const term = filter.search.trim().toLocaleLowerCase('de')
  const collator = new Intl.Collator('de', { sensitivity: 'base', numeric: true })
  return items.filter(item => {
    if (filter.modality && item.modality !== filter.modality) return false
    if (filter.area && item.examArea !== filter.area) return false
    if (!term) return true
    return [item.diagnosis, item.keyFinding, item.learningPoint, item.tags, item.examArea, item.organ, item.modality, item.name]
      .some(value => String(value || '').toLocaleLowerCase('de').includes(term))
  }).sort((a, b) => {
    if (filter.sort === 'diagnosis') return collator.compare(archiveTitle(a), archiveTitle(b))
    if (filter.sort === 'oldest') return collator.compare(a.examDate || a.createdAt || '', b.examDate || b.createdAt || '')
    return -collator.compare(a.examDate || a.createdAt || '', b.examDate || b.createdAt || '')
  })
}

async function workRequest(method = 'GET', body = null, url = '/api/andarun/work') {
  const response = await fetch(url, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.error || 'Interessante Befunde konnten nicht geladen werden.')
  return data
}

export default function InteressanteBefundePage() {
  const [cases, setCases] = useState([])
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
      setCases(archiveOnly(data.findings))
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

  const shown = useMemo(() => filterArchive(cases, filter), [cases, filter])
  const selected = shown.find(item => item.id === selectedId) || shown[0] || null
  const areas = useMemo(() => [...new Set(cases.map(item => item.examArea).filter(Boolean))].sort(), [cases])
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
      type: 'case',
      keyFinding: archiveFinding(item),
      learningPoint: item.learningPoint || '',
      tags: item.tags || '',
    })
    setError('')
  }

  function duplicate(item) {
    const copy = { ...emptyForm(), ...item, type: 'case', examDate: todayValue(), name: '', birthDate: '' }
    delete copy.id
    delete copy.createdAt
    delete copy.updatedAt
    setForm(copy)
    setError('')
  }

  async function save(event) {
    event.preventDefault()
    if (!form.diagnosis.trim()) {
      setError('Bitte eine Diagnose oder einen eindeutigen Falltitel eingeben.')
      return
    }
    setSaving(true)
    setError('')
    try {
      const finding = { ...form, type: 'case', id: form.id || `finding-${crypto.randomUUID()}` }
      const data = await workRequest('POST', { type: 'finding', finding })
      setCases(archiveOnly(data.findings))
      setSelectedId(finding.id)
      setForm(null)
      setMessage(form.id ? 'Fall aktualisiert.' : 'Fall im Wissensarchiv gespeichert.')
    } catch (cause) {
      setError(cause.message)
    } finally {
      setSaving(false)
    }
  }

  async function remove(item) {
    if (!window.confirm('Diesen interessanten Befund dauerhaft löschen?')) return
    setError('')
    try {
      const data = await workRequest('DELETE', null, `/api/andarun/work?type=finding&id=${encodeURIComponent(item.id)}`)
      setCases(archiveOnly(data.findings))
      if (selectedId === item.id) setSelectedId(null)
      setForm(null)
      setMessage('Fall gelöscht.')
    } catch (cause) {
      setError(cause.message)
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.hero}>
          <div>
            <span className={styles.eyebrow}>ANDARUN / BEFUNDE / WISSENSARCHIV</span>
            <h1>Interessante Befunde</h1>
            <p>Wichtige Fälle sammeln, Muster festhalten und später gezielt wiederfinden.</p>
          </div>
          <div className={styles.heroActions}>
            <nav className={styles.tabs} aria-label="Befunde Bereiche">
              <Link href="/andarun/befunde">Befundtimer</Link>
              <span aria-current="page">Interessante Befunde</span>
              <Link href="/andarun/befunde/kontrolle">Befundkontrolle</Link>
            </nav>
            <button className={styles.primary} type="button" onClick={startNew}>＋ Interessanten Fall erfassen</button>
          </div>
        </header>

        {(error || message) && <div className={error ? styles.error : styles.message} role={error ? 'alert' : 'status'}>{error || message}</div>}

        <section className={styles.toolbar} aria-label="Fallarchiv filtern">
          <label className={styles.search}><span>Archiv durchsuchen</span><input ref={searchRef} type="search" placeholder="Diagnose, Befund, Lernpunkt, Tag …" value={filter.search} onChange={event => updateFilter('search', event.target.value)} /><kbd>/</kbd></label>
          <label><span>Modalität</span><select value={filter.modality} onChange={event => updateFilter('modality', event.target.value)}><option value="">Alle</option>{MODALITIES.map(item => <option key={item}>{item}</option>)}</select></label>
          <label><span>Gebiet</span><select value={filter.area} onChange={event => updateFilter('area', event.target.value)}><option value="">Alle</option>{areas.map(item => <option key={item}>{item}</option>)}</select></label>
          <label><span>Sortierung</span><select value={filter.sort} onChange={event => updateFilter('sort', event.target.value)}><option value="newest">Neueste zuerst</option><option value="oldest">Älteste zuerst</option><option value="diagnosis">Diagnose A–Z</option></select></label>
          {hasFilter && <button type="button" className={styles.reset} onClick={() => setFilter(EMPTY_FILTER)}>Zurücksetzen</button>}
        </section>

        <section className={styles.archiveLayout}>
          <div className={styles.library}>
            <div className={styles.libraryHead}><div><span className={styles.eyebrow}>FALLBIBLIOTHEK</span><h2>{shown.length} gespeicherte Fälle</h2></div><p>Kein Aufgabenstatus, keine Frist – nur medizinisch relevante Inhalte.</p></div>
            <div className={styles.caseGrid}>
              {shown.map(item => (
                <button type="button" key={item.id} className={`${styles.caseCard} ${selected?.id === item.id ? styles.caseCardActive : ''}`} onClick={() => setSelectedId(item.id)} aria-pressed={selected?.id === item.id}>
                  <span className={styles.caseMeta}><b>{item.modality || '—'}</b><i>{item.examArea || 'Gebiet offen'}</i><time>{displayDate(item.examDate)}</time></span>
                  <h3>{archiveTitle(item)}</h3>
                  <p>{archiveFinding(item) || 'Noch kein Schlüsselfund dokumentiert.'}</p>
                  {item.learningPoint && <strong>Merke: {item.learningPoint}</strong>}
                  {archiveTags(item.tags).length > 0 && <span className={styles.tags}>{archiveTags(item.tags).map(tag => <em key={tag}>{tag}</em>)}</span>}
                </button>
              ))}
              {!loading && !shown.length && <div className={styles.empty}><span aria-hidden="true">◇</span><h3>{hasFilter ? 'Keine passenden Fälle' : 'Noch keine interessanten Befunde'}</h3><p>{hasFilter ? 'Passe die Filter an oder setze sie zurück.' : 'Speichere hier Fälle, aus denen du fachlich etwas mitnehmen möchtest.'}</p><button type="button" onClick={hasFilter ? () => setFilter(EMPTY_FILTER) : startNew}>{hasFilter ? 'Filter zurücksetzen' : 'Ersten Fall erfassen'}</button></div>}
              {loading && <div className={styles.empty}>Fallarchiv wird geladen …</div>}
            </div>
          </div>

          <aside className={styles.detailPanel} aria-label="Falldetails">
            {selected ? <>
              <div className={styles.detailHead}><span className={styles.eyebrow}>AUSGEWÄHLTER FALL</span><h2>{archiveTitle(selected)}</h2><div><span>{selected.modality || '—'}</span><span>{selected.examArea || '—'}</span><span>{displayDate(selected.examDate)}</span></div></div>
              <div className={styles.detailBody}>
                <section><small>Schlüsselfund</small><p>{archiveFinding(selected) || '—'}</p></section>
                <section className={styles.learning}><small>Lernpunkt</small><p>{selected.learningPoint || '—'}</p></section>
                <dl><div><dt>Organ</dt><dd>{selected.organ || '—'}</dd></div><div><dt>Patient / Referenz</dt><dd>{selected.name || '—'}{selected.birthDate ? ` · ${displayDate(selected.birthDate)}` : ''}</dd></div></dl>
                {archiveTags(selected.tags).length > 0 && <div className={styles.detailTags}>{archiveTags(selected.tags).map(tag => <span key={tag}>{tag}</span>)}</div>}
              </div>
              <div className={styles.detailActions}><button type="button" className={styles.primary} onClick={() => startEdit(selected)}>Bearbeiten</button><button type="button" onClick={() => duplicate(selected)}>Als Vorlage</button><button type="button" className={styles.danger} onClick={() => remove(selected)}>Löschen</button></div>
            </> : <div className={styles.noSelection}><span aria-hidden="true">◇</span><h2>Dein persönliches Fallarchiv</h2><p>Wähle einen Fall, um Schlüsselfund und Lernpunkt zu sehen.</p><button type="button" onClick={startNew}>Fall erfassen</button></div>}
          </aside>
        </section>
      </div>

      {form && <div className={styles.backdrop} role="presentation" onMouseDown={() => setForm(null)}><div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="archive-form-title" onMouseDown={event => event.stopPropagation()}>
        <div className={styles.modalHead}><div><span className={styles.eyebrow}>{form.id ? 'FALL BEARBEITEN' : 'WISSEN FESTHALTEN'}</span><h2 id="archive-form-title">{form.id ? 'Interessanten Befund bearbeiten' : 'Neuer interessanter Befund'}</h2></div><button type="button" aria-label="Schließen" onClick={() => setForm(null)}>×</button></div>
        <form className={styles.form} onSubmit={save}>
          <label className={styles.titleField}><span>Diagnose / Falltitel *</span><input value={form.diagnosis || ''} onChange={event => setForm(previous => ({ ...previous, diagnosis: event.target.value }))} placeholder="z. B. Milzinfarkt bei Endokarditis" /></label>
          <div className={styles.formGrid}>
            <label><span>Untersuchungsdatum</span><input type="date" value={form.examDate || ''} onChange={event => setForm(previous => ({ ...previous, examDate: event.target.value }))} /></label>
            <label><span>Modalität</span><select value={form.modality || 'Röntgen'} onChange={event => setForm(previous => ({ ...previous, modality: event.target.value, examArea: AREAS[event.target.value]?.[0] || '' }))}>{MODALITIES.map(item => <option key={item}>{item}</option>)}</select></label>
            <label><span>Untersuchungsgebiet</span><select value={form.examArea || ''} onChange={event => setForm(previous => ({ ...previous, examArea: event.target.value }))}>{!AREAS[form.modality]?.includes(form.examArea) && form.examArea && <option>{form.examArea}</option>}{(AREAS[form.modality] || []).map(item => <option key={item}>{item}</option>)}</select></label>
            <label><span>Organ</span><input value={form.organ || ''} onChange={event => setForm(previous => ({ ...previous, organ: event.target.value }))} placeholder="Optional" /></label>
          </div>
          <label className={styles.wide}><span>Schlüsselfund</span><textarea rows="4" value={form.keyFinding || ''} onChange={event => setForm(previous => ({ ...previous, keyFinding: event.target.value }))} placeholder="Welche Bildmerkmale machen diesen Fall wichtig oder besonders?" /></label>
          <label className={styles.wide}><span>Lernpunkt / Merksatz</span><textarea rows="3" value={form.learningPoint || ''} onChange={event => setForm(previous => ({ ...previous, learningPoint: event.target.value }))} placeholder="Was möchtest du aus diesem Fall behalten?" /></label>
          <label className={styles.wide}><span>Tags</span><input value={form.tags || ''} onChange={event => setForm(previous => ({ ...previous, tags: event.target.value }))} placeholder="z. B. Notfall, selten, Abdomen – durch Komma trennen" /></label>
          <details className={styles.referenceFields}><summary>Patient / Referenz ergänzen</summary><div className={styles.formGrid}><label><span>Name / Referenz</span><input value={form.name || ''} onChange={event => setForm(previous => ({ ...previous, name: event.target.value }))} /></label><label><span>Geburtsdatum</span><input type="date" value={form.birthDate || ''} onChange={event => setForm(previous => ({ ...previous, birthDate: event.target.value }))} /></label></div></details>
          {error && <div className={styles.error} role="alert">{error}</div>}
          <div className={styles.formActions}><button type="button" onClick={() => setForm(null)}>Abbrechen</button><button type="submit" className={styles.primary} disabled={saving}>{saving ? 'Speichern …' : 'Im Archiv speichern'}</button></div>
        </form>
      </div></div>}
    </main>
  )
}
