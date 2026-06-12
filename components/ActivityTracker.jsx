'use client'

import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { addActiveSeconds, IDLE_MS, registerVisit } from '@/utils/activityStorage'

export default function ActivityTracker() {
  const { user, isLoaded } = useUser()

  useEffect(() => {
    if (!isLoaded || !user) return
    const userId = user.id
    registerVisit(userId)

    let lastInteraction = Date.now()
    let lastTick = Date.now()
    let pendingSeconds = 0

    const isActive = () =>
      document.visibilityState === 'visible' &&
      document.hasFocus() &&
      Date.now() - lastInteraction < IDLE_MS

    const flush = () => {
      if (pendingSeconds >= 1) addActiveSeconds(userId, pendingSeconds)
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
  }, [isLoaded, user?.id])

  return null
}
