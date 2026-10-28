import { FINDING_AREAS, FINDING_MODALITIES } from '@/lib/findingCollection'
import CollectionDialog from './CollectionDialog'
import Icon from './CollectionIcon'
import styles from './collection.module.css'

export default function FindingForm({ form, onChange, onSave, onClose, saving, error, section }) {
  const update = (key, value) => onChange(previous => ({ ...previous, [key]: value }))
  const areas = FINDING_AREAS[form.modality] || []
  return <CollectionDialog labelId="collection-form-title" onClose={() => { if (!saving) onClose() }}>
    <header className={styles.modalHead}><div><h2 id="collection-form-title">{form.id ? 'Eintrag bearbeiten' : 'Neuer Eintrag'}</h2><p>{section === 'controls' ? 'Befundkontrolle' : 'Interessante Befunde'}</p></div><button type="button" className={styles.iconButton} aria-label="Schließen" onClick={onClose} disabled={saving}><Icon name="close"/></button></header>
    <form onSubmit={onSave}>
      <div className={styles.formFields}>
        <label className={styles.fullField}>Name / Referenz<input value={form.name || ''} onChange={event => update('name', event.target.value)} data-autofocus required maxLength={120} autoComplete="off" placeholder="Name oder Fallreferenz"/></label>
        <div className={styles.formGrid}>
          <label>Geburtsdatum<input type="date" value={form.birthDate || ''} onChange={event => update('birthDate', event.target.value)}/></label>
          <label>Untersuchungsdatum<input type="date" value={form.examDate || ''} onChange={event => update('examDate', event.target.value)}/></label>
          <label>Modalität<select value={form.modality || ''} onChange={event => onChange(previous => ({ ...previous, modality: event.target.value, examArea: '' }))}><option value="">Auswählen</option>{form.modality && !FINDING_MODALITIES.includes(form.modality) && <option>{form.modality}</option>}{FINDING_MODALITIES.map(value => <option key={value}>{value}</option>)}</select></label>
          <label>Untersuchungsgebiet<select value={form.examArea || ''} onChange={event => update('examArea', event.target.value)}><option value="">Auswählen</option>{form.examArea && !areas.includes(form.examArea) && <option>{form.examArea}</option>}{areas.map(value => <option key={value}>{value}</option>)}</select></label>
        </div>
        <label className={styles.fullField}><span>Notiz <span className={styles.optional}>(optional)</span></span><textarea value={form.note || ''} onChange={event => update('note', event.target.value)} maxLength={1000} rows={3} placeholder="Was möchtest du später noch einmal ansehen?"/></label>
        {error && <p className={styles.error} role="alert">{error}</p>}
      </div>
      <footer className={styles.formActions}><button type="button" className={styles.secondary} onClick={onClose} disabled={saving}>Abbrechen</button><button type="submit" className={styles.primary} disabled={saving}>{saving ? 'Wird gespeichert …' : 'Eintrag speichern'}</button></footer>
    </form>
  </CollectionDialog>
}
