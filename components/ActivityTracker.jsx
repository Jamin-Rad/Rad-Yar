'use client'

import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { addActiveSeconds, IDLE_MS, registerVisit } from '@/utils/activityStorage'

const VISITOR_KEY = 'radyar_visitor_id'
const SESSION_KEY = 'radyar_analytics_session'

function getVisitorId() {
  let visitorId = localStorage.getItem(VISITOR_KEY)
  if (!visitorId) {
    visitorId = `rv_${crypto.randomUUID().replaceAll('-', '')}`
    localStorage.setItem(VISITOR_KEY, visitorId)
  }
  return visitorId
}

function sendActivity(payload) {
  fetch('/api/analytics/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {})
}

export default function ActivityTracker() {
  const { user, isLoaded } = useUser()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoaded) return
    const userId = user?.id || null
    const visitorId = getVisitorId()
    const isNewSession = !sessionStorage.getItem(SESSION_KEY)
    if (isNewSession) sessionStorage.setItem(SESSION_KEY, '1')
    if (userId) registerVisit(userId)

    sendActivity({
      visitorId,
      path: pathname,
      visits: isNewSession ? 1 : 0,
      pageViews: 1,
      activeSeconds: 0,
    })

    let lastInteraction = Date.now()
    let lastTick = Date.now()
    let pendingSeconds = 0

    const isActive = () =>
      document.visibilityState === 'visible' &&
      document.hasFocus() &&
      Date.now() - lastInteraction < IDLE_MS

    const flush = () => {
      const seconds = Math.round(pendingSeconds)
      if (seconds >= 1) {
        if (userId) addActiveSeconds(userId, seconds)
        sendActivity({
          visitorId,
          path: pathname,
          visits: 0,
          pageViews: 0,
          activeSeconds: seconds,
        })
      }
      pendingSeconds = 0
    }

    const tick = () => {
      const now = Date.now()
      const elapsed = Math.min((now - lastTick) / 1000, 5)
      if (isActive()) pendingSeconds += elapsed
      lastTick = now
      if (pendingSeconds >= 15) flush()
    }

    const touch = () => { lastInteraction = Date.now() }
    const resetTick = () => {
      lastTick = Date.now()
      if (document.visibilityState !== 'visible') flush()
    }

    const interval = window.setInterval(tick, 1000)
    for (const event of ['pointerdown', 'keydown', 'scroll', 'touchstart']) {
      window.addEventListener(event, touch, { passive: true })
    }
    document.addEventListener('visibilitychange', resetTick)
    window.addEventListener('focus', resetTick)
    window.addEventListener('blur', flush)
    window.addEventListener('pagehide', flush)

    return () => {
      window.clearInterval(interval)
      flush()
      for (const event of ['pointerdown', 'keydown', 'scroll', 'touchstart']) {
        window.removeEventListener(event, touch)
      }
      document.removeEventListener('visibilitychange', resetTick)
      window.removeEventListener('focus', resetTick)
      window.removeEventListener('blur', flush)
      window.removeEventListener('pagehide', flush)
    }
  }, [isLoaded, pathname, user?.id])

  return null
}
