'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { browserChartStorage, readChartDrawings, readChartHistory, saveChartDrawings, saveChartHistory } from '@/lib/investments/local-asset-chart.mjs'
import { technicalHistory } from '@/lib/investments/indicators.mjs'
import ForecastChart from './ForecastChart'
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

export default function XtbPositionChart({ trade, openCount }) {
  const exposure = xtbExposure(trade)
  const [limits, setLimits] = useState({ stop: trade.plan.stopPrice || '', target: trade.plan.targetPrice || '' })
  const [referenceMarket, setReferenceMarket] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [snapshot, setSnapshot] = useState({})
  const [drag, setDrag] = useState(null)
  const [range, setRange] = useState(90)
  const [mode, setMode] = useState('candles')
  const [cursor, setCursor] = useState(null)
  const [drawing, setDrawing] = useState(null)
  const [anchor, setAnchor] = useState(null)
  const [lines, setLines] = useState([])
  const [saveError, setSaveError] = useState(false)
  const [forecast, setForecast] = useState(null)
  const [indicators, setIndicators] = useState({ ema20: true, sma50: true, sma200: true, rsi: true })
  const drawingsKey = JSON.stringify(['xtb', trade.ownerId, trade.id, trade.plan.symbol, trade.plan.currency])
  const gradient = useId()
  const plot = useRef(null)
  useEffect(() => {
    if (exposure.isBrent) setReferenceMarket(readChartHistory(browserChartStorage(), reference))
  }, [exposure.isBrent])
  useEffect(() => setLines(readChartDrawings(browserChartStorage(), drawingsKey)), [drawingsKey])

  const currency = trade.plan.currency
  const currentPrice = positive(snapshot.price)
  const referencePrice = positive(referenceMarket?.quote?.price)
  const displayedPrice = currentPrice ?? referencePrice
  const pnl = xtbScenario(exposure, displayedPrice)
  const enteredFx = positive(snapshot.fx)
  const fx = currency === 'EUR' ? 1 : enteredFx ?? positive(referenceMarket?.fx?.latest?.rate)
  const eurAmount = scenario => scenario?.amount != null && fx != null ? signedFormat.format(scenario.amount * fx) + ' €' : null
  const fullHistory = useMemo(() => technicalHistory(referenceMarket?.history), [referenceMarket?.history])
  const history = fullHistory.slice(-range)
  const visibleAverages = averages.filter(([key]) => indicators[key])
  const candles = mode === 'candles' && history.length > 0 && history.every(row =>
    ['open', 'high', 'low'].every(key => Number.isFinite(row[key]) && row[key] > 0))
  const activeBar = history[cursor ?? history.length - 1]
  const estimate = estimateXtbStopOut(exposure, Object.fromEntries(fields.map(([key]) => [key, positive(snapshot[key])])), openCount)
  const direction = exposure.direction
  const stop = positive(limits.stop), target = positive(limits.target)
  const invalidStop = stop != null && (stop - exposure.entry) * direction >= 0
  const invalidTarget = target != null && (target - exposure.entry) * direction <= 0
  const marketLevels = [exposure.entry, stop, target, displayedPrice, estimate?.price,
    ...lines.filter(line => !line.end).map(line => line.start.price),
    ...history.flatMap(row => [...(candles ? [row.low, row.high] : [row.close]), ...visibleAverages.map(([key])=>row[key])])].filter(value => value != null)
  const low = Math.min(...marketLevels), high = Math.max(...marketLevels)
  const pad = Math.max((high - low) * .13, exposure.entry * .025)
  const [min, max] = drag?.domain || [Math.max(.01, low - pad), high + pad]
  const y = price => bottom - (price - min) / (max - min) * (bottom - top)
  const x = i => 16 + 575 * i / Math.max(1, history.length - 1)
  const anchorX = date => {
    const index = fullHistory.findIndex(row => row.date >= date)
    return x((index < 0 ? fullHistory.length : index) - (fullHistory.length - history.length))
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
  const line = history.map((row, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(row.close)}`).join(' ')
  const candleWidth = Math.max(1, Math.min(12, 415 / history.length))

  async function refresh() {
    setBusy(true)
    setError('')
    try {
      const params = new URLSearchParams({ symbol: reference, refresh: '1', history: '1' })
      const response = await fetch(`/api/andarun/investments/market?${params}`, { cache: 'no-store' })
      const market = await response.json()
      if (!response.ok || market.quote?.currency !== 'USD' || market.quote.symbol !== reference || market.history?.length < 2) throw Error(market.error || 'تاریخچهٔ مرجع در دسترس نیست.')
      setReferenceMarket(market)
      saveChartHistory(browserChartStorage(), reference, market)
    } catch (err) { setError(err.message) }
    finally { setBusy(false) }
  }
  async function toggleForecast() {
    if (forecast) { setForecast(null);return }
    setForecast({loading:true})
    try {
      const response = await fetch('/api/andarun/investments/market?symbol=BZ%3DF&refresh=1&interval=15m', {cache:'no-store'})
      const data = await response.json()
      if (!response.ok || !Array.isArray(data.history)) throw Error('دریافت کندل‌های ۱۵ دقیقه‌ای برنت انجام نشد.')
      setForecast({rows:data.history})
    } catch (error) { setForecast({error:error.message}) }
  }

  function pointerPrice(event) {
    const box = plot.current.getBoundingClientRect()
    const coordinate = (event.clientY - box.top) * 266 / box.height
    return min + (bottom - Math.min(bottom, Math.max(top, coordinate))) / (bottom - top) * (max - min)
  }
  function saveLines(next) {
    setLines(next)
    setSaveError(!saveChartDrawings(browserChartStorage(),drawingsKey,next))
  }
  function plotIndex(event) {
    const box = plot.current.getBoundingClientRect()
    const coordinate = (event.clientX - box.left) * 700 / box.width
    return Math.max(0, Math.min(history.length - 1, Math.round((coordinate - 16) / 575 * (history.length - 1))))
  }
  function chooseDrawing(tool) {
    setDrawing(previous=>previous===tool?null:tool)
    setAnchor(null)
  }
  function draw(event) {
    if (!drawing || lines.length >= 100) return
    const point = { date: history[plotIndex(event)]?.date || new Date().toISOString().slice(0,10), price: pointerPrice(event) }
    if (drawing === 'trend' && !anchor) { setAnchor(point);return }
    saveLines([...lines,drawing==='trend'?{type:'trend',start:anchor,end:point}:{type:'horizontal',start:point}])
    setDrawing(null)
    setAnchor(null)
  }
  function move(event) {
    if (!drag) {
      if (!history.length) return
      setCursor(plotIndex(event))
      return
    }
    const price = pointerPrice(event)
    setLimits(previous => ({ ...previous, [drag.key]: Math.max(.01, price).toFixed(2) }))
  }

  return <section className={styles.card} aria-label="نمودار و سناریوی موقعیت XTB">
    <header className={styles.header}>
      <div><small>موقعیت باز · {direction === 1 ? 'خرید' : 'فروش'}</small><h2 dir="auto">{trade.plan.name}</h2></div>
      <div className={styles.tags}><span>حجم <bdi>{exposure.volume.toPrecision(8).replace(/\.?0+$/, '')}</bdi></span><span>میانگین ورود <bdi>{formatPrice(exposure.entry)} {currency}</bdi></span></div>
      {exposure.isBrent && <button type="button" disabled={busy} onClick={refresh}>{busy ? 'در حال دریافت…' : 'به‌روزرسانی نمودار'}</button>}
    </header>
    <dl className={styles.quoteStrip}>
      <div><dt>{currentPrice != null ? 'قیمت خروج واردشده از XTB' : 'آخرین قیمت مرجع'}</dt><dd><bdi>{formatPrice(displayedPrice)} {currency}</bdi></dd>
        {currentPrice == null && referenceMarket?.quote?.asOf && <small><bdi>{referenceMarket.quote.asOf.slice(0, 16).replace('T', ' ')} UTC</bdi></small>}</div>
      <div><dt>سود و زیان باز · ناخالص برآوردی</dt><dd data-sign={pnl?.percent < 0 ? 'negative' : 'positive'}><bdi>{pnl ? `${pnl.amount == null ? '' : signedFormat.format(pnl.amount) + ' ' + currency + ' · '}${signedFormat.format(pnl.percent)}%` : '—'}</bdi></dd>
        {pnl?.amount != null && <p><bdi>{eurAmount(pnl) || '—'}</bdi>{eurAmount(pnl) ? <> · {enteredFx ? 'نرخ واردشده' : <bdi>{referenceMarket?.fx?.latest?.date}</bdi>}</> : ' · نرخ یورو در دسترس نیست'}</p>}
        <small>{currentPrice != null ? 'بر اساس قیمت خروج واردشده' : displayedPrice == null ? 'قیمت مرجع را به‌روزرسانی کن' : 'بر اساس قیمت مرجع برنت'}</small></div>
    </dl>
    <div className={styles.grid}>
      <div className={styles.chart}>
        <div className={styles.chartTools} aria-label="ابزارهای نمودار">
          {exposure.isBrent && <button type="button" aria-expanded={!!forecast} disabled={forecast?.loading} onClick={toggleForecast}>{forecast?.loading?'دریافت کندل‌ها…':forecast?'بستن پیش‌بینی':'پیش‌بینی روند'}</button>}
          {[[30, '۳۰ جلسه'], [90, '۹۰ جلسه'], [260, 'یک سال']].map(([value,label])=><button type="button" key={value} aria-pressed={range===value} onClick={()=>{setRange(value);setCursor(null)}}>{label}</button>)}
          <button type="button" aria-pressed={mode === 'candles'} onClick={()=>setMode('candles')}>کندلی</button>
          <button type="button" aria-pressed={mode === 'line'} onClick={()=>setMode('line')}>خطی</button>
          <button type="button" aria-pressed={drawing==='horizontal'} disabled={lines.length>=100} onClick={()=>chooseDrawing('horizontal')}>خط افقی</button>
          <button type="button" aria-pressed={drawing==='trend'} disabled={history.length<2 || lines.length>=100} onClick={()=>chooseDrawing('trend')}>خط روند</button>
          <button type="button" disabled={!lines.length} onClick={()=>saveLines(lines.slice(0,-1))}>حذف خط آخر</button>
        </div>
        {drawing==='trend'&&<p role="status">{anchor?'نقطهٔ پایان خط روند را انتخاب کن.':'نقطهٔ شروع خط روند را انتخاب کن.'}</p>}
        {saveError&&<p role="alert">ذخیرهٔ خطوط در این مرورگر انجام نشد.</p>}
        <div className={styles.chartTools} aria-label="اندیکاتورها">
          {[...averages,['rsi','RSI 14','#a9d5cf']].map(([key,label,color])=><button key={key} style={{color}} type="button" aria-pressed={indicators[key]} onClick={()=>setIndicators(previous=>({...previous,[key]:!previous[key]}))}>{label}</button>)}
        </div>
        {mode === 'candles' && history.length > 0 && !candles && <p>برای دریافت کندل‌ها نمودار را به‌روزرسانی کن.</p>}
        {activeBar && <p className={styles.readout}><bdi>{activeBar.date}</bdi> · پایانی <bdi>{formatPrice(activeBar.close)}</bdi>{candles && <> · باز <bdi>{formatPrice(activeBar.open)}</bdi> · بالا <bdi>{formatPrice(activeBar.high)}</bdi> · پایین <bdi>{formatPrice(activeBar.low)}</bdi></>}</p>}
        <svg ref={plot} className={styles.plot} data-drawing={!!drawing} viewBox="0 0 700 266" preserveAspectRatio="none" role="group" aria-label="نمودار قیمت و سطح‌های موقعیت"
          onPointerMove={move} onPointerLeave={()=>setCursor(null)} onPointerUp={()=>setDrag(null)} onPointerCancel={()=>setDrag(null)} onLostPointerCapture={()=>setDrag(null)}
          onClick={draw}>
          <defs><linearGradient id={gradient} x2="0" y2="1"><stop stopColor="#63a9fd" stopOpacity=".3"/><stop offset="100%" stopColor="#63a9fd" stopOpacity="0"/></linearGradient><clipPath id={gradient+'-plot'}><rect x="16" y={top} width="589" height={bottom-top}/></clipPath></defs>
          {[0,.25,.5,.75,1].map(step => {
            const value = min + (max-min)*step
            return <g key={step}><line x1="16" x2="605" y1={y(value)} y2={y(value)} stroke="#344350"/><text x="690" y={y(value)+4} textAnchor="end">{formatPrice(value)}</text></g>
          })}
          {candles ? history.map((bar,i)=>{
            const color=bar.close>=bar.open?'#53d6ae':'#fb8092'
            return <g key={bar.date}><line x1={x(i)} x2={x(i)} y1={y(bar.high)} y2={y(bar.low)} stroke={color}/><rect x={x(i)-candleWidth/2} y={Math.min(y(bar.open),y(bar.close))} width={candleWidth} height={Math.max(1,Math.abs(y(bar.close)-y(bar.open)))} fill={color}/></g>
          }) : line && <><path d={`${line} L${x(history.length-1)},${bottom} L16,${bottom} Z`} fill={`url(#${gradient})`}/><path d={line} fill="none" stroke="#84c5ff" strokeWidth="2" vectorEffect="non-scaling-stroke"/></>}
          {cursor != null && activeBar && <g><line x1={x(cursor)} x2={x(cursor)} y1={top} y2={bottom} stroke="#b6c8dc" strokeDasharray="3 4"/><circle cx={x(cursor)} cy={y(activeBar.close)} r="4" fill="#c8e3ff"/></g>}
          {visibleAverages.map(([key,,color])=><path key={key} d={seriesPath(key,y)} fill="none" stroke={color} vectorEffect="non-scaling-stroke"/>)}
          <g clipPath={`url(#${gradient}-plot)`}>
            {lines.map((line,i)=><line key={i} x1={line.end?anchorX(line.start.date):16} x2={line.end?anchorX(line.end.date):605} y1={y(line.start.price)} y2={y(line.end?.price??line.start.price)} stroke="#8bb7ee" strokeWidth="2" strokeDasharray={line.end?undefined:'3 4'}/>)}
            {anchor&&<circle cx={anchorX(anchor.date)} cy={y(anchor.price)} r="4" fill="#8bb7ee"/>}
          </g>
          <line x1="16" x2="605" y1={y(exposure.entry)} y2={y(exposure.entry)} stroke="#f1c975" strokeDasharray="5 4" />
          <circle cx="16" cy={y(exposure.entry)} r="5" fill="#f1c975"/>
          {displayedPrice != null && <line x1="16" x2="605" y1={y(displayedPrice)} y2={y(displayedPrice)} stroke="#9dcce4" strokeDasharray="2 4"/>}
          {estimate?.price != null && <line x1="16" x2="605" y1={y(estimate.price)} y2={y(estimate.price)} stroke="#c5a3fd" strokeWidth="2" strokeDasharray="7 4"/>}
          {Object.entries({stop,target}).filter(([,value])=>value!=null).map(([key,value]) => <g key={key} className={styles.handle}
            onPointerDown={event=>{if(drawing)return;event.currentTarget.setPointerCapture(event.pointerId);setDrag({key,domain:[min,max]})}}>
            <line x1="16" x2="605" y1={y(value)} y2={y(value)} stroke={key==='stop'?'#fa9b9b':'#a3e2bd'} strokeWidth="2"/>
            <rect x="16" y={y(value)-11} width="590" height="22" fill="transparent"/>
            <circle cx="605" cy={y(value)} r="8" fill={key==='stop'?'#fa9b9b':'#a3e2bd'}/><title>{limitLabels[key]} {formatPrice(value)}</title>
          </g>)}
          {history.length > 1 && [0, Math.floor(history.length / 2), history.length - 1].filter((i,index,list)=>list.indexOf(i)===index).map((i,index)=>
            <text key={i} x={x(i)} y="261" textAnchor={index===0?'start':i===history.length-1?'end':'middle'}>{history[i].date.slice(5)}</text>)}
        </svg>
        {indicators.rsi && history.length>0 && <div className={styles.rsi}>
          <p><bdi>RSI 14 · {formatPrice(activeBar?.rsi)}</bdi></p>
          {history.some(row=>row.rsi!=null) ? <svg viewBox="0 0 700 100" preserveAspectRatio="none" role="img" aria-label="نمودار RSI با سطوح ۳۰ و ۷۰">
            {[30,70].map(level=><g key={level}><line x1="16" x2="605" y1={92-level*.84} y2={92-level*.84} stroke="#65778a" strokeDasharray="4 4"/><text x="650" y={96-level*.84} fill="#c6d1dc">{level}</text></g>)}
            <path d={seriesPath('rsi',value=>92-value*.84)} fill="none" stroke="#a9d5cf" strokeWidth="2" vectorEffect="non-scaling-stroke"/>
          </svg> : <p>برای RSI حداقل ۱۵ قیمت پایانی لازم است.</p>}
        </div>}
        <div className={styles.legend}>
          <span data-color="entry">ورود</span><span data-color="stop">حد ضرر</span><span data-color="target">حد سود</span>{displayedPrice != null && <span data-color="current">{currentPrice != null ? 'قیمت واردشده از XTB' : 'قیمت مرجع'}</span>}{estimate?.price != null && <span data-color="liquidation">تخمین Stop Out</span>}
        </div>
        <p>{history.length ? <>قیمت مرجع قرارداد آتی برنت، <bdi>{history[0].date} تا {history.at(-1).date}</bdi>. قیمت اجرای XTB می‌تواند متفاوت باشد.</> : 'سطوح موقعیت روی محور قیمت نمایش داده می‌شوند.'}</p>
        {forecast?.error && <p role="alert">{forecast.error}</p>}
        {forecast?.rows && <ForecastChart rows={forecast.rows} currency="USD" intraday/>}
        {error && <p role="alert">{error}</p>}
      </div>
      <div className={styles.scenarios}>
        <h3>سناریوی خروج</h3>
        <p>خط‌ها را بکش یا قیمت را وارد کن. تغییرات فقط در این سناریو اعمال می‌شوند.</p>
        {Object.entries(limitLabels).map(([key,label]) => {
          const invalid = key === 'stop' ? invalidStop : invalidTarget
          const result = !invalid && xtbScenario(exposure, positive(limits[key]))
          return <div className={styles.limit} data-limit={key} key={key}>
            <label>{label} <bdi>{currency}</bdi><input dir="ltr" type="number" min="0.01" step="0.01" value={limits[key]} aria-invalid={invalid} onChange={event=>setLimits(previous=>({...previous,[key]:event.target.value}))}/></label>
            {invalid ? <small role="status">این حد در سمت درست قیمت ورود نیست.</small> : <><strong dir="ltr">{result ? `${result.amount == null ? '' : signedFormat.format(result.amount) + ' ' + currency + ' · '}${signedFormat.format(result.percent)}%` : '—'}</strong>{result && eurAmount(result) && <small dir="ltr">{eurAmount(result)}</small>}</>}
          </div>
        })}
        <button type="button" onClick={()=>setLimits({stop:trade.plan.stopPrice||'',target:trade.plan.targetPrice||''})}>بازگشت به حدهای ثبت‌شده</button>
        <p>مبلغ، سود یا زیان ناخالصِ سناریو است. درصد، تغییر جهت‌دار قیمت نسبت به ورود است.</p>
      </div>
    </div>
    <details className={styles.stopOut}>
      <summary>لیکوییدیشن / Stop Out <bdi>{estimate?.price != null ? formatPrice(estimate.price) + ' ' + currency : '—'}</bdi></summary>
      <p>Stop Out به مارجین کل حساب وابسته است. با داده‌های هم‌زمان از XTB می‌توان برای یک موقعیت OIL تخمین زد. <a href={stopOutSource} target="_blank" rel="noreferrer">قاعدهٔ Stop Out در XTB</a></p>
      {openCount === 1 && exposure.isBrent ? <>
        <div className={styles.inputs}>{fields.map(([key,label])=><label key={key}>{label}<input dir="ltr" type="number" min="0" step="any" value={snapshot[key]||''} onChange={event=>setSnapshot(previous=>({...previous,[key]:event.target.value}))}/></label>)}</div>
        {estimate && <p role="status">سطح مارجین <bdi>{formatPrice(estimate.marginLevel)}٪</bdi> · {estimate.alreadyBelow?'ورودی‌ها پایین‌تر از آستانهٔ Stop Out هستند.':estimate.price==null?'در این مدل قیمت مثبت برای Stop Out به‌دست نیامد.':<>قیمت تخمینی <bdi>{formatPrice(estimate.price)} {currency}</bdi></>}</p>}
        <p>برآورد با آستانهٔ ۵۰٪ و فرض یک موقعیت باز واقعی و ثبات مارجین، نرخ ارز و هزینه‌هاست.</p>
      </> : <p>این تخمین برای یک موقعیت باز OIL در حساب فعال است.</p>}
    </details>
  </section>
}
