'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import InProgressBanner from '@/components/InProgressBanner'
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

const GENERAL_CONTENT = {
  de: {
    breadcrumbCurrent: 'Anatomie · Liquorräume / Ventrikelsystem',
    title: 'Liquorräume / Ventrikelsystem',
    subtitle: 'Anatomie, Liquorzirkulation, Bildgebung und sichere Beurteilung von Ventrikelerweiterungen',
    sections: [
      { id: 'anatomie', label: 'Ventrikelanatomie', icon: '🧠' },
      { id: 'liquorfluss', label: 'Liquorfluss', icon: '↻' },
      { id: 'bildgebung', label: 'CT & MRT', icon: '🩻' },
      { id: 'beurteilung', label: 'Systematische Beurteilung', icon: '📐' },
      { id: 'hydrozephalus', label: 'Hydrozephalus', icon: '⚠️' },
      { id: 'normvarianten', label: 'Normvarianten', icon: '◇' },
      { id: 'faelle', label: 'Lernfälle', icon: '🔬' },
      { id: 'befundung', label: 'Befundung', icon: '📝' },
      { id: 'takehome', label: 'Take home message', icon: '💡' },
    ],
    heroCards: [
      { value: '≈ 500 ml/Tag', label: 'Liquorproduktion', text: 'überwiegend im Plexus choroideus' },
      { value: '≈ 150 ml', label: 'Liquorvolumen', text: 'mehrfacher Umsatz pro Tag' },
      { value: 'Fluss + Form', label: 'Befundprinzip', text: 'Obstruktionshöhe aus dem Muster ableiten' },
    ],
    anatomy: {
      title: 'Ventrikelanatomie',
      lead: 'Das Ventrikelsystem besteht aus paarigen Seitenventrikeln, 3. Ventrikel, Aquädukt und 4. Ventrikel. Form und Verbindung der Abschnitte bestimmen das Muster bei einer Abflussstörung.',
      headers: ['Abschnitt', 'Anatomische Lage', 'Radiologisch wichtige Beziehung'],
      rows: [
        ['Seitenventrikel', 'Frontalhorn, Corpus, Atrium, Temporal- und Okzipitalhorn', 'über die Foramina Monroi mit dem 3. Ventrikel verbunden'],
        ['3. Ventrikel', 'median zwischen den Thalami', 'Recessus opticus und infundibularis; Breite altersabhängig beurteilen'],
        ['Aqueductus mesencephali', 'durch das Mittelhirn', 'engste intraventrikuläre Passage und häufige Obstruktionsstelle'],
        ['4. Ventrikel', 'zwischen Pons/Medulla und Kleinhirn', 'Ausfluss über Foramen Magendii und Foramina Luschkae'],
        ['Zentrale Verbindung', 'Foramen Monroi → 3. Ventrikel → Aquädukt → 4. Ventrikel', 'Dilatationsmuster lokalisiert die Stenose'],
      ],
      cards: [
        { title: 'Frontalhörner', text: 'Der Nucleus caudatus bildet die laterale Wand; das Septum pellucidum begrenzt medial.' },
        { title: 'Temporalhörner', text: 'Frühe Erweiterung kann ein sensibles Zeichen einer akuten Liquorabflussstörung sein.' },
        { title: '4. Ventrikel', text: 'Seine Weite hilft, eine Aquäduktstenose von einer distaleren Abflussstörung zu unterscheiden.' },
      ],
      key: 'Nicht nur „Ventrikel weit“ beschreiben: Welche Ventrikel und Hörner sind erweitert, und welche bleiben normal?',
    },
    flow: {
      title: 'Liquorproduktion und -zirkulation',
      lead: 'Liquor wird überwiegend im Plexus choroideus gebildet. Der Fluss folgt einer festen anatomischen Route; ein abrupter Kalibersprung lokalisiert häufig die Obstruktion.',
      steps: [
        { title: '1. Produktion', text: 'Plexus choroideus der Seitenventrikel sowie des 3. und 4. Ventrikels.' },
        { title: '2. Intraventrikulärer Fluss', text: 'Seitenventrikel → Foramina Monroi → 3. Ventrikel → Aquädukt → 4. Ventrikel.' },
        { title: '3. Austritt', text: 'Über das mediane Foramen Magendii und die lateralen Foramina Luschkae in die basalen Zisternen.' },
        { title: '4. Subarachnoidalraum', text: 'Verteilung um Gehirn und Rückenmark mit pulsationsabhängiger Zirkulation.' },
        { title: '5. Resorption', text: 'Vor allem über Arachnoidalgranulationen in die duralen Sinus; zusätzlich lymphatische Abflusswege.' },
      ],
      key: 'Monro-Obstruktion erweitert einen oder beide Seitenventrikel; Aquäduktstenose erweitert Seiten- und 3. Ventrikel bei normalem 4. Ventrikel.',
    },
    imaging: {
      title: 'Normalbefund in CT und MRT',
      lead: 'Liquor folgt in CT und MRT charakteristischen Dichte- und Signalmerkmalen. Abweichungen können auf Blut, Protein, Eiter, Tumor oder eingeschränkten Fluss hinweisen.',
      headers: ['Methode/Sequenz', 'Normaler Liquor', 'Wichtige Anwendung'],
      rows: [
        ['CT nativ', 'hypodens, etwa wasserdicht', 'Blut, Verkalkung und akuten Hydrozephalus erkennen'],
        ['T1', 'hypointens', 'proteinreiche oder hämorrhagische Inhalte können heller sein'],
        ['T2', 'hyperintens', 'Anatomie der Liquorräume und Zysten beurteilen'],
        ['FLAIR', 'weitgehend supprimiert', 'fehlende Suppression bei Blut, Protein, Entzündung oder Sauerstoffartefakt'],
        ['DWI/ADC', 'keine Restriktion', 'Restriktion spricht etwa für Epidermoid oder eitrigen Inhalt'],
        ['3D-CISS/FIESTA', 'hoher Liquor-Gewebe-Kontrast', 'feine Membranen, Aquädukt und Zisternen darstellen'],
        ['Phasenkontrast-MRT', 'pulsatiler Fluss quantifizierbar', 'Aquäduktfluss und ausgewählte Shunt-/ETV-Fragen'],
      ],
      cave: 'FLAIR-Hyperintensität im Subarachnoidalraum ist nicht automatisch pathologisch: Sauerstoffgabe, Bewegung und Gefäßfluss können imitieren.',
    },
    assessment: {
      title: 'Ventrikelweite systematisch beurteilen',
      lead: 'Die Ventrikelweite ist alters- und volumenabhängig. Entscheidend ist die Kombination aus Morphologie, Sulcusweite, zeitlichem Verlauf und Zeichen erhöhten intraventrikulären Drucks.',
      items: [
        { title: 'Symmetrie', text: 'Seitenventrikel, Foramina Monroi und Hörner auf asymmetrische Erweiterung oder Verlagerung prüfen.' },
        { title: 'Dilatationsmuster', text: 'Mono-, bi-, tri- oder tetraventrikulär beschreiben und daraus die mögliche Obstruktionshöhe ableiten.' },
        { title: 'Sulci und Zisternen', text: 'Bei Atrophie sind Ventrikel und äußere Liquorräume proportional erweitert; beim Hydrozephalus oft diskrepant.' },
        { title: 'Temporalhörner', text: 'Eine rundliche Erweiterung kann früh auftreten, bevor die Frontalhörner stark imponieren.' },
        { title: 'Transependymaler Fluss', text: 'Periventrikuläre Hypodensität beziehungsweise T2/FLAIR-Hyperintensität bei akutem Druckanstieg.' },
        { title: 'Vergleich', text: 'Voraufnahmen sind häufig aussagekräftiger als ein isolierter Zahlenwert.' },
      ],
      metricsHeaders: ['Zeichen/Messwert', 'Verwendung', 'Grenze'],
      metricsRows: [
        ['Evans-Index', 'maximale Frontalhornweite / maximaler innerer Schädeldurchmesser', '> 0,30 unterstützt Ventrikulomegalie, ist aber nicht spezifisch'],
        ['Callosal angle', 'koronar senkrecht zur AC-PC-Linie', 'kleiner Winkel unterstützt bei passender Klinik einen NPH'],
        ['DESH-Muster', 'enge Hochkonvexitätssulci bei erweiterten Sylvischen Fissuren', 'unterstützt NPH, ersetzt nicht die klinische Beurteilung'],
      ],
      key: 'Hydrozephalus ist eine morphologische und klinische Diagnose – nicht lediglich ein Evans-Index über 0,30.',
    },
    hydro: {
      title: 'Hydrozephalus und wichtige Muster',
      lead: 'Die erste Frage lautet: kommunizierend oder nicht kommunizierend? Danach werden Obstruktionshöhe, Druckzeichen und Ursache beschrieben.',
      headers: ['Muster', 'Ventrikelkonfiguration', 'Typische Ursachen'],
      rows: [
        ['Foramen-Monroi-Obstruktion', 'einseitige oder beidseitige Seitenventrikelerweiterung', 'Kolloidzyste, Tumor, Membran'],
        ['Aquäduktstenose', 'Seitenventrikel + 3. Ventrikel weit, 4. Ventrikel normal', 'kongenitale Stenose, Tekttumor, Entzündung'],
        ['Abflussstörung am 4. Ventrikel', 'alle vier Ventrikel erweitert', 'Tumor, Blut, entzündliche Membranen'],
        ['Kommunizierender Hydrozephalus', 'gesamtes Ventrikelsystem erweitert', 'Subarachnoidalblutung, Meningitis, gestörte Resorption'],
        ['Normaldruckhydrozephalus', 'Ventrikulomegalie disproportional zu Sulci, mögliches DESH', 'klinische Trias und Verlauf entscheidend'],
        ['Ex-vacuo-Erweiterung', 'Ventrikel und Sulci proportional weit', 'Hirnatrophie, Gewebeverlust'],
      ],
      danger: [
        { title: 'Akute Druckzeichen', text: 'Transependymaler Liquorübertritt, Sulcuseffacement, Zisternenverengung und Herniationszeichen.' },
        { title: 'Ursache suchen', text: 'Aquädukt, Foramina Monroi, 4.-Ventrikel-Ausgänge und basale Zisternen gezielt prüfen.' },
        { title: 'Dringlichkeit', text: 'Akuter obstruktiver Hydrozephalus ist ein neurochirurgischer Notfall.' },
      ],
      cave: 'Periventrikuläre FLAIR-Hyperintensitäten sind bei älteren Menschen häufig vaskulär. Transependymaler Fluss wird durch Ventrikeldilatation, glatte periventrikuläre Verteilung und akuten Verlauf wahrscheinlicher.',
    },
    reporting: {
      title: 'Strukturierte Befundung',
      lead: 'Ein guter Befund beantwortet sechs Fragen und vermeidet die unspezifische Formulierung „erweiterte innere Liquorräume“.',
      items: [
        { title: '1. Ausmaß', text: 'Ventrikelweite und zeitliche Veränderung benennen.' },
        { title: '2. Muster', text: 'Mono-, bi-, tri- oder tetraventrikuläre Erweiterung beschreiben.' },
        { title: '3. Druckzeichen', text: 'Temporalhörner, transependymalen Fluss, Sulci, Zisternen und Herniation prüfen.' },
        { title: '4. Obstruktionshöhe', text: 'Kalibersprung und normal gebliebene nachgeschaltete Ventrikel lokalisieren.' },
        { title: '5. Ursache', text: 'Raumforderung, Blut, Entzündung, Membran oder postoperative Veränderung nennen.' },
        { title: '6. Einordnung', text: 'Hydrozephalus, Ex-vacuo-Erweiterung oder Normvariante klar formulieren.' },
      ],
      example: 'Beispiel: Triventrikulärer Hydrozephalus mit erweiterten Temporalhörnern und transependymalem Liquorübertritt bei abruptem Kalibersprung im Aquädukt; 4. Ventrikel normal weit.',
    },
    takehome: {
      title: 'Take home message',
      lead: 'Form, Fluss und Druckzeichen zusammen denken.',
      items: [
        { title: 'Flussweg kennen', text: 'Monro → 3. Ventrikel → Aquädukt → 4. Ventrikel → Magendie/Luschka.' },
        { title: 'Muster lokalisiert', text: 'Welche Ventrikel weit und welche normal sind, zeigt die mögliche Obstruktionshöhe.' },
        { title: 'Hydrozephalus ≠ Atrophie', text: 'Sulci, Temporalhörner, Druckzeichen und Verlauf unterscheiden beide.' },
        { title: 'Normvarianten erkennen', text: 'CSP vor Monro, Cavum vergae dahinter, CVI unter dem Fornix.' },
      ],
    },
  },
  en: {
    breadcrumbCurrent: 'Anatomy · CSF spaces / ventricular system',
    title: 'CSF spaces / ventricular system',
    subtitle: 'Anatomy, CSF circulation, imaging and confident assessment of ventricular enlargement',
    sections: [
      { id: 'anatomie', label: 'Ventricular anatomy', icon: '🧠' },
      { id: 'liquorfluss', label: 'CSF flow', icon: '↻' },
      { id: 'bildgebung', label: 'CT & MRI', icon: '🩻' },
      { id: 'beurteilung', label: 'Systematic assessment', icon: '📐' },
      { id: 'hydrozephalus', label: 'Hydrocephalus', icon: '⚠️' },
      { id: 'normvarianten', label: 'Normal variants', icon: '◇' },
      { id: 'faelle', label: 'Cases', icon: '🔬' },
      { id: 'befundung', label: 'Reporting', icon: '📝' },
      { id: 'takehome', label: 'Take home message', icon: '💡' },
    ],
    heroCards: [
      { value: '≈ 500 ml/day', label: 'CSF production', text: 'mainly by the choroid plexus' },
      { value: '≈ 150 ml', label: 'CSF volume', text: 'turns over several times daily' },
      { value: 'Flow + shape', label: 'reporting principle', text: 'infer obstruction level from the pattern' },
    ],
    anatomy: {
      title: 'Ventricular anatomy',
      lead: 'The ventricular system comprises the paired lateral ventricles, third ventricle, aqueduct and fourth ventricle. Their shape and connections determine the pattern of enlargement.',
      headers: ['Segment', 'Location', 'Radiologically important relationship'],
      rows: [
        ['Lateral ventricles', 'frontal horn, body, atrium, temporal and occipital horns', 'connect to the third ventricle through the foramina of Monro'],
        ['Third ventricle', 'midline between the thalami', 'assess its width in the context of age and global volume'],
        ['Cerebral aqueduct', 'through the midbrain', 'narrowest intraventricular channel and common obstruction site'],
        ['Fourth ventricle', 'between pons/medulla and cerebellum', 'outflow through Magendie and Luschka foramina'],
        ['Central pathway', 'Monro → third ventricle → aqueduct → fourth ventricle', 'the dilatation pattern localises a stenosis'],
      ],
      cards: [
        { title: 'Frontal horns', text: 'The caudate nucleus forms the lateral wall and the septum pellucidum the medial wall.' },
        { title: 'Temporal horns', text: 'Early rounding and enlargement may be a sensitive sign of acute CSF obstruction.' },
        { title: 'Fourth ventricle', text: 'Its calibre helps distinguish aqueduct stenosis from a more distal obstruction.' },
      ],
      key: 'Do not merely report “dilated ventricles”: state which ventricles and horns are enlarged and which remain normal.',
    },
    flow: {
      title: 'CSF production and circulation',
      lead: 'CSF is produced mainly by the choroid plexus. It follows a fixed anatomical route, and an abrupt calibre change often localises the obstruction.',
      steps: [
        { title: '1. Production', text: 'Choroid plexus in the lateral, third and fourth ventricles.' },
        { title: '2. Intraventricular flow', text: 'Lateral ventricles → Monro foramina → third ventricle → aqueduct → fourth ventricle.' },
        { title: '3. Exit', text: 'Through the median Magendie and lateral Luschka foramina into the basal cisterns.' },
        { title: '4. Subarachnoid space', text: 'Distribution around the brain and spinal cord with pulsatile circulation.' },
        { title: '5. Absorption', text: 'Mainly via arachnoid granulations into dural sinuses, with additional lymphatic pathways.' },
      ],
      key: 'Monro obstruction enlarges one or both lateral ventricles; aqueduct stenosis enlarges the lateral and third ventricles while sparing the fourth.',
    },
    imaging: {
      title: 'Normal CT and MRI appearance',
      lead: 'Normal CSF has characteristic CT attenuation and MRI signal. Deviations may indicate blood, protein, pus, tumour or restricted flow.',
      headers: ['Method/sequence', 'Normal CSF', 'Key use'],
      rows: [
        ['Non-contrast CT', 'water-like low attenuation', 'detect blood, calcification and acute hydrocephalus'],
        ['T1', 'hypointense', 'proteinaceous or haemorrhagic contents may be brighter'],
        ['T2', 'hyperintense', 'assess CSF-space anatomy and cysts'],
        ['FLAIR', 'largely suppressed', 'failed suppression with blood, protein, inflammation or oxygen artefact'],
        ['DWI/ADC', 'no restriction', 'restriction suggests epidermoid or purulent material'],
        ['3D-CISS/FIESTA', 'high CSF-tissue contrast', 'show thin membranes, aqueduct and cisterns'],
        ['Phase-contrast MRI', 'quantifiable pulsatile flow', 'selected aqueduct, shunt and ETV questions'],
      ],
      cave: 'Subarachnoid FLAIR hyperintensity is not automatically pathological; oxygen, motion and vascular flow may mimic disease.',
    },
    assessment: {
      title: 'Systematic assessment of ventricular size',
      lead: 'Ventricular size depends on age and brain volume. Morphology, sulcal width, temporal change and pressure signs matter more than a single measurement.',
      items: [
        { title: 'Symmetry', text: 'Assess lateral ventricles, foramina of Monro and individual horns for asymmetric enlargement or displacement.' },
        { title: 'Pattern', text: 'Describe mono-, bi-, tri- or tetraventricular enlargement and infer the obstruction level.' },
        { title: 'Sulci and cisterns', text: 'Atrophy enlarges ventricles and external CSF spaces proportionally; hydrocephalus is often disproportionate.' },
        { title: 'Temporal horns', text: 'Rounding may appear early before marked frontal-horn enlargement.' },
        { title: 'Transependymal flow', text: 'Periventricular low attenuation or T2/FLAIR hyperintensity with acute pressure elevation.' },
        { title: 'Comparison', text: 'Prior imaging is often more informative than an isolated numeric threshold.' },
      ],
      metricsHeaders: ['Sign/measurement', 'Use', 'Limitation'],
      metricsRows: [
        ['Evans index', 'maximum frontal-horn width / maximum inner skull diameter', '> 0.30 supports ventriculomegaly but is not specific'],
        ['Callosal angle', 'coronal plane perpendicular to AC-PC line', 'a smaller angle supports NPH in the correct clinical setting'],
        ['DESH pattern', 'tight high-convexity sulci with enlarged Sylvian fissures', 'supports NPH but does not replace clinical assessment'],
      ],
      key: 'Hydrocephalus is a morphological and clinical diagnosis—not merely an Evans index above 0.30.',
    },
    hydro: {
      title: 'Hydrocephalus and key patterns',
      lead: 'First decide whether hydrocephalus is communicating or non-communicating, then describe the obstruction level, pressure signs and cause.',
      headers: ['Pattern', 'Ventricular configuration', 'Typical causes'],
      rows: [
        ['Monro obstruction', 'one or both lateral ventricles enlarged', 'colloid cyst, tumour, membrane'],
        ['Aqueduct stenosis', 'lateral + third ventricles enlarged; fourth normal', 'congenital stenosis, tectal tumour, inflammation'],
        ['Fourth-ventricle outflow obstruction', 'all four ventricles enlarged', 'tumour, blood, inflammatory membranes'],
        ['Communicating hydrocephalus', 'entire ventricular system enlarged', 'subarachnoid haemorrhage, meningitis, impaired absorption'],
        ['Normal-pressure hydrocephalus', 'ventriculomegaly disproportionate to sulci; possible DESH', 'clinical triad and course are decisive'],
        ['Ex-vacuo enlargement', 'ventricles and sulci proportionally enlarged', 'atrophy or tissue loss'],
      ],
      danger: [
        { title: 'Acute pressure signs', text: 'Transependymal flow, sulcal effacement, cisternal narrowing and herniation.' },
        { title: 'Search for the cause', text: 'Inspect Monro foramina, aqueduct, fourth-ventricle outlets and basal cisterns.' },
        { title: 'Urgency', text: 'Acute obstructive hydrocephalus is a neurosurgical emergency.' },
      ],
      cave: 'Periventricular FLAIR hyperintensity is commonly vascular in older patients. Transependymal flow is favoured by ventricular dilatation, smooth periventricular distribution and an acute course.',
    },
    reporting: {
      title: 'Structured reporting',
      lead: 'A useful report answers six questions and avoids the vague phrase “prominent internal CSF spaces”.',
      items: [
        { title: '1. Extent', text: 'State ventricular size and interval change.' },
        { title: '2. Pattern', text: 'Describe mono-, bi-, tri- or tetraventricular enlargement.' },
        { title: '3. Pressure signs', text: 'Assess temporal horns, transependymal flow, sulci, cisterns and herniation.' },
        { title: '4. Obstruction level', text: 'Localise an abrupt calibre change and downstream ventricles that remain normal.' },
        { title: '5. Cause', text: 'Identify mass, blood, inflammation, membrane or postoperative change.' },
        { title: '6. Conclusion', text: 'Clearly distinguish hydrocephalus, ex-vacuo enlargement and normal variant.' },
      ],
      example: 'Example: Triventricular hydrocephalus with enlarged temporal horns and transependymal CSF flow, with abrupt calibre change at the aqueduct; fourth ventricle remains normal.',
    },
    takehome: {
      title: 'Take home message',
      lead: 'Integrate shape, flow and pressure signs.',
      items: [
        { title: 'Know the pathway', text: 'Monro → third ventricle → aqueduct → fourth ventricle → Magendie/Luschka.' },
        { title: 'The pattern localises', text: 'Which ventricles are enlarged and which remain normal indicates the obstruction level.' },
        { title: 'Hydrocephalus ≠ atrophy', text: 'Sulci, temporal horns, pressure signs and interval change distinguish them.' },
        { title: 'Recognise variants', text: 'CSP anterior to Monro, cavum vergae posterior, CVI below the fornix.' },
      ],
    },
  },
  fa: {
    breadcrumbCurrent: 'آناتومی · فضاهای CSF و سیستم بطنی',
    title: 'فضاهای CSF / سیستم بطنی',
    subtitle: 'آناتومی، گردش مایع مغزی‌نخاعی، تصویربرداری و ارزیابی دقیق اتساع بطن‌ها',
    sections: [
      { id: 'anatomie', label: 'آناتومی بطن‌ها', icon: '🧠' },
      { id: 'liquorfluss', label: 'گردش CSF', icon: '↻' },
      { id: 'bildgebung', label: 'CT و MRI', icon: '🩻' },
      { id: 'beurteilung', label: 'ارزیابی سیستماتیک', icon: '📐' },
      { id: 'hydrozephalus', label: 'هیدروسفالی', icon: '⚠️' },
      { id: 'normvarianten', label: 'واریانت‌های طبیعی', icon: '◇' },
      { id: 'faelle', label: 'کیس‌های آموزشی', icon: '🔬' },
      { id: 'befundung', label: 'گزارش‌نویسی', icon: '📝' },
      { id: 'takehome', label: 'پیام نهایی', icon: '💡' },
    ],
    heroCards: [
      { value: 'حدود ۵۰۰ ml/روز', label: 'تولید CSF', text: 'عمدتاً توسط شبکه کوروئید' },
      { value: 'حدود ۱۵۰ ml', label: 'حجم CSF', text: 'چند بار در روز جایگزین می‌شود' },
      { value: 'مسیر + شکل', label: 'اصل گزارش', text: 'محل انسداد را از الگوی اتساع پیدا کنید' },
    ],
    anatomy: {
      title: 'آناتومی سیستم بطنی',
      lead: 'سیستم بطنی شامل دو بطن جانبی، بطن سوم، مجرای سیلویوس و بطن چهارم است. شکل و ارتباط این بخش‌ها الگوی اتساع در انسداد CSF را تعیین می‌کند.',
      headers: ['بخش', 'محل آناتومیک', 'ارتباط مهم در تصویربرداری'],
      rows: [
        ['بطن‌های جانبی', 'شاخ فرونتال، تنه، آتریوم، شاخ تمپورال و اکسیپیتال', 'از طریق سوراخ‌های مونرو به بطن سوم متصل‌اند'],
        ['بطن سوم', 'در خط وسط بین تالاموس‌ها', 'عرض آن باید متناسب با سن و حجم کلی مغز تفسیر شود'],
        ['مجرای مغزی', 'درون مزانسفال', 'باریک‌ترین مسیر داخل‌بطنی و محل شایع انسداد'],
        ['بطن چهارم', 'بین پونز/مدولا و مخچه', 'خروج CSF از سوراخ ماژندی و سوراخ‌های لوشکا'],
        ['مسیر مرکزی', 'مونرو ← بطن سوم ← مجرا ← بطن چهارم', 'الگوی اتساع محل تنگی را نشان می‌دهد'],
      ],
      cards: [
        { title: 'شاخ‌های فرونتال', text: 'هسته کودیت دیواره خارجی و سپتوم پلوسیدوم دیواره داخلی را می‌سازد.' },
        { title: 'شاخ‌های تمپورال', text: 'گرد و متسع شدن زودرس آن‌ها می‌تواند نشانه حساس انسداد حاد CSF باشد.' },
        { title: 'بطن چهارم', text: 'اندازه آن به افتراق تنگی مجرا از انسداد دیستال‌تر کمک می‌کند.' },
      ],
      key: 'فقط ننویسید «بطن‌ها متسع‌اند»؛ مشخص کنید کدام بطن‌ها و شاخ‌ها متسع و کدام بخش‌ها طبیعی مانده‌اند.',
    },
    flow: {
      title: 'تولید و گردش CSF',
      lead: 'CSF عمدتاً در شبکه کوروئید تولید می‌شود و مسیر آناتومیک مشخصی دارد. تغییر ناگهانی قطر مسیر اغلب محل انسداد را نشان می‌دهد.',
      steps: [
        { title: '۱. تولید', text: 'شبکه کوروئید بطن‌های جانبی، سوم و چهارم.' },
        { title: '۲. مسیر داخل‌بطنی', text: 'بطن‌های جانبی ← سوراخ‌های مونرو ← بطن سوم ← مجرا ← بطن چهارم.' },
        { title: '۳. خروج', text: 'از سوراخ میانی ماژندی و سوراخ‌های طرفی لوشکا به سیسترن‌های قاعده‌ای.' },
        { title: '۴. فضای ساب‌آراکنوئید', text: 'گردش ضربانی در اطراف مغز و نخاع.' },
        { title: '۵. جذب', text: 'عمدتاً از طریق گرانولاسیون‌های آراکنوئید به سینوس‌های وریدی، همراه مسیرهای لنفاوی.' },
      ],
      key: 'انسداد مونرو یک یا هر دو بطن جانبی را متسع می‌کند؛ تنگی مجرا بطن‌های جانبی و سوم را متسع می‌کند ولی بطن چهارم طبیعی می‌ماند.',
    },
    imaging: {
      title: 'نمای طبیعی در CT و MRI',
      lead: 'CSF طبیعی در CT و MRI ویژگی‌های مشخصی دارد. اختلاف از این الگو می‌تواند ناشی از خون، پروتئین، چرک، تومور یا اختلال جریان باشد.',
      headers: ['روش/سکانس', 'CSF طبیعی', 'کاربرد مهم'],
      rows: [
        ['CT بدون کنتراست', 'هیپودنس و مشابه آب', 'تشخیص خون، کلسیفیکاسیون و هیدروسفالی حاد'],
        ['T1', 'هیپواینتنس', 'محتوای پرپروتئین یا خونریزی ممکن است روشن‌تر باشد'],
        ['T2', 'هایپراینتنس', 'ارزیابی آناتومی فضاهای CSF و کیست‌ها'],
        ['FLAIR', 'تقریباً سرکوب می‌شود', 'عدم سرکوب در خون، پروتئین، التهاب یا آرتیفکت اکسیژن'],
        ['DWI/ADC', 'بدون محدودیت انتشار', 'محدودیت انتشار به نفع اپیدرموئید یا محتوای چرکی است'],
        ['3D-CISS/FIESTA', 'کنتراست زیاد بین CSF و بافت', 'نمایش غشاهای ظریف، مجرا و سیسترن‌ها'],
        ['MRI فازکنتراست', 'جریان ضربانی قابل اندازه‌گیری', 'بررسی انتخابی جریان مجرا، شانت و ETV'],
      ],
      cave: 'هایپراینتنس بودن فضای ساب‌آراکنوئید در FLAIR همیشه پاتولوژیک نیست؛ اکسیژن، حرکت و جریان عروقی می‌توانند آن را تقلید کنند.',
    },
    assessment: {
      title: 'ارزیابی سیستماتیک اندازه بطن‌ها',
      lead: 'اندازه بطن‌ها به سن و حجم مغز وابسته است. شکل، اندازه شیارها، تغییر نسبت به قبل و نشانه‌های فشار از یک عدد منفرد مهم‌ترند.',
      items: [
        { title: 'تقارن', text: 'بطن‌های جانبی، سوراخ‌های مونرو و شاخ‌ها را از نظر اتساع یا جابه‌جایی نامتقارن بررسی کنید.' },
        { title: 'الگوی اتساع', text: 'اتساع تک‌بطنی، دو بطنی، سه بطنی یا چهار بطنی را مشخص و محل انسداد را استنباط کنید.' },
        { title: 'شیارها و سیسترن‌ها', text: 'در آتروفی، بطن‌ها و فضاهای خارجی CSF متناسب گشاد می‌شوند؛ در هیدروسفالی این تناسب اغلب وجود ندارد.' },
        { title: 'شاخ‌های تمپورال', text: 'گرد شدن آن‌ها ممکن است پیش از اتساع واضح شاخ‌های فرونتال رخ دهد.' },
        { title: 'جریان ترانس‌اپاندیمال', text: 'هیپودنسیتی اطراف بطن در CT یا هایپراینتنسیتی T2/FLAIR در افزایش حاد فشار.' },
        { title: 'مقایسه', text: 'تصاویر قبلی اغلب از یک آستانه عددی منفرد ارزش بیشتری دارند.' },
      ],
      metricsHeaders: ['علامت/اندازه‌گیری', 'کاربرد', 'محدودیت'],
      metricsRows: [
        ['شاخص Evans', 'حداکثر عرض شاخ‌های فرونتال تقسیم بر حداکثر قطر داخلی جمجمه', 'بیش از ۰٫۳۰ از ونتریکولومگالی حمایت می‌کند ولی اختصاصی نیست'],
        ['زاویه کالوزال', 'نمای کرونال عمود بر خط AC-PC', 'زاویه کوچک‌تر در زمینه بالینی مناسب از NPH حمایت می‌کند'],
        ['الگوی DESH', 'شیارهای تنگ در تحدب فوقانی همراه فیشورهای سیلوین گشاد', 'از NPH حمایت می‌کند ولی جای ارزیابی بالینی را نمی‌گیرد'],
      ],
      key: 'هیدروسفالی یک تشخیص مورفولوژیک و بالینی است، نه صرفاً شاخص Evans بالاتر از ۰٫۳۰.',
    },
    hydro: {
      title: 'هیدروسفالی و الگوهای مهم',
      lead: 'ابتدا مشخص کنید هیدروسفالی ارتباطی است یا غیرارتباطی؛ سپس محل انسداد، نشانه‌های فشار و علت را گزارش کنید.',
      headers: ['الگو', 'شکل بطن‌ها', 'علل تیپیک'],
      rows: [
        ['انسداد مونرو', 'اتساع یک یا هر دو بطن جانبی', 'کیست کلوئید، تومور، غشا'],
        ['تنگی مجرا', 'بطن‌های جانبی و سوم متسع؛ بطن چهارم طبیعی', 'تنگی مادرزادی، تومور تکتال، التهاب'],
        ['انسداد خروجی بطن چهارم', 'هر چهار بطن متسع', 'تومور، خون، غشاهای التهابی'],
        ['هیدروسفالی ارتباطی', 'کل سیستم بطنی متسع', 'خونریزی ساب‌آراکنوئید، مننژیت، اختلال جذب'],
        ['هیدروسفالی فشار طبیعی', 'ونتریکولومگالی نامتناسب با شیارها، احتمال DESH', 'تریاد بالینی و روند بیماری تعیین‌کننده‌اند'],
        ['اتساع ex vacuo', 'بطن‌ها و شیارها به‌طور متناسب گشاد', 'آتروفی یا از دست رفتن بافت'],
      ],
      danger: [
        { title: 'نشانه‌های فشار حاد', text: 'جریان ترانس‌اپاندیمال، محو شدن شیارها، تنگی سیسترن‌ها و هرنیاسیون.' },
        { title: 'جست‌وجوی علت', text: 'سوراخ‌های مونرو، مجرا، خروجی‌های بطن چهارم و سیسترن‌های قاعده‌ای را بررسی کنید.' },
        { title: 'فوریت', text: 'هیدروسفالی انسدادی حاد یک اورژانس نوروسرجری است.' },
      ],
      cave: 'هایپراینتنسیتی اطراف بطن در سالمندان اغلب منشأ عروقی دارد. اتساع بطن‌ها، توزیع صاف اطراف بطن و روند حاد احتمال جریان ترانس‌اپاندیمال را بیشتر می‌کند.',
    },
    reporting: {
      title: 'گزارش‌نویسی ساختاریافته',
      lead: 'گزارش خوب به شش پرسش پاسخ می‌دهد و از عبارت مبهم «فضاهای داخلی CSF برجسته‌اند» پرهیز می‌کند.',
      items: [
        { title: '۱. شدت', text: 'اندازه بطن‌ها و تغییر نسبت به قبل را ذکر کنید.' },
        { title: '۲. الگو', text: 'اتساع تک‌بطنی، دو بطنی، سه بطنی یا چهار بطنی را بنویسید.' },
        { title: '۳. نشانه‌های فشار', text: 'شاخ‌های تمپورال، جریان ترانس‌اپاندیمال، شیارها، سیسترن‌ها و هرنیاسیون را بررسی کنید.' },
        { title: '۴. محل انسداد', text: 'تغییر ناگهانی قطر و بطن‌های دیستال با اندازه طبیعی را پیدا کنید.' },
        { title: '۵. علت', text: 'توده، خون، التهاب، غشا یا تغییر پس از عمل را مشخص کنید.' },
        { title: '۶. جمع‌بندی', text: 'هیدروسفالی، اتساع ex vacuo یا واریانت طبیعی را واضح بیان کنید.' },
      ],
      example: 'نمونه: هیدروسفالی سه‌بطنی همراه اتساع شاخ‌های تمپورال و جریان ترانس‌اپاندیمال، با تغییر ناگهانی قطر در مجرای مغزی؛ بطن چهارم اندازه طبیعی دارد.',
    },
    takehome: {
      title: 'پیام نهایی',
      lead: 'شکل، مسیر جریان و نشانه‌های فشار را با هم تفسیر کنید.',
      items: [
        { title: 'مسیر را بدانید', text: 'مونرو ← بطن سوم ← مجرا ← بطن چهارم ← ماژندی/لوشکا.' },
        { title: 'الگو محل را نشان می‌دهد', text: 'بطن‌های متسع و بطن‌های طبیعی محل احتمالی انسداد را مشخص می‌کنند.' },
        { title: 'هیدروسفالی با آتروفی یکی نیست', text: 'شیارها، شاخ‌های تمپورال، نشانه‌های فشار و روند زمانی آن‌ها را جدا می‌کند.' },
        { title: 'واریانت‌ها را بشناسید', text: 'CSP جلوی مونرو، کاووم ورگه پشت آن و CVI زیر فورنیکس است.' },
      ],
    },
  },
}

