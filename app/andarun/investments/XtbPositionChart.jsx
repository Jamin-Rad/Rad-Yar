'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { browserChartStorage, readChartDrawings, readChartHistory, saveChartHistory } from '@/lib/investments/local-asset-chart.mjs'
import { technicalHistory } from '@/lib/investments/indicators.mjs'
import { trendForecast } from '@/lib/investments/trend-forecast.mjs'
import { XTB_DRAWING_COLORS, XTB_INTERVALS, xtbBars } from '@/lib/investments/xtb-chart.mjs'
import { estimateXtbStopOut, xtbExposure, xtbScenario } from '@/lib/investments/xtb-risk.mjs'
import styles from './XtbPositionChart.module.css'

const reference = 'BZ=F'
const stopOutSource = 'https://www.xtb.com/de/hilfe-center/handelskonto/was-ist-der-stop-out'
const priceFormat = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const signedFormat = new Intl.NumberFormat('en-US', { signDisplay: 'exceptZero', minimumFractionDigits: 2, maximumFractionDigits: 2 })
const positive = value => Number(value) > 0 && Number.isFinite(Number(value)) ? Number(value) : null
const formatPrice = value => value == null ? '—' : priceFormat.format(value)
const limitLabels = { stop: 'حد ضرر', target: 'حد سود' }
const fields = [['price', 'قیمت خروج فعلی در XTB (دلار)'], ['equity', 'ارزش فعلی حساب (یورو)'], ['margin', 'مارجین مصرف‌شده (یورو)'], ['fx', 'ارزش یک دلار به یورو']]
const top = 22, bottom = 242
const averages = [['ema20','EMA 20','#f1c975'],['sma50','SMA 50','#91c5ff'],['sma200','SMA 200','#d5a7fa']]

