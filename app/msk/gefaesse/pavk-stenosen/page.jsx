'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => value?.[lang] ?? value?.de ?? value
const id = 'gefaesse-pavk-stenosen'
const title = L('pAVK: Stenosen erkennen und einordnen', 'PAD: recognising and characterising stenoses', 'بیماری شریانی محیطی: شناخت و توصیف تنگی‌ها')
const labels = {
  contents: L('Lektionsinhalt', 'Lesson contents', 'محتوای درس'),
  path: L('Lernweg', 'Learning path', 'مسیر یادگیری'), progress: L('gelesen', 'read', 'خوانده‌شده'), continue: L('Weiterlernen', 'Continue learning', 'ادامه یادگیری'),
  completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'), lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'این بخش را خواندم'), completed: L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده'), open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'), close: L('Schließen', 'Close', 'بستن'),
  takeHome: L('Die wichtigsten Regeln', 'Key takeaways', 'نکات کلیدی'), sourceTitle: L('Quellen und Umfang', 'Sources and scope', 'منابع و دامنه'),
}
const chapters = [
  {
    id: 'presentation', icon: 'case', title: L('Welche klinische Präsentation liegt vor?', 'Which clinical presentation is present?', 'تظاهر بالینی کدام است؟'),
    lead: L('Die Fontaine-Klassifikation ordnet die klinische Präsentation von asymptomatischer pAVK bis zu Gewebeverlust. Die Gehstrecke kann Beschwerden beschreiben, ist aber kein universeller Grenzwert für die heutige Einordnung.', 'Fontaine classifies clinical presentation from asymptomatic PAD to tissue loss. Walking distance can describe symptoms, but it is not a universal threshold for current classification.', 'طبقه‌بندی فونتن تظاهر بالینی را از بیماری بدون علامت تا از دست‌رفتن بافت دسته‌بندی می‌کند. مسافت راه‌رفتن می‌تواند علامت را توصیف کند، اما آستانه‌ای همگانی برای طبقه‌بندی امروز نیست.'),
    rows: [
      [L('I · asymptomatisch', 'I · asymptomatic', 'I · بدون علامت'), L('Keine typische Belastungssymptomatik; Pulse können abgeschwächt sein.', 'No typical exertional symptoms; pulses may be reduced.', 'علامت معمول هنگام فعالیت وجود ندارد؛ نبض‌ها ممکن است ضعیف باشند.')],
      [L('II · Claudicatio', 'II · claudication', 'II · لنگش متناوب'), L('Belastungsabhängiger Schmerz; Fontaine unterscheidet IIa/IIb nach Gehstrecke.', 'Exertional pain; Fontaine subdivides IIa/IIb by walking distance.', 'درد وابسته به فعالیت؛ فونتن زیرگروه‌های IIa/IIb را بر اساس مسافت راه‌رفتن جدا می‌کند.')],
      [L('III · Ruheschmerz', 'III · rest pain', 'III · درد در حالت استراحت'), L('Ischämischer Ruheschmerz, oft distal; heutige Einordnung im klinischen Gesamtkontext.', 'Ischaemic rest pain, often distal; interpret in the full clinical context.', 'درد ایسکمیک در استراحت، اغلب دیستال؛ در زمینه بالینی کلی تفسیر شود.')],
      [L('IV · Gewebeverlust', 'IV · tissue loss', 'IV · از دست‌رفتن بافت'), L('Ulkus oder Gangrän; bei chronischem Verlauf an chronische gliedmaßenbedrohende Ischämie (CLTI) denken.', 'Ulceration or gangrene; consider chronic limb-threatening ischaemia (CLTI) in a chronic presentation.', 'زخم یا گانگرن؛ در تظاهر مزمن، ایسکمی مزمن تهدیدکننده اندام (CLTI) را در نظر بگیرید.')],
    ], note: L('Die PDF-Zuordnung „> / < 200 m“ sowie daraus abgeleitete Interventionsschritte sind eine vereinfachte Quellennotiz, keine aktuelle Behandlungsregel. Fontaine ist eine klinische Klassifikation, kein Ersatz für die heutige Beurteilung von CLTI und Dringlichkeit.', 'The PDF’s “> / < 200 m” split and intervention steps are a simplified source note, not current treatment rules. Fontaine is a clinical classification, not a substitute for contemporary assessment of CLTI and urgency.', 'تقسیم‌بندی PDF بر اساس «بیشتر/کمتر از ۲۰۰ متر» و مراحل مداخله، یادداشت ساده‌شده منبع است و قاعده درمانی امروز نیست. فونتن طبقه‌بندی بالینی است و جایگزین ارزیابی امروزی CLTI و فوریت آن نمی‌شود.'),
  },
  {
    id: 'imaging', icon: 'scope', title: L('Welche Bildgebung beantwortet welche Frage?', 'Which imaging answers which question?', 'هر روش تصویربرداری به چه پرسشی پاسخ می‌دهد؟'),
    lead: L('Duplexsonographie ist laut ESC 2024 die Bildgebung der ersten Wahl zur Bestätigung von pAVK-Läsionen. CTA und MRA ergänzen die anatomische Planung; DSA ist heute überwiegend mit einer geplanten Intervention verbunden.', 'The 2024 ESC guideline identifies duplex ultrasound as first-line imaging to confirm PAD lesions. CTA and MRA add anatomic detail for planning; DSA is now mostly tied to a planned intervention.', 'بر اساس راهنمای ESC سال ۲۰۲۴، سونوگرافی داپلکس روش تصویربرداری خط اول برای تأیید ضایعات PAD است. CTA و MRA جزئیات آناتومیک را برای برنامه‌ریزی تکمیل می‌کنند؛ DSA امروزه عمدتاً همراه با مداخله برنامه‌ریزی‌شده انجام می‌شود.'),
    rows: [
      [L('Duplex', 'Duplex', 'داپلکس'), L('Fluss und Stenosehinweise; keine ionisierende Strahlung.', 'Flow and stenosis clues; no ionising radiation.', 'جریان و نشانه‌های تنگی؛ بدون پرتو یون‌ساز.')],
      [L('CTA', 'CTA', 'CTA'), L('Räumliche Übersicht und Verkalkungen; Strahlung und iodhaltiges KM berücksichtigen.', 'Spatial overview and calcification; consider radiation and iodinated contrast.', 'نمای فضایی و کلسیفیکاسیون؛ پرتو و ماده حاجب یددار را در نظر بگیرید.')],
      [L('MRA', 'MRA', 'MRA'), L('Lange Gefäßstrecken; Turbulenzen können die Stenose überschätzen.', 'Long vascular segments; turbulence can cause stenosis overestimation.', 'بررسی قطعات طولانی عروقی؛ آشفتگی جریان می‌تواند تنگی را بیش‌برآورد کند.')],
      [L('DSA', 'DSA', 'DSA'), L('Hohe räumliche und zeitliche Auflösung; meist im Kontext einer endovaskulären Behandlung.', 'High spatial and temporal resolution; generally in the context of endovascular treatment.', 'تفکیک مکانی و زمانی بالا؛ معمولاً در زمینه درمان اندوواسکولار.')],
    ], note: L('„Goldstandard“ steht in der PDF. Für die heutige Lernlogik nicht als pauschale diagnostische Rangfolge lesen: Die ESC 2024 nennt Duplex als Erstlinie; DSA wird vorwiegend im Interventionskontext genutzt.', 'The PDF calls DSA the “gold standard.” Do not read this as a blanket current diagnostic hierarchy: ESC 2024 names duplex as first-line; DSA is used mainly in the interventional context.', 'PDF از DSA با عنوان «استاندارد طلایی» یاد می‌کند. این را رتبه‌بندی تشخیصی همگانی و امروزی تلقی نکنید: ESC 2024 داپلکس را خط اول می‌داند و DSA عمدتاً در زمینه مداخله استفاده می‌شود.'),
  },
  {
    id: 'morphology', icon: 'scope', title: L('Wie hilft die Morphologie bei der Beschreibung?', 'How does morphology guide description?', 'مورفولوژی چگونه به توصیف کمک می‌کند؟'),
    lead: L('Beschreibe zunächst Gefäßsegment, Läsionslänge, Verkalkung und Okklusion. Die PDF fasst TASC A/B als endovaskulär und C/D als chirurgisch zusammen; das ist eine historische Vereinfachung, keine alleinige heutige Therapievorgabe.', 'First describe the vessel segment, lesion length, calcification and occlusion. The PDF summarises TASC A/B as endovascular and C/D as surgical; this is a historical simplification, not a stand-alone current treatment directive.', 'ابتدا قطعه عروقی، طول ضایعه، کلسیفیکاسیون و انسداد را توصیف کنید. PDF گروه‌های TASC A/B را اندوواسکولار و C/D را جراحی خلاصه می‌کند؛ این ساده‌سازی تاریخی است، نه دستور درمانی مستقل امروز.'),
    rows: [
      [L('TASC A', 'TASC A', 'TASC A'), L('PDF: einfache, kurze Stenosen/Verschlüsse; ihre vereinfachte Therapietabelle nennt primär endovaskulär. Nicht als heutige Einzelfallentscheidung verwenden.', 'PDF: simple, short stenoses/occlusions; its simplified treatment table labels these primarily endovascular. Do not use as a current individual treatment decision.', 'PDF: تنگی/انسدادهای ساده و کوتاه؛ جدول ساده‌شدهٔ درمان، روش اندوواسکولار را در اولویت می‌گذارد. این را تصمیم درمانی امروز برای یک بیمار تلقی نکنید.')],
      [L('TASC B', 'TASC B', 'TASC B'), L('PDF: mehrere, weniger ausgeprägte Läsionen; vereinfachte Tabelle: primär endovaskulär. Die aktuelle Entscheidung ist individueller.', 'PDF: multiple, less extensive lesions; simplified table: primarily endovascular. Current decisions are individualised.', 'PDF: چند ضایعه با شدت کمتر؛ جدول ساده‌شده: عمدتاً اندوواسکولار. تصمیم امروزی فردمحور است.')],
      [L('TASC C', 'TASC C', 'TASC C'), L('PDF: längere, komplexe Verschlüsse; vereinfachte Tabelle: primär chirurgisch. TASC allein legt die heutige Strategie nicht fest.', 'PDF: longer, complex occlusions; simplified table: primarily surgical. TASC alone does not determine current strategy.', 'PDF: انسدادهای طولانی و پیچیده؛ جدول ساده‌شده: عمدتاً جراحی. TASC به‌تنهایی راهبرد امروز را تعیین نمی‌کند.')],
      [L('TASC D', 'TASC D', 'TASC D'), L('PDF: sehr komplexe, diffuse Verschlüsse; vereinfachte Tabelle: primär chirurgisch. Als historische Quelleneinordnung, nicht als Therapievorgabe lesen.', 'PDF: very complex, diffuse occlusions; simplified table: primarily surgical. Read this as a source-era classification, not a treatment directive.', 'PDF: انسدادهای بسیار پیچیده و منتشر؛ جدول ساده‌شده: عمدتاً جراحی. این را دسته‌بندی دورهٔ منبع بدانید، نه دستور درمان.')],
      [L('Endovaskulär', 'Endovascular', 'اندوواسکولار'), L('PTA erweitert das Lumen; ein Stent kann die Gefäßwand stabilisieren. Atherektomie entfernt Plaquematerial.', 'PTA enlarges the lumen; a stent can support the vessel wall. Atherectomy removes plaque material.', 'PTA مجرا را گشاد می‌کند؛ استنت می‌تواند دیواره رگ را پایدار کند. آترکتومی ماده پلاک را خارج می‌کند.')],
      [L('Offen chirurgisch', 'Open surgery', 'جراحی باز'), L('TEA entfernt Plaque mit Intima/Media; ein Bypass überbrückt den Verschluss mit Vene oder Prothese.', 'Endarterectomy removes plaque with intima/media; a bypass bridges an occlusion using vein or prosthesis.', 'در اندآرترکتومی پلاک همراه اینتیما/مدیا خارج می‌شود؛ بای‌پس با ورید یا پروتز از انسداد عبور می‌کند.')],
    ], note: L('Die Wahl einer Revaskularisation hängt nicht allein von TASC oder einer Gehstreckenzahl ab. ESC 2024: bei symptomatischer pAVK wird eine Intervention nach optimaler medikamentöser Therapie und Bewegungstherapie multidisziplinär diskutiert; CLTI braucht frühe spezialisierte Beurteilung.', 'Revascularisation is not selected from TASC or a walking-distance number alone. ESC 2024: for symptomatic PAD, intervention after optimal medical and exercise therapy is discussed in a multidisciplinary setting; CLTI needs early specialist assessment.', 'انتخاب بازعروق‌رسانی فقط بر اساس TASC یا عدد مسافت راه‌رفتن انجام نمی‌شود. ESC 2024: در PAD علامت‌دار، مداخله پس از درمان دارویی بهینه و ورزش‌درمانی در تیم چندتخصصی بررسی می‌شود؛ CLTI به ارزیابی زودهنگام تخصصی نیاز دارد.'),
  },
]
const check = {
  question: L('Die PDF nennt bei Claudicatio eine 200-m-Grenze und ordnet TASC C/D direkt der Operation zu. Welche Lesart ist korrekt?', 'The PDF uses a 200 m claudication split and directly assigns TASC C/D to surgery. Which interpretation is correct?', 'PDF برای لنگش مرز ۲۰۰ متر ذکر می‌کند و TASC C/D را مستقیماً به جراحی نسبت می‌دهد. کدام تفسیر درست است؟'),
  options: [L('Beides sind vereinfachte Angaben der Quelle; Gehstrecke und TASC allein bestimmen keine heutige Therapie.', 'Both are simplified source statements; walking distance and TASC alone do not determine current treatment.', 'هر دو بیان ساده‌شده منبع‌اند؛ مسافت راه‌رفتن و TASC به‌تنهایی درمان امروز را تعیین نمی‌کنند.'), L('Die Grenze gilt weiterhin als universelle Indikation für eine Intervention.', 'The threshold remains a universal indication for intervention.', 'این مرز همچنان اندیکاسیون همگانی مداخله است.'), L('TASC C/D schließt eine endovaskuläre Strategie grundsätzlich aus.', 'TASC C/D fundamentally excludes an endovascular strategy.', 'TASC C/D اساساً راهبرد اندوواسکولار را رد می‌کند.')], answer: 0,
  explanation: L('Richtig. Die PDF liefert eine Lernübersicht. Aktuelle Entscheidungen berücksichtigen klinische Präsentation, Anatomie, Vorbehandlung und Patientenkontext; die ESC empfiehlt eine multidisziplinäre Diskussion.', 'Correct. The PDF is a learning summary. Current decisions integrate clinical presentation, anatomy, prior therapy and patient context; ESC recommends multidisciplinary discussion.', 'درست است. PDF یک خلاصه آموزشی است. تصمیم امروز تظاهر بالینی، آناتومی، درمان قبلی و شرایط بیمار را یکجا در نظر می‌گیرد؛ ESC بررسی چندتخصصی را توصیه می‌کند.'),
  incorrectExplanation: L('Die Zahl und TASC-Klasse stammen aus der vereinfachten Quelltabelle. Sie dürfen nicht als aktuelle, allein ausreichende Behandlungsindikation gelesen werden.', 'The distance and TASC class come from a simplified source table. They should not be read as current, sufficient treatment indications by themselves.', 'عدد مسافت و کلاس TASC از جدول ساده‌شده منبع آمده‌اند و نباید به‌تنهایی اندیکاسیون کافی و امروزی درمان تلقی شوند.'),
  diagramCaption: L('Konzeptuelle Übersicht der Beinarterien und möglicher Stenoseorte; kein Patientenbild.', 'Conceptual overview of leg arteries and possible stenosis sites; not a patient image.', 'نمای مفهومی شریان‌های پا و محل‌های احتمالی تنگی؛ تصویر بیمار نیست.'),
}
const takeHome = [
  L('Klinische Präsentation dokumentieren; Gehstrecke nicht als universellen Schwellenwert verwenden.', 'Document clinical presentation; do not use walking distance as a universal threshold.', 'تظاهر بالینی را ثبت کنید؛ مسافت راه‌رفتن را آستانه همگانی ندانید.'),
  L('Duplex ist die Erstlinienbildgebung; CTA/MRA ergänzen die Anatomie, DSA meist im Interventionskontext.', 'Duplex is first-line imaging; CTA/MRA add anatomy, while DSA is mostly used in an interventional context.', 'داپلکس تصویربرداری خط اول است؛ CTA/MRA آناتومی را تکمیل می‌کنند و DSA بیشتر در زمینه مداخله است.'),
  L('TASC kann Läsionsmorphologie ordnen, bestimmt aber allein keine aktuelle Therapie.', 'TASC can organise lesion morphology but does not determine current treatment alone.', 'TASC می‌تواند مورفولوژی ضایعه را دسته‌بندی کند، اما به‌تنهایی درمان امروز را تعیین نمی‌کند.'),
]

