'use client'

import { useState } from 'react'
import { decimal, todayBerlin, tradeStatus, tradePosition, nextReviewDate, STATUS_LABELS, PRODUCT_LABELS } from '@/lib/investments/family.mjs'
import { parseMoney, money, signedMoney, number } from '@/lib/investments/portfolio.mjs'
import Icon from './InvestmentIcon'
import styles from './investments.module.css'

function TradePlanForm({ onSubmit, onCancel }) {
  const [error, setError] = useState('')
  function submit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    try {
      onSubmit({ id: crypto.randomUUID(), accountId: 'xtb', plan: {
        name: String(form.get('name')).trim(), symbol: String(form.get('symbol')).trim(),
        direction: form.get('direction'), product: form.get('product'), currency: form.get('currency'),
        entryPrice: decimal(form.get('entryPrice')), stopPrice: decimal(form.get('stopPrice'), true), targetPrice: decimal(form.get('targetPrice'), true),
        quantity: decimal(form.get('quantity'), true), plannedRiskCents: parseMoney(form.get('plannedRisk'), true),
        rationale: String(form.get('rationale')).trim(), invalidation: String(form.get('invalidation')).trim(),
        planDate: form.get('planDate'), reviewDate: form.get('reviewDate'), createdAt: new Date().toISOString(),
      }, executions: [], reviews: [] })
    } catch (err) { setError(err.message) }
  }
  return <section className={styles.planPanel} aria-labelledby="new-trade-title"><div className={styles.panelHead}><div><h2 id="new-trade-title">برنامه معامله جدید</h2><p>اول دلیل و معیار تصمیم را ثبت کن.</p></div><button type="button" className={styles.iconButton} onClick={onCancel} aria-label="بستن فرم برنامه"><Icon name="close" size={18} /></button></div>
    <form onSubmit={submit} className={styles.planForm}>
      <div className={styles.formGrid}><label className={styles.field}>نام دارایی<input name="name" required maxLength={160} dir="auto" placeholder="نام دقیق ابزار" /></label><label className={styles.field}>نماد<input name="symbol" maxLength={35} dir="ltr" placeholder="در صورت مشخص‌بودن" /></label></div>
      <div className={styles.formGrid}><label className={styles.field}>نوع ابزار<select name="product" defaultValue="stock">{Object.entries(PRODUCT_LABELS).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label><label className={styles.field}>جهت برنامه<select name="direction" defaultValue="long"><option value="long">خرید / Long</option><option value="short">فروش / Short</option></select></label></div>
      <div className={styles.formGrid}><label className={styles.field}>ورود برنامه‌ریزی‌شده<input name="entryPrice" required inputMode="decimal" dir="ltr" /></label><label className={styles.field}>ارز قیمت<select name="currency" defaultValue="EUR">{['EUR', 'USD', 'GBP', 'CHF', 'JPY', 'HKD'].map(currency => <option key={currency}>{currency}</option>)}</select></label></div>
      <div className={styles.formGrid}><label className={styles.field}>حد توقف، اختیاری<input name="stopPrice" inputMode="decimal" dir="ltr" /></label><label className={styles.field}>هدف قیمت، اختیاری<input name="targetPrice" inputMode="decimal" dir="ltr" /></label></div>
      <div className={styles.formGrid}><label className={styles.field}>تعداد / حجم برنامه، اختیاری<input name="quantity" inputMode="decimal" dir="ltr" /></label><label className={styles.field}>زیان برنامه‌ریزی‌شده (€)<input name="plannedRisk" inputMode="decimal" dir="ltr" /><small>برآورد خودت؛ اختیاری</small></label></div>
      <label className={styles.field}>چرا می‌خواهم وارد شوم؟<textarea name="rationale" required maxLength={1000} rows={3} /></label>
      <label className={styles.field}>چه چیزی این تصمیم را باطل می‌کند؟<textarea name="invalidation" required maxLength={1000} rows={3} /></label>
      <div className={styles.formGrid}><label className={styles.field}>تاریخ برنامه<input name="planDate" type="date" required defaultValue={todayBerlin()} max={todayBerlin()} dir="ltr" /></label><label className={styles.field}>موعد بازبینی<input name="reviewDate" type="date" required min={todayBerlin()} dir="ltr" /></label></div>
      <p className={styles.footnote}><Icon name="lock" size={12} />برنامه اولیه پس از ثبت حفظ می‌شود؛ اجرا و بازبینی جدا به آن اضافه می‌شوند.</p>
      {error && <p role="alert" className={styles.error}>{error}</p>}
      <div className={styles.buttonRow}><button type="submit" className={styles.primaryButton}><Icon name="check" size={16} />ثبت برنامه اولیه</button><button type="button" className={styles.textButton} onClick={onCancel}>انصراف</button></div>
    </form>
  </section>
}

