import { SHOULDER_MRI_TITLE } from '@/data/shoulderMriChapter'
import ShoulderOverview from './ShoulderOverview'

const descriptions = {
  de: 'Neun Lektionen zur MRT-Planung, Rotatorenmanschette, zum Impingement und zur Schulterinstabilität.',
  en: 'Nine lessons on MRI plane prescription, the rotator cuff, impingement and shoulder instability.',
  fa: '۹ درس دربارهٔ طراحی برش‌های ام‌آر‌آی، روتاتور کاف، ایمپینجمنت و ناپایداری شانه.',
}

export async function generateMetadata({ searchParams }) {
  const requestedLang = (await searchParams)?.lang
  const lang = requestedLang === 'en' || requestedLang === 'fa' ? requestedLang : 'de'
  return { title: SHOULDER_MRI_TITLE[lang] + ' | RadYar', description: descriptions[lang] }
}

export default function ShoulderMriPage() {
  return <ShoulderOverview />
}
