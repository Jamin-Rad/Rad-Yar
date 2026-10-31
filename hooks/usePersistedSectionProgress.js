'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { loadReadState } from '@/utils/readProgressStore'

const EMPTY_SECTIONS = new Set()

const identity = saved => saved

export function usePersistedSectionProgress(lessonId, sectionIds, lessonRead = false, migrateSaved = identity) {
  const { isLoaded, userId } = useAuth()
  const [resetVersion, setResetVersion] = useState('')
  const storageKey = `radyar-lesson-sections:${lessonId}:${userId || 'anon'}${resetVersion ? `:reset:${resetVersion}` : ''}`
  const [readSections, setReadSections] = useState(() => new Set())
  const [loadedKey, setLoadedKey] = useState(null)

  useEffect(() => {
    if (!isLoaded) return
    const update = event => {
      if (event && event.detail?.userId !== userId) return
      const reset = loadReadState(userId).reset
      setResetVersion(reset?.changeId || reset?.changedAt || '')
    }
    update()
    window.addEventListener('radyar:read-updated', update)
    return () => window.removeEventListener('radyar:read-updated', update)
  }, [isLoaded, userId])

  useEffect(() => {
    if (!isLoaded) return
    try {
      const saved = JSON.parse(window.localStorage.getItem(storageKey) || '[]')
      const validIds = new Set(sectionIds)
      const restored = Array.isArray(saved) ? migrateSaved(saved).filter(id => validIds.has(id)) : []
      // A stale full section cache must not auto-mark an unread/reset lesson.
      setReadSections(new Set(!lessonRead && restored.length === sectionIds.length ? [] : restored))
    } catch {
      setReadSections(new Set())
    }
    setLoadedKey(storageKey)
  }, [isLoaded, storageKey, sectionIds, migrateSaved])

  useEffect(() => {
    if (isLoaded && lessonRead && loadedKey === storageKey) setReadSections(new Set(sectionIds))
  }, [isLoaded, lessonRead, loadedKey, storageKey, sectionIds])

  useEffect(() => {
    if (!isLoaded || loadedKey !== storageKey) return
    try {
      window.localStorage.setItem(storageKey, JSON.stringify([...readSections]))
    } catch {}
  }, [isLoaded, loadedKey, storageKey, readSections])

  // Do not expose the previous account's sections during the render before
  // the new account's cache effect has run (lessons may auto-complete).
  return [isLoaded && loadedKey === storageKey ? readSections : EMPTY_SECTIONS, setReadSections]
}
