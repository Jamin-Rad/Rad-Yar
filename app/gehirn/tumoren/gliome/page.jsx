'use client'

import { useState } from 'react'
import StandardLessonShell, { LessonSection, LessonSources, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { useLanguage } from '@/providers/LanguageProvider'
import { GEHIRN_GLIOME_LESSON as C } from '@/data/gehirnGliomeLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const value = (item, lang) => item?.[lang] || item?.de || ''

const sections = [
  { id: 'classification', icon: 'compare', label: L('Welche Gliom-Gruppe ist gemeint?', 'Which glioma family is meant?', 'منظور کدام گروه گلیوم است؟') },
  { id: 'pilocytic', icon: 'scan', label: L('Wie sieht das pilozytische Muster aus?', 'What is the pilocytic pattern?', 'الگوی پیلوسیتیک چگونه است؟') },
  { id: 'differential', icon: 'brain', label: L('Was bleibt in der Differenzialdiagnose offen?', 'What remains open in the differential?', 'چه چیزی در تشخیص افتراقی باز می‌ماند؟') },
  { id: 'self-check', icon: 'check', label: L('Selbstcheck', 'Self-check', 'خودآزمایی') },
  { id: 'take-home', icon: 'summary', label: L('Drei Regeln für die Befundung', 'Three reporting rules', 'سه قاعده برای ارزیابی تصویر'), emphasis: true },
]

const labels = {
  path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'),
  progress: L('Fortschritt', 'Progress', 'پیشرفت'),
  continue: L('Lektion fortsetzen', 'Continue lesson', 'ادامه درس'),
  completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark the whole lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده'),
  completed: L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده'),
  open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'),
  close: L('Schließen', 'Close', 'بستن'),
  takeHome: L('Kernaussagen', 'Key points', 'نکات کلیدی'),
  sources: L('Quellen und Umfang', 'Sources and scope', 'منابع و دامنه'),
}

const icons = {
  compare: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h18m-4-4 4 4-4 4M21 17H3m4-4-4 4 4 4" /></svg>,
  scan: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8V4h4m8 0h4v4M20 16v4h-4M8 20H4v-4M7 12h10M12 7v10" /></svg>,
  brain: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5a4 4 0 0 0-7 3 4 4 0 0 0-1 7 4 4 0 0 0 7 4V5m2 0a4 4 0 0 1 7 3 4 4 0 0 1 1 7 4 4 0 0 1-7 4V5" /></svg>,
  check: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 12 5 5L20 6" /></svg>,
  summary: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2Z" /></svg>,
}

function ClassificationMap({ lang }) {
  const groups = lang === 'fa'
    ? ['گلیوم‌های منتشر بزرگسالان', 'آستروسیتوم IDH-mutant', 'الیگودندروگلیوم IDH-mutant با حذف همزمان 1p/19q', 'گلیوبلاستوم IDH-wildtype', 'گروه آستروسیتی محدودشده', 'آستروسیتوم پیلوسیتیک · SEGA · PXA']
    : lang === 'en'
      ? ['Adult-type diffuse gliomas', 'Astrocytoma, IDH-mutant', 'Oligodendroglioma, IDH-mutant and 1p/19q-codeleted', 'Glioblastoma, IDH-wildtype', 'Circumscribed astrocytic gliomas', 'Pilocytic astrocytoma · SEGA · PXA']
      : ['Adulte diffuse Gliome', 'Astrozytom, IDH-mutiert', 'Oligodendrogliom, IDH-mutiert und 1p/19q-kodeletiert', 'Glioblastom, IDH-Wildtyp', 'Zirkumskripte astrozytäre Gliome', 'Pilozytisches Astrozytom · SEGA · PXA']
  return <figure className={styles.groupMap} aria-label={groups.join('; ')}>
    <div className={styles.diffuse}><strong>{groups[0]}</strong><ol>{groups.slice(1, 4).map(item => <li key={item}>{item}</li>)}</ol></div>
    <div className={styles.circumscribed}><strong>{groups[4]}</strong><span>{groups[5]}</span></div>
    <figcaption>{lang === 'fa' ? 'نقشهٔ گروه‌بندی؛ SEGA و PXA فقط نام برده شده‌اند.' : lang === 'en' ? 'Classification map; SEGA and PXA are named only.' : 'Gruppierung; SEGA und PXA werden hier nur genannt.'}</figcaption>
  </figure>
}

function CasePanel({ lang }) {
  const alt = lang === 'fa'
    ? 'پنل MRI از PDF کاربر: برش‌های آکسیال T1، T1 پس از تزریق و FLAIR از کیست مخچه با ندول دیواره‌ای.'
    : lang === 'en'
      ? 'User-PDF MRI panel: axial T1, post-contrast T1 and FLAIR frames of a cerebellar cyst with a mural nodule.'
      : 'MRT-Tafel aus dem Nutzer-PDF: axiale T1-, T1-nach-Kontrastmittel- und FLAIR-Aufnahmen einer Kleinhirnzyste mit Wandknoten.'
  const caption = lang === 'fa'
    ? 'Gehirn.pdf، صفحهٔ PDF ۴۲ (صفحهٔ چاپی ۴۱)، با برچسب Radiopaedia rID 36807. پنل بدون تغییر محتوایی برش خورده؛ تطبیق شناسه و شرایط استفاده هنوز مستقل بررسی نشده است.'
    : lang === 'en'
      ? 'Gehirn.pdf, PDF p. 42 (printed p. 41), labelled Radiopaedia rID 36807. Cropped without changing image content; case identity and reuse terms still need independent verification.'
      : 'Gehirn.pdf, PDF-S. 42 (Druck-S. 41), dort mit Radiopaedia rID 36807 bezeichnet. Ohne inhaltliche Bildänderung beschnitten; Fallidentität und Wiederverwendungsbedingungen sind noch unabhängig zu prüfen.'
  return <figure className={styles.casePanel}>
    <img src="/gehirn/gliome/pilocytic-case-pdf-p42.jpg" alt={alt} width="1600" height="590" />
    <figcaption>{caption}</figcaption>
  </figure>
}

function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const correct = C.assessment.correctIndex
  const prompt = value(C.assessment.question, lang)
  return <div className={styles.quiz}>
    <p>{prompt}</p>
    <div className={styles.options}>{C.assessment.options.map((option, index) => <button key={index} type="button" aria-pressed={answer === index} onClick={() => setAnswer(index)}>{value(option, lang)}</button>)}</div>
    {answer !== null ? <p className={styles.feedback} role="status">{value(answer === correct ? C.assessment.feedback : C.assessment.options[correct], lang)}</p> : null}
  </div>
}

