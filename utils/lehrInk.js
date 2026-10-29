const SVG_NS = 'http://www.w3.org/2000/svg'

export function strokePath(points) {
  if (!points.length) return ''
  const first = points[0]
  let path = `M${first.x} ${first.y}`
  if (points.length === 1) return `${path}l.01 0`
  for (let index = 1; index < points.length - 1; index += 1) {
    const point = points[index]
    const next = points[index + 1]
    path += `Q${point.x} ${point.y} ${(point.x + next.x) / 2} ${(point.y + next.y) / 2}`
  }
  const last = points[points.length - 1]
  return `${path}L${last.x} ${last.y}`
}

export function strokeTouchesPoint(stroke, point, radius, offset = { x: 0, y: 0 }) {
  const x = point.x - offset.x
  const y = point.y - offset.y
  const reach = radius + stroke.width / 2
  const bounds = stroke.bounds
  if (bounds && (x < bounds.left - reach || x > bounds.right + reach || y < bounds.top - reach || y > bounds.bottom + reach)) return false
  return stroke.points.some((end, index, points) => {
    const start = points[index - 1] || end
    const dx = end.x - start.x
    const dy = end.y - start.y
    const length = dx * dx + dy * dy
    const t = length ? Math.max(0, Math.min(1, ((x - start.x) * dx + (y - start.y) * dy) / length)) : 0
    return (x - start.x - t * dx) ** 2 + (y - start.y - t * dy) ** 2 <= reach ** 2
  })
}

function scrollRoot(target) {
  for (let node = target instanceof Element ? target : null; node && node !== document.body && node !== document.documentElement; node = node.parentElement) {
    if (!(node instanceof HTMLElement)) continue
    if (node.hasAttribute('data-lehr-scroll-root')) return node
    if ((node.scrollHeight > node.clientHeight || node.scrollWidth > node.clientWidth) && /auto|scroll/.test(getComputedStyle(node).overflowY + getComputedStyle(node).overflowX)) return node
  }
  return null
}

function viewport(root) {
  const rect = root?.getBoundingClientRect()
  return { root, left: rect ? rect.left + root.clientLeft : 0, top: rect ? rect.top + root.clientTop : 0 }
}

function pointFromEvent(event, view) {
  return {
    x: event.clientX - view.left + (view.root ? view.root.scrollLeft : window.scrollX),
    y: event.clientY - view.top + (view.root ? view.root.scrollTop : window.scrollY),
  }
}

function anchorOrigin(anchor, view) {
  if (!anchor?.isConnected) return null
  const rect = anchor.getBoundingClientRect()
  return pointFromEvent({ clientX: rect.left, clientY: rect.top }, view)
}

