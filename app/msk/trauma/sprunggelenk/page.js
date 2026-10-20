'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import styles from './page.module.css'
import InProgressBanner from '@/components/InProgressBanner'

const CASE_URL = 'https://radiopaedia.org/cases/200431?lang=us'

const CONTENT = {
  de: {
    toc: 'Inhaltsverzeichnis',
    breadcrumbMsk: 'Muskuloskelettales',
    breadcrumbCurrent: 'Trauma · Sprunggelenk',
    title: 'Sprunggelenktrauma',
    subtitle: 'Systematische Bildgebung, Weber-Klassifikation und Stabilitätsbeurteilung bei Frakturen des oberen Sprunggelenks',
    sourceLabel: 'Dr. Zia',
    keyLabel: 'Merke',
    caveLabel: 'CAVE',
    sections: [
      { id: 'bildgebung', label: 'Bildgebung', icon: '🩻' },
      { id: 'analyse', label: 'Systematische Analyse', icon: '🔍' },
      { id: 'weber', label: 'Weber-Klassifikation', icon: '🦴' },
      { id: 'stabilitaet', label: 'Stabilität', icon: '⚠️' },
      { id: 'sonderformen', label: 'Spezielle Frakturmuster', icon: '🧩' },
      { id: 'ct', label: 'CT-Indikationen', icon: '◫' },
      { id: 'fall', label: 'Fallbeispiel', icon: '🧪' },
      { id: 'takehome', label: 'Take home message', icon: '💡' },
    ],
    heroCards: [
      { value: '2 Ebenen', label: 'Röntgen als Basis', text: 'a.-p./Mortise und seitlich' },
      { value: '15–20°', label: 'Mortise-View', text: 'Innenrotation für freien Gelenkspalt' },
      { value: 'Weber A–C', label: 'Bezug zur Syndesmose', text: 'unterhalb, auf Höhe, oberhalb' },
    ],
    imaging: {
      title: 'Bildgebung beim Sprunggelenktrauma',
      lead: 'Die konventionelle Röntgendiagnostik ist die Basis. Entscheidend sind korrekt eingestellte Aufnahmen, auf denen der gesamte obere Gelenkspalt und beide Malleolen beurteilbar sind.',
      rows: [
        ['a.-p. / Mortise', '15–20° Innenrotation', 'Gelenkgabel, medialer und superiorer Gelenkspalt, Syndesmose'],
        ['Seitlich', 'Talus und distale Tibia überlagert', 'Hinterkante, Talusstellung, Gelenkerguss, dorsale Fragmente'],
        ['Zusatzaufnahme', 'je nach Klinik, z. B. prox. Fibula bei Druckschmerz (Maisonneuve?), Belastungsaufnahme bei Außenbandinstabilität, Fuß wenn mitbetroffen', ''],
      ],
      headers: ['Aufnahme', 'Technik', 'Beurteilung'],
      key: 'Mortise-View: 15–20° Innenrotation – Fibula darf die Gelenkgabel nicht überlagern.',
    },
    analysis: {
      title: 'Systematische Bildanalyse',
      lead: 'Eine feste Reihenfolge verhindert, dass kleine Malleolarfragmente oder eine instabile Syndesmosenverletzung übersehen werden.',
      items: [
        { title: '1. Alignment', text: 'Taluszentrierung in der Malleolengabel, Gelenkkongruenz und mögliche Luxation oder Subluxation prüfen.' },
        { title: '2. Knochen', text: 'Außenknöchel, Innenknöchel und Hinterkante der Tibia vollständig verfolgen; Talus und angrenzenden Fuß mitbeurteilen.' },
        { title: '3. Gelenkspalt', text: 'Medialen, superioren und lateralen Gelenkspalt vergleichen. Eine asymmetrische Aufweitung spricht für Instabilität.' },
        { title: '4. Syndesmose', text: 'Tibiofibulären Abstand und Überlappung beurteilen; bei Verdacht immer die proximale Fibula klinisch und bildgebend einbeziehen.' },
      ],
      cave: 'Eine isoliert wirkende Innenknöchel- oder Hinterkantenfraktur kann Teil einer komplexeren Rotationsverletzung sein. Die gesamte Verletzungskette muss gesucht werden.',
    },
    weber: {
      title: 'Weber-Klassifikation',
      lead: 'Die Weber-Klassifikation ordnet die Fibulafraktur nach ihrer Höhe relativ zur distalen Tibiofibularsyndesmose ein.',
      imageAlt: 'Weber-Klassifikation der Sprunggelenkfrakturen mit Weber A, B und C',
      rows: [
        ['Weber A', 'unterhalb der Syndesmose', 'Syndesmose meist intakt; häufig stabil, mediale Verletzung ausschließen'],
        ['Weber B', 'auf Höhe der Syndesmose', 'Syndesmose oft teilweise verletzt; Stabilität variabel'],
        ['Weber C', 'oberhalb der Syndesmose', 'Syndesmose typischerweise verletzt; häufig instabil, proximale Fibula prüfen'],
      ],
      headers: ['Typ', 'Frakturhöhe', 'Bedeutung'],
      key: 'Weber beschreibt primär die Frakturhöhe. Für die Therapie ist zusätzlich entscheidend, ob Talus, medialer Bandapparat und Syndesmose stabil sind.',
    },
    stability: {
      title: 'Stabilitätsbeurteilung',
      lead: 'Die Stabilität wird nicht allein aus dem Weber-Typ abgeleitet. Entscheidend ist, ob der Talus kongruent in der Gelenkgabel geführt wird.',
      rows: [
        ['Medialer Gelenkspalt', 'Aufweitung oder Taluskippung', 'Hinweis auf Innenknöchel- oder Deltoidbandverletzung'],
        ['Syndesmose', 'vermehrter tibiofibulärer Abstand / verminderte Überlappung', 'Hinweis auf Diastase'],
        ['Hinterkante', 'Fragmentgröße, Stufe und Gelenkflächenbeteiligung', 'relevant für Stabilität und OP-Planung'],
        ['Proximale Fibula', 'Fraktur bei Syndesmosenverletzung', 'Maisonneuve-Verletzung'],
      ],
      headers: ['Struktur', 'Warnzeichen', 'Konsequenz'],
      cave: 'Weber B kann stabil oder instabil sein. Eine mediale Aufweitung oder Talusfehlstellung macht die Verletzung behandlungsrelevant instabil.',
      key: 'Nicht nur die Fraktur beschreiben: Gelenkgabel kongruent? Syndesmose weit? Mediale Verletzung? Hinterkante beteiligt?',
    },
    specialForms: {
      title: 'Spezielle Frakturmuster erkennen',
      lead: 'Die Morphologie verbindet betroffene Malleolen, Syndesmosenansätze und Verletzungsmechanismus.',
      sourceLabel: 'Quelle',
      headers: ['Muster', 'Komponenten / Morphologie', 'Worauf achten?'],
      rows: [
        ['Bimalleoläre Fraktur', 'Gleichzeitige Fraktur von Außen- und Innenknöchel.', 'Beide Malleolen in der Gelenkgabel verfolgen.'],
        ['Trimalleoläre Fraktur', 'Außenknöchel, Innenknöchel und hintere Tibiakante (posteriorer Malleolus / Volkmann-Fragment).', 'Die hintere Gelenkflächenkomponente gehört zum Muster.'],
        ['Maisonneuve-Verletzung', 'Syndesmosenruptur → kraniale Ruptur der Membrana interossea → hohe proximale Fibulafraktur; zusätzlich Innenknöchelfraktur oder Deltoidbandriss.', 'Die Verletzungskette reicht über das Sprunggelenk hinaus bis zur proximalen Fibula.'],
        ['Pilon-/Plafond-Fraktur', 'Trümmerfraktur der distalen tibialen Gelenkfläche durch axiale Stauchung, wenn der Talus in den tibialen Plafond einschlägt.', 'Axiale Impaktion von Rotationsverletzung unterscheiden.'],
        ['Chaput vs. Volkmann', 'Chaput: Ausriss am anterioren Tuberculum der distalen Tibia am Ansatz des vorderen Syndesmosenbands. Volkmann: Ausriss am posterioren Tuberculum am Ansatz des hinteren Syndesmosenbands.', 'Die Zuordnung folgt dem vorderen versus hinteren Syndesmosenansatz.'],
      ],
      source: 'Quelle: MSK.pdf, PDF-S. 35 (gedruckte S. 34), „Spezielle Frakturformen“. Die Radiographien der Quell-Montage sind hier nicht eingebettet.',
      diagramTitle: 'Schematische Frakturmuster am Sprunggelenk',
      diagramDescription: 'Drei nichtdiagnostische Schemata: vordere und hintere Syndesmosenansätze, axiale Impaktion des Talus gegen den Plafond sowie ein Rotationsmechanismus.',
      diagramNote: 'Konzeptuelle Skizze, keine Röntgenaufnahme.',
      diagrams: [
        'Schematische Ansicht der vorderen und hinteren Syndesmosenansätze am distalen Unterschenkel.',
        'Schematische axiale Impaktion des Talus gegen den tibialen Plafond.',
        'Rotationsmechanismus als Gegenüberstellung zur axialen Impaktion.',
      ],
      checkTitle: 'Muster erkennen',
      checkQuestion: 'Trümmerfraktur des tibialen Plafonds nach axialer Impaktion des Talus: Welches Muster passt?',
      checkOptions: [['pilon', 'Pilon-/Plafond-Fraktur'], ['mais', 'Maisonneuve-Verletzung'], ['bi', 'Bimalleoläre Fraktur']],
      checkCorrect: 'Richtig: Die axiale Impaktion des Talus gegen den Plafond passt zum Pilon-Muster.',
      checkIncorrect: 'Noch nicht: Die beschriebene axiale Impaktion mit Beteiligung des tibialen Plafonds kennzeichnet das Pilon-Muster.',
    },
    ct: {
      title: 'Wann ist eine CT sinnvoll?',
      lead: 'Die CT ergänzt das Röntgen, wenn die knöcherne Verletzung komplex ist oder die operative Planung eine genaue Darstellung der Gelenkfläche erfordert.',
      items: [
        { title: 'Komplexe trimalleoläre Fraktur', text: 'Darstellung von Fragmentzahl, Dislokation und Gelenkflächenstufe.' },
        { title: 'Hinterkantenfragment', text: 'Exakte Größe, Morphologie und incisurale Beteiligung bestimmen.' },
        { title: 'Unklare Gelenkbeteiligung', text: 'Okulte oder überlagerte Frakturen und freie Gelenkkörper erfassen.' },
      ],
      key: 'Die CT ist besonders wertvoll für Hinterkantenfragmente und komplexe Frakturen; sie ersetzt nicht die initiale konventionelle Röntgendiagnostik.',
    },
    caseStudy: {
      title: 'Fallbeispiel',
      lead: 'Echter Radiopaedia-Fall mit zwei Röntgenaufnahmen zum selbstständigen Durchscrollen.',
      caseTitle: 'Maisonneuve-Fraktur',
      label: 'Instabile OSG-Verletzung',
      tags: ['Röntgen', 'Weber C', 'Syndesmose'],
      imageAlt: 'Röntgenaufnahme einer Maisonneuve-Fraktur mit instabilem Sprunggelenk',
      meta: '40-jähriger Patient nach Treppensturz. Die Aufnahmen zeigen eine Aufweitung des medialen Gelenkspalts und eine mehrfragmentäre Fraktur des proximalen Fibuladrittels – vereinbar mit einer Maisonneuve-Fraktur.',
      credit: 'Case courtesy of Fernando Figueredo Savi, Radiopaedia.org · rID: 200431',
      open: 'Fall in Radiopaedia öffnen',
    },
    takehome: {
      title: 'Take home message',
      lead: 'Die wichtigsten Punkte für den Alltag.',
      items: [
        { title: 'Saubere Projektionen', text: 'Mindestens zwei Ebenen; Mortise-View mit frei beurteilbarem gesamten Gelenkspalt.' },
        { title: 'Weber richtig nutzen', text: 'A unterhalb, B auf Höhe und C oberhalb der Syndesmose.' },
        { title: 'Stabilität entscheidet', text: 'Taluszentrierung, medialer Komplex und Syndesmose sind wichtiger als die Frakturhöhe allein.' },
        { title: 'Gesamte Verletzungskette', text: 'Bei Syndesmosenverdacht proximale Fibula und Hinterkante nicht vergessen.' },
      ],
    },
  },
  en: {
    toc: 'Contents',
    breadcrumbMsk: 'Musculoskeletal',
    breadcrumbCurrent: 'Trauma · Ankle',
    title: 'Ankle trauma',
    subtitle: 'Systematic imaging, Weber classification and assessment of stability in ankle fractures',
    sourceLabel: 'Dr. Zia',
    keyLabel: 'Key point',
    caveLabel: 'Caution',
    sections: [
      { id: 'bildgebung', label: 'Imaging', icon: '🩻' },
      { id: 'analyse', label: 'Systematic review', icon: '🔍' },
      { id: 'weber', label: 'Weber classification', icon: '🦴' },
      { id: 'stabilitaet', label: 'Stability', icon: '⚠️' },
      { id: 'sonderformen', label: 'Specific fracture patterns', icon: '🧩' },
      { id: 'ct', label: 'CT indications', icon: '◫' },
      { id: 'fall', label: 'Case', icon: '🧪' },
      { id: 'takehome', label: 'Take home message', icon: '💡' },
    ],
    heroCards: [
      { value: '2 views', label: 'radiography first', text: 'AP/mortise and lateral' },
      { value: '15–20°', label: 'mortise view', text: 'internal rotation opens the joint space' },
      { value: 'Weber A–C', label: 'relation to syndesmosis', text: 'below, at, above' },
    ],
    imaging: {
      title: 'Imaging ankle trauma',
      lead: 'Plain radiographs are the foundation. Correct positioning must show the whole ankle mortise and both malleoli.',
      rows: [
        ['AP / mortise', '15–20° internal rotation', 'mortise, medial and superior clear spaces, syndesmosis'],
        ['Lateral', 'talus and distal tibia aligned', 'posterior malleolus, talar position, effusion, posterior fragments'],
        ['Additional view', 'as clinically indicated, e.g. proximal fibula if tender (Maisonneuve?), stress view for lateral ligament instability, foot if involved', ''],
      ],
      headers: ['View', 'Technique', 'Assessment'],
      key: 'Mortise view: 15–20° internal rotation – fibula must not overlap the ankle mortise.',
    },
    analysis: {
      title: 'Systematic image analysis',
      lead: 'A fixed sequence helps avoid missing small malleolar fragments or an unstable syndesmotic injury.',
      items: [
        { title: '1. Alignment', text: 'Check talar centring, joint congruity and any dislocation or subluxation.' },
        { title: '2. Bones', text: 'Trace the lateral, medial and posterior malleoli; also inspect the talus and adjacent foot.' },
        { title: '3. Joint spaces', text: 'Compare medial, superior and lateral clear spaces. Asymmetric widening suggests instability.' },
        { title: '4. Syndesmosis', text: 'Assess tibiofibular clear space and overlap; include the proximal fibula if injury is suspected.' },
      ],
      cave: 'An apparently isolated medial or posterior malleolar fracture may be part of a more complex rotational injury. Search for the full injury pattern.',
    },
    weber: {
      title: 'Weber classification',
      lead: 'The Weber classification categorises a fibular fracture by its level relative to the distal tibiofibular syndesmosis.',
      imageAlt: 'Weber classification of ankle fractures showing Weber A, B and C',
      rows: [
        ['Weber A', 'below the syndesmosis', 'syndesmosis usually intact; often stable, exclude medial injury'],
        ['Weber B', 'at the syndesmosis', 'syndesmosis may be partly injured; stability varies'],
        ['Weber C', 'above the syndesmosis', 'syndesmosis typically injured; often unstable, inspect proximal fibula'],
      ],
      headers: ['Type', 'Fracture level', 'Meaning'],
      key: 'Weber primarily describes fracture level. Management also depends on stability of the talus, medial structures and syndesmosis.',
    },
    stability: {
      title: 'Assessing stability',
      lead: 'Stability cannot be inferred from the Weber type alone. The key question is whether the talus remains congruent within the mortise.',
      rows: [
        ['Medial clear space', 'widening or talar tilt', 'suggests medial malleolar or deltoid ligament injury'],
        ['Syndesmosis', 'increased tibiofibular clear space / reduced overlap', 'suggests diastasis'],
        ['Posterior malleolus', 'fragment size, step and articular involvement', 'relevant to stability and surgical planning'],
        ['Proximal fibula', 'fracture with syndesmotic injury', 'Maisonneuve injury'],
      ],
      headers: ['Structure', 'Warning sign', 'Implication'],
      cave: 'A Weber B fracture can be stable or unstable. Medial widening or talar malalignment indicates clinically important instability.',
      key: 'Do not only describe the fracture: is the mortise congruent, the syndesmosis widened, the medial side injured, or the posterior malleolus involved?',
    },
    specialForms: {
      title: 'Recognise specific fracture patterns',
      lead: 'Morphology links the involved malleoli, syndesmotic attachments and injury mechanism.',
      sourceLabel: 'Source',
      headers: ['Pattern', 'Components / morphology', 'What to look for'],
      rows: [
        ['Bimalleolar fracture', 'Concurrent fractures of the lateral and medial malleoli.', 'Trace both malleoli around the ankle mortise.'],
        ['Trimalleolar fracture', 'Lateral malleolus, medial malleolus and posterior tibial margin (posterior malleolus / Volkmann fragment).', 'Include the posterior articular component in the pattern.'],
        ['Maisonneuve injury', 'Syndesmotic rupture → proximal tear of the interosseous membrane → high proximal fibular fracture; with an additional medial malleolar fracture or deltoid ligament tear.', 'The injury chain extends beyond the ankle to the proximal fibula.'],
        ['Pilon / plafond fracture', 'Comminuted distal tibial articular-surface fracture from axial impaction as the talus strikes the tibial plafond.', 'Distinguish axial impaction from a rotational injury.'],
        ['Chaput vs Volkmann', 'Chaput: avulsion of the anterior distal tibial tubercle at the anterior syndesmotic ligament attachment. Volkmann: avulsion of the posterior tubercle at the posterior syndesmotic ligament attachment.', 'The distinction follows the anterior versus posterior syndesmotic attachment.'],
      ],
      source: 'Source: MSK.pdf, PDF p. 35 (printed p. 34), “Spezielle Frakturformen”. The radiographs in the source montage are not embedded here.',
      diagramTitle: 'Schematic ankle fracture patterns',
      diagramDescription: 'Three non-diagnostic schematics: anterior and posterior syndesmotic attachments, axial talar impaction against the plafond, and a rotational mechanism.',
      diagramNote: 'Conceptual schematic, not a radiograph.',
      diagrams: [
        'Schematic view of anterior and posterior syndesmotic attachments at the distal leg.',
        'Schematic axial impaction of the talus against the tibial plafond.',
        'Rotational mechanism shown in contrast to axial impaction.',
      ],
      checkTitle: 'Identify the pattern',
      checkQuestion: 'Comminuted tibial plafond fracture after axial talar impaction: which pattern fits?',
      checkOptions: [['pilon', 'Pilon / plafond fracture'], ['mais', 'Maisonneuve injury'], ['bi', 'Bimalleolar fracture']],
      checkCorrect: 'Correct: axial impaction of the talus against the plafond fits the pilon pattern.',
      checkIncorrect: 'Not quite: axial impaction with tibial plafond involvement describes the pilon pattern.',
    },
    ct: {
      title: 'When is CT useful?',
      lead: 'CT complements radiography when the fracture is complex or accurate articular mapping is needed for surgical planning.',
      items: [
        { title: 'Complex trimalleolar fracture', text: 'Define fragment number, displacement and articular step.' },
        { title: 'Posterior malleolar fragment', text: 'Determine exact size, morphology and incisural involvement.' },
        { title: 'Uncertain joint involvement', text: 'Detect occult or superimposed fractures and intra-articular bodies.' },
      ],
      key: 'CT is particularly useful for posterior malleolar fragments and complex fractures; it does not replace initial radiography.',
    },
    caseStudy: {
      title: 'Case',
      lead: 'A real Radiopaedia case with two radiographs to scroll through interactively.',
      caseTitle: 'Maisonneuve fracture',
      label: 'Unstable ankle injury',
      tags: ['X-ray', 'Weber C', 'syndesmosis'],
      imageAlt: 'Radiograph of a Maisonneuve fracture with an unstable ankle',
      meta: '40-year-old man after falling down stairs. The radiographs show widening of the medial ankle joint space and a comminuted fracture of the proximal third of the fibula, consistent with a Maisonneuve fracture.',
      credit: 'Case courtesy of Fernando Figueredo Savi, Radiopaedia.org · rID: 200431',
      open: 'Open case in Radiopaedia',
    },
    takehome: {
      title: 'Take home message',
      lead: 'The essentials for daily reporting.',
      items: [
        { title: 'Good projections', text: 'At least two views; the whole mortise must be visible on the mortise view.' },
        { title: 'Use Weber correctly', text: 'A below, B at and C above the syndesmosis.' },
        { title: 'Stability matters', text: 'Talar centring, medial structures and syndesmosis matter more than fracture level alone.' },
        { title: 'Full injury chain', text: 'With suspected syndesmotic injury, do not forget the proximal fibula and posterior malleolus.' },
      ],
    },
  },
}

