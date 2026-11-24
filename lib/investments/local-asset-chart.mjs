const HISTORY_KEY = 'andarun-chart-history-v1'
const DATE = /^\d{4}-\d{2}-\d{2}$/
export function browserChartStorage() {
  try { return window.localStorage } catch { return null }
}
const read = (storage, key) => {
  try { return JSON.parse(storage.getItem(key)) } catch { return null }
}

function unpackHistory(saved) {
  if (!Array.isArray(saved?.history)) return null
  if (!Array.isArray(saved.history[0])) return saved
  return { ...saved, history: saved.history.map(([date, close, open, high, low, volume]) => ({
    date, close, ...(open == null ? {} : { open, high, low }), ...(volume == null ? {} : { volume }),
  })) }
}

export function readChartHistories(storage, symbols) {
  const entries = read(storage, HISTORY_KEY)
  return Object.fromEntries(symbols.map(symbol => [
    symbol, unpackHistory(Array.isArray(entries) ? entries.find(entry=>entry?.[0]===symbol)?.[1] : null),
  ]))
}

export function readChartHistory(storage, symbol) {
  return readChartHistories(storage,[symbol])[symbol]
}

export function latestReferenceMark(reference, ...marks) {
  return marks.filter(mark => mark?.quote?.symbol===reference && mark.quote.currency==='USD' &&
    Number.isFinite(mark.quote.price) && mark.quote.price>0 && Number.isFinite(Date.parse(mark.quote.asOf)))
    .sort((a,b)=>Date.parse(b.quote.asOf)-Date.parse(a.quote.asOf))[0] ?? null
}

export function readChartMark(storage, reference) {
  return latestReferenceMark(reference,read(storage,'andarun-chart-mark:'+reference))
}

export function saveChartMark(storage, reference, result) {
  const mark = latestReferenceMark(reference,result,readChartMark(storage,reference))
  if (!mark) return null
  const compact = {quote:mark.quote, fx:{latest:mark.fx?.latest}, fetchedAt:mark.fetchedAt}
  try { storage?.setItem('andarun-chart-mark:'+reference,JSON.stringify(compact)) } catch {}
  return compact
}

export function saveChartHistory(storage, symbol, market, limit = 2000) {
  if (!Array.isArray(market?.history) || market.history.length < 2) return false
  const cache = read(storage, HISTORY_KEY)
  const { quote, identity, historyMeta, fetchedAt } = market
  const history = market.history.slice(-limit).map(({ date, close, open, high, low, volume }) =>
    open == null && volume == null ? [date, close] : [date, close, open, high, low, volume])
  const entry = [symbol, { quote, identity, historyMeta, fetchedAt, history, fx: market.fx?.latest ? { latest: market.fx.latest } : undefined }]
  const previous = Array.isArray(cache) ? cache.filter(row => row?.[0] !== symbol) : []
  try {
    storage.setItem(HISTORY_KEY, JSON.stringify([entry, ...previous].slice(0, 80)))
    return true
  } catch { return false }
}

export function chartDrawingKey(accountId, position, market) {
  const { quote } = market || {}
  return JSON.stringify([accountId, position.isin || position.id, quote?.idNotation ?? quote?.symbol, quote?.exchange, quote?.currency])
}

export function readChartDrawings(storage, key) {
  const lines = read(storage, 'andarun-chart-drawings-v1:' + key)
  const validPoint = p => DATE.test(p?.date) && Number.isFinite(p.price) && p.price > 0
  return Array.isArray(lines) ? lines.slice(0, 100).filter(line =>
    ['horizontal', 'trend'].includes(line?.type) && validPoint(line.start) && (line.type === 'horizontal' || validPoint(line.end))) : []
}

export function saveChartDrawings(storage, key, lines) {
  try {
    storage.setItem('andarun-chart-drawings-v1:' + key, JSON.stringify(lines))
    return true
  } catch { return false }
}

export function chartEntries(transactions, accountId, isin) {
  if (!isin) return []
  return transactions.filter(tx => tx.accountId === accountId && tx.isin === isin && tx.type === 'BUY' && DATE.test(tx.date)).map(tx => {
    const quantity = Number(tx.quantity)
    const price = quantity > 0 && Number.isSafeInteger(tx.amountCents) && tx.amountCents < 0
      ? -tx.amountCents / 100 / quantity : null
    return { id: tx.id, date: tx.date, currency: tx.currency, quantity, price: Number.isFinite(price) ? price : null }
  })
}

export function chartSessionIndex(rows, date) {
  if (date < rows[0]?.date || date > rows.at(-1)?.date) return -1
  return rows.findIndex(row => row.date >= date)
}
