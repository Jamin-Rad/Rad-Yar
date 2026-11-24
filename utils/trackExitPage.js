import { createStudyTimer } from './studyTimer.js'
import { checkpointExitRow, cleanExitAnalytics, prepareExitDelivery, sendAtExit } from './exitAnalytics.js'

// Keep the route's UTC-day counters local. A restored page continues its original counters.
export function trackExitPage({ visitor, userId, pathname, first, idleMs, canTrack }) {
  let suspended = false, destination = null, internalReset
  const days = new Map()
  const path = (pathname || '/').split(/[?#]/,1)[0].slice(0,240) || '/'
  function dayAt(ms) {
    const day = new Date(ms).toISOString().slice(0,10)
    let row = days.get(day)
    if (!row) {
      row = { id:crypto.randomUUID(), visitor, actor:userId, path, day, visits:0, views:0,
        milliseconds:0, seconds:0, seen:new Date(ms).toISOString(), dirty:true }
      days.set(day,row)
    }
    return row
  }
  function checkpoint() {
    if (!canTrack()) return
    for (const row of days.values()) {
      if (!row.dirty) continue
      const { milliseconds, dirty, ...stored } = row
      checkpointExitRow(stored)
      row.dirty = false
    }
  }

  cleanExitAnalytics()
  prepareExitDelivery()
  const initial = dayAt(Date.now())
  initial.views = 1; initial.visits = first ? 1 : 0
  checkpoint()
  const timer = createStudyTimer({
    foreground: () => !suspended && document.visibilityState === 'visible' && document.hasFocus(), idleMs,
    onInterval(seconds, at) {
      let start = at.getTime()
      const end = start + Math.round(seconds*1000)
      while (start < end) {
        const nextMidnight = (Math.floor(start / 86400000) + 1) * 86400000
        const stop = Math.min(end, nextMidnight)
        const row = dayAt(start)
        row.milliseconds += stop-start
        row.seconds = Math.floor(row.milliseconds / 1000)
        row.seen = new Date(stop-1).toISOString()
        row.dirty = true
        start = stop
      }
    },
  })
  const touch = () => timer.interact()
  const save = () => { timer.tick(); checkpoint() }
  const visibility = () => { timer.visibilityChanged(); checkpoint() }
  const leaving = () => {
    if (suspended) return
    suspended = true; visibility()
    if (destination !== 'internal') sendAtExit(visitor, canTrack, destination === 'external')
  }
  const restored = () => { suspended = false; resetNavigation(); visibility() }
  const navigating = event => {
    destination = new URL(event.destination.url).origin === location.origin ? 'internal' : 'external'
    event.signal?.addEventListener('abort', resetNavigation, { once:true })
  }
  function resetNavigation() { destination = null }
  const linkClick = event => {
    if (event.defaultPrevented || event.button || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
    const a = event.target.closest?.('a[href]')
    if (!a || a.hasAttribute('download') || (a.target && a.target !== '_self')) return
    destination = a.origin === location.origin ? 'internal' : 'external'
    clearTimeout(internalReset)
    internalReset = setTimeout(resetNavigation, 2000)
  }
  const interval = window.setInterval(save, 15000)
  const inputs = ['pointerdown','keydown','scroll','touchstart']
  for (const name of inputs) window.addEventListener(name,touch,{ passive:true })
  window.addEventListener('pagehide',leaving)
  window.addEventListener('pageshow',restored)
  window.addEventListener('blur',visibility)
  window.addEventListener('focus',visibility)
  document.addEventListener('visibilitychange',visibility)
  if (window.navigation) {
    window.navigation.addEventListener('navigate',navigating)
    window.navigation.addEventListener('navigatesuccess',resetNavigation)
    window.navigation.addEventListener('navigateerror',resetNavigation)
  } else window.addEventListener('click',linkClick)
  return () => {
    clearInterval(interval); clearTimeout(internalReset); save()
    for (const name of inputs) window.removeEventListener(name,touch)
    window.removeEventListener('pagehide',leaving)
    window.removeEventListener('pageshow',restored)
    window.removeEventListener('blur',visibility)
    window.removeEventListener('focus',visibility)
    document.removeEventListener('visibilitychange',visibility)
    window.navigation?.removeEventListener('navigate',navigating)
    window.navigation?.removeEventListener('navigatesuccess',resetNavigation)
    window.navigation?.removeEventListener('navigateerror',resetNavigation)
    window.removeEventListener('click',linkClick)
  }
}