CONTENT.fa = {
  ...CONTENT.en,
  toc: 'فهرست مطالب',
  breadcrumbMsk: 'اسکلتی-عضلانی',
  breadcrumbCurrent: 'تروما · مچ پا',
  title: 'ترومای مچ پا',
  subtitle: 'تصویربرداری سیستماتیک، طبقه‌بندی Weber و ارزیابی پایداری شکستگی‌های مچ پا',
  keyLabel: 'نکته مهم',
  caveLabel: 'احتیاط',
  sections: CONTENT.en.sections.map(section => section.id === 'sonderformen' ? { ...section, label: 'الگوهای ویژه شکستگی' } : section),
  specialForms: {
    title: 'الگوهای ویژه شکستگی را بشناسید',
    lead: 'مورفولوژی، قوزک‌های درگیر، محل اتصال سندسموز و مکانیسم آسیب را به هم پیوند می‌دهد.',
    sourceLabel: 'منبع',
    headers: ['الگو', 'اجزا / مورفولوژی', 'نکته‌ای که باید دید'],
    rows: [
      ['شکستگی دو قوزکی', 'شکستگی هم‌زمان قوزک خارجی و داخلی.', 'هر دو قوزک را در امتداد مفصل مچ دنبال کنید.'],
      ['شکستگی سه‌قوزکی', 'قوزک خارجی، قوزک داخلی و لبه خلفی تیبیا (قوزک خلفی / قطعه Volkmann).', 'جزء خلفی سطح مفصلی را در الگو بگنجانید.'],
      ['آسیب Maisonneuve', 'پارگی سندسموز → پارگی کرانیال غشای بین‌استخوانی → شکستگی بالای بخش پروگزیمال فیبولا؛ همراه با شکستگی قوزک داخلی یا پارگی لیگامان دلتوئید.', 'زنجیره آسیب از مچ عبور می‌کند و تا فیبولای پروگزیمال ادامه می‌یابد.'],
      ['شکستگی Pilon / plafond', 'شکستگی خردشده سطح مفصلی انتهای دیستال تیبیا بر اثر فشار محوری، هنگامی که تالوس به سقف تیبیا ضربه می‌زند.', 'فشار محوری را از آسیب چرخشی تفکیک کنید.'],
      ['Chaput در برابر Volkmann', 'Chaput: کندگی تکمه قدامی انتهای دیستال تیبیا در محل اتصال لیگامان قدامی سندسموز. Volkmann: کندگی تکمه خلفی در محل اتصال لیگامان خلفی سندسموز.', 'تفاوت بر اساس محل اتصال قدامی در برابر خلفی سندسموز است.'],
    ],
    source: 'منبع: MSK.pdf، صفحه PDF شماره ۳۵ (صفحه چاپی ۳۴)، «Spezielle Frakturformen». رادیوگرافی‌های مونتاژ منبع در اینجا درج نشده‌اند.',
    diagramTitle: 'الگوهای شماتیک شکستگی مچ پا',
    diagramDescription: 'سه شماتیک غیرتشخیصی: اتصال‌های قدامی و خلفی سندسموز، فشار محوری تالوس بر plafond و مکانیسم چرخشی.',
    diagramNote: 'شماتیک مفهومی است و رادیوگرافی نیست.',
    diagrams: [
      'نمای شماتیک اتصال‌های قدامی و خلفی سندسموز در بخش دیستال ساق.',
      'شماتیک فشار محوری تالوس بر سطح مفصلی انتهای دیستال تیبیا.',
      'مکانیسم چرخشی در مقایسه با فشار محوری.',
    ],
    checkTitle: 'الگو را تشخیص دهید',
    checkQuestion: 'شکستگی خردشده سطح مفصلی تیبیا پس از برخورد محوری تالوس: کدام الگو مناسب است؟',
    checkOptions: [['pilon', 'شکستگی Pilon / plafond'], ['mais', 'آسیب Maisonneuve'], ['bi', 'شکستگی دو قوزکی']],
    checkCorrect: 'درست است: فشار محوری تالوس به plafond با الگوی Pilon سازگار است.',
    checkIncorrect: 'هنوز نه: فشار محوری همراه درگیری سطح مفصلی انتهای دیستال تیبیا، الگوی Pilon را توصیف می‌کند.',
  },
}