export default function BrainGliomaLessonPage() {
  const { lang } = useLanguage()
  const rtl = lang === 'fa'
  const t = key => value(labels[key], lang)
  const langPath = path => lang === 'de' ? path : `${path}?lang=${lang}`
  const translatedSections = sections.map(section => ({ ...section, label: value(section.label, lang) }))
  const sources = C.references.filter(source => source.href).map(source => ({
    ...source,
    tag: lang === 'fa' ? 'مرجع تکمیلی' : lang === 'en' ? 'Context source' : 'Kontextquelle',
    title: source.label,
    citation: lang === 'fa' ? 'برای زمینهٔ طبقه‌بندی یا الگوی تصویربرداری؛ جایگزین بررسی PDF نیست.' : lang === 'en' ? 'For classification or imaging context; does not replace the PDF review.' : 'Für Klassifikations- oder Bildgebungskontext; ersetzt nicht die PDF-Prüfung.',
    scope: '',
  }))
  return <StandardLessonShell lessonId={C.id} lang={lang} title={value(C.title, lang)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: langPath('/') }, { label: lang === 'fa' ? 'مغز' : lang === 'en' ? 'Brain' : 'Gehirn', href: langPath('/lernen/gehirn') }, { label: value(C.title, lang) }]}
    sections={translatedSections} labels={Object.fromEntries(Object.entries(labels).map(([key, item]) => [key, value(item, lang)]))} actions={{}}
    renderIcon={id => icons[id] || icons.scan}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/educational/gliome/pilocytic-hero.svg', heroImageOpacity: .9, accent: '#46afbf', accentStrong: '#1e5965', accentSoft: '#e3f5f6', secondary: '#a979bd', secondaryStrong: '#69477b', heroBase: '#102631' }}
    className={styles.page} heroImageAlt={value(C.heroAlt, lang)} syncHashNavigation
    sources={<LessonSources title={t('sources')} items={sources} note={value(C.sourcesNote, lang)} />}>
    <div lang={lang} dir={rtl ? 'rtl' : 'ltr'}>
      <LessonSection id="classification" title={value(sections[0].label, lang)} icon="compare">
        <p className={styles.lead}>{value(C.objective, lang)}</p>
        <p>{value(C.chapters[0].text, lang).split('\n\n')[0]}</p>
        <ClassificationMap lang={lang} />
        <p>{value(C.chapters[0].text, lang).split('\n\n')[1]}</p>
      </LessonSection>
      <LessonSection id="pilocytic" title={value(sections[1].label, lang)} icon="scan">
        {value(C.chapters[1].text, lang).split('\n\n').map((paragraph, index) => <p key={index} className={index === 0 ? styles.lead : undefined}>{paragraph}</p>)}
        <CasePanel lang={lang} />
        <p className={styles.imageTask}>{value(C.cystWallNote, lang)}</p>
        <p className={styles.imageTask}>{lang === 'fa' ? 'کار با تصویر: ابتدا مایع کیست را در T1 بررسی کنید، سپس ندول دیواره‌ای و جذب آن در T1 پس از تزریق را دنبال کنید؛ FLAIR پنل سوم است.' : lang === 'en' ? 'Image task: identify the cyst fluid on T1, then trace the mural nodule and its enhancement on post-contrast T1; FLAIR is the third panel.' : 'Bildaufgabe: Beurteilen Sie zuerst die Zystenflüssigkeit in T1, dann den Wandknoten und seine Aufnahme in T1 nach Kontrastmittel; FLAIR ist das dritte Panel.'}</p>
      </LessonSection>
      <LessonSection id="differential" title={value(sections[2].label, lang)} icon="brain">
        <p>{value(C.chapters[2].text, lang).split('\n\n')[0]}</p>
        <div className={styles.scopeNote}><strong>{lang === 'fa' ? 'دامنهٔ منبع' : lang === 'en' ? 'Source scope' : 'Quellenumfang'}</strong><p>{value(C.chapters[2].text, lang).split('\n\n')[1]}</p></div>
        <p className={styles.sourceConflict}>{value(C.sourceConflict, lang)}</p>
      </LessonSection>
      <LessonSection id="self-check" title={value(sections[3].label, lang)} icon="check"><SelfCheck lang={lang} /></LessonSection>
      <LessonSection id="take-home" title={value(sections[4].label, lang)} icon="summary" emphasis>
        <TakeHomeList items={[
          { title: lang === 'fa' ? 'گروه را از ابتدا جدا کنید' : lang === 'en' ? 'Separate the families first' : 'Gruppen zuerst trennen', detail: lang === 'fa' ? 'آستروسیتوم پیلوسیتیک در گروه آستروسیتی محدودشده است، نه در گروه آستروسیتوم منتشر IDH-mutant بزرگسالان.' : lang === 'en' ? 'Pilocytic astrocytoma belongs to the circumscribed astrocytic group, separate from adult-type diffuse astrocytoma, IDH-mutant.' : 'Das pilozytische Astrozytom gehört zur Gruppe der zirkumskripten astrozytären Gliome, getrennt vom adulten diffusen Astrozytom, IDH-mutiert.' },
          { title: lang === 'fa' ? 'الگوی کلاسیک را جست‌وجو کنید' : lang === 'en' ? 'Look for the classic pattern' : 'Klassisches Muster suchen', detail: lang === 'fa' ? 'کیست بزرگ همراه ندول دیواره‌ایِ کنتراست‌گیر با آستروسیتوم پیلوسیتیک سازگار است؛ ندول دیواره‌ای به‌تنهایی اختصاصی نیست.' : lang === 'en' ? 'A large cyst with an enhancing mural nodule is compatible with pilocytic astrocytoma; a mural nodule alone is not specific.' : 'Eine große Zyste mit kontrastmittelaufnehmendem Wandknoten passt zu einem pilozytischen Astrozytom; der Wandknoten allein ist nicht spezifisch.' },
          { title: lang === 'fa' ? 'افتراق را باز نگه دارید' : lang === 'en' ? 'Keep the differential open' : 'Differenzialdiagnose offenhalten', detail: lang === 'fa' ? 'محل، سن، توالی‌ها و زمینهٔ بالینی را یکجا ارزیابی کنید؛ تصویر به‌تنهایی نوع مولکولی یا تشخیص نهایی را تعیین نمی‌کند.' : lang === 'en' ? 'Assess location, age, sequences and clinical context together; imaging alone does not establish molecular type or a final diagnosis.' : 'Lokalisation, Alter, Sequenzen und klinischen Kontext gemeinsam bewerten; die Bildgebung allein bestimmt weder den molekularen Typ noch die endgültige Diagnose.' },
        ]} />
      </LessonSection>
    </div>
  </StandardLessonShell>
}
