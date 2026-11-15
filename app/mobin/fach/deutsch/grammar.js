const cases = 'Nominativ|Genitiv|Dativ|Akkusativ'
const pronouns = 'Relativpronomen|Demonstrativpronomen|Possessivpronomen'
const tenses = 'Präsens|Präteritum|Perfekt|Plusquamperfekt'
const kase = 'Bestimme den Kasus der markierten Wortgruppe.'
const tense = 'Bestimme die Zeitform der markierten Verbform.'
const pronoun = 'Bestimme die Art des markierten Pronomens.'

function questions(rows) {
  return rows.map(([prompt, example, answer, explanation, options]) => ({
    prompt, example, answer, explanation, options: options?.split('|'),
  }))
}

function station(id, name, note, practice, test) {
  return {
    id, name, note,
    practice: { id: id + '-ueben', name, questions: questions(practice) },
    test: { id: id + '-test', name: name + ' · Test', questions: questions(test) },
  }
}

export const stations = [
  station('nomen', 'Nomen', 'Genus, Numerus, Kasus und Nominalisierung', [
    [kase, 'Der Geruch [des frischen Brotes] zog durchs Haus.', 'Genitiv', 'Wessen Geruch? Der Geruch des frischen Brotes.', cases],
    [kase, 'Der Trainer gratulierte [der jungen Läuferin].', 'Dativ', 'Gratulieren verlangt den Dativ. Wem gratulierte er?', cases],
    [kase, '[Die beiden Geschwister] trugen die Kiste.', 'Nominativ', 'Wer trug die Kiste? Die beiden Geschwister sind das Subjekt.', cases],
    [kase, 'Wir untersuchten [den gesprungenen Spiegel].', 'Akkusativ', 'Wen oder was untersuchten wir? Den Spiegel.', cases],
    ['Setze das passende Nomen in den Plural.', 'Im Museum hängen mehrere ___. (das Gemälde)', 'Gemälde', 'Das Gemälde und die Gemälde haben dieselbe Nomenform.'],
    ['Schreibe das nominalisierte Verb richtig.', 'Beim [schwimmen] vergaß er die Zeit.', 'Schwimmen', 'Beim steht für bei dem. Dem signalisiert hier ein nominalisiertes Verb.'],
    ['Schreibe das nominalisierte Adjektiv richtig.', 'Sie erzählte uns etwas [spannendes].', 'Spannendes', 'Etwas kann ein nominalisiertes Adjektiv einleiten. Spannendes wird großgeschrieben.'],
    ['Welches Genus hat das Nomen „Ereignis“?', 'Im Bericht geht es um das Ereignis.', 'Neutrum', 'Der Artikel das zeigt das sächliche Genus.', 'Maskulinum|Femininum|Neutrum'],
    ['Welches Nomen bestimmt das Genus des zusammengesetzten Wortes?', 'der Haustürschlüssel', 'Schlüssel', 'Das letzte Glied bestimmt das Genus: der Schlüssel → der Haustürschlüssel.'],
    ['Wähle die passende Genitivform.', 'Die Spitze des ___ war verschneit. (Berg)', 'Berges', 'Die Form des Berges ist Genitiv Singular.', 'Berg|Bergen|Berges'],
  ], [
    [kase, 'Die Farbe [des alten Vorhangs] war verblasst.', 'Genitiv', 'Wessen Farbe? Die Farbe des alten Vorhangs.', cases],
    [kase, 'Der Zeuge widersprach [dem Polizisten].', 'Dativ', 'Widersprechen verlangt den Dativ.', cases],
    [kase, 'Auf der Fensterbank stand [eine Vase].', 'Nominativ', 'Wer oder was stand dort? Eine Vase ist das Subjekt.', cases],
    [kase, 'Die Klasse besichtigte [eine historische Mühle].', 'Akkusativ', 'Wen oder was besichtigte die Klasse? Eine historische Mühle.', cases],
    ['Setze das passende Nomen in den Plural.', 'Im Schrank lagen mehrere ___. (das Tuch)', 'Tücher', 'Tuch bildet den Plural mit Umlaut und -er: Tücher.'],
    ['Schreibe das nominalisierte Verb richtig.', 'Zum [lesen] setzte sie sich ans Fenster.', 'Lesen', 'Zum steht für zu dem und leitet hier ein nominalisiertes Verb ein.'],
    ['Schreibe das nominalisierte Adjektiv richtig.', 'Nichts [wichtiges] war verloren gegangen.', 'Wichtiges', 'Nach nichts steht hier ein substantiviertes Adjektiv.'],
    ['Welches Genus hat das Nomen „Finsternis“?', 'Die Finsternis war ungewöhnlich dicht.', 'Femininum', 'Der Artikel die zeigt das weibliche Genus.', 'Maskulinum|Femininum|Neutrum'],
    ['Welches Nomen bestimmt das Genus des zusammengesetzten Wortes?', 'die Taschenlampe', 'Lampe', 'Das letzte Glied bestimmt das Genus: die Lampe.'],
    ['Setze das Nomen in den Dativ Plural. Gib nur das Nomen ein.', 'Sie begegnete dort ihren ___. (Freunde)', 'Freunden', 'Im Dativ Plural erhält Freunde ein zusätzliches -n.'],
  ]),
  station('adjektive', 'Adjektive', 'Deklination, Vergleich und Steigerung', [
    ['Ergänze die Adjektivendung.', 'Sie folgte einem schmal___ Pfad.', 'en', 'Nach einem steht das Adjektiv im maskulinen Dativ mit -en.'],
    ['Ergänze die Adjektivendung.', 'Ein ruhig___ See lag vor uns.', 'er', 'Bei ein + maskulinem Nominativ zeigt das Adjektiv das Genus mit -er.'],
    ['Ergänze die Adjektivendung.', 'Wir sahen das alt___ Schloss.', 'e', 'Nach das erhält das Adjektiv im neutralen Akkusativ -e.'],
    ['Ergänze die Adjektivendung.', 'Sie tranken aus frisch___ Gläsern.', 'en', 'Im Dativ Plural lautet die Adjektivendung hier -en.'],
    ['Setze den Komparativ ein.', 'Die zweite Lösung war ___ als die erste. (gut)', 'besser', 'Gut wird unregelmäßig gesteigert: gut, besser, am besten.'],
    ['Setze den Komparativ ein.', 'Der neue Turm ist ___ als der alte. (hoch)', 'höher', 'Aus hoch wird in der Vergleichsform höher.'],
    ['Ergänze die höchste Steigerungsform.', 'Der Juni war am ___. (warm)', 'wärmsten', 'Warm erhält im Superlativ den Umlaut: am wärmsten.'],
    ['Ergänze „als“ oder „wie“.', 'Mila war genauso schnell ___ ihre Schwester.', 'wie', 'Bei Gleichheit steht so oder genauso … wie.', 'als|wie'],
    ['Bestimme die Steigerungsstufe.', 'Wir wählten den [kürzesten] Weg.', 'Superlativ', 'Kürzesten bezeichnet die höchste Stufe.', 'Positiv|Komparativ|Superlativ'],
    ['Setze das Adjektiv in der passenden Form ein.', 'Mit ___ Mut schaffte sie es. (groß)', 'großem', 'Ohne Artikel trägt das Adjektiv die Dativendung -em.'],
  ], [
    ['Ergänze die Adjektivendung.', 'Er half einer verletzt___ Person.', 'en', 'Nach einer steht das Adjektiv im femininen Dativ mit -en.'],
    ['Ergänze die Adjektivendung.', 'Ein hell___ Licht leuchtete auf.', 'es', 'Bei ein + neutralem Nominativ trägt das Adjektiv -es.'],
    ['Ergänze die Adjektivendung.', 'Sie betrat den leer___ Saal.', 'en', 'Nach den steht das Adjektiv im maskulinen Akkusativ mit -en.'],
    ['Ergänze die Adjektivendung.', 'Wir suchten die verloren___ Hefte.', 'en', 'Nach die im Plural bekommt das Adjektiv -en.'],
    ['Setze den Komparativ ein.', 'Die Ausstellung hatte ___ Besucher als erwartet. (viel)', 'mehr', 'Viel wird unregelmäßig gesteigert: viel, mehr, am meisten.'],
    ['Setze den Komparativ ein.', 'Der Film war ___ als das Hörspiel. (lang)', 'länger', 'Der Komparativ von lang hat einen Umlaut: länger.'],
    ['Ergänze die höchste Steigerungsform.', 'Morgens war es am ___. (kalt)', 'kältesten', 'Der Superlativ von kalt lautet am kältesten.'],
    ['Ergänze „als“ oder „wie“.', 'Die neue Karte ist genauer ___ die alte.', 'als', 'Beim Vergleich mit einem Komparativ steht als.', 'wie|als'],
    ['Bestimme die Steigerungsstufe.', 'Die [ältere] Schwester öffnete die Tür.', 'Komparativ', 'Ältere ist die Vergleichsstufe von alt.', 'Superlativ|Positiv|Komparativ'],
    ['Setze das Adjektiv in der passenden Form ein.', 'Sie begann mit ___ Kraft. (neu)', 'neuer', 'Ohne Artikel steht im femininen Dativ die Endung -er.'],
  ]),
  station('praepositionen', 'Präpositionen', 'Kasus nach Präpositionen und Wechselpräpositionen', [
    [kase, 'Wegen [des Gewitters] blieben wir drinnen.', 'Genitiv', 'Wegen steht in der Standardsprache hier mit dem Genitiv.', cases],
    [kase, 'Sie fuhr mit [ihrem Vater] nach Hause.', 'Dativ', 'Mit verlangt den Dativ.', cases],
    [kase, 'Wir liefen durch [den Park].', 'Akkusativ', 'Durch verlangt den Akkusativ.', cases],
    ['Ergänze den bestimmten Artikel.', 'Das Bild hängt über ___ Sofa.', 'dem', 'Wo hängt das Bild? Ort mit über verlangt hier den Dativ.'],
    ['Ergänze den bestimmten Artikel.', 'Ich hänge das Bild über ___ Sofa.', 'das', 'Wohin hänge ich es? Richtung mit über verlangt hier den Akkusativ.'],
    ['Welche Präposition zeigt eine Zeitspanne bis jetzt?', '___ dem Unfall trägt er einen Helm.', 'seit', 'Seit bezeichnet den Beginn eines Zustands, der noch andauert.', 'seit|seitdem|während'],
    ['Welche Präposition leitet eine Begründung ein?', '___ des Nebels fiel der Flug aus.', 'wegen', 'Wegen leitet den Grund für den Ausfall ein.', 'während|wegen|trotz'],
    ['Ergänze den Artikel.', 'Er blieb vor ___ Eingang stehen.', 'dem', 'Wo blieb er stehen? Vor dem Eingang, also Dativ.'],
    ['Ergänze den Artikel.', 'Sie stellte sich vor ___ Eingang.', 'den', 'Wohin stellte sie sich? Vor den Eingang, also Akkusativ.'],
    ['Löse die Verschmelzung „ins“ auf.', 'Wir gingen ins Haus.', 'in das', 'Ins entsteht aus in + das.'],
  ], [
    [kase, 'Trotz [des starken Windes] segelten sie.', 'Genitiv', 'Trotz steht in der Standardsprache hier mit dem Genitiv.', cases],
    [kase, 'Sie erzählte von [ihrer Reise].', 'Dativ', 'Von verlangt den Dativ.', cases],
    [kase, 'Er spielte ohne [seinen Bruder].', 'Akkusativ', 'Ohne verlangt den Akkusativ.', cases],
    ['Ergänze den bestimmten Artikel.', 'Die Katze schläft unter ___ Stuhl.', 'dem', 'Wo schläft die Katze? Auf die Ortsfrage steht Dativ.'],
    ['Ergänze den bestimmten Artikel.', 'Die Katze kriecht unter ___ Stuhl.', 'den', 'Wohin kriecht die Katze? Auf die Richtungsfrage steht Akkusativ.'],
    ['Welche Präposition passt zu einer Zeitdauer, die noch anhält?', 'Die Bibliothek ist ___ letzter Woche geschlossen.', 'seit', 'Seit nennt den Beginn der noch andauernden Schließung.', 'vor|bis|seit'],
    ['Welche Präposition zeigt einen Gegensatz?', '___ des Regens spielten wir draußen.', 'trotz', 'Trotz bezeichnet einen Umstand, der etwas nicht verhindert.', 'wegen|trotz|während'],
    ['Ergänze den Artikel.', 'Der Stift liegt zwischen ___ Büchern.', 'den', 'Wo liegt er? Dativ Plural mit den.'],
    ['Ergänze den Artikel.', 'Lege den Stift zwischen ___ Bücher.', 'die', 'Wohin soll er? Akkusativ Plural mit die.'],
    ['Löse die Verschmelzung „zum“ auf.', 'Wir gingen zum Bahnhof.', 'zu dem', 'Zum entsteht aus zu + dem.'],
  ]),
  station('pronomen', 'Pronomen', 'Relativ-, Demonstrativ- und Possessivpronomen', [
    [pronoun, 'Die Hündin, [die] dort bellt, gehört uns.', 'Relativpronomen', 'Die leitet den Relativsatz ein und bezieht sich auf Hündin.', pronouns],
    [pronoun, 'Welcher Rucksack ist deiner? [Dieser] hier.', 'Demonstrativpronomen', 'Dieser weist auf einen bestimmten Rucksack hin.', pronouns],
    [pronoun, 'Das große Zimmer ist [unseres].', 'Possessivpronomen', 'Unseres zeigt an, wem das Zimmer zugeordnet ist.', pronouns],
    ['Ergänze das Relativpronomen.', 'Der Mann, ___ ich das Buch gab, lächelte.', 'dem', 'Wem gab ich das Buch? Das Relativpronomen steht im Dativ.'],
    ['Ergänze das Relativpronomen.', 'Der Film, ___ wir gestern sahen, war spannend.', 'den', 'Wen oder was sahen wir? Das Relativpronomen steht im Akkusativ.'],
    ['Ergänze das Relativpronomen.', 'Die Schülerin, ___ Fahrrad kaputt ist, kommt später.', 'deren', 'Wessen Fahrrad? Deren ist hier das feminine Relativpronomen im Genitiv.'],
    ['Ergänze das Possessivpronomen.', 'Ist das dein Heft? Ja, es ist ___.', 'meins', 'Aus Sicht der antwortenden Person gehört es ihr selbst: meins.'],
    ['Ergänze das Relativpronomen.', 'Die Kinder, mit ___ sie spielte, gingen heim.', 'denen', 'Mit verlangt den Dativ. Im Plural lautet das Relativpronomen denen.'],
    ['Welcher Kasus liegt beim Relativpronomen vor?', 'Das ist der Hund, [der] mich geweckt hat.', 'Nominativ', 'Der ist das Subjekt des Relativsatzes.', cases],
    [pronoun, 'Von allen Vorschlägen gefällt mir [jener] am besten.', 'Demonstrativpronomen', 'Jener hebt einen bestimmten Vorschlag hervor.', pronouns],
  ], [
    [pronoun, 'Die Tür, [die] klemmt, muss repariert werden.', 'Relativpronomen', 'Die leitet den Relativsatz ein und bezieht sich auf Tür.', pronouns],
    [pronoun, 'Von den beiden Schlüsseln passt [dieser].', 'Demonstrativpronomen', 'Dieser weist auf einen bestimmten Schlüssel.', pronouns],
    [pronoun, 'Der blaue Regenschirm ist [deiner].', 'Possessivpronomen', 'Deiner gibt an, wem der Schirm gehört.', pronouns],
    ['Ergänze das Relativpronomen.', 'Die Nachbarin, ___ ich geholfen habe, bedankte sich.', 'der', 'Helfen verlangt den Dativ. Das feminine Relativpronomen im Dativ lautet der.'],
    ['Ergänze das Relativpronomen.', 'Der Koffer, ___ sie trug, war schwer.', 'den', 'Was trug sie? Den Koffer. Den steht im Akkusativ.'],
    ['Ergänze das Relativpronomen.', 'Der Musiker, ___ Lied wir kennen, kommt heute.', 'dessen', 'Wessen Lied? Dessen ist das maskuline Relativpronomen im Genitiv.'],
    ['Ergänze das Possessivpronomen.', 'Ist das euer Zelt? Ja, es ist ___.', 'unseres', 'Die Gruppe antwortet aus der Wir-Perspektive: unseres.'],
    ['Ergänze das Relativpronomen.', 'Die Leute, von ___ ich erzählte, sind hier.', 'denen', 'Von verlangt den Dativ, im Plural lautet das Relativpronomen denen.'],
    ['Welcher Kasus liegt beim Relativpronomen vor?', 'Die Tante, [der] ich schrieb, antwortete.', 'Dativ', 'Wem schrieb ich? Der steht im Relativsatz im Dativ.', cases],
    [pronoun, 'Zwei Jacken blieben übrig, aber ich nahm [jene].', 'Demonstrativpronomen', 'Jene weist auf eine bestimmte Jacke hin.', pronouns],
  ]),
  station('zeitformen', 'Zeitformen', 'Präsens, Präteritum, Perfekt und Plusquamperfekt', [
    [tense, 'Der Bus [fährt] gleich ab.', 'Präsens', 'Fährt ist eine Präsensform. Gleich zeigt hier die nähere Zukunft.', tenses],
    [tense, 'Die Katze [sprang] auf den Tisch.', 'Präteritum', 'Sprang ist das Präteritum von springen.', tenses],
    [tense, 'Wir [sind] früh [aufgestanden].', 'Perfekt', 'Sind im Präsens und das Partizip aufgestanden bilden das Perfekt.', tenses],
    [tense, 'Er [hatte gegessen], bevor wir kamen.', 'Plusquamperfekt', 'Hatte + gegessen bezeichnet die Handlung vor dem Kommen.', tenses],
    ['Ergänze die Präteritumform.', 'Sie ___ ihren Schlüssel. (verlieren)', 'verlor', 'Verlieren wird im Präteritum zu verlor.'],
    ['Ergänze das Hilfsverb im Perfekt.', 'Ich ___ zur Schule gelaufen.', 'bin', 'Hier beschreibt laufen eine Ortsveränderung und bildet das Perfekt mit sein.'],
    ['Ergänze das Partizip II.', 'Wir haben den Schrank ___. (anschließen)', 'angeschlossen', 'Anschließen ist trennbar. Im Partizip steht ge zwischen an- und -schlossen.'],
    ['Ergänze das Hilfsverb im Plusquamperfekt.', 'Der Bus ___ schon abgefahren, als ich ankam.', 'war', 'War + abgefahren bezeichnet die frühere Handlung.'],
    ['Ergänze die Präsensform.', 'Du ___ heute den Ball. (werfen)', 'wirfst', 'Bei du verändert sich der Stammvokal e zu i: du wirfst.'],
    ['Ergänze das Partizip II.', 'Sie hat den Pfeil ___. (beschreiben)', 'beschrieben', 'Bei der untrennbaren Vorsilbe be- fällt ge- weg.'],
  ], [
    [tense, 'Wir [treffen] uns morgen vor der Schule.', 'Präsens', 'Treffen steht im Präsens. Morgen gibt nur den zukünftigen Zeitpunkt an.', tenses],
    [tense, 'Sie [vergaß] ihr Heft zu Hause.', 'Präteritum', 'Vergaß ist das Präteritum von vergessen.', tenses],
    [tense, 'Die Kinder [haben] leise [gelacht].', 'Perfekt', 'Haben im Präsens und das Partizip gelacht bilden das Perfekt.', tenses],
    [tense, 'Die Gäste [waren] schon [gegangen], als die Musik begann.', 'Plusquamperfekt', 'Waren + gegangen zeigt, was vor dem Beginn der Musik geschah.', tenses],
    ['Ergänze die Präteritumform.', 'Nach dem Rennen ___ er sich auf die Bank. (setzen)', 'setzte', 'Setzen ist regelmäßig: er setzte sich.'],
    ['Ergänze das Hilfsverb im Perfekt.', 'Wir ___ in die falsche Straße abgebogen.', 'sind', 'Abbiegen bezeichnet hier eine Ortsveränderung und steht mit sein.'],
    ['Ergänze das Partizip II.', 'Ihr habt die Tür ___. (aufmachen)', 'aufgemacht', 'Beim trennbaren Verb aufmachen steht ge zwischen auf- und -macht.'],
    ['Ergänze das Hilfsverb im Plusquamperfekt.', 'Mara ___ den Brief schon gelesen, als ich anrief.', 'hatte', 'Hatte + gelesen setzt das Lesen vor das Anrufen.'],
    ['Ergänze die Präsensform.', 'Du ___ den schweren Korb. (tragen)', 'trägst', 'Bei du wird a zu ä: du trägst.'],
    ['Ergänze das Partizip II.', 'Er hat mir den Ablauf ___. (erklären)', 'erklärt', 'Er- ist untrennbar. Das Partizip erklärt hat kein ge-.'],
  ]),
]
