'use client'

import Image from 'next/image'
import { useLanguage } from '@/providers/LanguageProvider'
import LessonReferenceShell from '@/components/LessonReferenceShell'
import styles from './page.module.css'

const C = {
  de: {
    title: 'Zystische Leberläsionen', subtitle: 'Einfache Zyste und Echinokokkose anhand von Morphologie, Kontext und Warnzeichen unterscheiden.',
    intro: 'Eine glatt begrenzte flüssigkeitsäquivalente Läsion kann einer einfachen Zyste entsprechen. Tochterzysten, abgelöste Membranen, Wandveränderungen oder ein passender Expositionskontext verlangen eine andere Einordnung. Bildgebungsmuster allein sichern keine Echinokokkose.',
    simpleTitle: 'Einfache Leberzyste', simple: [
      ['Sonographie', 'Anechogener, glatt begrenzter Inhalt mit dorsaler Schallverstärkung.'],
      ['CT', 'Flüssigkeitsdichte von etwa 0–20 HU, glatte Kontur, keine Wandaufnahme und kein messbarer Dichteanstieg nach Kontrastmittel. Einblutung kann den Inhalt verändern.'],
      ['MRT', 'Typischerweise T1-hypointens und T2-hyperintens; bei atypischer Wand oder komplexem Inhalt weiter charakterisieren.'],
      ['Mehrere kleine Zysten', 'Zystenähnliche Metastasen (besonders bei Ovarialtumoren und Pankreaszystadenokarzinomen) sowie das Caroli-Syndrom gehören zur PDF-Differenzialdiagnose.'],
    ],
    hydatidTitle: 'Echinokokkenzyste: Warnzeichen ernst nehmen', figureCaption: 'Abdomen.pdf, PDF-S. 7 (Druckseite 6): links T2w-FS mit Tochterzysten, rechts T1w nach Kontrastmittel. Der Inhalt zeigt keine Anreicherung; Wand und Septen können anreichern. Bild aus dem bereitgestellten PDF; Wiederverwendung autorisiert.', figureAlt: 'Axiale Leber-MRT mit mehrkammeriger Echinokokkenzyste: links T2-gewichtete fettgesättigte Aufnahme mit hellen Tochterzysten, rechts T1-gewichtete fettgesättigte Aufnahme nach Kontrastmittel.', ctFigureCaption: 'Abdomen.pdf, PDF-S. 6 (Druckseite 5): axiales CT-Paar desselben Beispiels; links arterielle, rechts portalvenöse Phase. Phasenbezeichnungen wie auf der Quelle; keine Zeitangaben abgeleitet.', ctFigureAlt: 'Zwei axiale CT-Aufnahmen desselben zystischen Leberbefunds: links arterielle, rechts portalvenöse Phase, jeweils mit Phasenlabel aus der PDF.', hydatid: [
      ['Klinischer Verlauf', 'Kann lange asymptomatisch bleiben. Relevante Komplikationen sind Ruptur, Infektion und Einbruch in die Gallenwege; die WHO nennt bei komplizierten Zysten auch Ruptur und Fistelbildung.'],
      ['Mögliche Morphologie', 'Tochterzysten mit divertikelartigen Ausstülpungen, abgelöste Membran („Water-lily“-Zeichen), Wandverkalkung oder komplexer Inhalt können auftreten.'],
      ['CT und MRT', 'CT: glatte rundliche/ovale Läsion, variable Dichte je nach Protein und Debris; Tochterzysten oder abgelöste Endozyste. MRT: T1 meist hypo- bis gemischt signalintensiv, T2 deutlich hyperintensiv; Septen und Tochterzysten sind gut erkennbar.'],
      ['Nach Kontrastmittel', 'Wand und Septen können anreichern, der Zysteninhalt selbst nicht. Ein hypointenser peripherer Saum kann die Perizyste darstellen.'],
      ['Kontext', 'Epidemiologie, Exposition und klinische Angaben mitberücksichtigen; die Bildgebung beschreibt den Verdacht, ersetzt aber keine klinische Diagnostik.'],
    ],
    workflowTitle: 'Sicherer Befundweg', workflow: [
      'Lokalisation und Größe dokumentieren; Inhalt, Wand, Septen und Verkalkung beschreiben.',
      'Sonographische Schallverstärkung und CT/MRT-Kontrastmittelverhalten gezielt prüfen.',
      'Tochterzysten, abgelöste Membran, Infektion, Ruptur oder biliäre Kommunikation suchen.',
      'Vor einer Punktion Echinokokkose ausschließen: eine unbeabsichtigte Punktion kann Anaphylaxie und sekundäre Ausbreitung in Gallenwege, Pleura und Lunge verursachen. Bei Verdacht spezialisierte Abklärung vor jeder Intervention.',
    ],
    cave: 'Eine mögliche Echinokokkose muss vor einer Punktion oder anderen invasiven Maßnahme geklärt werden. Die WHO-Behandlungswahl hängt unter anderem von Zystenstadium, Komplikationen, Lage und verfügbaren Fachkenntnissen ab; diese Lektion leitet keine Therapieentscheidung ab.',
    source: 'Quellabdeckung: Abdomen.pdf, PDF-S. 5–7 (Druckseiten 4–6); alle drei Seiten visuell geprüft. MRT-Fallbild aus PDF-S. 7 (Druckseite 6), T2w-FS und T1w post KM-FS. Ergänzende Quellen: ACG Clinical Guideline: Focal Liver Lesions (2024), WHO Guidelines for Cystic Echinococcosis (2025).',
  },
  en: {
    title: 'Cystic liver lesions', subtitle: 'Distinguish simple cysts from echinococcosis using morphology, context and warning signs.',
    intro: 'A smooth fluid-attenuation lesion may represent a simple cyst. Daughter cysts, detached membranes, wall changes or a relevant exposure history require a different assessment. Imaging patterns alone do not establish echinococcosis.',
    simpleTitle: 'Simple hepatic cyst', simple: [
      ['Ultrasound', 'Anechoic, smoothly marginated contents with posterior acoustic enhancement.'],
      ['CT', 'Fluid attenuation of about 0–20 HU, a smooth contour, no wall enhancement and no measurable post-contrast rise in attenuation. Haemorrhage may alter the contents.'],
      ['MRI', 'Typically T1 hypointense and T2 hyperintense; further characterise an atypical wall or complex contents.'],
      ['Multiple small cysts', 'Cyst-like metastases (particularly with ovarian tumours and pancreatic cystadenocarcinoma) and Caroli syndrome are included in the PDF differential.'],
    ],
    hydatidTitle: 'Echinococcal cyst: heed warning signs', figureCaption: 'Abdomen.pdf, PDF p. 7 (printed p. 6): left, T2w-FS with daughter cysts; right, post-contrast T1w-FS. Contents do not enhance; the wall and septa may enhance. Figure from the supplied PDF; reuse authorised.', figureAlt: 'Axial liver MRI of a multilocular echinococcal cyst: left, T2-weighted fat-suppressed image with bright daughter cysts; right, post-contrast T1-weighted fat-suppressed image.', ctFigureCaption: 'Abdomen.pdf, PDF p. 6 (printed p. 5): paired axial CT panels from the same example; arterial phase left, portal-venous phase right. Phase labels are retained from the source; no timing is inferred.', ctFigureAlt: 'Two axial CT images of the same cystic liver finding: arterial phase on the left and portal-venous phase on the right, with the source phase labels retained.', hydatid: [
      ['Clinical course', 'May remain asymptomatic for a long time. Relevant complications include rupture, infection and extension into the bile ducts; WHO also describes rupture and fistula formation among complications.'],
      ['Possible morphology', 'Daughter cysts with diverticulum-like protrusions, detached membranes (“water-lily” sign), wall calcification or complex contents may occur.'],
      ['CT and MRI', 'CT: smooth round or oval lesion with variable density related to protein and debris; daughter cysts or a detached endocyst may be present. MRI: contents are usually T1 hypointense to mixed and markedly T2 hyperintense; septa and daughter cysts are well seen.'],
      ['After contrast', 'The wall and septa may enhance, but the cyst contents do not. A hypointense peripheral rim may represent the pericyst.'],
      ['Context', 'Consider epidemiology, exposure and clinical history; imaging describes suspicion but does not replace clinical diagnosis.'],
    ],
    workflowTitle: 'A safe reporting sequence', workflow: [
      'Document location and size; describe contents, wall, septa and calcification.',
      'Assess posterior acoustic enhancement and contrast behaviour on CT/MRI.',
      'Look for daughter cysts, detached membranes, infection, rupture or biliary communication.',
      'Exclude echinococcosis before puncture: inadvertent puncture may cause anaphylaxis and secondary spread into the bile ducts, pleura and lungs. If suspected, obtain specialist assessment before any intervention.',
    ],
    cave: 'Possible echinococcosis must be clarified before puncture or another invasive procedure. WHO treatment choices depend on cyst stage, complications, location and available expertise; this lesson does not make treatment decisions.',
    source: 'Coverage: Abdomen.pdf, PDF pp. 5–7 (printed pp. 4–6); all three pages visually checked. MRI case figure from PDF p. 7 (printed p. 6), T2w-FS and post-contrast T1w-FS. Supplementary sources: ACG Clinical Guideline: Focal Liver Lesions (2024), WHO Guidelines for Cystic Echinococcosis (2025).',
  },
  fa: {
    title: 'ضایعات کیستیک کبد', subtitle: 'کیست ساده را با توجه به مورفولوژی، زمینه و نشانه‌های هشدار از اکینوکوکوز افتراق دهید.',
    intro: 'ضایعه‌ای با حدود صاف و دانسیته مایع می‌تواند کیست ساده باشد. کیست‌های دختر، غشای جداشده، تغییرات دیواره یا سابقه تماس مرتبط، ارزیابی متفاوتی می‌طلبند. الگوی تصویربرداری به‌تنهایی اکینوکوکوز را اثبات نمی‌کند.',
    simpleTitle: 'کیست ساده کبد', simple: [
      ['سونوگرافی', 'محتوای بدون اکو با حدود صاف و تقویت صوتی خلفی.'],
      ['CT', 'دانسیته نزدیک مایع، حدود ۰ تا ۲۰ HU، حاشیه صاف، بدون جذب دیواره و بدون افزایش دانسیتهٔ قابل‌اندازه‌گیری پس از تزریق؛ خون‌ریزی می‌تواند محتوای کیست را تغییر دهد.'],
      ['MRI', 'معمولاً در T1 کم‌سیگنال و در T2 پرسیگنال است؛ دیواره غیرمعمول یا محتوای پیچیده را بیشتر بررسی کنید.'],
      ['چند کیست کوچک', 'متاستازهای شبه‌کیستی (به‌ویژه در تومورهای تخمدان و سیست‌آدنوم بدخیم پانکراس) و سندرم کارولی در افتراق PDF آمده‌اند.'],
    ],
    hydatidTitle: 'کیست اکینوکوکی: نشانه‌های هشدار را جدی بگیرید', figureCaption: 'Abdomen.pdf، صفحهٔ PDF شمارهٔ ۷ (صفحهٔ چاپی ۶): چپ، T2w-FS با کیست‌های دختر؛ راست، T1w-FS پس از تزریق. محتوا جذب ندارد؛ دیواره و سپتا ممکن است جذب داشته باشند. تصویر از PDF ارائه‌شده؛ استفادهٔ مجدد مجاز است.', figureAlt: 'MRI محوری کبد با کیست اکینوکوکی چندحفره‌ای: چپ تصویر T2 با سرکوب چربی و کیست‌های دختر پرسیگنال؛ راست تصویر T1 با سرکوب چربی پس از تزریق.', ctFigureCaption: 'Abdomen.pdf، صفحهٔ PDF شمارهٔ ۶ (صفحهٔ چاپی ۵): دو نمای محوری CT از همان نمونه؛ فاز شریانی در چپ و فاز وریدی پورت در راست. برچسب فازها مانند منبع حفظ شده‌اند؛ زمان‌بندی استنباط نشده است.', ctFigureAlt: 'دو تصویر محوری CT از یک یافتهٔ کیستیک کبد: فاز شریانی در چپ و فاز وریدی پورت در راست، با برچسب‌های حفظ‌شده از PDF.', hydatid: [
      ['سیر بالینی', 'ممکن است مدت زیادی بی‌علامت بماند. عوارض مهم شامل پارگی، عفونت و ورود به مجاری صفراوی است؛ WHO پارگی و فیستول را نیز در عوارض کیست پیچیده ذکر می‌کند.'],
      ['مورفولوژی احتمالی', 'کیست‌های دختر با برجستگی‌های دیورتیکول‌مانند، غشای جداشده (علامت «نیلوفر آبی»)، کلسیفیکاسیون دیواره یا محتوای پیچیده ممکن است دیده شوند.'],
      ['CT و MRI', 'CT: ضایعهٔ گرد یا بیضی با حدود صاف و دانسیتهٔ متغیر برحسب پروتئین و دبری؛ ممکن است کیست دختر یا اندوسیست جداشده دیده شود. MRI: محتوا معمولاً در T1 کم‌سیگنال تا مختلط و در T2 بسیار پرسیگنال است؛ سپتا و کیست‌های دختر به‌خوبی دیده می‌شوند.'],
      ['پس از تزریق', 'دیواره و سپتا ممکن است جذب داشته باشند، اما محتوای کیست جذب نمی‌کند. حاشیهٔ محیطی کم‌سیگنال ممکن است پری‌کیست باشد.'],
      ['زمینه', 'همه‌گیرشناسی، سابقه تماس و اطلاعات بالینی را در نظر بگیرید؛ تصویر شک را توصیف می‌کند اما جایگزین تشخیص بالینی نیست.'],
    ],
    workflowTitle: 'توالی ایمن گزارش', workflow: [
      'محل و اندازه را ثبت کنید؛ محتوا، دیواره، سپتا و کلسیفیکاسیون را توصیف کنید.',
      'تقویت صوتی خلفی و رفتار ماده حاجب در CT/MRI را ارزیابی کنید.',
      'به‌دنبال کیست دختر، غشای جداشده، عفونت، پارگی یا ارتباط صفراوی باشید.',
      'پیش از نمونه‌گیری، اکینوکوکوز را رد کنید: نمونه‌گیری ناخواسته ممکن است آنافیلاکسی و انتشار ثانویه به مجاری صفراوی، پلور و ریه ایجاد کند. اگر شک وجود دارد، پیش از هر مداخله ارزیابی تخصصی بگیرید.',
    ],
    cave: 'پیش از نمونه‌گیری یا اقدام تهاجمی دیگر، احتمال اکینوکوکوز باید روشن شود. انتخاب درمان WHO به مرحله کیست، عوارض، محل و مهارت موجود وابسته است؛ این درس تصمیم درمانی نمی‌گیرد.',
    source: 'پوشش منبع: Abdomen.pdf صفحات PDF شمارهٔ ۵ تا ۷ (صفحات چاپی ۴ تا ۶)؛ هر سه صفحه دیداری بررسی شدند. تصویر MRI از PDF صفحهٔ ۷ (چاپی ۶)، سکانس T2w-FS و T1w پس از تزریق است. منابع تکمیلی: راهنمای ACG ضایعات کانونی کبد (۲۰۲۴) و راهنمای WHO اکینوکوکوز کیستیک (۲۰۲۵).',
  },
}

