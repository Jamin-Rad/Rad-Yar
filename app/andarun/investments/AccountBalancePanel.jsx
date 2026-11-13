'use client'
import { balanceCsv, unrealizedBalance } from '@/lib/investments/balances.mjs'
import { money, number, percent, signedMoney } from '@/lib/investments/portfolio.mjs'
import {ProfitPeriodControl, ProfitPeriodDetails, RealizedProfitDetails} from './ProfitPeriod'
import AllocationRing from './AllocationRing'
import styles from './investments.module.css'
import view from './AccountView.module.css'

export default function AccountBalancePanel({ account, balance, allocation, ledger, onDetails, onOpenHolding, profitSelection={mode:'current'}, onProfitSelection, profitPeriod, dark, detailsOnly=false }) {
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
    <div className={view.allocationSummary}>
      <dl className={view.accountMetrics}>
        <div><dt>ارزش دارایی‌ها{allocation.excluded > 0 ? ' · بخش محاسبه‌شده' : ''}</dt>
          <dd className={view.assetTotal}><bdi>{money(allocation.total || (allocation.excluded ? null : 0))}</bdi></dd>
          <small>{balance.equityEstimated ? 'کل حساب برآوردی' : 'کل حساب'} <bdi>{money(balance.equityCents ?? balance.estimatedEquityCents)}</bdi></small>
        </div>
        <div><dt>{cashValue == null || cash.balanceCents != null ? 'موجودی نقد' : 'نقد برآوردی'}</dt><dd><bdi>{money(cashValue)}</bdi></dd></div>
        <div><dt>{isRealized?'سود و زیان فروش‌ها':'سود و زیان دارایی‌ها'}{result&&!result.complete?' · ناقص':''}</dt>
          <dd className={gain > 0 ? view.gain : gain < 0 ? view.loss : ''}><bdi>{gain==null?'—':signedMoney(gain)}</bdi></dd>
        </div>
      </dl>
      <div className={view.accountChart} role="group" aria-label="ترکیب دارایی‌ها به تفکیک دسته">
        {allocation.groups.length ? <>
          <AllocationRing className={view.accountRing} groups={allocation.groups} onOpenHolding={onOpenHolding}>
            <div className={view.ringLabel}><span>ارزش دارایی‌ها</span><strong><bdi>{money(allocation.total)}</bdi></strong></div>
          </AllocationRing>
          <ul className={view.accountLegend}>
            {allocation.groups.map(group => <li key={group.key}><i style={{ background: group.color }} /><span>{group.label}</span><bdi>{percent(group.share * 100)}</bdi></li>)}
          </ul>
        </> : <p className={view.chartEmpty}>{account.positions.length ? 'برای محاسبهٔ وزن سبد، قیمت معتبر و تعداد تأییدشده لازم است.' : 'این حساب هنوز دارایی باز ندارد.'}</p>}
      </div>
    </div>
    {allocation.excluded > 0 && <p className={view.coverage}>{number(allocation.excluded)} دارایی به‌دلیل نبود قیمت معتبر یا تعداد تأییدشده در وزن سبد محاسبه نشده است.</p>}
    <div className={view.profitControls}>
      <ProfitPeriodControl selection={profitSelection} onChange={onProfitSelection} period={profitPeriod} dark={dark}/>
      {isRealized&&<RealizedProfitDetails result={profitPeriod?.realized} accountId={account.id} dark={dark}/>}
      <ProfitPeriodDetails period={isPeriod&&!isRealized?profitPeriod:null} accountId={account.id} dark={dark}/>
    </div>
  </section>
}
