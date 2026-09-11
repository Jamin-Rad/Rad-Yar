const assert = require('node:assert/strict')
const sharp = require('sharp')
const base = process.argv[2] || 'http://localhost:3017'

async function main() {
  for (const [route, prefix] of [['/', '/radyar'], ['/lernen', '/radyar'], ['/node-rads', '/node-rads'], ['/kaiser-score', '/kaiser-score'], ['/fleischner', '/fleischner']]) {
    const response = await fetch(base + route)
    assert.equal(response.status, 200, route)
    const html = await response.text()
    const links = html.match(/<link\b[^>]*>/g) || []
    const manifests = links.filter(x => /rel="manifest"/.test(x))
    const apple = links.filter(x => /rel="apple-touch-icon"/.test(x))
    assert.equal(manifests.length, 1, route + ' manifest count')
    const manifestPath = prefix === '/radyar' ? '/manifest.webmanifest' : `${prefix}/manifest.webmanifest`
    assert.ok(manifests[0].includes(`href="${manifestPath}"`), route)
    assert.equal(apple.length, 1, route + ' apple icon count')
    assert.ok(apple[0].includes(`href="${prefix}/`), route)
    console.log('PASS metadata', route)
  }
  const manifest = await (await fetch(base + '/manifest.webmanifest')).json()
  for (const icon of manifest.icons) {
    const response = await fetch(base + icon.src)
    assert.equal(response.status, 200, icon.src)
    const metadata = await sharp(Buffer.from(await response.arrayBuffer())).metadata()
    assert.equal(`${metadata.width}x${metadata.height}`, icon.sizes)
    console.log('PASS image', icon.src, icon.sizes)
  }
}

main().catch(error => { console.error(error); process.exitCode = 1 })
