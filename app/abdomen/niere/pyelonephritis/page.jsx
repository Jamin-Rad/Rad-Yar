'use client'

import Image from 'next/image'
import { useState } from 'react'
import ExistingPracticeActions, { getPracticeActions } from '../../gi/ulkuserkrankung/ExistingPracticeActions'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { PYELONEPHRITIS_LESSON as lesson } from '@/data/pyelonephritisLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => value?.[lang] ?? value?.de ?? ''
const labels = {
  path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'), progress: L('gelesen', 'read', 'خوانده‌شده'),
  continue: L('Lektion fortsetzen', 'Continue lesson', 'ادامهٔ درس'),
  completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'این بخش را خواندم'), completed: L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده'),
  open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'), close: L('Schließen', 'Close', 'بستن'),
  takeHome: L('Drei Regeln mitnehmen', 'Three rules to remember', 'سه نکته برای یادآوری'),
}

function Icon({ id }) {
  const paths = {
    pattern: 'M4 12c0-6 4-9 8-9s8 3 8 9-4 9-8 9-8-3-8-9Zm4 0h8',
    spread: 'M12 3v18m-6-6 6 6 6-6M6 7l6-4 6 4',
    report: 'M5 5h14M5 12h14M5 19h14',
    summary: 'M12 2l1.5 5.1L19 9l-5.5 1.9L12 16l-1.5-5.1L5 9l5.5-1.9z',
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.pattern}/></svg>
}

