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

function pricePivots(rows) {
  const pivots=[]
  for (let index=2;index<rows.length-2;index++) {
    const neighbors=rows.slice(index-2,index+3).filter((_,i)=>i!==2)
    if (![rows[index],...neighbors].every(row=>Number.isFinite(row.high)&&Number.isFinite(row.low)&&Number.isFinite(row.close))) continue
    const high=rows[index].high,low=rows[index].low
    const top=Number.isFinite(high)&&neighbors.every(row=>row.high<=high)&&neighbors.some(row=>row.high<high)
    const bottom=Number.isFinite(low)&&neighbors.every(row=>row.low>=low)&&neighbors.some(row=>row.low>low)
    if (top===bottom) continue
    const pivot={index,price:top?high:low,top}
    const previous=pivots.at(-1)
    if (!previous||previous.top!==top) pivots.push(pivot)
    else if (top?high>previous.price:low<previous.price) pivots[pivots.length-1]=pivot
  }
  return pivots
}

function patternShape(points,rows) {
  const highs=points.filter(point=>point.top),lows=points.filter(point=>!point.top)
  const start=points[0].index,end=points.at(-1).index
  const span=end-start
  if (span<5||span>100) return null
  if (rows.slice(start,end+1).some(row=>![row.high,row.low,row.close].every(Number.isFinite))) return null
  const gap=Math.max(...highs.map(p=>p.price))-Math.min(...lows.map(p=>p.price))
  if (gap<=0 || gap < rows[start].close*.002) return null
  const fit=list=>{
    const first=list[0],last=list.at(-1)
    const slope=list.length===1?0:(last.price-first.price)/(last.index-first.index)
    return index=>first.price+slope*(index-first.index)
  }
  const upper=fit(highs),lower=fit(lows)
  const flat=list=>Math.max(...list.map(p=>p.price))-Math.min(...list.map(p=>p.price))<=gap*.20
  const reversal=points[0].top
  const outer=reversal?highs:lows, inner=reversal?lows:highs
  if (points.length===3 || points.length===5) {
    const lead=rows.slice(Math.max(0,start-Math.min(span,24)),start).map(row=>row.close)
    const prior=reversal?Math.min(...lead):Math.max(...lead)
    const approach=(points[0].price-prior)*(reversal?1:-1)
    const swings=points.slice(1).map((point,i)=>Math.abs(point.price-points[i].price))
    const left=points[points.length===5?2:1].index-start
    const right=span-left
    if (approach<gap*.25 || Math.min(...swings)<gap*.32 || Math.max(left,right)>Math.min(left,right)*3) return null
  }
  if (points.length===3 && flat(outer)) {
    return {name:reversal?'سقف دوقلو':'کف دوقلو',upper,lower,direction:reversal?'down':'up'}
  }
  if (points.length===5) {
    const [first,head,last]=outer
    const prominence=reversal?head.price-Math.max(first.price,last.price):Math.min(first.price,last.price)-head.price
    if (Math.abs(first.price-last.price)<gap*.25&&prominence>gap*.18)
      return {name:reversal?'سر و شانه':'سر و شانهٔ معکوس',upper,lower,direction:reversal?'down':'up'}
    if (flat(outer)&&flat(inner))
      return {name:reversal?'سقف سه‌قلو':'کف سه‌قلو',upper,lower,direction:reversal?'down':'up'}
    return null
  }
  if (points.length!==6||points.some(point=>Math.abs(point.price-(point.top?upper:lower)(point.index))>gap*.21)) return null
  const upperMove=upper(end)-upper(start),lowerMove=lower(end)-lower(start)
  const initialGap=upper(start)-lower(start),finalGap=upper(end)-lower(end)
  if (initialGap<=0||finalGap<=0) return null
  const converging=finalGap<initialGap*.83, expanding=finalGap>initialGap*1.18
  const up=gap*.12
  const poleStart=Math.max(0,start-Math.min(24,span))
  const before=rows[poleStart].close
  const impulse=rows[start].close-before
  const pole=Math.abs(impulse)>gap*1.65 && span<=36
  let name
  if (converging&&Math.abs(upperMove)<=up&&lowerMove>up) name='مثلث صعودی'
  else if (converging&&Math.abs(lowerMove)<=up&&upperMove<-up) name='مثلث نزولی'
  else if (converging&&upperMove<-up&&lowerMove>up) name=pole?'پرچم سه‌گوش':'مثلث متقارن'
  else if (converging&&upperMove>up&&lowerMove>up) name='گوهٔ صعودی'
  else if (converging&&upperMove<-up&&lowerMove<-up) name='گوهٔ نزولی'
  else if (expanding) name=upperMove>up&&lowerMove<-up?'مثلث بازشوندهٔ متقارن':'الگوی بازشونده'
  else if (pole && Math.abs(upperMove-lowerMove)<=gap*.22 && Math.sign(upperMove)===-Math.sign(impulse) && Math.sign(lowerMove)===-Math.sign(impulse)) name=impulse>0?'پرچم صعودی':'پرچم نزولی'
  if (!name) return null
  const tolerance=gap*.12
  for (let index=start;index<=end;index++) {
    if (!Number.isFinite(rows[index].close) || rows[index].close>upper(index)+tolerance || rows[index].close<lower(index)-tolerance) return null
  }
  return {name,upper,lower,poleStart:name.startsWith('پرچم')?poleStart:null}
}

