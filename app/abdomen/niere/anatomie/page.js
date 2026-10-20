'use client'

import Image from 'next/image'
import { useLanguage } from '@/providers/LanguageProvider'
import LessonReferenceShell from '@/components/LessonReferenceShell'

const C = {
  de: {
    title: 'Nieren & Harnwege', contentTitle: 'Niere und ableitende Harnwege systematisch verfolgen',
    goals: ['Nierenparenchym und Sammelsystem räumlich zuordnen.', 'Dendritische und ampulläre Beckenform unterscheiden.', 'Den Ureterverlauf beschreiben und klassische Engstellen vorsichtig einordnen.'],
    intro: 'Beginnen Sie am Nierenparenchym, folgen Sie dem Urinweg durch Kelche und Becken und verfolgen Sie anschließend beide Ureteren bis zur Harnblase.',
    kidneyCap: 'Querschnitt: Rinde und Mark mit Pyramiden, Nierenpapillen, Kelchen, Becken und Hilusgefäßen.',
    parenchyma: 'Die Rinde liegt außen; das Mark enthält die Pyramiden. Papillen münden in kleine Kelche, die sich zu großen Kelchen und anschließend zum Nierenbecken vereinigen. Arterie und Vene liegen am Hilus.',
    pelvisTitle: 'Sammelsystem: Formvariante oder Erweiterung?', pelvis: 'Die Abbildung vergleicht eine dendritische Form mit längeren, stärker verzweigten Kelchen und eine ampulläre, weiter erscheinende Beckenform mit kürzeren Kelchen. Die Form allein belegt weder Obstruktion noch Erkrankung; beurteilen Sie Kaliber und klinischen Kontext.',
    pelvisCap: 'Schematischer Vergleich der dendritischen (links) und ampullären (rechts) Beckenform.',
    ureterTitle: 'Den Ureter bis zur Blase verfolgen', ureter: 'Am Abgang aus dem Nierenbecken verläuft der Ureter laut PDF zunächst mediokaudal mit etwa 90° Richtungswechsel. Die Abbildung markiert außerdem den Beckeneintritt am Überkreuzungsbereich der Iliakalgefäße und den intramuralen Verlauf an der Blase. Diese drei klassischen Engstellen sind anatomische Orientierungspunkte. Der Iliakalgefäß-Übergang gilt nach neueren Untersuchungen nicht als häufige Stelle, an der Steine stecken bleiben.',
    ureterCap: 'Verlauf und drei klassisch beschriebene Engstellen; die Darstellung ist anatomisch, nicht maßstabsgetreu.',
    fatTitle: 'Perirenales Fett im Kontext', fat: 'Lineares Stranding im perirenalen Fett ist ein unspezifischer Dichtebefund, nicht gleichbedeutend mit einem Phlegmon. Isoliert beweist es weder Pyelonephritis noch eine Harnabflussstörung. Die PDF bezeichnet es bei älteren Menschen als häufig physiologisch; das ist keine alleinige Altersregel. Symptome, Labor, Nierenparenchym und Harnwege mitbeurteilen.',
    check: 'Welche Einordnung der klassisch beschriebenen Überkreuzung des Ureters mit den Iliakalgefäßen ist korrekt?',
    options: ['Anatomische Landmarke, aber nicht als häufige Steinimpaktionsstelle belegt.', 'Einer der zwei häufigsten Steinimpaktionsorte.', 'Die Lage des Steins beweist unabhängig von den übrigen Zeichen eine Obstruktion.'],
    rationale: 'Die Iliakalgefäßkreuzung ist eine klassische anatomische Landmarke. Kamo et al. unterscheiden sie vom nahegelegenen Übergang am oberen Ureter, an dem sich die Beweglichkeit verändert; eine CT-Kohorte fand 1,1 % der Steine direkt an der Iliakalgefäßkreuzung. Eine Obstruktion wird aus dem Gesamtbefund beurteilt.',
    summary: ['Rinde außen, Mark und Pyramiden innen; Papillen drainieren in die Kelche.', 'Beckenformvarianten allein sind keine Obstruktionsdiagnose.', 'Beide Ureteren bis zur Blase verfolgen; klassische Engstellen als Orientierung, nicht als Diagnose verwenden.', 'Perirenales Stranding ist unspezifisch und mit dem übrigen Befund zu korrelieren.'],
    sourceLabel: 'Quelle und Abdeckung', source: 'Abdomen.pdf, physische S. 44–45 (gedruckte S. 43–44); die Abbildungen wurden visuell geprüft. Ureter-Engstellen eingeordnet anhand von Kamo et al., Jpn J Radiol. 2021;39:407–413, doi:10.1007/s11604-020-01080-7. Autor-/Lizenzangabe der PDF-Abbildungen nicht sichtbar.',
    imageAltKidney: 'Beschrifteter Querschnitt der Niere', imageAltPelvis: 'Vergleich zweier Formen des Nierenbeckens', imageAltUreter: 'Anatomischer Verlauf beider Ureteren zur Harnblase',
  },
  en: {
    title: 'Kidneys & urinary tract', contentTitle: 'Trace the kidney and collecting system systematically',
    goals: ['Locate renal parenchyma and collecting system.', 'Distinguish dendritic and ampullary pelvic configurations.', 'Describe the ureteric course and interpret classic narrowings cautiously.'],
    intro: 'Start with the renal parenchyma, follow the urine pathway through the calyces and pelvis, then trace both ureters to the urinary bladder.',
    kidneyCap: 'Cross-section: cortex and medulla with pyramids, papillae, calyces, pelvis and hilar vessels.',
    parenchyma: 'The cortex is peripheral; the medulla contains the pyramids. Papillae drain into minor calyces, which join into major calyces and then the renal pelvis. The artery and vein lie at the hilum.',
    pelvisTitle: 'Collecting system: configuration or dilatation?', pelvis: 'The figure compares a dendritic configuration with longer, more branching calyces and a wider-appearing ampullary pelvis with shorter calyces. Shape alone establishes neither obstruction nor disease; assess calibre and clinical context.',
    pelvisCap: 'Schematic comparison of dendritic (left) and ampullary (right) renal pelvis configurations.',
    ureterTitle: 'Trace the ureter to the bladder', ureter: 'At its origin from the renal pelvis, the ureter initially courses mediocaudally with an approximately 90° turn, according to the PDF. The figure also marks the pelvic crossing region at the iliac vessels and the intramural course at the bladder. These are three classically described anatomical landmarks. Newer studies question whether the iliac-vessel crossing is a common site of stone impaction.',
    ureterCap: 'Course and three classically described narrowings; the drawing is anatomical and not to scale.',
    fatTitle: 'Interpret perirenal fat in context', fat: 'Linear perirenal fat stranding is a nonspecific attenuation finding, not synonymous with a phlegmon. In isolation it proves neither pyelonephritis nor urinary obstruction. The PDF describes it as commonly physiological in older adults; this is not a stand-alone age rule. Also assess symptoms, laboratory data, renal parenchyma and urinary tract.',
    check: 'Which interpretation of the classically described ureteric crossing of the iliac vessels is correct?',
    options: ['Anatomical landmark, but not established as a common stone-impaction site.', 'One of the two most common stone-impaction sites.', 'Stone location proves obstruction regardless of other findings.'],
    rationale: 'The iliac-vessel crossing is a classic anatomical landmark. Kamo et al. distinguish it from the nearby upper-ureter transition where mobility changes; a CT cohort found only 1.1% of stones directly at the iliac crossing. Obstruction is assessed from the complete imaging context.',
    summary: ['Cortex is peripheral; medulla and pyramids are internal; papillae drain into calyces.', 'Pelvic configuration variants alone do not diagnose obstruction.', 'Trace both ureters to the bladder; use classic narrowings as landmarks, not diagnoses.', 'Perirenal stranding is nonspecific and must be correlated with the rest of the examination.'],
    sourceLabel: 'Source and coverage', source: 'Abdomen.pdf, physical pp. 44–45 (printed pp. 43–44); figures visually checked. Ureteric narrowings contextualised with Kamo et al., Jpn J Radiol. 2021;39:407–413, doi:10.1007/s11604-020-01080-7. Contributor/licence line for the PDF figures was not visible.',
    imageAltKidney: 'Labelled cross-section of the kidney', imageAltPelvis: 'Comparison of two renal pelvis configurations', imageAltUreter: 'Anatomical course of both ureters to the urinary bladder',
  },
  fa: {
    title: 'کلیه‌ها و مجاری ادراری', contentTitle: 'کلیه و سیستم جمع‌کننده را نظام‌مند دنبال کنید',
    goals: ['جایگاه پارانشیم کلیه و سیستم جمع‌کننده را مشخص کنید.', 'شکل دندریتیک و آمپولاری لگنچه را از هم تشخیص دهید.', 'مسیر حالب را توصیف و تنگی‌های کلاسیک را با احتیاط تفسیر کنید.'],
    intro: 'از پارانشیم کلیه شروع کنید، مسیر ادرار را از کالیس‌ها و لگنچه دنبال کنید و سپس هر دو حالب را تا مثانه پی بگیرید.',
    kidneyCap: 'برش کلیه: قشر و مدولا همراه هرم‌ها، پاپیلاها، کالیس‌ها، لگنچه و عروق ناف کلیه.',
    parenchyma: 'قشر در محیط و مدولای حاوی هرم‌ها در داخل قرار دارد. پاپیلاها به کالیس‌های کوچک تخلیه می‌شوند؛ این کالیس‌ها به کالیس‌های بزرگ و سپس لگنچه می‌پیوندند. شریان و ورید در ناف کلیه قرار دارند.',
    pelvisTitle: 'سیستم جمع‌کننده: تفاوت شکل یا اتساع؟', pelvis: 'شکل، نوع دندریتیک با کالیس‌های بلندتر و شاخه‌دارتر را با لگنچه آمپولاریِ پهن‌تر و کالیس‌های کوتاه‌تر مقایسه می‌کند. شکل به‌تنهایی نه انسداد را ثابت می‌کند نه بیماری را؛ قطر و زمینه بالینی را نیز بسنجید.',
    pelvisCap: 'مقایسه شماتیک شکل دندریتیک (چپ) و آمپولاری (راست) لگنچه.',
    ureterTitle: 'حالب را تا مثانه دنبال کنید', ureter: 'طبق PDF، حالب هنگام خروج از لگنچه ابتدا به‌سمت پایین و داخل حرکت می‌کند و حدود ۹۰ درجه تغییر مسیر دارد. تصویر همچنین محل عبور لگنی از کنار عروق ایلیاک و مسیر داخل‌جداری در مثانه را نشان می‌دهد. این‌ها سه نشانه آناتومیک کلاسیک‌اند. پژوهش‌های جدید شایع‌بودن گیرکردن سنگ در محل تقاطع عروق ایلیاک را زیر سؤال برده‌اند.',
    ureterCap: 'مسیر و سه تنگی که به‌طور کلاسیک توصیف شده‌اند؛ شکل آناتومیک است و مقیاس واقعی ندارد.',
    fatTitle: 'چربی اطراف کلیه را در زمینه تفسیر کنید', fat: 'خطوط stranding در چربی اطراف کلیه افزایش دانسیته‌ای غیراختصاصی‌اند و مترادف فِلِگمون نیستند. این یافته به‌تنهایی نه پیلونفریت را ثابت می‌کند و نه انسداد ادراری را. PDF آن را در سالمندان اغلب فیزیولوژیک می‌داند؛ این قاعده تشخیصی مستقل بر اساس سن نیست. علائم، آزمایش‌ها، پارانشیم کلیه و مجاری ادراری را هم ارزیابی کنید.',
    check: 'کدام تفسیر از محل کلاسیک عبور حالب از عروق ایلیاک درست است؟',
    options: ['نشانه آناتومیک است، اما محل شایع گیرکردن سنگ بودن آن ثابت نشده است.', 'یکی از دو محل شایع گیرکردن سنگ است.', 'محل سنگ مستقل از سایر یافته‌ها انسداد را ثابت می‌کند.'],
    rationale: 'تقاطع عروق ایلیاک نشانه آناتومیک کلاسیک است. Kamo و همکاران آن را از گذار نزدیک در بخش فوقانی حالب که تغییر تحرک رخ می‌دهد جدا می‌کنند؛ در یک کوهورت CT فقط ۱٫۱٪ سنگ‌ها دقیقاً در تقاطع ایلیاک بودند. انسداد باید بر اساس کل یافته‌ها ارزیابی شود.',
    summary: ['قشر در محیط است؛ مدولا و هرم‌ها در داخل‌اند؛ پاپیلاها به کالیس‌ها تخلیه می‌شوند.', 'تفاوت شکل لگنچه به‌تنهایی تشخیص انسداد نیست.', 'هر دو حالب را تا مثانه دنبال کنید؛ تنگی‌های کلاسیک را نشانه آناتومیک بدانید، نه تشخیص.', 'Stranding اطراف کلیه غیراختصاصی است و باید با سایر یافته‌ها تطبیق داده شود.'],
    sourceLabel: 'منبع و پوشش', source: 'Abdomen.pdf، صفحات فیزیکی ۴۴–۴۵ (صفحات چاپی ۴۳–۴۴)؛ شکل‌ها دیداری بررسی شدند. تنگی‌های حالب با مقاله Kamo و همکاران، Jpn J Radiol. 2021;39:407–413، doi:10.1007/s11604-020-01080-7، در زمینه علمی قرار داده شدند. نام مشارکت‌کننده/مجوز شکل‌های PDF قابل مشاهده نبود.',
    imageAltKidney: 'برش برچسب‌گذاری‌شده کلیه', imageAltPelvis: 'مقایسه دو شکل لگنچه کلیه', imageAltUreter: 'مسیر آناتومیک هر دو حالب تا مثانه',
  },
}

