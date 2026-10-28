// Semantic boundaries, never viewport dimensions, determine the reading order.
// A tool retains its introduction and following notes. A new topic starts a slide.
export function composeSemanticSlides(nodes) {
  const slides = []
  let current = []
  let hasTopic = false
  const flush = () => {
    if (current.length) slides.push(current)
    current = []
    hasTopic = false
  }
  for (const node of nodes) {
    if (node.kind === 'group') {
      const nested = composeSemanticSlides(node.children)
      if (!nested.length) continue
      if (hasTopic || nested[0].some(item => item.kind === 'question' || item.kind === 'standalone')) flush()
      nested[0] = [...current, ...nested[0]]
      if (nested.at(-1).some(item => item.kind === 'question' || item.kind === 'standalone')) {
        slides.push(...nested)
        current = []
        hasTopic = false
      } else {
        slides.push(...nested.slice(0, -1))
        current = nested.at(-1)
        hasTopic = true
      }
    } else if (node.kind === 'question' || node.kind === 'standalone') {
      flush()
      slides.push([node])
    } else {
      if ((node.kind === 'tool' && hasTopic) || (node.kind === 'heading' && current.some(item => item.kind !== 'heading'))) flush()
      current.push(node)
      if (node.kind === 'tool') hasTopic = true
    }
  }
  flush()
  return slides
}

const TOOL = '[data-book-atomic],[data-learning-tool],[data-case-gallery],[data-lesson-print-case],figure,table,iframe,video,canvas,form,fieldset,[role="application"]'
const CONTAINER = new Set(['DIV', 'SECTION', 'ARTICLE', 'MAIN'])

// Read the existing DOM without cloning, moving or rewriting React-owned nodes.
// Semantic HTML works by default; optional data-book-atomic preserves custom tools.
export function collectSemanticSlides(root) {
  const shells = []
  const tabRoots = new Set([...root.querySelectorAll('[role="tablist"]')]
    .filter(element => !element.closest(TOOL)).map(element => element.parentElement))
  function collect(parent) {
    return [...parent.children].flatMap(element => {
      // Inactive panels remain owned by their original controls. Never flatten
      // a hidden wrapper, which would accidentally reveal its descendants.
      if (element.hidden) return []
      const node = { element, kind: 'content' }
      if (element.matches('[data-book-question]')) return [{ ...node, kind: 'question' }]
      if (element.matches('details,[data-book-slide]')) return [{ ...node, kind: 'standalone' }]
      if (element.matches(TOOL) || tabRoots.has(element)) return [{ ...node, kind: 'tool' }]
      if (element.matches('h1,h2,h3,h4,h5,h6,header')) return [{ ...node, kind: 'heading' }]
      const directText = [...element.childNodes].some(child => child.nodeType === 3 && child.textContent.trim())
      if (!CONTAINER.has(element.tagName) && !element.matches('[data-book-checkpoint]')) return [node]
      if (directText || !element.children.length) return [node]
      shells.push(element)
      const children = collect(element)
      // Chapter bodies/checkpoint wrappers are transparent. Section/group edges
      // represent actual topic boundaries; they cannot share an unrelated slide.
      if (element.matches('[data-book-section],section,article') && !element.matches('[data-book-body]')) {
        return [{ kind: 'group', children }]
      }
      return children
    })
  }
  return { slides: composeSemanticSlides(collect(root)), shells }
}
