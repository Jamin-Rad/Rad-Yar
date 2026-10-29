import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { cameraErrorMessage, clampCameraPosition, clampCameraWidth, stopCameraStream } from '../utils/lehrCamera.js'

test('camera movement stays inside portrait, landscape and offset visual viewports', () => {
  assert.deepEqual(clampCameraPosition({ x: -20, y: -50 }, { width: 176, height: 168 }, { width: 390, height: 844 }), { x: 12, y: 12 })
  assert.deepEqual(clampCameraPosition({ x: 400, y: 900 }, { width: 176, height: 168 }, { width: 390, height: 844 }), { x: 202, y: 664 })
  assert.deepEqual(clampCameraPosition({ x: 2000, y: 900 }, { width: 320, height: 278 }, { width: 1024, height: 768 }), { x: 692, y: 478 })
  assert.deepEqual(clampCameraPosition({ x: 0, y: 0 }, { width: 176, height: 168 }, { width: 390, height: 700, left: 5, top: 50 }), { x: 17, y: 62 })
})

test('orientation changes retain position when possible and handle a tiny viewport', () => {
  assert.deepEqual(clampCameraPosition({ x: 100, y: 100 }, { width: 176, height: 168 }, { width: 768, height: 1024 }), { x: 100, y: 100 })
  assert.deepEqual(clampCameraPosition({ x: 600, y: 900 }, { width: 176, height: 168 }, { width: 320, height: 740 }), { x: 132, y: 560 })
  assert.deepEqual(clampCameraPosition({ x: 50, y: 50 }, { width: 300, height: 300 }, { width: 200, height: 200 }), { x: 12, y: 12 })
})

test('permission, missing device and busy camera failures have actionable messages', () => {
  assert.match(cameraErrorMessage({ name: 'NotAllowedError' }), /nicht erlaubt/)
  assert.match(cameraErrorMessage({ name: 'NotFoundError' }), /Keine Kamera/)
  assert.match(cameraErrorMessage({ name: 'NotReadableError' }), /andere Apps/)
  assert.match(cameraErrorMessage({ name: 'OverconstrainedError' }), /nicht/)
  assert.match(cameraErrorMessage(null), /erneut/)
})

test('stopping the preview stops every track, including late-resolving streams', () => {
  let stopped = 0
  stopCameraStream({ getTracks: () => [{ stop: () => stopped++ }, { stop: () => stopped++ }] })
  assert.equal(stopped, 2)
  assert.doesNotThrow(() => stopCameraStream(null))
})

test('camera is preview-only, scoped to admin Lehr-Mode and cleaned up on exit', () => {
  const recording = readFileSync(new URL('../components/LehrRecordingTools.jsx', import.meta.url), 'utf8')
  const styles = readFileSync(new URL('../components/LehrRecordingTools.module.css', import.meta.url), 'utf8')
  const lehr = readFileSync(new URL('../components/LehrMode.jsx', import.meta.url), 'utf8')
  assert.match(recording, /audio: false/)
  assert.match(recording, /facingMode: \{ ideal: 'user' \}/)
  assert.match(recording, /autoPlay muted playsInline/)
  assert.match(recording, /request !== requestRef.current/)
  assert.match(recording, /const DEFAULT_CAMERA_ZOOM = 0\.5/)
  assert.match(recording, /max=\{MAX_CAMERA_ZOOM\}/)
  assert.match(recording, /aria-label="Kamera-Zoom einstellen"/)
  assert.match(recording, /style=\{\{ '--camera-zoom': zoom \/ DEFAULT_CAMERA_ZOOM \}\}/)
  assert.match(styles, /scaleX\(-1\) scale\(var\(--camera-zoom, 1\)\)/)
  assert.match(recording, /stopCamera\(false\)/)
  assert.match(recording, /addEventListener\('pagehide'/)
  assert.doesNotMatch(recording, /new MediaRecorder|fetch\(|localStorage|sessionStorage/)
  assert.match(lehr, /if \(!isAdmin \|\| isExcluded \|\| !active\) return null/)
  assert.match(lehr, /LehrRecordingTools key=\{pathname\}/)
  assert.match(lehr, /delete document.documentElement.dataset.lehrRecordingReady/)
})

test('teaching preview reserves answer details so revealing results does not move annotations', () => {
  const preview = readFileSync(new URL('../app/admin/exams/ExamAdminClient.jsx', import.meta.url), 'utf8')
  const styles = readFileSync(new URL('../app/admin/exams/page.module.css', import.meta.url), 'utf8')
  assert.match(preview, /data-lehr-anchor/)
  assert.match(preview, /previewStatReserved/)
  assert.match(preview, /previewRevealReserved/)
  assert.match(preview, /previewResultSlot/)
  assert.match(styles, /\.previewStatReserved, \.previewRevealReserved \{ visibility: hidden/)
})

test('camera resizing preserves aspect ratio within desktop, mobile and short viewports', () => {
  assert.equal(clampCameraWidth(430, 16 / 9, { width: 1365, height: 900 }), 430)
  assert.equal(clampCameraWidth(900, 16 / 9, { width: 1365, height: 900 }), 720)
  assert.equal(clampCameraWidth(100, 16 / 9, { width: 1365, height: 900 }), 160)
  assert.equal(clampCameraWidth(600, 16 / 9, { width: 390, height: 844 }), 366)
  assert.equal(clampCameraWidth(600, 3 / 4, { width: 844, height: 390 }), 274.5)
  assert.equal(clampCameraWidth(600, 16 / 9, { width: 140, height: 100 }), 116)
})
