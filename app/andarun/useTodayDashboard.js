'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { berlinNow, loadTodaySources } from '@/utils/andarunToday'

const loadingSources = () => Object.fromEntries(['work', 'events', 'health'].map(key => [key, { status: 'loading', data: null }]))

export default function useTodayDashboard(initialNow) {
  const [now, setNow] = useState(initialNow)
  const [sources, setSources] = useState(loadingSources)
  const [refreshing, setRefreshing] = useState(false)
  const refreshRef = useRef(null)
  const dateRef = useRef(initialNow.date)

  useEffect(() => {
    let active = true
    let controller
    let timeout
    function refresh() {
      controller?.abort()
      clearTimeout(timeout)
      controller = new AbortController()
      const request = controller
      const nextNow = berlinNow()
      const pending = new Set(['work', 'events', 'health'])
      setNow(nextNow)
      if (nextNow.date !== dateRef.current) setSources(loadingSources())
      dateRef.current = nextNow.date
      setRefreshing(true)
      const requestTimeout = setTimeout(() => {
        request.abort()
        if (active && controller === request) setSources(current => Object.fromEntries(Object.entries(current).map(([key, source]) => [key,
          pending.has(key) ? { status: 'error', data: null } : source,
        ])))
      }, 15000)
      timeout = requestTimeout
      loadTodaySources(fetch, request.signal, (key, result) => {
        pending.delete(key)
        if (active && !request.signal.aborted) setSources(current => ({ ...current, [key]: result }))
      }).finally(() => {
        clearTimeout(requestTimeout)
        if (active && controller === request) setRefreshing(false)
      })
    }
    function visibleRefresh() {
      if (document.visibilityState === 'visible') refresh()
    }
    refreshRef.current = refresh
    refresh()
    const interval = setInterval(visibleRefresh, 60000)
    window.addEventListener('focus', visibleRefresh)
    window.addEventListener('pageshow', visibleRefresh)
    document.addEventListener('visibilitychange', visibleRefresh)
    return () => {
      active = false
      controller?.abort()
      clearTimeout(timeout)
      clearInterval(interval)
      window.removeEventListener('focus', visibleRefresh)
      window.removeEventListener('pageshow', visibleRefresh)
      document.removeEventListener('visibilitychange', visibleRefresh)
      refreshRef.current = null
    }
  }, [])

  const refresh = useCallback(() => refreshRef.current?.(), [])
  return { now, sources, refresh, loading: refreshing || Object.values(sources).some(source => source.status === 'loading') }
}
