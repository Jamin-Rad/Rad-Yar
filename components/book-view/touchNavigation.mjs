// Lock a gesture early: once vertical reading starts, it cannot become a turn.
export function swipeAxis(dx, dy) {
  if (Math.max(Math.abs(dx), Math.abs(dy)) < 12) return null
  return Math.abs(dx) >= Math.abs(dy) * 1.4 ? 'horizontal' : 'vertical'
}

export function swipeStep(dx, dy, duration, rtl = false) {
  if (duration > 1200 || Math.abs(dx) < 44 || Math.abs(dx) < Math.abs(dy) * 1.4) return 0
  return (dx < 0) !== rtl ? 1 : -1
}
