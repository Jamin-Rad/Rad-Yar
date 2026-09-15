export function summarizeTimerModalities(timers, modalities) {
  const byModality = new Map(modalities.map(modality => [modality, { modality, count: 0, totalMs: 0 }]))
  for (const timer of timers) {
    const stat = byModality.get(timer.modality)
    if (!stat) continue
    stat.count += Number(timer.count) || 1
    stat.totalMs += Number(timer.durationMs) || 0
  }
  return modalities.map(modality => {
    const stat = byModality.get(modality)
    return { ...stat, avg: stat.count ? Math.round(stat.totalMs / stat.count) : 0 }
  })
}

export function formatWorkHours(ms) {
  const totalMinutes = Math.floor(Math.max(0, ms) / 60000)
  return `${Math.floor(totalMinutes / 60)} Std. ${String(totalMinutes % 60).padStart(2, '0')} Min.`
}
