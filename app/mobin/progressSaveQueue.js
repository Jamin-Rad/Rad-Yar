const SAVE_INTERVAL = 15000

// Start the window at the first edit so continuous practice still syncs periodically.
export function createProgressSaveQueue(send) {
  let pending
  let timer = null
  let writing = false
  let urgent = false

  function schedule() {
    if (timer === null && pending !== undefined && !writing) timer = setTimeout(flush, SAVE_INTERVAL)
  }

  async function flush(onExit = false) {
    clearTimeout(timer)
    timer = null
    if (pending === undefined) return
    if (writing) {
      urgent ||= onExit
      return
    }
    writing = true
    const snapshot = pending
    let sent = false
    try {
      await send(snapshot, onExit)
      if (pending === snapshot) pending = undefined
      sent = true
    } catch {
      // The local copy and queued snapshot remain available for the next edit or reconnect.
    } finally {
      writing = false
      const flushNow = urgent
      urgent = false
      if (sent && flushNow) void flush(true)
      else if (sent || pending !== snapshot) schedule()
    }
  }

  return {
    enqueue(snapshot) {
      pending = snapshot
      schedule()
    },
    flush,
  }
}

export function bindProgressSaveQueue(queue) {
  const exit = () => { void queue.flush(true) }
  const online = () => { void queue.flush() }
  const hidden = () => { if (document.visibilityState === 'hidden') exit() }
  window.addEventListener('pagehide', exit)
  window.addEventListener('online', online)
  document.addEventListener('visibilitychange', hidden)
  return () => {
    window.removeEventListener('pagehide', exit)
    window.removeEventListener('online', online)
    document.removeEventListener('visibilitychange', hidden)
    exit()
  }
}