const READ_COPY = {
  de: { mark: 'Als gelesen markieren', read: 'Als gelesen markiert', error: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.', signIn: 'Anmelden' },
  en: { mark: 'Mark as read', read: 'Marked as read', error: 'Please sign in to save your learning progress.', signIn: 'Sign in' },
  fa: { mark: 'علامت‌گذاری به‌عنوان خوانده‌شده', read: 'به‌عنوان خوانده‌شده علامت‌گذاری شد', error: 'برای ذخیره پیشرفت یادگیری لطفاً وارد شوید.', signIn: 'ورود' },
}

export function getPatternCheckFeedback(answer, copy) {
  if (!answer) return null
  return answer === 'pilon' ? copy.specialForms.checkCorrect : copy.specialForms.checkIncorrect
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
      <strong>{type === 'cave' ? '⚠️' : '💡'} {label}</strong>
      <p>{children}</p>
    </div>
  )
}

function CaseImages({ copy }) {
  return (
    <div className={styles.caseImages}>
      {[1, 2].map((number) => (
        <figure className={styles.caseImage} key={number}>
        <Image
            src={`/sprunggelenk/case-200431-sequence/${String(number).padStart(2, '0')}.jpeg`}
            alt={`${copy.imageAlt} – ${number}`}
          width={932}
          height={2169}
          className={styles.caseImageAsset}
        />
        </figure>
      ))}
    </div>
  )
}

