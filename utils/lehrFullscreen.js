export function pageFullscreenElement() {
  if (typeof document === 'undefined') return null
  return document.fullscreenElement || document.webkitFullscreenElement || null
}

export async function requestPageFullscreen() {
  if (typeof document === 'undefined') return false
  const root = document.documentElement
  const request = root.requestFullscreen || root.webkitRequestFullscreen
  if (!request) return false
  await request.call(root)
  return true
}

export async function exitPageFullscreen() {
  if (typeof document === 'undefined') return
  const exit = document.exitFullscreen || document.webkitExitFullscreen
  if (pageFullscreenElement() && exit) await exit.call(document)
}
