'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { browserChartStorage, readChartDrawings, readChartHistory, saveChartHistory } from '@/lib/investments/local-asset-chart.mjs'
import { technicalHistory } from '@/lib/investments/indicators.mjs'
import { XTB_DRAWING_COLORS, XTB_INTERVALS, xtbBars } from '@/lib/investments/xtb-chart.mjs'
import { estimateXtbStopOut, xtbExposure, xtbScenario } from '@/lib/investments/xtb-risk.mjs'
import { aggregateDaily, rsiDivergences, atr, vwap, trianglePatterns, tradeSpans } from '@/lib/investments/chart-analysis.mjs'
import Icon from './InvestmentIcon'
import IndicatorGuide from './IndicatorGuide'
import styles from './InvestmentPositionChart.module.css'

const berlinTime = value => {
  const date = new Date(value)
  if (!Number.isFinite(date.getTime())) return '—'
  return new Intl.DateTimeFormat('de-DE', { timeZone:'Europe/Berlin', day:'2-digit', month:'2-digit', ...(value.includes('T')?{hour:'2-digit',minute:'2-digit'}:{}) }).format(date)
}
const reference = 'BZ=F'
const stopOutSource = 'https://www.xtb.com/de/hilfe-center/handelskonto/was-ist-der-stop-out'
const priceFormat = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const signedFormat = new Intl.NumberFormat('en-US', { signDisplay: 'exceptZero', minimumFractionDigits: 2, maximumFractionDigits: 2 })
const positive = value => Number(value) > 0 && Number.isFinite(Number(value)) ? Number(value) : null
const formatPrice = value => value == null ? '—' : priceFormat.format(value)
const limitLabels = { stop: 'حد ضرر', target: 'حد سود' }
const fields = [['price', 'قیمت خروج فعلی در XTB (دلار)'], ['equity', 'ارزش فعلی حساب (یورو)'], ['margin', 'مارجین مصرف‌شده (یورو)'], ['fx', 'ارزش یک دلار به یورو']]
const frames = [...XTB_INTERVALS,'1d','1w','1mo']
const LEFT = 12, AXIS = 82, TOP = 42
const averages = [['ema20','EMA 20','#f1c975'],['sma50','SMA 50','#91c5ff'],['sma200','SMA 200','#d5a7fa']]

