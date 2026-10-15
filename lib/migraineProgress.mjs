const groups = {
  grundlagen: ['grundlagen'],
  indikation: ['indikation', 'protokoll'],
  'mrt-diagnostik': ['bildmuster', 'stroke-mimic', 'komplikationen'],
  differenzial: ['differenzial', 'befund'],
  training: ['training'],
}

export function migrateMigraineProgress(saved) {
  const read = new Set(Array.isArray(saved) ? saved : [])
  return Object.entries(groups).filter(([, topics]) => topics.every(id => read.has(id))).map(([id]) => id)
}
