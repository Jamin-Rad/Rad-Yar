import test from 'node:test'
import assert from 'node:assert/strict'
import { strokePath, strokeTouchesPoint } from '../utils/lehrInk.js'

test('ink keeps a tap visible and a continuous path through sparse and dense samples', () => {
  assert.equal(strokePath([]), '')
  assert.equal(strokePath([{ x: 10, y: 20 }]), 'M10 20l.01 0')
  assert.equal(strokePath([{ x: 10, y: 20 }, { x: 60, y: 80 }]), 'M10 20L60 80')
  assert.equal(strokePath([{ x: 0, y: 0 }, { x: 10, y: 20 }, { x: 30, y: 40 }]), 'M0 0Q10 20 20 30L30 40')
})

test('eraser hits between fast pen samples instead of requiring an exact recorded point', () => {
  const stroke = { width: 4, points: [{ x: 0, y: 0 }, { x: 200, y: 0 }], bounds: { left: 0, right: 200, top: 0, bottom: 0 } }
  assert.equal(strokeTouchesPoint(stroke, { x: 100, y: 10 }, 10), true)
  assert.equal(strokeTouchesPoint(stroke, { x: 100, y: 13 }, 10), false)
  assert.equal(strokeTouchesPoint(stroke, { x: 100, y: 110 }, 10, { x: 0, y: 100 }), true)
  assert.equal(strokeTouchesPoint(stroke, { x: -20, y: 0 }, 10), false)
})

test('eraser handles a single dot and highlighter thickness', () => {
  assert.equal(strokeTouchesPoint({ width: 4, points: [{ x: 50, y: 50 }] }, { x: 52, y: 51 }, 1), true)
  assert.equal(strokeTouchesPoint({ width: 22, points: [{ x: 0, y: 0 }, { x: 100, y: 0 }] }, { x: 50, y: 15 }, 5), true)
  assert.equal(strokeTouchesPoint({ width: 22, points: [{ x: 0, y: 0 }, { x: 100, y: 0 }] }, { x: 50, y: 17 }, 5), false)
})
