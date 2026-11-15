export const families = [
  { name: 'Fluss', words: ['der Fluss', 'fließend', 'flüssig', 'das Flussbett', 'überfließend'] },
  { name: 'Schloss', words: ['das Schloss', 'verschließen', 'der Schlüssel', 'aufgeschlossen', 'abschließen'] },
  { name: 'Genuss', words: ['der Genuss', 'genießen', 'genüsslich', 'genussvoll', 'die Genüsslichkeit'] },
  { name: 'Wissen', words: ['das Gewissen', 'die Wissenschaft', 'wissbegierig', 'das Wissen', 'ich weiß'] },
]

// Each row pairs a spelling choice and a practice context with a fresh test sentence.
const entries = [
  ['Fluss', 'Fluß', 'Nach dem Regen trat der ___ über die Ufer.', 'Vom Hügel aus sahen wir einen breiten ___.', 'größeres Fließgewässer'],
  ['fließend', 'fliessend', 'Sie spricht ___ Deutsch.', 'Nach einem Jahr sprach er ___ Französisch.', 'ohne stockendes Sprechen'],
  ['flüssig', 'flüßig', 'Erwärmtes Wachs wird ___.', 'Die Butter war in der heißen Pfanne bald ___.', 'Gegenteil von fest'],
  ['Flussbett', 'Flußbett', 'Im trockenen ___ lagen Kiesel.', 'Nach dem Hochwasser war das ___ voller Äste.', 'Vertiefung, in der ein Fluss fließt'],
  ['überfließend', 'überfliessend', 'Das Wasser strömte ___ über den Rand des Beckens.', 'Der Brunnen wurde als ___ beschrieben: Wasser lief über seinen Rand.', 'über den Rand fließend'],
  ['Schloss', 'Schloß', 'Der Schlüssel steckt im ___.', 'Auf dem Berg steht ein altes ___.', 'herrschaftliches Gebäude'],
  ['verschließen', 'verschliessen', 'Wir müssen die Dose luftdicht ___.', 'Bitte die Kiste fest ___, damit nichts herausfällt.', 'fest zumachen'],
  ['Schlüssel', 'Schlüßel', 'Der ___ passt in das Schloss.', 'Ohne ___ konnte sie die Tür nicht aufsperren.', 'Gegenstand zum Öffnen eines Schlosses'],
  ['aufgeschlossen', 'aufgeschloßen', 'Sie reagierte ___ auf neue Ideen.', 'Er war neuen Vorschlägen gegenüber ___.', 'offen für Neues'],
  ['abschließen', 'abschliessen', 'Nach dem Training soll ich die Halle ___.', 'Vor der Abfahrt müssen wir die Wohnungstür ___.', 'mit dem Schlüssel zusperren'],
  ['Genuss', 'Genuß', 'Das Eis war ein echter ___.', 'Das Konzert war ein großer ___ für das Publikum.', 'besondere Freude an etwas'],
  ['genießen', 'geniessen', 'Wir wollen den Abend ___.', 'Die Gäste konnten das Essen in Ruhe ___.', 'mit Freude erleben'],
  ['genüsslich', 'genüßlich', 'Die Katze streckte sich ___.', 'Nach dem Essen lehnte sie sich ___ zurück.', 'mit sichtlichem Behagen, mit Umlaut'],
  ['genussvoll', 'genußvoll', 'Er trank den Kakao ___ in kleinen Schlucken.', 'Sie kostete ___ von der Schokolade.', 'voller Genuss, ohne Umlaut'],
  ['Genüsslichkeit', 'Genüßlichkeit', 'Mit sichtbarer ___ nahm er den ersten Bissen.', 'Mit welcher ___ sie den Tee schlürfte!', 'Nomen zu genüsslich'],
  ['Gewissen', 'Gewißen', 'Mein ___ riet mir, die Wahrheit zu sagen.', 'Nach der Lüge hatte er ein schlechtes ___.', 'inneres Gefühl für richtig und falsch'],
  ['Wissenschaft', 'Wißenschaft', 'Experimente sind für die ___ wichtig.', 'Die ___ untersucht, wie Sterne entstehen.', 'systematische Forschung'],
  ['wissbegierig', 'wissenbegierig', 'Das Kind war ___ und stellte viele Fragen.', 'Die Schülerin war ___ und wollte alles über Planeten erfahren.', 'begierig, Neues zu erfahren'],
  ['Wissen', 'Wißen', 'Die Bücher erweitern unser ___.', 'Ihr ___ über Tiere half ihr beim Quiz.', 'das, was man gelernt hat'],
  ['weiß', 'weiss', 'Ich ___, wie die Aufgabe geht.', 'Ich ___ schon, wann der Zug fährt.', 'wissen · 1. Person Singular'],
]

function gap([answer, wrong, practice, test, hint], isTest) {
  return {
    prompt: 'Ergänze das gesuchte Wort.',
    example: isTest ? test : practice,
    hint,
    answer,
    explanation: `Die richtige Schreibung lautet „${answer}“.`,
  }
}

export const spellingPractice = {
  id: 'diktat-ueben',
  name: 'Schreibung erkennen und anwenden',
  questions: entries.flatMap((entry, index) => {
    const [answer, wrong] = entry
    return [
      { prompt: 'Welche Schreibung passt in die Lücke?', example: entry[2], answer,
        options: index % 2 ? [wrong, answer] : [answer, wrong], explanation: `Richtig ist „${answer}“.` },
      gap(entry, false),
    ]
  }),
}
export const spellingTest = { id: 'diktat-test', name: 'Lückentext · Rechtschreibtest', questions: entries.map(entry => gap(entry, true)) }
