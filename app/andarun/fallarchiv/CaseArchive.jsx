'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { MODALITIES, INTAKE_AREAS } from '@/lib/caseArchive/model.mjs'
import styles from './archive.module.css'
import SimpleIntakeForm from './SimpleIntakeForm'

const API = '/api/andarun/case-archive'
const EMPTY_FILTERS = { q: '', diagnosis: '', modality: '', anatomy: '', intakeStatus: '' }
const STATE_LABELS = { 'not-linked': 'Noch nicht verknüpft', draft: 'Entwurf', submitted: 'Zur Veröffentlichung eingereicht', published: 'Veröffentlicht' }
const formatDate = value => value ? new Intl.DateTimeFormat('de-DE', { timeZone: 'UTC' }).format(new Date(`${value}T12:00:00Z`)) : '—'

function Icon({ name, size = 20 }) {
  const paths = {
    search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/></>,
    plus: <path d="M12 5v14M5 12h14"/>,
    grid: <><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></>,
    list: <><path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/></>,
    arrow: <path d="M7 17 17 7M7 7h10v10"/>,
    close: <path d="m6 6 12 12M6 18 18 6"/>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></>,
    folder: <path d="M3 8V5a1 1 0 0 1 1-1h6l2 3h8a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8Z"/>,
    copy: <><rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.folder}</svg>
}

async function request(path = '', options = {}) {
  const response = await fetch(`${API}${path}`, { cache: 'no-store', ...options, headers: { 'Content-Type': 'application/json', ...options.headers } })
  let result
  try { result = await response.json() } catch { throw new Error('Das Archiv ist gerade nicht erreichbar. Bitte erneut versuchen.') }
  if (!response.ok) throw new Error(result.error || 'Das Archiv konnte nicht geladen werden.')
  return result
}

function IntakeBadge({ item }) {
  return item.intakeStatus === 'temporary' ? <span className={`${styles.badge} ${styles.suspected}`}>Vorläufig · Bilder folgen</span> : null
}

function Certainty({ value }) {
  return <span className={`${styles.badge} ${value === 'confirmed' ? styles.confirmed : value === 'suspected' ? styles.suspected : styles.unknown}`}>{value === 'confirmed' ? 'Gesichert' : value === 'suspected' ? 'Verdacht' : 'Nicht angegeben'}</span>
}

function CaseImage({ item }) {
  return item.thumbnailUrl
    ? <img src={item.thumbnailUrl} alt={`Radiopaedia: ${item.title}`} loading="lazy" decoding="async" referrerPolicy="no-referrer" className={styles.previewImage}/>
    : <div className={styles.imagePlaceholder}><span className={styles.scanMark} aria-hidden="true"/><span>{item.modalities?.join(' · ') || 'FALL'}</span><small>{item.organ || item.region || 'Bild folgt'}</small></div>
}

function ExternalLink({ href, children, className }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer" className={className}>{children}<Icon name="arrow" size={15}/></a>
}

