'use client'

import { useState } from 'react'
import { summarize, money, signedMoney, number } from '@/lib/investments/portfolio.mjs'
import { snapshotComparison } from '@/lib/investments/family.mjs'
import AccountTransactions from './AccountTransactions'
import view from './AccountView.module.css'
import HoldingsTable from './HoldingsTable'
import AccountBalancePanel from './AccountBalancePanel'
import {CashPlans} from './CashPlans'
import Icon from './InvestmentIcon'
import styles from './investments.module.css'

export default function AccountWorkspace({ account, onSnapshot, onDetails,  onOpen, onImport, markets, onLedger, ledger, cashPlans=[],onPlan,onPostPlan, profitSelection, onProfitSelection, profitPeriod, download, marketData, onEditTransaction, onDeleteTransaction }) {
  const summary = summarize(account.positions)
  const comparison = snapshotComparison(account)
  const [tab, setTab] = useState('holdings')
  return <div className={view.shell}>
    <AccountBalancePanel account={account} ledger={ledger} markets={markets} onDetails={onDetails} profitSelection={profitSelection} onProfitSelection={onProfitSelection} profitPeriod={profitPeriod}/>
    <div className={view.tabs} role="tablist" aria-label="بخش‌های حساب">{[['holdings','دارایی‌ها'],['transactions','تراکنش‌ها'],['settings','تنظیمات']].map(([key,label])=><button type="button" role="tab" key={key} id={`account-tab-${key}`} aria-selected={tab===key} aria-controls="account-tab-panel" tabIndex={tab===key?0:-1} onKeyDown={event=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();const keys=['holdings','transactions','settings'];const next=event.key==='Home'?0:event.key==='End'?2:(keys.indexOf(tab)+(event.key==='ArrowLeft'?1:2))%3;setTab(keys[next]);document.getElementById(`account-tab-${keys[next]}`)?.focus()}}} onClick={()=>setTab(key)}>{label}</button>)}</div>
    <div id="account-tab-panel" role="tabpanel" aria-labelledby={`account-tab-${tab}`}>
      {tab==='holdings'&&(account.positions.length?<HoldingsTable compact positions={account.positions} totalCents={summary.totalCents} onOpen={onOpen} markets={markets}/>:<p className={view.empty}>دارایی بازی در این حساب ثبت نشده است.</p>)}
      {tab==='transactions'&&<AccountTransactions account={account} ledger={ledger} onReport={onLedger} download={download} marketData={marketData} onEditTransaction={onEditTransaction} onDeleteTransaction={onDeleteTransaction}/>}
      {tab==='settings'&&<div className={view.settings}>
        <h2>تنظیمات حساب</h2>
        <AccountBalancePanel detailsOnly account={account} ledger={ledger} markets={markets} onDetails={onDetails} profitSelection={profitSelection} profitPeriod={profitPeriod}/>
        <div className={styles.buttonRow}><button type="button" className={styles.secondaryButton} onClick={onDetails}>مشخصات و مبنای نقد</button><button type="button" className={styles.secondaryButton} onClick={onImport}>فایل دارایی‌ها</button><button type="button" className={styles.secondaryButton} onClick={onSnapshot} disabled={!account.positions.length||summary.unvaluedCount>0}>ثبت وضعیت تاریخی</button></div>
        <CashPlans plans={cashPlans.filter(p=>p.accountId===account.id)} ledger={ledger} onEdit={onPlan} onPost={onPostPlan}/>
        <button type="button" className={styles.textButton} onClick={()=>onPlan(null,account.id)}>واریز ماهانه جدید</button>
              <details className={styles.previousBroker}><summary>ارقام ثبت‌شده قبلی بروکر و مقایسه ثبت‌های تاریخی</summary><section className={styles.accountStats} aria-label={`خلاصه حساب ${account.owner}`}><div><span>{summary.unvaluedCount?"ارزش بخش دارای قیمت":"ارزش ثبت‌شده"}</span><strong dir="ltr" lang="en">{money(summary.valuedCount?summary.totalCents:null)}</strong><small>{number(summary.count)} دارایی · {summary.unvaluedCount?`${number(summary.unvaluedCount)} دارایی بدون قیمت`:account.complete?'پوشش تأییدشده':'پوشش ناقص'}</small></div><div><span>جمع سود/زیان قابل خواندن</span><strong dir="ltr" lang="en" className={summary.unknownGainCount ? styles.unknown : summary.knownGainCents >= 0 ? styles.positive : styles.negative}>{summary.unknownGainCount ? 'جمع کامل نامشخص' : signedMoney(summary.knownGainCents)}</strong><small>{summary.unknownGainCount ? `${number(summary.unknownGainCount)} ردیف ناقص · جمع معلوم ${signedMoney(summary.knownGainCents)}` : 'همه ردیف‌ها دارای مقدارند؛ دوره سود/زیان منبع را بررسی کن'}</small></div><div><span>سودده / زیان‌ده</span><strong dir="ltr" lang="en"><span className={styles.positive}>{summary.winners}</span><span className={styles.statSlash}> / </span><span className={styles.negative}>{summary.losers}</span></strong><small>براساس اعداد منبع</small></div><div><span>تغییر ارزش در دو ثبت اخیر</span><strong dir="ltr" lang="en">{comparison ? signedMoney(comparison.deltaCents) : '—'}</strong><small>{comparison ? `${comparison.previous.asOf} تا ${comparison.latest.asOf}` : 'به دو ثبت تاریخ‌دار نیاز دارد'}</small></div></section></details>

        <details className={styles.previousBroker}><summary>تاریخچه وضعیت حساب</summary><section className={styles.panel}><div className={styles.panelHead}><h2>تاریخچه وضعیت حساب</h2><span>{number(account.snapshots.length)} ثبت</span></div>{account.snapshots.length ? <div className={styles.historyList}>{[...account.snapshots].sort((a, b) => b.asOf.localeCompare(a.asOf)).map(snapshot => <article key={snapshot.id}><div><strong lang="en">{snapshot.asOf}</strong><small>{number(snapshot.positions.length)} دارایی · ثبت‌شده {snapshot.recordedAt.slice(0, 10)}</small></div><strong lang="en" dir="ltr">{money(snapshot.positions.reduce((sum, p) => sum + p.valueCents, 0))}</strong><p>{snapshot.note || 'ارزش‌ها با تأیید کاربر برای این تاریخ ثبت شده‌اند.'}</p></article>)}</div> : <div className={styles.calmEmpty}><Icon name="calendar" size={28} /><strong>هنوز ثبت تاریخ‌دار نداری</strong><p>وقتی اطلاعات حساب را با یک روز مشخص تطبیق دادی، اولین وضعیت را ثبت کن.</p><button type="button" className={styles.outlineButton} onClick={onSnapshot}>ثبت اولین وضعیت</button></div>}<p className={styles.footnote}>تغییر ارزش می‌تواند شامل خرید، فروش، واریز یا برداشت باشد؛ به‌تنهایی بازده سرمایه‌گذاری نیست.</p></section></details>
      </div>}
    </div>
  </div>
}
