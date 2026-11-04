'use client'
import { ACCOUNT_DEFINITIONS } from '@/lib/investments/family.mjs'
import { familyBalance } from '@/lib/investments/balances.mjs'
import { money, signedMoney, number } from '@/lib/investments/portfolio.mjs'
import {xtbBalance} from '@/lib/investments/xtb.mjs'
import Icon from './InvestmentIcon'
import {ProfitPeriodControl, ProfitPeriodDetails, RealizedProfitDetails} from './ProfitPeriod'
import styles from './Overview.module.css'

const quoteDate = new Intl.DateTimeFormat('fa-IR', { month:'short', day:'numeric', hour:'2-digit', minute:'2-digit', timeZone:'Europe/Berlin' })
function resultClass(value) { return value == null || value === 0 ? '' : value > 0 ? styles.positive : styles.negative }

export default function FamilyOverview({ state, onAccount, ledger, onLedger, marketData, onEnablePrices, profitSelection={mode:'current'}, onProfitSelection, profitPeriod, onXtbAccount, onWallet }) {
  const balance = familyBalance(state.accounts, ledger?.loaded ? ledger.transactions : null, marketData?.markets)
  const isPeriod = profitSelection.mode !== 'current'
  const isRealized = profitSelection.scope==='realized'
  const result = isRealized ? profitPeriod?.realized : isPeriod ? profitPeriod?.result : balance.unrealized
  const resultTitle = isRealized?'سود و زیان فروش‌ها':'سود و زیان دارایی‌های فعلی'
  const resultUnit = isRealized?'فروش':'دارایی'
  const gainValue = isPeriod && !isRealized ? result?.gainCents : result?.knownGainCents
  const priceErrors = Object.values(marketData?.errors || {}).some(Boolean)
  const refreshing = marketData?.batch?.running
  function refreshPrices() {
    if (!state.settings?.isinPricesEnabled) onEnablePrices?.()
    else marketData?.refreshAll()
  }
  return <div className={styles.home}>
    <ProfitPeriodControl selection={profitSelection} onChange={onProfitSelection} period={profitPeriod}/>
    <section className={styles.summary} aria-label="خلاصه سرمایه خانواده">
      <div className={styles.total}>
        <h2>کل دارایی Trade Republic {balance.estimated && balance.equityCents != null && <small>برآوردی</small>}</h2>
        <strong><bdi>{balance.equityCents == null ? '—' : money(balance.equityCents)}</bdi></strong>
        <p>ارزش دارایی‌ها + موجودی نقد</p>
      </div>
      <div className={styles.metric}>
        <h2>{resultTitle} {result && !result.complete && <small>{profitPeriod?.loading&&isPeriod&&!isRealized?'دریافت قیمت…':'ناقص'}</small>}</h2>
        <strong className={resultClass(gainValue)}><bdi>{gainValue == null ? '—' : signedMoney(gainValue)}</bdi></strong>
        {isRealized ? <p>{!result?'در انتظار تراکنش‌ها':result.complete?'فروش‌های همین بازه · پس از مالیات و کارمزد':`بخش محاسبه‌شده · ${number(result.knownCount)} از ${number(result.count)} فروش`}</p> : isPeriod ? <p>{result?.complete?'بخش باقی‌مانده در پایان بازه':result?`پوشش ${number(result.knownCount)} از ${number(result.count)} دارایی`:'در انتظار اطلاعات'}</p> : <button type="button" className={styles.resultDetail} onClick={() => onLedger?.('all', result.complete ? 'annual' : 'issues')}>دارایی‌های فعلی · {result.complete ? 'از زمان خرید' : `${number(result.knownCount)} از ${number(result.count)} دارایی`}</button>}
      </div>
      <div className={styles.metric}>
        <h2>موجودی نقد {balance.cashEstimated && balance.cashCents != null && <small>برآوردی</small>}</h2>
        <strong><bdi>{balance.cashCents == null ? '—' : money(balance.cashCents)}</bdi></strong>
        <p>حساب‌های Trade Republic</p>
      </div>
    </section>
    <ProfitPeriodDetails period={isPeriod&&!isRealized?profitPeriod:null}/>
    {isRealized&&<RealizedProfitDetails result={result}/>}

    <section className={styles.accounts} aria-labelledby="family-accounts-title">
      <div className={styles.sectionHead}>
        <div><h2 id="family-accounts-title">حساب‌های خانواده</h2><span lang="en">Trade Republic</span></div>
        <button type="button" className={styles.refresh} onClick={refreshPrices} disabled={refreshing}><Icon name="refresh" size={16}/>{refreshing ? `آپدیت ${number(marketData.batch.done)} از ${number(marketData.batch.total)}` : state.settings?.isinPricesEnabled ? 'به‌روزرسانی قیمت‌ها' : 'فعال‌کردن قیمت‌ها'}</button>
      </div>
      <div className={styles.columns} aria-hidden="true"><span>حساب</span><span>کل دارایی</span><span>{resultTitle}</span><span/></div>
      <div className={styles.accountList}>
        {state.accounts.map((account, index) => {
          const current = balance.accounts[index]
          const equity = current.equityCents ?? current.estimatedEquityCents
          const accountResult = isPeriod || isRealized ? result?.accounts.find(a=>a.accountId===account.id) : current.unrealized
          const gain = isPeriod && !isRealized ? accountResult?.gainCents : accountResult?.knownGainCents
          const definition = ACCOUNT_DEFINITIONS.find(d => d.id === account.id)
          return <button type="button" key={account.id} className={styles.accountRow} onClick={() => onAccount(account.id)} aria-label={`حساب ${account.owner}، کل دارایی ${money(equity)}، ${resultTitle} ${gain==null?'نامشخص':signedMoney(gain)}${accountResult&&!accountResult.complete?'، ناقص':''}`}>
            <span className={styles.identity}><span className={styles.avatar} style={{ '--avatar-color':definition?.color }}>{definition?.initials}</span><span><strong>{account.owner}</strong><small>{number(account.positions.length)} دارایی</small></span></span>
            <span className={styles.accountValue}><bdi>{equity == null ? '—' : money(equity)}</bdi>{current.equityEstimated && equity != null && <small>برآوردی</small>}</span>
            <span className={`${styles.accountResult} ${resultClass(gain)}`}><bdi>{gain == null ? '—' : signedMoney(gain)}</bdi>{accountResult && !accountResult.complete && <small>ناقص · {number(accountResult.knownCount)} از {number(accountResult.count)} {resultUnit}</small>}</span>
            <Icon name="arrow" size={18}/>
          </button>
        })}
      </div>
      <p className={styles.priceStatus} role="status">{priceErrors ? 'دریافت بعضی قیمت‌ها ناموفق بود؛ دوباره به‌روزرسانی کن.' : balance.missingPriceCount ? `در انتظار قیمت ${number(balance.missingPriceCount)} دارایی` : balance.oldestPrice ? `قدیمی‌ترین قیمت مرجع: ${quoteDate.format(new Date(balance.oldestPrice))}` : 'هنوز دارایی ثبت نشده است.'}</p>
    </section>
    <section className={styles.accounts} aria-labelledby="xtb-accounts-title"><div className={styles.sectionHead}><h2 id="xtb-accounts-title" lang="en">XTB</h2><span>سود بسته‌شده از ابتدا</span></div>{ACCOUNT_DEFINITIONS.slice(0,2).map(def=>{const current=xtbBalance(state.settings?.xtbAccounts?.find(a=>a.id===def.id),state.trades);return <button type="button" className={styles.accountRow} key={def.id} onClick={()=>onXtbAccount(def.id)}><span className={styles.identity}><span className={styles.avatar} style={{'--avatar-color':def.color}}>{def.initials}</span><strong>{def.owner}</strong></span><span className={styles.accountValue}><bdi>{money(current?.balanceCents??null)}</bdi></span><span className={`${styles.accountResult} ${resultClass(current?.profitCents)}`}><bdi>{current?signedMoney(current.profitCents):'—'}</bdi></span><Icon name="arrow" size={18}/></button>})}</section>
    <section className={styles.accounts}><div className={styles.sectionHead}><div><h2>کیف پول دیجیتال</h2><span>موجودی هنوز وارد نشده است</span></div><button type="button" className={styles.refresh} onClick={onWallet}>رمزارزها<Icon name="arrow" size={16}/></button></div></section>
  </div>
}
