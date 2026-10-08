'use client'

import { Suspense, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { getCases } from '@/data/cases'
import { useLanguage } from '@/providers/LanguageProvider'
import { getWrongAnswerExplanation } from '@/utils/answerFeedback'
import { caseToExamMedia } from '@/utils/examMedia'
import MedicalSequenceViewer from '@/components/MedicalSequenceViewer'
import quizStyles from '@/app/ueben/quiz/page.module.css'
import styles from './page.module.css'

const REGION_NAMES = {
  de: { msk: 'Muskuloskelettales', thorax: 'Thorax', abdomen: 'Abdomen' },
  en: { msk: 'Musculoskeletal', thorax: 'Thorax', abdomen: 'Abdomen' },
  fa: { msk: 'اسکلتی-عضلانی', thorax: 'توراکس', abdomen: 'شکم' },
}

const UI = {
  de: {
    back: '← Zur Fallauswahl',
    empty: 'Für diese Auswahl sind keine Fälle verfügbar.',
    emptySub: 'Bitte wähle mindestens ein Thema mit verfügbaren Fällen.',
    caseOf: (current, total) => `Fall ${current} von ${total}`,
    check: 'Antwort prüfen',
    next: 'Nächster Fall',
    resultButton: 'Ergebnis anzeigen',
    correct: 'Richtig',
    incorrect: 'Leider falsch',
    selectedAnswer: 'Deine Antwort',
    correctAnswer: 'Richtige Antwort:',
    explanation: 'Warum die richtige Antwort passt',
    whyWrong: 'Warum deine Antwort falsch ist',
    imageFindings: 'Was wir in den Bildern sehen',
    source: 'Originalfall ansehen',
    score: 'Punktestand',
    anamnesis: 'Anamnese',
    result: 'Dein Ergebnis',
    scoreLabel: (score, total) => `${score} von ${total} Fällen richtig`,
    summary: 'Fallübersicht',
    yourAnswer: 'Deine Antwort:',
    rightAnswer: 'Richtig:',
    restart: 'Prüfung wiederholen',
    newSelection: 'Neue Auswahl',
  },
  en: {
    back: '← Back to case selection',
    empty: 'No cases are available for this selection.',
    emptySub: 'Please choose at least one topic with available cases.',
    caseOf: (current, total) => `Case ${current} of ${total}`,
    check: 'Check answer',
    next: 'Next case',
    resultButton: 'Show result',
    correct: 'Correct',
    incorrect: 'Unfortunately incorrect',
    selectedAnswer: 'Your answer',
    correctAnswer: 'Correct answer:',
    explanation: 'Why the correct answer fits',
    whyWrong: 'Why your answer is incorrect',
    imageFindings: 'What the images show',
    source: 'View original case',
    score: 'Score',
    anamnesis: 'Clinical history',
    result: 'Your result',
    scoreLabel: (score, total) => `${score} of ${total} cases correct`,
    summary: 'Case summary',
    yourAnswer: 'Your answer:',
    rightAnswer: 'Correct:',
    restart: 'Repeat exam',
    newSelection: 'New selection',
  },
  fa: {
    back: 'بازگشت به انتخاب کیس ←',
    empty: 'برای این انتخاب کیسی موجود نیست.',
    emptySub: 'حداقل یک موضوع دارای کیس را انتخاب کن.',
    caseOf: (current, total) => `کیس ${current} از ${total}`,
    check: 'بررسی پاسخ',
    next: 'کیس بعدی',
    resultButton: 'نمایش نتیجه',
    correct: 'درست',
    incorrect: 'نادرست',
    selectedAnswer: 'پاسخ شما',
    correctAnswer: 'پاسخ صحیح:',
    explanation: 'چرا پاسخ صحیح درست است',
    whyWrong: 'چرا پاسخ شما نادرست است',
    imageFindings: 'در تصاویر چه می‌بینیم',
    source: 'مشاهده کیس اصلی',
    score: 'امتیاز',
    anamnesis: 'شرح حال',
    result: 'نتیجه شما',
    scoreLabel: (score, total) => `${score} از ${total} کیس درست`,
    summary: 'مرور کیس‌ها',
    yourAnswer: 'پاسخ شما:',
    rightAnswer: 'صحیح:',
    restart: 'تکرار آزمون',
    newSelection: 'انتخاب جدید',
  },
}

function resultColor(score, total) {
  const percentage = total ? score / total : 0
  if (percentage >= 0.8) return '#059669'
  if (percentage >= 0.5) return '#f97316'
  return '#ef4444'
}

function CaseExamContent() {
  const { lang } = useLanguage()
  const searchParams = useSearchParams()
  const ui = UI[lang] || UI.de
  const topicParam = searchParams.get('themen') || ''
  const modalityParam = searchParams.get('modalitaeten') || ''
  const regionIds = (searchParams.get('fach') || '').split(',').filter(Boolean)
  const topicIds = topicParam.split(',').filter(Boolean)
  const modalities = modalityParam.split(',').filter(Boolean)
  const requestedCount = Math.max(1, Number.parseInt(searchParams.get('n') || '1', 10) || 1)
  const cases = useMemo(
    () => getCases(topicIds, modalities, lang, requestedCount),
    [topicParam, modalityParam, lang, requestedCount]
  )

  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [checked, setChecked] = useState(false)
  const [answers, setAnswers] = useState([])
  const [phase, setPhase] = useState('exam')

  const total = cases.length
  const item = cases[current]
  const itemMedia = useMemo(() => caseToExamMedia(item), [item])
  const isLast = current === total - 1
  const score = answers.filter(answer => answer.correct).length
  const progress = total ? ((current + (checked ? 1 : 0)) / total) * 100 : 0
  const regionLabel = regionIds
    .map(id => (REGION_NAMES[lang] || REGION_NAMES.de)[id] || id)
    .join(', ')

  const checkAnswer = () => {
    if (!selected || !item) return
    setChecked(true)
    setAnswers(previous => [
      ...previous.filter(answer => answer.caseId !== item.id),
      { caseId: item.id, selected, correct: selected === item.correct },
    ])
  }

  const nextCase = () => {
    if (isLast) {
      setPhase('result')
      return
    }
    setCurrent(previous => previous + 1)
    setSelected(null)
    setChecked(false)
  }

  const restart = () => {
    setCurrent(0)
    setSelected(null)
    setChecked(false)
    setAnswers([])
    setPhase('exam')
  }

  if (!total) {
    return (
      <main className={quizStyles.page} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
        <div className={quizStyles.empty}>
          <h1 className={quizStyles.emptyTitle}>{ui.empty}</h1>
          <p className={quizStyles.emptySub}>{ui.emptySub}</p>
          <Link href="/faelle" className={quizStyles.emptyBtn}>{ui.back}</Link>
        </div>
      </main>
    )
  }

  if (phase === 'result') {
    const color = resultColor(score, total)
    return (
      <main className={quizStyles.page} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
        <div className={quizStyles.topBar}>
          <Link href="/faelle" className={quizStyles.back}>{ui.back}</Link>
          <span className={quizStyles.topFach}>{regionLabel}</span>
        </div>
        <div className={quizStyles.resultWrap}>
          <div className={quizStyles.scoreCard} style={{ borderColor: color }}>
            <div className={quizStyles.scoreNum} style={{ color }}>
              {score}<span className={quizStyles.scoreTotal}>/{total}</span>
            </div>
            <div className={quizStyles.gradeLabel} style={{ color }}>{ui.result}</div>
            <div className={quizStyles.scoreBar}>
              <div className={quizStyles.scoreBarFill} style={{ width: `${(score / total) * 100}%`, background: color }} />
            </div>
            <div className={quizStyles.scoreDesc}>{ui.scoreLabel(score, total)}</div>
          </div>

          <div className={quizStyles.summaryHeader}>
            <span className={quizStyles.summaryTitle}>{ui.summary}</span>
          </div>
          <div className={quizStyles.summaryList}>
            {cases.map((caseItem, index) => {
              const answer = answers.find(entry => entry.caseId === caseItem.id)
              const correct = answer?.correct
              return (
                <article key={caseItem.id} className={`${quizStyles.summaryItem} ${correct ? quizStyles.sumOk : quizStyles.sumWrong}`}>
                  <div className={quizStyles.sumHead}>
                    <span className={`${quizStyles.sumTag} ${correct ? quizStyles.tagOk : quizStyles.tagErr}`}>{correct ? '✓' : '×'}</span>
                    <span className={quizStyles.sumQ}>{index + 1}. {caseItem.question}</span>
                  </div>
                  {!correct && (
                    <div className={quizStyles.sumAnswers}>
                      <span>{ui.yourAnswer} <strong>{answer?.selected}) {caseItem.options.find(option => option.id === answer?.selected)?.text}</strong></span>
                      <span>{ui.rightAnswer} <strong className={styles.correctText}>{caseItem.correct}) {caseItem.options.find(option => option.id === caseItem.correct)?.text}</strong></span>
                    </div>
                  )}
                  <div className={quizStyles.sumExp}>
                    {correct ? caseItem.explanation : getWrongAnswerExplanation(caseItem, answer?.selected, lang) || caseItem.explanation}
                  </div>
                </article>
              )
            })}
          </div>
          <div className={quizStyles.resultActions}>
            <button className={quizStyles.restartBtn} onClick={restart}>{ui.restart}</button>
            <Link href="/faelle" className={quizStyles.backBtn}>{ui.newSelection}</Link>
          </div>
        </div>
      </main>
    )
  }

  const isCorrect = checked && selected === item.correct
  const selectedOption = item.options.find(option => option.id === selected)
  const correctOption = item.options.find(option => option.id === item.correct)
  const wrongExplanation = getWrongAnswerExplanation(item, selected, lang)
  const imageFindings = item.imageFindings || item.vignette

  return (
    <main className={`${quizStyles.page} ${styles.page}`} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      <div className={`${quizStyles.topBar} ${styles.topBar}`}>
        <Link href="/faelle" className={quizStyles.back}>{ui.back}</Link>
        <div className={`${quizStyles.progressWrap} ${styles.topProgress}`}>
          <div className={quizStyles.progressTrack}>
            <div className={quizStyles.progressFill} style={{ width: `${progress}%` }} />
          </div>
          <span className={quizStyles.progressLabel}>{ui.caseOf(current + 1, total)}</span>
        </div>
        <span className={styles.topScore}>{ui.score}: {score}/{total}</span>
      </div>

      <div className={styles.examShell}>
        <section className={styles.caseIntro} dir={lang === 'fa' ? 'rtl' : 'ltr'} aria-labelledby={`${item.id}-anamnesis`}>
          <div className={styles.caseIntroMeta}>
            <strong id={`${item.id}-anamnesis`}>{ui.anamnesis}</strong>
            <span>{item.modality} · {regionLabel}</span>
          </div>
          <p>{item.vignette}</p>
        </section>

        <div className={styles.examLayout}>
          <article className={styles.questionPanel} dir={lang === 'fa' ? 'rtl' : 'ltr'} aria-labelledby={`${item.id}-question`}>
            <h1 id={`${item.id}-question`} className={styles.question}>{item.question}</h1>
            <div className={styles.options}>
              {item.options.map(option => {
                let className = styles.option
                if (selected === option.id && !checked) className = `${styles.option} ${styles.optionSelected}`
                if (checked && option.id === item.correct) className = `${styles.option} ${styles.optionCorrect}`
                if (checked && selected === option.id && option.id !== item.correct) className = `${styles.option} ${styles.optionWrong}`
                return (
                  <button key={option.id} className={className} disabled={checked} aria-pressed={selected === option.id} onClick={() => setSelected(option.id)}>
                    <span className={styles.optionLetter}>{option.id}</span>
                    <span className={styles.optionText}>{option.text}</span>
                    {checked && option.id === item.correct && <span className={styles.optionMark} aria-hidden="true">✓</span>}
                    {checked && selected === option.id && option.id !== item.correct && <span className={styles.optionMark} aria-hidden="true">×</span>}
                  </button>
                )
              })}
            </div>

            {checked && (
              <section className={`${styles.feedback} ${isCorrect ? styles.feedbackCorrect : styles.feedbackWrong}`} aria-live="polite">
                <header className={styles.feedbackHeader}>
                  <span className={styles.feedbackIcon} aria-hidden="true">{isCorrect ? '✓' : '×'}</span>
                  <strong>{isCorrect ? ui.correct : ui.incorrect}</strong>
                </header>
                {!isCorrect && (
                  <div className={styles.answerComparison}>
                    <div className={styles.answerWrong}>
                      <span>{ui.selectedAnswer}</span>
                      <strong>{selected}) {selectedOption?.text}</strong>
                    </div>
                    <div className={styles.answerCorrect}>
                      <span>{ui.correctAnswer}</span>
                      <strong>{item.correct}) {correctOption?.text}</strong>
                    </div>
                  </div>
                )}
                {!isCorrect && wrongExplanation && (
                  <div className={styles.feedbackSection}>
                    <h2>{ui.whyWrong}</h2>
                    <p>{wrongExplanation}</p>
                  </div>
                )}
                <div className={styles.feedbackSection}>
                  <h2>{ui.imageFindings}</h2>
                  <p>{imageFindings}</p>
                </div>
                <div className={styles.feedbackSection}>
                  <h2>{ui.explanation}</h2>
                  <p>{item.explanation}</p>
                </div>
              </section>
            )}

            <div className={styles.actionRow}>
              {!checked ? (
                <button
                  className={`${styles.checkButton} ${!selected ? styles.buttonDisabled : ''}`}
                  disabled={!selected}
                  onClick={checkAnswer}
                >
                  {ui.check}
                </button>
              ) : (
                <button className={styles.nextButton} onClick={nextCase}>
                  {isLast ? ui.resultButton : ui.next} →
                </button>
              )}
            </div>
          </article>

          <section className={styles.viewerColumn} dir={lang === 'fa' ? 'rtl' : 'ltr'} aria-label={`${item.modality} · ${regionLabel}`}>
            <MedicalSequenceViewer key={item.id} media={itemMedia} language={lang} priority />
          </section>
        </div>
      </div>
    </main>
  )
}

export const dynamic = 'force-dynamic'

export default function CaseExamPage() {
  return (
    <Suspense fallback={<div className={styles.loading}>Loading…</div>}>
      <CaseExamContent />
    </Suspense>
  )
}
