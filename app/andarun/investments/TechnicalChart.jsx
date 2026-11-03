'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { technicalHistory } from '@/lib/investments/indicators.mjs'
import { number } from '@/lib/investments/portfolio.mjs'
import styles from './TechnicalChart.module.css'

const LEFT=12
const format=new Intl.NumberFormat('de-DE',{maximumFractionDigits:2})
const display=value=>value==null?'—':format.format(value)
const OPTIONS=[['sma20','SMA 20','#e9bc62'],['sma50','SMA 50','#79a8ff'],['sma200','SMA 200','#d89bf5'],['ema20','EMA 20','#f28f8f'],['bb','Bollinger 20,2','#8dabb7'],['rsi','RSI 14','#b8a0fa'],['macd','MACD 12,26,9','#76c8e0'],['volume','حجم معاملات','#689693']]
function path(rows,key,x,y){let connected=false;return rows.map((row,i)=>{if(row[key]==null){connected=false;return ''}const move=connected?'L':'M';connected=true;return `${move}${x(i).toFixed(2)},${y(row[key]).toFixed(2)}`}).join(' ')}
function extent(values){const min=Math.min(...values),max=Math.max(...values),pad=(max-min)*.08||Math.abs(max)*.01||1;return [min-pad,max+pad]}
function Series({rows,series,x,y}){return series.map(([key,color])=><path key={key} d={path(rows,key,x,y)} stroke={color} strokeWidth={key==='close'?2:1.5} fill="none" vectorEffect="non-scaling-stroke"/>)}
function Axis({min,max,y,right}){return [0,.5,1].map(step=>{const value=min+(max-min)*step;return <g key={step}><line x1={LEFT} x2={right} y1={y(value)} y2={y(value)} stroke="#2e3b47"/><text x={right+10} y={y(value)+4} fontSize="12" fill="#aab8c7">{display(value)}</text></g>})}
function Cursor({x,height}){return <line x1={x} x2={x} y1="8" y2={height-22} stroke="#adbdcb" strokeDasharray="3 4" opacity=".65"/>}