function Figure({ src, alt, caption, width, height }) {
  return <figure style={{ margin: '1rem 0 1.5rem', textAlign: 'center' }}>
    <Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 700px) 100vw, 680px" style={{ width: 'min(100%, 680px)', height: 'auto', borderRadius: 12, border: '1px solid #d8dee8' }} />
    <figcaption style={{ margin: '.5rem auto', maxWidth: 680, lineHeight: 1.6 }}>{caption}</figcaption>
  </figure>
}

export default function KidneyAnatomyPage() {
  const { lang } = useLanguage()
  const c = C[lang] || C.de
  return <LessonReferenceShell lang={lang} lessonId="niere-anatomie" title={c.title} diagram="renal-anatomy" goals={c.goals} check={{ question: c.check, options: c.options, answer: 0, explanation: c.rationale, diagramCaption: { de: 'Schematische Lernhilfe; keine Patientendarstellung.', en: 'Teaching schematic; not a patient image.', fa: 'نمای شماتیک آموزشی؛ تصویر بیمار نیست.' } }} summary={c.summary} quizHref="/ueben/quiz?fach=abdomen&n=1&themen=niere-anatomie" flashcardsHref="/flashcards/niere-anatomie">
    <p>{c.intro}</p>
    <Figure src="/educational/renal-anatomy/kidney-cross-section-p44.jpg" alt={c.imageAltKidney} caption={c.kidneyCap} width={565} height={490} />
    <p>{c.parenchyma}</p>
    <h3>{c.pelvisTitle}</h3>
    <Figure src="/educational/renal-anatomy/collecting-system-variants-p44.jpg" alt={c.imageAltPelvis} caption={c.pelvisCap} width={465} height={310} />
    <p>{c.pelvis}</p>
    <h3>{c.ureterTitle}</h3>
    <Figure src="/educational/renal-anatomy/ureter-narrowings-p45.jpg" alt={c.imageAltUreter} caption={c.ureterCap} width={670} height={335} />
    <p>{c.ureter}</p>
    <h3>{c.fatTitle}</h3>
    <p>{c.fat}</p>
    <aside aria-label={c.sourceLabel} style={{ marginTop: '1.5rem', fontSize: '.9em' }}><strong>{c.sourceLabel}:</strong> {c.source}</aside>
  </LessonReferenceShell>
}
