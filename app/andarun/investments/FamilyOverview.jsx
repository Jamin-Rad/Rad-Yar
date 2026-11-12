'use client'

import { useId, useMemo, useState } from 'react'
import { familyBalance } from '@/lib/investments/balances.mjs'
import { money, signedMoney, number, percent } from '@/lib/investments/portfolio.mjs'
import { overviewAllocation } from '@/lib/investments/overview-allocation.mjs'
import AllocationRing from './AllocationRing'
import { XTB_OWNERS, xtbBalance } from '@/lib/investments/xtb.mjs'
import Icon from './InvestmentIcon'
import { DigitalWalletWorkspace } from './XtbAccountWorkspace'
import { ProfitPeriodControl, ProfitPeriodDetails, RealizedProfitDetails } from './ProfitPeriod'
import styles from './Overview.module.css'

const quoteDate = new Intl.DateTimeFormat('fa-IR', { month:'short', day:'numeric', hour:'2-digit', minute:'2-digit', timeZone:'Europe/Berlin' })
const providers = [
  {id:'tr', label:'Trade Republic', icon:'trading'},
  {id:'xtb', label:'XTB', icon:'review'},
  {id:'wallet', label:'کیف پول دیجیتال', icon:'wallet'},
]
const resultClass = value => value == null || value === 0 ? '' : value > 0 ? styles.positive : styles.negative
const displayMoney = value => value == null ? '—' : money(value)

function Allocation({ allocation, onHolding }) {
  return <div className={styles.allocation}>
    <ul className={styles.sectors}>
      {allocation.groups.map(group => <li key={group.key} style={{'--sector':group.color}}>
        <span className={styles.sectorName}><i aria-hidden="true"/>{group.label}</span>
        <bdi>{percent(group.share * 100)}</bdi>
        <span className={styles.track} aria-hidden="true"><i style={{width: (group.share * 100) + '%'}}/></span>
      </li>)}
    </ul>
    <AllocationRing className={styles.ring} groups={allocation.groups}>
      <span lang="en">Trade<br/>Republic</span>
    </AllocationRing>
    <div className={styles.topHoldings}>
      <h3>بیشترین وزن سبد</h3>
      {allocation.top.map(holding => <button type="button" key={holding.key} onClick={() => onHolding(holding)}>
        <strong dir="auto">{holding.name}</strong>
        <span><bdi>{money(holding.valueCents)}</bdi><bdi className={styles.weight}>{percent(holding.share * 100)}</bdi></span>
      </button>)}
    </div>
  </div>
}

