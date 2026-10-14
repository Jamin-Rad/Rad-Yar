import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { splitEventNote, combineEventNote } from '../utils/eventLocation.js'

test('separate location and note round-trip, including location-only and empty events', () => {
  for (const fields of [{ location: 'Praxis Müller, Berlin', note: 'Ausweis mitbringen\n15 Minuten früher kommen' }, { location: 'Zürich', note: '' }, { location: '', note: 'Online' }, { location: '', note: '' }]) {
    assert.deepEqual(splitEventNote(combineEventNote(fields.location, fields.note)), fields)
  }
})

test('existing ICS/ChatGPT location lines are editable without duplicating them', () => {
  for (const original of ['Ort: Stuttgart\nAusweis mitbringen', 'Ort: Stuttgart\r\nAusweis mitbringen']) {
    const fields = splitEventNote(original)
    assert.equal(fields.location, 'Stuttgart')
    assert.equal(fields.note, 'Ausweis mitbringen')
    assert.equal(combineEventNote('Berlin', fields.note), 'Ort: Berlin\nAusweis mitbringen')
    assert.equal(combineEventNote('', fields.note), 'Ausweis mitbringen')
  }
  assert.deepEqual(splitEventNote('Bitte den Ort: Stuttgart bestätigen'), { location: '', note: 'Bitte den Ort: Stuttgart bestätigen' })
})

test('places stay single-line and plain legacy notes remain intact', () => {
  assert.equal(combineEventNote('  Berlin\nMitte ', '  Notiz  '), 'Ort: Berlin Mitte\nNotiz')
  assert.deepEqual(splitEventNote(null), { location: '', note: '' })
  assert.deepEqual(splitEventNote('Bestehende Notiz\nZweite Zeile'), { location: '', note: 'Bestehende Notiz\nZweite Zeile' })
})

test('actual API storage codec preserves location, times and status on modern and legacy rows', () => {
  const source = readFileSync(new URL('../app/api/andarun/todos/route.js', import.meta.url), 'utf8').replace(/^import .*\r?\n/gm, '').replaceAll('export async function', 'async function')
  const api = new Function(source + '\nreturn {encodeStoredNote, toClient};')()
  const note = combineEventNote('Hamburg', 'Unterlagen')
  for (const modern of [false, true]) {
    const row = { note: api.encodeStoredNote(note, 'event', '15:00', false, '', '16:00', true), done: true, ...(modern ? { item_type: 'event', event_time: '15:00', all_day: false } : {}) }
    const event = api.toClient(row)
    assert.deepEqual(splitEventNote(event.note), { location: 'Hamburg', note: 'Unterlagen' })
    assert.equal(event.eventTime, '15:00')
    assert.equal(event.endTime, '16:00')
    assert.equal(event.cancelled, true)
    assert.equal(event.done, true)
  }
})

test('all composers/editors share the fields and prevent silent API note truncation', () => {
  const ui = readFileSync(new URL('../app/andarun/todo/TodoPage.jsx', import.meta.url), 'utf8')
  assert.equal((ui.match(/<EventNoteFields /g) || []).length, 3)
  assert.match(ui, /JSON.stringify\(\{ \.\.\.form, note: optimistic.note \}\)/)
  assert.match(ui, /combineEventNote\(detailForm.location, detailForm.note\)/)
  const fields = readFileSync(new URL('../app/andarun/todo/EventNoteFields.jsx', import.meta.url), 'utf8')
  assert.match(fields, /\.length > 500/)
  assert.match(fields, /setCustomValidity\(error\)/)
})
