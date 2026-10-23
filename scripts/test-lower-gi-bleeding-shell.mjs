import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const route = await readFile('app/abdomen/gi/untere-gi-blutung/page.js', 'utf8')
const shell = await readFile('components/LessonReferenceShell.jsx', 'utf8')

assert.match(route, /mainLandmark/)
assert.doesNotMatch(route, /<main\b|<\/main>/)
assert.doesNotMatch(route, /<h1>\{c\.title\}<\/h1>/)
assert.doesNotMatch(route, /<p>\{c\.subtitle\}<\/p>/)
for (const title of [
  'Phasenvergleich und Befundlokalisation',
  'Phase comparison and localisation',
  'مقایسهٔ فازها و تعیین محل',
]) assert.ok(route.includes(title), `lesson chapter title is localized: ${title}`)
assert.match(shell, /mainLandmark \? <main>\{layout\}<\/main> : layout/)

console.log('Lower-GI-bleeding shell semantics pass: one outer main, no duplicate route title/subtitle, localized teaching chapter title.')
