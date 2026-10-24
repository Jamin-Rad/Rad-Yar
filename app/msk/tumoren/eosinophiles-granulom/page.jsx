'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources , TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { EOSINOPHILIC_GRANULOMA_LESSON as lesson } from '@/data/eosinophilesGranulomLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] ?? value?.de ?? ''

function Icon({ id }) {
  const paths = { clinical: 'M12 3v18M5 8h14M7 16h10', imaging: 'M4 5h16v14H4zM7 15l3-4 2 2 3-5 3 7', differential: 'M12 3v5m0 4v9M5 8h14M5 16h14', check: 'M4 4h16v16H4zM8 9h8m-8 4h5' }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.imaging} /></svg>
}

function Table({ rows, caption, lang }) {
  const t = value => pick(value, lang)
  return <div className={styles.tableWrap} role="region" tabIndex={0} aria-label={t(caption)}>
    <table><caption>{t(caption)}</caption><thead><tr><th scope="col">{t(L('Muster / Modalität', 'Pattern / modality', 'الگو / روش'))}</th><th scope="col">{t(L('Bedeutung und Grenze', 'Interpretation and limit', 'تفسیر و محدودیت'))}</th></tr></thead>
      <tbody>{rows.map(([label, detail]) => <tr key={t(label)}><th scope="row">{t(label)}</th><td>{t(detail)}</td></tr>)}</tbody>
    </table>
  </div>
}

