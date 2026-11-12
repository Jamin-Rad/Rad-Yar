const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const { transformSync } = require('esbuild')
const { marketKey } = require('../lib/investments/market.mjs')
const browserQuotes = require('../lib/investments/browser-quotes.mjs')
const tradingView = require('../lib/investments/tradingview.mjs')
const { todayBerlin } = require('../lib/investments/family.mjs')
const root = path.resolve(__dirname, '..')
function load(file, mocks, globals = {}) {
  const module = { exports: {} }
  const code = transformSync(fs.readFileSync(path.join(root, file), 'utf8'), { loader: 'jsx', format: 'cjs', jsx: 'automatic' }).code
  vm.runInNewContext(code, { module, exports: module.exports, console, Date, URL, URLSearchParams, Response, Promise, ...globals,
    require(name) { if (name === 'react/jsx-runtime') return require(name); if (name in mocks) return mocks[name]; throw Error('Unexpected module: ' + name) } })
  return module.exports
}
function hookRuntime() {
  const slots = [], effects = []
  let cursor = 0
  const changed = (before, after) => !before || !after || before.length !== after.length || before.some((value, i) => !Object.is(value, after[i]))
  const react = {
    useState(initial) { const i = cursor++; if (!(i in slots)) slots[i] = { value: typeof initial === 'function' ? initial() : initial }; return [slots[i].value, update => { slots[i].value = typeof update === 'function' ? update(slots[i].value) : update }] },
    useRef(initial) { const i = cursor++; if (!(i in slots)) slots[i] = { current: initial }; return slots[i] },
    useMemo(factory, deps) { const i = cursor++; if (!slots[i] || changed(slots[i].deps, deps)) slots[i] = { deps, value: factory() }; return slots[i].value },
    useCallback(fn, deps) { return react.useMemo(() => fn, deps) },
    useId() { return 'test-' + cursor++ },
    useEffect(fn, deps) { const i = cursor++; if (!slots[i] || changed(slots[i].deps, deps)) effects.push(() => { slots[i]?.cleanup?.(); slots[i] = { deps, cleanup: fn() } }) },
  }
  return { react, render(fn, ...args) { cursor = 0; const result = fn(...args); effects.splice(0).forEach(fn => fn()); return result }, stop() { slots.forEach(slot => slot?.cleanup?.()) } }
}
function target() {
  const listeners = new Map()
  return { addEventListener(name, fn) { listeners.set(name, fn) }, removeEventListener(name) { listeners.delete(name) }, emit(name) { listeners.get(name)?.() } }
}
const position = (symbol, id = symbol) => ({ id, name: 'Synthetic ' + symbol, marketConfirmed: true, marketSymbol: symbol })
const portfolio = positions => ({ accounts: [{ positions }], decisions: [], settings: { isinPricesEnabled: true } })
function marketHarness(state, request, storage = {getItem: () => null, setItem() {}}) {
  const runtime = hookRuntime(), requests = [], intervals = []
  const window = target(), document = target()
  window.localStorage = storage
  let now = Date.now()
  const Clock = class extends Date {
    constructor(...args) { super(...(args.length ? args : [now])) }
    static now() { return now }
  }
  const hook = load('app/andarun/investments/useMarketData.js', {
    react: runtime.react, '@/lib/investments/market.mjs': { marketKey }, '@/lib/investments/family.mjs': { todayBerlin }, '@/lib/investments/browser-quotes.mjs': browserQuotes,
  }, { Date: Clock, window, document,
    setInterval: fn => { intervals.push(fn); return fn }, clearInterval() {},
    fetch: async url => { requests.push(url); return request ? request(url) : { ok: true, json: async () => ({ quote: { price: 100, currency: 'EUR' }, history: [], fetchedAt: new Clock(now).toISOString() }) } },
  }).default
  return { requests, window, document, hook, render: next => runtime.render(hook, next ?? state), stop: runtime.stop,
    advance(ms) { now += ms; intervals.forEach(fn => fn()) } }
}
test('mount, state changes, long idle periods, reconnect and tab return never request prices', async () => {
  const state = portfolio([position('DEMO')]), h = marketHarness(state)
  let api = h.render()
  assert.equal(await api.load('DEMO', 'Synthetic', false, true), null)
  for (let i = 0; i < 24; i++) { h.advance(15 * 60000); h.document.emit('visibilitychange'); h.window.emit('online') }
  api = h.render(portfolio([position('DEMO'), position('OTHER')]))
  await api.load('OTHER', 'Synthetic', false, true)
  assert.equal(h.requests.length, 0)
  h.stop()
})
test('manual update fetches each unique symbol once, with at most three concurrent requests', async () => {
  let running = 0, peak = 0
  const state = portfolio([position('A'), position('A', 'duplicate'), position('B'), position('C'), position('D')])
  const h = marketHarness(state, async () => { running++; peak = Math.max(peak, running); await new Promise(resolve => setImmediate(resolve)); running--; return { ok: true, json: async () => ({ quote: { price: 100 }, fetchedAt: new Date().toISOString() }) } })
  await h.render().refreshAll({ type: 'click' })
  assert.equal(h.requests.length, 4)
  assert.ok(peak <= 3)
  assert.ok(h.requests.every(url => new URL(url, 'https://example.test').searchParams.get('refresh') === '1'))
  assert.equal(h.render().batch.done, 4)
  h.stop()
})
test('bulk refresh stays price-only after opening asset history, and explicit history loads its requested dates', async () => {
  const h = marketHarness(portfolio([{ id: 'a', isin: 'US0378331005', name: 'Synthetic' }]))
  const api = h.render()
  await api.load('ISIN:US0378331005', 'Synthetic', false, true, ['2026-10-01', '2026-10-31'])
  assert.equal(h.requests.length, 0)
  await api.refreshAll()
  const params = new URL(h.requests[0], 'https://example.test').searchParams
  assert.equal(params.get('history'), null)
  await api.load('ISIN:US0378331005', 'Synthetic', true, true, ['2026-10-01', '2026-10-31'])
  const history = new URL(h.requests[1], 'https://example.test').searchParams
  assert.equal(history.get('history'), '1')
  assert.deepEqual(history.getAll('historyDate'), ['2026-10-01', '2026-10-31'])
  const before = await api.load('ISIN:US0378331005', 'Synthetic')
  h.advance(86400000)
  assert.equal(await api.load('ISIN:US0378331005', 'Synthetic', false, true), before)
  assert.equal(h.requests.length, 2)
  h.stop()
})
test('duplicate manual clicks coalesce, and a failed update preserves the previous price', async () => {
  let fail = false
  const h = marketHarness(portfolio([position('DEMO')]), async () => { await new Promise(resolve => setImmediate(resolve)); return { ok: !fail, json: async () => fail ? { error: 'offline' } : { quote: { price: 123 }, fetchedAt: new Date().toISOString() } } })
  const api = h.render()
  await Promise.all([api.refreshAll(), api.refreshAll()])
  assert.equal(h.requests.length, 1)
  const previous = await api.load('DEMO')
  fail = true
  h.advance(86400000)
  await api.refreshAll()
  assert.equal(await api.load('DEMO'), previous)
  assert.equal(h.render().batch.failed, 1)
  assert.equal(h.requests.length, 2)
  h.stop()
})

