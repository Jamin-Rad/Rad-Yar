// A completed combined chapter requires both previous diagnostic chapters.
export function migrateCAAProgress(saved) {
  const result = saved.filter(id => id !== 'mrt-def' && id !== 'boston')
  if (saved.includes('mrt-def') && saved.includes('boston') && !result.includes('mrt-diagnostik')) result.push('mrt-diagnostik')
  return result
}
