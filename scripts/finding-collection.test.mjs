import test from 'node:test'
import assert from 'node:assert/strict'
import { filterFindingCollection, findingForm, findingPayload, sanitizeSavedFinding } from '../lib/findingCollection.js'

const legacy = {
  id: 'legacy', type: 'question', name: 'Beispiel', birthDate: '1980-06-04', modality: 'CT', examArea: 'Thorax', examDate: '2024-05-10',
  reviewReason: 'Später ansehen', reviewResult: 'Vorhandener Verlauf', question: 'Alte Notiz', dueDate: '2024-05-12', status: 'erledigt', priority: 'hoch', createdAt: '2024-05-10T10:00:00Z',
}

test('both collections remain separate, including completed and overdue legacy controls', () => {
  const records = [legacy, { ...legacy, id: 'due', status: 'offen' }, { id: 'case', type: 'case' }, { id: 'older-case' }]
  assert.deepEqual(new Set(filterFindingCollection(records, 'controls').map(item => item.id)), new Set(['legacy', 'due']))
  assert.deepEqual(new Set(filterFindingCollection(records, 'cases').map(item => item.id)), new Set(['case', 'older-case']))
})

test('saving an existing reference preserves identity, clinical notes and legacy metadata', () => {
  const form = findingForm(legacy, 'controls')
  const payload = findingPayload({ ...form, name: 'Neue Referenz', note: 'Neu ansehen' }, 'unused-id')
  const saved = sanitizeSavedFinding(payload, '2026-10-28T12:00:00Z')
  assert.equal(saved.id, legacy.id)
  assert.equal(saved.name, 'Neue Referenz')
  assert.equal(saved.reviewReason, 'Neu ansehen')
  for (const field of ['birthDate', 'modality', 'examArea', 'examDate', 'reviewResult', 'question', 'dueDate', 'status', 'priority', 'createdAt']) assert.equal(saved[field], legacy[field], field)
})

test('new controls can be saved without a date and do not invent task metadata', () => {
  const payload = findingPayload({ ...findingForm(null, 'controls'), name: 'Referenz', note: 'Bilder erneut ansehen' }, 'new')
  const saved = sanitizeSavedFinding(payload, '2026-10-28T12:00:00Z')
  assert.equal(saved.type, 'question')
  assert.equal(saved.name, 'Referenz')
  assert.equal(saved.reviewReason, 'Bilder erneut ansehen')
  for (const field of ['examDate', 'dueDate', 'priority', 'status']) assert.equal(saved[field], '', field)
})

test('search finds reference, birth date and existing notes without mixing sections', () => {
  const records = [legacy, { ...legacy, id: 'case', type: 'case', keyFinding: 'Lernpunkt' }]
  assert.equal(filterFindingCollection(records, 'controls', { search: 'BEISPIEL' }).length, 1)
  assert.equal(filterFindingCollection(records, 'controls', { search: '1980-06-04' }).length, 1)
  assert.equal(filterFindingCollection(records, 'controls', { search: '04.06.1980' }).length, 1)
  assert.equal(filterFindingCollection(records, 'controls', { search: 'Vorhandener Verlauf' }).length, 1)
  assert.equal(filterFindingCollection(records, 'controls', { modality: 'MRT' }).length, 0)
  assert.equal(filterFindingCollection(records, 'controls', { search: 'Lernpunkt' }).length, 0)
})
