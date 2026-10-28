import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { ANDARUN_HOME_GROUPS } from '../data/andarunHome.js'
import { ANDARUN_WEB_APPS, getAndarunPwaMetadata } from '../lib/andarunWebApps.js'

test('four groups retain existing modules and expose finance destinations inline', () => {
  const items = ANDARUN_HOME_GROUPS.flatMap(group => group.items)
  assert.deepEqual(ANDARUN_HOME_GROUPS.map(group => group.title), ['Alltag', 'Gesundheit', 'Lernen', 'Finanzen'])
  assert.equal(items.length, 16)
  assert.equal(new Set(items.map(item => item.title)).size, 16)
  assert.deepEqual(items.filter(item => item.href).map(item => item.href).sort(), [
    '/andarun/routine', '/andarun/todo', '/andarun/termine', '/andarun/dienste', '/andarun/befundtimer',
    '/andarun/gesundheit', '/andarun/medikamente', '/andarun/deutsch', '/andarun/english', '/andarun/befunde', '/andarun/test',
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

test('Jaminova branding preserves installed app URLs and uses a refreshed manifest', () => {
  assert.equal(ANDARUN_WEB_APPS.andarun.name, 'Jaminova')
  assert.equal(ANDARUN_WEB_APPS.andarun.shortName, 'Jaminova')
  assert.equal(ANDARUN_WEB_APPS.andarun.startUrl, '/andarun')
  for (const [key, app] of Object.entries(ANDARUN_WEB_APPS)) {
    assert.ok(app.startUrl.startsWith('/andarun'))
    assert.equal(app.name.includes('Andarun'), false)
    assert.equal(getAndarunPwaMetadata(key).manifest, `/andarun/pwa/${key}/manifest.webmanifest?v=4`)
  }
})

test('home keeps essential status messages but removes decorative descriptions', () => {
  const source = readFileSync(new URL('../app/andarun/AndarunLanding.jsx', import.meta.url), 'utf8')
  const css = readFileSync(new URL('../app/andarun/page.module.css', import.meta.url), 'utf8')
  assert.ok(source.includes('JAMINOVA'))
  for (const phrase of ['Alles, was dir wichtig ist, an einem Ort.', 'Dein Tag, in deinem Tempo.', 'Deine Module in ANDARUN.']) {
    assert.equal(source.includes(phrase), false)
  }
  assert.ok(source.includes('Keine Termine für heute.'))
  assert.ok(source.includes('Kein Dienst eingetragen.'))
  assert.ok(css.includes('--home-display: var(--font-fraunces)'))
  assert.ok(css.includes('--home-ui: var(--font-inter)'))
})


test('reporting timer belongs to Alltag and the two collections share one learning entry', () => {
  const everyday = ANDARUN_HOME_GROUPS.find(group => group.id === 'alltag').items
  const learning = ANDARUN_HOME_GROUPS.find(group => group.id === 'lernen').items
  assert.equal(everyday.find(item => item.title === 'Befundtimer')?.href, '/andarun/befundtimer')
  assert.equal(learning.find(item => item.title === 'Fallsammlung')?.href, '/andarun/befunde')
  assert.equal(learning.some(item => item.href === '/andarun/befundtimer'), false)
  assert.equal(ANDARUN_WEB_APPS.befundtimer.startUrl, '/andarun/befundtimer')
  assert.equal(ANDARUN_WEB_APPS.befunde.shortName, 'Fallsammlung')
})
