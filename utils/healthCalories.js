// Shared with the health page: the dashboard never invents its own calorie goal.
export function calculateCaloriePlan(plan = {}, { todayWeight = '', latestWeight = '' } = {}) {
  const planCurrentWeight = parseFloat(plan.currentWeight || todayWeight || latestWeight || 0)
  const planTargetWeight = parseFloat(plan.targetWeight || 0)
  const planWeeks = Math.max(parseInt(plan.weeks) || 1, 1)
  const planHeight = parseFloat(plan.height || 0)
  const planAge = parseInt(plan.age) || 0
  const activityFactor = { low: 1.2, light: 1.375, moderate: 1.55, high: 1.725 }[plan.activity] || 1.55
  const bmr = planCurrentWeight && planHeight && planAge
    ? Math.round(10 * planCurrentWeight + 6.25 * planHeight - 5 * planAge + (plan.sex === 'female' ? -161 : 5))
    : null
  const maintenanceKcal = bmr ? Math.round(bmr * activityFactor) : null
  const planDailyDelta = planCurrentWeight && planTargetWeight
    ? Math.round(((planTargetWeight - planCurrentWeight) * 7700) / (planWeeks * 7))
    : 0
  const recommendedKcal = maintenanceKcal && planTargetWeight
    ? Math.max(plan.sex === 'female' ? 1200 : 1500, maintenanceKcal + planDailyDelta)
    : null
  const planWeeklyChange = planCurrentWeight && planTargetWeight
    ? ((planTargetWeight - planCurrentWeight) / planWeeks).toFixed(2)
    : null
  return { planCurrentWeight, planTargetWeight, planWeeks, maintenanceKcal, planDailyDelta, recommendedKcal, planWeeklyChange }
}

export function foodCaloriesForRecord(record, foods) {
  const catalog = new Map(foods.map(food => [food.id, food]))
  let unknownFoods = 0
  const foodKcal = (Array.isArray(record?.foods) ? record.foods : []).reduce((sum, item) => {
    const food = catalog.get(item?.id)
    if (!food) { unknownFoods += 1; return sum }
    const grams = Number(item.g ?? (item.count != null ? item.count * food.portionG : 0))
    const calories = Number(food.kcalPer100g)
    if (!Number.isFinite(grams) || !Number.isFinite(calories) || grams < 0 || calories < 0) {
      unknownFoods += 1
      return sum
    }
    return sum + Math.round((calories / 100) * grams)
  }, 0)
  const manual = Number(record?.manual_kcal || 0)
  if (!Number.isFinite(manual)) unknownFoods += 1
  return { eatenKcal: foodKcal + (Number.isFinite(manual) ? manual : 0), unknownFoods }
}
