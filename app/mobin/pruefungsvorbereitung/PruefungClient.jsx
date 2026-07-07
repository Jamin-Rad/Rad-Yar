'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import styles from '../mobin.module.css'

const STORAGE_KEY = 'mobin-pruefung-progress-v2'

const subjects = [
  { id: 'deutsch', title: 'Deutsch', meta: 'Klasse 5 Gymnasium', active: true },
  { id: 'englisch', title: 'Englisch', meta: 'kommt als Nächstes', active: false },
  { id: 'biologie', title: 'Biologie', meta: 'kommt als Nächstes', active: false },
  { id: 'geographie', title: 'Geographie', meta: 'kommt als Nächstes', active: false },
]

const topics = [
  {
    id: 'satzglieder',
    title: 'Satzglieder erkennen',
    meta: 'Umstellprobe, Frageprobe, Funktion im Satz',
    learn: [
      'Satzglieder sind Bausteine des Satzes. Sie können meist als ganzer Block verschoben werden.',
      'Suche zuerst das Prädikat. Danach fragst du nach Subjekt, Objekt und adverbialen Bestimmungen.',
      'Die wichtigsten Proben sind die Umstellprobe und die Frageprobe: Wer? Was tut? Wen oder was? Wann? Wo? Wie? Warum?',
    ],
    mcqs: [
      {
        question: 'In „Wegen des starken Regens blieben die Kinder heute drinnen” ist „Wegen des starken Regens” ...',
        options: ['eine Grundangabe', 'eine Zeitangabe', 'eine Ortsangabe', 'ein Akkusativobjekt'],
        answer: 'eine Grundangabe',
        help: 'Frage: Warum blieben die Kinder drinnen? → Wegen des starken Regens. Das ist eine kausale Bestimmung.',
      },
      {
        question: 'Welcher Ausdruck ist KEIN eigenständiges Satzglied?',
        options: ['”den” (einzelner Artikel)', '”im Park”', '”sehr schnell”', '”am Dienstag”'],
        answer: '”den” (einzelner Artikel)',
        help: 'Ein einzelner Artikel kann nicht als Block verschoben werden – er gehört immer zum nächsten Nomen.',
      },
      {
        question: 'In „Gestern haben die Kinder im Wald Pilze gesucht” gibt es wie viele Satzglieder?',
        options: ['5', '3', '4', '6'],
        answer: '5',
        help: 'Gestern (Zeit) | haben gesucht (Prädikat) | die Kinder (Subjekt) | im Wald (Ort) | Pilze (Akkusativobjekt) → 5 Satzglieder.',
      },
      {
        question: 'Was beweist die Umstellprobe im Satz „Am Abend kocht Oma Suppe”?',
        options: ['„Am Abend” kann als Block vorgezogen werden', '„Oma” ist das Prädikat', '„Suppe” ist das Subjekt', 'Der Satz ist grammatisch falsch'],
        answer: '„Am Abend” kann als Block vorgezogen werden',
        help: '„Am Abend kocht Oma Suppe” → „Oma kocht am Abend Suppe.” „Am Abend” bleibt als Block erhalten – das ist die Umstellprobe.',
      },
      {
        question: 'In „Der fleißige Mobin erklärt seiner Schwester geduldig die Aufgabe” sind „seiner Schwester” und „die Aufgabe” ...',
        options: ['Dativobjekt und Akkusativobjekt', 'zwei Akkusativobjekte', 'Subjekt und Prädikat', 'zwei Zeitangaben'],
        answer: 'Dativobjekt und Akkusativobjekt',
        help: 'Wem erklärt er? → seiner Schwester (Dativ). Wen oder was erklärt er? → die Aufgabe (Akkusativ).',
      },
      {
        question: 'In „Den ganzen Nachmittag hat Mobin im Zimmer ein schwieriges Buch gelesen” – welches Satzglied ist „den ganzen Nachmittag”?',
        options: ['Zeitangabe (temporal)', 'Akkusativobjekt', 'Subjekt', 'Ortsangabe (lokal)'],
        answer: 'Zeitangabe (temporal)',
        help: 'Obwohl „den ganzen Nachmittag” im Akkusativ steht, beantwortet es „Wann?” → Zeitangabe, kein Objekt.',
      },
      {
        question: 'Welche der vier Proben eignet sich am besten, um Satzglieder sicher zu erkennen?',
        options: ['Umstell- und Ersatzprobe', 'Rechtschreibprobe', 'Diktatprobe', 'Ausspracheprobe'],
        answer: 'Umstell- und Ersatzprobe',
        help: 'Mit der Umstellprobe prüft man, ob etwas als Block bewegbar ist. Mit der Ersatzprobe tauscht man das Satzglied durch ein Pronomen aus.',
      },
      {
        question: 'In „Der kluge Lehrer erklärt den Schülern jeden Tag geduldig die Grammatik” hat der Satz wie viele Satzglieder?',
        options: ['6', '4', '5', '7'],
        answer: '6',
        help: 'Der kluge Lehrer (Subj.) | erklärt (Präd.) | den Schülern (Dat.-Obj.) | jeden Tag (Zeitangabe) | geduldig (Art-u.-Weise) | die Grammatik (Akk.-Obj.) → 6 Satzglieder.',
      },
      {
        question: 'In „Trotz des schlechten Wetters gingen wir spazieren” ist „Trotz des schlechten Wetters” ...',
        options: ['eine konzessive (einschränkende) Bestimmung', 'ein Dativobjekt', 'das Subjekt', 'eine Zeitangabe'],
        answer: 'eine konzessive (einschränkende) Bestimmung',
        help: 'Frage: Obwohl was? → Trotz des schlechten Wetters. Das ist ein konzessiver Umstand, keine Objektergänzung.',
      },
      {
        question: 'Welcher Satz enthält ein Genitivattribut, das KEIN eigenes Satzglied ist?',
        options: [
          '„das Fahrrad meines Bruders” (Genitivattribut gehört zum Satzglied)',
          '„meinem Bruder” (Dativobjekt)',
          '„meinen Bruder” (Akkusativobjekt)',
          '„mein Bruder” (Subjekt)',
        ],
        answer: '„das Fahrrad meines Bruders” (Genitivattribut gehört zum Satzglied)',
        help: 'Attribute (Ergänzungen innerhalb eines Satzglieds) sind selbst kein eigenes Satzglied – sie gehören zum Nomen.',
      },
    ], // end mcqs
    flashcards: [
      { front: 'Satzglied', back: 'Ein Baustein des Satzes, der meist als Block verschoben werden kann.' },
      { front: 'Umstellprobe', back: 'Verschiebe Satzteile. Was zusammenbleibt, ist oft ein Satzglied.' },
      { front: 'Frageprobe', back: 'Frage nach der Funktion: Wer? Wen? Wann? Wo? Wie? Warum?' },
      { front: 'Start beim Bestimmen', back: 'Suche zuerst das Prädikat, dann Subjekt und Ergänzungen.' },
      { front: 'Zeitangabe im Akkusativ', back: '„Den ganzen Tag” = Zeitangabe, KEIN Akkusativobjekt – Frage: Wann?' },
      { front: 'Attribut', back: 'Ergänzung innerhalb eines Satzglieds (z.B. Genitivattribut) – kein eigenes Satzglied.' },
      { front: 'Ersatzprobe', back: 'Tausche das Satzglied durch ein Pronomen: „Der Hund” → er. Klappt es? → Satzglied.' },
    ],
  },
  {
    id: 'praedikat',
    title: 'Prädikat',
    meta: 'Verb, Personalform, zweiteiliges Prädikat',
    learn: [
      'Das Prädikat sagt, was jemand tut oder was geschieht. Es enthält immer eine Verbform.',
      'Ein Prädikat kann einteilig sein: „Mobin liest.” Es kann auch zweiteilig sein: „Mobin hat gelesen.”',
      'Bei zweiteiligen Prädikaten entsteht oft eine Satzklammer: Ein Teil steht vorne, der andere am Satzende.',
    ],
    mcqs: [
      {
        question: 'In „Die Schüler haben gestern fleißig gelernt” ist das Prädikat ...',
        options: ['haben gelernt', 'gelernt', 'haben fleißig gelernt', 'haben gestern gelernt'],
        answer: 'haben gelernt',
        help: 'Das Prädikat = Personalform + Partizip/Infinitiv. „fleißig” und „gestern” sind adverbiale Bestimmungen und gehören nicht zum Prädikat.',
      },
      {
        question: 'Welche Aussage zur Satzklammer ist richtig?',
        options: [
          'Die Personalform steht auf Position 2, der Rest am Satzende.',
          'Beide Verbteile stehen immer direkt nebeneinander.',
          'Im Fragesatz gibt es keine Satzklammer.',
          'Die Satzklammer gibt es nur im Nebensatz.',
        ],
        answer: 'Die Personalform steht auf Position 2, der Rest am Satzende.',
        help: 'Beispiel: „Mobin [hat] das Buch bis Mitternacht [gelesen].” – Satzklammer schließt den Rest des Satzes ein.',
      },
      {
        question: 'In „Wirst du morgen zur Schule kommen?” ist das Prädikat ...',
        options: ['Wirst kommen', 'kommen', 'Wirst', 'morgen kommen'],
        answer: 'Wirst kommen',
        help: 'Hilfsverb + Infinitiv bilden zusammen das Prädikat. „morgen” ist eine Zeitangabe.',
      },
      {
        question: 'In „Er soll das Buch bereits gelesen haben” ist das Prädikat ...',
        options: ['soll gelesen haben', 'gelesen haben', 'soll', 'bereits gelesen'],
        answer: 'soll gelesen haben',
        help: 'Alle Verbteile zusammen bilden das Prädikat: soll ... gelesen haben. „bereits” ist eine Zeitangabe.',
      },
      {
        question: 'Welcher Satz hat ein einteiliges Prädikat?',
        options: ['Die Vögel singen.', 'Mobin hat gegessen.', 'Sie wird kommen.', 'Er konnte schlafen.'],
        answer: 'Die Vögel singen.',
        help: 'Nur „singen” ist einteilig. Bei den anderen gibt es Hilfsverb + Infinitiv/Partizip → zweiteilig.',
      },
      {
        question: 'In „Das Buch wird von der Lehrerin vorgelesen” ist das Prädikat ...',
        options: ['wird vorgelesen', 'vorgelesen', 'wird', 'von der Lehrerin vorgelesen'],
        answer: 'wird vorgelesen',
        help: 'Das ist ein Passiv-Satz. Hilfsverb „wird” + Partizip II „vorgelesen” bilden gemeinsam das Prädikat.',
      },
      {
        question: 'In „Mobin hätte das Buch lesen sollen” ist das Prädikat ...',
        options: ['hätte lesen sollen', 'hätte', 'lesen sollen', 'hätte sollen'],
        answer: 'hätte lesen sollen',
        help: 'Alle drei Verbteile gehören zum Prädikat: Hilfsverb „hätte” + Infinitiv „lesen” + Modalverb „sollen”.',
      },
      {
        question: 'Bei einem trennbaren Verb wie „aufräumen” – wo stehen die beiden Teile im Aussagesatz?',
        options: [
          'Personalform auf Position 2, Vorsilbe am Satzende',
          'Beide Teile direkt nebeneinander',
          'Vorsilbe auf Position 1, Personalform am Ende',
          'Beide Teile stehen am Satzende',
        ],
        answer: 'Personalform auf Position 2, Vorsilbe am Satzende',
        help: '„Mobin räumt sein Zimmer auf.” – „räumt” auf Pos. 2, „auf” am Ende → Satzklammer.',
      },
      {
        question: 'In „Läuft Mobin heute zur Schule?” steht die Personalform des Prädikats ...',
        options: ['an erster Stelle', 'an zweiter Stelle', 'am Satzende', 'nach dem Subjekt'],
        answer: 'an erster Stelle',
        help: 'Im Entscheidungsfragesatz (Ja/Nein-Frage) steht die Personalform ganz vorne – das nennt man Verberststellung.',
      },
      {
        question: 'Welche Aussage zur Satzklammer im Nebensatz ist richtig?',
        options: [
          'Im Nebensatz steht die Personalform am Ende – es gibt keine Klammer.',
          'Im Nebensatz bleibt die Satzklammer gleich wie im Hauptsatz.',
          'Im Nebensatz steht die Personalform auf Position 2.',
          'Im Nebensatz steht die Personalform auf Position 1.',
        ],
        answer: 'Im Nebensatz steht die Personalform am Ende – es gibt keine Klammer.',
        help: '„weil Mobin das Buch gelesen hat” – im Nebensatz rücken alle Verbteile ans Ende: keine Klammer mehr.',
      },
    ],
    flashcards: [
      { front: 'Prädikat', back: 'Der Verbteil des Satzes: Was tut jemand? Was geschieht?' },
      { front: 'Personalform', back: 'Die gebeugte Verbform, z. B. ich lese, du liest, er liest.' },
      { front: 'Einteiliges Prädikat', back: '„Sara malt.” Prädikat: malt.' },
      { front: 'Zweiteiliges Prädikat', back: '„Sara hat gemalt.” Prädikat: hat gemalt.' },
      { front: 'Satzklammer', back: 'Bei zweiteiligem Prädikat steht ein Verbteil oft am Satzende.' },
      { front: 'Passiv-Prädikat', back: '„wird vorgelesen” – wird + Partizip II = Passiv-Prädikat.' },
      { front: 'Trennbares Verb', back: '„räumt … auf” – Vorsilbe am Ende der Klammer.' },
      { front: 'Nebensatz & Prädikat', back: 'Im Nebensatz steht die Personalform ganz am Ende.' },
    ],
  },
  {
    id: 'subjekt',
    title: 'Subjekt',
    meta: 'Wer oder was?',
    learn: [
      'Das Subjekt nennt, wer oder was etwas tut oder wer/was in einem Zustand ist.',
      'Du findest es mit der Frage „Wer oder was?” zusammen mit dem Prädikat.',
      'Das Subjekt steht im Nominativ und passt in Person und Zahl zum Prädikat.',
    ],
    mcqs: [
      {
        question: 'In „Mobin und seine Schwester spielen heute im Garten” ist das Subjekt ...',
        options: ['Mobin und seine Schwester', 'Mobin', 'spielen', 'heute im Garten'],
        answer: 'Mobin und seine Schwester',
        help: 'Wer spielt im Garten? → Mobin und seine Schwester. Beide zusammen bilden das Subjekt.',
      },
      {
        question: 'In „Dem Lehrer gefällt das Ergebnis” ist das Subjekt ...',
        options: ['das Ergebnis', 'Dem Lehrer', 'gefällt', 'Das Ergebnis und der Lehrer'],
        answer: 'das Ergebnis',
        help: 'Wer oder was gefällt? → das Ergebnis (Nominativ). „Dem Lehrer” steht im Dativ → Dativobjekt, nicht Subjekt.',
      },
      {
        question: 'Welche Aussage über das Subjekt ist falsch?',
        options: [
          'Das Subjekt steht immer am Satzanfang.',
          'Das Subjekt steht im Nominativ.',
          'Das Subjekt passt in Person und Zahl zum Prädikat.',
          'Das Subjekt antwortet auf „Wer oder was?”.',
        ],
        answer: 'Das Subjekt steht immer am Satzanfang.',
        help: 'Das Subjekt kann überall im Satz stehen. Beispiel: „Heute spielt Mobin.” – Subjekt Mobin steht nicht am Anfang.',
      },
      {
        question: 'In „Es regnet heute stark” ist „es” ...',
        options: ['das Subjekt (formales Subjekt)', 'ein Akkusativobjekt', 'eine Zeitangabe', 'das Prädikat'],
        answer: 'das Subjekt (formales Subjekt)',
        help: '„Es” übernimmt die Funktion des Subjekts, auch wenn es keinen konkreten Gegenstand nennt – man nennt das formales Subjekt.',
      },
      {
        question: 'In „Heute wird das Buch von der Lehrerin vorgelesen” ist das Subjekt ...',
        options: ['das Buch', 'die Lehrerin', 'Heute', 'vorgelesen'],
        answer: 'das Buch',
        help: 'Wer oder was wird vorgelesen? → das Buch (Nominativ). „von der Lehrerin” ist eine adverbiale Bestimmung (Agens im Passiv).',
      },
      {
        question: 'In „Zu schlafen ist manchmal das Klügste” ist das Subjekt ...',
        options: ['Zu schlafen (Infinitivgruppe)', 'das Klügste', 'manchmal', 'Es (unausgesprochen)'],
        answer: 'Zu schlafen (Infinitivgruppe)',
        help: 'Eine Infinitivgruppe kann das Subjekt sein. Wer oder was ist manchmal das Klügste? → Zu schlafen.',
      },
      {
        question: 'In „Man sagt, der Herbst sei die schönste Jahreszeit” ist das Subjekt im Hauptsatz ...',
        options: ['Man', 'der Herbst', 'die schönste Jahreszeit', 'der Herbst und die Jahreszeit'],
        answer: 'Man',
        help: '„Man” ist das Subjekt des Hauptsatzes. „der Herbst” ist Subjekt im eingebetteten Nebensatz.',
      },
      {
        question: 'In „Wer fleißig übt, wird erfolgreich sein” ist das Subjekt im Hauptsatz ...',
        options: ['der gesamte Nebensatz „Wer fleißig übt”', 'Wer', 'wird', 'erfolgreich'],
        answer: 'der gesamte Nebensatz „Wer fleißig übt”',
        help: 'Ein Relativsatz kann als Subjekt des Hauptsatzes dienen. Er übernimmt die Funktion eines Nominativs.',
      },
      {
        question: 'Im Satz „Die Lehrerin lobt den Schüler” – wie prüfst du, ob „Die Lehrerin” das Subjekt ist?',
        options: [
          'Umformung ins Plural: Die Lehrerinnen loben … – das Prädikat passt sich an.',
          'Ersetzen durch „ihn” → Subjekt bestätigt.',
          'Frage: Wen lobt die Lehrerin? → Subjekt.',
          'Subjekt steht immer an erster Stelle.',
        ],
        answer: 'Umformung ins Plural: Die Lehrerinnen loben … – das Prädikat passt sich an.',
        help: 'Subjekt und Prädikat stimmen in Person und Zahl überein (Kongruenz). Ändert sich das Prädikat beim Plural-Test, ist es das Subjekt.',
      },
      {
        question: 'In „Dem Schüler ist kalt” – welche Aussage ist richtig?',
        options: [
          'Das Subjekt fehlt; „es” ist das formale Subjekt (unausgesprochen).',
          '„Dem Schüler” ist das Subjekt.',
          '„kalt” ist das Subjekt.',
          'Der Satz hat kein Subjekt.',
        ],
        answer: 'Das Subjekt fehlt; „es” ist das formale Subjekt (unausgesprochen).',
        help: '„Dem Schüler” steht im Dativ – kein Nominativ, also kein Subjekt. Das formale Subjekt „es” fehlt hier, weil ein Dativobjekt am Anfang steht.',
      },
    ],
    flashcards: [
      { front: 'Subjekt-Frage', back: 'Wer oder was tut etwas?' },
      { front: 'Kasus', back: 'Das Subjekt steht im Nominativ.' },
      { front: 'Beispiel', back: '„Der Hund schläft.” Subjekt: Der Hund.' },
      { front: 'Nicht immer vorne', back: '„Heute spielt Mobin.” Subjekt: Mobin.' },
      { front: 'Kongruenz', back: 'Subjekt und Prädikat stimmen in Person und Zahl überein.' },
      { front: 'Formales Subjekt', back: '„Es regnet.” – „es” ist ein formales Subjekt ohne konkreten Inhalt.' },
      { front: 'Infinitiv als Subjekt', back: '„Zu laufen ist gesund.” – Infinitivgruppe als Subjekt.' },
    ],
  },
  {
    id: 'akkusativ',
    title: 'Akkusativ',
    meta: 'Wen oder was?',
    learn: [
      'Das Akkusativobjekt ergänzt viele Verben. Du fragst danach mit „Wen oder was?”',
      'Typische Verben mit Akkusativ sind sehen, lesen, kaufen, malen, essen, suchen.',
      'Achte auf die Artikel: der wird im Akkusativ oft zu den, ein zu einen.',
    ],
    mcqs: [
      {
        question: 'In „Der Vater zeigt dem Kind das neue Fahrrad” ist das Akkusativobjekt ...',
        options: ['das neue Fahrrad', 'dem Kind', 'Der Vater', 'zeigt'],
        answer: 'das neue Fahrrad',
        help: 'Wen oder was zeigt der Vater? → das neue Fahrrad. „dem Kind” ist Dativobjekt (Wem?).',
      },
      {
        question: 'Welche Artikelform zeigt an, dass ein maskulines Nomen im Akkusativ steht?',
        options: ['den / einen', 'dem / einem', 'der / einer', 'des / eines'],
        answer: 'den / einen',
        help: 'Maskulin im Akkusativ: der → den, ein → einen. Bei Feminin und Neutrum ändert sich der Artikel nicht.',
      },
      {
        question: 'In „Mobin liest seiner Mutter einen langen Brief vor” gibt es ...',
        options: ['ein Dativobjekt und ein Akkusativobjekt', 'zwei Akkusativobjekte', 'nur ein Akkusativobjekt', 'kein Objekt'],
        answer: 'ein Dativobjekt und ein Akkusativobjekt',
        help: 'Wem liest er vor? → seiner Mutter (Dativ). Wen oder was liest er vor? → einen langen Brief (Akkusativ).',
      },
      {
        question: 'Welches Verb verlangt typischerweise KEIN Akkusativobjekt?',
        options: ['schlafen', 'lesen', 'kaufen', 'sehen'],
        answer: 'schlafen',
        help: 'Intransitive Verben wie „schlafen” oder „laufen” haben kein Akkusativobjekt. Transitive Verben (lesen, kaufen, sehen) haben eines.',
      },
      {
        question: 'In „Das Mädchen vermisst ihre Freundin sehr” ist „sehr” ...',
        options: ['eine Art-und-Weise-Angabe', 'das Akkusativobjekt', 'das Subjekt', 'ein Dativobjekt'],
        answer: 'eine Art-und-Weise-Angabe',
        help: '„sehr” beantwortet Wie? → Art-und-Weise. Akkusativobjekt: ihre Freundin (Wen vermisst sie?).',
      },
      {
        question: 'In „Er wartet einen ganzen Tag auf die Antwort” ist „einen ganzen Tag” ...',
        options: ['eine Zeitangabe (temporal)', 'das Akkusativobjekt', 'das Subjekt', 'ein Dativobjekt'],
        answer: 'eine Zeitangabe (temporal)',
        help: 'Obwohl die Form Akkusativ ist, beantwortet „einen ganzen Tag” die Frage Wie lange? → Zeitangabe, kein Objekt.',
      },
      {
        question: 'In „Ich freue mich auf die Ferien” ist „mich” ...',
        options: ['ein reflexives Akkusativobjekt', 'das Subjekt', 'ein Dativobjekt', 'eine Ortsangabe'],
        answer: 'ein reflexives Akkusativobjekt',
        help: '„mich” ist das Reflexivpronomen im Akkusativ. Bei „sich freuen” gehört es fest zum Verb – es ist ein reflexives Akkusativobjekt.',
      },
      {
        question: 'In „Das Mädchen verspricht ihrer Freundin, das Geheimnis zu bewahren” ist das Akkusativobjekt ...',
        options: ['„das Geheimnis zu bewahren” (Infinitivgruppe)', '„ihrer Freundin”', '„Das Mädchen”', 'Das Satzgefüge hat kein Akkusativobjekt'],
        answer: '„das Geheimnis zu bewahren” (Infinitivgruppe)',
        help: 'Wen oder was verspricht sie? → das Geheimnis zu bewahren. Eine Infinitivgruppe kann ein Akkusativobjekt sein.',
      },
      {
        question: 'In „Der Hund beißt den Mann” wird „den Mann” im Passiv zu ...',
        options: ['dem Mann (Subjekt im Passiv: der Mann)', 'den Mann (bleibt Akkusativobjekt)', 'dem Mann (Dativobjekt)', 'kein Objekt mehr'],
        answer: 'dem Mann (Subjekt im Passiv: der Mann)',
        help: 'Im Passiv wird das Akkusativobjekt zum Subjekt: „Der Mann wird vom Hund gebissen.” Akkusativ → Nominativ.',
      },
      {
        question: 'Welcher Satz enthält ein Akkusativobjekt im Genitiv-Ersatz (Genitivobjekt)?',
        options: [
          'Sie erinnert sich des Vorfalls.',
          'Sie sieht den Vorfall.',
          'Sie hilft dem Vater.',
          'Sie schläft tief.',
        ],
        answer: 'Sie erinnert sich des Vorfalls.',
        help: '„sich erinnern + Genitiv” – „des Vorfalls” ist ein Genitivobjekt. Selten, aber prüfungsrelevant: nicht alle Objekte stehen im Akkusativ.',
      },
    ],
    flashcards: [
      { front: 'Akkusativ-Frage', back: 'Wen oder was?' },
      { front: 'Beispiel', back: '„Ich lese ein Buch.” Akkusativobjekt: ein Buch.' },
      { front: 'Artikelwechsel', back: 'der Hund → den Hund, ein Hund → einen Hund.' },
      { front: 'Typische Verben', back: 'sehen, kaufen, essen, suchen, lesen, malen.' },
      { front: 'Abgrenzung Dativ', back: 'Akkusativ: Wen oder was? | Dativ: Wem?' },
      { front: 'Akkusativ als Zeitangabe', back: '„einen ganzen Tag” = Zeitangabe (Wann/Wie lange?), kein Objekt.' },
      { front: 'Passiv-Umformung', back: 'Akkusativobjekt → Subjekt im Passiv: „den Mann” → „der Mann wird …”' },
    ],
  },
  {
    id: 'adverbiale',
    title: 'Adverbiale Bestimmungen',
    meta: 'Zeit, Ort, Art und Weise, Grund',
    learn: [
      'Adverbiale Bestimmungen geben genauere Umstände an: Zeit, Ort, Art und Weise oder Grund.',
      'Typische Fragen sind: Wann? Wo? Wohin? Wie? Warum? Weshalb?',
      'Sie sind oft verschiebbar: „Am Morgen fährt Ali zur Schule” und „Ali fährt am Morgen zur Schule”.',
    ],
    mcqs: [
      {
        question: 'In „Wegen der Krankheit konnte Mobin nicht am Unterricht teilnehmen” ist „Wegen der Krankheit” ...',
        options: ['Grundangabe (kausal)', 'Zeitangabe (temporal)', 'Ortsangabe (lokal)', 'Art-und-Weise-Angabe (modal)'],
        answer: 'Grundangabe (kausal)',
        help: 'Frage: Warum konnte er nicht teilnehmen? → Wegen der Krankheit. Kausal = Grund.',
      },
      {
        question: 'Welcher Ausdruck ist eine modale Bestimmung (Art und Weise)?',
        options: ['mit großer Sorgfalt', 'am Dienstag', 'im Klassenzimmer', 'wegen des Wetters'],
        answer: 'mit großer Sorgfalt',
        help: 'Frage: Wie? → mit großer Sorgfalt. Temporal: Wann? | Lokal: Wo? | Kausal: Warum?',
      },
      {
        question: 'In „Ali läuft jeden Morgen sehr schnell zur Schule” sind „jeden Morgen” und „sehr schnell” ...',
        options: ['eine Zeitangabe und eine Art-und-Weise-Angabe', 'zwei Ortsangaben', 'zwei Zeitangaben', 'ein Akkusativobjekt und ein Subjekt'],
        answer: 'eine Zeitangabe und eine Art-und-Weise-Angabe',
        help: 'Jeden Morgen → Wann? (Zeitangabe). Sehr schnell → Wie? (Art-und-Weise-Angabe).',
      },
      {
        question: 'Welcher Satz enthält eine lokale Bestimmung?',
        options: ['Sie schläft im Zelt.', 'Er schläft tief.', 'Wir essen jetzt.', 'Sie lacht laut.'],
        answer: 'Sie schläft im Zelt.',
        help: '„im Zelt” beantwortet: Wo schläft sie? → Das ist eine lokale (Orts-) Bestimmung.',
      },
      {
        question: 'Adverbiale Bestimmungen können ...',
        options: [
          'als Block im Satz verschoben werden',
          'nie an den Satzanfang gestellt werden',
          'nie weggelassen werden',
          'immer nur ein einziges Wort sein',
        ],
        answer: 'als Block im Satz verschoben werden',
        help: '„Im Garten spielen die Kinder.” → „Die Kinder spielen im Garten.” Die Ortsangabe lässt sich als Block verschieben.',
      },
      {
        question: 'In „Er lief so schnell, dass er den Bus noch erreichte” – welche Art von Bestimmung ist „so schnell, dass …”?',
        options: ['konsekutiv (Folge)', 'kausal (Grund)', 'konzessiv (Einschränkung)', 'final (Absicht)'],
        answer: 'konsekutiv (Folge)',
        help: 'Frage: Mit welcher Folge? → so schnell, dass er den Bus erreichte. Das nennt man konsekutive Bestimmung (Folgeangabe).',
      },
      {
        question: 'In „Er trainiert täglich, um den Marathon zu schaffen” ist „um den Marathon zu schaffen” ...',
        options: ['finalangabe (Absicht, Zweck)', 'Kausalangabe (Grund)', 'Modalangabe (Art und Weise)', 'Temporalangabe (Zeit)'],
        answer: 'finalangabe (Absicht, Zweck)',
        help: 'Frage: Wozu / Mit welchem Ziel? → um den Marathon zu schaffen. Finalangabe = Angabe des Zwecks.',
      },
      {
        question: 'In „Falls es morgen regnet, bleibt die Klasse drinnen” ist „Falls es morgen regnet” ...',
        options: ['Konditionalangabe (Bedingung)', 'Temporalangabe (Zeit)', 'Kausalangabe (Grund)', 'Konzessivangabe (Einschränkung)'],
        answer: 'Konditionalangabe (Bedingung)',
        help: 'Frage: Unter welcher Bedingung? → Falls es regnet. Konditional = Bedingungsangabe.',
      },
      {
        question: 'In „Obwohl sie müde war, lernte sie weiter” ist „Obwohl sie müde war” ...',
        options: ['konzessiv (trotz Hindernis)', 'kausal (Grund)', 'final (Zweck)', 'konditional (Bedingung)'],
        answer: 'konzessiv (trotz Hindernis)',
        help: 'Frage: Obwohl was? / Trotz was? → Obwohl sie müde war. Konzessiv = gibt an, dass etwas trotz Widerstand geschieht.',
      },
      {
        question: 'Wie unterscheidest du eine Ortsangabe (lokal) von einer Richtungsangabe?',
        options: [
          'Ortsangabe: Wo? (Wo + Ruhe) | Richtungsangabe: Wohin? / Woher?',
          'Ortsangabe: Wann? | Richtungsangabe: Wo?',
          'Ortsangabe: Wie? | Richtungsangabe: Warum?',
          'Beide beantworten „Wo?” – kein Unterschied',
        ],
        answer: 'Ortsangabe: Wo? (Wo + Ruhe) | Richtungsangabe: Wohin? / Woher?',
        help: '„Er sitzt im Park” (Wo? = Ort, Ruhelage) vs. „Er läuft in den Park” (Wohin? = Richtung). Beide sind lokale Bestimmungen, aber mit unterschiedlichen Fragen.',
      },
    ],
    flashcards: [
      { front: 'Temporal', back: 'Zeit: Wann? Seit wann? Wie lange?' },
      { front: 'Lokal', back: 'Ort: Wo? Wohin? Woher?' },
      { front: 'Modal', back: 'Art und Weise: Wie?' },
      { front: 'Kausal', back: 'Grund: Warum? Weshalb?' },
      { front: 'Final', back: 'Zweck/Absicht: Wozu? Um was zu erreichen?' },
      { front: 'Konditional', back: 'Bedingung: Unter welcher Bedingung? Falls / Wenn …' },
      { front: 'Konzessiv', back: 'Einschränkung: Obwohl / Trotz – etwas geschieht gegen ein Hindernis.' },
      { front: 'Konsekutiv', back: 'Folge: Mit welcher Folge? So … dass …' },
    ],
  },
  {
    id: 'satzreihe-satzgefuege',
    title: 'Satzreihe & Satzgefüge',
    meta: 'Hauptsatz, Nebensatz, Komma, Verbstellung',
    learn: [
      'Eine Satzreihe besteht aus Hauptsatz + Hauptsatz. Die Hauptsätze werden oft durch Komma oder nebenordnende Konjunktionen verbunden: und, oder, aber, sondern, denn, doch.',
      'Ein Satzgefüge besteht aus Hauptsatz + Nebensatz. Hauptsatz und Nebensatz werden immer durch Komma getrennt.',
      'Nebensätze werden oft durch unterordnende Konjunktionen eingeleitet: weil, da, obwohl, damit, dass, sodass, nachdem, während.',
      'Im Nebensatz steht die Personalform des Verbs am Ende: „weil die Sonne scheint”. Deshalb nennt man ihn Verbletztsatz.',
      'Satzbaupläne kannst du so zeichnen: HS + NS, NS + HS oder HS Teil 1 + NS + HS Teil 2.',
      'Satzarten helfen beim Satzbau: Aussagesatz mit Punkt, Fragesatz mit Fragezeichen, Aufforderungssatz meist mit Ausrufezeichen.',
    ],
    mcqs: [
      {
        question: 'Welcher Satz ist ein Satzgefüge?',
        options: [
          'Sie kam zu spät, weil der Bus ausfiel.',
          'Er schläft und sie liest.',
          'Mobin läuft schnell, aber Sara geht langsam.',
          'Es regnete, doch wir gingen trotzdem raus.',
        ],
        answer: 'Sie kam zu spät, weil der Bus ausfiel.',
        help: '„weil” ist eine unterordnende Konjunktion → Nebensatz → Satzgefüge. Die anderen verbinden zwei Hauptsätze (Satzreihe).',
      },
      {
        question: 'Welche Konjunktion leitet IMMER einen Nebensatz ein?',
        options: ['obwohl', 'aber', 'oder', 'und'],
        answer: 'obwohl',
        help: '„obwohl” ist unterordnend → Nebensatz. „aber”, „oder”, „und” sind nebenordnend → Satzreihe.',
      },
      {
        question: 'In „Mobin lernte fleißig, damit er die Prüfung besteht” steht das Verb im Nebensatz ...',
        options: ['am Satzende: besteht', 'an erster Stelle: damit', 'an zweiter Stelle: lernte', 'an erster Stelle: besteht'],
        answer: 'am Satzende: besteht',
        help: 'Im Nebensatz steht die Personalform ganz am Ende: „damit er die Prüfung besteht.”',
      },
      {
        question: 'Was ist die Regel für das Komma zwischen Haupt- und Nebensatz?',
        options: [
          'Haupt- und Nebensatz werden immer durch ein Komma getrennt.',
          'Ein Komma steht nur bei „weil” und „da”.',
          'Kein Komma, wenn der Nebensatz am Satzende steht.',
          'Komma nur, wenn der Nebensatz vorne steht.',
        ],
        answer: 'Haupt- und Nebensatz werden immer durch ein Komma getrennt.',
        help: 'Ob der Nebensatz vorne oder hinten steht – das Komma steht immer zwischen Haupt- und Nebensatz.',
      },
      {
        question: 'Wie lautet der Satzbauplan von „Obwohl es regnete, fuhren wir in den Park”?',
        options: ['NS + HS', 'HS + NS', 'HS + HS', 'HS + NS + HS'],
        answer: 'NS + HS',
        help: '„Obwohl es regnete” ist der Nebensatz (steht vorne), „fuhren wir in den Park” ist der Hauptsatz.',
      },
      {
        question: 'In „Er sagte, dass er krank sei" ist „dass er krank sei" ...',
        options: ['ein Objektsatz (dass-Satz als Akkusativobjekt)', 'ein Relativsatz', 'ein Hauptsatz', 'ein Adverbialsatz'],
        answer: 'ein Objektsatz (dass-Satz als Akkusativobjekt)',
        help: 'Was sagte er? → dass er krank sei. Der dass-Satz übernimmt die Funktion eines Akkusativobjekts – man nennt ihn Objektsatz.',
      },
      {
        question: 'In „Das Buch, das Mobin liest, ist sehr spannend" ist „das Mobin liest" ...',
        options: ['ein Relativsatz (Attributsatz)', 'ein Objektsatz', 'ein Hauptsatz', 'ein Adverbialsatz'],
        answer: 'ein Relativsatz (Attributsatz)',
        help: 'Der Relativsatz „das Mobin liest" beschreibt das Nomen „Buch" genauer. Er wird durch ein Relativpronomen eingeleitet.',
      },
      {
        question: 'In „Er lernte, weil die Prüfung schwer war, bis Mitternacht" steht der Nebensatz ...',
        options: ['eingeschoben im Hauptsatz (HS + NS + HS-Rest)', 'am Ende: HS + NS', 'am Anfang: NS + HS', 'Es gibt keinen Nebensatz'],
        answer: 'eingeschoben im Hauptsatz (HS + NS + HS-Rest)',
        help: 'Der NS ist in die Satzklammer eingeschoben: „Er lernte [weil die Prüfung schwer war] bis Mitternacht." Satzbauplan: HS1 + NS + HS2.',
      },
      {
        question: 'Welcher Satz ist eine Satzreihe mit der Konjunktion „denn"?',
        options: [
          '„Er blieb zu Hause, denn er war krank."',
          '„Er blieb zu Hause, weil er krank war."',
          '„Obwohl er krank war, blieb er zu Hause."',
          '„Er blieb zu Hause, sodass er gesund wurde."',
        ],
        answer: '„Er blieb zu Hause, denn er war krank."',
        help: '„denn" ist nebenordnend → Satzreihe (HS + HS). Nach „denn" steht das Verb an zweiter Stelle – kein Nebensatz!',
      },
      {
        question: 'Was ist der Unterschied zwischen „weil" und „denn" als Begründung?',
        options: [
          '„weil" → Nebensatz (Verbletztstellung); „denn" → Hauptsatz (Verb auf Pos. 2)',
          '„weil" → Hauptsatz; „denn" → Nebensatz',
          'Beide leiten einen Nebensatz ein',
          'Beide leiten einen Hauptsatz ein',
        ],
        answer: '„weil" → Nebensatz (Verbletztstellung); „denn" → Hauptsatz (Verb auf Pos. 2)',
        help: '„Er kam nicht, weil er krank war." (Verb am Ende) vs. „Er kam nicht, denn er war krank." (Verb auf Pos. 2). Typischer Prüfungsfehler!',
      },
    ],
    flashcards: [
      { front: 'Satzreihe', back: 'Hauptsatz + Hauptsatz, oft mit und / oder / aber / denn / doch.' },
      { front: 'Satzgefüge', back: 'Hauptsatz + Nebensatz. Zwischen beiden steht immer ein Komma.' },
      { front: 'Nebensatz-Merkmal', back: 'Er kann nicht allein stehen und ist dem Hauptsatz untergeordnet.' },
      { front: 'Unterordnende Konjunktionen', back: 'weil, da, obwohl, damit, dass, sodass, nachdem, während.' },
      { front: 'Verbletztsatz', back: 'Im Nebensatz steht die Personalform des Verbs am Ende.' },
      { front: 'weil vs. denn', back: '„weil" → Nebensatz (Verb am Ende) | „denn" → Hauptsatz (Verb auf Pos. 2).' },
      { front: 'Objektsatz', back: '„Er sagt, dass …" – der dass-Satz ist das Akkusativobjekt des Hauptsatzes.' },
      { front: 'Relativsatz', back: 'Beschreibt ein Nomen genauer: „Das Buch, das ich lese, …"' },
    ],
  },
]

