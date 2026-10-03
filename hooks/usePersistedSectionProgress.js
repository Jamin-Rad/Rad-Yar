'use client'

import { useEffect, useState } from 'react'

export function usePersistedSectionProgress(lessonId, sectionIds, lessonRead = false) {
  const storageKey = `radyar-lesson-sections:${lessonId}`
  const [readSections, setReadSections] = useState(() => new Set())
  const [loadedKey, setLoadedKey] = useState(null)

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(storageKey) || '[]')
      const validIds = new Set(sectionIds)
      setReadSections(new Set(Array.isArray(saved) ? saved.filter(id => validIds.has(id)) : []))
    } catch {
      setReadSections(new Set())
    }
    setLoadedKey(storageKey)
  }, [storageKey, sectionIds])

  useEffect(() => {
    if (lessonRead && loadedKey === storageKey) setReadSections(new Set(sectionIds))
  }, [lessonRead, loadedKey, storageKey, sectionIds])

  useEffect(() => {
    if (loadedKey !== storageKey) return
    try {
      window.localStorage.setItem(storageKey, JSON.stringify([...readSections]))
    } catch {}
  }, [loadedKey, storageKey, readSections])

  return [readSections, setReadSections]
}