export function createLehrInk({ className, onHistoryChange }) {
  let strokes = []
  let history = []
  let drawing = null
  let frame = null
  let refreshAll = false
  const layers = new Map()
  const observed = new Set()
  const resizeObserver = new ResizeObserver(() => schedule(true))

  function observe(node) {
    if (node && !observed.has(node)) {
      observed.add(node)
      resizeObserver.observe(node)
    }
  }

  function layerFor(root) {
    if (layers.has(root)) return layers.get(root).node
    const parent = root || document.body
    const previousPosition = root?.style.position
    const positionChanged = root && getComputedStyle(root).position === 'static'
    if (positionChanged) root.style.position = 'relative'
    const node = document.createElementNS(SVG_NS, 'svg')
    node.setAttribute('class', className)
    node.setAttribute('aria-hidden', 'true')
    node.setAttribute('data-lehr-ink', '')
    parent.append(node)
    layers.set(root, { node, previousPosition, positionChanged })
    observe(parent)
    return node
  }

  function offsetFor(stroke, origins) {
    if (!stroke.anchor || !stroke.anchorOrigin) return { x: 0, y: 0 }
    if (!origins.has(stroke.anchor)) origins.set(stroke.anchor, anchorOrigin(stroke.anchor, viewport(stroke.root)))
    const current = origins.get(stroke.anchor)
    return current ? { x: current.x - stroke.anchorOrigin.x, y: current.y - stroke.anchorOrigin.y } : null
  }

  function positionStroke(stroke, origins) {
    const offset = offsetFor(stroke, origins)
    stroke.node.style.display = offset ? '' : 'none'
    if (offset) {
      const transform = `translate(${offset.x} ${offset.y})`
      if (stroke.node.getAttribute('transform') !== transform) stroke.node.setAttribute('transform', transform)
    }
  }

  function paint() {
    frame = null
    const origins = new Map()
    if (refreshAll) {
      refreshAll = false
      for (const stroke of strokes) positionStroke(stroke, origins)
      if (drawing) drawing.view = viewport(drawing.view.root)
    }
    if (!drawing) return
    if (drawing.tool === 'eraser') {
      const points = drawing.points.splice(0)
      const remaining = strokes.filter(stroke => {
        if (stroke.root !== drawing.view.root) return true
        const offset = offsetFor(stroke, origins)
        return !offset || !points.some(point => strokeTouchesPoint(stroke, point, drawing.width / 2, offset))
      })
      if (remaining.length === strokes.length) return
      if (!drawing.changed) {
        history.push(strokes.slice())
        drawing.changed = true
        onHistoryChange(true)
      }
      const kept = new Set(remaining)
      for (const stroke of strokes) if (!kept.has(stroke)) stroke.node.remove()
      strokes = remaining
    } else {
      drawing.stroke.node.setAttribute('d', strokePath(drawing.stroke.points))
    }
  }

  function schedule(all = false) {
    refreshAll ||= all
    if (frame === null) frame = requestAnimationFrame(paint)
  }

  function flush() {
    if (frame !== null) cancelAnimationFrame(frame)
    paint()
  }

  function release() {
    if (!drawing) return
    const { target, pointerId } = drawing
    drawing = null
    if (target.hasPointerCapture?.(pointerId)) target.releasePointerCapture(pointerId)
  }

  function start(event, tool) {
    if (drawing) return
    const root = scrollRoot(event.target)
    const view = viewport(root)
    const point = pointFromEvent(event, view)
    drawing = { ...tool, pointerId: event.pointerId, target: event.target, view, points: [] }
    // Stop an existing native fling before placing the first ink point.
    const scroller = root || window
    scroller.scrollTo({ left: root ? root.scrollLeft : window.scrollX, top: root ? root.scrollTop : window.scrollY, behavior: 'instant' })
    try { event.target.setPointerCapture?.(event.pointerId) } catch { /* Synthetic input may have no active browser pointer. */ }
    if (tool.tool === 'eraser') drawing.points.push(point)
    else {
      const anchor = event.target.closest('[data-lehr-anchor], button, img, p, li, h1, h2, h3, h4, h5, h6')
      const node = document.createElementNS(SVG_NS, 'path')
      node.setAttribute('fill', 'none')
      node.setAttribute('stroke', tool.color)
      node.setAttribute('stroke-width', tool.width)
      node.setAttribute('stroke-opacity', tool.alpha)
      node.setAttribute('stroke-linecap', 'round')
      node.setAttribute('stroke-linejoin', 'round')
      const stroke = { ...tool, node, root, anchor, anchorOrigin: anchorOrigin(anchor, view), points: [point], bounds: { left: point.x, right: point.x, top: point.y, bottom: point.y } }
      layerFor(root).append(node)
      observe(anchor)
      history.push(strokes.slice())
      strokes.push(stroke)
      drawing.stroke = stroke
      positionStroke(stroke, new Map())
      onHistoryChange(true)
    }
    schedule()
  }

  function move(event) {
    if (drawing?.pointerId !== event.pointerId) return
    const coalesced = event.getCoalescedEvents?.()
    const events = coalesced?.length ? coalesced : [event]
    for (const sample of events) {
      const point = pointFromEvent(sample, drawing.view)
      if (drawing.tool === 'eraser') drawing.points.push(point)
      else {
        const { points, bounds } = drawing.stroke
        const previous = points[points.length - 1]
        if ((point.x - previous.x) ** 2 + (point.y - previous.y) ** 2 < 0.04) continue
        points.push(point)
        bounds.left = Math.min(bounds.left, point.x)
        bounds.right = Math.max(bounds.right, point.x)
        bounds.top = Math.min(bounds.top, point.y)
        bounds.bottom = Math.max(bounds.bottom, point.y)
      }
    }
    schedule()
  }

  function finish(event) {
    if (drawing?.pointerId !== event.pointerId) return
    if (event.type === 'pointerup') move(event)
    flush()
    release()
  }

  function clear() {
    release()
    for (const stroke of strokes) stroke.node.remove()
    strokes = []
    history = []
    onHistoryChange(false)
  }

  function undo() {
    flush()
    release()
    const previous = history.pop()
    if (!previous) return
    for (const stroke of strokes) stroke.node.remove()
    strokes = previous
    for (const stroke of strokes) layerFor(stroke.root).append(stroke.node)
    onHistoryChange(history.length > 0)
    schedule(true)
  }

  const refresh = () => schedule(true)
  const mutationObserver = new MutationObserver(records => {
    if (records.some(record => !record.target.closest?.('[data-lehr-ink]'))) refresh()
  })
  mutationObserver.observe(document.body, { childList: true, characterData: true, subtree: true })
  window.addEventListener('resize', refresh, { passive: true })
  document.addEventListener('load', refresh, { capture: true, passive: true })

  return {
    start, move, finish, clear, undo,
    get pointerId() { return drawing?.pointerId ?? null },
    dispose() {
      release()
      if (frame !== null) cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      mutationObserver.disconnect()
      window.removeEventListener('resize', refresh)
      document.removeEventListener('load', refresh, { capture: true })
      for (const [root, layer] of layers) {
        layer.node.remove()
        if (layer.positionChanged && root.style.position === 'relative') root.style.position = layer.previousPosition
      }
      layers.clear()
      strokes = []
      history = []
    },
  }
}
