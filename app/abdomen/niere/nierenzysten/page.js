'use client'

import { useState } from 'react'
import StandardLessonShell, { LessonSection, LessonSources, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const C = {
  de: {
    title: 'Zystische Nierenmassen', subtitle: 'Erst Enhancement und Morphologie prüfen, dann Bosniak v2019 zuordnen.',
    goals: ['Zystische Masse von solidem Tumor mit zystischer Nekrose unterscheiden.', 'Wand, Septen und Noduli systematisch beschreiben.', 'Die zentrale Unterscheidung zwischen Bosniak I/II, IIF, III und IV anwenden.'],
    lead: 'Einfache Nierenzysten sind häufig und meist unkompliziert. Bei komplexer Morphologie entscheidet vor allem, ob Wand, Septen oder ein Nodulus tatsächlich kontrastmittelaufnehmendes Gewebe enthalten.',
    methodTitle: 'Vor der Klassifikation: die Masse richtig einordnen', method: [
      ['Geltungsbereich', 'Bosniak v2019 ist für zystische Nierenmassen vorgesehen, nachdem infektiöse, entzündliche oder vaskuläre Ursachen und ein solider Tumor mit Nekrose ausgeschlossen wurden. Als zystisch gilt hier eine Masse mit weniger als etwa 25 % kontrastmittelaufnehmendem Gewebe.'],
      ['Untersuchung', 'CT und MRT können verwendet werden. Für die Kategorie sind Morphologie und Enhancement entscheidend; eine arterielle und portalvenöse Phase allein ist keine vollständige Protokollvorgabe. Bei unklarer Enhancementfrage Untersuchungstechnik und Vergleichsaufnahmen mitbeurteilen.'],
      ['Begriffe', 'Wand, Septen, Verkalkungen und protrudierende Komponenten beschreiben. „Enhancement“ nicht mit bloßer Dichte oder Signalintensität verwechseln. Für die Klassifikation die verwendete Version nennen.'],
    ],
    classTitle: 'Bosniak v2019: welches Merkmal verschiebt die Kategorie?',
    classes: [
      ['I', 'Einfache, homogene Zyste mit glatter dünner Wand (≤2 mm); keine komplexen Merkmale.', 'Gutartige Zyste.'],
      ['II', 'Wenige dünne Septen (≤2 mm; bis 3), die auch Enhancement zeigen können; bestimmte homogene hyperattenuierende Läsionen oder Verkalkungen allein sind nicht automatisch höhergradig.', 'Weiterhin niedriges Risiko.'],
      ['IIF', 'Viele (≥4) dünne Septen (≤2 mm) mit Enhancement, eine glatt minimal verdickte (3 mm) anreichernde Wand/ein Septum oder eine nicht anreichernde, heterogen T1-hyperintense Läsion in fettgesättigter MRT.', 'F steht für Follow-up; Verlauf gehört in den klinischen/urologischen Kontext.'],
      ['III', 'Kontrastmittelaufnehmende dicke (≥4 mm) oder unregelmäßige Wand/Septen; eine unregelmäßige Vorwölbung mit stumpfen Winkeln ≤3 mm ist noch kein Nodulus.', 'Indeterminiert; Bildgebung allein legt Histologie oder Therapie nicht fest.'],
      ['IV', 'Mindestens ein kontrastmittelaufnehmender Nodulus: Vorwölbung mit spitzen Winkeln jeder Größe oder stumpfen Winkeln ≥4 mm.', 'Höhere Wahrscheinlichkeit einer Malignität; Managemententscheidung ist nicht Teil dieser Lektion.'],
    ],
    cave: 'Die Bosniak-Klasse ist eine bildgebende Risikostratifizierung, keine histologische Diagnose und kein automatischer Behandlungsbefehl. Wenn Merkmale verschiedener Klassen vorliegen, gilt in v2019 grundsätzlich die höchste zutreffende Klasse; atypische oder technisch unklare Fälle brauchen eine gezielte fachliche Einordnung.',
    checkQ: 'Eine zystische Nierenmasse hat fünf dünne, kontrastmittelaufnehmende Septen, aber keine dicke Wand und keinen Nodulus. Welches Merkmal spricht am ehesten für die Kategorie?',
    options: ['Bosniak IIF: viele dünne, anreichernde Septen', 'Bosniak III: jede Septenaufnahme bedeutet dicke unregelmäßige Septen', 'Bosniak IV: jedes Enhancement ist ein Nodulus'],
    good: 'Richtig. Bei v2019 sprechen mindestens vier dünne, kontrastmittelaufnehmende Septen für IIF. Entscheidend ist die Zahl und Morphologie, nicht allein das Vorhandensein irgendeines Enhancements.',
    retry: 'Noch einmal prüfen: Enhancement allein macht eine Läsion nicht zu Bosniak III oder IV. Hier sind die Septen dünn, zahlreich und es gibt keinen Nodulus.',
    summary: [['Enhancement und MRT-Ausnahme', 'Wand-, Septen- und Nodulusmerkmale erfordern echtes Enhancement; eine nicht anreichernde, heterogen T1-hyperintense Läsion in fettgesättigter MRT ist eine definierte IIF-Ausnahme.'], ['Morphologie trennen', 'Dicke/Unregelmäßigkeit der Wand und Septen vom kontrastmittelaufnehmenden Nodulus unterscheiden.'], ['Version nennen', 'Bosniak-Klasse als Risikoeinordnung und nicht als Histologie oder Therapieentscheidung berichten.']],
    source: 'Quellabdeckung: Abdomen.pdf, S. 46 (visuell geprüft; die dortigen Risikozahlen und Handlungsvorschläge sind nicht übernommen, da die Tabelle keine Versionsangabe enthält). Aktuelle Klassifikation: Silverman et al., Radiology 2019; 292:475–488. DOI 10.1148/radiol.2019182646.',
  },
  en: {
    title: 'Cystic renal masses', subtitle: 'Assess enhancement and morphology first, then assign Bosniak v2019.',
    goals: ['Distinguish a cystic mass from a solid tumour with cystic necrosis.', 'Describe the wall, septa and nodules systematically.', 'Apply the key distinction between Bosniak I/II, IIF, III and IV.'],
    lead: 'Simple renal cysts are common and usually uncomplicated. In a complex mass, the key question is whether the wall, septa or a nodule contain genuinely enhancing tissue.',
    methodTitle: 'Before classification: define the mass', method: [
      ['Scope', 'Bosniak v2019 is intended for cystic renal masses after excluding infectious, inflammatory or vascular causes and a solid tumour with necrosis. In this system, a cystic mass contains less than approximately 25% enhancing tissue.'],
      ['Examination', 'CT and MRI can be used. Morphology and enhancement determine the category; arterial and portal venous phases alone are not a complete protocol specification. If enhancement is uncertain, assess technique and comparison studies.'],
      ['Terms', 'Describe the wall, septa, calcification and protruding components. Do not confuse enhancement with attenuation or signal intensity alone. State the classification version used.'],
    ],
    classTitle: 'Bosniak v2019: which feature changes the category?',
    classes: [
      ['I', 'Simple homogeneous cyst with a smooth thin wall (≤2 mm) and no complex features.', 'Benign cyst.'],
      ['II', 'Few thin septa (≤2 mm; up to 3), which may enhance; certain homogeneous hyperattenuating lesions or calcification alone do not automatically mean a higher class.', 'Still low risk.'],
      ['IIF', 'Many (≥4) thin septa (≤2 mm) with enhancement, a smooth minimally thickened (3 mm) enhancing wall/septum, or a nonenhancing heterogeneously T1-hyperintense mass on fat-suppressed MRI.', 'F means follow-up; surveillance belongs in clinical/urological context.'],
      ['III', 'Enhancing thick (≥4 mm) or irregular wall/septa; an irregular protrusion with obtuse margins ≤3 mm is not a nodule.', 'Indeterminate; imaging alone does not establish histology or treatment.'],
      ['IV', 'At least one enhancing nodule: a protrusion with acute margins of any size or obtuse margins ≥4 mm.', 'Higher likelihood of malignancy; management decisions are outside this lesson.'],
    ],
    cave: 'The Bosniak class is imaging-based risk stratification, not a histological diagnosis or an automatic treatment instruction. When features span classes, v2019 generally assigns the highest applicable class; atypical or technically uncertain cases need focused specialist interpretation.',
    checkQ: 'A cystic renal mass has five thin enhancing septa, with no thick wall and no nodule. Which feature most strongly determines the category?',
    options: ['Bosniak IIF: multiple thin enhancing septa', 'Bosniak III: any enhancing septum is thick and irregular', 'Bosniak IV: any enhancement is a nodule'],
    good: 'Correct. In v2019, at least four thin enhancing septa support IIF. Number and morphology matter; enhancement alone does not define a higher class.',
    retry: 'Review the morphology: enhancement alone does not make a lesion Bosniak III or IV. Here the septa are thin and numerous, with no nodule.',
    summary: [['Enhancement and the MRI exception', 'Wall, septal and nodule criteria require true enhancement; a nonenhancing heterogeneously T1-hyperintense mass on fat-suppressed MRI is a defined IIF exception.'], ['Separate morphology', 'Distinguish thick/irregular wall or septa from an enhancing nodule.'], ['Name the version', 'Report the Bosniak class as risk stratification, not histology or a treatment decision.']],
    source: 'Coverage: Abdomen.pdf, p. 46 (visually checked; its malignancy percentages and management suggestions were not carried forward because the table does not specify a version). Current classification: Silverman et al., Radiology 2019; 292:475–488. DOI 10.1148/radiol.2019182646.',
  },
  fa: {
    title: 'توده‌های کیستیک کلیه', subtitle: 'ابتدا تقویت و مورفولوژی را ارزیابی کنید، سپس بر پایه Bosniak v2019 طبقه‌بندی کنید.',
    goals: ['توده کیستیک را از تومور جامدی که نکروز کیستیک دارد جدا کنید.', 'دیواره، سپتا و ندول را به‌طور منظم توصیف کنید.', 'تفاوت کلیدی میان Bosniak I/II، IIF، III و IV را به‌کار ببرید.'],
    lead: 'کیست‌های ساده کلیه شایع‌اند و اغلب بدون عارضه هستند. در توده پیچیده، پرسش اصلی این است که آیا دیواره، سپتا یا ندول واقعاً بافت تقویت‌شونده دارد.',
    methodTitle: 'پیش از طبقه‌بندی: ماهیت توده را مشخص کنید', method: [
      ['دامنه', 'Bosniak v2019 برای توده‌های کیستیک کلیه به‌کار می‌رود، پس از کنارگذاشتن علت عفونی، التهابی یا عروقی و نیز تومور جامدِ دارای نکروز. در این سامانه، کمتر از حدود ۲۵٪ توده از بافت تقویت‌شونده تشکیل شده است.'],
      ['بررسی تصویری', 'CT و MRI قابل استفاده‌اند. مورفولوژی و تقویت، طبقه را تعیین می‌کنند؛ فاز شریانی و پورتوونوز به‌تنهایی دستورالعمل کامل پروتکل نیستند. اگر تقویت نامشخص است، کیفیت فنی و تصاویر قبلی را هم بسنجید.'],
      ['واژگان', 'دیواره، سپتا، کلسیفیکاسیون و اجزای برجسته‌شده را توصیف کنید. تقویت را با دانسیته یا شدت سیگنال به‌تنهایی یکی ندانید. نسخه طبقه‌بندی را ذکر کنید.'],
    ],
    classTitle: 'Bosniak v2019: کدام ویژگی طبقه را تغییر می‌دهد؟',
    classes: [
      ['I', 'کیست ساده و همگن با دیواره صاف و نازک (≤۲ میلی‌متر)، بدون ویژگی پیچیده.', 'کیست خوش‌خیم.'],
      ['II', 'چند سپتای نازک (≤۲ میلی‌متر؛ حداکثر ۳ عدد) که ممکن است تقویت شوند؛ برخی ضایعات همگن با دانسیته بالا یا کلسیفیکاسیون به‌تنهایی الزاماً طبقه بالاتری ندارند.', 'همچنان کم‌خطر.'],
      ['IIF', 'سپتاهای نازک (≤۲ میلی‌متر) متعدد (≥۴) با تقویت، دیواره/سپتای صاف و اندکی ضخیم‌شده (ضخامت ۳ میلی‌متر) با تقویت، یا توده‌ای بدون تقویت که در MRI با سرکوب چربی در T1 به‌طور ناهمگن پرسیگنال است.', 'F به معنی پیگیری است؛ برنامه پیگیری به زمینه بالینی و ارزیابی اورولوژی وابسته است.'],
      ['III', 'دیواره یا سپتاهای تقویت‌شونده ضخیم (≥۴ میلی‌متر) یا نامنظم؛ برجستگی نامنظم با زاویه‌های باز و اندازه ≤۳ میلی‌متر هنوز ندول محسوب نمی‌شود.', 'نامعین؛ تصویربرداری به‌تنهایی بافت‌شناسی یا درمان را تعیین نمی‌کند.'],
      ['IV', 'دست‌کم یک ندول تقویت‌شونده: برجستگی با زاویه تیز در هر اندازه، یا با زاویه باز و اندازه ≥۴ میلی‌متر.', 'احتمال بدخیمی بیشتر است؛ تصمیم مدیریتی خارج از دامنه این درس است.'],
    ],
    cave: 'طبقه Bosniak یک برآورد خطر بر پایه تصویربرداری است، نه تشخیص بافت‌شناسی یا فرمان خودکار برای درمان. اگر ویژگی‌ها با چند طبقه تطبیق دارند، در v2019 معمولاً بالاترین طبقه قابل‌انطباق انتخاب می‌شود؛ موارد نامعمول یا از نظر فنی نامشخص به تفسیر تخصصی نیاز دارند.',
    checkQ: 'در یک توده کیستیک کلیه پنج سپتای نازکِ تقویت‌شونده دیده می‌شود؛ دیواره ضخیم و ندول وجود ندارد. کدام ویژگی بیشترین نقش را در طبقه‌بندی دارد؟',
    options: ['Bosniak IIF: سپتاهای نازک و تقویت‌شونده متعدد', 'Bosniak III: هر سپتای تقویت‌شونده ضخیم و نامنظم است', 'Bosniak IV: هر نوع تقویت به معنی ندول است'],
    good: 'درست است. در نسخه ۲۰۱۹، دست‌کم چهار سپتای نازک و تقویت‌شونده با طبقه IIF سازگار است. تعداد و مورفولوژی مهم‌اند؛ صرف تقویت، طبقه بالاتر را تعیین نمی‌کند.',
    retry: 'مورفولوژی را دوباره بررسی کنید: تقویت به‌تنهایی ضایعه را Bosniak III یا IV نمی‌کند. در این مورد سپتاها نازک و متعددند و ندولی وجود ندارد.',
    summary: [['تقویت و استثنای MRI', 'معیارهای دیواره، سپتا و ندول به تقویت واقعی نیاز دارند؛ توده بدون تقویت اما با سیگنال ناهمگن بالای T1 در MRI با سرکوب چربی، استثنای مشخص IIF است.'], ['مورفولوژی را جدا کنید', 'دیواره یا سپتای ضخیم/نامنظم را از ندول تقویت‌شونده جدا کنید.'], ['نسخه را ذکر کنید', 'طبقه را برآورد خطر بدانید، نه تشخیص بافت‌شناسی یا تصمیم درمانی.']],
    source: 'پوشش منبع: Abdomen.pdf، صفحه ۴۶ (دیداری بررسی شد؛ درصدهای بدخیمی و پیشنهادهای اقدام در جدول منبع وارد درس نشدند، چون نسخه طبقه‌بندی مشخص نیست). طبقه‌بندی جاری: Silverman و همکاران، Radiology 2019؛ 292:475–488. DOI 10.1148/radiol.2019182646.',
  },
}

const t = (value, lang) => value?.[lang] || value?.de || ''
const L = (de, en, fa) => ({ de, en, fa })
function Icon({ id }) { return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7"><path d={id === 'classes' ? 'M4 5h16v14H4z M4 10h16M9 5v14M15 5v14' : id === 'self-check' ? 'M5 12h14M12 5v14' : 'M5 6h14M5 12h14M5 18h14'} /></svg> }
function Section({ id, lang, children }) { const labels = { method: L('Vor der Klassifikation', 'Before classification', 'پیش از طبقه‌بندی'), classes: L('Bosniak v2019', 'Bosniak v2019', 'Bosniak v2019') }; return <LessonSection id={id} title={t(labels[id], lang)} icon={id} bodyClassName={styles.body}>{children}</LessonSection> }
function Content({ lang }) {
  const [answer, setAnswer] = useState(null)
  const c = C[lang]
  return <div className={styles.page} lang={lang} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
    <Section id="method" lang={lang}><p className={styles.lead}>{c.lead}</p><div className={styles.cards}>{c.method.map(([heading, text]) => <article key={heading}><h3>{heading}</h3><p>{text}</p></article>)}</div></Section>
    <Section id="classes" lang={lang}><h2>{c.classTitle}</h2><div className={styles.tableWrap}><table><thead><tr><th>{t(L('Bosniak', 'Bosniak', 'Bosniak'), lang)}</th><th>{t(L('Morphologie', 'Morphology', 'مورفولوژی'), lang)}</th><th>{t(L('Einordnung', 'Interpretation', 'برداشت'), lang)}</th></tr></thead><tbody>{c.classes.map(([category, morphology, meaning]) => <tr key={category}><th scope="row">{category}</th><td>{morphology}</td><td>{meaning}</td></tr>)}</tbody></table></div><aside className={styles.cave}><strong>⚠</strong><p>{c.cave}</p></aside></Section>
    <LessonSection id="self-check" title={t(L('Selbstcheck: Septen zählen und einordnen', 'Self-check: count and classify septa', 'خودآزمایی: سپتاها را بشمارید و طبقه‌بندی کنید'), lang)} icon="self-check" bodyClassName={styles.body}><div className={styles.quiz}><h3>{c.checkQ}</h3>{c.options.map((option, index) => <button type="button" key={option} className={answer === index ? styles.selected : ''} aria-pressed={answer === index} onClick={() => setAnswer(index)}>{option}</button>)}{answer !== null ? <p className={answer === 0 ? styles.correct : styles.feedback} role="status" aria-live="polite">{answer === 0 ? c.good : c.retry}</p> : null}</div></LessonSection>
    <LessonSection id="takehome" title={t(L('Drei Regeln für den Befund', 'Three reporting rules', 'سه قاعده برای گزارش'), lang)} icon="takehome" bodyClassName={styles.body} emphasis><TakeHomeList items={c.summary.map(([title, detail]) => ({ title, detail }))} /></LessonSection>
  </div>
}

export default function RenalCystsPage() {
  const { lang } = useLanguage()
  const c = C[lang] || C.de
  const sections = [
    { id: 'method', label: t(L('Vor der Klassifikation', 'Before classification', 'پیش از طبقه‌بندی'), lang), icon: 'method' },
    { id: 'classes', label: t(L('Bosniak v2019', 'Bosniak v2019', 'Bosniak v2019'), lang), icon: 'classes' },
    { id: 'self-check', label: t(L('Selbstcheck', 'Self-check', 'خودآزمایی'), lang), icon: 'self-check' },
    { id: 'takehome', label: t(L('Drei Regeln', 'Three rules', 'سه قاعده'), lang), icon: 'takehome', emphasis: true },
  ]
  const labels = Object.fromEntries(Object.entries({ complete: L('Als gelesen markieren', 'Mark as read', 'به‌عنوان خوانده‌شده علامت بزنید'), completed: L('Gelesen', 'Read', 'خوانده شد'), continue: L('Weiter', 'Continue', 'ادامه'), path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'), progress: L('Fortschritt', 'Progress', 'پیشرفت'), takeHome: L('Drei Regeln', 'Three rules', 'سه قاعده'), sources: L('Quellen', 'Sources', 'منابع'), close: L('Schließen', 'Close', 'بستن'), contents: L('Seitenpfad', 'Breadcrumb', 'مسیر صفحه'), open: L('Öffnen', 'Open', 'بازکردن'), completeLesson: L('Lektion abschließen', 'Complete lesson', 'درس را کامل کنید'), lessonCompleted: L('Lektion abgeschlossen', 'Lesson completed', 'درس کامل شد') }).map(([key, value]) => [key, t(value, lang)]))
  const local = href => {
    const [path, hash] = href.split('#', 2)
    const localizedPath = lang === 'de' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
    return hash ? `${localizedPath}#${hash}` : localizedPath
  }
  const lessonReturn = local('/abdomen/niere/nierenzysten#classes')
  const sources = [{ tag: t(L('Klassifikation', 'Classification', 'طبقه‌بندی'), lang), title: 'Silverman SG, Pedrosa I, Ellis JH, et al. Bosniak Classification of Cystic Renal Masses, Version 2019: An Update Proposal and Needs Assessment. Radiology. 2019;292:475–488. doi:10.1148/radiol.2019182646.', href: 'https://doi.org/10.1148/radiol.2019182646', citation: t(L('Primärpublikation mit den Kriterien der Version 2019.', 'Primary proposal defining the version 2019 criteria.', 'مقاله اصلی و معیارهای نسخه ۲۰۱۹.'), lang) }]
  return <StandardLessonShell lessonId="abdomen-renal-cysts" lang={lang} title={c.title} author="RadYar"
    breadcrumbs={[{ label: 'RadYar', href: local('/') }, { label: t(L('Abdomen', 'Abdomen', 'شکم'), lang), href: local('/lernen/abdomen') }, { label: t(L('Niere', 'Kidney', 'کلیه'), lang) }, { label: c.title }]}
    sections={sections} labels={labels} renderIcon={id => <Icon id={id} />} actions={{
      mcq: { label: t(L('Bosniak-Morphologie üben', 'Practise Bosniak morphology', 'تمرین مورفولوژی Bosniak'), lang), href: local(`/ueben/quiz?fach=abdomen&n=1&themen=nierenzysten&from=${encodeURIComponent(lessonReturn)}`) },
      flashcards: { label: t(L('Bosniak-Lernkarte', 'Bosniak flashcard', 'فلش‌کارت Bosniak'), lang), href: local(`/flashcards/nierenzysten?from=${encodeURIComponent(lessonReturn)}`) },
    }} syncHashNavigation heroImageAlt={t(L('Code-native Schema einer zystischen Nierenmasse; keine Patientenaufnahme.', 'Code-native schematic of a cystic renal mass; not a patient image.', 'شماتیک کدنویسی‌شده از توده کیستیک کلیه؛ تصویر بیمار نیست.'), lang)}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/educational/nierenzysten/hero.svg', heroImageOpacity: .95, accent: '#4caeb9', accentStrong: '#145f69', accentSoft: '#dff3f2', secondary: '#d69c5b', secondaryStrong: '#784316', heroBase: '#101b2d' }} className={styles.page}
    sources={<LessonSources title={labels.sources} items={sources} note={c.source} />}><Content lang={lang} /></StandardLessonShell>
}
