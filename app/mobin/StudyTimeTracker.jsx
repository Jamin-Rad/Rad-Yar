'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { berlinStudyDay, saveLocalStudySession, studySectionFromPath } from '@/lib/mobinStudyTime'

export default function StudyTimeTracker() {
  const pathname = usePathname()
  const section = studySectionFromPath(pathname)

  useEffect(() => {
    if (!section) return undefined
    let day = berlinStudyDay()
    let session = { id: `study-time:${day}:${crypto.randomUUID()}`, day, section, seconds: 0 }
    let previous = Date.now()
    let lastActivity = Date.now()
    let visible = document.visibilityState === 'visible' && document.hasFocus()
    let dirty = false
    let lastSent = Date.now()

    const send = (beacon = false) => {
      if (!dirty || session.seconds === 0) return
      saveLocalStudySession(session)
      const body = JSON.stringify(session)
      if (beacon && navigator.sendBeacon?.('/api/mobin/study-time', new Blob([body], { type: 'application/json' }))) { dirty = false; lastSent = Date.now(); return }
      fetch('/api/mobin/study-time', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: beacon })
        .then(response => { if (!response.ok) dirty = true }).catch(() => { dirty = true })
      dirty = false
      lastSent = Date.now()
    }
    const tick = () => {
      const now = Date.now()
      const today = berlinStudyDay(new Date(now))
      if (today !== day) {
        send(true)
        day = today
        session = { id: `study-time:${day}:${crypto.randomUUID()}`, day, section, seconds: 0 }
      }
      // Reading a question is study time too; a short pause should not stop the clock.
      if (visible && now - lastActivity <= 600000) {
        const seconds = Math.min(5, Math.floor((now - previous) / 1000))
        if (seconds > 0) { session.seconds += seconds; dirty = true }
      }
      previous = now
    }
    const activity = () => { lastActivity = Date.now() }
    const visibility = () => { tick(); visible = document.visibilityState === 'visible' && document.hasFocus(); previous = Date.now(); if (!visible) send(true) }
    const focus = () => { previous = Date.now(); visible = document.visibilityState === 'visible'; activity() }
    const blur = () => { tick(); visible = false; send(true) }
    const timer = window.setInterval(() => { tick(); if (Date.now() - lastSent >= 15000) send() }, 5000)
    for (const event of ['pointerdown', 'keydown', 'scroll']) window.addEventListener(event, activity, { passive: true })
    document.addEventListener('visibilitychange', visibility)
    window.addEventListener('focus', focus)
    window.addEventListener('blur', blur)
    window.addEventListener('pagehide', blur)
    return () => {
      tick(); send(true); window.clearInterval(timer)
      for (const event of ['pointerdown', 'keydown', 'scroll']) window.removeEventListener(event, activity)
      document.removeEventListener('visibilitychange', visibility)
      window.removeEventListener('focus', focus)
      window.removeEventListener('blur', blur)
      window.removeEventListener('pagehide', blur)
    }
  }, [section])

  return null
}
