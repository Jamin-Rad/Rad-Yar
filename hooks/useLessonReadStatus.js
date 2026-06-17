'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { pullReadStatusFromServer } from '@/utils/readStatus'
import { markProgressSyncPending } from '@/utils/syncProgressToServer'

export function useLessonReadStatus(topicId) {
  const { isLoaded, userId } = useAuth()
  const [isRead, setIsRead] = useState(false)
  const [authError, setAuthError] = useState(false)

  useEffect(() => {
    try {
      const articles = JSON.parse(localStorage.getItem('radyar_read_articles') || '{}')
      setIsRead(Number(articles[topicId] || 0) >= 1)
    } catch {}
  }, [topicId])

  // Beim Login: Lesefortschritt vom Server holen und mit localStorage mergen
  // (Server gewinnt bei Konflikten – damit andere Geräte berücksichtigt werden).
  useEffect(() => {
    if (!isLoaded || !userId) return
    let cancelled = false
    pullReadStatusFromServer()
      .then(result => {
        if (cancelled || !result) return
        if (Number(result.articles[topicId] || 0) >= 1) setIsRead(true)
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [isLoaded, userId, topicId])

  const toggleRead = () => {
    if (!isLoaded || !userId) {
      setAuthError(true)
      return false
    }
    setAuthError(false)
    setIsRead(previous => {
      const next = !previous
      try {
        const articles = JSON.parse(localStorage.getItem('radyar_read_articles') || '{}')
        articles[topicId] = next ? 1 : 0
        localStorage.setItem('radyar_read_articles', JSON.stringify(articles))
        const history = JSON.parse(localStorage.getItem('radyar_learning_history') || '[]')
        const withoutTopic = history.filter(item => item.topicId !== topicId)
        localStorage.setItem('radyar_learning_history', JSON.stringify(
          next ? [...withoutTopic, { topicId, learnedAt: new Date().toISOString() }] : withoutTopic
        ))
      } catch {}
      fetch('/api/progress/read-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ themaId: topicId, read: next }),
      }).then(response => {
        if (!response.ok) markProgressSyncPending(userId)
      }).catch(() => markProgressSyncPending(userId))
      if (next) {
        window.dispatchEvent(new CustomEvent('radyar:lesson-read', { detail: { topicId } }))
      }
      return next
    })
    return true
  }

  return { isRead, toggleRead, authError, clearAuthError: () => setAuthError(false) }
}
