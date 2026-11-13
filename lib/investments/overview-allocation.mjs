import { ASSET_SECTORS, assetSector } from './asset-sectors.mjs'

export function allocationValue(position) {
  const value = position.marketValueCents
  return position.quantityKnown && Number.isSafeInteger(value) && value >= 0 ? value : null
}

export function overviewAllocation(accounts, assetSectors) {
  const categories = new Map()
  const holdings = new Map()
  let total = 0
  let excluded = 0
  for (const account of accounts) {
    for (const position of account.positions) {
      const value = allocationValue(position)
      if (value == null) {
        excluded++
        continue
      }
      if (!value) continue
      const category = assetSector(position, assetSectors)
      if (!categories.has(category)) categories.set(category, { valueCents: 0, holdings: new Map() })
      const group = categories.get(category)
      group.valueCents += value
      // Without a verified identifier, equal names do not prove an equal instrument.
      const key = position.isin || `${account.accountId}:${position.id}`
      const holding = holdings.get(key) || { key, name: position.name, isin: position.isin, valueCents: 0 }
      holding.valueCents += value
      holdings.set(key, holding)
      const groupHolding = group.holdings.get(key) || { key, name: position.name, isin: position.isin, valueCents: 0 }
      groupHolding.valueCents += value
      group.holdings.set(key, groupHolding)
      total += value
    }
  }
  const withShare = holding => ({ ...holding, share: holding.valueCents / total })
  const byValue = (a, b) => b.valueCents - a.valueCents
  const groups = [...categories].map(([key, { valueCents, holdings }]) => ({
    key, ...ASSET_SECTORS[key], valueCents, share: valueCents / total,
    holdings: [...holdings.values()].sort(byValue).map(withShare),
  })).sort((a, b) => b.valueCents - a.valueCents)
  const top = [...holdings.values()].sort(byValue).slice(0, 3).map(withShare)
  return { groups, top, total, excluded }
}
