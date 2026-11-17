export function tradeSpans(events, direction = 1) {
  const lots = [], spans = []
  for (const event of events) {
    let remaining = Math.abs(Number(event.quantity))
    if (!Number.isFinite(remaining) || remaining <= 0) continue
    if (event.kind === 'entry') {
      lots.push({ ...event, remaining })
      continue
    }
    for (const lot of lots) {
      if (remaining <= 1e-10) break
      const quantity = Math.min(lot.remaining, remaining)
      if (quantity <= 0) continue
      lot.remaining -= quantity
      remaining -= quantity
      spans.push({ id: lot.id + ':' + event.id, entry: lot, exit: event, quantity, direction })
    }
    if (remaining > 1e-10) spans.push({id:event.id, entry:null, exit:event, quantity:remaining, direction})
  }
  return spans.concat(lots.filter(lot=>lot.remaining>1e-10).map(lot=>({id:lot.id, entry:lot, exit:null, quantity:lot.remaining, direction})))
}

export function trianglePatterns(rows) {
  const highs = [], lows = [], found = []
  for (let index = 2; index < rows.length - 2; index++) {
    const row = rows[index]
    const neighbors = [rows[index-2],rows[index-1],rows[index+1],rows[index+2]]
    if (Number.isFinite(row.high) && neighbors.every(bar=>Number.isFinite(bar.high)&&bar.high<row.high)) highs.push({index,price:row.high})
    if (Number.isFinite(row.low) && neighbors.every(bar=>Number.isFinite(bar.low)&&bar.low>row.low)) lows.push({index,price:row.low})
    const peaks=highs.slice(-3), troughs=lows.slice(-3)
    if (peaks.length<3 || troughs.length<3 || Math.max(peaks[2].index,troughs[2].index)!==index) continue
    const pivots=[...peaks.map(p=>({...p,side:1})),...troughs.map(p=>({...p,side:-1}))].sort((a,b)=>a.index-b.index)
    const start=pivots[0].index
    if (index-start>72 || index-start<10 || pivots.some((p,i)=>i>0&&(p.side===pivots[i-1].side||p.index===pivots[i-1].index))) continue
    const resistance=peaks.reduce((sum,p)=>sum+p.price,0)/3
    const support=troughs.reduce((sum,p)=>sum+p.price,0)/3
    const gap=peaks[0].price-troughs[0].price
    if (gap<=0) continue
    const tolerance=gap*.12
    const rising=troughs.every((p,i)=>!i||p.price>troughs[i-1].price) && troughs[2].price-troughs[0].price>gap*.2
    const falling=peaks.every((p,i)=>!i||p.price<peaks[i-1].price) && peaks[0].price-peaks[2].price>gap*.2
    const ascending=rising&&peaks.every(p=>Math.abs(p.price-resistance)<=tolerance)
    const descending=falling&&troughs.every(p=>Math.abs(p.price-support)<=tolerance)
    if (!ascending&&!descending) continue
    const sloped=ascending?troughs:peaks
    const slope=(sloped[2].price-sloped[0].price)/(sloped[2].index-sloped[0].index)
    if (Math.abs(sloped[1].price-sloped[0].price-slope*(sloped[1].index-sloped[0].index))>tolerance) continue
    const at=i=>sloped[0].price+slope*(i-sloped[0].index)
    const upper=i=>ascending?resistance:at(i)
    const lower=i=>ascending?at(i):support
    const confirmed=index+2
    if (upper(confirmed)<=lower(confirmed) || rows.slice(start,confirmed).some((bar,i)=>bar.close>upper(start+i)+tolerance||bar.close<lower(start+i)-tolerance)) continue
    let end=confirmed, breakout=null
    for (let i=confirmed;i<Math.min(rows.length,confirmed+30)&&upper(i)>lower(i);i++) {
      end=i
      if (rows[i].close>upper(i)+tolerance || rows[i].close<lower(i)-tolerance) {
        breakout=rows[i].close>upper(i)?'up':'down'
        break
      }
    }
    const pattern={ start,end,confirmed,ascending,breakout,upper:[upper(start),upper(end)],lower:[lower(start),lower(end)] }
    const previous=found.at(-1)
    if (previous && previous.ascending===ascending && previous.end>=start) found[found.length-1]=pattern
    else found.push(pattern)
  }
  return found
}

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
