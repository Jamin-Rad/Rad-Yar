'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { addActiveSeconds, IDLE_MS, registerVisit, syncActivityToServer } from '@/utils/activityStorage'
import { getActivityCategory } from '@/utils/activityCategory'
import { createStudyTimer } from '@/utils/studyTimer'
import { syncLocalProgressToServer, activateUserCache } from '@/utils/syncProgressToServer'
import { isUserCacheCurrent, getUserCacheToken } from '@/utils/progressCache'
import { PRIVACY_CHOICE_EVENT, readPrivacyChoice } from '@/components/LegalNotice'
import { getAnalyticsSessionId, getAnalyticsVisitorId } from '@/utils/calculatorAnalytics'

function sendAnalytics(payload, userId) {
  if (readPrivacyChoice()?.analytics !== true) return
  fetch('/api/analytics/track', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Radyar-User-Id': userId || 'anonymous' },
    body: JSON.stringify(payload), keepalive: true,
  }).catch(() => {})
}

export default function ActivityTracker() {
  const { user, isLoaded } = useUser()
  const pathname = usePathname()
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false)
  const userId = user?.id || null

  useEffect(() => {
    const update = event => setAnalyticsEnabled(event.detail?.analytics === true)
    setAnalyticsEnabled(readPrivacyChoice()?.analytics === true)
    window.addEventListener(PRIVACY_CHOICE_EVENT, update)
    return () => window.removeEventListener(PRIVACY_CHOICE_EVENT, update)
  }, [])

  useEffect(() => {
    if (!isLoaded) return
    activateUserCache(userId)
    if (!userId) return
    const token = getUserCacheToken(userId)
    const sync = () => {
      if (isUserCacheCurrent(userId, token) && navigator.onLine) void syncLocalProgressToServer(userId, { force: true })
    }
    sync()
    const interval = window.setInterval(sync, 30000)
    window.addEventListener('online', sync)
    window.addEventListener('focus', sync)
    const pending = event => { if (event.detail?.userId === userId) sync() }
    window.addEventListener('radyar:progress-pending', pending)
    return () => {
      clearInterval(interval)
      window.removeEventListener('online', sync)
      window.removeEventListener('focus', sync)
      window.removeEventListener('radyar:progress-pending', pending)
    }
  }, [isLoaded, userId])

  // Signed-in learning progress is a product feature. It is independent of
  // optional site analytics, which has its own consent check and endpoint.
  useEffect(() => {
    if (!isLoaded || !userId) return
    registerVisit(userId)
    const category = getActivityCategory(pathname)
    const timer = createStudyTimer({
      foreground: () => document.visibilityState === 'visible' && document.hasFocus(),
      idleMs: IDLE_MS,
      onInterval: (seconds, at) => addActiveSeconds(userId, seconds, category, at),
    })
    const touch = () => timer.interact()
    const visibility = () => timer.visibilityChanged()
    const save = () => { timer.tick(); void syncActivityToServer(userId, { keepalive: true }).catch(() => {}) }
    const interval = window.setInterval(timer.tick, 1000)
    for (const name of ['pointerdown', 'keydown', 'scroll', 'touchstart']) window.addEventListener(name, touch, { passive: true })
    document.addEventListener('visibilitychange', visibility)
    window.addEventListener('focus', visibility)
    window.addEventListener('blur', visibility)
    window.addEventListener('pagehide', save)
    return () => {
      clearInterval(interval)
      timer.stop()
      void syncActivityToServer(userId, { keepalive: true }).catch(() => {})
      for (const name of ['pointerdown', 'keydown', 'scroll', 'touchstart']) window.removeEventListener(name, touch)
      document.removeEventListener('visibilitychange', visibility)
      window.removeEventListener('focus', visibility)
      window.removeEventListener('blur', visibility)
      window.removeEventListener('pagehide', save)
    }
  }, [isLoaded, userId, pathname])

  useEffect(() => {
    if (!isLoaded || !analyticsEnabled) return
    const visitorId = getAnalyticsVisitorId()
    const first = !sessionStorage.getItem('radyar_analytics_session')
    getAnalyticsSessionId()
    sendAnalytics({ visitorId, path: pathname, visits: first ? 1 : 0, pageViews: 1, activeSeconds: 0 }, userId)
    let analyticsSeconds = 0
    const timer = createStudyTimer({
      foreground: () => document.visibilityState === 'visible' && document.hasFocus(), idleMs: IDLE_MS,
      onInterval: seconds => { analyticsSeconds += seconds },
    })
    const flush = () => {
      timer.tick()
      const seconds = Math.floor(analyticsSeconds)
      if (seconds >= 1) { sendAnalytics({ visitorId, path: pathname, visits: 0, pageViews: 0, activeSeconds: seconds }, userId); analyticsSeconds -= seconds }
    }
    const interval = window.setInterval(flush, 15000)
    const touch = () => timer.interact()
    const visibility = () => timer.visibilityChanged()
    for (const name of ['pointerdown','keydown','scroll','touchstart']) window.addEventListener(name,touch,{passive:true})
    document.addEventListener('visibilitychange',visibility)
    window.addEventListener('focus',visibility);window.addEventListener('blur',visibility)
    return () => {
      clearInterval(interval);flush()
      for (const name of ['pointerdown','keydown','scroll','touchstart']) window.removeEventListener(name,touch)
      document.removeEventListener('visibilitychange',visibility)
      window.removeEventListener('focus',visibility);window.removeEventListener('blur',visibility)
    }
  }, [isLoaded, analyticsEnabled, userId, pathname])
  return null
}
