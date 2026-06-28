'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import InProgressBanner from '@/components/InProgressBanner'
import styles from './page.module.css'

const LESSONS = {
  kraniozervikaler: {
    readId: 'kraniozervikaler-uebergang-trauma',
    href: '/wirbelsaeule/trauma/kraniozervikaler-uebergang',
    title: 'Kraniozervikaler Übergang',
    subtitle: 'Okziput, C1, C2, Dens und Bandapparat strukturiert beurteilen',
    heroCards: [
      { value: 'C0-C2', label: 'Hochrisikozone', text: 'Instabilität kann trotz kleiner Fraktur schwerwiegend sein' },
      { value: 'CT + MPR', label: 'Akutstandard', text: 'Dünnschichtige Rekonstruktionen in allen Ebenen' },
      { value: 'MRT/CTA', label: 'gezielt ergänzen', text: 'Bänder, Myelon, epidurales Hämatom und Gefäße' },
    ],
    sections: [
      { id: 'grundlagen', label: 'Grundlagen' },
      { id: 'anatomie', label: 'Anatomie' },
      { id: 'klassifikation', label: 'Klassifikation' },
      { id: 'bildgebung', label: 'Bildgebung' },
      { id: 'befundung', label: 'Befundung' },
      { id: 'fallstricke', label: 'Fallstricke' },
      { id: 'takehome', label: 'Take home' },
    ],
    basics: {
      title: 'Warum C0 bis C2 besonders kritisch ist',
      lead: 'Verletzungen am kraniozervikalen Übergang sind selten, aber radiologisch entscheidend: kleine Fehlstellungen oder Bandverletzungen können eine instabile Situation mit Myelongefährdung anzeigen.',
      items: [
        { title: 'Systematik', text: 'Okzipitalkondylen, C1-Ring, Dens, C2-Bogen, Atlanto-okzipital- und Atlanto-axialgelenke immer in einer festen Reihenfolge prüfen.' },
        { title: 'Stabilität', text: 'Die knöcherne Verletzung allein reicht nicht. Lig. transversum atlantis, Alarligamente und Membrana tectoria bestimmen die klinische Relevanz mit.' },
        { title: 'Notfallfrage', text: 'Nicht nur Fraktur ja oder nein, sondern: Liegt Dissoziation, Subluxation, Spinalkanalgefährdung oder Gefäßrisiko vor?' },
      ],
      key: 'Am kraniozervikalen Übergang ist die Gelenkstellung genauso wichtig wie die Frakturlinie.',
    },
    anatomy: {
      title: 'Befundrelevante Anatomie',
      lead: 'Die Anatomie sollte so gelesen werden, dass Instabilitätszeichen aktiv gesucht werden.',
      headers: ['Struktur', 'Worauf achten', 'Bedeutung'],
      rows: [
        ['Okzipitalkondylen', 'Fraktur, Impaktion, Dislokation, Gelenkflächeninkongruenz', 'Hinweis auf axiale Kompression oder Dissoziation'],
        ['C1-Ring', 'Vorderer und hinterer Bogen, laterale Massen, Summenversatz', 'Jefferson-Muster und Transversalligament-Risiko'],
        ['Dens / C2', 'Frakturlinie, Basisbeteiligung, Angulation, C2-Bogen', 'Densfraktur und Hangman-Verletzung unterscheiden'],
        ['Bänder', 'Lig. transversum, Alarligamente, Membrana tectoria', 'MRT-relevante Stabilitätskomponente'],
      ],
    },
    classification: {
      title: 'Wichtige Verletzungsmuster',
      lead: 'Im Befund helfen klare Musterbegriffe, solange zusätzlich Dislokation und Stabilität beschrieben werden.',
      headers: ['Muster', 'Leitbefund', 'Befundrelevanz'],
      rows: [
        ['Okzipitalkondylenfraktur', 'Fragment, Impaktion oder Avulsion am Kondylus', 'Dislokation und C0/C1-Stellung bestimmen Risiko'],
        ['Jefferson-Fraktur', 'C1-Ringfraktur mit lateralem Massenausweichen', 'Transversalligament-Schaden mitdenken'],
        ['Densfraktur', 'Typ I bis III nach Anderson-D’Alonzo', 'Typ II ist besonders pseudarthrosegefährdet'],
        ['Hangman-Fraktur', 'Traumatische Spondylolisthese C2 mit Bogen-/Pars-Beteiligung', 'C2/C3-Dislokation und Diskus/Bandkomplex prüfen'],
        ['Atlanto-okzipitale Dissoziation', 'Fehlstellung C0/C1, verbreiterte Gelenkspalten, Bänderschaden', 'Hochinstabiler Notfallbefund'],
      ],
      key: 'Bei jedem Muster zusätzlich Gelenkstellung, Spinalkanal und Bandverdacht nennen.',
    },
    imaging: {
      title: 'Bildgebung',
      lead: 'CT, MRT und CTA beantworten unterschiedliche Fragen und sollten gezielt kombiniert werden.',
      items: [
        { title: 'CT', text: 'Dünnschicht-CT mit sagittalen, koronaren und axialen Rekonstruktionen ist die Basis im Akuttrauma.' },
        { title: 'MRT', text: 'Indiziert bei neurologischem Defizit, Bandverdacht, epiduralem Hämatom, Myelopathie oder diskrepanter Klinik.' },
        { title: 'CTA', text: 'Erwägen bei Fraktur durch Foramen transversarium, Subluxation, hochzervikalem Hochenergietrauma oder Gefäßsymptomen.' },
      ],
      cave: 'Eine unauffällige CT-Knochenstellung schließt eine relevante Bandverletzung nicht sicher aus.',
    },
    reporting: {
      title: 'Strukturierter Befund',
      lead: 'Ein guter Befund beantwortet die mechanisch und klinisch entscheidenden Fragen.',
      items: [
        { title: '1. Segment und Muster', text: 'C0/C1/C2 exakt benennen, Frakturtyp und beteiligte Gelenke angeben.' },
        { title: '2. Alignment', text: 'Atlantodentales Intervall, C0/C1- und C1/C2-Stellung, laterale Massen und Angulation beschreiben.' },
        { title: '3. Neurologie-Risiko', text: 'Spinalkanalweite, Myelonkompression, epidurales Hämatom und prävertebrale Weichteile adressieren.' },
        { title: '4. Zusatzdiagnostik', text: 'MRT oder CTA konkret empfehlen, wenn Band-, Myelon- oder Gefäßrisiko besteht.' },
      ],
      key: 'Instabilitätsverdacht muss im Impressionsteil klar stehen, nicht nur im Fließtext versteckt sein.',
    },
    pitfalls: {
      title: 'Fallstricke',
      lead: 'Die häufigsten Fehler entstehen durch zu frühes Stoppen nach der ersten sichtbaren Fraktur.',
      items: [
        { title: 'Kleines Kondylenfragment', text: 'Nicht als harmloser Randanbau abtun, sondern C0/C1-Stellung und Bandzeichen prüfen.' },
        { title: 'Rotationsstellung', text: 'Kann C1/C2-Subluxation vortäuschen oder verschleiern. Symmetrie in mehreren Ebenen beurteilen.' },
        { title: 'Densfraktur', text: 'Feine Frakturlinien an der Basis können in einer Ebene leicht übersehen werden.' },
      ],
    },
    takehome: [
      { title: 'Gelenkstellung zuerst', text: 'Bei C0 bis C2 sind Alignment und Dissoziation zentrale Notfallfragen.' },
      { title: 'Bandapparat mitdenken', text: 'Transversalligament, Alarligamente und Membrana tectoria entscheiden über Stabilität.' },
      { title: 'Gezielt eskalieren', text: 'MRT und CTA nicht routinemäßig, sondern bei klaren Risikozeichen empfehlen.' },
    ],
  },
  hws: {
    readId: 'hws-verletzungen',
    href: '/wirbelsaeule/trauma/hws-verletzungen',
    title: 'HWS-Verletzungen',
    subtitle: 'Subaxiale HWS von C3 bis C7: Fraktur, Luxation, Diskus, Bänder und Myelon',
    heroCards: [
      { value: 'C3-C7', label: 'subaxiale HWS', text: 'Alignment, Facetten und posteriorer Komplex zählen' },
      { value: 'CT', label: 'Frakturdiagnostik', text: 'Knochen, Facettenstellung und Spinalkanal' },
      { value: 'MRT', label: 'Ligamente/Myelon', text: 'bei Defizit, Diskrepanz oder Instabilitätsverdacht' },
    ],
    sections: [
      { id: 'grundlagen', label: 'Grundlagen' },
      { id: 'anatomie', label: 'Anatomie' },
      { id: 'klassifikation', label: 'Klassifikation' },
      { id: 'bildgebung', label: 'Bildgebung' },
      { id: 'befundung', label: 'Befundung' },
      { id: 'fallstricke', label: 'Fallstricke' },
      { id: 'takehome', label: 'Take home' },
    ],
    basics: {
      title: 'Die subaxiale HWS systematisch lesen',
      lead: 'Bei HWS-Trauma geht es nicht nur um sichtbare Fraktur, sondern um das Zusammenspiel aus knöchernem Schaden, Facettengelenkstellung, diskoligamentärer Verletzung und Rückenmarkgefährdung.',
      items: [
        { title: 'Alignment', text: 'Vordere und hintere Wirbelkörperlinie, spinolaminäre Linie und Dornfortsatzreihe auf Stufen und Aufweitung prüfen.' },
        { title: 'Facetten', text: 'Unilaterale oder bilaterale Verhakung kann subtil sein und ist hoch relevant für Stabilität.' },
        { title: 'Weichteile', text: 'Prävertebrale Schwellung, epidurales Hämatom und Myelonsignal aktiv suchen.' },
      ],
      key: 'Eine HWS-Verletzung ist erst vollständig beurteilt, wenn Facettenstellung, hinterer Komplex und Myelon berücksichtigt sind.',
    },
    anatomy: {
      title: 'Befundrelevante Anatomie',
      lead: 'Die subaxiale HWS sollte in vorderes, mittleres und posteriores Stabilitätskonzept übersetzt werden.',
      headers: ['Baustein', 'CT/MRT-Zeichen', 'Bedeutung'],
      rows: [
        ['Wirbelkörper / Hinterkante', 'Keilung, Berstung, Retropulsion, Spinalkanalstenose', 'Kompressions- und Berstungsverletzung'],
        ['Diskus / Längsbänder', 'Diskusverletzung, ALL-/PLL-Signal, Diskusraumaufweitung', 'Diskoligamentäre Instabilität'],
        ['Facetten / Pedikel / Laminae', 'Luxation, Subluxation, Fraktur, Gelenkspaltaufweitung', 'Rotations- oder Distraktionsverletzung'],
        ['Hinterer Bandkomplex', 'Interspinöse Aufweitung, STIR-Ödem, Kapselverletzung', 'Instabilitätsmarker'],
      ],
    },
    classification: {
      title: 'Muster erkennen',
      lead: 'Mechanismus und Morphologie helfen, die Verletzungsschwere verständlich zu kommunizieren.',
      headers: ['Muster', 'Typische Zeichen', 'Warum relevant?'],
      rows: [
        ['Kompression / Berstung', 'Wirbelkörperhöhenminderung, Hinterkantenbeteiligung', 'Spinalkanal und Kyphose bestimmen Risiko'],
        ['Flexions-Distraktion', 'Interspinöse Aufweitung, Facettensubluxation, hinterer Komplex', 'Häufig instabil'],
        ['Facettenluxation', 'Unilateral oder bilateral verhakte Facetten', 'Reposition, MRT und OP-Planung beeinflusst'],
        ['Extension', 'Vordere Diskusraumaufweitung, ALL-Verletzung, teardrop-Fragment', 'Bei ankylosierter HWS besonders gefährlich'],
        ['Dornfortsatzfraktur', 'Clay-shoveler-Muster oder Begleitzeichen', 'Kann Marker eines größeren Flexionstraumas sein'],
      ],
      key: 'Facettenluxation und diskoligamentäre Verletzung wiegen oft schwerer als die Größe eines Knochenfragments.',
    },
    imaging: {
      title: 'Bildgebung',
      lead: 'CT und MRT sind komplementär: CT zeigt die Fraktur, MRT zeigt den verletzten Funktionsapparat.',
      items: [
        { title: 'CT', text: 'Standard bei relevantem Trauma. Sagittale und koronare Rekonstruktionen sind für Alignment und Facetten essenziell.' },
        { title: 'MRT', text: 'Bei neurologischem Defizit, radikulären Ausfällen, Myelopathie, diskoligamentärem Verdacht oder Klinik-CT-Diskrepanz.' },
        { title: 'Gefäße', text: 'CTA bei Foramen-transversarium-Beteiligung, Subluxation, Hochrasanztrauma oder Verdacht auf Vertebralisverletzung.' },
      ],
      cave: 'Degenerative Stenose kann eine kleine traumatische Zusatzverletzung klinisch stark relevant machen.',
    },
    reporting: {
      title: 'Strukturierter Befund',
      lead: 'Der Bericht sollte das operative und konservative Management direkt unterstützen.',
      items: [
        { title: '1. Höhe und Morphologie', text: 'Segment, Frakturanteile, Wirbelkörperhöhe, Hinterkante, Laminae, Pedikel und Dornfortsatz nennen.' },
        { title: '2. Alignment und Facetten', text: 'Subluxation, Luxation, Facettenverhakung und Interspinösabstand beschreiben.' },
        { title: '3. Spinalkanal / Myelon', text: 'Retropulsion, epidurales Hämatom, Myelonkompression und intramedulläres Signal dokumentieren.' },
        { title: '4. Stabilität', text: 'Stabile, potentiell instabile oder hochinstabile Konstellation klar kommunizieren.' },
      ],
      key: 'Impression: Höhe, Verletzungsmuster, Instabilität und neurologisch relevante Kompression in einem Satz zusammenführen.',
    },
    pitfalls: {
      title: 'Fallstricke',
      lead: 'Subtile Fehlstellungen sind in der HWS oft wichtiger als auffällige Einzelbefunde.',
      items: [
        { title: 'Unilaterale Facettenverhakung', text: 'Kann als Rotation fehlinterpretiert werden. Facetten in axialer und sagittaler Ebene vergleichen.' },
        { title: 'Isolierte Dornfortsatzfraktur', text: 'Nicht automatisch banal. Bei Hochenergietrauma nach posteriorer Bandverletzung suchen.' },
        { title: 'Prävertebrale Schwellung', text: 'Kann ein Hinweis auf Diskus-, Band- oder Ösophagusnahe Verletzung sein.' },
      ],
    },
    takehome: [
      { title: 'Alignment zählt', text: 'Linien, Facetten und Interspinösabstand sind Pflichtbestandteile jeder HWS-Trauma-Lektüre.' },
      { title: 'MRT gezielt einsetzen', text: 'Bei Neurologie oder Instabilitätsverdacht beantwortet MRT die entscheidende Zusatzfrage.' },
      { title: 'Stabilität benennen', text: 'Die therapeutische Relevanz hängt an klarer Kommunikation der Instabilität.' },
    ],
  },
  thorakolumbal: {
    readId: 'bws-lws-frakturen',
    href: '/wirbelsaeule/trauma/bws-lws-frakturen',
    title: 'BWS / LWS-Frakturen',
    subtitle: 'Thorakolumbale Frakturen nach Morphologie, posteriorer Bandintegrität und Spinalkanal einordnen',
    heroCards: [
      { value: 'AO Spine', label: 'Morphologie', text: 'Kompression, Distraktion oder Translation' },
      { value: 'PLC', label: 'posteriorer Komplex', text: 'entscheidend für Stabilität und OP-Indikation' },
      { value: 'CT/MRT', label: 'komplementär', text: 'Knochenmuster plus Bänder, Ödem und Neuralstrukturen' },
    ],
    sections: [
      { id: 'grundlagen', label: 'Grundlagen' },
      { id: 'anatomie', label: 'Anatomie' },
      { id: 'klassifikation', label: 'Klassifikation' },
      { id: 'bildgebung', label: 'Bildgebung' },
      { id: 'befundung', label: 'Befundung' },
      { id: 'fallstricke', label: 'Fallstricke' },
      { id: 'takehome', label: 'Take home' },
    ],
    basics: {
      title: 'Stabilität statt nur Höhenminderung',
      lead: 'Thorakolumbale Frakturen werden nach Morphologie, posteriorem Bandkomplex und neurologischem Risiko eingeordnet. Die reine Prozentangabe der Höhenminderung reicht für einen guten Befund nicht aus.',
      items: [
        { title: 'Mechanismus', text: 'Kompression, Berstung, Distraktion und Translation erzeugen unterschiedliche Stabilitätsrisiken.' },
        { title: 'Übergangszone', text: 'Der thorakolumbale Übergang ist besonders verletzungsanfällig und sollte bei Trauma großzügig mitbeurteilt werden.' },
        { title: 'Neuralstrukturen', text: 'Hinterkantenretropulsion, Spinalkanalstenose, Conus- oder Cauda-Kompression explizit nennen.' },
      ],
      key: 'Die zentrale Frage lautet: stabile Kompression oder instabile mehrsäulige Verletzung?',
    },
    anatomy: {
      title: 'Befundrelevante Anatomie',
      lead: 'Die Fraktur muss in vordere Säule, Wirbelkörperhinterkante, Pedikel/Bögen und posterioren Bandkomplex übersetzt werden.',
      headers: ['Struktur', 'Befundzeichen', 'Bedeutung'],
      rows: [
        ['Wirbelkörper', 'Höhenminderung, Spaltbildung, Keilung, Berstung', 'Morphologie und Kyphose'],
        ['Hinterkante', 'Retropulsion, Fragment, Spinalkanaleinengung', 'Neurologisches Risiko'],
        ['Pedikel / Laminae / Dornfortsatz', 'Fraktur oder Aufweitung', 'Hinweis auf mehrsäulige Verletzung'],
        ['Posteriorer Bandkomplex', 'Interspinösödem, Facettenkapsel, supraspinöses Ligament', 'Instabilitätsentscheidung'],
      ],
    },
    classification: {
      title: 'AO-Spine-Logik für den Befund',
      lead: 'Die AO-Spine-Kategorien helfen, CT- und MRT-Befunde klar in stabile und instabile Muster zu ordnen.',
      headers: ['Kategorie', 'Morphologie', 'Radiologische Kernaussage'],
      rows: [
        ['A1', 'Keilkompression / Endplattenimpression', 'Meist stabil, Hinterkante intakt'],
        ['A3', 'Inkomplette Berstung', 'Eine Endplatte plus Hinterkante beteiligt'],
        ['A4', 'Komplette Berstung', 'Beide Endplatten und Hinterkante beteiligt'],
        ['B', 'Distraktionsverletzung', 'Posteriorer oder anteriorer Zuggurtungsschaden'],
        ['C', 'Translation / Rotation', 'Dislokation in beliebiger Ebene, hochinstabil'],
      ],
      key: 'Sobald Distraktion oder Translation vorliegt, ist die Verletzung nicht mehr als einfache Sinterung zu behandeln.',
    },
    imaging: {
      title: 'Bildgebung',
      lead: 'Die Modalität richtet sich nach Akutsituation, Stabilitätsfrage und Alter der Fraktur.',
      items: [
        { title: 'CT', text: 'Zeigt Frakturmorphologie, Hinterkante, Spinalkanal und Zusatzfrakturen. Sagittale Rekonstruktionen sind Pflicht.' },
        { title: 'MRT', text: 'Bei Verdacht auf posterioren Bandkomplexschaden, Myelon-/Conus-/Cauda-Beteiligung oder unklarem Frakturalter.' },
        { title: 'Osteoporose / Tumor', text: 'STIR-Ödem, Hinterkantenkonvexität, Weichteilmasse und Pedikelbeteiligung zur Differenzierung nutzen.' },
      ],
      cave: 'Bei ankylosierter Wirbelsäule kann eine scheinbar feine Frakturlinie eine hochinstabile Drei-Säulen-Verletzung bedeuten.',
    },
    reporting: {
      title: 'Strukturierter Befund',
      lead: 'Ein guter Bericht macht die Fraktur für Traumatologie, Neurochirurgie und Schmerztherapie handhabbar.',
      items: [
        { title: '1. Segment', text: 'Höhe, Übergangsregion und Mehrsegmentbefall angeben.' },
        { title: '2. Morphologie', text: 'Kompression, Berstung, Distraktion oder Translation beschreiben; AO-Spine-ähnliche Einordnung nennen, wenn möglich.' },
        { title: '3. Stabilität', text: 'Posterioren Bandkomplex, Facettengelenke, Pedikel/Laminae und Kyphose adressieren.' },
        { title: '4. Kanal / Nerven', text: 'Retropulsion, prozentuale oder qualitative Spinalkanalstenose, Conus/Cauda-Kompression nennen.' },
        { title: '5. Alter / Ursache', text: 'Akut-ödematös, chronisch oder malignitätsverdächtig differenzieren, wenn MRT vorliegt.' },
      ],
      key: 'Impression: Frakturhöhe, Morphologie, Stabilitätsverdacht und Spinalkanalrelevanz knapp zusammenfassen.',
    },
    pitfalls: {
      title: 'Fallstricke',
      lead: 'Thorakolumbale Frakturen werden zu oft als reine Sinterungen unterschätzt.',
      items: [
        { title: 'Distraktion übersehen', text: 'Interspinöse Aufweitung und horizontale Frakturausläufer in sagittalen Rekonstruktionen aktiv suchen.' },
        { title: 'Akut vs. alt', text: 'In der CT oft unsicher. MRT-Ödemmuster oder Voraufnahmen helfen.' },
        { title: 'Ankylosierte Wirbelsäule', text: 'DISH oder Spondylitis ankylosans machen lange Hebelarme und instabile Frakturen wahrscheinlich.' },
      ],
    },
    takehome: [
      { title: 'Morphologie sauber nennen', text: 'Kompression, Berstung, Distraktion oder Translation sind mehr wert als eine isolierte Höhenminderung.' },
      { title: 'PLC entscheidet mit', text: 'Der posteriore Bandkomplex ist zentral für Stabilität und Therapie.' },
      { title: 'Kanalrelevanz quantifizieren', text: 'Hinterkantenretropulsion und neurale Kompression gehören in den Befund.' },
    ],
  },
}

