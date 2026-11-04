'use client'
import { accountBalance, balanceCsv, unrealizedBalance } from '@/lib/investments/balances.mjs'
import { money, number, signedMoney } from '@/lib/investments/portfolio.mjs'
import {ProfitPeriodControl, ProfitPeriodDetails, RealizedProfitDetails} from './ProfitPeriod'
import styles from './investments.module.css'
import view from './AccountView.module.css'

export default function AccountBalancePanel({ account, ledger, markets, onDetails, profitSelection={mode:'current'}, onProfitSelection, profitPeriod, detailsOnly=false }) {
  const balance = accountBalance(account, ledger?.loaded ? ledger.transactions : null, markets)
  const isPeriod = profitSelection.mode!=='current'
  const isRealized = profitSelection.scope==='realized'
  const result = isRealized ? profitPeriod?.realized?.accounts.find(a=>a.accountId===account.id) : isPeriod ? profitPeriod?.result?.accounts.find(a=>a.accountId===account.id) : unrealizedBalance(balance.positions)
  const gain = isPeriod && !isRealized ? result?.gainCents : result?.knownGainCents
  const cash = balance.cash, cashValue = cash.balanceCents ?? cash.estimatedCents
  function exportBalance() {
    const url = URL.createObjectURL(new Blob(['\uFEFF'+balanceCsv(balance)], {type:'text/csv;charset=utf-8'}))
    const link = document.createElement('a');link.href=url;link.download=`account-balance-${account.id}.csv`;link.click();URL.revokeObjectURL(url)
  }
  if(detailsOnly)return <details className={styles.balanceDetails}><summary>جزئیات موجودی و خروجی</summary><button type="button" className={styles.textButton} onClick={exportBalance} disabled={!ledger?.loaded}>خروجی موجودی</button><p>{number(balance.pricedCount)} از {number(account.positions.length)} دارایی قیمت دارد.{balance.unknownQuantityCount?` تعداد ${number(balance.unknownQuantityCount)} دارایی از مبنای قبلی است.`:''}</p><p>{cash.status==='confirmed-checkpoint'?`نقد ثبت‌شده در ${new Date(cash.checkpoint.asOf).toLocaleString('de-DE',{timeZone:'Europe/Berlin'})}`:cash.status==='confirmed-opening'?`مانده شروع: ${money(cash.openingCents)}`:cash.status==='zero-opening-estimate'?'نقد با فرض مانده شروع صفر محاسبه شده است.':'مانده نقد هنوز ثبت نشده است.'}</p><p>زمان قدیمی‌ترین قیمت: <bdi>{balance.oldestPrice?new Date(balance.oldestPrice).toLocaleString('de-DE',{timeZone:'Europe/Berlin'}):'—'}</bdi></p><button type="button" className={styles.textButton} onClick={onDetails}>اصلاح مبنای نقد</button></details>
  return <section className={view.summary} aria-label={`موجودی حساب ${account.owner}`}>
    <div className={view.metrics}>
      <div><span>{balance.equityEstimated?'کل دارایی · برآوردی':'کل دارایی'}</span><strong><bdi>{money(balance.equityCents ?? balance.estimatedEquityCents)}</bdi></strong><small>دارایی‌ها <bdi>{money(balance.securitiesCents ?? balance.estimatedSecuritiesCents ?? balance.partialValueCents)}</bdi></small></div>
      <div><span>{cash.balanceCents!=null?'نقد':'نقد برآوردی'}</span><strong><bdi>{money(cashValue)}</bdi></strong></div>
      <div><span>{isRealized?'سود و زیان فروش‌ها':'سود و زیان دارایی‌های فعلی'} {result&&!result.complete?'· ناقص':''}</span><strong className={gain>0?styles.positive:gain<0?styles.negative:''}><bdi>{gain==null?'—':signedMoney(gain)}</bdi></strong></div>
    </div>
    <ProfitPeriodControl selection={profitSelection} onChange={onProfitSelection} period={profitPeriod}/>
    {isRealized&&<RealizedProfitDetails result={profitPeriod?.realized} accountId={account.id}/>}
    <ProfitPeriodDetails period={isPeriod&&!isRealized?profitPeriod:null} accountId={account.id}/>

  </section>
}
