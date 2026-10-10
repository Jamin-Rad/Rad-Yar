'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { usePersistedSectionProgress } from '@/hooks/usePersistedSectionProgress'
import { TEAR_CASE_FRAMES } from './tearCaseFrames'
import LessonCaseFile from '@/components/LessonCaseFile'
import MeniscusTextLesson from '@/app/andarun/test/MeniscusTextLesson'
import TearTypeExplorer from './TearTypeExplorer'
import LotyschClassification from './LotyschClassification'
import template from '@/components/LessonTemplate.module.css'
import contentStyles from './content.module.css'

const TEMPLATE_CLASS_MAP = {
  page: 'page', header: 'header', topline: 'topline', breadcrumb: 'breadcrumb',
  author: 'author', heroGrid: 'hero', heroText: 'heroCopy', heroActions: 'actions',
  learnActionMcq: 'primaryAction', learnActionFlash: 'secondaryAction', takeHomeJump: 'takeHomeJump',
  lessonProgress: 'progressBar', progressTrack: 'progressTrack', progressActions: 'progressActions',
  lessonCompleteButton: 'lessonCompleteButton', lessonCompleteButtonDone: 'lessonCompleteButtonDone', continueButton: 'continueButton',
  layout: 'layout', sidebar: 'sidebar', sideItemActive: 'activeSideItem', sideIcon: 'sideIcon', main: 'lesson',
  tableWrap: 'teachingTableWrap', table: 'teachingTable', sectionLead: 'lead',
  callout: 'rememberNote', cave: 'warning', calloutLabel: 'calloutLabel', calloutBody: 'calloutBody',
  takeHomeSection: 'takeHomeSection', sectionReadButton: 'readButton', sectionReadButtonDone: 'readButtonDone',
}
const UNSTYLED_CLASSES = new Set(['learnAction', 'breadLink', 'sideTitle', 'sideNav', 'sideItem', 'sideItemImportant', 'note'])
const styles = new Proxy({}, {
  get: (_target, prop) => UNSTYLED_CLASSES.has(prop) ? '' : template[TEMPLATE_CLASS_MAP[prop] || prop] || contentStyles[prop] || '',
})

const SECTION_ICON_PATHS = {
  anatomie: 'M4 12h16 M7 7c2 2 2 8 5 10 M17 7c-2 2-2 8-5 10 M8 4v3 M16 4v3',
  mrt: 'M5 3h14v18H5z M8 7h8 M8 11h5 M8 15h8',
  grading: 'M5 19V9 M12 19V5 M19 19v-7 M3 19h18',
  risstypen: 'M5 4h6l-2 6 5 2-3 8h8 M17 4l-2 5',
  discoider: 'M4 12c3-7 13-7 16 0-3 7-13 7-16 0z M7 12c2-3 8-3 10 0',
  therapie: 'M6 4v6a6 6 0 0 0 12 0V4 M9 4v5 M15 4v5 M12 16v5',
  fallbeispiele: 'M8 3h8 M9 3v5l-4 8a3 3 0 0 0 3 5h8a3 3 0 0 0 3-5l-4-8V3 M7 16h10',
  lernvideo: 'M4 5h16v14H4z M10 9l5 3-5 3z',
  takehome: 'M9 18h6 M10 22h4 M8 14c-1-1-2-3-2-5a6 6 0 1 1 12 0c0 2-1 4-2 5-1 1-1 2-1 4H9c0-2 0-3-1-4z',
  flashcards: 'M7 4h11v15H7z M4 7h3v13h10v-1',
  quiz: 'M12 3l8 4v5c0 5-3 8-8 10-5-2-8-5-8-10V7z M9 12l2 2 4-5',
  check: 'M5 12l4 4L19 6',
  note: 'M12 3a6 6 0 0 0-4 10c1 1 1 2 1 4h6c0-2 0-3 1-4a6 6 0 0 0-4-10z M9 21h6',
  cave: 'M12 3L2 21h20z M12 9v5 M12 17v1',
}

function SectionIcon({ id, className = '' }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={SECTION_ICON_PATHS[id] || SECTION_ICON_PATHS.mrt} /></svg>
}

const TEAR_CASES = [
  { id: 'longitudinal', caseId: 59153, study: 'https://radiopaedia.org/cases/59153/studies/66472', contributor: 'Henry Knipe', sequence: 'Sagittal · PD fat sat', initialFrame: 16, frames: TEAR_CASE_FRAMES.longitudinal },
  { id: 'radial', caseId: 160533, study: 'https://radiopaedia.org/cases/160533/studies/131329', contributor: 'Yahya Baba', sequence: 'Axial · PD fat sat', initialFrame: 26, frames: TEAR_CASE_FRAMES.radial },
  { id: 'horizontal', caseId: 146646, study: 'https://radiopaedia.org/cases/146646/studies/122223', contributor: "Seamus O'Flaherty", sequence: 'Sagittal · PD fat sat', initialFrame: 13, frames: TEAR_CASE_FRAMES.horizontal },
  { id: 'bucket', caseId: 29250, study: 'https://radiopaedia.org/cases/29250/studies/29664', contributor: 'Muhammad Essam', sequence: 'Sagittal · PD', initialFrame: 15, frames: TEAR_CASE_FRAMES.bucket },
  { id: 'flap', caseId: 17834, study: 'https://radiopaedia.org/cases/17834/studies/17601', contributor: 'Roberto Schubert', sequence: 'Coronal · STIR', initialFrame: 7, frames: TEAR_CASE_FRAMES.flap },
]