export default function InvestmentPositionChart({ trade, openCount, drawings = [], onDrawings, daily, onTransaction, symbolTrades }) {
  const exposure = daily ? { direction:1, entry:daily.entry, volume:daily.quantity } : xtbExposure(trade)
  const [limits, setLimits] = useState({ stop: trade.plan.stopPrice || '', target: trade.plan.targetPrice || '' })
  const [referenceMarket, setReferenceMarket] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [snapshot, setSnapshot] = useState({})
  const [drag, setDrag] = useState(null)
  const [range, setRange] = useState(null)
  const [{ width, height }, setSize] = useState({ width: 700, height: 410 })
  const top = TOP, bottom = height - 28
  const plotRight = width - AXIS, plotSpan = Math.max(1, plotRight - LEFT * 2)
  const [interval, setIntervalMinutes] = useState(daily ? '1d' : 15)
  const [offset, setOffset] = useState(0)
  const [intraday, setIntraday] = useState({})
  const [loaded, setLoaded] = useState(false)
  const [cursor, setCursor] = useState(null)
  const [drawing, setDrawing] = useState(null)
  const [draft, setDraft] = useState([])
  const [selected, select] = useState(null)
  const [context, setContext] = useState(null)
  const [priceDomain, setPriceDomain] = useState(null)
  const [selectedDivergence, setSelectedDivergence] = useState(null)
  const [fullscreen, setFullscreen] = useState(false)
  useEffect(() => {
    if (!fullscreen) return
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const close = event => { if (event.key === 'Escape') setFullscreen(false) }
    document.addEventListener('keydown', close)
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', close)
    }
  }, [fullscreen])
  const panelDrag = useRef(null)
  const frames = daily ? ['1d','1w','1mo'] : [...XTB_INTERVALS,'1d','1w','1mo']
  const [rsiHeight, setRsiHeight] = useState(75)
  const [macdHeight, setMacdHeight] = useState(100)
  const [indicatorTools, setIndicatorTools] = useState(false)
  const [limitDetail, setLimitDetail] = useState(null)
  const [showPatterns, setShowPatterns] = useState(true)
  const [showTrades, setShowTrades] = useState(true)
  const [indicators, setIndicators] = useState({ ema20: true, sma50: true, sma200: false, rsi: true, vwap: true, macd: true, atr: true, bands: false })
  const displaySymbol = (trade.plan.symbol || '').toUpperCase()
  const symbol = daily ? 'TR:' + daily.identity : displaySymbol
  const prefsKey = 'andarun-xtb-view-v2:' + (daily ? 'TR:'+trade.ownerId+':'+trade.id : symbol)
  const drawingsKey = daily?.legacyKey ?? JSON.stringify(['xtb', trade.ownerId, trade.id, trade.plan.symbol, trade.plan.currency])
  const gradient = useId()
  const plot = useRef(null)
  const gestures = useRef({ points:new Map(), action:null, timer:null, wheel:0 })
  useEffect(() => {
    const storage = browserChartStorage()
    if (exposure.isBrent) {
      setReferenceMarket(readChartHistory(storage, reference))
      setIntraday(Object.fromEntries([5,15].map(n=>[n,readChartHistory(storage,`${reference}:${n}m`)])))
    }
    try {
      const saved = JSON.parse(storage?.getItem(prefsKey))
      if (frames.includes(saved?.interval) && (!daily || typeof saved.interval==='string')) setIntervalMinutes(saved.interval)
      if (Number.isInteger(saved?.range) && saved.range>=16 && saved.range<=190) setRange(saved.range)
    } catch {}
    setLoaded(true)
    const observer = new ResizeObserver(([entry])=>setSize({ width:Math.max(150,entry.contentRect.width), height:Math.max(120,entry.contentRect.height) }))
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
      id:`legacy-${trade.ownerId}-${index}-${trade.id}`.replace(/[^a-zA-Z0-9_-]/g,'_').slice(0,80),symbol,scope:trade.ownerId,type:line.type,color:XTB_DRAWING_COLORS[0],
      points:line.end?[line.start,line.end]:[line.start],
    })))
  },[drawingsKey,symbol,trade.id,trade.ownerId])
  const allDrawings=[...drawings,...legacy.filter(line=>!drawings.some(saved=>saved.id===line.id))]
  const lines=allDrawings.filter(line=>line.symbol===symbol&&(line.scope==='shared'||line.scope===trade.ownerId))
  const selectedLine=lines.find(line=>line.id===selected)

  const currency = trade.plan.currency
  const currentPrice = positive(snapshot.price)
  const referencePrice = positive((daily ? daily.market : referenceMarket)?.quote?.price)
  const displayedPrice = currentPrice ?? referencePrice
  const pnl = xtbScenario(exposure, displayedPrice)
  const enteredFx = positive(snapshot.fx)
  const fx = currency === 'EUR' ? 1 : enteredFx ?? positive(referenceMarket?.fx?.latest?.rate)
  const eurAmount = scenario => scenario?.amount != null && fx != null ? signedFormat.format(scenario.amount * fx) + ' €' : null
  const stock = intraday[interval === 5 ? 5 : 15]?.history
  const dailyHistory = daily?.market?.history || referenceMarket?.history
  const fullHistory = useMemo(() => daily || typeof interval === 'string'
    ? technicalHistory(aggregateDaily(dailyHistory, interval))
    : technicalHistory(xtbBars(stock,interval),Date.now(),true), [stock,interval,dailyHistory,!!daily])
  const divergences = useMemo(()=>rsiDivergences(fullHistory),[fullHistory])
  const divergence = divergences.find(item=>item.id===selectedDivergence)
  const atrValues = useMemo(()=>atr(fullHistory),[fullHistory])
  const vwapValues = useMemo(()=>vwap(fullHistory,!daily),[fullHistory,!!daily])
  const visibleCount=range ?? Math.max(24,Math.min(150,Math.floor(width/9)))
  const historyEnd=Math.max(0,fullHistory.length-offset)
  const historyStart=Math.max(0,historyEnd-visibleCount)
  const history=fullHistory.slice(historyStart,historyEnd)
  const patterns = useMemo(()=>showPatterns?trianglePatterns(fullHistory.slice(0,historyEnd)):[],[showPatterns,fullHistory,historyEnd])
  const spans = useMemo(()=>daily
    ? tradeSpans(daily.events??[])
    : (symbolTrades??[trade]).flatMap(position=>tradeSpans(position.executions,position.plan.direction==='short'?-1:1).map(span=>({...span,id:position.id+':'+span.id,current:position.id===trade.id}))),
    [daily?.events,!!daily,symbolTrades,trade])
  const visibleAverages = averages.filter(([key]) => indicators[key])
  const candles=history.length>0
  const activeBar = history[cursor ?? history.length - 1]
  const estimate = estimateXtbStopOut(exposure, Object.fromEntries(fields.map(([key]) => [key, positive(snapshot[key])])), openCount)
  const direction = exposure.direction
  const stop = positive(limits.stop), target = positive(limits.target)
  const invalidStop = stop != null && (stop - exposure.entry) * direction >= 0
  const invalidTarget = target != null && (target - exposure.entry) * direction <= 0
  const marketLevels = (history.length ? history.flatMap(row=>[row.low??row.close,row.high??row.close]) : [exposure.entry,stop,target,displayedPrice]).filter(value=>value!=null)
  const low = marketLevels.length?Math.min(...marketLevels):1, high = marketLevels.length?Math.max(...marketLevels):2
  const pad = Math.max((high - low) * .13, low * .025)
  const [min, max] = drag?.domain || priceDomain || [Math.max(.01, low - pad), high + pad]
  const y = price => bottom - (price - min) / (max - min) * (bottom - top)
  const slots=Math.max(1,history.length-1)
  const x = i => LEFT + 6 + plotSpan * i / slots
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
  function drawingPath(type,points) {
    const first=points[0]
    const startX=anchorX(first.date), startY=y(first.price)
    if (type==='horizontal') return 'M'+LEFT+','+startY+'H'+plotRight
    if (type==='vertical') return 'M'+startX+','+top+'V'+bottom
    if (type==='ray') return 'M'+startX+','+startY+'H'+plotRight
    if (type==='rectangle' && points[1]) {
      const endX=anchorX(points[1].date), endY=y(points[1].price)
      return 'M'+startX+','+startY+'H'+endX+'V'+endY+'H'+startX+'Z'
    }
    return points.map((point,i)=>(i?'L':'M')+anchorX(point.date)+','+y(point.price)).join(' ')
  }
  const candleWidth = Math.max(1, Math.min(16, (plotSpan / slots) * .7))

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

  function panelResize(height, setHeight) {
    const clamp = value => Math.max(48,Math.min(300,value))
    return {
      tabIndex:0,
      onKeyDown(event) {
        if (!['ArrowUp','ArrowDown'].includes(event.key)) return
        event.preventDefault()
        setHeight(clamp(height+(event.key==='ArrowDown'?10:-10)))
      },
      onPointerDown(event) {
        if (event.button!==0) return
        event.currentTarget.setPointerCapture(event.pointerId)
        panelDrag.current={y:event.clientY,height}
      },
      onPointerMove(event) {
        if (panelDrag.current) setHeight(clamp(panelDrag.current.height+event.clientY-panelDrag.current.y))
      },
      onLostPointerCapture() { panelDrag.current=null },
    }
  }
  function openContext(event,price) {
    const box=event.currentTarget.getBoundingClientRect()
    const x=event.clientX||box.left
    const y=event.clientY||box.bottom
    setContext({price,x,y})
  }

  function coordinates(event) {
    const box=plot.current.getBoundingClientRect()
    return { x:(event.clientX-box.left)*width/box.width, y:(event.clientY-box.top)*height/box.height }
  }
  function priceAt(yCoordinate) {
    return Math.max(.01,min+(bottom-Math.min(bottom,Math.max(top,yCoordinate)))/(bottom-top)*(max-min))
  }
  function indexAt(xCoordinate) {
    return Math.max(0,Math.min(history.length-1,Math.round((xCoordinate-LEFT-6)/plotSpan*slots)))
  }
  function pointAt(event) {
    const location=coordinates(event), index=indexAt(location.x)
    let price=priceAt(location.y)
    const bar=history[index]
    let date=bar?.date || new Date().toISOString()
    if(history.length>=2) {
      const position=Math.max(0,Math.min(history.length-1,(location.x-LEFT-6)/plotSpan*slots))
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
    setIntervalMinutes(value);setCursor(null);setOffset(0);setDraft([]);setPriceDomain(null);setSelectedDivergence(null)
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
      if(!event.shiftKey||daily)setRange(Math.max(16,Math.min(190,visibleCount+shift*8)))
      else {
        const current=frames.indexOf(interval)
        const next=frames[Math.max(0,Math.min(frames.length-1,current+shift))]
        if(next!==interval)setFrame(next)
      }
    }
    element.addEventListener('wheel',wheel,{passive:false})
    return ()=>element.removeEventListener('wheel',wheel)
  },[interval,visibleCount,!!daily])

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
    if(event.button===0&&local.x>=plotRight){g.action={type:'priceScale',y:local.y,domain:[min,max]};return}
    setContext(null)
    if(line){select(line.id);g.action={type:'edit',line,handleIndex,point:pointAt(event),domain:[min,max]};return}
    if(event.button===2||!drawing){
      if(event.pointerType!=='touch'){select(null);setLimitDetail(null)}
      g.action={type:'pan',x:local.x,offset}
      if(event.pointerType==='touch'){
        const index=indexAt(local.x)
        g.timer=setTimeout(()=>{g.action={type:'cursor'};setCursor(index)},430)
      }
      return
    }
    if(['horizontal','vertical','ray'].includes(drawing)){addDrawing(drawing,[pointAt(event)]);setDrawing(null);return}
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
    if(action?.type==='priceScale'){
      const center=(action.domain[0]+action.domain[1])/2
      const half=(action.domain[1]-action.domain[0])/2*Math.exp(Math.max(-3,Math.min(3,(local.y-action.y)/180)))
      setPriceDomain([center-half,center+half])
    } else if(action?.type==='pinch'&&g.points.size===2){
      const [a,b]=g.points.values()
      const scale=Math.hypot(a.x-b.x,a.y-b.y)/action.distance
      setRange(Math.max(16,Math.min(190,Math.round(action.count/Math.max(.2,scale)))))
    } else if(action?.type==='pan'){
      if(Math.abs(local.x-action.x)<4)return
      clearTimeout(g.timer)
      setOffset(Math.min(Math.max(0,fullHistory.length-visibleCount),Math.max(0,action.offset+Math.round((local.x-action.x)*slots/plotSpan))))
    } else if(action?.type==='edit'){
      const point=pointAt(event)
      const delta=Date.parse(point.date)-Date.parse(action.point.date), priceDelta=point.price-action.point.price
      const points=action.line.points.map((item,i)=>action.handleIndex==null
        ? {date:new Date(Date.parse(item.date)+delta).toISOString(),price:Math.max(.01,item.price+priceDelta)}
        : i===action.handleIndex?point:item)
      g.preview=points
      setEditPreview({id:action.line.id,points})
    } else if(action?.type==='trend'||action?.type==='freehand'||action?.type==='measure'||action?.type==='rectangle'){
      const point=pointAt(event)
      if(['trend','measure','rectangle'].includes(action.type))action.points=[action.points[0],point]
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
    if(!cancel && action?.points?.length>=2){if(action.type!=='measure')addDrawing(action.type,action.points);setDrawing(null)}
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
    if(!['stop','target'].includes(level.key))return
    plot.current.setPointerCapture(event.pointerId)
    setDrag({key:level.key,domain:[min,max]})
  }
  const levelColors={entry:'#72acff',stop:'#fb8092',target:'#53d6ae',liquidation:'#c5a3fd'}
  const levelRows=[
    {key:'entry',label:'ورود',value:exposure.entry},
    {key:'stop',label:'حد ضرر',value:stop,original:positive(trade.plan.stopPrice)},
    {key:'target',label:'حد سود',value:target,original:positive(trade.plan.targetPrice)},
    {key:'liquidation',label:'Stop Out',value:estimate?.price},
  ].filter(level=>!daily||level.key==='entry')
  const inPlot=price=>price!=null&&price>=min&&price<=max
  const axisLevels=levelRows.filter(level=>inPlot(level.value)&&(showTrades||level.key!=='entry')).sort((a,b)=>y(a.value)-y(b.value))
  let nextLabel=top-18
  const axisPositions=axisLevels.map(level=>{
    const labelY=Math.max(y(level.value),nextLabel+18)
    nextLabel=labelY
    return labelY
  })
  for(let i=axisPositions.length-1;i>=0;i--)axisPositions[i]=Math.min(axisPositions[i],i===axisPositions.length-1?bottom:axisPositions[i+1]-18)
  const selectedLevel=limitDetail&&levelRows.find(level=>level.key===limitDetail)
  const levelDistance=selectedLevel?.value!=null&&displayedPrice!=null?selectedLevel.value-displayedPrice:null
  const closingResult=!daily&&selectedLevel&&xtbScenario(exposure,selectedLevel.value)
  const showDetails=selectedLevel?.value!=null
  const last=history.length-1
  const tickCount=width>=740?6:width>=460?4:3
  const rawStep=(max-min)/Math.max(2,Math.floor((bottom-top)/60))
  const magnitude=10**Math.floor(Math.log10(rawStep))
  const tickStep=([1,2,2.5,5,10].find(value=>value>=rawStep/magnitude)??10)*magnitude
  const firstTick=Math.ceil(min/tickStep)*tickStep
  const priceTicks=Array.from({length:Math.max(0,Math.floor((max-firstTick)/tickStep)+1)},(_,index)=>firstTick+index*tickStep)
  const axisPrice=new Intl.NumberFormat('en-US',{minimumFractionDigits:2,maximumFractionDigits:Math.min(10,Math.max(2,1-Math.floor(Math.log10(tickStep))))})
  const displayedLevel=displayedPrice??fullHistory.at(-1)?.close
  const positionMark=(offset===0?displayedPrice:null)??history.at(-1)?.close
  const displayedY=inPlot(displayedLevel)?y(displayedLevel):null
  const maxVolume=Math.max(1,...history.map(bar=>bar.volume||0))
  const knownEntry=trade.executions.find(event=>event.kind==='entry')
  const entryTime=daily ? daily.entries?.map(entry=>entry.date).sort()[0] : knownEntry&&!knownEntry.observedOpen?knownEntry.date:null
  const entryX=entryTime?anchorX(entryTime):null
  const positionPanel=daily ? <>
    <dl className={styles.quoteStrip}>
      <div><dt>سود و زیان باز</dt><dd data-sign={daily.gainCents<0?'negative':'positive'}><bdi>{daily.gainLabel}</bdi></dd></div>
      <div><dt>تعداد</dt><dd><bdi>{daily.quantityLabel}</bdi></dd></div>
      <div><dt>میانگین بهای خرید</dt><dd><bdi>{daily.entryLabel}</bdi></dd></div>
      <div><dt>آخرین قیمت مرجع</dt><dd><bdi>{formatPrice(displayedPrice)} {currency}</bdi></dd></div>
    </dl>
    <button type="button" onClick={daily.onTransactions}>تراکنش‌های این دارایی</button>
  </> : <>
    <dl className={styles.quoteStrip}>
      <div><dt>سود و زیان باز · برآوردی</dt><dd data-sign={pnl?.percent<0?'negative':'positive'}><bdi>{eurAmount(pnl)||'—'}</bdi></dd>
        <small>{currentPrice!=null?'قیمت واردشدهٔ XTB':'مرجع برنت'}</small></div>
      <div><dt>حجم</dt><dd><bdi>{Number(exposure.volume.toPrecision(8))}</bdi></dd></div>
      <div><dt>میانگین ورود</dt><dd><bdi>{formatPrice(exposure.entry)} {currency}</bdi></dd></div>
      <div><dt>{displayedPrice!=null?'قیمت فعلی':'آخرین پایانی'}</dt><dd><bdi>{formatPrice(displayedLevel)} {currency}</bdi></dd>
        {currentPrice==null&&referenceMarket?.quote?.asOf&&<small><bdi>{berlinTime(referenceMarket.quote.asOf)} برلین</bdi></small>}</div>
    </dl>
  </>
  const exitPanel = !daily && <>
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

  return <section className={styles.card} data-fullscreen={fullscreen} data-rsi={indicators.rsi} data-macd={indicators.macd} aria-label={daily?'نمودار دارایی Trade Republic':'نمودار و سناریوی موقعیت XTB'}>
        <header className={styles.header}>
          <button type="button" aria-label={fullscreen?'خروج از تمام صفحه':'تمام صفحه'} title="تمام صفحه" onClick={()=>setFullscreen(value=>!value)}><Icon name="expand"/></button>
          <div><small>{daily?['Trade Republic',daily.ownerLabel].filter(Boolean).join(' · '):direction===1?'XTB · خرید':'XTB · فروش'}</small><h2 dir="auto">{trade.plan.name}</h2></div>
          {daily&&<button type="button" disabled={daily.busy||!daily.onRefresh} onClick={daily.onRefresh}>{daily.busy?'در حال دریافت…':'به‌روزرسانی'}</button>}
          {exposure.isBrent&&<button type="button" disabled={busy} onClick={refresh}>{busy?'در حال دریافت…':'به‌روزرسانی'}</button>}
        </header>
        <div className={styles.scenarios}>{positionPanel}</div>
        <div className={styles.chart}>
        <div className={styles.chartTools} aria-label="تایم‌فریم و پیش‌بینی">
          <label className={styles.timeframe}>تایم‌فریم <select value={interval} onChange={event=>setFrame(/^\d+$/.test(event.target.value)?Number(event.target.value):event.target.value)}>
            {frames.map(value=><option key={value} value={value} disabled={daily&&typeof value==='number'}>{({'1d':'روزانه','1w':'هفتگی','1mo':'ماهانه',60:'۱ ساعت',240:'۴ ساعت'})[value]||value+' دقیقه'}</option>)}
          </select></label>
          <button type="button" aria-pressed={showPatterns} onClick={()=>setShowPatterns(value=>!value)}>الگوهای قیمت</button>
          <button type="button" aria-pressed={showTrades} onClick={()=>setShowTrades(value=>!value)}>معاملات روی نمودار</button>
          {offset>0&&<button type="button" onClick={()=>setOffset(0)}>آخرین کندل‌ها</button>}
          <IndicatorGuide/>
          <button type="button" aria-expanded={indicatorTools} onClick={()=>setIndicatorTools(value=>!value)}>اندیکاتورها</button>
        </div>
        <div className={styles.chartBody}>
        <div className={styles.drawingTools} data-open={true}>
          <div className={styles.chartTools} aria-label="ابزار رسم">
            {[['trend','خط صاف'],['freehand','آزاد'],['arrow','مسیر فلش'],['horizontal','خط افقی'],['measure','اندازه‌گیری فاصله'],['vertical','خط عمودی'],['ray','پرتو افقی'],['rectangle','مستطیل']].map(([key,label])=>
              <button type="button" key={key} aria-pressed={drawing===key} disabled={!history.length} onClick={()=>chooseDrawing(key)} aria-label={label} title={label}><Icon name={key}/></button>)}

            {drawing==='arrow'&&<button type="button" disabled={draft.length<2} onClick={completeArrow}>ثبت مسیر</button>}
          </div>
          <div className={styles.chartTools}>
            <button type="button" title="بازنشانی نما" aria-label="بازنشانی نما" onClick={()=>{setPriceDomain(null);setRange(null);setOffset(0)}}><Icon name="refresh"/></button>
            <button type="button" title="منوی نمودار" aria-label="منوی نمودار" onClick={event=>openContext(event,displayedPrice||exposure.entry||1)}><Icon name="menu"/></button>
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
        {indicatorTools&&<div className={styles.chartTools} aria-label="اندیکاتورها">
          {[...averages,['rsi','RSI 14','#a9d5cf'],['atr','ATR 14','#dfba75'],['vwap','VWAP','#e0a0da'],['macd','MACD','#eac67b'],['bands','Bollinger','#8198cc']].map(([key,label,color])=><button key={key} style={{color}} type="button" aria-pressed={indicators[key]} onClick={()=>setIndicators(previous=>({...previous,[key]:!previous[key]}))}>{label}</button>)}
        </div>}
        {drawing==='arrow'&&<p>نقطه‌ها را با دوبارکلیک یا لمس اضافه کن و «ثبت مسیر» را بزن.</p>}
        {!history.length&&<p>برای دریافت تاریخچه، «به‌روزرسانی» را بزن.</p>}
        {daily&&history.length>0&&history.some(row=>row.open==null||row.low==null||row.high==null)&&<p>در روزهایی که منبع فقط قیمت پایانی دارد، همان قیمت با یک نقطه نمایش داده می‌شود.</p>}
        <div className={styles.plotWrap}>
        <div className={styles.chartLegend}>
          {activeBar&&<span className={styles.ohlc}><bdi>O {formatPrice(activeBar.open)} · H {formatPrice(activeBar.high)} · L {formatPrice(activeBar.low)} · C {formatPrice(activeBar.close)}</bdi></span>}
          {indicators.atr&&<span title="میانگین دامنهٔ واقعی نوسان"><bdi>ATR 14 {formatPrice(atrValues[historyStart+(cursor??history.length-1) ])} {currency}</bdi></span>}
          {visibleAverages.map(([key,label,color])=><span key={key} style={{color}}><bdi>{label} {formatPrice(activeBar?.[key])}</bdi></span>)}
        </div>
        <svg ref={plot} className={styles.plot} data-drawing={!!drawing} viewBox={`0 0 ${width} ${height}`} role="group" aria-label="نمودار کندلی و سطح‌های موقعیت"
          onPointerDown={beginChart} onPointerMove={move} onPointerLeave={event=>{if(event.pointerType!=='touch'&&!gestures.current.action)setCursor(null)}} onPointerUp={event=>finish(event)} onPointerCancel={event=>finish(event,true)}
          onContextMenu={event=>{event.preventDefault();openContext(event,priceAt(coordinates(event).y))}} onDoubleClick={addArrowPoint}>
          <defs>
            {[['up','#17735c','#b1edce'],['down','#812b39','#f19aaa']].map(([key,dark,light])=><linearGradient key={key} id={gradient+'-'+key}><stop offset="0" stopColor={dark}/><stop offset=".45" stopColor={light}/><stop offset="1" stopColor={dark}/></linearGradient>)}
            <clipPath id={gradient+'-plot'}><rect x={LEFT} y={top} width={plotRight-LEFT} height={bottom-top}/></clipPath>
            <marker id={gradient+'-arrow'} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0L6 3L0 6Z" fill="context-stroke"/></marker>
          </defs>
          <rect x={plotRight} y={top} width={AXIS} height={bottom-top} className={styles.priceAxis}><title>محور قیمت را بالا یا پایین بکشید</title></rect>
          {priceTicks.map(value=><g key={value}><line x1={LEFT} x2={plotRight} y1={y(value)} y2={y(value)} stroke="#26323e"/><text x={width-8} y={y(value)+4} textAnchor="end" pointerEvents="none">{axisPrice.format(value)}</text></g>)}
          {[0,.2,.4,.6,.8,1].map(step=><line key={step} x1={LEFT+plotSpan*step} x2={LEFT+plotSpan*step} y1={top} y2={bottom} stroke="#222d36"/>)}
          <g clipPath={`url(#${gradient}-plot)`}>
            {showTrades&&history.length>0&&spans.map(span=>{
              const mark=span.exit?span.exit.price:positionMark
              const entry=span.entry
              const entryPrice=entry?.price
              const end=span.exit?.date
              const start=entry?.observedOpen?null:entry?.date
              const compatible=(!entry?.currency||entry.currency===currency)&&(!span.exit?.currency||span.exit.currency===currency)
              const startX=start?anchorX(start):end?anchorX(end):x(last)
              const endX=end?anchorX(end):x(last)
              if (endX<LEFT || startX>x(last)+1) return null
              const color=start&&compatible&&entryPrice>0&&mark>0?((mark-entryPrice)*span.direction>=0?'#43bc91':'#ce6578'):'#9db1c6'
              const canShade=start&&compatible&&entryPrice>0&&mark>0
              const bandTop=canShade?Math.min(y(entryPrice),y(mark)):top
              const bandHeight=canShade?Math.max(2,Math.abs(y(entryPrice)-y(mark))):bottom-top
              return <g key={span.id} pointerEvents="none"><title>{end?'معاملهٔ بسته':'موقعیت باز'} · {span.quantity}{start?' · ورود '+berlinTime(start):' · تاریخ ورود نامشخص'}</title>
                {(start||!end)&&<rect x={Math.max(LEFT,startX)} y={bandTop} width={Math.max(2,Math.min(x(last),endX)-Math.max(LEFT,startX))} height={bandHeight} fill={color} opacity={span.current||!end?'.12':'.08'}/>}
                {end&&endX<=x(last)+1&&<line x1={endX} x2={endX} y1={top} y2={bottom} stroke={color} strokeDasharray="3 5" opacity=".6"/>}
              </g>
            })}
            {showPatterns&&patterns.filter(pattern=>pattern.end>=historyStart&&pattern.confirmed<historyEnd).map(pattern=>{
              const left=x(pattern.start-historyStart),right=x(pattern.end-historyStart)
              const label=pattern.ascending?'مثلث صعودی':'مثلث نزولی'
              const color=pattern.ascending?'#78dfc4':'#efb172'
              return <g key={pattern.start+':'+pattern.confirmed} aria-label={label} pointerEvents="none">
                <polygon points={left+','+y(pattern.upper[0])+' '+right+','+y(pattern.upper[1])+' '+right+','+y(pattern.lower[1])+' '+left+','+y(pattern.lower[0])} fill={color} fillOpacity=".09" stroke={color} strokeWidth="1.5" strokeDasharray="5 4"/>
                <text x={Math.max(LEFT+6,left+5)} y={Math.max(top+14,y(pattern.upper[0])-6)} style={{fill:color}}>{label}</text>
                {pattern.breakout&&<circle cx={right} cy={y(fullHistory[pattern.end].close)} r="4" fill={color} aria-label={pattern.breakout==='up'?'شکست رو به بالا':'شکست رو به پایین'}/>}
              </g>
            })}
            {history.map((bar,i)=>{
              const color=bar.close>=bar.open?'#53d6ae':'#fb8092'
              const volume=(bar.volume||0)/maxVolume*32
              return <g key={bar.date}><rect x={x(i)-candleWidth/2} y={bottom-volume} width={candleWidth} height={volume} fill={color} opacity=".22"/>
                {['open','high','low'].every(key=>Number.isFinite(bar[key])) ? <>
                  <line x1={x(i)} x2={x(i)} y1={y(bar.high)} y2={y(bar.low)} stroke={color}/><rect x={x(i)-candleWidth/2} y={Math.min(y(bar.open),y(bar.close))} width={candleWidth} height={Math.max(1,Math.abs(y(bar.close)-y(bar.open)))} fill={`url(#${gradient}-${bar.close>=bar.open?'up':'down'})`}/>
                </> : <circle cx={x(i)} cy={y(bar.close)} r="2" fill="#aebdd4"/>}</g>
            })}
            {divergences.filter(item=>item.to.date>=history[0]?.date&&item.confirmedAt<=history.at(-1)?.date).map(item=><g key={item.id} role="button" tabIndex={0} aria-label={item.bullish?'واگرایی صعودی RSI':'واگرایی نزولی RSI'} onPointerDown={event=>event.stopPropagation()} onClick={()=>setSelectedDivergence(item.id===selectedDivergence?null:item.id)} onKeyDown={event=>{if(event.key==='Enter')setSelectedDivergence(item.id)}}>
              <text x={anchorX(item.to.date)} y={y(item.to[item.side])+(item.bullish?20:-12)} textAnchor="middle" style={{fontSize:18,cursor:'pointer'}}>🧐</text><title>{item.bullish?'واگرایی صعودی':'واگرایی نزولی'} · تأیید {item.confirmedAt}</title>
            </g>)}
            {divergence&&<line x1={anchorX(divergence.from.date)} x2={anchorX(divergence.to.date)} y1={y(divergence.from[divergence.side])} y2={y(divergence.to[divergence.side])} stroke="#e8c37a" strokeWidth="2"/>}
            {indicators.vwap&&<path d={history.map((row,i)=>vwapValues[historyStart+i]==null?'':((i&&vwapValues[historyStart+i-1]!=null?'L':'M')+x(i)+','+y(vwapValues[historyStart+i]))).join(' ')} fill="none" stroke="#e0a0da" strokeWidth="1.5"/>}
            {indicators.bands&&['bbUpper','bbLower'].map(key=><path key={key} d={seriesPath(key,y)} fill="none" stroke="#8198cc" strokeDasharray="3 3"/>)}
            {visibleAverages.map(([key,,color])=><path key={key} d={seriesPath(key,y)} fill="none" stroke={color} vectorEffect="non-scaling-stroke"/>)}
            {showTrades&&entryX!=null&&<g aria-label="زمان ورود"><line x1={entryX} x2={entryX} y1={top} y2={bottom} stroke={levelColors.entry} strokeDasharray="4 4"/><text x={Math.max(LEFT+4,entryX+5)} y={bottom-24} fill={levelColors.entry}>ورود {berlinTime(entryTime)}</text><title>{entryTime.includes('T')?'زمان ورود به وقت برلین':'روز ورود؛ ساعت دقیق ثبت نشده'}</title></g>}
            {showTrades&&daily?.entries.map(entry=>{
              const i=history.findIndex(row=>row.date>=entry.date)
              if(i<0||entry.date<history[0].date)return null
              const matchingPrice=entry.currency===currency&&inPlot(entry.price)
              return <circle key={entry.id} cx={x(i)} cy={matchingPrice?y(entry.price):bottom-8} r="4" fill={levelColors.entry}
                tabIndex={0} aria-label={`خرید ${entry.date} · ${formatPrice(entry.price)} ${entry.currency||''}`}>
                <title>{`خرید ${entry.date} · ${formatPrice(entry.price)} ${entry.currency||''}`}</title>
              </circle>
            })}
            {displayedY!=null&&<line x1={LEFT} x2={plotRight} y1={displayedY} y2={displayedY} stroke="#91b8bd" strokeDasharray="2 5"/>}
            {levelRows.filter(level=>showTrades||level.key!=='entry').map(level=><g key={level.key}>
              {level.original!=null&&level.original!==level.value&&<line x1={LEFT} x2={plotRight} y1={y(level.original)} y2={y(level.original)} stroke={levelColors[level.key]} opacity=".38" strokeDasharray="3 5"/>}
              {inPlot(level.value)&&<g className={level.original!=null?styles.handle:undefined}
                onPointerEnter={()=>setLimitDetail(level.key)} onPointerLeave={()=>{if(!drag)setLimitDetail(null)}}
                onPointerDown={event=>startLevel(event,level)}>
                <line x1={LEFT} x2={plotRight} y1={y(level.value)} y2={y(level.value)} stroke={levelColors[level.key]} strokeDasharray="5 4"/>
                <line x1={plotRight-84} x2={plotRight} y1={y(level.value)} y2={y(level.value)} stroke="transparent" strokeWidth="14"/>
              </g>}
            </g>)}
            {lines.map(line=>{
              const points=editPreview?.id===line.id?editPreview.points:line.points
              const path=drawingPath(line.type,points)
              return <g key={line.id}>
                <path d={path} stroke={line.color} strokeWidth="2" fill="none" markerEnd={line.type==='arrow'?`url(#${gradient}-arrow)`:undefined}/>
                <path d={path} stroke="transparent" strokeWidth="14" fill="none" className={styles.handle}
                  onPointerDown={event=>{if(drawing||event.button===2)return;event.stopPropagation();begin(event,line)}}/>
                {line.id===selected&&line.type!=='horizontal'&&points.filter((_,index)=>line.type!=='freehand'||index===0||index===points.length-1).map((point,index)=>
                  <circle key={index} cx={anchorX(point.date)} cy={y(point.price)} r="5" fill={line.color} className={styles.handle}
                    onPointerDown={event=>{event.stopPropagation();begin(event,line,points.indexOf(point))}}/>)}
              </g>
            })}
            {draft.length>0&&<><path d={drawingPath(drawing,draft)} fill="none" stroke="#b3d8ff" strokeWidth="2"/>
              {drawing==='arrow'&&draft.map((point,index)=><circle key={index} cx={anchorX(point.date)} cy={y(point.price)} r="3" fill="#b3d8ff"/>)}</>}
            {cursor!=null&&activeBar&&<g pointerEvents="none">
              <line x1={x(cursor)} x2={x(cursor)} y1={top} y2={bottom} stroke="#8192a7" strokeDasharray="3 4"/>
              <line x1={LEFT} x2={plotRight} y1={y(activeBar.close)} y2={y(activeBar.close)} stroke="#8192a7" strokeDasharray="3 4"/>
              <circle cx={x(cursor)} cy={y(activeBar.close)} r="3" fill="#cbe3fa"/>
            </g>}
          </g>
          {displayedY!=null&&!axisPositions.some(position=>Math.abs(position-displayedY)<18)&&<g pointerEvents="none"><rect x={plotRight+3} y={displayedY-9} width={AXIS-7} height="18" rx="4" fill="#29454d"/><text x={width-8} y={displayedY+4} textAnchor="end">{axisPrice.format(displayedLevel)}</text></g>}
          {axisLevels.map((level,i)=><g key={level.key} className={styles.handle} role="button" tabIndex={0}
            aria-label={level.label+' '+formatPrice(level.value)} onFocus={()=>setLimitDetail(level.key)} onBlur={()=>setLimitDetail(null)}
            onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();setLimitDetail(level.key)}}}
            onPointerDown={event=>startLevel(event,level)}>
            <rect x={plotRight+2} y={axisPositions[i]-9} width={AXIS-4} height="18" rx="3" fill={levelColors[level.key]}/>
            <text className={styles.axisLabel} x={plotRight+AXIS/2} y={axisPositions[i]+4} textAnchor="middle">{level.label} {formatPrice(level.value)}</text>
          </g>)}
          {history.length>1&&[...new Set(Array.from({length:tickCount},(_,index)=>Math.round(last*index/(tickCount-1))))].map((i,index)=><text key={i} x={x(i)} y={height-8} textAnchor={index===0?'start':i===last?'end':'middle'}>{berlinTime(history[i].date)}</text>)}
        </svg>
        {drawing==='measure'&&draft.length===2&&<div className={styles.tooltip}><bdi>{signedFormat.format(draft[1].price-draft[0].price)} {currency} · {signedFormat.format((draft[1].price/draft[0].price-1)*100)}٪</bdi></div>}
        {context&&<div className={styles.context} style={{left:`clamp(4px, ${context.x}px, calc(100vw - 224px))`,top:`clamp(4px, ${context.y}px, calc(100dvh - 300px))`}} role="menu" aria-label="عملیات نمودار" onKeyDown={event=>{if(event.key==='Escape')setContext(null)}}>
          <bdi>{formatPrice(context.price)} {currency}</bdi>
          <button type="button" role="menuitem" onClick={()=>{addDrawing('horizontal',[{date:history.at(-1)?.date||new Date().toISOString(),price:context.price}]);setContext(null)}}>خط افقی در این قیمت</button>
          {!daily&&Object.entries(limitLabels).map(([key,label])=><button type="button" role="menuitem" key={key} onClick={()=>{setLimits(previous=>({...previous,[key]:context.price.toFixed(2)}));setContext(null)}}>{label} در این قیمت</button>)}
          <button type="button" role="menuitem" onClick={()=>{setPriceDomain(null);setRange(null);setOffset(0);setContext(null)}}>بازنشانی نما</button>
          {onTransaction&&[['entry','ثبت خرید / ورود'],['exit','ثبت فروش / خروج']].map(([kind,label])=><button key={kind} type="button" role="menuitem" onClick={()=>{setContext(null);setFullscreen(false);onTransaction(kind)}}>{label}</button>)}
          <button type="button" role="menuitem" onClick={()=>setContext(null)}>بستن</button>
        </div>}
        {showDetails ? <div className={styles.tooltip} role="status">
          <strong>{selectedLevel.label} <bdi>{formatPrice(selectedLevel.value)} {currency}</bdi></strong>
          <strong>فاصله <bdi>{levelDistance==null?'—':`${signedFormat.format(levelDistance)} ${currency} · ${signedFormat.format(levelDistance/displayedPrice*100)}٪`}</bdi></strong>
          {!daily&&<small>سود و زیان برآوردی <bdi>{eurAmount(closingResult)||'—'}</bdi></small>}
        </div> : cursor!=null&&activeBar&&<div className={styles.candleTip} style={{left:`clamp(4px, ${x(cursor)/width*100}%, calc(100% - 162px))`}}>
          <bdi>{berlinTime(activeBar.date)}{activeBar.date.includes('T')&&' برلین'}</bdi>
        </div>}
        </div>
        {indicators.rsi&&history.length>0&&<div className={styles.rsi}>
          <div className={styles.rsiTitle}><bdi>RSI 14 · {formatPrice(activeBar?.rsi)}</bdi></div>
          <svg {...panelResize(rsiHeight,setRsiHeight)} className={styles.resizePlot} style={{height:rsiHeight}} viewBox={`0 0 ${width} ${rsiHeight}`} role="img" aria-label="نمودار RSI، برای تغییر ارتفاع بکشید">
            {[30,70].map(level=><line key={level} x1={LEFT} x2={plotRight} y1={(rsiHeight-8)-level*(rsiHeight-16)/100} y2={(rsiHeight-8)-level*(rsiHeight-16)/100} stroke="#65778a" strokeDasharray="4 4"/>)}
            {divergence&&<line x1={anchorX(divergence.from.date)} x2={anchorX(divergence.to.date)} y1={(rsiHeight-8)-divergence.from.rsi*(rsiHeight-16)/100} y2={(rsiHeight-8)-divergence.to.rsi*(rsiHeight-16)/100} stroke="#e8c37a" strokeWidth="2"/>}
            <path d={seriesPath('rsi',value=>(rsiHeight-8)-value*(rsiHeight-16)/100)} fill="none" stroke="#a9d5cf" strokeWidth="2" vectorEffect="non-scaling-stroke"/>
          </svg>
        </div>}
        {indicators.macd&&history.length>0&&<div className={styles.rsi}>
          <bdi>MACD 12, 26, 9</bdi>
          <svg {...panelResize(macdHeight,setMacdHeight)} className={styles.resizePlot} style={{height:macdHeight}} viewBox={`0 0 ${width} 100`} preserveAspectRatio="none" role="img" aria-label="MACD، برای تغییر ارتفاع بکشید">
            {(()=>{const extent=Math.max(.001,...history.flatMap(row=>[row.macd,row.signal,row.histogram]).filter(Number.isFinite).map(Math.abs));const scale=value=>50-value/extent*42;return <>
              <line x1={LEFT} x2={plotRight} y1="50" y2="50" stroke="#58606a"/>
              {history.map((row,i)=>row.histogram!=null&&<rect key={row.date} x={x(i)-candleWidth/2} y={Math.min(50,scale(row.histogram))} width={candleWidth} height={Math.max(1,Math.abs(scale(row.histogram)-50))} fill={row.histogram>=0?'#65bfa0':'#c77785'}/>)}
              <path d={seriesPath('macd',scale)} fill="none" stroke="#83baff"/><path d={seriesPath('signal',scale)} fill="none" stroke="#eac67b"/>
            </>})()}
          </svg>
        </div>}
        {indicators.vwap&&<p>{daily?'VWAP از ابتدای تاریخچهٔ ذخیره‌شده':'VWAP جلسهٔ روزانهٔ UTC · حجم قرارداد مرجع'}</p>}
        </div>
        {!daily&&<details className={styles.exitPanel}><summary>سناریوی خروج · حد سود، حد ضرر و Stop Out</summary><div className={styles.exitControls}>{exitPanel}</div></details>}
        {entryTime&&!entryTime.includes('T')&&<p>خط ورود تاریخ ثبت‌شده را نشان می‌دهد.</p>}
        {!daily&&knownEntry?.observedOpen&&<p>زمان بازشدن این موقعیت در سابقه ثبت نشده است.</p>}
        {candles&&<p>{daily?.market?.quote?.source || 'برنت مرجع'} · آخرین داده <bdi>{berlinTime(history.at(-1).date)}{history.at(-1).date.includes('T')&&' برلین'}</bdi></p>}
        {daily?.notice&&<p role="status">{daily.notice}</p>}
        {daily?.error&&<p role="alert">{daily.error}</p>}
        {error&&<p role="alert">{error}</p>}
      </div>

  </section>
}
