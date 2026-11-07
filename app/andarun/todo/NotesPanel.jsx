'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './notes.module.css'

const API = '/api/andarun/notes'
const characters = new Intl.Segmenter('de', { granularity: 'grapheme' })
const fitsNote = text => [...characters.segment(text)].length <= 500 && new TextEncoder().encode(text).length <= 65536
const seconds = value => `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(2, '0')}`
const merge = (notes, note) => [...notes.filter(item => item.id !== note.id), ...(note.deleted ? [] : [note])]

async function request(path, method = 'GET', body) {
  const response = await fetch(path, { method, cache: 'no-store', headers: body ? { 'Content-Type': 'application/json' } : {}, body: body ? JSON.stringify(body) : undefined })
  const result = await response.json()
  if (!response.ok) throw new Error(response.status === 403 ? 'Bitte erneut bei Jaminova anmelden.' : result.error || 'Nicht gespeichert. Bitte erneut versuchen.')
  return result
}
function durationOf(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file), player = new Audio()
    const done = (error) => { clearTimeout(timer); URL.revokeObjectURL(url); error ? reject(error) : resolve(player.duration) }
    const timer = setTimeout(() => done(new Error('Die Aufnahme konnte nicht gelesen werden.')), 10000)
    player.preload = 'metadata'; player.onloadedmetadata = () => done(); player.onerror = () => done(new Error('Bitte eine gültige M4A-Aufnahme auswählen.')); player.src = url
  })
}

