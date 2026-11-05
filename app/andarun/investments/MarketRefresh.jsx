'use client'
import { number } from '@/lib/investments/portfolio.mjs'
import {marketKey} from '@/lib/investments/market.mjs'
import Icon from './InvestmentIcon'
import styles from './investments.module.css'

export default function MarketRefresh({ marketData, state }) {
  const { batch, symbolCount } = marketData
  const positions = state.accounts.flatMap(a => a.positions)
  const missing = positions.filter(p => !marketKey(p)).length
  const failed = state.accounts.flatMap(a => a.positions.filter(p => marketData.errors[marketKey(p)]).map(p => ({ ...p, accountId: a.id })))
  return <section className={styles.marketRefresh} aria-label="به‌روزرسانی قیمت‌ها">
    <div><button type="button" className={styles.primaryButton} disabled={!symbolCount || batch.running} onClick={marketData.refreshAll}><Icon name="refresh" size={17} />{batch.running ? `در حال آپدیت ${number(batch.done)} از ${number(batch.total)}` : 'به‌روزرسانی همه قیمت‌ها'}</button>
      <span className={styles.footnote}>{number(symbolCount)} ابزار مستقل برای دریافت قیمت{missing > 0 ? ` · ${number(missing)} دارایی بدون شناسه قیمت` : ''}</span></div>
    <div role="status" aria-live="polite">{batch.running ? <progress aria-label="پیشرفت دریافت قیمت‌ها" value={batch.done} max={batch.total} /> : batch.completedAt ? <p>آخرین درخواست: <bdi>{new Date(batch.completedAt).toLocaleTimeString('de-DE', { timeZone: 'Europe/Berlin' })}</bdi> · {number(batch.total - batch.failed)} موفق{batch.failed ? ` · ${number(batch.failed)} ناموفق؛ قیمت قبلی حفظ شد` : ''}</p> : null}</div>
    {failed.length > 0 && <details><summary>{number(failed.length)} دارایی با خطای دریافت؛ برای تلاش دوباره دکمه آپدیت را بزن</summary>{failed.map(p => <p key={`${p.accountId}:${p.id}`}><bdi>{p.name} · {marketKey(p)}</bdi> — {marketData.errors[marketKey(p)]}</p>)}</details>}
    <p className={styles.footnote}>قیمت‌ها و تاریخچه فقط با زدن دکمه به‌روزرسانی دریافت می‌شوند.</p>
    {!symbolCount && <p className={styles.footnote}>از نمای کلی، دریافت دستی قیمت با شناسه ISIN را فعال کن؛ برای ابزارهای بدون ISIN، نماد را در پرونده دارایی تعیین کن.</p>}
  </section>
}
