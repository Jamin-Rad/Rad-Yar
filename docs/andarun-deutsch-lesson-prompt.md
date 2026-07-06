# Andarun Deutsch Tageslektion Prompt

Kopiere diesen Prompt in ChatGPT, um eine neue Tageslektion zu erzeugen. Die Antwort soll reines JSON sein. Dieses JSON kann in Andarun unter `Deutschlernen -> Import` eingefügt werden.

```text
Erstelle eine Tageslektion Deutsch für Andarun als reines JSON ohne Markdown.
Niveau: B2. Thema soll aus echter täglicher Sprachbenutzung kommen: Arbeit, Familie, Behörden, Gesundheit, Wohnung, Konflikte, Diskussionen, Meinung äußern, Entscheidungen begründen.
Der Stil soll natürlich und alltagsnah sein, aber nicht einfach. Keine Kindersprache, keine A2/B1-Übungen.

Schema:
{
  "id": "deutsch-YYYY-MM-DD-kurzer-slug",
  "date": "YYYY-MM-DD",
  "level": "B2",
  "title": "...",
  "topic": "...",
  "reading": {
    "title": "...",
    "text": "170-230 Wörter auf Deutsch mit B2-Satzbau",
    "vocabulary": [
      { "term": "...", "de": "einfache Erklärung auf Deutsch", "fa": "persische Bedeutung", "example": "deutscher Beispielsatz" }
    ],
    "questions": [
      { "question": "...", "options": ["...", "...", "...", "..."], "answer": 0, "explanation": "..." }
    ]
  },
  "grammar": [
    { "question": "Grammatikfrage aus einem Satz des Lesetextes", "options": ["...", "...", "...", "..."], "answer": 0, "explanation": "kurze Erklärung" }
  ],
  "listening": {
    "title": "...",
    "text": "ähnlicher Text mit ähnlichen Wörtern, aber nicht identisch",
    "questions": [
      { "question": "...", "options": ["...", "...", "...", "..."], "answer": 0, "explanation": "..." }
    ]
  },
  "writing": {
    "prompt": "konkrete Schreibaufgabe",
    "checklist": ["...", "...", "..."]
  }
}

Regeln:
- genau 5 reading.questions
- genau 5 grammar Fragen
- genau 5 listening.questions
- mindestens 8 vocabulary Einträge
- answer ist der Index der richtigen Option, beginnend bei 0
- vocabulary.term muss exakt im Lesetext vorkommen, wenn möglich
- Die MCQs sollen schwierig sein: Bedeutung, Schlussfolgerung, Haltung, indirekte Aussage, nicht nur Wortsuche.
- Die Grammatikfragen sollen aus echten Sätzen des Lesetextes kommen: Konjunktiv, Nebensatz, Passiv, Präposition, Satzstellung, Nominalisierung.
- Der Hörtext soll ähnliche Wörter nutzen, aber ein anderer Text sein.
- Die Schreibaufgabe soll eine Meinung oder Entscheidung verlangen.
- Keine Kommentare, keine Erklärung außerhalb des JSON.
```
