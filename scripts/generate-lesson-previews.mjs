import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { CURRICULUM } from '../data/curriculum.js'
import { LESSON_DESIGN_HEROES } from '../data/lessonDesignHeroes.js'

const { parse } = createRequire(import.meta.url)('next/dist/compiled/babel/parser')
const existingHeroes = JSON.parse(fs.readFileSync('data/lessonExistingHeroAssets.json', 'utf8'))
const roots = new Set(['abdomen', 'becken-m', 'gefaesse', 'gehirn', 'lunge', 'mamma', 'msk', 'technik', 'thorax', 'wirbelsaeule'])
const gatedRoots = new Set([...roots].filter(root => !['becken-m', 'gefaesse'].includes(root)))
const topics = new Map()
const visitTopic = topic => {
  const route = topic.link?.split(/[?#]/)[0]
  if (route?.startsWith('/') && !topics.has(route)) topics.set(route, topic.title)
  for (const child of topic.sub || []) visitTopic(child)
}
for (const area of CURRICULUM) for (const chapter of area.kapitel) for (const topic of chapter.themen) visitTopic(topic)

const readAst = file => parse(fs.readFileSync(file, 'utf8'), { sourceType: 'module', plugins: ['jsx', 'typescript'] }).program
function* walk(node) {
  if (!node || typeof node !== 'object') return
  if (node.type) yield node
  for (const [name, child] of Object.entries(node)) {
    if (['loc', 'start', 'end', 'extra'].includes(name)) continue
    if (Array.isArray(child)) for (const item of child) yield* walk(item)
    else yield* walk(child)
  }
}
const name = node => node?.name ?? node?.value
const prop = (node, key) => node?.properties?.find(p => name(p.key) === key)?.value
const str = node => node?.type === 'StringLiteral' ? node.value.trim() : null
const languages = ['de', 'en', 'fa']
const local = node => {
  if (str(node)) return { de: str(node) }
  const first = value => str(value?.type === 'ArrayExpression' ? value.elements[0] : value)
  const values = node?.type === 'CallExpression' && node.arguments.length === 3
    ? node.arguments.map(str)
    : languages.map(lang => first(prop(node, lang)))
  const entries = languages.map((lang, index) => [lang, values[index]]).filter(([, value]) => value)
  return entries.length ? Object.fromEntries(entries) : null
}
const good = text => text && Object.values(text).some(value => value.length >= 55 && value.length <= 750 && /[.!؟۔]/.test(value))
function extract(files) {
  const nodes = files.map(readAst).map(ast => [...walk(ast)])
  const descriptions = []
  const intros = []
  const paragraphs = []
  const summaries = []
  const headings = []
  for (const tree of nodes) {
    for (const node of tree) {
      if (node.type === 'VariableDeclarator' && name(node.id) === 'metadata') {
        const description = local(prop(node.init, 'description'))
        if (good(description)) descriptions.push(description)
      }
      if (node.type === 'VariableDeclarator' && /^(INTRO|DEFINITION)$/.test(name(node.id))) {
        const excerpt = local(node.init)
        if (good(excerpt)) intros.push(excerpt)
      }
      if (node.type === 'ObjectProperty' && ['summary','takeaways','opening','definition'].includes(name(node.key))) {
        const value = node.value.type === 'ArrayExpression' ? node.value.elements[0] : node.value
        const excerpt = local(value)
        if (good(excerpt)) summaries.push(excerpt)
      }
      if (node.type === 'ObjectProperty' && ['intro', 'definition', 'overview', 'description', 'lead', 'text', 'paragraphs', 'body'].includes(name(node.key))) {
        const value = node.value.type === 'ArrayExpression' ? node.value.elements[0] : node.value
        const excerpt = local(value)
        if (good(excerpt)) paragraphs.push(excerpt)
      }
      if (node.type === 'JSXElement' && name(node.openingElement.name) === 'p') {
        const value = node.children.length === 1 ? node.children[0] : null
        const excerpt = value?.type === 'JSXText' ? { de: value.value.trim() } : local(value?.expression)
        if (good(excerpt)) paragraphs.push(excerpt)
      }
      if (node.type === 'ObjectExpression' && prop(node, 'id')) {
        const title = local(prop(node, 'title') || prop(node, 'label'))
        if (title && Object.values(title).every(value => value.length <= 95)) headings.push(title)
      }
    }
  }
  return { excerpt: intros[0] || paragraphs.find(p => languages.every(lang => p[lang])) || summaries[0] || descriptions[0] || paragraphs[0], headings }
}

// Short introductions for lessons whose text is composed dynamically.
const introductions = {
  '/msk/schulter/arthrose': 'Bei der Glenohumeralarthrose werden Gelenkspalt, Osteophyten und die Form der Gelenkflächen gemeinsam beurteilt. Die Verteilung der Veränderungen hilft bei der Einordnung.',
  '/msk/tumoren/knochenlymphom': 'Ein Knochenlymphom kann das Knochenmark und die angrenzenden Weichteile betreffen. MRT und CT zeigen die Ausdehnung, die Diagnose wird histologisch gesichert.',
  '/technik/grundlagen': 'Die technischen Grundlagen erklären, wie radiologische Bilder entstehen. Sie helfen, Kontrast, Auflösung, Artefakte und die Grenzen eines Verfahrens einzuordnen.',
  '/technik/kontrastmittel/mrt': 'Gadoliniumhaltige Kontrastmittel verändern das MRT-Signal. Die Aussage einer Anreicherung hängt unter anderem von der Sequenz, dem Aufnahmezeitpunkt und dem untersuchten Gewebe ab.',
  '/technik/kontrastmittel/nierenfunktion': 'Bei eingeschränkter Nierenfunktion hängt die Wahl des Kontrastmittels von der Fragestellung, der Nierensituation und dem geplanten Verfahren ab.',
  '/technik/kontrastmittel/roentgen': 'Jodhaltige Kontrastmittel erhöhen die Röntgenabschwächung. In der CT entscheidet der Aufnahmezeitpunkt mit darüber, welche Gefäße und Gewebe sich abgrenzen lassen.',
  '/technik/kontrastmittel/schwangerschaft': 'In Schwangerschaft und Stillzeit wird eine Kontrastmittelgabe anhand der klinischen Fragestellung und des konkreten Wirkstoffs beurteilt.',
  '/technik/qualitaetssicherung-vorkommnisse': 'Diagnostische Referenzwerte helfen, typische Untersuchungsdosen einzuordnen und Optimierungsbedarf zu erkennen. Die Lektion behandelt auch die Bewertung und Dokumentation von Vorkommnissen.',
  '/thorax/anatomie/lungenanatomie': 'Lappen, Segmente und sekundäre Lungenlobuli bilden unterschiedliche anatomische Ebenen. Ihre Orientierung in der CT hilft, Befunde präzise zu lokalisieren.',
  '/thorax/kardio/kardio-mrt-basics': 'Cine-MRT zeigt Bewegung und Pumpfunktion. Perfusionsbildgebung und Gewebesequenzen ergänzen die Funktionsbeurteilung um Informationen zu Durchblutung und Myokard.',
  '/thorax/pulmonale-hypertonie': 'CT und MRT können Hinweise auf pulmonale Hypertonie und ihre Ursache zeigen. Die hämodynamische Einordnung erfolgt anhand der Druckmessung im Rechtsherzkatheter.',
  '/wirbelsaeule/degenerative': 'Degenerative Veränderungen betreffen Bandscheiben, Wirbelendplatten und Facettengelenke. In der Bildgebung kommt es darauf an, eine mögliche Einengung von Spinalkanal, Rezessus oder Neuroforamen genau zu lokalisieren.',
  '/wirbelsaeule/metabolisch/renale-osteodystrophie': 'Renale Osteodystrophie umfasst Knochenveränderungen bei chronischer Nierenerkrankung. Das Bildmuster wird zusammen mit Nierenfunktion und Parametern des Mineralstoffwechsels eingeordnet.',
  '/wirbelsaeule/trauma/bws-lws-frakturen': 'Die CT zeigt Lage und Morphologie thorakolumbaler Frakturen. Beurteile auch die Hinterkante des Wirbelkörpers, den Spinalkanal und Zeichen einer Verletzung der hinteren Strukturen.',
  '/wirbelsaeule/trauma/hws-verletzungen': 'Bei Verletzungen der Halswirbelsäule helfen Achsstellung, Frakturlinien und Gelenkstellung bei der Einordnung. Die MRT ergänzt die CT bei der Beurteilung von Rückenmark und Weichteilen.',
  '/wirbelsaeule/trauma/kraniozervikaler-uebergang': 'Am kraniozervikalen Übergang werden die Stellung von Okziput, Atlas und Axis sowie die benachbarten Gelenke und Bandstrukturen beurteilt.',
}

const result = {}
for (const root of roots) {
  const base = path.join('app', root)
  for (const relative of fs.readdirSync(base, { recursive: true })) {
    if (!/(^|[\\/])page\.(js|jsx|tsx)$/.test(relative)) continue
    const file = path.join(base, relative)
    const route = '/' + path.dirname(file).replaceAll('\\', '/').slice(4)
    const title = topics.get(route)
    const image = LESSON_DESIGN_HEROES[route] || existingHeroes[route]
    if (!title && !image) continue
    if (/\/mcq$|\/rechner(?:\/|$)|\/kaiser-score$/.test(route)) continue
    const directory = path.dirname(file)
    const files = [file]
    const pageSource = fs.readFileSync(file, 'utf8')
    for (const match of pageSource.matchAll(/from ['"](?:@\/data\/|\.\/)([^'"]+)['"]/g)) {
      const target = match[0].includes('@/data/') ? path.join('data', match[1]) : path.join(directory, match[1])
      const imported = [target, target + '.js', target + '.jsx', target + '.mjs'].find(candidate => /\.[cm]?[jt]sx?$/.test(candidate) && fs.existsSync(candidate) && fs.statSync(candidate).isFile())
      if (imported && !/Training|Question|Translation|\/Ui/i.test(imported)) files.push(imported)
    }
    for (const name of ['layout.js', 'layout.jsx']) if (fs.existsSync(path.join(directory, name))) files.push(path.join(directory, name))
    const { excerpt, headings } = extract([...new Set(files)])
    const gated = gatedRoots.has(root) || route === '/gefaesse/anatomie-obere-extremitaet'
    result[route] = { title: typeof title === 'string' ? { de: title } : title || { de: route.split('/').at(-1).replaceAll('-', ' ') }, excerpt: excerpt || (introductions[route] ? { de: introductions[route] } : undefined), image, gated, ...(!excerpt && headings.length ? { headings: headings.slice(0, 3) } : {}) }
  }
}
fs.writeFileSync('data/lessonPreviews.json', '{\n' + Object.entries(result).sort(([a], [b]) => a.localeCompare(b)).map(([route, preview]) => '  ' + JSON.stringify(route) + ': ' + JSON.stringify(preview)).join(',\n') + '\n}\n')
console.log(Object.keys(result).length, 'lessons;', Object.values(result).filter(item => item.excerpt).length, 'authored excerpts')
