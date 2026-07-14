'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import styles from './page.module.css'

const DAY = 24 * 60 * 60 * 1000
const INTERVALS = [0, 1, 3, 7, 14, 30]

const todayIso = () => new Date().toISOString().slice(0, 10)
const uid = prefix => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
const LEITNER_BOXES = [0, 1, 2, 3, 4, 5]

const emptyState = {
  lessons: [],
  cards: [],
  reviews: [],
  writings: [],
  answers: {},
}

const sampleLesson = {
  id: 'deutsch-001-arzttermin',
  date: todayIso(),
  level: 'B1/B2',
  title: 'Einen Arzttermin verschieben',
  topic: 'Alltag und Gesundheit',
  reading: {
    title: 'Eine Terminverschiebung',
    text: 'Mina hat seit drei Wochen einen Termin beim Orthopäden. Leider muss sie an diesem Tag länger arbeiten, weil eine Kollegin krank geworden ist. Sie ruft in der Praxis an und erklärt ruhig die Situation. Die Mitarbeiterin bietet ihr einen neuen Termin am Freitagvormittag an. Mina bittet darum, die Uhrzeit schriftlich per E-Mail zu bestätigen, damit sie den Termin nicht vergisst.',
    vocabulary: [
      { term: 'verschieben', de: 'einen geplanten Termin auf einen anderen Zeitpunkt legen', fa: 'به زمان دیگری منتقل کردن', example: 'Ich möchte meinen Termin verschieben.' },
      { term: 'die Praxis', de: 'Ort, an dem Ärztinnen oder Ärzte Patientinnen und Patienten behandeln', fa: 'مطب', example: 'Ich rufe in der Praxis an.' },
      { term: 'bestätigen', de: 'sagen oder schreiben, dass etwas richtig oder fest vereinbart ist', fa: 'تأیید کردن', example: 'Bitte bestätigen Sie den Termin per E-Mail.' },
      { term: 'die Mitarbeiterin', de: 'eine Person, die in einer Firma oder Praxis arbeitet', fa: 'کارمند زن', example: 'Die Mitarbeiterin bietet einen neuen Termin an.' },
      { term: 'schriftlich', de: 'nicht nur mündlich, sondern als Text', fa: 'کتبی', example: 'Ich brauche eine schriftliche Bestätigung.' },
    ],
    questions: [
      { question: 'Warum muss Mina den Termin verschieben?', options: ['Sie muss länger arbeiten.', 'Sie hat den Termin vergessen.', 'Der Orthopäde ist krank.', 'Sie möchte am Freitag arbeiten.'], answer: 0, explanation: 'Im Text steht, dass Mina länger arbeiten muss, weil eine Kollegin krank geworden ist.' },
      { question: 'Was macht Mina zuerst?', options: ['Sie schreibt eine Beschwerde.', 'Sie ruft in der Praxis an.', 'Sie geht direkt zur Praxis.', 'Sie storniert alle Termine.'], answer: 1, explanation: 'Sie ruft an und erklärt die Situation.' },
      { question: 'Was bedeutet „schriftlich bestätigen“ hier am besten?', options: ['den Termin bezahlen', 'den Termin per Text festhalten', 'die Praxis wechseln', 'die Uhr reparieren'], answer: 1, explanation: 'Schriftlich bedeutet, dass die Bestätigung als Text kommt.' },
      { question: 'Welche Eigenschaft beschreibt Minas Verhalten?', options: ['panisch', 'ruhig und organisiert', 'unhöflich', 'gleichgültig'], answer: 1, explanation: 'Sie erklärt ruhig und bittet um eine E-Mail, damit sie den Termin nicht vergisst.' },
      { question: 'Welche Information möchte Mina per E-Mail bekommen?', options: ['den Namen der kranken Kollegin', 'die genaue Uhrzeit', 'eine Rechnung', 'eine Diagnose'], answer: 1, explanation: 'Sie bittet darum, die Uhrzeit schriftlich zu bestätigen.' },
    ],
  },
  grammar: [
    { question: 'Welche Form ist korrekt?', options: ['beim Orthopäden', 'bei der Orthopäde', 'bei dem Orthopäde', 'beim Orthopäde'], answer: 0, explanation: '„bei dem“ wird zu „beim“, und „Orthopäde“ bekommt im Dativ Singular oft die Endung -n: beim Orthopäden.' },
    { question: 'Warum steht „seit drei Wochen“?', options: ['weil es um eine abgeschlossene Vergangenheit geht', 'weil der Zeitraum bis jetzt andauert', 'weil es Zukunft ausdrückt', 'weil es einen Ort beschreibt'], answer: 1, explanation: '„Seit“ beschreibt einen Zeitraum, der in der Vergangenheit begonnen hat und bis jetzt relevant ist.' },
    { question: 'Welche Satzstellung ist korrekt?', options: ['Leider muss sie an diesem Tag länger arbeiten.', 'Leider sie muss an diesem Tag länger arbeiten.', 'Leider an diesem Tag sie muss länger arbeiten.', 'Leider arbeiten muss sie länger.'], answer: 0, explanation: 'Nach einem Adverb am Satzanfang steht das finite Verb auf Position 2.' },
    { question: 'Was ist „damit sie den Termin nicht vergisst“?', options: ['ein Finalsatz', 'ein Relativsatz', 'eine indirekte Frage', 'ein Hauptsatz'], answer: 0, explanation: '„damit“ zeigt einen Zweck: Die E-Mail hilft ihr, den Termin nicht zu vergessen.' },
    { question: 'Welche Form passt: „Sie bittet ___ eine Bestätigung“?', options: ['um', 'für', 'an', 'mit'], answer: 0, explanation: 'Die feste Verbindung lautet „um etwas bitten“.' },
  ],
  listening: {
    title: 'Ein ähnlicher Anruf',
    text: 'Guten Morgen, hier spricht Mina Rahimi. Ich habe am Mittwoch einen Termin in Ihrer Praxis. Leider kann ich an diesem Tag nicht kommen. Wäre es möglich, den Termin auf Freitag zu verschieben? Bitte schicken Sie mir die neue Uhrzeit schriftlich per E-Mail.',
    questions: [
      { question: 'An welchem Tag hat Mina ursprünglich einen Termin?', options: ['Montag', 'Mittwoch', 'Freitag', 'Sonntag'], answer: 1, explanation: 'Im Hörtext sagt Mina: „am Mittwoch“.' },
      { question: 'Wohin ruft Mina an?', options: ['in eine Praxis', 'in eine Schule', 'in ein Restaurant', 'in ein Hotel'], answer: 0, explanation: 'Sie sagt „in Ihrer Praxis“.' },
      { question: 'Was möchte Mina?', options: ['den Termin verschieben', 'eine Rechnung bezahlen', 'eine Kollegin suchen', 'eine Diagnose bekommen'], answer: 0, explanation: 'Sie fragt, ob der Termin auf Freitag verschoben werden kann.' },
      { question: 'Wie möchte sie die neue Uhrzeit bekommen?', options: ['telefonisch', 'per SMS', 'schriftlich per E-Mail', 'per Postkarte'], answer: 2, explanation: 'Sie bittet um eine schriftliche E-Mail.' },
      { question: 'Welche Formulierung ist besonders höflich?', options: ['Ich komme nicht.', 'Wäre es möglich...', 'Schicken Sie sofort...', 'Ich will Freitag.'], answer: 1, explanation: '„Wäre es möglich...“ ist eine höfliche indirekte Frage.' },
    ],
  },
  writing: {
    prompt: 'Schreibe eine kurze E-Mail an eine Arztpraxis. Du kannst deinen Termin nicht wahrnehmen und möchtest höflich einen neuen Termin vereinbaren.',
    checklist: ['Anrede', 'Grund kurz erklären', 'neuen Termin erfragen', 'schriftliche Bestätigung bitten', 'höflicher Abschluss'],
  },
}

