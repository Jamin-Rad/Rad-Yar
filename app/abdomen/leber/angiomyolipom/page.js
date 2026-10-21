'use client'

import { useLanguage } from '@/providers/LanguageProvider'
import LessonReferenceShell from '@/components/LessonReferenceShell'
import styles from '../../gi/divertikulitis/page.module.css'

const C = {
  de: {
    title: 'Hepatisches Angiomyolipom', subtitle: 'Makroskopisches Fett ist ein Hinweis – kein alleiniger Beweis.',
    lead: 'Das hepatische Angiomyolipom (HAML) ist ein seltener mesenchymaler PEComa-Tumor mit variablen Anteilen aus Gefäßen, glatten Muskelzellen und Fett. Die Bildgebung kann den Verdacht begründen, aber eine sichere Abgrenzung zu HCC ist nicht immer möglich.',
    cards: [
      ['CT nativ', 'Makroskopisches Fett mit negativer Dichte kann typisch sein. Fett kann jedoch spärlich oder fehlend sein; HCC kann ebenfalls Fett enthalten. Die Läsion deshalb nicht anhand eines einzelnen HU-Werts festlegen.'],
      ['Dynamische CT/MRT', 'Häufig, aber nicht obligat: arterielle Hypervaskularität, prominente intratumorale Gefäße und eine frühe drainierende Vene. Wash-out und persistierende Kontrastierung sind beide beschrieben; kein einzelnes dynamisches Muster schließt HAML aus.'],
      ['MRT', 'Fett kann in fett-sensitiven Sequenzen und durch Signalabfall in opposed-phase auffallen. Der sichtbare Fettanteil kann klein sein. T1-, T2- und hepatobiliäre Signale variieren mit der Gewebezusammensetzung.'],
      ['Wichtige Differenzialdiagnose', 'HCC kann makroskopisches oder mikroskopisches Fett enthalten und HAML imitieren. Zirrhose, Risikoprofil, Tumorkapsel, Gefäßmuster und Voraufnahmen gemeinsam beurteilen; ein HCC-typischer Risikokontext ändert die Einordnung.'],
    ],
    reportTitle: 'Strukturiert beschreiben', report: ['Segment, Größe und Zahl der Läsionen', 'Fett: makroskopisch oder nur Signalabfall in opposed-phase', 'Gefäßmuster, frühe drainierende Vene und dynamische Phasen getrennt dokumentieren', 'Hintergrundleber, HCC-Risikokontext und Voraufnahmen einbeziehen', 'Bei überlappender oder atypischer Morphologie die Unsicherheit benennen und interdisziplinär klären'],
    cave: 'Die PDF-Seite 12 beschreibt kein typisches Wash-out und eine späte Angleichung; Seite 13 nennt fehlendes Wash-out als Unterschied zu HCC. Die separate Wang-Serie berichtet frühes Wash-out in zwei TSC-Fällen. Die Befunde stammen aus verschiedenen Quellen und zeigen variable Muster; Wash-out allein bestätigt oder widerlegt HAML nicht.',
    evidence: 'Primärnachweise: Wang et al., 2009, dynamische CT bei hepatischem AML (kleine Serie, einschließlich fettarmer Läsionen bei TSC); Tsai et al., 2017, histopathologisch bestätigte CT/MRT-Fälle. Die kleinen retrospektiven Serien begrenzen die Verallgemeinerbarkeit.',
    summary: ['Makroskopisches Fett ist ein Hinweis, kein Beweis; HCC kann ebenfalls Fett enthalten.', 'Gefäß- und Kontrastmittelmuster variieren; kein einzelnes Zeichen ist beweisend.', 'HCC-Risikokontext, Tumorkapsel, Gefäße und Voraufnahmen gemeinsam beurteilen.', 'Bei Überlappung Unsicherheit benennen und interdisziplinär klären.'],
    source: 'Abdeckung: Abdomen.pdf, Seiten 12–13. Bildinhalt wurde geprüft; keine PDF-Fallbilder übernommen.',
    sourceUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2712904/',
  },
  en: {
    title: 'Hepatic angiomyolipoma', subtitle: 'Macroscopic fat is a clue, not proof on its own.',
    lead: 'Hepatic angiomyolipoma (HAML) is a rare mesenchymal PEComa tumour with variable proportions of vessels, smooth muscle and fat. Imaging can raise suspicion, but reliable distinction from HCC is not always possible.',
    cards: [
      ['Unenhanced CT', 'Macroscopic fat with negative attenuation can be characteristic. Fat may be sparse or absent, and HCC can also contain fat. Do not classify a lesion by a single HU value.'],
      ['Dynamic CT/MRI', 'Common but not obligatory findings include arterial hypervascularity, prominent intratumoral vessels and an early draining vein. Both wash-out and persistent enhancement have been reported; no single dynamic pattern excludes HAML.'],
      ['MRI', 'Fat may be visible on fat-sensitive sequences and as signal loss on opposed-phase imaging. The visible fat component can be small. T1, T2 and hepatobiliary-phase signal vary with tissue composition.'],
      ['Important differential', 'HCC can contain macroscopic or microscopic fat and mimic HAML. Assess cirrhosis, risk profile, capsule, vascular pattern and prior studies together; an HCC-risk context changes the interpretation.'],
    ],
    reportTitle: 'Structured description', report: ['Segment, size and lesion count', 'Fat: macroscopic or signal loss only on opposed-phase', 'Document vascular pattern, early draining vein and each dynamic phase separately', 'Include background liver, HCC risk context and prior studies', 'For overlapping or atypical morphology, state uncertainty and seek multidisciplinary review'],
    cave: 'PDF page 12 describes no typical wash-out and late equalisation; page 13 lists absent wash-out as a difference from HCC. The separate Wang series reports early wash-out in two TSC cases. These findings come from different sources and show variable patterns; wash-out alone neither confirms nor excludes HAML.',
    evidence: 'Primary evidence: Wang et al., 2009, dynamic CT in hepatic AML (a small series including fat-deficient lesions in TSC); Tsai et al., 2017, histopathologically confirmed CT/MRI cases. The small retrospective series limit generalizability.',
    summary: ['Macroscopic fat is a clue, not proof; HCC can also contain fat.', 'Vascular and enhancement patterns vary; no single sign is definitive.', 'Assess HCC risk context, capsule, vessels and prior studies together.', 'When features overlap, state uncertainty and seek multidisciplinary review.'],
    source: 'Coverage: Abdomen.pdf, pp. 12–13. The source pages were visually reviewed; no PDF case images were reused.',
    sourceUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2712904/',
  },
  fa: {
    title: 'آنژیومیولیپوم کبدی', subtitle: 'چربی ماکروسکوپیک یک سرنخ است، نه اثبات قطعی.',
    lead: 'آنژیومیولیپوم کبدی (HAML) تومور مزانشیمی نادری از خانواده PEComa است و نسبت‌های متغیری از عروق، عضله صاف و چربی دارد. تصویربرداری می‌تواند شک ایجاد کند، اما افتراق مطمئن از HCC همیشه ممکن نیست.',
    cards: [
      ['CT بدون تزریق', 'چربی ماکروسکوپیک با دانسیته منفی می‌تواند تیپیک باشد. چربی ممکن است کم یا غایب باشد؛ HCC نیز گاهی چربی دارد. ضایعه را فقط با یک عدد HU طبقه‌بندی نکنید.'],
      ['CT/MRI دینامیک', 'یافته‌های شایع اما غیراجباری شامل پرعروقی شریانی، عروق برجسته داخل تومور و ورید تخلیه‌کننده زودرس است. هم wash-out و هم تقویت پایدار گزارش شده‌اند؛ هیچ الگوی دینامیک منفردی HAML را رد نمی‌کند.'],
      ['MRI', 'چربی ممکن است در توالی‌های حساس به چربی و به‌شکل افت سیگنال در opposed-phase دیده شود. مقدار چربی قابل مشاهده می‌تواند کم باشد. سیگنال T1، T2 و فاز هپاتوبیلیاری با ترکیب بافتی تغییر می‌کند.'],
      ['افتراق مهم', 'HCC می‌تواند چربی ماکروسکوپیک یا میکروسکوپیک داشته و HAML را تقلید کند. سیروز، زمینه خطر، کپسول، الگوی عروقی و تصاویر قبلی را با هم بسنجید؛ زمینه پرخطر HCC تفسیر را تغییر می‌دهد.'],
    ],
    reportTitle: 'توصیف ساختاریافته', report: ['سگمان، اندازه و تعداد ضایعات', 'چربی: ماکروسکوپیک یا فقط افت سیگنال در opposed-phase', 'الگوی عروقی، ورید تخلیه‌کننده زودرس و هر فاز دینامیک را جداگانه ثبت کنید', 'پارانشیم زمینه، زمینه خطر HCC و تصاویر قبلی را در نظر بگیرید', 'در مورفولوژی همپوشان یا آتیپیک، عدم قطعیت را بیان و بررسی چندتخصصی را مطرح کنید'],
    cave: 'صفحه ۱۲ PDF نبود wash-out تیپیک و هم‌سطح‌شدن تأخیری را شرح می‌دهد؛ صفحه ۱۳ نبود wash-out را تفاوت با HCC می‌داند. سری جداگانه Wang در دو مورد TSC، wash-out زودرس گزارش کرده است. این یافته‌ها از منابع متفاوت‌اند و تنوع الگوها را نشان می‌دهند؛ wash-out به‌تنهایی HAML را نه تأیید می‌کند و نه رد.',
    evidence: 'شواهد اولیه: Wang و همکاران، ۲۰۰۹، CT دینامیک AML کبدی (سری کوچک، شامل ضایعات کم‌چربی در TSC)؛ Tsai و همکاران، ۲۰۱۷، موارد CT/MRI با تأیید آسیب‌شناسی. کوچک و گذشته‌نگر بودن سری‌ها تعمیم‌پذیری را محدود می‌کند.',
    summary: ['چربی ماکروسکوپیک سرنخ است، نه اثبات؛ HCC نیز ممکن است چربی داشته باشد.', 'الگوهای عروقی و تقویت متغیرند؛ هیچ علامت منفردی قطعی نیست.', 'زمینه خطر HCC، کپسول، عروق و تصاویر قبلی را با هم ارزیابی کنید.', 'در یافته‌های همپوشان، عدم قطعیت را بیان و بررسی چندتخصصی را مطرح کنید.'],
    source: 'پوشش: Abdomen.pdf، صفحات ۱۲ تا ۱۳. صفحات منبع به‌صورت دیداری بررسی شدند؛ تصاویر کیس PDF بازاستفاده نشده‌اند.',
    sourceUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2712904/',
  },
}

