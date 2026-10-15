import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('shared lesson sections stay rendered and locked open during Lehr-Mode', () => {
  const hook = read('hooks/useLehrModeActive.js')
  const shell = read('components/lesson-template/StandardLessonShell.jsx')
  assert.match(hook, /radyar:lehr-mode-state/)
  assert.match(shell, /const open = lehrMode \|\|/)
  assert.match(shell, /if \(!lehrMode\)/)
  assert.match(shell, /data-lehr-section-managed/)
  assert.match(shell, /hidden=\{!open\}/)
})

test('legacy accordions and details are expanded without cycling managed lessons', () => {
  const enhancer = read('components/LessonEnhancer.jsx')
  const globalStyles = read('app/globals.css')
  assert.match(enhancer, /main:not\(\[data-lesson-progress-managed\]\)/)
  assert.match(enhancer, /main details:not\(\[open\]\)/)
  assert.match(enhancer, /MutationObserver\(scheduleExpansion\)/)
  assert.match(enhancer, /keepSectionsOpen/)
  assert.match(globalStyles, /html\.lehr-mode-active main\[data-lesson-progress-managed\] section\[id\] > \[hidden\]/)
})

test('conditional single-open lessons render every section in Lehr-Mode', () => {
  for (const path of [
    'app/gehirn/vaskulaer/caa/page.js',
    'app/mamma/bildgebung/mrt/laesionscharakterisierung/page.js',
    'app/thorax/fleischner-kriterien/page.js',
    'app/thorax/kardio/kardio-mrt-basics/page.js',
    'app/thorax/kardio/kardio-mrt-indikationen/page.js',
  ]) {
    const source = read(path)
    assert.match(source, /useLehrModeActive/)
    assert.match(source, /lehrMode \|\|/)
  }
})
