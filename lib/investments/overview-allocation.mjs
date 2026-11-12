import { ASSET_SECTORS, assetSector } from './asset-sectors.mjs'

export function overviewAllocation(accounts, assetSectors) {
  const categories = new Map()
  const holdings = new Map()
  let total = 0
  let excluded = 0
  for (const account of accounts) {
    for (const position of account.positions) {
      const value = position.marketValueCents
      if (!position.quantityKnown || !Number.isSafeInteger(value) || value < 0) {
        excluded++
        continue
      }
      if (!value) continue
      const category = assetSector(position, assetSectors)
      categories.set(category, (categories.get(category) || 0) + value)
      // Without a verified identifier, equal names do not prove an equal instrument.
      const key = position.isin || `${account.accountId}:${position.id}`
      const holding = holdings.get(key) || { key, name: position.name, isin: position.isin, valueCents: 0 }
      holding.valueCents += value
      holdings.set(key, holding)
      total += value
    }
  }
  const groups = [...categories].map(([key, valueCents]) => ({
    key, ...ASSET_SECTORS[key], valueCents, share: valueCents / total,
  })).sort((a, b) => b.valueCents - a.valueCents)
  const top = [...holdings.values()].sort((a, b) => b.valueCents - a.valueCents)
    .slice(0, 3).map(holding => ({ ...holding, share: holding.valueCents / total }))
  return { groups, top, total, excluded }
}
