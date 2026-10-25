'use client'

import { useState } from 'react'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { useLanguage } from '@/providers/LanguageProvider'
import InProgressBanner from '@/components/InProgressBanner'
import { SAB_LESSON, SAB_QUESTIONS } from '@/data/sab'
import styles from './page.module.css'

const value = (item, lang) => item?.[lang] || item?.de || item
const labels = {
  path: { de: 'Lernpfad', en: 'Learning path', fa: 'مسیر یادگیری' },
  progress: { de: 'gelesen', en: 'read', fa: 'خوانده‌شده' },
  continue: { de: 'Lektion fortsetzen', en: 'Continue lesson', fa: 'ادامهٔ درس' },
  completeLesson: { de: 'Ganze Lektion als gelesen markieren', en: 'Mark the whole lesson as read', fa: 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده' },
  lessonCompleted: { de: 'Ganze Lektion gelesen', en: 'Full lesson marked as read', fa: 'کل درس خوانده شد' },
  complete: { de: 'Abschnitt als gelesen markieren', en: 'Mark section as read', fa: 'علامت‌گذاری بخش به‌عنوان خوانده‌شده' },
  completed: { de: 'Gelesen', en: 'Read', fa: 'خوانده شد' },
  open: { de: 'Abschnitt öffnen', en: 'Open section', fa: 'بازکردن بخش' },
  close: { de: 'Schließen', en: 'Close', fa: 'بستن' },
  takeHome: { de: 'Kernaussagen', en: 'Key points', fa: 'نکات کلیدی' },
  sources: { de: 'Quellen und Umfang', en: 'Sources and scope', fa: 'منابع و دامنه' },
}

const iconPaths = {
  clinical: 'M12 3v18M3 12h18M5 5l14 14M19 5 5 19',
  ct: 'M4 5h16v14H4zM8 9h8M8 12h8M8 15h5',
  fisher: 'M4 6h16M4 12h16M4 18h16M8 3v18M16 3v18',
  vessels: 'M4 12h5l3-7 3 14 2-7h3',
  complications: 'M12 3 3 20h18L12 3zM12 9v5m0 3h.01',
  summary: 'M12 2l1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2Z',
}

function Icon({ name }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={iconPaths[name] || iconPaths.ct} /></svg>
}

function Cards({ items, lang }) {
  return <div className={styles.cards}>{items.map((item, index) => <article key={`${index}-${value(item.title, lang)}`} className={styles.card}><h3>{value(item.title, lang)}</h3><p>{value(item.text, lang)}</p></article>)}</div>
}

function DataTable({ headers, rows, lang }) {
  return <div className={styles.tableScroll} tabIndex={0} role="region" aria-label={lang === 'fa' ? 'جدول آموزشی' : lang === 'en' ? 'Teaching table' : 'Lehrtabelle'}>
    <table><thead><tr>{headers.map((header, index) => <th key={index} scope="col">{value(header, lang)}</th>)}</tr></thead>
      <tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{value(cell, lang)}</td>)}</tr>)}</tbody>
    </table>
  </div>
}

function Callout({ label, children, warning = false }) {
  return <aside className={`${styles.callout} ${warning ? styles.warning : ''}`}><strong>{label}</strong><p>{children}</p></aside>
}

function SelfCheck({ lang }) {
  const [selected, setSelected] = useState(null)
  const question = SAB_QUESTIONS(lang).find(item => item.id === 'sab-q1')
  const labels = lang === 'fa'
    ? { title: 'خودآزمایی: CT منفی', correct: 'درست است. ', retry: 'به زمان، معاینه عصبی و کیفیت CT توجه کنید.' }
    : lang === 'en'
      ? { title: 'Self-check: negative CT', correct: 'Correct. ', retry: 'Consider timing, neurological findings and CT quality.' }
      : { title: 'Selbstcheck: negatives CT', correct: 'Richtig. ', retry: 'Beachten Sie Zeitpunkt, neurologischen Befund und CT-Qualität.' }
  return <section className={styles.selfCheck} aria-labelledby="sab-check-title">
    <h3 id="sab-check-title">{labels.title}</h3>
    <p>{question.question}</p>
    <div className={styles.options}>{question.options.map((option, index) => <button key={option.id} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}>{option.text}</button>)}</div>
    {selected !== null ? <p className={styles.feedback} role="status">{selected === question.options.findIndex(option => option.id === question.correct) ? labels.correct + question.explanation : question.wrongExplanations[question.options[selected].id]}</p> : null}
  </section>
}

