import { ASSET_SECTORS, assetSector } from './asset-sectors.mjs'

export function allocationValue(position) {
  const value = position.marketValueCents
  return position.quantityKnown && Number.isSafeInteger(value) && value >= 0 ? value : null
}

export function overviewAllocation(accounts, assetSectors, metric = 'value') {
  const categories = new Map()
  const holdings = new Map()
  let total = 0
  let excluded = 0
  for (const account of accounts) {
    for (const position of account.positions) {
      const value = metric === 'profit'
        ? Number.isSafeInteger(position.marketGainCents) ? position.marketGainCents : null
        : allocationValue(position)
      if (value == null) {
        excluded++
        continue
      }
      if (!value) continue
      const category = assetSector(position, assetSectors)
      // Without a verified identifier, equal names do not prove an equal instrument.
      const key = position.isin || `${account.accountId}:${position.id}`
      const holding = holdings.get(key) || { key, name: position.name, isin: position.isin, valueCents: 0 }
      holding.valueCents += value
      holdings.set(key, holding)
      if (metric === 'profit') {
        if (Math.abs(value) > (holding.largestPositionValue || 0)) {
          Object.assign(holding, { largestPositionValue: Math.abs(value), category, accountId: account.accountId, positionId: position.id })
        }
        continue
      }
      if (!categories.has(category)) categories.set(category, { valueCents: 0, holdings: new Map() })
      const group = categories.get(category)
      group.valueCents += value
      const groupHolding = group.holdings.get(key) || { key, name: position.name, isin: position.isin, valueCents: 0, largestPositionValue: 0 }
      groupHolding.valueCents += value
      if (Math.abs(value) > groupHolding.largestPositionValue) {
        groupHolding.largestPositionValue = Math.abs(value)
        groupHolding.accountId = account.accountId
        groupHolding.positionId = position.id
      }
      group.holdings.set(key, groupHolding)
      total += value
    }
  }
  if (metric === 'profit') {
    for (const { category, ...holding } of holdings.values()) {
      if (holding.valueCents <= 0) continue
      if (!categories.has(category)) categories.set(category, { valueCents: 0, holdings: new Map() })
      const group = categories.get(category)
      group.valueCents += holding.valueCents
      group.holdings.set(holding.key, holding)
      total += holding.valueCents
    }
  }
  const withShare = holding => ({ ...holding, share: holding.valueCents / total })
  const byValue = (a, b) => b.valueCents - a.valueCents
  const groups = [...categories].map(([key, { valueCents, holdings }]) => ({
    key, ...ASSET_SECTORS[key], valueCents, share: valueCents / total,
    holdings: [...holdings.values()].sort(byValue).map(({ largestPositionValue, ...holding }) => withShare(holding)),
  })).sort((a, b) => b.valueCents - a.valueCents)
  const ranked = metric === 'profit'
    ? groups.flatMap(group => group.holdings)
    : [...holdings.values()].map(withShare)
  const top = ranked.sort(byValue).slice(0, 3)
  return { groups, top, total, excluded }
}