const upgradedSampleLesson = {
  id: 'deutsch-001-digitale-erreichbarkeit',
  date: todayIso(),
  level: 'B2',
  title: 'Immer erreichbar sein?',
  topic: 'Alltag, Arbeit und digitale Grenzen',
  reading: {
    title: 'Die unsichtbare Pflicht zur Antwort',
    text: 'Seit Leyla im Projektteam arbeitet, erwartet niemand offiziell, dass sie abends erreichbar ist. Trotzdem entsteht ein subtiler Druck: Wenn eine Nachricht im Gruppenchat unbeantwortet bleibt, wirkt es schnell, als nehme sie ihre Aufgaben nicht ernst. Einige Kolleginnen beantworten jede Anfrage sofort, andere schalten nach Feierabend konsequent ab. In der woechentlichen Besprechung spricht Leyla das Thema vorsichtig an. Sie sagt nicht, dass jemand falsch handelt, sondern fragt, ob das Team gemeinsame Regeln braucht. Ihr Vorschlag ist einfach: Dringende Fragen sollen telefonisch geklaert werden, normale Nachrichten koennen bis zum naechsten Arbeitstag warten. Zunaechst reagieren manche skeptisch, weil sie Flexibilitaet verlieren koennten. Nach einer kurzen Diskussion merken jedoch viele, dass klare Grenzen nicht gegen Zusammenarbeit sprechen, sondern sie verlaesslicher machen.',
    vocabulary: [
      { term: 'erreichbar', de: 'so verfuegbar, dass andere einen kontaktieren koennen', fa: 'در دسترس', example: 'Nach Feierabend bin ich nur in Notfaellen erreichbar.' },
      { term: 'subtiler Druck', de: 'ein Druck, der nicht direkt ausgesprochen wird, aber trotzdem spuerbar ist', fa: 'فشار پنهان', example: 'In manchen Teams entsteht subtiler Druck, sofort zu antworten.' },
      { term: 'unbeantwortet', de: 'ohne Antwort geblieben', fa: 'بی پاسخ', example: 'Die Nachricht blieb bis zum Morgen unbeantwortet.' },
      { term: 'konsequent', de: 'klar, bewusst und ohne staendige Ausnahme', fa: 'قاطعانه', example: 'Sie schaltet ihr Diensthandy konsequent aus.' },
      { term: 'Besprechung', de: 'ein berufliches Treffen, bei dem Themen diskutiert werden', fa: 'جلسه', example: 'In der Besprechung wurde ueber neue Regeln gesprochen.' },
      { term: 'Dringende Fragen', de: 'Fragen, die schnell geklaert werden muessen', fa: 'سوالات فوری', example: 'Dringende Fragen sollen telefonisch geklaert werden.' },
      { term: 'Flexibilitaet', de: 'die Moeglichkeit, sich an verschiedene Situationen anzupassen', fa: 'انعطاف پذیری', example: 'Homeoffice bietet mehr Flexibilitaet.' },
      { term: 'verlaesslicher', de: 'zuverlaessiger und besser planbar', fa: 'قابل اعتمادتر', example: 'Klare Regeln machen die Zusammenarbeit verlaesslicher.' },
    ],
    questions: [
      { question: 'Was ist das zentrale Problem im Text?', options: ['Eine offizielle Pflicht, nachts zu arbeiten.', 'Unausgesprochene Erwartungen an schnelle Antworten.', 'Leylas fehlende Verantwortung im Projekt.', 'Ein technisches Problem im Gruppenchat.'], answer: 1, explanation: 'Der Text betont, dass niemand offiziell Erreichbarkeit verlangt, aber trotzdem subtiler Druck entsteht.' },
      { question: 'Warum formuliert Leyla ihr Anliegen vorsichtig?', options: ['Sie will niemanden direkt beschuldigen.', 'Sie hat keine eigene Meinung.', 'Sie will die Besprechung vermeiden.', 'Sie kennt die Regeln bereits.'], answer: 0, explanation: 'Sie sagt nicht, dass jemand falsch handelt, sondern fragt nach gemeinsamen Regeln.' },
      { question: 'Welche Loesung schlaegt Leyla vor?', options: ['Alle Nachrichten ignorieren.', 'Nur die Teamleitung darf schreiben.', 'Dringendes telefonisch, Normales am naechsten Arbeitstag.', 'Den Gruppenchat loeschen.'], answer: 2, explanation: 'Ihr Vorschlag unterscheidet zwischen dringenden Fragen und normalen Nachrichten.' },
      { question: 'Was zeigt die skeptische Reaktion einiger Kolleginnen und Kollegen?', options: ['Sie lehnen Zusammenarbeit grundsaetzlich ab.', 'Sie befuerchten weniger Flexibilitaet.', 'Sie verstehen Feierabend nicht.', 'Sie wollen nur telefonisch arbeiten.'], answer: 1, explanation: 'Im Text steht, dass manche skeptisch reagieren, weil sie Flexibilitaet verlieren koennten.' },
      { question: 'Welche Schlussfolgerung passt am besten?', options: ['Grenzen verhindern Zusammenarbeit.', 'Klare Regeln koennen Zusammenarbeit planbarer machen.', 'Schnelle Antworten sind immer professioneller.', 'Private Zeit ist beruflich unwichtig.'], answer: 1, explanation: 'Am Ende erkennen viele, dass klare Grenzen die Zusammenarbeit verlaesslicher machen.' },
    ],
  },
  vocabulary_quiz: [
    { question: 'Was bedeutet „erreichbar" in diesem Text?', options: ['so verfügbar, dass andere einen kontaktieren können', 'körperlich sportlich aktiv sein', 'eine Nachricht absenden', 'offiziell verpflichtet sein'], answer: 0, explanation: '„Erreichbar" bedeutet, dass man kontaktiert werden kann — hier: telefonisch oder per Chat nach der Arbeit.' },
    { question: 'Was meint „subtiler Druck" im Text?', options: ['ein Druck, der nicht ausgesprochen wird, aber spürbar ist', 'körperliche Anstrengung bei der Arbeit', 'ein offizieller Befehl vom Chef', 'eine direkte Kritik an der Arbeit'], answer: 0, explanation: '„Subtil" bedeutet nicht offensichtlich. Der Druck entsteht durch das Verhalten anderer, nicht durch eine direkte Anweisung.' },
    { question: 'Was bedeutet „konsequent abschalten"?', options: ['klar und ohne Ausnahme die Arbeit beenden', 'den Computer ausschalten', 'manchmal früher nach Hause gehen', 'alle Nachrichten sofort beantworten'], answer: 0, explanation: '„Konsequent" bedeutet: immer, ohne Ausnahme. Abschalten = aufhören, erreichbar zu sein.' },
    { question: 'Was ist eine „Besprechung" im beruflichen Kontext?', options: ['ein geplantes Treffen zur Diskussion von Themen', 'ein privates Telefonat mit Kollegen', 'eine schriftliche Beschwerde', 'ein Mittagessen mit dem Team'], answer: 0, explanation: '„Besprechung" ist das deutsche Wort für Meeting — ein strukturiertes berufliches Treffen.' },
    { question: 'Was bedeutet „Zusammenarbeit verlässlicher machen"?', options: ['die Zusammenarbeit besser planbar und stabiler machen', 'weniger miteinander arbeiten', 'schneller antworten als vorher', 'die Gruppe kleiner machen'], answer: 0, explanation: '„Verlässlich" kommt von verlassen = sich auf etwas stützen können. Verlässlicher = besser planbar.' },
  ],
  grammar: [
    { question: 'Ergänze: „Niemand ___ verpflichtet, nach Feierabend zu antworten."', options: ['ist', 'sind', 'war früher', 'haben'], answer: 0, explanation: '„Niemand" ist grammatisch Singular → Verb in der 3. Person Singular: „ist". Nicht „sind".' },
    { question: 'Welche Präposition und welcher Kasus passen: „Sie spricht das Thema ___ an."', options: ['vorsichtig (kein Objekt)', 'für das Thema', 'mit dem Thema', 'auf das Thema'], answer: 0, explanation: '„Ansprechen" ist ein trennbares Verb: „sie spricht … an". Das Thema ist hier direktes Objekt im Akkusativ — ohne Präposition.' },
    { question: 'Wähle die richtige Form: „wegen ___ Flexibilität"', options: ['der (Genitiv)', 'die (Nominativ)', 'dem (Dativ)', 'den (Akkusativ)'], answer: 0, explanation: '„Wegen" verlangt den Genitiv. „die Flexibilität" (Femininum) → Genitiv Singular: „der Flexibilität". Korrekt: wegen der Flexibilität.' },
    { question: 'Welche Satzstellung ist korrekt nach „sobald"?', options: ['sobald eine Nachricht erscheint', 'sobald erscheint eine Nachricht', 'sobald eine Nachricht erscheinen', 'sobald erschienen eine Nachricht'], answer: 0, explanation: '„Sobald" ist eine subordinierende Konjunktion → das Verb steht am Ende des Nebensatzes: „sobald eine Nachricht erscheint".' },
    { question: 'Ergänze richtig: „Ich schlage vor, ___ Notfällen und normalen Rückfragen zu unterscheiden."', options: ['zwischen (+ Dativ)', 'unter (+ Akkusativ)', 'bei (+ Dativ)', 'von (+ Dativ)'], answer: 0, explanation: '„Unterscheiden zwischen" ist eine feste Verbindung: zwischen + Dativ. „zwischen echten Notfällen und normalen Rückfragen" (Dativ Plural).' },
  ],
  listening: {
    title: 'Eine Diskussion im Team',
    text: 'In unserem Team ist niemand verpflichtet, nach Feierabend zu antworten. Trotzdem haben viele das Gefuehl, sie muessten kurz reagieren, sobald eine Nachricht erscheint. Ich schlage deshalb vor, zwischen echten Notfaellen und normalen Rueckfragen zu unterscheiden. Wenn etwas dringend ist, sollte man anrufen. Alles andere kann bis zum naechsten Morgen warten. So bleiben wir flexibel, ohne staendig unter Druck zu stehen.',
    questions: [
      { question: 'Was ist laut Hoertext nicht offiziell vorgeschrieben?', options: ['Nach Feierabend zu antworten', 'Morgens zu arbeiten', 'Telefonisch erreichbar zu sein', 'Im Team zu diskutieren'], answer: 0, explanation: 'Es wird gesagt, dass niemand verpflichtet ist, nach Feierabend zu antworten.' },
      { question: 'Welches Gefuehl beschreibt der Sprecher?', options: ['Viele fuehlen sich zu kurzen Reaktionen gedraengt.', 'Viele wollen keine Nachrichten mehr bekommen.', 'Viele verstehen die Aufgaben nicht.', 'Viele arbeiten nur nachts gut.'], answer: 0, explanation: 'Der Hoertext spricht von dem Gefuehl, kurz reagieren zu muessen.' },
      { question: 'Was soll telefonisch passieren?', options: ['Jede normale Rueckfrage', 'Nur echte Notfaelle oder Dringendes', 'Jede Nachricht nach 18 Uhr', 'Alle Besprechungen'], answer: 1, explanation: 'Bei Dringendem soll man anrufen.' },
      { question: 'Welche Balance wird gesucht?', options: ['Flexibilitaet ohne staendigen Druck', 'Mehr Kontrolle und weniger Vertrauen', 'Schnellere Antworten ohne Regeln', 'Weniger Zusammenarbeit'], answer: 0, explanation: 'Der letzte Satz nennt genau diese Balance.' },
      { question: 'Wie unterscheidet sich der Hoertext vom Lesetext?', options: ['Er formuliert den Vorschlag direkter.', 'Er widerspricht dem Lesetext.', 'Er handelt von einem Arzttermin.', 'Er verbietet Flexibilitaet.'], answer: 0, explanation: 'Der Hoertext klingt wie ein direkter Beitrag in einer Diskussion.' },
    ],
  },
  writing: {
    prompt: 'Schreibe einen kurzen Diskussionsbeitrag: Soll man nach Feierabend fuer Arbeit erreichbar sein? Begruende deine Meinung mit mindestens zwei Argumenten und einem konkreten Beispiel.',
    checklist: ['klare Position', 'zwei Argumente', 'ein Alltagsbeispiel', 'Gegenargument kurz nennen', 'ruhiger B2-Stil'],
  },
}

