// Daily close indicators. Compute on the full history before clipping the viewport.
export function normalizeDailyHistory(history, now = Date.now()) {
  const today = new Date(now).toISOString().slice(0,10)
  const dates = new Map()
  for (const row of history || []) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(row.date) || row.date >= today || !Number.isFinite(row.close) || row.close <= 0) continue
    const timestamp = Date.parse(row.date+'T00:00:00Z')
    if (!Number.isFinite(timestamp) || new Date(timestamp).toISOString().slice(0,10) !== row.date) continue
    dates.set(row.date, { ...row })
  }
  return [...dates.values()].sort((a,b) => a.date.localeCompare(b.date))
}
export function sma(values, period) {
  const output = Array(values.length).fill(null)
  let sum = 0
  for (let i=0;i<values.length;i++) {
    sum += values[i]
    if (i>=period) sum -= values[i-period]
    if (i>=period-1) output[i]=sum/period
  }
  return output
}
export function ema(values, period) {
  const output = Array(values.length).fill(null)
  if (values.length < period) return output
  let value = values.slice(0,period).reduce((sum,n)=>sum+n,0)/period
  output[period-1]=value
  const alpha=2/(period+1)
  for(let i=period;i<values.length;i++) { value += alpha*(values[i]-value);output[i]=value }
  return output
}
export function rsi(values, period=14) {
  const output=Array(values.length).fill(null)
  if(values.length<=period)return output
  let gain=0,loss=0
  for(let i=1;i<=period;i++){const delta=values[i]-values[i-1];gain+=Math.max(0,delta)/period;loss+=Math.max(0,-delta)/period}
  // A flat window is neutral, rather than an invented overbought reading.
  const reading=()=>gain===0&&loss===0?50:loss===0?100:100-100/(1+gain/loss)
  output[period]=reading()
  for(let i=period+1;i<values.length;i++) {
    const delta=values[i]-values[i-1]
    gain=(gain*(period-1)+Math.max(0,delta))/period
    loss=(loss*(period-1)+Math.max(0,-delta))/period
    output[i]=reading()
  }
  return output
}
export function technicalHistory(history, now=Date.now()) {
  const rows=normalizeDailyHistory(history,now),closes=rows.map(row=>row.close)
  const averages={sma20:sma(closes,20),sma50:sma(closes,50),sma200:sma(closes,200),ema20:ema(closes,20)}
  const strength=rsi(closes),fast=ema(closes,12),slow=ema(closes,26)
  const macd=closes.map((_,i)=>slow[i]==null?null:fast[i]-slow[i])
  const firstMacd=macd.findIndex(n=>n!=null)
  const signal=firstMacd<0?[]:ema(macd.slice(firstMacd),9)
  return rows.map((row,i)=>{
    const mean=averages.sma20[i]
    const deviation=mean==null?null:Math.sqrt(closes.slice(i-19,i+1).reduce((sum,n)=>sum+(n-mean)**2,0)/20)
    const macdSignal=firstMacd<0?null:signal[i-firstMacd]??null
    return {...row,...Object.fromEntries(Object.entries(averages).map(([key,series])=>[key,series[i]])),rsi:strength[i],macd:macd[i],signal:macdSignal,histogram:macdSignal==null?null:macd[i]-macdSignal,bbUpper:mean==null?null:mean+2*deviation,bbLower:mean==null?null:mean-2*deviation}
  })
}
