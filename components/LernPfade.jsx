'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './LernPfade.module.css'

const COLORS = [
  { bg: '#fff5eb', border: '#fed7aa', num: '#f97316', icon: '#fff5eb', iconBorder: '#fdba74' },
  { bg: '#f0f9ff', border: '#bae6fd', num: '#0ea5e9', icon: '#f0f9ff', iconBorder: '#7dd3fc' },
  { bg: '#f0fdf4', border: '#bbf7d0', num: '#10b981', icon: '#f0fdf4', iconBorder: '#6ee7b7' },
]

const UEBEN_MODAL = {
  de: { title: 'Womit möchtest du üben?', mcq: 'MCQs', mcqSub: 'Multiple-Choice-Fragen', fall: 'Fallbeispiele', fallSub: 'In Vorbereitung', close: 'Schließen' },
  en: { title: 'What would you like to practice?', mcq: 'MCQs', mcqSub: 'Multiple-choice questions', fall: 'Case Studies', fallSub: 'Coming soon', close: 'Close' },
  fa: { title: 'با چه چیزی می‌خواهید تمرین کنید؟', mcq: 'MCQ', mcqSub: 'سوالات چندگزینه‌ای', fall: 'موارد بالینی', fallSub: 'به زودی', close: 'بستن' },
}

const PRUEFUNG_MODAL = {
  de: { title: 'Prüfungsvorbereitung', msg: 'Dieser Bereich wird gerade vorbereitet und ist bald verfügbar.', close: 'Verstanden' },
  en: { title: 'Exam Preparation', msg: 'This section is currently being prepared and will be available soon.', close: 'Got it' },
  fa: { title: 'آمادگی آزمون', msg: 'این بخش در حال آماده‌سازی است و به زودی در دسترس خواهد بود.', close: 'متوجه شدم' },
}

export default function LernPfade() {
  const { texts, lang } = useLanguage()
  const router = useRouter()
  const [modal, setModal] = useState(null) // null | 'ueben' | 'pruefung'
  const um = UEBEN_MODAL[lang] || UEBEN_MODAL.de
  const pm = PRUEFUNG_MODAL[lang] || PRUEFUNG_MODAL.de

  const handleCard = (i) => {
    if (i === 0) { router.push('/lernen'); return }
    if (i === 1) { setModal('ueben'); return }
    if (i === 2) { setModal('pruefung'); return }
  }

  return (
    <section className={styles.section} id="lernpfade">
      <div className="sLabel">{texts.section1Label}</div>
      <h2 className="sTitle">{texts.section1Title}</h2>
      <p className="sSub">{texts.section1Sub}</p>

      <div className={styles.grid}>
        {texts.pillars.map((p, i) => {
          const c = COLORS[i]
          return (
            <div key={i} className={styles.card}
              style={{ background: c.bg, borderColor: c.border, cursor: 'pointer' }}
              onClick={() => handleCard(i)}>
              <div className={styles.icon} style={{ background: c.icon, border: `1.5px solid ${c.iconBorder}` }}>
                {p.icon}
              </div>
              <div className={styles.num} style={{ color: c.num }}>{p.num}</div>
              <h3 className={styles.title}>{p.title}</h3>
              <p className={styles.desc}>{p.desc}</p>
              <div className={styles.chips}>
                {p.topics.map(t => (
                  <span key={t} className={styles.chip}
                    style={{ borderColor: c.border, color: c.num }}>{t}</span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* ── ÜBEN MODAL ── */}
      {modal === 'ueben' && (
        <div className={styles.overlay} onClick={() => setModal(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalTitle}>{um.title}</div>
            <div className={styles.modalChoices}>
              <Link href="/ueben" className={styles.modalChoice} onClick={() => setModal(null)}>
                <span className={styles.choiceIcon}>🎯</span>
                <div>
                  <div className={styles.choiceName}>{um.mcq}</div>
                  <div className={styles.choiceSub}>{um.mcqSub}</div>
                </div>
                <span className={styles.choiceArr}>→</span>
              </Link>
              <div className={`${styles.modalChoice} ${styles.modalChoiceLocked}`}>
                <span className={styles.choiceIcon}>🏥</span>
                <div>
                  <div className={styles.choiceName}>{um.fall}</div>
                  <div className={styles.choiceSub}>{um.fallSub}</div>
                </div>
                <span className={styles.choiceLock}>🔒</span>
              </div>
            </div>
            <button className={styles.modalClose} onClick={() => setModal(null)}>{um.close}</button>
          </div>
        </div>
      )}

      {/* ── PRÜFUNG MODAL ── */}
      {modal === 'pruefung' && (
        <div className={styles.overlay} onClick={() => setModal(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.notReadyIcon}>🚧</div>
            <div className={styles.modalTitle}>{pm.title}</div>
            <p className={styles.notReadyMsg}>{pm.msg}</p>
            <button className={styles.modalClose} onClick={() => setModal(null)}>{pm.close}</button>
          </div>
        </div>
      )}
    </section>
  )
}
