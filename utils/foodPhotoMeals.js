export const PHOTO_NUTRIENTS = ['kcal', 'protein', 'carbs', 'fat', 'sugar']
export const roundNutrient = value => Math.round(value * 10) / 10

function text(value, max = 120) {
  if (typeof value !== 'string' || !value.trim() || value.length > max || /data:|base64|https?:\/\//i.test(value)) throw new Error('Bitte gültige Namen und Hinweise eingeben.')
  return value.trim().replace(/[\u0000-\u001f]/g, ' ')
}

function number(value, max, positive = false) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > max || (positive && value === 0)) throw new Error('Bitte gültige, nicht negative Mengen und Nährwerte eingeben.')
  const rounded = roundNutrient(value)
  if (positive && rounded <= 0) throw new Error('Die Menge muss größer als null sein.')
  return rounded
}

export function normalizePhotoMeal(value, requireConfirmed = false) {
  if (!value || typeof value !== 'object' || (requireConfirmed && value.confirmed !== true)) throw new Error('Die Mahlzeit muss zuerst bestätigt werden.')
  if (!Array.isArray(value.items) || !value.items.length || value.items.length > 12) throw new Error('Bitte 1 bis 12 Lebensmittel angeben.')
  const items = value.items.map(item => {
    const cleaned = { name: text(item?.name), g: number(item?.g, 5000, true) }
    for (const key of PHOTO_NUTRIENTS) cleaned[key] = number(item?.[key], key === 'kcal' ? 10000 : 2000)
    if (cleaned.sugar > cleaned.carbs || cleaned.protein + cleaned.carbs + cleaned.fat > cleaned.g + 5) throw new Error('Die Nährwerte passen nicht zur Menge. Bitte die Schätzung prüfen.')
    return cleaned
  })
  const kcal = Math.round(items.reduce((sum, item) => sum + item.kcal, 0))
  const kcalMin = number(value.kcalMin, 100000)
  const kcalMax = number(value.kcalMax, 100000)
  if (kcalMin > kcalMax || kcal < kcalMin - 1 || kcal > kcalMax + 1) throw new Error('Die Kalorienspanne muss den geschätzten Gesamtwert einschließen.')
  if (!['low', 'medium'].includes(value.confidence)) throw new Error('Ungültige Einschätzung der Unsicherheit.')
  if (!Array.isArray(value.assumptions) || value.assumptions.length > 5) throw new Error('Ungültige Hinweise zur Schätzung.')
  return {
    ...(typeof value.id === 'string' && /^photo-[\w-]{1,80}$/.test(value.id) ? { id: value.id } : {}),
    title: text(value.title), items, kcalMin: Math.round(kcalMin), kcalMax: Math.round(kcalMax),
    confidence: value.confidence, assumptions: value.assumptions.map(item => text(item, 240)),
    confirmed: value.confirmed === true, source: 'food-photo-estimate',
  }
}

export function normalizePhotoMealList(value) {
  if (!Array.isArray(value) || value.length > 50) throw new Error('Ungültige Mahlzeitenliste.')
  const meals = value.map(item => normalizePhotoMeal(item, true))
  if (meals.some(meal => !meal.id) || new Set(meals.map(meal => meal.id)).size !== meals.length) throw new Error('Mahlzeiten benötigen eindeutige IDs.')
  return meals
}

export function photoMealTotals(meals) {
  const totals = { kcal: 0, protein: 0, carbs: 0, fat: 0, sugar: 0, invalid: 0 }
  for (const candidate of Array.isArray(meals) ? meals : []) {
    try {
      const meal = normalizePhotoMeal(candidate, true)
      for (const item of meal.items) for (const key of PHOTO_NUTRIENTS) totals[key] += item[key]
    } catch { totals.invalid += 1 }
  }
  for (const key of PHOTO_NUTRIENTS) totals[key] = key === 'kcal' ? Math.round(totals[key]) : roundNutrient(totals[key])
  return totals
}

export function scalePhotoItem(item, grams) {
  const factor = item.g > 0 ? grams / item.g : 1
  return { ...item, g: grams, ...Object.fromEntries(PHOTO_NUTRIENTS.map(key => [key, roundNutrient(item[key] * factor)])) }
}

export function alignPhotoRange(meal, items) {
  const before = meal.items.reduce((sum, item) => sum + (Number(item.kcal) || 0), 0)
  const after = items.reduce((sum, item) => sum + (Number(item.kcal) || 0), 0)
  const factor = before > 0 ? after / before : 1
  return { ...meal, items, kcalMin: Math.min(Math.round(after), Math.round(meal.kcalMin * factor)), kcalMax: Math.max(Math.round(after), Math.round(meal.kcalMax * factor)) }
}
