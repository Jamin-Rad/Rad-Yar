'use client'


import LegacyLessonMigration from '@/components/lesson-template/LegacyLessonMigration'
import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import styles from './page.module.css'
import InProgressBanner from '@/components/InProgressBanner'

const GUIDELINE_URL = 'https://register.awmf.org/de/leitlinien/detail/021-020'

const LEARNING_CASES = [
  {
    id: 'uncomplicated',
    image: '/divertikulitis/learning-uncomplicated-rid-149797.jpg',
    url: 'https://radiopaedia.org/cases/uncomplicated-sigmoid-diverticulitis-2?lang=us',
    credit: 'Case courtesy of Amr El-Talla, Radiopaedia.org · rID: 149797',
  },
  {
    id: 'abscess',
    image: '/divertikulitis/learning-abscess-rid-29015.jpg',
    url: 'https://radiopaedia.org/cases/acute-sigmoid-diverticulitis-with-abscess?lang=us',
    credit: 'Case courtesy of Frank Gaillard, Radiopaedia.org · rID: 29015',
  },
]

const CONTENT = {
  de: {
    toc: 'Inhaltsverzeichnis',
    breadcrumbAbdomen: 'Abdomen',
    breadcrumbCurrent: 'Gastrointestinaltrakt · Divertikulitis',
    title: 'Divertikulose & Divertikulitis',
    subtitle: 'CT-Diagnostik, CDD-Klassifikation und sichere Erkennung komplizierter Verläufe',
    sourceLabel: 'Dr. Zia',
    actionMcq: 'MCQ',
    actionFlash: 'Flashcards',
    keyLabel: 'Merke',
    caveLabel: 'CAVE',
    openCase: 'Fall in Radiopaedia öffnen',
    guideline: 'S3-Leitlinie öffnen',
    sections: [
      { id: 'grundlagen', label: 'Grundlagen', icon: '🌀' },
      { id: 'ct', label: 'CT-Diagnostik', icon: '🩻' },
      { id: 'cdd', label: 'CDD-Klassifikation', icon: '📋' },
      { id: 'komplikationen', label: 'Komplikationen', icon: '⚠️' },
      { id: 'befundung', label: 'Befundung', icon: '📝' },
      { id: 'faelle', label: 'Fallbeispiele', icon: '🔬' },
      { id: 'takehome', label: 'Take home message', icon: '💡' },
    ],
    heroCards: [
      { value: 'CT C+', label: 'Methode der Wahl', text: 'Ausdehnung und Komplikationen erfassen' },
      { value: '> 4 mm', label: 'Wandverdickung', text: 'segmental, meist im Sigma' },
      { value: 'CDD 1–4', label: 'klinische Einordnung', text: 'unkompliziert bis kompliziert' },
    ],
    basics: {
      title: 'Divertikulose ist nicht Divertikulitis',
      lead: 'Kolondivertikel sind erworbene Ausstülpungen von Mukosa und Submukosa durch Schwachstellen der Muskularis. Divertikulitis bezeichnet die Entzündung eines oder mehrerer Divertikel, gegebenenfalls mit Reaktion der Darmwand und des umgebenden Gewebes.',
      items: [
        { title: 'Divertikulose', text: 'Divertikel ohne entzündliche Begleitreaktion. Häufiger asymptomatischer Zufallsbefund.' },
        { title: 'Prädilektion', text: 'Im westlichen Patientenkollektiv überwiegend im Sigma, wo ein engeres Lumen mit höherem intraluminalem Druck zusammentrifft.' },
        { title: 'Divertikulitis', text: 'Entzündung eines oder mehrerer Divertikel; Ausmaß und begleitende Darmwand- oder perikolische Reaktion können variieren.' },
      ],
      key: 'Divertikel allein belegen keine Divertikulitis. Entzündetes Divertikel, Wandverdickung und perikolische Reaktion bilden eine typische CT-Konstellation; eine ausgeprägte vollständige Trias ist nicht in jeder Form erforderlich.',
    },
    ct: {
      title: 'CT-Diagnostik',
      lead: 'Bei klinischem Verdacht auf akute Divertikulitis dient die kontrastverstärkte CT zur Diagnosesicherung, Schweregradeinteilung und Suche nach Komplikationen.',
      headers: ['Baustein', 'Typischer CT-Befund', 'Bedeutung'],
      rows: [
        ['Divertikel', 'Fokale Ausstülpung, häufig mit entzündlich verdickter Wand', 'Ausgangspunkt der Entzündung'],
        ['Darmwand', 'Segmentale Verdickung, meist > 4 mm', 'Ausdehnung und Stenose beurteilen'],
        ['Fettgewebe', 'Perikolisches stranding / dirty fat', 'Oft disproportional ausgeprägt zur Wandverdickung'],
        ['Kontrastmittel', 'Mural und peridivertikulär verstärkte Reaktion', 'Entzündungsaktivität und Abszesswand'],
        ['Luft / Flüssigkeit', 'Extraluminale Gasbläschen oder Kollektion', 'Hinweis auf Perforation beziehungsweise Abszess'],
      ],
      protocol: [
        { title: 'Portalvenöse Kontrastphase', text: 'In der Regel ausreichend zur Beurteilung von Darmwand, Fettgewebe, Abszessen und freien Flüssigkeitsansammlungen.' },
        { title: 'Keine routinemäßige enterale Kontrastierung', text: 'Orales oder rektales Kontrastmittel ist für die Standarddiagnostik meist nicht erforderlich.' },
        { title: 'Gezielte rektale Kontrastierung', text: 'Kann bei spezieller Fragestellung, etwa Fistel oder Anastomosenleck, hilfreich sein.' },
      ],
      cave: 'Bei ausgeprägter kurzer asymmetrischer Wandverdickung, abdominellen Lymphknoten oder fehlender typischer peridivertikulärer Reaktion muss ein kolorektales Karzinom mitbedacht werden.',
    },
    cdd: {
      title: 'CDD-Klassifikation',
      lead: 'Die Classification of Diverticular Disease verbindet klinische und bildgebende Befunde. Die folgende Tabelle verwendet die S3/DGVS-Fassung 2021 mit der 3-cm-Abszessgrenze. Für den Bericht ist die Trennung zwischen unkompliziert und kompliziert entscheidend.',
      headers: ['Typ', 'Bezeichnung', 'Bildgebung'],
      rows: [
        ['0', 'Asymptomatische Divertikulose', 'Divertikel ohne Entzündung'],
        ['1a', 'Akut unkompliziert', 'Wandverdickung ohne relevante Umgebungsreaktion'],
        ['1b', 'Akut unkompliziert, phlegmonös', 'Perikolische Fettgewebsreaktion, kein Abszess'],
        ['2a', 'Mikroabszess / gedeckte Perforation', 'Kleine perikolische Kollektion bis 3 cm'],
        ['2b', 'Makroabszess', 'Abszess über 3 cm'],
        ['2c', 'Freie Perforation', 'Freie Luft oder Flüssigkeit, Peritonitiszeichen'],
        ['3a', 'Symptomatische unkomplizierte Divertikelkrankheit (SUDD)', 'Persistierende oder wiederkehrende Beschwerden ohne akute Entzündung im CT; dies beweist keine akute Divertikulitis'],
        ['3b', 'Rezidivierende Divertikulitis ohne Komplikationen', 'Wiederkehrende Entzündungsepisoden ohne Stenose, Fistel oder entzündliches Konglomerat'],
        ['3c', 'Rezidivierende Divertikulitis mit Komplikationen', 'Zum Beispiel Stenose, Fistel oder entzündliches Konglomerat'],
        ['4', 'Divertikelblutung', 'Aktive Blutung gegebenenfalls in der CT-Angiografie'],
      ],
      key: 'CDD 3a bezeichnet symptomatische unkomplizierte Divertikelkrankheit, 3b rezidivierende Entzündung ohne Komplikation und 3c rezidivierende Entzündung mit Komplikation. Abszess oder freie Perforation gehören zur akuten komplizierten Gruppe 2.',
    },
    complications: {
      title: 'Komplikationen gezielt suchen',
      lead: 'Sobald eine Divertikulitis erkannt ist, muss die gesamte Untersuchung nach Komplikationen und deren Ausdehnung durchsucht werden.',
      items: [
        { title: 'Abszess', text: 'Flüssigkeitsdichte Kollektion mit randständigem Enhancement, häufig mit Gaseinschlüssen. Größe und Zugänglichkeit angeben.' },
        { title: 'Perforation', text: 'Perikolische Gasbläschen sprechen für eine gedeckte Perforation; freie intraperitoneale Luft und Flüssigkeit für einen freien Durchbruch.' },
        { title: 'Fistel', text: 'Trakt oder entzündliche Adhärenz zu Nachbarorganen. Gas in der Harnblase ohne vorausgegangene Instrumentierung ist ein wichtiger Hinweis auf eine kolovesikale Fistel.' },
        { title: 'Stenose / Ileus', text: 'Lumeneinengung, prästenotische Dilatation und Länge des betroffenen Segments beschreiben; Tumor differenzialdiagnostisch ausschließen.' },
      ],
      cave: 'Nicht bei der Diagnose „Divertikulitis“ stehen bleiben: Abszessgröße, freie Luft, Fistel, Stenose und Fernkomplikationen verändern das weitere Management.',
    },
    reporting: {
      title: 'Strukturierter CT-Befund',
      lead: 'Ein kurzer, vollständiger Bericht beantwortet die klinisch entscheidenden Fragen.',
      items: [
        { title: '1. Lokalisation', text: 'Betroffenes Kolonsegment und Länge der entzündlichen Veränderung.' },
        { title: '2. Leitbefunde', text: 'Entzündetes Divertikel, maximale Wanddicke und Ausmaß des perikolischen strandings.' },
        { title: '3. Komplikationen', text: 'Abszess mit drei Dimensionen, extraluminale Luft, freie Flüssigkeit, Fistel oder Obstruktion.' },
        { title: '4. Einordnung', text: 'Unkompliziert oder kompliziert; soweit sicher möglich CDD-Typ nennen.' },
        { title: '5. Differenzialdiagnose', text: 'Bei atypischem Muster Karzinom, Kolitis oder epiploische Appendagitis diskutieren.' },
      ],
      key: 'Beispiel: Akute Sigmadivertikulitis mit ausgeprägter perikolischer Fettgewebsreaktion, ohne Abszess oder freie Perforation, vereinbar mit CDD Typ 1b.',
    },
    cases: {
      title: 'Zwei Radiopaedia-Fallbeispiele',
      lead: 'Die Bilder zeigen den entscheidenden Unterschied: lokale Entzündung ohne drainierbare Kollektion versus komplizierter Verlauf mit Abszessen.',
      uncomplicated: {
        label: 'Unkompliziert',
        title: 'Akute unkomplizierte Sigmadivertikulitis',
        text: 'Segmentale Sigmaverdickung, mehrere Divertikel und ausgeprägtes perikolisches stranding. Keine freie Perforation und keine drainierbare Kollektion.',
        alt: 'Axiale CT einer unkomplizierten Sigmadivertikulitis',
      },
      abscess: {
        label: 'Kompliziert',
        title: 'Sigmadivertikulitis mit Abszess',
        text: 'Randständig kontrastierende perikolische Kollektionen mit Gaseinschlüssen am Rektosigmoid, entsprechend einer komplizierten Divertikulitis.',
        alt: 'Axiale kontrastverstärkte CT einer Sigmadivertikulitis mit Abszess',
      },
    },
    takehome: {
      title: 'Take home message',
      lead: 'Die wichtigsten Regeln für die Befundung.',
      items: [
        { title: 'Trias erkennen', text: 'Divertikel, segmentale Wandverdickung und perikolisches stranding ergeben das typische CT-Muster.' },
        { title: 'Komplikationen entscheiden', text: 'Abszess, Perforation, Fistel und Stenose aktiv suchen und präzise beschreiben.' },
        { title: 'CDD sinnvoll einsetzen', text: 'Die Klassifikation ergänzt den Befund; die sichere Trennung unkompliziert versus kompliziert ist zentral.' },
        { title: 'Tumor nicht übersehen', text: 'Atypisch fokale oder asymmetrische Verdickung und Lymphadenopathie verlangen eine onkologische Differenzialdiagnose.' },
      ],
    },
  },
  en: {
    toc: 'Contents',
    breadcrumbAbdomen: 'Abdomen',
    breadcrumbCurrent: 'Gastrointestinal tract · Diverticulitis',
    title: 'Diverticulosis & diverticulitis',
    subtitle: 'CT diagnosis, CDD classification and reliable detection of complicated disease',
    sourceLabel: 'Dr. Zia',
    actionMcq: 'MCQ',
    actionFlash: 'Flashcards',
    keyLabel: 'Key point',
    caveLabel: 'Caution',
    openCase: 'Open case in Radiopaedia',
    guideline: 'Open S3 guideline',
    sections: [
      { id: 'grundlagen', label: 'Basics', icon: '🌀' },
      { id: 'ct', label: 'CT diagnosis', icon: '🩻' },
      { id: 'cdd', label: 'CDD classification', icon: '📋' },
      { id: 'komplikationen', label: 'Complications', icon: '⚠️' },
      { id: 'befundung', label: 'Reporting', icon: '📝' },
      { id: 'faelle', label: 'Cases', icon: '🔬' },
      { id: 'takehome', label: 'Take home message', icon: '💡' },
    ],
    heroCards: [
      { value: 'C+ CT', label: 'method of choice', text: 'define extent and complications' },
      { value: '> 4 mm', label: 'wall thickening', text: 'segmental, usually sigmoid' },
      { value: 'CDD 1–4', label: 'clinical classification', text: 'uncomplicated to complicated' },
    ],
    basics: {
      title: 'Diverticulosis is not diverticulitis',
      lead: 'Colonic diverticula are acquired herniations of mucosa and submucosa through weak points in the muscular wall. Diverticulitis is inflammation of one or more diverticula, which may be accompanied by a reaction of the bowel wall and surrounding tissue.',
      items: [
        { title: 'Diverticulosis', text: 'Diverticula without surrounding inflammation, commonly an asymptomatic incidental finding.' },
        { title: 'Predilection', text: 'In Western populations, the sigmoid colon is most often affected.' },
        { title: 'Diverticulitis', text: 'Inflammation of one or more diverticula; extent and associated mural or pericolic reaction may vary.' },
      ],
      key: 'Diverticula alone do not establish diverticulitis. An inflamed diverticulum, mural thickening and pericolic reaction form a typical CT pattern; a pronounced complete triad is not required in every form.',
    },
    ct: {
      title: 'CT diagnosis',
      lead: 'Contrast-enhanced CT confirms the diagnosis, grades severity and identifies complications.',
      headers: ['Feature', 'Typical CT finding', 'Meaning'],
      rows: [
        ['Diverticulum', 'Focal outpouching, often with an inflamed wall', 'Epicentre of inflammation'],
        ['Bowel wall', 'Segmental thickening, usually > 4 mm', 'Assess extent and stenosis'],
        ['Fat', 'Pericolic stranding / dirty fat', 'Often disproportionate to wall thickening'],
        ['Enhancement', 'Mural and peridiverticular inflammatory enhancement', 'Activity and abscess wall'],
        ['Gas / fluid', 'Extraluminal gas bubbles or a collection', 'Perforation or abscess'],
      ],
      protocol: [
        { title: 'Portal venous phase', text: 'Usually sufficient to assess the bowel wall, surrounding fat, abscesses and free fluid.' },
        { title: 'No routine enteric contrast', text: 'Oral or rectal contrast is generally unnecessary for standard assessment.' },
        { title: 'Targeted rectal contrast', text: 'May help when a fistula or anastomotic leak is specifically suspected.' },
      ],
      cave: 'Marked short-segment asymmetric wall thickening, lymphadenopathy or absent typical peridiverticular inflammation should raise concern for colorectal cancer.',
    },
    cdd: {
      title: 'CDD classification',
      lead: 'The Classification of Diverticular Disease combines clinical and imaging findings. The table uses the S3/DGVS 2021 version with the 3-cm abscess boundary. The crucial reporting distinction is uncomplicated versus complicated disease.',
      headers: ['Type', 'Category', 'Imaging'],
      rows: [
        ['0', 'Asymptomatic diverticulosis', 'Diverticula without inflammation'],
        ['1a', 'Acute uncomplicated', 'Wall thickening without relevant surrounding reaction'],
        ['1b', 'Acute uncomplicated, phlegmonous', 'Pericolic inflammation without abscess'],
        ['2a', 'Microabscess / contained perforation', 'Pericolic collection up to 3 cm'],
        ['2b', 'Macroabscess', 'Abscess larger than 3 cm'],
        ['2c', 'Free perforation', 'Free gas or fluid and signs of peritonitis'],
        ['3a', 'Symptomatic uncomplicated diverticular disease (SUDD)', 'Persistent or recurrent symptoms without acute inflammation on CT; this does not prove acute diverticulitis'],
        ['3b', 'Recurrent diverticulitis without complications', 'Recurrent inflammatory episodes without stenosis, fistula or inflammatory conglomerate'],
        ['3c', 'Recurrent diverticulitis with complications', 'For example, stenosis, fistula or inflammatory conglomerate'],
        ['4', 'Diverticular bleeding', 'Active bleeding may be shown on CT angiography'],
      ],
      key: 'CDD 3a denotes symptomatic uncomplicated diverticular disease, 3b recurrent inflammation without complications, and 3c recurrent disease with complications. Abscess and free perforation belong to acute complicated type 2.',
    },
    complications: {
      title: 'Search actively for complications',
      lead: 'Once diverticulitis is identified, review the entire examination for complications and their extent.',
      items: [
        { title: 'Abscess', text: 'Fluid collection with rim enhancement and often gas. Report size and potential accessibility.' },
        { title: 'Perforation', text: 'Pericolic gas suggests contained perforation; free intraperitoneal gas and fluid indicate free perforation.' },
        { title: 'Fistula', text: 'A tract or inflammatory adherence to an adjacent organ. Bladder gas without instrumentation suggests a colovesical fistula.' },
        { title: 'Stenosis / obstruction', text: 'Describe narrowing, upstream dilatation and segment length; exclude malignancy.' },
      ],
      cave: 'Do not stop after naming diverticulitis: abscess size, free gas, fistula, stenosis and distant complications alter management.',
    },
    reporting: {
      title: 'Structured CT report',
      lead: 'A concise, complete report answers the clinically relevant questions.',
      items: [
        { title: '1. Location', text: 'Affected colonic segment and length of inflammatory change.' },
        { title: '2. Core findings', text: 'Inflamed diverticulum, maximum wall thickness and extent of fat stranding.' },
        { title: '3. Complications', text: 'Abscess in three dimensions, extraluminal gas, free fluid, fistula or obstruction.' },
        { title: '4. Classification', text: 'State uncomplicated or complicated and provide the CDD type when confident.' },
        { title: '5. Differential', text: 'For atypical patterns discuss cancer, colitis or epiploic appendagitis.' },
      ],
      key: 'Example: Acute sigmoid diverticulitis with marked pericolic inflammation, without abscess or free perforation, consistent with CDD type 1b.',
    },
    cases: {
      title: 'Two Radiopaedia cases',
      lead: 'The images demonstrate the key distinction: local inflammation without a drainable collection versus complicated disease with abscesses.',
      uncomplicated: {
        label: 'Uncomplicated',
        title: 'Acute uncomplicated sigmoid diverticulitis',
        text: 'Segmental sigmoid wall thickening, diverticula and marked pericolic stranding without free perforation or a drainable collection.',
        alt: 'Axial CT of uncomplicated sigmoid diverticulitis',
      },
      abscess: {
        label: 'Complicated',
        title: 'Sigmoid diverticulitis with abscess',
        text: 'Rim-enhancing pericolic collections containing gas at the rectosigmoid junction indicate complicated diverticulitis.',
        alt: 'Axial contrast-enhanced CT of sigmoid diverticulitis with abscess',
      },
    },
    takehome: {
      title: 'Take home message',
      lead: 'The essentials for reporting.',
      items: [
        { title: 'Recognise the triad', text: 'Diverticula, segmental wall thickening and pericolic stranding form the typical CT pattern.' },
        { title: 'Complications matter', text: 'Actively search for and precisely describe abscess, perforation, fistula and stenosis.' },
        { title: 'Use CDD purposefully', text: 'Classification supports the report; the key distinction is uncomplicated versus complicated.' },
        { title: 'Do not miss cancer', text: 'Atypical focal or asymmetric thickening and lymphadenopathy require an oncological differential.' },
      ],
    },
  },
}

