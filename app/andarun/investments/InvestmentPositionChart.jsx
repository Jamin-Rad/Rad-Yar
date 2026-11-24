'use client'

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { browserChartStorage, readChartDrawings, readChartHistories, readChartMark, saveChartMark, latestReferenceMark, saveChartHistory } from '@/lib/investments/local-asset-chart.mjs'
import { normalizeDailyHistory, technicalHistory } from '@/lib/investments/indicators.mjs'
import { anchoredOffset, chartTimes, chartViewport, priceStepDigits, timeIndex, XTB_DRAWING_COLORS, XTB_INTERVALS, xtbBars } from '@/lib/investments/xtb-chart.mjs'
import { estimateXtbStopOut, valueXtbAccount, xtbExposure, xtbScenario } from '@/lib/investments/xtb-risk.mjs'
import { aggregateDaily, rsiDivergences, atr, vwap, pricePatterns, tradeSpans } from '@/lib/investments/chart-analysis.mjs'
import Icon from './InvestmentIcon'
import { xtbMarkets } from '@/lib/investments/xtb-markets.mjs'
import PatternOverlay, {snapshotPattern} from './PatternOverlay'
import ChartContextMenu from './ChartContextMenu'
import {readIntradayArchive,extendIntradayArchive,mergeIntradayRows} from '@/lib/investments/intraday-archive.mjs'
import IndicatorGuide from './IndicatorGuide'
import { DrawingPalette, IndicatorPicker, patternFamilies } from './ChartControls'
import styles from './InvestmentPositionChart.module.css'

import ChartHistoryNavigator from './ChartHistoryNavigator'
import ChartCandleLens from './ChartCandleLens'
import ChartPriceSeries, { RsiTrace, MacdTrace } from './ChartPriceSeries'
import { chartFeedQuery, visiblePriceDomain, viewStatistics } from '@/lib/investments/chart-inspection.mjs'
import { berlinTime, chartPrice as formatPrice, frameLabels, signedFormat } from './chart-format'

const frames = [...XTB_INTERVALS,'1d','1w','1mo']
const dailyFrames = frames.filter(frame => typeof frame === 'string')
const clampPanel = value => Math.max(48,Math.min(300,value))
const stopOutSource = 'https://www.xtb.com/de/hilfe-center/handelskonto/was-ist-der-stop-out'
const positive = value => Number(value) > 0 && Number.isFinite(Number(value)) ? Number(value) : null
const currencyReference=plan=>plan.currency==='USD'?xtbMarkets.find(market=>market.symbol===plan.symbol?.trim().toUpperCase())?.reference:null
const limitLabels = { stop: 'حد ضرر', target: 'حد سود' }
const fields = [['price', 'قیمت خروج فعلی در XTB (دلار)'], ['equity', 'ارزش فعلی حساب (یورو)'], ['margin', 'مارجین مصرف‌شده (یورو)'], ['fx', 'ارزش یک دلار به یورو']]
const fibLevels=[0,.236,.382,.5,.618,.786,1]
const indicatorDefaults={ema20:true,sma50:true,sma200:false,rsi:true,vwap:true,macd:true,atr:true,bands:false}
const FUTURE_SLOTS = 30
const noDrawings = []
const LEFT = 12, AXIS = 82, TOP = 42
const averages = [['ema20','EMA 20','#f1c975'],['sma50','SMA 50','#91c5ff'],['sma200','SMA 200','#d5a7fa']]

