// Browser-only conversion: resize and re-encode pixels, not the original EXIF/GPS metadata.
export async function prepareFoodPhoto(file) {
  if (!file || file.size > 20 * 1024 * 1024 || !/^(image\/(jpeg|png|webp|heic|heif)|)$/i.test(file.type) || (!file.type && !/\.(jpe?g|png|webp|heic|heif)$/i.test(file.name))) throw new Error('Bitte ein JPEG-, PNG-, WebP- oder HEIC-Foto bis 20 MB auswählen.')
  const url = URL.createObjectURL(file)
  try {
    const image = await new Promise((resolve, reject) => {
      const img = new Image()
      const timer = setTimeout(() => { img.src = ''; reject(new Error('Das Foto konnte nicht geladen werden. Bitte ein JPEG-Foto verwenden.')) }, 15000)
      img.onload = () => { clearTimeout(timer); resolve(img) }
      img.onerror = () => { clearTimeout(timer); reject(new Error('Dieses Bildformat lässt sich hier nicht öffnen. Bitte JPEG/PNG wählen oder einen Screenshot verwenden.')) }
      img.src = url
    })
    if (!image.naturalWidth || !image.naturalHeight || image.naturalWidth * image.naturalHeight > 60000000) throw new Error('Das Foto ist zu groß. Bitte ein kleineres Bild auswählen.')
    const scale = Math.min(1, 1024 / Math.max(image.naturalWidth, image.naturalHeight))
    const canvas = document.createElement('canvas')
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale))
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale))
    const context = canvas.getContext('2d')
    if (!context) throw new Error('Dieses Gerät kann das Foto nicht vorbereiten.')
    context.fillStyle = '#fff'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.drawImage(image, 0, 0, canvas.width, canvas.height)
    const data = canvas.toDataURL('image/jpeg', .8)
    canvas.width = canvas.height = 1
    if (!data.startsWith('data:image/jpeg;base64,') || data.length > 1600000) throw new Error('Das Foto ist zu groß für die Analyse. Bitte ein kleineres Foto auswählen.')
    return data
  } finally { URL.revokeObjectURL(url) }
}
