export function xtbExposure(trade) {
  const lots = []
  for (const event of trade.executions) {
    if (event.kind === 'entry') lots.push({ quantity: Number(event.quantity), price: Number(event.price) })
    if (event.kind !== 'exit') continue
    let remaining = Number(event.quantity)
    for (const lot of lots) {
      const matched = Math.min(remaining, lot.quantity)
      lot.quantity -= matched
      remaining -= matched
      if (remaining <= 1e-10) break
    }
  }
  const volume = lots.reduce((sum, lot) => sum + lot.quantity, 0)
  const entry = volume > 1e-10 ? lots.reduce((sum, lot) => sum + lot.quantity * lot.price, 0) / volume : null
  const direction = trade.plan.direction === 'short' ? -1 : 1
  const isBrent = trade.plan.product === 'cfd' && trade.plan.symbol?.trim().toUpperCase() === 'OIL' && trade.plan.currency === 'USD'
  return { volume, entry, direction, isBrent, units: isBrent ? volume * 1000 : null }
}

export function xtbScenario(exposure, price) {
  if (!(exposure.entry > 0 && price > 0)) return null
  const movement = (price - exposure.entry) * exposure.direction
  return { percent: movement / exposure.entry * 100, amount: exposure.units == null ? null : movement * exposure.units }
}

// A single-position estimate with frozen margin, FX and contract exposure.
export function estimateXtbStopOut(exposure, { price, equity, margin, fx }, openCount) {
  if (openCount !== 1 || !(exposure.units > 0) || ![price, equity, margin, fx].every(value => Number.isFinite(value) && value > 0)) return null
  const threshold = margin * .5
  const marginLevel = equity / margin * 100
  const level = price - exposure.direction * (equity - threshold) / (exposure.units * fx)
  return { price: level > 0 && marginLevel >= 50 ? level : null, marginLevel, alreadyBelow: marginLevel < 50 }
}
