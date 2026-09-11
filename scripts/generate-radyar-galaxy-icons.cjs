const fs = require('node:fs/promises')
const path = require('node:path')
const sharp = require('sharp')

async function main() {
  const output = path.resolve(__dirname, '../public/radyar')
  const source = await fs.readFile(path.join(output, 'radyar-galaxy-icon.png'))
  for (const size of [32, 180, 192, 512]) {
    await sharp(source).resize(size, size).png()
      .toFile(path.join(output, `radyar-galaxy-icon-${size}.png`))
  }
  // Additional padding keeps the artwork within Android's maskable safe zone.
  const safeLogo = await sharp(source).resize(384, 384).png().toBuffer()
  await sharp({ create: { width: 512, height: 512, channels: 4, background: '#03172e' } })
    .composite([{ input: safeLogo, left: 64, top: 64 }]).png()
    .toFile(path.join(output, 'radyar-galaxy-icon-maskable-512.png'))
}

main().catch(error => { console.error(error); process.exitCode = 1 })
