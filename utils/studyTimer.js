// Wall-clock accounting, split at local midnight. The caller persists each
// tick; background/idle intervals never become study time on focus return.
export function createStudyTimer({ now = Date.now, foreground, onInterval, idleMs = 60000 }) {
  let previous = now(), lastInteraction = previous, active = foreground()
  function tick() {
    const current = now()
    const end = Math.min(current, lastInteraction + idleMs)
    let start = previous
    if (active && end > start) {
      while (start < end) {
        const midnight = new Date(start); midnight.setHours(24, 0, 0, 0)
        const stop = Math.min(end, midnight.getTime())
        onInterval((stop - start) / 1000, new Date(start))
        start = stop
      }
    }
    previous = current
  }
  return {
    tick,
    interact() { tick(); lastInteraction = now() },
    visibilityChanged() { tick(); active = foreground(); if (active) lastInteraction = now() },
    stop: tick,
  }
}