function TradeDetail({ trade, onExecution, onReview }) {
  const status = tradeStatus(trade)
  const lastExit = trade.executions.find(event => event.kind === 'exit')
  const balance = tradePosition(trade)
  const verdicts = { yes: 'بله', no: 'خیر', uncertain: 'نامشخص' }
  return <section className={styles.planPanel}>
    <div className={styles.panelHead}><div><h2 dir="auto">{trade.plan.name}</h2><p><span lang="en">{trade.plan.symbol || 'XTB'}</span> · {PRODUCT_LABELS[trade.plan.product]} · {trade.plan.direction === 'long' ? 'خرید / Long' : 'فروش / Short'}</p></div><span className={`${styles.status} ${styles[`status_${status}`]}`}>{STATUS_LABELS[status]}</span></div>
    <div className={styles.planLocked}><Icon name="lock" size={13} />برنامه اولیه · ثبت‌شده {trade.plan.createdAt.slice(0, 10)}</div>
    <dl className={styles.planNumbers}><div><dt>ورود برنامه</dt><dd lang="en" dir="ltr">{trade.plan.entryPrice} {trade.plan.currency}</dd></div><div><dt>حد توقف</dt><dd lang="en">{trade.plan.stopPrice || '—'}</dd></div><div><dt>هدف</dt><dd lang="en">{trade.plan.targetPrice || '—'}</dd></div><div><dt>زیان برنامه‌ریزی‌شده</dt><dd lang="en" dir="ltr">{money(trade.plan.plannedRiskCents)}</dd></div></dl>
    <div className={styles.thesis}><h3>دلیل اولیه</h3><p>{trade.plan.rationale}</p><h3>شرط ابطال</h3><p>{trade.plan.invalidation}</p></div>
    <p className={styles.marketSource}>مانده حجم موقعیت: <bdi>{balance.quantity}</bdi> · نتیجه خالص خروج‌های ثبت‌شده: <bdi>{balance.hasRealized ? signedMoney(balance.netResultCents) : '—'}</bdi></p>
    <div className={styles.tradeActionRow}>{status === 'planned' && <><button type="button" className={styles.primaryButton} onClick={() => onExecution('entry')}>ثبت ورود انجام‌شده</button><button type="button" className={styles.secondaryButton} onClick={() => onExecution('cancel')}>ثبت لغو برنامه</button></>}{status === 'open' && <><button type="button" className={styles.primaryButton} onClick={() => onExecution('exit')}>ثبت خروج جزئی یا کامل</button><button type="button" className={styles.secondaryButton} onClick={() => onExecution('entry')}>ثبت ورود پله‌ای</button></>}<button type="button" className={styles.outlineButton} onClick={onReview}><Icon name="review" size={16} />ثبت بازبینی</button></div>
    <div className={styles.journalHistory}><h3>سابقه اجرا</h3>{trade.executions.length ? trade.executions.map(event => <article key={event.id}><div><strong>{event.kind === 'entry' ? 'ورود واقعی' : event.kind === 'exit' ? 'خروج واقعی' : 'لغو برنامه'}</strong><time lang="en">{event.date}</time></div>{event.kind !== 'cancel' && <p><bdi lang="en">{event.price} {trade.plan.currency}</bdi>{event.kind === 'exit' && <bdi>{event.quantity}</bdi>}{event.kind === 'entry' ? ` · حجم ${event.quantity}` : <> · نتیجه خالص <bdi lang="en" className={event.netResultCents >= 0 ? styles.positive : styles.negative}>{signedMoney(event.netResultCents)}</bdi></>}</p>}{event.note && <p>{event.note}</p>}</article>) : <p className={styles.muted}>هنوز اجرای واقعی ثبت نشده است.</p>}</div>
    <div className={styles.journalHistory}><h3>بازبینی‌ها</h3>{trade.reviews.length ? trade.reviews.map(review => <article key={review.id}><div><strong>بازبینی تصمیم</strong><time lang="en">{review.date}</time></div><p>فرض معتبر؟ {verdicts[review.thesisValid]} · پایبندی به برنامه؟ {verdicts[review.followedPlan]}</p><p>{review.note}</p>{review.chatResponse && <details><summary>ChatGPT</summary><p className={styles.preservedText}>{review.chatResponse}</p></details>}<small>موعد بعدی: {review.nextReviewDate || 'تعیین نشده'}</small></article>) : <p className={styles.muted}>اولین بازبینی: <bdi lang="en">{trade.plan.reviewDate}</bdi></p>}</div>
    {lastExit && <p className={styles.footnote}>نتیجه مالی از گزارش واقعی حساب ثبت شده است؛ ارزیابی کیفیت تصمیم در بازبینی‌ها مستقل می‌ماند.</p>}
  </section>
}

