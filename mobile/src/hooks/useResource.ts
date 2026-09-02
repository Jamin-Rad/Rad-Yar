import { useCallback, useEffect, useRef, useState } from 'react'
import { cacheGet, cacheSet } from '../data/database'
import { requestJson } from '../data/api'
import { flushQueue } from '../data/sync'

export function useResource<T>(cacheKey: string, endpoint: string, initialValue: T, online: boolean) {
  const initialRef = useRef(initialValue)
  const [data, setData] = useState<T>(initialRef.current)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadCache = useCallback(async () => {
    setData(await cacheGet(cacheKey, initialRef.current))
    setLoading(false)
  }, [cacheKey])

  const refresh = useCallback(async () => {
    if (!online) return
    try {
      await flushQueue()
      const fresh = await requestJson<T>(endpoint)
      await cacheSet(cacheKey, fresh)
      setData(fresh)
      setError('')
    } catch (refreshError) {
      setError(refreshError instanceof Error ? refreshError.message : 'همگام‌سازی انجام نشد.')
    } finally {
      setLoading(false)
    }
  }, [cacheKey, endpoint, online])

  useEffect(() => { void loadCache() }, [loadCache])
  useEffect(() => { if (online) void refresh() }, [online, refresh])

  return { data, setData, loading, error, refresh }
}
