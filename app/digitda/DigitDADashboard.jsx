'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import styles from './page.module.css'
import { SHAREHOLDERS, entryEuroValue, formatEuro, formatPersianDate, formatToman, serviceFor } from './financeData'
import { useDigitDAFinance } from './useDigitDAFinance'

const shortMonth = new Intl.DateTimeFormat('fa-IR-u-ca-persian', { month: 'short', year: '2-digit' })
const number = new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 0 })

function quarterOf(date) { return Math.floor((Number(date.slice(5, 7)) - 1) / 3) + 1 }
function currentQuarter() { return Math.floor(new Date().getMonth() / 3) + 1 }

function Icon({ name }) {
  const common = { viewBox: '0 0 24 24', 'aria-hidden': true }
  if (name === 'plus') return <svg {...common}><path d="M12 5v14M5 12h14"/></svg>
  if (name === 'download') return <svg {...common}><path d="M12 3v12m0 0 5-5m-5 5-5-5M5 20h14"/></svg>
  if (name === 'iran') return <svg {...common}><path d="M5 20c4-2 3-6 5-8s5-1 6-5c3 3 3 8 1 12-3 2-8 2-12 1Z"/></svg>
  if (name === 'germany') return <svg {...common}><path d="M4 5h16v14H4zM4 10h16M4 15h16"/></svg>
  return <svg {...common}><path d="M3 7h18v12H3zM7 15h5M3 10h18"/></svg>
}

function TrendChart({ data }) {
  const width = 900
  const height = 280
  const pad = 30
  const max = Math.max(1, ...data.flatMap(point => [point.income, point.expense, point.profit]))
  const min = Math.min(0, ...data.map(point => point.profit))
  const span = Math.max(max - min, 1)
  const x = index => data.length === 1 ? width / 2 : pad + index * ((width - pad * 2) / (data.length - 1))
  const y = value => pad + ((max - value) / span) * (height - pad * 2)
  const line = key => data.map((point, index) => `${index ? 'L' : 'M'}${x(index).toFixed(1)},${y(point[key]).toFixed(1)}`).join(' ')
  const zeroY = y(0)
  const area = data.length ? `${line('income')} L${x(data.length - 1)},${zeroY} L${x(0)},${zeroY} Z` : ''

  return <div className={styles.chartWrap}>
    <svg className={styles.chart} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="نمودار درآمد، هزینه و سود یا زیان">
      <defs><linearGradient id="incomeArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2458ed" stopOpacity=".2"/><stop offset="1" stopColor="#2458ed" stopOpacity="0"/></linearGradient></defs>
      {[0, .25, .5, .75, 1].map(value => <line key={value} x1={pad} x2={width-pad} y1={pad + value * (height-pad*2)} y2={pad + value * (height-pad*2)} className={styles.gridLine}/>) }
      <line x1={pad} x2={width-pad} y1={zeroY} y2={zeroY} className={styles.zeroLine}/>
      {data.length ? <><path d={area} fill="url(#incomeArea)"/><path d={line('income')} className={styles.incomeLine}/><path d={line('expense')} className={styles.expenseLine}/><path d={line('profit')} className={styles.profitLine}/></> : null}
    </svg>
    <div className={styles.chartLabels}>{data.map((point, index) => <span key={point.key} style={{ left: `${data.length === 1 ? 50 : index / (data.length - 1) * 100}%` }}>{shortMonth.format(new Date(`${point.key}-15`))}</span>)}</div>
  </div>
}