const CONTENT = {
  de: {
    toc: 'Lernpfad',
    breadcrumbMsk: 'Muskuloskelettales',
    breadcrumbCurrent: 'Knie · Meniskus',
    title: 'Meniskus',
    subtitle: 'Grundlagen, Anatomie, MRT-Diagnostik und sichere Risskriterien',
    sourceLabel: 'Dr. Zia',
    keyLabel: 'Merke',
    caveLabel: 'CAVE',
    mcqTitle: 'MCQs zum Meniskus',
    mcqDesc: 'Passende Prüfungsfragen zu Anatomie, MRT-Grading und Rissdiagnostik.',
    mcqCta: 'MCQs starten',
    actionMcq: 'MCQ',
    actionFall: 'Fallbeispiele',
    actionFallStatus: '2 Fälle',
    actionFlash: 'Flashcards',
    openCase: 'Bild direkt in Radiopaedia öffnen',
    zoomImage: 'Bild vergrößern',
    aiImageNotice: 'KI-generierte Orientierungsgrafik. Einzelne Details können ungenau sein; nicht als diagnostische Quelle verwenden.',
    closePreview: 'Vorschau schließen',
    sections: [
      { id: 'anatomie', label: 'Anatomie und Vaskularisation', icon: '🦴' },
      { id: 'mrt', label: 'MRT-Diagnostik und Risskriterien', icon: '🩻' },
      { id: 'grading', label: 'Lotysch-Klassifikation', icon: '📊' },
      { id: 'risstypen', label: 'Risstypen', icon: '🧩' },
      { id: 'discoider', label: 'Discoider Meniskus', icon: '🔵' },
      { id: 'therapie', label: 'Therapieprinzip', icon: '🧵' },
      { id: 'lernvideo', label: 'Lernvideo', icon: '▶️' },
    ],
    heroCards: [
      { value: '2 Schichten', label: 'Two-slice-touch-Regel', text: 'Oberflächenkontakt muss auf mindestens zwei aufeinanderfolgenden Schichten sichtbar sein.' },
      { value: 'Nur Grad 3', label: 'sicherer Meniskusriss', text: 'Erst ein Signal mit eindeutigem Kontakt zur Gelenkfläche erfüllt die Kriterien eines echten Risses.' },
      { value: 'Erhalt', label: 'Save the Meniscus', text: 'Wenn möglich reparieren und Meniskusgewebe bewahren statt resezieren.' },
    ],
    basics: {
      title: 'Kniegelenk · Meniskus · Grundlagen',
      lead: 'Die Menisken sind fibrocartilaginäre Strukturen zwischen Femurkondylen und Tibiaplateau. Es gibt zwei Menisken: den Innenmeniskus und den Außenmeniskus. Beide verbessern die Gelenkkongruenz, verteilen die Last und wirken als Stoßdämpfer. Für die MRT-Befundung sind Form, Fixierung, Durchblutung und Oberflächenkontakt des Signals entscheidend.',
      bullets: [
        'Innenmeniskus: C-förmig, kapsel- und MCL-fixiert, deutlich weniger mobil.',
        'Außenmeniskus: eher O-förmig, nicht an das laterale Kollateralband fixiert, beweglicher.',
        'Die tibiale Verankerung erfolgt über Meniskuswurzeln am Vorder- und Hinterhorn.',
      ],
    },
    anatomy: {
      title: 'Anatomie und Vaskularisation',
      lead: 'Die Menisken sind faserknorpelige Strukturen zwischen den Femurkondylen und dem Tibiaplateau. Es gibt zwei Menisken: den Innenmeniskus und den Außenmeniskus. Sie verbessern die Gelenkkongruenz, verteilen die Last und wirken als Stoßdämpfer.',
      tableHeaders: ['Merkmal', 'Innenmeniskus', 'Außenmeniskus'],
      tableRows: [
        ['Form', 'C-förmig', 'eher O-förmig'],
        ['Fixierung', 'fest mit Gelenkkapsel und medialem Seitenband verwachsen', 'nicht mit den lateralen Bändern fixiert'],
        ['Mobilität', 'wenig beweglich', 'mobiler und dadurch weniger verletzungsanfällig'],
        ['Risshäufigkeit', 'etwa zwei Drittel aller Meniskusrisse', 'seltener betroffen'],
        ['Häufigste Lokalisation', 'Hinterhorn in ca. 98 %', 'Hinterhorn in ca. 50 %, Rest in Corpus und Vorderhorn'],
      ],
      rootsTitle: 'Anschlüsse und Meniskuswurzeln',
      rootsText: 'Die Anschlüsse sollten getrennt betrachtet werden: femoral als Gleitkontakt zu den Femurkondylen und tibial als feste Verankerung über die Meniskuswurzeln.',
      rootsItems: [
        { title: 'Femoro-meniskaler Kontakt', text: 'Die Menisken artikulieren mit den Femurkondylen; ihre proximale Oberfläche ist konvex.' },
        { title: 'Tibiale Verankerung', text: 'Die feste Verankerung am Tibiaplateau erfolgt über die Meniskuswurzeln am Vorder- und Hinterhorn jedes Meniskus.' },
      ],
      imageCaption: 'Schematische Übersicht der Meniskuswurzeln: Vorderhorn, Corpus und Hinterhorn.',
      key: 'Die verminderte Beweglichkeit des Innenmeniskus ist der wichtigste Grund, warum er deutlich verletzungsanfälliger ist.',
    },
    vascular: {
      title: 'Vaskularisation und Heilungspotenzial',
      lead: 'Die Blutversorgung erfolgt nur kapselnah über den perimeniskalen Plexus. Von peripher nach zentral nimmt die Durchblutung ab. Daraus ergibt sich direkt die Heilungschance.',
      zones: [
        { name: 'Rote Zone · Zone I', range: '< 3 mm von der Kapsel', status: 'gut durchblutet', therapy: 'beste Nahtchance' },
        { name: 'Rot-weiße Zone · Zone II', range: '3–5 mm von der Kapsel', status: 'eingeschränkte Durchblutung', therapy: 'Naht individuell abwägen' },
        { name: 'Weiße Zone · Zone III', range: 'zentral gelegen', status: 'avaskulär', therapy: 'keine relevante Heilungstendenz' },
      ],
      tableHeaders: ['Zone', 'Lage', 'Durchblutung'],
      tableRows: [
        ['Rote Zone', '< 3 mm von der Kapsel', 'gut'],
        ['Rot-weiße Zone', '3–5 mm von der Kapsel', 'eingeschränkt'],
        ['Weiße Zone', 'zentral', 'avaskulär'],
      ],
      key: 'Je näher der Riss an der Kapsel liegt, desto besser ist das Heilungspotenzial.',
    },
    mri: {
      title: 'MRT-Diagnostik und sichere Risskriterien',
      lead: 'Die MRT-Diagnostik des Meniskus basiert auf einem dünnschichtigen Knieprotokoll und flüssigkeitssensitiven Sequenzen.',
      protocol: [
        { name: 'T1-Wichtung', text: 'Anatomische Übersicht und Beurteilung chronischer Fibrose.' },
        { name: 'T2-w / PD-fs', text: 'Nachweis von Rissen, Knochenödemen und Kontinuitätsunterbrechungen der Bänder.' },
      ],
      normalTitle: 'Normalbefund',
      normalText: 'Der gesunde Meniskus stellt sich homogen hypointens dar. In der sagittalen Ansicht besitzt er eine typische dreieckige Struktur.',
    },
    grading: {
      title: 'Lotysch-Klassifikation',
      lead: 'Die Klassifikation nach Lotysch hilft, degenerative intrameniskale Signalveränderungen von einem echten Meniskusriss zu unterscheiden.',
      lotyschTitle: 'Einfaches Modell: Grad 0 bis III',
      simpleHeaders: ['Grad', 'MRT-Signal', 'Histologie', 'Klinisch'],
      simpleRows: [
        ['0', 'Homogen hypointens', 'Normales Faserknorpelgewebe', 'Kein Befund'],
        ['I', 'Fokales Signal, kein Oberflächenkontakt', 'Myxoide Degeneration, fokal', 'Inzidentell, kein Riss'],
        ['II', 'Linienförmiges Signal, kein Oberflächenkontakt', 'Myxoide Degeneration, diffus', 'Kein Riss, Vorläuferläsion'],
        ['III', 'Signal erreicht Gelenkoberfläche', 'Riss vorhanden', '✅ Echter Meniskusriss'],
      ],
      extendedTitle: 'Lotysch-Klassifikation',
      tableHeaders: ['Grad', 'Morphologie', 'Oberflächenkontakt', 'Klinische Bedeutung'],
      tableRows: [
        ['1', 'punktförmige oder kleine fokale Signalsteigerung', 'kein Kontakt', 'frühe mukoide Degeneration, meist asymptomatisch'],
        ['2a', 'lineare Signalsteigerung', 'kein Kontakt', 'kein sicherer Rissnachweis'],
        ['2b', 'lineare Signalsteigerung', 'Kontakt auf einem einzelnen Bild', 'inkonklusiv für echten Riss'],
        ['2c', 'keilförmige oder globuläre Signalsteigerung', 'kein eindeutiger Kontakt', 'hohes Risiko für okkulten Riss'],
        ['3', 'Pathologische Signalsteigerung', 'Kontakt auf mindestens zwei aufeinanderfolgenden Schichten', 'radiologisch gesicherter Meniskusriss'],
      ],
      key: 'Nur Grad III ist ein echter Riss.',
    },
    tear: {
      title: 'MRT-Kriterien für einen Meniskusriss',
      lead: 'Für die Diagnose „Meniskusriss“ müssen verbindliche Kriterien erfüllt sein. Dadurch lassen sich Sensitivität und Spezifität deutlich verbessern.',
      cave: 'Ein reiner intrameniskaler Signalanstieg reicht nicht aus, um einen Meniskusriss sicher zu diagnostizieren.',
      criteria: [
        { title: 'Kontakt zum Gelenkflächenrand', text: 'Das pathologisch erhöhte Signal erreicht die superiore oder inferiore Meniskusoberfläche.' },
        { title: 'Deformität', text: 'Die normale dreieckige Meniskuskonfiguration ist verloren oder deutlich verändert.' },
        { title: 'Two-slice-touch-Regel', text: 'Die Läsion ist auf mindestens zwei aufeinanderfolgenden Schichten mit Oberflächenkontakt erkennbar.' },
      ],
    },
    tearTypes: {
      title: 'Risstypen',
      lead: 'Rissgeometrie und Lokalisation bestimmen die OP-Strategie und sind prüfungsrelevant.',
      caseIntro: 'Fünf echte MRT-Sequenzen: Mit Mausrad, Pfeiltasten oder Regler durch die Schichten blättern; auf dem Handy seitlich wischen.',
      caseOpen: 'Originalfall auf Radiopaedia ↗',
      caseItems: {
        longitudinal: { title: 'Längsriss', sign: 'Vertikale, zur Meniskusperipherie parallele Risslinie.' },
        radial: { title: 'Radiärriss', sign: 'Kompletter radiärer Riss der medialen Hinterwurzel, axial dargestellt.' },
        horizontal: { title: 'Horizontalriss', sign: 'Horizontalriss an Corpus und Hinterhorn des Innenmeniskus; begleitende ACL-Läsion.' },
        bucket: { title: 'Korbhenkelriss', sign: 'Disloziertes Fragment mit Doppel-PCL- und fehlendem Bow-tie-Zeichen.' },
        flap: { title: 'Lappenriss', sign: 'Nach inferior verlagerter Meniskuslappen im medialen Kompartiment.' },
      },
      tableHeaders: ['Risstyp', 'Geometrie', 'MRT-Zeichen', 'Therapie'],
      tableRows: [
        ['Längsriss', 'parallel zur Peripherie', 'Doppellinien-Zeichen sagittal', 'Naht in der roten oder rot-weißen Zone'],
        ['Radiärriss', 'senkrecht zur Peripherie', 'Cleft-Zeichen, Phantom-Meniskus', 'Resektion oder Naht, je nach Lokalisation'],
        ['Horizontalriss', 'parallel zum Tibiaplateau', 'Spaltbildung, ggf. parameniskale Zyste', 'Resektion ± Zystenexzision'],
        ['Korbhenkelriss', 'dislozierter doppelter Längsriss', 'Doppeltes PCL-Zeichen; kein Bow-tie-Zeichen', 'Reposition und Naht, Notfall bei Blockade'],
        ['Lappenriss', 'instabiler Lappen mit peripherer Anheftung', 'signalreicher, verlagerbarer Lappen', 'sparsame Resektion des Lappens'],
      ],
      caveTitle: 'CAVE – Korbhenkelriss',
      caveText: 'Doppel-PCL- und fehlendes Bow-tie-Zeichen können auf einen Korbhenkelriss hinweisen. Das dislozierte Fragment direkt nachweisen. Bei mechanisch blockiertem Knie ist eine dringliche orthopädische Beurteilung erforderlich.',
    },
    cases: {
      title: 'Fallbeispiele',
      lead: 'Mit Mausrad oder Slider direkt durch die gezeigte MRT-Sequenz blättern.',
      items: [
        {
          title: 'Keilförmig/globuläres Signal ohne sicheren Oberflächenkontakt',
          label: 'Grad 2c',
          tags: ['Discoider Meniskus'],
          meta: 'PD-Wichtung · sagittal · mukoide Degeneration · hohes Risiko für okkulten Riss',
          sequence: 'Sagittal · PD fat sat',
          caseId: 'case-75168',
          frameCount: 18,
          frameExt: 'jpeg',
          initialFrame: 8,
          url: 'https://radiopaedia.org/cases/75168/studies/86248#t=im&v1i=52196174&v1z=1&v2i=52196277&v2z=1&v3i=52196234&v3z=1&v4i=52196213&v4z=1',
          credit: 'Case courtesy of Ammar Haouimi, Radiopaedia.org · rID: 75168',
        },
        {
          title: 'Lineares Signal mit Oberflächenkontakt auf nur einer Schicht',
          label: 'Grad 2b',
          tags: ['Discoider Meniskus'],
          meta: 'STIR · koronal · inkonklusiv · kein sicherer Grad-3-Riss',
          sequence: 'Koronal · STIR',
          caseId: 'case-14060-coronal-stir',
          frameCount: 7,
          frameExt: 'jpg',
          initialFrame: 3,
          url: 'https://radiopaedia.org/cases/14060/studies/13900#t=im&v1i=1118538&v1z=1&v2i=1118592&v2z=1',
          credit: 'Case courtesy of Roberto Schubert, Radiopaedia.org · rID: 14060',
        },
      ],
      key: 'Fallbeispiele sind besonders hilfreich, weil nicht jede intrameniskale Signalsteigerung automatisch ein Meniskusriss ist.',
    },
    discoid: {
      title: 'Discoider Meniskus',
      lead: 'Der discoide Meniskus ist eine angeborene anatomische Variante mit übermäßig breitem, scheibenförmigem Meniskuskörper. Er betrifft fast ausschließlich den Außenmeniskus und reißt häufiger als ein normal geformter Meniskus.',
      stats: [
        { value: '3–5 %', label: 'Inzidenz', text: 'häufig Zufallsbefund im Knie-MRT' },
        { value: '~50 %', label: 'bilateral', text: 'nicht selten beidseitig vorhanden' },
        { value: 'Außen', label: 'Meniskus', text: 'fast ausschließlich der Außenmeniskus betroffen' },
      ],
      overviewHeaders: ['Parameter', 'Wert'],
      overviewRows: [
        ['Betroffener Meniskus', 'fast ausschließlich Außenmeniskus'],
        ['Seitenverteilung', 'bilateral in etwa 50 % der Fälle'],
        ['Geschlecht', 'keine klare Präferenz'],
        ['Prävalenz', 'höher in asiatischen Populationen beschrieben'],
        ['Rissrisiko', 'erhöht gegenüber normalem Meniskus'],
      ],
      childTitle: 'Klinisches Leitsymptom bei Kindern',
      childText: 'Knieschnappen oder ein „Snapping Knee“ bei Kindern sollte an einen discoiden Außenmeniskus denken lassen.',
      mriTitle: 'MRT-Kriterien',
      mriHeaders: ['Ebene', 'Kriterium', 'Schwellenwert'],
      mriRows: [
        ['Koronal', 'absolute Meniskusbreite', '≥ 15 mm'],
        ['Koronal', 'Meniskusbreite / maximale Tibiabreite', '> 20 %'],
        ['Sagittal', 'kontinuierliche Corpus-Darstellung', 'auf ≥ 3 aufeinanderfolgenden Standardschichten'],
      ],
      sagittalTitle: 'Sagittales Zeichen',
      sagittalText: 'Das sagittale Kriterium entspricht dem Gegenteil des Absent-Bow-Tie-Signs: Ein normaler Meniskus zeigt den Corpus nur auf 1–2 Schichten, der discoide Meniskus auf mindestens 3 Schichten.',
      treatmentHeaders: ['Situation', 'Vorgehen'],
      treatmentRows: [
        ['asymptomatischer Zufallsbefund', 'konservativ, keine Intervention nötig'],
        ['symptomatisch ohne Riss', 'konservativ; bei Versagen arthroskopische Saucerisation'],
        ['discoider Meniskus mit Riss', 'Meniskusrefixation plus ggf. partielle Resektion'],
        ['irreparabel / schwere Destruktion', 'Teil- oder Totalmeniskektomie nur als letzte Option'],
      ],
      key: 'Sagittales Zeichen: Bei einem discoiden Meniskus bleibt der Meniskuskorpus auf mindestens 3 aufeinanderfolgenden sagittalen Schichten sichtbar.',
    },
    therapy: {
      title: 'Therapieprinzip: Save the Meniscus',
      titlePrefix: 'Therapieprinzip',
      saveText: 'Save the Meniscus',
      lead: 'Die Therapie richtet sich nach Symptomatik, Rissmorphologie, Lokalisation und Vaskularisation. Ziel ist der möglichst weitgehende Erhalt von Meniskusgewebe.',
      tableHeaders: ['Situation', 'Prinzip'],
      tableRows: [
        ['asymptomatische oder rein degenerative Läsion', 'konservative Therapie'],
        ['frischer Riss in der roten Zone', 'Meniskusnaht'],
        ['irreparables, mechanisch relevantes Fragment', 'sparsame Teilresektion'],
      ],
      key: 'So viel Meniskus wie möglich erhalten, so wenig wie nötig resezieren.',
    },
    video: {
      title: 'Lernvideo',
      text: 'Das Lernvideo zum Thema Meniskus ist jetzt auf YouTube verfügbar.',
      cta: 'Video auf YouTube ansehen',
      url: 'https://youtu.be/L03fPcRZm_o?si=RzNDyM-Fmtig8I10',
    },
  },
  en: {
    toc: 'Learning path',
    breadcrumbMsk: 'Musculoskeletal',
    breadcrumbCurrent: 'Knee · Meniscus',
    title: 'Meniscus',
    subtitle: 'Basics, anatomy, MRI diagnosis and reliable tear criteria',
    sourceLabel: 'Dr. Zia',
    keyLabel: 'Key point',
    caveLabel: 'Caution',
    mcqTitle: 'Meniscus MCQs',
    mcqDesc: 'Exam questions on anatomy, MRI grading and tear diagnosis.',
    mcqCta: 'Start MCQs',
    actionMcq: 'MCQ',
    actionFall: 'Case studies',
    actionFallStatus: '2 cases',
    actionFlash: 'Flashcards',
    openCase: 'Open image directly in Radiopaedia',
    zoomImage: 'Enlarge image',
    aiImageNotice: 'AI-generated orientation graphic. Some details may be inaccurate; do not use it as a diagnostic source.',
    closePreview: 'Close preview',
    sections: [
      { id: 'anatomie', label: 'Anatomy and vascular supply', icon: '🦴' },
      { id: 'mrt', label: 'MRI diagnosis and tear criteria', icon: '🩻' },
      { id: 'grading', label: 'Lotysch classification', icon: '📊' },
      { id: 'risstypen', label: 'Tear types', icon: '🧩' },
      { id: 'discoider', label: 'Discoid meniscus', icon: '🔵' },
      { id: 'therapie', label: 'Treatment principle', icon: '🧵' },
      { id: 'lernvideo', label: 'Learning video', icon: '▶️' },
    ],
    heroCards: [
      { value: '2 slices', label: 'Two-slice-touch rule', text: 'Surface contact should be visible on at least two consecutive slices.' },
      { value: 'Only grade 3', label: 'definite meniscal tear', text: 'Only signal with definite articular-surface contact meets the criteria for a true tear.' },
      { value: 'Preserve', label: 'Save the Meniscus', text: 'Repair and preserve meniscal tissue whenever possible instead of resection.' },
    ],
    basics: {
      title: 'Knee joint · Meniscus · Basics',
      lead: 'The menisci are fibrocartilaginous structures between the femoral condyles and the tibial plateau. There are two menisci: the medial and the lateral meniscus. Both improve joint congruity, distribute load and act as shock absorbers. For MRI reporting, shape, fixation, vascularity and surface contact of signal are central.',
      bullets: [
        'Medial meniscus: C-shaped, fixed to the capsule and MCL, therefore much less mobile.',
        'Lateral meniscus: more O-shaped, not attached to the lateral collateral ligament, therefore more mobile.',
        'Tibial anchoring is provided by the meniscal roots at the anterior and posterior horns.',
      ],
    },
    anatomy: {
      title: 'Anatomy and vascular supply',
      lead: 'The menisci are fibrocartilaginous structures between the femoral condyles and the tibial plateau. There are two menisci: the medial meniscus and the lateral meniscus. They improve joint congruity, distribute load and act as shock absorbers.',
      tableHeaders: ['Feature', 'Medial meniscus', 'Lateral meniscus'],
      tableRows: [
        ['Shape', 'C-shaped', 'more O-shaped'],
        ['Fixation', 'firmly attached to capsule and medial collateral ligament', 'not fixed to the lateral ligaments'],
        ['Mobility', 'less mobile', 'more mobile and therefore less injury-prone'],
        ['Frequency of tears', 'about two thirds of all meniscal tears', 'less commonly affected'],
        ['Most common location', 'posterior horn in approx. 98%', 'posterior horn in approx. 50%, remainder in body and anterior horn'],
      ],
      rootsTitle: 'Attachments and meniscal roots',
      rootsText: 'The attachments should be considered separately: femoral gliding contact with the condyles and tibial anchoring through the meniscal roots.',
      rootsItems: [
        { title: 'Femoro-meniscal contact', text: 'The menisci articulate with the femoral condyles; their proximal surface is convex.' },
        { title: 'Tibial anchoring', text: 'Firm anchoring to the tibial plateau is provided by the meniscal roots at the anterior and posterior horn of each meniscus.' },
      ],
      imageCaption: 'Schematic overview of the meniscal roots: anterior horn, body and posterior horn.',
      key: 'Reduced mobility of the medial meniscus is the main reason why it is clearly more prone to injury.',
    },
    vascular: {
      title: 'Vascular supply and healing potential',
      lead: 'Blood supply is limited to the capsular periphery via the perimeniscal plexus. Vascularity decreases from the periphery to the center, directly determining healing potential.',
      zones: [
        { name: 'Red zone · Zone I', range: '< 3 mm from the capsule', status: 'well vascularized', therapy: 'best chance for repair' },
        { name: 'Red-white zone · Zone II', range: '3–5 mm from the capsule', status: 'limited blood supply', therapy: 'repair depends on case' },
        { name: 'White zone · Zone III', range: 'central area', status: 'avascular', therapy: 'no relevant healing potential' },
      ],
      tableHeaders: ['Zone', 'Location', 'Vascularity'],
      tableRows: [
        ['Red zone', '< 3 mm from the capsule', 'good'],
        ['Red-white zone', '3–5 mm from the capsule', 'limited'],
        ['White zone', 'central', 'avascular'],
      ],
      key: 'The closer the tear is to the capsule, the better its healing potential.',
    },
    mri: {
      title: 'MRI diagnosis and reliable tear criteria',
      lead: 'MRI assessment of the meniscus relies on a thin-slice knee protocol and fluid-sensitive sequences.',
      protocol: [
        { name: 'T1-weighting', text: 'Anatomical overview and assessment of chronic fibrosis.' },
        { name: 'T2-w / PD-fs', text: 'Detection of tears, bone marrow edema and ligament discontinuity.' },
      ],
      normalTitle: 'Normal appearance',
      normalText: 'A healthy meniscus is homogeneously hypointense. On sagittal images it has a typical triangular configuration.',
    },
    grading: {
      title: 'Lotysch classification',
      lead: 'The Lotysch classification helps distinguish degenerative intrameniscal signal changes from a true meniscal tear.',
      lotyschTitle: 'Simple model: grades 0 to III',
      simpleHeaders: ['Grade', 'MRI signal', 'Histology', 'Clinical meaning'],
      simpleRows: [
        ['0', 'Homogeneously hypointense', 'Normal fibrocartilage', 'No abnormality'],
        ['I', 'Focal signal, no surface contact', 'Focal myxoid degeneration', 'Incidental, no tear'],
        ['II', 'Linear signal, no surface contact', 'Diffuse myxoid degeneration', 'No tear, precursor lesion'],
        ['III', 'Signal reaches the articular surface', 'Tear present', '✅ True meniscal tear'],
      ],
      extendedTitle: 'Lotysch classification',
      tableHeaders: ['Grade', 'Morphology', 'Surface contact', 'Clinical significance'],
      tableRows: [
        ['1', 'punctate or small focal signal increase', 'no contact', 'early mucoid degeneration, usually asymptomatic'],
        ['2a', 'linear signal increase', 'no contact', 'no definite tear demonstrated'],
        ['2b', 'linear signal increase', 'contact on a single image', 'inconclusive for a true tear'],
        ['2c', 'wedge-shaped or globular signal increase', 'no definite contact', 'high risk of an occult tear'],
        ['3', 'signal increase', 'contact on at least two consecutive slices', 'radiologically proven meniscal tear'],
      ],
      key: 'Only grade III is a true tear.',
    },
    tear: {
      title: 'MRI criteria for a meniscal tear',
      lead: 'Specific criteria must be fulfilled before diagnosing a meniscal tear. This improves sensitivity and specificity.',
      cave: 'Intrameniscal signal increase alone is not sufficient to confidently diagnose a meniscal tear.',
      criteria: [
        { title: 'Contact with the articular surface', text: 'The abnormal high signal reaches the superior or inferior meniscal surface.' },
        { title: 'Deformity', text: 'The normal triangular configuration is lost or clearly altered.' },
        { title: 'Two-slice-touch rule', text: 'The lesion is visible with surface contact on at least two consecutive slices.' },
      ],
    },
    tearTypes: {
      title: 'Tear types',
      lead: 'Tear geometry and location determine surgical strategy and are highly relevant for exams.',
      caseIntro: 'Five real MRI sequences: use the mouse wheel, arrow keys or slider to browse slices; swipe sideways on mobile.',
      caseOpen: 'Original case on Radiopaedia ↗',
      caseItems: {
        longitudinal: { title: 'Longitudinal tear', sign: 'Vertical tear line parallel to the meniscal periphery.' },
        radial: { title: 'Radial tear', sign: 'Complete radial tear of the medial posterior root, shown axially.' },
        horizontal: { title: 'Horizontal tear', sign: 'Horizontal tear of the medial body and posterior horn with a concomitant ACL lesion.' },
        bucket: { title: 'Bucket-handle tear', sign: 'Displaced fragment with double-PCL and absent bow-tie signs.' },
        flap: { title: 'Flap tear', sign: 'Inferiorly displaced meniscal flap in the medial compartment.' },
      },
      tableHeaders: ['Tear type', 'Geometry', 'MRI sign', 'Treatment'],
      tableRows: [
        ['Longitudinal tear', 'parallel to the periphery', 'double-line sign on sagittal images', 'repair in the red or red-white zone'],
        ['Radial tear', 'perpendicular to the periphery', 'cleft sign, phantom meniscus', 'resection or repair depending on location'],
        ['Horizontal tear', 'parallel to the tibial plateau', 'cleft-like split, possible parameniscal cyst', 'resection ± cyst excision'],
        ['Bucket-handle tear', 'displaced double longitudinal tear', 'double PCL sign; absent bow-tie sign', 'reduction and repair, urgent if locked knee'],
        ['Flap tear', 'unstable flap with peripheral attachment', 'variable high-signal displaced flap', 'limited flap resection'],
      ],
      caveTitle: 'CAVE – bucket-handle tear',
      caveText: 'A double-PCL or absent bow-tie sign may suggest a bucket-handle tear. Identify the displaced fragment directly. A mechanically locked knee requires urgent orthopaedic assessment.',
    },
    cases: {
      title: 'Cases',
      lead: 'Use the mouse wheel or slider to scroll through each MRI sequence on the page.',
      items: [
        {
          title: 'Wedge-shaped/globular signal without definite surface contact',
          label: 'Grade 2c',
          tags: ['Discoid meniscus'],
          meta: 'PD-weighted · sagittal · mucoid degeneration · high risk of occult tear',
          sequence: 'Sagittal · PD fat sat',
          caseId: 'case-75168',
          frameCount: 18,
          frameExt: 'jpeg',
          initialFrame: 8,
          url: 'https://radiopaedia.org/cases/75168/studies/86248#t=im&v1i=52196174&v1z=1&v2i=52196277&v2z=1&v3i=52196234&v3z=1&v4i=52196213&v4z=1',
          credit: 'Case courtesy of Ammar Haouimi, Radiopaedia.org · rID: 75168',
        },
        {
          title: 'Linear signal with surface contact on one slice only',
          label: 'Grade 2b',
          tags: ['Discoid meniscus'],
          meta: 'STIR · coronal · inconclusive · not a definite grade-3 tear',
          sequence: 'Coronal · STIR',
          caseId: 'case-14060-coronal-stir',
          frameCount: 7,
          frameExt: 'jpg',
          initialFrame: 3,
          url: 'https://radiopaedia.org/cases/14060/studies/13900#t=im&v1i=1118538&v1z=1&v2i=1118592&v2z=1',
          credit: 'Case courtesy of Roberto Schubert, Radiopaedia.org · rID: 14060',
        },
      ],
      key: 'Cases are useful because not every intrameniscal signal abnormality represents a definite meniscal tear.',
    },
    discoid: {
      title: 'Discoid meniscus',
      lead: 'A discoid meniscus is a congenital anatomic variant with an abnormally wide, disc-shaped meniscal body. It almost exclusively affects the lateral meniscus and is more prone to tears than a normally shaped meniscus.',
      stats: [
        { value: '3–5%', label: 'incidence', text: 'often incidental on knee MRI' },
        { value: '~50%', label: 'bilateral', text: 'not uncommonly present on both sides' },
        { value: 'Lateral', label: 'meniscus', text: 'almost exclusively the lateral meniscus is affected' },
      ],
      overviewHeaders: ['Parameter', 'Value'],
      overviewRows: [
        ['Affected meniscus', 'almost exclusively lateral meniscus'],
        ['Side distribution', 'bilateral in about 50% of cases'],
        ['Sex', 'no clear predilection'],
        ['Prevalence', 'reported to be higher in Asian populations'],
        ['Risk of tear', 'higher than in a normally shaped meniscus'],
      ],
      childTitle: 'Clinical clue in children',
      childText: 'A snapping knee in a child should always raise suspicion for a discoid lateral meniscus.',
      mriTitle: 'MRI criteria',
      mriHeaders: ['Plane', 'Criterion', 'Threshold'],
      mriRows: [
        ['Coronal', 'absolute meniscal width', '≥ 15 mm'],
        ['Coronal', 'meniscal width / maximal tibial width', '> 20%'],
        ['Sagittal', 'continuous body visualization', 'on ≥ 3 consecutive standard slices'],
      ],
      sagittalTitle: 'Sagittal sign',
      sagittalText: 'The sagittal criterion is the opposite of the absent bow-tie sign: a normal meniscus shows the body on only 1–2 slices, whereas a discoid meniscus remains visible on at least 3 slices.',
      treatmentHeaders: ['Situation', 'Management'],
      treatmentRows: [
        ['asymptomatic incidental finding', 'conservative, no intervention needed'],
        ['symptomatic without tear', 'conservative; arthroscopic saucerization if symptoms persist'],
        ['discoid meniscus with tear', 'meniscal repair plus partial resection if needed'],
        ['irreparable / severe destruction', 'partial or total meniscectomy only as last option'],
      ],
      key: 'Sagittal sign: in a discoid meniscus, the meniscal body remains visible on at least 3 consecutive sagittal slices.',
    },
    therapy: {
      title: 'Treatment concept: Save the meniscus',
      titlePrefix: 'Treatment concept',
      saveText: 'Save the Meniscus',
      lead: 'Management depends on symptoms, tear morphology, location and vascularity. The goal is to preserve as much meniscal tissue as possible.',
      tableHeaders: ['Situation', 'Principle'],
      tableRows: [
        ['asymptomatic or purely degenerative lesion', 'conservative treatment'],
        ['fresh tear in the red zone', 'meniscal repair'],
        ['irreparable mechanically relevant fragment', 'limited partial resection'],
      ],
      key: 'Preserve as much meniscus as possible, resect only as much as necessary.',
    },
    video: {
      title: 'Learning video',
      text: 'The learning video for this meniscus chapter is now available on YouTube.',
      cta: 'Watch on YouTube',
      url: 'https://youtu.be/L03fPcRZm_o?si=RzNDyM-Fmtig8I10',
    },
  },
  fa: {
    toc: 'مسیر یادگیری',
    breadcrumbMsk: 'اسکلتی-عضلانی',
    breadcrumbCurrent: 'زانو · منیسک',
    title: 'منیسک',
    subtitle: 'مبانی، آناتومی، تشخیص MRI و معیارهای قطعی پارگی',
    sourceLabel: 'Dr. Zia',
    keyLabel: 'نکته مهم',
    caveLabel: 'احتیاط',
    mcqTitle: 'سوالات منیسک',
    mcqDesc: 'سوالات مرتبط با آناتومی، درجه‌بندی MRI و تشخیص پارگی.',
    mcqCta: 'شروع سوالات',
    actionMcq: 'MCQ',
    actionFall: 'موارد بالینی',
    actionFallStatus: '۲ کیس',
    actionFlash: 'فلش‌کارت',
    openCase: 'باز کردن مستقیم تصویر در Radiopaedia',
    zoomImage: 'بزرگ‌نمایی تصویر',
    aiImageNotice: 'این تصویر با هوش مصنوعی و فقط برای جهت‌یابی آموزشی ساخته شده است؛ ممکن است برخی جزئیات نادرست باشند و نباید به‌عنوان منبع تشخیصی استفاده شود.',
    closePreview: 'بستن نمایش بزرگ',
    sections: [
      { id: 'anatomie', label: 'آناتومی و خون‌رسانی', icon: '🦴' },
      { id: 'mrt', label: 'تشخیص MRI و معیارهای پارگی', icon: '🩻' },
      { id: 'grading', label: 'طبقه‌بندی Lotysch', icon: '📊' },
      { id: 'risstypen', label: 'انواع پارگی', icon: '🧩' },
      { id: 'discoider', label: 'منیسک دیسکوئید', icon: '🔵' },
      { id: 'therapie', label: 'اصل درمان', icon: '🧵' },
      { id: 'lernvideo', label: 'ویدیوی آموزشی', icon: '▶️' },
    ],
    heroCards: [
      { value: '۲ برش', label: 'قانون Two-slice-touch', text: 'تماس با سطح باید حداقل در دو برش متوالی دیده شود.' },
      { value: 'فقط درجه ۳', label: 'پارگی قطعی منیسک', text: 'فقط سیگنال با تماس قطعی با سطح مفصلی معیار پارگی واقعی را دارد.' },
      { value: 'حفظ', label: 'حفظ منیسک', text: 'در صورت امکان ترمیم و حفظ بافت منیسک بر رزکسیون اولویت دارد.' },
    ],
    basics: {
      title: 'مفصل زانو · منیسک · مبانی',
      lead: 'منیسک‌ها ساختارهای فیبروکارتیلاژ بین کندیل‌های فمور و پلاتوی تیبیا هستند. دو منیسک وجود دارد: منیسک داخلی و منیسک خارجی. هر دو تطابق مفصلی را بهتر می‌کنند، نیرو را پخش می‌کنند و نقش ضربه‌گیر دارند. در گزارش MRI، شکل، میزان تثبیت، خون‌رسانی و تماس سیگنال با سطح مفصل اهمیت اصلی دارد.',
      bullets: [
        'منیسک داخلی: C شکل، متصل به کپسول و MCL، بنابراین تحرک کمتر دارد.',
        'منیسک خارجی: بیشتر O شکل، به رباط خارجی متصل نیست و تحرک بیشتری دارد.',
        'اتصال به تیبیا از طریق ریشه‌های منیسک در شاخ قدامی و خلفی انجام می‌شود.',
      ],
    },
    anatomy: {
      title: 'آناتومی و خون‌رسانی',
      lead: 'منیسک‌ها ساختارهای فیبروکارتیلاژی بین کندیل‌های فمور و پلاتوی تیبیا هستند. دو منیسک وجود دارد: منیسک داخلی و منیسک خارجی. آن‌ها تطابق مفصلی را بهتر می‌کنند، نیرو را پخش می‌کنند و مانند ضربه‌گیر عمل می‌کنند.',
      tableHeaders: ['ویژگی', 'منیسک داخلی', 'منیسک خارجی'],
      tableRows: [
        ['شکل', 'C شکل', 'بیشتر O شکل'],
        ['تثبیت', 'به کپسول مفصلی و رباط جانبی داخلی متصل است', 'به رباط‌های خارجی متصل نیست'],
        ['تحرک', 'کم‌تحرک', 'متحرک‌تر و در نتیجه کمتر مستعد آسیب'],
        ['شیوع پارگی', 'حدود دو سوم همه پارگی‌های منیسک', 'کمتر درگیر می‌شود'],
        ['محل شایع پارگی', 'شاخ پشتی در حدود ۹۸٪', 'شاخ پشتی در حدود ۵۰٪، بقیه در بدنه و شاخ قدامی'],
      ],
      rootsTitle: 'اتصالات و ریشه‌های منیسک',
      rootsText: 'اتصالات بهتر است جداگانه بررسی شوند: تماس لغزشی با کندیل‌های فمور و اتصال محکم به تیبیا از طریق ریشه‌های منیسک.',
      rootsItems: [
        { title: 'تماس فمورو-منیسکال', text: 'منیسک‌ها با کندیل‌های فمور مفصل می‌شوند و سطح پروگزیمال آن‌ها محدب است.' },
        { title: 'اتصال به تیبیا', text: 'اتصال محکم به پلاتوی تیبیا از طریق ریشه‌های منیسک در شاخ قدامی و خلفی هر منیسک انجام می‌شود.' },
      ],
      imageCaption: 'نمای شماتیک ریشه‌های منیسک: شاخ قدامی، بدنه و شاخ خلفی.',
      key: 'تحرک کمتر منیسک داخلی مهم‌ترین دلیل آسیب‌پذیری بیشتر آن است.',
    },
    vascular: {
      title: 'خون‌رسانی و پتانسیل ترمیم',
      lead: 'خون‌رسانی منیسک فقط از ناحیه نزدیک کپسول و از طریق شبکه پیرامنیسکی انجام می‌شود. هرچه به مرکز نزدیک‌تر شویم خون‌رسانی کمتر می‌شود و شانس ترمیم هم کاهش می‌یابد.',
      zones: [
        { name: 'ناحیه قرمز · Zone I', range: 'کمتر از ۳ میلی‌متر از کپسول', status: 'خون‌رسانی خوب', therapy: 'بهترین شانس برای بخیه' },
        { name: 'ناحیه قرمز-سفید · Zone II', range: '۳ تا ۵ میلی‌متر از کپسول', status: 'خون‌رسانی محدود', therapy: 'بخیه بسته به شرایط' },
        { name: 'ناحیه سفید · Zone III', range: 'قسمت مرکزی', status: 'بدون عروق', therapy: 'ترمیم قابل توجه ندارد' },
      ],
      tableHeaders: ['ناحیه', 'محل', 'خون‌رسانی'],
      tableRows: [
        ['قرمز', 'کمتر از ۳ میلی‌متر از کپسول', 'خوب'],
        ['قرمز-سفید', '۳ تا ۵ میلی‌متر از کپسول', 'محدود'],
        ['سفید', 'مرکزی', 'بدون عروق'],
      ],
      key: 'هرچه پارگی به کپسول نزدیک‌تر باشد، پتانسیل ترمیم بهتر است.',
    },
    mri: {
      title: 'تشخیص MRI و معیارهای قطعی پارگی',
      lead: 'ارزیابی MRI منیسک بر اساس پروتکل زانو با برش‌های نازک و سکانس‌های حساس به مایع انجام می‌شود.',
      protocol: [
        { name: 'T1', text: 'نمای کلی آناتومیک و ارزیابی فیبروز مزمن.' },
        { name: 'T2-w / PD-fs', text: 'تشخیص پارگی، ادم استخوان و قطع‌شدگی رباط‌ها.' },
      ],
      normalTitle: 'نمای طبیعی',
      normalText: 'منیسک سالم به صورت هموژن هیپواینتنس دیده می‌شود. در نمای ساژیتال شکل مثلثی تیپیک دارد.',
    },
    grading: {
      title: 'طبقه‌بندی Lotysch',
      lead: 'طبقه‌بندی Lotysch کمک می‌کند تغییرات سیگنال دژنراتیو داخل منیسک از پارگی واقعی منیسک جدا شود.',
      lotyschTitle: 'مدل ساده: درجه ۰ تا III',
      simpleHeaders: ['درجه', 'سیگنال MRI', 'هیستولوژی', 'معنای بالینی'],
      simpleRows: [
        ['0', 'هیپواینتنس هموژن', 'بافت فیبروغضروفی طبیعی', 'یافته غیرطبیعی ندارد'],
        ['I', 'سیگنال فوکال، بدون تماس با سطح', 'دژنراسیون میکسوئید فوکال', 'اتفاقی، پارگی نیست'],
        ['II', 'سیگنال خطی، بدون تماس با سطح', 'دژنراسیون میکسوئید منتشر', 'پارگی نیست، ضایعه پیش‌زمینه‌ای'],
        ['III', 'سیگنال به سطح مفصلی می‌رسد', 'پارگی وجود دارد', '✅ پارگی واقعی منیسک'],
      ],
      extendedTitle: 'طبقه‌بندی Lotysch',
      tableHeaders: ['درجه', 'مورفولوژی', 'تماس با سطح', 'اهمیت بالینی'],
      tableRows: [
        ['1', 'افزایش سیگنال نقطه‌ای یا کوچک', 'بدون تماس', 'دژنراسیون موکوئید اولیه، معمولاً بی‌علامت'],
        ['2a', 'افزایش سیگنال خطی', 'بدون تماس', 'پارگی قطعی اثبات نشده است'],
        ['2b', 'افزایش سیگنال خطی', 'تماس فقط در یک تصویر', 'برای پارگی قطعی ناکافی'],
        ['2c', 'افزایش سیگنال گوه‌ای یا گلوبولار', 'بدون تماس واضح', 'ریسک بالا برای پارگی مخفی'],
        ['3', 'افزایش سیگنال پاتولوژیک', 'تماس در حداقل دو برش متوالی', 'پارگی منیسک از نظر رادیولوژیک قطعی'],
      ],
      key: 'فقط درجه III پارگی واقعی است.',
    },
    tear: {
      title: 'معیارهای MRI برای پارگی منیسک',
      lead: 'برای تشخیص پارگی منیسک باید معیارهای مشخص وجود داشته باشد. این کار حساسیت و ویژگی تشخیص را بهتر می‌کند.',
      cave: 'افزایش سیگنال داخل منیسک به تنهایی برای تشخیص قطعی پارگی کافی نیست.',
      criteria: [
        { title: 'تماس با سطح مفصلی', text: 'سیگنال پاتولوژیک به سطح فوقانی یا تحتانی منیسک می‌رسد.' },
        { title: 'دفورمیتی', text: 'شکل مثلثی طبیعی منیسک از بین رفته یا واضحاً تغییر کرده است.' },
        { title: 'قانون Two-slice-touch', text: 'ضایعه باید حداقل در دو برش متوالی با تماس سطحی دیده شود.' },
      ],
    },
    tearTypes: {
      title: 'انواع پارگی منیسک',
      lead: 'جهت و محل پارگی، استراتژی درمان و تصمیم جراحی را تعیین می‌کند و برای آزمون مهم است.',
      caseIntro: 'پنج سکانس واقعی MRI: با چرخ ماوس، کلیدهای جهت یا اسلایدر برش‌ها را مرور کنید؛ در موبایل به چپ و راست بکشید.',
      caseOpen: 'کیس اصلی در Radiopaedia ↗',
      caseItems: {
        longitudinal: { title: 'پارگی طولی', sign: 'خط پارگی عمودی و موازی با حاشیهٔ منیسک.' },
        radial: { title: 'پارگی رادیال', sign: 'پارگی رادیال کامل ریشهٔ خلفی منیسک داخلی در نمای اکسیال.' },
        horizontal: { title: 'پارگی افقی', sign: 'پارگی افقی تنه و شاخ خلفی منیسک داخلی، همراه با آسیب ACL.' },
        bucket: { title: 'پارگی Bucket-handle', sign: 'قطعهٔ جابه‌جا شده با علامت PCL دوگانه و نبود Bow-tie.' },
        flap: { title: 'پارگی فلپ', sign: 'فلپ منیسک جابه‌جا شده به سمت پایین در بخش داخلی.' },
      },
      tableHeaders: ['نوع پارگی', 'هندسه', 'علامت MRI', 'درمان'],
      tableRows: [
        ['پارگی طولی', 'موازی با محیط منیسک', 'علامت دو خطی در ساژیتال', 'بخیه در ناحیه قرمز یا قرمز-سفید'],
        ['پارگی رادیال', 'عمود بر محیط منیسک', 'Cleft sign، منیسک شبح‌مانند', 'رزکسیون یا بخیه بسته به محل'],
        ['پارگی افقی', 'موازی با پلاتوی تیبیا', 'شکاف افقی، گاهی کیست پارامنیسکال', 'رزکسیون ± خارج کردن کیست'],
        ['پارگی Bucket-handle', 'پارگی طولی دوبل و جابه‌جا شده', 'علامت PCL دوگانه؛ نبود Bow-tie', 'جااندازی و بخیه؛ در زانوی قفل‌شده اورژانسی'],
        ['پارگی فلپ', 'فلپ ناپایدار با اتصال محیطی', 'فلپ جابه‌جا شونده با سیگنال بالا', 'رزکسیون محدود فلپ'],
      ],
      caveTitle: 'هشدار – پارگی Bucket-handle',
      caveText: 'علامت Double-PCL یا فقدان Bow-tie می‌تواند پارگی دسته‌سطلی را مطرح کند. قطعهٔ جابه‌جا‌شده را مستقیماً شناسایی کنید. زانوی قفل‌شدهٔ مکانیکی نیازمند ارزیابی فوری ارتوپدی است.',
    },
    cases: {
      title: 'نمونه کیس‌ها',
      lead: 'با اسکرول ماوس یا اسلایدر، برش‌های هر سکانس MRI را مستقیماً در صفحه مرور کنید.',
      items: [
        {
          title: 'سیگنال گوه‌ای/گلوبولار بدون تماس قطعی با سطح مفصلی',
          label: 'درجه 2c',
          tags: ['منیسک دیسکوئید'],
          meta: 'PD · ساژیتال · دژنراسیون موکوئید · ریسک بالای پارگی مخفی',
          sequence: 'ساژیتال · PD fat sat',
          caseId: 'case-75168',
          frameCount: 18,
          frameExt: 'jpeg',
          initialFrame: 8,
          url: 'https://radiopaedia.org/cases/75168/studies/86248#t=im&v1i=52196174&v1z=1&v2i=52196277&v2z=1&v3i=52196234&v3z=1&v4i=52196213&v4z=1',
          credit: 'Case courtesy of Ammar Haouimi, Radiopaedia.org · rID: 75168',
        },
        {
          title: 'سیگنال خطی با تماس سطحی فقط در یک تصویر',
          label: 'درجه 2b',
          tags: ['منیسک دیسکوئید'],
          meta: 'STIR · کرونال · غیرقطعی · پارگی قطعی Grade 3 نیست',
          sequence: 'کرونال · STIR',
          caseId: 'case-14060-coronal-stir',
          frameCount: 7,
          frameExt: 'jpg',
          initialFrame: 3,
          url: 'https://radiopaedia.org/cases/14060/studies/13900#t=im&v1i=1118538&v1z=1&v2i=1118592&v2z=1',
          credit: 'Case courtesy of Roberto Schubert, Radiopaedia.org · rID: 14060',
        },
      ],
      key: 'نمونه کیس‌ها مهم هستند، چون هر افزایش سیگنال داخل منیسک به معنی پارگی قطعی نیست.',
    },
    discoid: {
      title: 'منیسک دیسکوئید',
      lead: 'منیسک دیسکوئید یک واریانت مادرزادی است که در آن تنه منیسک پهن‌تر و شبیه دیسک است. این حالت تقریباً همیشه منیسک خارجی را درگیر می‌کند و نسبت به منیسک طبیعی بیشتر مستعد پارگی است.',
      stats: [
        { value: '۳–۵٪', label: 'شیوع', text: 'اغلب یافته اتفاقی در MRI زانو' },
        { value: '~۵۰٪', label: 'دوطرفه', text: 'می‌تواند در هر دو زانو دیده شود' },
        { value: 'خارجی', label: 'منیسک', text: 'تقریباً همیشه منیسک خارجی درگیر می‌شود' },
      ],
      overviewHeaders: ['پارامتر', 'مقدار'],
      overviewRows: [
        ['منیسک درگیر', 'تقریباً همیشه منیسک خارجی'],
        ['توزیع طرفی', 'در حدود ۵۰٪ موارد دوطرفه'],
        ['جنسیت', 'ارجحیت واضح ندارد'],
        ['شیوع', 'در جمعیت‌های آسیایی بیشتر گزارش شده است'],
        ['خطر پارگی', 'بیشتر از منیسک با شکل طبیعی'],
      ],
      childTitle: 'نکته بالینی در کودکان',
      childText: 'شنیدن یا احساس Snapping در زانوی کودک باید شک به منیسک خارجی دیسکوئید را مطرح کند.',
      mriTitle: 'معیارهای MRI',
      mriHeaders: ['صفحه', 'معیار', 'حد آستانه'],
      mriRows: [
        ['کرونال', 'عرض مطلق منیسک', '≥ ۱۵ میلی‌متر'],
        ['کرونال', 'عرض منیسک / حداکثر عرض تیبیا', '> ۲۰٪'],
        ['ساژیتال', 'دیده شدن مداوم تنه منیسک', 'در ≥ ۳ برش استاندارد متوالی'],
      ],
      sagittalTitle: 'علامت ساژیتال',
      sagittalText: 'معیار ساژیتال برعکس absent bow-tie sign است: منیسک طبیعی تنه را فقط در ۱ تا ۲ برش نشان می‌دهد، اما منیسک دیسکوئید در حداقل ۳ برش متوالی دیده می‌شود.',
      treatmentHeaders: ['وضعیت', 'اقدام'],
      treatmentRows: [
        ['یافته اتفاقی بدون علامت', 'محافظه‌کارانه، بدون نیاز به مداخله'],
        ['علامت‌دار بدون پارگی', 'درمان محافظه‌کارانه؛ در صورت تداوم علائم Saucerization آرتروسکوپیک'],
        ['منیسک دیسکوئید همراه با پارگی', 'ترمیم منیسک همراه با رزکسیون نسبی در صورت نیاز'],
        ['غیرقابل ترمیم / تخریب شدید', 'منیسککتومی نسبی یا کامل فقط به عنوان آخرین گزینه'],
      ],
      key: 'علامت ساژیتال: در منیسک دیسکوئید، تنه منیسک در حداقل ۳ برش ساژیتال متوالی قابل مشاهده باقی می‌ماند.',
    },
    therapy: {
      title: 'اصول درمان: Save the Meniscus',
      titlePrefix: 'اصول درمان',
      saveText: 'حفظ منیسک',
      lead: 'تصمیم درمانی به علائم، شکل پارگی، محل پارگی و خون‌رسانی بستگی دارد. هدف، حفظ حداکثری بافت منیسک است.',
      tableHeaders: ['وضعیت', 'اصل درمانی'],
      tableRows: [
        ['ضایعه بدون علامت یا صرفاً دژنراتیو', 'درمان محافظه‌کارانه'],
        ['پارگی تازه در ناحیه قرمز', 'بخیه منیسک'],
        ['قطعه غیرقابل ترمیم و مکانیکی', 'رزکسیون محدود و محافظه‌کارانه'],
      ],
      key: 'اصل مهم این است که تا حد امکان بافت منیسک حفظ شود؛ برداشتن منیسک فقط در صورت ضرورت و به کمترین مقدار لازم انجام شود.',
    },
    video: {
      title: 'ویدیوی آموزشی',
      text: 'ویدیوی آموزشی این بخش درباره منیسک اکنون در YouTube در دسترس است.',
      cta: 'مشاهده ویدیو در YouTube',
      url: 'https://youtu.be/L03fPcRZm_o?si=RzNDyM-Fmtig8I10',
    },
  },
}

