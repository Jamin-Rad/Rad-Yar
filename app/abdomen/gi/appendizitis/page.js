'use client'

import { useLanguage } from '@/providers/LanguageProvider'
import LessonReferenceShell from '@/components/LessonReferenceShell'
import { appendixCoverage } from '@/data/assessmentQuality/appendixSupplement'
import styles from '../divertikulitis/page.module.css'

const appendixImage = 'https://prod-images-static.radiopaedia.org/images/62194749/80d37d32b610533d4d3358b48267767a5b03b6c32a886e8b203d5f90bbbbb06a_big_gallery.jpeg'

const C = {
  de: {
    title: 'Akute Appendizitis', goal: 'Appendix, Wand und periappendikuläre Veränderungen gemeinsam beurteilen.',
    intro: 'Die Diagnose entsteht aus Klinik und Bildgebung. Durchmesser oder ein einzelnes sekundäres Zeichen reichen nicht isoliert aus; Appendixdarstellung, Wand, Kompressibilität und das umgebende Fettgewebe gehören zusammen.',
    mechanism: 'Pathophysiologie kurz: Eine Lumeneinengung kann Sekretstau und Druckanstieg auslösen; Wandischämie/-schädigung begünstigt anschließend die bakterielle Invasion.',
    usTitle: 'Sonographie: Appendix gezielt darstellen', us: [
      ['Direkte Beurteilung', 'Eine blind endende, nicht komprimierbare Struktur entlang des Appendixverlaufs suchen. Die Quelle nennt > 6 mm als Kriterium; Wand, Target-Zeichen, Doppler und lokaler Druckschmerz (Sono-McBurney) gehören zur Gesamtbeurteilung. Im Target-Zeichen liegt die echogene Mukosa/Submukosa innen, die ödematöse Muscularis propria ist hypoechogen, außen folgen Serosa und periappendikuläres Fett.'],
      ['Sekundäre Zeichen', 'Echogenes periappendikuläres Fett, lokale Flüssigkeit oder ein echoreicher Appendikolith mit Schallschatten können den Verdacht stützen.'],
      ['Grenzen', 'Eine nicht dargestellte Appendix ist kein negativer Befund. Körperbau, Darmgas und Erfahrung beeinflussen die Aussage.'],
    ],
    caseCaption: 'Fallbeispiel, Transversalbild vor und nach Kompression: Die Appendix bleibt sichtbar und nicht komprimierbar. Immer im klinischen Kontext beurteilen.',
    caseAlt: 'Transversale Ultraschallbilder vor und nach Kompression: Die Appendix bleibt sichtbar und nicht komprimierbar.',
    caseCredit: 'Stefan Lazic · Radiopaedia-Fall rID 167533 · Studie 136183 · Transversalbild 2 · CC BY-NC-SA',
    caseLicense: 'Radiopaedia-Lizenzhinweise', caseCc: 'CC BY-NC-SA 3.0 Lizenztext',
    ctTitle: 'CT: Entzündung und Komplikation beschreiben', ct: [
      ['Appendix', 'Kaliber (PDF: > 8–9 mm outer-to-outer), Wand (PDF: > 3 mm) und Kontrastmittelaufnahme zusammen beurteilen. Die Quelle betont, dass eine gesunde Appendix bei jungen, schlanken Personen bis 13 mm messen kann; ein Maß allein ist nicht beweisend.'],
      ['Umgebung', 'Fettgewebsreaktion, freie Flüssigkeit, lokale Peritonealverdickung, Lymphknoten und Appendikolith gezielt suchen.'],
      ['Komplikation', 'Perforation, periappendikulären Abszess, Peritonitis sowie seltene Leberabszesse oder Pylephlebitis beachten. Lage und Ausdehnung dokumentieren; Bildgebung allein legt die Therapie nicht fest.'],
    ],
    pathwayTitle: 'Modalität an Population und Situation anpassen', pathway: [
      'Klinische Vortestwahrscheinlichkeit und Untersuchungsqualität berücksichtigen.',
      'Bei Kindern und in der Schwangerschaft ist Ultraschall meist ein strahlenfreier erster Schritt. Bei nicht schlüssigem Befund können je nach Population und Verfügbarkeit MRT oder CT folgen; nicht automatisch eine starre Reihenfolge annehmen.',
      'Bei Erwachsenen ist CT bei passender Fragestellung häufig geeignet; Protokoll und Strahlendosis an Alter und klinische Situation anpassen.',
      'Bei nicht dargestellter Appendix, uneindeutigen Zeichen oder hoher klinischer Diskrepanz die Unsicherheit ausdrücklich berichten.',
    ],
    cave: 'Die 2025-WSES-Leitlinie aktualisiert Diagnostik und Behandlung, während ACR-Angemessenheitskriterien Modalitätswahl für konkrete Populationen einordnen. Dieser Lerninhalt fasst Bildzeichen zusammen und ersetzt weder klinische Risikoabschätzung noch lokale Akutpfade.',
    summary: ['Eine nicht dargestellte Appendix ist kein negativer Befund.', 'Kompressibilität, Wand, Appendixkaliber und Umgebungsreaktion gemeinsam beurteilen.', 'Ein einzelnes Maß oder sekundäres Zeichen beweist die Diagnose nicht.', 'Modalität und Folgeschritte richten sich nach Population, klinischem Kontext und Untersuchungsqualität.'],
    source: 'Quellabdeckung: Abdomen.pdf, S. 79–80 (visuell geprüft). Primärquellen: WSES Jerusalem Guidelines 2025 (JAMA Surgery 2026; DOI 10.1001/jamasurg.2025.6218) und ACR Appropriateness Criteria: Right Lower Quadrant Pain (2022).',
  },
  en: {
    title: 'Acute appendicitis', goal: 'Assess the appendix, its wall and periappendiceal changes together.',
    intro: 'Diagnosis combines clinical assessment and imaging. Diameter or one secondary sign is not sufficient in isolation; visualisation of the appendix, wall, compressibility and surrounding fat should be considered together.',
    mechanism: 'Mechanism in brief: luminal obstruction can cause secretion stasis and rising pressure; subsequent wall ischaemia/injury can enable bacterial invasion.',
    usTitle: 'Ultrasound: identify the appendix deliberately', us: [
      ['Direct assessment', 'Find a blind-ending structure along the appendix that is non-compressible. The source gives > 6 mm as a criterion; assess the wall, target sign, Doppler and focal probe tenderness (Sono-McBurney) together. In the target sign, echogenic mucosa/submucosa is internal, the oedematous muscularis propria is hypoechoic, and serosa with periappendiceal fat is external.'],
      ['Secondary signs', 'Echogenic periappendiceal fat, local fluid or an echogenic appendicolith with acoustic shadowing may support suspicion.'],
      ['Limitations', 'A non-visualised appendix is not a negative examination. Body habitus, bowel gas and operator experience affect assessment.'],
    ],
    caseCaption: 'Case example, transverse image before and after compression: the appendix remains visible and non-compressible. Interpret it in clinical context.',
    caseAlt: 'Transverse ultrasound images before and after compression: the appendix remains visible and non-compressible.',
    caseCredit: 'Stefan Lazic · Radiopaedia case rID 167533 · study 136183 · Transverse image 2 · CC BY-NC-SA',
    caseLicense: 'Radiopaedia license information', caseCc: 'CC BY-NC-SA 3.0 legal code',
    ctTitle: 'CT: describe inflammation and complications', ct: [
      ['Appendix', 'Assess calibre (PDF: > 8–9 mm outer-to-outer), wall (> 3 mm) and enhancement together. The source notes that a healthy appendix in some young, slender patients may measure up to 13 mm; size alone is not diagnostic.'],
      ['Surroundings', 'Look for fat stranding, free fluid, local peritoneal thickening, lymph nodes and an appendicolith.'],
      ['Complications', 'Consider perforation, periappendiceal abscess, peritonitis and the rare complications of liver abscess or pylephlebitis. Document location and extent; imaging alone does not determine treatment.'],
    ],
    pathwayTitle: 'Choose modality for the population and setting', pathway: [
      'Consider clinical pre-test probability and examination quality.',
      'In children and pregnancy, ultrasound is commonly a radiation-free first step. After an inconclusive study, MRI or CT may follow depending on population and availability; do not assume one rigid sequence.',
      'In adults, CT is often appropriate for the relevant presentation; tailor protocol and radiation dose to age and clinical context.',
      'If the appendix is not visualised, findings are equivocal or clinical concern remains high, state the uncertainty explicitly.',
    ],
    cave: 'The 2025 WSES guideline updates diagnosis and treatment, while ACR appropriateness criteria address modality choices for specific populations. This lesson summarises imaging signs and does not replace clinical risk assessment or local acute-care pathways.',
    summary: ['A non-visualised appendix is not a negative examination.', 'Assess compressibility, wall, appendiceal calibre and surrounding reaction together.', 'One measurement or secondary sign alone does not establish the diagnosis.', 'Modality and next steps depend on population, clinical context and examination quality.'],
    source: 'Coverage: Abdomen.pdf, pp. 79–80 (visually checked). Primary sources: WSES Jerusalem Guidelines 2025 (JAMA Surgery 2026; DOI 10.1001/jamasurg.2025.6218) and ACR Appropriateness Criteria: Right Lower Quadrant Pain (2022).',
  },
  fa: {
    title: 'آپاندیسیت حاد', goal: 'آپاندیس، دیواره و تغییرات اطراف آپاندیس را با هم ارزیابی کنید.',
    intro: 'تشخیص از ترکیب ارزیابی بالینی و تصویربرداری به‌دست می‌آید. قطر یا یک نشانه ثانویه به‌تنهایی کافی نیست؛ رؤیت آپاندیس، دیواره، قابلیت فشرده‌شدن و چربی اطراف باید با هم بررسی شوند.',
    mechanism: 'مرور کوتاه سازوکار: انسداد لومن می‌تواند باعث تجمع ترشحات و افزایش فشار شود؛ سپس ایسکمی یا آسیب دیواره زمینه را برای تهاجم باکتریایی فراهم می‌کند.',
    usTitle: 'سونوگرافی: آپاندیس را هدفمند دنبال کنید', us: [
      ['ارزیابی مستقیم', 'ساختاری با انتهای بسته و غیرقابل‌فشرده‌شدن را در امتداد مسیر آپاندیس بیابید. PDF قطر بیش از ۶ میلی‌متر را ذکر می‌کند؛ دیواره، نمای هدف، داپلر و حساسیت به فشار موضعی (Sono-McBurney) را با هم بسنجید. در نمای هدف، مخاط و زیرمخاط اکوژن در داخل، لایهٔ عضلانی ادماتو هیپواکو در میانه، و سروزا و چربی اطراف آپاندیس در خارج قرار دارند.'],
      ['نشانه‌های ثانویه', 'چربی اکوژن اطراف آپاندیس، مایع موضعی یا آپاندیکولیت اکوژن همراه با سایه صوتی می‌توانند شک را تقویت کنند.'],
      ['محدودیت‌ها', 'دیده‌نشدن آپاندیس به معنی بررسی منفی نیست. جثه بیمار، گاز روده و تجربه اپراتور بر ارزیابی اثر دارند.'],
    ],
    caseCaption: 'نمونهٔ موردی، تصویر عرضی پیش و پس از فشار: آپاندیس همچنان دیده می‌شود و فشرده نمی‌شود. یافته را در زمینهٔ بالینی تفسیر کنید.',
    caseAlt: 'تصاویر عرضی سونوگرافی پیش و پس از فشار: آپاندیس همچنان دیده می‌شود و فشرده نمی‌شود.',
    caseCredit: 'Stefan Lazic · مورد Radiopaedia با شناسهٔ rID 167533 · مطالعهٔ 136183 · تصویر عرضی ۲ · CC BY-NC-SA',
    caseLicense: 'اطلاعات مجوز Radiopaedia', caseCc: 'متن مجوز CC BY-NC-SA 3.0',
    ctTitle: 'CT: التهاب و عوارض را توصیف کنید', ct: [
      ['آپاندیس', 'قطر (در PDF: بیش از ۸ تا ۹ میلی‌متر از بیرون به بیرون)، دیواره (بیش از ۳ میلی‌متر) و جذب ماده حاجب را با هم ارزیابی کنید. منبع می‌گوید آپاندیس سالم در برخی افراد جوان و لاغر ممکن است تا ۱۳ میلی‌متر باشد؛ قطر به‌تنهایی تشخیصی نیست.'],
      ['بافت اطراف', 'التهاب چربی، مایع آزاد، ضخیم‌شدن موضعی صفاق، غدد لنفاوی و آپاندیکولیت را جست‌وجو کنید.'],
      ['عوارض', 'پارگی، آبسه اطراف آپاندیس، پریتونیت و عوارض نادر آبسه کبد یا پایلفلبیت را در نظر بگیرید. محل و وسعت را ثبت کنید؛ تصویر به‌تنهایی درمان را تعیین نمی‌کند.'],
    ],
    pathwayTitle: 'روش تصویربرداری را با جمعیت و شرایط تطبیق دهید', pathway: [
      'احتمال پیش‌آزمون بالینی و کیفیت بررسی را در نظر بگیرید.',
      'در کودکان و بارداری، سونوگرافی معمولاً گام نخست بدون پرتو است. اگر نتیجه قطعی نبود، بسته به جمعیت و امکانات MRI یا CT را در نظر بگیرید و یک ترتیب ثابت را مفروض نگیرید.',
      'در بزرگسالان، برای تابلوی مناسب CT اغلب کاربرد دارد؛ پروتکل و دوز پرتو را با سن و زمینه بالینی تطبیق دهید.',
      'اگر آپاندیس دیده نمی‌شود، یافته‌ها مبهم‌اند یا شک بالینی بالاست، عدم قطعیت را صریح گزارش کنید.',
    ],
    cave: 'راهنمای WSES سال ۲۰۲۵ تشخیص و درمان را به‌روز می‌کند و معیارهای تناسب ACR انتخاب روش را برای جمعیت‌های مشخص توضیح می‌دهند. این درس نشانه‌های تصویری را خلاصه می‌کند و جایگزین ارزیابی خطر بالینی یا مسیرهای اورژانسی محلی نیست.',
    summary: ['دیده‌نشدن آپاندیس در سونوگرافی به معنی نتیجه منفی نیست.', 'قابلیت فشرده‌شدن، دیواره، قطر آپاندیس و واکنش بافت اطراف را با هم بسنجید.', 'یک اندازه‌گیری یا نشانه ثانویه به‌تنهایی تشخیص را ثابت نمی‌کند.', 'روش تصویربرداری و گام بعدی به جمعیت، زمینه بالینی و کیفیت بررسی بستگی دارد.'],
    source: 'پوشش منبع: Abdomen.pdf صفحات ۷۹ تا ۸۰ (دیداری بررسی شدند). منابع اولیه: راهنمای WSES Jerusalem سال ۲۰۲۵ (JAMA Surgery 2026؛ DOI 10.1001/jamasurg.2025.6218) و معیارهای تناسب ACR برای درد ربع تحتانی راست (۲۰۲۲).',
  },
}

