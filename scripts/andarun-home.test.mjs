import test from 'node:test'
import assert from 'node:assert/strict'
import { ANDARUN_HOME_GROUPS, ANDARUN_DAILY_ACTIONS } from '../data/andarunHome.js'

test('all ten existing modules remain reachable once in the directory', () => {
  const items = ANDARUN_HOME_GROUPS.flatMap(group => group.items)
  assert.equal(items.length, 10)
  assert.equal(new Set(items.map(item => item.title)).size, 10)
  assert.deepEqual(items.filter(item => item.href).map(item => item.href).sort(), [
    '/andarun/routine', '/andarun/todo', '/andarun/termine', '/andarun/dienste',
    '/andarun/gesundheit', '/andarun/medikamente', '/andarun/deutsch', '/andarun/befunde', '/andarun/test',
  ].sort())
  assert.equal(items.find(item => item.title === 'Finanzen').action, 'finance')
  assert.equal(items.some(item => /kaenguru|kang/i.test(item.href || item.title)), false)
})

test('the three daily actions retain their real destinations and approved copy', () => {
  assert.deepEqual(ANDARUN_DAILY_ACTIONS.map(item => [item.title, item.href, item.label]), [
    ['Termine', '/andarun/termine', 'Termine ansehen'],
    ['ToDos', '/andarun/todo', 'ToDos öffnen'],
    ['Routine', '/andarun/routine', 'Routine fortsetzen'],
  ])
})
