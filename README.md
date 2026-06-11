# RadYar

RadYar ist eine mehrsprachige Lernplattform für radiologische Weiterbildung.

## Funktionen

- Strukturierte Lernseiten nach Körperregion und Thema
- MCQ-Prüfungen mit Mehrfachauswahl von Kapiteln und Themen
- Interaktive Fallbeispiele
- Flashcards mit Wiederholungsfunktion
- Persönlicher Lernfortschritt und Profilbereich
- Deutsch, Englisch und Persisch
- Responsive Darstellung für Desktop und Mobile
- Anmeldung und Benutzerverwaltung mit Clerk

## Entwicklung

Voraussetzungen: Node.js LTS und npm.

```bash
npm install
npm run dev
```

Die Anwendung läuft anschließend unter [http://localhost:3000](http://localhost:3000).

Produktions-Build:

```bash
npm run build
npm start
```

## Umgebungsvariablen

Für Anmeldung und Backend-Anbindung wird eine `.env.local` benötigt:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Projektstruktur

```text
app/          Seiten und API-Routen
components/   Wiederverwendbare UI-Komponenten
data/         Lehrplan, Fragen, Fälle und Flashcards
hooks/        Gemeinsame React-Hooks
lib/          Supabase-Clients und Hilfsfunktionen
public/       Bilder und statische Dateien
providers/    Sprache und Theme
```

## Technik

Next.js 15, React 18, Clerk und Supabase.
