export const HOME_ANATOMY_SRC = '/body-anatomy-clean.png'

let pendingArrival

export function captureHomeArrival(event) {
  if (event.defaultPrevented || event.button !== 0 ||
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
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