export default function CysticLiverLesionsPage() {
  const { lang } = useLanguage()
  const c = C[lang] || C.de
  return <LessonReferenceShell lessonId="abdomen-cystic-liver-lesions" lang={lang} title={c.title} diagram="hydatid" copy={c} flashcardsHref="/flashcards/leberzyste">
    <main className={styles.page} lang={lang} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      <div className={styles.main}>
        <section className={styles.section}><p className={styles.lead}>{c.intro}</p>
          <div className={styles.cardsGrid}>{c.simple.map(([title, text]) => <article className={styles.infoCard} key={title}><h2>{title}</h2><p>{text}</p></article>)}</div>
        </section>
        <section className={styles.section}><h2>{c.hydatidTitle}</h2><figure className={styles.weberFigure}><Image src="/educational/hydatid-liver/source-mri-p7.jpg" alt={c.figureAlt} width={758} height={283} sizes="(max-width: 760px) 100vw, 760px" /><figcaption>{c.figureCaption}</figcaption></figure><figure className={styles.weberFigure}><Image src="/educational/hydatid-liver/source-ct-phases-p6.png" alt={c.ctFigureAlt} width={604} height={262} sizes="(max-width: 760px) 100vw, 760px" /><figcaption>{c.ctFigureCaption}</figcaption></figure><div className={styles.cardsGrid}>{c.hydatid.map(([title, text]) => <article className={styles.infoCard} key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section>
        <section className={styles.section}><h2>{c.workflowTitle}</h2><ol>{c.workflow.map(item => <li key={item}>{item}</li>)}</ol><div className={styles.callout}><strong>⚠</strong><p>{c.cave}</p></div><small>{c.source}</small><p><a href="https://doi.org/10.14309/ajg.0000000000002857" target="_blank" rel="noreferrer">ACG Clinical Guideline: Focal Liver Lesions ↗</a></p><p><a href="https://www.who.int/publications/i/item/9789240110472" target="_blank" rel="noreferrer">WHO Guidelines for Cystic Echinococcosis ↗</a></p></section>
      </div>
    </main>
  </LessonReferenceShell>
}
