'use client'

import { useEffect, useMemo, useState } from 'react'
import { calculateTopicProgress, topics } from './pruefungsvorbereitung/PruefungClient'
import styles from './mobin.module.css'

export default function MobinProgress() {
  const [progress, setProgress] = useState({})
  const [mounted, setMounted] = useState(false)

  async function refresh() {
    try {
      const res = await fetch('/api/mobin/progress')
      if (res.ok) setProgress(await res.json())
    } catch {}
    setMounted(true)
  }

  useEffect(() => {
    refresh()
    window.addEventListener('mobin-pruefung-progress', refresh)
    return () => window.removeEventListener('mobin-pruefung-progress', refresh)
  }, [])

  const summary = useMemo(() => {
    const topicProgress = topics.map((topic) => calculateTopicProgress(topic, progress[topic.id] || {}))
    const overall = Math.round(topicProgress.reduce((sum, value) => sum + value, 0) / topics.length)
    const started = topicProgress.filter((value) => value > 0).length
    const done = topicProgress.filter((value) => value >= 100).length
    const mcq = topics.reduce(
      (total, topic) => {
        const saved = progress[topic.id] || {}
        return {
          correct: total.correct + (saved.mcqCorrect || 0),
          total: total.total + (saved.mcqTotal || 0),
        }
      },
      { correct: 0, total: 0 },
    )
    return { overall, started, done, mcq }
  }, [progress])

  if (!mounted) return null

  return (
    <section className={styles.progressCard} aria-label="Prüfungsfortschritt">
      <div>
        <span className={styles.eyebrow}>Deutsch Prüfung</span>
        <h2>Fortschritt</h2>
      </div>
      <div className={styles.progressTrackLarge} aria-hidden="true">
        <span style={{ width: `${summary.overall}%` }} />
      </div>
      <div className={styles.progressStatGrid}>
        <span>
          <strong>{summary.overall}%</strong>
          Gesamt
        </span>
        <span>
          <strong>{summary.started}/{topics.length}</strong>
          Themen gestartet
        </span>
        <span>
          <strong>{summary.done}</strong>
          Themen fertig
        </span>
        <span>
          <strong>{summary.mcq.total ? `${summary.mcq.correct}/${summary.mcq.total}` : '0/0'}</strong>
          MCQs richtig
        </span>
      </div>
    </section>
  )
}