const TAKE_HOME_COPY = {
  de: {
    sectionLabel: 'Take home message',
    title: 'Take home message',
    lead: 'Die wichtigsten Merksätze der Lektion auf einen Blick.',
    itemTitles: {
      anatomy: 'Merke: Innenmeniskus-Mobilität',
      vascular: 'Merke: Kapselnähe und Heilung',
      gradingTear: 'Merke: Rissdiagnose im MRT',
      discoid: 'Merke: Discoider Meniskus',
      therapy: 'Merke: Save the Meniscus',
    },
    discoidDefinition: 'Kurze Definition: Ein discoider Meniskus ist eine angeborene Formvariante, meist des Außenmeniskus, mit verbreitertem, scheibenförmigem Meniskuskorpus.',
  },
  en: {
    sectionLabel: 'Take home message',
    title: 'Take home message',
    lead: 'The key points of this lesson at a glance.',
    itemTitles: {
      anatomy: 'Key point: medial meniscus mobility',
      vascular: 'Key point: capsular proximity and healing',
      gradingTear: 'Key point: tear diagnosis on MRI',
      discoid: 'Key point: discoid meniscus',
      therapy: 'Key point: Save the Meniscus',
    },
    discoidDefinition: 'Short definition: a discoid meniscus is a congenital shape variant, usually of the lateral meniscus, with a widened disc-like meniscal body.',
  },
  fa: {
    sectionLabel: 'Take home message',
    title: 'Take home message',
    lead: 'مهم‌ترین نکات این درس برای مرور سریع.',
    itemTitles: {
      anatomy: 'نکته: تحرک منیسک داخلی',
      vascular: 'نکته: نزدیکی به کپسول و ترمیم',
      gradingTear: 'نکته: تشخیص پارگی در MRI',
      discoid: 'نکته: منیسک دیسکوئید',
      therapy: 'نکته: Save the Meniscus',
    },
    discoidDefinition: 'تعریف کوتاه: منیسک دیسکوئید یک واریانت مادرزادی است، معمولاً در منیسک خارجی دیده می‌شود و تنه منیسک پهن و دیسک‌مانند است.',
  },
}

