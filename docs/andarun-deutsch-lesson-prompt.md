# Andarun Deutsch Tageslektion Prompt

Neue Lektionen als JSON importieren. Lese- und Hörtexte vorab mit `node scripts/prepare-deutsch-audio.mjs lessons.json` aufnehmen (macOS), oder eine fertige Datei über `reading.audioUrl` bzw. `listening.audioUrl` hinterlegen. Audiodateien und Manifest zusammen ausliefern.

```text
Erstelle eine Tageslektion Deutsch für Andarun als reines JSON ohne Markdown.
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
    “audioUrl”: “Pfad zur vorbereiteten Aufnahme des vollständigen Lesetextes, falls vorhanden”,
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
    “audioUrl”: “Pfad zur vorbereiteten Audiodatei, falls vorhanden”,
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

REGELN FÜR VOCABULARY_QUIZ (15 bis 20 Fragen):
- Für jedes Lernwort einen neuen natürlichen Satz mit genau einer Lücke ___ schreiben.
- question enthält nur den Satz. Keine Frage nach Definition, Übersetzung oder Bedeutung.
- Die vier Optionen sind Wörter oder Wendungen, die in die Lücke eingesetzt werden können. Genau eine ist im Kontext richtig.
- Den Lesetext und die Beispiele nicht kopieren. Die Bedeutung wird durch die Verwendung im neuen Kontext geprüft.
- Die richtige Antwort gleichmäßig auf alle vier Positionen verteilen.

REGELN FÜR GRAMMAR (15 Fragen):
- Praktische Lückentext- oder Wahlaufgaben aus echten Sätzen des Lesetextes
- KEIN Format „Welche grammatische Funktion hat X?” oder „Warum steht Y?”
- question enthält ausschließlich einen natürlichen Satz mit ___. Keine Einleitung wie „Ergänze“, „Wähle“ oder „Fülle die Lücke“.
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
- Die fertige Audiodatei wird vorab bereitgestellt. audioUrl nur mit einem echten Dateipfad befüllen, sonst weglassen. Keine Sprachsynthese beim Abspielen.
- genau 5 Fragen
- Ähnliche Situation wie Lesetext, aber ein anderer Text und eine andere Perspektive

REGELN FÜR WRITING:
- Schreibaufgabe verlangt eine Meinung, Entscheidung oder Argumentation
- checklist: 5 Punkte

Pflichtprüfung vor der Ausgabe:
1. Zähle 15 bis 20 vocabulary-Einträge — zu wenig = Fehler.
2. Prüfe jeden vocabulary.term exakt im reading.text.
3. Prüfe de, fa, example bei jeder Karte.
4. Zähle 15 bis 20 vocabulary_quiz Sätze mit jeweils einer Lücke.
5. Zähle genau 15 grammar Fragen. Prüfe: keine Frage fragt nach grammatischer Funktion oder Regelname.
6. Prüfe alle explanation-Felder bei grammar: Sind sie ausführlich? Wird der Kasus bei Präpositionen genannt?
7. Gib ausschließlich valides JSON aus, ohne Kommentar und ohne Markdown.
```

Antwortoptionen: Verwende dieselbe Wortart und passende Flexion. Keine zufälligen Vokabeln als Ablenkung. Genau eine Option passt zum gesamten Kontext. Erkläre den entscheidenden Hinweis und grenze eine plausible falsche Option ab.
