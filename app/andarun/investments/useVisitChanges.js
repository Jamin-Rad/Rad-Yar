'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { captureVisit, readVisit, VISIT_STORAGE_KEY } from '@/lib/investments/visit.mjs'

export default function useVisitChanges(state, markets) {
  const [previous, setPrevious] = useState(null)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState('')
  const saved = useRef(null), generation = useRef(0), mounted = useRef(false)
  const latest = useRef({ state, markets })
  latest.current = { state, markets }
  useEffect(() => {
    try { saved.current = readVisit(localStorage.getItem(VISIT_STORAGE_KEY)); setPrevious(saved.current) }
    catch { setError('ذخیره مبنای بازدید در این مرورگر در دسترس نیست.') }
    setReady(true)
  }, [])
  const checkpoint = useCallback((adopt = false) => {
    const current = latest.current
    if (!current.state) return
    const value = captureVisit(current.state, current.markets, new Date().toISOString(), saved.current)
    try {
      localStorage.setItem(VISIT_STORAGE_KEY, JSON.stringify(value))
      saved.current = value
      if (mounted.current) { setError(''); if (adopt) setPrevious(value) }
    } catch { if (mounted.current) setError('مبنای بازدید ذخیره نشد؛ فضای ذخیره مرورگر را بررسی کن.') }
  }, [])
  useEffect(() => {
    // Keep the in-session baseline fixed. Write only the next visit's checkpoint.
    // A short mount/unmount (React Strict Mode) must not erase the prior visit.
    const currentGeneration = ++generation.current
    mounted.current = true
    function hidden() { if (document.visibilityState === 'hidden') checkpoint() }
    function leaving() { checkpoint() }
    window.addEventListener('pagehide', leaving)
    document.addEventListener('visibilitychange', hidden)
    return () => {
      mounted.current = false
      window.removeEventListener('pagehide', leaving); document.removeEventListener('visibilitychange', hidden)
      queueMicrotask(() => { if (generation.current === currentGeneration && !mounted.current) checkpoint() })
    }
  }, [checkpoint])
  return { previous, ready, error, markReviewed: () => checkpoint(true) }
}
