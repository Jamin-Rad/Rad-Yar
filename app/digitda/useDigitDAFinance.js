'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { DIGITDA_STORAGE_KEY, INITIAL_FINANCE_STATE, normalizeFinanceState } from './financeData'

export function useDigitDAFinance() {
  const [state, setState] = useState(INITIAL_FINANCE_STATE)
  const [loaded, setLoaded] = useState(false)
  const [saveStatus, setSaveStatus] = useState('ذخیره محلی')
  const hydrated = useRef(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      let local = null
      try { local = JSON.parse(localStorage.getItem(DIGITDA_STORAGE_KEY) || 'null') } catch {}
      try {
        const response = await fetch('/api/digitda/state', { cache: 'no-store' })
        const remote = await response.json()
        if (!cancelled) setState(normalizeFinanceState(remote.state || local))
      } catch {
        if (!cancelled) setState(normalizeFinanceState(local))
      }
      if (!cancelled) { hydrated.current = true; setLoaded(true) }
    }
    load()
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (!loaded || !hydrated.current) return
    localStorage.setItem(DIGITDA_STORAGE_KEY, JSON.stringify(state))
    setSaveStatus('در حال ذخیره…')
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch('/api/digitda/state', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ state }) })
        if (!response.ok) throw new Error()
        setSaveStatus('ذخیره شد')
      } catch { setSaveStatus('ذخیره محلی') }
    }, 500)
    return () => window.clearTimeout(timer)
  }, [state, loaded])

  const saveNow = useCallback(async nextState => {
    const normalized = normalizeFinanceState(nextState)
    setState(normalized)
    localStorage.setItem(DIGITDA_STORAGE_KEY, JSON.stringify(normalized))
    setSaveStatus('در حال ذخیره…')
    try {
      const response = await fetch('/api/digitda/state', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ state: normalized }) })
      if (!response.ok) throw new Error()
      setSaveStatus('ذخیره شد')
    } catch { setSaveStatus('ذخیره محلی') }
    return normalized
  }, [])

  return { state, setState, loaded, saveStatus, saveNow }
}
