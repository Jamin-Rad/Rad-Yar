const TAU = Math.PI * 2
const geometry = { cx: 160, cy: 124, rx: 126, ry: 91, innerRx: 78, innerRy: 56, depth: 20 }

const point = (rx, ry, angle, depth = 0) => [
  geometry.cx + rx * Math.cos(angle),
  geometry.cy + ry * Math.sin(angle) + depth,
].map(value => Number(value.toFixed(3))).join(' ')

function arc(rx, ry, start, end, reverse = false, depth = 0) {
  return `A ${rx} ${ry} 0 ${end - start > Math.PI ? 1 : 0} ${reverse ? 0 : 1} ${point(rx, ry, reverse ? start : end, depth)}`
}

function wall(rx, ry, start, end) {
  return `M ${point(rx, ry, start)} ${arc(rx, ry, start, end)} L ${point(rx, ry, end, geometry.depth)} ${arc(rx, ry, start, end, true, geometry.depth)} Z`
}

function visibleWalls(rx, ry, start, end, half) {
  const result = []
  for (let turn = -1; turn <= 1; turn++) {
    const from = Math.max(start, turn * TAU + half * Math.PI)
    const to = Math.min(end, turn * TAU + (half + 1) * Math.PI)
    if (to > from) result.push(wall(rx, ry, from, to))
  }
  return result
}

// Shares and arcs use positive, net category totals. Refund-only categories stay
// in the expense ledger, but never become misleading negative chart slices.
export function buildExpenseDonut(breakdown) {
  const positive = breakdown.filter(([, amount]) => Number.isFinite(amount) && amount > 0)
  const total = positive.reduce((sum, [, amount]) => sum + amount, 0)
  let offset = -Math.PI / 2
  return positive.map(([name, amount]) => {
    const share = amount / total * 100
    const sweep = amount / total * TAU
    const gap = Math.min(0.018, sweep * 0.08)
    const start = offset + gap / 2
    const end = offset + sweep - gap / 2
    offset += sweep
    const { rx, ry, innerRx, innerRy, depth } = geometry
    const top = `M ${point(rx, ry, start)} ${arc(rx, ry, start, end)} L ${point(innerRx, innerRy, end)} ${arc(innerRx, innerRy, start, end, true)} Z`
    const edges = [start, end].map(angle => `M ${point(rx, ry, angle)} L ${point(innerRx, innerRy, angle)} L ${point(innerRx, innerRy, angle, depth)} L ${point(rx, ry, angle, depth)} Z`)
    return { name, share, top, edges, outer: visibleWalls(rx, ry, start, end, 0), inner: visibleWalls(innerRx, innerRy, start, end, 1) }
  })
}

const percentFormatter = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 })
export function formatExpenseShare(share) {
  return share > 0 && share < 0.1 ? '< 0,1 %' : `${percentFormatter.format(share)} %`
}