export default function AppendicitisPage() {
  const { lang } = useLanguage()
  const c = C[lang] || C.de
  return <LessonReferenceShell lessonId="abdomen-appendizitis" lang={lang} title={c.title} diagram="appendix" copy={c} goals={appendixCoverage.learningGoals.map(goal => goal.text[lang])} summary={c.summary} quizHref="/ueben/quiz?fach=abdomen&n=1&themen=appendizitis" flashcardsHref="/flashcards/appendizitis">
      <div className={styles.main} lang={lang} dir={lang === 'fa' ? 'rtl' : 'ltr'} style={{ maxWidth: 1080, margin: '2rem auto', padding: '0 1rem' }}>
        <section className={styles.section}><h2>{c.usTitle}</h2><p className={styles.lead}>{c.intro}</p><p>{c.mechanism}</p><div className={styles.cardsGrid}>{c.us.map(([title, text]) => <article className={styles.infoCard} key={title}><h3>{title}</h3><p>{text}</p></article>)}</div><figure style={{ maxWidth: 630, margin: '1.5rem auto', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 16, background: 'var(--bg-card)' }}><img src={appendixImage} width="630" height="386" alt={c.caseAlt} loading="lazy" style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 10 }} /><figcaption style={{ padding: '0.75rem 0.25rem 0.1rem', color: 'var(--text-soft)', lineHeight: 1.6 }}>{c.caseCaption}<br /><a href="https://radiopaedia.org/cases/acute-appendicitis-on-ultrasound-3?lang=us" target="_blank" rel="noreferrer">{c.caseCredit} ↗</a><br /><a href="https://radiopaedia.org/articles/cases-4?lang=us" target="_blank" rel="noreferrer">{c.caseLicense}</a> · <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/" target="_blank" rel="noreferrer">{c.caseCc}</a></figcaption></figure></section>
        <section className={styles.section}><h2>{c.ctTitle}</h2><div className={styles.cardsGrid}>{c.ct.map(([title, text]) => <article className={styles.infoCard} key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section>
        <section className={styles.section}><h2>{c.pathwayTitle}</h2><ol>{c.pathway.map(item => <li key={item}>{item}</li>)}</ol><div className={styles.callout}><strong>⚠</strong><p>{c.cave}</p></div><small>{c.source}</small><p><a href="https://pubmed.ncbi.nlm.nih.gov/41604201/" target="_blank" rel="noreferrer">WSES Jerusalem Guidelines 2025 ↗</a></p><p><a href="https://acsearch.acr.org/docs/69357/narrative/" target="_blank" rel="noreferrer">ACR Appropriateness Criteria: Right Lower Quadrant Pain ↗</a></p><p><a href="https://acsearch.acr.org/docs/3105874/Narrative/" target="_blank" rel="noreferrer">ACR Appropriateness Criteria: Suspected Appendicitis—Child ↗</a></p></section>
      </div>
  </LessonReferenceShell>
}