async function fetchProgress() {
  try {
    const res = await fetch('/api/mobin/progress')
    if (!res.ok) return {}
    return await res.json()
  } catch {
    return {}
  }
}

function saveProgress(nextProgress) {
  fetch('/api/mobin/progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nextProgress),
  }).catch(() => {})
  window.dispatchEvent(new Event('mobin-pruefung-progress'))
}

function calculateTopicProgress(topic, saved) {
  const mcqPercent = saved.mcqTotal ? saved.mcqCorrect / saved.mcqTotal : 0
  const flashPercent = saved.flashTotal ? saved.flashSeen / saved.flashTotal : 0
  const learnPercent = saved.learnDone ? 1 : 0
  return Math.round(((learnPercent + mcqPercent + flashPercent) / 3) * 100)
}

// ── Leitner helpers ─────────────────────────────────────────
const LEITNER_DAYS = [1, 3, 7, 14, 30]

function cardId(topicId, i) { return `${topicId}:${i}` }

function leitnerIsDue(entry) {
  if (!entry?.nextReview) return true
  return new Date(entry.nextReview) <= new Date()
}

function advanceLeitnerBox(entry, knew) {
  const box = entry?.box ?? 0
  const next = knew ? Math.min(box + 1, 5) : 1
  const d = new Date()
  d.setDate(d.getDate() + LEITNER_DAYS[next - 1])
  return { box: next, nextReview: d.toISOString().slice(0, 10) }
}

