export function vwap(rows, intraday) {
  let session = null, total = 0, volume = 0
  return rows.map(row => {
    const day = row.date.slice(0, 10)
    if (intraday && session !== day) { total = 0; volume = 0; session = day }
    if (![row.high, row.low, row.close, row.volume].every(Number.isFinite) || row.volume <= 0) return null
    total += (row.high + row.low + row.close) / 3 * row.volume
    volume += row.volume
    return total / volume
  })
}

export function atr(rows, period = 14) {
  const values = Array(rows.length).fill(null)
  let sum = 0, previous = null, count = 0
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i], close = rows[i - 1]?.close ?? row.close
    if (![row.high, row.low, close].every(Number.isFinite)) {
      sum = 0; previous = null; count = 0
      continue
    }
    const range = Math.max(row.high - row.low, Math.abs(row.high - close), Math.abs(row.low - close))
    count++
    if (previous == null) {
      sum += range
      if (count === period) previous = sum / period
    } else previous = (previous * (period - 1) + range) / period
    values[i] = previous
  }
  return values
}

export function aggregateDaily(rows, interval) {
  if (interval === '1d') return rows || []
  const groups = new Map()
  for (const row of rows || []) {
    const date = new Date(row.date)
    if (!Number.isFinite(date.getTime())) continue
    if (interval === '1w') date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 6) % 7)
    else date.setUTCDate(1)
    const key = date.toISOString().slice(0, 10)
    const previous = groups.get(key)
    if (!previous) groups.set(key, { ...row, date: key })
    else {
      previous.high = Math.max(previous.high ?? previous.close, row.high ?? row.close)
      previous.low = Math.min(previous.low ?? previous.close, row.low ?? row.close)
      previous.close = row.close
      previous.volume = (previous.volume || 0) + (row.volume || 0)
    }
  }
  return [...groups.values()]
}

// Three following bars confirm each pivot. Detection uses no future bars beyond that confirmation.
export function rsiDivergences(rows) {
  const results = []
  for (const side of ['low', 'high']) {
    let previous = null
    for (let i = 3; i < rows.length - 3; i++) {
      const bar = rows[i]
      if (!Number.isFinite(bar[side]) || !Number.isFinite(bar.rsi)) continue
      const neighbors = rows.slice(i - 3, i + 4).filter((_, index) => index !== 3)
      const pivot = neighbors.every(other => side === 'low' ? bar[side] < other[side] : bar[side] > other[side])
      if (!pivot) continue
      if (previous != null && i - previous >= 5 && i - previous <= 60) {
        const first = rows[previous]
        const bullish = side === 'low' && bar.low < first.low && bar.rsi > first.rsi + 3 && Math.min(bar.rsi, first.rsi) < 35
        const bearish = side === 'high' && bar.high > first.high && bar.rsi < first.rsi - 3 && Math.max(bar.rsi, first.rsi) > 65
        if (bullish || bearish) results.push({ id: `${side}-${bar.date}`, from: first, to: bar, side, bullish, confirmedAt: rows[i + 3].date })
      }
      previous = i
    }
  }
  return results
}
