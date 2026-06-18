'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import styles from './page.module.css'

const CASES = [
  {
    id: 'cspcv',
    url: 'https://radiopaedia.org/cases/cavum-septum-pellucidum-cavum-vergae-and-cavum-veli-interpositi-annotated-ct?lang=us',
    images: [
      '/mittellinienzysten/case-csp-cv-01-t1.jpg',
      '/mittellinienzysten/case-csp-cv-02-t2.jpg',
    ],
    credit: 'Illustrative MRI: Hellerhoff, Wikimedia Commons, CC BY-SA 3.0',
  },
  {
    id: 'cvi',
    url: 'https://radiopaedia.org/cases/cavum-veli-interpositi-cyst?lang=us',
    images: Array.from({ length: 6 }, (_, index) => `/mittellinienzysten/case-cvi-${String(index + 1).padStart(2, '0')}.jpg`),
    credit: 'Illustrative MRI: Hellerhoff, Wikimedia Commons, CC BY-SA 4.0',
  },
]

const CONTENT = {
  de: {
    toc: 'Inhaltsverzeichnis',
    breadcrumbHead: 'Kopf',
    breadcrumbCurrent: 'Anatomie · Mittellinienzysten',
    title: 'Normvarianten der Mittellinienzysten',
    subtitle: 'Cavum septi pellucidi, Cavum vergae und Cavum veli interpositi sicher unterscheiden',
    sourceLabel: 'Neuroradiologie',
    actionMcq: '🎯 MCQs',
    actionFlash: '🧠 Flashcards',
    keyLabel: 'Merke',
    caveLabel: 'CAVE',
    openCase: 'Radiopaedia-Fall öffnen',
    enlarge: 'Großansicht öffnen',
    close: 'Großansicht schließen',
    illustrative: 'Illustrative Bildserie – der verlinkte Radiopaedia-Fall kann andere Aufnahmen zeigen.',
    sections: [
      { id: 'orientierung', label: 'Orientierung', icon: '🧭' },
      { id: 'csp', label: 'Cavum septi pellucidi', icon: '1' },
      { id: 'cv', label: 'Cavum vergae', icon: '2' },
      { id: 'cvi', label: 'Cavum veli interpositi', icon: '3' },
      { id: 'differenzialdiagnose', label: 'Differenzialdiagnose', icon: '🔎' },
      { id: 'faelle', label: 'Lernfälle', icon: '🩻' },
      { id: 'takehome', label: 'Take home message', icon: '💡' },
    ],
    heroCards: [
      { value: 'vor Monro', label: 'CSP', text: 'zwischen den Vorderhörnern' },
      { value: 'hinter Monro', label: 'Cavum vergae', text: 'posteriore Fortsetzung des CSP' },
      { value: 'unter Fornix', label: 'CVI', text: 'über dem 3. Ventrikel' },
    ],
    orientation: {
      title: 'Zuerst die Landmarken, dann der Name',
      lead: 'Alle drei Räume sind liquoräquivalente Mittellinienstrukturen. Die sichere Zuordnung gelingt über ihre Beziehung zu Fornix, Foramen Monroi, Corpus callosum und 3. Ventrikel.',
      cards: [
        { title: 'Septale Cava', text: 'CSP und Cavum vergae liegen zwischen den beiden Blättern des Septum pellucidum.' },
        { title: 'CVI', text: 'Das Cavum veli interpositi liegt in der Tela choroidea zwischen den Blättern des Velum interpositum.' },
        { title: 'Kein echter Ventrikel', text: 'Die historischen Begriffe „5.“ oder „6. Ventrikel“ sind irreführend und sollten im Befund vermieden werden.' },
      ],
      figureTitle: 'Räumlicher Vergleich',
      figureText: 'Sagittal entscheidet vor allem die Lage vor oder hinter der Monro-Ebene; axial ist das CVI typischerweise dreieckig.',
      figureAlt: 'Schematischer Vergleich von CSP, Cavum vergae und Cavum veli interpositi',
      key: 'Prüfungsregel: CSP vor Monro, Cavum vergae hinter Monro, CVI unter dem Fornix.',
    },
    csp: {
      title: 'Cavum septi pellucidi (CSP)',
      lead: 'Ein liquorhaltiger Spalt zwischen den Blättern des Septum pellucidum, vor der Ebene des Foramen Monroi und zwischen den Vorderhörnern der Seitenventrikel.',
      headers: ['Merkmal', 'Typischer Befund', 'Bedeutung'],
      rows: [
        ['Lage', 'Zwischen den Vorderhörnern, unter dem Corpus callosum, oberhalb des Fornix', 'septale Mittellinienstruktur'],
        ['Signal/Dichte', 'Liquoräquivalent in CT und allen MRT-Sequenzen', 'kein solider Anteil, kein Enhancement'],
        ['Konfiguration', 'schmaler, glattrandiger Spalt', 'meist Normvariante'],
        ['Klinik', 'gewöhnlich asymptomatischer Zufallsbefund', 'keine Verlaufskontrolle bei typischem Befund'],
      ],
      cave: 'Eine deutliche Auftreibung mit nach lateral gebogenen Septumblättern, Foramen-Monroi-Kompression oder Hydrozephalus spricht nicht mehr für eine belanglose schmale Normvariante.',
    },
    cv: {
      title: 'Cavum vergae (CV)',
      lead: 'Das Cavum vergae ist die posteriore Fortsetzung des CSP hinter die Ebene des Foramen Monroi, unter dem Corpus callosum und oberhalb der Fornices.',
      cards: [
        { title: 'Kontinuität', text: 'Es setzt das CSP nach dorsal fort; die Trennung erfolgt topografisch an der Monro-Ebene.' },
        { title: 'Fast nie isoliert', text: 'Ein Cavum vergae tritt typischerweise gemeinsam mit einem CSP als Cavum septi pellucidi et vergae auf.' },
        { title: 'Befundformulierung', text: 'Bei typischer Konfiguration genügt: „Persistierendes Cavum septi pellucidi et vergae als Normvariante.“' },
      ],
      key: 'Ein isoliertes Cavum vergae ist ungewöhnlich. Fehlt das anteriore CSP scheinbar, Ebenenführung und Differenzialdiagnosen kritisch prüfen.',
    },
    cvi: {
      title: 'Cavum veli interpositi (CVI)',
      lead: 'Das CVI liegt unterhalb der Fornices, oberhalb des 3. Ventrikels in der Tela choroidea. Es gehört nicht zum Septum pellucidum.',
      headers: ['Ebene', 'Typisches Erscheinungsbild', 'Wichtige Landmarke'],
      rows: [
        ['Axial', 'dreieckige liquoräquivalente Struktur mit Spitze nach anterior', 'zwischen den Thalami, unterhalb der Fornices'],
        ['Sagittal', 'schmal bis ovoid unter dem Splenium und Fornix', 'oberhalb des 3. Ventrikels'],
        ['Koronar', 'mittig über dem Dach des 3. Ventrikels', 'innere Hirnvenen helfen bei der Zuordnung'],
      ],
      key: 'Das Dreieck in axialer Schichtung ist der schnellste Hinweis auf ein CVI.',
      cave: 'Eine große, expansile Struktur mit Masseneffekt, Ventrikelkompression oder Hydrozephalus als CVI-Zyste beschreiben und nicht pauschal als harmlose Normvariante abtun.',
    },
    differential: {
      title: 'Differenzialdiagnosen und Befundstrategie',
      lead: 'Nicht jede liquorähnliche Mittellinienstruktur ist ein Cavum. Lage, Form, Kommunikation, Masseneffekt und Begleitfehlbildungen führen zur Diagnose.',
      headers: ['Differenzialdiagnose', 'Abgrenzendes Merkmal', 'Praktischer Hinweis'],
      rows: [
        ['Kolloidzyste', 'am Foramen Monroi, häufig nicht liquoräquivalent', 'kann obstruktiven Hydrozephalus verursachen'],
        ['Arachnoidalzyste', 'extraaxial beziehungsweise cisternal, verdrängend', 'Gefäße und Hirnstrukturen werden verlagert'],
        ['Pinealiszyste', 'dorsal des 3. Ventrikels in der Pinealisregion', 'nicht zwischen den Septumblättern'],
        ['Fehlendes Septum pellucidum', 'keine begrenzenden Septumblätter', 'mit Balkenfehlbildung oder septooptischer Dysplasie assoziiert'],
        ['Ependymale/neuroepitheliale Zyste', 'oft asymmetrisch oder lateralisiert', 'bei atypischer Wand oder Signalabweichung erwägen'],
      ],
      report: [
        { title: '1. Benennen', text: 'CSP, CSP et vergae oder CVI anhand der Landmarken zuordnen.' },
        { title: '2. Charakterisieren', text: 'Größe, liquoräquivalentes Signal, glatte Wand und fehlendes Enhancement beschreiben.' },
        { title: '3. Relevanz prüfen', text: 'Masseneffekt, Foramen-Monroi-Kompression, Hydrozephalus und Begleitfehlbildungen ausschließen.' },
      ],
    },
    cases: {
      title: 'Genau zwei Radiopaedia-Lernfälle',
      lead: 'Die Bildleisten lassen sich horizontal durchscrollen und jedes Bild öffnet sich in einer Großansicht. Gezeigt wird nur der Befundkontext, ohne Fallprüfungsmodus.',
      cspcv: {
        label: 'Fall 1 · Normvariante',
        title: 'CSP und Cavum vergae',
        text: 'Liquoräquivalenter Raum zwischen den Septumblättern, der sich von anterior zwischen den Vorderhörnern über die Monro-Ebene nach posterior fortsetzt. Kein Masseneffekt, kein Hydrozephalus.',
        alt: 'MRT mit Cavum septi pellucidi und Cavum vergae',
      },
      cvi: {
        label: 'Fall 2 · Klinisch relevante Größe',
        title: 'Cavum-veli-interpositi-Zyste',
        text: 'Große liquoräquivalente Mittellinienzyste unter dem Fornix und über dem 3. Ventrikel. Entscheidend sind Verdrängung, Ventrikelkompression und ein möglicher obstruktiver Hydrozephalus.',
        alt: 'MRT einer Cavum-veli-interpositi-Zyste',
      },
    },
    takehome: {
      title: 'Take home message',
      lead: 'Drei Räume, drei Landmarken.',
      items: [
        { title: 'CSP', text: 'vor Monro – zwischen den Vorderhörnern.' },
        { title: 'Cavum vergae', text: 'hinter Monro – fast immer mit CSP.' },
        { title: 'CVI', text: 'unter dem Fornix – axial oft dreieckig.' },
        { title: 'Relevant wird es bei', text: 'Masseneffekt, Hydrozephalus oder atypischer Wand beziehungsweise Signalgebung.' },
      ],
    },
  },
  en: {
    toc: 'Contents',
    breadcrumbHead: 'Head',
    breadcrumbCurrent: 'Anatomy · Midline cava',
    title: 'Normal variants of the midline cava',
    subtitle: 'Confidently distinguish the cavum septi pellucidi, cavum vergae and cavum veli interpositi',
    sourceLabel: 'Neuroradiology',
    actionMcq: '🎯 MCQs',
    actionFlash: '🧠 Flashcards',
    keyLabel: 'Key point',
    caveLabel: 'Caution',
    openCase: 'Open Radiopaedia case',
    enlarge: 'Open large view',
    close: 'Close large view',
    illustrative: 'Illustrative image series – the linked Radiopaedia case may show different images.',
    sections: [
      { id: 'orientierung', label: 'Orientation', icon: '🧭' },
      { id: 'csp', label: 'Cavum septi pellucidi', icon: '1' },
      { id: 'cv', label: 'Cavum vergae', icon: '2' },
      { id: 'cvi', label: 'Cavum veli interpositi', icon: '3' },
      { id: 'differenzialdiagnose', label: 'Differential diagnosis', icon: '🔎' },
      { id: 'faelle', label: 'Cases', icon: '🩻' },
      { id: 'takehome', label: 'Take home message', icon: '💡' },
    ],
    heroCards: [
      { value: 'anterior to Monro', label: 'CSP', text: 'between the frontal horns' },
      { value: 'posterior to Monro', label: 'Cavum vergae', text: 'posterior continuation of the CSP' },
      { value: 'below fornix', label: 'CVI', text: 'above the third ventricle' },
    ],
    orientation: {
      title: 'Find the landmarks before naming the space',
      lead: 'All three are CSF-equivalent midline spaces. Their relationship to the fornix, foramen of Monro, corpus callosum and third ventricle provides the diagnosis.',
      cards: [
        { title: 'Septal cava', text: 'The CSP and cavum vergae lie between the two leaflets of the septum pellucidum.' },
        { title: 'CVI', text: 'The cavum veli interpositi lies within the tela choroidea between the layers of the velum interpositum.' },
        { title: 'Not a true ventricle', text: 'The historical terms “fifth” and “sixth ventricle” are misleading and should be avoided.' },
      ],
      figureTitle: 'Spatial comparison',
      figureText: 'Sagittal imaging establishes the position relative to Monro; axially, the CVI is typically triangular.',
      figureAlt: 'Diagram comparing CSP, cavum vergae and cavum veli interpositi',
      key: 'Exam rule: CSP anterior to Monro, cavum vergae posterior to Monro, CVI below the fornix.',
    },
    csp: {
      title: 'Cavum septi pellucidi (CSP)',
      lead: 'A CSF-filled cleft between the septal leaflets, anterior to the foramen of Monro and between the frontal horns of the lateral ventricles.',
      headers: ['Feature', 'Typical finding', 'Meaning'],
      rows: [
        ['Location', 'Between frontal horns, below corpus callosum and above fornix', 'septal midline space'],
        ['Signal/attenuation', 'Matches CSF on CT and all MRI sequences', 'no solid tissue or enhancement'],
        ['Shape', 'thin, smooth cleft', 'usually a normal variant'],
        ['Clinical relevance', 'usually an incidental finding', 'no follow-up when typical'],
      ],
      cave: 'Marked expansion with bowed septal leaflets, compression of the foramina of Monro or hydrocephalus is no longer a trivial narrow variant.',
    },
    cv: {
      title: 'Cavum vergae (CV)',
      lead: 'The cavum vergae is the posterior continuation of the CSP beyond the plane of the foramina of Monro, below the corpus callosum and above the fornices.',
      cards: [
        { title: 'Continuity', text: 'It continues the CSP posteriorly; the Monro plane provides the topographic distinction.' },
        { title: 'Rarely isolated', text: 'It usually occurs with a CSP as a cavum septi pellucidi et vergae.' },
        { title: 'Reporting', text: 'For a typical appearance: “Persistent cavum septi pellucidi et vergae, a normal variant.”' },
      ],
      key: 'An isolated cavum vergae is unusual. If no anterior CSP is visible, review the planes and differentials carefully.',
    },
    cvi: {
      title: 'Cavum veli interpositi (CVI)',
      lead: 'The CVI lies below the fornices and above the third ventricle within the tela choroidea. It is not part of the septum pellucidum.',
      headers: ['Plane', 'Typical appearance', 'Key landmark'],
      rows: [
        ['Axial', 'triangular CSF space with its apex anteriorly', 'between the thalami and below the fornices'],
        ['Sagittal', 'slit-like to ovoid space below the splenium and fornix', 'above the third ventricle'],
        ['Coronal', 'midline space above the roof of the third ventricle', 'internal cerebral veins support localisation'],
      ],
      key: 'A triangular configuration on axial imaging is the fastest clue to a CVI.',
      cave: 'Describe a large expansile lesion with mass effect, ventricular compression or hydrocephalus as a CVI cyst rather than dismissing it as an incidental variant.',
    },
    differential: {
      title: 'Differential diagnosis and reporting',
      lead: 'Not every CSF-like midline space is a cavum. Location, shape, communication, mass effect and associated malformations lead to the diagnosis.',
      headers: ['Differential', 'Distinguishing feature', 'Practical point'],
      rows: [
        ['Colloid cyst', 'at the foramen of Monro, often not CSF-equivalent', 'may cause obstructive hydrocephalus'],
        ['Arachnoid cyst', 'extra-axial or cisternal and displacing', 'vessels and brain structures are displaced'],
        ['Pineal cyst', 'posterior to the third ventricle in the pineal region', 'not between the septal leaflets'],
        ['Absent septum pellucidum', 'no bounding septal leaflets', 'associated with callosal anomalies or septo-optic dysplasia'],
        ['Ependymal/neuroepithelial cyst', 'often asymmetric or lateralised', 'consider when the wall or signal is atypical'],
      ],
      report: [
        { title: '1. Name it', text: 'Assign CSP, CSP et vergae or CVI from the landmarks.' },
        { title: '2. Characterise it', text: 'Describe size, CSF signal, smooth wall and absent enhancement.' },
        { title: '3. Assess relevance', text: 'Exclude mass effect, Monro obstruction, hydrocephalus and associated malformations.' },
      ],
    },
    cases: {
      title: 'Exactly two Radiopaedia learning cases',
      lead: 'Scroll horizontally through each image strip and open any image in a large view. Only the imaging findings are presented—there is no case-exam mode.',
      cspcv: {
        label: 'Case 1 · Normal variant',
        title: 'CSP and cavum vergae',
        text: 'A CSF-equivalent space between the septal leaflets extends from the frontal horns across the Monro plane posteriorly. No mass effect or hydrocephalus.',
        alt: 'MRI showing cavum septi pellucidi and cavum vergae',
      },
      cvi: {
        label: 'Case 2 · Clinically relevant size',
        title: 'Cavum veli interpositi cyst',
        text: 'A large CSF-equivalent midline cyst below the fornix and above the third ventricle. Assess displacement, ventricular compression and obstructive hydrocephalus.',
        alt: 'MRI of a cavum veli interpositi cyst',
      },
    },
    takehome: {
      title: 'Take home message',
      lead: 'Three spaces, three landmarks.',
      items: [
        { title: 'CSP', text: 'anterior to Monro – between the frontal horns.' },
        { title: 'Cavum vergae', text: 'posterior to Monro – almost always with a CSP.' },
        { title: 'CVI', text: 'below the fornix – often triangular axially.' },
        { title: 'It matters when there is', text: 'mass effect, hydrocephalus or atypical wall/signal.' },
      ],
    },
  },
}