function Decision({ lang }) {
  const [answer, setAnswer] = useState(null)
  const q = lesson.check
  return <div className={styles.decision}>
    <h3>{pick(L('Selbstcheck: Gas im Retroperitoneum', 'Self-check: gas in the retroperitoneum', 'خودآزمایی: گاز در رتروپریتوئن'), lang)}</h3>
    <p>{pick(q.question, lang)}</p>
    <fieldset><legend>{pick(L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید'), lang)}</legend>
      {q.options.map((option, index) => <label key={index}><input type="radio" name="pyelo-retroperitoneal-gas" checked={answer === index} onChange={() => setAnswer(index)}/><span>{pick(option, lang)}</span></label>)}
    </fieldset>
    {answer !== null ? <p className={styles.feedback} role="status"><strong>{pick(answer === q.answer ? L('Richtig. ', 'Correct. ', 'درست است. ') : L('Noch einmal prüfen. ', 'Review this once more. ', 'دوباره بررسی کنید. '), lang)}</strong>{pick(answer === q.answer ? q.explanation : q.retry, lang)}</p> : null}
  </div>
}

function Figure({ figure, lang }) {
  return <figure className={styles.figure}>
    <Image src={figure.src} alt={pick(figure.alt, lang)} width={figure.width} height={figure.height} sizes="(max-width: 700px) 100vw, 600px" />
    <figcaption>{pick(figure.caption, lang)}</figcaption>
  </figure>
}

function ParenchymaSchematic({ lang }) {
  const caption = pick(L('Schema: keilförmige Minderanreicherung in einem Nierenabschnitt; es erklärt nur das Muster und zeigt keinen Patienten.', 'Schematic: wedge-shaped reduced enhancement in part of a kidney; it explains the pattern and does not depict a patient.', 'شماتیک: کاهش تقویت گوه‌ای در بخشی از کلیه؛ فقط الگو را توضیح می‌دهد و تصویر بیمار نیست.'), lang)
  const title = pick(L('Schematische keilförmige Parenchymveränderung', 'Schematic wedge-shaped parenchymal change', 'شماتیک تغییر گوه‌ای پارانشیم'), lang)
  return <figure className={styles.figure}>
    <svg className={styles.schematic} viewBox="0 0 440 300" role="img" aria-labelledby="pyelo-parenchyma-title" focusable="false">
      <title id="pyelo-parenchyma-title">{title}</title>
      <path d="M225 30c-59-27-136 3-160 65-24 63-7 139 41 173 37 26 81 23 115-9 22-20 29-47 27-76-2-33 10-56 27-79 22-31 7-62-50-74Z" fill="#d9f0ef" stroke="#2f7f88" strokeWidth="7"/>
      <path d="M197 75c-31 2-58 21-71 49l-28 59 56-20c25-9 43-21 53-42 8-17 7-33-10-46Z" fill="#e98272" stroke="#ad4e47" strokeWidth="4"/>
      <path d="M227 113c-10 22-9 48-4 69" stroke="#577580" strokeWidth="6" strokeLinecap="round"/>
      <path d="M219 180c8 23 8 45 0 67" stroke="#577580" strokeWidth="5" strokeLinecap="round"/>
    </svg>
    <figcaption>{caption}</figcaption>
  </figure>
}

export default function PyelonephritisPage() {
  const { lang } = useLanguage()
  const l = lesson
  const localizedLabels = Object.fromEntries(Object.entries(labels).map(([key, value]) => [key, pick(value, lang)]))
  const sections = [
    { id: 'pattern', label: pick(l.sections[0].title, lang), icon: 'pattern' },
    { id: 'spread', label: pick(l.sections[1].title, lang), icon: 'spread' },
    { id: 'complications', label: pick(l.sections[2].title, lang), icon: 'report' },
    { id: 'take-home', label: localizedLabels.takeHome, icon: 'summary', emphasis: true },
  ]
  const langHref = path => lang === 'de' ? path : `${path}?lang=${lang}`
  const takeHome = l.summary.map((detail, index) => ({ title: pick(L(`Regel ${index + 1}`, `Rule ${index + 1}`, `قاعدهٔ ${index + 1}`), lang), detail: pick(detail, lang) }))
  const sourceItems = [
    { id: 'abdomen-p53-p54', tag: 'PDF · 53–54 / printed 52–53', title: pick(L('Abdomen.pdf – Pyelonephritis', 'Abdomen.pdf – Pyelonephritis', 'Abdomen.pdf – پیلونفریت'), lang), citation: pick(l.media, lang), scope: pick(l.sourceReview, lang) },
    { id: 'eau-2026', tag: 'EAU · 2026', title: 'EAU Guidelines on Urological Infections', href: 'https://uroweb.org/guidelines/urological-infections/chapter/the-guideline', citation: pick(l.sections[2].implication, lang) },
    { id: 'ct-review-2020', tag: 'Emergency Radiology · 2020', title: 'CT imaging of acute and chronic pyelonephritis: a practical guide for emergency radiologists', href: 'https://pubmed.ncbi.nlm.nih.gov/32445022/', citation: pick(L('Ergänzender CT-Review zur fokalen/diffusen Morphologie, Risikokontexten und Komplikationen; kein Ersatz für den aktuellen Leitlinienkontext.', 'Supplementary CT review of focal/diffuse morphology, risk contexts and complications; it does not replace current guideline context.', 'مرور تکمیلی CT دربارهٔ مورفولوژی کانونی/منتشر، زمینه‌های خطر و عوارض؛ جایگزین راهنمای بالینی فعلی نیست.'), lang) },
  ]
  return <StandardLessonShell lessonId={l.id} lang={lang} title={pick(l.title, lang)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: langHref('/') }, { label: 'Abdomen', href: langHref('/lernen/abdomen') }, { label: pick(L('Niere', 'Kidney', 'کلیه'), lang), href: langHref('/lernen/abdomen') }]}
    sections={sections} labels={localizedLabels} renderIcon={id => <Icon id={id}/>} syncHashNavigation actions={getPracticeActions('pyelonephritis','/abdomen/niere/pyelonephritis',lang)}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/educational/pyelonephritis/hero.svg', heroImageOpacity: .9, accent: '#78d0d7', accentStrong: '#166c78', accentSoft: '#e1f3f4', secondary: '#b8a0cf', secondaryStrong: '#674c81', heroBase: '#173341' }}
    heroImageAlt={pick(L('Schematische Niere mit einer fokalen Parenchymzone und umgebenden Ausbreitungsräumen; keine diagnostische Aufnahme', 'Schematic kidney with a focal parenchymal area and surrounding spread compartments; not a diagnostic image', 'شماتیک کلیه با ناحیهٔ کانونی پارانشیم و فضاهای اطراف برای نمایش گسترش؛ تصویر تشخیصی نیست'), lang)}
    className={styles.page} sources={<LessonSources title={pick(L('Quellen und Umfang', 'Sources and scope', 'منابع و دامنه'), lang)} items={sourceItems} note={pick(l.sourceReview, lang)}/> }>
    <LessonSection id="pattern" icon="pattern" title={pick(l.sections[0].title, lang)}>
      <p className={styles.body}>{pick(l.sections[0].body, lang)}</p>
      <p className={styles.note}>{pick(l.sections[0].implication, lang)}</p>
      <Figure figure={l.figures.parenchyma} lang={lang}/>
      <ParenchymaSchematic lang={lang}/>
    </LessonSection>
    <LessonSection id="spread" icon="spread" title={pick(l.sections[1].title, lang)}>
      <p className={styles.body}>{pick(l.sections[1].body, lang)}</p>
      <p className={styles.note}>{pick(l.sections[1].implication, lang)}</p>
      <Figure figure={l.figures.emphysematous} lang={lang}/>
      <Decision lang={lang}/>
    </LessonSection>
    <LessonSection id="complications" icon="report" title={pick(l.sections[2].title, lang)}>
      <p className={styles.body}>{pick(l.sections[2].body, lang)}</p>
      <p className={styles.note}>{pick(l.sections[2].implication, lang)}</p>
      <ExistingPracticeActions topic="nierenabszess" path="/abdomen/niere/pyelonephritis" lang={lang} anchor="complications" title={pick(L('Nierenabszess üben','Practise renal abscess','تمرین آبسهٔ کلیه'),lang)}/>
    </LessonSection>
    <LessonSection id="take-home" icon="summary" title={localizedLabels.takeHome}><TakeHomeList items={takeHome}/></LessonSection>
  </StandardLessonShell>
}
