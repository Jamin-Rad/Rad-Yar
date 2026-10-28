import { findingLabel, findingNote } from '@/lib/findingCollection'
import Icon from './CollectionIcon'
import styles from './collection.module.css'

export function displayFindingDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return '—'
  return value.split('-').reverse().join('.')
}

export default function FindingDetails({ item, onEdit, onRemove, onClose }) {
  return <>
    <header className={styles.detailHead}>
      <div><h2 id={onClose ? 'collection-mobile-title' : undefined}>{findingLabel(item)}</h2><p>{[item.modality, item.examArea].filter(Boolean).join(' · ') || 'Gespeicherter Befund'}</p></div>
      {onClose && <button type="button" className={styles.iconButton} aria-label="Details schließen" onClick={onClose}><Icon name="close"/></button>}
    </header>
    <dl className={styles.facts}>
      {[
        ['Name / Referenz', item.name || '—'], ['Geburtsdatum', displayFindingDate(item.birthDate)],
        ['Modalität', item.modality || '—'], ['Untersuchungsgebiet', item.examArea || item.exam || '—'],
        ['Untersuchungsdatum', displayFindingDate(item.examDate)],
      ].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
    </dl>
    <section className={styles.note}><h3>Notiz</h3><p>{findingNote(item) || 'Keine Notiz hinterlegt.'}</p></section>
    {(item.diagnosis || item.learningPoint || item.reviewResult || item.tags) && <details className={styles.legacyNotes}>
      <summary>Weitere gespeicherte Angaben</summary>
      {[[item.diagnosis, 'Diagnose / Falltitel'], [item.learningPoint, 'Lernpunkt'], [item.reviewResult, 'Verlauf / Rückmeldung'], [item.tags, 'Stichworte']].filter(([value]) => value).map(([value, label]) => <div key={label}><h4>{label}</h4><p>{value}</p></div>)}
    </details>}
    <footer className={styles.detailActions}>
      <button type="button" onClick={() => onEdit(item)}><Icon name="edit"/>Bearbeiten</button>
      <button type="button" onClick={() => onRemove(item)} className={styles.delete}><Icon name="trash"/>Löschen</button>
    </footer>
  </>
}