const YOUTUBE_EMBED_URL = 'https://www.youtube-nocookie.com/embed/L03fPcRZm_o'

function Table({ headers, rows, className = '' }) {
  return (
    <div className={styles.tableWrap}>
      <table className={`${styles.table} ${className}`}>
        <thead>
          <tr>{headers.map(header => <th key={header} scope="col">{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
              <td key={`${rowIndex}-${cellIndex}`} data-label={headers[cellIndex] || ''}>{cell}</td>
            ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Callout({ type = 'note', label, children }) {
  if (!children) return null
  const icon = type === 'cave' ? 'cave' : type === 'success' ? 'check' : 'note'
  return (
    <div className={`${styles.callout} ${styles[type]}`}>
      <span className={styles.calloutLabel}><SectionIcon id={icon} /> {label}</span>
      <div className={styles.calloutBody}>{children}</div>
    </div>
  )
}

function TakeHomeItems({ items }) {
  const [openItems, setOpenItems] = useState(() => new Set())
  return <ol className={template.takeHome}>{items.map(item => {
    const open = openItems.has(item.number)
    return <li key={item.number} className={open ? template.takeHomeItemOpen : ''}>
      <button type="button" aria-expanded={open} aria-controls={`meniscus-summary-${item.number}`} onClick={() => setOpenItems(previous => {
        const next = new Set(previous)
        if (next.has(item.number)) next.delete(item.number)
        else next.add(item.number)
        return next
      })}><span className={template.takeHomePriority}>{item.number}</span><strong>{item.title}</strong><i aria-hidden="true">{open ? '−' : '+'}</i></button>
      <div id={`meniscus-summary-${item.number}`} className={template.takeHomeDetail} hidden={!open}><p>{item.text}</p></div>
    </li>
  })}</ol>
}

const READ_LABELS = {
  de: { btn: 'Als gelesen markieren', active: 'Als gelesen markiert', error: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.', signIn: 'Anmelden' },
  en: { btn: 'Mark as read', active: 'Marked as read', error: 'Please sign in to save your learning progress.', signIn: 'Sign in' },
  fa: { btn: 'علامت‌گذاری به‌عنوان خوانده‌شده', active: 'به‌عنوان خوانده‌شده علامت‌گذاری شد', error: 'برای ذخیره پیشرفت یادگیری لطفاً وارد شوید.', signIn: 'ورود' },
}

const SECTION_READ_LABELS = {
  de: { progress: 'gelesen', complete: 'Abschnitt als gelesen markieren', completed: 'Als gelesen markiert', completeLesson: 'Ganze Lektion als gelesen markieren', lessonCompleted: 'Ganze Lektion gelesen', continue: 'Lektion fortsetzen' },
  en: { progress: 'read', complete: 'Mark section as read', completed: 'Marked as read', completeLesson: 'Mark full lesson as read', lessonCompleted: 'Full lesson marked as read', continue: 'Continue lesson' },
  fa: { progress: 'خوانده‌شده', complete: 'علامت‌گذاری بخش به‌عنوان خوانده‌شده', completed: 'به‌عنوان خوانده‌شده علامت‌گذاری شد', completeLesson: 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده', lessonCompleted: 'کل درس خوانده شد', continue: 'ادامه درس' },
}

function Section({ id, eyebrow, title, lead, children, className = '', isOpen, isRead, onToggle, onToggleRead, readLabel, readDoneLabel }) {
  return (
    <section id={id} className={`${template.section} ${contentStyles.lessonSection} ${isOpen ? template.sectionOpen : ''} ${className}`.trim()}>
        <button
          type="button"
          className={template.sectionHeader}
          aria-expanded={isOpen}
          aria-controls={`${id}-content`}
          onClick={onToggle}
        >
          <span className={template.sectionIcon}><SectionIcon id={id} /></span>
          <span><h2 className={contentStyles.heading}>{title}</h2></span>
          <span className={template.toggle} aria-hidden="true">{isOpen ? '−' : '+'}</span>
        </button>
      <div id={`${id}-content`} className={template.sectionBody} hidden={!isOpen}>
        {lead && <p className={styles.sectionLead}>{lead}</p>}
        {children}
        {id !== 'takehome' && <button type="button" className={`${styles.sectionReadButton} ${isRead ? styles.sectionReadButtonDone : ''}`} aria-pressed={isRead} onClick={onToggleRead}>
          <SectionIcon id="check" />
          <span>{isRead ? readDoneLabel : readLabel}</span>
        </button>}
      </div>
    </section>
  )
}

function MobileLearningPath({ sections, toc, activeId, readSections, onSelect }) {
  const [panelOpen, setPanelOpen] = useState(false)
  const activeSection = sections.find(section => section.id === activeId) || sections[0]
  const progress = sections.length ? (readSections.size / sections.length) * 360 : 0

  const selectSection = (id) => {
    onSelect(id)
    setPanelOpen(false)
  }

  return <div className={styles.mobileLearningPath}>
    {panelOpen ? <section id="meniskus-mobile-learning-path" className={styles.mobilePathPanel} role="dialog" aria-label={toc}>
      <header>
        <div><small>{toc}</small><strong>{readSections.size} / {sections.length}</strong></div>
        <button type="button" onClick={() => setPanelOpen(false)} aria-label="Close">×</button>
      </header>
      <nav>{sections.map(section => <button type="button" key={section.id} className={activeId === section.id ? styles.mobilePathCurrent : ''} onClick={() => selectSection(section.id)} aria-current={activeId === section.id ? 'location' : undefined}>
        <span className={styles.mobilePathItemIcon}><SectionIcon id={section.id} /></span>
        <span><strong>{section.label}</strong></span>
        <i aria-hidden="true">{readSections.has(section.id) ? '✓' : ''}</i>
      </button>)}</nav>
    </section> : null}
    <button type="button" className={styles.mobilePathButton} onClick={() => setPanelOpen(value => !value)} aria-expanded={panelOpen} aria-controls="meniskus-mobile-learning-path">
      <span className={styles.mobileProgressRing} style={{ '--mobile-progress': `${progress}deg` }}><b>{readSections.size}</b><small>/{sections.length}</small></span>
      <span className={styles.mobileCurrentIcon}><SectionIcon id={activeSection.id} /></span>
      <span className={styles.mobilePathLabel}><strong>{toc}</strong><small>{activeSection.label}</small></span>
    </button>
  </div>
}

function Sidebar({ sections, toc, activeId, onClick }) {
  return (
    <aside className={styles.sidebar}>
      <h2>{toc}</h2>
      <nav className={styles.sideNav}>
        {sections.map(section => (
          <button
            key={section.id}
            type="button"
            className={`${styles.sideItem} ${section.important ? styles.sideItemImportant : ''} ${activeId === section.id ? styles.sideItemActive : ''}`}
            onClick={() => onClick(section.id)}
            aria-current={activeId === section.id ? 'location' : undefined}
          >
            <span className={styles.sideIcon}><SectionIcon id={section.id} /></span>
            <strong>{section.label}</strong>
          </button>
        ))}
      </nav>
    </aside>
  )
}

function ImageFigure({ src, alt, caption, aiNotice, zoomable = false, zoomLabel = 'Bild vergrößern', onZoom }) {
  return (
    <figure className={styles.figure}>
      {zoomable ? (
        <button type="button" className={styles.figureZoomButton} onClick={onZoom} aria-label={zoomLabel}>
          <img src={src} alt={alt} />
          <span>{zoomLabel}</span>
        </button>
      ) : (
        <img src={src} alt={alt} />
      )}
      {(caption || aiNotice) && (
        <figcaption>
          {caption && <span className={styles.figureCaptionText}>{caption}</span>}
          {aiNotice && <small className={styles.aiImageNotice}>{aiNotice}</small>}
        </figcaption>
      )}
    </figure>
  )
}

const SOURCES = [
  { label: 'MRI study of medial meniscus degeneration · Jerosch grades 0–4 (2022)', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9054988/' },
  { label: 'Dillon et al. · Clinical significance of stage 2 meniscal abnormalities (1990)', href: 'https://pubmed.ncbi.nlm.nih.gov/2392029/' },
  { label: 'Simonetta et al. · Meniscus tears treatment: patterns and practical guide (2023)', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10122773/' },
  { label: 'Magnetic resonance imaging of the knee (2020)', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7571514/' },
  { label: 'Crues et al. · Meniscal tears of the knee: accuracy of MR imaging (Radiology, 1987)', href: 'https://pubmed.ncbi.nlm.nih.gov/3602385/' },
  { label: 'De Smet & Tuite · Two-slice-touch rule (AJR, 2006)', href: 'https://pubmed.ncbi.nlm.nih.gov/16985134/' },
  { label: 'Nguyen et al. · MR Imaging–based Diagnosis and Classification of Meniscal Tears (RadioGraphics, 2014)', href: 'https://pubs.rsna.org/doi/10.1148/rg.344125202' },
  { label: 'Samato et al. · MRI criteria for discoid lateral meniscus', href: 'https://pubmed.ncbi.nlm.nih.gov/11973030/' },
  { label: 'Kim et al. · Discoid lateral meniscus: diagnosis and treatment (review)', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7550551/' },
  { label: 'Radiopaedia case rID 75168 · Discoid lateral meniscus', href: 'https://radiopaedia.org/cases/75168' },
  { label: 'Radiopaedia case rID 14060 · Lateral discoid meniscus', href: 'https://radiopaedia.org/cases/14060' },
]

const SOURCE_LABELS = {
  de: { title: 'Quellen und Bildnachweise', image: 'Bild', scrollHint: 'Scrollen zum Blättern', swipeHint: 'Seitlich wischen', sliderLabel: 'Schicht auswählen', previousSlice: 'Vorherige Schicht', nextSlice: 'Nächste Schicht', finding: 'Befund' },
  en: { title: 'Sources and image credits', image: 'Image', scrollHint: 'Scroll through slices', swipeHint: 'Swipe sideways', sliderLabel: 'Select slice', previousSlice: 'Previous slice', nextSlice: 'Next slice', finding: 'Findings' },
  fa: { title: 'منابع و اعتبار تصاویر', image: 'تصویر', scrollHint: 'برای مرور برش‌ها اسکرول کنید', swipeHint: 'به چپ و راست بکشید', sliderLabel: 'انتخاب برش', previousSlice: 'برش قبلی', nextSlice: 'برش بعدی', finding: 'یافته‌ها' },
}


export default function MeniskusPage() {
  const { lang } = useLanguage()
  const copy = CONTENT[lang] || CONTENT.de
  const takeHomeCopy = TAKE_HOME_COPY[lang] || TAKE_HOME_COPY.de
  const sectionReadCopy = SECTION_READ_LABELS[lang] || SECTION_READ_LABELS.de
  const sourceLabels = SOURCE_LABELS[lang] || SOURCE_LABELS.de
  const isRTL = lang === 'fa'
  const takeHomeItems = useMemo(() => [
    { number: '01', title: takeHomeCopy.itemTitles.anatomy, text: copy.anatomy.key },
    { number: '02', title: takeHomeCopy.itemTitles.vascular, text: copy.vascular.key },
    { number: '03', title: takeHomeCopy.itemTitles.gradingTear, text: copy.grading.key },
    { number: '04', title: takeHomeCopy.itemTitles.discoid, text: `${takeHomeCopy.discoidDefinition}\n${copy.discoid.key}` },
    { number: '05', title: takeHomeCopy.itemTitles.therapy, text: copy.therapy.key },
  ], [copy, takeHomeCopy])
  const mainRef = useRef(null)
  const [openId, setOpenId] = useState(copy.sections[0].id)
  const [summaryOpen, setSummaryOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const { isRead, toggleRead, authError } = useLessonReadStatus('meniskus')

  const sectionIds = useMemo(() => copy.sections.map(section => section.id), [copy.sections])
  const [readSections, setReadSections] = usePersistedSectionProgress('meniskus', sectionIds, isRead)
  const withLang = (href) => lang === 'de' ? href : (href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`)

  const selectSection = (id) => {
    // Measure only after the previous panel has collapsed and the new one has opened.
    flushSync(() => {
      if (id === 'takehome') setSummaryOpen(true)
      else setOpenId(id)
    })
    window.history.replaceState(null, '', `#${id}`)
    document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' })
  }

  const toggleSectionRead = (id) => setReadSections(previous => {
    const next = new Set(previous)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    return next
  })

  const lessonComplete = readSections.size === sectionIds.length
  const toggleLessonComplete = () => {
    setReadSections(lessonComplete ? new Set() : new Set(sectionIds))
    if (isRead !== !lessonComplete) toggleRead()
  }

  const activeIndex = sectionIds.indexOf(openId)
  const continueLesson = () => {
    const nextIndex = activeIndex < 0 ? 0 : Math.min(activeIndex + 1, sectionIds.length - 1)
    selectSection(sectionIds[nextIndex])
  }

  const sectionProps = (id) => ({
    isOpen: id === 'takehome' ? summaryOpen : openId === id,
    isRead: readSections.has(id),
    onToggle: () => id === 'takehome' ? setSummaryOpen(value => !value) : selectSection(id),
    onToggleRead: () => toggleSectionRead(id),
    readLabel: sectionReadCopy.complete,
    readDoneLabel: sectionReadCopy.completed,
  })

  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (sectionIds.includes(id)) setOpenId(id)
    else if (id === 'takehome') setSummaryOpen(true)
  }, [sectionIds])

  useEffect(() => {
    document.body.style.overflow = previewImage ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [previewImage])

  return (
    <main
      className={styles.page}
      dir={isRTL ? 'rtl' : 'ltr'}
      lang={lang}
    >
      <header className={styles.header}>
        <div className={styles.topline}>
          <div className={styles.breadcrumb}>
            <Link href={withLang('/')} className={styles.breadLink}>RadYar</Link>
            <span>›</span>
            <Link href={withLang('/lernen/msk')} className={styles.breadLink}>{copy.breadcrumbMsk}</Link>
            <span>›</span>
            <span>{copy.breadcrumbCurrent}</span>
          </div>
          <span className={styles.author}>{copy.sourceLabel}</span>
        </div>

        <div className={styles.heroGrid}>
          <div className={styles.heroText}>
            <h1>{copy.title}</h1>
          </div>
          <div className={`${template.heroVisual} ${contentStyles.heroVisual}`} aria-hidden="true" />
        </div>

        <div className={styles.heroActions}>
          <button type="button" className={styles.takeHomeJump} onClick={() => selectSection('takehome')}><SectionIcon id="takehome" />{takeHomeCopy.title}<span aria-hidden="true">↓</span></button>
          <Link href={withLang(`/ueben/quiz?fach=msk&n=10&themen=meniskus&from=${encodeURIComponent(withLang('/msk/knie/meniskus'))}`)} className={`${styles.learnAction} ${styles.learnActionMcq}`}>
            <span><SectionIcon id="quiz" /></span>
            <span>{copy.actionMcq}</span>
          </Link>
          <Link href={withLang(`/flashcards/meniskus?from=${encodeURIComponent(withLang('/msk/knie/meniskus'))}`)} className={`${styles.learnAction} ${styles.learnActionFlash}`}>
            <span><SectionIcon id="flashcards" /></span>
            <span>{copy.actionFlash}</span>
          </Link>
        </div>

        <div className={styles.lessonProgress}>
          <div className={styles.progressTrack} role="progressbar" aria-label={sectionReadCopy.progress} aria-valuemin={0} aria-valuemax={sectionIds.length} aria-valuenow={readSections.size}><i style={{ width: `${(readSections.size / sectionIds.length) * 100}%` }} /></div>
          <span>{readSections.size} / {sectionIds.length} {sectionReadCopy.progress}</span>
          <div className={styles.progressActions}>
            <button type="button" className={styles.continueButton} onClick={continueLesson} disabled={activeIndex === sectionIds.length - 1}>{sectionReadCopy.continue}<span aria-hidden="true">→</span></button>
            <button type="button" className={`${styles.lessonCompleteButton} ${lessonComplete ? styles.lessonCompleteButtonDone : ''}`} aria-pressed={lessonComplete} onClick={toggleLessonComplete}><SectionIcon id="check" />{lessonComplete ? sectionReadCopy.lessonCompleted : sectionReadCopy.completeLesson}</button>
          </div>
          {authError && <div className={styles.progressAuthError} role="alert"><span>{READ_LABELS[lang]?.error || READ_LABELS.de.error}</span><Link href={withLang('/sign-in')}>{READ_LABELS[lang]?.signIn || READ_LABELS.de.signIn}</Link></div>}
        </div>

      </header>

      <div className={styles.layout}>
          <Sidebar sections={copy.sections} toc={copy.toc} activeId={openId} onClick={selectSection} />

        <article className={styles.main} ref={mainRef} data-disable-lesson-explorer="true">
          <Section id="anatomie" eyebrow="01" title={copy.anatomy.title} lead={copy.anatomy.lead} {...sectionProps('anatomie')}>
            <Table headers={copy.anatomy.tableHeaders} rows={copy.anatomy.tableRows} />
            <div className={`${styles.splitGrid} ${contentStyles.rootsGrid}`}>
              <div className={styles.card}>
                <h3>{copy.anatomy.rootsTitle}</h3>
                {copy.anatomy.rootsItems ? (
                  <div className={styles.plainList}>
                    {copy.anatomy.rootsItems.map(item => (
                      <p key={item.title}>
                        <strong>{item.title}</strong>
                        {item.text}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p>{copy.anatomy.rootsText}</p>
                )}
              </div>
              <ImageFigure src="/meniskus/anatomy-roots.png" alt={copy.anatomy.rootsTitle} caption={copy.anatomy.imageCaption} />
            </div>
            <Callout label={copy.keyLabel}>{copy.anatomy.key}</Callout>

            <div className={styles.subSectionBlock}>
              <h3 className={styles.subSectionTitle}>{copy.vascular.title}</h3>
              <p className={styles.subSectionLead}>{copy.vascular.lead}</p>
              <div className={contentStyles.vascularLayout}>
              <div className={styles.zoneGrid}>
                {copy.vascular.zones.map((zone, index) => (
                  <div key={zone.name} className={`${styles.zoneCard} ${styles[`zone${index + 1}`]}`}>
                    <h3>{zone.name}</h3>
                    <span>{zone.range}</span>
                    <p>{zone.status}</p>
                    <small>{zone.therapy}</small>
                  </div>
                ))}
              </div>
                <ImageFigure src="/meniskus/vascular-zones.png" alt={copy.vascular.title} />
              </div>
              <Callout label={copy.keyLabel}>{copy.vascular.key}</Callout>
            </div>
          </Section>

          <Section id="mrt" eyebrow="02" title={copy.mri.title} lead="" {...sectionProps('mrt')}>
            <MeniscusTextLesson lang={lang} />
          </Section>

          <Section id="grading" eyebrow="03" title={copy.grading.extendedTitle} lead="" {...sectionProps('grading')}>
            <p className={styles.subSectionLead}>{copy.grading.lead} {lang === 'de' ? 'Grad 0 entspricht einem homogen hypointensen, normalen Meniskus.' : lang === 'fa' ? 'درجهٔ ۰ مربوط به منیسک طبیعی با سیگنال هیپواینتنس هموژن است.' : 'Grade 0 describes a normal, homogeneously hypointense meniscus.'}</p>
            <LotyschClassification copy={copy.grading} lang={lang} />

            <div className={`${styles.subSectionBlock} ${contentStyles.gradingCases}`}>
              <h3 className={styles.subSectionTitle}>{copy.cases.title}</h3>
              <div className={styles.caseGrid}>
                {copy.cases.items.map(item => (
                  <LessonCaseFile key={item.caseId} lang={lang} caseData={{
                    heading: `Grade ${item.caseId === 'case-75168' ? '2c' : '2b'}`,
                    title: item.title, alt: item.title, initialFrame: item.initialFrame,
                    frames: Array.from({ length: item.frameCount }, (_, index) => `/meniskus/cases/${item.caseId}/frame-${String(index + 1).padStart(2, '0')}.${item.frameExt}`),
                    findings: [item.sequence, item.title], interpretation: `${item.label} · ${item.meta}`,
                    url: item.url, credit: item.credit,
                  }} />
                ))}
              </div>
            </div>
          </Section>


          <Section id="risstypen" eyebrow="04" title={copy.tearTypes.title} lead={copy.tearTypes.lead} {...sectionProps('risstypen')}>
            <figure className={styles.tearTypesFigure}>
              <img src="/meniskus/meniscal-tear-types.png" alt="Longitudinal, radial, horizontal, bucket-handle and flap meniscal tears with MRI signs" />
              <figcaption className={styles.aiImageNotice}>{copy.aiImageNotice}</figcaption>
            </figure>
            <TearTypeExplorer lang={lang} />
            <p className={styles.tearCaseIntro}>{copy.tearTypes.caseIntro}</p>
            <div className={styles.tearCaseGrid}>
              {TEAR_CASES.map(item => {
                const caseCopy = copy.tearTypes.caseItems[item.id]
                return (
                  <LessonCaseFile key={item.id} lang={lang} caseData={{
                    title: caseCopy.title, alt: caseCopy.title, initialFrame: item.initialFrame, frames: item.frames,
                    findings: [item.sequence, caseCopy.sign], interpretation: caseCopy.sign,
                    url: item.study, credit: `Case courtesy of ${item.contributor}, Radiopaedia.org · rID ${item.caseId}`,
                  }} />
                )
              })}
            </div>
            <Callout type="cave" label={copy.tearTypes.caveTitle}>{copy.tearTypes.caveText}</Callout>
          </Section>

          <Section id="discoider" eyebrow="05" title={copy.discoid.title} lead={copy.discoid.lead} {...sectionProps('discoider')}>
            <div className={styles.discoidStats}>
              {copy.discoid.stats.map(stat => (
                <div key={stat.label} className={styles.discoidStatCard}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                  <p>{stat.text}</p>
                </div>
              ))}
            </div>
            <figure className={styles.discoidFigure}>
              <img src="/meniskus/discoid-meniscus-mri-v2.png" alt="Discoid lateral meniscus MRI criteria with lateral-only coronal width measurement and six sagittal slices" />
              <figcaption className={styles.aiImageNotice}>{copy.aiImageNotice}</figcaption>
            </figure>
            <div className={styles.card}>
              <h3 className={styles.discoidMriTitle}>{copy.discoid.mriTitle}</h3>
              <Table headers={copy.discoid.mriHeaders} rows={copy.discoid.mriRows} />
            </div>
            <Callout label={copy.keyLabel}>{copy.discoid.key}</Callout>
          </Section>

          <Section
            id="therapie"
            eyebrow="06"
            title={<>{copy.therapy.titlePrefix || copy.therapy.title}: <span className={styles.greenTitle}>{copy.therapy.saveText || 'Save the Meniscus'}</span></>}
            lead={copy.therapy.lead}
            {...sectionProps('therapie')}
          >
            <Table headers={copy.therapy.tableHeaders} rows={copy.therapy.tableRows} />
            <Callout label={copy.keyLabel}>{copy.therapy.key}</Callout>
          </Section>

          <Section id="lernvideo" eyebrow="07" title={copy.video.title} lead="" {...sectionProps('lernvideo')}>
            <div className={styles.videoCard}>
              <div className={styles.videoFrameWrap}>
                <iframe
                  src={YOUTUBE_EMBED_URL}
                  title={copy.video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <h3>{copy.video.title}</h3>
              <p>{copy.video.text}</p>
              <a href={copy.video.url} target="_blank" rel="noopener noreferrer" className={styles.videoButton}>
                ▶ {copy.video.cta}
              </a>
            </div>
          </Section>

          <Section id="takehome" eyebrow="08" title={takeHomeCopy.title} lead="" className={styles.takeHomeSection} {...sectionProps('takehome')}>
            <p className={contentStyles.summaryLead}>{takeHomeCopy.lead}</p>
            <TakeHomeItems items={takeHomeItems} />
          </Section>

          <details className={styles.sourcesDetails}>
            <summary>{sourceLabels.title}</summary>
            <ol className={styles.sourcesList}>
              {SOURCES.map(source => (
                <li key={source.href}>
                  <a href={source.href} target="_blank" rel="noopener noreferrer">{source.label}</a>
                </li>
              ))}
            </ol>
          </details>
        </article>
      </div>

      {previewImage && (
        <div className={styles.imageModal} role="dialog" aria-modal="true" onClick={() => setPreviewImage(null)}>
          <div className={styles.imageModalContent} onClick={(event) => event.stopPropagation()}>
            <button type="button" className={styles.imageModalClose} onClick={() => setPreviewImage(null)} aria-label={copy.closePreview}>×</button>
            <img src={previewImage.src} alt={previewImage.alt} />
          </div>
        </div>
      )}

      <MobileLearningPath sections={copy.sections} toc={copy.toc} activeId={openId} readSections={readSections} onSelect={selectSection} />

    </main>
  )
}
