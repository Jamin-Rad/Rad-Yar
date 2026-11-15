const caseOptions = 'Nominativ|Genitiv|Dativ|Akkusativ'
const pronounOptions = 'Relativpronomen|Demonstrativpronomen|Possessivpronomen'
const tenseOptions = 'Präsens|Präteritum|Perfekt|Plusquamperfekt'
const selectCase = 'Bestimme den Kasus der markierten Wortgruppe.'
const ending = 'Ergänze nur die fehlende Adjektivendung.'
const article = 'Ergänze den bestimmten Artikel.'
const relative = 'Ergänze das Relativpronomen.'
const form = 'Bestimme die Zeitform der markierten Verbform.'

// Each topic supplies one distinct question pair per mixed test.
const topics = [
  [
    [
      [selectCase, 'Weder das laute Hämmern noch [der helle Lichtschein] störten die Nachbarn.', 'Nominativ', 'Der helle Lichtschein ist Teil des Subjekts. Wer oder was störte die Nachbarn?', caseOptions],
      ['Schreibe das markierte Wort richtig.', 'Die Reparatur dauerte bis zum [eintreffen] der Technikerin.', 'Eintreffen', 'Zum steht für zu dem. Eintreffen ist hier ein nominalisierter Infinitiv.', '', true],
    ],
    [
      [selectCase, 'Die Helferin nahm sich [des verletzten Tieres] an.', 'Genitiv', 'Sich einer Sache annehmen verlangt den Genitiv.', caseOptions],
      ['Ergänze die passende Form des Nomens.', 'Die Biologin beobachtete einen ___. (der Falke)', 'Falken', 'Falke gehört zur schwachen Deklination. Im Akkusativ Singular lautet die Form Falken.', '', true],
    ],
    [
      [selectCase, 'Die rasche Hilfe verdankte das Kind [einer aufmerksamen Passantin].', 'Dativ', 'Wem verdankte das Kind die Hilfe? Der Person steht bei verdanken im Dativ.', caseOptions],
      ['Schreibe das markierte Adjektiv richtig.', 'In der Schachtel entdeckten sie nichts [brauchbares].', 'Brauchbares', 'Nach nichts ist brauchbar hier nominalisiert und wird großgeschrieben.', '', true],
    ],
    [
      [selectCase, 'Die Hausmeisterin stellte [eine Ersatzleiter] an die Wand.', 'Akkusativ', 'Was stellte die Hausmeisterin an die Wand? Eine Ersatzleiter ist das Akkusativobjekt.', caseOptions],
      ['Ergänze die passende Form im Plural.', 'Sie hat sich mit mehreren ___ beraten. (der Kollege)', 'Kollegen', 'Nach mit steht Dativ. Der Plural Kollegen endet bereits auf -n und erhält kein weiteres -n.', '', true],
    ],
    [
      [selectCase, 'Der Plan [der beiden Architektinnen] überzeugte den Stadtrat.', 'Genitiv', 'Wessen Plan überzeugte? Die Wortgruppe benennt die Urheberinnen und steht im Genitiv.', caseOptions],
      ['Schreibe das markierte Wort richtig.', 'Beim [beobachten] der Vögel vergaß er die Zeit.', 'Beobachten', 'Beim steht für bei dem. Das Verb wird hier als Nomen verwendet.', '', true],
    ],
  ],
  [
    [
      [ending, 'Trotz stark___ Regens begann das Turnier.', 'en', 'Regen steht im maskulinen Genitiv. Ohne Artikel hat das Adjektiv vor Regens hier die Endung -en.'],
      ['Setze den Komparativ in der passenden Form ein.', 'Er suchte nach einer ___ Erklärung. (einfach)', 'einfacheren', 'Einfacher ist der Komparativ. Nach einer ergänzt du im Dativ -en.'],
    ],
    [
      [ending, 'Die Hütte wurde aus alt___ Holz gebaut.', 'em', 'Aus verlangt den Dativ. Ohne Artikel erhält das neutrale Adjektiv -em.'],
      ['Setze den Superlativ in der passenden Form ein.', 'Die Jury wählte den ___ Entwurf. (gut)', 'besten', 'Der Superlativstamm best- erhält nach den im Akkusativ -en.'],
    ],
    [
      [ending, 'Die Katze sprang über frisch___ Schnee.', 'en', 'Über zeigt hier die Richtung. Im maskulinen Akkusativ ohne Artikel steht -en.'],
      ['Setze den Komparativ in der passenden Form ein.', 'Wir nahmen einen ___ Weg. (kurz)', 'kürzeren', 'Der Komparativ kürzer erhält nach einen die Akkusativendung -en.'],
    ],
    [
      [ending, 'Mit gut___ Laune begann sie die Probe.', 'er', 'Mit verlangt den Dativ. Ohne Artikel lautet die feminine Dativendung -er.'],
      ['Setze die höchste Steigerungsform ein.', 'Unter den Kandidatinnen war sie am ___. (jung)', 'jüngsten', 'Jung bildet den Superlativ mit Umlaut: am jüngsten.'],
    ],
    [
      [ending, 'Kein schwer___ Gepäck blieb zurück.', 'es', 'Gepäck ist neutral. Nach kein ohne Kasusendung zeigt -es den neutralen Nominativ an.'],
      ['Setze den Komparativ in der passenden Form ein.', 'Sie entschied sich für die ___ Brücke. (stabil)', 'stabilere', 'Stabiler erhält nach die im femininen Akkusativ die Endung -e.'],
    ],
  ],
  [
    [
      [article, 'Die Kinder rannten eine Weile in ___ Turnhalle umher.', 'der', 'Die Gruppe bewegt sich innerhalb der Halle. Wo? In der Turnhalle, also Dativ.'],
      [selectCase, 'Außerhalb [der markierten Zone] dürfen wir stehen bleiben.', 'Genitiv', 'Außerhalb verlangt hier den Genitiv.', caseOptions],
    ],
    [
      [article, 'Die Maus huschte aus ihrem Gang unter ___ Schrank.', 'den', 'Hier geht es um das Ziel der Bewegung. Wohin? Unter den Schrank.'],
      [selectCase, 'Entgegen [allen Erwartungen] gewann die jüngste Mannschaft.', 'Dativ', 'Entgegen verlangt den Dativ.', caseOptions],
    ],
    [
      [article, 'Neben ___ Eingang warteten mehrere Gäste.', 'dem', 'Wo warteten sie? Neben dem Eingang, also Dativ.'],
      [selectCase, 'Während [des letzten Liedes] wurde es ganz still.', 'Genitiv', 'Während steht in der Standardsprache hier mit dem Genitiv.', caseOptions],
    ],
    [
      [article, 'Der Ball rollte aus dem Hof zwischen ___ Bäume.', 'die', 'Wohin rollte der Ball? Zwischen die Bäume, also Akkusativ.'],
      [selectCase, 'Sie überreichte den Preis persönlich statt [des Direktors].', 'Genitiv', 'Statt bezeichnet hier den Ersatz einer Person und steht mit Genitiv.', caseOptions],
    ],
    [
      [article, 'Die Kinder sprangen in ___ Wasser und schwammen los.', 'das', 'Wohin sprangen sie? In das Wasser, also Akkusativ.'],
      [selectCase, 'Gemäß [den Vorschriften] muss dieser Ausgang frei bleiben.', 'Dativ', 'Gemäß verlangt den Dativ.', caseOptions],
    ],
  ],
  [
    [
      [relative, 'Der Schüler, mit ___ wir das Experiment vorbereiteten, fehlt heute.', 'dem', 'Mit verlangt den Dativ. Schüler ist maskulin und steht im Singular.'],
      ['Bestimme die Art des markierten Pronomens.', 'Zwei Plätze waren frei. Ich nahm [diesen].', 'Demonstrativpronomen', 'Diesen weist auf einen bestimmten der beiden Plätze hin.', pronounOptions],
    ],
    [
      [relative, 'Die Autorin, ___ Buch wir gelesen haben, besucht unsere Klasse.', 'deren', 'Wessen Buch? Deren ist das Relativpronomen im femininen Genitiv.'],
      ['Bestimme die Art des markierten Pronomens.', 'Mein Fahrrad ist kaputt, aber ich kann [deins] nehmen.', 'Possessivpronomen', 'Deins steht für dein Fahrrad und drückt Zugehörigkeit aus.', pronounOptions],
    ],
    [
      [relative, 'Die Schülerinnen, bei ___ wir übernachteten, wohnen am Stadtrand.', 'denen', 'Bei verlangt Dativ. Im Plural lautet das Relativpronomen denen.'],
      ['Bestimme den Kasus des markierten Relativpronomens.', 'Die Geschichte, [die] du empfohlen hast, ist spannend.', 'Akkusativ', 'Was hast du empfohlen? Die ist das Akkusativobjekt im Relativsatz.', caseOptions],
    ],
    [
      [relative, 'Das Mädchen, ___ Helm am Zaun hängt, ist schon angekommen.', 'dessen', 'Mädchen ist grammatisch neutral. Im Genitiv Singular lautet das Relativpronomen dessen.'],
      ['Bestimme die Art des markierten Pronomens.', 'Das letzte Heft gehört mir. Deins liegt daneben, das hier ist [meins].', 'Possessivpronomen', 'Meins steht für mein Heft und bezeichnet den Besitz.', pronounOptions],
    ],
    [
      [relative, 'Die Frage, auf ___ du geantwortet hast, war schwierig.', 'die', 'Auf etwas antworten verlangt hier Akkusativ. Das feminine Relativpronomen lautet die.'],
      ['Bestimme die Art des markierten Pronomens.', 'Die beiden Entwürfe sind gut, aber [jener] ist genauer.', 'Demonstrativpronomen', 'Jener weist gezielt auf einen der Entwürfe hin.', pronounOptions],
    ],
  ],
  [
    [
      [form, 'Wir [fahren] nächsten Montag ins Museum.', 'Präsens', 'Fahren ist die Präsensform. Nächsten Montag verschiebt den Zeitpunkt, nicht die grammatische Form.', tenseOptions],
      ['Ergänze das Hilfsverb im Plusquamperfekt.', 'Bevor die Gäste eintrafen, ___ wir den Raum bereits geschmückt.', 'hatten', 'Das Schmücken geschah zuerst. Hatten + geschmückt bildet das Plusquamperfekt.'],
    ],
    [
      [form, 'Das Konzert [hat] trotz der Panne pünktlich [begonnen].', 'Perfekt', 'Hat im Präsens und das Partizip begonnen bilden das Perfekt.', tenseOptions],
      ['Ergänze die Präteritumform.', 'Während die Lehrerin erklärte, ___ der Schüler auf seinem Stuhl. (sitzen)', 'saß', 'Saß ist das Präteritum von sitzen.'],
    ],
    [
      [form, 'Noch bevor ich das Fenster schloss, [war] der Regen [hereingekommen].', 'Plusquamperfekt', 'War im Präteritum + hereingekommen zeigt die frühere Handlung.', tenseOptions],
      ['Ergänze die Präsensform.', 'Du ___ den Ball weiter als ich. (stoßen)', 'stößt', 'Bei du wechselt der Stammvokal o zu ö: du stößt.'],
    ],
    [
      [form, 'Als das Licht ausging, [verließen] alle ruhig den Saal.', 'Präteritum', 'Verließen ist die Vergangenheitsform im Präteritum von verlassen.', tenseOptions],
      ['Ergänze das Partizip II für das Perfekt.', 'Sie hat ihren Freunden den Weg ___. (beschreiben)', 'beschrieben', 'Bei der untrennbaren Vorsilbe be- steht kein ge-.'],
    ],
    [
      [form, 'Noch bevor der Unterricht begann, [hatten] alle die Aufgabe [gelöst].', 'Plusquamperfekt', 'Hatten + gelöst stellt das Lösen zeitlich vor den Unterrichtsbeginn.', tenseOptions],
      ['Ergänze das Hilfsverb im Perfekt.', 'Wir ___ gestern drei Stunden im Wald gewandert.', 'sind', 'Wandern bildet das Perfekt hier mit sein.'],
    ],
  ],
]

export const mixedTests = Array.from({ length: 5 }, (_, index) => ({
  id: `mix-${index + 1}`,
  name: `Mischtest ${index + 1}`,
  test: {
    id: `mix-${index + 1}-test`,
    name: `Mischtest ${index + 1}`,
    questions: [0, 1].flatMap((part) => topics.map((_, offset) => {
      const [prompt, example, answer, explanation, choices, strict] = topics[(index + offset) % topics.length][index][part]
      return { prompt, example, answer, explanation, options: choices ? choices.split('|') : undefined, strict }
    })),
  },
}))
