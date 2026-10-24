import Link from 'next/link'
import styles from './page.module.css'

export function getPracticeActions(topic, path, lang, anchor = '') {
  const back = `${path}?lang=${lang}${anchor ? `#${anchor}` : ''}`
  const labels = { de: ['Wissen prüfen', 'Karteikarten'], en: ['Check your knowledge', 'Flashcards'], fa: ['دانش خود را بسنجید', 'فلش‌کارت‌ها'] }[lang]
  return {
    mcq: { label: labels[0], href: `/ueben/quiz?fach=abdomen&n=2&themen=${topic}&lang=${lang}&from=${encodeURIComponent(back)}` },
    flashcards: { label: labels[1], href: `/flashcards/${topic}?lang=${lang}&from=${encodeURIComponent(back)}` }
  }
}

export default function ExistingPracticeActions({ topic, path, lang, anchor, title }) {
  const actions = getPracticeActions(topic, path, lang, anchor)
  return <nav className={styles.practiceLinks} aria-label={title}>
    <strong>{title}</strong>
    <Link href={actions.mcq.href}>{actions.mcq.label}</Link>
    <Link href={actions.flashcards.href}>{actions.flashcards.label}</Link>
  </nav>
}