function formatStudyTime(seconds) {
  if (!seconds || seconds < 60) return null
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  if (h > 0) return `${h} Std ${m} Min`
  return `${m} Min`
}

function buildDueCards(leitner) {
  const arr = []
  for (const topic of topics) {
    for (let i = 0; i < topic.flashcards.length; i++) {
      if (leitnerIsDue(leitner[cardId(topic.id, i)])) {
        arr.push({ topicId: topic.id, topicTitle: topic.title, cardIndex: i, card: topic.flashcards[i] })
      }
    }
  }
  return arr.sort(() => Math.random() - 0.5)
}
// ─────────────────────────────────────────────────────────────

export { STORAGE_KEY, topics, calculateTopicProgress }

export default function PruefungClient() {
  const [progress, setProgress] = useState({})
  const [subject, setSubject] = useState('deutsch')
  const [topicId, setTopicId] = useState(null)
  const [mode, setMode] = useState(null)
  const [reviewAll, setReviewAll] = useState(false)

  const leitner = progress.leitner || {}
  const progressRef = useRef(progress)
  useEffect(() => { progressRef.current = progress }, [progress])

  const dueCards = useMemo(() => buildDueCards(leitner), [leitner])
  const dueCount = dueCards.length

  useEffect(() => {
    fetchProgress().then(setProgress)
  }, [])

  // Track time spent in any study mode
  useEffect(() => {
    if (!mode) return
    const start = Date.now()
    return () => {
      const elapsed = Math.floor((Date.now() - start) / 1000)
      if (elapsed < 10) return
      const prev = progressRef.current
      const next = { ...prev, totalSeconds: (prev.totalSeconds || 0) + elapsed }
      setProgress(next)
      saveProgress(next)
    }
  }, [mode])

  const selectedTopic = useMemo(() => topics.find((topic) => topic.id === topicId) || null, [topicId])
  const selectedSubject = subjects.find((item) => item.id === subject)
  const overall = useMemo(() => {
    const sum = topics.reduce((total, topic) => total + calculateTopicProgress(topic, progress[topic.id] || {}), 0)
    return Math.round(sum / topics.length)
  }, [progress])

  function saveTopicProgress(id, patch) {
    const next = {
      ...progress,
      [id]: { ...(progress[id] || {}), ...patch, updatedAt: new Date().toISOString() },
    }
    setProgress(next)
    saveProgress(next)
  }

  function saveLeitner(nextLeitner) {
    const next = { ...progress, leitner: nextLeitner }
    setProgress(next)
    saveProgress(next)
  }

  return (
    <main className={styles.shell}>
      <div className={styles.wrap}>
        <header className={styles.topbar}>
          <Link className={styles.brand} href="/mobin">
            <span className={styles.mark}>M</span>
            <span className={styles.brandText}>
              <span className={styles.brandName}>Mobin</span>
              <span className={styles.brandSub}>Prüfung</span>
            </span>
          </Link>
          <nav className={styles.nav} aria-label="Mobin Navigation">
            <Link className={styles.glassButton} href="/mobin" style={{ '--tilt': '1.1deg', '--speed': '8s' }}>
              <span className={styles.buttonTitle}>Start</span>
              <span className={styles.buttonMeta}>Fortschritt ansehen</span>
            </Link>
          </nav>
        </header>

        <section className={styles.main}>
          <div className={styles.examHero}>
            <div>
              <span className={styles.eyebrow}>Klasse 5 Gymnasium</span>
              <h1 className={styles.sectionTitle}>Prüfungsvorbereitung</h1>
              <p className={styles.sectionText}>
                Wähle ein Thema, dann Lernbereich, MCQs oder Flashcards.
              </p>
            </div>
            <div className={styles.examScoreStack}>
              {dueCount > 0 ? (
                <button
                  className={styles.examScoreBtn}
                  type="button"
                  onClick={() => { setReviewAll(true); setTopicId(null); setMode(null) }}
                >
                  <strong>{dueCount}</strong>
                  <span>Karten fällig</span>
                </button>
              ) : (
                <div className={styles.examScore}>
                  <strong>{overall}%</strong>
                  <span>Deutsch Fortschritt</span>
                </div>
              )}
              {formatStudyTime(progress.totalSeconds) && (
                <div className={styles.studyTimeStat}>
                  <strong>{formatStudyTime(progress.totalSeconds)}</strong>
                  <span>gelernt</span>
                </div>
              )}
            </div>
          </div>

          {/* ── Fach-Auswahl inline über den Themen ── */}
          <div className={styles.subjectRow}>
            {subjects.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`${styles.subjectPill} ${subject === item.id ? styles.subjectPillActive : ''} ${!item.active ? styles.subjectPillDisabled : ''}`}
                disabled={!item.active}
                onClick={() => {
                  if (!item.active) return
                  setSubject(item.id)
                  setTopicId(null)
                  setMode(null)
                  setReviewAll(false)
                }}
              >
                {item.title}
                {!item.active && <span> (bald)</span>}
              </button>
            ))}
          </div>

          {subject === 'deutsch' ? (
            <>
              <section className={styles.topicGrid} aria-label="Deutsch Themen">
                {topics.map((topic) => {
                  const saved = progress[topic.id] || {}
                  const percent = calculateTopicProgress(topic, saved)
                  const topicDue = topic.flashcards.filter((_, i) => leitnerIsDue(leitner[cardId(topic.id, i)])).length
                  return (
                    <button
                      className={`${styles.topicCard} ${topic.id === topicId && !reviewAll ? styles.topicCardActive : ''}`}
                      key={topic.id}
                      type="button"
                      onClick={() => { setTopicId(topic.id); setMode(null); setReviewAll(false) }}
                    >
                      <span>{topic.title}</span>
                      <small>{topic.meta}</small>
                      <i className={styles.progressTrack} aria-hidden="true">
                        <b style={{ width: `${percent}%` }} />
                      </i>
                      <em>{topicDue > 0 ? `${topicDue} fällig · ` : ''}{percent}% geschafft</em>
                    </button>
                  )
                })}
              </section>

              {selectedTopic ? (
                <section className={styles.practicePanel}>
                  <div className={styles.practiceHeader}>
                    <div>
                      <h2>{selectedTopic.title}</h2>
                      <p>{selectedTopic.meta}</p>
                    </div>
                    <span>{calculateTopicProgress(selectedTopic, progress[selectedTopic.id] || {})}%</span>
                  </div>

                  <div className={styles.modeGrid} aria-label="Übungsart wählen">
                    {[
                      { id: 'learn', title: 'Lernbereich', meta: 'kurz und klar' },
                      { id: 'mcq', title: 'MCQs', meta: `${selectedTopic.mcqs.length} Fragen` },
                      { id: 'flashcards', title: 'Flashcards', meta: `${selectedTopic.flashcards.length} Karten` },
                    ].map((item) => (
                      <button
                        className={`${styles.modeButton} ${mode === item.id ? styles.modeButtonActive : ''}`}
                        key={item.id}
                        type="button"
                        onClick={() => setMode(item.id)}
                      >
                        <strong>{item.title}</strong>
                        <span>{item.meta}</span>
                      </button>
                    ))}
                  </div>

                  {mode === 'learn' ? (
                    <LearnMode
                      progress={progress[selectedTopic.id] || {}}
                      topic={selectedTopic}
                      onDone={() => saveTopicProgress(selectedTopic.id, { learnDone: true })}
                    />
                  ) : null}
                  {mode === 'mcq' ? (
                    <McqMode
                      topic={selectedTopic}
                      onComplete={(correct, total) => saveTopicProgress(selectedTopic.id, { mcqCorrect: correct, mcqTotal: total })}
                    />
                  ) : null}
                  {mode === 'flashcards' ? (
                    <FlashcardMode
                      topic={selectedTopic}
                      leitner={leitner}
                      onProgress={(seen, total) => saveTopicProgress(selectedTopic.id, { flashSeen: seen, flashTotal: total })}
                      onLeitnerUpdate={saveLeitner}
                    />
                  ) : null}
                </section>
              ) : reviewAll ? (
                <section className={styles.practicePanel}>
                  <div className={styles.practiceHeader}>
                    <div>
                      <h2>Alle fälligen Karten</h2>
                      <p>{dueCount} Karten aus allen Themen — nach dem Leitner-System.</p>
                    </div>
                    <button className={styles.ghostAction} type="button" onClick={() => setReviewAll(false)}>Abbrechen</button>
                  </div>
                  <AllFlashcardsMode
                    cards={dueCards}
                    leitner={leitner}
                    onLeitnerUpdate={saveLeitner}
                  />
                </section>
              ) : (
                <section className={styles.practicePanel}>
                  <div className={styles.practiceHeader}>
                    <div>
                      <h2>Thema wählen</h2>
                      <p>Oben ein Thema auswählen, dann Lernbereich, MCQs oder Flashcards öffnen.</p>
                    </div>
                  </div>
                </section>
              )}
            </>
          ) : null}
        </section>

        <footer className={styles.footer}>
          Zurück zu <Link href="/mobin">Mobin</Link>
        </footer>
      </div>
    </main>
  )
}