const SECTION_LABELS = {
  en: {
    grundlagen: 'Basics',
    anatomie: 'Relevant anatomy',
    klassifikation: 'Classification',
    bildgebung: 'Imaging',
    befundung: 'Reporting',
    fallstricke: 'Pitfalls',
    takehome: 'Take home',
  },
  fa: {
    grundlagen: 'مبانی',
    anatomie: 'آناتومی مرتبط با گزارش',
    klassifikation: 'طبقه بندی',
    bildgebung: 'تصویربرداری',
    befundung: 'گزارش ساختاریافته',
    fallstricke: 'دام ها',
    takehome: 'نکات کلیدی',
  },
}

const baseSections = lang => LESSONS.kraniozervikaler.sections.map(section => ({
  id: section.id,
  label: SECTION_LABELS[lang]?.[section.id] || section.label,
}))

const LOCALIZED_LESSONS = {
  en: {
    kraniozervikaler: {
      readId: 'kraniozervikaler-uebergang-trauma',
      href: '/wirbelsaeule/trauma/kraniozervikaler-uebergang',
      title: 'Craniocervical junction',
      subtitle: 'Assess occiput, C1, C2, dens and ligamentous stability in a structured way',
      heroCards: [
        { value: 'C0-C2', label: 'high-risk zone', text: 'Instability can be severe despite a small fracture' },
        { value: 'CT + MPR', label: 'acute standard', text: 'Thin-slice reconstructions in all planes' },
        { value: 'MRI/CTA', label: 'targeted add-on', text: 'Ligaments, cord, epidural haematoma and vessels' },
      ],
      sections: baseSections('en'),
      basics: {
        title: 'Why C0 to C2 is critical',
        lead: 'Craniocervical injuries are uncommon but decisive: subtle malalignment or ligament injury may indicate an unstable lesion with cord risk.',
        items: [
          { title: 'Systematic review', text: 'Check occipital condyles, C1 ring, dens, C2 arch and atlanto-occipital/atlanto-axial joints in a fixed order.' },
          { title: 'Stability', text: 'Bone injury alone is not enough. Transverse ligament, alar ligaments and tectorial membrane define clinical relevance.' },
          { title: 'Emergency question', text: 'Report dissociation, subluxation, canal compromise and vascular risk, not just fracture yes or no.' },
        ],
        key: 'At the craniocervical junction, joint alignment is as important as the fracture line.',
      },
      anatomy: {
        title: 'Relevant anatomy for reporting',
        lead: 'Read the anatomy with active search for instability signs.',
        headers: ['Structure', 'What to check', 'Meaning'],
        rows: [
          ['Occipital condyles', 'Fracture, impaction, displacement, joint incongruity', 'Axial compression or dissociation'],
          ['C1 ring', 'Anterior/posterior arch, lateral masses, lateral mass offset', 'Jefferson pattern and transverse ligament risk'],
          ['Dens / C2', 'Fracture line, base involvement, angulation, C2 arch', 'Separate dens fracture from hangman injury'],
          ['Ligaments', 'Transverse ligament, alar ligaments, tectorial membrane', 'MRI-relevant stability component'],
        ],
      },
      classification: {
        title: 'Important injury patterns',
        lead: 'Pattern names help, but displacement and stability must still be described.',
        headers: ['Pattern', 'Key finding', 'Reporting relevance'],
        rows: [
          ['Occipital condyle fracture', 'Fragment, impaction or avulsion', 'Risk depends on displacement and C0/C1 alignment'],
          ['Jefferson fracture', 'C1 ring fracture with lateral mass spread', 'Consider transverse ligament injury'],
          ['Dens fracture', 'Anderson-D’Alonzo type I to III', 'Type II has high non-union risk'],
          ['Hangman fracture', 'Traumatic C2 spondylolisthesis with pars/arch injury', 'Check C2/C3 displacement and disc-ligament complex'],
          ['Atlanto-occipital dissociation', 'C0/C1 malalignment, widened joints, ligament injury', 'Highly unstable emergency finding'],
        ],
        key: 'For every pattern, state alignment, canal compromise and suspected ligament injury.',
      },
      imaging: {
        title: 'Imaging',
        lead: 'CT, MRI and CTA answer different questions and should be combined selectively.',
        items: [
          { title: 'CT', text: 'Thin-slice CT with sagittal, coronal and axial reconstructions is the acute trauma basis.' },
          { title: 'MRI', text: 'Indicated for neurological deficit, suspected ligament injury, epidural haematoma, myelopathy or clinical mismatch.' },
          { title: 'CTA', text: 'Consider with transverse foramen fracture, subluxation, high-energy upper cervical trauma or vascular symptoms.' },
        ],
        cave: 'Normal osseous alignment on CT does not safely exclude relevant ligament injury.',
      },
      reporting: {
        title: 'Structured report',
        lead: 'A good report answers the mechanical and clinical management questions.',
        items: [
          { title: '1. Segment and pattern', text: 'Name C0/C1/C2 precisely and describe fracture type plus involved joints.' },
          { title: '2. Alignment', text: 'Describe atlantodental interval, C0/C1 and C1/C2 alignment, lateral masses and angulation.' },
          { title: '3. Neurologic risk', text: 'Address canal width, cord compression, epidural haematoma and prevertebral soft tissues.' },
          { title: '4. Additional imaging', text: 'Recommend MRI or CTA when ligament, cord or vascular risk is present.' },
        ],
        key: 'Suspected instability belongs clearly in the impression, not hidden in the body text.',
      },
      pitfalls: {
        title: 'Pitfalls',
        lead: 'Errors often happen when the reading stops after the first visible fracture.',
        items: [
          { title: 'Small condyle fragment', text: 'Do not dismiss it as incidental; check C0/C1 alignment and ligament signs.' },
          { title: 'Rotation', text: 'Can mimic or mask C1/C2 subluxation. Compare symmetry in multiple planes.' },
          { title: 'Dens fracture', text: 'Fine basal fracture lines may be missed in a single plane.' },
        ],
      },
      takehome: [
        { title: 'Alignment first', text: 'At C0 to C2, alignment and dissociation are core emergency questions.' },
        { title: 'Think ligaments', text: 'Transverse ligament, alar ligaments and tectorial membrane determine stability.' },
        { title: 'Escalate selectively', text: 'Recommend MRI and CTA when clear risk signs are present.' },
      ],
    },
    hws: {
      readId: 'hws-verletzungen',
      href: '/wirbelsaeule/trauma/hws-verletzungen',
      title: 'Cervical spine injuries',
      subtitle: 'Subaxial cervical spine from C3 to C7: fracture, dislocation, disc, ligaments and cord',
      heroCards: [
        { value: 'C3-C7', label: 'subaxial C-spine', text: 'Alignment, facets and posterior complex matter' },
        { value: 'CT', label: 'fracture diagnosis', text: 'Bone, facet position and spinal canal' },
        { value: 'MRI', label: 'ligaments/cord', text: 'For deficit, mismatch or suspected instability' },
      ],
      sections: baseSections('en'),
      basics: {
        title: 'Read the subaxial cervical spine systematically',
        lead: 'Cervical trauma assessment combines osseous injury, facet alignment, disco-ligamentous damage and cord risk.',
        items: [
          { title: 'Alignment', text: 'Check anterior/posterior vertebral lines, spinolaminar line and spinous process row for steps or widening.' },
          { title: 'Facets', text: 'Unilateral or bilateral locking may be subtle and is highly relevant for stability.' },
          { title: 'Soft tissues', text: 'Actively search for prevertebral swelling, epidural haematoma and cord signal.' },
        ],
        key: 'A cervical injury is completely assessed only when facets, posterior complex and cord are considered.',
      },
      anatomy: {
        title: 'Relevant anatomy for reporting',
        lead: 'Translate the subaxial cervical spine into anterior, middle and posterior stability components.',
        headers: ['Component', 'CT/MRI sign', 'Meaning'],
        rows: [
          ['Vertebral body / posterior wall', 'Wedge, burst, retropulsion, canal stenosis', 'Compression or burst injury'],
          ['Disc / longitudinal ligaments', 'Disc injury, ALL/PLL signal, disc-space widening', 'Disco-ligamentous instability'],
          ['Facets / pedicles / laminae', 'Dislocation, subluxation, fracture, joint widening', 'Rotational or distraction injury'],
          ['Posterior ligamentous complex', 'Interspinous widening, STIR oedema, capsular injury', 'Instability marker'],
        ],
      },
      classification: {
        title: 'Recognise patterns',
        lead: 'Mechanism and morphology communicate severity clearly.',
        headers: ['Pattern', 'Typical signs', 'Why relevant?'],
        rows: [
          ['Compression / burst', 'Body height loss, posterior wall involvement', 'Canal and kyphosis define risk'],
          ['Flexion-distraction', 'Interspinous widening, facet subluxation, posterior complex injury', 'Often unstable'],
          ['Facet dislocation', 'Unilateral or bilateral locked facets', 'Affects reduction, MRI and surgery planning'],
          ['Extension', 'Anterior disc-space widening, ALL injury, teardrop fragment', 'Especially dangerous in ankylosed spine'],
          ['Spinous process fracture', 'Clay-shoveler pattern or associated signs', 'May mark larger flexion trauma'],
        ],
        key: 'Facet dislocation and disco-ligamentous injury often matter more than fragment size.',
      },
      imaging: {
        title: 'Imaging',
        lead: 'CT and MRI are complementary: CT shows fracture, MRI shows the injured functional apparatus.',
        items: [
          { title: 'CT', text: 'Standard for relevant trauma. Sagittal and coronal reconstructions are essential for alignment and facets.' },
          { title: 'MRI', text: 'Use for neurological deficit, radicular symptoms, myelopathy, suspected ligament injury or clinical-CT mismatch.' },
          { title: 'Vessels', text: 'CTA for transverse foramen involvement, subluxation, high-energy trauma or suspected vertebral artery injury.' },
        ],
        cave: 'Degenerative stenosis can make a small traumatic additional injury clinically important.',
      },
      reporting: {
        title: 'Structured report',
        lead: 'The report should directly support operative or conservative management.',
        items: [
          { title: '1. Level and morphology', text: 'Name segment, fracture parts, body height, posterior wall, laminae, pedicles and spinous process.' },
          { title: '2. Alignment and facets', text: 'Describe subluxation, dislocation, locked facets and interspinous distance.' },
          { title: '3. Canal / cord', text: 'Document retropulsion, epidural haematoma, cord compression and intramedullary signal.' },
          { title: '4. Stability', text: 'Clearly communicate stable, potentially unstable or highly unstable pattern.' },
        ],
        key: 'Impression should combine level, injury pattern, instability and neurologic compression in one clear statement.',
      },
      pitfalls: {
        title: 'Pitfalls',
        lead: 'Subtle malalignment is often more important than an obvious isolated finding.',
        items: [
          { title: 'Unilateral locked facet', text: 'May be mistaken for rotation. Compare facets on axial and sagittal images.' },
          { title: 'Isolated spinous fracture', text: 'Not automatically trivial. Look for posterior ligament injury after high-energy trauma.' },
          { title: 'Prevertebral swelling', text: 'Can indicate disc, ligament or adjacent aerodigestive injury.' },
        ],
      },
      takehome: [
        { title: 'Alignment matters', text: 'Lines, facets and interspinous distance are mandatory in every cervical trauma read.' },
        { title: 'Use MRI selectively', text: 'MRI answers the key extra question when neurology or instability is suspected.' },
        { title: 'Name stability', text: 'Management depends on clear communication of instability.' },
      ],
    },
    thorakolumbal: {
      readId: 'bws-lws-frakturen',
      href: '/wirbelsaeule/trauma/bws-lws-frakturen',
      title: 'Thoracic / lumbar spine fractures',
      subtitle: 'Classify thoracolumbar fractures by morphology, posterior ligament integrity and canal compromise',
      heroCards: [
        { value: 'AO Spine', label: 'morphology', text: 'Compression, distraction or translation' },
        { value: 'PLC', label: 'posterior complex', text: 'Central for stability and surgery indication' },
        { value: 'CT/MRI', label: 'complementary', text: 'Bone pattern plus ligaments, oedema and neural structures' },
      ],
      sections: baseSections('en'),
      basics: {
        title: 'Stability, not just height loss',
        lead: 'Thoracolumbar fractures are assessed by morphology, posterior ligamentous complex and neurologic risk. Percent height loss alone is not enough.',
        items: [
          { title: 'Mechanism', text: 'Compression, burst, distraction and translation produce different stability risks.' },
          { title: 'Junction zone', text: 'The thoracolumbar junction is vulnerable and should be assessed generously after trauma.' },
          { title: 'Neural structures', text: 'Explicitly report retropulsion, canal stenosis and conus or cauda compression.' },
        ],
        key: 'The central question is: stable compression or unstable multi-column injury?',
      },
      anatomy: {
        title: 'Relevant anatomy for reporting',
        lead: 'Translate the fracture into anterior column, posterior wall, pedicles/arches and posterior ligament complex.',
        headers: ['Structure', 'Finding', 'Meaning'],
        rows: [
          ['Vertebral body', 'Height loss, cleft, wedging, burst', 'Morphology and kyphosis'],
          ['Posterior wall', 'Retropulsion, fragment, canal narrowing', 'Neurologic risk'],
          ['Pedicles / laminae / spinous process', 'Fracture or widening', 'Multi-column injury clue'],
          ['Posterior ligamentous complex', 'Interspinous oedema, facet capsule, supraspinous ligament', 'Stability decision'],
        ],
      },
      classification: {
        title: 'AO Spine logic for reporting',
        lead: 'AO Spine categories help sort CT and MRI findings into stable and unstable patterns.',
        headers: ['Category', 'Morphology', 'Radiologic message'],
        rows: [
          ['A1', 'Wedge compression / endplate impaction', 'Usually stable, posterior wall intact'],
          ['A3', 'Incomplete burst', 'One endplate plus posterior wall involved'],
          ['A4', 'Complete burst', 'Both endplates and posterior wall involved'],
          ['B', 'Distraction injury', 'Posterior or anterior tension-band failure'],
          ['C', 'Translation / rotation', 'Displacement in any plane, highly unstable'],
        ],
        key: 'When distraction or translation is present, it is not a simple compression fracture.',
      },
      imaging: {
        title: 'Imaging',
        lead: 'Modality depends on acuity, stability question and fracture age.',
        items: [
          { title: 'CT', text: 'Shows morphology, posterior wall, spinal canal and associated fractures. Sagittal reconstructions are mandatory.' },
          { title: 'MRI', text: 'Use for suspected PLC injury, cord/conus/cauda involvement or unclear fracture age.' },
          { title: 'Osteoporosis / tumour', text: 'Use STIR oedema, convex posterior wall, soft-tissue mass and pedicle involvement for differentiation.' },
        ],
        cave: 'In ankylosed spine, a subtle fracture line can represent a highly unstable three-column injury.',
      },
      reporting: {
        title: 'Structured report',
        lead: 'A good report makes the fracture actionable for trauma surgery, neurosurgery and pain therapy.',
        items: [
          { title: '1. Segment', text: 'State level, junctional involvement and multilevel injury.' },
          { title: '2. Morphology', text: 'Describe compression, burst, distraction or translation; add AO-like classification when possible.' },
          { title: '3. Stability', text: 'Address PLC, facet joints, pedicles/laminae and kyphosis.' },
          { title: '4. Canal / nerves', text: 'Report retropulsion, qualitative or percent canal stenosis and conus/cauda compression.' },
          { title: '5. Age / cause', text: 'Differentiate acute oedematous, chronic or suspicious malignant fracture when MRI is available.' },
        ],
        key: 'Impression should briefly state level, morphology, stability suspicion and canal relevance.',
      },
      pitfalls: {
        title: 'Pitfalls',
        lead: 'Thoracolumbar fractures are often underestimated as simple compression deformities.',
        items: [
          { title: 'Missed distraction', text: 'Actively look for interspinous widening and horizontal fracture components on sagittal images.' },
          { title: 'Acute vs chronic', text: 'Often uncertain on CT. MRI oedema pattern or prior imaging helps.' },
          { title: 'Ankylosed spine', text: 'DISH or ankylosing spondylitis creates long lever arms and unstable fractures.' },
        ],
      },
      takehome: [
        { title: 'Name morphology', text: 'Compression, burst, distraction or translation is more useful than isolated height loss.' },
        { title: 'PLC matters', text: 'The posterior ligamentous complex is central for stability and treatment.' },
        { title: 'Quantify canal relevance', text: 'Posterior wall retropulsion and neural compression belong in the report.' },
      ],
    },
  },
}

