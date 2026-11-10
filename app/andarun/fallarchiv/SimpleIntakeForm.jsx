'use client'

import styles from './archive.module.css'

export default function SimpleIntakeForm({ draft, setDraft, saving, onSubmit, onCancel }) {
  const set = (key, value) => setDraft(current => ({ ...current, [key]: value }))
  const updateStudy = (id, key, value) => setDraft(current => ({ ...current, studies: current.studies.map(study => study.id === id ? { ...study, [key]: value } : study) }))
  function addPrevious() {
    setDraft(current => ({ ...current, studies: [...current.studies, {
      id: crypto.randomUUID(), kind: 'prior', date: '', modality: 'CT', area: current.intakeArea,
      diagnosis: '', reportOriginal: '', assessmentOriginal: '', reportDe: '', reportEn: '',
      localPath: '', radiopaediaUrl: '', thumbnailUrl: '', publicationStatus: 'not-linked',
    }] }))
  }
  return <form onSubmit={onSubmit} className={styles.form} lang="de">
    <fieldset disabled={saving}><legend>Patient · {draft.intakeArea}</legend><div className={styles.formGrid}>
      <label>Name<input value={draft.patient.name} autoComplete="off" onChange={event => set('patient', { ...draft.patient, name: event.target.value })}/></label>
      <label>Geburtsdatum<input type="date" value={draft.patient.birthDate} onChange={event => set('patient', { ...draft.patient, birthDate: event.target.value })}/></label>
      <label>Dateinummer · {draft.intakeArea}<input type="number" min="1" max="999999999" step="1" required inputMode="numeric" value={draft.archiveNumber || draft.requestedArchiveNumber || ''} readOnly={Boolean(draft.archiveNumber)} onChange={event => set('requestedArchiveNumber', event.target.value)} aria-describedby="intake-number-help"/></label>
      <p id="intake-number-help" className={styles.numberHelp}>{draft.archiveNumber ? 'Gespeichert: Die Nummer bleibt für diesen Fall fest.' : `Nummer selbst wählen. Sie darf innerhalb von ${draft.intakeArea} nur einmal vorkommen. Die Prüfung erfolgt beim Speichern.`}</p>
      <label className={styles.fullWidth}>Anamnese<textarea rows={3} value={draft.historyOriginal} onChange={event => set('historyOriginal', event.target.value)}/></label>
    </div></fieldset>
    {draft.intakeArea === 'Prostata' ? <fieldset disabled={saving}><legend>PSA · optional</legend><div className={styles.formGrid}>
      <label>PSA (ng/ml)<input inputMode="decimal" value={draft.psa?.value || ''} placeholder="z. B. 5,2" onChange={event => set('psa', { ...draft.psa, value: event.target.value })}/></label>
      <label>Datum der PSA-Bestimmung<input type="date" value={draft.psa?.date || ''} onChange={event => set('psa', { ...draft.psa, date: event.target.value })}/></label>
    </div></fieldset> : null}
    {draft.studies.map((study, index) => <fieldset key={study.id} disabled={saving}><legend>{index === 0 ? `Aktueller Befund · MRT ${draft.intakeArea}` : `Vorbefund ${index}`}</legend><div className={styles.formGrid}>
      {index > 0 ? <label>Modalität<select value={study.modality} onChange={event => updateStudy(study.id, 'modality', event.target.value)}>{[...new Set(['CT', 'Röntgen', 'MRT', study.modality].filter(Boolean))].map(value => <option key={value}>{value}</option>)}</select></label> : null}
      <label>Untersuchungsdatum<input type="date" value={study.date} onChange={event => updateStudy(study.id, 'date', event.target.value)}/></label>
      <label className={styles.fullWidth}>Diagnose<input value={index === 0 ? draft.diagnosis : study.diagnosis || ''} onChange={event => index === 0 ? setDraft(current => ({ ...current, diagnosis: event.target.value, title: event.target.value || `MRT ${current.intakeArea}` })) : updateStudy(study.id, 'diagnosis', event.target.value)}/></label>
      <label className={styles.fullWidth}>Befund<textarea rows={6} value={study.reportOriginal} onChange={event => updateStudy(study.id, 'reportOriginal', event.target.value)}/></label>
      <label className={styles.fullWidth}>Beurteilung<textarea rows={4} value={study.assessmentOriginal || ''} onChange={event => updateStudy(study.id, 'assessmentOriginal', event.target.value)}/></label>
    </div></fieldset>)}
    <button type="button" className={styles.secondaryButton} onClick={addPrevious} disabled={saving}>+ Vorbefund hinzufügen</button>
    <footer className={styles.formFooter}><button type="button" className={styles.secondaryButton} disabled={saving} onClick={onCancel}>Abbrechen</button><button className={styles.primaryButton} disabled={saving}>{saving ? 'Wird gespeichert …' : 'Speichern'}</button></footer>
  </form>
}
