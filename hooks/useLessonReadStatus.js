'use client'

import { useEffect, useState } from 'react'

export function useLessonReadStatus(topicId) {
  const [isRead, setIsRead] = useState(false)

  useEffect(() => {
    try {
      const articles = JSON.parse(localStorage.getItem('radyar_read_articles') || '{}')
      setIsRead(Number(articles[topicId] || 0) >= 1)
    } catch {}
  }, [topicId])

  const toggleRead = () => {
    setIsRead(previous => {
      const next = !previous
      try {
        const articles = JSON.parse(localStorage.getItem('radyar_read_articles') || '{}')
        articles[topicId] = next ? 1 : 0
        localStorage.setItem('radyar_read_articles', JSON.stringify(articles))
      } catch {}
      return next
    })
  }

  return { isRead, toggleRead }
}
