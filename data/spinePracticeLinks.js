export function spinePracticeActions(id, route, lang) {
  const from = encodeURIComponent(`${route}?lang=${lang}`)
  const labels = { de: ['Wissen prüfen', 'Karteikarten'], en: ['Check your knowledge', 'Flashcards'], fa: ['دانش خود را بسنجید', 'فلش‌کارت‌ها'] }[lang] || ['Wissen prüfen', 'Karteikarten']
  return { mcq: { label: labels[0], href: `/ueben/quiz?fach=wirbelsaeule&n=1&themen=${id}&lang=${lang}&from=${from}` }, flashcards: { label: labels[1], href: `/flashcards/${id}?lang=${lang}&from=${from}` } }
}
