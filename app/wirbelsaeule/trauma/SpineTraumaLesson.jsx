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

const UI = {
  de: {
    toc: 'Inhaltsverzeichnis',
    breadcrumbSpine: 'Wirbelsäule',
    breadcrumbCurrent: 'Trauma',
    sourceLabel: 'Dr. Zia',
    actionQuiz: 'MCQ',
    actionFlashcards: 'Flashcards',
    actionBack: 'Wirbelsäule',
    siblingTitle: 'Trauma-Lernseiten',
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
    actionQuiz: 'MCQ',
    actionFlashcards: 'Flashcards',
    actionBack: 'Spine',
    siblingTitle: 'Trauma lessons',
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
    actionQuiz: 'MCQ',
    actionFlashcards: 'فلش کارت',
    actionBack: 'ستون فقرات',
    siblingTitle: 'درس های تروما',
    keyLabel: 'نکته مهم',
    caveLabel: 'احتیاط',
    mark: 'علامت گذاری به عنوان خوانده شده',
    read: 'خوانده شده',
    error: 'برای ذخیره پیشرفت لطفا وارد شوید.',
    signIn: 'ورود',
  },
}

const LESSON_ORDER = ['kraniozervikaler', 'hws', 'thorakolumbal']

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
  const topic = LESSONS[topicId] || LESSONS.kraniozervikaler
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
              <Link href={withLang(`/ueben/quiz?fach=wirbelsaeule&n=10&themen=${topic.readId}&from=${encodeURIComponent(withLang(topic.href))}`)} className={styles.actionBtn}>{copy.actionQuiz}</Link>
              <Link href={withLang(`/flashcards/${topic.readId}?from=${encodeURIComponent(withLang(topic.href))}`)} className={styles.actionBtn}>{copy.actionFlashcards}</Link>
              <Link href={withLang('/lernen/wirbelsaeule')} className={styles.actionBtn}>{copy.actionBack}</Link>
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
          <div className={styles.siblingNav}>
            <strong>{copy.siblingTitle}</strong>
            {LESSON_ORDER.map(id => (
              <Link key={id} href={withLang(LESSONS[id].href)} className={`${styles.siblingLink} ${id === topicId ? styles.siblingLinkActive : ''}`}>
                {LESSONS[id].title}
              </Link>
            ))}
          </div>
        </aside>

        <div className={styles.main}>
          <div className={styles.visualIntro}>
            <SpineDiagram topicId={topicId} />
            <div>
              <span>Wirbelsäule · Trauma</span>
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

          <Section id="takehome" title="Take home message">
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
