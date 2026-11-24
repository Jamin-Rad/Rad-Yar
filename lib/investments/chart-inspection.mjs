// All measurements use the bars actually available in the selected timeframe.
export function visiblePriceDomain(low, high) {
  if (!Number.isFinite(low) || !Number.isFinite(high) || high < low) return [0, 1]
  const spread = high - low
  const padding = spread > 0 ? spread * .12 : Math.max(Math.abs(low) * .001, 1e-8)
  return [Math.max(0, low - padding), high + padding]
}

export function priceChange(from, to) {
  if (!Number.isFinite(from) || !Number.isFinite(to) || from <= 0) return null
  return { amount: to - from, percent: (to - from) / from * 100 }
}

export function relativeVolume(rows, index, period = 20) {
  const current = rows[index]?.volume
  if (index < period || !Number.isFinite(current) || current < 0) return null
  let total = 0
  for (let i = index - period; i < index; i++) {
    const volume = rows[i].volume
    if (!Number.isFinite(volume) || volume < 0) return null
    total += volume
  }
  return total > 0 ? current / (total / period) : null
}

export function viewStatistics(rows) {
  if (!rows.length) return null
  const hasRange = rows.every(row => Number.isFinite(row.low) && Number.isFinite(row.high))
  let low = Infinity, high = -Infinity
  for (const row of rows) {
    low = Math.min(low, hasRange ? row.low : row.close)
    high = Math.max(high, hasRange ? row.high : row.close)
  }
  return { count:rows.length, low, high, hasRange, change:priceChange(rows[0].close, rows.at(-1).close) }
}

// Keep both extrema of each bucket in chronological order. The navigator stays
// bounded even with tens of thousands of archived candles.
export function overviewTrace(rows, buckets = 240) {
  if (!rows.length) return ''
  let low = Infinity, high = -Infinity
  for (const {close} of rows) { low = Math.min(low, close); high = Math.max(high, close) }
  const stride = Math.max(1, Math.ceil(rows.length / buckets))
  const points = [0]
  for (let start = 0; start < rows.length; start += stride) {
    let min = start, max = start
    for (let i = start + 1; i < Math.min(start + stride, rows.length); i++) {
      if (rows[i].close < rows[min].close) min = i
      if (rows[i].close > rows[max].close) max = i
    }
    for (const index of [Math.min(min,max), Math.max(min,max)]) {
      if (points.at(-1) !== index) points.push(index)
    }
  }
  if (points.at(-1) !== rows.length - 1) points.push(rows.length - 1)
  return points.map((index, i) => {
    const x = 1000 * index / Math.max(1, rows.length - 1)
    const y = high === low ? 20 : 36 - 32 * (rows[index].close - low) / (high - low)
    return (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1)
  }).join(' ')
}

export function chartFeedQuery(reference, frame) {
  const params = new URLSearchParams({symbol:reference, refresh:'1', chart:'1'})
  if (typeof frame === 'number') params.set('interval', frame === 5 ? '5m' : '15m')
  else params.set('history', '1')
  return '/api/andarun/investments/market?' + params
}
