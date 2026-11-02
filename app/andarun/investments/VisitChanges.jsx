'use client'
import { useState } from 'react'
import { visitChanges } from '@/lib/investments/visit.mjs'
import { reviewQueue } from '@/lib/investments/family.mjs'
import { decisionDue } from './DecisionWorkspace'
import { number, percent, signedMoney } from '@/lib/investments/portfolio.mjs'
import { todayBerlin } from '@/lib/investments/family.mjs'
import styles from './investments.module.css'

export default function VisitChanges({ state, markets, visit, onAsset, onWeekly }) {
  const [expanded, setExpanded] = useState(false)
  if (!visit.ready) return null
  const result = visitChanges(state, markets, visit.previous)
  const due = reviewQueue(state).length + state.decisions.filter(d => decisionDue(d) && decisionDue(d) <= todayBerlin()).length
  const newsCount = new Set(result.rows.flatMap(r => r.news.map(n => n.url))).size
  const unavailableNews = new Set(state.accounts.flatMap(a => a.positions.filter(p => p.marketConfirmed && markets[p.marketSymbol]?.newsError).map(p => p.marketSymbol))).size
  const rows = result.rows.slice(0, expanded ? result.rows.length : 5)
  return <section className={`${styles.panel} ${styles.visitPanel}`} aria-labelledby="visit-changes-title">
    <div className={styles.panelHead}><div><h2 id="visit-changes-title">از آخرین بازدید چه تغییر کرده؟</h2><p>{visit.previous ? <>مبنا: <bdi>{new Date(visit.previous.reviewedAt).toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })}</bdi> · همین مرورگر</> : 'اولین بازدید در این مرورگر؛ پس از دریافت قیمت‌ها، مبنا را ثبت کن.'}</p></div><button type="button" className={styles.secondaryButton} onClick={visit.markReviewed}>{visit.previous ? 'بررسی شد؛ ثبت مبنای جدید' : 'ثبت مبنای اولین بررسی'}</button></div>
    {visit.error && <p role="alert" className={styles.error}>{visit.error}</p>}
    <div className={styles.visitSummary}><span><strong>{number(result.compared)}</strong> دارایی قابل مقایسه</span><span><strong>{number(newsCount)}</strong> خبر مهم احتمالی تازه</span><button type="button" className={styles.textButton} onClick={onWeekly}>{number(due)} تصمیم موعدرسیده · مرور هفتگی ←</button></div>
    {unavailableNews > 0 && <p className={styles.footnote}>خبرهای {number(unavailableNews)} نماد موقتاً دریافت نشده‌اند؛ شمار خبرها کامل نیست.</p>}
    {visit.previous && <>
      <div className={styles.visitRows}>{rows.map(row => <article key={`${row.accountId}:${row.positionId}`}>
        <button type="button" className={styles.visitAsset} onClick={() => onAsset(row.accountId, row.positionId)}><strong dir="auto">{row.name}</strong><small>حساب {row.owner}</small></button>
        <div>{row.movement ? <><strong className={row.movement.nativePercent < 0 ? styles.negative : row.movement.nativePercent > 0 ? styles.positive : ''}><bdi>{percent(row.movement.nativePercent)}</bdi></strong><small>{row.movement.unchangedTime ? 'زمان قیمت منبع تغییر نکرده' : <>قیمت: <bdi>{new Date(row.movement.latest).toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })}</bdi></>}</small></> : <small>{row.issue}</small>}</div>
        <div><strong><bdi>{signedMoney(row.movement?.deltaCents)}</bdi></strong><small>اثر برآوردی با تعداد فعلی</small></div>
        {row.news.length > 0 && <div className={styles.visitNews}>{row.news.map(n => <a href={n.url} target="_blank" rel="noreferrer" dir="auto" key={n.url}>{n.title}<small><bdi>{n.publisher} · {n.date.slice(0, 10)}</bdi></small></a>)}</div>}
      </article>)}</div>
      {result.rows.length > 5 && <button type="button" className={styles.textButton} onClick={() => setExpanded(v => !v)}>{expanded ? 'نمایش کمتر' : `نمایش همه ${number(result.rows.length)} دارایی`}</button>}
      {result.unmatched > 0 && <p className={styles.footnote}>{number(result.unmatched)} دارایی هنوز نماد قیمت تأییدشده ندارند؛ اتصال از پرونده هر دارایی انجام می‌شود.</p>}
    </>}
    <p className={styles.footnote}>مقایسه قیمت‌های مرجع است؛ بازده واقعی حساب نیست. تعداد فعلی ثابت فرض می‌شود و معاملات، هزینه و سود نقدی لحاظ نمی‌شوند. خبرهای تازه از میان حداکثر ۱۴ روز اخیر و با تشخیص واژه‌های مهم نمایش داده می‌شوند. هنگام خروج، مبنای بازدید بعدی در همین مرورگر ذخیره می‌شود.</p>
  </section>
}