const vocabularyEnrichments = {
  'deutsch-2026-07-12-homeoffice-entscheidung': [
    { term: 'Vorgesetzter', de: 'eine Person, die beruflich Weisungen geben und Entscheidungen treffen darf', fa: 'مدیر، سرپرست', example: 'Mein Vorgesetzter unterstützt flexible Arbeitszeiten.' },
    { term: 'nachvollziehen', de: 'die Gründe oder Gefühle einer anderen Person verstehen können', fa: 'درک کردن، قابل فهم دانستن', example: 'Ich kann deine Entscheidung gut nachvollziehen.' },
    { term: 'erfordern', de: 'etwas notwendig machen oder voraussetzen', fa: 'لازم داشتن، ایجاب کردن', example: 'Diese Aufgabe wird viel Geduld erfordern.' },
    { term: 'erheblich', de: 'deutlich, beträchtlich oder von großer Bedeutung', fa: 'قابل توجه، چشمگیر', example: 'Die neue Regelung verursacht erheblich mehr Aufwand.' },
    { term: 'verbindlich', de: 'fest vereinbart und deshalb einzuhalten', fa: 'الزام‌آور، قطعی', example: 'Wir müssen den Termin verbindlich vereinbaren.' },
    { term: 'transparent dokumentiert', de: 'so schriftlich festgehalten, dass der Ablauf für alle nachvollziehbar ist', fa: 'به‌صورت شفاف مستند شده', example: 'Alle Entscheidungen werden transparent dokumentiert.' },
    { term: 'sachliche Argumente', de: 'ruhige, faktenbezogene Gründe ohne persönliche Angriffe', fa: 'استدلال‌های منطقی و عینی', example: 'Sachliche Argumente überzeugen oft mehr als Vorwürfe.' },
    { term: 'grundsätzliche Ablehnung', de: 'eine allgemeine Zurückweisung, die keine Ausnahme zulässt', fa: 'مخالفت اصولی و کلی', example: 'Seine grundsätzliche Ablehnung verhindert jeden Kompromiss.' },
  ],
  'deutsch-001-digitale-erreichbarkeit': [
    { term: 'offiziell', de: 'ausdrücklich, formell und von einer zuständigen Stelle bestätigt', fa: 'رسمی، به‌طور رسمی', example: 'Die Änderung wurde gestern offiziell bestätigt.' },
    { term: 'entsteht', de: 'beginnt sich zu entwickeln oder kommt neu zustande', fa: 'به‌وجود می‌آید', example: 'Ohne klare Regeln entsteht schnell ein Missverständnis.' },
    { term: 'Anfrage', de: 'eine Bitte um Information, Antwort oder Unterstützung', fa: 'درخواست، پرس‌وجو', example: 'Ihre Anfrage wird innerhalb eines Tages beantwortet.' },
    { term: 'nach Feierabend', de: 'in der freien Zeit nach dem Ende des Arbeitstages', fa: 'بعد از پایان ساعت کاری', example: 'Nach Feierabend schalte ich das Diensthandy aus.' },
    { term: 'vorsichtig an', de: 'auf behutsame Weise erwähnen oder zur Diskussion stellen', fa: 'با احتیاط مطرح می‌کند', example: 'Sie spricht das schwierige Problem vorsichtig an.' },
    { term: 'skeptisch', de: 'zweifelnd und noch nicht von einer Idee überzeugt', fa: 'مردد، شکاک', example: 'Das Team reagiert auf den Vorschlag zunächst skeptisch.' },
    { term: 'klare Grenzen', de: 'eindeutige Regeln dafür, was möglich oder akzeptabel ist', fa: 'مرزهای روشن', example: 'Klare Grenzen schützen die private Zeit.' },
    { term: 'Zusammenarbeit', de: 'gemeinsames Arbeiten an einer Aufgabe oder einem Ziel', fa: 'همکاری', example: 'Gute Kommunikation verbessert die Zusammenarbeit.' },
  ],
}

function enrichLessonVocabulary(lesson) {
  const additions = vocabularyEnrichments[lesson?.id] || []
  if (!additions.length) return lesson
  const vocabulary = lesson.reading?.vocabulary || []
  const existing = new Set(vocabulary.map(item => item.term.toLocaleLowerCase('de')))
  return {
    ...lesson,
    reading: {
      ...lesson.reading,
      vocabulary: [...vocabulary, ...additions.filter(item => !existing.has(item.term.toLocaleLowerCase('de')))],
    },
  }
}

