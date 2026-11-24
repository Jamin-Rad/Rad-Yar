import { memo } from 'react'
import { candleDirection } from '@/lib/investments/xtb-chart.mjs'

// Cursor motion updates its own overlay. Candles, volume and study paths only
// change when the data, enabled studies or plot geometry change.
export function seriesPath(rows, key, x, scale) {
  let started = false
  return rows.map((row,i)=>{
    if (!Number.isFinite(row[key])) { started=false; return '' }
    const command=started?'L':'M'
    started=true
    return command+x(i)+','+scale(row[key])
  }).join(' ')
}

function ChartPriceSeries({rows, start, x, y, bottom, candleWidth, gradient, averages, indicators, vwap}) {
  const maxVolume=Math.max(1,...rows.map(row=>row.volume||0))
  return <>
    {rows.map((bar,i)=>{
      const direction=candleDirection(bar)
      const color=direction==='up'?'#64cba5':direction==='down'?'#ea8290':'#aabfb6'
      const volume=(bar.volume||0)/maxVolume*29
      const px=x(i)
      return <g key={bar.date}>
        <rect x={px-candleWidth/2} y={bottom-volume} width={candleWidth} height={volume} fill={color} opacity=".22"/>
        {direction==='unknown' ? <circle cx={px} cy={y(bar.close)} r="2" fill={color}/> : <>
          <line x1={px} x2={px} y1={y(bar.high)} y2={y(bar.low)} stroke={color}/>
          <rect x={px-candleWidth/2} y={Math.min(y(bar.open),y(bar.close))} width={candleWidth} height={Math.max(1,Math.abs(y(bar.close)-y(bar.open)))} fill={`url(#${gradient}-${direction})`}/>
        </>}
      </g>
    })}
    {indicators.vwap&&<path d={rows.map((row,i)=>{
      const value=vwap[start+i]
      if (value==null) return ''
      const reset=i===0 || vwap[start+i-1]==null || (row.date.includes('T') && row.date.slice(0,10)!==rows[i-1].date.slice(0,10))
      return (reset?'M':'L')+x(i)+','+y(value)
    }).join(' ')} fill="none" stroke="#c897c6" strokeWidth="1.35"/>}
    {indicators.bands&&['bbUpper','bbLower'].map(key=><path key={key} d={seriesPath(rows,key,x,y)} fill="none" stroke="#8198cc" strokeDasharray="3 3"/>)}
    {averages.map(([key,,color])=><path key={key} d={seriesPath(rows,key,x,y)} fill="none" stroke={color} strokeWidth="1.35"/>)}
  </>
}
export default memo(ChartPriceSeries)

export const RsiTrace = memo(function RsiTrace({rows,x,height,left,right}) {
  const scale=value=>height-8-value*(height-16)/100
  return <>
    <rect x={left} y={scale(70)} width={Math.max(0,right-left)} height={scale(30)-scale(70)} fill="#82c5ad" fillOpacity=".045"/>
    {[30,70].map(level=><line key={level} x1={left} x2={right} y1={scale(level)} y2={scale(level)} stroke="#52685e" strokeDasharray="3 5"/>)}
    <path d={seriesPath(rows,'rsi',x,scale)} fill="none" stroke="#9bcdb9" strokeWidth="1.6"/>
  </>
})

export const MacdTrace = memo(function MacdTrace({rows,x,left,right,width}) {
  const extent=Math.max(.00000001,...rows.flatMap(row=>[row.macd,row.signal,row.histogram]).filter(Number.isFinite).map(Math.abs))
  const scale=value=>50-value/extent*42
  return <>
    <line x1={left} x2={right} y1="50" y2="50" stroke="#42594e"/>
    {rows.map((row,i)=>Number.isFinite(row.histogram)&&<rect key={row.date} x={x(i)-width/2} y={Math.min(50,scale(row.histogram))} width={width} height={Math.abs(scale(row.histogram)-50)} fill={row.histogram>=0?'#51997d':'#b66e78'}/>)}
    <path d={seriesPath(rows,'macd',x,scale)} fill="none" stroke="#90b5da" strokeWidth="1.45" vectorEffect="non-scaling-stroke"/>
    <path d={seriesPath(rows,'signal',x,scale)} fill="none" stroke="#d8ba83" strokeWidth="1.45" vectorEffect="non-scaling-stroke"/>
  </>
})
