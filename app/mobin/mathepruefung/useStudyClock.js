'use client'

import { useCallback, useEffect, useRef } from 'react'
import { addMathStudyTime } from '@/lib/mobinMath'

export function useStudyClock(sessionId, setProgress) {
  const flushRef = useRef(() => {})
  useEffect(() => {
    if (!sessionId) return undefined
    let previous = Date.now(), activityAt = Date.now(), focused = document.hasFocus(), visible = document.visibilityState === 'visible'
    const flush = () => {
      const now = Date.now(), elapsed = Math.max(0, now - previous)
      if (focused && visible && now - activityAt <= 120000) {
        const seconds = Math.min(5, Math.floor(elapsed / 1000))
        if (seconds > 0) setProgress(current => addMathStudyTime(current, sessionId, seconds))
        previous = now - elapsed % 1000
      } else previous = now
    }
    flushRef.current = flush
    const activity = () => { activityAt = Date.now() }
    const blur = () => { flush(); focused = false }
    const focus = () => { previous = Date.now(); activity(); focused = true }
    const visibility = () => { flush(); visible = document.visibilityState === 'visible'; previous = Date.now() }
    const timer = window.setInterval(flush, 5000)
    for (const event of ['pointerdown', 'keydown', 'scroll']) window.addEventListener(event, activity, { passive: true })
    window.addEventListener('blur', blur); window.addEventListener('focus', focus)
    document.addEventListener('visibilitychange', visibility)
    window.addEventListener('pagehide', flush)
    return () => {
      flush(); flushRef.current = () => {}; window.clearInterval(timer)
      for (const event of ['pointerdown', 'keydown', 'scroll']) window.removeEventListener(event, activity)
      window.removeEventListener('blur', blur); window.removeEventListener('focus', focus)
      window.removeEventListener('pagehide', flush); document.removeEventListener('visibilitychange', visibility)
    }
  }, [sessionId, setProgress])
  return useCallback(() => flushRef.current(), [])
}
