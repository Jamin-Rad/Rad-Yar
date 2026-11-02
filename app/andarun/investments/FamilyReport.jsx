'use client'

import { useState } from 'react'
import { reviewReport, REVIEW_MODES } from '@/lib/investments/review-report.mjs'
import { number } from '@/lib/investments/portfolio.mjs'
import Icon from './InvestmentIcon'
import styles from './investments.module.css'

export default function FamilyReport({ state, initialAccountId, initialPositionId, markets, download, notify }) {
  const initialAccounts = state.accounts.filter(a => (!initialAccountId || a.id === initialAccountId) && a.positions.length)
  const [accounts, setAccounts] = useState(() => initialAccounts.map(a => a.id))
  const [positions, setPositions] = useState(() => initialAccounts.flatMap(a => a.positions.filter(p=>!initialPositionId||p.id===initialPositionId).map(p => `${a.id}:${p.id}`)))
  const [trades, setTrades] = useState(() => initialAccountId ? [] : state.trades.map(t => t.id))
  const [decisions,setDecisions] = useState(()=>state.decisions.filter(d=>(!initialAccountId||d.accountId===initialAccountId)&&(!initialPositionId||d.positionId===initialPositionId)).map(d=>d.id))
  const [mode,setMode] = useState(initialPositionId?'asset':'weekly')
  const [question, setQuestion] = useState('فرض‌های ضعیف و مهم‌ترین موارد نیازمند بررسی را با دلیل و منبع مشخص کن.')
  const report = reviewReport(state, { accountIds: accounts, positionIds: positions, tradeIds: trades, includeTrades: trades.length > 0, decisionIds: decisions }, markets, mode) + `\n## سؤال مشخص من\n${question}\n`
  const hasSelection = positions.length > 0 || trades.length > 0 || decisions.length > 0
  function toggleAccount(account, checked) {
    const ids = account.positions.map(p => `${account.id}:${p.id}`)
    setAccounts(previous => checked ? [...previous, account.id] : previous.filter(id => id !== account.id))
    setPositions(previous => checked ? [...new Set([...previous, ...ids])] : previous.filter(id => !ids.includes(id)))
  }
  async function copy() {
    try { await navigator.clipboard.writeText(report); notify('بسته انتخاب‌شده کپی شد؛ آن را در حساب شخصی ChatGPT قرار بده.') }
    catch { notify('کپی در دسترس نیست؛ از دانلود سند استفاده کن.') }
  }
  return <div className={styles.reportLayout}>
    <section className={styles.panel}><div className={styles.panelHead}><div><h2>چه چیزی را بررسی کنیم؟</h2><p>حساب‌ها، دارایی‌ها و تصمیم‌های مورد نظر را انتخاب کن.</p></div><Icon name="report" size={22} /></div>
      <label className={styles.field}>نوع بررسی<select value={mode} onChange={e=>setMode(e.target.value)}>{Object.entries(REVIEW_MODES).map(([key,label])=><option key={key} value={key}>{label}</option>)}</select></label>
      {state.accounts.map(account => <div key={account.id} className={styles.reportAccount}><label className={styles.checkbox}><input type="checkbox" checked={accounts.includes(account.id)} disabled={!account.positions.length} onChange={event => toggleAccount(account, event.target.checked)} /><strong>{account.owner}</strong><small>{account.positions.length ? `${number(account.positions.length)} دارایی` : 'داده‌ای ثبت نشده'}</small></label>{accounts.includes(account.id) && <details><summary>انتخاب دارایی‌ها · {number(positions.filter(id => id.startsWith(`${account.id}:`)).length)} انتخاب</summary><div className={styles.selectionList}>{account.positions.map(p => { const key = `${account.id}:${p.id}`; return <label className={styles.checkbox} key={p.id}><input type="checkbox" checked={positions.includes(key)} onChange={event => setPositions(previous => event.target.checked ? [...previous, key] : previous.filter(id => id !== key))} /><span lang="en" dir="ltr">{p.name}</span></label> })}</div></details>}</div>)}
      <div className={styles.reportAccount}><h3>تصمیم‌های XTB</h3>{state.trades.length ? state.trades.map(trade => <label className={styles.checkbox} key={trade.id}><input type="checkbox" checked={trades.includes(trade.id)} onChange={event => setTrades(previous => event.target.checked ? [...previous, trade.id] : previous.filter(id => id !== trade.id))} /><span dir="auto">{trade.plan.name}</span></label>) : <p className={styles.muted}>هنوز برنامه‌ای ثبت نشده است.</p>}</div>
      <div className={styles.reportAccount}><h3>تصمیم‌های سرمایه‌گذاری</h3>{state.decisions.length?state.decisions.map(d=><label key={d.id} className={styles.checkbox}><input type="checkbox" checked={decisions.includes(d.id)} onChange={e=>setDecisions(v=>e.target.checked?[...v,d.id]:v.filter(id=>id!==d.id))}/><span dir="auto">{d.name} · حساب {state.accounts.find(a=>a.id===d.accountId)?.owner}</span></label>):<p className={styles.muted}>هنوز تصمیمی ثبت نشده است.</p>}</div>
      <label className={styles.field}>سؤال من از ChatGPT<textarea rows={4} value={question} maxLength={1500} onChange={event => setQuestion(event.target.value)} /></label>
    </section>
    <section className={styles.panel}><div className={styles.panelHead}><div><h2>سند آماده برای گفت‌وگوی شخصی</h2><p>{number(positions.length)} دارایی · {number(trades.length + decisions.length)} تصمیم</p></div><Icon name="copy" size={22} /></div><div className={styles.buttonRow}><button type="button" className={styles.primaryButton} disabled={!hasSelection} onClick={copy}><Icon name="copy" size={16} />کپی سند و پرامپت</button><button type="button" className={styles.secondaryButton} disabled={!hasSelection} onClick={() => download(report, 'family-investment-review.md', 'text/markdown')}><Icon name="download" size={16} />دانلود سند</button></div><p className={styles.footnote}>سند شامل اطلاعات مالی انتخاب‌شده، تاریخچه و منابع دریافت‌شده است. پاسخ ChatGPT را بعداً از «ثبت بازبینی» به پرونده اضافه کن. این سند داده مالی خصوصی دارد. ارسال به ChatGPT با انتخاب خودت انجام می‌شود.</p><pre className={styles.reportPreview} tabIndex={0}>{hasSelection ? report : 'یک دارایی یا تصمیم را انتخاب کن تا سند ساخته شود.'}</pre></section>
  </div>
}
