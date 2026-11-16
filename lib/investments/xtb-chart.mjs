export const XTB_INTERVALS = [5, 15, 30, 60, 240]
const COLORS = ['#8bb7ee', '#f1c975', '#53d6ae', '#fb8092', '#c5a3fd']
export const XTB_DRAWING_COLORS = COLORS

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
      !/^[A-Z0-9._=-]{1,35}$/.test(item.symbol || '') || !['shared','self','fatemeh'].includes(item.scope) ||
      !['horizontal','trend','freehand','arrow'].includes(item.type) || !Array.isArray(item.points)) continue
    const points = item.points.slice(0,120)
    const minimum = item.type==='horizontal'?1:2
    if (points.length<minimum || points.some(p=>typeof p?.date!=='string'||p.date.length>32||!Number.isFinite(Date.parse(p.date))||!Number.isFinite(p.price)||p.price<=0||p.price>1e9)) continue
    ids.add(item.id)
    result.push({id:item.id,symbol:item.symbol,scope:item.scope,type:item.type,color:COLORS.includes(item.color)?item.color:COLORS[0],points:points.map(({date,price})=>({date,price}))})
  }
  return result
}
