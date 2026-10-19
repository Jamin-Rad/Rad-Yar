import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { execFileSync, spawn } from 'node:child_process'
import { createServer } from 'node:net'
import { once } from 'node:events'
import { setTimeout as delay } from 'node:timers/promises'
import { MSK_BONE_LYMPHOMA_LESSON as lesson } from '../data/mskBoneLymphomaLesson.js'

const root = process.cwd()
const route = '/msk/tumoren/knochenlymphom'
const issues = []
const locales = ['de', 'en', 'fa']
const inspectLocales = (value, path = 'lesson') => {
  if (Array.isArray(value)) return value.forEach((entry, index) => inspectLocales(entry, `${path}[${index}]`))
  if (!value || typeof value !== 'object') return
  const isLocalized = locales.some(locale => locale in value)
  if (isLocalized) {
    for (const locale of locales) if (typeof value[locale] !== 'string' || !value[locale].trim()) issues.push(`${path}: missing ${locale}`)
    return
  }
  for (const [key, entry] of Object.entries(value)) inspectLocales(entry, `${path}.${key}`)
}

inspectLocales({ title: lesson.title, alt: lesson.alt, intro: lesson.intro, chapters: lesson.chapters, takeHome: lesson.takeHome, case: lesson.case, references: lesson.references, notice: lesson.notice })
assert.deepEqual(issues, [], issues.join('\n'))
assert.equal(lesson.chapters.length, 4)
assert.equal(lesson.case.answerIndex, 0)
assert.equal(lesson.case.options.length, 3)
assert.ok(lesson.chapters.every(chapter => chapter.source && chapter.rows.length >= 2))
assert.ok(lesson.chapters.filter(chapter => chapter.figure).length >= 2)
const mriFigure = lesson.chapters.find(chapter => chapter.id === 'mri')?.figure
assert.deepEqual(mriFigure?.panelLabels?.map(label => locales.map(locale => label[locale])), [
  ['Sagittal T1', 'Sagittal T1', 'ساژیتال T1'],
  ['Sagittal T2', 'Sagittal T2', 'ساژیتال T2'],
  ['Sagittal PD-Fettsättigung', 'Sagittal PD fat-suppressed', 'ساژیتال PD با سرکوب چربی'],
])
const lessonComponent = await readFile(`${root}/app/msk/tumoren/knochenlymphom/Lesson.jsx`, 'utf8')
const lessonCss = await readFile(`${root}/app/msk/tumoren/knochenlymphom/page.module.css`, 'utf8')
assert.ok(lessonComponent.includes('className={styles.figurePanelLabels} dir="ltr"'), 'MRI panel column order remains left-to-right under the Persian RTL parent')
assert.ok(lessonComponent.includes("<span key={index} dir={rtl ? 'rtl' : 'ltr'}>"), 'each panel label keeps its own locale direction')
assert.match(lessonCss, /\.figurePanelLabels\{[^}]*direction:ltr/)
const radiographText = lesson.chapters.find(chapter => chapter.id === 'radiograph').rows.flat().map(cell => Object.values(cell).join(' ')).join(' ')
assert.ok(!/50\s*[–-]\s*70|50\s+to\s+70|۵۰\s*تا\s*۷۰/.test(radiographText), 'the disputed age range stays omitted')
for (const chapter of lesson.chapters) {
  if (chapter.figure) assert.ok(existsSync(`${root}/public${chapter.figure.src}`), `missing figure ${chapter.figure.src}`)
}
assert.ok(existsSync(`${root}/public${lesson.heroImage}`), 'missing hero schematic')
const svg = await readFile(`${root}/public/${lesson.heroImage.slice(1)}`, 'utf8')
assert.match(svg, /<svg[\s>]/)
assert.match(svg, /cortical|Kortikalis/i)
const ledger = await readFile(`${root}/docs/lesson-quality/msk-knochenlymphom-pbl-pp100-101.md`, 'utf8')
assert.match(ledger, /PDF S\.100/)
assert.match(ledger, /PDF S\.101/)
assert.match(ledger, /PBL-SRC-16/)
assert.match(ledger, /Sechs-Monats-Formulierung/)
assert.match(ledger, /keine Spanne als maßgeblich/i)
assert.match(ledger, /eingebetteten Mini-Fall/)
const curriculum = await readFile(`${root}/data/curriculum.js`, 'utf8')
const topic = curriculum.split(/\r?\n/).find(line => line.includes("id: 'knochenlymphom'"))
assert.ok(topic, 'exact curriculum lesson entry exists')
assert.match(topic, /link: '\/msk\/tumoren\/knochenlymphom'/)
assert.match(topic, /ready: true/)
assert.match(topic, /inProgress: true/)
assert.match(topic, /updatedAt: '2026-10-20'/)
assert.ok(!/mcqLink|flashcardLink/.test(topic), 'no external assessment links are claimed')

const portProbe = createServer()
portProbe.listen(0, '127.0.0.1')
await once(portProbe, 'listening')
const port = portProbe.address().port
await new Promise((resolve, reject) => portProbe.close(error => error ? reject(error) : resolve()))

const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'dev', '-p', String(port)], {
  cwd: root,
  stdio: 'inherit',
  windowsHide: true,
  env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
})

try {
  let response
  let lastError
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      response = await fetch(`http://localhost:${port}${route}`)
      if (response.status !== 503) break
    } catch (error) {
      lastError = error
    }
    await delay(1000)
  }
  assert.ok(response, `Next dev server did not respond: ${lastError || 'no response'}`)
  const html = await response.text()
  assert.equal(response.status, 200, `SSR route returned ${response.status}: ${html.slice(0, 1600)}`)
  assert.match(html, /Melde dich an, um weiterzulernen/, 'MSK member access gate should remain active')
  assert.ok(!html.includes(lesson.title.de), 'gated lesson content should not render before access')
  for (const src of [lesson.heroImage, ...lesson.chapters.filter(chapter => chapter.figure).map(chapter => chapter.figure.src)]) {
    const asset = await fetch(`http://localhost:${port}${src}`)
    assert.equal(asset.status, 200, `lesson asset failed: ${src}`)
  }
  console.log(`PBL author checks passed: DE/EN/FA field coverage, source ledger, figures and local assets; ${route} SSR returned 200 behind its existing member gate.`)
} finally {
  if (server.exitCode === null && server.signalCode === null) {
    if (process.platform === 'win32' && server.pid) {
      try { execFileSync('taskkill', ['/PID', String(server.pid), '/T', '/F'], { stdio: 'ignore' }) } catch { server.kill('SIGTERM') }
    } else server.kill('SIGTERM')
    await Promise.race([once(server, 'exit').catch(() => {}), delay(5000)])
  }
  let released = false
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const probe = createServer()
    try {
      await new Promise((resolve, reject) => probe.once('error', reject).listen(port, '127.0.0.1', resolve))
      await new Promise((resolve, reject) => probe.close(error => error ? reject(error) : resolve()))
      released = true
      break
    } catch {
      try { probe.close() } catch {}
      await delay(100)
    }
  }
  assert.ok(released, `test server did not release ephemeral port ${port}`)
}