LOCALIZED_LESSONS.fa = {
  kraniozervikaler: {
    ...LOCALIZED_LESSONS.en.kraniozervikaler,
    title: 'محل اتصال کرانیوسرویکال',
    subtitle: 'ارزیابی ساختاریافته اکسیپوت، C1، C2، دنس و پایداری رباطی',
    heroCards: [
      { value: 'C0-C2', label: 'ناحیه پرخطر', text: 'ناپایداری می تواند با وجود شکستگی کوچک شدید باشد' },
      { value: 'CT + MPR', label: 'استاندارد حاد', text: 'بازسازی نازک در همه صفحات' },
      { value: 'MRI/CTA', label: 'تکمیلی هدفمند', text: 'رباط ها، نخاع، هماتوم اپیدورال و عروق' },
    ],
    sections: baseSections('fa'),
    basics: {
      title: 'چرا C0 تا C2 حیاتی است',
      lead: 'آسیب های کرانیوسرویکال نادرند اما از نظر رادیولوژی تعیین کننده اند؛ عدم هم راستایی ظریف یا آسیب رباطی می تواند ناپایداری با خطر نخاعی را نشان دهد.',
      items: [
        { title: 'بررسی سیستماتیک', text: 'کندیل های اکسیپیتال، حلقه C1، دنس، قوس C2 و مفاصل C0/C1 و C1/C2 را با ترتیب ثابت بررسی کنید.' },
        { title: 'پایداری', text: 'فقط شکستگی کافی نیست؛ رباط عرضی، رباط های آلار و ممبران تکتوریا اهمیت بالینی را تعیین می کنند.' },
        { title: 'سؤال اورژانسی', text: 'دیسوسیشن، ساب لوکسیشن، تنگی کانال و خطر عروقی را صریح گزارش کنید.' },
      ],
      key: 'در محل اتصال کرانیوسرویکال، هم راستایی مفصل به اندازه خط شکستگی مهم است.',
    },
    anatomy: {
      title: 'آناتومی مرتبط با گزارش',
      lead: 'آناتومی باید طوری خوانده شود که نشانه های ناپایداری فعالانه جستجو شوند.',
      headers: ['ساختار', 'به چه چیزی توجه کنیم', 'اهمیت'],
      rows: [
        ['کندیل های اکسیپیتال', 'شکستگی، ایمپکشن، جابجایی، ناهماهنگی سطح مفصلی', 'نشانگر فشار محوری یا دیسوسیشن'],
        ['حلقه C1', 'قوس قدامی و خلفی، توده های لترال، مجموع جابجایی لترال', 'الگوی Jefferson و خطر آسیب رباط عرضی'],
        ['دنس / C2', 'خط شکستگی، درگیری پایه، زاویه دار شدن، قوس C2', 'افتراق شکستگی دنس از آسیب Hangman'],
        ['رباط ها', 'رباط عرضی، رباط های آلار، ممبران تکتوریا', 'جزء مهم پایداری که در MRI ارزیابی می شود'],
      ],
    },
    classification: {
      title: 'الگوهای مهم آسیب',
      lead: 'نام گذاری الگوها در گزارش کمک کننده است، اما جابجایی و پایداری نیز باید جداگانه توصیف شوند.',
      headers: ['الگو', 'یافته کلیدی', 'اهمیت در گزارش'],
      rows: [
        ['شکستگی کندیل اکسیپیتال', 'قطعه، ایمپکشن یا آولسیون در کندیل', 'خطر با جابجایی و وضعیت C0/C1 تعیین می شود'],
        ['شکستگی Jefferson', 'شکستگی حلقه C1 با دور شدن توده های لترال', 'آسیب رباط عرضی را در نظر بگیرید'],
        ['شکستگی دنس', 'نوع I تا III بر اساس Anderson-D’Alonzo', 'نوع II خطر جوش نخوردن بیشتری دارد'],
        ['شکستگی Hangman', 'اسپوندیلولیستزیس تروماتیک C2 با درگیری قوس یا پارس', 'جابجایی C2/C3 و کمپلکس دیسک-رباط بررسی شود'],
        ['دیسوسیشن آتلانتواکسیپیتال', 'بدراستایی C0/C1، بازشدگی مفاصل، آسیب رباطی', 'یافته اورژانسی با ناپایداری شدید'],
      ],
      key: 'در هر الگو، وضعیت مفصل، کانال نخاعی و شک به آسیب رباطی را جداگانه ذکر کنید.',
    },
    imaging: {
      title: 'تصویربرداری',
      lead: 'CT، MRI و CTA پرسش های متفاوتی را پاسخ می دهند و باید هدفمند ترکیب شوند.',
      items: [
        { title: 'CT', text: 'CT نازک با بازسازی ساژیتال، کرونال و آکسیال پایه ارزیابی در ترومای حاد است.' },
        { title: 'MRI', text: 'در نقص عصبی، شک به آسیب رباط، هماتوم اپیدورال، میلوپاتی یا عدم تطابق بالین و CT اندیکاسیون دارد.' },
        { title: 'CTA', text: 'در شکستگی از فورامن ترانسورس، ساب لوکسیشن، ترومای پرانرژی گردنی فوقانی یا علائم عروقی در نظر بگیرید.' },
      ],
      cave: 'هم راستایی استخوانی طبیعی در CT آسیب رباطی مهم را با اطمینان رد نمی کند.',
    },
    reporting: {
      title: 'گزارش ساختاریافته',
      lead: 'گزارش خوب پرسش های مکانیکی و بالینی مهم را پاسخ می دهد.',
      items: [
        { title: '1. سطح و الگو', text: 'C0/C1/C2 را دقیق نام ببرید و نوع شکستگی و مفاصل درگیر را ذکر کنید.' },
        { title: '2. هم راستایی', text: 'فاصله آتلانتودنتال، وضعیت C0/C1 و C1/C2، توده های لترال و زاویه دار شدن را توصیف کنید.' },
        { title: '3. خطر عصبی', text: 'قطر کانال، فشار بر نخاع، هماتوم اپیدورال و بافت نرم پره ورتبرال را گزارش کنید.' },
        { title: '4. بررسی تکمیلی', text: 'در صورت خطر رباطی، نخاعی یا عروقی، MRI یا CTA را مشخص پیشنهاد کنید.' },
      ],
      key: 'شک به ناپایداری باید در Impression واضح نوشته شود، نه اینکه در متن پنهان بماند.',
    },
    pitfalls: {
      title: 'دام ها',
      lead: 'اشتباه های شایع وقتی رخ می دهند که پس از دیدن اولین شکستگی، جستجو متوقف شود.',
      items: [
        { title: 'قطعه کوچک کندیل', text: 'آن را بی اهمیت تلقی نکنید؛ وضعیت C0/C1 و علائم رباطی را بررسی کنید.' },
        { title: 'چرخش', text: 'می تواند ساب لوکسیشن C1/C2 را تقلید یا پنهان کند. تقارن را در چند صفحه بسنجید.' },
        { title: 'شکستگی دنس', text: 'خطوط ظریف در پایه دنس ممکن است در یک صفحه به راحتی دیده نشوند.' },
      ],
    },
    takehome: [
      { title: 'اول هم راستایی', text: 'در C0 تا C2، هم راستایی و دیسوسیشن پرسش های اصلی اورژانس هستند.' },
      { title: 'رباط ها را فراموش نکنید', text: 'رباط عرضی، رباط های آلار و ممبران تکتوریا پایداری را تعیین می کنند.' },
      { title: 'هدفمند تکمیل کنید', text: 'MRI و CTA را در حضور نشانه های خطر مشخص پیشنهاد کنید.' },
    ],
  },
  hws: {
    ...LOCALIZED_LESSONS.en.hws,
    title: 'آسیب های ستون فقرات گردنی',
    subtitle: 'HWS تحتانی از C3 تا C7: شکستگی، دررفتگی، دیسک، رباط ها و نخاع',
    heroCards: [
      { value: 'C3-C7', label: 'گردنی تحتانی', text: 'هم راستایی، فاست ها و کمپلکس خلفی مهم اند' },
      { value: 'CT', label: 'تشخیص شکستگی', text: 'استخوان، وضعیت فاست و کانال نخاعی' },
      { value: 'MRI', label: 'رباط/نخاع', text: 'در نقص عصبی، عدم تطابق یا شک به ناپایداری' },
    ],
    sections: baseSections('fa'),
    basics: {
      title: 'خواندن سیستماتیک HWS تحتانی',
      lead: 'در ترومای گردن باید آسیب استخوانی، وضعیت فاست، آسیب دیسک و رباط و خطر نخاعی با هم ارزیابی شوند.',
      items: [
        { title: 'هم راستایی', text: 'خطوط قدامی و خلفی جسم مهره، خط اسپینولامینار و ردیف زوائد خاری را برای پله یا بازشدگی بررسی کنید.' },
        { title: 'فاست ها', text: 'گیر افتادگی یک طرفه یا دوطرفه فاست می تواند ظریف اما از نظر پایداری بسیار مهم باشد.' },
        { title: 'بافت نرم', text: 'تورم پره ورتبرال، هماتوم اپیدورال و سیگنال نخاع را فعالانه جستجو کنید.' },
      ],
      key: 'آسیب HWS زمانی کامل ارزیابی شده که فاست ها، کمپلکس خلفی و نخاع هم بررسی شده باشند.',
    },
    anatomy: {
      title: 'آناتومی مرتبط با گزارش',
      lead: 'HWS تحتانی باید به اجزای پایداری قدامی، میانی و خلفی ترجمه شود.',
      headers: ['جزء', 'علامت در CT/MRI', 'اهمیت'],
      rows: [
        ['جسم مهره / دیواره خلفی', 'گوه ای شدن، شکستگی انفجاری، رتروپالژن، تنگی کانال', 'آسیب فشاری یا انفجاری'],
        ['دیسک / رباط های طولی', 'آسیب دیسک، سیگنال ALL/PLL، بازشدگی فضای دیسک', 'ناپایداری دیسکولیگامانتری'],
        ['فاست / پدیکل / لامینا', 'دررفتگی، ساب لوکسیشن، شکستگی، بازشدگی مفصل', 'آسیب چرخشی یا دیستراکشن'],
        ['کمپلکس رباطی خلفی', 'بازشدگی بین خاری، ادم STIR، آسیب کپسولی', 'نشانگر ناپایداری'],
      ],
    },
    classification: {
      title: 'شناخت الگوها',
      lead: 'مکانیسم و مورفولوژی کمک می کنند شدت آسیب واضح و قابل فهم منتقل شود.',
      headers: ['الگو', 'علائم معمول', 'چرا مهم است؟'],
      rows: [
        ['کمپرشن / برست', 'کاهش ارتفاع جسم مهره، درگیری دیواره خلفی', 'کانال و کیفوز خطر را تعیین می کنند'],
        ['فلکشن-دیستراکشن', 'بازشدگی بین خاری، ساب لوکسیشن فاست، آسیب کمپلکس خلفی', 'اغلب ناپایدار است'],
        ['دررفتگی فاست', 'فاست گیر افتاده یک طرفه یا دوطرفه', 'بر جااندازی، MRI و برنامه جراحی اثر دارد'],
        ['اکستنشن', 'بازشدگی فضای دیسک قدامی، آسیب ALL، قطعه teardrop', 'در ستون فقرات آنکیلوزه بسیار خطرناک است'],
        ['شکستگی زائده خاری', 'الگوی clay-shoveler یا علائم همراه', 'می تواند نشانگر ترومای فلکشن بزرگ تر باشد'],
      ],
      key: 'دررفتگی فاست و آسیب دیسکولیگامانتری اغلب از اندازه قطعه استخوانی مهم ترند.',
    },
    imaging: {
      title: 'تصویربرداری',
      lead: 'CT و MRI مکمل هم هستند: CT شکستگی را نشان می دهد و MRI دستگاه عملکردی آسیب دیده را.',
      items: [
        { title: 'CT', text: 'در ترومای مهم استاندارد است. بازسازی ساژیتال و کرونال برای هم راستایی و فاست ها ضروری است.' },
        { title: 'MRI', text: 'در نقص عصبی، علائم رادیکولار، میلوپاتی، شک به آسیب دیسکولیگامانتری یا عدم تطابق بالین و CT.' },
        { title: 'عروق', text: 'CTA در درگیری فورامن ترانسورس، ساب لوکسیشن، ترومای پرانرژی یا شک به آسیب شریان ورتبرال.' },
      ],
      cave: 'تنگی دژنراتیو می تواند آسیب تروماتیک کوچک را از نظر بالینی بسیار مهم کند.',
    },
    reporting: {
      title: 'گزارش ساختاریافته',
      lead: 'گزارش باید مدیریت جراحی یا محافظه کارانه را مستقیم پشتیبانی کند.',
      items: [
        { title: '1. سطح و مورفولوژی', text: 'سطح، اجزای شکستگی، ارتفاع جسم مهره، دیواره خلفی، لامینا، پدیکل و زائده خاری را ذکر کنید.' },
        { title: '2. هم راستایی و فاست', text: 'ساب لوکسیشن، دررفتگی، گیر افتادگی فاست و فاصله بین خاری را توصیف کنید.' },
        { title: '3. کانال / نخاع', text: 'رتروپالژن، هماتوم اپیدورال، فشار بر نخاع و سیگنال داخل نخاعی را ثبت کنید.' },
        { title: '4. پایداری', text: 'الگوی پایدار، بالقوه ناپایدار یا بسیار ناپایدار را واضح بیان کنید.' },
      ],
      key: 'Impression باید سطح، الگوی آسیب، ناپایداری و فشار عصبی مهم را در یک جمله روشن جمع کند.',
    },
    pitfalls: {
      title: 'دام ها',
      lead: 'در HWS، بدراستایی ظریف اغلب از یافته منفرد واضح مهم تر است.',
      items: [
        { title: 'گیر افتادگی یک طرفه فاست', text: 'ممکن است با چرخش اشتباه گرفته شود. فاست ها را در آکسیال و ساژیتال مقایسه کنید.' },
        { title: 'شکستگی منفرد زائده خاری', text: 'همیشه بی خطر نیست. در ترومای پرانرژی به دنبال آسیب رباطی خلفی باشید.' },
        { title: 'تورم پره ورتبرال', text: 'می تواند نشانگر آسیب دیسک، رباط یا آسیب نزدیک مری/راه هوایی باشد.' },
      ],
    },
    takehome: [
      { title: 'هم راستایی مهم است', text: 'خطوط، فاست ها و فاصله بین خاری در هر CT ترومای HWS اجباری هستند.' },
      { title: 'MRI هدفمند', text: 'در وجود علائم عصبی یا شک به ناپایداری، MRI سؤال تکمیلی اصلی را پاسخ می دهد.' },
      { title: 'پایداری را نام ببرید', text: 'اهمیت درمانی به بیان واضح ناپایداری وابسته است.' },
    ],
  },
  thorakolumbal: {
    ...LOCALIZED_LESSONS.en.thorakolumbal,
    title: 'شکستگی های BWS / LWS',
    subtitle: 'طبقه بندی شکستگی های توراکولومبار بر اساس مورفولوژی، PLC و کانال نخاعی',
    heroCards: [
      { value: 'AO Spine', label: 'مورفولوژی', text: 'کمپرشن، دیستراکشن یا ترانسلیشن' },
      { value: 'PLC', label: 'کمپلکس خلفی', text: 'برای پایداری و اندیکاسیون جراحی مهم است' },
      { value: 'CT/MRI', label: 'مکمل', text: 'الگوی استخوانی به همراه رباط، ادم و عناصر عصبی' },
    ],
    sections: baseSections('fa'),
    basics: {
      title: 'پایداری، نه فقط کاهش ارتفاع',
      lead: 'شکستگی های توراکولومبار بر اساس مورفولوژی، کمپلکس رباطی خلفی و خطر عصبی ارزیابی می شوند. درصد کاهش ارتفاع به تنهایی کافی نیست.',
      items: [
        { title: 'مکانیسم', text: 'کمپرشن، برست، دیستراکشن و ترانسلیشن خطرهای پایداری متفاوت ایجاد می کنند.' },
        { title: 'ناحیه گذار', text: 'محل اتصال توراکولومبار آسیب پذیر است و پس از تروما باید سخاوتمندانه بررسی شود.' },
        { title: 'ساختارهای عصبی', text: 'رتروپالژن، تنگی کانال و فشار بر کونوس یا کودا را صریح گزارش کنید.' },
      ],
      key: 'سؤال اصلی این است: کمپرشن پایدار یا آسیب چندستونی ناپایدار؟',
    },
    anatomy: {
      title: 'آناتومی مرتبط با گزارش',
      lead: 'شکستگی باید به ستون قدامی، دیواره خلفی جسم مهره، پدیکل/قوس ها و کمپلکس رباطی خلفی ترجمه شود.',
      headers: ['ساختار', 'یافته', 'اهمیت'],
      rows: [
        ['جسم مهره', 'کاهش ارتفاع، شکاف، گوه ای شدن، برست', 'مورفولوژی و کیفوز'],
        ['دیواره خلفی', 'رتروپالژن، قطعه، تنگی کانال', 'خطر عصبی'],
        ['پدیکل / لامینا / زائده خاری', 'شکستگی یا بازشدگی', 'نشانه آسیب چندستونی'],
        ['کمپلکس رباطی خلفی', 'ادم بین خاری، کپسول فاست، رباط سوپرااسپینوس', 'تصمیم درباره پایداری'],
      ],
    },
    classification: {
      title: 'منطق AO Spine در گزارش',
      lead: 'دسته بندی AO Spine کمک می کند یافته های CT و MRI به الگوهای پایدار و ناپایدار مرتب شوند.',
      headers: ['گروه', 'مورفولوژی', 'پیام رادیولوژیک'],
      rows: [
        ['A1', 'کمپرشن گوه ای / ایمپکشن اندپلیت', 'اغلب پایدار، دیواره خلفی سالم'],
        ['A3', 'برست ناکامل', 'یک اندپلیت به همراه دیواره خلفی درگیر است'],
        ['A4', 'برست کامل', 'هر دو اندپلیت و دیواره خلفی درگیرند'],
        ['B', 'آسیب دیستراکشن', 'آسیب بند کششی قدامی یا خلفی'],
        ['C', 'ترانسلیشن / روتیشن', 'جابجایی در هر صفحه، بسیار ناپایدار'],
      ],
      key: 'وقتی دیستراکشن یا ترانسلیشن وجود دارد، آسیب دیگر یک سینتر ساده نیست.',
    },
    imaging: {
      title: 'تصویربرداری',
      lead: 'انتخاب روش تصویربرداری به وضعیت حاد، سؤال پایداری و سن شکستگی بستگی دارد.',
      items: [
        { title: 'CT', text: 'مورفولوژی شکستگی، دیواره خلفی، کانال نخاعی و شکستگی های همراه را نشان می دهد. بازسازی ساژیتال ضروری است.' },
        { title: 'MRI', text: 'در شک به آسیب کمپلکس رباطی خلفی، درگیری نخاع/کونوس/کودا یا نامشخص بودن سن شکستگی.' },
        { title: 'پوکی استخوان / تومور', text: 'ادم STIR، تحدب دیواره خلفی، توده بافت نرم و درگیری پدیکل برای افتراق کمک می کنند.' },
      ],
      cave: 'در ستون فقرات آنکیلوزه، یک خط شکستگی ظریف می تواند آسیب سه ستونی بسیار ناپایدار باشد.',
    },
    reporting: {
      title: 'گزارش ساختاریافته',
      lead: 'گزارش خوب شکستگی را برای تروما، نوروسرجری و درمان درد قابل تصمیم گیری می کند.',
      items: [
        { title: '1. سطح', text: 'سطح، ناحیه گذار و درگیری چندسطحی را ذکر کنید.' },
        { title: '2. مورفولوژی', text: 'کمپرشن، برست، دیستراکشن یا ترانسلیشن را توصیف کنید و اگر ممکن است طبقه بندی AO-like بدهید.' },
        { title: '3. پایداری', text: 'کمپلکس رباطی خلفی، فاست ها، پدیکل/لامینا و کیفوز را گزارش کنید.' },
        { title: '4. کانال / عصب', text: 'رتروپالژن، تنگی کانال به صورت کیفی یا درصدی و فشار بر کونوس/کودا را ذکر کنید.' },
        { title: '5. سن / علت', text: 'در صورت وجود MRI، حاد ادماتوز، مزمن یا مشکوک به بدخیمی را افتراق دهید.' },
      ],
      key: 'Impression باید سطح شکستگی، مورفولوژی، شک به ناپایداری و اهمیت کانال را کوتاه جمع کند.',
    },
    pitfalls: {
      title: 'دام ها',
      lead: 'شکستگی های توراکولومبار بیش از حد به عنوان سینتر ساده کم اهمیت شمرده می شوند.',
      items: [
        { title: 'دیستراکشن نادیده گرفته شده', text: 'بازشدگی بین خاری و امتداد افقی شکستگی را در بازسازی ساژیتال فعالانه جستجو کنید.' },
        { title: 'حاد یا قدیمی', text: 'در CT اغلب نامطمئن است. الگوی ادم در MRI یا تصاویر قبلی کمک می کند.' },
        { title: 'ستون فقرات آنکیلوزه', text: 'DISH یا اسپوندیلیت آنکیلوزان اهرم های بلند و شکستگی ناپایدار را محتمل می کنند.' },
      ],
    },
    takehome: [
      { title: 'مورفولوژی را دقیق بگویید', text: 'کمپرشن، برست، دیستراکشن یا ترانسلیشن از یک عدد کاهش ارتفاع مفیدتر است.' },
      { title: 'PLC تعیین کننده است', text: 'کمپلکس رباطی خلفی برای پایداری و درمان مرکزی است.' },
      { title: 'اهمیت کانال را کمی کنید', text: 'رتروپالژن دیواره خلفی و فشار عصبی باید در گزارش بیاید.' },
    ],
  },
}

