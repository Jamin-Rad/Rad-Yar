import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

// Source-level wiring guards complement the rendered browser interaction test.
const source = await readFile(new URL('../app/andarun/todo/CalendarDay.jsx', import.meta.url), 'utf8')

test('day view is wired to the selected date and can return from create/edit', async () => {
  const page = await readFile(new URL('../app/andarun/todo/TodoPage.jsx', import.meta.url), 'utf8')
  assert.match(page, /onClick=\{\(\) => day && setSelectedDay\(day\)\}/)
  assert.match(page, /selectedDay && !newEventOpen && !detailId/)
  assert.match(page, /setNewEventForm\(eventFormForDate\(day\)\)/)
  assert.match(page, /onAdd=\{openNewEvent\}/)
  assert.match(page, /onEdit=\{openDetail\}/)
})

test('day view preserves compact cancellation and offers accessible closing', () => {
  assert.match(source, /!event.cancelled && <span className=\{styles.dayTime\}/)
  assert.match(source, /!event.cancelled && event.note/)
  assert.match(source, /!event.cancelled && <button/)
  assert.match(source, /aria-modal="true"/)
  assert.match(source, /event.key === 'Escape'/)
  assert.match(source, /previousFocus.focus\(\)/)
  assert.match(source, /Keine Termine an diesem Tag/)
})