function PatternDiagram({ copy }) {
  return (
    <figure className={styles.patternDiagram}>
      <svg viewBox="0 0 720 190" role="img" aria-labelledby="ankle-pattern-diagram-title ankle-pattern-diagram-desc">
        <title id="ankle-pattern-diagram-title">{copy.specialForms.diagramTitle}</title>
        <desc id="ankle-pattern-diagram-desc">{copy.specialForms.diagramDescription}</desc>
        <g fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M85 22v72l-22 18m22-18 22 18M175 22v72l-22 18m22-18 22 18" />
          <path d="M310 24h64v66l-12 14h-40l-12-14zM315 116q27-28 54 0l-7 30h-40z" />
          <path d="M520 24h62v69l-10 14h-42l-10-14zM525 116q27-28 54 0l-7 30h-40z" />
        </g>
        <g fill="none" stroke="#f97316" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M63 109L85 94l22 15M153 109l22-15 22 15" />
          <path d="M343 148v-28m-10 12 10-12 10 12" />
          <path d="M495 73a47 47 0 0 1 68-42m-12-6 13 5-4 14" />
        </g>
      </svg>
      <figcaption className={styles.patternDiagramCaptions}>
        {copy.specialForms.diagrams.map((caption, index) => <span key={index}>{caption}</span>)}
      </figcaption>
      <small>{copy.specialForms.diagramNote}</small>
    </figure>
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
      {open && <div className={styles.sectionBody}>{lead && <p className={styles.lead}>{lead}</p>}{children}</div>}
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

export default function SprunggelenkTraumaPage() {
  const { lang } = useLanguage()
  const copy = CONTENT[lang] || CONTENT.de
  const isRTL = lang === 'fa'
  const [activeId, setActiveId] = useState(copy.sections[0].id)
  const { isRead, toggleRead, authError } = useLessonReadStatus('osg-fraktur')
  const [patternAnswer, setPatternAnswer] = useState(null)
  const withLang = href => lang === 'de' ? href : (href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`)
  const sectionIds = useMemo(() => copy.sections.map(section => section.id), [copy.sections])

  useEffect(() => {
    const observers = sectionIds.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActiveId(id)
      }, { rootMargin: '-18% 0px -72% 0px', threshold: 0.01 })
      observer.observe(el)
      return observer
    })
    return () => observers.forEach(observer => observer?.disconnect())
  }, [sectionIds])

  return (
    <main className={styles.page} dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
      <InProgressBanner lang={lang} />
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href={withLang('/')}>RadYar</Link><span>›</span>
          <Link href={withLang('/lernen/msk')}>{copy.breadcrumbMsk}</Link><span>›</span>
          <span>{copy.breadcrumbCurrent}</span>
        </div>
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.sourceBadge}>{copy.sourceLabel}</span>
            <h1>{copy.title}</h1>
            <p>{copy.subtitle}</p>
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

      <div className={styles.readBar}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError} /></div>

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
          <Section id="bildgebung" title={copy.imaging.title} lead={copy.imaging.lead}>
            <Table headers={copy.imaging.headers} rows={copy.imaging.rows} />
            <Callout label={copy.keyLabel}>{copy.imaging.key}</Callout>
          </Section>

          <Section id="analyse" title={copy.analysis.title} lead={copy.analysis.lead}>
            <Cards items={copy.analysis.items} />
            <Callout type="cave" label={copy.caveLabel}>{copy.analysis.cave}</Callout>
          </Section>

          <Section id="weber" title={copy.weber.title} lead={copy.weber.lead}>
            <figure className={styles.weberFigure}>
              <Image
                src="/sprunggelenk/weber-klassifikation.png"
                alt={copy.weber.imageAlt}
                width={652}
                height={302}
                sizes="(max-width: 980px) calc(100vw - 64px), 850px"
                priority
              />
            </figure>
            <Table headers={copy.weber.headers} rows={copy.weber.rows} />
            <Callout label={copy.keyLabel}>{copy.weber.key}</Callout>
          </Section>

          <Section id="stabilitaet" title={copy.stability.title} lead={copy.stability.lead}>
            <Table headers={copy.stability.headers} rows={copy.stability.rows} />
            <Callout type="cave" label={copy.caveLabel}>{copy.stability.cave}</Callout>
            <Callout label={copy.keyLabel}>{copy.stability.key}</Callout>
          </Section>

          <Section id="sonderformen" title={copy.specialForms.title} lead={copy.specialForms.lead}>
            <PatternDiagram copy={copy} />
            <Table headers={copy.specialForms.headers} rows={copy.specialForms.rows} />
            <Callout label={copy.specialForms.sourceLabel}>{copy.specialForms.source}</Callout>
            <section className={styles.patternCheck} aria-labelledby="ankle-pattern-check-title">
              <h3 id="ankle-pattern-check-title">{copy.specialForms.checkTitle}</h3>
              <p>{copy.specialForms.checkQuestion}</p>
              <div className={styles.patternOptions}>
                {copy.specialForms.checkOptions.map(([id, label]) => (
                  <button key={id} type="button" aria-pressed={patternAnswer === id} onClick={() => setPatternAnswer(id)}>{label}</button>
                ))}
              </div>
              <div role="status" aria-live="polite" aria-atomic="true">
                {getPatternCheckFeedback(patternAnswer, copy) && <p className={styles.patternFeedback}>{getPatternCheckFeedback(patternAnswer, copy)}</p>}
              </div>
            </section>
          </Section>

          <Section id="ct" title={copy.ct.title} lead={copy.ct.lead}>
            <Cards items={copy.ct.items} />
            <Callout label={copy.keyLabel}>{copy.ct.key}</Callout>
          </Section>

          <Section id="fall" title={copy.caseStudy.title} lead={copy.caseStudy.lead}>
            <div className={styles.caseGrid}>
              <article className={styles.caseCardLink}>
                <CaseImages copy={copy.caseStudy} />
                <div className={styles.caseBody}>
                  <div className={styles.caseLabelRow}>
                    <span className={styles.caseLabel}>{copy.caseStudy.label}</span>
                    {copy.caseStudy.tags.map(tag => <span key={tag} className={styles.caseLabel}>{tag}</span>)}
                  </div>
                <h3>{copy.caseStudy.caseTitle}</h3>
                <p>{copy.caseStudy.meta}</p>
                <small>{copy.caseStudy.credit}</small>
                  <a href={CASE_URL} target="_blank" rel="noopener noreferrer" className={styles.caseExternalLink}>{copy.caseStudy.open} ↗</a>
                </div>
              </article>
            </div>
          </Section>

          <Section id="takehome" title={copy.takehome.title} lead={copy.takehome.lead}>
            <div className={styles.takeHomeGrid}>
              {copy.takehome.items.map((item, index) => (
                <div className={styles.takeHomeItem} key={item.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div><h3>{item.title}</h3><p>{item.text}</p></div>
                </div>
              ))}
            </div>
          </Section>

          <div className={styles.readBarBottom}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError} /></div>
        </div>
      </div>
    </main>
  )
}
