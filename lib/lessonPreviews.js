import previews from '@/data/lessonPreviews.json'

export function getLessonPreview(pathname) {
  const path = pathname?.replace(/\/+$/, '')
  return Object.hasOwn(previews, path) ? previews[path] : null
}

export function lessonPreviewPaths() {
  return Object.keys(previews)
}

export const canonicalSite = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rad-yar.com'
