// This classifies only the adult CMR morphofunctional category in TFC 2010.
// It does not diagnose ARVC and must not be used to score Padua criteria.
export function classifyTfcCmr({ sex, edvi, ef, regional }) {
  if (!['male', 'female'].includes(sex) || edvi === '' || ef === '' || !Number.isFinite(Number(edvi)) || !Number.isFinite(Number(ef)) || Number(edvi) <= 0 || Number(ef) < 0 || Number(ef) > 100) return 'incomplete'
  if (!regional) return 'none'
  const volume = Number(edvi), fraction = Number(ef)
  const majorVolume = sex === 'male' ? 110 : 100
  const minorVolume = sex === 'male' ? 100 : 90
  if (volume >= majorVolume || fraction <= 40) return 'major'
  if (volume >= minorVolume || fraction <= 45) return 'minor'
  return 'none'
}