export default function XtbPositionChart({ trade, openCount, drawings = [], onDrawings }) {
  const exposure = xtbExposure(trade)
  const [limits, setLimits] = useState({ stop: trade.plan.stopPrice || '', target: trade.plan.targetPrice || '' })
  const [referenceMarket, setReferenceMarket] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [snapshot, setSnapshot] = useState({})
  const [drag, setDrag] = useState(null)
  const [range, setRange] = useState(null)
  const [width, setWidth] = useState(700)
  const [interval, setIntervalMinutes] = useState(15)
  const [offset, setOffset] = useState(0)
  const [intraday, setIntraday] = useState({})
  const [loaded, setLoaded] = useState(false)
  const [cursor, setCursor] = useState(null)
  const [drawing, setDrawing] = useState(null)
  const [draft, setDraft] = useState([])
  const [selected, select] = useState(null)
  const [snap, setSnap] = useState(false)
  const [rsiHeight, setRsiHeight] = useState(75)
  const [mobileTools, setMobileTools] = useState(false)
  const [limitDetail, setLimitDetail] = useState(null)
  const [forecast, setForecast] = useState(false)
  const [indicators, setIndicators] = useState({ ema20: true, sma50: true, sma200: false, rsi: true })
  const symbol = (trade.plan.symbol || '').toUpperCase()
  const prefsKey = 'andarun-xtb-view-v2:' + symbol
  const drawingsKey = JSON.stringify(['xtb', trade.ownerId, trade.id, trade.plan.symbol, trade.plan.currency])
  const gradient = useId()
  const plot = useRef(null)
  const positionSheet = useRef(null)
  const gestures = useRef({ points:new Map(), action:null, timer:null, wheel:0 })
  useEffect(() => {
    const storage = browserChartStorage()
    if (exposure.isBrent) {
      setReferenceMarket(readChartHistory(storage, reference))
      setIntraday(Object.fromEntries([5,15].map(n=>[n,readChartHistory(storage,`${reference}:${n}m`)])))
    }
    try {
      const saved = JSON.parse(storage?.getItem(prefsKey))
      if (XTB_INTERVALS.includes(saved?.interval)) setIntervalMinutes(saved.interval)
      if (Number.isInteger(saved?.range) && saved.range>=16 && saved.range<=190) setRange(saved.range)
    } catch {}
    setLoaded(true)
    const observer = new ResizeObserver(([entry])=>setWidth(entry.contentRect.width))
    observer.observe(plot.current)
    const interaction = gestures.current
    return ()=>{observer.disconnect();clearTimeout(interaction.timer)}
  }, [exposure.isBrent,prefsKey])
  useEffect(()=>{
    if (!loaded) return
    try { browserChartStorage()?.setItem(prefsKey,JSON.stringify({interval,range})) } catch {}
  },[loaded,prefsKey,interval,range])
  const [legacy, setLegacy] = useState([])
  useEffect(()=>{
    const storage=browserChartStorage()
    try { if(storage?.getItem(drawingsKey+'-imported')) return } catch {}
    setLegacy(readChartDrawings(storage,drawingsKey).map((line,index)=>({
      id:`${trade.id}-legacy-${index}`.slice(0,80),symbol,scope:trade.ownerId,type:line.type,color:XTB_DRAWING_COLORS[0],
      points:line.end?[line.start,line.end]:[line.start],
    })))
  },[drawingsKey,symbol,trade.id,trade.ownerId])
  const allDrawings=[...drawings,...legacy.filter(line=>!drawings.some(saved=>saved.id===line.id))]
  const lines=allDrawings.filter(line=>line.symbol===symbol&&(line.scope==='shared'||line.scope===trade.ownerId))
  const selectedLine=lines.find(line=>line.id===selected)

  const currency = trade.plan.currency
  const currentPrice = positive(snapshot.price)
  const referencePrice = positive(referenceMarket?.quote?.price)
  const displayedPrice = currentPrice ?? referencePrice
  const pnl = xtbScenario(exposure, displayedPrice)
  const enteredFx = positive(snapshot.fx)
  const fx = currency === 'EUR' ? 1 : enteredFx ?? positive(referenceMarket?.fx?.latest?.rate)
  const eurAmount = scenario => scenario?.amount != null && fx != null ? signedFormat.format(scenario.amount * fx) + ' €' : null
  const stock = intraday[interval === 5 ? 5 : 15]?.history
  const fullHistory = useMemo(() => technicalHistory(xtbBars(stock,interval),Date.now(),true), [stock,interval])
  const visibleCount=range ?? Math.max(24,Math.min(150,Math.floor(width/9)))
  const historyEnd=Math.max(0,fullHistory.length-offset)
  const historyStart=Math.max(0,historyEnd-visibleCount)
  const history=fullHistory.slice(historyStart,historyEnd)
  const prediction=useMemo(()=>forecast?trendForecast(fullHistory,{window:32,horizon:4}):null,[forecast,fullHistory])
  const projection=offset===0?prediction?.points:null
  const visibleAverages = averages.filter(([key]) => indicators[key])
  const candles=history.length>0
  const activeBar = history[cursor ?? history.length - 1]
  const estimate = estimateXtbStopOut(exposure, Object.fromEntries(fields.map(([key]) => [key, positive(snapshot[key])])), openCount)
  const direction = exposure.direction
  const stop = positive(limits.stop), target = positive(limits.target)
  const invalidStop = stop != null && (stop - exposure.entry) * direction >= 0
  const invalidTarget = target != null && (target - exposure.entry) * direction <= 0
  const marketLevels = (history.length ? [...history.flatMap(row=>[row.low,row.high]),
    ...(projection||[]).flatMap(point=>[point.low,point.high])] : [exposure.entry,stop,target,displayedPrice]).filter(value=>value!=null)
  const low = Math.min(...marketLevels), high = Math.max(...marketLevels)
  const pad = Math.max((high - low) * .13, exposure.entry * .025)
  const [min, max] = drag?.domain || [Math.max(.01, low - pad), high + pad]
  const y = price => bottom - (price - min) / (max - min) * (bottom - top)
  const slots=Math.max(1,history.length-1)+(projection?4:0)
  const x = i => 16 + 575 * i / slots
  const anchorX = date => {
    const stamp=Date.parse(date)
    if (!fullHistory.length) return 16
    const index = fullHistory.findIndex(row => Date.parse(row.date) >= stamp)
    if (index===0&&stamp<Date.parse(fullHistory[0].date)) return x(-historyStart-1)
    if(index<0) return x(fullHistory.length-historyStart)
    if(index===0) return x(-historyStart)
    const before=Date.parse(fullHistory[index-1].date),after=Date.parse(fullHistory[index].date)
    return x(index-1+(stamp-before)/(after-before)-historyStart)
  }
  const seriesPath = (key, scale) => {
    let started = false
    return history.map((row,i)=>{
      if (row[key] == null) { started=false;return '' }
      const command=started?'L':'M'
      started=true
      return `${command}${x(i)},${scale(row[key])}`
    }).join(' ')
  }
  const candleWidth = Math.max(1, Math.min(12, 415 / slots))

  async function refresh() {
    setBusy(true)
    setError('')
    const read = async url => {
      const response = await fetch(url,{cache:'no-store'})
      const result=await response.json()
      if(!response.ok || !Array.isArray(result.history) || result.history.length<2) throw Error(result.error || 'دادهٔ کافی دریافت نشد.')
      return result
    }
    const endpoint='/api/andarun/investments/market?symbol=BZ%3DF&refresh=1&'
    try {
      const results=await Promise.allSettled([read(endpoint+'interval=15m'),read(endpoint+'interval=5m'),read(endpoint+'history=1')])
      const next={}
      for (const [index,minutes] of [[0,15],[1,5]]) {
        if(results[index].status!=='fulfilled')continue
        next[minutes]=results[index].value
        saveChartHistory(browserChartStorage(),`${reference}:${minutes}m`,next[minutes],3400)
      }
      setIntraday(previous=>({...previous,...next}))
      if(results[2].status==='fulfilled' && results[2].value.quote?.currency==='USD'){
        setReferenceMarket(results[2].value)
        saveChartHistory(browserChartStorage(),reference,results[2].value)
      }
      if(results.some(result=>result.status==='rejected'))setError('بخشی از دادهٔ بازار دریافت نشد. دادهٔ قبلی در صورت وجود نمایش داده می‌شود.')
    } finally {setBusy(false)}
  }

  function coordinates(event) {
    const box=plot.current.getBoundingClientRect()
    return {x:(event.clientX-box.left)*700/box.width,y:(event.clientY-box.top)*266/box.height}
  }
  function priceAt(yCoordinate) {
    return Math.max(.01,min+(bottom-Math.min(bottom,Math.max(top,yCoordinate)))/(bottom-top)*(max-min))
  }
  function indexAt(xCoordinate) {
    return Math.max(0,Math.min(history.length-1,Math.round((xCoordinate-16)/575*slots)))
  }
  function pointAt(event) {
    const location=coordinates(event), index=indexAt(location.x)
    let price=priceAt(location.y)
    const bar=history[index]
    let date=bar?.date || new Date().toISOString()
    if(snap && bar) {
      price=[bar.open,bar.high,bar.low,bar.close].reduce((best,value)=>Math.abs(value-price)<Math.abs(best-price)?value:best)
    } else if(history.length>=2) {
      const position=Math.max(0,Math.min(history.length-1,(location.x-16)/575*slots))
      const left=Math.floor(position),right=Math.min(left+1,history.length-1)
      const start=Date.parse(history[left].date),end=Date.parse(history[right].date)
      date=new Date(start+(end-start)*(position-left)).toISOString()
    }
    return {date,price}
  }
  function saveLines(next) {
    if (!onDrawings) return
    onDrawings(next)
    if (legacy.length) {
      try {browserChartStorage()?.setItem(drawingsKey+'-imported','1')} catch {}
      setLegacy([])
    }
  }
  function changeDrawing(id, update) {
    saveLines(allDrawings.map(line=>line.id===id?{...line,...update}:line))
  }
  function addDrawing(type, points) {
    if(!symbol||allDrawings.length>=300)return
    const id=crypto.randomUUID()
    saveLines([...allDrawings,{id,symbol,type,points,scope:'shared',color:XTB_DRAWING_COLORS[0]}])
    select(id)
  }
  function chooseDrawing(tool) {
    setDrawing(previous=>previous===tool?null:tool)
    setDraft([])
    select(null)
  }
  function setFrame(value) {
    setIntervalMinutes(value);setCursor(null);setOffset(0);setDraft([])
  }
  useEffect(()=>{
    const element=plot.current
    function wheel(event) {
      event.preventDefault()
      const state=gestures.current
      const now=Date.now()
      if(now-state.wheel<150)return
      state.wheel=now
      const shift=event.deltaY>0?1:-1
      if(event.shiftKey)setRange(Math.max(16,Math.min(190,visibleCount+shift*8)))
      else {
        const current=XTB_INTERVALS.indexOf(interval)
        const next=XTB_INTERVALS[Math.max(0,Math.min(XTB_INTERVALS.length-1,current+shift))]
        if(next!==interval)setFrame(next)
      }
    }
    element.addEventListener('wheel',wheel,{passive:false})
    return ()=>element.removeEventListener('wheel',wheel)
  },[interval,visibleCount])

  const [editPreview,setEditPreview]=useState(null)
  function begin(event, line, handleIndex) {
    const g=gestures.current
    clearTimeout(g.timer)
    const local=coordinates(event)
    g.points.set(event.pointerId,local)
    if(g.points.size===2){
      const [a,b]=g.points.values()
      g.action={type:'pinch',distance:Math.max(1,Math.hypot(a.x-b.x,a.y-b.y)),count:visibleCount}
      setDraft([]);setEditPreview(null)
      return
    }
    if(event.button!==0&&event.button!==2)return
    const chart=plot.current
    chart.setPointerCapture(event.pointerId)
    if(line){select(line.id);g.action={type:'edit',line,handleIndex,point:pointAt(event),domain:[min,max]};return}
    if(event.button===2||(event.pointerType==='touch'&&!drawing)){
      g.action={type:'pan',x:local.x,offset}
      if(event.pointerType==='touch'){
        const index=indexAt(local.x)
        g.timer=setTimeout(()=>{g.action={type:'cursor'};setCursor(index)},430)
      }
      return
    }
    if(!drawing){select(null);setLimitDetail(null);return}
    if(drawing==='horizontal'){addDrawing(drawing,[pointAt(event)]);setDrawing(null);return}
    if(drawing==='arrow'){
      if(event.pointerType==='touch')setDraft(previous=>[...previous,pointAt(event)].slice(0,120))
      return
    }
    g.action={type:drawing,points:[pointAt(event)]}
    setDraft(g.action.points)
  }
  function move(event) {
    const g=gestures.current
    const local=coordinates(event)
    if(g.points.has(event.pointerId))g.points.set(event.pointerId,local)
    if(drag){
      const price=priceAt(local.y)
      setLimits(previous=>({...previous,[drag.key]:price.toFixed(2)}))
      return
    }
    const action=g.action
    if(action?.type==='pinch'&&g.points.size===2){
      const [a,b]=g.points.values()
      const scale=Math.hypot(a.x-b.x,a.y-b.y)/action.distance
      setRange(Math.max(16,Math.min(190,Math.round(action.count/Math.max(.2,scale)))))
    } else if(action?.type==='pan'){
      if(Math.abs(local.x-action.x)<4)return
      clearTimeout(g.timer)
      setOffset(Math.min(Math.max(0,fullHistory.length-visibleCount),Math.max(0,action.offset+Math.round((local.x-action.x)*slots/575))))
    } else if(action?.type==='edit'){
      const point=pointAt(event)
      const delta=Date.parse(point.date)-Date.parse(action.point.date), priceDelta=point.price-action.point.price
      const points=action.line.points.map((item,i)=>action.handleIndex==null
        ? {date:new Date(Date.parse(item.date)+delta).toISOString(),price:Math.max(.01,item.price+priceDelta)}
        : i===action.handleIndex?point:item)
      g.preview=points
      setEditPreview({id:action.line.id,points})
    } else if(action?.type==='trend'||action?.type==='freehand'){
      const point=pointAt(event)
      if(action.type==='trend')action.points=[action.points[0],point]
      else {
        if(action.points.length>=120)action.points=action.points.filter((_,index)=>index%2===0)
        action.points=[...action.points,point]
      }
      setDraft(action.points)
    } else if(history.length && (event.pointerType!=='touch'||action?.type==='cursor')){
      setCursor(indexAt(local.x))
    }
  }
  function finish(event, cancel=false) {
    const g=gestures.current
    clearTimeout(g.timer)
    g.points.delete(event.pointerId)
    if(g.points.size)return
    const action=g.action
    g.action=null
    if(!cancel && action?.type==='edit' && g.preview)changeDrawing(action.line.id,{points:g.preview})
    if(!cancel && action?.points?.length>=2){addDrawing(action.type,action.points);setDrawing(null)}
    g.preview=null
    setEditPreview(null);setDrag(null)
    if(drawing!=='arrow')setDraft([])
  }
  function addArrowPoint(event) {
    if(drawing==='arrow')setDraft(previous=>[...previous,pointAt(event)].slice(0,120))
  }
  function completeArrow() {
    if(draft.length>=2){addDrawing('arrow',draft);setDraft([]);setDrawing(null)}
  }

  function beginChart(event) { begin(event) }
  function startLevel(event,level) {
    if(drawing||event.button===2)return
    event.stopPropagation()
    setLimitDetail(level.key)
    if(level.original==null)return
    plot.current.setPointerCapture(event.pointerId)
    setDrag({key:level.key,domain:[min,max]})
  }
  const levelColors={entry:'#72acff',stop:'#fb8092',target:'#53d6ae',liquidation:'#c5a3fd'}
  const levelRows=[
    {key:'entry',label:'ورود',value:exposure.entry},
    {key:'stop',label:'حد ضرر',value:stop,original:positive(trade.plan.stopPrice)},
    {key:'target',label:'حد سود',value:target,original:positive(trade.plan.targetPrice)},
    {key:'liquidation',label:'Stop Out',value:estimate?.price},
  ]
  const inPlot=price=>price!=null&&price>=min&&price<=max
  const axisLevels=levelRows.filter(level=>inPlot(level.value)).sort((a,b)=>y(a.value)-y(b.value))
  let nextLabel=top-18
  const axisPositions=axisLevels.map(level=>{
    const labelY=Math.max(y(level.value),nextLabel+18)
    nextLabel=labelY
    return labelY
  })
  for(let i=axisPositions.length-1;i>=0;i--)axisPositions[i]=Math.min(axisPositions[i],i===axisPositions.length-1?bottom:axisPositions[i+1]-18)
  const selectedLevel=limitDetail&&levelRows.find(level=>level.key===limitDetail)
  const levelDistance=selectedLevel?.value!=null&&displayedPrice!=null?selectedLevel.value-displayedPrice:null
  const closingResult=selectedLevel&&xtbScenario(exposure,selectedLevel.value)
  const showDetails=selectedLevel?.value!=null
  const last=history.length-1
  const forecastPath=(points,key,reverse=false)=>(reverse?[...points].reverse():points).map((point,index)=>
    `${index||reverse?'L':'M'}${x(last+(reverse?points.length-1-index:index))},${y(point[key])}`).join(' ')
  const maxVolume=Math.max(1,...history.map(bar=>bar.volume||0))
  const knownEntry=trade.executions.find(event=>event.kind==='entry')
  const entryTime=knownEntry&&!knownEntry.observedOpen?knownEntry.date:null
  const entryX=entryTime?anchorX(entryTime):null
  const positionPanel=<>
    <h3>موقعیت باز</h3>
    <dl className={styles.quoteStrip}>
      <div><dt>سود و زیان باز · برآوردی</dt><dd data-sign={pnl?.percent<0?'negative':'positive'}><bdi>{eurAmount(pnl)||'—'}</bdi></dd>
        <small>{currentPrice!=null?'قیمت واردشدهٔ XTB':'مرجع برنت'}</small></div>
      <div><dt>حجم</dt><dd><bdi>{Number(exposure.volume.toPrecision(8))}</bdi></dd></div>
      <div><dt>میانگین ورود</dt><dd><bdi>{formatPrice(exposure.entry)} {currency}</bdi></dd></div>
      <div><dt>قیمت فعلی</dt><dd><bdi>{formatPrice(displayedPrice)} {currency}</bdi></dd>
        {currentPrice==null&&referenceMarket?.quote?.asOf&&<small><bdi>{referenceMarket.quote.asOf.slice(0,16).replace('T',' ')} UTC</bdi></small>}</div>
    </dl>
    <h3>سناریوی خروج</h3>
    {Object.entries(limitLabels).map(([key,label])=>{
      const invalid=key==='stop'?invalidStop:invalidTarget
      const result=!invalid&&xtbScenario(exposure,positive(limits[key]))
      return <div className={styles.limit} data-limit={key} key={key}>
        <label>{label}<bdi>{currency}</bdi><input dir="ltr" type="number" min=".01" step=".01" value={limits[key]} aria-invalid={invalid} onChange={event=>setLimits(previous=>({...previous,[key]:event.target.value}))}/></label>
        {invalid?<small role="status">حد در سمت درست قیمت ورود نیست.</small>:<strong dir="ltr">{eurAmount(result)||'—'}</strong>}
      </div>
    })}
    <button type="button" onClick={()=>setLimits({stop:trade.plan.stopPrice||'',target:trade.plan.targetPrice||''})}>بازگردانی حدهای ثبت‌شده</button>
    <details className={styles.stopOut}>
      <summary>Stop Out <bdi>{estimate?.price!=null?formatPrice(estimate.price)+' '+currency:'—'}</bdi></summary>
      <p>برآورد با داده‌های هم‌زمان حساب و فرض ثبات نرخ ارز و مارجین. <a href={stopOutSource} target="_blank" rel="noreferrer">قاعدهٔ XTB</a></p>
      {openCount===1&&exposure.isBrent?<>
        <div className={styles.inputs}>{fields.map(([key,label])=><label key={key}>{label}<input dir="ltr" type="number" min="0" step="any" value={snapshot[key]||''} onChange={event=>setSnapshot(previous=>({...previous,[key]:event.target.value}))}/></label>)}</div>
        {estimate&&<p role="status">سطح مارجین <bdi>{formatPrice(estimate.marginLevel)}٪</bdi> · {estimate.alreadyBelow?'زیر آستانهٔ Stop Out':estimate.price==null?'قیمت مثبت در مدل به‌دست نیامد':<bdi>{formatPrice(estimate.price)} {currency}</bdi>}</p>}
      </>:<p>این تخمین برای یک موقعیت باز OIL در حساب فعال است.</p>}
    </details>
  </>

  return <section className={styles.card} aria-label="نمودار و سناریوی موقعیت XTB">
    <div className={styles.grid}>
      <div className={styles.chart}>
        <header className={styles.header}>
          <div><small>XTB · {direction===1?'خرید':'فروش'}</small><h2 dir="auto">{trade.plan.name}</h2></div>
          {exposure.isBrent&&<button type="button" disabled={busy} onClick={refresh}>{busy?'در حال دریافت…':'به‌روزرسانی'}</button>}
          <button type="button" className={styles.mobileButton} onClick={()=>positionSheet.current?.showModal()}><bdi>{symbol} · {eurAmount(pnl)||'—'}</bdi> ▴</button>
        </header>
        <div className={styles.chartTools} aria-label="تایم‌فریم و پیش‌بینی">
          <label>تایم‌فریم <select value={interval} onChange={event=>setFrame(Number(event.target.value))}>
            {XTB_INTERVALS.map(value=><option key={value} value={value}>{value===60?'۱ ساعت':value===240?'۴ ساعت':value+' دقیقه'}</option>)}
          </select></label>
          <button type="button" aria-pressed={forecast} disabled={!fullHistory.length} onClick={()=>{setOffset(0);setForecast(value=>!value)}}>پیش‌بینی روند</button>
          {offset>0&&<button type="button" onClick={()=>setOffset(0)}>آخرین کندل‌ها</button>}
          <button type="button" className={styles.mobileButton} aria-expanded={mobileTools} onClick={()=>setMobileTools(value=>!value)}>رسم</button>
        </div>
        <div className={styles.drawingTools} data-open={mobileTools}>
          <div className={styles.chartTools} aria-label="ابزار رسم">
            {[['trend','خط صاف'],['freehand','آزاد'],['arrow','مسیر فلش'],['horizontal','خط افقی']].map(([key,label])=>
              <button type="button" key={key} aria-pressed={drawing===key} disabled={!history.length} onClick={()=>chooseDrawing(key)}>{label}</button>)}
            <button type="button" aria-pressed={snap} onClick={()=>setSnap(value=>!value)}>چسبیدن به کندل</button>
            {drawing==='arrow'&&<button type="button" disabled={draft.length<2} onClick={completeArrow}>ثبت مسیر</button>}
          </div>
          {selectedLine&&<div className={styles.chartTools} aria-label="ویرایش رسم">
            <label>رنگ <select value={selectedLine.color} onChange={event=>changeDrawing(selectedLine.id,{color:event.target.value})}>
              {XTB_DRAWING_COLORS.map((color,i)=><option value={color} key={color}>{['آبی','طلایی','سبز','قرمز','بنفش'][i]}</option>)}
            </select></label>
            <label>نمایش <select value={selectedLine.scope} onChange={event=>changeDrawing(selectedLine.id,{scope:event.target.value})}>
              <option value="shared">مشترک بین حساب‌ها</option><option value={trade.ownerId}>فقط این حساب</option>
            </select></label>
            <button type="button" onClick={()=>{saveLines(allDrawings.filter(line=>line.id!==selectedLine.id));select(null)}}>حذف رسم</button>
          </div>}
        </div>
        <div className={styles.chartTools} aria-label="اندیکاتورها">
          {[...averages,['rsi','RSI 14','#a9d5cf']].map(([key,label,color])=><button key={key} style={{color}} type="button" aria-pressed={indicators[key]} onClick={()=>setIndicators(previous=>({...previous,[key]:!previous[key]}))}>{label}</button>)}
        </div>
        {drawing==='arrow'&&<p>نقطه‌ها را با دوبارکلیک یا لمس اضافه کن و «ثبت مسیر» را بزن.</p>}
        {!history.length&&<p>برای دریافت کندل‌های این تایم‌فریم، «به‌روزرسانی» را بزن.</p>}
        {forecast&&!prediction&&<p role="status">دادهٔ کامل برای آزمون پیش‌بینی این تایم‌فریم کافی نیست.</p>}
        <div className={styles.plotWrap}>
        <svg ref={plot} className={styles.plot} data-drawing={!!drawing} viewBox="0 0 700 266" preserveAspectRatio="none" role="group" aria-label="نمودار کندلی و سطح‌های موقعیت"
          onPointerDown={beginChart} onPointerMove={move} onPointerLeave={event=>{if(event.pointerType!=='touch'&&!gestures.current.action)setCursor(null)}} onPointerUp={event=>finish(event)} onPointerCancel={event=>finish(event,true)}
          onContextMenu={event=>event.preventDefault()} onDoubleClick={addArrowPoint}>
          <defs>
            <clipPath id={gradient+'-plot'}><rect x="12" y={top} width="593" height={bottom-top}/></clipPath>
            <marker id={gradient+'-arrow'} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0L6 3L0 6Z" fill="context-stroke"/></marker>
          </defs>
          {[0,.25,.5,.75,1].map(step=>{
            const value=min+(max-min)*step
            return <g key={step}><line x1="12" x2="605" y1={y(value)} y2={y(value)} stroke="#26323e"/><text x="691" y={y(value)+4} textAnchor="end">{formatPrice(value)}</text></g>
          })}
          {[0,.2,.4,.6,.8,1].map(step=><line key={step} x1={16+575*step} x2={16+575*step} y1={top} y2={bottom} stroke="#222d36"/>)}
          <g clipPath={`url(#${gradient}-plot)`}>
            {history.map((bar,i)=>{
              const color=bar.close>=bar.open?'#53d6ae':'#fb8092'
              const volume=(bar.volume||0)/maxVolume*32
              return <g key={bar.date}><rect x={x(i)-candleWidth/2} y={bottom-volume} width={candleWidth} height={volume} fill={color} opacity=".22"/>
                <line x1={x(i)} x2={x(i)} y1={y(bar.high)} y2={y(bar.low)} stroke={color}/><rect x={x(i)-candleWidth/2} y={Math.min(y(bar.open),y(bar.close))} width={candleWidth} height={Math.max(1,Math.abs(y(bar.close)-y(bar.open)))} fill={color}/></g>
            })}
            {visibleAverages.map(([key,,color])=><path key={key} d={seriesPath(key,y)} fill="none" stroke={color} vectorEffect="non-scaling-stroke"/>)}
            {projection&&<g aria-label="پیش‌بینی ادامهٔ نمودار">
              <path d={forecastPath(projection,'high')+forecastPath(projection,'low',true)+'Z'} fill="#65b8f7" opacity=".23"/>
              <path d={forecastPath(projection,'mid')} fill="none" stroke="#88d1ff" strokeDasharray="5 4" strokeWidth="2" vectorEffect="non-scaling-stroke"/>
            </g>}
            {entryX!=null&&<line x1={entryX} x2={entryX} y1={top} y2={bottom} stroke={levelColors.entry} strokeDasharray="4 4"/>}
            {displayedPrice!=null&&<line x1="12" x2="605" y1={y(displayedPrice)} y2={y(displayedPrice)} stroke="#91a8bd" strokeDasharray="2 5"/>}
            {levelRows.map(level=><g key={level.key}>
              {level.original!=null&&level.original!==level.value&&<line x1="12" x2="605" y1={y(level.original)} y2={y(level.original)} stroke={levelColors[level.key]} opacity=".38" strokeDasharray="3 5"/>}
              {inPlot(level.value)&&<g className={level.original!=null?styles.handle:undefined}
                onPointerEnter={()=>setLimitDetail(level.key)} onPointerLeave={()=>{if(!drag)setLimitDetail(null)}}
                onPointerDown={event=>startLevel(event,level)}>
                <line x1="12" x2="605" y1={y(level.value)} y2={y(level.value)} stroke={levelColors[level.key]} strokeDasharray="5 4"/>
                <line x1="490" x2="605" y1={y(level.value)} y2={y(level.value)} stroke="transparent" strokeWidth="14"/>
              </g>}
            </g>)}
            {lines.map(line=>{
              const points=editPreview?.id===line.id?editPreview.points:line.points
              const path=line.type==='horizontal'?`M12,${y(points[0].price)}L605,${y(points[0].price)}`:points.map((point,i)=>`${i?'L':'M'}${anchorX(point.date)},${y(point.price)}`).join(' ')
              return <g key={line.id}>
                <path d={path} stroke={line.color} strokeWidth="2" fill="none" markerEnd={line.type==='arrow'?`url(#${gradient}-arrow)`:undefined}/>
                <path d={path} stroke="transparent" strokeWidth="14" fill="none" className={styles.handle}
                  onPointerDown={event=>{if(drawing||event.button===2)return;event.stopPropagation();begin(event,line)}}/>
                {line.id===selected&&line.type!=='horizontal'&&points.filter((_,index)=>line.type!=='freehand'||index===0||index===points.length-1).map((point,index)=>
                  <circle key={index} cx={anchorX(point.date)} cy={y(point.price)} r="5" fill={line.color} className={styles.handle}
                    onPointerDown={event=>{event.stopPropagation();begin(event,line,points.indexOf(point))}}/>)}
              </g>
            })}
            {draft.length>0&&<><path d={draft.map((point,i)=>`${i?'L':'M'}${anchorX(point.date)},${y(point.price)}`).join(' ')} fill="none" stroke="#b3d8ff" strokeWidth="2"/>
              {drawing==='arrow'&&draft.map((point,index)=><circle key={index} cx={anchorX(point.date)} cy={y(point.price)} r="3" fill="#b3d8ff"/>)}</>}
            {cursor!=null&&activeBar&&<line x1={x(cursor)} x2={x(cursor)} y1={top} y2={bottom} stroke="#b6c8dc" strokeDasharray="3 4" pointerEvents="none"/>}
          </g>
          {axisLevels.map((level,i)=><g key={level.key} className={styles.handle} role="button" tabIndex={0}
            aria-label={level.label+' '+formatPrice(level.value)} onFocus={()=>setLimitDetail(level.key)} onBlur={()=>setLimitDetail(null)}
            onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();setLimitDetail(level.key)}}}
            onPointerDown={event=>startLevel(event,level)}>
            <rect x="605" y={axisPositions[i]-9} width="94" height="18" rx="3" fill={levelColors[level.key]}/>
            <text className={styles.axisLabel} x="651" y={axisPositions[i]+4} textAnchor="middle">{level.label} {formatPrice(level.value)}</text>
          </g>)}
          {history.length>1&&[...new Set([0,Math.floor(last/2),last])].map((i,index)=><text key={i} x={x(i)} y="260" textAnchor={index===0?'start':i===last?'end':'middle'}>{history[i].date.slice(5,16).replace('T',' ')}</text>)}
        </svg>
        {showDetails ? <div className={styles.tooltip} role="status">
          <strong>{selectedLevel.label} <bdi>{formatPrice(selectedLevel.value)} {currency}</bdi></strong>
          <strong>فاصله <bdi>{levelDistance==null?'—':`${signedFormat.format(levelDistance)} ${currency} · ${signedFormat.format(levelDistance/displayedPrice*100)}٪`}</bdi></strong>
          <small>سود و زیان برآوردی <bdi>{eurAmount(closingResult)||'—'}</bdi></small>
        </div> : cursor!=null&&activeBar&&<div className={styles.candleTip} style={{left:`clamp(4px, ${x(cursor)/7}%, calc(100% - 162px))`}}>
          <bdi>{activeBar.date.slice(0,16).replace('T',' ')} UTC</bdi>
          <bdi>O {formatPrice(activeBar.open)} · C {formatPrice(activeBar.close)}</bdi>
          <bdi>H {formatPrice(activeBar.high)} · L {formatPrice(activeBar.low)}</bdi>
        </div>}
        </div>
        {projection&&<p>پیش‌بینی ۴ کندل · دامنهٔ تجربی ۸۰٪ <bdi>{formatPrice(projection.at(-1).low)} – {formatPrice(projection.at(-1).high)} {currency}</bdi> · خطای آزمون <bdi>{formatPrice(prediction.error)} {currency}</bdi></p>}
        {forecast&&offset>0&&<p>برای دیدن پیش‌بینی به آخرین کندل‌ها برگرد.</p>}
        {indicators.rsi&&history.length>0&&<div className={styles.rsi}>
          <div className={styles.rsiTitle}><bdi>RSI 14 · {formatPrice(activeBar?.rsi)}</bdi><label>ارتفاع <input type="range" min="48" max="180" value={rsiHeight} onChange={event=>setRsiHeight(Number(event.target.value))}/></label></div>
          <svg style={{height:rsiHeight}} viewBox="0 0 700 100" preserveAspectRatio="none" role="img" aria-label="نمودار RSI">
            {[30,70].map(level=><line key={level} x1="12" x2="605" y1={92-level*.84} y2={92-level*.84} stroke="#65778a" strokeDasharray="4 4"/>)}
            <path d={seriesPath('rsi',value=>92-value*.84)} fill="none" stroke="#a9d5cf" strokeWidth="2" vectorEffect="non-scaling-stroke"/>
          </svg>
        </div>}
        {candles&&<p>برنت مرجع · آخرین کندل <bdi>{history.at(-1).date.slice(0,16).replace('T',' ')} UTC</bdi></p>}
        {error&&<p role="alert">{error}</p>}
      </div>
      <aside className={styles.scenarios}>{positionPanel}</aside>
    </div>
    <dialog ref={positionSheet} className={styles.positionSheet} aria-label="جزئیات موقعیت" onClick={event=>{if(event.target===event.currentTarget)event.currentTarget.close()}}>
      <div><button type="button" onClick={()=>positionSheet.current?.close()}>بستن</button>{positionPanel}</div>
    </dialog>
  </section>
}