function LearnMode({ topic, progress, onDone }) {
  return (
    <div className={styles.studyCard}>
      <div className={styles.learningList}>
        {topic.learn.map((item, index) => (
          <article key={item}>
            <span>{index + 1}</span>
            <p>{item}</p>
          </article>
        ))}
      </div>
      <button className={styles.primaryAction} type="button" onClick={onDone}>
        {progress.learnDone ? 'Lernbereich wiederholt' : 'Lernbereich gelernt'}
      </button>
    </div>
  )
}

function McqMode({ topic, onComplete }) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [correct, setCorrect] = useState(0)
  const [finished, setFinished] = useState(false)
  const current = topic.mcqs[index]
  const wasCorrect = selected === current.answer
  const visibleCorrect = correct + (wasCorrect ? 1 : 0)

  function choose(option) {
    if (selected) return

    setSelected(option)
  }

  function next() {
    const nextCorrect = selected === current.answer ? correct + 1 : correct
    if (index + 1 >= topic.mcqs.length) {
      setFinished(true)
      onComplete(nextCorrect, topic.mcqs.length)
      return
    }

    setCorrect(nextCorrect)
    setIndex((value) => value + 1)
    setSelected(null)
  }

  if (finished) {
    return (
      <div className={styles.studyCard}>
        <div className={styles.mcqResult}>
          <strong>{correct} von {topic.mcqs.length}</strong>
          <span>MCQs geschafft. Dein Ergebnis wurde gespeichert.</span>
        </div>
        <button
          className={styles.primaryAction}
          type="button"
          onClick={() => {
            setIndex(0)
            setSelected(null)
            setCorrect(0)
            setFinished(false)
          }}
        >
          Noch einmal üben
        </button>
      </div>
    )
  }

  return (
    <div className={styles.studyCard}>
      <div className={styles.mcqTop}>
        <span>Frage {index + 1} von {topic.mcqs.length}</span>
        <strong>{visibleCorrect} richtig</strong>
      </div>
      <h3 className={styles.mcqQuestion}>{current.question}</h3>
      <div className={styles.answerGrid}>
        {current.options.map((option) => {
          const isAnswer = selected && option === current.answer
          const isWrong = selected === option && option !== current.answer
          return (
            <button
              className={`${styles.answerButton} ${isAnswer ? styles.answerCorrect : ''} ${isWrong ? styles.answerWrong : ''}`}
              key={option}
              type="button"
              onClick={() => choose(option)}
            >
              {option}
            </button>
          )
        })}
      </div>
      {selected ? (
        <div className={styles.feedbackBox}>
          <strong>{wasCorrect ? 'Richtig.' : 'Noch einmal merken.'}</strong>
          <span>{current.help}</span>
          <button className={styles.primaryAction} type="button" onClick={next}>
            {index + 1 >= topic.mcqs.length ? 'Ergebnis speichern' : 'Nächste Frage'}
          </button>
        </div>
      ) : null}
    </div>
  )
}