CONTENT.fa = {
  ...CONTENT.en,
  toc: 'فهرست مطالب',
  breadcrumbHead: 'سر',
  breadcrumbCurrent: 'آناتومی · فضاهای کیست‌مانند خط وسط',
  title: 'واریانت‌های طبیعی فضاهای خط وسط مغز',
  subtitle: 'افتراق دقیق کاووم سپتی پلوسیدی، کاووم ورگه و کاووم ولی اینترپوزیتی',
  sourceLabel: 'نورورادیولوژی',
  actionMcq: '🎯 پرسش‌های چهارگزینه‌ای',
  actionFlash: '🧠 فلش‌کارت‌ها',
  keyLabel: 'نکته مهم',
  caveLabel: 'احتیاط',
  openCase: 'باز کردن کیس در Radiopaedia',
  enlarge: 'نمایش بزرگ',
  close: 'بستن نمای بزرگ',
  illustrative: 'این تصاویر آموزشی‌اند و ممکن است با تصاویر کیس لینک‌شده در Radiopaedia یکسان نباشند.',
  sections: [
    { id: 'orientierung', label: 'جهت‌یابی', icon: '🧭' },
    { id: 'csp', label: 'کاووم سپتی پلوسیدی', icon: '۱' },
    { id: 'cv', label: 'کاووم ورگه', icon: '۲' },
    { id: 'cvi', label: 'کاووم ولی اینترپوزیتی', icon: '۳' },
    { id: 'differenzialdiagnose', label: 'تشخیص افتراقی', icon: '🔎' },
    { id: 'faelle', label: 'کیس‌های آموزشی', icon: '🩻' },
    { id: 'takehome', label: 'پیام نهایی', icon: '💡' },
  ],
  heroCards: [
    { value: 'جلوی مونرو', label: 'CSP', text: 'بین شاخ‌های فرونتال بطن‌های جانبی' },
    { value: 'پشت مونرو', label: 'کاووم ورگه', text: 'ادامه خلفی CSP' },
    { value: 'زیر فورنیکس', label: 'CVI', text: 'بالای بطن سوم' },
  ],
  orientation: {
    title: 'اول لندمارک‌ها را پیدا کنید، بعد نام‌گذاری کنید',
    lead: 'هر سه ساختار در خط وسط قرار دارند و سیگنال آن‌ها مشابه CSF است. ارتباط آن‌ها با فورنیکس، سوراخ مونرو، جسم پینه‌ای و بطن سوم تشخیص را مشخص می‌کند.',
    cards: [
      { title: 'فضاهای سپتال', text: 'CSP و کاووم ورگه بین دو لایه سپتوم پلوسیدوم قرار دارند.' },
      { title: 'CVI', text: 'کاووم ولی اینترپوزیتی در تلا کوروئیدئا و بین لایه‌های ولوم اینترپوزیتوم قرار می‌گیرد.' },
      { title: 'بطن واقعی نیستند', text: 'اصطلاح‌های قدیمی «بطن پنجم» و «بطن ششم» گمراه‌کننده‌اند و بهتر است در گزارش استفاده نشوند.' },
    ],
    figureTitle: 'مقایسه مکانی',
    figureText: 'در نمای ساژیتال، محل نسبت به سوراخ مونرو مهم است؛ در نمای اکسیال، CVI معمولاً شکل مثلثی دارد.',
    figureAlt: 'طرح مقایسه‌ای CSP، کاووم ورگه و کاووم ولی اینترپوزیتی',
    key: 'قاعده امتحانی: CSP جلوی مونرو، کاووم ورگه پشت مونرو و CVI زیر فورنیکس است.',
  },
  csp: {
    title: 'کاووم سپتی پلوسیدی (CSP)',
    lead: 'شکاف حاوی مایع بین دو لایه سپتوم پلوسیدوم که جلوی سوراخ مونرو و بین شاخ‌های فرونتال بطن‌های جانبی قرار دارد.',
    headers: ['ویژگی', 'یافته تیپیک', 'اهمیت'],
    rows: [
      ['محل', 'بین شاخ‌های فرونتال، زیر جسم پینه‌ای و بالای فورنیکس', 'فضای سپتال خط وسط'],
      ['سیگنال/دانسیته', 'در CT و تمام سکانس‌های MRI مشابه CSF', 'بدون جزء جامد یا enhancement'],
      ['شکل', 'شکاف باریک با حاشیه صاف', 'معمولاً واریانت طبیعی'],
      ['اهمیت بالینی', 'اغلب یافته اتفاقی و بدون علامت', 'در ظاهر تیپیک نیاز به پیگیری ندارد'],
    ],
    cave: 'اتساع واضح همراه با قوس‌دار شدن لایه‌های سپتوم، فشار بر سوراخ مونرو یا هیدروسفالی دیگر یک واریانت باریک و بی‌اهمیت محسوب نمی‌شود.',
  },
  cv: {
    title: 'کاووم ورگه (CV)',
    lead: 'کاووم ورگه ادامه خلفی CSP در پشت سطح سوراخ مونرو است و زیر جسم پینه‌ای و بالای فورنیکس‌ها قرار می‌گیرد.',
    cards: [
      { title: 'پیوستگی', text: 'این فضا ادامه خلفی CSP است و سطح سوراخ مونرو مرز توپوگرافیک آن‌ها محسوب می‌شود.' },
      { title: 'به‌ندرت منفرد', text: 'معمولاً همراه CSP دیده می‌شود و به آن کاووم سپتی پلوسیدی ات ورگه گفته می‌شود.' },
      { title: 'گزارش', text: 'در ظاهر تیپیک می‌توان نوشت: «Cavum septi pellucidi et vergae پایدار، به‌عنوان واریانت طبیعی.»' },
    ],
    key: 'کاووم ورگه منفرد غیرمعمول است. اگر CSP قدامی دیده نمی‌شود، تصاویر چندصفحه‌ای و تشخیص‌های افتراقی را دوباره بررسی کنید.',
  },
  cvi: {
    title: 'کاووم ولی اینترپوزیتی (CVI)',
    lead: 'CVI زیر فورنیکس‌ها و بالای بطن سوم، درون تلا کوروئیدئا قرار دارد و بخشی از سپتوم پلوسیدوم نیست.',
    headers: ['نما', 'ظاهر تیپیک', 'لندمارک مهم'],
    rows: [
      ['اکسیال', 'فضای مثلثی مشابه CSF با رأس رو به قدام', 'بین تالاموس‌ها و زیر فورنیکس‌ها'],
      ['ساژیتال', 'فضای باریک تا بیضوی زیر اسپلنیوم و فورنیکس', 'بالای بطن سوم'],
      ['کرونال', 'فضای خط وسط بالای سقف بطن سوم', 'وریدهای عمقی مغز به تعیین محل کمک می‌کنند'],
    ],
    key: 'شکل مثلثی در نمای اکسیال سریع‌ترین سرنخ برای تشخیص CVI است.',
    cave: 'اگر ضایعه بزرگ و اکسپانسیل باشد و اثر فشاری، فشار بر بطن‌ها یا هیدروسفالی ایجاد کند، آن را کیست CVI گزارش کنید و صرفاً واریانت طبیعی ننامید.',
  },
  differential: {
    title: 'تشخیص افتراقی و روش گزارش',
    lead: 'هر فضای خط وسط با سیگنال مشابه CSF یک کاووم نیست. محل، شکل، ارتباط، اثر فشاری و ناهنجاری‌های همراه راهنمای تشخیص‌اند.',
    headers: ['تشخیص افتراقی', 'ویژگی افتراقی', 'نکته عملی'],
    rows: [
      ['کیست کلوئید', 'در سوراخ مونرو و اغلب با سیگنال متفاوت از CSF', 'می‌تواند هیدروسفالی انسدادی ایجاد کند'],
      ['کیست آراکنوئید', 'اکسترااکسیال یا سیسترنال و همراه جابه‌جایی', 'عروق و ساختارهای مغزی را جابه‌جا می‌کند'],
      ['کیست پینه‌آل', 'پشت بطن سوم در ناحیه پینه‌آل', 'بین لایه‌های سپتوم قرار ندارد'],
      ['نبود سپتوم پلوسیدوم', 'لایه‌های محدودکننده سپتوم دیده نمی‌شوند', 'ممکن است با ناهنجاری جسم پینه‌ای یا دیسپلازی سپتو‌اپتیک همراه باشد'],
      ['کیست اپاندیمال/نورواپیتلیال', 'اغلب نامتقارن یا متمایل به یک سمت', 'در دیواره یا سیگنال آتیپیک مطرح می‌شود'],
    ],
    report: [
      { title: '۱. نام‌گذاری', text: 'بر اساس لندمارک‌ها CSP، CSP et vergae یا CVI را مشخص کنید.' },
      { title: '۲. توصیف', text: 'اندازه، سیگنال مشابه CSF، دیواره صاف و نبود enhancement را ذکر کنید.' },
      { title: '۳. اهمیت بالینی', text: 'اثر فشاری، انسداد سوراخ مونرو، هیدروسفالی و ناهنجاری همراه را بررسی کنید.' },
    ],
  },
  cases: {
    title: 'دقیقاً دو کیس آموزشی از Radiopaedia',
    lead: 'نوار تصاویر را می‌توان افقی مرور کرد و هر تصویر با لمس یا کلیک در نمای بزرگ باز می‌شود. فقط یافته‌های تصویربرداری نمایش داده می‌شوند و حالت آزمون کیس وجود ندارد.',
    cspcv: {
      label: 'کیس ۱ · واریانت طبیعی',
      title: 'CSP همراه کاووم ورگه',
      text: 'فضای مشابه CSF بین لایه‌های سپتوم از بین شاخ‌های فرونتال شروع می‌شود و از سطح مونرو به سمت خلف ادامه می‌یابد. اثر فشاری یا هیدروسفالی وجود ندارد.',
      alt: 'MRI کاووم سپتی پلوسیدی و کاووم ورگه',
    },
    cvi: {
      label: 'کیس ۲ · اندازه دارای اهمیت بالینی',
      title: 'کیست کاووم ولی اینترپوزیتی',
      text: 'کیست بزرگ خط وسط با سیگنال مشابه CSF، زیر فورنیکس و بالای بطن سوم. جابه‌جایی، فشار بر بطن‌ها و هیدروسفالی انسدادی باید بررسی شود.',
      alt: 'MRI کیست کاووم ولی اینترپوزیتی',
    },
  },
  takehome: {
    title: 'پیام نهایی',
    lead: 'سه فضا و سه لندمارک.',
    items: [
      { title: 'CSP', text: 'جلوی مونرو و بین شاخ‌های فرونتال.' },
      { title: 'کاووم ورگه', text: 'پشت مونرو و تقریباً همیشه همراه CSP.' },
      { title: 'CVI', text: 'زیر فورنیکس و اغلب در نمای اکسیال مثلثی.' },
      { title: 'زمانی مهم است که', text: 'اثر فشاری، هیدروسفالی یا دیواره و سیگنال آتیپیک وجود داشته باشد.' },
    ],
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
        <span className={styles.readCheck}>{isRead ? '✓' : ''}</span>
        <span>{isRead ? copy.read : copy.mark}</span>
      </button>
      {authError && <div className={styles.readError}><span>{copy.error}</span><Link href="/sign-in">{copy.signIn}</Link></div>}
    </div>
  )
}

