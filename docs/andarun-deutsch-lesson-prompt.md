# Andarun Deutsch Tageslektion Prompt

Kopiere diesen Prompt in ChatGPT, um eine neue Tageslektion zu erzeugen. Die Antwort soll reines JSON sein. Dieses JSON kann in Andarun unter `Deutschlernen -> Import` eingefügt werden.

```text
Erstelle eine Tageslektion Deutsch für Andarun als reines JSON ohne Markdown.
Niveau: B1/B2, anspruchsvoll, aber alltagsnah.

Schema:
{
  "id": "deutsch-YYYY-MM-DD-kurzer-slug",
  "date": "YYYY-MM-DD",
  "level": "B1/B2",
  "title": "...",
  "topic": "...",
  "reading": {
    "title": "...",
    "text": "120-180 Wörter auf Deutsch",
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
- Die MCQs sollen schwierig sein und nicht nur offensichtliche Wortsuche.
- Die Grammatikfragen sollen aus echten Sätzen des Lesetextes kommen.
- Der Hörtext soll ähnliche Wörter nutzen, aber ein anderer Text sein.
- Keine Kommentare, keine Erklärung außerhalb des JSON.
```