function Icon({ id }) {
  const paths = { case: 'M4 4h16v16H4zM8 9h8m-8 4h5', scope: 'M4 12h15m-6-6 6 6-6 6', artery: 'M4 12c4-8 12-8 16 0-4 8-12 8-16 0z', takeHome: 'M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z' }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.scope} /></svg>
}

function Rows({ rows, lang }) {
  return <div className={styles.tableWrap}><table><tbody>{rows.map(([term, detail], i) => <tr key={i}><th scope="row">{pick(term, lang)}</th><td>{pick(detail, lang)}</td></tr>)}</tbody></table></div>
}
function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  return <div className={styles.check}><p>{pick(check.question, lang)}</p><fieldset><legend>{pick(L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ انتخاب کنید'), lang)}</legend>{check.options.map((option, i) => <label key={i}><input type="radio" name="pavk-check" checked={answer === i} onChange={() => setAnswer(i)} /><span>{pick(option, lang)}</span></label>)}</fieldset>{answer !== null && <p role="status"><strong>{pick(answer === check.answer ? L('Richtig. ', 'Correct. ', 'درست است. ') : L('Noch einmal prüfen. ', 'Review this once more. ', 'دوباره بررسی کنید. '), lang)}</strong>{pick(answer === check.answer ? check.explanation : check.incorrectExplanation, lang)}</p>}</div>
}

export default function PavkLessonPage() {
  const { lang } = useLanguage()
  const localizedLabels = Object.fromEntries(Object.entries(labels).map(([key, value]) => [key, pick(value, lang)]))
  const localizedTitle = pick(title, lang)
  const sections = [
    ...chapters.map(chapter => ({ id: chapter.id, label: pick(chapter.title, lang), icon: chapter.icon })),
    { id: 'case', label: pick(L('Quellenangaben kritisch lesen', 'Read source statements critically', 'نکات منبع را نقادانه بخوانید'), lang), icon: 'case' },
    { id: 'take-home', label: localizedLabels.takeHome, icon: 'takeHome', emphasis: true },
  ]
  const sources = [
    { tag: pick(L('PDF · S. 137–138', 'PDF · pp. 137–138', 'PDF · صفحات ۱۳۷–۱۳۸'), lang), title: 'MSK.pdf · pAVK / TASC', citation: pick(L('Vom Nutzer bereitgestellte Zusammenfassung; Druckseiten 136–137.', 'User-provided summary; printed pages 136–137.', 'خلاصه ارائه‌شده از سوی کاربر؛ صفحات چاپی ۱۳۶–۱۳۷.'), lang), scope: pick(L('Quelle für Fontaine, Bildgebung, TASC und Revaskularisationsverfahren; ältere vereinfachte Therapiezuordnungen im Text ausdrücklich qualifiziert.', 'Source for Fontaine, imaging, TASC and revascularisation procedures; older simplified treatment assignments are explicitly qualified in the lesson.', 'منبع فونتن، تصویربرداری، TASC و روش‌های بازعروق‌رسانی؛ نسبت‌دهی ساده‌شده قدیمی درمان در درس صریحاً قید شده است.'), lang) },
    { tag: 'ESC · 2024', title: pick(L('2024 ESC-Leitlinie für periphere arterielle und Aortenerkrankungen', '2024 ESC Guidelines for peripheral arterial and aortic diseases', 'راهنمای ESC ۲۰۲۴ برای بیماری‌های شریان محیطی و آئورت'), lang), href: 'https://academic.oup.com/eurheartj/article/45/36/3538/7738955', citation: 'Eur Heart J. 2024;45:3538–3700. doi:10.1093/eurheartj/ehae179.', scope: pick(L('Aktualitätsabgleich: Erstlinienbildgebung, Fontaine/klinische Präsentation und individualisierte multidisziplinäre Revaskularisationsentscheidung.', 'Currency check: first-line imaging, Fontaine/clinical presentation and individualised multidisciplinary revascularisation decisions.', 'تطبیق با شواهد جاری: تصویربرداری خط اول، فونتن/تظاهر بالینی و تصمیم‌گیری فردمحور و چندتخصصی بازعروق‌رسانی.'), lang) },
  ]
  const langHref = path => lang === 'de' ? path : `${path}?lang=${lang}`
  return <StandardLessonShell lessonId={id} lang={lang} title={localizedTitle} author="RadYar" heroImageAlt={pick(L('Nichtdiagnostisches Schema einer Beinarterie mit fokaler Plaque-bedingter Lumeneinengung.', 'Non-diagnostic schematic of a leg artery with focal plaque-related luminal narrowing.', 'شماتیک غیرتشخیصی از شریان پا با تنگی موضعی مجرا بر اثر پلاک.'), lang)} syncHashNavigation
    breadcrumbs={[{ label: 'RadYar', href: langHref('/') }, { label: 'MSK', href: langHref('/lernen/msk') }, { label: localizedTitle }]}
    sections={sections} labels={localizedLabels} actions={{}} renderIcon={icon => <Icon id={icon} />}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/educational/pavk-stenosis-hero.svg', heroImageOpacity: .9, accent: '#bf6b52', accentStrong: '#843d34', accentSoft: '#f7e9e3', secondary: '#d19b64', secondaryStrong: '#815124', heroBase: '#432b2d' }}
    className={styles.page}
    sources={<LessonSources title={localizedLabels.sourceTitle} items={sources} note={pick(L('Lernmodul zur Bildgebung und Morphologie, keine individuelle Diagnostik- oder Therapieempfehlung.', 'Learning module on imaging and morphology, not individual diagnostic or treatment advice.', 'ماژول آموزشی درباره تصویربرداری و مورفولوژی است و توصیه تشخیصی یا درمانی فردی نیست.'), lang)} />}
    >
    {chapters.map(chapter => <LessonSection key={chapter.id} id={chapter.id} icon={chapter.icon} title={pick(chapter.title, lang)} bodyClassName={styles.body}><p>{pick(chapter.lead, lang)}</p><Rows rows={chapter.rows} lang={lang} /><p className={styles.note}>{pick(chapter.note, lang)}</p></LessonSection>)}
    <LessonSection id="case" icon="case" title={pick(L('Quellenangaben kritisch lesen', 'Read source statements critically', 'نکات منبع را نقادانه بخوانید'), lang)} bodyClassName={styles.body}><SelfCheck lang={lang} /></LessonSection>
    <LessonSection id="take-home" icon="takeHome" title={localizedLabels.takeHome} bodyClassName={styles.body}><ol className={styles.rules}>{takeHome.map((rule, index) => <li key={index}>{pick(rule, lang)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
