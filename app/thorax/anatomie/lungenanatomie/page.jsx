'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { L, LUNGENANATOMIE as D, getLungenanatomieCheckFeedback, getLungenanatomieSegmentCheckFeedback } from '@/data/lungenanatomie'
import styles from './page.module.css'

const t = (value, lang) => value?.[lang] || value?.de || ''
function Icon({ id }) {
  const path = { lobule: 'M12 2 20 6v12l-8 4-8-4V6z M12 2v20 M4 6l16 12 M20 6 4 18', segments: 'M4 4h6v6H4z M14 4h6v6h-6z M4 14h6v6H4z M14 14h6v6h-6z', interstitium: 'M4 5h16v14H4z M4 9h16M8 5v14M15 5v14', variants: 'M3 18 9 6l4 8 3-5 5 9z', azygos: 'M5 20V4h7c4 0 7 3 7 7v9 M12 4c-1 5 0 9 4 12', takehome: 'M5 6h14M5 12h14M5 18h14' }[id] || 'M4 12h16'
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={path} /></svg>
}
function Section({ id, lang, children }) { return <LessonSection id={id} title={t(D.chapters.find(x => x.id === id).title, lang)} icon={id} bodyClassName={styles.body}>{children}</LessonSection> }
function Figure({ src, alt, caption, lang, className = '', legend }) { return <figure className={`${styles.figure} ${className}`}><img src={src} alt={t(alt, lang)} /><figcaption>{t(caption, lang)}{legend ? <p>{t(legend, lang)}</p> : null}</figcaption></figure> }