export default function InvestmentPositionChart({ trade, openCount, drawings = noDrawings, onDrawings, daily, onTransaction, symbolTrades, watchMarket, accountQuote, onReferenceQuote }) {
  const exposure = useMemo(()=>daily ? { direction:1, entry:daily.entry, volume:daily.quantity } : xtbExposure(trade),[trade,daily?.entry,daily?.quantity,!!daily])
  const reference=watchMarket?.reference??(exposure.isBrent?'BZ=F':!daily&&currencyReference(trade.plan))
  const recordedLimits=trade.brokerSnapshot??trade.plan
  const [limits, setLimits] = useState({ stop: recordedLimits.stopPrice || '', target: recordedLimits.targetPrice || '' })
  const [referenceMarket, setReferenceMarket] = useState(null)
  const [referenceMark, setReferenceMark] = useState(null)
  const request = useRef(null)
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
  const [pointer, setPointer] = useState(null)
  const frameAnchor = useRef(null)
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
    const close = event => { if (event.key === 'Escape' && !event.defaultPrevented && !document.querySelector('dialog[open]')) setFullscreen(false) }
    document.addEventListener('keydown', close)
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', close)
    }
  }, [fullscreen])
  const panelDrag = useRef(null)
  const availableFrames = daily ? dailyFrames : frames
  const [lensOpen, setLensOpen] = useState(true)
  const [pickAnchor, setPickAnchor] = useState(false)
  const [anchorDate, setAnchorDate] = useState(null)
  const [rsiHeight, setRsiHeight] = useState(75)
  const [macdHeight, setMacdHeight] = useState(78)
  const [panel, setPanel] = useState(null)
  const patternControl=useRef(null)
  useEffect(()=>{
    if(panel!=='patterns')return
    const close=e=>{if(!patternControl.current?.contains(e.target))setPanel(null)}
    document.addEventListener('pointerdown',close)
    return ()=>document.removeEventListener('pointerdown',close)
  },[panel])
  const [measurement,setMeasurement]=useState(null)
  const [limitDetail, setLimitDetail] = useState(null)
  const [family,setFamily]=useState(null)
  const [patternType,setPatternType]=useState('')
  const [occurrence,setOccurrence]=useState('')
  const [channelBase,setChannelBase]=useState(null)
  const [editAnchor,setEditAnchor]=useState(null)
  const [showTrades,setShowTrades]=useState(Boolean(daily?.focusId))
  const [tradeLayer,setTradeLayer]=useState(Boolean(daily?.focusId || (!daily && !watchMarket && exposure.volume>0)))
  const [filter,setFilter]=useState('all')
  const [selectedLot,setSelectedLot]=useState(null)
  const initialLot=useRef(null)
  const [indicators, setIndicators] = useState(indicatorDefaults)
  const displaySymbol = (trade.plan.symbol || '').toUpperCase()
  const symbol = daily ? 'TR:' + daily.identity : displaySymbol
  const prefsKey = 'andarun-xtb-view-v2:' + (daily ? 'TR:'+trade.ownerId+':'+trade.id : symbol)
  const drawingsKey = daily?.legacyKey ?? JSON.stringify(['xtb', trade.ownerId, trade.id, trade.plan.symbol, trade.plan.currency])
  const gradient = useId()
  const plot = useRef(null)
  const gestures = useRef({ points:new Map(), action:null, timer:null, wheel:0 })
  useEffect(() => {
    const storage = browserChartStorage()
    let active=true
    if (reference) {
      const cache = readChartHistories(storage,[reference,reference+':5m',reference+':15m'])
      setReferenceMarket(cache[reference])
      setReferenceMark(readChartMark(storage,reference))
      const legacyBars = {5:cache[reference+':5m'],15:cache[reference+':15m']}
      setIntraday(legacyBars)
      for(const n of [5,15])readIntradayArchive(`${reference}:${n}m`).then(rows=>{
        if(active&&rows.length)setIntraday(prev=>prev[n]!==legacyBars[n]?prev:{...prev,[n]:{history:mergeIntradayRows(prev[n]?.history,rows)}})
      }).catch(()=>{})
    }
    try {
      const saved = JSON.parse(storage?.getItem(prefsKey))
      if (typeof saved?.lensOpen === 'boolean') setLensOpen(saved.lensOpen)
      if (Number.isFinite(saved?.rsiHeight)) setRsiHeight(clampPanel(saved.rsiHeight))
      if (Number.isFinite(saved?.macdHeight)) setMacdHeight(clampPanel(saved.macdHeight))
      setIndicators(Object.fromEntries(Object.entries(indicatorDefaults).map(([key,initial])=>[key,typeof saved?.indicators?.[key]==='boolean'?saved.indicators[key]:initial])))
      if (frames.includes(saved?.interval) && (!daily || typeof saved.interval==='string')) setIntervalMinutes(saved.interval)
      if (Number.isInteger(saved?.range) && saved.range>=16 && saved.range<=190) setRange(saved.range)
    } catch {}
    setLoaded(true)
    const observer = new ResizeObserver(([entry])=>setSize({ width:Math.max(150,entry.contentRect.width), height:Math.max(120,entry.contentRect.height) }))
    observer.observe(plot.current)
    const interaction = gestures.current
    return ()=>{active=false;request.current?.abort();observer.disconnect();clearTimeout(interaction.timer)}
  }, [reference,prefsKey])
  useEffect(()=>{
    if (!loaded) return
    try { browserChartStorage()?.setItem(prefsKey,JSON.stringify({interval,range,indicators,lensOpen,rsiHeight,macdHeight})) } catch {}
  },[loaded,prefsKey,interval,range,indicators,lensOpen,rsiHeight,macdHeight])
  const [legacy, setLegacy] = useState([])
  useEffect(()=>{
    const storage=browserChartStorage()
    try { if(storage?.getItem(drawingsKey+'-imported')) return } catch {}
    setLegacy(readChartDrawings(storage,drawingsKey).map((line,index)=>({
      id:`legacy-${trade.ownerId}-${index}-${trade.id}`.replace(/[^a-zA-Z0-9_-]/g,'_').slice(0,80),symbol,scope:trade.ownerId,type:line.type,color:XTB_DRAWING_COLORS[0],
      points:line.end?[line.start,line.end]:[line.start],
    })))
  },[drawingsKey,symbol,trade.id,trade.ownerId])
  const allDrawings=useMemo(()=>[...drawings,...legacy.filter(line=>!drawings.some(saved=>saved.id===line.id))],[drawings,legacy])
  const lines=useMemo(()=>allDrawings.filter(line=>line.symbol===symbol&&(line.scope==='shared'||line.scope===trade.ownerId)),[allDrawings,symbol,trade.ownerId])
  const selectedLine=lines.find(line=>line.id===selected)

  const currency = trade.plan.currency
  const currentPrice = positive(snapshot.price)
  const sourceMarket = useMemo(() => daily ? daily.market : latestReferenceMark(reference,
    referenceMark, referenceMarket, accountQuote && {quote:{...accountQuote,symbol:reference},fx:{latest:{rate:accountQuote.eurRate}}}
  ),[daily?.market,reference,referenceMark,referenceMarket,accountQuote])
  const fx = currency==='EUR' ? 1 : positive(snapshot.fx) ?? positive(sourceMarket?.fx?.latest?.rate)
  const eurAmount = scenario => scenario?.amount != null && fx != null ? signedFormat.format(scenario.amount * fx) + ' €' : null
  const stock = intraday[interval === 5 ? 5 : 15]?.history
  const dailyHistory = daily?.market?.history || referenceMarket?.history
  const fullHistory = useMemo(() => {
    if (typeof interval === 'number') return technicalHistory(xtbBars(stock,interval),Date.now(),true)
    const sessions = normalizeDailyHistory(dailyHistory)
    return technicalHistory(aggregateDaily(sessions,interval),Date.now(),true)
  }, [stock,interval,dailyHistory])
  const latestBar = fullHistory.at(-1)
  const latestBarTime = latestBar && (typeof interval==='number'
    ? new Date(Date.parse(latestBar.date)+interval*60000).toISOString() : latestBar.lastSession ?? latestBar.date)
  const quote = sourceMarket?.quote
  const broker = !daily && trade.brokerSnapshot
  const quoteTime = Date.parse(quote?.asOf)
  const barTime = Date.parse(latestBarTime)
  const brokerTime = Date.parse(broker?.observedDate)
  const useBroker = positive(broker?.price) && Number.isFinite(brokerTime) &&
    brokerTime > (Number.isFinite(quoteTime)?quoteTime:-Infinity) && brokerTime > (Number.isFinite(barTime)?barTime:-Infinity)
  const useQuote = positive(quote?.price) && Number.isFinite(quoteTime) && (!Number.isFinite(barTime) || quoteTime>=barTime)
  const displayedPrice = currentPrice ?? (useBroker ? broker.price : useQuote ? quote.price : latestBar?.close ?? positive(broker?.price))
  const priceLabel = currentPrice!=null ? 'قیمت واردشدهٔ XTB' : useBroker ? 'آخرین ثبت XTB' : useQuote ? 'آخرین قیمت مرجع' : latestBar ? 'آخرین پایانی موجود' : positive(broker?.price) ? 'آخرین ثبت XTB' : 'قیمت مرجع'
  const priceTime = currentPrice!=null ? null : useBroker ? broker.observedDate : useQuote ? quote.asOf : latestBarTime
  const source = daily ? (daily.market?.quote?.source || 'منبع دارایی') : reference ? 'Yahoo Finance' : 'XTB'
  const pricedFromMark = exposure.isBrent && (!useBroker || currentPrice!=null) && displayedPrice>0 && fx>0
  const openResult = useMemo(() => {
    if (daily || !exposure.volume) return null
    const mark = pricedFromMark ? {price:displayedPrice,eurRate:fx,currency} : null
    return valueXtbAccount(null,[trade],{'BZ=F':mark}).openCents
  },[trade,!!daily,exposure.volume,pricedFromMark,displayedPrice,fx,currency])
  const divergences = useMemo(()=>indicators.rsi?rsiDivergences(fullHistory):[],[fullHistory,indicators.rsi])
  const divergence = divergences.find(item=>item.id===selectedDivergence)
  const atrValues = useMemo(()=>indicators.atr?atr(fullHistory):[],[fullHistory,indicators.atr])
  const vwapValues = useMemo(()=>indicators.vwap?vwap(fullHistory,typeof interval==='number'):[],[fullHistory,interval,indicators.vwap])
  const visibleCount=range ?? Math.max(24,Math.min(150,Math.floor(width/9)))
  const times = useMemo(() => chartTimes(fullHistory, interval, FUTURE_SLOTS), [fullHistory, interval])
  const viewport=chartViewport(fullHistory.length,visibleCount,offset,FUTURE_SLOTS)
  const viewportOffset=viewport.viewportOffset
  const historyStart=viewport.start
  const historyEnd=viewport.end
  const viewportSlots=viewport.slots
  const history=useMemo(()=>fullHistory.slice(historyStart,historyEnd),[fullHistory,historyStart,historyEnd])
  const visibleDivergences=useMemo(()=>divergences.filter(item=>item.to.date>=history[0]?.date&&item.confirmedAt<=history.at(-1)?.date),[history,divergences])
  const summary=useMemo(()=>viewStatistics(history),[history])
  const anchorIndex=useMemo(()=>anchorDate ? fullHistory.findIndex(row=>row.date===anchorDate) : -1,[anchorDate,fullHistory])
  const navigateHistory = useCallback(next=>{
    setPointer(null)
    setPriceDomain(null)
    setOffset(next)
  },[])
  const cursor = pointer && pointer.index >= historyStart && pointer.index < historyStart + viewportSlots
    ? pointer.index - historyStart : null
  const dateAt = index => {
    const stamp = times[historyStart + index]
    if (!Number.isFinite(stamp)) return ''
    const iso = new Date(stamp).toISOString()
    return typeof interval === 'number' ? iso : iso.slice(0,10)
  }
  useEffect(() => {
    const anchor = frameAnchor.current
    if (!anchor || anchor.frame !== interval) return
    frameAnchor.current = null
    setOffset(anchoredOffset(fullHistory.length, visibleCount, timeIndex(times, anchor.stamp), anchor.fraction))
  }, [interval, times, fullHistory.length, visibleCount])
  const scanStart=Math.max(0,historyStart-180)
  const patterns=useMemo(()=>family?pricePatterns(fullHistory.slice(scanStart,historyEnd)):[],[!!family,fullHistory,scanStart,historyEnd])
  const choices = useMemo(()=>patterns.filter(item=>item.end+scanStart>=historyStart && family?.types.includes(item.name) && (!patternType||item.name===patternType)).reverse(),[patterns,scanStart,historyStart,family,patternType])
  const patternKey=item=>item.name+'-'+fullHistory[item.confirmed+scanStart].date
  const pattern=choices.find(item=>patternKey(item)===occurrence)??choices[0]
  const candidate=useMemo(()=>pattern?snapshotPattern(pattern,fullHistory,scanStart,interval):null,[pattern,fullHistory,scanStart,interval])
  const pinned=candidate&&lines.find(line=>line.type==='pattern' && line.meta.frame===interval && line.meta.name===candidate.meta.name && line.points[0].date===candidate.points[0].date && line.points[line.meta.count-1].date===candidate.points[candidate.meta.count-1].date)
  const chooseFamily=value=>{setFamily(value);setOccurrence('');setPatternType('')}
  const spans = useMemo(()=>daily
    ? tradeSpans(daily.events??[])
    : (symbolTrades??[trade]).flatMap(position=>tradeSpans(position.executions,position.plan.direction==='short'?-1:1).map(span=>({...span,id:position.id+':'+span.id,current:position.id===trade.id}))),
    [daily?.events,!!daily,symbolTrades,trade])
  const lot=spans.find(s=>s.id===selectedLot)
  const rows=spans.filter(s=>filter==='all'||Boolean(s.exit)===(filter==='closed')).sort((a,b)=>String((b.exit??b.entry)?.date).localeCompare(String((a.exit??a.entry)?.date)))
  function focusLot(s,event=s.exit??s.entry){
    setSelectedLot(s.id)
    setTradeLayer(true)
    const t=Date.parse(event?.date)
    if(!fullHistory.length||event?.observedOpen||!(t>=times[0]&&t<times[fullHistory.length]))return
    setPriceDomain(null);setOffset(anchoredOffset(fullHistory.length,visibleCount,timeIndex(times,t),.5))
  }
  useEffect(()=>{
    if(!daily?.focusId||initialLot.current===daily.focusId)return
    const s=spans.find(s=>s.entry?.id===daily.focusId||s.exit?.id===daily.focusId)
    if(s){if(fullHistory.length)initialLot.current=daily.focusId;focusLot(s,s.exit?.id===daily.focusId?s.exit:s.entry)}
  },[daily?.focusId,fullHistory,spans])
  const visibleAverages = useMemo(()=>averages.filter(([key])=>indicators[key]),[indicators])
  const candles=history.length>0
  const activeIndex = historyStart+(cursor ?? history.length-1)
  const activeBar = fullHistory[activeIndex]
  const estimate = estimateXtbStopOut(exposure, Object.fromEntries(fields.map(([key]) => [key, positive(snapshot[key])])), openCount)
  const direction = exposure.direction
  const stop = positive(limits.stop), target = positive(limits.target)
  const invalidStop = stop != null && (stop - exposure.entry) * direction >= 0
  const invalidTarget = target != null && (target - exposure.entry) * direction <= 0
  const knownEntry=trade.executions.find(event=>event.kind==='entry')
  const entryTime=daily ? daily.entries?.map(entry=>entry.date).sort()[0] : knownEntry?.date
  const hasPositionRange=!daily&&tradeLayer&&!lot&&exposure.volume>0&&exposure.entry>0&&history.length>0&&
    (!entryTime||Date.parse(entryTime)<=Date.parse(history.at(-1).date))
  const recordedStop=positive(recordedLimits.stopPrice), recordedTarget=positive(recordedLimits.targetPrice)
  const positionBands=hasPositionRange?[
    { key:'target', value:invalidTarget?null:target, original:recordedTarget, color:'#43dfca' },
    { key:'stop', value:invalidStop?null:stop, original:recordedStop, color:'#ff9b58' },
  ].filter(band=>band.value!=null):[]
  const marketLevels = useMemo(() => {
    if (!history.length) return []
    const prices=history.flatMap(row=>[row.low??row.close,row.high??row.close])
    if (tradeLayer && lot) {
      const start=Date.parse(history[0].date), end=times[historyEnd]
      for (const event of [lot.entry,lot.exit]) {
        if (event && !event.observedOpen && event.price>0 && (!event.currency||event.currency===currency) &&
          Date.parse(event.date)>=start && Date.parse(event.date)<end) prices.push(event.price)
      }
    }
    return prices
  },[history,historyEnd,times,tradeLayer,lot,currency])
  const low = marketLevels.length?Math.min(...marketLevels):1, high = marketLevels.length?Math.max(...marketLevels):2
  const [min, max] = drag?.domain || priceDomain || visiblePriceDomain(low, high)
  const y = useCallback(price=>bottom-(price-min)/(max-min)*(bottom-top),[bottom,top,min,max])
  const slots=viewportSlots-1
  const x = useCallback(i=>LEFT+6+plotSpan*i/slots,[plotSpan,slots])
  const anchorX = date => {
    const stamp=Date.parse(date)
    if (!fullHistory.length) return 16
    return x(timeIndex(times, stamp) - historyStart)
  }
  function drawingPath(type,points) {
    const first=points[0]
    const startX=anchorX(first.date), startY=y(first.price)
    if(type==='channel'&&points.length===3){
      const bx=anchorX(points[1].date),by=y(points[1].price),dy=y(points[2].price)-by
      return 'M'+startX+','+startY+'L'+bx+','+by+'v'+dy+'L'+startX+','+(startY+dy)+'Z'
    }
    if (type==='horizontal') return 'M'+LEFT+','+startY+'H'+plotRight
    if (type==='vertical') return 'M'+startX+','+top+'V'+bottom
    if (type==='ray') return 'M'+startX+','+startY+'H'+plotRight
    if (points[1] && (type==='ellipse'||type==='fib')) {
      const endX=anchorX(points[1].date),endY=y(points[1].price)
      if(type==='fib') return fibLevels.map(level=>'M'+startX+','+(endY+(startY-endY)*level)+'H'+endX).join(' ')
      const rx=Math.abs(endX-startX)/2,ry=Math.abs(endY-startY)/2,mid=(startY+endY)/2
      return 'M'+startX+','+mid+'a'+rx+','+ry+' 0 1,0 '+(endX-startX)+',0a'+rx+','+ry+' 0 1,0 '+(startX-endX)+',0'
    }
    if (type==='rectangle' && points[1]) {
      const endX=anchorX(points[1].date), endY=y(points[1].price)
      return 'M'+startX+','+startY+'H'+endX+'V'+endY+'H'+startX+'Z'
    }
    return points.map((point,i)=>(i?'L':'M')+anchorX(point.date)+','+y(point.price)).join(' ')
  }
  const measured = measurement ?? (drawing==='measure' && draft.length===2 ? draft : null)
  const candleWidth = Math.max(1, Math.min(16, (plotSpan / slots) * .7))

  async function refresh() {
    if (request.current || !reference) return
    const controller = new AbortController()
    request.current = controller
    const active = () => !controller.signal.aborted
    setBusy(true)
    setError('')
    try {
      const response = await fetch(chartFeedQuery(reference,interval),{cache:'no-store',signal:controller.signal})
      const result = await response.json()
      if (!active()) return
      if (!response.ok || !Array.isArray(result.history) || result.history.length<2) throw Error(result.error || 'تاریخچهٔ کافی دریافت نشد.')
      const storage = browserChartStorage()
      if (result.quote && !latestReferenceMark(reference,result)) throw Error('نماد یا ارز قیمت با نمودار مطابقت ندارد.')
      if (typeof interval==='number') {
        const base = interval===5?5:15, key=reference+':'+base+'m'
        let history
        try { history=await extendIntradayArchive(key,intraday[base]?.history,result.history) }
        catch {
          history=mergeIntradayRows(intraday[base]?.history,result.history)
          const saved=saveChartHistory(storage,key,{history},3400)
          if (active()) setError(saved?'آرشیو کامل مرورگر در دسترس نبود. بخشی از کندل‌های اخیر ذخیره شد.':'ذخیرهٔ تاریخچه در این مرورگر انجام نشد.')
        }
        if (!active()) return
        setIntraday(previous=>({...previous,[base]:{history}}))
      } else {
        if (!result.quote) throw Error('هویت نماد برای تاریخچهٔ روزانه تأیید نشد.')
        setReferenceMarket(result)
        if (!saveChartHistory(storage,reference,result)) setError('داده دریافت شد. ذخیرهٔ تاریخچه در این مرورگر انجام نشد.')
      }
      if (result.quote) {
        const next=saveChartMark(storage,reference,result)
        setReferenceMark(next)
        if (next) onReferenceQuote?.(reference,next)
      }
    } catch (err) {
      if (active()) setError(err.message || 'به‌روزرسانی انجام نشد. دوباره تلاش کن.')
    } finally {
      if (request.current===controller) request.current=null
      if (active()) setBusy(false)
    }
  }

  function panelResize(height, setHeight) {
    const clamp = clampPanel
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
        else {
          const box = event.currentTarget.getBoundingClientRect()
          trackPointer((event.clientX-box.left)*width/box.width, null)
        }
      },
      onLostPointerCapture() { panelDrag.current=null },
      onPointerLeave() { setPointer(null) },
    }
  }
  function openContext(event,price,date=fullHistory.at(-1)?.date,lineId=null) {
    if (!candles || !Number.isFinite(price)) return
    const box=event.currentTarget.getBoundingClientRect()
    const x=event.clientX||box.left
    const y=event.clientY||box.bottom
    select(lineId)
    setContext({price,date,x,y,lineId,trigger:plot.current})
  }

  function coordinates(event) {
    const box=plot.current.getBoundingClientRect()
    return { x:(event.clientX-box.left)*width/box.width, y:(event.clientY-box.top)*height/box.height }
  }
  function priceAt(yCoordinate) {
    return min+(bottom-Math.min(bottom,Math.max(top,yCoordinate)))/(bottom-top)*(max-min)
  }
  function indexAt(xCoordinate) {
    return Math.max(0,Math.min(slots,Math.round((xCoordinate-LEFT-6)/plotSpan*slots)))
  }
  function trackPointer(px, py) {
    if (!history.length || px < LEFT || px > plotRight || (py != null && (py < top || py > bottom))) {
      setPointer(null)
      return
    }
    setPointer({index:historyStart+indexAt(px), y:py})
  }
  function pointAt(event) {
    const location=coordinates(event)
    const position=historyStart+Math.max(0,Math.min(slots,(location.x-LEFT-6)/plotSpan*slots))
    const left=Math.floor(position)
    const start=times[left] ?? Date.now()
    const end=times[left+1] ?? start
    return {date:new Date(start+(end-start)*(position-left)).toISOString(), price:Math.max(.00000001,priceAt(location.y))}
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
  function addDrawing(type, points,meta) {
    if(!symbol||!onDrawings||allDrawings.length>=300){setError('ذخیرهٔ رسم در دسترس نیست یا ظرفیت ۳۰۰ رسم پر شده است.');return}
    const id=crypto.randomUUID()
    saveLines([...allDrawings,{id,symbol,type,points,...(meta?{meta}:{}),scope:'shared',color:meta?XTB_DRAWING_COLORS[1]:XTB_DRAWING_COLORS[0]}])
    select(id)
  }
  const chooseDrawing = useCallback(tool=>{
    setPickAnchor(false)
    setChannelBase(null)
    setDrawing(tool)
    setMeasurement(null)
    setDraft([])
    select(null)
  },[])
  function toggleComparison() {
    const next=!pickAnchor
    chooseDrawing(null)
    setPickAnchor(next)
    if (next) plot.current?.focus({preventScroll:true})
  }
  function pinAnchor(index) {
    if (!fullHistory[index]) return
    setAnchorDate(fullHistory[index].date)
    setPickAnchor(false)
    setLensOpen(true)
    setContext(null)
  }
  function setFrame(value, fraction = .5) {
    if (interval===value || !availableFrames.includes(value)) return
    setPickAnchor(false)
    setAnchorDate(null)
    const stamp = times[historyStart + Math.round(fraction * slots)]
    frameAnchor.current = viewportOffset > 0 && Number.isFinite(stamp) ? {frame:value, stamp, fraction} : null
    setChannelBase(null);select(null);setDrawing(null);setMeasurement(null);setOccurrence('');setIntervalMinutes(value);setPointer(null);setOffset(0);setDraft([]);setPriceDomain(null);setSelectedDivergence(null)
  }
  function zoomBy(delta, fraction=.5, hoverY) {
    const count=Math.max(16,Math.min(190,Math.min(visibleCount,fullHistory.length||visibleCount)+delta))
    const index=historyStart+fraction*slots
    const nextOffset=hoverY===undefined && viewportOffset===0 ? 0 : anchoredOffset(fullHistory.length,count,index,fraction)
    setRange(count)
    setOffset(nextOffset)
    if (hoverY===undefined) setPointer(null)
    else if (candles) {
      const next=chartViewport(fullHistory.length,count,nextOffset)
      setPointer({index:next.start+Math.round(fraction*(next.slots-1)),y:hoverY>=top&&hoverY<=bottom?hoverY:null})
    }
  }
  useEffect(()=>{
    const element=plot.current
    function wheel(event) {
      event.preventDefault()
      const state=gestures.current
      const now=Date.now()
      if (!event.deltaY || now-state.wheel < (event.shiftKey ? 150 : 24)) return
      state.wheel=now
      const shift=event.deltaY>0?1:-1
      const local = coordinates(event)
      const fraction = Math.max(0, Math.min(1,(local.x-LEFT-6)/plotSpan))
      if (!event.shiftKey) {
        zoomBy(shift*8,fraction,local.y)
      } else {
        const current=availableFrames.indexOf(interval)
        const next=availableFrames[Math.max(0,Math.min(availableFrames.length-1,current+shift))]
        if(next!==interval)setFrame(next,fraction)
      }
    }
    element.addEventListener('wheel',wheel,{passive:false})
    return ()=>element.removeEventListener('wheel',wheel)
  },[interval,visibleCount,historyStart,slots,times,width,height,min,max,!!daily])

  const [editPreview,setEditPreview]=useState(null)
  function channelPoints(base,point) {
    const [a,b]=base,ax=anchorX(a.date),dx=anchorX(b.date)-ax
    const basePrice=a.price+(b.price-a.price)*(anchorX(point.date)-ax)/(dx||1)
    return [a,b,{date:b.date,price:Math.max(.00000001,b.price+point.price-basePrice)}]
  }
  function locateEditor(event) {
    const {x,y}=coordinates(event)
    setEditAnchor({x:x/width,y:y/height})
  }
  function pinPattern(event) {
    if(event?.currentTarget?.closest('svg[data-drawing]'))locateEditor(event)
    if(pinned)select(pinned.id)
    else if(candidate)addDrawing('pattern',candidate.points,candidate.meta)
  }
  function removeDrawing() {
    if(selectedLine)saveLines(allDrawings.filter(line=>line.id!==selectedLine.id))
    select(null);setContext(null)
  }
  function begin(event, line, handleIndex) {
    if (!candles) return
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
    const hit=event.target.closest?.('[data-drawing-id]')?.dataset.drawingId
    chart.focus({preventScroll:true})
    chart.setPointerCapture(event.pointerId)
    if(event.button===0)locateEditor(event)
    if(event.button===0&&local.y>=bottom&&local.x<plotRight){event.preventDefault();g.action={type:'timeScale',x:local.x,count:visibleCount,index:historyStart+slots/2};return}
    if(event.button===0&&local.x>=plotRight){g.action={type:'priceScale',y:local.y,domain:[min,max]};return}
    setContext(null)
    if (pickAnchor && event.button===0 && local.y>=top && local.y<=bottom && local.x>=LEFT) {
      const index=historyStart+indexAt(local.x)
      pinAnchor(index)
      trackPointer(local.x,local.y)
      return
    }
    if(line&&event.button===0){select(line.id);g.action={type:'edit',line,handleIndex,point:pointAt(event),domain:[min,max]};return}
    if(event.button===2||!drawing){
      if(event.pointerType!=='touch'){select(null);setLimitDetail(null)}
      g.action={
        type:'pan',right:event.button===2,hit,x:local.x,y:local.y,offset:viewportOffset,
        vertical:event.button===0&&event.pointerType==='mouse',
        domain:[min,max], pricePerPixel:(max-min)/(bottom-top),
      }
      if(event.pointerType==='touch'){
        g.timer=setTimeout(()=>{g.action={type:'cursor'};trackPointer(local.x,local.y)},430)
      }
      return
    }
    if(drawing==='channel'&&channelBase){
      const points=channelPoints(channelBase,pointAt(event))
      if(Math.abs(y(points[2].price)-y(points[1].price))<2)return
      addDrawing('channel',points)
      setDrawing(null);setDraft([]);setChannelBase(null);return
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
      const price=Math.max(.00000001,priceAt(local.y))
      setLimits(previous=>({...previous,[drag.key]:price.toFixed(priceStepDigits(tickStep))}))
      return
    }
    const action=g.action
    if(action?.type==='timeScale'){
      const count=Math.max(16,Math.min(190,Math.round(action.count*Math.exp((action.x-local.x)/250))))
      setRange(count);setOffset(anchoredOffset(fullHistory.length,count,action.index,.5))
    } else if(action?.type==='priceScale'){
      const center=(action.domain[0]+action.domain[1])/2
      const half=(action.domain[1]-action.domain[0])/2*Math.exp(Math.max(-3,Math.min(3,(local.y-action.y)/180)))
      setPriceDomain([center-half,center+half])
    } else if(action?.type==='pinch'&&g.points.size===2){
      const [a,b]=g.points.values()
      const scale=Math.hypot(a.x-b.x,a.y-b.y)/action.distance
      setRange(Math.max(16,Math.min(190,Math.round(action.count/Math.max(.2,scale)))))
    } else if(action?.type==='pan'){
      const dx=local.x-action.x,dy=local.y-action.y
      action.moved ||= Math.hypot(dx,dy)>=4
      action.movedX ||= Math.abs(dx)>=4
      action.movedY ||= action.vertical&&Math.abs(dy)>=4
      if(!action.movedX&&!action.movedY)return
      clearTimeout(g.timer)
      setPointer(null)
      if(action.movedX)setOffset(Math.min(Math.max(0,fullHistory.length-visibleCount),Math.max(0,action.offset+Math.round(dx*slots/plotSpan))))
      if(action.movedY){
        const shift=dy*action.pricePerPixel
        setPriceDomain([action.domain[0]+shift,action.domain[1]+shift])
      }
    } else if(action?.type==='edit'){
      const point=pointAt(event)
      const delta=Date.parse(point.date)-Date.parse(action.point.date), priceDelta=point.price-action.point.price
      const points=action.line.points.map((item,i)=>action.handleIndex==null
        ? {date:new Date(Date.parse(item.date)+delta).toISOString(),price:Math.max(.00000001,item.price+priceDelta)}
        : i===action.handleIndex?point:item)
      if(action.line.type==='channel'&&action.handleIndex!=null){
        const [,b,c]=action.line.points
        if(action.handleIndex===1)points[2]={date:point.date,price:Math.max(.00000001,point.price+c.price-b.price)}
        if(action.handleIndex===2)points[2]={date:b.date,price:point.price}
      }
      g.preview=points
      setEditPreview({id:action.line.id,points})
    } else if(['trend','freehand','measure','rectangle','ellipse','fib','channel'].includes(action?.type)){
      const point=pointAt(event)
      if(action.type!=='freehand')action.points=[action.points[0],point]
      else {
        if(action.points.length>=120)action.points=action.points.filter((_,index)=>index%2===0)
        action.points=[...action.points,point]
      }
      setDraft(action.points)
    } else if(channelBase&&drawing==='channel'){
      setDraft(channelPoints(channelBase,pointAt(event)))
    } else if(history.length && (event.pointerType!=='touch'||action?.type==='cursor')){
      trackPointer(local.x,local.y)
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
    if(!cancel&&action?.right&&!action.moved){
      const local=coordinates(event)
      openContext(event,priceAt(local.y),dateAt(indexAt(local.x)),action.hit)
      locateEditor(event)
    }
    if(!cancel && action?.points?.length>=2){
      if(action.type==='channel'){
        if(Math.abs(anchorX(action.points[1].date)-anchorX(action.points[0].date))>=3)setChannelBase(action.points)
      } else {
        if(action.type==='measure')setMeasurement(action.points);else addDrawing(action.type,action.points)
        setDrawing(null)
      }
    }
    g.preview=null
    setEditPreview(null);setDrag(null)
    if(drawing!=='arrow'&&action?.type!=='channel')setDraft([])
  }
  function addArrowPoint(event) {
    if (coordinates(event).x>=plotRight) {setPriceDomain(null);return}
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
    {key:'stop',label:'حد ضرر',value:stop},
    {key:'target',label:'حد سود',value:target},
    {key:'liquidation',label:'Stop Out',value:estimate?.price},
  ].filter(level=>!daily||level.key==='entry')
  const inPlot=price=>price!=null&&price>=min&&price<=max
  const axisLevels=levelRows.filter(level=>candles&&!lot&&inPlot(level.value)&&(tradeLayer||level.key==='liquidation')).sort((a,b)=>y(a.value)-y(b.value))
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
  const timeGuide = (y1,y2) => cursor == null ? null : <line data-time-guide={dateAt(cursor)} x1={x(cursor)} x2={x(cursor)} y1={y1} y2={y2} stroke="#afbece" strokeDasharray="3 4" pointerEvents="none"/>
  const timeLabelWidth = typeof interval === 'number' ? 119 : 85
  const labelX = cursor == null ? 0 : Math.min(plotRight-timeLabelWidth, Math.max(0, x(cursor)-timeLabelWidth/2))
  const last=history.length-1
  const tickCount=width>=740?6:width>=460?4:3
  const rawStep=(max-min)/Math.max(2,Math.floor((bottom-top)/60))
  const magnitude=10**Math.floor(Math.log10(rawStep))
  const tickStep=([1,2,2.5,5,10].find(value=>value>=rawStep/magnitude)??10)*magnitude
  const firstTick=Math.ceil(min/tickStep)*tickStep
  const timeTicks=[...new Set(Array.from({length:tickCount},(_,i)=>Math.round(slots*i/(tickCount-1))))]
  const priceTicks=Array.from({length:Math.max(0,Math.floor((max-firstTick)/tickStep)+1)},(_,index)=>firstTick+index*tickStep)
  const axisDigits=priceStepDigits(tickStep)
  const axisPrice=useMemo(()=>new Intl.NumberFormat('en-US',{minimumFractionDigits:2,maximumFractionDigits:axisDigits}),[axisDigits])
  const displayedLevel=displayedPrice
  const displayedY=candles&&inPlot(displayedLevel)?y(displayedLevel):null

  const entryX=entryTime?anchorX(entryTime):null
  const bandStart=Math.max(LEFT,Math.min(x(last),entryX??LEFT))
  const accountGain = daily ? daily.gainCents : openResult
  const gainLabel = daily ? daily.gainLabel : Number.isFinite(openResult) ? signedFormat.format(openResult/100)+' €' : '—'
  const hasRefresh = daily ? !!daily.onRefresh : !!reference
  const refreshing = daily ? daily.busy : busy
  const positionPanel = <dl className={styles.quoteStrip}>
    <div><dt>{daily ? 'سود و زیان باز' : pricedFromMark ? 'سود و زیان باز · برآوردی' : 'آخرین سود و زیان ثبت‌شده'}</dt>
      <dd data-direction={Number.isFinite(accountGain)?Math.sign(accountGain):undefined}><bdi>{gainLabel||'—'}</bdi></dd></div>
    <div><dt>{daily?'تعداد سهم':'حجم موقعیت'}</dt><dd><bdi>{daily ? daily.quantityLabel||'—' : Number(exposure.volume.toPrecision(8))+' لات'}</bdi></dd></div>
    <div><dt>{daily?'میانگین بهای خرید':'میانگین ورود'}</dt><dd><bdi>{daily ? daily.entryLabel||'—' : exposure.entry ? formatPrice(exposure.entry)+' '+currency : '—'}</bdi></dd></div>
  </dl>
  function fitPosition() {
    const values=[...marketLevels,exposure.entry,stop,target,estimate?.price].filter(value=>Number.isFinite(value)&&value>0)
    if (values.length) setPriceDomain(visiblePriceDomain(Math.min(...values),Math.max(...values)))
    setTradeLayer(true)
    setSelectedLot(null)
  }
  const contextIndex = context?.date ? Math.round(timeIndex(times,Date.parse(context.date))) : -1
  const lotEnd = lot?.exit ? lot.exit.price : displayedPrice
  const lotBand = tradeLayer && lot?.entry?.price>0 && !lot.entry.observedOpen && lotEnd>0 &&
    (!lot.entry.currency||lot.entry.currency===currency) && (!lot.exit?.currency||lot.exit.currency===currency) &&
    history.length && Date.parse(lot.entry.date)<times[historyEnd] && (!lot.exit || Date.parse(lot.exit.date)>=times[historyStart])
  function handleKeys(e) {
    if (e.target.closest('input,select,textarea,dialog')) return
    if (e.key==='Escape' && (pickAnchor||drawing||selected||panel||context)) {
      e.stopPropagation()
      chooseDrawing(null)
      setPanel(null)
      setContext(null)
      return
    }
    if (e.key==='Delete' && selectedLine) { e.preventDefault();removeDrawing();return }
    if (e.target!==plot.current||!candles) return
    if (e.key==='Enter' && pickAnchor) { e.preventDefault();pinAnchor(activeIndex);return }
    if (e.key==='ArrowLeft'||e.key==='ArrowRight') {
      e.preventDefault()
      const index=Math.max(0,Math.min(fullHistory.length-1,activeIndex+(e.key==='ArrowLeft'?-1:1)))
      if (index<historyStart||index>=historyEnd) setOffset(anchoredOffset(fullHistory.length,visibleCount,index,.5))
      setPointer({index,y:null})
    }
    if (e.shiftKey && e.key==='F10') {
      e.preventDefault()
      const rect=plot.current.getBoundingClientRect(), i=cursor??last
      const price=pointer?.y!=null?priceAt(pointer.y):history[i]?.close
      if (Number.isFinite(price)) setContext({date:dateAt(i),price,x:rect.left+x(i),y:rect.top+(pointer?.y??height/2),trigger:plot.current})
    }
  }
  const exitPanel = !daily && <>
    {Object.entries(limitLabels).map(([key,label])=>{
      const invalid=key==='stop'?invalidStop:invalidTarget
      const result=!invalid&&xtbScenario(exposure,positive(limits[key]))
      return <div className={styles.limit} data-limit={key} key={key}>
        <label>{label}<bdi>{currency}</bdi><input dir="ltr" type="number" min=".00000001" step="any" value={limits[key]} aria-invalid={invalid} onChange={event=>{const value=event.target.value;setTradeLayer(true);setLimits(previous=>({...previous,[key]:value}))}}/></label>
        {invalid?<small role="status">حد در سمت درست قیمت ورود نیست.</small>:<strong dir="ltr">{eurAmount(result)||'—'}</strong>}
      </div>
    })}
    <button type="button" disabled={!candles||!(exposure.entry>0)} onClick={fitPosition}>ورود و حدها در یک نما</button>
    <button type="button" onClick={()=>setLimits({stop:recordedLimits.stopPrice||'',target:recordedLimits.targetPrice||''})}>بازگردانی حدهای ثبت‌شده</button>
    <details className={styles.stopOut}>
      <summary>Stop Out <bdi>{estimate?.price!=null?formatPrice(estimate.price)+' '+currency:'—'}</bdi></summary>
      <p>برآورد با داده‌های هم‌زمان حساب و فرض ثبات نرخ ارز و مارجین. <a href={stopOutSource} target="_blank" rel="noreferrer">قاعدهٔ XTB</a></p>
      {openCount===1&&exposure.isBrent?<>
        <div className={styles.inputs}>{fields.map(([key,label])=><label key={key}>{label}<input dir="ltr" type="number" min="0" step="any" value={snapshot[key]||''} onChange={event=>setSnapshot(previous=>({...previous,[key]:event.target.value}))}/></label>)}</div>
        {estimate&&<p role="status">سطح مارجین <bdi>{formatPrice(estimate.marginLevel)}٪</bdi> · {estimate.alreadyBelow?'زیر آستانهٔ Stop Out':estimate.price==null?'قیمت مثبت در مدل به‌دست نیامد':<bdi>{formatPrice(estimate.price)} {currency}</bdi>}</p>}
      </>:<p>این تخمین برای یک موقعیت باز OIL در حساب فعال است.</p>}
    </details>
  </>

  return <section onKeyDown={handleKeys} className={styles.card} dir="rtl" data-investment-chart="" data-fullscreen={fullscreen} aria-label={daily?'نمودار دارایی Trade Republic':'نمودار و سناریوی موقعیت XTB'}>
    <header className={styles.header}>
      <button className={styles.expand} type="button" aria-label={fullscreen?'خروج از تمام صفحه':'تمام صفحه'} title={fullscreen?'خروج از تمام صفحه':'تمام صفحه'} aria-pressed={fullscreen} onClick={()=>setFullscreen(value=>!value)}><Icon name="expand" size={18}/></button>
      <div className={styles.identity}>
        <small><bdi>{daily?'Trade Republic':'XTB'}</bdi><span>·</span>{daily?daily.ownerLabel||'دارایی':watchMarket?'دیده‌بان بازار':direction===1?'موقعیت خرید':'موقعیت فروش'}</small>
        <div className={styles.instrumentName}><h2 dir="auto">{trade.plan.name||displaySymbol}</h2>{displaySymbol&&trade.plan.name!==displaySymbol&&<bdi>{displaySymbol}</bdi>}</div>
      </div>
      <div className={styles.headQuote}>
        <small>{priceLabel}{priceTime&&<> · <bdi title="ساعت برلین">{berlinTime(priceTime)}</bdi></>}</small><strong dir="ltr">{formatPrice(displayedPrice)} <em>{currency}</em></strong>
      </div>
      {hasRefresh && <button type="button" className={styles.refresh} disabled={refreshing} onClick={daily?daily.onRefresh:refresh}><Icon name="refresh" size={15}/>{refreshing?'در حال دریافت…':'به‌روزرسانی'}</button>}
    </header>
    {!watchMarket&&<div className={styles.scenarios}>{positionPanel}
      {!daily&&exposure.volume>0&&<button type="button" aria-pressed={tradeLayer} onClick={()=>setTradeLayer(value=>!value)}><Icon name="trading" size={15}/>ناحیهٔ معامله</button>}{daily?.onTransactions&&<button type="button" onClick={daily.onTransactions}><Icon name="journal" size={15}/>تراکنش‌های این دارایی</button>}</div>}
        <div className={styles.chart}>
        <div className={styles.chartTools} aria-label="تایم‌فریم و لایه‌های نمودار">
          <label className={styles.timeframe}>تایم‌فریم <select value={interval} onChange={event=>setFrame(/^\d+$/.test(event.target.value)?Number(event.target.value):event.target.value)}>
            {frames.map(value=><option key={value} value={value} disabled={daily&&typeof value==='number'}>{({'1d':'روزانه','1w':'هفتگی','1mo':'ماهانه',60:'۱ ساعت',240:'۴ ساعت'})[value]||value+' دقیقه'}</option>)}
          </select></label>
          <div className={styles.frameShortcuts} dir="ltr" role="group" aria-label="انتخاب سریع تایم‌فریم">{(daily?dailyFrames:[15,60,'1d']).map(value=><button key={value} type="button" aria-pressed={value===interval} onClick={()=>setFrame(value)}>{frameLabels[value]}</button>)}</div>
          <div className={styles.patternControl} ref={patternControl}>
          <button type="button" aria-expanded={panel==='patterns'} onClick={()=>setPanel(panel==='patterns'?null:'patterns')}><Icon name="patterns" size={16}/> الگوهای قیمت</button>
          {panel==='patterns'&&<section className={styles.patternPicker} aria-label="انتخاب الگوی قیمت">
          <header><strong>الگوهای قیمت</strong><button type="button" aria-label="بستن فهرست الگوها" onClick={()=>setPanel(null)}>×</button></header>
          <div className={styles.familyTabs}>{patternFamilies.map(item=><button key={item.name} type="button" aria-pressed={family===item} onClick={()=>chooseFamily(item)}>{item.name}</button>)}</div>
          {family?<><p>{family.hint} برای برجسته‌کردن و نگه‌داشتن نمونه، روی شکل دوبارکلیک کن.</p>
            <div className={styles.patternFilters}><label>نوع الگو <select value={patternType} onChange={e=>{setPatternType(e.target.value);setOccurrence('')}}><option value="">همهٔ انواع این خانواده</option>{family.types.map(name=><option key={name}>{name}</option>)}</select></label>
            {choices.length>0?<label>نمونه ({choices.length}) <select value={patternKey(pattern)} onChange={e=>setOccurrence(e.target.value)}>{choices.map(item=><option key={patternKey(item)} value={patternKey(item)}>{item.name} · {berlinTime(fullHistory[item.confirmed+scanStart].date)}</option>)}</select></label>:<span role="status">در این نما نمونه‌ای پیدا نشد.</span>}</div>
          </>:<p>یک خانواده را انتخاب کن تا شکل و نمونه‌های آن را ببینی.</p>}
        </section>}
          </div>
          {(!watchMarket||spans.length>0)&&<button type="button" aria-expanded={showTrades} onClick={()=>setShowTrades(value=>!value)}><Icon name="journal" size={15}/>معاملات و تاریخچه</button>}

          <button type="button" aria-expanded={panel==='indicators'} onClick={()=>setPanel(panel==='indicators'?null:'indicators')}><Icon name="indicators" size={16}/> اندیکاتورها</button>
          <span className={styles.toolSpacer}/>
          <IndicatorGuide/>
          <button type="button" title="نمایش یا بستن جزئیات کندل" aria-label="جزئیات کندل" aria-pressed={lensOpen} onClick={()=>{setLensOpen(value=>!value);setPickAnchor(false)}}><Icon name="inspector" size={17}/></button>
        </div>
        {panel==='indicators'&&<IndicatorPicker values={indicators} onChange={(key,value)=>setIndicators(previous=>({...previous,[key]:value}))}/>}
        {family&&<div className={styles.patternSummary}>{choices.length>1&&<><button type="button" aria-label="نمونهٔ قبلی" disabled={choices.indexOf(pattern)===choices.length-1} onClick={()=>setOccurrence(patternKey(choices[choices.indexOf(pattern)+1]))}>‹</button><button type="button" aria-label="نمونهٔ بعدی" disabled={choices.indexOf(pattern)===0} onClick={()=>setOccurrence(patternKey(choices[choices.indexOf(pattern)-1]))}>›</button></>}<span>{pattern?pattern.name:family.name}</span>{pattern&&<small>{pattern.breakout?(pattern.breakout==='up'?'شکست رو به بالا':'شکست رو به پایین'):'بدون شکست تأییدشده'}</small>}{candidate&&<button type="button" onClick={pinPattern}>{pinned?'نمایش رسم ذخیره‌شده':'نگه‌داشتن روی نمودار'}</button>}<button type="button" aria-label="حذف لایهٔ الگو" onClick={()=>chooseFamily(null)}><Icon name="close" size={14}/></button></div>}
        {showTrades&&<section className={styles.tradePanel} aria-label="معاملات این نماد">
          <header><strong>{displaySymbol}</strong><span>موجودی <bdi>{daily?daily.quantityLabel:Number(spans.reduce((n,s)=>n+(s.exit?0:s.quantity),0).toPrecision(8))+' لات'}</bdi></span>{['all','open','closed'].map((k,i)=><button key={k} type="button" aria-pressed={filter===k} onClick={()=>{setFilter(k);setSelectedLot(null)}}>{['همه','باز','بسته'][i]}</button>)}</header>
          <div className={styles.tradeRows}>{rows.map(s=><button type="button" key={s.id} aria-pressed={lot===s} onClick={()=>focusLot(s)}><strong>{s.exit?'بسته':'باز'} · {s.direction<0?'فروش':'خرید'}</strong><span>حجم <bdi>{Number(s.quantity.toPrecision(8))} {daily?'':'لات'}</bdi></span>{[['ورود',s.entry],['خروج',s.exit]].map(([label,e])=><span key={label}>{label} <bdi>{e?.price>0?formatPrice(e.price)+' '+(e.currency||currency):'—'}</bdi><small>{e?.observedOpen?'زمان ورود نامشخص':e?.date?berlinTime(e.date):''}</small></span>)}</button>)}</div>
          {lot&&<div className={styles.tradeActions}><button type="button" aria-pressed={tradeLayer} onClick={()=>setTradeLayer(value=>!value)}>نمایش معامله روی نمودار</button>{[['رفتن به ورود',lot.entry],['رفتن به خروج',lot.exit]].map(([label,e])=>e&&<button type="button" key={label} disabled={e.observedOpen||!(Date.parse(e.date)>=times[0]&&Date.parse(e.date)<times[fullHistory.length])} onClick={()=>focusLot(lot,e)}>{label}</button>)}</div>}
          {!rows.length&&<p>برای این انتخاب معامله‌ای ثبت نشده است.</p>}
          {lot&&[lot.entry,lot.exit].filter(Boolean).some(e=>e.observedOpen||!(e.price>0)||e.currency&&e.currency!==currency||!(Date.parse(e.date)>=times[0]&&Date.parse(e.date)<times[fullHistory.length]))&&<p>بخشی از معامله زمان یا قیمت قابل نمایش در تاریخچهٔ این نمودار ندارد.</p>}
        </section>}
        <div className={styles.workstation} data-lens={lensOpen&&candles}>
        <div className={styles.chartBody} dir="rtl">
        <div className={styles.drawingTools} data-open={true}>
          <DrawingPalette drawing={drawing} choose={chooseDrawing} available={!!history.length}/>
          <div className={styles.chartTools}>
            <button type="button" title="بزرگ‌نمایی" aria-label="بزرگ‌نمایی" disabled={!candles||visibleCount<=16} onClick={()=>zoomBy(-12)}><Icon name="zoomIn" size={17}/></button>
            <button type="button" title="کوچک‌نمایی" aria-label="کوچک‌نمایی" disabled={!candles||visibleCount>=Math.min(190,fullHistory.length)} onClick={()=>zoomBy(12)}><Icon name="zoomOut" size={17}/></button>
            <button type="button" title="بازنشانی نما" aria-label="بازنشانی نما" onClick={()=>{setPriceDomain(null);setRange(null);setOffset(0)}}><Icon name="refresh"/></button>
            <button type="button" title="منوی نمودار" aria-label="منوی نمودار" disabled={!candles} onClick={event=>openContext(event,displayedPrice??activeBar?.close)}><Icon name="menu"/></button>
          </div>

        </div>
        {drawing==='channel'&&<p role="status">{channelBase?'برای تعیین پهنای کانال روی مرز دوم کلیک کن.':'خط پایهٔ کانال را با ماوس بکش.'}</p>}
        {drawing==='arrow'&&<div className={styles.patternSummary}>نقطه‌ها را با دوبارکلیک انتخاب کن.<button type="button" disabled={draft.length<2} onClick={completeArrow}>ثبت مسیر</button></div>}
        <div className={styles.plotWrap}>
          {!candles&&<div className={styles.emptyPlot}><Icon name="candles" size={30}/><strong>تاریخچهٔ {frameLabels[interval]} در این مرورگر موجود نیست</strong>
            <small>{hasRefresh?'با به‌روزرسانی، کندل‌های این بازه دریافت و ذخیره می‌شوند.':'برای این نماد منبع تاریخچه در دسترس نیست.'}</small>
            {hasRefresh&&<button type="button" disabled={refreshing} onClick={daily?daily.onRefresh:refresh}>{refreshing?'در حال دریافت…':'دریافت کندل‌ها'}</button>}
          </div>}
          {selectedLine&&!context&&<div className={styles.objectEditor} style={{left:`clamp(6px, ${(editAnchor?.x??.3)*100}%, calc(100% - 220px))`,top:`clamp(24px, calc(${(editAnchor?.y??.2)*100}% + 18px), calc(100% - 98px))`}} aria-label="ویرایش رسم">
            <button type="button" aria-label="بستن ویرایش رسم" onClick={()=>select(null)}>×</button>
            <label>رنگ <select value={selectedLine.color} onChange={event=>changeDrawing(selectedLine.id,{color:event.target.value})}>
              {XTB_DRAWING_COLORS.map((color,i)=><option value={color} key={color}>{['آبی','طلایی','سبز','قرمز','بنفش'][i]}</option>)}
            </select></label>
            <label>نمایش <select value={selectedLine.scope} onChange={event=>changeDrawing(selectedLine.id,{scope:event.target.value})}>
              <option value="shared">مشترک بین حساب‌ها</option><option value={trade.ownerId}>فقط این حساب</option>
            </select></label>
            <button type="button" onClick={removeDrawing}>حذف رسم</button>
          </div>}
        {candles && <div className={styles.chartLegend} role="group" aria-label="قیمت و اندیکاتورهای کندل">
          {activeBar&&<span className={styles.ohlc}><bdi>O {formatPrice(activeBar.open)} · H {formatPrice(activeBar.high)} · L {formatPrice(activeBar.low)} · C {formatPrice(activeBar.close)}</bdi></span>}
          {indicators.atr&&<span title="میانگین دامنهٔ واقعی نوسان"><bdi>ATR 14 {formatPrice(atrValues[historyStart+(cursor??history.length-1) ])} {currency}</bdi></span>}
          {visibleAverages.map(([key,label,color])=><span key={key} style={{color}}><bdi>{label} {formatPrice(activeBar?.[key])}</bdi></span>)}
          {indicators.vwap&&<span style={{color:'#d1a2ce'}}><bdi>VWAP {formatPrice(vwapValues[activeIndex])}</bdi></span>}
        </div>}
        <svg ref={plot} tabIndex={0} className={styles.plot} data-drawing={!!drawing||pickAnchor} viewBox={`0 0 ${width} ${height}`} role="group" aria-label={history.length?`نمودار قیمت ${trade.plan.name} با ${history.length} کندل، از ${berlinTime(history[0].date)} تا ${berlinTime(history.at(-1).date)}`:`نمودار قیمت ${trade.plan.name}؛ هنوز داده‌ای دریافت نشده است`}
          onPointerDown={beginChart} onPointerMove={move} onPointerLeave={event=>{if(event.pointerType!=='touch'&&!gestures.current.action)setPointer(null)}} onPointerUp={event=>finish(event)} onPointerCancel={event=>finish(event,true)}
          onContextMenu={event=>{event.preventDefault();if(event.nativeEvent.detail===0&&!event.clientX&&!event.clientY)openContext(event,displayedPrice||exposure.entry||1)}} onDoubleClick={addArrowPoint}>
          <defs>
            {[['up','#35876b','#91d9ae'],['down','#994c61','#f0949a']].map(([key,dark,light])=><linearGradient key={key} id={gradient+'-'+key}><stop offset="0" stopColor={dark}/><stop offset=".45" stopColor={light}/><stop offset="1" stopColor={dark}/></linearGradient>)}
            <clipPath id={gradient+'-plot'}><rect x={LEFT} y={top} width={plotRight-LEFT} height={bottom-top}/></clipPath>
            <marker id={gradient+'-arrow'} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0L6 3L0 6Z" fill="context-stroke"/></marker>
          </defs>
          <rect x={plotRight} y={top} width={AXIS} height={bottom-top} className={styles.priceAxis}><title>کشیدن برای تغییر مقیاس قیمت · دوبارکلیک برای مقیاس خودکار</title></rect>
          {candles&&priceTicks.map(value=><g key={value}><line x1={LEFT} x2={plotRight} y1={y(value)} y2={y(value)} stroke="#25332f"/><text x={width-8} y={y(value)+4} textAnchor="end" pointerEvents="none">{axisPrice.format(value)}</text></g>)}
          {timeTicks.map(i=><line key={i} x1={x(i)} x2={x(i)} y1={top} y2={bottom} stroke="#1d2b27"/>)}
          <g clipPath={`url(#${gradient}-plot)`}>
            {hasPositionRange&&!positionBands.length&&displayedPrice>0&&<rect x={bandStart} y={Math.min(y(exposure.entry),y(displayedPrice))} width={Math.max(2,x(last)-bandStart)} height={Math.max(2,Math.abs(y(exposure.entry)-y(displayedPrice)))} fill={(displayedPrice-exposure.entry)*direction>=0?'#55cdb8':'#f4a367'} fillOpacity=".13"/>}
            {hasPositionRange&&entryX!=null&&entryX>=LEFT&&entryX<=x(last)&&<g pointerEvents="none"><line x1={entryX} x2={entryX} y1={top} y2={bottom} stroke="#71adad" strokeOpacity=".45" strokeDasharray="2 5"/><text x={entryX+4} y={top+13}>{knownEntry?.observedOpen?'ثبت موقعیت':'ورود'}</text></g>}
            {positionBands.map(band=><g key={band.key} aria-label={limitLabels[band.key]} pointerEvents="none">
              {band.original>0&&band.value!==band.original&&<rect x={bandStart} y={Math.min(y(exposure.entry),y(band.original))} width={Math.max(2,x(last)-bandStart)} height={Math.abs(y(exposure.entry)-y(band.original))} fill={band.color} fillOpacity=".055"/>}
              <rect x={bandStart} y={Math.min(y(exposure.entry),y(band.value))} width={Math.max(2,x(last)-bandStart)} height={Math.abs(y(exposure.entry)-y(band.value))} fill={band.color} fillOpacity={band.key==='target'?'.18':'.16'}/>
              <title>{limitLabels[band.key]} · {formatPrice(band.value)} {currency}</title>
            </g>)}
            {lotBand ? <rect x={Math.max(LEFT,anchorX(lot.entry.date))} y={Math.min(y(lot.entry.price),y(lotEnd))} width={Math.max(1,(lot.exit?Math.min(plotRight,anchorX(lot.exit.date)):x(last))-Math.max(LEFT,anchorX(lot.entry.date)))} height={Math.max(2,Math.abs(y(lotEnd)-y(lot.entry.price)))} fill={(lotEnd-lot.entry.price)*lot.direction>=0?'#58d1b9':'#ed9465'} fillOpacity=".12" pointerEvents="none"/> : null}
            <ChartPriceSeries rows={history} start={historyStart} x={x} y={y} bottom={bottom} candleWidth={candleWidth} gradient={gradient} averages={visibleAverages} indicators={indicators} vwap={vwapValues}/>
            {anchorIndex>=historyStart && anchorIndex<historyEnd && <g data-comparison-anchor={anchorDate} transform={`translate(${x(anchorIndex-historyStart)},${y(fullHistory[anchorIndex].close)})`} pointerEvents="none"><path d="M0 -6L6 0 0 6 -6 0Z" fill="#efd48e" stroke="#17231e" strokeWidth="1.5"/><title>کندل مبنای مقایسه</title></g>}
            {visibleDivergences.map(item=><g key={item.id} role="button" tabIndex={0} aria-pressed={item.id===selectedDivergence} aria-label={item.bullish?'واگرایی صعودی RSI':'واگرایی نزولی RSI'} onPointerDown={event=>event.stopPropagation()} onClick={()=>setSelectedDivergence(item.id===selectedDivergence?null:item.id)} onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();setSelectedDivergence(item.id===selectedDivergence?null:item.id)}}}>
              <g transform={`translate(${anchorX(item.to.date)},${y(item.to[item.side])+(item.bullish?16:-14)})`} style={{cursor:'pointer'}}>
                <circle r="9" fill="#152431" stroke={item.bullish?'#73d9c2':'#f2ae7f'}/>
                <path d={item.bullish?'M-4 3L4 -4M0 -4H4V0':'M-4 -3L4 4M0 4H4V0'} fill="none" stroke={item.bullish?'#73d9c2':'#f2ae7f'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </g><title>{item.bullish?'واگرایی صعودی':'واگرایی نزولی'} · تأیید {item.confirmedAt}</title>
            </g>)}
            {divergence&&<line x1={anchorX(divergence.from.date)} x2={anchorX(divergence.to.date)} y1={y(divergence.from[divergence.side])} y2={y(divergence.to[divergence.side])} stroke="#e8c37a" strokeWidth="2"/>}
            {tradeLayer&&lot&&[['ورود',lot.entry],['خروج',lot.exit]].map(([label,e],i)=>{
              if(!e||e.observedOpen||!(e.price>0)||e.currency&&e.currency!==currency||!(Date.parse(e.date)>=times[0]&&Date.parse(e.date)<times[fullHistory.length]))return null
              const px=anchorX(e.date),py=y(e.price)
              return <g key={label} pointerEvents="none"><circle cx={px} cy={py} r="5" fill={i?'#ffae72':'#71e1cf'} stroke="#101720" strokeWidth="2"/><text x={px} y={py+(i?18:-10)} textAnchor="middle" style={{paintOrder:'stroke',stroke:'#101720',strokeWidth:3}}>{label}</text></g>
            })}
            {displayedY!=null&&<line x1={LEFT} x2={plotRight} y1={displayedY} y2={displayedY} stroke="#91b8bd" strokeDasharray="2 5"/>}
            {!lot&&inPlot(estimate?.price)&&<line x1={LEFT} x2={plotRight} y1={y(estimate.price)} y2={y(estimate.price)} stroke={levelColors.liquidation} strokeDasharray="5 4"/>}
            {candidate&&!pinned&&<PatternOverlay line={candidate} x={anchorX} y={y} onPin={pinPattern}/>}
            {lines.map(line=>{
              if(line.type==='pattern')return <PatternOverlay key={line.id} line={line} x={anchorX} y={y} focused={selected===line.id} onFocus={e=>{locateEditor(e);select(line.id)}} onPin={()=>select(line.id)}/>
              const points=editPreview?.id===line.id?editPreview.points:line.points
              const path=drawingPath(line.type,points)
              return <g key={line.id} data-drawing-id={line.id}>
                <path d={path} stroke={line.color} strokeWidth={selected===line.id?2.8:2} fill={line.type==='channel'?line.color:'none'} fillOpacity=".08" markerEnd={line.type==='arrow'?`url(#${gradient}-arrow)`:undefined}/>
                {line.type==='channel'&&<line x1={anchorX(points[0].date)} x2={anchorX(points[1].date)} y1={y(points[0].price+(points[2].price-points[1].price)/2)} y2={y((points[1].price+points[2].price)/2)} stroke={line.color} strokeDasharray="5 4" opacity=".65" pointerEvents="none"/>}
                {line.type==='fib'&&fibLevels.map(level=><text key={level} x={Math.min(anchorX(points[0].date),anchorX(points[1].date))+4} y={y(points[1].price+(points[0].price-points[1].price)*level)-3} pointerEvents="none">{Math.round(level*1000)/10}%</text>)}
                <path d={path} stroke="transparent" strokeWidth="16" fill="none" style={{cursor:'move'}}
                  onPointerDown={event=>{if(drawing||event.button===2)return;event.stopPropagation();begin(event,line)}}/>
                {line.id===selected&&points.filter((_,index)=>line.type!=='freehand'||index===0||index===points.length-1).map((point,index)=>
                  <circle key={index} cx={anchorX(point.date)} cy={y(point.price)} r="6" fill={line.color} stroke="#0b1421" strokeWidth="2" style={{cursor:"grab"}}
                    onPointerDown={event=>{event.stopPropagation();begin(event,line,points.indexOf(point))}}/>)}
              </g>
            })}
            {measurement&&<path d={drawingPath('measure',measurement)} fill="none" stroke="#eac67b" strokeDasharray="3 3" pointerEvents="none"/>}
            {draft.length>0&&<><path d={drawingPath(drawing,draft)} fill="none" stroke="#b3d8ff" strokeWidth="2"/>
              {drawing==='arrow'&&draft.map((point,index)=><circle key={index} cx={anchorX(point.date)} cy={y(point.price)} r="3" fill="#b3d8ff"/>)}</>}
            {cursor!=null&&<g pointerEvents="none">
              {timeGuide(top,bottom)}
              {pointer.y!=null&&<line x1={LEFT} x2={plotRight} y1={pointer.y} y2={pointer.y} stroke="#afbece" strokeDasharray="3 4"/>}
            </g>}
          </g>
          {displayedY!=null&&!axisPositions.some(position=>Math.abs(position-displayedY)<18)&&<g pointerEvents="none"><rect x={plotRight+3} y={displayedY-9} width={AXIS-7} height="18" rx="4" fill="#29454d"/><text x={width-8} y={displayedY+4} textAnchor="end">{axisPrice.format(displayedLevel)}</text></g>}
          {axisLevels.map((level,i)=><g key={level.key} className={styles.handle} role="button" tabIndex={0}
            aria-label={level.label+' '+formatPrice(level.value)} onFocus={()=>setLimitDetail(level.key)} onBlur={()=>setLimitDetail(null)}
            onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();setLimitDetail(level.key)}}}
            onPointerEnter={()=>setLimitDetail(level.key)} onPointerLeave={()=>{if(!drag)setLimitDetail(null)}}
            onPointerDown={event=>startLevel(event,level)}>
            <rect x={plotRight+2} y={axisPositions[i]-9} width={AXIS-4} height="18" rx="3" fill={levelColors[level.key]}/>
            <text className={styles.axisLabel} x={plotRight+AXIS/2} y={axisPositions[i]+4} textAnchor="middle">{level.label} {formatPrice(level.value)}</text>
          </g>)}
          {history.length>0&&timeTicks.map((i,index)=><text key={i} x={x(i)} y={height-8} opacity={i > last ? .6 : 1} textAnchor={index===0?'start':i===slots?'end':'middle'}>{berlinTime(dateAt(i))}</text>)}
          {cursor!=null&&<g pointerEvents="none">
            <rect x={labelX} y={bottom+1} width={timeLabelWidth} height="22" rx="4" fill="#33495e"/>
            <text x={labelX+timeLabelWidth/2} y={bottom+16} textAnchor="middle">{cursor>last?'≈ ':''}{berlinTime(dateAt(cursor))}</text>
            {pointer.y!=null&&<g data-cursor-price={priceAt(pointer.y)}>
              <rect x={plotRight} y={pointer.y-10} width={AXIS} height="20" rx="3" fill="#33495e"/>
              <text x={width-8} y={pointer.y+4} textAnchor="end">{axisPrice.format(priceAt(pointer.y))}</text>
            </g>}
          </g>}
        </svg>
        {!lensOpen&&cursor!=null&&activeBar&&pointer?.y!=null&&!drag&&!drawing&&!showDetails&&<div className={styles.candleTip} style={{left:Math.max(2,Math.min(plotRight-155,x(cursor)+(x(cursor)>plotRight*.62?-155:12))),top:Math.max(top,Math.min(bottom-55,pointer.y+12))}}>
          <bdi>{berlinTime(activeBar.date)}</bdi><bdi>O {formatPrice(activeBar.open)} · C {formatPrice(activeBar.close)}</bdi><bdi>H {formatPrice(activeBar.high)} · L {formatPrice(activeBar.low)}</bdi>
        </div>}
        {measured&&<div className={styles.measureReadout}><bdi>{signedFormat.format(measured[1].price-measured[0].price)} {currency} · {signedFormat.format((measured[1].price/measured[0].price-1)*100)}٪</bdi>{measurement&&<button type="button" aria-label="بستن اندازه‌گیری" onClick={()=>setMeasurement(null)}><Icon name="close" size={14}/></button>}</div>}
        {context&&<ChartContextMenu context={context} close={()=>setContext(null)}>
          <bdi>{formatPrice(context.price)} {currency}{context.date && ' · '+berlinTime(context.date)}</bdi>
          {selectedLine&&<button type="button" role="menuitem" onClick={()=>{setContext(null);select(selectedLine.id)}}>ویرایش رسم انتخاب‌شده</button>}
          {selectedLine&&<button type="button" role="menuitem" onClick={removeDrawing}>حذف رسم انتخاب‌شده</button>}
          {fullHistory[contextIndex]&&<button type="button" role="menuitem" onClick={()=>pinAnchor(contextIndex)}>مبنای مقایسه با این کندل</button>}
          <button type="button" role="menuitem" disabled={!context.date||context.price<=0} onClick={()=>{addDrawing('horizontal',[{date:context.date,price:context.price}]);setContext(null)}}>خط افقی در این قیمت</button>
          {!daily&&!watchMarket&&exposure.volume>0&&Object.entries(limitLabels).map(([key,label])=><button type="button" role="menuitem" key={key} onClick={()=>{setTradeLayer(true);setLimits(previous=>({...previous,[key]:context.price.toFixed(priceStepDigits(tickStep))}));setContext(null)}}>{label} در این قیمت</button>)}
          <button type="button" role="menuitem" onClick={()=>{setPriceDomain(null);setRange(null);setOffset(0);setContext(null)}}>بازنشانی نما</button>
          {onTransaction&&[['entry','ثبت خرید / ورود'],['exit','ثبت فروش / خروج']].map(([kind,label])=><button key={kind} type="button" role="menuitem" onClick={()=>{setContext(null);setFullscreen(false);onTransaction(kind)}}>{label}</button>)}
          <button type="button" role="menuitem" onClick={()=>setContext(null)}>بستن</button>
        </ChartContextMenu>}
        {showDetails ? <div className={styles.tooltip} role="status">
          <strong>{selectedLevel.label} <bdi>{formatPrice(selectedLevel.value)} {currency}</bdi></strong>
          <strong>فاصله <bdi>{levelDistance==null?'—':`${signedFormat.format(levelDistance)} ${currency} · ${signedFormat.format(levelDistance/displayedPrice*100)}٪`}</bdi></strong>
          {!daily&&<small>سود و زیان برآوردی <bdi>{eurAmount(closingResult)||'—'}</bdi></small>}
        </div> : null}
        </div>
        {indicators.rsi&&history.length>0&&<div className={styles.rsi}>
          <div className={styles.rsiTitle}><bdi>RSI 14 · {formatPrice(activeBar?.rsi)}</bdi></div>
          <svg {...panelResize(rsiHeight,setRsiHeight)} className={styles.resizePlot} style={{height:rsiHeight}} viewBox={`0 0 ${width} ${rsiHeight}`} role="img" aria-label="نمودار RSI، برای تغییر ارتفاع بکشید">
            {timeGuide(0,rsiHeight)}
            <RsiTrace rows={history} x={x} height={rsiHeight} left={LEFT} right={plotRight}/>
            {divergence&&<line x1={anchorX(divergence.from.date)} x2={anchorX(divergence.to.date)} y1={(rsiHeight-8)-divergence.from.rsi*(rsiHeight-16)/100} y2={(rsiHeight-8)-divergence.to.rsi*(rsiHeight-16)/100} stroke="#e8c37a" strokeWidth="2"/>}

          </svg>
        </div>}
        {indicators.macd&&history.length>0&&<div className={styles.rsi}>
          <div className={styles.rsiTitle}><bdi>MACD {formatPrice(activeBar?.macd)} · Signal {formatPrice(activeBar?.signal)} · Hist {formatPrice(activeBar?.histogram)}</bdi></div>
          <svg {...panelResize(macdHeight,setMacdHeight)} className={styles.resizePlot} style={{height:macdHeight}} viewBox={`0 0 ${width} 100`} preserveAspectRatio="none" role="img" aria-label="MACD، برای تغییر ارتفاع بکشید">
            <MacdTrace rows={history} x={x} left={LEFT} right={plotRight} width={candleWidth}/>
            {timeGuide(0,100)}
          </svg>
        </div>}

        </div>
        {lensOpen&&candles&&<ChartCandleLens rows={fullHistory} index={activeIndex} currency={currency} hovering={cursor!=null} summary={summary} anchorIndex={anchorIndex} picking={pickAnchor} onPick={toggleComparison} onClear={()=>{setAnchorDate(null);setPickAnchor(false)}}/>}
        </div>
        <ChartHistoryNavigator rows={fullHistory} start={historyStart} end={historyEnd} count={visibleCount} offset={viewportOffset} onNavigate={navigateHistory}/>
        {!daily&&!watchMarket&&<details className={styles.exitPanel}><summary>سناریوی خروج · حد سود، حد ضرر و Stop Out</summary><div className={styles.exitControls}>{exitPanel}</div></details>}
        <div className={styles.statusBar}>
          <details><summary><Icon name="source" size={14}/>منبع و پوشش داده</summary>
            <p>{daily ? source : reference ? 'کندل‌ها از ابزار مرجع '+reference+' در Yahoo Finance دریافت می‌شوند. قیمت اجرای CFD در XTB می‌تواند متفاوت باشد.' : 'قیمت از آخرین ثبت کارگزاری خوانده می‌شود.'}</p>
            {fullHistory.length>0&&<p>{fullHistory.length.toLocaleString('fa-IR')} کندل در تاریخچهٔ این تایم‌فریم · <bdi>{berlinTime(fullHistory[0].date,true)} — {berlinTime(fullHistory.at(-1).lastSession??fullHistory.at(-1).date,true)}</bdi></p>}
            {daily&&history.some(row=>row.open==null||row.low==null||row.high==null)&&<p>برای دوره‌هایی که فقط قیمت پایانی موجود است، یک نقطه نمایش داده می‌شود.</p>}
            {indicators.vwap&&<p>{typeof interval==='number'?'VWAP بر پایهٔ حجم ابزار مرجع است و در نیمه‌شب UTC از نو محاسبه می‌شود.':'VWAP تجمعی از ابتدای تاریخچهٔ این تایم‌فریم محاسبه می‌شود.'}</p>}
            {entryTime&&!entryTime.includes('T')&&!knownEntry?.observedOpen&&<p>برچسب ورود تاریخ ثبت‌شده را نشان می‌دهد.</p>}
            {!daily&&knownEntry?.observedOpen&&<p>زمان دقیق اجرا در سابقه موجود نیست. ناحیهٔ موقعیت از تاریخ ثبت آن شروع می‌شود.</p>}
          </details>
          <span><bdi>{[source,reference||daily?.market?.quote?.symbol].filter(Boolean).join(' · ')}</bdi></span>
          <span>ساعت برلین{priceTime&&<> · آخرین قیمت <bdi>{berlinTime(priceTime,true)}</bdi></>}</span>
        </div>
        {daily?.notice&&<p role="status">{daily.notice}</p>}
        {daily?.error&&<p role="alert">{daily.error}</p>}
        {error&&<p role="alert">{error}</p>}
      </div>

  </section>
}
