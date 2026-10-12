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
