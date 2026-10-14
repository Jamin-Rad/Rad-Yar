'use client'

import { useEffect, useRef } from 'react'
import { combineEventNote } from '@/utils/eventLocation'

export default function EventNoteFields({ form, setForm }) {
  const input = useRef(null)
  const isEvent = form.itemType === 'event'
  const tooLong = isEvent && combineEventNote(form.location, form.note).length > 500
  const error = tooLong ? 'Ort und Notiz dürfen zusammen höchstens 500 Zeichen enthalten.' : ''
  useEffect(() => { input.current?.setCustomValidity(error) }, [error])
  return <>
    {isEvent && <label>
      Ort
      <input value={form.location || ''} onChange={event => setForm(previous => ({ ...previous, location: event.target.value }))} placeholder="Adresse oder Treffpunkt" maxLength={200} autoComplete="off" />
    </label>}
    <label>
      Notiz
      <input ref={input} value={form.note} onChange={event => setForm(previous => ({ ...previous, note: event.target.value }))} placeholder="Optional" maxLength={500} aria-invalid={tooLong || undefined} />
      {tooLong && <small role="alert">{error}</small>}
    </label>
  </>
}
