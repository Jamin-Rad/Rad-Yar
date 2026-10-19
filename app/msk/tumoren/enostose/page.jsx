'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { MSK_ENOSTOSE_LESSON as lesson } from '@/data/mskEnostoseLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => value?.[lang] ?? value?.de ?? value
const labelSet = {
  path: L('Lernweg', 'Learning path', 'مسیر یادگیری'),
  contents: L('Inhalt', 'Contents', 'فهرست مطالب'),
  progress: L('gelesen', 'read', 'خوانده‌شده'),
  continue: L('Weiterlernen', 'Continue learning', 'ادامه یادگیری'),
  completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری این بخش به‌عنوان خوانده‌شده'),
  completed: L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده'),
  open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'),
  close: L('Schließen', 'Close', 'بستن'),
  takeHome: L('Drei Regeln mitnehmen', 'Three rules to remember', 'سه قاعده برای یادآوری'),
  sources: L('Quellen und Umfang', 'Sources and scope', 'منابع و دامنه'),
}

function Icon({ id }) {
  const paths = {
    pattern: 'M4 12h16M7 8l5-4 5 4M7 16l5 4 5-4',
    limits: 'M12 3v18M5 7l7-4 7 4M5 17l7 4 7-4',
    case: 'M4 4h16v16H4zM8 9h8m-8 4h5',
    takeHome: 'M5 5h14M5 12h14M5 19h14',
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.pattern} /></svg>
}