function FlashcardMode({ topic, leitner, onProgress, onLeitnerUpdate }) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [exitDir, setExitDir] = useState(null)
  const [results, setResults] = useState({})
  const [done, setDone] = useState(false)
  const cards = topic.flashcards
  const current = cards[index]

  const knownCount = Object.values(results).filter((r) => r === 'known').length

  useEffect(() => {
    function onKey(e) {
      if (done) return
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault()
        if (!exiting) setFlipped((v) => !v)
      }
      if (flipped && !exiting) {
        if (e.code === 'ArrowRight') answer(true)
        if (e.code === 'ArrowLeft') answer(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  function answer(knew) {
    if (!flipped || exiting) return
    const dir = knew ? 'right' : 'left'
    setExiting(true)
    setExitDir(dir)
    const nextResults = { ...results, [index]: knew ? 'known' : 'missed' }
    setResults(nextResults)
    const knownTotal = Object.values(nextResults).filter((r) => r === 'known').length
    onProgress(knownTotal, cards.length)
    const id = cardId(topic.id, index)
    onLeitnerUpdate({ ...leitner, [id]: advanceLeitnerBox(leitner[id], knew) })
    setTimeout(() => {
      setFlipped(false)
      setExiting(false)
      setExitDir(null)
      if (index + 1 >= cards.length) setDone(true)
      else setIndex((i) => i + 1)
    }, 300)
  }

  if (done) {
    const total = cards.length
    const known = Object.values(results).filter((r) => r === 'known').length
    return (
      <div className={styles.studyCard}>
        <div className={styles.flipResult}>
          <div className={styles.flipResultScore}>{known}/{total}</div>
          <p className={styles.flipResultSub}>
            {known === total ? 'Alle gewusst – sehr gut!' : `${known} von ${total} gewusst. Noch einmal üben?`}
          </p>
          <button
            className={styles.primaryAction}
            type="button"
            onClick={() => { setIndex(0); setFlipped(false); setResults({}); setDone(false) }}
          >
            Nochmal üben
          </button>
        </div>
      </div>
    )
  }

  const stageClass = [
    styles.flipStage,
    exiting ? styles.flipExiting : '',
    exitDir === 'right' ? styles.flipExitRight : exitDir === 'left' ? styles.flipExitLeft : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={styles.studyCard}>
      <div className={styles.mcqTop}>
        <span>Karte {index + 1} von {cards.length}</span>
        <strong>{knownCount} gewusst</strong>
      </div>

      <div className={styles.flipNavRow}>
        {cards.map((_, i) => {
          const r = results[i]
          const dotClass = [
            styles.flipDot,
            r === 'known' ? styles.flipDotKnown : '',
            r === 'missed' ? styles.flipDotMissed : '',
            i === index && !r ? styles.flipDotActive : '',
          ].filter(Boolean).join(' ')
          return <span key={i} className={dotClass}>{i + 1}</span>
        })}
      </div>

      <div
        className={stageClass}
        role="button"
        tabIndex={0}
        aria-label={flipped ? 'Karte umdrehen' : 'Antwort zeigen'}
        onClick={() => { if (!exiting) setFlipped((v) => !v) }}
        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); if (!exiting) setFlipped((v) => !v) } }}
      >
        <div className={`${styles.flipInner} ${flipped ? styles.flipInnerFlipped : ''}`}>
          <div className={styles.flipFront}>
            <strong className={styles.flipQuestion}>{current.front}</strong>
            <span className={styles.flipHint}>
              {(() => { const b = leitner[cardId(topic.id, index)]?.box; return b ? `Box ${b}` : 'Neu' })()}
              {' · '}↕ Antippen
            </span>
          </div>
          <div className={styles.flipBack}>
            <div>
              <span className={styles.flipLabel}>Antwort</span>
              <p className={styles.flipAnswerText}>{current.back}</p>
            </div>
            <span className={styles.flipHint}>↕ Antippen zum Zurückdrehen</span>
          </div>
        </div>
      </div>

      <div className={`${styles.flipAnswerRow} ${flipped ? styles.flipAnswerVisible : ''}`}>
        <button className={styles.flipMissBtn} type="button" onClick={() => answer(false)}>
          Noch einmal ✗
        </button>
        <button className={styles.flipKnowBtn} type="button" onClick={() => answer(true)}>
          Gewusst ✓
        </button>
      </div>
    </div>
  )
}

