import test from 'node:test'
import assert from 'node:assert/strict'
import { chartDrawingKey, chartEntries, chartSessionIndex, readChartDrawings, readChartHistory, saveChartDrawings, saveChartHistory } from './local-asset-chart.mjs'

test('browser history and drawings survive a fresh read and drawings stay isolated by listing and account', () => {
  const data = new Map()
  const storage = { getItem: key => data.get(key), setItem: (key, value) => data.set(key, value) }
  const position = { isin: 'US0378331005' }
  const market = { quote: { currency: 'EUR', idNotation: 1 }, history: [{ date: '2026-11-12', close: 100 }, { date: '2026-11-13', close: 110 }] }
  const key = chartDrawingKey('self', position, market)
  const line = { type: 'trend', start: { date: '2026-11-12', price: 100 }, end: { date: '2026-11-13', price: 110 } }
  assert.equal(saveChartHistory(storage, position.isin, market), true)
  assert.deepEqual(readChartHistory(storage, position.isin), market)
  assert.equal(saveChartDrawings(storage, key, [line]), true)
  assert.deepEqual(readChartDrawings(storage, key), [line])
  assert.deepEqual(readChartDrawings(storage, chartDrawingKey('fatemeh', position, market)), [])
  assert.deepEqual(readChartDrawings(storage, chartDrawingKey('self', position, { quote: { currency: 'USD', idNotation: 1 } })), [])
})

test('entry markers use only matching buys and gross price per share', () => {
  const buy = { id: 'one', accountId: 'self', isin: 'US0378331005', type: 'BUY', date: '2026-11-14', amountCents: -20000, cashCents: -20100, quantity: '2', currency: 'EUR' }
  assert.deepEqual(chartEntries([buy, { ...buy, accountId: 'fatemeh' }, { ...buy, type: 'SELL' }], 'self', buy.isin), [
    { id: 'one', date: '2026-11-14', price: 100, quantity: 2, currency: 'EUR' },
  ])
  const sessions = [{ date: '2026-11-13' }, { date: '2026-11-16' }]
  assert.equal(chartSessionIndex(sessions, buy.date), 1)
  assert.equal(chartSessionIndex(sessions, '2026-11-12'), -1)
})
