'use client'
import { useMemo } from 'react'
import { ACCOUNT_DEFINITIONS, familySummary } from '@/lib/investments/family.mjs'
import { ledgerReport } from '@/lib/investments/ledger.mjs'
import { money, number } from '@/lib/investments/portfolio.mjs'
import Icon from './InvestmentIcon'
import styles from './Overview.module.css'

function AttentionRow({ count, title, children, onClick }) {
  return <button type="button" className={styles.attentionRow} onClick={onClick}><span><strong>{number(count)} {title}</strong><small>{children}</small></span><Icon name="arrow" size={19}/></button>
}

export default function FamilyOverview({ state, onAccount, onNewTrade, onTrades, onWeekly, onAsset, ledger, onLedger }) {
  const summary = familySummary(state)
  const report = useMemo(() => ledger?.loaded ? ledgerReport(ledger.transactions) : null, [ledger?.loaded, ledger?.transactions])
  const pending = state.accounts.flatMap(a => a.positions.filter(p => p.ledger?.quantityStatus === 'prior-record').map(p => ({ account: a, position: p })))
  const unpriced = state.accounts.flatMap(a => a.positions.filter(p => p.valueCents == null).map(p => ({ account: a, position: p })))
  const missingMapping = state.accounts.flatMap(a => a.positions.filter(p => !p.marketConfirmed).map(p => ({ account: a, position: p })))
  function completePrices() {
    const first = unpriced[0] || missingMapping[0]
    if (first && onAsset) onAsset(first.account.id, first.position.id)
    else if (first) onAccount(first.account.id)
    else onWeekly()
  }
  const hasAttention = unpriced.length || pending.length || report?.summary.unknownSales
  return <div className={styles.home}>
    <section className={styles.summary} aria-label="خلاصه سرمایه خانواده">
      <div className={styles.summaryMetric}><Icon name="assets" size={25}/><div><strong>{number(summary.count)} دارایی</strong><span>در {number(state.accounts.length)} حساب خانواده</span></div></div>
      <div className={styles.summaryMetric}><Icon name="source" size={25}/><div><strong>{ledger?.loaded ? `${number(ledger.transactions.length)} تراکنش` : 'در حال دریافت…'}</strong><span>تاریخچه ثبت‌شده</span></div></div>
      <div className={styles.coverage}><div><Icon name={unpriced.length ? 'warning' : 'check'} size={23}/><strong>{unpriced.length ? `${number(unpriced.length)} دارایی بدون قیمت` : 'قیمت ثبت‌شده برای همه دارایی‌ها'}</strong></div><button type="button" onClick={completePrices}>{unpriced.length ? 'تکمیل قیمت‌ها' : 'بررسی اتصال قیمت‌ها'}<Icon name="arrow" size={18}/></button></div>
    </section>
    <div className={styles.mainGrid}>
      <section className={styles.accounts} aria-labelledby="family-accounts-title">
        <div className={styles.sectionHead}><div><h2 id="family-accounts-title" className={styles.sectionTitle}>حساب‌های خانواده</h2><p lang="en">Trade Republic</p></div><Icon name="wallet" size={23}/></div>
        <div className={styles.accountList}>
          {state.accounts.map(account => {
            const definition = ACCOUNT_DEFINITIONS.find(d => d.id === account.id)
            const count = account.positions.filter(p => p.ledger?.quantityStatus === 'prior-record').length
            const transactionCount = ledger?.loaded ? ledger.transactions.filter(t => t.accountId === account.id).length : null
            return <article key={account.id} className={styles.accountRow} aria-label={`حساب ${account.owner}`}>
              <div className={styles.identity}><span className={styles.avatar} style={{ '--avatar-color': definition.color }}>{definition.initials}</span><div><h3 className={styles.owner}>{account.owner}</h3><span>{number(account.positions.length)} دارایی</span></div></div>
              <div className={`${styles.accountStatus} ${count ? styles.needsReview : ''}`}><strong><Icon name={count ? 'warning' : account.positions.length ? 'check' : 'plus'} size={17}/>{count ? `${number(count)} تعداد نیازمند تطبیق` : account.positions.some(p => p.ledger) ? 'تعداد از تراکنش‌ها' : account.positions.length ? 'اطلاعات ثبت‌شده' : 'آماده ورود اطلاعات'}</strong><small>وضعیت تعداد دارایی‌ها</small></div>
              <div className={styles.transactionCount}><strong>{transactionCount == null ? '—' : number(transactionCount)}</strong><small>تراکنش</small></div>
              <div className={styles.accountActions}><button type="button" className={styles.assetsButton} onClick={() => onAccount(account.id)} aria-label={`دارایی‌های ${account.owner}`}>دارایی‌ها<Icon name="arrow" size={16}/></button><button type="button" className={styles.accountReport} onClick={() => onLedger(account.id, 'annual')} aria-label={`گزارش حساب ${account.owner}`}>گزارش حساب</button></div>
            </article>
          })}
        </div>
        <p className={styles.accountFootnote}>تعداد سهم‌ها با ورود تراکنش تازه به‌روز می‌شود. قیمت و هزینه خرید، جدا هستند.</p>
      </section>
      <section className={styles.attention} aria-labelledby="attention-title">
        <div className={styles.sectionHead}><h2 id="attention-title" className={styles.sectionTitle}>نیازمند توجه</h2><Icon name={hasAttention ? 'warning' : 'check'} size={23}/></div>
        <div className={styles.attentionList}>
          {unpriced.length > 0 && <AttentionRow count={unpriced.length} title="قیمت تکمیل نشده" onClick={completePrices}>قیمت ثبت نشده است؛ برای شروع نماد دارایی را وصل کن.</AttentionRow>}
          {pending.length > 0 && <AttentionRow count={pending.length} title="تعداد نیازمند تطبیق" onClick={() => onAccount(pending[0].account.id)}>خرید اولیه در فایل کامل نیست؛ تعداد قبلی حفظ شده است.</AttentionRow>}
          {report && report.summary.unknownSales > 0 && <AttentionRow count={report.summary.unknownSales} title="خروج اوراق با بهای ناقص" onClick={() => onLedger('all', 'issues')}>برای تکمیل سود و زیان، بهای خرید را بررسی کن.</AttentionRow>}
          {!hasAttention && <p className={styles.quiet}>{ledger?.loaded ? 'در اطلاعات فعلی، موردی برای تکمیل دیده نشد.' : 'در حال بررسی تراکنش‌های ثبت‌شده…'}</p>}
        </div>
        <div className={styles.weekly}><Icon name="calendar" size={23}/><div><h3 className={styles.weeklyTitle}>این هفته را بررسی کن</h3><p>مروری کوتاه بر تغییر قیمت‌ها، خبرها و تصمیم‌ها.</p><button type="button" onClick={onWeekly}>باز کردن مرور هفتگی<Icon name="arrow" size={17}/></button></div></div>
      </section>
    </div>
    <section className={styles.financial} aria-labelledby="financial-title">
      <div className={styles.financialIntro}><h2 id="financial-title" className={styles.sectionTitle}><Icon name="report" size={23}/>از دفتر تراکنش‌ها</h2><p>درآمد نقدی، سود کل سرمایه‌گذاری نیست.</p><button type="button" onClick={() => onLedger('all', 'annual')}>مشاهده گزارش‌ها<Icon name="arrow" size={17}/></button></div>
      <div className={styles.financeMetric}><span>درآمد نقدی خالص</span><strong><bdi>{money(report?.summary.incomeNetCents)}</bdi></strong></div>
      <div className={styles.financeMetric}><span>مالیات خالص ثبت‌شده</span><strong><bdi>{money(report?.summary.taxNetCents)}</bdi></strong></div>
      <div className={styles.financeMetric}><span>کارمزدها</span><strong><bdi>{money(report?.summary.feesNetCents)}</bdi></strong></div>
    </section>
    <section className={styles.trading} aria-label="میز معاملات XTB">
      <div className={styles.tradingIdentity}><strong lang="en">XTB</strong><div><h2 className={styles.tradingTitle}>معاملات کوتاه‌مدت</h2><p>برنامه، اجرا و بازبینی تصمیم</p></div></div>
      <div className={styles.tradingActions}><button type="button" className={styles.tradeEnter} onClick={onTrades}>میز معاملات XTB<Icon name="trading" size={18}/></button><button type="button" className={styles.tradeNew} onClick={onNewTrade}>برنامه جدید<Icon name="plus" size={18}/></button></div>
    </section>
  </div>
}
