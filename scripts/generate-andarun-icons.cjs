const fs = require('node:fs')
const path = require('node:path')
const sharp = require('sharp')

const source = process.argv[2]

if (!source) {
  throw new Error('Usage: node scripts/generate-andarun-icons.cjs <source-image>')
}

const outputDir = path.join(process.cwd(), 'public', 'andarun')
fs.mkdirSync(outputDir, { recursive: true })

const outputs = [
  ['andarun-icon-1024.png', 1024, false],
  ['andarun-icon-512.png', 512, false],
  ['andarun-icon-192.png', 192, false],
  ['andarun-apple-touch-icon.png', 180, true],
  ['andarun-icon-32.png', 32, false],
  ['andarun-icon-maskable-512.png', 512, true],
]

async function render(filename, size, opaque) {
  let image = sharp(source).resize(size, size, { fit: 'cover' })

  if (opaque) {
    image = image.flatten({ background: '#050816' })
  }

  await image.png({ compressionLevel: 9 }).toFile(path.join(outputDir, filename))
}

Promise.all(outputs.map(output => render(...output)))
  .then(() => console.log(`Generated ${outputs.length} Andarun icons in ${outputDir}`))
  .catch(error => {
    console.error(error)
    process.exitCode = 1
  })