export default function SubarachnoidLesson() {
  const { lang } = useLanguage()
  const rtl = lang === 'fa'
  const t = key => value(labels[key], lang)
  const localizePath = href => lang === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`
  const sectionLabels = SAB_LESSON.sections.map((section, index) => ({
    ...section,
    label: value(section.label, lang),
    icon: ['clinical', 'ct', 'fisher', 'vessels', 'complications', 'summary'][index],
    emphasis: section.id === 'takehome',
  }))
  const sourceScope = lang === 'fa'
    ? 'این مرور فقط صفحات ۱۵ تا ۱۷ Gehirn.pdf را پوشش می‌دهد. هدر شماتیک آموزشی است، نه CT بیمار. یک فریم CT از کیس Radiopaedia با اجازهٔ صریح کاربر، همراه با نام مشارکت‌کننده و پیوند منبع نمایش داده شده است.'
    : lang === 'en'
      ? 'This review covers only Gehirn.pdf pages 15–17. The header schematic is educational, not a patient CT. One CT frame from a Radiopaedia case is shown with the user’s explicit permission, contributor attribution and source link.'
      : 'Dieser Abgleich umfasst nur Gehirn.pdf, Seiten 15–17. Das Schema im Kopfbereich ist didaktisch und kein Patienten-CT. Ein CT-Bild aus einem Radiopaedia-Fall wird mit ausdrücklicher Genehmigung des Nutzers, Beiträgerangabe und Quellenlink gezeigt.'
  const caseCaption = lang === 'fa'
    ? 'CT بدون کنتراست، برش محوری از استک مطالعهٔ 28351. کیس: Subarachnoid hemorrhage – ACOM aneurysm؛ مشارکت‌کننده: Frank Gaillard؛ Radiopaedia، rID 28096. توزیع خون در سیسترن‌های قاعده‌ای و شیارهای سیلوین دیده می‌شود؛ الگوی خون به‌تنهایی محل آنوریسم مسئول را ثابت نمی‌کند.'
    : lang === 'en'
      ? 'Axial non-contrast CT frame from study 28351. Case: Subarachnoid hemorrhage – ACOM aneurysm; contributor: Frank Gaillard; Radiopaedia, rID 28096. Blood is seen in the basal cisterns and Sylvian fissures; distribution alone does not prove the location of the responsible aneurysm.'
      : 'Axiales natives CT-Bild aus Studie 28351. Fall: Subarachnoid hemorrhage – ACOM aneurysm; Beitrag von Frank Gaillard; Radiopaedia, rID 28096. Blut ist in basalen Zisternen und Sylvischen Fissuren sichtbar; die Verteilung allein beweist nicht die Lage des verantwortlichen Aneurysmas.'
  const caseAlt = lang === 'fa'
    ? 'CT بدون کنتراست در برش آکسیال با خون پرچگال در سیسترن‌های قاعده‌ای و شیارهای سیلوین.'
    : lang === 'en'
      ? 'Axial non-contrast CT showing hyperattenuating blood in the basal cisterns and Sylvian fissures.'
      : 'Axiales natives CT mit hyperattenuierendem Blut in basalen Zisternen und Sylvischen Fissuren.'
  const sources = [
    { href: 'https://doi.org/10.1161/STR.0000000000000436', title: 'Hoh BL et al. 2023 AHA/ASA Guideline for the Management of Patients With Aneurysmal Subarachnoid Hemorrhage.', citation: 'Stroke. 2023;54:e314–e370. doi:10.1161/STR.0000000000000436.', scope: lang === 'fa' ? 'منبع راهنما برای مسیر CT/LP، بررسی عروقی و عوارض aSAB.' : lang === 'en' ? 'Guideline source for CT/LP pathways, vascular evaluation and aSAH complications.' : 'Leitlinienquelle für CT-/LP-Pfad, Gefäßdiagnostik und aSAB-Komplikationen.' },
    { href: 'https://pubmed.ncbi.nlm.nih.gov/11546890/', title: 'Claassen J et al. Effect of cisternal and ventricular blood on risk of delayed cerebral ischemia after subarachnoid hemorrhage.', citation: 'Stroke. 2001;32:2012–2020. PMID: 11546890.', scope: lang === 'fa' ? 'مبنای مقیاس اصلاح‌شدهٔ بعدی؛ Frontera 2006 رده‌بندی ۰–۴ این درس را بررسی می‌کند. پیش‌بینی درصدی فردی ارائه نمی‌شود.' : lang === 'en' ? 'Basis for the later modified scale; Frontera 2006 evaluates the 0–4 classification taught here. No individual percentage predictions.' : 'Grundlage der späteren modifizierten Skala; Frontera 2006 prüft die hier gelehrte 0–4-Einteilung. Keine individuellen Prozentwahrscheinlichkeiten.' },
    { href: 'https://doi.org/10.1227/01.NEU.0000218821.34014.1B', title: 'Frontera JA et al. Prediction of symptomatic vasospasm after subarachnoid hemorrhage: the modified Fisher scale.', citation: 'Neurosurgery. 2006;59:21–27.', scope: lang === 'fa' ? 'تعریف درجات و بررسی وازواسپاسم علامت‌دار در جمعیت‌های منتخب؛ نه احتمال فردی.' : lang === 'en' ? 'Grade definitions and symptomatic-vasospasm evaluation in selected cohorts; not individual probabilities.' : 'Graddefinitionen und symptomatischer Vasospasmus in ausgewählten Kohorten; keine individuellen Wahrscheinlichkeiten.' },
    { href: 'https://pubmed.ncbi.nlm.nih.gov/9921845/', title: 'van der Jagt M et al. Validity of prediction of the site of ruptured intracranial aneurysms with CT.', citation: 'Neurology. 1999;52:34–39.', scope: lang === 'fa' ? 'مطالعهٔ اصلی: سرنخ توزیع خون برای ACA/ACoA با محدودیت موضع‌یابی.' : lang === 'en' ? 'Original study: ACA/ACoA blood-distribution clue with localisation limitations.' : 'Originalstudie: Blutverteilung als ACA-/ACoA-Suchhinweis mit begrenzter Lokalisation.' },
  ]
  const route = '/gehirn/vaskulaer/subarachnoidalblutung'
  const actions = {
    mcq: { label: SAB_LESSON.actionMcq, href: localizePath(`/ueben/quiz?fach=gehirn&n=${SAB_QUESTIONS(lang).length}&themen=subarachnoidalblutung&from=${encodeURIComponent(route)}`) },
    flashcards: { label: value(SAB_LESSON.actionFlash, lang), href: localizePath(`/flashcards/subarachnoidalblutung?from=${encodeURIComponent(route)}`) },
  }
  return <><InProgressBanner lang={lang} /><StandardLessonShell lessonId="subarachnoidalblutung" lang={lang} title={value(SAB_LESSON.title, lang)} author={SAB_LESSON.sourceLabel}
    breadcrumbs={[{ label: 'RadYar', href: localizePath('/') }, { label: value(SAB_LESSON.breadcrumbArea, lang), href: localizePath('/lernen/gehirn') }, { label: value(SAB_LESSON.title, lang) }]}
    sections={sectionLabels} labels={Object.fromEntries(Object.entries(labels).map(([key, item]) => [key, value(item, lang)]))} actions={actions}
    renderIcon={name => <Icon name={name} />}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/educational/sah/hero.svg', heroImageOpacity: .9, accent: '#54b7c1', accentStrong: '#155b70', accentSoft: '#e1f4f5', secondary: '#d28a69', secondaryStrong: '#70432f', heroBase: '#102a37' }}
    className={styles.page} heroImageAlt={lang === 'fa' ? 'شماتیک محوری آموزشی از توزیع خون زیرعنکبوتیه در سیسترن‌های قاعده‌ای؛ تصویر CT بیمار نیست.' : lang === 'en' ? 'Educational axial schematic of subarachnoid blood distribution in the basal cisterns; not a patient CT.' : 'Didaktisches axiales Schema der subarachnoidalen Blutverteilung in den basalen Zisternen; kein Patienten-CT.'}
    syncHashNavigation sources={<LessonSources title={t('sources')} items={sources} note={sourceScope} />}>
    <div className={styles.content} lang={lang} dir={rtl ? 'rtl' : 'ltr'}>
      <LessonSection id="klinik" title={value(SAB_LESSON.klinik.title, lang)} icon="clinical">
        <p className={styles.lead}>{value(SAB_LESSON.klinik.lead, lang)}</p>
        <div className={styles.card}><h3>{lang === 'fa' ? 'هدف‌های یادگیری' : lang === 'en' ? 'Learning goals' : 'Lernziele'}</h3><ul>{SAB_LESSON.goals.map((goal, index) => <li key={index}>{value(goal, lang)}</li>)}</ul></div>
        <Cards items={SAB_LESSON.klinik.definitionItems} lang={lang} />
        <DataTable headers={SAB_LESSON.klinik.aetiologyHeaders} rows={SAB_LESSON.klinik.aetiologyRows} lang={lang} />
        <Callout warning label={value(SAB_LESSON.caveLabel, lang)}>{value(SAB_LESSON.klinik.cave, lang)}</Callout>
        <Callout label={value(SAB_LESSON.keyLabel, lang)}>{value(SAB_LESSON.klinik.key, lang)}</Callout>
      </LessonSection>
      <LessonSection id="ct" title={value(SAB_LESSON.ct.title, lang)} icon="ct">
        <p className={styles.lead}>{value(SAB_LESSON.ct.lead, lang)}</p>
        <DataTable headers={SAB_LESSON.ct.stagesHeaders} rows={SAB_LESSON.ct.stagesRows} lang={lang} />
        <figure className={styles.caseFigure}>
          <a href="https://radiopaedia.org/cases/subarachnoid-haemorrhage-acom-aneurysm-4?lang=us" target="_blank" rel="noopener noreferrer" aria-label={caseCaption}>
            <img src="https://prod-images-static.radiopaedia.org/images/6176464/c075cca447a91651279f736c4465e1.jpg" alt={caseAlt} loading="lazy" referrerPolicy="no-referrer" />
          </a>
          <figcaption>{caseCaption}</figcaption>
        </figure>
        <h3>{lang === 'fa' ? 'نشانه‌های CT و MRI' : lang === 'en' ? 'CT and MRI signs' : 'CT- und MRT-Zeichen'}</h3>
        <Cards items={SAB_LESSON.ct.signItems} lang={lang} />
        <Callout warning label={value(SAB_LESSON.caveLabel, lang)}>{value(SAB_LESSON.ct.key, lang)}</Callout>
      </LessonSection>
      <LessonSection id="fisher" title={value(SAB_LESSON.fisher.title, lang)} icon="fisher">
        <p className={styles.lead}>{value(SAB_LESSON.fisher.lead, lang)}</p>
        <DataTable headers={SAB_LESSON.fisher.tableHeaders} rows={SAB_LESSON.fisher.tableRows} lang={lang} />
        <h3>{value(SAB_LESSON.fisher.comparisonTitle, lang)}</h3>
        <Cards items={SAB_LESSON.fisher.comparisonItems} lang={lang} />
        <Callout warning label={value(SAB_LESSON.caveLabel, lang)}>{value(SAB_LESSON.fisher.cave, lang)}</Callout>
        <Callout label={value(SAB_LESSON.keyLabel, lang)}>{value(SAB_LESSON.fisher.key, lang)}</Callout>
      </LessonSection>
      <LessonSection id="gefaesse" title={value(SAB_LESSON.gefaesse.title, lang)} icon="vessels">
        <p className={styles.lead}>{value(SAB_LESSON.gefaesse.lead, lang)}</p>
        <Cards items={SAB_LESSON.gefaesse.imagingItems} lang={lang} />
        <Callout label={value(SAB_LESSON.keyLabel, lang)}>{value(SAB_LESSON.gefaesse.key, lang)}</Callout>
      </LessonSection>
      <LessonSection id="komplikationen" title={value(SAB_LESSON.komplikationen.title, lang)} icon="complications">
        <p className={styles.lead}>{value(SAB_LESSON.komplikationen.lead, lang)}</p>
        <Cards items={SAB_LESSON.komplikationen.compItems} lang={lang} />
        <Callout warning label={value(SAB_LESSON.caveLabel, lang)}>{value(SAB_LESSON.komplikationen.cave, lang)}</Callout>
        <Callout label={value(SAB_LESSON.keyLabel, lang)}>{value(SAB_LESSON.komplikationen.key, lang)}</Callout>
      </LessonSection>
      <LessonSection id="takehome" title={value(SAB_LESSON.takehome.title, lang)} icon="summary">
        <div className={styles.takeHome}>{SAB_LESSON.takehome.items.map((item, index) => <article key={index}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{value(item.title, lang)}</h3><p>{value(item.text, lang)}</p></div></article>)}</div>
        <SelfCheck lang={lang} />
      </LessonSection>
    </div>
  </StandardLessonShell></>
}