function Content({ lang }) {
  const [answer, setAnswer] = useState(null)
  const [segmentAnswer, setSegmentAnswer] = useState(null)
  const fa = lang === 'fa'
  return <div lang={lang} dir={fa ? 'rtl' : 'ltr'}>
    <Section id="lobule" lang={lang}>
      <p className={styles.lead}>{t(D.lobuleLead, lang)}</p>
      <p>{t(D.central, lang)}</p><p>{t(D.acinus, lang)}</p>
      <aside className={styles.cave}><strong>{t(L('Wenn der Azinus gefüllt ist', 'When an acinus is filled', 'وقتی آسینوس پر شده باشد'), lang)}</strong><p>{t(D.acinusOpacity, lang)}</p></aside>
      <Figure src="/educational/lungenanatomie/hero.svg" alt={D.alt} lang={lang} caption={D.imageTask} legend={D.diagramLegend} className={styles.diagram} />
    </Section>
    <Section id="segments" lang={lang}>
      <p className={styles.lead}>{t(D.segmentLead, lang)}</p>
      <Figure src="/educational/lungenanatomie/segments.svg" alt={D.segmentAlt} lang={lang} caption={D.segmentCaption} className={styles.segmentDiagram} />
      <div className={styles.segmentTableWrap}>
        <table className={styles.segmentTable}>
          <thead><tr><th scope="col">{t(L('Seite und Lappen', 'Side and lobe', 'سمت و لوب'), lang)}</th><th scope="col">{t(L('Segmente', 'Segments', 'سگمان‌ها'), lang)}</th></tr></thead>
          <tbody>{D.segmentRows.map(row => <tr key={row.lobe.de}><th scope="row">{t(row.lobe, lang)}</th><td>{t(row.segments, lang)}</td></tr>)}</tbody>
        </table>
      </div>
      <div className={styles.grid}>
        <article><h3>{t(L('Bronchien und Gefäße', 'Bronchi and vessels', 'برونش‌ها و عروق'), lang)}</h3><p>{t(D.segmentPrinciple, lang)}</p></article>
      </div>
      <aside className={styles.cave}><strong>{t(L('Linke Basalsegmente und Lingula', 'Left basal segments and lingula', 'سگمان‌های بازال چپ و لینگولا'), lang)}</strong><p>{t(D.segmentVariant, lang)}</p></aside>
      <aside className={styles.cave}><strong>{t(L('Segmentgrenzen im CT', 'Segment boundaries on CT', 'مرز سگمان‌ها در CT'), lang)}</strong><p>{t(D.segmentCT, lang)}</p></aside>
      <div className={styles.quiz}>
        <small>{t(L('Selbstcheck', 'Self-check', 'خودآزمایی'), lang)}</small><h3>{t(D.segmentCheck.question, lang)}</h3>
        {D.segmentCheck.options.map((option, index) => <button type="button" key={index} className={segmentAnswer === index ? styles.selected : ''} aria-pressed={segmentAnswer === index} onClick={() => setSegmentAnswer(index)}>{t(option, lang)}</button>)}
        {segmentAnswer !== null && <p className={segmentAnswer === D.segmentCheck.answer ? styles.correct : styles.feedback} aria-live="polite">{getLungenanatomieSegmentCheckFeedback(segmentAnswer, lang)}</p>}
      </div>
    </Section>
    <Section id="interstitium" lang={lang}>
      <div className={styles.grid}>
        <article><h3>{t(L('Axiales Interstitium', 'Axial interstitium', 'اینترستیتیوم آکسیال'), lang)}</h3><p>{t(D.axial, lang)}</p></article>
        <article><h3>{t(L('Peripheres Interstitium', 'Peripheral interstitium', 'اینترستیتیوم محیطی'), lang)}</h3><p>{t(D.peripheral, lang)}</p></article>
        <article><h3>{t(L('Intralobuläres Interstitium', 'Intralobular interstitium', 'اینترستیتیوم داخل‌لوبولی'), lang)}</h3><p>{t(D.intralobular, lang)}</p></article>
      </div>
    </Section>
    <Section id="variants" lang={lang}>
      <p className={styles.lead}>{t(D.variantLead, lang)}</p>
      <ul><li>{t(D.infracardiac, lang)}</li><li>{t(D.superior, lang)}</li><li>{t(D.leftHorizontal, lang)}</li></ul>
      <Figure src="/educational/lungenanatomie/accessory-fissures.png" alt={L('Radiographie und CT aus rID 23182 mit markiertem Lobus infracardiacus', 'Radiograph and CT from rID 23182 with the infracardiac lobe marked', 'رادیوگرافی و CT از rID 23182 با لوبوس اینفراکاردیاکوس علامت‌گذاری‌شده')} lang={lang} caption={D.infracardiacCaption} />
      <Figure src="/educational/lungenanatomie/superior-fissure.png" alt={L('Sagittale CT mit markierter oberer akzessorischer Fissur zwischen Segment 6 und den basalen Segmenten', 'Sagittal CT with the superior accessory fissure marked between segment 6 and the basal segments', 'CT ساژیتال با فیشور فرعی فوقانی علامت‌گذاری‌شده بین سگمان ۶ و سگمان‌های قاعده‌ای')} lang={lang} caption={D.superiorCaption} />
      <p>{t(D.variantsTask, lang)}</p>
    </Section>
    <Section id="azygos" lang={lang}>
      <p className={styles.lead}>{t(D.azygosLead, lang)}</p><p>{t(D.azygosImaging, lang)}</p>
      <Figure src="/educational/lungenanatomie/azygos-variant.png" alt={L('Thoraxaufnahme und CT-Beispiele aus Radiopaedia rID 13544 mit Azygosfissur und Azygosvene', 'Chest radiograph and CT examples from Radiopaedia rID 13544 with azygos fissure and vein', 'نمونه‌های رادیوگرافی و CT از Radiopaedia rID 13544 با فیشور و ورید آزایگوس')} lang={lang} caption={L('Thorax.pdf, PDF-Seite 9 (gedruckte Seite 8), Radiopaedia rID 13544: Azygosfissur im Apex; Quellpfeile markieren die feine Linie beziehungsweise die Vene. Lehrbeispiel, kein universelles Diagnoseschema.', 'Thorax.pdf, PDF page 9 (printed page 8), Radiopaedia rID 13544: azygos fissure at the apex; source arrows mark the fine line and vein. Teaching example, not a universal diagnostic template.', 'Thorax.pdf، صفحهٔ PDF شمارهٔ ۹ (شمارهٔ چاپی ۸)، Radiopaedia rID 13544: فیشور آزایگوس در اپکس؛ پیکان‌های منبع خط ظریف و ورید را نشان می‌دهند. نمونهٔ آموزشی است و الگوی تشخیصی همگانی نیست.'), lang} />
      <aside className={styles.cave}><strong>{t(L('Einordnen, nicht pathologisieren', 'Recognise the variant; do not pathologise it', 'واریانت را بشناسید، آن را بیماری تلقی نکنید'), lang)}</strong><p>{t(D.variantCave, lang)}</p></aside>
      <div className={styles.quiz}>
        <small>{t(L('Selbstcheck', 'Self-check', 'خودآزمایی'), lang)}</small><h3>{t(D.check.question, lang)}</h3>
        {D.check.options.map((option, index) => <button type="button" key={index} className={answer === index ? styles.selected : ''} aria-pressed={answer === index} onClick={() => setAnswer(index)}>{t(option, lang)}</button>)}
        {answer !== null && <p className={answer === D.check.answer ? styles.correct : styles.feedback} aria-live="polite">{getLungenanatomieCheckFeedback(answer, lang)}</p>}
      </div>
    </Section>
    <Section id="takehome" lang={lang}><TakeHomeList items={D.takeHome.map(item => ({ title: t(item.title, lang), detail: t(item.detail, lang) }))} /></Section>
  </div>
}

