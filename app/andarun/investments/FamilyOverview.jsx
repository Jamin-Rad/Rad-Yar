import { ACCOUNT_DEFINITIONS, familySummary, reviewQueue, sharedPositions, tradeStatus, nextReviewDate } from '@/lib/investments/family.mjs'
import { summarize, money, percent, number } from '@/lib/investments/portfolio.mjs'
import Icon from './InvestmentIcon'
import styles from './investments.module.css'

export default function FamilyOverview({ state, onAccount, onNewTrade, onTrades, onReview, onWeekly, ledger, onLedger }) {
  const summary = familySummary(state)
  const due = reviewQueue(state)
  const shared = sharedPositions(state)
  const open = state.trades.filter(t => tradeStatus(t) === 'open').length
  return <>
    <section className={styles.familySummary} aria-label="خلاصه حساب‌های خانواده">
      <div className={styles.familyTotal}><span>{summary.unvaluedCount?'ارزش بخش دارای قیمت ثبت‌شده':'ارزش دارایی‌های ثبت‌شده'}</span><strong lang="en" dir="ltr">{money(summary.valuedCount?summary.totalCents:null)}</strong><small>{summary.unvaluedCount?`${number(summary.unvaluedCount)} دارایی بدون قیمت؛ جمع کامل نامشخص`:'بدون وجه نقد و XTB'}</small></div>
      <div><span>حساب‌های دارای داده</span><strong>{number(summary.populatedAccounts)} <small>از {number(state.accounts.length)}</small></strong><small>پوشش فعلی خانواده</small></div>
      <div><span>دارایی‌های ثبت‌شده</span><strong lang="en">{summary.count}</strong><small>اطلاعات واردشده از حساب‌ها</small></div>
    </section>
    <section className={styles.accountGrid} aria-label="حساب‌های Trade Republic">
      {state.accounts.map(account => {
        const definition = ACCOUNT_DEFINITIONS.find(d => d.id === account.id)
        const transactionCount = ledger?.transactions.filter(t=>t.accountId===account.id).length || 0
        const populated = account.positions.length > 0
        const info = summarize(account.positions)
        return <article className={styles.accountCard} key={account.id} style={{ '--account-color': definition.color }}>
          <div className={styles.accountCardHead}><span className={styles.accountAvatar}>{definition.initials}</span><div><h2>{account.owner}</h2><span lang="en">Trade Republic</span></div></div>
          <div className={styles.cardAmount}><span>{info.unvaluedCount?'ارزش بخش دارای قیمت':'ارزش دارایی‌ها'}</span><strong lang="en" dir="ltr">{populated ? money(info.valuedCount?info.totalCents:null) : '—'}</strong>{info.unvaluedCount>0&&<small>{number(info.unvaluedCount)} دارایی در انتظار قیمت</small>}</div>
          <div className={styles.cardMeta}><div><span>تعداد دارایی</span><strong>{populated ? number(info.count) : '—'}</strong></div><div><span>تاریخ اطلاعات</span><strong>{populated ? account.snapshotDate || 'نامشخص' : '—'}</strong></div></div>
          <p className={styles.cardFoot}>{populated ? `${number(account.positions.filter(p=>p.ledger?.quantityStatus==='transactions').length)} تعداد محاسبه‌شده از تراکنش‌ها · ${number(info.verified)} ردیف تأییدشده` : transactionCount ? `${number(transactionCount)} تراکنش وارد شده؛ ارزش روز دارایی‌ها هنوز ثبت نشده است.` : 'هنوز اطلاعات این حساب وارد نشده است.'}</p>
          <button type="button" className={populated ? styles.primaryButton : styles.outlineButton} onClick={() => !populated && transactionCount ? onLedger(account.id) : onAccount(account.id, !populated)}><Icon name={populated ? 'arrow' : 'plus'} size={16} />{populated ? 'مشاهده دارایی‌ها' : transactionCount ? 'مشاهده تراکنش‌ها و دارایی‌های بازسازی‌شده' : 'افزودن اولین دارایی'}</button>
          {populated && transactionCount > 0 && <button type="button" className={styles.textButton} onClick={()=>onLedger(account.id)}>{number(transactionCount)} تراکنش · گزارش سود و مالیات</button>}
        </article>
      })}
    </section>
    <section className={styles.tradingBand} aria-label="فضای معاملات XTB">
      <button className={styles.tradingIdentity} type="button" onClick={onTrades}><span className={styles.xtbMark} lang="en">XTB</span><span><strong>معاملات XTB</strong><small>برنامه‌ریزی، ثبت اجرا و مرور نتیجه‌ها</small></span></button>
      <div className={styles.bandStat}><span>برنامه‌های ثبت‌شده</span><strong lang="en">{state.trades.length}</strong></div><div className={styles.bandStat}><span>معاملات باز ثبت‌شده</span><strong lang="en">{open}</strong></div>
      <button type="button" className={styles.outlineButton} onClick={onNewTrade}><Icon name="plus" size={17} />ثبت برنامه معامله</button>
    </section>
    <div className={styles.overviewBottom}>
      <section className={styles.panel}><div className={styles.panelHead}><div><h2>مرور هفتگی</h2><p>حرکت بازار، خبرها، کیفیت داده و تصمیم‌های موعددار</p></div><Icon name="calendar" size={23} /></div>
        {due.length ? <div className={styles.dueList}>{due.slice(0, 3).map(trade => <button type="button" key={trade.id} onClick={() => onReview(trade.id)}><span dir="auto">{trade.plan.name}</span><small>{nextReviewDate(trade)}</small><Icon name="arrow" size={16} /></button>)}</div> : <div className={styles.calmEmpty}><Icon name="calendar" size={28} /><strong>بازبینی سررسیدشده‌ای نداری</strong><p>در صفحه مرور هفتگی، موارد نیازمند توجه هر چهار حساب را بررسی کن.</p><button type="button" className={styles.outlineButton} onClick={onWeekly}>بازکردن میز بررسی هفتگی</button></div>}
      </section>
      <section className={styles.panel}><div className={styles.panelHead}><div><h2>تصویر مشترک سرمایه</h2><p>بر پایه حساب‌هایی که اطلاعات دارند</p></div><Icon name="assets" size={23} /></div>
        <div className={styles.concentration}><strong>{summary.unvaluedCount?'نامشخص':percent(summary.topFiveShare)}</strong><p>{summary.unvaluedCount?'برای محاسبه تمرکز کل سبد، قیمت همه دارایی‌ها لازم است.':'از ارزش ثبت‌شده، در پنج دارایی بزرگ قرار دارد.'}</p></div>
        <div className={styles.sharedHint}>{shared.length ? shared.slice(0, 2).map(p => <p key={p.isin}><span lang="en">{p.name}</span> · {p.accounts.join('، ')} · <bdi lang="en">{money(p.valueCents)}</bdi></p>) : <p>دارایی مشترک پس از ثبت ISIN یکسان در چند حساب شناسایی می‌شود.</p>}</div>
        <p className={styles.footnote}>تغییر ماهانه با ثبت‌های واقعی و تاریخ‌دار قابل بررسی می‌شود؛ فعلاً عددی برای آن ساخته نشده است.</p>
      </section>
    </div>
  </>
}
