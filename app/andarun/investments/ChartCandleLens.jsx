import Icon from './InvestmentIcon'
import { priceChange, relativeVolume } from '@/lib/investments/chart-inspection.mjs'
import { berlinTime, chartPrice, signedFormat } from './chart-format'
import styles from './InvestmentPositionChart.module.css'

const volumeFormat = new Intl.NumberFormat('en-US', {maximumFractionDigits:2, notation:'compact'})
const number = new Intl.NumberFormat('fa-IR')

function Change({change, currency, price}) {
  return change && <bdi className={styles.change} data-direction={Math.sign(change.amount)}>
    {chartPrice(change.amount,true,price)} {currency} <span>({signedFormat.format(change.percent)}%)</span>
  </bdi>
}

export default function ChartCandleLens({rows,index,currency,hovering,summary,anchorIndex,picking,onPick,onClear}) {
  const bar = rows[index]
  const anchor = rows[anchorIndex]
  const delta = bar && priceChange(rows[index-1]?.close,bar.close)
  const relative = bar && relativeVolume(rows,index)
  const within = bar && Number.isFinite(bar.low) && Number.isFinite(bar.high) && bar.high > bar.low
    ? Math.max(0, Math.min(100, (bar.close-bar.low)/(bar.high-bar.low)*100)) : null
  return <aside className={styles.lens} aria-label="جزئیات کندل" dir="rtl">
    <section>
      <div className={styles.lensHeading}><Icon name="candles" size={17}/><h3>جزئیات کندل</h3></div>
      {bar ? <>
        <div className={styles.lensStamp}><small>{hovering?'زیر نشانگر':'آخرین کندل در نما'}</small><bdi>{berlinTime(bar.date,true)}{bar.lastSession&&bar.lastSession!==bar.date&&' – '+berlinTime(bar.lastSession,true)}</bdi></div>
        <dl className={styles.ohlcReadings} aria-label="قیمت‌های کندل">{[['باز','open'],['پایانی','close'],['کمترین','low'],['بیشترین','high']].map(([label,key])=>
          <div key={key}><dt>{label}</dt><dd><bdi>{chartPrice(bar[key])}</bdi></dd></div>)}</dl>
        {within != null && <div className={styles.candleRange} role="img" aria-label={`جای قیمت پایانی در دامنهٔ کندل: ${Math.round(within)} درصد از کف`}>
          <div><i style={{left:within+'%'}}/></div>
          <span><bdi>{chartPrice(bar.low)}</bdi><bdi>{chartPrice(bar.high)}</bdi></span>
        </div>}
        <dl className={styles.readings}>
          <div className={styles.readingWide}><dt>تغییر از پایانی قبلی</dt><dd>{delta?<Change change={delta} currency={currency} price={bar.close}/>: '—'}</dd></div>
          <div><dt>حجم</dt><dd><bdi>{Number.isFinite(bar.volume)?volumeFormat.format(bar.volume):'—'}</bdi></dd></div>
          <div title="حجم کندل تقسیم بر میانگین حجم ۲۰ کندل قبلی همین تایم‌فریم"><dt>حجم نسبی (۲۰)</dt><dd><bdi>{relative==null?'—':relative.toFixed(2)+'×'}</bdi></dd></div>
        </dl>
      </> : <p>{rows.length?'این زمان بعد از آخرین کندل است.':'پس از دریافت داده، مشخصات کندل در اینجا دیده می‌شود.'}</p>}
    </section>
    <section>
      <div className={styles.lensHeading}><Icon name="compare" size={16}/><h3>مقایسهٔ دو کندل</h3></div>
      {anchor && <div className={styles.comparison}>
        <small>پایانی مبنا <bdi>{chartPrice(anchor.close)} {currency}</bdi></small>
        <bdi>{berlinTime(anchor.date,true)}</bdi>
        {bar && <><Change change={priceChange(anchor.close,bar.close)} currency={currency} price={bar.close}/><small>{number.format(Math.abs(index-anchorIndex))} کندل فاصله</small></>}
      </div>}
      <div className={styles.compareActions}>
        <button type="button" disabled={!rows.length} aria-pressed={picking} onClick={onPick}>
          <Icon name="compare" size={15}/>{picking?'لغو انتخاب':anchor?'تغییر کندل مبنا':'انتخاب کندل مبنا'}
        </button>
        {anchor&&<button type="button" aria-label="پاک کردن مبنای مقایسه" onClick={onClear}><Icon name="close" size={14}/></button>}
      </div>
      {picking&&<p role="status">یک کندل را انتخاب کن. با کلیدهای جهت و Enter هم می‌توانی مبنا را تعیین کنی.</p>}
    </section>
    {summary && <section>
      <div className={styles.lensHeading}><Icon name="review" size={16}/><h3>بازهٔ روی صفحه</h3></div>
      <dl className={styles.readings}><div><dt>تعداد کندل</dt><dd>{number.format(summary.count)}</dd></div>
        <div><dt>{summary.hasRange?'کف تا سقف':'دامنهٔ پایانی‌ها'}</dt><dd><bdi>{chartPrice(summary.low)} – {chartPrice(summary.high)}</bdi></dd></div>
        <div><dt>تغییر پایانی‌ها</dt><dd><bdi data-direction={Math.sign(summary.change?.amount)}>{summary.change?signedFormat.format(summary.change.percent)+'%':'—'}</bdi></dd></div>
      </dl>
    </section>}
  </aside>
}
