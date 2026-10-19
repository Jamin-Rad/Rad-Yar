import assert from 'node:assert/strict'
import { observeLessonHash, readLessonHash } from '../lib/lessonHashNavigation.js'

// A browser-independent event target: these exercise the production observer and
// its cleanup, not browser rendering, automatic scrolling or browser history APIs.
class LocationTarget extends EventTarget {
  location = { hash: '' }
  listeners = new Map()
  addEventListener(type, callback) {
    super.addEventListener(type, callback)
    const current = this.listeners.get(type) || new Set()
    current.add(callback)
    this.listeners.set(type, current)
  }
  removeEventListener(type, callback) {
    super.removeEventListener(type, callback)
    this.listeners.get(type)?.delete(callback)
  }
  navigate(hash, event = 'hashchange') {
    this.location.hash = hash
    this.dispatchEvent(new Event(event))
  }
}
const trackedIds = ['fat-appendage', 'ct-pattern', 'bowel-context']
const summaryId = 'take-home'
assert.deepEqual(readLessonHash('#ct%2Dpattern', trackedIds, summaryId), { openId: 'ct-pattern', summaryOpen: false })
assert.equal(readLessonHash('#unknown', trackedIds, summaryId), null)
assert.equal(readLessonHash('#%E0%A4%A', trackedIds, summaryId), null)
const target = new LocationTarget()
target.location.hash = '#ct-pattern'
let state = { openId: trackedIds[0], summaryOpen: false }
let deliveries = 0
const onChange = next => {
  deliveries += 1
  state = { openId: next.openId || state.openId, summaryOpen: next.summaryOpen }
}
const mount = () => observeLessonHash({ target, trackedIds, summaryId, onChange })
let cleanup = mount()
assert.deepEqual(state, { openId: 'ct-pattern', summaryOpen: false }, 'Direct hash opens the target chapter on mount')
target.navigate('#bowel-context')
assert.deepEqual(state, { openId: 'bowel-context', summaryOpen: false }, 'Subsequent hashchange opens a new chapter')
target.navigate('#take-home')
assert.deepEqual(state, { openId: 'bowel-context', summaryOpen: true }, 'Summary hash opens the separate disclosure')
target.navigate('#ct-pattern', 'popstate')
assert.deepEqual(state, { openId: 'ct-pattern', summaryOpen: false }, 'Back/forward popstate restores the matching chapter')
target.navigate('', 'popstate')
assert.deepEqual(state, { openId: 'fat-appendage', summaryOpen: false }, 'History entry without hash restores the first chapter')
target.navigate('#bowel-context')
// A language change replaces translated section labels, preserving their IDs.
cleanup()
cleanup = mount()
assert.equal(state.openId, 'bowel-context', 'Language-effect reattachment retains the current URL target')
for (const event of ['hashchange', 'popstate']) assert.equal(target.listeners.get(event).size, 1)
let before = deliveries
target.navigate('#ct-pattern')
assert.equal(deliveries, before + 1, 'No duplicate listeners after language-effect reattachment')
before = deliveries
target.navigate('#unknown')
target.navigate('#%E0%A4%A')
assert.equal(deliveries, before, 'Unrecognised hashes do not change state')
cleanup()
for (const event of ['hashchange', 'popstate']) assert.equal(target.listeners.get(event).size, 0)
target.navigate('#take-home')
assert.equal(deliveries, before, 'Unmount cleanup prevents subsequent deliveries')
console.log('Lesson hash observer PASS: direct/changed/encoded hash, summary, history events, empty hash, language reattachment, malformed/unknown hashes and cleanup. Browser rendering/history APIs remain unverified.')
