import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import sharp from 'sharp'

const root = new URL('../public/fatima/todo/', import.meta.url)
test('Fatemeh ToDo installs and launches independently of RadYar and Jaminova', async () => {
  const manifest = JSON.parse(await readFile(new URL('manifest.webmanifest', root), 'utf8'))
  assert.equal(manifest.id, '/fatima/todo')
  assert.equal(manifest.start_url, '/fatima/todo')
  assert.equal(manifest.scope, '/fatima/todo')
  assert.equal(manifest.short_name, 'Fatemeh ToDo')
  assert.equal(manifest.display, 'standalone')
  for (const icon of manifest.icons) {
    assert.ok(icon.src.startsWith('/fatima/todo/'))
    const info = await sharp(await readFile(new URL(icon.src.slice('/fatima/todo/'.length), root))).metadata()
    assert.equal(`${info.width}x${info.height}`, icon.sizes)
    assert.equal(info.hasAlpha, false)
  }
})

test('Apple home-screen icon and page metadata override parent defaults', async () => {
  const page = await readFile(new URL('../app/fatima/todo/page.js', import.meta.url), 'utf8')
  assert.match(page, /manifest: '\/fatima\/todo\/manifest.webmanifest\?v=1'/)
  assert.match(page, /appleWebApp: \{ capable: true, title: 'Fatemeh ToDo'/)
  assert.match(page, /apple: \[\{ url: '\/fatima\/todo\/icon-180.png'/)
  const info = await sharp(await readFile(new URL('icon-180.png', root))).metadata()
  assert.equal(info.width, 180)
  assert.equal(info.height, 180)
  assert.equal(info.hasAlpha, false)
})
