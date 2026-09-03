'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import base from '@/app/abdomen/gi/divertikulitis/page.module.css'
import shared from '../../mrt/basics/page.module.css'
import styles from './page.module.css'
import { ALGORITHM, ASYMMETRY_POINTS, BIRADS, CALC_DISTRIBUTION, CALC_EXAMPLES, CALC_MORPHOLOGY, CASE_STEPS, COMPOSITION, COPY, FINDINGS, L, MASS_GROUPS, SECTIONS, TAKE_HOME, pick } from './content'

const LESSON_ID = 'mammographie-grundlagen'
const LESSON_PATH = '/mamma/bildgebung/mammographie/grundlagen'
const READ_COPY = {
  de: { mark: 'Als gelesen markieren', read: 'Als gelesen markiert', error: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.', signIn: 'Anmelden' },
  en: { mark: 'Mark as read', read: 'Marked as read', error: 'Please sign in to save your learning progress.', signIn: 'Sign in' },
  fa: { mark: 'علامت‌گذاری به‌عنوان خوانده‌شده', read: 'به‌عنوان خوانده‌شده علامت‌گذاری شد', error: 'برای ذخیره پیشرفت لطفاً وارد شوید.', signIn: 'ورود' },
}

function ReadButton({ isRead, onClick, authError, lang }) {
  const copy = READ_COPY[lang] || READ_COPY.de
  return <div className={base.readControl}><button type="button" className={`${base.readButton} ${shared.readButton} ${isRead ? `${base.readButtonActive} ${shared.readButtonActive}` : ''}`} onClick={onClick}><span className={`${base.readCheck} ${shared.readCheck}`}>{isRead ? '✓' : ''}</span><span>{isRead ? copy.read : copy.mark}</span></button>{authError && <div className={base.readError} role="alert"><span>{copy.error}</span><Link href="/sign-in">{copy.signIn}</Link></div>}</div>
}

function Section({ id, number, title, children }) {
  const mobile = useMobileLearningLayout()
  const [open, setOpen] = useState(true)
  useEffect(() => setOpen(!mobile), [mobile, id])
  return <section id={id} className={`${base.section} ${shared.section} ${styles.section}`}><button className={`${base.sectionHeader} ${shared.sectionHeader}`} type="button" onClick={() => setOpen(value => !value)} aria-expanded={open}><span className={shared.sectionHeading}><small>{number}</small><h2>{title}</h2></span><span className={shared.sectionToggle}>{open ? '−' : '+'}</span></button>{open && <div className={`${base.sectionBody} ${shared.sectionBody} ${styles.sectionBody}`}>{children}</div>}</section>
}

function ActionCase({ lang }) {
  const tx = value => pick(value, lang)
  const [step, setStep] = useState(0)
  const [answer, setAnswer] = useState(null)
  const item = CASE_STEPS[step]
  const correct = answer === item.correct
  const choose = index => setAnswer(index)
  const advance = () => { if (step < CASE_STEPS.length - 1) { setStep(value => value + 1); setAnswer(null) } }
  const restart = () => { setStep(0); setAnswer(null) }
  return <div className={styles.caseModule}>
    <header><div><small>{tx(L(`Entscheidung ${step + 1} von 3`, `Decision ${step + 1} of 3`, `تصمیم ${step + 1} از ۳`))}</small><h3>{tx(item.question)}</h3><p>{tx(item.context)}</p></div><strong>{step + 1}/3</strong></header>
    <div className={styles.answers}>{item.options.map((option, index) => <button key={index} type="button" className={`${answer === index ? styles.selected : ''} ${answer !== null && index === item.correct ? styles.correct : ''} ${answer === index && !correct ? styles.wrong : ''}`} onClick={() => choose(index)}><span>{String.fromCharCode(65 + index)}</span>{tx(option)}</button>)}</div>
    {answer !== null && <div className={`${styles.caseFeedback} ${correct ? styles.feedbackCorrect : styles.feedbackWrong}`} role="status"><strong>{correct ? '✓' : '!'}</strong><p>{tx(correct ? item.feedback : item.wrong)}</p></div>}
    {correct && (step < 2 ? <button className={styles.nextButton} type="button" onClick={advance}>{tx(L('Nächste Entscheidung', 'Next decision', 'تصمیم بعدی'))} →</button> : <button className={styles.nextButton} type="button" onClick={restart}>{tx(L('Fall wiederholen', 'Restart case', 'تکرار مورد'))} ↻</button>)}
  </div>
}

export default function MammographieGrundlagenPage() {
  const { lang } = useLanguage()
  const tx = value => pick(value, lang)
  const [activeId, setActiveId] = useState(SECTIONS[0].id)
  const { isRead, toggleRead, authError } = useLessonReadStatus(LESSON_ID)
  const sectionIds = useMemo(() => SECTIONS.map(item => item.id), [])
  const withLang = href => lang === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`

  useEffect(() => {
    const observers = sectionIds.map(id => { const element = document.getElementById(id); if (!element) return null; const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setActiveId(id), { rootMargin: '-18% 0px -72% 0px', threshold: .01 }); observer.observe(element); return observer })
    return () => observers.forEach(observer => observer?.disconnect())
  }, [sectionIds])

  return <main className={`${base.page} ${shared.page} ${styles.page} ${lang === 'fa' ? styles.rtl : ''}`} dir={lang === 'fa' ? 'rtl' : 'ltr'} lang={lang}>
    <header className={base.header}><nav className={`${base.breadcrumb} ${shared.breadcrumb}`} aria-label={tx(COPY.contents)}><Link href={withLang('/')}>RadYar</Link><span>›</span><Link href={withLang('/lernen/mamma')}>{tx(COPY.mamma)}</Link><span>›</span><span>{tx(COPY.imaging)}</span><span>›</span><span>{tx(COPY.mammography)}</span><span>›</span><strong>{tx(COPY.title)}</strong></nav>
      <div className={base.hero}><div className={`${base.heroText} ${shared.heroText} ${styles.heroText}`}><h1>{tx(COPY.title)}</h1><p>{tx(COPY.subtitle)}</p><div className={base.actions}><Link className={`${base.actionBtn} ${shared.actionBtn}`} href={withLang(`/ueben/quiz?fach=mamma&n=10&themen=${LESSON_ID}&from=${encodeURIComponent(withLang(LESSON_PATH))}`)}>🎯 MCQ</Link><Link className={`${base.actionBtn} ${shared.actionBtn}`} href={withLang(`/flashcards/${LESSON_ID}?from=${encodeURIComponent(withLang(LESSON_PATH))}`)}>🧠 {tx(COPY.flashcards)}</Link></div></div>
        <div className={`${base.heroStats} ${styles.heroStats}`}><div className={`${base.heroStat} ${shared.heroStat}`}><strong>Mass</strong><span>Shape · Margin</span><small>Density</small></div><div className={`${base.heroStat} ${shared.heroStat}`}><strong>{tx(L('Kalk', 'Calcifications', 'کلسیم'))}</strong><span>Morphology</span><small>Distribution</small></div><div className={`${base.heroStat} ${shared.heroStat}`}><strong>Assessment</strong><span>BI-RADS</span><small>Management</small></div></div>
      </div></header>
    <div className={base.readBar}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError} lang={lang} /></div>
    <div className={base.layout}><aside className={`${base.sidebar} ${shared.sidebar}`}><div className={base.sideTitle}>{tx(COPY.contents)}</div>{SECTIONS.map(item => <button key={item.id} type="button" className={`${base.sideItem} ${shared.sideItem} ${activeId === item.id ? `${base.sideItemActive} ${shared.sideItemActive}` : ''}`} onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}><span className={shared.sideNumber}>{item.number}</span><strong>{tx(item.label)}</strong></button>)}</aside>
      <div className={base.main}>
        <Section {...SECTIONS[0]} title={tx(SECTIONS[0].label)}><p className={styles.lead}>{tx(L('Eine Mammographie beginnt nicht mit der Frage „Karzinom oder nicht?“. Zuerst wird der sichtbare Befund objektiv beschrieben; erst danach folgen Assessment und Management.', 'Mammography does not begin with “cancer or not?”. First describe the visible finding objectively; assessment and management follow.', 'ماموگرافی با سؤال «سرطان هست یا نه؟» آغاز نمی‌شود. ابتدا یافته قابل مشاهده به‌طور عینی توصیف و سپس ارزیابی و اقدام تعیین می‌شود.'))}</p><div className={styles.findingRail}>{FINDINGS.map((item, index) => <article key={item.key}><span>{String(index + 1).padStart(2, '0')}</span><h3>{tx(item.title)}</h3><p>{tx(item.text)}</p></article>)}</div><div className={styles.rule}><strong>{tx(L('Leitprinzip', 'Guiding principle', 'اصل راهنما'))}</strong><p>{tx(L('Ein BI-RADS-Descriptor ist noch keine Diagnose.', 'A BI-RADS descriptor is not yet a diagnosis.', 'دسکریپتور BI-RADS هنوز تشخیص نیست.'))}</p></div></Section>
        <Section {...SECTIONS[1]} title={tx(SECTIONS[1].label)}><p className={styles.lead}>{tx(L('Die Kategorie beschreibt nicht nur den Drüsengewebsanteil, sondern klinisch vor allem den Masking-Effekt.', 'The category describes not only the amount of fibroglandular tissue but, clinically, its masking effect.', 'این دسته نه‌تنها میزان بافت فیبروگلاندولار، بلکه اثر پنهان‌کنندگی آن را توصیف می‌کند.'))}</p><div className={styles.composition}>{COMPOSITION.map(item => <article key={item.code}><strong>{item.code}</strong><div><h3>{tx(item.text)}</h3><p>{item.official}</p></div></article>)}</div><div className={styles.questionLine}>{tx(L('Kann das vorhandene Drüsengewebe eine relevante Läsion verdecken?', 'Could the existing fibroglandular tissue obscure a relevant lesion?', 'آیا بافت غده‌ای موجود می‌تواند ضایعه مهمی را پنهان کند؟'))}</div></Section>
        <Section {...SECTIONS[2]} title={tx(SECTIONS[2].label)}><div className={styles.massFormula}>Shape <span>→</span> Margin <span>→</span> Density</div><div className={styles.triple}>{MASS_GROUPS.map((group, index) => <article key={index}><span>0{index + 1}</span><h3>{tx(group.title)}</h3><p>{tx(group.items)}</p></article>)}</div><div className={styles.splitNote}><div><strong>Obscured</strong><p>{tx(L('Überlagerndes Gewebe verhindert die Randbeurteilung.', 'Overlying tissue prevents margin assessment.', 'بافت روی‌هم‌افتاده مانع ارزیابی حاشیه است.'))}</p></div><div><strong>Indistinct</strong><p>{tx(L('Der Rand wird gesehen, ist aber tatsächlich unscharf.', 'The margin is visible but truly ill-defined.', 'حاشیه دیده می‌شود، اما واقعاً نامشخص است.'))}</p></div></div><div className={styles.alert}>Irregular + spiculated + high density → {tx(L('hochgradig suspekt', 'highly suspicious', 'بسیار مشکوک'))}</div></Section>
        <Section {...SECTIONS[3]} title={tx(SECTIONS[3].label)}><div className={styles.calcEquation}><div><small>MORPHOLOGY</small><strong>{tx(L('Wie sehen sie aus?', 'What do they look like?', 'چه شکلی هستند؟'))}</strong></div><span>+</span><div><small>DISTRIBUTION</small><strong>{tx(L('Wie sind sie angeordnet?', 'How are they arranged?', 'چگونه توزیع شده‌اند؟'))}</strong></div></div><div className={styles.calcColumns}><ol>{CALC_MORPHOLOGY.map((item, index) => <li key={index}><span>{index + 1}</span>{tx(item)}</li>)}</ol><ol>{CALC_DISTRIBUTION.map((item, index) => <li key={index}><span>{index + 1}</span>{tx(item)}</li>)}</ol></div><div className={styles.calcExamples}>{CALC_EXAMPLES.map((item, index) => <article className={styles[item.tone]} key={index}><span>{tx(item.left)} + {tx(item.right)}</span><strong>{tx(item.level)}</strong></article>)}</div></Section>
        <Section {...SECTIONS[4]} title={tx(SECTIONS[4].label)}><p className={styles.lead}>{tx(L('Nicht jede fokale Verdichtung ist eine Mass. Entscheidend ist, ob der Befund nach Auflösung der Gewebeüberlagerung persistiert.', 'Not every focal density is a mass. The key question is whether it persists after tissue overlap is resolved.', 'هر دانسیته کانونی یک توده نیست. سؤال کلیدی این است که آیا پس از رفع هم‌پوشانی بافت باقی می‌ماند یا خیر.'))}</p><ol className={styles.openList}>{ASYMMETRY_POINTS.map((item, index) => <li key={index}><span>0{index + 1}</span><p>{tx(item)}</p></li>)}</ol><div className={styles.rule}><strong>{tx(L('Merke', 'Remember', 'نکته'))}</strong><p>{tx(L('Das Fehlen einer sichtbaren Mass schließt ein Mammakarzinom nicht aus.', 'Absence of a visible mass does not exclude breast cancer.', 'نبود توده قابل مشاهده، سرطان پستان را رد نمی‌کند.'))}</p></div></Section>
        <Section {...SECTIONS[5]} title={tx(SECTIONS[5].label)}><div className={styles.modalitySplit}><article><small>DBT</small><h3>Tissue overlap → {tx(L('Schichtdarstellung', 'slice display', 'نمایش لایه‌ای'))}</h3><p>{tx(L('Tomosynthese kann Pseudoläsionen auflösen und echte Masses oder Architekturstörungen besser abgrenzen.', 'Tomosynthesis can resolve pseudolesions and better delineate true masses or architectural distortion.', 'توموسنتز می‌تواند ضایعات کاذب را برطرف و توده واقعی یا دیستورشن معماری را بهتر مشخص کند.'))}</p></article><article><small>CEM</small><h3>Morphology + Enhancement</h3><p>{tx(L('Low-Energy-Bilder zeigen die Mammographie-Morphologie; recombined images zeigen die Jodaufnahme.', 'Low-energy images show mammographic morphology; recombined images show iodine uptake.', 'تصاویر کم‌انرژی مورفولوژی ماموگرافی و تصاویر بازترکیب‌شده جذب ید را نشان می‌دهند.'))}</p></article></div><div className={styles.alert}>{tx(L('Kein Enhancement darf suspekte Verkalkungen nicht herabstufen.', 'Absent enhancement must not downgrade suspicious calcifications.', 'نبود Enhancement نباید درجه کلسیفیکاسیون مشکوک را کاهش دهد.'))}</div></Section>
        <Section {...SECTIONS[6]} title={tx(SECTIONS[6].label)}><div className={styles.biradsTable} role="table"><div className={styles.tableHead} role="row"><span>BI-RADS</span><span>{tx(L('Bedeutung', 'Meaning', 'معنی'))}</span><span>Management</span></div>{BIRADS.map(item => <div className={styles.tableRow} role="row" key={item.code}><strong>{item.code}</strong><span>{item.meaning}</span><span>{tx(item.management)}</span></div>)}</div><div className={styles.rule}><strong>BI-RADS 6</strong><p>{tx(L('bedeutet „histologisch gesichert“ – nicht „schlimmer als BI-RADS 5“.', 'means “biopsy-proven” – not “worse than BI-RADS 5”.', 'به معنی «اثبات‌شده با بیوپسی» است، نه «بدتر از BI-RADS 5».'))}</p></div></Section>
        <Section {...SECTIONS[7]} title={tx(SECTIONS[7].label)}><div className={styles.algorithm}>{ALGORITHM.map(item => <article key={item.number}><span>{item.number}</span><h3>{tx(item.title)}</h3><p>{tx(item.text)}</p></article>)}</div></Section>
        <Section {...SECTIONS[8]} title={tx(SECTIONS[8].label)}><ActionCase lang={lang}/><h3 className={styles.takeTitle}>{tx(L('Take-Home Messages', 'Take-home messages', 'نکات کلیدی'))}</h3><ol className={styles.takeHome}>{TAKE_HOME.map((item, index) => <li key={index}><span>{String(index + 1).padStart(2, '0')}</span><strong>{tx(item)}</strong></li>)}</ol></Section>
      </div>
    </div>
  </main>
}
