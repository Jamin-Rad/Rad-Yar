import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const dir = path.join(root, 'public/educational/lesson-design')
const known = { appendicitis: '/abdomen/gi/appendizitis', fmd: '/abdomen/gefaesse/fmd', gist: '/abdomen/gi/gist' }
const registry = JSON.parse(await fs.readFile(path.join(root, 'data/lessonExistingHeroAssets.json'), 'utf8'))
for (const name of (await fs.readdir(dir)).sort()) {
  if (!name.endsWith('.png')) continue
  const input = path.join(dir, name)
  const output = input.replace(/\.png$/, '.webp')
  const previous = await fs.stat(output).catch(() => null)
  const needsEncoding = !previous || previous.mtimeMs < (await fs.stat(input)).mtimeMs
  const sourceInfo = await sharp(input).metadata()
  if (needsEncoding) await sharp(input).webp({ quality: 88, alphaQuality: 100, effort: 5 }).toFile(output)
  const outputInfo = await sharp(output).metadata()
  if (sourceInfo.width !== outputInfo.width || sourceInfo.height !== outputInfo.height || Boolean(sourceInfo.hasAlpha) !== Boolean(outputInfo.hasAlpha)) throw new Error(`Encoding changed dimensions/alpha: ${name}`)
  const stem = name.slice(0, -4)
  const route = known[stem] || '/' + stem.replaceAll('--', '/')
  registry[route] = '/educational/lesson-design/' + path.basename(output)
}
// Keep encoded assets registered after original PNGs have been archived.
for (const name of (await fs.readdir(dir)).filter(name => name.endsWith('.webp')).sort()) {
  const stem = name.slice(0, -5)
  const route = known[stem] || '/' + stem.replaceAll('--', '/')
  registry[route] = '/educational/lesson-design/' + name
}
if (process.argv.includes('--archive')) {
  const archive = path.join(root, 'tmp/lesson-design/original-png')
  await fs.mkdir(archive, { recursive: true })
  for (const name of (await fs.readdir(dir)).filter(name => name.endsWith('.png'))) {
    await fs.rename(path.join(dir, name), path.join(archive, name))
  }
}
await fs.writeFile(path.join(root, 'data/lessonDesignHeroes.js'), '// Topic-specific medical concept illustrations generated with the built-in image tool.\nexport const LESSON_DESIGN_HEROES = ' + JSON.stringify(registry, null, 2) + '\n')
console.log(`Encoded and registered ${Object.keys(registry).length} topic illustrations; original dimensions and alpha retained.`)
