export const HOME_ANATOMY_SRC = '/body-anatomy-clean.png'
export const HOME_MOTION_EASING = 'cubic-bezier(.45, 0, .25, 1)'
export const HOME_MOTION_DURATION = 1450

let pendingArrival
let pendingReturn

export function isPlainNavigation(event) {
  return !event.defaultPrevented && event.button === 0 &&
    !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey
}

export function captureHomeArrival(event) {
  if (!isPlainNavigation(event)) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const bounds = document.querySelector('[data-home-anatomy]')?.getBoundingClientRect()
  const isVisible = bounds && bounds.width > 0 && bounds.height > 0 &&
    bounds.bottom > 0 && bounds.top < window.innerHeight

  pendingArrival = {
    capturedAt: performance.now(),
    bounds: isVisible ? bounds : null,
  }
}

export function takeHomeArrival() {
  const arrival = pendingArrival
  pendingArrival = undefined
  return arrival && performance.now() - arrival.capturedAt < 15000 ? arrival : null
}

export function captureHomeReturn(anatomy) {
  pendingReturn = {
    capturedAt: performance.now(),
    bounds: anatomy.getBoundingClientRect(),
    opacity: getComputedStyle(anatomy).opacity,
  }
}

export function takeHomeReturn() {
  const arrival = pendingReturn
  pendingReturn = undefined
  return arrival && performance.now() - arrival.capturedAt < 15000 ? arrival : null
}
