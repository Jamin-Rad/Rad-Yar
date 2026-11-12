'use client'

import { useMemo, useState } from 'react'
import { money, signedMoney, percent, number } from '@/lib/investments/portfolio.mjs'
import { ASSET_SECTORS, assetSector } from '@/lib/investments/asset-sectors.mjs'
import {positionBalance} from '@/lib/investments/balances.mjs'
import {marketForPosition} from '@/lib/investments/market.mjs'
import Icon from './InvestmentIcon'
import styles from './investments.module.css'

export default function HoldingsTable({ positions, totalCents, onOpen, markets = {}, compact=false, assetSectors }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState({ key: 'marketValueCents', direction: -1 })
  const sectors = useMemo(() => new Set(positions.map(position => assetSector(position, assetSectors))), [positions, assetSectors])
  const selectedSector = sectors.has(category) ? category : 'all'
  const rows = useMemo(() => positions.map(p=>positionBalance(p,markets)).filter(p => (selectedSector === 'all' || selectedSector === assetSector(p, assetSectors)) && `${p.name} ${p.symbol || ''} ${p.isin || ''} ${p.note}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())).sort((a, b) => {
    if (a[sort.key] === null && b[sort.key] === null) return 0
    if (a[sort.key] === null) return 1
    if (b[sort.key] === null) return -1
    return (sort.key === 'name' ? a.name.localeCompare(b.name) : Number(a[sort.key]) - Number(b[sort.key])) * sort.direction
  }), [positions, markets, selectedSector, query, sort, assetSectors])
  function changeSort(key) { setSort(previous => ({ key, direction: previous.key === key ? -previous.direction : -1 })) }
  const marketTotal = positions.reduce((s,p)=>s+(positionBalance(p,markets).marketValueCents||0),0)
  const columns = [['name', 'دارایی'], ['quantity', 'تعداد'], ['marketValueCents', 'ارزش روز'], ['marketGainCents', 'سود و زیان']]
  return <section className={styles.tablePanel} aria-labelledby="holdings-heading">
    <div className={styles.tableToolbar}>
      <div className={styles.tableTitle}><h2 id="holdings-heading">دارایی‌های ثبت‌شده</h2><span>{number(rows.length)} دارایی</span></div>
      <select className={styles.sectorFilter} aria-label="دستهٔ دارایی" value={selectedSector} onChange={event => setCategory(event.target.value)}>
        <option value="all">همهٔ دسته‌ها</option>
        {Object.entries(ASSET_SECTORS).filter(([key]) => sectors.has(key)).map(([key, { label }]) =>
          <option key={key} value={key}>{label}</option>)}
      </select>
      <label className={styles.search}><Icon name="search" size={17} /><input type="search" placeholder="جست‌وجوی دارایی…" aria-label="جست‌وجوی دارایی" value={query} onChange={event => setQuery(event.target.value)} /></label>
    </div>
    <div className={styles.tableScroll}>
      <table className={styles.table}>
        <thead><tr>{columns.map(([key, label]) => <th key={key} scope="col" aria-sort={sort.key === key ? sort.direction === 1 ? 'ascending' : 'descending' : 'none'}><button onClick={() => changeSort(key)} type="button">{label}<Icon name="sort" size={12} /></button></th>)}{!compact&&<th scope="col">هزینه خرید باقی‌مانده</th>}<th scope="col">سهم سبد</th></tr></thead>
        <tbody>{rows.map(p => <tr key={p.id}>
          <td><button type="button" className={styles.assetName} onClick={() => onOpen(p)}><span className={styles.monogram} style={{ '--asset-color': ASSET_SECTORS[assetSector(p, assetSectors)].color }} lang="en">{p.name.split(/[^a-zA-Z0-9]+/).filter(Boolean).slice(0, 2).map(word => word[0]).join('').toUpperCase()}</span><span><strong lang="en" dir="ltr">{p.name}</strong><small>{ASSET_SECTORS[assetSector(p, assetSectors)].label}{p.symbol && <> · <bdi lang="en">{p.symbol}</bdi></>}{!compact&&p.isin ? <> · <bdi lang="en">{p.isin}</bdi></> : null}</small>{!compact&&marketForPosition(p,markets) && <small className={styles.marketInline}><bdi>{new Intl.NumberFormat('de-DE',{maximumSignificantDigits:8}).format(marketForPosition(p,markets).quote.price)} {marketForPosition(p,markets).quote.currency} · {marketForPosition(p,markets).quote.asOf.slice(0,10)}</bdi></small>}</span></button></td>
          <td><span lang="en" dir="ltr" className={styles.numeric}>{new Intl.NumberFormat('de-DE', { maximumFractionDigits: 10 }).format(Number(p.quantity))}</span>{p.ledger?.quantityStatus==='prior-record'&&!p.ledger.quantityConfirmed&&<small className={styles.holdingSource}>تعداد قبلی؛ نیازمند تطبیق</small>}</td>
          <td><strong lang="en" dir="ltr" className={styles.numeric}>{money(p.marketValueCents)}</strong>{!compact&&<small className={styles.holdingSource}>{p.priceAsOf ? new Date(p.priceAsOf).toLocaleString('de-DE',{timeZone:'Europe/Berlin'}) : 'قیمت معتبر دریافت نشده'}{!p.quantityKnown ? ' · تعداد نیازمند تطبیق' : ''}</small>}</td>
          <td>{p.marketGainCents == null ? <span className={styles.unknown}>—</span> : <span lang="en" dir="ltr" className={`${styles.numeric} ${p.marketGainCents >= 0 ? styles.positive : styles.negative}`}>{signedMoney(p.marketGainCents)}</span>}</td>
          {!compact&&<td><bdi>{money(p.remainingCostCents)}</bdi><small className={styles.holdingSource}>{p.costSource==='broker'?'ثبت بروکر':''}</small></td>}
          <td>{p.marketValueCents==null||!marketTotal?<span>—</span>:<div className={styles.weight}><span>{percent(p.marketValueCents / marketTotal * 100)}</span><span className={styles.weightTrack}><span style={{ width: `${p.marketValueCents / marketTotal * 100}%` }} /></span></div>}</td>

        </tr>)}</tbody>
      </table>
      {!rows.length && <div className={styles.empty}>دارایی مطابق جست‌وجو پیدا نشد.<button type="button" onClick={() => { setQuery(''); setCategory('all') }}>پاک‌کردن فیلترها</button></div>}
    </div>

  </section>
}
