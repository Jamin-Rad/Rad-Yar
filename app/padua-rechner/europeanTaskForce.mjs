import { categories } from './criteria.mjs'

// Corrado et al., Table 1 and section 3 (doi:10.1016/j.ijcard.2023.131447).
export function assessEuropeanTaskForce(findings) {
  const all = [...findings.values()]
  const cardiac = all.filter(item => item.category === 'function' || item.category === 'tissue')
  const rv = cardiac.some(item => item.side === 'rv')
  const lv = cardiac.some(item => item.side === 'lv')
  const phenotype = rv ? (lv ? 'biventricular' : 'right') : lv ? 'left' : 'none'
  const hasLge = findings.has('lv-lge') || findings.has('lv-lge-extensive')
  const breakdown = categories.map(({ id }) => {
    const matches = all.filter(item => item.category === id)
    const eligible = matches.filter(item =>
      item.side === 'shared' || phenotype === 'biventricular' || phenotype === 'none' ||
      item.side === (phenotype === 'right' ? 'rv' : 'lv')
    )
    return { id, matches, eligible, points: Math.max(0, ...eligible.map(item => item.grade)) }
  })

  if (phenotype === 'none') return { phenotype, outcome: 'noAnchor', points: null, breakdown }
  if (phenotype === 'left' && !hasLge) return { phenotype, outcome: 'etfLgeMissing', points: null, breakdown }
  const points = breakdown.reduce((sum, item) => sum + item.points, 0)
  const outcome = points >= 4 ? 'definite' : points === 3 ? 'borderline' : points === 2 ? 'possible' : 'belowThreshold'
  return { phenotype, outcome, points, breakdown }
}
