'use client'

import { useEffect, useRef, useState } from 'react'
import { alignPhotoRange, normalizePhotoMeal, PHOTO_NUTRIENTS, scalePhotoItem } from '../../../utils/foodPhotoMeals'
import { prepareFoodPhoto } from '../../../utils/prepareFoodPhoto'
import styles from './FoodPhotoEstimator.module.css'

const fields = [['g', 'Menge', 'g'], ['kcal', 'Kalorien', 'kcal'], ['protein', 'Protein', 'g'], ['carbs', 'Kohlenhydrate', 'g'], ['fat', 'Fett', 'g'], ['sugar', 'davon Zucker', 'g']]

export default function FoodPhotoEstimator({ apiBase, date, initialMeal = null, onConfirm, onClose }) {
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [consent, setConsent] = useState(false)
  const [config, setConfig] = useState(null)
  const [draft, setDraft] = useState(initialMeal ? { ...initialMeal, confirmed: false } : null)
  const [busy, setBusy] = useState(false)
  const [preparing, setPreparing] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const requestRef = useRef(0)
  const controllerRef = useRef(null)
  const dialogRef = useRef(null)
  const onCloseRef = useRef(onClose)
  const confirmedRef = useRef(false)
  onCloseRef.current = onClose

  useEffect(() => {
    const controller = new AbortController()
    fetch(`${apiBase}/food-photo`, { cache: 'no-store', signal: controller.signal })
      .then(async response => { if (!response.ok) throw new Error(); return response.json() })
      .then(value => { if (!controller.signal.aborted) setConfig(value) })
      .catch(() => { if (!controller.signal.aborted) setConfig({ enabled: false, reason: 'Die Fotoanalyse ist gerade nicht verfügbar. Es wird kein Foto gesendet.' }) })
    return () => { controller.abort(); controllerRef.current?.abort(); requestRef.current += 1 }
  }, [apiBase])

  useEffect(() => {
    const previousFocus = document.activeElement
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()
    const keydown = event => {
      if (event.key === 'Escape') { event.preventDefault(); onCloseRef.current(); return }
      if (event.key !== 'Tab') return
      const elements = [...dialogRef.current.querySelectorAll('button:not(:disabled), input:not(:disabled), textarea:not(:disabled), a[href]')].filter(element => element.getClientRects().length)
      const first = elements[0], last = elements.at(-1)
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) { event.preventDefault(); last?.focus() }
      else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialogRef.current)) { event.preventDefault(); first?.focus() }
    }
    document.addEventListener('keydown', keydown)
    return () => { document.body.style.overflow = overflow; document.removeEventListener('keydown', keydown); if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus() }
  }, [])

  const selectPhoto = async event => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    controllerRef.current?.abort()
    const request = ++requestRef.current
    setBusy(false); setImage(''); setDraft(null); setConsent(false); setError(''); setPreparing(true)
    try {
      const prepared = await prepareFoodPhoto(file)
      if (request === requestRef.current) { setImage(prepared); setDraft(null) }
    } catch (failure) { if (request === requestRef.current) setError(failure.message) }
    finally { if (request === requestRef.current) setPreparing(false) }
  }

  const analyze = async () => {
    if (!image || !consent || !config?.enabled || busy) return
    const request = ++requestRef.current
    const controller = new AbortController()
    controllerRef.current?.abort(); controllerRef.current = controller
    const timer = setTimeout(() => controller.abort(), 55000)
    setBusy(true); setError('')
    try {
      const response = await fetch(`${apiBase}/food-photo`, {
        method: 'POST', cache: 'no-store', signal: controller.signal,
        headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image, description, consent: true }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Fotoanalyse fehlgeschlagen.')
      if (!data.isFood) throw new Error(data.message || 'Keine Mahlzeit erkennbar.')
      const result = normalizePhotoMeal(data.estimate)
      if (request === requestRef.current) setDraft({ ...result, id: initialMeal?.id || `photo-${crypto.randomUUID()}`, confirmed: false })
    } catch (failure) {
      if (request === requestRef.current) setError(failure.name === 'AbortError' ? 'Analyse abgebrochen oder Zeitlimit erreicht. Es wurde nichts eingetragen.' : failure.message)
    } finally { clearTimeout(timer); if (request === requestRef.current) setBusy(false) }
  }

  const updateItem = (index, field, raw) => {
    setDraft(previous => {
      const value = field === 'name' ? raw : raw === '' ? '' : Number(raw)
      const items = previous.items.map((item, i) => i !== index ? item : field === 'g' && typeof value === 'number' && value > 0 ? scalePhotoItem(item, value) : { ...item, [field]: value })
      return alignPhotoRange(previous, items)
    })
  }
  const portion = factor => setDraft(previous => alignPhotoRange(previous, previous.items.map(item => scalePhotoItem(item, item.g * factor))))
  let validation = '', validMeal = null
  if (draft) { try { validMeal = normalizePhotoMeal({ ...draft, confirmed: true }, true) } catch (failure) { validation = failure.message } }
  const total = draft?.items.reduce((sum, item) => sum + Number(item.kcal || 0), 0) || 0
  const confirm = async () => {
    if (!validMeal || confirmedRef.current) return
    confirmedRef.current = true; setSubmitting(true); setError('')
    try { await onConfirm(validMeal) }
    catch (failure) { confirmedRef.current = false; setSubmitting(false); setError(failure.message || 'Die Mahlzeit konnte nicht übernommen werden.') }
  }

  return <div className={styles.backdrop} onClick={event => { if (event.target === event.currentTarget && !submitting) onClose() }}>
    <section ref={dialogRef} tabIndex={-1} className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="food-photo-title" dir="ltr" lang="de">
      <header className={styles.header}><div><small>GESUNDHEIT · {date}</small><h2 id="food-photo-title">{draft ? 'Mahlzeit prüfen' : 'Essen per Foto'}</h2></div><button type="button" onClick={onClose} disabled={submitting} aria-label="Fotoanalyse schließen">×</button></header>
      <div className={styles.body}>
        <p className={styles.privacy}>Das Foto bleibt nur vorübergehend in diesem Fenster. RadYar speichert es nicht. Erst deine Bestätigung trägt die Zahlen ein.</p>
        <div className={styles.photoRow}>
          {image ? <img src={image} alt="Ausgewähltes Essen, nur lokale Vorschau" className={styles.preview} /> : <div className={styles.placeholder} aria-hidden="true">📷</div>}
          <div className={styles.photoActions}>
            <label className={styles.fileButton}>Foto aufnehmen<input type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" capture="environment" onChange={selectPhoto} disabled={preparing || submitting} /></label>
            <label className={styles.fileButton}>Aus Fotos wählen<input type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" onChange={selectPhoto} disabled={preparing || submitting} /></label>
            <small>{preparing ? 'Foto wird lokal verkleinert…' : initialMeal && !image ? 'Das ursprüngliche Foto wurde nicht gespeichert.' : 'Bilddaten werden lokal neu kodiert; EXIF-/GPS-Metadaten werden nicht übernommen.'}</small>
          </div>
        </div>
        {!draft && <>
          <label className={styles.description}>Optional: Was ist auf dem Teller?<textarea value={description} maxLength={500} onChange={event => { setDescription(event.target.value); setConsent(false) }} placeholder="Zum Beispiel: halbe Portion, mit Olivenöl, Sauce extra …" /></label>
          {config && !config.enabled && <p className={styles.warning}>{config.reason}</p>}
          <label className={styles.consent}><input type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} disabled={busy} /><span>Dieses Foto und meine optionale Beschreibung zur Analyse an OpenAI senden. Keine Gesundheitsakte wird mitgesendet. OpenAI kann Daten zur Sicherheitsprüfung bis zu 30 Tage aufbewahren; API-Nutzung verursacht Kosten. <a href="https://developers.openai.com/api/docs/guides/your-data" target="_blank" rel="noopener noreferrer">Datenschutz</a></span></label>
        </>}
        {draft && <>
          <div className={styles.estimate}><span>Schätzung · {draft.confidence === 'low' ? 'hohe Unsicherheit' : 'mittlere Unsicherheit'}</span><strong>{Math.round(total)} kcal</strong><small>Ungefähre Spanne: {draft.kcalMin}–{draft.kcalMax} kcal</small></div>
          <p className={styles.warning}>Gewicht, Öl und Zutaten sind aus einem Foto nicht sicher bestimmbar. Bitte Mengen und Nährwerte prüfen. Keine Grundlage für Medikamenten- oder Insulindosen.</p>
          <label className={styles.description}>Name der Mahlzeit<input value={draft.title} maxLength={120} onChange={event => setDraft(previous => ({ ...previous, title: event.target.value }))} /></label>
          <div className={styles.portions}><span>Gegessene Menge anpassen:</span><button type="button" onClick={() => portion(.5)}>Halbe Portion</button><button type="button" onClick={() => portion(2)}>Doppelte Portion</button></div>
          {draft.items.map((item, index) => <fieldset className={styles.item} key={index}>
            <legend>Lebensmittel {index + 1}</legend>
            <div className={styles.itemHeading}><label>Name<input value={item.name} maxLength={120} onChange={event => updateItem(index, 'name', event.target.value)} /></label><button type="button" aria-label={`Lebensmittel ${index + 1} entfernen`} onClick={() => setDraft(previous => alignPhotoRange(previous, previous.items.filter((_, i) => i !== index)))}>×</button></div>
            <div className={styles.fields}>{fields.map(([key, label, unit]) => <label key={key}>{label} ({unit})<input aria-label={`${label} Lebensmittel ${index + 1}`} type="number" inputMode="decimal" min={key === 'g' ? .1 : 0} max={key === 'g' ? 5000 : key === 'kcal' ? 10000 : 2000} step="0.1" value={item[key]} onChange={event => updateItem(index, key, event.target.value)} /></label>)}</div>
          </fieldset>)}
          {draft.items.length < 12 && <button className={styles.addItem} type="button" onClick={() => setDraft(previous => ({ ...previous, items: [...previous.items, { name: '', g: 100, ...Object.fromEntries(PHOTO_NUTRIENTS.map(key => [key, 0])) }] }))}>＋ Zutat ergänzen</button>}
          {draft.assumptions.length > 0 && <ul className={styles.assumptions}>{draft.assumptions.map((value, index) => <li key={index}>{value}</li>)}</ul>}
          {validation && <p className={styles.warning}>{validation}</p>}
        </>}
        {error && <p role="alert" className={styles.error}>{error}</p>}
      </div>
      <footer className={styles.footer}><button type="button" className={styles.cancel} onClick={onClose} disabled={submitting}>Verwerfen</button>{draft
        ? <button type="button" className={styles.primary} onClick={confirm} disabled={!validMeal || submitting}>{submitting ? 'Wird übernommen…' : 'Bestätigen und eintragen'}</button>
        : <button type="button" className={styles.primary} onClick={analyze} disabled={!image || !consent || !config?.enabled || busy || preparing}>{busy ? 'Wird analysiert…' : 'Foto analysieren'}</button>}</footer>
    </section>
  </div>
}