export default function CaseArchive() {
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [page, setPage] = useState(0)
  const [view, setView] = useState('table')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [refresh, setRefresh] = useState(0)
  const [selected, setSelected] = useState(null)
  const [importing, setImporting] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError('')
    const timer = setTimeout(() => {
      // Search terms can contain patient information: send them in the body,
      // never in browser URLs or query-string access logs.
      request('', { method: 'POST', body: JSON.stringify({ action: 'search', filters, page }), signal: controller.signal })
        .then(setData).catch(err => { if (err.name !== 'AbortError') setError(err.message) })
        .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    }, 220)
    return () => { clearTimeout(timer); controller.abort() }
  }, [filters, page, refresh])

  function changeFilter(key, value) { setFilters(current => ({ ...current, [key]: value })); setPage(0) }
  const hasFilters = Object.values(filters).some(Boolean)
  const items = data?.cases || []

  async function copyLegacy() {
    setImporting(true); setMessage('')
    try {
      const result = await request('', { method: 'POST', body: JSON.stringify({ action: 'copy-fallsammlung' }) })
      setMessage(result.alreadyImported ? 'Die bisherigen Fälle wurden bereits übernommen.' : `${result.copied} Fälle übernommen.`)
      setRefresh(value => value + 1)
    } catch (err) { setError(err.message) } finally { setImporting(false) }
  }

  return <main className={styles.page} lang="de" dir="ltr">
    <nav className={styles.topbar} aria-label="Jaminova"><Link href="/andarun" className={styles.brand}>Jaminova<span>/</span><small>Fallarchiv</small></Link><span className={styles.privateLabel}><Icon name="lock" size={14}/>Nur für dich</span></nav>
    <div className={styles.workspace}>
      <header className={styles.header}>
        <div><p className={styles.eyebrow}>DEIN PERSÖNLICHES ARCHIV</p><h1>Fälle im Blick.</h1><p className={styles.subtitle}>Befunde, Bilder und Verlauf. An einem Ort.</p></div>
        <button className={styles.primaryButton} onClick={() => setSelected('new')}><Icon name="plus"/>Neuer Fall</button>
      </header>
      <section className={styles.quickIntake} aria-label="Vorläufig erfassen">
        <div><h2>Vorläufig erfassen</h2><p>Patient und Befund jetzt speichern, Bilder später zuordnen. Wähle deine Dateinummer innerhalb der jeweiligen Kategorie.</p></div>
        <div className={styles.quickButtons}>{INTAKE_AREAS.map(area => <button key={area} className={styles.secondaryButton} onClick={() => setSelected(`new:${area}`)}><Icon name="plus" size={16}/>MRT {area}</button>)}</div>
      </section>
      <section className={styles.archive} aria-label="Deine Fälle">
        <div className={styles.archiveHead}><div><h2>Deine Fälle <span className={styles.count}>{data?.total ?? '—'}</span></h2><p>{data?.imported ? `${data.imported.case_count} bestehende Fälle einmalig übernommen` : 'Deine persönliche Sammlung'}</p></div>
          <div className={styles.viewToggle} aria-label="Ansicht"><button aria-label="Tabellenansicht" aria-pressed={view === 'table'} onClick={() => setView('table')}><Icon name="list"/></button><button aria-label="Galerieansicht" aria-pressed={view === 'gallery'} onClick={() => setView('gallery')}><Icon name="grid"/></button></div>
        </div>
        <div className={styles.filters}>
          <label className={styles.search}><Icon name="search"/><span className={styles.srOnly}>Nummer, Patient, Diagnose oder Geburtsdatum suchen</span><input type="search" value={filters.q} onChange={event => changeFilter('q', event.target.value)} placeholder="Nummer, Patient, Diagnose oder Geburtsdatum …" autoComplete="off"/></label>
          <div className={styles.filterRow}>
            <label>Diagnose<input value={filters.diagnosis} onChange={event => changeFilter('diagnosis', event.target.value)} placeholder="Alle Diagnosen"/></label>
            <label>Modalität<select value={filters.modality} onChange={event => changeFilter('modality', event.target.value)}><option value="">Alle Modalitäten</option>{MODALITIES.map(value => <option key={value}>{value}</option>)}</select></label>
            <label>Organ / Körperregion<input value={filters.anatomy} onChange={event => changeFilter('anatomy', event.target.value)} placeholder="Alle Regionen"/></label>
            <label>Erfassung<select value={filters.intakeStatus} onChange={event => changeFilter('intakeStatus', event.target.value)}><option value="">Alle Fälle</option><option value="temporary">Vorläufig</option><option value="complete">Vollständig</option></select></label>
            {hasFilters ? <button className={styles.textButton} onClick={() => { setFilters(EMPTY_FILTERS); setPage(0) }}>Zurücksetzen</button> : null}
          </div>
        </div>
        {error ? <div className={styles.error} role="alert"><p>{error}</p><button className={styles.secondaryButton} onClick={() => setRefresh(value => value + 1)}>Erneut versuchen</button></div> : null}
        {message ? <p className={styles.message} role="status">{message}</p> : null}
        {loading ? <div className={styles.loading} role="status">Fälle werden geladen …</div> : !error && !items.length ? <div className={styles.empty}><Icon name="folder" size={36}/><h3>{hasFilters ? 'Keine passenden Fälle' : 'Platz für deine Fälle'}</h3><p>{hasFilters ? 'Versuche eine andere Diagnose, Region oder Suchanfrage.' : 'Lege deinen ersten Fall an oder übernimm deine bisherigen Fälle.'}</p>{!hasFilters && !data?.imported ? <button className={styles.secondaryButton} onClick={copyLegacy} disabled={importing}>{importing ? 'Fälle werden übernommen …' : 'Bestehende Fälle übernehmen'}</button> : null}</div> : !error && view === 'table' ? <div className={styles.tableWrap}><table className={styles.table}><thead><tr><th>Fall / Diagnose</th><th>Patient</th><th>Untersuchungen</th><th>Zuletzt</th><th>Radiopaedia</th></tr></thead><tbody>{items.map(item => <tr key={item.id}>
          <td><button className={styles.caseTitle} onClick={() => setSelected(item.id)}>{item.archiveNumber ? `${item.intakeArea || 'Fall'} #${item.archiveNumber} · ` : ''}{item.title}</button><div className={styles.cellMeta}><IntakeBadge item={item}/><Certainty value={item.certainty}/><span>{[item.organ, item.region].filter(Boolean).join(' · ') || 'Region ergänzen'}</span></div></td>
          <td><span className={styles.patientName}>{item.patient?.name || '—'}</span>{item.patient?.birthDate ? <small className={styles.cellSub}>{formatDate(item.patient.birthDate)}</small> : null}</td>
          <td><span className={styles.modality}>{item.modalities.join(' · ') || '—'}</span><small className={styles.cellSub}>{item.studyCount} {item.studyCount === 1 ? 'Untersuchung' : 'Untersuchungen'}</small></td>
          <td className={styles.dateCell}>{formatDate(item.latestDate)}</td>
          <td>{item.radiopaediaUrls.length ? <ExternalLink href={item.radiopaediaUrls[0]} className={styles.radiopaediaLink}>Fall öffnen</ExternalLink> : <span className={styles.pending}>Noch nicht verknüpft</span>}</td>
        </tr>)}</tbody></table></div> : !error ? <div className={styles.gallery}>{items.map(item => <article key={item.id} className={styles.card}><button className={styles.cardButton} onClick={() => setSelected(item.id)}><div className={styles.cardImage}><CaseImage item={item}/><span className={styles.imageCount}>{item.studyCount} {item.studyCount === 1 ? 'Studie' : 'Studien'}</span></div><div className={styles.cardContent}><IntakeBadge item={item}/><Certainty value={item.certainty}/><h3>{item.archiveNumber ? `${item.intakeArea || 'Fall'} #${item.archiveNumber} · ` : ''}{item.title}</h3><p>{[item.organ, item.region].filter(Boolean).join(' · ') || 'Region ergänzen'}</p><div className={styles.cardFooter}><span>{item.patient?.name || 'Patient ergänzen'}</span><time>{formatDate(item.latestDate)}</time></div></div></button>{item.radiopaediaUrls.length ? <ExternalLink href={item.radiopaediaUrls[0]} className={styles.cardExternal}>Radiopaedia</ExternalLink> : null}</article>)}</div> : null}
        {data?.total > data?.pageSize && !error ? <div className={styles.pagination}><span>{page * data.pageSize + 1}–{Math.min((page + 1) * data.pageSize, data.total)} von {data.total}</span><div><button className={styles.secondaryButton} disabled={loading || page === 0} onClick={() => setPage(value => value - 1)}>Zurück</button><button className={styles.secondaryButton} disabled={loading || (page + 1) * data.pageSize >= data.total} onClick={() => setPage(value => value + 1)}>Weiter</button></div></div> : null}
      </section>
      <footer className={styles.pageFooter}><span><Icon name="lock" size={13}/>Privates Fallarchiv</span><span>Original-DICOM bleiben auf deinem PC.</span></footer>
    </div>
    {selected ? <CaseDialog key={selected} caseId={selected} onClose={() => setSelected(null)} onSaved={() => { setRefresh(value => value + 1); setMessage('Fall gespeichert.') }}/> : null}
  </main>
}

