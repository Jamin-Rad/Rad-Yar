import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read = file => readFileSync(new URL(`../app/admin/health/${file}`, import.meta.url), 'utf8')
const overview = read('HealthTodayOverview.jsx'), modal = read('FoodPhotoEstimator.jsx'), page = read('HealthPage.js')

test('daily summary precedes entry actions and the meal/activity ledger', () => {
  assert.ok(overview.indexOf('className={s.balance}') < overview.indexOf('className={s.actions}'))
  assert.ok(overview.indexOf('className={s.actions}') < overview.indexOf('className={s.ledger}'))
  assert.ok(page.includes('<HealthTodayOverview'))
  assert.ok(!page.includes('className={s.todayActionWeight}'))
})
test('German private nutrition layouts do not inherit the public Persian page direction', () => {
  assert.equal(page.match(/className=\{s.page\} dir="ltr" lang="de"/g)?.length, 2)
})
test('the overview uses real values, handles missing targets and preserves medication reminders', () => {
  for (const value of ['eatenKcal', 'Math.abs(kcalDelta)', 'Tagesziel nicht festgelegt', 'injectionDue', 'toggleInjection', 'photoMealTotals([meal]).kcal']) assert.ok(overview.includes(value))
  assert.ok(overview.includes('photoEnabled &&'))
  assert.ok(page.includes("apiBase === '/api/andarun/health'"))
})
test('long meal cards show a compact weight/count and keep the full title accessible', () => {
  assert.ok(overview.includes('title={meal.title}'))
  assert.ok(overview.includes('meal.items.length} Zutaten'))
  assert.ok(overview.includes('sum + Number(item.g || 0)'))
  assert.ok(read('HealthTodayOverview.module.css').includes('-webkit-line-clamp: 2'))
})
test('nutrient and estimate details start collapsed while quantities remain directly editable', () => {
  assert.ok(modal.includes('<summary>Nährwerte bearbeiten</summary>'))
  assert.ok(modal.includes('<summary>Details zur Schätzung</summary>'))
  assert.ok(!modal.includes('<details open'))
  assert.ok(modal.includes("numberField(item, index, 'g', 'Menge', 'g')"))
  assert.ok(modal.includes("fields.filter(([key]) => key !== 'g')"))
})
test('shortened photo flow retains per-photo consent, retention notice and explicit confirmation', () => {
  for (const copy of ['kostenpflichtig an OpenAI senden', 'Keine Gesundheitsakte', 'bis zu 30 Tage', 'Eintrag erst nach Bestätigung', 'Nicht für Medikamenten- oder Insulindosen', 'Bestätigen &amp; eintragen'.replace('&amp;', '&')]) assert.ok(modal.includes(copy))
  assert.ok(modal.includes('!image || !consent || !config?.enabled'))
  assert.ok(modal.includes('disabled={!validMeal || submitting}'))
})
test('photo editing keeps independent drafts, stale-request checks and keyboard access to disclosures', () => {
  assert.ok(modal.includes('request === requestRef.current'))
  assert.ok(modal.includes('setDraft(previous =>'))
  assert.ok(modal.includes('a[href], summary'))
  assert.ok(modal.includes('onConfirm(validMeal)'))
  assert.ok(modal.includes('document.body.style.overflow = overflow'))
})
test('responsive surfaces use compact action grids and scrollable modal with fixed footer', () => {
  const css = read('HealthTodayOverview.module.css'), photoCss = read('FoodPhotoEstimator.module.css')
  assert.ok(css.includes('grid-template-columns: repeat(2,minmax(0,1fr))'))
  assert.ok(photoCss.includes('overflow-y: auto'))
  assert.ok(photoCss.includes('flex-shrink: 0'))
  assert.ok(photoCss.includes('16px/1.4'))
})
