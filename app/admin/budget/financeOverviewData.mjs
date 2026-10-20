// A transaction can have several tags, but contributes to the chart only once.
export function expenseCategory(entry) {
  return entry.category || entry.tags?.[0] || 'Ohne Kategorie'
}

export function buildExpenseBreakdown(entries) {
  const totals = new Map()
  for (const entry of entries) {
    if (entry.type !== 'expense') continue
    const amount = Number(entry.amount)
    if (!Number.isFinite(amount)) continue
    const category = expenseCategory(entry)
    totals.set(category, (totals.get(category) || 0) + amount)
  }
  return [...totals].filter(([, amount]) => amount !== 0).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'de'))
}