export default function FamilyOverview({ state, ledger, onLedger, marketData, onEnablePrices, profitSelection={mode:'current'}, onProfitSelection, profitPeriod, dark, onTheme, onEntry, onSave, saving }) {
  const [selected, setSelected] = useState('tr')
  const id = useId()
  const balance = useMemo(() => familyBalance(state.accounts, ledger?.loaded ? ledger.transactions : null, marketData.markets), [state.accounts, ledger?.loaded, ledger?.transactions, marketData.markets])
  const allocation = useMemo(() => overviewAllocation(balance.accounts, state.settings.assetSectors), [balance.accounts, state.settings.assetSectors])
  const xtb = useMemo(() => {
    const recorded = XTB_OWNERS.map(id => xtbBalance(state.settings.xtbAccounts.find(account => account.id === id), state.trades)).filter(Boolean)
    return {
      count: recorded.length,
      total: recorded.length ? recorded.reduce((sum, account) => sum + account.balanceCents, 0) : null,
      profit: recorded.length ? recorded.reduce((sum, account) => sum + account.profitCents, 0) : null,
    }
  }, [state.settings.xtbAccounts, state.trades])
  const isPeriod = profitSelection.mode !== 'current'
  const isRealized = profitSelection.scope === 'realized'
  const result = isRealized ? profitPeriod?.realized : isPeriod ? profitPeriod?.result : balance.unrealized
  const resultTitle = isRealized ? 'سود و زیان فروش‌ها' : 'سود و زیان دارایی‌های فعلی'
  const gain = isPeriod && !isRealized ? result?.gainCents : result?.knownGainCents
  const priceErrors = Object.values(marketData.errors).some(Boolean)
  const refreshing = marketData.batch.running

  function refreshPrices() {
    if (state.settings.isinPricesEnabled) marketData.refreshAll()
    else {
      const nextState = onEnablePrices()
      if (nextState) marketData.refreshAll(nextState)
    }
  }

  function selectByKey(event, index) {
    const key = event.key
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(key)) return
    event.preventDefault()
    const next = key === 'Home' ? 0 : key === 'End' ? providers.length - 1 : (index + (key === 'ArrowLeft' ? 1 : -1) + providers.length) % providers.length
    setSelected(providers[next].id)
    document.getElementById(id + '-' + providers[next].id)?.focus()
  }

  return <div className={styles.home} data-theme={dark ? 'dark' : 'light'}>
    <header className={styles.topbar}>
      <h1>سرمایه</h1>
      <div className={styles.toolbar}>
        {balance.oldestPrice && <span className={styles.timestamp}>زمان قیمت‌های مرجع <bdi>{quoteDate.format(new Date(balance.oldestPrice))}</bdi></span>}
        <button type="button" className={styles.controlButton} onClick={refreshPrices} disabled={refreshing}>
          <Icon name="refresh" size={17}/>{refreshing ? 'دریافت قیمت‌ها… ' + number(marketData.batch.done) + ' از ' + number(marketData.batch.total) : 'به‌روزرسانی قیمت‌ها'}
        </button>
        <button type="button" className={styles.controlButton} onClick={onTheme}>{dark ? 'حالت روشن' : 'حالت تاریک'}</button>
      </div>
    </header>
    {onSave && <button type="button" className={styles.controlButton} onClick={onSave} disabled={saving}>{saving ? 'در حال ذخیره…' : 'ذخیره تغییرات'}</button>}

    <div className={styles.providers} role="tablist" aria-label="بخش سرمایه">
      {providers.map((provider, index) => <button key={provider.id} type="button" className={styles.provider} role="tab"
        id={id + '-' + provider.id} aria-selected={selected === provider.id} aria-controls={id + '-panel'} tabIndex={selected === provider.id ? 0 : -1}
        onClick={() => setSelected(provider.id)} onKeyDown={event => selectByKey(event, index)}>
        <span className={styles.providerLabel}><Icon name={provider.icon} size={19}/><bdi>{provider.label}</bdi></span>
        {provider.id === 'wallet' ? <strong className={styles.walletLabel}>مشاهدهٔ وضعیت کیف پول</strong> : <>
          <strong><bdi>{displayMoney(provider.id === 'tr' ? balance.equityCents : xtb.total)}</bdi></strong>
          {provider.id === 'tr' && balance.equityCents != null && balance.estimated && <small>برآوردی</small>}
          {provider.id === 'xtb' && xtb.count === 1 && <small>فقط یک حساب ثبت شده</small>}
        </>}
      </button>)}
    </div>

    <div role="tabpanel" id={id + '-panel'} aria-labelledby={id + '-' + selected} className={styles.contentPanel} tabIndex={0}>
      {selected === 'tr' && <>
        <section className={styles.block} aria-labelledby={id + '-allocation'}>
          <h2 id={id + '-allocation'}>ترکیب بخشی دارایی‌های <bdi>Trade Republic</bdi></h2>
          {allocation.total > 0 ? <Allocation allocation={allocation} onHolding={holding => onLedger('all', 'transactions', holding.isin || holding.name)}/> : <p className={styles.empty}>برای نمایش ترکیب سبد، قیمت‌های دارایی‌ها را به‌روزرسانی کن.</p>}
          {allocation.excluded > 0 && <p className={styles.muted}>{number(allocation.excluded)} موقعیت به‌دلیل نبود قیمت معتبر یا تعداد تأییدشده، در وزن‌ها محاسبه نشده‌اند.</p>}
          {priceErrors && <p className={styles.muted} role="status">دریافت برخی قیمت‌ها انجام نشد. قیمت قبلی در صورت وجود حفظ شده است.</p>}
        </section>
        <section className={styles.block}>
          <div className={styles.headingRow}><h2>بازده و سود و زیان</h2><button type="button" className={styles.controlButton} onClick={onEntry}><Icon name="plus" size={16}/>ثبت تراکنش</button></div>
          <ProfitPeriodControl selection={profitSelection} onChange={onProfitSelection} period={profitPeriod} dark={dark}/>
          <dl className={styles.metrics}>
            <div><dt>{resultTitle}</dt><dd className={resultClass(gain)}><bdi>{gain == null ? '—' : signedMoney(gain)}</bdi></dd>
              {result && !result.complete && <small>{number(result.knownCount)} از {number(result.count)} {isRealized ? 'فروش' : 'دارایی'} · نتیجهٔ ناقص</small>}
            </div>
            <div><dt>موجودی نقد</dt><dd><bdi>{displayMoney(balance.cashCents)}</bdi></dd>{balance.cashEstimated && balance.cashCents != null && <small>برآوردی</small>}</div>
          </dl>
          <ProfitPeriodDetails period={isPeriod && !isRealized ? profitPeriod : null} dark={dark}/>
          {isRealized && <RealizedProfitDetails result={result} dark={dark}/>}
        </section>
      </>}
      {selected === 'xtb' && <section className={styles.block}>
        <h2>خلاصهٔ <bdi>XTB</bdi></h2>
        {xtb.count ? <dl className={styles.metrics}>
          <div><dt>مجموع موجودی ثبت‌شده</dt><dd><bdi>{displayMoney(xtb.total)}</bdi></dd></div>
          <div><dt>سود و زیان معاملات بسته‌شده از ابتدا</dt><dd className={resultClass(xtb.profit)}><bdi>{signedMoney(xtb.profit)}</bdi></dd></div>
        </dl> : <p className={styles.empty}>موجودی XTB هنوز ثبت نشده است.</p>}
        {xtb.count === 1 && <p className={styles.muted}>جمع فقط بر اساس حساب ثبت‌شده محاسبه شده است.</p>}
      </section>}
      {selected === 'wallet' && <section className={styles.block}>
        <DigitalWalletWorkspace className={styles.walletPanel}/>
      </section>}
    </div>
  </div>
}
