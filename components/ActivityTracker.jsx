'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { addActiveSeconds, IDLE_MS, registerVisit, syncActivityToServer } from '@/utils/activityStorage'
import { getActivityCategory } from '@/utils/activityCategory'
import { createStudyTimer } from '@/utils/studyTimer'
import { syncLocalProgressToServer, activateUserCache } from '@/utils/syncProgressToServer'
import { isUserCacheCurrent, getUserCacheToken } from '@/utils/progressCache'
import { flushPendingProgress, pendingProgressEntries } from '@/utils/progressSync'
import { PRIVACY_CHOICE_EVENT, PRIVACY_CHOICE_KEY, readPrivacyChoice } from '@/components/LegalNotice'
import { getAnalyticsSessionId, getAnalyticsVisitorId } from '@/utils/calculatorAnalytics'

import { trackExitPage } from '@/utils/trackExitPage'

export default function ActivityTracker() {
  const { user, isLoaded } = useUser()
  const pathname = usePathname()
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false)
  const userId = user?.id || null

  useEffect(() => {
    const update = () => setAnalyticsEnabled(readPrivacyChoice()?.analytics === true)
    const storage = event => { if (event.key === PRIVACY_CHOICE_KEY || event.key === null) update() }
    setAnalyticsEnabled(readPrivacyChoice()?.analytics === true)
    window.addEventListener(PRIVACY_CHOICE_EVENT, update)
    window.addEventListener('storage', storage)
    return () => {
      window.removeEventListener('storage', storage)
      window.removeEventListener(PRIVACY_CHOICE_EVENT, update)
    }
  }, [])

  useEffect(() => {
    if (!isLoaded) return
    activateUserCache(userId)
    if (!userId) return
    const token = getUserCacheToken(userId)
    const foreground = () => document.visibilityState === 'visible' && isUserCacheCurrent(userId, token) && navigator.onLine
    const sync = () => {
      if (foreground()) void syncLocalProgressToServer(userId)
    }
    sync()
    const interval = window.setInterval(sync, 5 * 60_000)
    const retry = window.setInterval(() => {
      if (!foreground()) return
      if (pendingProgressEntries(userId).length) void flushPendingProgress(userId)
      void syncActivityToServer(userId, { keepalive: true }).catch(() => {})
    }, 60_000)
    window.addEventListener('online', sync)
    window.addEventListener('focus', sync)
    document.addEventListener('visibilitychange', sync)
    return () => {
      clearInterval(interval)
      clearInterval(retry)
      window.removeEventListener('online', sync)
      window.removeEventListener('focus', sync)
      document.removeEventListener('visibilitychange', sync)
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
    const save = () => { timer.tick(); void syncActivityToServer(userId, { keepalive: true }).catch(() => {}) }
    const visibility = () => {
      timer.visibilityChanged()
      if (document.visibilityState === 'hidden') save()
    }
    const interval = window.setInterval(timer.tick, 1000)
    for (const name of ['pointerdown', 'keydown', 'scroll', 'touchstart']) window.addEventListener(name, touch, { passive: true })
    document.addEventListener('visibilitychange', visibility)
    window.addEventListener('focus', visibility)
    window.addEventListener('blur', visibility)
    window.addEventListener('pagehide', save)
    return () => {
      clearInterval(interval)
      timer.stop()
      for (const name of ['pointerdown', 'keydown', 'scroll', 'touchstart']) window.removeEventListener(name, touch)
      document.removeEventListener('visibilitychange', visibility)
      window.removeEventListener('focus', visibility)
      window.removeEventListener('blur', visibility)
      window.removeEventListener('pagehide', save)
    }
  }, [isLoaded, userId, pathname])

  useEffect(() => {
    if (!isLoaded || !analyticsEnabled) return
    const choice = readPrivacyChoice()
    if (!choice?.analytics) return
    try {
      const visitor = getAnalyticsVisitorId()
      const first = !sessionStorage.getItem('radyar_analytics_session')
      getAnalyticsSessionId()
      const canTrack = () => {
        const current = readPrivacyChoice()
        return current?.analytics === true && localStorage.getItem('radyar_visitor_id') === visitor
      }
      return trackExitPage({ visitor, userId, pathname, first, idleMs: IDLE_MS, canTrack })
    } catch { /* Analytics needs browser storage. */ }
  }, [isLoaded, analyticsEnabled, userId, pathname])
  return null
}