const contentPrompt = `Erstelle eine Tageslektion Deutsch für Andarun als reines JSON ohne Markdown.
Niveau: B2. Thema aus echter täglicher Sprachbenutzung: Arbeit, Familie, Behörden, Gesundheit, Wohnung, Konflikte, Diskussionen, Meinung äußern, Entscheidungen begründen.
Stil: natürlich und alltagsnah, aber anspruchsvoll. Keine Kindersprache, keine A2/B1-Übungen.

Schema:
{
  “id”: “deutsch-YYYY-MM-DD-kurzer-slug”,
  “date”: “YYYY-MM-DD”,
  “level”: “B2”,
  “title”: “...”,
  “topic”: “...”,
  “reading”: {
    “title”: “...”,
    “text”: “170-230 Wörter auf Deutsch mit B2-Satzbau”,
    “vocabulary”: [
      { “term”: “exakte Form aus dem Lesetext”, “de”: “klare Bedeutung auf Deutsch”, “fa”: “präzise persische Übersetzung”, “example”: “natürlicher deutscher Beispielsatz mit dem Begriff” }
    ],
    “questions”: [
      { “question”: “...”, “options”: [“...”, “...”, “...”, “...”], “answer”: 0, “explanation”: “...” }
    ]
  },
  “vocabulary_quiz”: [
    { “question”: “...”, “options”: [“...”, “...”, “...”, “...”], “answer”: 0, “explanation”: “...” }
  ],
  “grammar”: [
    { “question”: “...”, “options”: [“...”, “...”, “...”, “...”], “answer”: 0, “explanation”: “...” }
  ],
  “listening”: {
    “title”: “...”,
    “text”: “ähnlicher Text mit ähnlichen Wörtern, aber nicht identisch”,
    “questions”: [
      { “question”: “...”, “options”: [“...”, “...”, “...”, “...”], “answer”: 0, “explanation”: “...” }
    ]
  },
  “writing”: {
    “prompt”: “konkrete Schreibaufgabe”,
    “checklist”: [“...”, “...”, “...”]
  }
}

REGELN FÜR VOCABULARY:
- genau 15 bis 20 vocabulary Einträge (so viele lernrelevante B2-Wörter wie möglich)
- term muss buchstabengetreu in derselben Form im reading.text vorkommen
- de erklärt die Bedeutung verständlich, ist keine bloße Wiederholung des Begriffs
- fa ist eine natürliche, genaue persische Übersetzung in persischer Schrift
- example ist ein neuer, natürlicher Satz (nicht aus dem Lesetext kopiert) und enthält term exakt
- Keine A1-Wörter (machen, gehen, gut, heute) außer in B2-Wendungen
- Pflicht: alle Verben mit fester Präposition, idiomatische Ausdrücke, wichtige Nomen, Konnektoren erfassen

REGELN FÜR READING QUESTIONS:
- genau 5 Fragen
- Schwierig: Bedeutung, Schlussfolgerung, Haltung, indirekte Aussage — keine einfache Wortsuche

REGELN FÜR VOCABULARY_QUIZ (5 Fragen):
- Jede Frage testet die Bedeutung eines Wortes oder einer Wendung aus dem vocabulary
- Frageformat: „Was bedeutet ‚X'?” oder „Welche Bedeutung hat ‚X' in diesem Kontext?” oder „Was ist das Gegenteil von ‚X'?”
- Die 4 Optionen sind kurze deutsche Bedeutungserklärungen (nicht Übersetzungen)
- KEIN Regelwissen abfragen — nur Wortbedeutung und Verwendung

REGELN FÜR GRAMMAR (5 Fragen):
- Praktische Lückentext- oder Wahlaufgaben aus echten Sätzen des Lesetextes
- KEIN Format „Welche grammatische Funktion hat X?” oder „Warum steht Y?”
- Stattdessen: „Ergänze: ...”, „Wähle die richtige Form:”, „Welche Präposition passt?”, „Welcher Artikel ist korrekt?”
- Pflichtthemen (mindestens eines von jedem):
  * Artikel mit korrektem Kasus — z.B. „Wähle: mit ___ Kollegin (dem/der/die/den)”
  * Präposition + richtiger Kasus — z.B. „Welche Präposition? ___ dem Arzt sprechen (mit/bei/von/für)”
  * Verb mit fester Präposition — z.B. „Sie bittet ___ einen neuen Termin (um/für/an/mit)”
  * Satzstellung nach Konjunktion/Adverb — Verb-am-Ende oder V2
  * Konjunktiv, Passiv oder trennbares Verb

REGELN FÜR GRAMMAR EXPLANATIONS (explanation-Feld):
- Immer ausführlich und konkret, mindestens 2 Sätze
- Bei Präpositionen: immer den verlangten Kasus nennen (Akkusativ/Dativ/Genitiv) und ein weiteres Beispiel geben
- Bei Artikeln: Genus des Substantivs + Kasus + Deklinationsform erklären. Beispiel: „‚Arzt' ist maskulin (der Arzt). Im Dativ Singular lautet der bestimmte Artikel ‚dem': mit dem Arzt.”
- Bei Konjunktionen: Satzstellung klar erklären: „Nach ‚weil' steht das Verb am Ende des Nebensatzes.”
- Bei Verben mit Präposition: die feste Verbindung vollständig nennen: „bitten um + Akkusativ. Er bittet um Hilfe.”
- Erkläre auch, warum die anderen Optionen falsch sind, wenn es lehrreich ist

REGELN FÜR LISTENING:
- genau 5 Fragen
- Ähnliche Situation wie Lesetext, aber ein anderer Text und eine andere Perspektive

REGELN FÜR WRITING:
- Schreibaufgabe verlangt eine Meinung, Entscheidung oder Argumentation
- checklist: 5 Punkte

Pflichtprüfung vor der Ausgabe:
1. Zähle 15 bis 20 vocabulary-Einträge — zu wenig = Fehler.
2. Prüfe jeden vocabulary.term exakt im reading.text.
3. Prüfe de, fa, example bei jeder Karte.
4. Zähle genau 5 vocabulary_quiz Fragen.
5. Zähle genau 5 grammar Fragen. Prüfe: keine Frage fragt nach grammatischer Funktion oder Regelname.
6. Prüfe alle explanation-Felder bei grammar: Sind sie ausführlich? Wird der Kasus bei Präpositionen genannt?
7. Gib ausschließlich valides JSON aus, ohne Kommentar und ohne Markdown.`

function normalizeState(value) {
  return {
    lessons: Array.isArray(value?.lessons) ? value.lessons : [],
    cards: Array.isArray(value?.cards) ? value.cards : [],
    reviews: Array.isArray(value?.reviews) ? value.reviews : [],
    writings: Array.isArray(value?.writings) ? value.writings : [],
    answers: value?.answers && typeof value.answers === 'object' ? value.answers : {},
  }
}

function dueDateForBox(box) {
  const date = new Date()
  date.setHours(8, 0, 0, 0)
  date.setTime(date.getTime() + (INTERVALS[Math.min(box, INTERVALS.length - 1)] || 0) * DAY)
  return date.toISOString()
}

function isDue(card) {
  return !card.dueAt || new Date(card.dueAt) <= new Date()
}

function isToday(value) {
  return typeof value === 'string' && value.slice(0, 10) === todayIso()
}

function getLessonQuestions(lesson) {
  return [
    ...(lesson?.reading?.questions || []).map((_, index) => `${lesson.id}-reading-${index}`),
    ...(lesson?.vocabulary_quiz || []).map((_, index) => `${lesson.id}-vocabquiz-${index}`),
    ...(lesson?.grammar || []).map((_, index) => `${lesson.id}-grammar-${index}`),
    ...(lesson?.listening?.questions || []).map((_, index) => `${lesson.id}-listening-${index}`),
  ]
}

function getLessonProgress(lesson, answers) {
  const keys = getLessonQuestions(lesson)
  if (!keys.length) return 0
  const done = keys.filter(key => typeof answers[key] === 'number').length
  return Math.round((done / keys.length) * 100)
}

function speak(text) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'de-DE'
  utterance.rate = 0.88
  utterance.pitch = 1
  window.speechSynthesis.speak(utterance)
  return true
}

