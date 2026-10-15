'use client'

import { useRef } from 'react'
import Image from 'next/image'
import styles from './page.module.css'

const COPY = {
  de: { step: 'Prüfungsschritt', examiner: 'Der Prüfer fragt', reveal: 'Nächste Information aufdecken', reviewReady: 'Fallinformationen zur Nachbesprechung.', ready: 'Alle Informationen liegen vor. Jetzt die Diagnose festlegen.', discussion: 'Mündliche Prüfungsnachfragen · Musterantworten', enlarge: 'Abbildung vergrößern', close: 'Schließen' },
  en: { step: 'Examination step', examiner: 'The examiner asks', reveal: 'Reveal the next information', reviewReady: 'Case information for the debrief.', ready: 'All information is available. Now commit to your diagnosis.', discussion: 'Oral examination follow-ups · model answers', enlarge: 'Enlarge figure', close: 'Close' },
  fa: { step: 'مرحلهٔ آزمون', examiner: 'پرسش ممتحن', reveal: 'نمایش اطلاعات مرحلهٔ بعد', reviewReady: 'اطلاعات کامل کیس برای مرور پس از آزمون.', ready: 'همهٔ اطلاعات ارائه شد؛ اکنون تشخیص خود را انتخاب کنید.', discussion: 'پرسش‌های تکمیلی ممتحن · پاسخ پیشنهادی', enlarge: 'بزرگ‌نمایی تصویر', close: 'بستن' },
}

function StageImage({ stage, ui }) {
  const dialog = useRef(null)
  return <figure className={styles.stageFigure}>
    <button type="button" className={styles.stageImageButton} onClick={() => dialog.current?.showModal()} aria-label={`${ui.enlarge}: ${stage.title}`}><Image unoptimized src={stage.image} alt={stage.imageAlt} width={stage.width} height={stage.height} sizes="(max-width: 640px) 90vw, 850px"/><span>{ui.enlarge} ↗</span></button>
    <figcaption><p>{stage.imageCaption}</p><small>{stage.imageCredit}</small></figcaption>
    <dialog ref={dialog} className={styles.stageDialog} aria-label={stage.title} onClick={event => { if (event.target === dialog.current) dialog.current.close() }}><button type="button" autoFocus onClick={() => dialog.current?.close()}>{ui.close} ×</button><Image unoptimized src={stage.image} alt={stage.imageAlt} width={stage.width} height={stage.height} sizes="95vw"/><p>{stage.imageCaption}</p></dialog>
  </figure>
}

export function ProgressiveCase({ item, revealedCount, onReveal, lang, review = false }) {
  const ui = COPY[lang] || COPY.de
  const complete = revealedCount >= item.stages.length
  const reveal = () => {
    onReveal()
    requestAnimationFrame(() => document.getElementById(`stage-${item.id}-${revealedCount}`)?.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }))
  }
  return <div className={styles.progressiveCase}>
    <h1 id="exam-case-title" className={styles.caseTitle}>{item.title}</h1>
    <p className={styles.scenarioNote}>{item.scenarioNote}</p>
    <div className={styles.stageProgress} aria-live="polite"><span>{ui.step} <bdi dir="ltr">{Math.min(revealedCount, item.stages.length)} / {item.stages.length}</bdi></span><div aria-hidden="true">{item.stages.map((stage, index) => <span key={stage.id} className={index < revealedCount ? styles.stageRevealed : ''}/>)}</div></div>
    <ol className={styles.stageList}>{item.stages.slice(0, revealedCount).map((stage, index) => <li id={`stage-${item.id}-${index}`} key={stage.id} className={styles.stage}>
      <div className={styles.stageHeading}><span>{String(index + 1).padStart(2, '0')}</span><h2>{stage.title}</h2></div>
      <p className={styles.stageNarrative}>{stage.narrative}</p>
      {stage.image ? <StageImage stage={stage} ui={ui}/> : null}
      <div className={styles.examinerPrompt}><strong>{ui.examiner}</strong><p>{stage.task}</p></div>
    </li>)}</ol>
    {!complete ? <button type="button" className={styles.revealButton} onClick={reveal}>{ui.reveal}<span aria-hidden="true">{lang === 'fa' ? '←' : '→'}</span></button> : <p className={styles.readyMessage} role="status">{review ? ui.reviewReady : ui.ready}</p>}
  </div>
}

export function ExaminerDiscussion({ entries, references, lang }) {
  const ui = COPY[lang] || COPY.de
  return <section className={styles.examinerDiscussion}>
    <h3>{ui.discussion}</h3>
    {entries.map((entry, index) => <details key={entry.question}><summary><span>{String(index + 1).padStart(2, '0')}</span>{entry.question}</summary><p>{entry.answer}</p></details>)}
    {references?.length ? <ul className={styles.examReferences}>{references.map(reference => <li key={reference.url}><a href={reference.url} target="_blank" rel="noreferrer">{reference.label} ↗</a></li>)}</ul> : null}
  </section>
}
