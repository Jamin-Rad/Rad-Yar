'use client'

import { useEffect, useRef, useState } from 'react'
import { emptyMathProgress, mergeMathProgress, MATH_STORAGE_KEY, normalizeMathProgress } from '@/lib/mobinMath'

const STUDY_SYNC_INTERVAL = 60000
const answersAndSessions = state => JSON.stringify(state, (key, value) => key === 'studyDays' || key === 'updatedAt' ? undefined : value)

export function useMathProgress() {
  const [progress, setProgress] = useState(emptyMathProgress)
  const [ready, setReady] = useState(false)
  const [status, setStatus] = useState('loading')
  const [localAvailable, setLocalAvailable] = useState(true)
  const [retry, setRetry] = useState(0)
  const [bootstrapped, setBootstrapped] = useState(false)
  const [saveAttempt, setSaveAttempt] = useState(0)
  const synced = useRef(null)
  const lifetime = useRef(null)
  const saving = useRef(false)
  const pendingSince = useRef(null)
  const failed = useRef(null)
  const flushOnExit = useRef(null)

  useEffect(() => {
    lifetime.current = Symbol()
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
        const state = normalizeMathProgress(payload.state)
        synced.current = { serialized: JSON.stringify(state), work: answersAndSessions(state) }
        setProgress(current => mergeMathProgress(current, payload.state))
        setStatus('synced')
      })
      .catch(() => { if (!disposed) setStatus('local') })
      .finally(() => { if (!disposed) setBootstrapped(true); window.clearTimeout(timeout) })
    const online = () => setRetry(value => value + 1)
    window.addEventListener('online', online)
    return () => {
      flushOnExit.current?.()
      lifetime.current = null
      disposed = true
      controller.abort()
      window.clearTimeout(timeout)
      window.removeEventListener('online', online)
    }
  }, [])

  useEffect(() => {
    if (!ready) return undefined
    const normalized = normalizeMathProgress(progress)
    const serialized = JSON.stringify(normalized)
    try { localStorage.setItem(MATH_STORAGE_KEY, serialized); setLocalAvailable(true) }
    catch { setLocalAvailable(false) }
    if (!bootstrapped || serialized === synced.current?.serialized && !retry) {
      pendingSince.current = null
      return undefined
    }
    if (saving.current || failed.current?.serialized === serialized && failed.current.retry === retry) return undefined
    if (!navigator.onLine) { setStatus('local'); return undefined }
    if (pendingSince.current === null) pendingSince.current = Date.now()
    const timeOnly = !retry && synced.current?.work === answersAndSessions(normalized)
    const delay = timeOnly ? Math.max(0, STUDY_SYNC_INTERVAL - (Date.now() - pendingSince.current)) : 650
    const generation = lifetime.current
    setStatus('saving')
    const save = async (keepalive = false) => {
      if (saving.current || generation !== lifetime.current || !navigator.onLine) return
      saving.current = true
      const controller = new AbortController()
      const timeout = window.setTimeout(() => controller.abort(), 10000)
      try {
        const body = JSON.stringify({ state: normalized })
        const response = await fetch('/api/mobin/mathepruefung', {
          method: 'PATCH', headers: { 'content-type': 'application/json' },
          body, keepalive: keepalive && new Blob([body]).size < 60000, signal: controller.signal,
        })
        if (!response.ok) throw new Error('unavailable')
        const payload = await response.json()
        if (generation !== lifetime.current) return
        const state = normalizeMathProgress(payload.state)
        synced.current = { serialized: JSON.stringify(state), work: answersAndSessions(state) }
        pendingSince.current = null
        failed.current = null
        setProgress(current => {
          const merged = mergeMathProgress(current, payload.state)
          return JSON.stringify(merged) === JSON.stringify(current) ? current : merged
        })
        setStatus('synced')
        setRetry(0)
      } catch {
        if (generation !== lifetime.current) return
        pendingSince.current = Date.now()
        failed.current = { serialized, retry }
        setStatus('local')
      } finally {
        window.clearTimeout(timeout)
        saving.current = false
        if (generation === lifetime.current) setSaveAttempt(value => value + 1)
      }
    }
    const timer = window.setTimeout(() => void save(), delay)
    const flush = () => { window.clearTimeout(timer); void save(true) }
    flushOnExit.current = flush
    const hidden = () => { if (document.visibilityState === 'hidden') flush() }
    window.addEventListener('pagehide', flush)
    document.addEventListener('visibilitychange', hidden)
    return () => {
      flushOnExit.current = null
      window.clearTimeout(timer)
      window.removeEventListener('pagehide', flush)
      document.removeEventListener('visibilitychange', hidden)
    }
  }, [progress, ready, retry, bootstrapped, saveAttempt])

  return { progress, setProgress, ready, status, localAvailable, retrySync: () => setRetry(value => value + 1) }
}