function tokenizeText(text, vocabulary, onWordClick) {
  const terms = [...vocabulary].sort((a, b) => b.term.length - a.term.length)
  const pattern = terms.length
    ? new RegExp(`(${terms.map(item => item.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi')
    : null
  const wordPattern = /^([\p{L}ÄÖÜäöüß-]{3,})$/u

  const parts = pattern ? text.split(pattern) : text.split(/(\s+|[.,!?;:()]+)/)
  return parts.map((part, index) => {
    const match = terms.find(item => item.term.toLowerCase() === part.toLowerCase())
    if (!match && !wordPattern.test(part)) return <span key={`${part}-${index}`}>{part}</span>
    const word = match || {
      term: part,
      de: 'Für dieses Wort ist in dieser Lektion noch keine vorbereitete Erklärung gespeichert.',
      fa: 'برای این واژه هنوز توضیح آماده ذخیره نشده است.',
      example: '',
      incomplete: true,
    }
    return (
      <button type="button" key={`${part}-${index}`} className={match ? styles.wordBtn : styles.plainWordBtn} onClick={() => onWordClick(word)}>
        {part}
      </button>
    )
  })
}

function QuestionBlock({ id, items, answers, onAnswer, onReset }) {
  const hasAnswers = Object.keys(answers).some(key => key.startsWith(`${id}-`))
  return (
    <div className={styles.questionList}>
      {items.map((item, index) => {
        const key = `${id}-${index}`
        const selected = answers[key]
        const answered = typeof selected === 'number'
        return (
          <article className={styles.questionCard} key={key}>
            <div className={styles.questionTop}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{item.question}</strong>
            </div>
            <div className={styles.optionsGrid}>
              {(item.options || []).map((option, optionIndex) => {
                const isSelected = selected === optionIndex
                const isCorrect = item.answer === optionIndex
                const className = [
                  styles.optionBtn,
                  answered && isCorrect ? styles.correct : '',
                  answered && isSelected && !isCorrect ? styles.wrong : '',
                ].filter(Boolean).join(' ')
                return (
                  <button
                    type="button"
                    className={className}
                    key={option}
                    disabled={answered}
                    onClick={() => onAnswer(key, optionIndex)}
                  >
                    <span>{option}</span>
                    {isSelected && <b aria-hidden="true">✓</b>}
                  </button>
                )
              })}
            </div>
            {answered && (
              <div className={`${styles.answerFeedback} ${selected === item.answer ? styles.feedbackCorrect : styles.feedbackWrong}`}>
                <strong>{selected === item.answer ? 'Richtig' : 'Noch nicht ganz'}</strong>
                <p className={styles.explanation}>{item.explanation}</p>
              </div>
            )}
          </article>
        )
      })}
      {hasAnswers && (
        <button type="button" className={styles.resetAnswers} onClick={onReset}>
          Antworten zurücksetzen <span aria-hidden="true">↻</span>
        </button>
      )}
    </div>
  )
}

function MarkedCorrection({ correction }) {
  const segments = Array.isArray(correction?.annotatedCorrection)
    ? correction.annotatedCorrection.filter(segment => typeof segment?.text === 'string' && segment.text)
    : []

  if (!segments.length) return <p>{correction?.corrected || ''}</p>

  return (
    <p className={styles.markedCorrection}>
      {segments.map((segment, index) => {
        const className = segment.type === 'addition'
          ? styles.markAddition
          : segment.type === 'correction'
            ? styles.markCorrection
            : ''
        return className
          ? <span className={className} key={`${segment.text}-${index}`}>{segment.text}</span>
          : <span key={`${segment.text}-${index}`}>{segment.text}</span>
      })}
    </p>
  )
}

export default function DeutschPage({
  initialLessonId = '',
  lessonMode = false,
  apiBase = '/api/andarun/deutsch',
  correctEndpoint = '/api/andarun/deutsch/correct',
  speechEndpoint = '/api/andarun/deutsch/speech',
  homeHref = '/andarun',
  homeLabel = 'Privat',
  courseHref = '/andarun/deutsch',
  lessonBase = '/andarun/deutsch',
  canImport = true,
  theme = 'dark',
}) {
  const [state, setState] = useState(emptyState)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeLessonId, setActiveLessonId] = useState('')
  const [activeTab, setActiveTab] = useState(lessonMode ? 'lesen' : 'home')
  const [selectedWord, setSelectedWord] = useState(null)
  const [importText, setImportText] = useState('')
  const [writingText, setWritingText] = useState('')
  const [correction, setCorrection] = useState(null)
  const [correcting, setCorrecting] = useState(false)
  const [speechLoading, setSpeechLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [message, setMessage] = useState('')
  const [importOpen, setImportOpen] = useState(false)
  const [flashOpen, setFlashOpen] = useState(false)
  const [flashView, setFlashView] = useState({ mode: 'boxes', box: 0, practice: false })
  const [showBack, setShowBack] = useState(false)
  const [practiceIndex, setPracticeIndex] = useState(0)
  const [visualTheme, setVisualTheme] = useState(theme)
  const saveTimer = useRef(null)
  const activeAudio = useRef(null)
  const speechCache = useRef(new Map())
  const localStorageKey = `deutsch_state_${apiBase.replace(/[^a-z0-9]/gi, '_')}`

  function readLocalState() {
    try {
      const local = window.localStorage.getItem(localStorageKey)
      return local ? normalizeState(JSON.parse(local)) : null
    } catch {
      return null
    }
  }

  function writeLocalState(nextState) {
    try {
      window.localStorage.setItem(localStorageKey, JSON.stringify(normalizeState(nextState)))
      return true
    } catch {
      return false
    }
  }

  useEffect(() => {
    let ignore = false
    fetch(apiBase)
      .then(res => res.ok ? res.json() : Promise.reject(new Error('load failed')))
      .then(data => {
        if (ignore) return
        const loaded = normalizeState(data.state)
        loaded.lessons = loaded.lessons.map(lesson => enrichLessonVocabulary(
          lesson.id === sampleLesson.id ? upgradedSampleLesson : lesson
        ))
        if (!loaded.lessons.length) {
          loaded.lessons = [upgradedSampleLesson]
        }
        setState(loaded)
        const preferredLesson = loaded.lessons.find(lesson => lesson.id === initialLessonId)
        setActiveLessonId(preferredLesson?.id || loaded.lessons[0]?.id || upgradedSampleLesson.id)
      })
      .catch(() => {
        const fallback = readLocalState() || { ...emptyState, lessons: [upgradedSampleLesson] }
        if (!fallback.lessons.length) fallback.lessons = [upgradedSampleLesson]
        fallback.lessons = fallback.lessons.map(enrichLessonVocabulary)
        setState(fallback)
        setActiveLessonId(initialLessonId || fallback.lessons[0]?.id || upgradedSampleLesson.id)
        setMessage('Online-Speicherung ist gerade nicht erreichbar. Dein Fortschritt wird lokal auf diesem Gerät gespeichert.')
      })
      .finally(() => !ignore && setLoading(false))
    return () => { ignore = true }
  }, [initialLessonId, lessonMode, apiBase])

  useEffect(() => {
    const stored = window.localStorage.getItem('andarun-deutsch-theme')
    if (stored === 'dark' || stored === 'light') setVisualTheme(stored)
  }, [])

  function toggleVisualTheme() {
    const next = visualTheme === 'dark' ? 'light' : 'dark'
    setVisualTheme(next)
    window.localStorage.setItem('andarun-deutsch-theme', next)
  }

  function stopAudio() {
    if (activeAudio.current) {
      activeAudio.current.pause()
      activeAudio.current.currentTime = 0
    }
    window.speechSynthesis?.cancel()
    setIsPlaying(false)
  }

  function skipForward(seconds = 10) {
    if (activeAudio.current) {
      activeAudio.current.currentTime = Math.min(
        activeAudio.current.currentTime + seconds,
        activeAudio.current.duration || 0
      )
    }
  }

  async function speakListeningText(text) {
    if (!text || speechLoading) return
    activeAudio.current?.pause()
    window.speechSynthesis?.cancel()
    setIsPlaying(false)
    setSpeechLoading(true)

    try {
      let audioUrl = speechCache.current.get(text)
      if (!audioUrl) {
        const response = await fetch(speechEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        })
        if (!response.ok) throw new Error('KI-Stimme nicht verfügbar')
        audioUrl = URL.createObjectURL(await response.blob())
        speechCache.current.set(text, audioUrl)
      }

      const audio = new Audio(audioUrl)
      audio.addEventListener('ended', () => setIsPlaying(false))
      audio.addEventListener('pause', () => setIsPlaying(false))
      audio.addEventListener('play', () => setIsPlaying(true))
      activeAudio.current = audio
      await audio.play()
    } catch {
      speak(text)
      setMessage('Die KI-Stimme war nicht erreichbar. Die Gerätestimme wird als Ersatz verwendet.')
    } finally {
      setSpeechLoading(false)
    }
  }

  useEffect(() => () => {
    activeAudio.current?.pause()
    speechCache.current.forEach(url => URL.revokeObjectURL(url))
  }, [])

  function persist(nextState) {
    setState(nextState)
    window.clearTimeout(saveTimer.current)
    saveTimer.current = window.setTimeout(async () => {
      setSaving(true)
      try {
        const res = await fetch(apiBase, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ state: nextState }),
        })
        if (!res.ok) throw new Error('save failed')
        const data = await res.json()
        setState(normalizeState(data.state))
        setMessage('')
      } catch {
        const stored = writeLocalState(nextState)
        setMessage(stored ? 'Lokal gespeichert. Online-Speicherung ist gerade nicht erreichbar.' : 'Speichern ist gerade nicht möglich.')
      } finally {
        setSaving(false)
      }
    }, 450)
  }

  const activeLesson = useMemo(
    () => state.lessons.find(lesson => lesson.id === activeLessonId) || state.lessons[0] || upgradedSampleLesson,
    [state.lessons, activeLessonId]
  )
  const sortedLessons = useMemo(
    () => [...state.lessons].sort((a, b) => `${b.date || ''}`.localeCompare(`${a.date || ''}`)),
    [state.lessons]
  )
  const dueCards = useMemo(() => state.cards.filter(isDue), [state.cards])
  const nextCard = dueCards[0]
  const learnedWords = new Set(state.cards.map(card => card.term.toLowerCase()))
  const selectedWordSaved = selectedWord ? learnedWords.has(selectedWord.term.toLowerCase()) : false
  const dueDoneToday = useMemo(() => state.reviews.filter(review => isToday(review.at)).length, [state.reviews])
  const flashCards = useMemo(() => {
    if (flashView.practice) return state.cards
    return state.cards.filter(card => (card.box || 0) === flashView.box && isDue(card))
  }, [flashView, state.cards])
  const activeFlashCard = flashView.practice ? flashCards[practiceIndex % Math.max(flashCards.length, 1)] : flashCards[0]
  const lessonWritings = useMemo(
    () => state.writings.filter(item => item.lessonId === activeLesson.id),
    [state.writings, activeLesson.id]
  )

  function answerQuestion(key, optionIndex) {
    persist({ ...state, answers: { ...state.answers, [key]: optionIndex } })
  }

  function resetSectionAnswers(section) {
    const prefix = `${activeLesson.id}-${section}-`
    const answers = Object.fromEntries(
      Object.entries(state.answers).filter(([key]) => !key.startsWith(prefix))
    )
    persist({ ...state, answers })
    setMessage('Antworten zurückgesetzt.')
  }

  function addWordCard(word) {
    const cardId = `${activeLesson.id}-${word.term.toLowerCase().replace(/\s+/g, '-')}`
    if (state.cards.some(card => card.id === cardId)) {
      setMessage('Diese Karte ist schon gespeichert.')
      return
    }
    if (word.incomplete) {
      setMessage('Für dieses Wort fehlt noch eine gute Erklärung. Besser in der nächsten KI-Lektion ins Vokabular aufnehmen.')
      return
    }
    const card = {
      id: cardId,
      lessonId: activeLesson.id,
      type: 'word',
      term: word.term,
      front: word.term,
      back: `${word.de}\n\nPersisch: ${word.fa}`,
      de: word.de,
      fa: word.fa,
      example: word.example || '',
      box: 0,
      dueAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }
    persist({ ...state, cards: [card, ...state.cards] })
    setMessage(`"${word.term}" wurde als Flashcard gespeichert.`)
  }

  function reviewCard(card, knew) {
    const quality = knew ? 'known' : 'unknown'
    const box = knew ? Math.min((card.box || 0) + 1, INTERVALS.length - 1) : 0
    const nextCardState = { ...card, box, dueAt: dueDateForBox(box), lastReviewedAt: new Date().toISOString() }
    setShowBack(false)
    persist({
      ...state,
      cards: state.cards.map(item => item.id === card.id ? nextCardState : item),
      reviews: [...state.reviews, { id: uid('review'), cardId: card.id, quality, at: new Date().toISOString() }],
    })
  }

  function importLesson() {
    try {
      const lesson = JSON.parse(importText)
      if (!lesson.id || !lesson.title || !lesson.reading?.text) throw new Error('bad lesson')
      const enrichedLesson = enrichLessonVocabulary(lesson)
      const lessons = [enrichedLesson, ...state.lessons.filter(item => item.id !== lesson.id)]
      persist({ ...state, lessons })
      setActiveLessonId(enrichedLesson.id)
      setActiveTab('home')
      setImportText('')
      setImportOpen(false)
      setMessage('Neue Lektion importiert.')
    } catch {
      setMessage('JSON konnte nicht als Lektion gelesen werden.')
    }
  }

  function saveWritingDraft() {
    if (!writingText.trim()) return
    persist({
      ...state,
      writings: [{
        id: uid('writing'),
        lessonId: activeLesson.id,
        task: activeLesson.writing?.prompt || '',
        text: writingText.trim(),
        correction,
        createdAt: new Date().toISOString(),
      }, ...state.writings],
    })
    setMessage('Schreibtext gespeichert.')
  }

  async function correctWriting() {
    if (!writingText.trim()) {
      setMessage('Schreibe zuerst einen Text.')
      return
    }
    setCorrecting(true)
    setCorrection(null)
    try {
      const res = await fetch(correctEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: writingText,
          task: activeLesson.writing?.prompt || '',
          checklist: activeLesson.writing?.checklist || [],
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'KI nicht verfügbar')
      const nextCorrection = data.result
      setCorrection(nextCorrection)
      persist({
        ...state,
        writings: [{
          id: uid('writing'),
          lessonId: activeLesson.id,
          task: activeLesson.writing?.prompt || '',
          checklist: activeLesson.writing?.checklist || [],
          text: writingText.trim(),
          correction: nextCorrection,
          createdAt: new Date().toISOString(),
        }, ...state.writings],
      })
      setMessage('KI-Korrektur ist fertig und gespeichert.')
    } catch (error) {
      setMessage(error.message || 'KI-Korrektur ist gerade nicht verfügbar.')
    } finally {
      setCorrecting(false)
    }
  }

  function addAllVocabCards() {
    const vocab = activeLesson.reading?.vocabulary || []
    let added = 0
    let next = { ...state, cards: [...state.cards] }
    for (const word of vocab) {
      if (word.incomplete) continue
      const cardId = `${activeLesson.id}-${word.term.toLowerCase().replace(/\s+/g, '-')}`
      if (next.cards.some(card => card.id === cardId)) continue
      next.cards = [{
        id: cardId,
        lessonId: activeLesson.id,
        type: 'word',
        term: word.term,
        front: word.term,
        back: `${word.de}\n\nPersisch: ${word.fa}`,
        de: word.de,
        fa: word.fa,
        example: word.example || '',
        box: 0,
        dueAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      }, ...next.cards]
      added++
    }
    if (added > 0) { persist(next); setMessage(`${added} neue Flashcard${added > 1 ? 's' : ''} gespeichert.`) }
    else setMessage('Alle Vokabeln sind bereits als Flashcards gespeichert.')
  }

  function addMistakeCard(mistake) {
    const card = {
      id: uid('mistake'),
      lessonId: activeLesson.id,
      type: 'mistake',
      term: mistake.correct || mistake.cardBack || 'Fehlerkarte',
      front: mistake.cardFront || `Korrigiere: ${mistake.wrong}`,
      back: mistake.cardBack || mistake.correct,
      de: mistake.reason || '',
      fa: '',
      example: mistake.correct || '',
      box: 0,
      dueAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }
    persist({ ...state, cards: [card, ...state.cards] })
    setMessage('Fehler wurde als Wiederholungskarte gespeichert.')
  }

  if (lessonMode && loading) {
    return (
      <main className={`${styles.shell} ${visualTheme === 'light' ? styles.lightShell : ''}`}>
        <div className={styles.lessonBoot} role="status" aria-live="polite">
          <span aria-hidden="true" />
          <p>Lektion wird geladen</p>
        </div>
      </main>
    )
  }

  return (
    <main className={`${styles.shell} ${visualTheme === 'light' ? styles.lightShell : ''}`}>
      <header className={`${styles.hero} ${!lessonMode ? styles.heroSimple : ''}`}>
        <div>
          <div className={styles.heroNav}>
            {(lessonMode || homeLabel) && (
              <Link className={styles.backLink} href={lessonMode ? courseHref : homeHref}>← {lessonMode ? 'Kurs' : homeLabel}</Link>
            )}
            <button type="button" className={styles.themeToggle} onClick={toggleVisualTheme} aria-label="Farbschema wechseln">
              <span>{visualTheme === 'dark' ? '☾' : '☼'}</span>
              {visualTheme === 'dark' ? 'Galaxy' : 'Heaven'}
            </button>
          </div>
          <span className={styles.kicker}>{lessonMode ? `${activeLesson.level} · Lektion` : 'Deutsch · B2'}</span>
          <h1>{lessonMode ? activeLesson.title : <>Deutsch<br/><em>lernen.</em></>}</h1>
          <p>{lessonMode ? activeLesson.topic : 'Lesen. Testen. Sprechen.'}</p>
          {!lessonMode && canImport && (
            <button type="button" className={styles.importMiniBtn} onClick={() => setImportOpen(true)}>
              Import
            </button>
          )}
        </div>
      </header>

      {message && <div className={styles.status}>{message} {saving ? 'Speichert...' : ''}</div>}

      {lessonMode && (
        <>
          <nav className={styles.tabs} aria-label="Deutschbereiche">
            {[
              ['lesen', '01 · Lesen'],
              ['grammatik', '02 · Test'],
              ['hoeren', '03 · Hören'],
              ['schreiben', '04 · Schreiben'],
            ].map(([id, label]) => (
              <button type="button" key={id} className={activeTab === id ? styles.activeTab : ''} onClick={() => setActiveTab(id)}>
                {label}
              </button>
            ))}
          </nav>

        </>
      )}

      {!lessonMode && activeTab === 'home' && (
        <section className={styles.homeGrid}>
          <article className={styles.textPanel}>
            <div className={styles.panelHead}>
              <span>Dein Kurs</span>
              <strong>{state.lessons.length} Lektionen</strong>
            </div>
            <div className={styles.lessonRows}>
              {sortedLessons.map((lesson, index) => {
                const progress = getLessonProgress(lesson, state.answers)
                return (
                  <Link
                    className={styles.lessonRow}
                    key={lesson.id}
                    href={`${lessonBase}/${lesson.id}`}
                  >
                    <span className={styles.lessonNumber}>{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <span>{lesson.level}</span>
                      <strong>{lesson.title}</strong>
                      <small>{lesson.topic}</small>
                    </div>
                    <div className={styles.progressWrap} aria-label={progress ? 'Gespeicherter Fortschritt' : 'Noch nicht begonnen'}>
                      <b>{progress ? '✓ Gespeichert' : 'Start →'}</b>
                    </div>
                  </Link>
                )
              })}
            </div>
          </article>

          <aside className={styles.flashPanel}>
            <div className={styles.panelHead}>
              <span>Quick Practice</span>
              <strong>Flashcards</strong>
            </div>
            <div className={styles.flashNumbers}>
              <span><strong>{dueCards.length}</strong>fällig</span>
              <span><strong>{dueDoneToday}</strong>erledigt</span>
              <span><strong>{state.cards.length}</strong>gesamt</span>
            </div>
            <button
              type="button"
              className={styles.primaryBtn}
              onClick={() => {
                setFlashView({ mode: 'boxes', box: 0, practice: false })
                setShowBack(false)
                setFlashOpen(true)
              }}
            >
              Training starten →
            </button>
          </aside>
        </section>
      )}

      {activeTab === 'lesen' && (
        <section className={styles.lessonGrid}>
          <article className={styles.textPanel}>
            <div className={styles.panelHead}>
              <span>{activeLesson.level} · {activeLesson.topic}</span>
              <strong>{activeLesson.reading.title}</strong>
            </div>
            <p className={styles.readingText}>
              {tokenizeText(activeLesson.reading.text, activeLesson.reading.vocabulary || [], setSelectedWord)}
            </p>
            <div className={styles.wordShelfWrap}>
              <div className={styles.wordShelf}>
                {(activeLesson.reading.vocabulary || []).map(word => (
                  <button type="button" key={word.term} onClick={() => setSelectedWord(word)} className={learnedWords.has(word.term.toLowerCase()) ? styles.savedWord : ''}>
                    {word.term}
                  </button>
                ))}
              </div>
              {(activeLesson.reading.vocabulary || []).length > 0 && (
                <button type="button" className={styles.saveAllBtn} onClick={addAllVocabCards}>
                  Alle {(activeLesson.reading.vocabulary || []).length} Vokabeln als Flashcard speichern
                </button>
              )}
            </div>
          </article>
          <QuestionBlock id={`${activeLesson.id}-reading`} items={activeLesson.reading.questions || []} answers={state.answers} onAnswer={answerQuestion} onReset={() => resetSectionAnswers('reading')} />
        </section>
      )}

      {activeTab === 'grammatik' && (
        <section className={styles.singleSection}>
          <div className={styles.sectionIntro}>
            <span>10 Fragen · Wörter & Grammatik</span>
            <h2>Tagestest</h2>
          </div>
          {(activeLesson.vocabulary_quiz || []).length > 0 && (
            <>
              <div className={styles.testSubHead}>
                <span className={styles.testSubLabel}>Teil 1 · Wortbedeutung</span>
                <span className={styles.testSubCount}>{(activeLesson.vocabulary_quiz || []).length} Fragen</span>
              </div>
              <QuestionBlock id={`${activeLesson.id}-vocabquiz`} items={activeLesson.vocabulary_quiz || []} answers={state.answers} onAnswer={answerQuestion} onReset={() => resetSectionAnswers('vocabquiz')} />
            </>
          )}
          <div className={styles.testSubHead}>
            <span className={styles.testSubLabel}>Teil 2 · Grammatik</span>
            <span className={styles.testSubCount}>{(activeLesson.grammar || []).length} Fragen</span>
          </div>
          <QuestionBlock id={`${activeLesson.id}-grammar`} items={activeLesson.grammar || []} answers={state.answers} onAnswer={answerQuestion} onReset={() => resetSectionAnswers('grammar')} />
        </section>
      )}

      {activeTab === 'hoeren' && (
        <section className={styles.lessonGrid}>
          <article className={styles.textPanel}>
            <div className={styles.panelHead}>
              <span>Hören</span>
              <strong>{activeLesson.listening.title}</strong>
            </div>
            <p className={styles.listeningHint}>Höre zuerst ohne mitzulesen. Danach kannst du den Text öffnen und die Fragen beantworten.</p>
            <div className={styles.audioControls}>
              <button
                type="button"
                className={styles.primaryBtn}
                onClick={() => isPlaying ? stopAudio() : speakListeningText(activeLesson.listening.text)}
                disabled={speechLoading}
              >
                {speechLoading ? 'KI-Stimme wird vorbereitet …' : isPlaying ? '⏹ Stoppen' : '▶ Mit KI-Stimme anhören'}
              </button>
              {isPlaying && (
                <button type="button" className={styles.skipBtn} onClick={() => skipForward(10)}>
                  +10s ⏩
                </button>
              )}
            </div>
            <details className={styles.transcript}>
              <summary>Transkript anzeigen</summary>
              <p>{activeLesson.listening.text}</p>
            </details>
          </article>
          <QuestionBlock id={`${activeLesson.id}-listening`} items={activeLesson.listening.questions || []} answers={state.answers} onAnswer={answerQuestion} onReset={() => resetSectionAnswers('listening')} />
        </section>
      )}

      {activeTab === 'schreiben' && (
        <section className={styles.writingGrid}>
          <article className={styles.textPanel}>
            <div className={styles.panelHead}>
              <span>Schreiben</span>
              <strong>Tagesaufgabe</strong>
            </div>
            <p className={styles.taskText}>{activeLesson.writing?.prompt}</p>
            <ul className={styles.checklist}>
              {(activeLesson.writing?.checklist || []).map(item => <li key={item}>{item}</li>)}
            </ul>
            <textarea value={writingText} onChange={event => setWritingText(event.target.value)} placeholder="Schreibe hier deinen Text..." />
            <div className={styles.actionRow}>
              <button type="button" className={styles.primaryBtn} onClick={correctWriting} disabled={correcting}>{correcting ? 'Korrigiert...' : 'Mit KI korrigieren'}</button>
              <button type="button" onClick={saveWritingDraft}>Speichern</button>
            </div>
            {!!lessonWritings.length && (
              <section className={styles.writingHistory}>
                <h3>Gespeicherte Texte</h3>
                {lessonWritings.slice(0, 6).map(item => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => {
                      setWritingText(item.text || '')
                      setCorrection(item.correction || null)
                      setMessage('Gespeicherte Korrektur geladen.')
                    }}
                  >
                    <span>{new Date(item.createdAt).toLocaleString('de-DE', { dateStyle: 'short', timeStyle: 'short' })}</span>
                    <strong>{item.correction ? 'mit KI-Korrektur' : 'Entwurf'}</strong>
                    <small>{(item.text || '').slice(0, 120)}{(item.text || '').length > 120 ? '...' : ''}</small>
                  </button>
                ))}
              </section>
            )}
          </article>

          <article className={styles.correctionPanel}>
            <div className={styles.panelHead}>
              <span>KI-Rückmeldung</span>
              <strong>{correction ? 'Korrektur' : 'Bereit'}</strong>
            </div>
            {correction ? (
              <>
                {correction.taskFulfillment && (
                  <div className={styles.fulfillmentBox}>
                    <span>{correction.taskFulfillment.status || 'Aufgabenbezug'}</span>
                    <strong>{typeof correction.taskFulfillment.score === 'number' ? `${correction.taskFulfillment.score}%` : 'Bewertet'}</strong>
                    <p>{correction.taskFulfillment.feedback}</p>
                    {!!correction.taskFulfillment.missingPoints?.length && (
                      <>
                        <h4>Fehlende Punkte</h4>
                        <ul>
                          {correction.taskFulfillment.missingPoints.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}
                        </ul>
                      </>
                    )}
                    {!!correction.taskFulfillment.offTopicParts?.length && (
                      <>
                        <h4>Nicht passend zur Aufgabe</h4>
                        <ul>
                          {correction.taskFulfillment.offTopicParts.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}
                        </ul>
                      </>
                    )}
                  </div>
                )}
                <h3>Korrigierte Version</h3>
                <MarkedCorrection correction={correction} />
                {!!correction.annotatedCorrection?.length && (
                  <div className={styles.markLegend} aria-label="Markierungslegende">
                    <span><i className={styles.legendCorrection} /> rot: korrigiert</span>
                    <span><i className={styles.legendAddition} /> gelb: ergänzt</span>
                  </div>
                )}
                {correction.teacherVersion && (
                  <>
                    <h3>Passende Musterlösung</h3>
                    <p>{correction.teacherVersion}</p>
                  </>
                )}
                {!!correction.grammarErrors?.length && (
                  <>
                    <h3>Relevante Grammatikfehler</h3>
                    <ol className={styles.grammarList}>
                      {correction.grammarErrors.map((error, index) => (
                        <li key={`${error.wrong}-${index}`}>
                          <strong>{error.wrong} → {error.correct}</strong>
                          <span>{error.rule}</span>
                          {error.example && <em>{error.example}</em>}
                        </li>
                      ))}
                    </ol>
                  </>
                )}
                <h3>Weitere wichtige Fehler</h3>
                {(correction.mistakes || []).map((mistake, index) => (
                  <div className={styles.mistakeRow} key={`${mistake.wrong}-${index}`}>
                    <strong>{mistake.wrong} → {mistake.correct}</strong>
                    <span>{mistake.type ? `${mistake.type}: ` : ''}{mistake.reason}</span>
                    <button type="button" onClick={() => addMistakeCard(mistake)}>Als Karte speichern</button>
                  </div>
                ))}
                {correction.nextStep && (
                  <>
                    <h3>Nächster Schritt</h3>
                    <p>{correction.nextStep}</p>
                  </>
                )}
              </>
            ) : null}
          </article>
        </section>
      )}

      {importOpen && (
        <div className={styles.modalBackdrop} role="presentation" onMouseDown={() => setImportOpen(false)}>
          <section className={styles.importModal} role="dialog" aria-modal="true" onMouseDown={event => event.stopPropagation()}>
            <button type="button" className={styles.closeBtn} onClick={() => setImportOpen(false)}>Schließen</button>
            <span>Import</span>
            <h2>Neue Lektion</h2>
            <textarea value={importText} onChange={event => setImportText(event.target.value)} placeholder="Hier das JSON von ChatGPT einfügen..." />
            <div className={styles.actionRow}>
              <button type="button" className={styles.primaryBtn} onClick={importLesson}>Lektion importieren</button>
              <button type="button" onClick={() => navigator.clipboard?.writeText(contentPrompt).then(() => setMessage('Prompt kopiert.'))}>Prompt kopieren</button>
            </div>
            <details className={styles.promptDetails}>
              <summary>Prompt anzeigen</summary>
              <textarea readOnly value={contentPrompt} className={styles.promptBox} />
            </details>
          </section>
        </div>
      )}

      {flashOpen && (
        <div className={styles.modalBackdrop} role="presentation" onMouseDown={() => setFlashOpen(false)}>
          <section className={styles.flashModal} role="dialog" aria-modal="true" onMouseDown={event => event.stopPropagation()}>
            <button type="button" className={styles.closeBtn} onClick={() => setFlashOpen(false)}>Schließen</button>
            <span>Leitner</span>
            <h2>Flashcards</h2>

            {flashView.mode === 'boxes' && (
              <>
                <div className={styles.boxGrid}>
                  {LEITNER_BOXES.map(box => {
                    const cards = state.cards.filter(card => (card.box || 0) === box)
                    const due = cards.filter(isDue)
                    return (
                      <button
                        type="button"
                        className={styles.boxBtn}
                        key={box}
                        onClick={() => {
                          setFlashView({ mode: 'review', box, practice: false })
                          setShowBack(false)
                        }}
                      >
                        <strong>Box {box + 1}</strong>
                        <span>{due.length} fällig · {cards.length} gesamt</span>
                      </button>
                    )
                  })}
                </div>
                <button
                  type="button"
                  className={styles.practiceAllBtn}
                  onClick={() => {
                    setFlashView({ mode: 'review', box: 0, practice: true })
                    setPracticeIndex(0)
                    setShowBack(false)
                  }}
                >
                  Alle Karten ansehen
                </button>
              </>
            )}

            {flashView.mode === 'review' && (
              <div className={styles.flashReview}>
                <button type="button" className={styles.ghostBtn} onClick={() => setFlashView({ mode: 'boxes', box: 0, practice: false })}>Zurück zu Boxen</button>
                {activeFlashCard ? (
                  <article className={styles.flashCardFace}>
                    <small>{flashView.practice ? 'Ansehen ohne Speichern' : `Box ${flashView.box + 1}`}</small>
                    <h3>{activeFlashCard.front}</h3>
                    {showBack && (
                      <div className={styles.flashAnswer}>
                        {activeFlashCard.type === 'word' ? (
                          <>
                            <div className={styles.flashMeaning}>
                              <span>Deutsch</span>
                              <p>{activeFlashCard.de}</p>
                            </div>
                            {activeFlashCard.fa && (
                              <div className={`${styles.flashMeaning} ${styles.persianMeaning}`} dir="rtl">
                                <span>فارسی</span>
                                <p>{activeFlashCard.fa}</p>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className={styles.flashMeaning}>
                            <span>Antwort</span>
                            <p>{activeFlashCard.back}</p>
                          </div>
                        )}
                        {activeFlashCard.example && (
                          <div className={styles.flashExample}>
                            <div>
                              <span>Beispiel</span>
                              <p>{activeFlashCard.example}</p>
                            </div>
                            <button type="button" className={styles.listenExampleBtn} onClick={() => speak(activeFlashCard.example)}>
                              <span aria-hidden="true">◖))</span> Anhören
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                    {!showBack ? (
                      <button type="button" className={styles.primaryBtn} onClick={() => setShowBack(true)}>Antwort zeigen</button>
                    ) : flashView.practice ? (
                      <button type="button" onClick={() => {
                        setPracticeIndex(index => index + 1)
                        setShowBack(false)
                      }}>Nächste ansehen</button>
                    ) : (
                      <div className={styles.reviewActions}>
                        <button type="button" className={styles.missedBtn} onClick={() => reviewCard(activeFlashCard, false)}>Nicht gewusst</button>
                        <button type="button" className={styles.knewBtn} onClick={() => reviewCard(activeFlashCard, true)}>Gewusst</button>
                      </div>
                    )}
                  </article>
                ) : (
                  <p className={styles.empty}>{flashView.practice ? 'Noch keine Karten gespeichert.' : 'In dieser Box ist gerade nichts fällig.'}</p>
                )}
              </div>
            )}
          </section>
        </div>
      )}

      {selectedWord && (
        <div className={styles.modalBackdrop} role="presentation" onMouseDown={() => setSelectedWord(null)}>
          <section className={styles.wordModal} role="dialog" aria-modal="true" onMouseDown={event => event.stopPropagation()}>
            <div className={styles.wordModalHead}>
              <span>Wortkarte</span>
              <button type="button" className={styles.closeBtn} onClick={() => setSelectedWord(null)}>✕</button>
            </div>
            <h2>{selectedWord.term}</h2>
            <div className={styles.flashAnswer}>
              <div className={styles.flashMeaning}>
                <span>Deutsch</span>
                <p>{selectedWord.de}</p>
              </div>
              {selectedWord.fa && (
                <div className={`${styles.flashMeaning} ${styles.persianMeaning}`} dir="rtl">
                  <span>فارسی</span>
                  <p>{selectedWord.fa}</p>
                </div>
              )}
            </div>
            {selectedWord.example && (
              <div className={styles.flashExample}>
                <div>
                  <span>Beispiel</span>
                  <p>{selectedWord.example}</p>
                </div>
                <button type="button" className={styles.listenExampleBtn} onClick={() => speak(selectedWord.example)}>
                  <span aria-hidden="true">◖))</span> Anhören
                </button>
              </div>
            )}
            <div className={styles.actionRow}>
              <button type="button" className={styles.primaryBtn} disabled={selectedWordSaved} onClick={() => addWordCard(selectedWord)}>
                {selectedWordSaved ? '✓ Bereits gespeichert' : 'Als Flashcard speichern'}
              </button>
              {!selectedWord.example && (
                <button type="button" onClick={() => speak(selectedWord.term)}>Anhören</button>
              )}
            </div>
          </section>
        </div>
      )}

      {loading && <div className={styles.loading}>Lade Deutschlernen...</div>}
    </main>
  )
}
