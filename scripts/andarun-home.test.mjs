import test from 'node:test'
import assert from 'node:assert/strict'
import { ANDARUN_HOME_GROUPS } from '../data/andarunHome.js'

test('four groups retain existing modules and expose finance destinations inline', () => {
  const items = ANDARUN_HOME_GROUPS.flatMap(group => group.items)
  assert.deepEqual(ANDARUN_HOME_GROUPS.map(group => group.title), ['Alltag', 'Gesundheit', 'Lernen', 'Finanzen'])
  assert.equal(items.length, 14)
  assert.equal(new Set(items.map(item => item.title)).size, 14)
  assert.deepEqual(items.filter(item => item.href).map(item => item.href).sort(), [
    '/andarun/routine', '/andarun/todo', '/andarun/termine', '/andarun/dienste',
    '/andarun/gesundheit', '/andarun/medikamente', '/andarun/deutsch', '/andarun/befunde', '/andarun/test',
    '/andarun/finanz', '/andarun/urlaub', '/andarun/finanz/freunde', '/digitda',
  ].sort())
  assert.equal(items.some(item => item.action), false)
  assert.equal(items.some(item => /kaenguru|kang/i.test(item.href || item.title)), false)
})

test('all module titles are German and prisoner help has no active destination', () => {
  const items = ANDARUN_HOME_GROUPS.flatMap(group => group.items)
  assert.equal(items.some(item => /[\u0600-\u06ff]|ToDos/.test(item.title)), false)
  assert.deepEqual(items.filter(item => item.disabled), [{ title: 'Hilfe für Gefangene', icon: 'people', disabled: true }])
  assert.equal(items.some(item => item.href === '/andarun/finanz/gefangene'), false)
})
