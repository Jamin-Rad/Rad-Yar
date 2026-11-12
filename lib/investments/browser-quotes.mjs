export const QUOTE_STORAGE_KEY = 'andarun-public-quotes-v1'
const MAX_QUOTES = 250

export function readBrowserQuotes(storage) {
  try {
    const entries = JSON.parse(storage.getItem(QUOTE_STORAGE_KEY))
    if (!Array.isArray(entries)) return new Map()
    return new Map(entries.slice(0, MAX_QUOTES).filter(entry => {
      const [symbol, saved] = Array.isArray(entry) ? entry : []
      return typeof symbol === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(saved?.day || '') &&
        Number.isFinite(saved?.market?.quote?.price) && saved.market.quote.price > 0 &&
        Number.isFinite(Date.parse(saved.market.quote.asOf))
    }).reverse())
  } catch {
    return new Map()
  }
}

export function saveBrowserQuote(cache, symbol, result, day, storage) {
  // Persist the public quote, its identity and conversion rate only.
  const { quote, identity, fetchedAt } = result
  const market = { quote, identity, fetchedAt, fx: { latest: result.fx?.latest }, history: [], splits: [], news: [] }
  cache.delete(symbol)
  cache.set(symbol, { day, market })
  if (cache.size > MAX_QUOTES) cache.delete(cache.keys().next().value)
  try {
    storage?.setItem(QUOTE_STORAGE_KEY, JSON.stringify([...cache].reverse()))
  } catch {
    // Price display and today's in-memory cache still work if storage is full.
  }
}
