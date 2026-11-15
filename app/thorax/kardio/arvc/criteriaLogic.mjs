// This classifies only the adult CMR morphofunctional category in TFC 2010.
// It does not diagnose ARVC and must not be used to score Padua criteria.
export function classifyTfcCmr({ sex, edvi, ef, regional }) {
  if (!['male', 'female'].includes(sex) || edvi === '' || ef === '' || !Number.isFinite(Number(edvi)) || !Number.isFinite(Number(ef)) || Number(edvi) <= 0 || Number(ef) < 0 || Number(ef) > 100) return 'incomplete'
  if (!regional) return 'none'
  return ['none', 'minor', 'major'][gradeTfcCmrMeasurements({ sex, edvi: Number(edvi), ef: Number(ef) })]
}

// A single valid measurement can satisfy the quantitative part of category I.
// The caller must separately establish a qualifying regional abnormality.
export function gradeTfcCmrMeasurements({ sex, edvi, ef }) {
  const volume = ['male', 'female'].includes(sex) && Number.isFinite(edvi) && edvi > 0 ? edvi : null
  const fraction = Number.isFinite(ef) && ef >= 0 && ef <= 100 ? ef : null
  const majorVolume = sex === 'male' ? 110 : 100
  const minorVolume = sex === 'male' ? 100 : 90
  if (volume >= majorVolume || (fraction !== null && fraction <= 40)) return 2
  if (volume >= minorVolume || (fraction !== null && fraction <= 45)) return 1
  return 0
}
