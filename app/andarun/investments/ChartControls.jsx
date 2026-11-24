import { memo, useEffect, useRef, useState } from 'react'
import Icon from './InvestmentIcon'
import styles from './InvestmentPositionChart.module.css'

export const patternFamilies = [
  {name:'بازگشتی', hint:'قله‌ها یا دره‌ها شکل را می‌سازند. خط گردن مرز بررسی شکست است.',types:['سقف دوقلو','کف دوقلو','سقف سه‌قلو','کف سه‌قلو','سر و شانه','سر و شانهٔ معکوس']},
  {name:'مثلث‌ها',hint:'سقف و کف به هم نزدیک می‌شوند. یک مرز می‌تواند افقی باشد.',types:['مثلث صعودی','مثلث نزولی','مثلث متقارن']},
  {name:'گوه‌ها',hint:'هر دو مرز هم‌جهت‌اند و فاصلهٔ میان آن‌ها کمتر می‌شود.',types:['گوهٔ صعودی','گوهٔ نزولی']},
  {name:'پرچم‌ها',hint:'پس از حرکت تند اولیه، قیمت در یک کانال کوتاه یا محدودهٔ سه‌گوش مکث می‌کند.',types:['پرچم صعودی','پرچم نزولی','پرچم سه‌گوش']},
  {name:'بازشونده',hint:'فاصلهٔ سقف و کف دامنه در طول شکل افزایش می‌یابد.',types:['مثلث بازشوندهٔ متقارن','الگوی بازشونده']},
]

const toolGroups = [
  {label:'خطوط',icon:'trend',tools:[['trend','خط روند','بین دو نقطه بکش'],['channel','کانال روند','خط پایه را بکش، سپس برای پهنا کلیک کن'],['horizontal','خط افقی','روی قیمت کلیک کن'],['ray','پرتو افقی','از نقطهٔ شروع به راست'],['vertical','خط زمان','روی زمان کلیک کن']]},
  {label:'شکل و مسیر',icon:'rectangle',tools:[['rectangle','مستطیل','از یک گوشه به گوشهٔ مقابل'],['ellipse','بیضی','محدوده را با کشیدن مشخص کن'],['arrow','مسیر فلش','نقطه‌ها را با دوبارکلیک انتخاب کن'],['freehand','قلم آزاد','برای رسم، ماوس را نگه دار']]},
  {label:'اندازه‌گیری',icon:'measure',tools:[['measure','خط‌کش','تغییر قیمت و درصد بین دو نقطه'],['fib','فیبوناچی اصلاحی','از ابتدای موج تا انتهای آن بکش']]},
]

export const DrawingPalette=memo(function DrawingPalette({drawing,choose,available}) {
  const [open,setOpen]=useState(null)
  const box=useRef(null)
  useEffect(()=>{
    if (!open) return
    const outside=e=>{if(!box.current?.contains(e.target))setOpen(null)}
    const escape=e=>{if(e.key==='Escape'){setOpen(null);box.current?.querySelector('[aria-expanded=true]')?.focus()}}
    document.addEventListener('pointerdown',outside)
    document.addEventListener('keydown',escape)
    return ()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape)}
  },[open])
  return <div className={styles.palette} ref={box} role="group" aria-label="ابزار رسم">
    <button type="button" title="انتخاب و حرکت" aria-label="انتخاب و حرکت" aria-pressed={!drawing} onClick={()=>{choose(null);setOpen(null)}}><Icon name="pointer"/></button>
    {toolGroups.map(group=>{
      const active=group.tools.find(([id])=>id===drawing)
      return <div key={group.icon} className={styles.toolGroup}>
        <button type="button" title={group.label} aria-label={group.label} aria-expanded={open===group.icon} aria-pressed={!!active} onClick={()=>setOpen(open===group.icon?null:group.icon)}><Icon name={active?.[0]??group.icon}/><i/></button>
        {open===group.icon&&<div className={styles.toolFlyout} dir="rtl" role="group" aria-label={group.label}>
          <strong>{group.label}</strong>
          {group.tools.map(([id,label,hint])=><button type="button" key={id} disabled={!available} aria-pressed={drawing===id} onClick={()=>{choose(id);setOpen(null)}}><Icon name={id}/><span>{label}<small>{hint}</small></span></button>)}
        </div>}
      </div>
    })}
  </div>
})

const indicatorGroups=[
  ['روند و قیمت',[['ema20','EMA 20','میانگین نمایی'],['sma50','SMA 50','میانگین ۵۰ کندل'],['sma200','SMA 200','میانگین ۲۰۰ کندل'],['vwap','VWAP','میانگین وزنی حجم']]],
  ['نوسان',[['atr','ATR 14','دامنهٔ معمول حرکت'],['bands','Bollinger','باندهای نوسان']]],
  ['قدرت حرکت',[['rsi','RSI 14','قدرت نسبی'],['macd','MACD','اختلاف میانگین‌ها']]],
]
export function IndicatorPicker({values,onChange}) {
  return <div className={styles.indicatorGrid} aria-label="تنظیم اندیکاتورها">
    {indicatorGroups.map(([label,items])=><fieldset key={label}><legend>{label}</legend>{items.map(([id,name,hint])=><label key={id}><input type="checkbox" checked={values[id]} onChange={e=>onChange(id,e.target.checked)}/><bdi>{name}</bdi><small>{hint}</small></label>)}</fieldset>)}
  </div>
}