function blankStudy() { return { id: crypto.randomUUID(), date: '', modality: '', area: '', reportOriginal: '', reportDe: '', reportEn: '', localPath: '', radiopaediaUrl: '', thumbnailUrl: '', publicationStatus: 'not-linked' } }
function blankCase(area = '') { return { intakeStatus: area ? 'temporary' : 'complete', intakeArea: area, availableModalities: area ? ['MRT'] : [], psa: { value: '', date: '' }, title: area ? `MRT ${area}` : '', diagnosis: '', diagnosisEn: '', certainty: 'unknown', organ: area, region: '', patient: { name: '', birthDate: '' }, historyOriginal: '', studies: [{ ...blankStudy(), modality: area ? 'MRT' : '', area }], followUps: [] } }

function CaseDialog({ caseId, onClose, onSaved }) {
  const isNew = caseId === 'new' || caseId.startsWith('new:')
  const intakeArea = caseId.startsWith('new:') ? caseId.slice(4) : ''
  const dialog = useRef(null)
  const [record, setRecord] = useState(null)
  const [draft, setDraft] = useState(() => isNew ? blankCase(intakeArea) : null)
  const initialDraft = useRef(draft)
  const [editing, setEditing] = useState(isNew)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [language, setLanguage] = useState('reportOriginal')
  const [copied, setCopied] = useState('')

  useEffect(() => {
    const node = dialog.current
    node.showModal()
    return () => node.close()
  }, [])

  useEffect(() => {
    if (isNew) return
    const controller = new AbortController()
    request(`/${encodeURIComponent(caseId)}`, { signal: controller.signal }).then(result => setRecord(result.record)).catch(err => { if (err.name !== 'AbortError') setError(err.message) }).finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [caseId, isNew])

  function close() {
    if (saving) return
    const original = record || initialDraft.current
    if (editing && JSON.stringify(draft) !== JSON.stringify(original) && !window.confirm('Ungespeicherte Änderungen verwerfen?')) return
    onClose()
  }

  async function save(event) {
    event.preventDefault(); setSaving(true); setError('')
    try {
      const result = record
        ? await request(`/${encodeURIComponent(record.id)}`, { method: 'PUT', body: JSON.stringify({ record: draft, revision: record.revision }) })
        : await request('', { method: 'POST', body: JSON.stringify({ action: 'create', record: draft }) })
      setRecord(result.record); setDraft(null); setEditing(false); onSaved()
    } catch (err) { setError(err.message) } finally { setSaving(false) }
  }

  async function copyPath(path) {
    try { await navigator.clipboard.writeText(path); setCopied(path) } catch { setCopied('Bitte den Pfad markieren und kopieren.') }
  }

  return <dialog ref={dialog} className={styles.dialog} aria-labelledby="case-dialog-title" onCancel={event => { event.preventDefault(); close() }}>
    <header className={styles.dialogHead}><div><p className={styles.eyebrow}>DEIN FALLARCHIV</p><h2 id="case-dialog-title">{editing ? record ? 'Fall bearbeiten' : intakeArea ? `MRT ${intakeArea} · vorläufig` : 'Neuer Fall' : record?.title || 'Fall laden …'}</h2></div><button className={styles.iconButton} aria-label="Fall schließen" onClick={close} disabled={saving}><Icon name="close"/></button></header>
    {error ? <p className={styles.error} role="alert">{error}</p> : null}
    {loading ? <div className={styles.loading} role="status">Fall wird geladen …</div> : editing && draft && draft.intakeArea ? <SimpleIntakeForm draft={draft} setDraft={setDraft} saving={saving} onSubmit={save} onCancel={() => { if (record) { setEditing(false); setDraft(null); setError('') } else close() }}/> : editing && draft ? <form onSubmit={save} className={styles.form}>
      <fieldset disabled={saving}><legend>Erfassung &amp; Bildzuordnung</legend>
        <p>{record?.archiveNumber ? `Feste Bildnummer: ${record.archiveNumber} — diese Nummer bleibt unverändert.` : 'Die feste Bildnummer wird nach dem ersten Speichern angezeigt.'}</p>
        <label>Erfassungsstatus<select value={draft.intakeStatus || 'complete'} onChange={event => setDraft(value => ({ ...value, intakeStatus: event.target.value }))}><option value="temporary">Vorläufig · Bilder / Angaben folgen</option><option value="complete">Vollständig erfasst</option></select></label>
        <p>Welche Modalitäten liegen vor?</p><div className={styles.modalityChoices}>{MODALITIES.map(modality => <label key={modality}><input type="checkbox" checked={(draft.availableModalities || []).includes(modality)} onChange={event => setDraft(value => ({ ...value, availableModalities: event.target.checked ? [...(value.availableModalities || []), modality] : (value.availableModalities || []).filter(item => item !== modality) }))}/>{modality}</label>)}</div>
      </fieldset>
      {(draft.intakeArea === 'Prostata' || /prostat/i.test(draft.organ) || draft.psa?.value) ? <fieldset disabled={saving}><legend>PSA-Labor</legend><div className={styles.formGrid}><label>PSA (ng/ml)<input inputMode="decimal" value={draft.psa?.value || ''} placeholder="z. B. 5,2" onChange={event => setDraft(value => ({ ...value, psa: { ...value.psa, value: event.target.value } }))}/></label><label>Datum der PSA-Bestimmung<input type="date" value={draft.psa?.date || ''} onChange={event => setDraft(value => ({ ...value, psa: { ...value.psa, date: event.target.value } }))}/></label></div></fieldset> : null}
      <fieldset disabled={saving}>
        <legend>Der Fall</legend><div className={styles.formGrid}>
          <label className={styles.fullWidth}>Titel<input value={draft.title} onChange={event => setDraft(value => ({ ...value, title: event.target.value }))} maxLength={500}/></label>
          <label>Diagnose · Deutsch<input value={draft.diagnosis} onChange={event => setDraft(value => ({ ...value, diagnosis: event.target.value }))}/></label>
          <label>Diagnose · English<input value={draft.diagnosisEn} onChange={event => setDraft(value => ({ ...value, diagnosisEn: event.target.value }))}/></label>
          <label>Diagnostische Sicherheit<select value={draft.certainty} onChange={event => setDraft(value => ({ ...value, certainty: event.target.value }))}><option value="unknown">Noch nicht angegeben</option><option value="suspected">Verdachtsdiagnose</option><option value="confirmed">Gesicherte Diagnose</option></select></label>
          <label>Organ<input value={draft.organ} onChange={event => setDraft(value => ({ ...value, organ: event.target.value }))}/></label>
          <label>Körperregion<input value={draft.region} onChange={event => setDraft(value => ({ ...value, region: event.target.value }))}/></label>
          <label className={styles.fullWidth}>Radiopaedia-Link zum gesamten Fall<input type="url" value={draft.radiopaediaCaseUrl || ''} onChange={event => setDraft(value => ({ ...value, radiopaediaCaseUrl: event.target.value }))}/></label>
        </div>
      </fieldset>
      <fieldset disabled={saving}><legend>Patient · nur privat</legend><div className={styles.formGrid}><label>Name<input value={draft.patient.name} autoComplete="off" onChange={event => setDraft(value => ({ ...value, patient: { ...value.patient, name: event.target.value } }))}/></label><label>Geburtsdatum<input type="date" value={draft.patient.birthDate} onChange={event => setDraft(value => ({ ...value, patient: { ...value.patient, birthDate: event.target.value } }))}/></label><label className={styles.fullWidth}>Originalanamnese<textarea rows={3} value={draft.historyOriginal} onChange={event => setDraft(value => ({ ...value, historyOriginal: event.target.value }))}/></label></div></fieldset>
      <div className={styles.sectionTitle}><h3>Untersuchungen</h3><button type="button" className={styles.textButton} disabled={saving} onClick={() => setDraft(value => ({ ...value, studies: [...value.studies, blankStudy()] }))}><Icon name="plus" size={16}/>Untersuchung hinzufügen</button></div>
      {draft.studies.map((study, index) => <StudyForm key={study.id} study={study} index={index} disabled={saving} onChange={(key, value) => setDraft(current => ({ ...current, studies: current.studies.map(item => item.id === study.id ? { ...item, [key]: value } : item) }))}/>)}
      <div className={styles.sectionTitle}><h3>Verlauf</h3><button type="button" className={styles.textButton} disabled={saving} onClick={() => setDraft(value => ({ ...value, followUps: [...value.followUps, { id: crypto.randomUUID(), date: '', text: '' }] }))}><Icon name="plus" size={16}/>Verlauf ergänzen</button></div>
      {draft.followUps.map(item => <fieldset key={item.id} disabled={saving}><label>Datum<input type="date" value={item.date} onChange={event => setDraft(current => ({ ...current, followUps: current.followUps.map(row => row.id === item.id ? { ...row, date: event.target.value } : row) }))}/></label><label>Verlauf / Ergebnis<textarea rows={3} value={item.text} onChange={event => setDraft(current => ({ ...current, followUps: current.followUps.map(row => row.id === item.id ? { ...row, text: event.target.value } : row) }))}/></label></fieldset>)}
      <footer className={styles.formFooter}><button type="button" className={styles.secondaryButton} disabled={saving} onClick={() => { if (record) { setEditing(false); setDraft(null); setError('') } else close() }}>Abbrechen</button><button className={styles.primaryButton} disabled={saving}>{saving ? 'Wird gespeichert …' : 'Fall speichern'}</button></footer>
    </form> : record ? <div className={styles.detail}>
      {record.archiveNumber ? <section className={styles.numberPanel}><small>Feste Bildnummer</small><strong>{record.intakeArea} #{record.archiveNumber}</strong><p>Speichere die Bilder im Ordner der Kategorie unter dieser Nummer. Sie bleibt beim Ergänzen des Falls gleich.</p><button className={styles.secondaryButton} onClick={() => copyPath(String(record.archiveNumber))}>{copied === String(record.archiveNumber) ? 'Nummer kopiert' : 'Nummer kopieren'}</button></section> : null}
      <div className={styles.detailActions}><IntakeBadge item={record}/><Certainty value={record.certainty}/><button className={styles.secondaryButton} onClick={() => { setDraft(structuredClone(record)); setEditing(true); setError('') }}>Bearbeiten</button></div>
      {record.radiopaediaCaseUrl ? <ExternalLink href={record.radiopaediaCaseUrl} className={styles.radiopaediaLink}>Fall bei Radiopaedia öffnen</ExternalLink> : null}
      <div className={styles.facts}><div><small>Patient</small><strong>{record.patient.name || '—'}</strong><span>{record.patient.birthDate ? `geb. ${formatDate(record.patient.birthDate)}` : ''}</span></div><div><small>Diagnose</small><strong>{record.diagnosis || '—'}</strong><span lang="en">{record.diagnosisEn}</span></div><div><small>Organ / Region</small><strong>{[record.organ, record.region].filter(Boolean).join(' · ') || '—'}</strong></div></div>
      {record.availableModalities?.length ? <p><strong>Vorhandene Modalitäten:</strong> {record.availableModalities.join(' · ')}</p> : null}
      {record.psa?.value || record.psa?.date ? <p><strong>PSA:</strong> {record.psa.value ? `${record.psa.value} ng/ml` : 'Wert noch offen'} · {formatDate(record.psa.date)}</p> : null}
      {record.historyOriginal ? <section className={styles.history}><h3>Originalanamnese</h3><p>{record.historyOriginal}</p></section> : null}
      <div className={styles.sectionTitle}><h3>Untersuchungen <span className={styles.count}>{record.studies.length}</span></h3><div className={styles.languageTabs} aria-label="Befundsprache">{[['reportOriginal', 'Original'], ['reportDe', 'Deutsch'], ['reportEn', 'English']].map(([key, label]) => <button key={key} aria-pressed={language === key} onClick={() => setLanguage(key)}>{label}</button>)}</div></div>
      <div className={styles.timeline}>{[...record.studies].sort((a, b) => b.date.localeCompare(a.date)).map(study => <article key={study.id} className={styles.study}><div className={styles.studyHeader}><div><time>{formatDate(study.date)}</time><h4>{[study.modality, study.area].filter(Boolean).join(' · ') || 'Untersuchung'}</h4></div>{study.radiopaediaUrl ? <ExternalLink href={study.radiopaediaUrl} className={styles.radiopaediaLink}>Radiopaedia</ExternalLink> : null}</div><p className={styles.studyStatus}>{study.kind === 'prior' ? 'Vorbefund · ' : ''}{STATE_LABELS[study.publicationStatus]}</p>{study.diagnosis ? <p><strong>Diagnose:</strong> {study.diagnosis}</p> : null}<p className={study[language] ? styles.report : styles.noReport} lang={language === 'reportEn' ? 'en' : undefined}>{study[language] || 'Für diese Sprache ist noch kein Befund hinterlegt.'}</p>{study.assessmentOriginal ? <section><h4>Beurteilung</h4><p className={styles.report}>{study.assessmentOriginal}</p></section> : null}{study.localPath ? <div className={styles.localPath}><Icon name="folder" size={18}/><code>{study.localPath}</code><button className={styles.iconButton} aria-label="Ordnerpfad kopieren" onClick={() => copyPath(study.localPath)}><Icon name="copy" size={17}/></button></div> : <p className={styles.pending}>Lokaler Ordner noch nicht zugeordnet</p>}{study.localPath && copied === study.localPath ? <small role="status">Pfad kopiert.</small> : null}</article>)}</div>
      {copied.startsWith('Bitte ') ? <p role="status">{copied}</p> : null}
      {record.followUps.length ? <section className={styles.followUps}><h3>Verlauf</h3>{[...record.followUps].sort((a, b) => b.date.localeCompare(a.date)).map(item => <article key={item.id}><time>{formatDate(item.date)}</time><p>{item.text}</p></article>)}</section> : null}
      {record.source === 'fallsammlung' ? <p className={styles.sourceNote}>Einmalig aus Fallsammlung übernommen. Die ursprüngliche Aufzeichnung bleibt dort erhalten.</p> : null}
    </div> : null}
  </dialog>
}

function StudyForm({ study, index, onChange, disabled }) {
  const input = (label, key, type = 'text') => <label>{label}<input type={type} value={study[key]} onChange={event => onChange(key, event.target.value)}/></label>
  return <fieldset disabled={disabled} className={styles.studyForm}><legend>Untersuchung {index + 1}</legend><div className={styles.formGrid}>
    {input('Untersuchungsdatum', 'date', 'date')}
    <label>Modalität<input list="archive-modalities" value={study.modality} onChange={event => onChange('modality', event.target.value)}/><datalist id={index === 0 ? 'archive-modalities' : undefined}>{index === 0 ? MODALITIES.map(value => <option key={value} value={value}/>) : null}</datalist></label>
    {input('Untersuchungsregion', 'area')}
    <label className={styles.fullWidth}>Originalbefund<textarea rows={5} value={study.reportOriginal} onChange={event => onChange('reportOriginal', event.target.value)}/></label>
    <label className={styles.fullWidth}>Wesentlicher Befund · Deutsch<textarea rows={4} value={study.reportDe} onChange={event => onChange('reportDe', event.target.value)}/></label>
    <label className={styles.fullWidth}>Relevant findings · English<textarea rows={4} value={study.reportEn} onChange={event => onChange('reportEn', event.target.value)} lang="en"/></label>
    <label className={styles.fullWidth}>Lokaler Ordner<input value={study.localPath} placeholder="D:\Fallarchiv\…" onChange={event => onChange('localPath', event.target.value)} autoComplete="off"/></label>
    {input('Radiopaedia-Falllink', 'radiopaediaUrl', 'url')}
    <label>Status bei Radiopaedia<select value={study.publicationStatus} onChange={event => onChange('publicationStatus', event.target.value)}>{Object.entries(STATE_LABELS).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>
    <label className={styles.fullWidth}>Vorschaubild von Radiopaedia · optional<input type="url" value={study.thumbnailUrl} onChange={event => onChange('thumbnailUrl', event.target.value)}/></label>
  </div></fieldset>
}
