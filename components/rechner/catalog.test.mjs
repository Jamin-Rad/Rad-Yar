import test from 'node:test'
import assert from 'node:assert/strict'
import { REF_DATA } from '../../data/referenzen.js'
import { TOOLS, GROUPS, filterTools, directoryHref, toolHref } from './catalog.js'

test('every existing calculator is reachable and every inline calculator has an engine entry', () => {
  assert.equal(new Set(TOOLS.map(tool => tool.id)).size, TOOLS.length)
  for (const calculator of REF_DATA.rechner) assert.ok(TOOLS.some(tool => tool.id === calculator.id), calculator.id)
  for (const tool of TOOLS) {
    assert.ok(GROUPS.some(group => group.id === tool.group), tool.id)
    assert.ok(tool.href || REF_DATA.rechner.some(calc => calc.id === tool.id), tool.id)
  }
})
test('search handles abbreviations, diacritics and Persian without dropping group filters', () => {
  assert.ok(filterTools('all', 'pirads').some(tool => tool.id === 'pi-rads'))
  assert.ok(filterTools('all', 'Gefasse').some(tool => tool.id === 'nascet'))
  assert.ok(filterTools('all', 'پروستات').some(tool => tool.id === 'prostata-psa'))
  assert.deepEqual(filterTools('mamma', 'pirads'), [])
  assert.ok(filterTools('mamma', 'node').some(tool => tool.id === 'node-rads'))
  assert.ok(filterTools('onko', 'node').some(tool => tool.id === 'node-rads'))
  assert.deepEqual(filterTools('all', 'unmatched-example-xyz'), [])
})
test('navigation preserves language and safely encodes search state', () => {
  const href = directoryHref({ group: 'urogenital', query: 'PSA & حجم', lang: 'fa' })
  const url = new URL(href, 'https://www.rad-yar.com')
  assert.equal(url.pathname, '/rechner')
  assert.equal(url.searchParams.get('q'), 'PSA & حجم')
  assert.equal(url.searchParams.get('lang'), 'fa')
  assert.equal(toolHref(TOOLS.find(tool => tool.id === 'evans-index'), 'de'), '/rechner/evans-index?lang=de')
  assert.equal(toolHref(TOOLS.find(tool => tool.id === 'pi-rads'), 'fa'), '/pi-rads?lang=fa')
})
