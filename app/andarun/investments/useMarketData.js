'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function useMarketData(state) {
  const [markets, setMarkets] = useState({})
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState({})
  const [batch, setBatch] = useState({ running: false, done: 0, total: 0, failed: 0, completedAt: null })
  const data = useRef({}), pending = useRef(new Map()), mounted = useRef(true), batchLock = useRef(false)
  useEffect(() => { mounted.current = true; return () => { mounted.current = false } }, [])
  const load = useCallback(async (symbol, name, force = false) => {
    if (!symbol) return null
    if (pending.current.has(symbol)) return pending.current.get(symbol)
    if (!force && data.current[symbol] && Date.now() - new Date(data.current[symbol].fetchedAt).getTime() < 15 * 60000) return data.current[symbol]
    const task = (async () => {
      if (mounted.current) setLoading(v => ({ ...v, [symbol]: true }))
      try {
        const params = new URLSearchParams({ symbol, name: name || symbol })
        if (force) params.set('refresh', '1')
        const response = await fetch(`/api/andarun/investments/market?${params}`, { cache: 'no-store' })
        const result = await response.json()
        if (!response.ok) throw Error(result.error || 'دریافت قیمت انجام نشد.')
        data.current[symbol] = result
        if (mounted.current) { setMarkets(v => ({ ...v, [symbol]: result })); setErrors(v => ({ ...v, [symbol]: '' })) }
        return result
      } catch (err) { if (mounted.current) setErrors(v => ({ ...v, [symbol]: err.message })); return null }
      finally { pending.current.delete(symbol); if (mounted.current) setLoading(v => ({ ...v, [symbol]: false })) }
    })()
    pending.current.set(symbol, task)
    return task
  }, [])
  const keys = JSON.stringify(state?.accounts.flatMap(a => a.positions.filter(p => p.marketConfirmed && p.marketSymbol).map(p => ({ symbol: p.marketSymbol, name: p.name }))) || [])
  const refreshAll = useCallback(async () => {
    if (batchLock.current) return
    const rows = [...new Map(JSON.parse(keys).map(row => [row.symbol, row])).values()]
    if (!rows.length) return
    batchLock.current = true
    let index = 0, done = 0, failed = 0
    if (mounted.current) setBatch({ running: true, done, total: rows.length, failed, completedAt: null })
    async function worker() {
      while (mounted.current && index < rows.length) {
        const row = rows[index++]
        if (!await load(row.symbol, row.name, true)) failed++
        done++
        if (mounted.current) setBatch({ running: true, done, total: rows.length, failed, completedAt: null })
      }
    }
    try { await Promise.all(Array.from({ length: Math.min(3, rows.length) }, worker)) }
    finally {
      batchLock.current = false
      if (mounted.current) setBatch({ running: false, done, total: rows.length, failed, completedAt: new Date().toISOString() })
    }
  }, [keys, load])
  useEffect(() => {
    let active = true, running = false
    const rows = [...new Map(JSON.parse(keys).map(row => [row.symbol, row])).values()]
    async function refresh() {
      if (running || document.visibilityState === 'hidden') return
      running = true; let index = 0
      async function worker() { while (active && index < rows.length) { const row = rows[index++]; await load(row.symbol, row.name) } }
      try { await Promise.all(Array.from({ length: Math.min(3, rows.length) }, worker)) } finally { running = false }
    }
    refresh()
    const interval = setInterval(refresh, 15 * 60000)
    document.addEventListener('visibilitychange', refresh)
    window.addEventListener('online', refresh)
    return () => { active = false; clearInterval(interval); document.removeEventListener('visibilitychange', refresh); window.removeEventListener('online', refresh) }
  }, [keys, load])
  return { markets, errors, loading, load, refreshAll, batch, symbolCount: new Set(JSON.parse(keys).map(row => row.symbol)).size }
}
