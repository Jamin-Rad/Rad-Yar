// A private, browser-local checkpoint; never replaces broker records or dated account snapshots.
export const VISIT_STORAGE_KEY = 'andarun:investments:visit:v1'
const validTime = value => typeof value === 'string' && Number.isFinite(Date.parse(value))
const keyOf = (account, position) => `${account.id}:${position.id}`
export function readVisit(raw) {
  try {
    const value = JSON.parse(raw)
    if (value?.version !== 1 || !validTime(value.reviewedAt) || !value.positions || typeof value.positions !== 'object' || Array.isArray(value.positions) || Object.keys(value.positions).length > 2000) return null
    for (const row of Object.values(value.positions)) {
      if (!row || typeof row.symbol !== 'string' || typeof row.isin !== 'string' || !Array.isArray(row.newsUrls) || row.newsUrls.length > 8) return null
      if (row.quote && (!Number.isFinite(row.quote.price) || row.quote.price <= 0 || !validTime(row.quote.asOf) || typeof row.quote.currency !== 'string' || row.fx && (!Number.isFinite(row.fx.rate) || row.fx.rate <= 0))) return null
    }
    return value
  } catch { return null }
}
export function captureVisit(state, markets, now = new Date().toISOString(), fallback = null) {
  const positions = {}
  for (const account of state.accounts) for (const p of account.positions) {
    const market = p.marketConfirmed && markets[p.marketSymbol]
    const old = fallback?.positions[keyOf(account, p)]
    const retain = p.marketConfirmed && old?.symbol === p.marketSymbol && old?.isin === (p.isin || '') ? old : null
    positions[keyOf(account, p)] = { symbol: p.marketConfirmed ? p.marketSymbol : '', isin: p.isin || '', quote: market?.quote ? { price: market.quote.price, currency: market.quote.currency, asOf: market.quote.asOf } : retain?.quote || null, fx: market?.quote ? market.fx?.latest || null : retain?.fx || null, newsUrls: market?.news && !market.newsError ? market.news.map(n => n.url) : retain?.newsUrls || [] }
  }
  return { version: 1, reviewedAt: now, positions }
}
export function visitChanges(state, markets, previous, now = Date.now()) {
  if (!previous) return { rows: [], compared: 0, unmatched: 0 }
  const rows = []
  let compared = 0, unmatched = 0
  for (const account of state.accounts) for (const p of account.positions) {
    const market = p.marketConfirmed && markets[p.marketSymbol]
    const old = previous.positions[keyOf(account, p)]
    const row = { accountId: account.id, owner: account.owner, positionId: p.id, name: p.name, movement: null, news: [], issue: '' }
    if (!p.marketConfirmed || !p.marketSymbol) { unmatched++; continue }
    if (!market?.quote) row.issue = 'قیمت دریافت نشده'
    else if (!old?.quote) row.issue = 'برای این دارایی قیمت مبنا نداریم'
    else if (old.symbol !== p.marketSymbol || old.isin !== (p.isin || '') || old.quote.currency !== market.quote.currency) row.issue = 'ابزار یا ارز تغییر کرده؛ مبنای تازه لازم است'
    else if (Date.parse(market.quote.asOf) < Date.parse(old.quote.asOf)) row.issue = 'زمان قیمت دریافتی از مبنا قدیمی‌تر است'
    else if (market.splits?.some(s => s.date >= old.quote.asOf.slice(0, 10) && s.date <= market.quote.asOf.slice(0, 10))) row.issue = 'تجزیه سهم در این بازه؛ مقایسه مستقیم انجام نشد'
    else if (now - Date.parse(market.quote.asOf) > 4 * 86400000) row.issue = 'قیمت بیش از چهار روز قدمت دارد'
    else {
      compared++
      const estimate = market.fx?.latest && old.fx ? Math.round(Number(p.quantity) * (market.quote.price * market.fx.latest.rate - old.quote.price * old.fx.rate) * 100) : null
      row.movement = { nativePercent: (market.quote.price / old.quote.price - 1) * 100, deltaCents: Number.isSafeInteger(estimate) ? estimate : null, previous: old.quote.asOf, latest: market.quote.asOf, unchangedTime: market.quote.asOf === old.quote.asOf }
    }
    row.news = (market?.news || []).filter(n => n.important && Date.parse(n.date) > Date.parse(previous.reviewedAt) && !old?.newsUrls.includes(n.url))
    rows.push(row)
  }
  rows.sort((a, b) => Number(!!b.news.length) - Number(!!a.news.length) || Math.abs(b.movement?.deltaCents || 0) - Math.abs(a.movement?.deltaCents || 0) || Math.abs(b.movement?.nativePercent || 0) - Math.abs(a.movement?.nativePercent || 0))
  return { rows, compared, unmatched }
}
