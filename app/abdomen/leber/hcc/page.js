'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import styles from '../fnh/page.module.css'

const CONTENT = {
  de: {
    toc: 'Inhaltsverzeichnis',
    breadcrumbAbdomen: 'Abdomen',
    breadcrumbCurrent: 'Leber · HCC',
    title: 'Hepatozelluläres Karzinom (HCC)',
    subtitle: 'Risikokontext, dynamische Bildgebung, LI-RADS-Merkmale und infiltrative Wachstumsmuster',
    sourceLabel: 'Dr. Zia',
    actionMcq: 'MCQ',
    actionFlash: 'Flashcards',
    keyLabel: 'Merke',
    caveLabel: 'CAVE',
    sections: [
      { id: 'grundlagen', label: 'Grundlagen', icon: '🧬' },
      { id: 'ct', label: 'Dynamische CT', icon: '🩻' },
      { id: 'mrt', label: 'MRT & LI-RADS', icon: '🧲' },
      { id: 'infiltrativ', label: 'Infiltratives HCC', icon: '⚠️' },
      { id: 'fallbeispiele', label: 'Fallbeispiele', icon: '🧪' },
      { id: 'takehome', label: 'Take home', icon: '☾' },
    ],
    heroCards: [
      { value: 'APHE', label: 'arterielle Hypervaskularisation', text: 'non-rim arterial phase hyperenhancement' },
      { value: 'Wash-out', label: 'portalvenös oder spät', text: 'relativ zum Leberparenchym' },
      { value: 'LI-RADS', label: 'nur im passenden Risikokontext', text: 'CT/MRT-Standardisierung' },
    ],
    basics: {
      title: 'Klinische Grundlagen',
      lead: 'Das HCC ist der häufigste primäre maligne Lebertumor. Die bildgebende Diagnose hängt entscheidend vom Risikokontext und vom dynamischen Kontrastmittelverhalten ab.',
      items: [
        { title: 'Risikokontext', text: 'Vor allem Leberzirrhose, chronische Hepatitis B und weitere Hochrisikokonstellationen. LI-RADS ist nicht für jede zufällig entdeckte Leberläsion anwendbar.' },
        { title: 'Tumorbiologie', text: 'Mit der Entdifferenzierung nimmt die arterielle Versorgung zu und die portalvenöse Versorgung ab. Daraus entstehen APHE und späteres Wash-out.' },
        { title: 'Klinische Bedeutung', text: 'Zahl, Größe, Gefäßinvasion, extrahepatische Ausbreitung und Leberfunktion bestimmen Staging und Therapie.' },
      ],
      key: 'Ein typisches Enhancement-Muster ist nur zusammen mit dem passenden Hochrisikokontext diagnostisch belastbar.',
    },
    ct: {
      title: 'Dynamische CT-Diagnostik',
      lead: 'Eine korrekt getimte Mehrphasenuntersuchung ist entscheidend. Das HCC kann in der Nativphase unauffällig sein und erst durch sein relatives Enhancement sichtbar werden.',
      headers: ['Phase', 'Typischer Befund', 'Bedeutung'],
      rows: [
        ['Nativ', 'iso- oder hypodens; ggf. Fett, Blutung oder Verkalkung', 'Ausgangsdichte und intraläsionale Bestandteile'],
        ['Spätarteriell', 'non-rim APHE: stärkere Anreicherung als das umgebende Leberparenchym', 'wichtiges Hauptmerkmal'],
        ['Portalvenös/spät', 'non-peripheral Wash-out', 'zunehmende Hypodensität relativ zur Leber'],
        ['Spätphase', 'anreichernde Kapsel oder Kapselappearance möglich', 'zusätzliches Malignitätsmerkmal'],
      ],
      highlightTitle: 'Wash-out ist ein relativer Befund',
      highlightText: 'Wash-out bedeutet nicht zwingend absoluten Kontrastmittelverlust. Entscheidend ist, dass die Läsion gegenüber dem zunehmend anreichernden Leberparenchym relativ hypodens beziehungsweise hypointens wird.',
      key: 'Non-rim APHE plus non-peripheral Wash-out ist das klassische dynamische Muster eines HCC im Risikopatienten.',
    },
    mri: {
      title: 'MRT und LI-RADS-Merkmale',
      lead: 'Die MRT ergänzt die dynamischen Hauptmerkmale durch sensitive Zusatzzeichen und die hepatobiliäre Phase.',
      headers: ['Sequenz/Merkmal', 'Typischer Befund', 'Einordnung'],
      rows: [
        ['T1/T2', 'meist T1-hypointens, variabel T2-hyperintens', 'nicht spezifisch'],
        ['DWI/ADC', 'Diffusionsrestriktion mit erniedrigtem ADC möglich', 'unterstützendes Malignitätsmerkmal'],
        ['Dynamisch', 'non-rim APHE, Wash-out, anreichernde Kapsel', 'zentrale LI-RADS-Merkmale'],
        ['Hepatobiliäre Phase', 'meist hypointens', 'fehlende funktionsfähige Hepatozyten'],
        ['Wachstum', 'relevantes Schwellenwachstum im Verlauf', 'erhöht den Malignitätsverdacht'],
      ],
      cards: [
        { title: 'LI-RADS richtig verwenden', text: 'Kategorie und Diagnose beruhen auf Zielpopulation, Läsionsgröße, Hauptmerkmalen und Begleitmerkmalen. Die exakte aktuelle LI-RADS-Tabelle ist maßgeblich.' },
        { title: 'Tumor in vein', text: 'Weichteilgewebe mit tumorähnlichem Enhancement innerhalb einer Vene spricht für makrovaskuläre Tumorinvasion und verändert Staging und Therapie wesentlich.' },
      ],
      cave: 'Eine arterielle Hypervaskularisation allein beweist kein HCC. FNH, Adenom, arterioportale Shunts und hypervaskuläre Metastasen können ähnlich erscheinen.',
      key: 'APHE, Wash-out, Kapselappearance, Wachstum und Tumor in vein müssen systematisch beschrieben werden.',
    },
    infiltrative: {
      title: 'Infiltratives und atypisches HCC',
      lead: 'Das infiltrative HCC wächst permeativ über mehrere Segmente oder einen ganzen Leberlappen und kann sich der zirrhotischen Parenchymstruktur angleichen.',
      headers: ['Merkmal', 'Infiltratives HCC'],
      rows: [
        ['Morphologie', 'unscharfe, permeative Infiltration statt klarer solitärer Raumforderung'],
        ['Enhancement', 'heterogen; klassisches APHE/Wash-out kann nur fokal oder gar nicht erkennbar sein'],
        ['Begleitbefunde', 'Satellitenherde, Gefäßinvasion und Pfortader-Tumorthrombus häufig'],
        ['Differenzialdiagnose', 'konfluierende Fibrose, Perfusionsstörung, diffuse Metastasierung oder Entzündung'],
      ],
      cave: 'Fehlendes klassisches Wash-out schließt ein infiltratives HCC nicht aus. Bei diffuser Architekturveränderung müssen Gefäße, DWI, Voraufnahmen und klinischer Risikokontext besonders sorgfältig bewertet werden.',
      key: 'Das infiltrative HCC ist aggressiv und wird häufig über die Kombination aus permeativem Wachstum, Satellitenherden und Gefäßinvasion erkannt.',
    },
    cases: {
      title: 'Verifizierte Radiopaedia-Fälle',
      lead: 'Zwei komplementäre Fälle: klassisches Mehrphasen-HCC und infiltratives Wachstum. Die Originalbilder bleiben bei Radiopaedia.',
      open: 'Originalfall öffnen',
      items: [
        {
          title: 'HCC in der Mehrphasen-CT',
          tags: ['CT', 'APHE', 'Wash-out', 'Kapsel'],
          text: '60-jähriger Patient mit zirrhotischer Leber und Segment-5-HCC: frühe kräftige arterielle Anreicherung, portalvenöses Wash-out und periphere Kapselappearance.',
          credit: 'Michael P. Hartung · Radiopaedia rID-197181',
          url: 'https://radiopaedia.org/cases/hepatocellular-carcinoma-multiphase-exam',
        },
        {
          title: 'Infiltratives HCC mit Satellitenherden',
          tags: ['CT', 'infiltrativ', 'Satelliten'],
          text: '80-jähriger Patient mit Alkoholvorgeschichte: große permeative Tumorkonglomerate, multiple arterielle Herde und teils heterogenes Wash-out.',
          credit: 'Michael P. Hartung · Radiopaedia rID-61803',
          url: 'https://radiopaedia.org/cases/infiltrative-hepatocellular-carcinoma-hcc',
        },
      ],
    },
    takehome: {
      title: 'Take home message',
      lead: 'Die wichtigsten Punkte für Befundung und Prüfung.',
      items: [
        { title: 'Kontext zuerst', text: 'HCC-Bilddiagnostik und LI-RADS nur im geeigneten Hochrisikokontext anwenden.' },
        { title: 'Klassisches Muster', text: 'Non-rim APHE plus non-peripheral Wash-out, oft ergänzt durch Kapselappearance.' },
        { title: 'MRT-Zusatzzeichen', text: 'DWI-Restriktion und Hypointensität in der hepatobiliären Phase unterstützen die Diagnose.' },
        { title: 'Stagingrelevant', text: 'Immer Zahl, Größe, Satelliten, Gefäßinvasion und extrahepatische Ausbreitung angeben.' },
      ],
    },
  },
  en: {
    toc: 'Contents', breadcrumbAbdomen: 'Abdomen', breadcrumbCurrent: 'Liver · HCC',
    title: 'Hepatocellular carcinoma (HCC)',
    subtitle: 'Risk context, dynamic imaging, LI-RADS features and infiltrative growth patterns',
    sourceLabel: 'Dr. Zia', actionMcq: 'MCQ', actionFlash: 'Flashcards', keyLabel: 'Key point', caveLabel: 'Caution',
    sections: [
      { id: 'grundlagen', label: 'Basics', icon: '🧬' }, { id: 'ct', label: 'Dynamic CT', icon: '🩻' },
      { id: 'mrt', label: 'MRI & LI-RADS', icon: '🧲' }, { id: 'infiltrativ', label: 'Infiltrative HCC', icon: '⚠️' },
      { id: 'fallbeispiele', label: 'Cases', icon: '🧪' }, { id: 'takehome', label: 'Take home', icon: '☾' },
    ],
    heroCards: [
      { value: 'APHE', label: 'arterial hyperenhancement', text: 'non-rim arterial phase hyperenhancement' },
      { value: 'Wash-out', label: 'portal venous or delayed', text: 'relative to liver parenchyma' },
      { value: 'LI-RADS', label: 'only in the target population', text: 'CT/MRI standardisation' },
    ],
    basics: {
      title: 'Clinical basics', lead: 'HCC is the most common primary malignant liver tumour. Imaging diagnosis depends on the risk context and dynamic enhancement pattern.',
      items: [
        { title: 'Risk context', text: 'Especially cirrhosis, chronic hepatitis B and other high-risk settings. LI-RADS does not apply to every incidental liver lesion.' },
        { title: 'Tumour biology', text: 'As lesions dedifferentiate, arterial supply increases and portal supply decreases, producing APHE and later wash-out.' },
        { title: 'Clinical impact', text: 'Number, size, vascular invasion, extrahepatic spread and liver function determine staging and treatment.' },
      ],
      key: 'A typical enhancement pattern is diagnostically reliable only in the appropriate high-risk context.',
    },
    ct: {
      title: 'Dynamic CT diagnosis', lead: 'Correctly timed multiphasic imaging is essential. HCC may be inconspicuous before contrast and become visible through relative enhancement.',
      headers: ['Phase', 'Typical finding', 'Meaning'],
      rows: [
        ['Non-contrast', 'iso- or hypodense; possible fat, haemorrhage or calcification', 'baseline density and internal components'],
        ['Late arterial', 'non-rim APHE relative to background liver', 'major feature'],
        ['Portal venous/delayed', 'non-peripheral wash-out', 'increasing relative hypoattenuation'],
        ['Delayed', 'enhancing capsule or capsule appearance may be present', 'additional malignant feature'],
      ],
      highlightTitle: 'Wash-out is relative', highlightText: 'Wash-out does not necessarily mean absolute contrast loss. The lesion becomes relatively darker than the progressively enhancing liver.',
      key: 'Non-rim APHE plus non-peripheral wash-out is the classic dynamic HCC pattern in an at-risk patient.',
    },
    mri: {
      title: 'MRI and LI-RADS features', lead: 'MRI complements dynamic major features with sensitive ancillary signs and the hepatobiliary phase.',
      headers: ['Sequence/feature', 'Typical finding', 'Interpretation'],
      rows: [
        ['T1/T2', 'usually T1 hypointense, variably T2 hyperintense', 'non-specific'],
        ['DWI/ADC', 'restricted diffusion with low ADC may occur', 'ancillary malignant feature'],
        ['Dynamic', 'non-rim APHE, wash-out, enhancing capsule', 'central LI-RADS features'],
        ['Hepatobiliary phase', 'usually hypointense', 'lack of functioning hepatocytes'],
        ['Growth', 'relevant threshold growth on follow-up', 'raises malignant suspicion'],
      ],
      cards: [
        { title: 'Use LI-RADS correctly', text: 'Category and diagnosis depend on target population, lesion size, major and ancillary features. Use the current official LI-RADS table.' },
        { title: 'Tumour in vein', text: 'Enhancing soft tissue within a vein suggests macrovascular tumour invasion and substantially changes staging and treatment.' },
      ],
      cave: 'Arterial hyperenhancement alone does not prove HCC. FNH, adenoma, arterioportal shunts and hypervascular metastases may mimic it.',
      key: 'Systematically report APHE, wash-out, capsule appearance, growth and tumour in vein.',
    },
    infiltrative: {
      title: 'Infiltrative and atypical HCC', lead: 'Infiltrative HCC permeates multiple segments or an entire lobe and may blend into cirrhotic parenchyma.',
      headers: ['Feature', 'Infiltrative HCC'],
      rows: [
        ['Morphology', 'ill-defined permeative infiltration rather than a discrete solitary mass'],
        ['Enhancement', 'heterogeneous; classic APHE/wash-out may be focal or absent'],
        ['Associated findings', 'satellite lesions, vascular invasion and portal vein tumour thrombus are common'],
        ['Differential', 'confluent fibrosis, perfusion alteration, diffuse metastases or inflammation'],
      ],
      cave: 'Absent classic wash-out does not exclude infiltrative HCC. Carefully assess vessels, DWI, prior imaging and the clinical risk context.',
      key: 'Permeative growth, satellite nodules and vascular invasion are key clues to aggressive infiltrative HCC.',
    },
    cases: {
      title: 'Verified Radiopaedia cases', lead: 'Two complementary cases: classic multiphasic HCC and infiltrative growth. Original images remain on Radiopaedia.',
      open: 'Open original case',
      items: [
        { title: 'HCC on multiphasic CT', tags: ['CT', 'APHE', 'wash-out', 'capsule'], text: '60-year-old man with cirrhosis and a segment 5 HCC showing avid arterial enhancement, portal venous wash-out and capsule appearance.', credit: 'Michael P. Hartung · Radiopaedia rID-197181', url: 'https://radiopaedia.org/cases/hepatocellular-carcinoma-multiphase-exam' },
        { title: 'Infiltrative HCC with satellite lesions', tags: ['CT', 'infiltrative', 'satellites'], text: '80-year-old man with alcohol history: large permeative tumour conglomerates, multiple arterial lesions and heterogeneous wash-out.', credit: 'Michael P. Hartung · Radiopaedia rID-61803', url: 'https://radiopaedia.org/cases/infiltrative-hepatocellular-carcinoma-hcc' },
      ],
    },
    takehome: {
      title: 'Take home message', lead: 'The key points for reporting and exams.',
      items: [
        { title: 'Context first', text: 'Use HCC imaging diagnosis and LI-RADS only in the appropriate high-risk population.' },
        { title: 'Classic pattern', text: 'Non-rim APHE plus non-peripheral wash-out, often with capsule appearance.' },
        { title: 'MRI clues', text: 'Restricted diffusion and hepatobiliary phase hypointensity support the diagnosis.' },
        { title: 'Staging matters', text: 'Always report number, size, satellites, vascular invasion and extrahepatic spread.' },
      ],
    },
  },
  fa: {
    toc: 'فهرست مطالب', breadcrumbAbdomen: 'شکم', breadcrumbCurrent: 'کبد · HCC',
    title: 'کارسینوم هپاتوسلولار (HCC)',
    subtitle: 'زمینه خطر، تصویربرداری دینامیک، ویژگی‌های LI-RADS و الگوی رشد انفیلتراتیو',
    sourceLabel: 'Dr. Zia', actionMcq: 'MCQ', actionFlash: 'فلش‌کارت', keyLabel: 'نکته مهم', caveLabel: 'احتیاط',
    sections: [
      { id: 'grundlagen', label: 'مبانی', icon: '🧬' }, { id: 'ct', label: 'CT دینامیک', icon: '🩻' },
      { id: 'mrt', label: 'MRI و LI-RADS', icon: '🧲' }, { id: 'infiltrativ', label: 'HCC انفیلتراتیو', icon: '⚠️' },
      { id: 'fallbeispiele', label: 'نمونه کیس‌ها', icon: '🧪' }, { id: 'takehome', label: 'Take home', icon: '☾' },
    ],
    heroCards: [
      { value: 'APHE', label: 'هایپرانهانسمنت شریانی', text: 'non-rim arterial phase hyperenhancement' },
      { value: 'Wash-out', label: 'پورتال یا تأخیری', text: 'نسبت به پارانشیم کبد' },
      { value: 'LI-RADS', label: 'فقط در گروه پرخطر مناسب', text: 'استانداردسازی CT/MRI' },
    ],
    basics: {
      title: 'مبانی بالینی', lead: 'HCC شایع‌ترین تومور بدخیم اولیه کبد است. تشخیص تصویربرداری به زمینه خطر و الگوی دینامیک کنتراست وابسته است.',
      items: [
        { title: 'زمینه خطر', text: 'به‌ویژه سیروز، هپاتیت B مزمن و سایر شرایط پرخطر. LI-RADS برای هر ضایعه اتفاقی کبدی قابل استفاده نیست.' },
        { title: 'بیولوژی تومور', text: 'با ددیفرانسیاسیون، خون‌رسانی شریانی افزایش و خون‌رسانی پورت کاهش می‌یابد و APHE و سپس wash-out ایجاد می‌شود.' },
        { title: 'اهمیت بالینی', text: 'تعداد، اندازه، تهاجم عروقی، گسترش خارج کبدی و عملکرد کبد مرحله و درمان را تعیین می‌کنند.' },
      ],
      key: 'الگوی enhancement تیپیک فقط همراه با زمینه بالینی پرخطر مناسب ارزش تشخیصی قابل اعتماد دارد.',
    },
    ct: {
      title: 'تشخیص با CT دینامیک', lead: 'تصویربرداری چندفازی با زمان‌بندی صحیح ضروری است. HCC ممکن است بدون کنتراست نامشخص باشد و با enhancement نسبی دیده شود.',
      headers: ['فاز', 'یافته تیپیک', 'اهمیت'],
      rows: [
        ['بدون کنتراست', 'ایزو یا هیپودنس؛ احتمال چربی، خونریزی یا کلسیفیکاسیون', 'تراکم پایه و اجزای داخل ضایعه'],
        ['شریانی دیررس', 'non-rim APHE نسبت به کبد', 'ویژگی اصلی'],
        ['پورتال/تأخیری', 'non-peripheral wash-out', 'هیپودنسیته نسبی فزاینده'],
        ['تأخیری', 'کپسول enhancing یا capsule appearance ممکن است', 'ویژگی اضافی بدخیمی'],
      ],
      highlightTitle: 'Wash-out یک یافته نسبی است', highlightText: 'Wash-out الزاماً به معنی خروج مطلق کنتراست نیست؛ ضایعه نسبت به کبدی که بیشتر enhancement می‌یابد، تیره‌تر می‌شود.',
      key: 'Non-rim APHE همراه non-peripheral wash-out الگوی دینامیک کلاسیک HCC در بیمار پرخطر است.',
    },
    mri: {
      title: 'MRI و ویژگی‌های LI-RADS', lead: 'MRI ویژگی‌های دینامیک اصلی را با علائم کمکی حساس و فاز هپاتوبیلیاری تکمیل می‌کند.',
      headers: ['سکانس/ویژگی', 'یافته تیپیک', 'تفسیر'],
      rows: [
        ['T1/T2', 'معمولاً T1 هیپواینتنس و T2 با هایپراینتنسیتی متغیر', 'غیراختصاصی'],
        ['DWI/ADC', 'ممکن است محدودیت انتشار و ADC پایین وجود داشته باشد', 'ویژگی کمکی بدخیمی'],
        ['دینامیک', 'non-rim APHE، wash-out، کپسول enhancing', 'ویژگی‌های اصلی LI-RADS'],
        ['فاز هپاتوبیلیاری', 'معمولاً هیپواینتنس', 'نبود هپاتوسیت‌های عملکردی'],
        ['رشد', 'رشد قابل توجه در پیگیری', 'افزایش شک به بدخیمی'],
      ],
      cards: [
        { title: 'استفاده صحیح از LI-RADS', text: 'رده‌بندی به گروه هدف، اندازه ضایعه و ویژگی‌های اصلی و کمکی وابسته است. جدول رسمی و به‌روز LI-RADS ملاک است.' },
        { title: 'Tumour in vein', text: 'بافت نرم با enhancement مشابه تومور درون ورید به نفع تهاجم ماکروواسکولار است و مرحله و درمان را تغییر می‌دهد.' },
      ],
      cave: 'هایپرانهانسمنت شریانی به‌تنهایی HCC را اثبات نمی‌کند. FNH، آدنوم، شانت آرتریوپورتال و متاستازهای هیپرواسکولار می‌توانند مشابه باشند.',
      key: 'APHE، wash-out، capsule appearance، رشد و tumour in vein باید سیستماتیک گزارش شوند.',
    },
    infiltrative: {
      title: 'HCC انفیلتراتیو و آتیپیک', lead: 'HCC انفیلتراتیو به‌صورت نفوذی چند سگمان یا یک لوب کامل را درگیر می‌کند و ممکن است با پارانشیم سیروتیک ادغام شود.',
      headers: ['ویژگی', 'HCC انفیلتراتیو'],
      rows: [
        ['مورفولوژی', 'نفوذ نامشخص و permeative به‌جای توده منفرد مشخص'],
        ['Enhancement', 'هتروژن؛ APHE/wash-out کلاسیک ممکن است فقط فوکال یا غایب باشد'],
        ['یافته‌های همراه', 'ندول‌های ماهواره‌ای، تهاجم عروقی و ترومبوس توموری پورت شایع هستند'],
        ['افتراق', 'فیبروز confluent، اختلال پرفیوژن، متاستاز منتشر یا التهاب'],
      ],
      cave: 'نبود wash-out کلاسیک HCC انفیلتراتیو را رد نمی‌کند. عروق، DWI، تصاویر قبلی و زمینه خطر باید دقیق بررسی شوند.',
      key: 'رشد permeative، ندول‌های ماهواره‌ای و تهاجم عروقی سرنخ‌های اصلی HCC انفیلتراتیو تهاجمی هستند.',
    },
    cases: {
      title: 'کیس‌های تأییدشده Radiopaedia', lead: 'دو کیس مکمل: HCC کلاسیک در CT چندفازی و رشد انفیلتراتیو. تصاویر اصلی در Radiopaedia باقی می‌مانند.',
      open: 'باز کردن کیس اصلی',
      items: [
        { title: 'HCC در CT چندفازی', tags: ['CT', 'APHE', 'wash-out', 'کپسول'], text: 'مرد ۶۰ ساله با سیروز و HCC سگمان ۵: enhancement شریانی قوی، wash-out پورتال و capsule appearance.', credit: 'Michael P. Hartung · Radiopaedia rID-197181', url: 'https://radiopaedia.org/cases/hepatocellular-carcinoma-multiphase-exam' },
        { title: 'HCC انفیلتراتیو با ضایعات ماهواره‌ای', tags: ['CT', 'انفیلتراتیو', 'ماهواره‌ای'], text: 'مرد ۸۰ ساله با سابقه الکل: کنگلومرای permeative بزرگ، ضایعات شریانی متعدد و wash-out هتروژن.', credit: 'Michael P. Hartung · Radiopaedia rID-61803', url: 'https://radiopaedia.org/cases/infiltrative-hepatocellular-carcinoma-hcc' },
      ],
    },
    takehome: {
      title: 'Take home message', lead: 'مهم‌ترین نکات برای گزارش و آزمون.',
      items: [
        { title: 'ابتدا زمینه', text: 'تشخیص تصویربرداری HCC و LI-RADS فقط در گروه پرخطر مناسب استفاده شود.' },
        { title: 'الگوی کلاسیک', text: 'Non-rim APHE همراه non-peripheral wash-out و اغلب capsule appearance.' },
        { title: 'علائم MRI', text: 'محدودیت انتشار و هیپواینتنسیتی فاز هپاتوبیلیاری تشخیص را تقویت می‌کنند.' },
        { title: 'مرحله‌بندی', text: 'تعداد، اندازه، ضایعات ماهواره‌ای، تهاجم عروقی و گسترش خارج کبدی همیشه گزارش شوند.' },
      ],
    },
  },
}

