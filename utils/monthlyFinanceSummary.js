export function monthlyFinanceSummary(entries = []) {
  let income = 0
  let expenses = 0
  let fixed = 0
  for (const entry of entries) {
    const amount = Number(entry.amount) || 0
    if (entry.type === 'income') income += amount
    if (entry.type === 'expense') {
      expenses += amount
      if (entry.generatedRecurring) fixed += amount
    }
  }
  const current = expenses - fixed
  const remaining = income - expenses
  // Overspending fills the ring with the actual expense split; the label can exceed 100%.
  const scale = Math.max(income, expenses, 0)
  return {
    income, expenses, fixed, current, remaining,
    usedPercent: income > 0 ? expenses / income * 100 : null,
    fixedShare: scale > 0 ? Math.max(0, fixed) / scale : 0,
    currentShare: scale > 0 ? Math.max(0, current) / scale : 0,
    remainingShare: scale > 0 ? Math.max(0, remaining) / scale : 0,
  }
}
