'use client'
import { number } from '@/lib/investments/portfolio.mjs'
import Icon from './InvestmentIcon'
import styles from './investments.module.css'

export default function MarketRefresh({ marketData, state }) {
  const { batch, symbolCount } = marketData
  const positions = state.accounts.flatMap(a => a.positions)
  const missing = positions.filter(p => !p.marketConfirmed || !p.marketSymbol).length
  const failed = state.accounts.flatMap(a => a.positions.filter(p => p.marketConfirmed && marketData.errors[p.marketSymbol]).map(p => ({ ...p, accountId: a.id })))
  return <section className={styles.marketRefresh} aria-label="به‌روزرسانی قیمت‌ها">
    <div><button type="button" className={styles.primaryButton} disabled={!symbolCount || batch.running} onClick={marketData.refreshAll}><Icon name="refresh" size={17} />{batch.running ? `در حال آپدیت ${number(batch.done)} از ${number(batch.total)}` : 'به‌روزرسانی همه قیمت‌ها'}</button>
      <span className={styles.footnote}>{number(symbolCount)} نماد مستقل در حساب‌های خانواده{missing > 0 ? ` · ${number(missing)} دارایی نیازمند اتصال نماد` : ''}</span></div>
    <div role="status" aria-live="polite">{batch.running ? <progress aria-label="پیشرفت دریافت قیمت‌ها" value={batch.done} max={batch.total} /> : batch.completedAt ? <p>آخرین درخواست: <bdi>{new Date(batch.completedAt).toLocaleTimeString('de-DE', { timeZone: 'Europe/Berlin' })}</bdi> · {number(batch.total - batch.failed)} موفق{batch.failed ? ` · ${number(batch.failed)} ناموفق؛ قیمت قبلی حفظ شد` : ''}</p> : <p>زمان خود قیمت در پرونده هر دارایی نمایش داده می‌شود؛ بازار بسته می‌تواند همان قیمت قبلی را برگرداند.</p>}</div>
    {failed.length > 0 && <details><summary>{number(failed.length)} دارایی با خطای دریافت؛ برای تلاش دوباره دکمه آپدیت را بزن</summary>{failed.map(p => <p key={`${p.accountId}:${p.id}`}><bdi>{p.name} · {p.marketSymbol}</bdi> — {marketData.errors[p.marketSymbol]}</p>)}</details>}
    {!symbolCount && <p className={styles.footnote}>برای شروع، از فهرست دارایی‌ها وارد پرونده هر دارایی شو و نماد منبع قیمت را یک‌بار تأیید کن.</p>}
  </section>
}
