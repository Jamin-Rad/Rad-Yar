'use client'
import { useId } from 'react'
import { todayBerlin } from '@/lib/investments/family.mjs'
import { realizedProfitCsv } from '@/lib/investments/realized-profit.mjs'
import { periodProfitCsv } from '@/lib/investments/period-profit.mjs'
import { number, signedMoney } from '@/lib/investments/portfolio.mjs'
import styles from './ProfitPeriod.module.css'

export function ProfitPeriodControl({selection={mode:'current'},onChange,period,dark=false}) {
  const id = useId()
  function changeMode(mode) {
    onChange?.({...selection,mode,from:selection.from || todayBerlin().slice(0,7)+'-01',to:selection.to || todayBerlin()})
  }
  return <div className={`${styles.control} ${dark?styles.dark:''}`}>
    <label htmlFor={id}>بازهٔ سود و زیان</label>
    <select id={id} value={selection.mode} onChange={e=>changeMode(e.target.value)}>
      <option value="current">از زمان خرید تا الان</option>
      <option value="week">۷ روز اخیر</option><option value="month">۳۰ روز اخیر</option><option value="year">امسال</option><option value="custom">بازهٔ دلخواه</option>
    </select>
    {selection.mode==='current' && <div className={styles.scopes} role="group" aria-label="نوع سود و زیان از زمان خرید">
      <button type="button" aria-pressed={selection.scope!=='realized'} onClick={()=>onChange?.({...selection,scope:'current'})}>دارایی‌های فعلی</button>
      <button type="button" aria-pressed={selection.scope==='realized'} onClick={()=>onChange?.({...selection,scope:'realized'})}>فروخته‌شده‌ها</button>
    </div>}
    {selection.mode==='custom' && <div className={styles.dates}>
      <label>از<input type="date" dir="ltr" value={selection.from||''} max={selection.to||todayBerlin()} onChange={e=>onChange?.({...selection,from:e.target.value})}/></label>
      <label>تا<input type="date" dir="ltr" value={selection.to||''} min={selection.from||undefined} max={todayBerlin()} onChange={e=>onChange?.({...selection,to:e.target.value})}/></label>
    </div>}
    {period?.range?.error && <span className={styles.error} role="alert">{period.range.error}</span>}
    {period?.range && !period.range.error && <span className={styles.range}><bdi>{period.range.from}</bdi> تا <bdi>{period.range.to}</bdi></span>}
  </div>
}
export function ProfitPeriodDetails({period,accountId,dark=false}) {
  if (!period?.range || period.range.error || !period.result) return null
  const accounts = accountId ? period.result.accounts.filter(a=>a.accountId===accountId) : period.result.accounts
  const incomplete = accounts.some(a=>!a.complete)
  function download() {
    const result = {...period.result,accounts}
    const url = URL.createObjectURL(new Blob([periodProfitCsv(result,period.range)],{type:'text/csv;charset=utf-8'}))
    const link = document.createElement('a');link.href=url;link.download=`profit-${accountId||'family'}-${period.range.from}-${period.range.to}.csv`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000)
  }
  return <details className={`${styles.details} ${dark?styles.dark:''}`}>
    <summary>جزئیات سود و زیان بازه {period.loading?'· در حال دریافت قیمت':incomplete?'· اطلاعات ناقص':''}</summary>
    <p>تغییر ارزش اوراق + نتیجهٔ خرید و فروش و درآمد نقدی، پس از مالیات و کارمزد. واریز و برداشت جزو سود نیست.</p>
    {accounts.map(a=><div key={a.accountId} className={styles.account}>
      <strong>{a.owner}: <bdi>{a.complete?signedMoney(a.gainCents):'—'}</bdi></strong>
      {!a.complete&&<span>پوشش {number(a.knownCount)} از {number(a.count)} دارایی · جمع بخش محاسبه‌شده: <bdi>{signedMoney(a.knownGainCents)}</bdi></span>}
      {a.otherCashCents==null&&<span>اطلاعات یک تراکنش نقدی کامل نیست.</span>}
      {a.instruments.filter(i=>i.issue).map(i=><span key={i.isin}>{i.name} — {i.issue}</span>)}
    </div>)}
    <div className={styles.actions}><button type="button" onClick={download}>خروجی CSV همین بازه</button>{incomplete&&<button type="button" onClick={period.reload} disabled={period.loading}>{period.loading?'دریافت قیمت تاریخی…':'تلاش دوباره برای قیمت‌ها'}</button>}</div>
  </details>
}

export function RealizedProfitDetails({result,accountId,dark=false}) {
  if(!result)return null
  const accounts=accountId?result.accounts.filter(a=>a.accountId===accountId):result.accounts
  function download(){
    const url=URL.createObjectURL(new Blob([realizedProfitCsv(result,accountId)],{type:'text/csv;charset=utf-8'}))
    const link=document.createElement('a');link.href=url;link.download=`realized-profit-${accountId||'family'}-${result.asOf}.csv`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000)
  }
  return <details className={`${styles.details} ${dark?styles.dark:''}`}>
    <summary>جزئیات سود و زیان فروش‌ها</summary>
    <p>سود بخش فروخته‌شده، حتی در فروش بخشی از دارایی؛ پس از هزینهٔ خرید، کارمزد و مالیات فروش. بهای خرید با FIFO محاسبه می‌شود.</p>
    {accounts.map(a=><div key={a.accountId} className={styles.account}>
      <strong>{a.owner}: <bdi>{a.knownGainCents==null?'—':signedMoney(a.knownGainCents)}</bdi>{!a.complete?' · بخش محاسبه‌شده':''}</strong>
      <span>{number(a.knownCount)} از {number(a.count)} فروش · سود: <bdi>{a.knownGainCents==null?'—':signedMoney(a.winningCents)}</bdi> · زیان: <bdi>{a.knownGainCents==null?'—':signedMoney(a.losingCents)}</bdi></span>
      {!a.complete&&<span>{number(a.count-a.knownCount)} فروش با بهای خرید ناقص</span>}
      {!!a.sales.length&&<details className={styles.saleRows}><summary>ریز فروش‌های {a.owner}</summary>{a.sales.map(s=><div key={s.id} className={styles.saleRow}><bdi>{s.date}</bdi><span>{s.name}</span><bdi>{s.realizedAfterTaxCents==null?'بهای خرید ناقص':signedMoney(s.realizedAfterTaxCents)}</bdi></div>)}</details>}
    </div>)}
    <div className={styles.actions}><button type="button" onClick={download}>خروجی CSV فروش‌ها</button></div>
  </details>
}
