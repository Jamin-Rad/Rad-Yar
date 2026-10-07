const MAX_SERIES = 12
const MAX_FRAMES = 120

function cleanString(value, maxLength = 500) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function normalizeFrame(value) {
  const frame = cleanString(value, 500)
  return frame.startsWith('/') ? frame : ''
}

export function normalizeExamMedia(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null

  const series = Array.isArray(value.series)
    ? value.series.slice(0, MAX_SERIES).flatMap((entry, index) => {
        if (!entry || typeof entry !== 'object') return []
        const frames = Array.isArray(entry.frames)
          ? entry.frames.slice(0, MAX_FRAMES).map(normalizeFrame).filter(Boolean)
          : []
        if (!frames.length) return []
        const initialFrame = Math.min(
          frames.length - 1,
          Math.max(0, Number.isInteger(Number(entry.initialFrame)) ? Number(entry.initialFrame) : 0)
        )
        return [{
          id: cleanString(entry.id, 80) || `series-${index + 1}`,
          label: cleanString(entry.label, 120) || `Series ${index + 1}`,
          plane: cleanString(entry.plane, 120),
          frames,
          initialFrame,
        }]
      })
    : []

  if (!series.length) return null
  const source = cleanString(value.source, 800)

  return {
    type: 'case',
    title: cleanString(value.title, 240),
    modality: cleanString(value.modality, 80),
    plane: cleanString(value.plane, 120),
    credit: cleanString(value.credit, 600),
    source: /^https:\/\//i.test(source) ? source : '',
    series,
  }
}

export function caseToExamMedia(item) {
  if (!item || typeof item !== 'object') return null

  let series = []
  if (Array.isArray(item.series) && item.series.length) {
    series = item.series
  } else if (item.sequence?.frames?.length) {
    series = [{
      id: 'primary',
      label: item.plane || item.modality || 'Series',
      plane: item.plane || '',
      frames: item.sequence.frames,
      initialFrame: item.sequence.initialFrame || 0,
    }]
  } else if (Array.isArray(item.images) && item.images.length) {
    series = item.images.map((image, index) => {
      const source = typeof image === 'string' ? image : image?.src
      return {
        id: `phase-${index + 1}`,
        label: typeof image === 'string' ? `${item.modality || 'Image'} ${index + 1}` : image.label,
        plane: item.plane || '',
        frames: source ? [source] : [],
        initialFrame: 0,
      }
    })
  } else if (item.image) {
    series = [{
      id: 'still',
      label: item.plane || item.modality || 'Image',
      plane: item.plane || '',
      frames: [item.image],
      initialFrame: 0,
    }]
  }

  return normalizeExamMedia({
    title: item.title,
    modality: item.modality,
    plane: item.plane,
    credit: item.credit,
    source: item.source,
    series,
  })
}

export function getExamMediaPreview(media) {
  const normalized = normalizeExamMedia(media)
  if (!normalized) return ''
  const firstSeries = normalized.series[0]
  return firstSeries.frames[firstSeries.initialFrame] || firstSeries.frames[0] || ''
}