const UI = {
  de: {
    toc: 'Inhaltsverzeichnis',
    breadcrumbSpine: 'Wirbelsäule',
    breadcrumbCurrent: 'Trauma',
    sourceLabel: 'Dr. Zia',
    actionBack: 'Wirbelsäule',
    actionQuiz: 'MCQ',
    actionFlashcards: 'Flashcards',
    keyLabel: 'Merke',
    caveLabel: 'CAVE',
    mark: 'Als gelesen markieren',
    read: 'Als gelesen markiert',
    error: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.',
    signIn: 'Anmelden',
  },
  en: {
    toc: 'Contents',
    breadcrumbSpine: 'Spine',
    breadcrumbCurrent: 'Trauma',
    sourceLabel: 'Dr. Zia',
    actionBack: 'Spine',
    actionQuiz: 'MCQ',
    actionFlashcards: 'Flashcards',
    keyLabel: 'Key point',
    caveLabel: 'Caution',
    mark: 'Mark as read',
    read: 'Marked as read',
    error: 'Please sign in to save your learning progress.',
    signIn: 'Sign in',
  },
  fa: {
    toc: 'فهرست مطالب',
    breadcrumbSpine: 'ستون فقرات',
    breadcrumbCurrent: 'تروما',
    sourceLabel: 'Dr. Zia',
    actionBack: 'ستون فقرات',
    actionQuiz: 'MCQ',
    actionFlashcards: 'فلش کارت',
    keyLabel: 'نکته مهم',
    caveLabel: 'احتیاط',
    mark: 'علامت گذاری به عنوان خوانده شده',
    read: 'خوانده شده',
    error: 'برای ذخیره پیشرفت لطفا وارد شوید.',
    signIn: 'ورود',
  },
}

