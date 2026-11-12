'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { marketKey } from '@/lib/investments/market.mjs'
import { todayBerlin } from '@/lib/investments/family.mjs'
import { readBrowserQuotes, saveBrowserQuote } from '@/lib/investments/browser-quotes.mjs'

function marketRows(state) {
  return [...(state?.accounts.flatMap(a => a.positions.filter(p => (p.marketConfirmed && p.marketSymbol) || state.settings?.isinPricesEnabled && p.isin).map(p => ({ symbol: marketKey(p), name: p.name }))) || []), ...(state?.settings?.isinPricesEnabled ? state.decisions.filter(d => d.baseline).map(d => ({ symbol: 'ISIN:' + d.baseline.isin, name: d.name })) : [])]
}

export default function useMarketData(state) {
  const [markets, setMarkets] = useState({})
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState({})
  const [batch, setBatch] = useState({ running: false, done: 0, total: 0, failed: 0, reused: 0, completedAt: null })
  const data = useRef({}), pending = useRef(new Map()), mounted = useRef(true), batchLock = useRef(false)
  const savedQuotes = useRef(new Map())
  const storage = useRef(null)
  useEffect(() => {
    mounted.current = true
    try { storage.current = window.localStorage } catch {}
    savedQuotes.current = readBrowserQuotes(storage.current)
    data.current = Object.fromEntries([...savedQuotes.current].map(([symbol, entry]) => [symbol, entry.market]))
    setMarkets({ ...data.current })
    return () => { mounted.current = false }
  }, [])
  const load = useCallback(async (symbol, name, force = false, withHistory = false, requestedDates = null) => {
    if (!symbol || !mounted.current) return null
    if (!force) return data.current[symbol] || null
    const day = todayBerlin(new Date())
    if (!withHistory && savedQuotes.current.get(symbol)?.day === day) return data.current[symbol]
    const dates = requestedDates || []
    const requestKey=withHistory?`${symbol}:history:${dates.join(',')}`:symbol
    if (pending.current.has(requestKey)) return pending.current.get(requestKey)
    // Finish an earlier range first so its response cannot overwrite the new range.
    const earlier = [...pending.current.keys()].find(key => key === symbol || key.startsWith(`${symbol}:history:`))
    if (earlier) {
      if (!withHistory) return pending.current.get(earlier)
      await pending.current.get(earlier)
      return load(symbol, name, force, withHistory, requestedDates)
    }
    const task = (async () => {
      if (mounted.current) setLoading(v => ({ ...v, [symbol]: true }))
      try {
        const params = new URLSearchParams(symbol.startsWith('ISIN:') ? {isin:symbol.slice(5)} : { symbol, name: name || symbol })
        if (force) params.set('refresh', '1')
        if (withHistory) {params.set('history', '1');dates.forEach(date=>params.append('historyDate',date))}
        const response = await fetch(`/api/andarun/investments/market?${params}`, { cache: 'no-store' })
        let result = await response.json()
        if (!response.ok) throw Error(result.error || 'دریافت قیمت انجام نشد.')
        const previous=data.current[symbol]
        const sameListing = previous && result.quote.currency === previous.quote.currency &&
          (result.identity?.isin
            ? result.identity.isin === previous.identity?.isin && result.quote.idNotation === previous.quote.idNotation
            : result.quote.symbol === previous.quote.symbol && result.quote.exchange === previous.quote.exchange)
        if (!result.history?.length && sameListing && previous.history?.length) {
          result = { ...result, history: previous.history, historyMeta: previous.historyMeta,
            splits: previous.splits, fx: { ...previous.fx, ...result.fx }, news: previous.news, newsError: previous.newsError }
        }
        data.current[symbol] = result
        saveBrowserQuote(savedQuotes.current, symbol, result, day, storage.current)
        if (mounted.current) { setMarkets(v => ({ ...v, [symbol]: result })); setErrors(v => ({ ...v, [symbol]: '' })) }
        return result
      } catch (err) { if (mounted.current) setErrors(v => ({ ...v, [symbol]: err.message })); return null }
      finally { pending.current.delete(requestKey); if (mounted.current) setLoading(v => ({ ...v, [symbol]: [...pending.current.keys()].some(key=>key===symbol||key.startsWith(`${symbol}:history:`)) })) }
    })()
    pending.current.set(requestKey, task)
    return task
  }, [])
  const keys = JSON.stringify(marketRows(state))
  const refreshAll = useCallback(async nextState => {
    if (batchLock.current) return
    // A consent button can enable ISIN prices and refresh in the same click.
    // React click events are ignored; normal buttons use the current state.
    const requested = Array.isArray(nextState?.accounts) ? marketRows(nextState) : JSON.parse(keys)
    const rows = [...new Map(requested.map(row => [row.symbol, row])).values()]
    if (!rows.length) return
    batchLock.current = true
    let index = 0, done = 0, failed = 0, reused = 0
    const day = todayBerlin(new Date())
    if (mounted.current) setBatch({ running: true, done, total: rows.length, failed, reused, completedAt: null })
    async function worker() {
      while (mounted.current && index < rows.length) {
        const row = rows[index++]
        if (savedQuotes.current.get(row.symbol)?.day === day) reused++
        else if (!await load(row.symbol, row.name, true)) failed++
        done++
        if (mounted.current) setBatch({ running: true, done, total: rows.length, failed, reused, completedAt: null })
      }
    }
    try { await Promise.all(Array.from({ length: Math.min(3, rows.length) }, worker)) }
    finally {
      batchLock.current = false
      if (mounted.current) setBatch({ running: false, done, total: rows.length, failed, reused, completedAt: new Date().toISOString() })
    }
  }, [keys, load])
  return { markets, errors, loading, load, refreshAll, batch, symbolCount: new Set(JSON.parse(keys).map(row => row.symbol)).size }
}
