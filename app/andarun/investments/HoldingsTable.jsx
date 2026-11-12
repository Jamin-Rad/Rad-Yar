'use client'

import { useState } from 'react'
import { ASSET_SECTORS, assetSector } from '@/lib/investments/asset-sectors.mjs'
import { allocationValue } from '@/lib/investments/overview-allocation.mjs'
import { money, percent, signedMoney } from '@/lib/investments/portfolio.mjs'
import Icon from './InvestmentIcon'
import view from './AccountView.module.css'

const quantityFormat = new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 10 })

export default function HoldingsTable({ positions, allocation, onOpen, assetSectors }) {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('weight')
  const term = query.trim().toLocaleLowerCase()
  const valuedGroups = new Map(allocation.groups.map(group => [group.key, group]))
  const bySector = new Map()
  for (const position of positions) {
    const key = assetSector(position, assetSectors)
    const { label, color } = ASSET_SECTORS[key]
    if (term && ![position.name, position.symbol, position.isin, label].some(value => value?.toLocaleLowerCase().includes(term))) continue
    if (!bySector.has(key)) bySector.set(key, { key, label, color, ...valuedGroups.get(key), positions: [] })
    bySector.get(key).positions.push(position)
  }
  const groups = [...bySector.values()].sort((a, b) => sort === 'name'
    ? a.label.localeCompare(b.label, 'fa')
    : (b.valueCents ?? 0) - (a.valueCents ?? 0))
  const sortPositions = (a, b) => sort === 'name'
    ? a.name.localeCompare(b.name)
    : (allocationValue(b) ?? -1) - (allocationValue(a) ?? -1)

  return <section aria-label="دارایی‌های حساب" className={view.sectorHoldings}>
    <div className={view.holdingsTools}>
      <label className={view.holdingsSearch}><Icon name="search" size={17} />
        <input type="search" aria-label="جست‌وجوی دارایی" placeholder="جست‌وجوی دارایی…" value={query} onChange={event => setQuery(event.target.value)} />
      </label>
      <select aria-label="مرتب‌سازی دارایی‌ها" value={sort} onChange={event => setSort(event.target.value)}>
        <option value="weight">بیشترین وزن</option>
        <option value="name">نام دسته و دارایی</option>
      </select>
    </div>
    {groups.map((group, index) => <details className={view.sectorGroup} key={group.key} open={index === 0 || Boolean(term)}>
      <summary>
        <span className={view.sectorTitle}><i style={{ background: group.color }} />{group.label}</span>
        <span className={view.sectorWeight}>{group.share != null ? <><bdi>{percent(group.share * 100)}</bdi> از سبد</> : 'وزن نامشخص'}</span>
        <Icon name="chevron" size={16} />
      </summary>
      <ul className={view.sectorRows}>
        {group.positions.sort(sortPositions).map(position => {
          const value = allocationValue(position)
          const share = value != null && allocation.total > 0 ? percent(value / allocation.total * 100) : '—'
          return <li key={position.id}>
            <button type="button" className={view.holding} onClick={() => onOpen(position)}>
              <span className={view.holdingName}><strong dir="auto">{position.name}</strong>
                <small>{position.symbol && <><bdi>{position.symbol}</bdi> · </>}<bdi>{quantityFormat.format(Number(position.quantity))}</bdi> واحد</small>
              </span>
              <span className={view.holdingValue}><bdi>{money(value)}</bdi>
                {position.marketGainCents != null && <small className={position.marketGainCents < 0 ? view.loss : view.gain}><bdi>{signedMoney(position.marketGainCents)}</bdi></small>}
              </span>
              <bdi className={view.holdingWeight}>{share}</bdi>
            </button>
          </li>
        })}
      </ul>
    </details>)}
    {!groups.length && <p className={view.empty}>دارایی مطابق جست‌وجو پیدا نشد.</p>}
  </section>
}
