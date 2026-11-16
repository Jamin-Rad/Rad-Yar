'use client'

import { useEffect, useRef, useState } from 'react'
import { browserChartStorage, readChartHistory, saveChartHistory } from '@/lib/investments/local-asset-chart.mjs'
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

export default function XtbPositionChart({ trade, openCount }) {
  const exposure = xtbExposure(trade)
  const [limits, setLimits] = useState({ stop: trade.plan.stopPrice || '', target: trade.plan.targetPrice || '' })
  const [referenceMarket, setReferenceMarket] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [snapshot, setSnapshot] = useState({})
  const [drag, setDrag] = useState(null)
  const plot = useRef(null)
  useEffect(() => {
    if (exposure.isBrent) setReferenceMarket(readChartHistory(browserChartStorage(), reference))
  }, [exposure.isBrent])

  const currency = trade.plan.currency
  const currentPrice = positive(snapshot.price)
  const history = (referenceMarket?.history || []).filter(row => Number.isFinite(row.close) && row.close > 0).slice(-70)
  const estimate = estimateXtbStopOut(exposure, Object.fromEntries(fields.map(([key]) => [key, positive(snapshot[key])])), openCount)
  const direction = exposure.direction
  const stop = positive(limits.stop), target = positive(limits.target)
  const invalidStop = stop != null && (stop - exposure.entry) * direction >= 0
  const invalidTarget = target != null && (target - exposure.entry) * direction <= 0
  const marketLevels = [exposure.entry, stop, target, currentPrice, estimate?.price, ...history.map(row => row.close)].filter(value => value != null)
  const low = Math.min(...marketLevels), high = Math.max(...marketLevels)
  const pad = Math.max((high - low) * .13, exposure.entry * .025)
  const [min, max] = drag?.domain || [Math.max(.01, low - pad), high + pad]
  const y = price => bottom - (price - min) / (max - min) * (bottom - top)
  const line = history.map((row, i) => `${i === 0 ? 'M' : 'L'}${16 + 589 * i / Math.max(1, history.length - 1)},${y(row.close)}`).join(' ')

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

  function move(event) {
    if (!drag) return
    const box = plot.current.getBoundingClientRect()
    const coordinate = (event.clientY - box.top) * 266 / box.height
    const price = min + (bottom - Math.min(bottom, Math.max(top, coordinate))) / (bottom - top) * (max - min)
    setLimits(previous => ({ ...previous, [drag.key]: Math.max(.01, price).toFixed(2) }))
  }

  return <section className={styles.card} aria-label="نمودار و سناریوی موقعیت XTB">
    <header className={styles.header}>
      <div><small>موقعیت باز · {direction === 1 ? 'خرید' : 'فروش'}</small><h2 dir="auto">{trade.plan.name}</h2></div>
      <div className={styles.tags}><span>حجم <bdi>{exposure.volume.toPrecision(8).replace(/\.?0+$/, '')}</bdi></span><span>میانگین ورود <bdi>{formatPrice(exposure.entry)} {currency}</bdi></span></div>
      {exposure.isBrent && <button type="button" disabled={busy} onClick={refresh}>{busy ? 'در حال دریافت…' : 'به‌روزرسانی نمودار'}</button>}
    </header>
    <div className={styles.grid}>
      <div className={styles.chart}>
        <svg ref={plot} className={styles.plot} viewBox="0 0 700 266" preserveAspectRatio="none" role="group" aria-label="نمودار سطح ورود و حدهای موقعیت" onPointerMove={move} onPointerUp={()=>setDrag(null)} onPointerCancel={()=>setDrag(null)} onLostPointerCapture={()=>setDrag(null)}>
          {[0,.25,.5,.75,1].map(step => {
            const value = min + (max-min)*step
            return <g key={step}><line x1="16" x2="605" y1={y(value)} y2={y(value)} stroke="#344350"/><text x="690" y={y(value)+4} textAnchor="end">{formatPrice(value)}</text></g>
          })}
          {line && <path d={line} fill="none" stroke="#9dcce4" strokeWidth="2" vectorEffect="non-scaling-stroke"/>}
          <line x1="16" x2="605" y1={y(exposure.entry)} y2={y(exposure.entry)} stroke="#f1c975" strokeDasharray="5 4" />
          <circle cx="16" cy={y(exposure.entry)} r="5" fill="#f1c975"/>
          {currentPrice != null && <line x1="16" x2="605" y1={y(currentPrice)} y2={y(currentPrice)} stroke="#9dcce4" strokeDasharray="2 4"/>}
          {estimate?.price != null && <line x1="16" x2="605" y1={y(estimate.price)} y2={y(estimate.price)} stroke="#c5a3fd" strokeWidth="2" strokeDasharray="7 4"/>}
          {Object.entries({stop,target}).filter(([,value])=>value!=null).map(([key,value]) => <g key={key} className={styles.handle}
            onPointerDown={event=>{event.currentTarget.setPointerCapture(event.pointerId);setDrag({key,domain:[min,max]})}}>
            <line x1="16" x2="605" y1={y(value)} y2={y(value)} stroke={key==='stop'?'#fa9b9b':'#a3e2bd'} strokeWidth="2"/>
            <rect x="16" y={y(value)-11} width="590" height="22" fill="transparent"/>
            <circle cx="605" cy={y(value)} r="8" fill={key==='stop'?'#fa9b9b':'#a3e2bd'}/><title>{limitLabels[key]} {formatPrice(value)}</title>
          </g>)}
        </svg>
        <div className={styles.legend}>
          <span data-color="entry">ورود</span><span data-color="stop">حد ضرر</span><span data-color="target">حد سود</span>{currentPrice != null && <span data-color="current">قیمت ثبت‌شدهٔ XTB</span>}{estimate?.price != null && <span data-color="liquidation">تخمین Stop Out</span>}
        </div>
        <p>{history.length ? <>قیمت مرجع قرارداد آتی برنت، <bdi>{history[0].date} تا {history.at(-1).date}</bdi>. قیمت اجرای XTB می‌تواند متفاوت باشد.</> : 'سطوح موقعیت روی محور قیمت نمایش داده می‌شوند.'}</p>
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
            {invalid ? <small role="status">این حد در سمت درست قیمت ورود نیست.</small> : <strong dir="ltr">{result ? `${result.amount == null ? '' : signedFormat.format(result.amount) + ' ' + currency + ' · '}${signedFormat.format(result.percent)}%` : '—'}</strong>}
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
