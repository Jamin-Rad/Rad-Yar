'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { pullReadStatusFromServer } from '@/utils/readStatus'
import { persistProgressWrite } from '@/utils/progressSync'
import { activateUserCache, isUserCacheActive } from '@/utils/progressCache'
import { changeReadStatus, loadReadState, projectReadState } from '@/utils/readProgressStore'

export function useLessonReadStatus(topicId) {
  const { isLoaded, userId } = useAuth()
  const [readStatus, setReadStatus] = useState(null)
  const isRead = readStatus?.userId === userId && readStatus?.topicId === topicId && readStatus?.read === true
  const setIsRead = read => setReadStatus({ userId, topicId, read })
  const [authError, setAuthError] = useState(false)

  useEffect(() => {
    if (!isLoaded || !topicId) return
    activateUserCache(userId)
    try {
      const { articles } = projectReadState(loadReadState(userId))
      setIsRead(Number(articles[topicId] || 0) >= 1)
    } catch {}
  }, [isLoaded, userId, topicId])

  useEffect(() => {
    if (!topicId) return
    const update = event => {
      if (event.detail?.userId === userId) setIsRead(Number(event.detail.articles?.[topicId] || 0) >= 1)
    }
    window.addEventListener('radyar:read-updated', update)
    return () => window.removeEventListener('radyar:read-updated', update)
  }, [userId, topicId])

  // Beim Login: Lesefortschritt vom Server holen und mit localStorage mergen
  // (Server gewinnt bei Konflikten – damit andere Geräte berücksichtigt werden).
  useEffect(() => {
    if (!isLoaded || !userId || !topicId) return
    let cancelled = false
    pullReadStatusFromServer(userId)
      .then(result => {
        if (cancelled || !result) return
        setIsRead(Number(result.articles[topicId] || 0) >= 1)
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [isLoaded, userId, topicId])

  const setLessonRead = next => {
    if (!isLoaded || !userId || !topicId || !isUserCacheActive(userId)) {
      setAuthError(true)
      return false
    }
    setAuthError(false)
    let payload
    try { payload = changeReadStatus(userId, topicId, next) } catch { return false }
    persistProgressWrite(
      `read:${topicId}`,
      '/api/progress/read-status',
      payload,
      userId
    )
    if (next) {
      window.dispatchEvent(new CustomEvent('radyar:lesson-read', { detail: { topicId } }))
    }
    setIsRead(next)
    return true
  }

  const toggleRead = () => setLessonRead(!isRead)

  return { isRead, setLessonRead, toggleRead, authError, clearAuthError: () => setAuthError(false) }
}
