export const XTB_INTERVALS = [5, 15, 30, 60, 240]
const COLORS = ['#8bb7ee', '#f1c975', '#53d6ae', '#fb8092', '#c5a3fd']
export const XTB_DRAWING_COLORS = COLORS

export function priceStepDigits(step, minimum = 2, maximum = 8) {
  const value = Math.abs(Number(step))
  if (!(value > 0) || !Number.isFinite(value)) return minimum
  let digits = Math.max(0, -Math.floor(Math.log10(value)))
  const scaled = value * 10 ** digits
  if (Math.abs(scaled - Math.round(scaled)) > 1e-8) digits++
  return Math.max(minimum, Math.min(maximum, digits))
}

export function priceValueDigits(value, minimum = 2, maximum = 8) {
  const absolute = Math.abs(Number(value))
  if (!(absolute > 0) || !Number.isFinite(absolute) || absolute >= 1) return minimum
  return Math.max(minimum, Math.min(maximum, 3 - Math.floor(Math.log10(absolute))))
}

export function candleDirection(row) {
  if (![row?.open,row?.high,row?.low,row?.close].every(Number.isFinite)) return 'unknown'
  return row.close >= row.open ? 'up' : 'down'
}

export function chartViewport(length, visibleCount, offset = 0, futureSlots = 30) {
  const total = Math.max(0, Math.floor(Number(length) || 0))
  const count = Math.max(1, Math.floor(Number(visibleCount) || 1))
  const visible = Math.min(total, count)
  const maximumOffset = Math.max(0, total - visible)
  const viewportOffset = Math.max(0, Math.min(Math.floor(Number(offset) || 0), maximumOffset))
  const start = Math.max(0, total - visible - viewportOffset)
  const slots = Math.max(2, visible + Math.max(0, Math.floor(Number(futureSlots) || 0)))
  const end = Math.min(total, start + slots)
  return {
    viewportOffset,
    start,
    end,
    slots,
  }
}

export function anchoredOffset(total, count, index, fraction, futureSlots = 30) {
  const latest = chartViewport(total, count, 0, futureSlots)
  const start = Math.round(index - fraction * (latest.slots - 1))
  return Math.max(0, Math.min(latest.start, latest.start - start))
}

// The tail is a time ruler only. It never supplies prices or indicator samples.
export function chartTimes(rows, interval, futureSlots = 30) {
  const times = rows.map(row => Date.parse(row.date))
  if (!times.length) return times
  const date = new Date(times.at(-1))
  for (let i = 0; i < futureSlots; i++) {
    if (interval === '1mo') date.setUTCMonth(date.getUTCMonth() + 1, 1)
    else if (interval === '1w') date.setUTCDate(date.getUTCDate() + 7)
    else if (interval === '1d') {
      do { date.setUTCDate(date.getUTCDate() + 1) } while ([0,6].includes(date.getUTCDay()))
    } else date.setTime(date.getTime() + interval * 60000)
    times.push(date.getTime())
  }
  return times
}

export function timeIndex(times, stamp) {
  if (!times.length || !Number.isFinite(stamp)) return 0
  let lo = 0, hi = times.length - 1
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2)
    if (times[mid] < stamp) lo = mid + 1
    else hi = mid
  }
  if (stamp < times[0]) return -1
  if (stamp > times.at(-1)) return times.length
  if (!lo || times[lo] === stamp) return lo
  return lo - 1 + (stamp - times[lo - 1]) / (times[lo] - times[lo - 1])
}

export function xtbBars(rows, minutes, now = Date.now()) {
  const buckets = new Map()
  const duration = minutes * 60000
  const baseDuration = (minutes === 5 ? 5 : 15) * 60000
  for (const row of rows || []) {
    const time = Date.parse(row.date)
    if (!Number.isFinite(time)) continue
    const bucket = Math.floor(time / duration) * duration
    if (bucket + duration > now) continue
    const prior = buckets.get(bucket)
    if (!prior) {
      if (time !== bucket) continue
      buckets.set(bucket, { ...row, date:new Date(bucket).toISOString(), count:1, last:time })
    } else if (time === prior.last + baseDuration) {
      prior.high = Math.max(prior.high,row.high)
      prior.low = Math.min(prior.low,row.low)
      prior.close = row.close
      prior.volume = (prior.volume || 0) + (row.volume || 0)
      prior.count++
      prior.last=time
    }
  }
  return [...buckets.values()].filter(row=>row.count===duration/baseDuration)
}

export function normalizeXtbDrawings(input) {
  const ids = new Set()
  const result = []
  if (!Array.isArray(input)) return result
  for (const item of input.slice(0,300)) {
    if (!/^[a-zA-Z0-9_-]{1,80}$/.test(item?.id || '') || ids.has(item.id) ||
      !/^(?:[A-Z0-9._=-]{1,35}|TR:[A-Z0-9._=-]{1,90})$/.test(item.symbol || '') ||
      !['shared','self','fatemeh','mobin','mobina'].includes(item.scope) ||
      !['horizontal','trend','freehand','arrow','vertical','ray','rectangle','fib','ellipse'].includes(item.type) || !Array.isArray(item.points)) continue
    const points = item.points.slice(0,120)
    const minimum = ['horizontal','vertical','ray'].includes(item.type)?1:2
    if (points.length<minimum || points.some(p=>typeof p?.date!=='string'||p.date.length>32||!Number.isFinite(Date.parse(p.date))||!Number.isFinite(p.price)||p.price<=0||p.price>1e9)) continue
    ids.add(item.id)
    result.push({id:item.id,symbol:item.symbol,scope:item.scope,type:item.type,color:COLORS.includes(item.color)?item.color:COLORS[0],points:points.map(({date,price})=>({date,price}))})
  }
  return result
}
