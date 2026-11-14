'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { berlinStudyDay, saveLocalStudySession, studySectionFromPath, syncLocalStudySessions } from '@/lib/mobinStudyTime'
import { createStudyTimer } from '@/utils/studyTimer'

const SYNC_INTERVAL = 60000

function berlinMidnightBetween(start, end, day) {
  while (end - start > 1) {
    const middle = Math.floor((start + end) / 2)
    if (berlinStudyDay(new Date(middle)) === day) start = middle
    else end = middle
  }
  return end
}

export default function StudyTimeTracker() {
  const pathname = usePathname()
  const section = studySectionFromPath(pathname)
  const tick = useRef(null)

  useEffect(() => {
    const sync = () => { tick.current?.(); void syncLocalStudySessions() }
    sync()
    const interval = window.setInterval(sync, SYNC_INTERVAL)
    window.addEventListener('online', sync)
    return () => {
      window.clearInterval(interval)
      window.removeEventListener('online', sync)
    }
  }, [])

  useEffect(() => {
    if (!section) return undefined
    let session, milliseconds = 0
    const record = (day, elapsed) => {
      if (session?.day !== day) {
        session = { id: `study-time:${day}:${crypto.randomUUID()}`, day, section, seconds: 0 }
        milliseconds = 0
      }
      milliseconds += elapsed
      const seconds = Math.floor(milliseconds / 1000)
      if (seconds > session.seconds) {
        session = { ...session, seconds }
        saveLocalStudySession(session)
      }
    }
    const foreground = () => document.visibilityState === 'visible' && document.hasFocus()
    const timer = createStudyTimer({
      foreground,
      idleMs: 600000,
      onInterval(seconds, at) {
        const start = at.getTime(), end = start + Math.round(seconds * 1000)
        const day = berlinStudyDay(at), endDay = berlinStudyDay(new Date(end - 1))
        if (day === endDay) record(day, end - start)
        else {
          const midnight = berlinMidnightBetween(start, end, day)
          record(day, midnight - start)
          record(endDay, end - midnight)
        }
      },
    })
    const activity = () => timer.interact()
    const visibility = () => {
      timer.visibilityChanged()
      if (!foreground()) void syncLocalStudySessions()
    }
    const save = () => { timer.tick(); void syncLocalStudySessions() }
    const interval = window.setInterval(timer.tick, 5000)
    tick.current = timer.tick
    for (const event of ['pointerdown', 'keydown', 'scroll']) window.addEventListener(event, activity, { passive: true })
    document.addEventListener('visibilitychange', visibility)
    window.addEventListener('focus', visibility)
    window.addEventListener('blur', visibility)
    window.addEventListener('pagehide', save)
    return () => {
      window.clearInterval(interval)
      timer.stop()
      tick.current = null
      void syncLocalStudySessions()
      for (const event of ['pointerdown', 'keydown', 'scroll']) window.removeEventListener(event, activity)
      document.removeEventListener('visibilitychange', visibility)
      window.removeEventListener('focus', visibility)
      window.removeEventListener('blur', visibility)
      window.removeEventListener('pagehide', save)
    }
  }, [section])

  return null
}
