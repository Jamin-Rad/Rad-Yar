'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { filterFindingCollection, findingForm, findingLabel, findingNote, findingPayload, FINDING_MODALITIES } from '@/lib/findingCollection'
import FindingDetails, { displayFindingDate } from './FindingDetails'
import FindingForm from './FindingForm'
import CollectionDialog from './CollectionDialog'
import Icon from './CollectionIcon'
import styles from './collection.module.css'

async function requestWork(method = 'GET', finding) {
  const url = method === 'DELETE' ? `/api/andarun/work?type=finding&id=${encodeURIComponent(finding.id)}` : '/api/andarun/work'
  const response = await fetch(url, {
    method, cache: 'no-store',
    ...(method === 'POST' ? { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'finding', finding }) } : {}),
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.error || 'Die Sammlung konnte nicht gespeichert oder geladen werden.')
  return Array.isArray(data.findings) ? data.findings : []
}

export default function FindingCollectionPage({ section = 'cases' }) {
  const [items, setItems] = useState([])
  const [search, setSearch] = useState('')
  const [modality, setModality] = useState('')
  const [sort, setSort] = useState('recent')
  const [selectedId, setSelectedId] = useState(null)
  const [form, setForm] = useState(null)
  const [removeItem, setRemoveItem] = useState(null)
  const [mobileDetails, setMobileDetails] = useState(false)
  const [compact, setCompact] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [reload, setReload] = useState(0)
  const searchRef = useRef(null)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')
    requestWork().then(records => { if (active) setItems(records) })
      .catch(cause => { if (active) setError(cause.message) })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [reload])

  useEffect(() => {
    const media = window.matchMedia('(max-width: 760px)')
    const update = () => setCompact(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    function shortcut(event) {
      if (event.key === '/' && !form && !mobileDetails && !['INPUT', 'SELECT', 'TEXTAREA'].includes(event.target.tagName)) {
        event.preventDefault()
        searchRef.current?.focus()
      }
    }
    document.addEventListener('keydown', shortcut)
    return () => document.removeEventListener('keydown', shortcut)
  }, [form, mobileDetails])

  const shown = useMemo(() => filterFindingCollection(items, section, { search, modality, sort }), [items, section, search, modality, sort])
  const selected = shown.find(item => item.id === selectedId) || shown[0] || null
  const filtered = !!(search || modality)

  function edit(item) {
    setMobileDetails(false)
    setForm(findingForm(item, section))
    setError('')
    setNotice('')
  }

  async function save(event) {
    event.preventDefault()
    if (saving) return
    if (!form.name?.trim()) { setError('Bitte einen Namen oder eine Fallreferenz eingeben.'); return }
    setSaving(true)
    setError('')
    try {
      const finding = findingPayload(form, `finding-${crypto.randomUUID()}`)
      const records = await requestWork('POST', finding)
      setItems(records)
      setSelectedId(finding.id)
      setSearch('')
      setModality('')
      setForm(null)
      setNotice('Eintrag gespeichert.')
    } catch (cause) { setError(cause.message) }
    finally { setSaving(false) }
  }

  async function remove() {
    if (saving) return
    setSaving(true)
    setError('')
    try {
      setItems(await requestWork('DELETE', removeItem))
      setRemoveItem(null)
      setMobileDetails(false)
      setNotice('Eintrag gelöscht.')
    } catch (cause) { setError(cause.message) }
    finally { setSaving(false) }
  }

  function resetSearch() { setSearch(''); setModality('') }
  const detailsProps = { item: selected, onEdit: edit, onRemove: item => { setMobileDetails(false); setRemoveItem(item); setError('') } }

  return <main className={styles.page} lang="de" dir="ltr">
    <div className={styles.shell}>
      <header className={styles.hero}>
        <div><h1>Fallsammlung</h1><p>Fälle festhalten. Später wieder ansehen.</p></div>
        <button type="button" className={`${styles.primary} ${styles.newEntry}`} onClick={() => edit(null)} disabled={loading}><Icon name="plus"/>Neuer Eintrag</button>
      </header>
      <nav className={styles.tabs} aria-label="Fallsammlung Bereiche">
        <Link href="/andarun/befunde/faelle" aria-current={section === 'cases' ? 'page' : undefined}>Interessante Befunde</Link>
        <Link href="/andarun/befunde/kontrolle" aria-current={section === 'controls' ? 'page' : undefined}>Befundkontrolle</Link>
      </nav>
      <div className={styles.toolbar}>
        <label className={styles.search}><Icon name="search"/><input ref={searchRef} type="search" aria-label="Sammlung durchsuchen" placeholder="Sammlung durchsuchen …" value={search} onChange={event => setSearch(event.target.value)}/></label>
        <select aria-label="Nach Modalität filtern" value={modality} onChange={event => setModality(event.target.value)}><option value="">Alle Modalitäten</option>{FINDING_MODALITIES.map(value => <option key={value}>{value}</option>)}</select>
        <select className={styles.sort} aria-label="Einträge sortieren" value={sort} onChange={event => setSort(event.target.value)}><option value="recent">Zuletzt ergänzt</option><option value="name">Name A–Z</option></select>
      </div>
      {notice && <p className={styles.notice} role="status"><Icon name="check"/>{notice}</p>}
      {error && !form && !removeItem && <div className={styles.error} role="alert">{error} <button type="button" onClick={() => setReload(value => value + 1)}>Erneut laden</button></div>}
      <div className={styles.workspace}>
        <section className={styles.entries} aria-label={section === 'controls' ? 'Gespeicherte Befundkontrollen' : 'Interessante Befunde'} aria-busy={loading}>
          {loading ? <div className={styles.empty}><Icon name="folder"/><p>Sammlung wird geladen …</p></div> : shown.map(item => <button type="button" key={item.id} className={`${styles.entry} ${selected?.id === item.id ? styles.entrySelected : ''}`} aria-pressed={selected?.id === item.id} onClick={() => { setSelectedId(item.id); setMobileDetails(true) }}>
            <div><h2>{findingLabel(item)}</h2><p className={styles.entryMeta}>{[item.modality, item.examArea, item.examDate ? displayFindingDate(item.examDate) : ''].filter(Boolean).join(' · ') || 'Gespeicherter Befund'}</p>{findingNote(item) && <p className={styles.entryNote}>{findingNote(item)}</p>}</div><Icon name="arrow"/>
          </button>)}
          {!loading && !shown.length && !error && <div className={styles.empty}><Icon name="folder" width="34" height="34"/><h2>{filtered ? 'Keine passenden Einträge' : section === 'controls' ? 'Deine Befundkontrollen' : 'Deine interessanten Befunde'}</h2><p>{filtered ? 'Versuche einen anderen Namen oder eine andere Modalität.' : 'Speichere einen Befund, den du später wieder ansehen möchtest.'}</p><button type="button" className={styles.secondary} onClick={filtered ? resetSearch : () => edit(null)}>{filtered ? 'Filter zurücksetzen' : 'Ersten Eintrag anlegen'}</button></div>}
        </section>
        {selected && !loading ? <aside className={styles.details} aria-label="Eintragsdetails"><FindingDetails {...detailsProps}/></aside> : <aside className={`${styles.details} ${styles.emptyDetail}`}><Icon name="folder" width="36" height="36"/><h2>Platz für deine Fälle</h2><p>Hier findest du die gespeicherten Angaben zum ausgewählten Eintrag.</p></aside>}
      </div>
    </div>
    {compact && mobileDetails && selected && !form && !removeItem && <CollectionDialog labelId="collection-mobile-title" onClose={() => setMobileDetails(false)} className={styles.mobileDialog}><FindingDetails {...detailsProps} onClose={() => setMobileDetails(false)}/></CollectionDialog>}
    {form && <FindingForm form={form} onChange={setForm} onSave={save} onClose={() => { setForm(null); setError('') }} saving={saving} error={error} section={section}/>}
    {removeItem && <CollectionDialog labelId="collection-delete-title" onClose={() => { if (!saving) setRemoveItem(null) }} className={styles.deleteDialog}><div className={styles.formFields}><h2 id="collection-delete-title">Eintrag löschen?</h2><p>„{findingLabel(removeItem)}“ wird dauerhaft aus der Sammlung entfernt.</p>{error && <p className={styles.error} role="alert">{error}</p>}</div><footer className={styles.formActions}><button type="button" className={styles.secondary} onClick={() => setRemoveItem(null)} disabled={saving}>Abbrechen</button><button type="button" className={styles.destructive} onClick={remove} disabled={saving}>{saving ? 'Wird gelöscht …' : 'Endgültig löschen'}</button></footer></CollectionDialog>}
  </main>
}
