import test from 'node:test'
import assert from 'node:assert/strict'
import { listRadiopaediaCases, remoteCaseSummary } from './radiopaedia.mjs'

const item = id => ({ id, title: `Synthetic case ${id}`, status: 'draft' })
test('authenticated case listing reads all cursor pages and deduplicates IDs', async () => {
  const urls = []
  const result = await listRadiopaediaCases('synthetic-token', { fetchImpl: async (url, options) => {
    urls.push(url.href)
    assert.equal(options.headers.Authorization, 'Bearer synthetic-token')
    return urls.length === 1
      ? new Response(JSON.stringify([item(1), item(2)]), { headers: { 'X-Next-Cursor': 'cursor one' } })
      : new Response(JSON.stringify([item(2), item(3)]))
  } })
  assert.deepEqual(result.map(value => value.id), [1, 2, 3])
  assert.ok(urls[1].includes('cursor=cursor+one'))
})
test('incomplete or failed listings do not return a partial collection', async () => {
  await assert.rejects(listRadiopaediaCases('synthetic-token', { fetchImpl: async () => new Response(JSON.stringify([item(1)]), { headers: { 'X-Next-Cursor': 'same' } }) }), /unvollständig/)
  await assert.rejects(listRadiopaediaCases('synthetic-token', { maxPages: 1, fetchImpl: async () => new Response(JSON.stringify([item(1)]), { headers: { 'X-Next-Cursor': 'more' } }) }), /Seitenlimit/)
  await assert.rejects(listRadiopaediaCases('synthetic-token', { fetchImpl: async () => new Response('Do not expose response details', { status: 401 }) }), /HTTP 401/)
  await assert.rejects(listRadiopaediaCases(''), /Verbindung fehlt/)
})
test('only the verified account-list schema is accepted', () => {
  assert.throws(() => remoteCaseSummary({ ...item(1), id: '../private' }))
  assert.throws(() => remoteCaseSummary({ ...item(1), status: 'unexpected' }))
  assert.equal(remoteCaseSummary(item(123)).url, 'https://radiopaedia.org/cases/123')
})
