import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { exitPageFullscreen, pageFullscreenElement, requestPageFullscreen } from '../utils/lehrFullscreen.js'

function withDocument(mock, run) {
  const previous = globalThis.document
  globalThis.document = mock
  return Promise.resolve(run()).finally(() => {
    if (previous === undefined) delete globalThis.document
    else globalThis.document = previous
  })
}

test('Lehr-Mode requests fullscreen on the page root', async () => {
  let requested = 0
  await withDocument({
    documentElement: { requestFullscreen: async () => { requested += 1 } },
    fullscreenElement: null,
  }, async () => {
    assert.equal(await requestPageFullscreen(), true)
    assert.equal(requested, 1)
  })
})

test('Lehr-Mode supports WebKit fullscreen and exits cleanly', async () => {
  let requested = 0
  let exited = 0
  await withDocument({
    documentElement: { webkitRequestFullscreen: async () => { requested += 1 } },
    webkitFullscreenElement: { nodeName: 'HTML' },
    webkitExitFullscreen: async () => { exited += 1 },
  }, async () => {
    assert.equal(pageFullscreenElement()?.nodeName, 'HTML')
    assert.equal(await requestPageFullscreen(), true)
    await exitPageFullscreen()
    assert.equal(requested, 1)
    assert.equal(exited, 1)
  })
})

test('unsupported browsers keep the CSS fullscreen fallback', async () => {
  await withDocument({ documentElement: {}, fullscreenElement: null }, async () => {
    assert.equal(await requestPageFullscreen(), false)
    await assert.doesNotReject(exitPageFullscreen())
  })
})

test('Lehr-Mode stays in the browser window while keeping teaching controls and cleanup', () => {
  const lehr = readFileSync(new URL('../components/LehrMode.jsx', import.meta.url), 'utf8')
  assert.match(lehr, /const activate = useCallback/)
  const camera = readFileSync(new URL('../components/LehrRecordingTools.jsx', import.meta.url), 'utf8')
  assert.doesNotMatch(lehr + camera, /ensureFullscreen|requestPageFullscreen|exitPageFullscreen|keepFullscreenLocked|fullscreenchange/)
  assert.match(lehr, /LehrRecordingTools key=\{pathname\}/)
  assert.match(lehr, /Object\.entries\(COLOR_PALETTES\)/)
  assert.match(lehr, /anchorOrigin: anchorOrigin\(anchor, viewport\)/)
  assert.match(lehr, /strokeAnchorOffset\(stroke, viewport\)/)
  assert.doesNotMatch(lehr, /colorMenuOpen|colorTrigger|aria-expanded/)
  assert.match(lehr, /dataset\.lehrRecordingReady = 'true'/)
  assert.match(lehr, /if \(event\.key === 'Escape'\) \{\s*deactivate\(\)\s*return/)
  assert.doesNotMatch(lehr, /onReadyChange|setRecordingReady/)
})