function Section({ id, title, lead, children }) {
  const isMobile = useMobileLearningLayout()
  const [open, setOpen] = useState(true)
  useEffect(() => setOpen(!isMobile), [isMobile, id])
  return (
    <section id={id} className={styles.section}>
      <button type="button" className={styles.sectionHeader} onClick={() => setOpen(value => !value)} aria-expanded={open}>
        <h2>{title}</h2><span>{open ? '−' : '+'}</span>
      </button>
      {open && <div className={styles.sectionBody}>{lead && <p className={styles.lead}>{lead}</p>}{children}</div>}
    </section>
  )
}

function Cards({ items }) {
  return <div className={styles.cardsGrid}>{items.map(item => <article className={styles.infoCard} key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
}

function Table({ headers, rows }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead><tr>{headers.map(header => <th key={header}>{header}</th>)}</tr></thead>
        <tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={`${index}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}

function Callout({ type, label, children }) {
  return <div className={`${styles.callout} ${type === 'cave' ? styles.cave : ''}`}><strong>{label}</strong><p>{children}</p></div>
}

function ClickableImage({ src, alt, label, onOpen, className = '' }) {
  return (
    <button type="button" className={`${styles.imageButton} ${className}`} onClick={() => onOpen({ src, alt })} aria-label={label}>
      <img src={src} alt={alt} />
      <span className={styles.zoomBadge}>⌕</span>
    </button>
  )
}

function CaseCard({ item, copy, onOpen }) {
  const data = copy.cases[item.id]
  return (
    <article className={styles.caseCard}>
      <div className={styles.caseScroller}>
        {item.images.map((src, index) => (
          <ClickableImage key={src} src={src} alt={`${data.alt} ${index + 1}`} label={copy.enlarge} onOpen={onOpen} className={styles.caseFrame} />
        ))}
      </div>
      <div className={styles.caseBody}>
        <span className={styles.caseLabel}>{data.label}</span>
        <h3>{data.title}</h3>
        <p>{data.text}</p>
        <small>{copy.illustrative}</small>
        <small>{item.credit}</small>
        <a href={item.url} target="_blank" rel="noopener noreferrer">{copy.openCase} ↗</a>
      </div>
    </article>
  )
}

export default function MidlineCavaPage() {
  const { lang } = useLanguage()
  const copy = CONTENT[lang] || CONTENT.de
  const [activeId, setActiveId] = useState(copy.sections[0].id)
  const [lightbox, setLightbox] = useState(null)
  const { isRead, toggleRead, authError } = useLessonReadStatus('liquorraeume-ventrikelsystem')
  const sectionIds = useMemo(() => copy.sections.map(section => section.id), [copy.sections])
  const withLang = href => lang === 'de' ? href : (href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`)
  const lessonPath = withLang('/gehirn/anatomie/liquorraeume-ventrikelsystem')

  useEffect(() => {
    const observers = sectionIds.map(id => {
      const element = document.getElementById(id)
      if (!element) return null
      const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setActiveId(id), { rootMargin: '-18% 0px -72% 0px', threshold: 0.01 })
      observer.observe(element)
      return observer
    })
    return () => observers.forEach(observer => observer?.disconnect())
  }, [sectionIds])

  useEffect(() => {
    if (!lightbox) return undefined
    const onKey = event => event.key === 'Escape' && setLightbox(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  return (
    <main className={styles.page} dir={lang === 'fa' ? 'rtl' : 'ltr'} lang={lang}>
      <header className={styles.header}>
        <nav className={styles.breadcrumb}>
          <Link href={withLang('/')}>RadYar</Link><span>›</span>
          <Link href={withLang('/lernen/gehirn')}>{copy.breadcrumbHead}</Link><span>›</span>
          <span>{copy.breadcrumbCurrent}</span>
        </nav>
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.sourceBadge}>{copy.sourceLabel}</span>
            <h1>{copy.title}</h1>
            <p>{copy.subtitle}</p>
            <div className={styles.actions}>
              <Link href={withLang(`/ueben/quiz?fach=gehirn&n=3&themen=liquorraeume-ventrikelsystem&from=${encodeURIComponent(lessonPath)}`)} className={styles.actionBtn}>{copy.actionMcq}</Link>
              <Link href={withLang(`/flashcards/liquorraeume-ventrikelsystem?from=${encodeURIComponent(lessonPath)}`)} className={styles.actionBtn}>{copy.actionFlash}</Link>
            </div>
          </div>
          <div className={styles.heroStats}>
            {copy.heroCards.map(card => <div className={styles.heroStat} key={card.label}><strong>{card.value}</strong><span>{card.label}</span><small>{card.text}</small></div>)}
          </div>
        </div>
      </header>

      <div className={styles.readBar}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError} /></div>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sideTitle}>{copy.toc}</div>
          {copy.sections.map(section => (
            <button type="button" key={section.id} data-section-id={section.id} className={`${styles.sideItem} ${activeId === section.id ? styles.sideItemActive : ''}`} onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}>
              <span>{section.icon}</span><strong>{section.label}</strong>
            </button>
          ))}
        </aside>

        <div className={styles.main}>
          <Section id="orientierung" title={copy.orientation.title} lead={copy.orientation.lead}>
            <Cards items={copy.orientation.cards} />
            <figure className={styles.teachingFigure}>
              <ClickableImage src="/mittellinienzysten/cavum-comparison.jpg" alt={copy.orientation.figureAlt} label={copy.enlarge} onOpen={setLightbox} />
              <figcaption><strong>{copy.orientation.figureTitle}</strong><span>{copy.orientation.figureText}</span><small>Zyryab, Wikimedia Commons, CC BY-SA 3.0</small></figcaption>
            </figure>
            <Callout label={copy.keyLabel}>{copy.orientation.key}</Callout>
          </Section>

          <Section id="csp" title={copy.csp.title} lead={copy.csp.lead}>
            <Table headers={copy.csp.headers} rows={copy.csp.rows} />
            <Callout type="cave" label={copy.caveLabel}>{copy.csp.cave}</Callout>
          </Section>

          <Section id="cv" title={copy.cv.title} lead={copy.cv.lead}>
            <Cards items={copy.cv.cards} />
            <Callout label={copy.keyLabel}>{copy.cv.key}</Callout>
          </Section>

          <Section id="cvi" title={copy.cvi.title} lead={copy.cvi.lead}>
            <Table headers={copy.cvi.headers} rows={copy.cvi.rows} />
            <div className={styles.splitCallouts}>
              <Callout label={copy.keyLabel}>{copy.cvi.key}</Callout>
              <Callout type="cave" label={copy.caveLabel}>{copy.cvi.cave}</Callout>
            </div>
          </Section>

          <Section id="differenzialdiagnose" title={copy.differential.title} lead={copy.differential.lead}>
            <Table headers={copy.differential.headers} rows={copy.differential.rows} />
            <Cards items={copy.differential.report} />
          </Section>

          <Section id="faelle" title={copy.cases.title} lead={copy.cases.lead}>
            <div className={styles.caseGrid}>{CASES.map(item => <CaseCard key={item.id} item={item} copy={copy} onOpen={setLightbox} />)}</div>
          </Section>

          <Section id="takehome" title={copy.takehome.title} lead={copy.takehome.lead}>
            <div className={styles.takeHomeGrid}>
              {copy.takehome.items.map((item, index) => <article className={styles.takeHomeItem} key={item.title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}
            </div>
          </Section>

          <div className={styles.readBarBottom}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError} /></div>
        </div>
      </div>

      {lightbox && (
        <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={copy.enlarge} onClick={() => setLightbox(null)}>
          <button type="button" onClick={() => setLightbox(null)} aria-label={copy.close}>×</button>
          <img src={lightbox.src} alt={lightbox.alt} onClick={event => event.stopPropagation()} />
        </div>
      )}
    </main>
  )
}