const READ_COPY = {
  de: { mark: 'Als gelesen markieren', read: 'Als gelesen markiert', error: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.', signIn: 'Anmelden' },
  en: { mark: 'Mark as read', read: 'Marked as read', error: 'Please sign in to save your learning progress.', signIn: 'Sign in' },
  fa: { mark: 'علامت‌گذاری به‌عنوان خوانده‌شده', read: 'به‌عنوان خوانده‌شده علامت‌گذاری شد', error: 'برای ذخیره پیشرفت یادگیری لطفاً وارد شوید.', signIn: 'ورود' },
}

function ReadButton({ isRead, onClick, authError }) {
  const { lang } = useLanguage()
  const copy = READ_COPY[lang] || READ_COPY.de
  return (
    <div className={styles.readControl}>
      <button type="button" className={`${styles.readButton} ${isRead ? styles.readButtonActive : ''}`} onClick={onClick}>
        <span className={styles.readCheck} aria-hidden="true">{isRead ? '✓' : ''}</span>
        <span>{isRead ? copy.read : copy.mark}</span>
      </button>
      {authError && <div className={styles.readError} role="alert"><span>{copy.error}</span><Link href="/sign-in">{copy.signIn}</Link></div>}
    </div>
  )
}

function Table({ headers, rows }) {
  return <div className={styles.tableWrap}><table className={styles.table}><thead><tr>{headers.map(item => <th key={item}>{item}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={`${index}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody></table></div>
}

function Callout({ type = 'note', label, children }) {
  return <div className={`${styles.callout} ${type === 'cave' ? styles.cave : ''}`.trim()}><strong>{type === 'cave' ? '⚠️' : '💡'} {label}</strong><p>{children}</p></div>
}

function Section({ id, title, lead, children }) {
  const isMobile = useMobileLearningLayout()
  const [open, setOpen] = useState(true)
  useEffect(() => setOpen(!isMobile), [isMobile, id])
  return (
    <section id={id} className={styles.section}>
      <button className={styles.sectionHeader} type="button" onClick={() => setOpen(value => !value)} aria-expanded={open}><h2>{title}</h2><span>{open ? '−' : '+'}</span></button>
      {open && <div className={styles.sectionBody}>{lead && <p className={styles.lead}>{lead}</p>}{children}</div>}
    </section>
  )
}

export default function HccPage() {
  const { lang } = useLanguage()
  const copy = CONTENT[lang] || CONTENT.de
  const isRTL = lang === 'fa'
  const [activeId, setActiveId] = useState(copy.sections[0].id)
  const { isRead, toggleRead, authError } = useLessonReadStatus('hcc')
  const withLang = href => lang === 'de' ? href : (href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`)
  const sectionIds = useMemo(() => copy.sections.map(section => section.id), [copy.sections])

  useEffect(() => {
    const observers = sectionIds.map(id => {
      const element = document.getElementById(id)
      if (!element) return null
      const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setActiveId(id) }, { rootMargin: '-18% 0px -72% 0px', threshold: .01 })
      observer.observe(element)
      return observer
    })
    return () => observers.forEach(observer => observer?.disconnect())
  }, [sectionIds])

  return (
    <main className={styles.page} dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
      <header className={styles.header}>
        <div className={styles.breadcrumb}><Link href={withLang('/')}>RadYar</Link><span>›</span><Link href={withLang('/lernen/abdomen')}>{copy.breadcrumbAbdomen}</Link><span>›</span><span>{copy.breadcrumbCurrent}</span></div>
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.sourceBadge}>{copy.sourceLabel}</span><h1>{copy.title}</h1><p>{copy.subtitle}</p>
            <div className={styles.actions}>
              <Link href={withLang(`/ueben/quiz?fach=abdomen&n=10&themen=hcc&from=${encodeURIComponent(withLang('/abdomen/leber/hcc'))}`)} className={styles.actionBtn}>🎯 {copy.actionMcq}</Link>
              <Link href={withLang(`/flashcards/hcc?from=${encodeURIComponent(withLang('/abdomen/leber/hcc'))}`)} className={styles.actionBtn}>🧠 {copy.actionFlash}</Link>
            </div>
          </div>
          <div className={styles.heroStats}>{copy.heroCards.map(card => <div className={styles.heroStat} key={card.label}><strong>{card.value}</strong><span>{card.label}</span><small>{card.text}</small></div>)}</div>
        </div>
      </header>

      <div className={styles.readBar}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError} /></div>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sideTitle}>{copy.toc}</div>
          {copy.sections.map(section => <button type="button" key={section.id} className={`${styles.sideItem} ${activeId === section.id ? styles.sideItemActive : ''}`} onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}><span>{section.icon}</span><strong>{section.label}</strong></button>)}
        </aside>

        <div className={styles.main}>
          <Section id="grundlagen" title={copy.basics.title} lead={copy.basics.lead}>
            <div className={styles.cardsGrid}>{copy.basics.items.map(item => <div className={styles.infoCard} key={item.title}><h3>{item.title}</h3><p>{item.text}</p></div>)}</div>
            <Callout label={copy.keyLabel}>{copy.basics.key}</Callout>
          </Section>
          <Section id="ct" title={copy.ct.title} lead={copy.ct.lead}>
            <Table headers={copy.ct.headers} rows={copy.ct.rows} />
            <div className={styles.highlightBox}><h3>{copy.ct.highlightTitle}</h3><p>{copy.ct.highlightText}</p></div>
            <Callout label={copy.keyLabel}>{copy.ct.key}</Callout>
          </Section>
          <Section id="mrt" title={copy.mri.title} lead={copy.mri.lead}>
            <Table headers={copy.mri.headers} rows={copy.mri.rows} />
            <div className={styles.splitGrid}>{copy.mri.cards.map(card => <div className={styles.infoCard} key={card.title}><h3>{card.title}</h3><p>{card.text}</p></div>)}</div>
            <Callout type="cave" label={copy.caveLabel}>{copy.mri.cave}</Callout>
            <Callout label={copy.keyLabel}>{copy.mri.key}</Callout>
          </Section>
          <Section id="infiltrativ" title={copy.infiltrative.title} lead={copy.infiltrative.lead}>
            <Table headers={copy.infiltrative.headers} rows={copy.infiltrative.rows} />
            <Callout type="cave" label={copy.caveLabel}>{copy.infiltrative.cave}</Callout>
            <Callout label={copy.keyLabel}>{copy.infiltrative.key}</Callout>
          </Section>
          <Section id="fallbeispiele" title={copy.cases.title} lead={copy.cases.lead}>
            <div className={styles.caseGrid}>{copy.cases.items.map(item => <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer" className={styles.caseCardLink}><div className={styles.caseImage} aria-hidden="true">CT</div><div className={styles.caseBody}><div className={styles.caseLabelRow}>{item.tags.map(tag => <span key={tag} className={styles.caseLabel}>{tag}</span>)}</div><h3>{item.title}</h3><p>{item.text}</p><small>{item.credit}</small><strong>{copy.cases.open}</strong></div></a>)}</div>
          </Section>
          <Section id="takehome" title={copy.takehome.title} lead={copy.takehome.lead}>
            <div className={styles.takeHomeGrid}>{copy.takehome.items.map((item, index) => <div className={styles.takeHomeItem} key={item.title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></div>)}</div>
          </Section>
          <div className={styles.readBarBottom}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError} /></div>
        </div>
      </div>
    </main>
  )
}
