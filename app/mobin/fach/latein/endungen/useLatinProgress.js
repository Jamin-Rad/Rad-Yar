'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { draftKey, modes, resultsKey, validDraft, validResult } from './progress'

const endpoint = '/api/mobin/latin-progress'
const empty = { results: [], drafts: {} }

function readLocal() {
  const read = (key) => {
    try { return JSON.parse(window.localStorage.getItem(key)) } catch { return null }
  }
  const results = read(resultsKey)
  const drafts = {}
  for (const mode of modes) {
    const stored = read(draftKey(mode))
    if (!stored) continue
    const entry = Object.hasOwn(stored, 'modifiedAt') ? stored : { draft: stored, modifiedAt: 0 }
    if (validDraft(mode, entry)) drafts[mode] = entry
  }
  return { results: Array.isArray(results) ? results.filter(validResult) : [], drafts }
}

export default function useLatinProgress() {
  const current = useRef(empty)
  const pending = useRef(new Map())
  const timer = useRef(null)
  const [progress, setProgress] = useState(empty)
  const [status, setStatus] = useState('loading')

  const store = useCallback((snapshot) => {
    current.current = snapshot
    setProgress(snapshot)
    try {
      window.localStorage.setItem(resultsKey, JSON.stringify(snapshot.results))
      for (const mode of modes) {
        if (snapshot.drafts[mode]) window.localStorage.setItem(draftKey(mode), JSON.stringify(snapshot.drafts[mode]))
      }
    } catch {
      // Online storage still works if this browser blocks local storage.
    }
  }, [])

  const flush = useCallback(async () => {
    clearTimeout(timer.current)
    if (!pending.current.size) return
    setStatus('saving')
    const batch = [...pending.current.entries()]
      .sort(([, a], [, b]) => Number(Boolean(b.result)) - Number(Boolean(a.result))).slice(0, 5)
    const drafts = {}
    const results = []
    for (const [, item] of batch) {
      if (item.result) results.push(item.result)
      else drafts[item.mode] = item.entry
    }
    try {
      const response = await fetch(endpoint, {
        method: 'POST', keepalive: true, signal: AbortSignal.timeout(8000),
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ results, drafts }),
      })
      if (!response.ok) throw new Error('Save failed')
      for (const [key, item] of batch) if (pending.current.get(key) === item) pending.current.delete(key)
      if (pending.current.size) timer.current = setTimeout(flush, 300)
      else setStatus('saved')
    } catch {
      setStatus('offline')
    }
  }, [])

  const refresh = useCallback(async () => {
    try {
      const response = await fetch(endpoint, { cache: 'no-store', signal: AbortSignal.timeout(6000) })
      if (!response.ok) throw new Error('Load failed')
      const remote = await response.json()
      const local = current.current
      const results = new Map(remote.results.map((result) => [result.id, result]))
      for (const result of local.results) {
        if (!results.has(result.id)) {
          results.set(result.id, result)
          pending.current.set(result.id, { result })
        } else pending.current.delete(result.id)
      }
      const drafts = { ...remote.drafts }
      for (const mode of modes) {
        const entry = local.drafts[mode]
        if (entry && (!drafts[mode] || entry.modifiedAt > drafts[mode].modifiedAt)) {
          drafts[mode] = entry
          pending.current.set(mode, { mode, entry })
        } else pending.current.delete(mode)
      }
      store({ results: [...results.values()].sort((a, b) => b.date - a.date), drafts })
      if (pending.current.size) void flush()
      else setStatus('saved')
      return drafts
    } catch {
      setStatus('offline')
      return current.current.drafts
    }
  }, [flush, store])

  useEffect(() => {
    store(readLocal())
    void refresh()
    const onVisible = () => {
      if (document.visibilityState === 'visible') void refresh()
      else void flush()
    }
    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('online', refresh)
    window.addEventListener('pagehide', flush)
    return () => {
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('online', refresh)
      window.removeEventListener('pagehide', flush)
      void flush()
    }
  }, [flush, refresh, store])

  function schedule() {
    clearTimeout(timer.current)
    setStatus('saving')
    timer.current = setTimeout(flush, 300)
  }

  function saveDraft(mode, draft) {
    const previous = current.current
    const entry = { draft, modifiedAt: Math.max(Date.now(), (previous.drafts[mode]?.modifiedAt ?? 0) + 1) }
    pending.current.set(mode, { mode, entry })
    store({ ...previous, drafts: { ...previous.drafts, [mode]: entry } })
    schedule()
  }

  function saveResult(mode, mistakes, unanswered, answers) {
    const result = { id: crypto.randomUUID(), date: Date.now(), mode, mistakes, unanswered, answers }
    const previous = current.current
    pending.current.set(result.id, { result })
    store({ ...previous, results: [result, ...previous.results] })
    schedule()
    return result
  }

  return { ...progress, status, saveDraft, saveResult, refresh, flush }
}
