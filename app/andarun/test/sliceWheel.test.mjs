import assert from 'node:assert/strict'
import test from 'node:test'
import { createSliceWheelController } from './sliceWheel.mjs'

test('one mouse detent changes exactly one slice, even for large deltas', () => {
  const wheel = createSliceWheelController()
  assert.equal(wheel({ deltaY: 120, time: 0 }), 1)
  assert.equal(wheel({ deltaY: 1200, time: 150 }), 1)
})
test('trackpad micro-events accumulate predictably', () => {
  const wheel = createSliceWheelController()
  assert.deepEqual([0, 20, 40, 60, 80, 100].map(time => wheel({ deltaY: 10, time })), [0, 0, 0, 0, 0, 1])
})
test('cooldown momentum is dropped, not released as a later jump', () => {
  const wheel = createSliceWheelController()
  assert.equal(wheel({ deltaY: 60, time: 0 }), 1)
  for (let time = 10; time < 100; time += 10) assert.equal(wheel({ deltaY: 50, time }), 0)
  assert.equal(wheel({ deltaY: 1, time: 110 }), 0)
})
test('reversing direction responds immediately without old accumulated input', () => {
  const wheel = createSliceWheelController()
  assert.equal(wheel({ deltaY: 60, time: 0 }), 1)
  assert.equal(wheel({ deltaY: -60, time: 20 }), -1)
})
test('separate gestures do not share leftover distance', () => {
  const wheel = createSliceWheelController()
  assert.equal(wheel({ deltaY: 40, time: 0 }), 0)
  assert.equal(wheel({ deltaY: 30, time: 250 }), 0)
})
test('line and page wheel modes are normalized', () => {
  const wheel = createSliceWheelController()
  assert.equal(wheel({ deltaY: 3, deltaMode: 1, time: 0 }), 1)
  assert.equal(wheel({ deltaY: -1, deltaMode: 2, time: 150 }), -1)
})
test('pinch zoom and horizontal scroll do not change slices', () => {
  const wheel = createSliceWheelController()
  assert.equal(wheel({ deltaY: 100, ctrlKey: true, time: 0 }), 0)
  assert.equal(wheel({ deltaY: 10, deltaX: 80, time: 100 }), 0)
})