export default function TechnicalChart({ market, loading=false, error='' }) {
  const chartRef=useRef(null)
  const [width,setWidth]=useState(900),[dataOpen,setDataOpen]=useState(false)
  const right=width-78
  const [days,setDays]=useState(90),[enabled,setEnabled]=useState({sma20:true,sma50:true,sma200:true,rsi:true}),[hover,setHover]=useState(null),[mode,setMode]=useState('candles')
  const verified=!market?.identity?.isin || market.historyMeta?.verified && market.historyMeta.idNotation===market.quote.idNotation && market.historyMeta.currency===market.quote.currency
  const all=useMemo(()=>technicalHistory(verified?market?.history:[]),[verified,market?.history])
  const end=all.at(-1)?.date
  const rows=useMemo(()=>all.filter(row=>!days||Date.parse(row.date)>=Date.parse(end)-days*86400000),[all,days,end])
  const ready=rows.length>=2
  useEffect(()=>{
    if(!ready||!chartRef.current)return
    const observer=new ResizeObserver(([entry])=>setWidth(Math.max(280,Math.min(900,Math.round(entry.contentRect.width)))))
    observer.observe(chartRef.current)
    return ()=>observer.disconnect()
  },[ready])
  if(rows.length<2)return <div className={styles.empty} role="status">{loading?'در حال دریافت تاریخچهٔ نمودار…':error||'تاریخچهٔ هم‌بورس و هم‌ارز این ابزار در دسترس نیست.'}</div>
  const selected=Math.min(hover??rows.length-1,rows.length-1),current=rows[selected]
  const x=i=>LEFT+i*(right-LEFT)/Math.max(1,rows.length-1)
  const series=OPTIONS.filter(([key])=>enabled[key]&&key.startsWith('sma')||enabled[key]&&key==='ema20').map(([key,,color])=>[key,color])
  if(enabled.bb)series.push(['bbUpper','#8dabb7'],['bbLower','#8dabb7'])
  const canCandles=rows.every(row=>row.open!=null)
  const candles=mode==='candles'&&canCandles
  const [min,max]=extent(rows.flatMap(row=>[candles?row.low:row.close,candles?row.high:row.close,...series.map(([key])=>row[key]).filter(n=>n!=null)]))
  const y=value=>278-(value-min)/(max-min)*258
  function point(event){const box=event.currentTarget.getBoundingClientRect();const local=(event.clientX-box.left)*width/box.width;setHover(Math.max(0,Math.min(rows.length-1,Math.round((local-LEFT)/(right-LEFT)*(rows.length-1)))))}
  const dates=[0,Math.floor((rows.length-1)/2),rows.length-1]
  const span=Date.parse(end)-Date.parse(all[0].date)
  const macdValues=rows.flatMap(row=>[row.macd,row.signal,row.histogram].filter(n=>n!=null))
  const [macdMin,macdMax]=extent([0,...macdValues]),macdY=value=>126-(value-macdMin)/(macdMax-macdMin)*110
  const volumeMax=Math.max(...rows.map(row=>row.volume||0),1),volumeY=value=>105-value/volumeMax*90
  const cursor=x(selected),barWidth=Math.max(.65,Math.min(12,(right-LEFT)/rows.length*.65))
  return <div className={styles.chart} ref={chartRef}>
    <div className={styles.toolbar}><h3>نمودار روزانه <bdi>{market.quote.currency}</bdi></h3><div className={styles.ranges}>{[[30,'۱ ماه'],[90,'۳ ماه'],[180,'۶ ماه'],[365,'۱ سال'],[0,'همه']].map(([value,label])=><button key={value} type="button" disabled={value>30&&span<value*.8*86400000} aria-pressed={days===value} onClick={()=>{setDays(value);setHover(null)}}>{label}</button>)}</div><button className={styles.mode} type="button" aria-pressed={candles} disabled={!canCandles} onClick={()=>setMode(mode==='candles'?'line':'candles')}>{candles?'کندلی':'خطی'}</button></div>
    <div className={styles.indicators} aria-label="اندیکاتورهای نمودار">{OPTIONS.map(([key,label,color])=><label key={key} style={{'--series':color}}><input type="checkbox" checked={!!enabled[key]} onChange={event=>setEnabled({...enabled,[key]:event.target.checked})}/><span dir={key==='volume'?'rtl':'ltr'}>{label}</span></label>)}</div>
    <div className={styles.readout} aria-live="off"><time><bdi>{current.date}</bdi></time><span>پایانی <bdi>{display(current.close)} {market.quote.currency}</bdi></span>{series.filter(([key])=>!key.startsWith('bb')).map(([key,color])=><span key={key} style={{color}}><bdi>{key.toUpperCase().replace(/(\d+)/,' $1')}: {display(current[key])}</bdi></span>)}{enabled.rsi&&<span style={{color:'#b8a0fa'}}><bdi>RSI: {display(current.rsi)}</bdi></span>}</div>
    <svg className={styles.plot} viewBox={`0 0 ${width} 315`} role="img" aria-label={`نمودار روزانه ${number(rows.length)} قیمت؛ ${rows[0].date} تا ${end}`} onPointerMove={point} onPointerLeave={()=>setHover(null)}>
      <title>{`قیمت ${market.quote.currency} و میانگین‌های متحرک؛ ${market.quote.exchange}`}</title><Axis min={min} max={max} y={y} right={right}/>
      {candles?rows.map((row,i)=>{const color=row.close>=row.open?'#6bc4a4':'#ef888f';return <g key={row.date} stroke={color}><line x1={x(i)} x2={x(i)} y1={y(row.high)} y2={y(row.low)} strokeWidth="1"/><rect x={x(i)-barWidth/2} y={Math.min(y(row.open),y(row.close))} width={barWidth} height={Math.max(1,Math.abs(y(row.open)-y(row.close)))} fill={color} stroke="none"/></g>}):<Series rows={rows} series={[["close","#6bc4a4"]]} x={x} y={y}/>}
      <Series rows={rows} series={series} x={x} y={y}/><Cursor x={cursor} height={315}/>{dates.map((i,k)=><text key={k} x={x(i)} y="306" textAnchor={k===0?'start':k===2?'end':'middle'} fill="#aab8c7" fontSize="11">{rows[i].date}</text>)}
    </svg>
    {enabled.rsi&&<section className={styles.study} aria-label="شاخص قدرت نسبی"><div><bdi>RSI (14)</bdi><strong><bdi>{display(current.rsi)}</bdi></strong><small>۳۰ / ۷۰</small></div><svg className={styles.plot} viewBox={`0 0 ${width} 150`} role="img" aria-label="نمودار RSI با محدوده‌های ۳۰ و ۷۰" onPointerMove={point} onPointerLeave={()=>setHover(null)}><rect x={LEFT} width={right-LEFT} y="47" height="44" fill="#b8a0fa" opacity=".07"/>{[30,50,70].map(n=><g key={n}><line x1={LEFT} x2={right} y1={124-n*1.1} y2={124-n*1.1} stroke="#51546c" strokeDasharray="4 4"/><text x={right+10} y={128-n*1.1} fill="#b6b9ce" fontSize="12">{n}</text></g>)}<Series rows={rows} series={[["rsi","#b8a0fa"]]} x={x} y={value=>124-value*1.1}/><Cursor x={cursor} height={150}/></svg>{current.rsi==null&&<p>برای RSI دست‌کم ۱۵ قیمت پایانی لازم است.</p>}</section>}
    {enabled.macd&&<section className={styles.study} aria-label="اندیکاتور MACD"><div><bdi>MACD (12, 26, 9)</bdi><strong><bdi>{display(current.macd)}</bdi></strong><span>سیگنال <bdi>{display(current.signal)}</bdi></span></div><svg className={styles.plot} viewBox={`0 0 ${width} 150`} role="img" aria-label="نمودار MACD و خط سیگنال" onPointerMove={point} onPointerLeave={()=>setHover(null)}><line x1={LEFT} x2={right} y1={macdY(0)} y2={macdY(0)} stroke="#50606c"/>{rows.map((row,i)=>row.histogram==null?null:<rect key={row.date} x={x(i)-barWidth/2} width={barWidth} y={Math.min(macdY(0),macdY(row.histogram))} height={Math.max(.5,Math.abs(macdY(row.histogram)-macdY(0)))} fill={row.histogram>=0?'#467e6d':'#9d555e'}/>)}<Axis min={macdMin} max={macdMax} y={macdY} right={right}/><Series rows={rows} series={[["macd","#76c8e0"],["signal","#e9bc62"]]} x={x} y={macdY}/><Cursor x={cursor} height={150}/></svg>{current.signal==null&&<p>برای MACD و خط سیگنال دست‌کم ۳۴ قیمت پایانی لازم است.</p>}</section>}
    {enabled.volume&&<section className={styles.study} aria-label="حجم معاملات"><div>حجم معاملات همین بورس <strong><bdi>{display(current.volume)}</bdi></strong></div><svg className={styles.plot} viewBox={`0 0 ${width} 125`} role="img" aria-label="نمودار حجم معاملات" onPointerMove={point} onPointerLeave={()=>setHover(null)}>{rows.map((row,i)=>row.volume==null?null:<rect key={row.date} x={x(i)-barWidth/2} width={barWidth} y={volumeY(row.volume)} height={105-volumeY(row.volume)} fill="#689693"/>)}<Cursor x={cursor} height={125}/></svg></section>}
    <label className={styles.slider}>انتخاب روز نمودار<input aria-label="انتخاب روز نمودار" type="range" min="0" max={rows.length-1} value={selected} onChange={event=>setHover(Number(event.target.value))} dir="ltr"/></label>
    <p className={styles.caption}>{number(rows.length)} روز معاملاتی · <bdi>{rows[0].date} — {end}</bdi> · قیمت پایانی · {market.quote.exchange}{loading?' · در حال به‌روزرسانی…':''}</p>
    {error&&<p className={styles.error} role="status">{error}</p>}
    {enabled.sma200&&current.sma200==null&&<p className={styles.caption}>برای میانگین ۲۰۰ روزه هنوز دادهٔ کافی در این تاریخ وجود ندارد.</p>}
    <details className={styles.data} onToggle={event=>setDataOpen(event.currentTarget.open)}><summary>اعداد و روش محاسبه</summary><p>دوره‌ها برحسب روز معاملاتی‌اند. RSI با هموارسازی وایلدر؛ EMA با میانگین سادهٔ آغازین؛ باند بولینگر با انحراف معیار ۲۰ روزه محاسبه می‌شود. دادهٔ روز جاری وارد اندیکاتورها نمی‌شود.</p>{dataOpen&&<div><table><thead><tr><th>تاریخ</th><th>پایانی</th><th>SMA 20</th><th>SMA 50</th><th>SMA 200</th><th>RSI 14</th><th>MACD</th></tr></thead><tbody>{rows.slice().reverse().map(row=><tr key={row.date}>{[row.date,display(row.close),display(row.sma20),display(row.sma50),display(row.sma200),display(row.rsi),display(row.macd)].map((value,i)=><td key={i}><bdi>{value}</bdi></td>)}</tr>)}</tbody></table></div>}</details>
  </div>
}