function ReadButton({ isRead, onClick, authError }) {
  const { lang } = useLanguage()
  const copy = UI[lang] || UI.de
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

function Cards({ items }) {
  return (
    <div className={styles.cardsGrid}>
      {items.map(item => (
        <article className={styles.infoCard} key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
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

  useEffect(() => setOpen(!isMobile), [isMobile, id])

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

function SpineDiagram({ topicId }) {
  const active = topicId === 'kraniozervikaler' ? 'c0c2' : topicId === 'hws' ? 'c3c7' : 'tl'
  return (
    <div className={styles.spineDiagram} aria-hidden="true">
      <div className={`${styles.spineRegion} ${active === 'c0c2' ? styles.spineRegionActive : ''}`}><span>C0-C2</span></div>
      <div className={`${styles.spineRegion} ${active === 'c3c7' ? styles.spineRegionActive : ''}`}><span>C3-C7</span></div>
      <div className={`${styles.spineRegion} ${active === 'tl' ? styles.spineRegionActive : ''}`}><span>BWS/LWS</span></div>
    </div>
  )
}

export default function SpineTraumaLesson({ topicId }) {
  const { lang } = useLanguage()
  const copy = UI[lang] || UI.de
  const baseTopic = LESSONS[topicId] || LESSONS.kraniozervikaler
  const topic = LOCALIZED_LESSONS[lang]?.[topicId] || baseTopic
  const isRTL = lang === 'fa'
  const [activeId, setActiveId] = useState(topic.sections[0].id)
  const { isRead, toggleRead, authError } = useLessonReadStatus(topic.readId)
  const sectionIds = useMemo(() => topic.sections.map(section => section.id), [topic.sections])
  const withLang = href => lang === 'de' ? href : (href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`)

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
    <main className={styles.page} dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
      <InProgressBanner lang={lang} />
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href={withLang('/')}>RadYar</Link><span>›</span>
          <Link href={withLang('/lernen/wirbelsaeule')}>{copy.breadcrumbSpine}</Link><span>›</span>
          <span>{copy.breadcrumbCurrent}</span>
        </div>
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.sourceBadge}>{copy.sourceLabel}</span>
            <h1>{topic.title}</h1>
            <p>{topic.subtitle}</p>
            <div className={styles.actions}>
              <Link
                href={withLang(`/ueben/quiz?fach=wirbelsaeule&n=10&themen=${topic.readId}&from=${encodeURIComponent(withLang(topic.href))}`)}
                className={styles.actionBtn}
              >
                {copy.actionQuiz}
              </Link>
              <Link
                href={withLang(`/flashcards/${topic.readId}?from=${encodeURIComponent(withLang(topic.href))}`)}
                className={styles.actionBtn}
              >
                {copy.actionFlashcards}
              </Link>
            </div>
          </div>
          <div className={styles.heroStats}>
            {topic.heroCards.map(card => (
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
          {topic.sections.map(section => (
            <button
              type="button"
              key={section.id}
              className={`${styles.sideItem} ${activeId === section.id ? styles.sideItemActive : ''}`}
              onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              <span className={styles.sideMarker} aria-hidden="true" />
              <strong>{section.label}</strong>
            </button>
          ))}
        </aside>

        <div className={styles.main}>
          <div className={styles.visualIntro}>
            <SpineDiagram topicId={topicId} />
            <div>
              <span>{copy.breadcrumbSpine} · {copy.breadcrumbCurrent}</span>
              <h2>{topic.title}</h2>
              <p>{topic.subtitle}</p>
            </div>
          </div>

          <Section id="grundlagen" title={topic.basics.title} lead={topic.basics.lead}>
            <Cards items={topic.basics.items} />
            <Callout label={copy.keyLabel}>{topic.basics.key}</Callout>
          </Section>

          <Section id="anatomie" title={topic.anatomy.title} lead={topic.anatomy.lead}>
            <Table headers={topic.anatomy.headers} rows={topic.anatomy.rows} />
          </Section>

          <Section id="klassifikation" title={topic.classification.title} lead={topic.classification.lead}>
            <Table headers={topic.classification.headers} rows={topic.classification.rows} />
            <Callout label={copy.keyLabel}>{topic.classification.key}</Callout>
          </Section>

          <Section id="bildgebung" title={topic.imaging.title} lead={topic.imaging.lead}>
            <Cards items={topic.imaging.items} />
            <Callout type="cave" label={copy.caveLabel}>{topic.imaging.cave}</Callout>
          </Section>

          <Section id="befundung" title={topic.reporting.title} lead={topic.reporting.lead}>
            <Cards items={topic.reporting.items} />
            <Callout label={copy.keyLabel}>{topic.reporting.key}</Callout>
          </Section>

          <Section id="fallstricke" title={topic.pitfalls.title} lead={topic.pitfalls.lead}>
            <Cards items={topic.pitfalls.items} />
          </Section>

          <Section id="takehome" title={topic.sections.find(section => section.id === 'takehome')?.label || 'Take home message'}>
            <div className={styles.takeHomeGrid}>
              {topic.takehome.map((item, index) => (
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
