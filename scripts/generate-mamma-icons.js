const sharp = require('sharp')
const path = require('path')

const src = path.join(__dirname, 'mamma-icon-source.svg')
const outDir = path.join(__dirname, '..', 'public', 'mamma')

async function run() {
  const sizes = [
    { file: 'mamma-icon-192.png', size: 192 },
    { file: 'mamma-icon-512.png', size: 512 },
    { file: 'mamma-icon-maskable-512.png', size: 512 },
    { file: 'mamma-apple-touch-icon.png', size: 180 },
    { file: 'app-icon.png', size: 1024 },
  ]
  for (const { file, size } of sizes) {
    await sharp(src, { density: 384 })
      .resize(size, size)
      .png()
      .toFile(path.join(outDir, file))
    console.log('wrote', file)
  }
}

run().catch(e => { console.error(e); process.exit(1) })
