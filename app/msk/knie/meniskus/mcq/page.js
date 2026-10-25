import { redirect } from 'next/navigation'
import registry from '@/data/assessmentQuality/routeLinks.json'

// Keep bookmarked lesson-practice URLs on the maintained quiz consumer.
export default async function LegacyMeniscusQuizPage({ searchParams } = {}) {
  const query = await searchParams || {}
  const requested = Array.isArray(query.lang) ? query.lang[0] : query.lang
  const normalized = typeof requested === 'string' ? requested.toLowerCase().slice(0, 2) : ''
  const lang = ['de', 'en', 'fa'].includes(normalized) ? normalized : null
  const lesson = '/msk/knie/meniskus'
  const params = new URLSearchParams({
    fach: 'msk',
    themen: 'meniskus',
    n: String(registry.counts.meniskus || 10),
    from: lang ? `${lesson}?lang=${lang}` : lesson,
  })
  // Without an explicit language, let the existing provider restore its saved choice.
  if (lang) params.set('lang', lang)
  redirect(`/ueben/quiz?${params}`)
}
