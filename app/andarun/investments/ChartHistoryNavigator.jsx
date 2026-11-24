import { memo, useId, useMemo, useRef } from 'react'
import { overviewTrace } from '@/lib/investments/chart-inspection.mjs'
import { anchoredOffset } from '@/lib/investments/xtb-chart.mjs'
import { berlinTime } from './chart-format'
import styles from './InvestmentPositionChart.module.css'

function ChartHistoryNavigator({rows,start,end,count,offset,onNavigate}) {
  const path = useMemo(()=>overviewTrace(rows),[rows])
  const drag = useRef(null)
  const gradient = useId()
  if (!rows.length) return null
  const maxStart = Math.max(0,rows.length-count)
  const left = start/rows.length, right = end/rows.length
  const span = berlinTime(rows[start].date)+' — '+berlinTime(rows[end-1].date)
  function fraction(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    return Math.max(0, Math.min(1, (e.clientX-rect.left)/rect.width))
  }
  function begin(e) {
    if (e.button!==0 || !maxStart) return
    e.preventDefault()
    e.currentTarget.focus({preventScroll:true})
    e.currentTarget.setPointerCapture(e.pointerId)
    const pos = fraction(e)
    const next = pos>=left && pos<=right ? offset : anchoredOffset(rows.length,count,pos*(rows.length-1),.5)
    drag.current = {pos, offset:next}
    onNavigate(next)
  }
  function move(e) {
    if (!drag.current) return
    const shift = Math.round((fraction(e)-drag.current.pos)*rows.length)
    onNavigate(Math.max(0, Math.min(maxStart,drag.current.offset-shift)))
  }
  function keys(e) {
    const jump = Math.max(1,Math.floor(count*.8))
    const values = {Home:maxStart,End:0,ArrowLeft:offset+1,ArrowRight:offset-1,PageUp:offset+jump,PageDown:offset-jump}
    if (!(e.key in values)) return
    e.preventDefault()
    onNavigate(Math.max(0, Math.min(maxStart,values[e.key])))
  }
  return <div className={styles.navigator} aria-label="مرور تاریخچه">
    <div className={styles.navigatorLabel}><strong>مرور تاریخچه</strong><bdi>{berlinTime(rows[0].date)} — {berlinTime(rows.at(-1).lastSession??rows.at(-1).date)}</bdi></div>
    <div dir="ltr" className={styles.historyTrack} role="slider" tabIndex={0} aria-label="پنجرهٔ قابل مشاهده در تاریخچه"
      aria-valuemin={0} aria-valuemax={maxStart} aria-valuenow={start} aria-valuetext={span}
      onPointerDown={begin} onPointerMove={move} onLostPointerCapture={()=>{drag.current=null}} onKeyDown={keys}>
      <svg viewBox="0 0 1000 40" preserveAspectRatio="none" aria-hidden="true">
        <defs><linearGradient id={gradient} x2="0" y2="1"><stop stopColor="#66c5a2" stopOpacity=".32"/><stop offset="1" stopColor="#66c5a2" stopOpacity=".02"/></linearGradient></defs>
        <path d={path+' L1000 40 H0 Z'} fill={`url(#${gradient})`}/>
        <path d={path} fill="none" stroke="#70b59f" vectorEffect="non-scaling-stroke"/>
      </svg>
      <i className={styles.brush} style={{left:left*100+'%',right:(1-right)*100+'%'}}/>
    </div>
    <button type="button" disabled={!offset} onClick={()=>onNavigate(0)}>آخرین کندل‌ها</button>
  </div>
}
export default memo(ChartHistoryNavigator)
