const MIN_ERRORS = 40
const DAMPING = .9

function slope(values, end, window) {
  const center = (window - 1) / 2
  let numerator = 0
  let denominator = 0
  for (let i = 0; i < window; i++) {
    const x = i - center
    numerator += x * values[end - window + i + 1]
    denominator += x * x
  }
  return numerator / denominator
}

// Compare a damped log-price trend against an unchanged-price baseline.
// Use an earlier block to choose the model and a later, disjoint block for its error bands.
export function trendForecast(rows, { horizon, window }) {
  const prices = rows.slice(-520).map(row => row.close)
  if (prices.some(price => !Number.isFinite(price) || price <= 0)) return null
  const maxEnd = prices.length - horizon - 1
  const split = Math.floor((window - 1 + maxEnd) / 2)
  const calibrationStart = split + horizon
  if (split - window + 2 < MIN_ERRORS || maxEnd - calibrationStart + 1 < MIN_ERRORS) return null
  const logs = prices.map(Math.log)
  const slopes = logs.map((_, i) => i >= window - 1 ? slope(logs, i, window) : null)
  const growth = step => DAMPING * (1 - DAMPING ** step) / (1 - DAMPING)
  const predict = (index, step, useTrend) => logs[index] + (useTrend ? slopes[index] * growth(step) : 0)
  function error(start, end, useTrend) {
    let sum = 0
    for (let i = start; i <= end; i++) sum += Math.abs(prices[i + horizon] - Math.exp(predict(i, horizon, useTrend)))
    return sum / (end - start + 1)
  }
  const useTrend = error(window - 1, split, true) < error(window - 1, split, false) * .99
  const points = [{ mid: prices.at(-1), low: prices.at(-1), high: prices.at(-1) }]
  for (let step = 1; step <= horizon; step++) {
    const residuals = []
    for (let i = calibrationStart; i <= maxEnd; i++) residuals.push(logs[i + step] - predict(i, step, useTrend))
    residuals.sort((a, b) => a - b)
    const mid = predict(prices.length - 1, step, useTrend)
    points.push({
      mid: Math.exp(mid),
      low: Math.exp(mid + Math.min(0, residuals[Math.floor((residuals.length - 1) * .1)])),
      high: Math.exp(mid + Math.max(0, residuals[Math.ceil((residuals.length - 1) * .9)])),
    })
  }
  return { points, useTrend, baselineError: error(calibrationStart, maxEnd, false), error: error(calibrationStart, maxEnd, useTrend) }
}
