export function clampCameraWidth(width, aspectRatio, viewport, padding = 12) {
  const maxWidth = Math.max(1, Math.min(720, viewport.width - padding * 2, (viewport.height - padding * 2) * aspectRatio))
  const minWidth = Math.min(160, maxWidth)
  return Math.min(maxWidth, Math.max(minWidth, width))
}

export function clampCameraPosition(position, size, viewport, padding = 12) {
  const minX = (viewport.left || 0) + padding
  const minY = (viewport.top || 0) + padding
  const maxX = Math.max(minX, (viewport.left || 0) + viewport.width - size.width - padding)
  const maxY = Math.max(minY, (viewport.top || 0) + viewport.height - size.height - padding)
  return {
    x: Math.min(maxX, Math.max(minX, position.x)),
    y: Math.min(maxY, Math.max(minY, position.y)),
  }
}

export function cameraErrorMessage(error) {
  switch (error?.name) {
    case 'NotAllowedError': return 'Kamerazugriff nicht erlaubt. Bitte erlaube die Kamera in den Safari-/Website-Einstellungen und versuche es erneut.'
    case 'NotFoundError': return 'Keine Kamera gefunden. Bitte prüfe, ob dein Gerät eine Kamera bereitstellt.'
    case 'NotReadableError': return 'Die Kamera ist gerade nicht verfügbar. Schließe andere Apps, die sie verwenden, und versuche es erneut.'
    case 'OverconstrainedError': return 'Diese Kamera unterstützt die gewünschte Ansicht nicht.'
    default: return 'Die Kamera konnte nicht gestartet werden. Bitte versuche es erneut.'
  }
}

export function stopCameraStream(stream) {
  stream?.getTracks().forEach(track => track.stop())
}

// Optional source controls: an unavailable capability must never block preview.
export async function widenCameraTrack(track) {
  if (typeof track?.applyConstraints !== 'function') return
  let capabilities
  try { capabilities = track.getCapabilities?.() || {} } catch { return }
  const apply = extra => {
    const current = { ...(track.getConstraints?.() || {}) }
    delete current.aspectRatio
    delete current.height
    return track.applyConstraints({ ...current, ...extra })
  }
  if (capabilities.resizeMode?.includes('none')) {
    try { await apply({ resizeMode: { exact: 'none' } }) } catch { /* Keep the available stream. */ }
  }
  const minimumZoom = capabilities.zoom?.min
  if (Number.isFinite(minimumZoom) && minimumZoom >= 0) {
    try { await apply({ advanced: [{ zoom: minimumZoom }] }) } catch { /* Zoom may be unavailable or permission-limited. */ }
  }
}