test('a new visit shows saved quotes without requests and every click refreshes all connected symbols', async () => {
  let saved = null
  const storage = { getItem: () => saved, setItem: (_, value) => { saved = value } }
  const state = portfolio([position('DEMO'), position('OTHER')])
  const first = marketHarness(state, async () => ({
    ok: true, json: async () => ({ quote: {price: 123, asOf: '2026-11-11T10:00:00Z'}, history: [{date: '2026-11-10', close: 120}] }),
  }), storage)
  await first.render().refreshAll()
  first.stop()
  const next = marketHarness(state, undefined, storage)
  next.render()
  assert.equal(next.render().markets.DEMO.quote.price, 123)
  assert.equal(next.render().markets.DEMO.history.length, 0)
  assert.equal(next.requests.length, 0)
  await next.render().refreshAll()
  await next.render().refreshAll()
  const symbols = next.requests.map(url => new URL(url, 'https://example.test').searchParams.get('symbol'))
  assert.deepEqual(symbols, ['DEMO', 'OTHER', 'DEMO', 'OTHER'])
  next.stop()
})

test('TradingView waits for a click, discovers an exact symbol, then reuses the saved symbol on a later visit', async () => {
  const runtime = hookRuntime(), requests = []
  const asset = {name: 'Synthetic Apple', isin: 'US0378331005'}
  const chart = load('app/andarun/investments/TradingViewChart.jsx', {
    react: runtime.react, '@/lib/investments/tradingview.mjs': tradingView, './investments.module.css': {},
  }, { AbortController, fetch: async url => {
    requests.push(url)
    return {ok: true, json: async () => ({results: [{symbol: 'XETR:APC', currency: 'EUR'}]})}
  } }).default
  const render = () => runtime.render(chart, {position: asset, onConnect: symbol => { asset.tradingViewSymbol = symbol }})
  function find(node, predicate) {
    if (Array.isArray(node)) return node.map(child => find(child, predicate)).find(Boolean)
    if (node && typeof node === 'object') return predicate(node) ? node : find(node.props?.children, predicate)
  }
  const show = tree => find(tree, node => node.type === 'button' && node.props.children === 'نمایش نمودار')
  assert.equal(find(render(), node => node.type === 'iframe'), undefined)
  assert.equal(requests.length, 0)
  await show(render()).props.onClick()
  assert.equal(asset.tradingViewSymbol, 'XETR:APC')
  assert.equal(requests.length, 1)
  assert.ok(find(render(), node => node.type === 'iframe'))
  runtime.stop()
  const later = hookRuntime()
  const saved = load('app/andarun/investments/TradingViewChart.jsx', {
    react: later.react, '@/lib/investments/tradingview.mjs': tradingView, './investments.module.css': {},
  }, { fetch() { throw Error('Saved symbols must not need a request') } }).default
  const openSaved = () => later.render(saved, {position: asset})
  assert.equal(find(openSaved(), node => node.type === 'iframe'), undefined)
  await show(openSaved()).props.onClick()
  assert.ok(find(openSaved(), node => node.type === 'iframe'))
})
test('first explicit update can enable ISIN access and fetch in the same click', async () => {
  const state = { ...portfolio([{ isin: 'US0378331005', name: 'Synthetic' }]), settings: { isinPricesEnabled: false } }
  const h = marketHarness(state)
  const api = h.render()
  assert.equal(api.symbolCount, 0)
  await api.refreshAll({ ...state, settings: { isinPricesEnabled: true } })
  assert.equal(h.requests.length, 1)
  assert.equal(new URL(h.requests[0], 'https://example.test').searchParams.get('isin'), 'US0378331005')
  h.stop()
})
test('a manual period retry does not enable network requests for future range changes', async () => {
  const runtime = hookRuntime(), calls = []
  const market = { markets: {}, loading: {}, load: async (...args) => { calls.push(args) } }
  const hook = load('app/andarun/investments/usePeriodProfit.js', {
    react: runtime.react, '@/lib/investments/realized-profit.mjs': { realizedProfit: () => null }, '@/lib/investments/family.mjs': { todayBerlin: () => '2026-11-05' },
    '@/lib/investments/period-profit.mjs': { profitRange: selection => ({ date: selection.mode }), periodPlan: () => [], openPeriodPlan: value => value, periodProfit: () => null, periodInstruments: () => [{ isin: 'US0378331005', name: 'Synthetic', historyDates: ['2026-10-01'] }] },
  }).default
  let value = runtime.render(hook, [], null, market, { mode: 'week' }, true)
  await new Promise(resolve => setImmediate(resolve))
  assert.equal(calls.at(-1)[2], false)
  value.reload(); await new Promise(resolve => setImmediate(resolve))
  assert.equal(calls.at(-1)[2], true)
  value = runtime.render(hook, [], null, market, { mode: 'month' }, true)
  await new Promise(resolve => setImmediate(resolve))
  assert.equal(calls.at(-1)[2], false)
  runtime.stop()
})
test('server rejects old automatic price requests before calling providers and still requires login', async () => {
  let allowed = true, calls = 0
  const providers = { searchInstruments: async () => { calls++; return [] }, loadMarket: async () => { calls++; return { quote: { price: 100 } } } }
  const route = load('app/api/andarun/investments/market/route.js', {
    'next/server': { NextResponse: { json: (value, options) => Response.json(value, options) } }, '@/lib/andarunPasswordAuth': { requireAndarunSession: async () => allowed ? {} : { error: 'denied' } },
    '@/lib/investments/market.server': providers, '@/lib/investments/isin-market.server': { loadIsinMarket: async () => { calls++; return { quote: { price: 100 } } } },
    '@/lib/investments/family.mjs': { validIsin: value => value === 'US0378331005', isDate: () => true, todayBerlin: () => '2026-11-05' },
  })
  const get = query => route.GET(new Request('https://example.test/api/andarun/investments/market?' + query))
  for (const query of ['symbol=DEMO', 'isin=US0378331005&history=1']) assert.equal((await get(query)).status, 409)
  assert.equal(calls, 0)
  allowed = false; assert.equal((await get('symbol=DEMO&refresh=1')).status, 403); assert.equal(calls, 0)
  allowed = true
  for (const query of ['symbol=DEMO&refresh=1', 'isin=US0378331005&refresh=1', 'q=synthetic']) assert.equal((await get(query)).status, 200)
  assert.equal(calls, 3)
})