export default function NotesPanel() {
  const [notes, setNotes] = useState([])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [audio, setAudio] = useState({})
  const sequence = useRef(0), mounted = useRef(true), working = useRef(false), dialog = useRef(null)
  const draftIdentity = useRef(null)
  const fileInput = useRef(null), audioDraft = useRef(null)
  const [uploadPending, setUploadPending] = useState(false)
  const load = useCallback(async () => {
    if (working.current) return
    const version = ++sequence.current
    try {
      const result = await request(API)
      if (mounted.current && version === sequence.current) { setNotes(result.notes.filter(note => !note.deleted)); setMessage('') }
    } catch (error) { if (mounted.current && version === sequence.current) setMessage(error.message) }
    finally { if (mounted.current) setLoading(false) }
  }, [])
  useEffect(() => {
    mounted.current = true; load()
    const focus = () => { if (document.visibilityState === 'visible') load() }
    window.addEventListener('focus', focus); document.addEventListener('visibilitychange', focus)
    const timer = setInterval(focus, 20000)
    return () => { mounted.current = false; sequence.current++; clearInterval(timer); window.removeEventListener('focus', focus); document.removeEventListener('visibilitychange', focus) }
  }, [load])
  useEffect(() => { if (editing || deleting) dialog.current?.showModal(); else dialog.current?.close() }, [editing, deleting])

  async function write(note, changes = {}, remove = false) {
    if (working.current) return
    working.current = true; setBusy(true); sequence.current++; setMessage('')
    try {
      const result = await request(API, remove ? 'DELETE' : 'PUT', {
        id: note.id, baseVersion: note.version ?? 0, mutationId: crypto.randomUUID(), text: note.text,
        done: note.done, createdAt: note.createdAt, voice: note.voice, ...changes,
        ...(remove && note.voice ? { fileName: note.voice.fileName } : {}),
      })
      if (!mounted.current) return
      setNotes(current => merge(current, result.note))
      const target = { ...note, ...changes }
      const reachedTarget = remove ? result.note.deleted : !result.note.deleted && result.note.text === target.text && result.note.done === target.done && (result.note.voice?.fileName ?? null) === (target.voice?.fileName ?? null)
      if (result.conflict && !reachedTarget) {
        setMessage('Diese Notiz wurde inzwischen auf einem anderen Gerät geändert. Dein Entwurf bleibt im Fenster erhalten.')
        if (editing) setEditing(current => current ? { ...current, conflict: result.note } : current)
        setDeleting(null)
        return false
      }
      setEditing(null); setDeleting(null)
      return true
    } catch (error) { if (mounted.current) setMessage(error.message); return false }
    finally { working.current = false; if (mounted.current) setBusy(false) }
  }
  async function add(event) {
    event.preventDefault()
    if (!text.trim() || !fitsNote(text.trim())) return
    if (!draftIdentity.current) draftIdentity.current = { id: crypto.randomUUID(), createdAt: Date.now() / 1000 }
    const saved = await write({ ...draftIdentity.current, text: text.trim(), done: false })
    if (saved) { setText(''); draftIdentity.current = null }
  }
  async function play(note) {
    setMessage('')
    try {
      const result = await request(`${API}/audio`, 'POST', { action: 'download', id: note.id })
      if (mounted.current) setAudio(current => ({ ...current, [note.id]: result.url }))
    } catch (error) { if (mounted.current) setMessage(error.message) }
  }
  async function uploadAudio(file) {
    if (working.current) return
    working.current = true; setBusy(true); sequence.current++; setMessage('')
    try {
      if (file) {
        if (!/\.m4a$/i.test(file.name) || file.size <= 0 || file.size > 8 * 1024 * 1024) throw new Error('Bitte eine M4A-Aufnahme bis 8 MB auswählen.')
        const duration = await durationOf(file)
        if (!Number.isFinite(duration) || duration <= 0 || duration > 601) throw new Error('Aufnahmen können bis zu 10 Minuten lang sein.')
        const id = crypto.randomUUID()
        audioDraft.current = { file, note: { id, text: file.name.replace(/\.m4a$/i, '').slice(0,500) || 'Sprachnotiz', done: false, createdAt: Date.now() / 1000, voice: { fileName: `${id}.m4a`, duration } } }
        setUploadPending(true)
      }
      const draft = audioDraft.current
      if (!draft) return
      const target = await request(`${API}/audio`, 'POST', { action: 'upload', id: draft.note.id, fileName: draft.note.voice.fileName, size: draft.file.size })
      if (!target.uploaded) {
        const url = new URL(target.url)
        if (url.protocol !== 'https:' || url.hostname !== 'rqqywyollxbcbzeodpto.supabase.co' || !url.pathname.startsWith('/storage/v1/object/upload/sign/jaminova-notes-audio/')) throw new Error('Ungültiges Upload-Ziel.')
        const response = await fetch(url, { method: 'PUT', credentials: 'omit', headers: { 'Content-Type': 'audio/mp4' }, body: draft.file })
        if (!response.ok) throw new Error('Aufnahme noch nicht hochgeladen. Bitte erneut versuchen.')
      }
      working.current = false; setBusy(false)
      if (await write(draft.note)) { audioDraft.current = null; setUploadPending(false) }
    } catch (error) { if (mounted.current) setMessage(error.message) }
    finally { working.current = false; if (mounted.current) setBusy(false); if (fileInput.current) fileInput.current.value = '' }
  }
  const ordered = [...notes].sort((a, b) => Number(a.done) - Number(b.done) || b.createdAt - a.createdAt)
  return <section className={styles.panel} aria-label="Notizen">
    <header className={styles.header}>
      <div><span className={styles.eyebrow}>DEINE GEDANKEN</span><h2>Notizen</h2><p>Text und Stimme. Auf dem iPhone und hier.</p></div>
      <button type="button" onClick={load} disabled={busy || loading} aria-label="Notizen aktualisieren">↻</button>
    </header>
    <form onSubmit={add} className={styles.composer}>
      <label htmlFor="new-jaminova-note" className={styles.srOnly}>Neue Notiz</label>
      <textarea id="new-jaminova-note" placeholder="Was möchtest du festhalten?" value={text} rows={2} onChange={event => { if (fitsNote(event.target.value)) setText(event.target.value) }} disabled={busy} />
      <button type="submit" disabled={busy || loading || !text.trim()}>Notiz hinzufügen</button>
    </form>
    <div className={styles.audioImport}>
      <input ref={fileInput} className={styles.srOnly} type="file" accept=".m4a,audio/mp4,audio/x-m4a" aria-label="M4A-Aufnahme auswählen" onChange={event => { const file = event.target.files?.[0]; if (file) uploadAudio(file) }} />
      <button type="button" onClick={() => fileInput.current?.click()} disabled={busy || loading}>Audio hinzufügen</button>
      {uploadPending ? <button type="button" onClick={() => uploadAudio()} disabled={busy}>Upload erneut versuchen</button> : null}
      <span>M4A · bis 10 Minuten. Direkt aufnehmen kannst du in der iPhone-App.</span>
    </div>
    <p className={styles.status} role="status">{message || (loading ? 'Notizen werden geladen …' : busy ? 'Wird gespeichert …' : 'Privat mit Jaminova synchronisiert.')}</p>
    {!loading && !notes.length ? <p className={styles.empty}>Platz für deinen nächsten Gedanken.</p> : null}
    <ul className={styles.list}>
      {ordered.map(note => <li key={note.id} className={styles.note}>
        <div className={styles.noteTop}>
          <button type="button" className={`${styles.check} ${note.done ? styles.checked : ''}`} aria-label={`${note.done ? 'Wieder öffnen' : 'Abhaken'}: ${note.text}`} aria-pressed={note.done} disabled={busy} onClick={() => write(note, { done: !note.done })}>{note.done ? '✓' : ''}</button>
          <button type="button" className={styles.title} disabled={busy} onClick={() => setEditing({ ...note, draft: note.text })}>{note.text}</button>
          <button type="button" className={styles.delete} disabled={busy} onClick={() => setDeleting(note)} aria-label={`Löschen: ${note.text}`}>×</button>
        </div>
        {note.voice ? <div className={styles.recording}>
          <span>◖ Sprachnotiz · {seconds(note.voice.duration)}</span>
          {audio[note.id] ? <audio controls autoPlay preload="metadata" src={audio[note.id]} aria-label={`Aufnahme: ${note.text}`} onError={() => { setAudio(current => ({ ...current, [note.id]: null })); setMessage('Aufnahme bitte erneut öffnen; der private Link ist möglicherweise abgelaufen.') }} /> : <button type="button" onClick={() => play(note)}>Aufnahme abspielen</button>}
        </div> : null}
        <time dateTime={new Date(note.createdAt * 1000).toISOString()}>{new Date(note.createdAt * 1000).toLocaleDateString('de-DE', { day: 'numeric', month: 'short' })}{note.done ? ' · Abgehakt' : ''}</time>
      </li>)}
    </ul>
    <dialog ref={dialog} className={styles.dialog} onCancel={event => { if (busy) event.preventDefault(); else { setEditing(null); setDeleting(null) } }} aria-labelledby="note-dialog-title">
      {editing ? <form onSubmit={event => { event.preventDefault(); write(editing, { text: editing.draft.trim() }) }}>
        <h3 id="note-dialog-title">{editing.voice ? 'Titel bearbeiten' : 'Notiz bearbeiten'}</h3>
        <label htmlFor="note-edit-text">{editing.voice ? 'Titel der Aufnahme' : 'Deine Notiz'}</label>
        <textarea autoFocus id="note-edit-text" rows={5} value={editing.draft} onChange={event => { if (fitsNote(event.target.value)) setEditing(current => ({ ...current, draft: event.target.value })) }} disabled={busy} />
        {editing.conflict ? <p role="status">Auf einem anderen Gerät geändert. Wähle, welche Fassung du verwenden möchtest.{editing.conflict.deleted ? ' Die ursprüngliche Notiz wurde gelöscht; dein Text kann als neue Notiz gespeichert werden.' : ''}</p> : null}
        <div className={styles.actions}>
          <button type="button" disabled={busy} onClick={() => setEditing(null)}>Schließen</button>
          {editing.conflict ? <>
            {!editing.conflict.deleted ? <button type="button" disabled={busy} onClick={() => setEditing({ ...editing.conflict, draft: editing.conflict.text })}>Serverfassung laden</button> : null}
            <button type="button" disabled={busy || !editing.draft.trim()} onClick={() => write(editing.conflict.deleted ? { id: crypto.randomUUID(), text: editing.draft.trim(), done: false, createdAt: Date.now() / 1000 } : editing.conflict, { text: editing.draft.trim() })}>{editing.conflict.deleted ? 'Als Textnotiz speichern' : 'Meine Fassung übernehmen'}</button>
          </> : <button type="submit" disabled={busy || !editing.draft.trim()}>Speichern</button>}
        </div>
        {message ? <p role="alert">{message}</p> : null}
      </form> : deleting ? <div>
        <h3 id="note-dialog-title">Notiz{deleting.voice ? ' und Aufnahme' : ''} löschen?</h3>
        <p>Die Notiz wird auch auf deinen anderen Geräten entfernt.</p>
        <div className={styles.actions}><button type="button" disabled={busy} onClick={() => setDeleting(null)}>Abbrechen</button><button type="button" disabled={busy} onClick={() => write(deleting, {}, true)}>Löschen</button></div>
        {message ? <p role="alert">{message}</p> : null}
      </div> : null}
    </dialog>
  </section>
}