export function pricePatterns(rows) {
  const pivots=pricePivots(rows), found=[]
  for (let i=2;i<pivots.length;i++) {
    for (const count of [6,5,3]) {
      if (i+1<count) continue
      const points=pivots.slice(i+1-count,i+1)
      const shape=patternShape(points,rows)
      if (!shape) continue
      const start=points[0].index, lastPivot=points.at(-1).index
      const confirmed=lastPivot+2
      const tolerance=Math.abs(shape.upper(lastPivot)-shape.lower(lastPivot))*.06
      const outer=points.filter(point=>point.top===(shape.direction==='down')).map(point=>point.price)
      const invalidation=shape.direction==='down'?Math.max(...outer):Math.min(...outer)
      let end=lastPivot, breakout=null,invalid=false
      for (let index=lastPivot+1;index<Math.min(rows.length,confirmed+24);index++) {
        if (!shape.direction && shape.upper(index)<=shape.lower(index)) break
        end=index
        const close=rows[index].close
        if (!Number.isFinite(close)) break
        if (shape.direction && (shape.direction==='down' ? close>invalidation+tolerance : close<invalidation-tolerance)) {
          invalid=true
          break
        }
        if (shape.direction!=='down' && close>shape.upper(index)+tolerance) breakout='up'
        if (shape.direction!=='up' && close<shape.lower(index)-tolerance) breakout='down'
        if (breakout) break
      }
      if (invalid) continue
      const boundary = (top, line) => {
        const first=points.find(point=>point.top===top).index
        return [{index:first,price:line(first)}, {index:end,price:line(end)}]
      }
      const boundaries=shape.direction
        ? [shape.direction==='down'?boundary(false,shape.lower):boundary(true,shape.upper)]
        : [boundary(true,shape.upper),boundary(false,shape.lower)]
      const pole=shape.poleStart!=null ? {index:shape.poleStart,price:rows[shape.poleStart].close} : null
      const pattern={name:shape.name,start,end,confirmed,breakout,pivotCount:count,
        upper:[shape.upper(start),shape.upper(end)],lower:[shape.lower(start),shape.lower(end)],
        points,boundaries,pole}
      found.push(pattern)
    }
  }
  const preferred=[]
  for (const pattern of [...found].sort((a,b)=>b.pivotCount-a.pivotCount||b.confirmed-a.confirmed)) {
    const duplicate=preferred.some(other=>{
      const overlap=Math.min(other.end,pattern.end)-Math.max(other.start,pattern.start)
      const combined=Math.max(other.end,pattern.end)-Math.min(other.start,pattern.start)
      return other.name===pattern.name&&overlap>combined*.7
    })
    if (!duplicate) preferred.push(pattern)
  }
  return preferred.sort((a,b)=>a.confirmed-b.confirmed)
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
    if (!previous) groups.set(key, { ...row, date: key, lastSession: row.date })
    else {
      previous.high = Number.isFinite(previous.high) && Number.isFinite(row.high) ? Math.max(previous.high, row.high) : null
      previous.low = Number.isFinite(previous.low) && Number.isFinite(row.low) ? Math.min(previous.low, row.low) : null
      previous.close = row.close
      previous.lastSession = row.date
      previous.volume = Number.isFinite(previous.volume) && Number.isFinite(row.volume) ? previous.volume + row.volume : null
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
      const pivot = neighbors.every(other => Number.isFinite(other[side]) && (side === 'low' ? bar[side] < other[side] : bar[side] > other[side]))
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