export default function HepaticAngiomyolipomaPage() {
  const { lang } = useLanguage()
  const c = C[lang] || C.de
  const rtl = lang === 'fa'
  return <LessonReferenceShell lessonId="abdomen-hepatic-aml" lang={lang} title={c.title} diagram="hepatic-aml" copy={c} summary={c.summary} quizHref="/ueben/quiz?fach=abdomen&amp;n=10&amp;themen=hepatisches-angiomyolipom" flashcardsHref="/flashcards/hepatisches-angiomyolipom"><main className={styles.page} dir={rtl ? 'rtl' : 'ltr'} lang={lang}>
    <div className={styles.main} style={{ maxWidth: 1080, margin: '0 auto', padding: '0 1rem' }}>
      <section className={styles.section}><p className={styles.lead}>{c.lead}</p><div className={styles.cardsGrid}>{c.cards.map(([title, text]) => <article className={styles.infoCard} key={title}><h2>{title}</h2><p>{text}</p></article>)}</div></section>
      <section className={styles.section}><h2>{c.reportTitle}</h2><ol>{c.report.map(item => <li key={item}>{item}</li>)}</ol><div className={styles.callout}><strong>⚠</strong><p>{c.cave}</p></div><p>{c.evidence}</p><small>{c.source}</small><p><a href={c.sourceUrl} target="_blank" rel="noreferrer">Wang et al. · dynamic CT study ↗</a></p><p><a href="https://pubmed.ncbi.nlm.nih.gov/28809731/" target="_blank" rel="noreferrer">Tsai et al. · histopathology-correlated CT/MRI study ↗</a></p></section>
    </div>
  </main></LessonReferenceShell>
}