Object.entries(GENERAL_CONTENT).forEach(([lang, content]) => Object.assign(CONTENT[lang], content))

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

export default function CsfSpacesPage() {
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
    <>
    <InProgressBanner lang={lang} />
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
          <Section id="anatomie" title={copy.anatomy.title} lead={copy.anatomy.lead}>
            <Table headers={copy.anatomy.headers} rows={copy.anatomy.rows} />
            <Cards items={copy.anatomy.cards} />
            <Callout label={copy.keyLabel}>{copy.anatomy.key}</Callout>
          </Section>

          <Section id="liquorfluss" title={copy.flow.title} lead={copy.flow.lead}>
            <div className={styles.flowGrid}>
              {copy.flow.steps.map(step => <article className={styles.flowStep} key={step.title}><h3>{step.title}</h3><p>{step.text}</p></article>)}
            </div>
            <Callout label={copy.keyLabel}>{copy.flow.key}</Callout>
          </Section>

          <Section id="bildgebung" title={copy.imaging.title} lead={copy.imaging.lead}>
            <Table headers={copy.imaging.headers} rows={copy.imaging.rows} />
            <Callout type="cave" label={copy.caveLabel}>{copy.imaging.cave}</Callout>
          </Section>

          <Section id="beurteilung" title={copy.assessment.title} lead={copy.assessment.lead}>
            <Cards items={copy.assessment.items} />
            <Table headers={copy.assessment.metricsHeaders} rows={copy.assessment.metricsRows} />
            <Callout label={copy.keyLabel}>{copy.assessment.key}</Callout>
          </Section>

          <Section id="hydrozephalus" title={copy.hydro.title} lead={copy.hydro.lead}>
            <Table headers={copy.hydro.headers} rows={copy.hydro.rows} />
            <Cards items={copy.hydro.danger} />
            <Callout type="cave" label={copy.caveLabel}>{copy.hydro.cave}</Callout>
          </Section>

          <Section id="normvarianten" title={copy.orientation.title} lead={copy.orientation.lead}>
            <Cards items={copy.orientation.cards} />
            <figure className={styles.teachingFigure}>
              <ClickableImage src="/mittellinienzysten/cavum-comparison.jpg" alt={copy.orientation.figureAlt} label={copy.enlarge} onOpen={setLightbox} />
              <figcaption><strong>{copy.orientation.figureTitle}</strong><span>{copy.orientation.figureText}</span><small>Zyryab, Wikimedia Commons, CC BY-SA 3.0</small></figcaption>
            </figure>
            <Callout label={copy.keyLabel}>{copy.orientation.key}</Callout>
            <div className={styles.subsection}>
              <h3>{copy.csp.title}</h3>
              <p>{copy.csp.lead}</p>
            </div>
            <Table headers={copy.csp.headers} rows={copy.csp.rows} />
            <Callout type="cave" label={copy.caveLabel}>{copy.csp.cave}</Callout>
            <div className={styles.subsection}>
              <h3>{copy.cv.title}</h3>
              <p>{copy.cv.lead}</p>
            </div>
            <Cards items={copy.cv.cards} />
            <Callout label={copy.keyLabel}>{copy.cv.key}</Callout>
            <div className={styles.subsection}>
              <h3>{copy.cvi.title}</h3>
              <p>{copy.cvi.lead}</p>
            </div>
            <Table headers={copy.cvi.headers} rows={copy.cvi.rows} />
            <div className={styles.splitCallouts}>
              <Callout label={copy.keyLabel}>{copy.cvi.key}</Callout>
              <Callout type="cave" label={copy.caveLabel}>{copy.cvi.cave}</Callout>
            </div>
            <div className={styles.subsection}>
              <h3>{copy.differential.title}</h3>
              <p>{copy.differential.lead}</p>
            </div>
            <Table headers={copy.differential.headers} rows={copy.differential.rows} />
            <Cards items={copy.differential.report} />
          </Section>

          <Section id="faelle" title={copy.cases.title} lead={copy.cases.lead}>
            <div className={styles.caseGrid}>{CASES.map(item => <CaseCard key={item.id} item={item} copy={copy} onOpen={setLightbox} />)}</div>
          </Section>

          <Section id="befundung" title={copy.reporting.title} lead={copy.reporting.lead}>
            <Cards items={copy.reporting.items} />
            <Callout label={copy.keyLabel}>{copy.reporting.example}</Callout>
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
    </>
  )
}
