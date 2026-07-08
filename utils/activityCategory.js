export function getActivityCategory(pathname = '/') {
  const path = typeof pathname === 'string' ? pathname.split('?')[0] : '/'

  if (path.startsWith('/flashcards')) return 'flashcards'
  if (path.startsWith('/ueben') || path.startsWith('/mcq') || path.startsWith('/faelle')) return 'practice'
  if (
    path.startsWith('/lernen') ||
    path.startsWith('/abdomen') ||
    path.startsWith('/gehirn') ||
    path.startsWith('/lunge') ||
    path.startsWith('/msk') ||
    path.startsWith('/technik') ||
    path.startsWith('/thorax') ||
    path.startsWith('/wirbelsaeule')
  ) return 'lessons'

  return 'other'
}
