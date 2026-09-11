// Render the existing logo, without redesigning it. Run with Node and sharp installed.
const fs = require('node:fs/promises')
const path = require('node:path')
const sharp = require('sharp')

async function main() {
  const root = path.resolve(__dirname, '..')
  const source = await fs.readFile(path.join(root, 'public/favicon.svg'))
  const output = path.join(root, 'public/radyar')
  await fs.mkdir(output, { recursive: true })
  await fs.copyFile(path.join(root, 'public/favicon.svg'), path.join(output, 'radyar-logo.svg'))
  await sharp(source, { density: 1536 }).resize(1024, 1024).png()
    .toFile(path.join(output, 'radyar-logo-1024.png'))
  for (const size of [180, 192, 512]) {
    const name = size === 180 ? 'radyar-apple-touch-icon.png' : `radyar-icon-${size}.png`
    await sharp(source, { density: 1536 }).resize(size, size)
      .flatten({ background: '#020617' }).png().toFile(path.join(output, name))
  }
  // Keep the complete circular mark inside the central 80% safe-zone diameter.
  const safeLogo = await sharp(source, { density: 1536 }).resize(384, 384).png().toBuffer()
  await sharp({ create: { width: 512, height: 512, channels: 4, background: '#020617' } })
    .composite([{ input: safeLogo, left: 64, top: 64 }]).png()
    .toFile(path.join(output, 'radyar-icon-maskable-512.png'))
}

main().catch(error => { console.error(error); process.exitCode = 1 })
