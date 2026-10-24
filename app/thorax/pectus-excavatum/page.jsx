'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { PECTUS_LESSON as lesson } from '@/data/thoraxPectusLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const LABELS = {
  contents: L('Lektionsinhalt','Lesson content','محتوای درس'), path: L('Lernpfad','Learning path','مسیر یادگیری'), progress: L('gelesen','read','خوانده‌شده'),
  continue: L('Weiter','Continue','ادامه'), completeLesson: L('Ganze Lektion als gelesen markieren','Mark the full lesson as read','علامت‌گذاری کل درس به‌عنوان خوانده‌شده'), lessonCompleted: L('Ganze Lektion gelesen','Full lesson read','کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren','Mark section as read','علامت‌گذاری بخش به‌عنوان خوانده‌شده'), completed: L('Gelesen','Read','خوانده‌شده'), open: L('Abschnitt öffnen','Open section','بازکردن بخش'), close: L('Abschnitt schließen','Close section','بستن بخش'), takeHome: lesson.chapters[2].title, sources: L('Quellen','Sources','منابع'),
}
function Icon({ id }) {
  const paths = { pattern: 'M7 3C3 8 3 17 7 21M17 3c4 5 4 14 0 18M12 3v6l-2 5 2 7', check: 'm5 12 4 4L19 6', summary: 'M5 5h14M5 12h14M5 19h14' }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.pattern}/></svg>
}
export default function PectusPage() {
  const { lang } = useLanguage()
  return <PectusContent key={lang} lang={lang}/>
}
function PectusContent({ lang }) {
  const [answer, setAnswer] = useState(null)
  const t = value => typeof value === 'string' ? value : value[lang] || value.de
  const local = href => lang === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`
  const sources = [
    { tag: 'PDF', title: 'Thorax.pdf · PDF p. 9 / print p. 8', citation: t(lesson.attribution) },
    { tag: 'Radiopaedia', title: 'rID 33208', href: 'https://radiopaedia.org/cases/33208', citation: t(L('Bildpaar aus dem bereitgestellten PDF.','Image pair from the supplied PDF.','جفت تصویر از PDF ارائه‌شده.')) },
    { tag: t(L('Fallbericht','Case report','گزارش مورد')), title: 'Robbins LP. Pectus excavatum. Radiol Case Rep. 2011;6(1):460. doi:10.2484/rcr.v6i1.460.', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4901030/', citation: t(L('Frontaler Mittellappen-Mimikry und sternale Einziehung in der Seitenaufnahme.','Frontal middle-lobe mimic and sternal depression on the lateral view.','تقلید ضایعهٔ لوب میانی در نمای روبه‌رو و فرورفتگی جناغ در نیمرخ.')) },
    { tag: t(L('Lehrfall','Teaching case','کیس آموزشی')), title: 'Eurorad · Pectus excavatum · case 1678', href: 'https://www.eurorad.org/case/1678', citation: t(L('Abgrenzung einer projektionell veränderten Herzsilhouette von echter Kardiomegalie.','Distinguishing an altered projection of the cardiac silhouette from true cardiomegaly.','افتراق تغییر پروجکشن سایهٔ قلب از کاردیومگالی واقعی.')) },
  ]
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={t(lesson.title)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: local('/') }, { label: t(L('Thorax','Thorax','قفسهٔ سینه')), href: local('/lernen/thorax') }, { label: t(lesson.title) }]}
    sections={lesson.chapters.map(c => ({ ...c, label: t(c.title) }))} labels={Object.fromEntries(Object.entries(LABELS).map(([k,v]) => [k,t(v)]))}
    actions={{ mcq: { href: local(`/ueben/quiz?fach=thorax&themen=pectus-excavatum&n=2&from=${encodeURIComponent(local('/thorax/pectus-excavatum'))}`), label: t(L('Quiz öffnen','Open quiz','بازکردن آزمون')) }, flashcards: { href: local(`/flashcards/pectus-excavatum?from=${encodeURIComponent(local('/thorax/pectus-excavatum'))}`), label: t(L('Flashcards','Flashcards','فلش‌کارت‌ها')) } }}
    renderIcon={id => <Icon id={id}/>} syncHashNavigation className={styles.page}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/educational/pectus-excavatum/hero.png', heroImageOpacity: .8, accent: '#70bdc8', accentStrong: '#216a78', accentSoft: '#e1f3f5', secondary: '#a991c1', secondaryStrong: '#63428e', heroBase: '#172c3b' }} heroImageAlt={t(lesson.heroAlt)}
    sources={<LessonSources title={t(L('Quellen und Umfang','Sources and scope','منابع و دامنه'))} items={sources} note={t(L('Fokussierte Lektion zur Erkennung im Röntgen. Schweregradmessung, Funktionsdiagnostik und Therapie werden hier nicht behandelt. Titelgrafik: generierte, nichtdiagnostische Illustration.','Focused lesson on radiographic recognition. Severity measurements, functional testing and treatment are outside its scope. Header: generated, nondiagnostic illustration.','درس متمرکز بر شناسایی در رادیوگرافی است. اندازه‌گیری شدت، ارزیابی عملکرد و درمان در دامنهٔ این درس نیستند. تصویر عنوان: تصویرسازی مولد و غیرتشخیصی.'))}/>}
  >
    <LessonSection id="pattern" icon="pattern" title={t(lesson.chapters[0].title)}><div className={styles.body}>
      <p className={styles.lead}>{t(lesson.intro)}</p>
      {lesson.observations.map((p,i) => <p key={i}>{t(p)}</p>)}
      <div className={styles.figures}>{lesson.figures.map(f => <figure className={styles.figure} key={f.src}><a href={f.src} target="_blank" rel="noreferrer" aria-label={t(L('Originalbild öffnen: ','Open original image: ','بازکردن تصویر اصلی: '))+t(f.alt)}><img src={f.src} width={f.width} height={f.height} alt={t(f.alt)}/></a><figcaption>{t(f.caption)}</figcaption></figure>)}</div>
      <p className={styles.attribution}>{t(lesson.attribution)}</p>
    </div></LessonSection>
    <LessonSection id="localise" icon="check" title={t(lesson.chapters[1].title)}><div className={styles.body}>
      <ol>{lesson.steps.map((p,i) => <li key={i}>{t(p)}</li>)}</ol>
      <aside className={styles.cave}>{t(lesson.cave)}</aside>
      <div className={styles.check}><h3>{t(L('Kurzcheck: die entscheidende Ebene','Quick check: the decisive view','خودآزمایی: نمای تعیین‌کننده'))}</h3><p>{t(lesson.check.prompt)}</p>
        <fieldset><legend>{t(L('Eine Antwort wählen','Choose one answer','یک پاسخ را انتخاب کنید'))}</legend>{lesson.check.options.map((o,i) => <label key={i}><input type="radio" name="pectus-check" checked={answer === i} onChange={() => setAnswer(i)}/><span>{t(o)}</span></label>)}</fieldset>
        {answer !== null && <div role="status" className={styles.feedback}><strong>{t(answer === lesson.check.answerIndex ? L('Richtig. ','Correct. ','درست است. ') : L('Noch einmal prüfen. ','Review your choice. ','دوباره بررسی کنید. '))}</strong>{t(lesson.check.explanation)}</div>}
      </div>
    </div></LessonSection>
    <LessonSection id="summary" icon="summary" title={t(lesson.chapters[2].title)}><ol className={styles.rules}>{lesson.takeHome.map((p,i) => <li key={i}>{t(p)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
