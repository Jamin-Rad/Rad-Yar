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

// Category views overlap; the ledger and primary-category chart remain exclusive.
export function entryCategoryNames(entry, categories = []) {
  const available = categories.filter(category => !entry.type || category.type === entry.type)
  const byName = new Map(available.map(category => [category.name, category]))
  const explicit = [entry.category, ...(Array.isArray(entry.tags) ? entry.tags : []), ...Object.keys(entry.catSubtitles || {})]
    .filter(name => typeof name === 'string' && name && (!categories.length || byName.has(name)))
  const names = new Set(explicit)
  if (entry.type === 'expense') {
    for (const parent of [...names]) {
      const child = entry.catSubtitles?.[parent] || entry.title
      const declared = byName.get(parent)?.subs?.some(sub => (typeof sub === 'string' ? sub : sub.name) === child)
      if (child !== parent && declared && byName.has(child)) names.add(child)
    }
  }
  return names.size ? [...names] : [entry.category || 'Ohne Kategorie']
}

export function entryCategorySubtitle(entry, category, categories = []) {
  if (entry.catSubtitles?.[category]) return entry.catSubtitles[category]
  const parents = categories.filter(parent => parent.type === entry.type && parent.name !== category
    && entryCategoryNames(entry, categories).includes(parent.name)
    && (entry.catSubtitles?.[parent.name] || entry.title) === category
    && parent.subs?.some(sub => (typeof sub === 'string' ? sub : sub.name) === category))
  return parents.map(parent => parent.name).join(' / ') || entry.title || 'Sonstiges'
}

export function buildCategoryTotals(entries, categories = []) {
  const totals = new Map()
  for (const entry of entries) {
    const amount = Number(entry.amount)
    if (entry.type !== 'expense' || !Number.isFinite(amount)) continue
    for (const category of entryCategoryNames(entry, categories)) totals.set(category, (totals.get(category) || 0) + amount)
  }
  return [...totals].filter(([, amount]) => amount !== 0).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'de'))
}
