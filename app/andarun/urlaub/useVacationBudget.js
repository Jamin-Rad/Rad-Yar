'use client'

import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'radyar_private_budget_v1'
const RECURRING_KEY = 'radyar_recurring_v1'
const CAT_BUDGET_KEY = 'radyar_cat_budget_v1'
const CATEGORIES_KEY = 'radyar_categories_v2'

const EMPTY = { store: {}, recurring: [], catBudgets: {}, categories: [] }

function readLocalState() {
  try {
    return {
      store: JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'),
      recurring: JSON.parse(localStorage.getItem(RECURRING_KEY) || '[]'),
      catBudgets: JSON.parse(localStorage.getItem(CAT_BUDGET_KEY) || '{}'),
      categories: JSON.parse(localStorage.getItem(CATEGORIES_KEY) || '[]'),
    }
  } catch { return EMPTY }
}

function persistLocal(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.store))
    localStorage.setItem(RECURRING_KEY, JSON.stringify(state.recurring))
    localStorage.setItem(CAT_BUDGET_KEY, JSON.stringify(state.catBudgets))
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(state.categories))
  } catch {}
}

export function useVacationBudget() {
  const [budget, setBudget] = useState(EMPTY)
  const [loaded, setLoaded] = useState(false)
  const [status, setStatus] = useState('Wird geladen …')

  useEffect(() => {
    let cancelled = false
    async function load() {
      const local = readLocalState()
      try {
        const response = await fetch('/api/admin/budget', { cache: 'no-store' })
        if (!response.ok) throw new Error()
        const remote = await response.json()
        if (!cancelled) {
          const remoteHasData = Object.keys(remote.store || {}).length > 0
            || (remote.recurring || []).length > 0
            || Object.keys(remote.catBudgets || {}).length > 0
            || (remote.categories || []).length > 0
          const next = remoteHasData ? { ...EMPTY, ...remote, store: remote.store || {} } : local
          setBudget(next)
          persistLocal(next)
          setStatus('Online gespeichert')
        }
      } catch {
        if (!cancelled) { setBudget(local); setStatus('Lokal gespeichert') }
      }
      if (!cancelled) setLoaded(true)
    }
    load()
    return () => { cancelled = true }
  }, [])

  const save = useCallback(async nextBudget => {
    setBudget(nextBudget)
    persistLocal(nextBudget)
    setStatus('Wird gespeichert …')
    try {
      const response = await fetch('/api/admin/budget', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(nextBudget),
      })
      if (!response.ok) throw new Error()
      setStatus('Online gespeichert')
    } catch { setStatus('Lokal gespeichert') }
  }, [])

  return { budget, loaded, status, save }
}
