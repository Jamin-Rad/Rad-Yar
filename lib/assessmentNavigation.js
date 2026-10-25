// A language switch inside practice must also apply to the return-to-lesson link.
export function assessmentReturnHref(from,lang,fallback) {
  const candidate=from||fallback
  const local=typeof candidate==='string' && candidate.startsWith('/') && !candidate.startsWith('//')
  const url=new URL(local?candidate:fallback,'https://rad-yar.com')
  url.searchParams.set('lang',['de','en','fa'].includes(lang)?lang:'de')
  return url.pathname+url.search+url.hash
}
