'use client'

import { useEffect, useRef, useState } from 'react'
import { choosePortfolioVersion } from '@/lib/investments/sync.mjs'
import { assertHistoryPreserved, normalizeFamilyState } from '@/lib/investments/family.mjs'
import { reconcileHoldings } from '@/lib/investments/holdings.mjs'

export const FAMILY_STORAGE_KEY = 'andarun:investments:family:v3'
const OLD_KEYS = ['andarun:investments:family:v2', 'andarun:investments:personal:v1']
export default function useFamilyPortfolio(notify) {
  const [state, setState] = useState(null)
  const [revision, setRevision] = useState(null)
  const [cloud, setCloud] = useState(false)
  const [dirty, setDirty] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [storageError, setStorageError] = useState(false)
  const [conflict, setConflict] = useState(false)
  const [offline, setOffline] = useState(false)
  const current = useRef(null)
  const revisionRef = useRef(null)
  const cloudRef = useRef(false)
  const saveLock = useRef(false)
  const version = useRef(0)
  const initialized = useRef(false)
  const attemptedVersion = useRef(-1)
  const remoteRef = useRef(null)
  function cache(value, baseRevision, pending, localOnly) {
    try { localStorage.setItem(FAMILY_STORAGE_KEY, JSON.stringify({ state: value, baseRevision, dirty: pending, localOnly })); setStorageError(false) }
    catch { setStorageError(true) }
  }
  useEffect(() => {
    const controller = new AbortController()
    async function load() {
      let local = null
      try {
        const raw = [FAMILY_STORAGE_KEY, ...OLD_KEYS].map(key => localStorage.getItem(key)).find(Boolean)
        if (raw) { local = JSON.parse(raw); local.state = normalizeFamilyState(local.state); current.current = local.state; revisionRef.current = local.baseRevision ?? null; setRevision(revisionRef.current); setState(local.state); setOffline(true) }
      } catch { setStorageError(true) }
      try {
        const response = await fetch('/api/andarun/investments', { cache: 'no-store', signal: controller.signal })
        if (response.status === 403) { current.current = null; setState(null); throw new Error('برای مشاهده سرمایه، دوباره وارد Andarun شو.') }
        if (!response.ok) throw new Error('سرور پاسخ نداد؛ نسخه ذخیره‌شده مرورگر در دسترس است.')
        const remote = await response.json()
        const serverState = normalizeFamilyState(remote.state)
        remoteRef.current = { state: serverState, revision: remote.revision }
        const chosen = choosePortfolioVersion({ ...remote, state: serverState }, local, current.current, version.current, revisionRef.current)
        const { state: next, revision: base, modified } = chosen
        if (chosen.conflict) setConflict(true)
        current.current = next; revisionRef.current = base; cloudRef.current = remote.cloud === true
        setState(next); setRevision(base); setCloud(remote.cloud === true); setOffline(false); setDirty(!!modified)
        cache(next, base, !!modified, !remote.cloud && !!modified)
        initialized.current = true
      } catch (err) {
        if (err.name === 'AbortError') return
        setError(err.message)
        if (current.current) { setOffline(true); setDirty(previous => previous || !!(local?.dirty || local?.localOnly)); initialized.current = true }
      }
    }
    load()
    return () => controller.abort()
  }, [])

  function change(next) {
    const validated = assertHistoryPreserved(current.current, next)
    current.current = validated; version.current++
    cache(validated, revisionRef.current, true, !cloudRef.current)
    setState(validated); setDirty(true)
    return validated
  }
  function changeAccount(id, update) {
    const value = current.current
    return change({ ...value, accounts: value.accounts.map(account => account.id === id ? update(account) : account) })
  }
  async function save() {
    if (saveLock.current || !current.current || conflict) return
    saveLock.current = true; setSaving(true)
    const submitted = current.current
    const requestVersion = version.current
    attemptedVersion.current = requestVersion
    cache(submitted, revisionRef.current, cloudRef.current, !cloudRef.current)
    try {
      if (!cloudRef.current) { setDirty(false); notify('در این مرورگر ذخیره شد؛ برای همگام‌سازی سرور، دوباره اتصال را بررسی کن.'); return }
      const response = await fetch('/api/andarun/investments', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ state: submitted, revision: revisionRef.current }) })
      const result = await response.json()
      if (!response.ok) { if (response.status === 409) setConflict(true); throw new Error(result.error || 'ذخیره سرور انجام نشد؛ نسخه مرورگر حفظ شد.') }
      revisionRef.current = result.revision; setRevision(result.revision); setOffline(false); setError('')
      const pending = version.current !== requestVersion
      if(!pending&&result.state){current.current=normalizeFamilyState(result.state);setState(current.current)}
      cache(current.current, result.revision, pending, false)
      if (!pending) setDirty(false)
    } catch (err) { setError(err.message); notify(err.message) }
    finally { saveLock.current = false; setSaving(false) }
  }
  useEffect(() => {
    if (!initialized.current || !dirty || !cloud || conflict || saving || attemptedVersion.current === version.current) return
    const timer = setTimeout(save, 900)
    return () => clearTimeout(timer)
  }, [state, dirty, cloud, conflict, saving])
  useEffect(() => {
    if (!dirty || !cloud) return
    const warn = event => { event.preventDefault(); event.returnValue = '' }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty, cloud])
  function discardDraft() {
    if (!remoteRef.current) return
    // Caller offers a backup first; legacy copies remain untouched.
    cache(remoteRef.current.state, remoteRef.current.revision, false, false)
    window.location.reload()
  }
  function synchronizeLedger(transactions) {
    if(!current.current||!cloudRef.current||offline||conflict)return
    const next=normalizeFamilyState(reconcileHoldings(current.current,transactions))
    if(JSON.stringify(next)!==JSON.stringify(current.current))change(next)
  }
  return { state, change, changeAccount, save, revision, cloud, dirty, saving, error, storageError, conflict, offline, discardDraft, synchronizeLedger }
}
