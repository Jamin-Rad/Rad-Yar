// Accept local decimal notation without accepting partial or non-finite numbers.
export function parseMeasurement(value) {
  const text = String(value ?? '').trim()
    .replace(/[۰-۹]/g, digit => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
    .replace(/[٠-٩]/g, digit => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)))
    .replace(/[٫,]/g, '.')
  if (!/^\d+(?:\.\d+)?$/.test(text)) return null
  const number = Number(text)
  return Number.isFinite(number) ? number : null
}

export function prostateVolume({ length, width, height, unit = 'mm' }) {
  if (!['mm', 'cm'].includes(unit)) return null
  const dimensions = [length, width, height].map(parseMeasurement)
  if (dimensions.some(value => value === null || value <= 0)) return null
  const volume = dimensions.reduce((product, value) => product * value, 0.523) / (unit === 'mm' ? 1000 : 1)
  return Number.isFinite(volume) && volume > 0 ? volume : null
}

export function psaDensity(psa, volume) {
  const value = parseMeasurement(psa)
  if (value === null || value < 0 || !Number.isFinite(volume) || volume <= 0) return null
  const density = value / volume
  return Number.isFinite(density) ? density : null
}
