'use client'

import { useEffect, useRef, useState } from 'react'
import { emptyMathProgress, mergeMathProgress, MATH_STORAGE_KEY, normalizeMathProgress } from '@/lib/mobinMath'

export function useMathProgress() {
  const [progress, setProgress] = useState(emptyMathProgress)
  const [ready, setReady] = useState(false)
  const [status, setStatus] = useState('loading')
  const [localAvailable, setLocalAvailable] = useState(true)
  const [retry, setRetry] = useState(0)
  const [bootstrapped, setBootstrapped] = useState(false)
  const synced = useRef('')

  useEffect(() => {
    const controller = new AbortController()
    let disposed = false
    try {
      setProgress(normalizeMathProgress(JSON.parse(localStorage.getItem(MATH_STORAGE_KEY) || 'null')))
    } catch { setLocalAvailable(false) }
    setReady(true)
    const timeout = window.setTimeout(() => controller.abort(), 10000)
    fetch('/api/mobin/mathepruefung', { cache: 'no-store', signal: controller.signal })
      .then(async response => {
        if (!response.ok) throw new Error('unavailable')
        const payload = await response.json()
        if (disposed) return
        synced.current = JSON.stringify(normalizeMathProgress(payload.state))
        setProgress(current => mergeMathProgress(current, payload.state))
        setStatus('synced')
      })
      .catch(() => { if (!disposed) setStatus('local') })
      .finally(() => { if (!disposed) setBootstrapped(true); window.clearTimeout(timeout) })
    const online = () => setRetry(value => value + 1)
    window.addEventListener('online', online)
    return () => { disposed = true; controller.abort(); window.clearTimeout(timeout); window.removeEventListener('online', online) }
  }, [])

  useEffect(() => {
    if (!ready) return undefined
    const serialized = JSON.stringify(normalizeMathProgress(progress))
    try { localStorage.setItem(MATH_STORAGE_KEY, serialized); setLocalAvailable(true) }
    catch { setLocalAvailable(false) }
    if (!bootstrapped || serialized === synced.current && !retry) return undefined
    setStatus('saving')
    const controller = new AbortController()
    let disposed = false
    let timeout
    const timer = window.setTimeout(async () => {
      setStatus('saving')
      timeout = window.setTimeout(() => controller.abort(), 10000)
      try {
        const response = await fetch('/api/mobin/mathepruefung', {
          method: 'PATCH', headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ state: progress }), signal: controller.signal,
        })
        if (!response.ok) throw new Error('unavailable')
        const payload = await response.json()
        synced.current = JSON.stringify(normalizeMathProgress(payload.state))
        setProgress(current => {
          const merged = mergeMathProgress(current, payload.state)
          return JSON.stringify(merged) === JSON.stringify(current) ? current : merged
        })
        setStatus('synced')
        setRetry(0)
      } catch { if (!disposed) setStatus('local') }
      finally { window.clearTimeout(timeout) }
    }, 650)
    return () => { disposed = true; window.clearTimeout(timer); window.clearTimeout(timeout); controller.abort() }
  }, [progress, ready, retry, bootstrapped])

  return { progress, setProgress, ready, status, localAvailable, retrySync: () => setRetry(value => value + 1) }
}
