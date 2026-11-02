'use client'

import { useMemo, useState } from 'react'
import { CATEGORY_LABELS, CATEGORY_COLORS, money, signedMoney, percent, number } from '@/lib/investments/portfolio.mjs'
import {positionBalance} from '@/lib/investments/balances.mjs'
import {marketForPosition} from '@/lib/investments/market.mjs'
import Icon from './InvestmentIcon'
import styles from './investments.module.css'

export default function HoldingsTable({ positions, totalCents, onEdit, onOpen, markets = {} }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState({ key: 'marketValueCents', direction: -1 })
  const rows = useMemo(() => positions.map(p=>positionBalance(p,markets)).filter(p => (category === 'all' || category === p.category) && `${p.name} ${p.symbol || ''} ${p.isin || ''} ${p.note}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())).sort((a, b) => {
    if (a[sort.key] === null && b[sort.key] === null) return 0
    if (a[sort.key] === null) return 1
    if (b[sort.key] === null) return -1
    return (sort.key === 'name' ? a.name.localeCompare(b.name) : Number(a[sort.key]) - Number(b[sort.key])) * sort.direction
  }), [positions, markets, category, query, sort])
  function changeSort(key) { setSort(previous => ({ key, direction: previous.key === key ? -previous.direction : -1 })) }
  const marketTotal = positions.reduce((s,p)=>s+(positionBalance(p,markets).marketValueCents||0),0)
  const columns = [['name', 'دارایی'], ['quantity', 'تعداد'], ['marketValueCents', 'ارزش با قیمت بازار'], ['marketGainCents', 'سود/زیان تحقق‌نیافته']]
  return <section className={styles.tablePanel} aria-labelledby="holdings-heading">
    <div className={styles.tableToolbar}>
      <div className={styles.tableTitle}><h2 id="holdings-heading">دارایی‌های ثبت‌شده</h2><span>{number(rows.length)} دارایی</span></div>
      <div className={styles.filters} aria-label="گروه دارایی">
        {[['all', 'همه'], ...Object.entries(CATEGORY_LABELS).filter(([key]) => positions.some(p => p.category === key))].map(([key, label]) => <button type="button" key={key} onClick={() => setCategory(key)} aria-pressed={category === key} className={category === key ? styles.filterActive : ''}>{label}</button>)}
      </div>
      <label className={styles.search}><Icon name="search" size={17} /><input type="search" placeholder="جست‌وجوی دارایی…" aria-label="جست‌وجوی دارایی" value={query} onChange={event => setQuery(event.target.value)} /></label>
    </div>
    <div className={styles.tableScroll}>
      <table className={styles.table}>
        <thead><tr>{columns.map(([key, label]) => <th key={key} scope="col" aria-sort={sort.key === key ? sort.direction === 1 ? 'ascending' : 'descending' : 'none'}><button onClick={() => changeSort(key)} type="button">{label}<Icon name="sort" size={12} /></button></th>)}<th scope="col">هزینه خرید باقی‌مانده</th><th scope="col">سهم از بخش دارای قیمت</th><th scope="col">وضعیت داده</th><th scope="col"><span className={styles.srOnly}>ویرایش</span></th></tr></thead>
        <tbody>{rows.map(p => <tr key={p.id}>
          <td><button type="button" className={styles.assetName} onClick={() => onOpen(p)}><span className={styles.monogram} style={{ '--asset-color': CATEGORY_COLORS[p.category] }} lang="en">{p.name.split(/[^a-zA-Z0-9]+/).filter(Boolean).slice(0, 2).map(word => word[0]).join('').toUpperCase()}</span><span><strong lang="en" dir="ltr">{p.name}</strong><small>{p.symbol ? <bdi lang="en">{p.symbol}</bdi> : CATEGORY_LABELS[p.category]}{p.isin ? <> · <bdi lang="en">{p.isin}</bdi></> : null}</small>{marketForPosition(p,markets) && <small className={styles.marketInline}><bdi>{new Intl.NumberFormat('de-DE',{maximumSignificantDigits:8}).format(marketForPosition(p,markets).quote.price)} {marketForPosition(p,markets).quote.currency} · {marketForPosition(p,markets).quote.asOf.slice(0,10)}</bdi></small>}</span></button></td>
          <td><span lang="en" dir="ltr" className={styles.numeric}>{new Intl.NumberFormat('de-DE', { maximumFractionDigits: 10 }).format(Number(p.quantity))}</span>{p.ledger&&<small className={styles.holdingSource}>{p.ledger.quantityStatus==='transactions'?'محاسبه از تراکنش‌ها':p.ledger.quantityConfirmed?'مبنای تعداد تأییدشده؛ ادامه با تراکنش‌ها':'تعداد قبلی؛ نیازمند تطبیق'}</small>}</td>
          <td><strong lang="en" dir="ltr" className={styles.numeric}>{money(p.marketValueCents)}</strong><small className={styles.holdingSource}>{p.priceAsOf ? new Date(p.priceAsOf).toLocaleString('de-DE',{timeZone:'Europe/Berlin'}) : 'قیمت معتبر دریافت نشده'}{!p.quantityKnown ? ' · تعداد نیازمند تطبیق' : ''}</small></td>
          <td>{p.marketGainCents == null ? <span className={styles.unknown}>بهای خرید یا قیمت ناقص</span> : <span lang="en" dir="ltr" className={`${styles.numeric} ${p.marketGainCents >= 0 ? styles.positive : styles.negative}`}>{signedMoney(p.marketGainCents)}</span>}</td>
          <td><bdi>{money(p.ledger?.costCents)}</bdi><small className={styles.holdingSource}>{p.ledger?.costCents!=null?'FIFO با هزینه خرید؛ قیمت روز نیست':'بهای خرید کافی نیست'}</small></td>
          <td>{p.marketValueCents==null||!marketTotal?<span>—</span>:<div className={styles.weight}><span>{percent(p.marketValueCents / marketTotal * 100)}</span><span className={styles.weightTrack}><span style={{ width: `${p.marketValueCents / marketTotal * 100}%` }} /></span></div>}</td>
          <td><button className={`${styles.quality} ${p.verified ? styles.qualityVerified : ''}`} type="button" onClick={() => onEdit(p)}><Icon name={p.verified ? 'check' : 'edit'} size={12} />{p.verified ? 'تأییدشده' : 'نیازمند تأیید'}</button></td>
          <td><button type="button" className={styles.iconButton} onClick={() => onEdit(p)} aria-label={`ویرایش ${p.name}`}><Icon name="edit" size={16} /></button></td>
        </tr>)}</tbody>
      </table>
      {!rows.length && <div className={styles.empty}>دارایی مطابق جست‌وجو پیدا نشد.<button type="button" onClick={() => { setQuery(''); setCategory('all') }}>پاک‌کردن فیلترها</button></div>}
    </div>
    <div className={styles.tableFooter}><span>سهم هر ردیف نسبت به بخش دارای قیمت بازار است؛ سود تحقق‌نیافته فقط با بهای خرید معلوم محاسبه می‌شود.</span><span>روی نام دارایی بزن تا پرونده تحلیل، قیمت و تصمیم‌هایش باز شود.</span></div>
  </section>
}
