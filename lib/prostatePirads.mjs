// PI-RADS v2.1 combination table. Sequence scores must already be assigned
// on diagnostic-quality MRI of an untreated prostate; this is a teaching aid.
export function combinePirads({ zone, t2, dwi, dce }) {
  if (!['PZ', 'TZ'].includes(zone)) throw new RangeError('Unknown prostate zone')
  if (!Number.isInteger(dwi) || dwi < 1 || dwi > 5) throw new RangeError('DWI must be 1–5')
  if (!['positive', 'negative', 'unavailable'].includes(dce)) throw new RangeError('Unknown DCE status')
  if (zone === 'PZ') {
    if (dwi !== 3) return { score: dwi, rule: 'pz-dwi' }
    if (dce === 'positive') return { score: 4, rule: 'pz-upgrade' }
    return { score: 3, rule: dce === 'unavailable' ? 'pz-no-dce' : 'pz-negative' }
  }
  if (!Number.isInteger(t2) || t2 < 1 || t2 > 5) throw new RangeError('T2 must be 1–5')
  if (t2 === 2 && dwi >= 4) return { score: 3, rule: 'tz-2-plus-1' }
  if (t2 === 3 && dwi === 5) return { score: 4, rule: 'tz-3-plus-1' }
  return { score: t2, rule: 'tz-t2' }
}