function AllFlashcardsMode({ cards, leitner, onLeitnerUpdate }) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [exitDir, setExitDir] = useState(null)
  const [results, setResults] = useState({})
  const [done, setDone] = useState(false)

  const current = cards[index]

  useEffect(() => {
    function onKey(e) {
      if (done) return
      if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); if (!exiting) setFlipped((v) => !v) }
      if (flipped && !exiting) {
        if (e.code === 'ArrowRight') answer(true)
        if (e.code === 'ArrowLeft') answer(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  function answer(knew) {
    if (!flipped || exiting) return
    setExiting(true)
    setExitDir(knew ? 'right' : 'left')
    setResults((r) => ({ ...r, [index]: knew ? 'known' : 'missed' }))
    const id = cardId(current.topicId, current.cardIndex)
    onLeitnerUpdate({ ...leitner, [id]: advanceLeitnerBox(leitner[id], knew) })
    setTimeout(() => {
      setFlipped(false)
      setExiting(false)
      setExitDir(null)
      if (index + 1 >= cards.length) setDone(true)
      else setIndex((i) => i + 1)
    }, 300)
  }

  if (!current && !done) return null

  if (done) {
    const known = Object.values(results).filter((r) => r === 'known').length
    return (
      <div className={styles.flipResult}>
        <div className={styles.flipResultScore}>{known}/{cards.length}</div>
        <p className={styles.flipResultSub}>
          {known === cards.length ? 'Alle gewusst – hervorragend!' : `${known} von ${cards.length} gewusst. Weiter üben!`}
        </p>
      </div>
    )
  }

  const stageClass = [
    styles.flipStage,
    exiting ? styles.flipExiting : '',
    exitDir === 'right' ? styles.flipExitRight : exitDir === 'left' ? styles.flipExitLeft : '',
  ].filter(Boolean).join(' ')

  const box = leitner[cardId(current.topicId, current.cardIndex)]?.box

  return (
    <div>
      <div className={styles.mcqTop}>
        <span>{current.topicTitle}</span>
        <strong>{index + 1} / {cards.length}</strong>
      </div>

      <div className={styles.flipNavRow}>
        {cards.map((_, i) => {
          const r = results[i]
          const dotClass = [styles.flipDot, r === 'known' ? styles.flipDotKnown : '', r === 'missed' ? styles.flipDotMissed : '', i === index && !r ? styles.flipDotActive : ''].filter(Boolean).join(' ')
          return <span key={i} className={dotClass}>{i + 1}</span>
        })}
      </div>

      <div
        className={stageClass}
        role="button"
        tabIndex={0}
        aria-label="Karte umdrehen"
        onClick={() => { if (!exiting) setFlipped((v) => !v) }}
        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); if (!exiting) setFlipped((v) => !v) } }}
      >
        <div className={`${styles.flipInner} ${flipped ? styles.flipInnerFlipped : ''}`}>
          <div className={styles.flipFront}>
            <strong className={styles.flipQuestion}>{current.card.front}</strong>
            <span className={styles.flipHint}>{box ? `Box ${box}` : 'Neu'} · ↕ Antippen</span>
          </div>
          <div className={styles.flipBack}>
            <div>
              <span className={styles.flipLabel}>Antwort</span>
              <p className={styles.flipAnswerText}>{current.card.back}</p>
            </div>
            <span className={styles.flipHint}>↕ Antippen zum Zurückdrehen</span>
          </div>
        </div>
      </div>

      <div className={`${styles.flipAnswerRow} ${flipped ? styles.flipAnswerVisible : ''}`}>
        <button className={styles.flipMissBtn} type="button" onClick={() => answer(false)}>Noch einmal ✗</button>
        <button className={styles.flipKnowBtn} type="button" onClick={() => answer(true)}>Gewusst ✓</button>
      </div>
    </div>
  )
}