export default function TradeWorkspace({ trades, settings, onSettings, dueCount, selectedId, onSelect, createOpen, onCreateOpen, onCreate, onExecution, onReview, compact=false }) {
  const [filter, setFilter] = useState('all')
  const open = trades.filter(t => tradeStatus(t) === 'open')
  const closed = trades.filter(t => tradeStatus(t) === 'closed')
  const realized = closed.reduce((sum, trade) => sum + tradePosition(trade).netResultCents, 0)
  const risk = open.reduce((sum, t) => sum + (t.plan.plannedRiskCents || 0), 0)
  const unknownRisk = open.filter(t => t.plan.plannedRiskCents == null).length
  const [settingsError, setSettingsError] = useState('')
  function saveSettings(event) {
    event.preventDefault()
    try {
      const amount = parseMoney(new FormData(event.currentTarget).get('equity'), true)
      if (amount != null && amount < 0) throw Error('ارزش حساب منفی نیست.')
      onSettings({ ...settings, xtbEquityCents: amount }); setSettingsError('')
    } catch (err) { setSettingsError(err.message) }
  }
  const rows = trades.filter(t => filter === 'all' || tradeStatus(t) === filter).slice().reverse()
  const selected = trades.find(t => t.id === selectedId)
  return <>
    {!compact&&<section className={styles.tradeStats}><div><span>برنامه‌های ثبت‌شده</span><strong lang="en">{trades.length}</strong></div><div><span>معاملات باز</span><strong lang="en">{open.length}</strong></div><div><span>بازبینی سررسیدشده</span><strong lang="en">{dueCount}</strong></div><div><span>نتیجه خالص معاملات بسته</span><strong lang="en" dir="ltr" className={realized < 0 ? styles.negative : styles.positive}>{closed.length ? signedMoney(realized) : '—'}</strong></div></section>}
    {!compact&&<section className={styles.panel}><div className={styles.panelHead}><div><h2>بودجه ریسک معاملات باز</h2><p>جمع سقف زیان برنامه‌ها: <bdi>{money(risk)}</bdi> · {number(unknownRisk)} برنامه با ریسک نامشخص{settings.xtbEquityCents > 0 && <> · <bdi>{(risk / settings.xtbEquityCents * 100).toFixed(1)}%</bdi> از ارزش ثبت‌شده حساب</>}</p></div></div><form onSubmit={saveSettings} className={styles.inlineForm}><label className={styles.field}>ارزش فعلی حساب XTB به یورو، اختیاری<input name="equity" inputMode="decimal" dir="ltr" defaultValue={settings.xtbEquityCents == null ? '' : (settings.xtbEquityCents / 100).toFixed(2)} /></label><button type="submit" className={styles.secondaryButton}>ثبت ارزش حساب</button></form>{settingsError && <p className={styles.error} role="alert">{settingsError}</p>}<p className={styles.footnote}>این جمع، سقف‌های دستی برنامه‌های باز است؛ ریسک واقعی یا تضمین حد ضرر نیست. ورود پله‌ای می‌تواند ریسک واقعی را تغییر دهد؛ آن را در بازبینی ثبت کن. حجم و سود CFD از اختلاف قیمت سهم استنتاج نمی‌شوند.</p></section>}
    <div className={styles.tradingLayout}>
      <section className={styles.tradeListPanel}><div className={styles.panelHead}><div><h2>دفتر معاملات</h2><p>برنامه اولیه، اجرای واقعی، بازبینی</p></div><button type="button" className={styles.textButton} onClick={() => onCreateOpen(true)}><Icon name="plus" size={16} />برنامه جدید</button></div>
        <div className={styles.segmented}>{[['all', 'همه'], ...Object.entries(STATUS_LABELS)].map(([key, label]) => <button type="button" key={key} aria-pressed={filter === key} onClick={() => setFilter(key)}>{label}</button>)}</div>
        {rows.length ? <div className={styles.tradeList}>{rows.map(trade => <button type="button" className={trade.id === selectedId && !createOpen ? styles.selectedTrade : ''} key={trade.id} onClick={() => { onSelect(trade.id); onCreateOpen(false) }}><div><strong dir="auto">{trade.plan.name}</strong><span className={`${styles.status} ${styles[`status_${tradeStatus(trade)}`]}`}>{STATUS_LABELS[tradeStatus(trade)]}</span></div><p>{PRODUCT_LABELS[trade.plan.product]} · {trade.plan.direction === 'long' ? 'Long' : 'Short'} · {trade.plan.planDate}</p><small>بازبینی: {nextReviewDate(trade) || 'بدون موعد بعدی'}</small></button>)}</div> : <div className={styles.tradeEmpty}><Icon name="journal" size={38} /><h2>{trades.length ? 'برنامه‌ای با این وضعیت نداری' : 'اولین برنامه معامله‌ات را ثبت کن'}</h2><p>هر تصمیم یک سابقه روشن دارد؛ حتی اگر در نهایت اجرا نشود.</p><ol><li><strong>دلیل و شرط ابطال</strong><span>چه می‌خواهی و چه چیزی نظرت را تغییر می‌دهد؟</span></li><li><strong>اجرای واقعی</strong><span>قیمت و حجم انجام‌شده را جدا ثبت کن.</span></li><li><strong>بازبینی تصمیم</strong><span>نتیجه مالی و پایبندی به برنامه را جدا بسنج.</span></li></ol><button type="button" className={styles.outlineButton} onClick={() => onCreateOpen(true)}><Icon name="plus" size={16} />ثبت برنامه معامله</button></div>}
      </section>
      {createOpen ? <TradePlanForm onSubmit={onCreate} onCancel={() => onCreateOpen(false)} /> : selected ? <TradeDetail trade={selected} onExecution={onExecution} onReview={onReview} /> : <section className={styles.planPanel}><div className={styles.calmEmpty}><Icon name="journal" size={32} /><h2>پرونده تصمیم</h2><p>یک برنامه را انتخاب کن یا برنامه تازه‌ای بساز تا فرض‌ها، اجرا و بازبینی را کنار هم ببینی.</p><button type="button" className={styles.primaryButton} onClick={() => onCreateOpen(true)}>برنامه جدید</button></div></section>}
    </div>
  </>
}
