// Normalize wheel input without queuing a burst of deferred slice changes.
export function createSliceWheelController() {
  let distance = 0
  let direction = 0
  let lastEvent = -Infinity
  let lastStep = -Infinity

  return ({ deltaY, deltaX = 0, deltaMode = 0, ctrlKey = false, time }) => {
    if (ctrlKey || !deltaY || Math.abs(deltaX) > Math.abs(deltaY)) return 0
    const nextDirection = Math.sign(deltaY)
    const reversed = nextDirection !== direction
    if (reversed || time - lastEvent > 180) distance = 0
    direction = nextDirection
    lastEvent = time
    // Drop momentum during the cooldown, rather than letting it accumulate
    // and jump to another slice when the cooldown expires.
    if (!reversed && time - lastStep < 100) return 0
    const pixels = deltaY * (deltaMode === 1 ? 20 : deltaMode === 2 ? 100 : 1)
    distance += Math.min(Math.abs(pixels), 60)
    if (distance < 60) return 0
    distance = 0
    lastStep = time
    return direction
  }
}