CONTENT.fa = {
  "toc": "فهرست مطالب",
  "breadcrumbAbdomen": "شکم",
  "breadcrumbCurrent": "دستگاه گوارش · دیورتیکولیت",
  "title": "دیورتیکولوز و دیورتیکولیت",
  "subtitle": "تشخیص CT، طبقه‌بندی CDD و شناسایی بیماری پیچیده",
  "sourceLabel": "Dr. Zia",
  "actionMcq": "MCQ",
  "actionFlash": "فلش‌کارت",
  "keyLabel": "نکته مهم",
  "caveLabel": "احتیاط",
  "openCase": "باز کردن کیس در Radiopaedia",
  "guideline": "باز کردن راهنمای S3",
  "sections": [
    {
      "id": "grundlagen",
      "label": "مبانی",
      "icon": "🌀"
    },
    {
      "id": "ct",
      "label": "تشخیص با CT",
      "icon": "🩻"
    },
    {
      "id": "cdd",
      "label": "طبقه‌بندی CDD",
      "icon": "📋"
    },
    {
      "id": "komplikationen",
      "label": "عوارض",
      "icon": "⚠️"
    },
    {
      "id": "befundung",
      "label": "گزارش‌نویسی",
      "icon": "📝"
    },
    {
      "id": "faelle",
      "label": "کیس‌ها",
      "icon": "🔬"
    },
    {
      "id": "takehome",
      "label": "پیام نهایی",
      "icon": "💡"
    }
  ],
  "heroCards": [
    {
      "value": "CT با تزریق",
      "label": "روش انتخابی",
      "text": "تعیین وسعت و عوارض"
    },
    {
      "value": "بیش از ۴ میلی‌متر",
      "label": "ضخیم‌شدگی دیواره",
      "text": "سگمنتال، معمولاً در سیگموئید"
    },
    {
      "value": "CDD 1–4",
      "label": "طبقه‌بندی بالینی",
      "text": "از بدون عارضه تا همراه عارضه"
    }
  ],
  "basics": {
    "title": "دیورتیکولوز همان دیورتیکولیت نیست",
    "lead": "دیورتیکول‌های کولون بیرون‌زدگی‌های اکتسابی مخاط و زیرمخاط از نقاط ضعیف لایهٔ عضلانی هستند. دیورتیکولیت التهاب یک یا چند دیورتیکول است که می‌تواند با واکنش دیوارهٔ روده و بافت اطراف همراه باشد.",
    "items": [
      {
        "title": "دیورتیکولوز",
        "text": "دیورتیکول‌ها بدون التهاب اطراف؛ اغلب یافته‌ای اتفاقی و بدون علامت هستند."
      },
      {
        "title": "محل شایع",
        "text": "در جمعیت‌های غربی، کولون سیگموئید بیشتر درگیر می‌شود."
      },
      {
        "title": "دیورتیکولیت",
        "text": "التهاب یک یا چند دیورتیکول؛ وسعت و واکنش همراه دیواره یا اطراف کولون می‌تواند متفاوت باشد."
      }
    ],
    "key": "وجود دیورتیکول به‌تنهایی دیورتیکولیت را ثابت نمی‌کند. دیورتیکول ملتهب، ضخیم‌شدگی دیواره و واکنش اطراف کولون الگوی معمول CT را می‌سازند؛ تریاد کامل و شدید در همهٔ شکل‌ها الزامی نیست."
  },
  "ct": {
    "title": "تشخیص با CT",
    "lead": "CT با تزریق تشخیص را تأیید می‌کند، شدت بیماری را می‌سنجد و عوارض را مشخص می‌کند.",
    "headers": [
      "ویژگی",
      "یافتهٔ معمول CT",
      "اهمیت"
    ],
    "rows": [
      [
        "دیورتیکول",
        "بیرون‌زدگی موضعی، اغلب با دیوارهٔ ملتهب",
        "مرکز التهاب"
      ],
      [
        "دیوارهٔ روده",
        "ضخیم‌شدگی سگمنتال، معمولاً بیش از ۴ میلی‌متر",
        "ارزیابی وسعت و تنگی"
      ],
      [
        "چربی",
        "رشته‌رشته‌شدن چربی پریکولیک / چربی کدر",
        "شدت التهاب چربی اغلب در مقایسه با ضخیم‌شدگی دیواره بیشتر است"
      ],
      [
        "تقویت پس از تزریق",
        "تقویت التهابی دیواره و اطراف دیورتیکول",
        "فعالیت التهاب و دیوارهٔ آبسه"
      ],
      [
        "گاز / مایع",
        "حباب‌های گاز خارج لومن یا تجمع مایع",
        "پرفوراسیون یا آبسه"
      ]
    ],
    "protocol": [
      {
        "title": "فاز پورتوونوس",
        "text": "معمولاً برای ارزیابی دیوارهٔ روده، چربی اطراف، آبسه‌ها و مایع آزاد کافی است."
      },
      {
        "title": "عدم نیاز معمول به مادهٔ حاجب داخل روده",
        "text": "مادهٔ حاجب خوراکی یا رکتال عموماً برای ارزیابی استاندارد لازم نیست."
      },
      {
        "title": "مادهٔ حاجب رکتال هدفمند",
        "text": "در شک مشخص به فیستول یا نشت آناستوموز ممکن است کمک‌کننده باشد."
      }
    ],
    "cave": "ضخیم‌شدگی شدید و نامتقارن دیواره در قطعه‌ای کوتاه، لنفادنوپاتی یا نبود التهاب تیپیک اطراف دیورتیکول باید شک به سرطان کولورکتال را مطرح کند."
  },
  "cdd": {
    "title": "طبقه‌بندی CDD",
    "lead": "طبقه‌بندی بیماری دیورتیکولی (CDD) یافته‌های بالینی و تصویربرداری را کنار هم قرار می‌دهد. جدول از نسخهٔ S3/DGVS 2021 با مرز ۳ سانتی‌متری آبسه استفاده می‌کند؛ این خلاصه جایگزین ارزیابی بالینی نیست.",
    "headers": [
      "نوع",
      "دسته‌بندی",
      "یافته‌های تصویربرداری"
    ],
    "rows": [
      [
        "0",
        "دیورتیکولوز بدون علامت",
        "دیورتیکول بدون التهاب"
      ],
      [
        "1a",
        "دیورتیکولیت حاد بدون عارضه",
        "ضخیم‌شدگی دیواره بدون واکنش قابل‌توجه اطراف"
      ],
      [
        "1b",
        "دیورتیکولیت حاد بدون عارضه، همراه فلگمون",
        "التهاب چربی پریکولیک، بدون آبسه"
      ],
      [
        "2a",
        "میکروآبسه / پرفوراسیون مهارشده",
        "تجمع پریکولیک تا ۳ سانتی‌متر"
      ],
      [
        "2b",
        "ماکروآبسه",
        "آبسه بزرگ‌تر از ۳ سانتی‌متر"
      ],
      [
        "2c",
        "پرفوراسیون آزاد",
        "هوای آزاد یا مایع آزاد همراه نشانه‌های پریتونیت"
      ],
      [
        "3a",
        "بیماری دیورتیکولی علامت‌دار بدون عارضه (SUDD)",
        "علائم پایدار یا عودکننده، بدون التهاب حاد در CT؛ این وضعیت به‌تنهایی دیورتیکولیت حاد را ثابت نمی‌کند"
      ],
      [
        "3b",
        "دیورتیکولیت عودکننده بدون عارضه",
        "عود دوره‌های التهاب، بدون تنگی، فیستول یا توده التهابی"
      ],
      [
        "3c",
        "دیورتیکولیت عودکننده همراه عارضه",
        "برای نمونه تنگی، فیستول یا توده التهابی"
      ],
      [
        "4",
        "خون‌ریزی دیورتیکولی",
        "ممکن است منبع فعال خون‌ریزی در CT آنژیوگرافی دیده شود"
      ]
    ],
    "key": "CDD 3a بیماری دیورتیکولی علامت‌دار بدون عارضه را توصیف می‌کند؛ 3b دیورتیکولیت عودکننده بدون عارضه و 3c نوع عودکننده همراه عارضه است. آبسه و پرفوراسیون آزاد در گروه حاد و پیچیدهٔ نوع ۲ قرار می‌گیرند."
  },
  "complications": {
    "title": "عوارض را فعالانه جست‌وجو کنید",
    "lead": "پس از شناسایی دیورتیکولیت، کل بررسی را از نظر عوارض و وسعت آن‌ها مرور کنید.",
    "items": [
      {
        "title": "آبسه",
        "text": "تجمع مایع با تقویت حاشیه‌ای پس از تزریق و اغلب حاوی گاز. اندازه و امکان دسترسی را گزارش کنید."
      },
      {
        "title": "پرفوراسیون",
        "text": "گاز پریکولیک به نفع پرفوراسیون مهارشده است؛ گاز و مایع آزاد داخل پریتوئن بر پرفوراسیون آزاد دلالت دارند."
      },
      {
        "title": "فیستول",
        "text": "مسیر ارتباطی یا چسبندگی التهابی به عضو مجاور. گاز داخل مثانه بدون سابقهٔ ابزارگذاری به نفع فیستول کولووزیکال است."
      },
      {
        "title": "تنگی / انسداد",
        "text": "تنگی، اتساع بالادست و طول قطعه را توصیف کنید؛ بدخیمی را رد کنید."
      }
    ],
    "cave": "پس از نام‌بردن دیورتیکولیت متوقف نشوید: اندازهٔ آبسه، گاز آزاد، فیستول، تنگی و عوارض دوردست بر درمان اثر می‌گذارند."
  },
  "reporting": {
    "title": "گزارش ساختارمند CT",
    "lead": "گزارش کوتاه و کامل به پرسش‌های بالینی مهم پاسخ می‌دهد.",
    "items": [
      {
        "title": "۱. محل",
        "text": "قطعهٔ درگیر کولون و طول تغییرات التهابی."
      },
      {
        "title": "۲. یافته‌های اصلی",
        "text": "دیورتیکول ملتهب، حداکثر ضخامت دیواره و وسعت رشته‌رشته‌شدن چربی."
      },
      {
        "title": "۳. عوارض",
        "text": "اندازهٔ آبسه در سه بُعد، گاز خارج لومن، مایع آزاد، فیستول یا انسداد."
      },
      {
        "title": "۴. طبقه‌بندی",
        "text": "بدون عارضه یا همراه عارضه بودن را ذکر کنید و در صورت اطمینان، نوع CDD را بنویسید."
      },
      {
        "title": "۵. افتراق",
        "text": "در الگوهای غیرتیپیک، سرطان، کولیت یا آپاندیژیت اپی‌پلوئیک را مطرح کنید."
      }
    ],
    "key": "نمونه: دیورتیکولیت حاد سیگموئید با التهاب شدید پریکولیک، بدون آبسه یا پرفوراسیون آزاد؛ منطبق با CDD نوع 1b."
  },
  "cases": {
    "title": "دو کیس از Radiopaedia",
    "lead": "تصاویر، تفاوت کلیدی التهاب موضعی بدون تجمع قابل درناژ را با بیماری همراه عارضه و آبسه نشان می‌دهند.",
    "uncomplicated": {
      "label": "بدون عارضه",
      "title": "دیورتیکولیت حاد سیگموئید بدون عارضه",
      "text": "ضخیم‌شدگی سگمنتال دیوارهٔ سیگموئید، دیورتیکول‌ها و رشته‌رشته‌شدن شدید چربی پریکولیک، بدون پرفوراسیون آزاد یا تجمع قابل درناژ.",
      "alt": "CT محوری دیورتیکولیت سیگموئید بدون عارضه"
    },
    "abscess": {
      "label": "همراه عارضه",
      "title": "دیورتیکولیت سیگموئید همراه آبسه",
      "text": "تجمع‌های پریکولیک حاوی گاز با تقویت حاشیه‌ای پس از تزریق در محل اتصال رکتوسیگموئید، نشان‌دهندهٔ دیورتیکولیت همراه عارضه هستند.",
      "alt": "CT محوری با تزریق از دیورتیکولیت سیگموئید همراه آبسه"
    }
  },
  "takehome": {
    "title": "پیام نهایی",
    "lead": "نکات ضروری برای گزارش.",
    "items": [
      {
        "title": "سه‌گانه را بشناسید",
        "text": "دیورتیکول‌ها، ضخیم‌شدگی سگمنتال دیواره و رشته‌رشته‌شدن چربی پریکولیک الگوی تیپیک CT را تشکیل می‌دهند."
      },
      {
        "title": "عوارض اهمیت دارند",
        "text": "آبسه، پرفوراسیون، فیستول و تنگی را فعالانه جست‌وجو و دقیق توصیف کنید."
      },
      {
        "title": "CDD را هدفمند به‌کار ببرید",
        "text": "طبقه‌بندی از گزارش پشتیبانی می‌کند؛ تفاوت کلیدی، بیماری بدون عارضه در برابر بیماری همراه عارضه است."
      },
      {
        "title": "سرطان را از دست ندهید",
        "text": "ضخیم‌شدگی موضعی یا نامتقارن غیرتیپیک و لنفادنوپاتی، افتراق با بدخیمی را لازم می‌کنند."
      }
    ]
  }
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
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead><tr>{headers.map(header => <th key={header}>{header}</th>)}</tr></thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Callout({ type = 'note', label, children }) {
  return (
    <div className={`${styles.callout} ${type === 'cave' ? styles.cave : ''}`.trim()}>
      <strong>{label}</strong>
      <p>{children}</p>
    </div>
  )
}

function Section({ id, title, lead, children }) {
  const isMobile = useMobileLearningLayout()
  const [open, setOpen] = useState(true)
  useEffect(() => setOpen(false), [id])
  return (
    <section id={id} className={styles.section}>
      <button className={styles.sectionHeader} type="button" onClick={() => setOpen(value => !value)} aria-expanded={open}>
        <h2>{title}</h2>
        <span>{open ? '−' : '+'}</span>
      </button>
      <div className={styles.sectionBody}>{lead && <p className={styles.lead}>{lead}</p>}{children}</div>
    </section>
  )
}

function Cards({ items }) {
  return (
    <div className={styles.cardsGrid}>
      {items.map(item => (
        <div className={styles.infoCard} key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  )
}

function CaseCard({ item, copy }) {
  const caseCopy = copy.cases[item.id]
  return (
    <article className={styles.caseCardLink}>
      <figure className={styles.caseImage}>
        <Image src={item.image} alt={caseCopy.alt} width={612} height={612} className={styles.caseImageAsset} />
      </figure>
      <div className={styles.caseBody}>
        <div className={styles.caseLabelRow}>
          <span className={styles.caseLabel}>{caseCopy.label}</span>
          <span className={styles.caseLabel}>CT</span>
        </div>
        <h3>{caseCopy.title}</h3>
        <p>{caseCopy.text}</p>
        <small>{item.credit}</small>
        <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.caseExternalLink}>{copy.openCase} ↗</a>
      </div>
    </article>
  )
}

export default function DivertikulitisPage() {
  const { lang } = useLanguage()
  const copy = CONTENT[lang] || CONTENT.de
  const isRTL = lang === 'fa'
  const [activeId, setActiveId] = useState(copy.sections[0].id)
  const { isRead, toggleRead, authError } = useLessonReadStatus('divertikulitis')
  const withLang = href => lang === 'de' ? href : (href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`)
  const sectionIds = useMemo(() => copy.sections.map(section => section.id), [copy.sections])

  useEffect(() => {
    const observers = sectionIds.map(id => {
      const element = document.getElementById(id)
      if (!element) return null
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActiveId(id)
      }, { rootMargin: '-18% 0px -72% 0px', threshold: 0.01 })
      observer.observe(element)
      return observer
    })
    return () => observers.forEach(observer => observer?.disconnect())
  }, [sectionIds])

  return (
    <LegacyLessonMigration className={styles.page} dir={isRTL ? 'rtl' : 'ltr'} lang={lang} lessonRoute="/abdomen/gi/divertikulitis" lessonId="/abdomen/gi/divertikulitis">
      <InProgressBanner lang={lang} />
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href={withLang('/')}>RadYar</Link><span>›</span>
          <Link href={withLang('/lernen/abdomen')}>{copy.breadcrumbAbdomen}</Link><span>›</span>
          <span>{copy.breadcrumbCurrent}</span>
        </div>
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.sourceBadge}>{copy.sourceLabel}</span>
            <h1>{copy.title}</h1>
            <p>{copy.subtitle}</p>
            <div className={styles.actions}>
              <Link href={withLang(`/ueben/quiz?fach=abdomen&n=10&themen=divertikulitis&from=${encodeURIComponent(withLang('/abdomen/gi/divertikulitis'))}`)} className={styles.actionBtn}>{copy.actionMcq}</Link>
              <Link href={withLang(`/flashcards/divertikulitis?from=${encodeURIComponent(withLang('/abdomen/gi/divertikulitis'))}`)} className={styles.actionBtn}>{copy.actionFlash}</Link>
              <a href={GUIDELINE_URL} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>{copy.guideline} ↗</a>
            </div>
          </div>
          <div className={styles.heroStats}>
            {copy.heroCards.map(card => (
              <div className={styles.heroStat} key={card.label}>
                <strong>{card.value}</strong><span>{card.label}</span><small>{card.text}</small>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className={styles.readBar}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError}  migrationReadControl/></div>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sideTitle}>{copy.toc}</div>
          {copy.sections.map(section => (
            <button
              type="button"
              key={section.id}
              data-section-id={section.id}
              className={`${styles.sideItem} ${activeId === section.id ? styles.sideItemActive : ''}`}
              onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              <span>{section.icon}</span><strong>{section.label}</strong>
            </button>
          ))}
        </aside>

        <div className={styles.main}>
          <Section id="grundlagen" title={copy.basics.title} lead={copy.basics.lead} migrationChapter>
            <Cards items={copy.basics.items} />
            <Callout label={copy.keyLabel}>{copy.basics.key}</Callout>
          </Section>

          <Section id="ct" title={copy.ct.title} lead={copy.ct.lead} migrationChapter>
            <Table headers={copy.ct.headers} rows={copy.ct.rows} />
            <Cards items={copy.ct.protocol} />
            <Callout type="cave" label={copy.caveLabel}>{copy.ct.cave}</Callout>
          </Section>

          <Section id="cdd" title={copy.cdd.title} lead={copy.cdd.lead} migrationChapter>
            <Table headers={copy.cdd.headers} rows={copy.cdd.rows} />
            <Callout label={copy.keyLabel}>{copy.cdd.key}</Callout>
          </Section>

          <Section id="komplikationen" title={copy.complications.title} lead={copy.complications.lead} migrationChapter>
            <Cards items={copy.complications.items} />
            <Callout type="cave" label={copy.caveLabel}>{copy.complications.cave}</Callout>
          </Section>

          <Section id="befundung" title={copy.reporting.title} lead={copy.reporting.lead} migrationChapter>
            <Cards items={copy.reporting.items} />
            <Callout label={copy.keyLabel}>{copy.reporting.key}</Callout>
          </Section>

          <Section id="faelle" title={copy.cases.title} lead={copy.cases.lead} migrationChapter>
            <div className={styles.caseGrid}>
              {LEARNING_CASES.map(item => <CaseCard item={item} copy={copy} key={item.id} />)}
            </div>
          </Section>

          <Section id="takehome" title={copy.takehome.title} lead={copy.takehome.lead} migrationChapter>
            <div className={styles.takeHomeGrid}>
              {copy.takehome.items.map((item, index) => (
                <div className={styles.takeHomeItem} key={item.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div><h3>{item.title}</h3><p>{item.text}</p></div>
                </div>
              ))}
            </div>
          </Section>

          <div className={styles.readBarBottom}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError}  migrationReadControl/></div>
        </div>
      </div>
    </LegacyLessonMigration>
  )
}
