import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import sharp from 'sharp'

const require = createRequire(import.meta.url)
const { LESSON_DESIGN_HEROES: heroes } = require('../data/lessonDesignHeroes.js')
const inventory = JSON.parse(fs.readFileSync('docs/lesson-quality/lesson-design-route-inventory.json', 'utf8'))
const routes = inventory.routes.filter(route => route.renderer !== 'redirect').map(route => route.route)
assert.equal(routes.length, 234)
assert.deepEqual(Object.keys(heroes).sort(), [...routes].sort(), 'Every rendered lesson has one exact topic illustration')
for (const route of routes) {
  const asset = heroes[route]
  assert.match(asset, /\.(?:webp|png|jpe?g)$/i, route + ' must use an actual raster illustration')
  assert.ok(fs.existsSync('public' + asset), route + ' asset exists')
  assert.ok(fs.statSync('public' + asset).size > 1000, route + ' asset is not an empty placeholder')
  const { data, info } = await sharp('public' + asset).resize(64, 64, { fit: 'inside' }).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  let transparent = 0
  for (let offset = 3; offset < data.length; offset += info.channels) if (data[offset] < 16) transparent++
  assert.ok(transparent / (info.width * info.height) > .1, route + ' header needs real transparent surroundings, not an opaque rectangular background')
}
const designed = Object.values(heroes).filter(asset => asset.startsWith('/educational/lesson-design/')).length
console.log(`Hero coverage PASS: 234 exact lesson routes, ${designed} designed/refined illustrations and ${routes.length - designed} retained topic illustrations; every header has genuine transparent surroundings.`)