export default function DigitDADashboard() {
  const { state, setState, saveStatus } = useDigitDAFinance()
  const [period, setPeriod] = useState('all')
  const [year, setYear] = useState(new Date().getFullYear())
  const [quarter, setQuarter] = useState(currentQuarter())

  const availableYears = useMemo(() => [...new Set(state.entries.map(entry => Number(entry.date.slice(0, 4))))].sort((a, b) => b - a), [state.entries])
  const filtered = useMemo(() => state.entries.filter(entry => {
    if (period === 'all') return true
    if (Number(entry.date.slice(0, 4)) !== Number(year)) return false
    return period === 'year' || quarterOf(entry.date) === Number(quarter)
  }), [state.entries, period, year, quarter])

  const metrics = useMemo(() => filtered.reduce((result, entry) => {
    const value = entryEuroValue(entry, state.tomanPerEuro)
    if (entry.type === 'income') result.income += value
    else result.expense += value
    result.profit = result.income - result.expense
    return result
  }, { income: 0, expense: 0, profit: 0 }), [filtered, state.tomanPerEuro])

  const chartData = useMemo(() => {
    const map = new Map()
    filtered.toSorted((a, b) => a.date.localeCompare(b.date)).forEach(entry => {
      const key = entry.date.slice(0, 7)
      const point = map.get(key) || { key, income: 0, expense: 0, profit: 0 }
      const value = entryEuroValue(entry, state.tomanPerEuro)
      if (entry.type === 'income') point.income += value
      else point.expense += value
      point.profit = point.income - point.expense
      map.set(key, point)
    })
    const values = [...map.values()]
    return values.length > 12 ? values.filter((_, index) => index % Math.ceil(values.length / 12) === 0 || index === values.length - 1) : values
  }, [filtered, state.tomanPerEuro])

  const serviceStats = useMemo(() => state.services.map(service => {
    const entries = filtered.filter(entry => entry.type === 'income' && entry.serviceId === service.id)
    return { ...service, units: entries.reduce((sum, entry) => sum + Number(entry.quantity || 0), 0), revenue: entries.reduce((sum, entry) => sum + entryEuroValue(entry, state.tomanPerEuro), 0) }
  }), [state.services, filtered, state.tomanPerEuro])

  const expenses = filtered.filter(entry => entry.type === 'expense').toSorted((a, b) => b.date.localeCompare(a.date))
  const recent = filtered.toSorted((a, b) => b.date.localeCompare(a.date)).slice(0, 7)
  const margin = metrics.income ? metrics.profit / metrics.income * 100 : 0

  function updateServicePrice(id, price) {
    setState(previous => ({ ...previous, services: previous.services.map(service => service.id === id ? { ...service, price: Math.max(0, Number(price)) } : service) }))
  }

  function exportCsv() {
    const rows = [['تاریخ','نوع','شرح','ارز','مبلغ اصلی','معادل یورو'], ...filtered.map(entry => {
      const service = serviceFor(state.services, entry.serviceId)
      return [entry.date, entry.type === 'income' ? 'درآمد' : 'هزینه', entry.type === 'income' ? service?.name : entry.category, entry.type === 'income' || entry.currency === 'eur' ? 'EUR' : 'تومان', entry.type === 'income' ? entryEuroValue(entry, state.tomanPerEuro) : entry.amount, entryEuroValue(entry, state.tomanPerEuro)]
    })]
    const csv = rows.map(row => row.map(cell => `"${String(cell ?? '').replaceAll('"','""')}"`).join(';')).join('\n')
    const url = URL.createObjectURL(new Blob([`\ufeff${csv}`], { type: 'text/csv;charset=utf-8' }))
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = `digitda-${new Date().toISOString().slice(0,10)}.csv`; anchor.click(); URL.revokeObjectURL(url)
  }

  return <main className={styles.page} dir="rtl">
    <header className={styles.topbar}>
      <Link className={styles.logo} href="/digitda" lang="en" dir="ltr">Digit<span>DA</span></Link>
      <nav aria-label="بخش‌های DigitDA"><a className={styles.navActive} href="#overview">داشبورد</a><a href="#income">درآمدها</a><a href="#expenses">هزینه‌ها</a><a href="#transactions">تراکنش‌ها</a></nav>
      <div className={styles.headerActions}><span className={styles.saveStatus}><i />{saveStatus}</span><button type="button" onClick={exportCsv}><Icon name="download"/> خروجی</button><form action="/api/digitda/logout" method="post"><button type="submit">خروج</button></form></div>
    </header>

    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.company}><strong lang="en" dir="ltr">DigitDA</strong><span>استودیوی طراحی دیجیتال</span><small>شروع فعالیت · {formatPersianDate(state.foundedAt)}</small></div>
        <div className={styles.periodBlock}><span>بازه گزارش</span><div className={styles.periodButtons}>{[['all','از ابتدا'],['quarter','فصل'],['year','سال']].map(([value,label]) => <button key={value} className={period === value ? styles.selected : ''} onClick={() => setPeriod(value)}>{label}</button>)}</div>{period !== 'all' ? <div className={styles.periodSelects}><select value={year} onChange={event => setYear(event.target.value)}>{availableYears.map(value => <option key={value}>{number.format(value)}</option>)}</select>{period === 'quarter' ? <select value={quarter} onChange={event => setQuarter(event.target.value)}>{[1,2,3,4].map(value => <option key={value} value={value}>فصل {number.format(value)}</option>)}</select> : null}</div> : null}</div>
        <div className={styles.sideMetrics}><div><span>جمع درآمدها</span><strong className={styles.blue}>{formatEuro(metrics.income)}</strong></div><div><span>جمع هزینه‌ها</span><strong className={styles.lime}>{formatEuro(metrics.expense)}</strong></div><div><span>سود یا زیان خالص</span><strong className={metrics.profit < 0 ? styles.negative : ''}>{formatEuro(metrics.profit)}</strong><small>{number.format(margin)}٪ حاشیه سود</small></div></div>
        <div className={styles.rateBox}><label>نرخ مبنای فعلی</label><div><input aria-label="نرخ مبنای یورو" value={state.tomanPerEuro} onChange={event => setState(previous => ({ ...previous, tomanPerEuro: Number(event.target.value) }))} type="number"/><span>تومان / یورو</span></div><small>فقط برای تبدیل‌های فاقد نرخ قفل‌شده استفاده می‌شود.</small></div>
      </aside>

      <div className={styles.content}>
        <section className={styles.overview} id="overview">
          <div className={styles.sectionHeading}><div><span>نمای مالی شرکت</span><h1>سود و هزینه <em>تا این لحظه</em></h1></div><div className={styles.legend}><span><i className={styles.legendIncome}/>درآمد</span><span><i className={styles.legendExpense}/>هزینه</span><span><i className={styles.legendProfit}/>سود خالص</span></div></div>
          <TrendChart data={chartData}/>
          <div className={styles.partnerProfit} id="shareholders">
            <div className={styles.partnerTitle}><strong>سهم سود یا زیان هر شریک</strong><span>بر اساس بازه انتخاب‌شده</span></div>
            {SHAREHOLDERS.map(holder => { const shareEuro = metrics.profit * holder.share / 100; return <div className={styles.partnerRow} key={holder.name}><span className={styles.partnerIdentity}><i style={{ background: holder.color }}/><strong>{holder.name}</strong><small>{number.format(holder.share)}٪</small></span><b className={shareEuro < 0 ? styles.negativeText : styles.positiveText}>{formatEuro(shareEuro, 2)}</b><b className={shareEuro < 0 ? styles.negativeText : styles.positiveText}>{formatToman(shareEuro * state.tomanPerEuro)}</b></div>})}
          </div>
        </section>

        <section className={styles.newEntryBand} aria-labelledby="new-entry-title"><h2 id="new-entry-title">ثبت مورد جدید</h2><div><Link href="/digitda/entry/iran"><Icon name="iran"/><span><strong>هزینه ایران</strong><small>ثبت هزینه به تومان و تسویه</small></span><b>←</b></Link><Link href="/digitda/entry/germany"><Icon name="germany"/><span><strong>هزینه آلمان</strong><small>ثبت هزینه به یورو</small></span><b>←</b></Link><Link href="/digitda/entry/income"><Icon name="income"/><span><strong>درآمد</strong><small>ثبت سفارش و مبلغ دریافتی</small></span><b>←</b></Link></div></section>

        <section className={styles.incomeSection} id="income"><div className={styles.blockTitle}><div><span>منابع درآمد</span><h2>خدمات و قیمت پایه</h2></div><Link href="/digitda/entry/income"><Icon name="plus"/> ثبت درآمد</Link></div><div className={styles.tableWrap}><table><thead><tr><th>خدمت</th><th>قیمت پایه</th><th>واحد</th><th>تعداد</th><th>درآمد</th></tr></thead><tbody>{serviceStats.map(service => <tr key={service.id}><td><strong>{service.name}</strong></td><td><label className={styles.priceInput}><span>€</span><input aria-label={`قیمت پایه ${service.name}`} type="number" value={service.price} onChange={event => updateServicePrice(service.id, event.target.value)}/></label></td><td>{service.unit}</td><td>{number.format(service.units)}</td><td><strong>{formatEuro(service.revenue)}</strong></td></tr>)}</tbody></table></div><p className={styles.tableHint}>قیمت پایه برای سفارش‌های جدید است و داخل هر سفارش می‌تواند تغییر کند.</p></section>

        <div className={styles.lowerGrid}>
          <section className={styles.expenseSection} id="expenses"><div className={styles.blockTitle}><div><span>هزینه بر اساس محل</span><h2>آلمان و ایران</h2></div></div><div className={styles.expenseGroups}>{[{id:'germany',title:'آلمان / یورو',accent:'blue'},{id:'iran',title:'ایران / تومان',accent:'lime'}].map(group => <div className={styles.expenseGroup} key={group.id}><h3 className={styles[group.accent]}>{group.title}</h3>{expenses.filter(entry => entry.location === group.id).slice(0,6).map(entry => <div className={styles.expenseRow} key={entry.id}><span><strong>{entry.category}</strong><small>{entry.note || formatPersianDate(entry.date)} · {entry.account === 'iran' ? 'حساب ایران' : 'حساب آلمان'}</small></span><b>{entry.currency === 'toman' ? formatToman(entry.amount) : formatEuro(entry.amount,2)}</b></div>)}</div>)}</div></section>
          <aside className={styles.rightRail}><section className={styles.recent} id="transactions"><div className={styles.blockTitle}><div><span>دفتر مالی</span><h2>آخرین تراکنش‌ها</h2></div></div>{recent.map(entry => { const service = serviceFor(state.services, entry.serviceId); return <div className={styles.recentRow} key={entry.id}><span className={entry.type === 'income' ? styles.up : styles.down}>{entry.type === 'income' ? '↙' : '↗'}</span><span><strong>{entry.type === 'income' ? service?.name : entry.category}</strong><small>{formatPersianDate(entry.date)}</small></span><b>{entry.type === 'income' ? '+' : '−'} {formatEuro(entryEuroValue(entry,state.tomanPerEuro),2)}</b></div>})}</section></aside>
        </div>
      </div>
    </div>
  </main>
}