function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const t = value => pick(value, lang)
  return <div className={styles.decision}>
    <h3>{t(lesson.check.title)}</h3><p>{t(lesson.check.prompt)}</p>
    <fieldset><legend>{t(L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید'))}</legend>
      {lesson.check.options.map((option, i) => <label key={i}><input type="radio" name="lch-self-check" checked={answer === i} onChange={() => setAnswer(i)} /><span>{t(option)}</span></label>)}
    </fieldset>
    {answer !== null && <p className={styles.feedback} role="status"><strong>{t(answer === lesson.check.answer ? L('Richtig. ', 'Correct. ', 'درست است. ') : L('Noch einmal prüfen. ', 'Review the interpretation. ', 'تفسیر را دوباره مرور کنید. '))}</strong>{t(answer === lesson.check.answer ? lesson.check.explanation : lesson.check.retry)}</p>}
  </div>
}

export default function EosinophilicGranulomaPage() {
  const { lang } = useLanguage()
  const t = value => pick(value, lang)
  const langHref = path => lang === 'de' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
  const returnPath = langHref('/msk/tumoren/eosinophiles-granulom')
  const labels = {
    path: t(L('Lernweg', 'Learning path', 'مسیر یادگیری')), progress: t(L('gelesen', 'read', 'خوانده‌شده')),
    continue: t(L('Weiterlernen', 'Continue learning', 'ادامهٔ یادگیری')),
    completeLesson: t(L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده')),
    lessonCompleted: t(L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد')),
    complete: t(L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده')),
    completed: t(L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده')),
    open: t(L('Abschnitt öffnen', 'Open section', 'بازکردن بخش')), close: t(L('Schließen', 'Close', 'بستن')),
    takeHome: t(L('Take-home-Regeln', 'Take-home rules', 'نکته‌های کلیدی')), sources: t(L('Quellen und Umfang', 'Sources and scope', 'منابع و دامنه')),
  }
  const sources = lesson.refs.map(ref => ({ tag: ref.tag, title: t(ref.label), href: ref.href, citation: typeof ref.citation === 'string' ? ref.citation : t(ref.citation) }))
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={t(lesson.title)} author="RadYar"
    heroImageAlt={t(L('Nichtdiagnostisches Schema: lange Röhrenknochen mit markierter diaphysärer Osteolyse und umgebender Reaktion.', 'Non-diagnostic schematic: long bone with a diaphyseal lytic focus and surrounding reaction.', 'شماتیک غیرتشخیصی: استخوان بلند با کانون لیتیک دیافیزی و واکنش پیرامونی.'))}
    syncHashNavigation breadcrumbs={[{ label: 'RadYar', href: langHref('/') }, { label: 'MSK', href: langHref('/lernen/msk') }, { label: t(lesson.title) }]}
    sections={[...(lesson.sections.map(section => ({ id: section.id, label: t(section.title), icon: section.icon }))),{id:'takehome',label:lang==='fa'?'پیام نهایی':'Take Home Message',icon:'summary',emphasis:true}]} labels={labels}
    actions={{
      mcq: { label: t(L('Drei passende MCQs', 'Three related MCQs', 'سه پرسش مرتبط')), href: langHref(`/ueben/quiz?fach=msk&n=3&themen=${lesson.id}&from=${encodeURIComponent(returnPath)}`) },
      flashcards: { label: t(L('Drei Flashcards', 'Three flashcards', 'سه فلش‌کارت')), href: langHref(`/flashcards/${lesson.id}?from=${encodeURIComponent(returnPath)}`) },
    }}
    renderIcon={id => <Icon id={id} />}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.hero, heroImageOpacity: .96, accent: '#73a9b4', accentStrong: '#315f68', accentSoft: '#e8f1f2', secondary: '#d59c6d', secondaryStrong: '#81532d', heroBase: '#17343c' }}
    className={styles.page} sources={<LessonSources title={labels.sources} items={sources} note={t(lesson.sourceNote)} />}>
    <LessonSection id="pattern" icon="clinical" title={t(lesson.sections[0].title)} bodyClassName={styles.body}>
      <p className={styles.lead}>{t(lesson.intro)}</p>
      <Table rows={lesson.patternRows} caption={L('Muster, die LCH nahelegen können', 'Patterns that may suggest LCH', 'الگوهایی که ممکن است LCH را مطرح کنند')} lang={lang} />
      <figure className={styles.diagram}><img src="/educational/eosinophiles-granulom/patterns.svg" alt={t(L('Drei nichtdiagnostische Schemata: links diaphysäre Läsion mit fusiformer Reaktion, mittig abgeflachter Wirbelkörper, rechts abgeschrägte Schädelkanten.', 'Three non-diagnostic schematics: left, diaphyseal lesion with fusiform reaction; centre, flattened vertebral body; right, bevelled skull edges.', 'سه شماتیک غیرتشخیصی: چپ، ضایعهٔ دیافیزی با واکنش دوکی‌شکل؛ وسط، جسم مهرهٔ صاف‌شده؛ راست، لبه‌های اریب جمجمه.'))} width="960" height="340" loading="lazy" /><figcaption>{t(L('Konzeptionelles Schema, keine Patientenaufnahme: links der lange Röhrenknochen, mittig die Wirbelkörperabflachung und rechts der Schädeldefekt. Die anatomischen Muster sind räumlich angeordnet; keines ist allein diagnostisch.', 'Conceptual schematic, not a patient image: long bone at left, flattened vertebral body in the centre and skull defect at right. The anatomic patterns are arranged spatially; none is diagnostic alone.', 'شماتیک مفهومی است، نه تصویر بیمار: استخوان بلند در سمت چپ، جسم مهرهٔ صاف‌شده در وسط و نقص جمجمه در سمت راست قرار دارد. الگوهای آناتومیک برای مقایسهٔ مکانی چیده شده‌اند؛ هیچ‌یک به‌تنهایی تشخیصی نیست.'))}</figcaption></figure>
      <aside className={styles.note}>
        <strong>{t(lesson.caseStudy.title)}</strong>
        <p>{t(lesson.caseStudy.description)}</p>
        <p><a href={lesson.caseStudy.href} target="_blank" rel="noopener noreferrer">{t(lesson.caseStudy.linkLabel)}</a></p>
        <small>{lesson.caseStudy.attribution}</small>
      </aside>
    </LessonSection>
    <LessonSection id="modalities" icon="imaging" title={t(lesson.sections[1].title)} bodyClassName={styles.body}>
      <Table rows={lesson.modalityRows} caption={L('Welche Frage beantwortet die Modalität?', 'Which question does each modality answer?', 'هر روش به کدام پرسش پاسخ می‌دهد؟')} lang={lang} />
      <aside className={styles.note}><strong>{t(L('PDF-Bezug und Ergänzung', 'PDF link and supplement', 'ارتباط و تکمیل PDF'))}</strong><p>{t(lesson.caution)}</p></aside>
    </LessonSection>
    <LessonSection id="limits" icon="differential" title={t(lesson.sections[2].title)} bodyClassName={styles.body}>
      <ul className={styles.list}>{lesson.limits.map((item, i) => <li key={i}>{t(item)}</li>)}</ul>
    </LessonSection>
    <LessonSection id="transfer" icon="check" title={t(lesson.sections[3].title)} bodyClassName={styles.body}>
      <SelfCheck lang={lang} />

    </LessonSection>

<LessonSection id="takehome" icon="summary"><TakeHomeList items={lesson.takeHome.map((item,i)=>({title:t(item),detail:''}))}/></LessonSection>
</StandardLessonShell>
}