function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const check = lesson.check
  const correct = answer === check.answer
  return <div className={styles.decision}>
    <h3>{pick(L('Was passt zum Befund?', 'Which interpretation fits?', 'کدام تفسیر با یافته سازگار است؟'), lang)}</h3>
    <p>{pick(check.question, lang)}</p>
    <fieldset><legend>{pick(L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید'), lang)}</legend>{check.options.map((option, index) => <label key={index}><input type="radio" name="msk-enostosis-check" checked={answer === index} onChange={() => setAnswer(index)} /><span>{pick(option, lang)}</span></label>)}</fieldset>
    {answer !== null ? <p className={styles.feedback} role="status"><strong>{pick(correct ? L('Richtig. ', 'Correct. ', 'درست است. ') : L('Noch einmal prüfen. ', 'Review this once more. ', 'دوباره بررسی کنید. '), lang)}</strong>{pick(check.explanation, lang)}</p> : null}
  </div>
}

export default function EnostosePage() {
  const { lang } = useLanguage()
  const t = value => pick(value, lang)
  const labels = Object.fromEntries(Object.entries(labelSet).map(([key, value]) => [key, t(value)]))
  const langHref = path => lang === 'de' ? path : `${path}?lang=${lang}`
  const sections = [
    { id: 'pattern', label: t(L('Welche Zeichen sind typisch?', 'Which features are typical?', 'کدام نشانه‌ها تیپیک هستند؟')), icon: 'pattern' },
    { id: 'limits', label: t(L('Wann muss ich neu einordnen?', 'When should I reassess?', 'چه زمانی باید دوباره ارزیابی کنم؟')), icon: 'limits' },
    { id: 'case', label: t(L('Wissen schriftlich prüfen', 'Written retrieval check', 'سنجش نوشتاری آموخته‌ها')), icon: 'case' },
    { id: 'take-home', label: labels.takeHome, icon: 'takeHome', emphasis: true },
  ]
  const references = [
    { tag: 'MSK.pdf · p. 104', title: t(L('Enostose: Merkmale und Röntgenbeispiel', 'Enostosis: features and radiograph', 'انوستوز: ویژگی‌ها و نمونه رادیوگرافی')), citation: t(L('Abdeckung der Nutzerquelle; gedruckte Seite 103.', 'Coverage from the supplied source; printed page 103.', 'پوشش منبع ارائه‌شده؛ صفحه چاپی ۱۰۳.')) },
    { tag: 'SSR · 2022', title: t(lesson.references[0].label), href: lesson.references[0].url, citation: 'Skeletal Radiol. 2022;51:1743–1764. DOI: 10.1007/s00256-022-04022-8.', scope: t(L('Konsensbasierter Rahmen für inzidentelle solitäre Läsionen bei Erwachsenen; nicht als Regel für jede Knochenläsion lesen.', 'Consensus framework for incidental solitary lesions in adults; not a rule for every bone lesion.', 'چارچوب اجماعی برای ضایعات منفرد اتفاقی در بزرگسالان؛ برای همه ضایعات استخوانی تعمیم ندهید.')) },
    { tag: 'AJR · 2016', title: t(lesson.references[1].label), href: lesson.references[1].url, citation: 'AJR Am J Roentgenol. 2016;207(2):362–368. DOI: 10.2214/AJR.15.15559.', scope: t(L('Die publizierte Dichteschwelle gilt nicht uneingeschränkt, insbesondere nicht für behandelte Metastasen.', 'The published attenuation threshold does not apply without qualification, especially to treated metastases.', 'آستانه چگالی منتشرشده بدون قید و شرط کاربرد ندارد، به‌ویژه برای متاستازهای درمان‌شده.')) },
    { tag: 'Radiopaedia · rID 6108', title: t(lesson.references[2].label), href: lesson.references[2].url, citation: t(L('Frank Gaillard · CC BY-NC-SA 3.0; eingebettete kleine Abbildung aus der bereitgestellten MSK.pdf, S. 104. Die Radiopaedia-Lizenzbedingungen gelten; keine kommerzielle Nutzung.', 'Frank Gaillard · CC BY-NC-SA 3.0; small embedded image extracted from the supplied MSK.pdf, p. 104. Radiopaedia license terms apply; non-commercial use only.', 'Frank Gaillard · مجوز CC BY-NC-SA 3.0؛ تصویر کوچک از MSK.pdf ارائه‌شده، صفحه ۱۰۴ استخراج شده است. شرایط مجوز Radiopaedia برقرار است؛ فقط استفاده غیرتجاری.')) },
  ]
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={t(lesson.title)} author="RadYar" heroImageAlt={t(L('Schema einer Kompaktinsel: dichter Markraumherd mit pinselartigem Rand, keine Patientenaufnahme.', 'Schematic of an enostosis: dense medullary focus with a brush border; not patient data.', 'شماتیک انوستوز: کانون متراکم در مغز استخوان با حاشیه قلم‌مویی؛ تصویر بیمار نیست.'))} syncHashNavigation
    breadcrumbs={[{ label: 'RadYar', href: langHref('/') }, { label: 'MSK', href: langHref('/lernen/msk') }, { label: t(lesson.title) }]}
    sections={sections} labels={labels} actions={{}} renderIcon={id => <Icon id={id} />}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/educational/enostose/hero.svg', heroImageOpacity: .9, accent: '#8ab9a7', accentStrong: '#286451', accentSoft: '#e8f2ed', secondary: '#d19b64', secondaryStrong: '#815124', heroBase: '#18342e' }}
    className={styles.page} sources={<LessonSources title={labels.sources} items={references} note={t(lesson.notice)} />}
  >
    <LessonSection id="pattern" icon="pattern" title={sections[0].label} bodyClassName={styles.body}>
      <p>{t(L('Eine Enostose (Kompaktinsel, bone island) ist ein Fokus kompakten Knochens im spongiösen Markraum. Meist fällt sie zufällig auf.', 'An enostosis (bone island) is a focus of compact bone within cancellous bone marrow. It is usually found incidentally.', 'انوستوز (جزیره استخوانی) کانونی از استخوان متراکم در مغز استخوان اسفنجی است و معمولاً اتفاقی دیده می‌شود.'))}</p>
      <div className={styles.tableWrap}><table><caption>{t(L('Das Muster modalitätsgerecht beschreiben', 'Describe the pattern by modality', 'الگو را بر اساس مودالیته توصیف کنید'))}</caption><thead><tr><th>{t(L('Untersuchung', 'Modality', 'بررسی'))}</th><th>{t(L('Worauf achten?', 'What to look for', 'به چه چیزی توجه کنیم؟'))}</th></tr></thead><tbody>
        <tr><th scope="row">{t(L('Röntgen / CT', 'Radiography / CT', 'رادیوگرافی / CT'))}</th><td>{t(L('Homogener dichter Herd im Markraum; feine radiäre Ausläufer am Rand gehen pinselartig in die umgebenden Trabekel über. Diese im PDF beschriebene Randmorphologie ist auf dem kleinen Fallbild nicht sicher zu beurteilen.', 'Homogeneous dense medullary focus; fine radiating margins blend into adjacent trabeculae in a brush-like pattern. This border morphology, described in the PDF, cannot be assessed confidently in the small case image.', 'کانون متراکم و همگن در مغز استخوان؛ امتدادهای ظریف شعاعی در حاشیه به‌شکل قلم‌مویی به ترابکول‌های اطراف می‌پیوندند. ارزیابی مطمئن این مورفولوژیِ توصیف‌شده در PDF در تصویر کوچک کیس ممکن نیست.'))}</td></tr>
        <tr><th scope="row">{t(L('MRT', 'MRI', 'MRI'))}</th><td>{t(L('Laut PDF typischerweise signalarm wie kompakter Knochen. Die MRT ergänzt die Morphologie; sie ersetzt nicht den klinischen Kontext. Auf dieser PDF-Seite ist kein MRT-Fallbild abgebildet.', 'According to the PDF, typically low signal like compact bone. MRI complements morphology; it does not replace clinical context. This PDF page does not show an MRI case image.', 'بر اساس PDF معمولاً مانند استخوان متراکم کم‌سیگنال است. MRI مورفولوژی را تکمیل می‌کند و جایگزین زمینه بالینی نیست. در این صفحه PDF تصویر کیس MRI وجود ندارد.'))}</td></tr>
        <tr><th scope="row">{t(L('Größe / Verlauf', 'Size / interval change', 'اندازه / تغییرات زمانی'))}</th><td>{t(L('Meist <1 cm und über Jahre stabil; langsames Wachstum ist möglich. „Giant bone island“ bezeichnet eine Läsion >2 cm und ist allein kein Malignitätskriterium.', 'Usually <1 cm and stable for years; slow growth can occur. “Giant bone island” describes a lesion >2 cm and is not, by itself, a criterion for malignancy.', 'معمولاً کوچک‌تر از ۱ سانتی‌متر است و سال‌ها پایدار می‌ماند؛ رشد آهسته ممکن است رخ دهد. اصطلاح «giant bone island» برای ضایعهٔ بزرگ‌تر از ۲ سانتی‌متر به‌کار می‌رود و به‌تنهایی معیار بدخیمی نیست.'))}</td></tr>
      </tbody></table></div>
      <figure className={styles.caseImage}>
        <img src="/educational/enostose/radiopaedia-rid-6108.jpg" alt={t(L('Röntgenaufnahme des Beckens mit kleiner Knocheninsel in der sakralen Ala; Radiopaedia-Fall rID 6108.', 'Pelvic radiograph showing a small bone island in the sacral ala; Radiopaedia case rID 6108.', 'رادیوگرافی لگن با جزیره استخوانی کوچک در آلا ساکروم؛ کیس Radiopaedia با شناسه rID 6108.'))} loading="lazy" />
        <figcaption>{t(L('Radiopaedia-Fall rID 6108, Frank Gaillard, aus MSK.pdf S. 104 (Druck S. 103). Achte auf den kleinen dichten Fokus in der sakralen Ala; die Abbildung ist klein und ersetzt keine vollständige Fallansicht.', 'Radiopaedia case rID 6108, Frank Gaillard, from MSK.pdf p. 104 (printed p. 103). Look for the small dense focus in the sacral ala; this image is small and does not replace the full case.', 'کیس Radiopaedia با شناسه rID 6108، Frank Gaillard، برگرفته از MSK.pdf صفحه ۱۰۴ (صفحه چاپی ۱۰۳). کانون متراکم کوچک در آلا ساکروم را پیدا کنید؛ این تصویر کوچک است و جای نمای کامل کیس را نمی‌گیرد.'))} <a href="https://radiopaedia.org/" target="_blank" rel="noreferrer">Radiopaedia.org</a> · <a href="https://radiopaedia.org/cases/6108" target="_blank" rel="noreferrer">rID 6108 ↗</a> · CC BY-NC-SA 3.0</figcaption>
      </figure>
    </LessonSection>
    <LessonSection id="limits" icon="limits" title={sections[1].label} bodyClassName={styles.body}>
      <p>{t(L('Ein typisches Muster spricht für eine Enostose. Im MRT ist der Herd typischerweise in allen Sequenzen signalarm und zeigt kein umgebendes Knochenmarködem. Fehlen der Spiculae oder eine atypische Verteilung, Kortikalisdestruktion, periostale Reaktion, Weichteilkomponente oder relevantes Wachstum verlangen eine neue Einordnung.', 'A typical pattern supports enostosis. On MRI, the focus is typically low signal on all sequences, without surrounding marrow oedema. Absent spicules or atypical distribution, cortical destruction, periosteal reaction, a soft-tissue component or meaningful growth call for reassessment.', 'الگوی تیپیک به نفع انوستوز است. در MRI کانون معمولاً در همه توالی‌ها کم‌سیگنال است و ادم مغز استخوان اطراف ندارد. نبود خارهای حاشیه‌ای یا توزیع غیرتیپیک، تخریب کورتکس، واکنش پریوست، جزء بافت نرم یا رشد قابل‌توجه نیازمند ارزیابی دوباره است.'))}</p>
      <aside className={styles.note}><strong>{t(L('Kontext zählt', 'Context matters', 'زمینه بالینی مهم است'))}</strong><p>{t(L('Bei bekannter Tumorerkrankung eine sklerotische Läsion nicht allein wegen hoher Dichte als Enostose bezeichnen. Bone-RADS bietet für inzidentelle solitäre Läsionen bei Erwachsenen einen ergänzenden Orientierungsrahmen; die 885-HU-Schwelle ist nicht in jedem Kontext zuverlässig.', 'In a patient with known malignancy, do not label a sclerotic lesion as an enostosis based on high attenuation alone. Bone-RADS provides an additional framework for incidental solitary lesions in adults; the 885-HU threshold is not reliable in every context.', 'در بیمار با سابقه سرطان، فقط به‌دلیل چگالی بالا ضایعه اسکلروتیک را انوستوز ننامید. Bone-RADS چارچوب تکمیلی برای ضایعات منفرد اتفاقی در بزرگسالان است؛ آستانه ۸۸۵ HU در همه زمینه‌ها قابل اتکا نیست.'))}</p></aside>
    </LessonSection>
    <LessonSection id="case" icon="case" title={sections[2].label} bodyClassName={styles.body}><SelfCheck lang={lang} /></LessonSection>
    <LessonSection id="take-home" icon="takeHome" title={labels.takeHome} bodyClassName={styles.body}>
      <ol className={styles.rules}>{lesson.summary.map((rule, index) => <li key={index}>{t(rule)}</li>)}</ol>
    </LessonSection>
  </StandardLessonShell>
}
