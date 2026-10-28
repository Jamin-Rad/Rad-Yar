import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { sanitizeSavedFinding } from '../lib/findingCollection.js'

function workRoute(initial, allowed = true) {
  let store = structuredClone(initial)
  const table = {
    select() { return this }, eq() { return this },
    async maybeSingle() { return { data: { store } } },
    upsert(payload) { store = structuredClone(payload.store); return this },
    async single() { return { data: { store } } },
  }
  const source = readFileSync(new URL('../app/api/andarun/work/route.js', import.meta.url), 'utf8')
    .replace(/^import .*\r?\n/gm, '').replaceAll('export async function', 'async function')
  const auth = async () => allowed ? {} : { error: 'Not allowed', status: 403 }
  return new Function('NextResponse', 'requireAndarunSession', 'requireFatimaSession', 'isSupabaseAdminConfigured', 'supabaseAdmin', 'sanitizeSavedFinding', source + '\nreturn { GET, POST };')(
    { json: (data, init) => Response.json(data, init) }, auth, auth, true, { from: () => table }, sanitizeSavedFinding,
  )
}

const initial = {
  shifts: [{ id: 'shift-2026-10-28', date: '2026-10-28', model: 'T', actualStart: '08:00' }],
  findingTimers: [{ id: 'timer', date: '2026-10-28', modality: 'CT', durationMs: 600000 }],
  findings: [
    { id: 'case', type: 'case', name: 'Archiv', diagnosis: 'Vorhandener Fall' },
    { id: 'control', type: 'question', name: 'Kontrolle', status: 'erledigt', dueDate: '2024-01-01' },
  ],
}

test('reference-only control save keeps archived cases, previous controls, shifts and timer history', async () => {
  const route = workRoute(initial)
  const response = await route.POST({ json: async () => ({ type: 'finding', finding: { id: 'new', type: 'question', name: 'Später ansehen' } }) })
  assert.equal(response.status, 200)
  const saved = await response.json()
  assert.deepEqual(saved.shifts, initial.shifts)
  assert.deepEqual(saved.findingTimers, initial.findingTimers)
  for (const record of initial.findings) assert.deepEqual(saved.findings.find(item => item.id === record.id), record)
  const control = saved.findings.find(item => item.id === 'new')
  for (const key of ['dueDate', 'status', 'priority']) assert.equal(control[key], '')
  assert.equal((await (await route.GET()).json()).findings.length, 3)
})

test('an empty finding is rejected and unauthorized requests cannot modify records', async () => {
  const valid = workRoute(initial)
  assert.equal((await valid.POST({ json: async () => ({ type: 'finding', finding: {} }) })).status, 400)
  assert.equal((await (await valid.GET()).json()).findings.length, 2)
  const denied = workRoute(initial, false)
  assert.equal((await denied.GET()).status, 403)
  assert.equal((await denied.POST({ json: async () => ({}) })).status, 403)
})
