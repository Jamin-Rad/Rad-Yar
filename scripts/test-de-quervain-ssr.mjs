import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { execFileSync, spawn } from 'node:child_process'
import { setTimeout as delay } from 'node:timers/promises'

const root = process.cwd()
const route = '/msk/hand/de-quervain'
const port = 3192
const page = await readFile(`${root}/app/msk/hand/de-quervain/page.js`, 'utf8')
const data = await readFile(`${root}/data/deQuervainLesson.js`, 'utf8')
const svg = await readFile(`${root}/public/educational/de-quervain/first-extensor-compartment.svg`, 'utf8')
const ledger = await readFile(`${root}/docs/lesson-quality/de-quervain-msk-p40-p42.md`, 'utf8')
const curriculum = await readFile(`${root}/data/curriculum.js`, 'utf8')

assert.match(page, /LessonHero/)
assert.match(page, /usePersistedSectionProgress/)
assert.match(page, /aria-expanded/)
assert.match(page, /aria-pressed/)
assert.match(data, /answerIndex: 0/)
assert.match(data, /Finkelstein/)
assert.match(data, /Eichhoff/)
assert.match(data, /kein beweisender Befund/)
assert.match(data, /does not provide a sufficiently developed ultrasound criteria list/)
assert.match(data, /معیارهای سونوگرافی اضافه نشده‌اند/)
assert.match(svg, /APL/)
assert.match(svg, /EPB/)
const visibleSvg = svg.replace(/<!--[\s\S]*?-->/g, '')
assert.doesNotMatch(visibleSvg, /Dorsal wrist|Radius|Radial styloid|extensor compartment|abductor pollicis|De Quervain/i)
assert.match(svg, /aria-hidden="true"/)
assert.match(curriculum, /\{ id: 'de-quervain',[^\n]*link: '\/msk\/hand\/de-quervain',[^\n]*ready: true, inProgress: true/)
assert.match(data, /M\. abductor pollicis longus/)
assert.match(page, /عضلهٔ دورکنندهٔ بلند شست/)
for (const [locale, required] of Object.entries({
  de: ['ersten Strecksehnenfach', 'PD-FS oder T2-FS', 'Sehnenscheide'],
  en: ['first extensor compartment', 'PD-FS or T2-FS', 'tendon sheath'],
  fa: ['کمپارتمان اول اکستانسور', 'PD-FS یا T2-FS', 'غلاف تاندون'],
})) {
  for (const phrase of required) assert.ok(data.includes(phrase), `${locale} translation missing ${phrase}`)
}
assert.match(ledger, /42 \/ 41/)
assert.match(ledger, /Browser QA must be completed/)

if (process.env.DEQUERVAIN_SKIP_SSR === '1') {
  console.log('Static lesson/source/localization/curriculum assertions passed; browser SSR probe was explicitly skipped.')
  process.exit(0)
}

const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'dev', '-p', String(port)], {
  cwd: root,
  stdio: 'ignore',
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
    } catch (error) { lastError = error }
    await delay(1000)
  }
  assert.ok(response, `Next dev server did not respond: ${lastError || 'no response'}`)
  assert.equal(response.status, 200, `SSR route returned ${response.status}`)
  const html = await response.text()
  assert.ok(html.includes('Melde dich an, um weiterzulernen'), 'route should preserve the normal member-access gate')
  assert.ok(!html.includes('Tendovaginitis de Quervain'), 'gated lesson content must not render before access')
  console.log(`SSR route ${route} returned 200 behind its normal access gate; source, diagram, self-check, and three-language assertions passed.`)
} finally {
  try { execFileSync('taskkill', ['/PID', String(server.pid), '/T', '/F'], { stdio: 'ignore' }) } catch {}
}