export default function LungAnatomyPage() {
  const { lang } = useLanguage()
  const sections = D.chapters.map(item => ({ ...item, label: t(item.title, lang) }))
  const labels = Object.fromEntries(Object.entries(D.labels).map(([key, value]) => [key, t(value, lang)]))
  const local = path => lang === 'de' ? path : `${path}?lang=${lang}`
  const sources = [
    { tag: t(L('Glossar', 'Glossary', 'واژه‌نامه'), lang), title: 'Bankier AA, MacMahon H, Colby T, et al. Fleischner Society: Glossary of Terms for Thoracic Imaging. Radiology. 2024;310(2):e232558. doi:10.1148/radiol.232558.', href: 'https://doi.org/10.1148/radiol.232558', citation: t(L('Begriffe Lobulus sekundarius, Azinus und pulmonales Interstitium.', 'Definitions of secondary pulmonary lobule, acinus and pulmonary interstitium.', 'تعریف لوبول ثانویه، آسینوس و اینترستیتیوم ریوی.'), lang) },
    { tag: t(L('Übersicht', 'Review', 'مرور'), lang), title: 'Ohno Y, et al. Pulmonary Functional Imaging: Part 1—State-of-the-Art Technical and Physiologic Underpinnings. Radiology. 2021;299(3):508–523. doi:10.1148/radiol.2021203711.', href: 'https://doi.org/10.1148/radiol.2021203711', citation: t(L('Größenordnung und Aufbau des sekundären Lobulus.', 'Scale and structure of the secondary pulmonary lobule.', 'ابعاد و ساختار لوبول ثانویه.'), lang) },
    { tag: t(L('Bildgebung', 'Imaging', 'تصویربرداری'), lang), title: 'CT Findings of Azygos Venous System: Congenital Variants (2024)', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10864146/', citation: t(L('Embryologischer Verlauf und Bildzeichen des Azygoslappens.', 'Embryological course and imaging signs of the azygos lobe.', 'مسیر جنینی و نشانه‌های تصویری لوب آزایگوس.'), lang) },
    { tag: t(L('Anatomie', 'Anatomy', 'آناتومی'), lang), title: 'Siddharthan S, et al. A multi-stage 3D convolutional neural network algorithm for CT-based lung segment parcellation. J Appl Clin Med Phys. 2025. doi:10.1002/acm2.70193.', href: 'https://doi.org/10.1002/acm2.70193', citation: t(L('Tabelle 1: Segmentbezeichnungen und gemeinsame Benennung S7/8 links; Abschnitt 1: die meisten Segmentgrenzen sind im klinischen CT nicht klar sichtbar.', 'Table 1: segment nomenclature and combined left S7/8 naming; section 1: most segment boundaries are not clearly visible on clinical CT.', 'جدول ۱: نام‌گذاری سگمان‌ها و عنوان مشترک S7/8 چپ؛ بخش ۱: مرز بیشتر سگمان‌ها در CT بالینی واضح نیست.'), lang) },
    { tag: t(L('Anatomische Übersicht', 'Anatomical review', 'مرور آناتومیک'), lang), title: 'Pulmonary vascular anatomy & anatomical variants. 2018. PMC6039811.', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6039811/', citation: t(L('Bronchopulmonale Segmente werden durch Segmentbronchus und begleitende Arterie definiert; links können S7+8 zusammengefasst sein.', 'Bronchopulmonary segments are defined by a segmental bronchus and accompanying artery; left S7+8 may be combined.', 'سگمان برونکوپولمونری با برونش سگمنتال و شریان همراه تعریف می‌شود؛ S7+8 چپ می‌تواند به‌صورت مشترک نام‌گذاری شود.'), lang) },
  ]
  return <StandardLessonShell lessonId="lungenanatomie" lang={lang} title={t(D.title, lang)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: local('/') }, { label: t(L('Thorax', 'Thorax', 'قفسهٔ سینه'), lang), href: local('/lernen/thorax') }, { label: t(L('Anatomie', 'Anatomy', 'آناتومی'), lang) }, { label: t(D.title, lang) }]}
    sections={sections} labels={labels} renderIcon={id => <Icon id={id} />} actions={{}} syncHashNavigation
    heroImageAlt={t(D.alt, lang)}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/educational/lungenanatomie/hero.svg', heroImageOpacity: .95, accent: '#54c5c2', accentStrong: '#155d70', accentSoft: '#d9f4f0', secondary: '#e89abb', secondaryStrong: '#8b3458', heroBase: '#101b2d' }} className={styles.page}
    sources={<LessonSources title={labels.sources} items={sources} note={t(L('Abdeckungsquelle: Thorax.pdf, PDF-Seiten 5–9 (gedruckte Seiten 4–8), einschließlich der Segmentkarte auf PDF-Seite 7 (Druckseite 6). Die Segmentübersicht ist ein neu erstelltes Code-Schema; die CT/Röntgen-Ausschnitte zu Fissuren und Azygosvariante stammen aus diesem Nutzer-PDF. Bezeichnungen und CT-Grenzen wurden anhand der aufgeführten Literatur abgeglichen.', 'Coverage source: Thorax.pdf, PDF pages 5–9 (printed pages 4–8), including the segment map on PDF page 7 (printed page 6). The segment overview is a newly authored code schematic; the fissure and azygos CT/radiograph crops come from the supplied PDF. Nomenclature and CT boundary visibility were checked against the cited literature.', 'منبع پوشش: Thorax.pdf، صفحات PDF شمارهٔ ۵ تا ۹ (صفحات چاپی ۴ تا ۸)، شامل نقشهٔ سگمان‌ها در صفحهٔ PDF شمارهٔ ۷ (صفحهٔ چاپی ۶). نمای سگمان‌ها شماتیکی است که از نو با کد ساخته شده؛ برش‌های CT و رادیوگرافی فیشورها و واریانت آزایگوس از همین PDF کاربر هستند. نام‌گذاری و قابل‌مشاهده‌بودن مرزها در CT با منابع ذکرشده تطبیق داده شده‌اند.'), lang)} />}>
      <Content lang={lang} />
    </StandardLessonShell>
}
