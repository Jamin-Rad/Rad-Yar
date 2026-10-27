// Reviewed alternatives stay in the same grammatical category as the target.
// Each explanation identifies the contextual clue rather than restating a definition.
const vocabulary = {
  reklamieren: [['widerrufen', 'zurücksenden', 'bestellen'], 'Der Defekt ist der Grund für die Beschwerde. „Reklamieren“ heißt, diesen Mangel beim Verkäufer zu melden. Eine Rücksendung allein beschreibt noch keine Beschwerde.'],
  Kassenbon: [['Lieferschein', 'Garantieschein', 'Kostenvoranschlag'], 'Kaufdatum und bezahlter Preis stehen auf dem Kassenbon. Ein Lieferschein bestätigt die Lieferung, ein Kostenvoranschlag nennt erst die erwarteten Kosten.'],
  Originalverpackung: [['Versandverpackung', 'Geschenkverpackung', 'Schutzverpackung'], 'Gemeint ist die Verpackung, in der das Produkt ursprünglich verkauft wurde. Eine zusätzliche Versand- oder Geschenkverpackung ist etwas anderes.'],
  Mangel: [['Verschleiß', 'Bedarf', 'Zubehör'], 'Ein Riss in einem neuen Display ist ein Fehler an der Ware, also ein Mangel. „Verschleiß“ bezeichnet dagegen die allmähliche Abnutzung durch Gebrauch.'],
  offenbar: [['angeblich', 'vorsorglich', 'ausdrücklich'], 'Die ausgebliebene Kontrolllampe ist ein sichtbarer Hinweis. „Offenbar“ bezeichnet eine Schlussfolgerung daraus; „angeblich“ würde eine fremde, nicht bestätigte Behauptung wiedergeben.'],
  Ersatzgerät: [['Zusatzgerät', 'Vorführgerät', 'Altgerät'], 'Das geliehene Gerät übernimmt vorübergehend die Funktion des defekten Geräts. Deshalb ist es ein Ersatzgerät; „Zusatzgerät“ bedeutet nur ein zusätzliches Gerät.'],
  vorrätig: [['bestellt', 'vorgemerkt', 'ausverkauft'], '„Sofort mitnehmen“ setzt voraus, dass das Gerät bereits in der Filiale vorhanden ist. Bestellte oder vorgemerkte Ware muss dagegen noch nicht verfügbar sein.'],
  anbieten: [['vermitteln', 'bestätigen', 'berechnen'], 'Das größere Zimmer wird als Alternative zur Auswahl gestellt. Das ist ein Angebot; eine Bestätigung würde eine bereits getroffene Vereinbarung festhalten.'],
  erstatten: [['berechnen', 'erlassen', 'einbehalten'], 'Die Gebühr wurde schon doppelt abgebucht. Der Händler muss sie zurückzahlen, also erstatten. „Erlassen“ würde bedeuten, eine noch offene Forderung nicht mehr zu verlangen.'],
  'unterscheiden sich': [['entsprechen sich', 'ergänzen sich', 'gleichen sich'], 'Die Kosten sind verschieden. „Sich unterscheiden“ benennt diesen Unterschied; „sich gleichen“ würde das Gegenteil ausdrücken.'],
  Aufpreis: [['Vorschuss', 'Abschlag', 'Nachlass'], 'Die größere Variante kostet zusätzlich 15 Euro. Dieser zusätzliche Preis ist ein Aufpreis. Ein Nachlass würde den Preis senken.'],
  Rückerstattung: [['Gutschrift', 'Anzahlung', 'Verrechnung'], 'Das bereits gezahlte Geld soll zurückgezahlt werden. Eine Gutschrift kann dagegen auch nur ein Guthaben für einen späteren Einkauf sein.'],
  Betrag: [['Rabatt', 'Vorschuss', 'Überschuss'], 'Gefragt ist die konkrete noch zu zahlende Geldsumme auf der Rechnung. Ein Rabatt ist eine Preisermäßigung, ein Vorschuss eine Vorauszahlung.'],
  Bestätigung: [['Anfrage', 'Mahnung', 'Vormerkung'], 'Das Hotel hält die bereits erfolgte Stornierung schriftlich fest. Eine Anfrage würde erst um Auskunft bitten, eine Mahnung eine offene Zahlung einfordern.'],
  Zahlungseingang: [['Zahlungsauftrag', 'Zahlungsziel', 'Zahlungsbeleg'], 'Entscheidend ist, dass das Geld auf dem Konto angekommen ist. Ein Zahlungsauftrag veranlasst die Überweisung erst; ein Zahlungsbeleg ist nur ein Nachweis.'],
  Hausverwaltung: [['Eigentümerversammlung', 'Hausgemeinschaft', 'Mietberatung'], 'Die zuständige Stelle betreut und organisiert dieses Wohnhaus. Die Hausgemeinschaft besteht dagegen aus den Bewohnern; eine Mietberatung bietet Beratung an.'],
  Störung: [['Wartung', 'Umrüstung', 'Stilllegung'], 'Die Anlage funktioniert wegen eines technischen Problems nicht wie vorgesehen. Eine Wartung wäre eine geplante Kontrolle; eine Stilllegung die gezielte Außerbetriebnahme.'],
  Heizkörper: [['Warmwasserspeicher', 'Wasseranschluss', 'Lüfter'], 'Der Heizkörper gibt die Wärme der Heizung an den Raum ab. Ein Warmwasserspeicher hält dagegen warmes Wasser bereit.'],
  überprüft: [['eingestellt', 'ausgetauscht', 'überbrückt'], 'Die Elektrikerin hat die Sicherung kontrolliert und dabei den Fehler entdeckt. Ein Austausch würde bedeuten, dass sie bereits eine andere Sicherung eingesetzt hat.'],
  Geräusch: [['Signal', 'Gespräch', 'Echo'], 'Das Schleudern verursacht einen hörbaren Maschinenschall. Ein Signal hätte die Funktion, eine bestimmte Information oder Warnung zu übermitteln.'],
  Hausmeister: [['Hausverwalter', 'Vermieter', 'Mieter'], 'Hier geht es um praktische Arbeiten im Gebäude, etwa den Austausch von Lampen. Diese Aufgaben übernimmt typischerweise der Hausmeister.'],
  erreichbar: [['abgemeldet', 'abwesend', 'beschäftigt'], 'Die Person kann zu dieser Zeit direkt kontaktiert werden. „Erreichbar“ beschreibt genau diese Kontaktmöglichkeit.'],
  vereinbaren: [['ankündigen', 'bestätigen', 'verschieben'], 'Beide Seiten sollen die genaue Uhrzeit gemeinsam festlegen. „Bestätigen“ setzt dagegen voraus, dass bereits ein Termin vorgeschlagen oder vereinbart wurde.'],
  Zeitfenster: [['Zeitpunkt', 'Zeitraffer', 'Zeitlimit'], 'Zwischen neun und dreizehn Uhr liegt ein Zeitraum mit Anfang und Ende. Ein Zeitpunkt wäre eine einzelne genaue Uhrzeit; ein Zeitlimit eine Höchstdauer oder Frist.'],
  Rückruf: [['Rücktritt', 'Rückzug', 'Rückblick'], 'Die hinterlassene Telefonnummer ermöglicht einen erneuten Anruf. Die anderen Wörter bezeichnen keinen telefonischen Kontakt.'],
  Zugang: [['Zutrittsschutz', 'Auftrag', 'Anspruch'], 'Ohne Schlüssel kann der Handwerker den verschlossenen Raum nicht betreten. Gemeint ist die Möglichkeit, hineinzukommen: Zugang.'],
  aufschließen: [['abschließen', 'aufschlagen', 'ausschließen'], 'Der Schlüssel wird verwendet, um die verschlossene Tür zu öffnen. „Abschließen“ wäre das Gegenteil; „ausschließen“ bedeutet etwa, jemanden nicht teilnehmen zu lassen.'],
  Bescheid: [['Auskunft', 'Antwort', 'Rückmeldung'], 'Die feste Wendung lautet „jemandem Bescheid geben“. Mit den anderen Wörtern müsste man eine andere Verbindung bilden, etwa „eine Antwort geben“.'],
  zuordnen: [['zuweisen', 'übertragen', 'weiterleiten'], 'Die Überweisung muss mit dem passenden Auftrag verbunden werden. „Zuordnen“ stellt diese Beziehung her; „weiterleiten“ würde etwas an eine andere Stelle schicken.'],
  rechtzeitig: [['vorzeitig', 'nachträglich', 'zwischenzeitlich'], 'Man muss früh genug eintreffen, um den Zug noch zu erreichen. „Vorzeitig“ bedeutet dagegen früher als geplant oder vorgesehen.'],
  'subtiler Druck': [['offener Widerstand', 'öffentlicher Protest', 'ausdrücklicher Auftrag'], 'Der Druck ist spürbar, wird aber nicht ausdrücklich ausgesprochen. Genau darin liegt der Unterschied zu einem offenen oder ausdrücklichen Auftrag.'],
  unbeantwortet: [['unbearbeitet', 'unbegründet', 'unverbindlich'], 'Auf die Bitte ist keine Antwort eingegangen. „Unbearbeitet“ bezieht sich auf die Bearbeitung eines Vorgangs, nicht ausdrücklich auf eine fehlende Antwort.'],
  konsequent: [['gelegentlich', 'vorläufig', 'versehentlich'], 'Die Regel wird bewusst und ohne ständige Ausnahmen eingehalten. „Gelegentlich“ würde nur ein Handeln von Zeit zu Zeit beschreiben.'],
  Besprechung: [['Befragung', 'Besichtigung', 'Beurteilung'], 'Gemeint ist ein Treffen, bei dem mehrere Personen Themen gemeinsam besprechen. Eine Besichtigung dient dagegen dazu, einen Ort oder Gegenstand anzusehen.'],
  'Dringende Fragen': [['Allgemeine Hinweise', 'Persönliche Wünsche', 'Unverbindliche Vorschläge'], 'Die sofortige Klärung ist hier entscheidend. Dringende Fragen können nicht bis zum nächsten Arbeitstag warten.'],
  Flexibilitaet: [['Planungssicherheit', 'Anwesenheitspflicht', 'Verbindlichkeit'], 'Gleitzeit lässt unterschiedliche Arbeitszeiten zu und erleichtert so die Betreuung. Das ist Flexibilität, keine Pflicht zur Anwesenheit.'],
  verlaesslicher: [['aufwendiger', 'unverbindlicher', 'kurzfristiger'], 'Feste Absprachen machen die Planung stabiler und besser berechenbar. „Unverbindlicher“ würde bedeuten, dass man sich weniger darauf verlassen kann.'],
  offiziell: [['vorläufig', 'vertraulich', 'mündlich'], 'Die zuständige Stelle muss die Regelung ausdrücklich bestätigen, bevor sie gilt. Eine vorläufige oder vertrauliche Mitteilung ist nicht automatisch eine offizielle Bestätigung.'],
  entsteht: [['besteht', 'entfällt', 'vergeht'], 'Unklare Zuständigkeiten bringen die Mehrarbeit erst hervor. „Entsteht“ beschreibt dieses Neu-Entwickeln; „besteht“ nur einen schon vorhandenen Zustand.'],
  Anfrage: [['Zusage', 'Absage', 'Beschwerde'], 'Es wird um eine Information oder Antwort gebeten. Eine Zusage wäre bereits eine positive Entscheidung, eine Absage eine Ablehnung.'],
  'nach Feierabend': [['während der Dienstzeit', 'vor Arbeitsbeginn', 'in der Mittagspause'], 'Die berufliche Arbeit ist für diesen Tag beendet; nun beginnt die private Zeit. Eine Mittagspause liegt dagegen innerhalb des Arbeitstages.'],
  'vorsichtig an': [['ausdrücklich ab', 'vollständig aus', 'öffentlich durch'], 'Das heikle Thema wird behutsam angesprochen. Die trennbare Verbindung lautet „etwas vorsichtig ansprechen“.'],
  skeptisch: [['überzeugt', 'zuständig', 'erleichtert'], 'Fehlende Belege lassen die Person noch zweifeln. „Überzeugt“ würde dagegen bedeuten, dass die Zweifel schon ausgeräumt sind.'],
  'klare Grenzen': [['häufige Ausnahmen', 'offene Zusagen', 'lockere Gewohnheiten'], 'Es braucht eindeutige Regeln dafür, wann die Arbeit endet. Häufige Ausnahmen würden diese Abgrenzung wieder aufweichen.'],
  Zusammenarbeit: [['Zuständigkeit', 'Anwesenheit', 'Mehrarbeit'], 'Mehrere Menschen arbeiten gemeinsam an einer Aufgabe. „Zuständigkeit“ beschreibt dagegen, wer für etwas verantwortlich ist.'],
  Vorgesetzter: [['Vertreter', 'Bewerber', 'Nachfolger'], 'Die Person darf über Arbeitszeiten entscheiden und Weisungen geben. Diese Entscheidungsbefugnis kennzeichnet einen Vorgesetzten.'],
  nachvollziehen: [['durchsetzen', 'zurücknehmen', 'vorwegnehmen'], 'Nach der Erklärung werden die Gründe verständlich. „Durchsetzen“ hieße dagegen, eine Entscheidung trotz Widerstands zu verwirklichen.'],
  erfordern: [['ermöglichen', 'verhindern', 'ersetzen'], 'Die neuen Regeln machen eine Anpassung notwendig. „Ermöglichen“ würde nur ausdrücken, dass eine Anpassung möglich wird.'],
  erheblich: [['geringfügig', 'vorübergehend', 'schätzungsweise'], 'Die Veränderung ist deutlich und nicht nur gering. „Vorübergehend“ beschreibt dagegen die Dauer, nicht das Ausmaß.'],
  verbindlich: [['unverbindlich', 'vorsorglich', 'beiläufig'], 'Die Zusage soll fest gelten und bei der Planung berücksichtigt werden können. Eine unverbindliche Mitteilung lässt eine spätere Änderung ausdrücklich offen.'],
  'transparent dokumentiert': [['vertraulich behandelt', 'mündlich weitergegeben', 'vorläufig zurückgestellt'], 'Alle sollen die Gründe anhand der Unterlagen nachvollziehen können. Eine nur mündliche oder vertrauliche Behandlung erfüllt diese Anforderung nicht.'],
  'sachliche Argumente': [['persönliche Vorwürfe', 'unbelegte Behauptungen', 'pauschale Urteile'], 'Faktenbezogene Gründe tragen zur Lösung bei. Persönliche Vorwürfe richten sich dagegen gegen die Person statt gegen die Sache.'],
  'grundsätzliche Ablehnung': [['vorläufige Zustimmung', 'bedingte Zusage', 'ausdrückliche Billigung'], 'Die Idee wird allgemein zurückgewiesen, nicht nur in Einzelheiten kritisiert. Eine bedingte Zusage würde dagegen eine Möglichkeit zur Einigung offenlassen.'],
}
const healthExercises = {
  'zunehmend erschöpft': ['Trotz immer längerer Ruhepausen fühlt sich Jonas von Woche zu Woche ___.', ['auffallend ausgeruht', 'unverändert leistungsfähig', 'vollständig erholt'], '„Zunehmend“ beschreibt eine Verstärkung im Verlauf der Zeit. Die wachsende Müdigkeit trotz Ruhepausen passt zu „zunehmend erschöpft“.'],
  'schleppt er sich': ['Er hat kaum noch Kraft und jeder Schritt fällt ihm schwer. Trotzdem ___ zur Arbeit.', ['läuft er mühelos', 'eilt er voller Energie', 'fährt er entspannt'], '„Sich schleppen“ betont, dass eine Bewegung große Mühe kostet. Genau diese Anstrengung wird durch die fehlende Kraft beschrieben.'],
  'für unzuverlässig halten': ['Er möchte seine Zusagen immer einhalten, weil er Angst hat, dass seine Kollegen ihn sonst ___.', ['für besonders belastbar halten', 'mit weiteren Aufgaben betrauen', 'für unverzichtbar erklären'], 'Seine Sorge ist eine negative Bewertung: Andere könnten glauben, dass man sich nicht auf ihn verlassen kann. „Unverzichtbar“ würde dagegen bedeuten, dass man ihn unbedingt braucht.'],
  'sich krankschreiben lässt': ['Für die Arbeitsunfähigkeit braucht er eine ärztliche Bescheinigung. Deshalb ist es wichtig, dass er ___.', ['sich beruflich beraten lässt', 'sich freiwillig versetzen lässt', 'sich erneut einarbeiten lässt'], 'Eine Krankschreibung bestätigt die Arbeitsunfähigkeit durch einen Arzt. Eine berufliche Beratung oder Versetzung ersetzt diese Bescheinigung nicht.'],
  'Verantwortung trägt': ['Die Projektleiterin muss für die Folgen ihrer Entscheidungen einstehen, weil sie für das gesamte Projekt ___.', ['Urlaub beantragt', 'Abstand hält', 'Zeit gewinnt'], 'Wer Verantwortung trägt, muss Entscheidungen und deren Folgen vertreten. Es geht hier um Zuständigkeit und Rechenschaft, nicht um eine Pause oder zeitlichen Spielraum.'],
  'weist ihn jedoch darauf hin': ['Er hält die Beschwerden für harmlos. Die Ärztin ___, dass eine Untersuchung notwendig ist.', ['bestätigt ihm ohne Einschränkung', 'versichert ihm das Gegenteil', 'verspricht ihm vorschnell'], 'Die Ärztin macht ihn auf einen wichtigen Punkt aufmerksam und widerspricht seiner Verharmlosung. Die Verbindung lautet „jemanden darauf hinweisen, dass …“.'],
  'ernst genommen werden': ['Diese wiederkehrenden Warnsignale dürfen nicht als Kleinigkeit abgetan werden, sondern müssen ___.', ['bewusst übergangen werden', 'grundsätzlich verharmlost werden', 'unbemerkt geblieben sein'], 'Warnsignale ernst zu nehmen heißt, ihre Bedeutung anzuerkennen und angemessen darauf zu reagieren. „Verharmlosen“ und „übergehen“ drücken das Gegenteil aus.'],
  'rät ihm dazu': ['Er fragt die Ärztin nach einer Empfehlung für die nächste Woche. Sie ___, sich vorübergehend zu schonen.', ['wirft ihm vor', 'hält ihn davon ab', 'sieht darüber hinweg'], '„Jemandem dazu raten, etwas zu tun“ ist eine Empfehlung. Ein Vorwurf wäre eine Kritik an einem vergangenen Verhalten.'],
  'auf zusätzliche Aufgaben zu verzichten': ['Seine vereinbarte Arbeit erledigt er weiter. Zur Entlastung beschließt er aber, ___.', ['weitere Dienste zu übernehmen', 'neue Projekte zu beginnen', 'freiwillige Vertretungen anzunehmen'], '„Verzichten auf + Akkusativ“ bedeutet, etwas bewusst nicht in Anspruch zu nehmen oder nicht zu tun. Hier lehnt er zusätzliche Arbeit ab, ohne seine reguläre Arbeit aufzugeben.'],
  'reagiert zunächst zurückhaltend': ['Sie ist noch unsicher und möchte sich nicht sofort festlegen. Auf den Vorschlag ___.', ['stimmt sie sofort begeistert zu', 'lehnt sie endgültig und entschieden ab', 'legt sie sich umgehend verbindlich fest'], '„Zurückhaltend“ bedeutet hier vorsichtig und ohne sofortige Festlegung. Es ist weder eine begeisterte Zustimmung noch eine eindeutige endgültige Ablehnung.'],
  'sich eingestehen': ['Obwohl er es lange verdrängt hat, muss er nun ___, dass er Unterstützung braucht.', ['sich vormachen', 'sich einreden', 'sich bestätigen lassen'], '„Sich etwas eingestehen“ heißt, eine unangenehme Wahrheit vor sich selbst anzuerkennen. „Sich etwas vormachen“ wäre dagegen Selbsttäuschung.'],
  Leistungsfähigkeit: ['Es geht nicht darum, wie lange sie im Büro sitzt, sondern wie viel sie konzentriert und zuverlässig leisten kann: um ihre ___.', ['Anwesenheitsdauer', 'Arbeitsbereitschaft', 'Dienstzugehörigkeit'], 'Leistungsfähigkeit beschreibt die Fähigkeit, Aufgaben tatsächlich zu bewältigen. Arbeitsbereitschaft ist der Wille dazu; Anwesenheitsdauer nur die im Büro verbrachte Zeit.'],
  'nachgelassen hat': ['Früher konnte er sich eine Stunde konzentrieren, jetzt nur noch zehn Minuten. Das zeigt, dass seine Konzentration ___.', ['zugenommen hat', 'sich gesteigert hat', 'sich gefestigt hat'], '„Nachlassen“ bedeutet schwächer oder geringer werden. Die kürzere Konzentrationsdauer zeigt eine Abnahme, keine Verbesserung.'],
  'kaum noch ansprechbar': ['Nach der Schicht reagiert sie selbst auf einfache Fragen nur noch mühsam und ist ___.', ['sofort wieder einsatzbereit', 'ohne Weiteres belastbar', 'für jede Aufgabe offen'], '„Kaum noch ansprechbar“ beschreibt hier eine so starke Erschöpfung, dass selbst ein Gespräch schwerfällt. Die anderen Optionen würden Einsatzbereitschaft ausdrücken.'],
  'gesundheitliche Belastung': ['Im Gespräch geht es um die Auswirkungen der Arbeit auf Schlaf und Kreislauf, also um ihre ___.', ['fachliche Zuständigkeit', 'berufliche Qualifikation', 'finanzielle Absicherung'], 'Die Folgen für Schlaf und Kreislauf betreffen die Gesundheit. Eine fachliche Zuständigkeit beschreibt dagegen, wer welche Aufgaben übernehmen soll.'],
  'Einzelheiten preiszugeben': ['Er nennt nur den nötigen Grund für seine Abwesenheit, ohne persönliche ___.', ['Grenzen zu respektieren', 'Angaben zurückzuhalten', 'Informationen zu schützen'], '„Etwas preisgeben“ bedeutet, bisher private oder vertrauliche Informationen offenzulegen. Hier sollen die persönlichen Details gerade nicht offengelegt werden.'],
  'Entgegen seiner Befürchtung': ['Er hatte mit einer Ablehnung gerechnet. ___ unterstützt seine Chefin den Vorschlag.', ['Gemäß seiner Erwartung', 'Aufgrund seiner Gewissheit', 'Infolge seiner Überzeugung'], 'Die tatsächliche Reaktion ist das Gegenteil dessen, was er befürchtet hatte. „Entgegen“ kennzeichnet diesen Widerspruch.'],
  'verantwortungsbewusstes Handeln': ['Eigene Fehler offen anzusprechen und ihre Folgen zu begrenzen, ist für sie ___.', ['unbedachtes Vorgehen', 'gleichgültiges Verhalten', 'rücksichtsloses Durchsetzen'], 'Verantwortungsbewusstes Handeln berücksichtigt die Folgen für sich selbst und andere. Offenheit und die Begrenzung möglicher Schäden sind dafür konkrete Beispiele.'],
  'die eigenen Grenzen zu ignorieren': ['Obwohl er deutliche Warnsignale bemerkt, macht er ohne Pause weiter. Damit riskiert er, ___.', ['die eigene Belastbarkeit zu beachten', 'rechtzeitig Unterstützung zu suchen', 'regelmäßige Pausen einzuplanen'], 'Er übergeht die Grenzen seiner Belastbarkeit, obwohl er sie bereits wahrnimmt. „Beachten“ würde das Gegenteil bedeuten: das Verhalten entsprechend anzupassen.'],
  'rechtzeitige Erholung': ['Damit aus ersten Erschöpfungszeichen keine längerfristige Erkrankung wird, braucht sie jetzt ___.', ['zusätzliche Mehrarbeit', 'dauerhafte Erreichbarkeit', 'aufschiebbare Vorsorge'], 'Die Erholung soll früh genug stattfinden, um eine Verschlimmerung zu verhindern. Zusätzliche Arbeit oder dauerhafte Erreichbarkeit würden diese Entlastung gerade verhindern.'],
}
for (const [term, [question, distractors, explanation]] of Object.entries(healthExercises)) vocabulary[term] = [distractors, explanation]

const workExercises = {
  Regelung: ['Die Betriebsvereinbarung legt fest, an welchen Tagen wir zu Hause arbeiten dürfen. Diese ___ gilt für das ganze Team.', ['Vermutung', 'Ausnahme', 'Gewohnheit'], 'Eine Regelung legt verbindlich fest, wie etwas organisiert wird. Eine Gewohnheit beschreibt dagegen nur, was häufig geschieht.'],
  pendelt: ['Er wohnt in Mainz und arbeitet in Frankfurt. Zwischen beiden Städten ___ er an jedem Arbeitstag.', ['verreist', 'übernachtet', 'arbeitet'], '„Pendeln“ bezeichnet den regelmäßigen Weg zwischen Wohnort und Arbeitsplatz. Ein Umzug würde dagegen den Wohnort verändern.'],
  angekündigt: ['Die neue Arbeitszeit gilt erst ab nächstem Monat. Die Leitung hat die Änderung gestern per Rundmail ___.', ['zurückgenommen', 'abgestritten', 'verheimlicht'], 'Eine künftige Änderung wird vorab mitgeteilt, also angekündigt. „Zurücknehmen“ hieße, eine frühere Entscheidung wieder aufzuheben.'],
  Absprachen: ['Wir müssen uns nicht erneut einigen, sondern unsere bereits gemeinsam getroffenen ___ einhalten.', ['Vermutungen', 'Einwände', 'Vorbehalte'], 'Absprachen sind gemeinsam vereinbarte Regelungen. Einwände und Vorbehalte drücken dagegen Bedenken gegen etwas aus.'],
  Anwesenheitspflicht: ['Alle Beschäftigten müssen persönlich im Büro erscheinen; eine freie Wahl gibt es nicht. Es besteht eine ___.', ['Gleitzeitregelung', 'Urlaubsvertretung', 'Rufbereitschaft'], 'Anwesenheitspflicht bedeutet, dass das persönliche Erscheinen vorgeschrieben ist. Rufbereitschaft verlangt nur, bei Bedarf erreichbar und einsatzbereit zu sein.'],
  Belastung: ['Der zusätzliche Arbeitsweg kostet täglich zwei Stunden und verschärft den Zeitdruck. Für die Familie ist das eine erhebliche ___.', ['Entlastung', 'Erleichterung', 'Absicherung'], 'Der Arbeitsweg verursacht zusätzlichen Aufwand und Druck. Er ist deshalb eine Belastung, keine Entlastung oder Erleichterung.'],
  Kompromiss: ['Keine Seite bekommt alles, aber beide geben etwas nach und können die Lösung mittragen. Sie einigen sich auf einen ___.', ['Widerspruch', 'Alleingang', 'Vorbehalt'], 'Bei einem Kompromiss machen beide Seiten Zugeständnisse. Ein Alleingang wäre dagegen eine Entscheidung ohne gemeinsame Einigung.'],
  zurückhaltend: ['Er sagt weder sofort zu noch endgültig ab, weil er den Vorschlag erst prüfen möchte. Seine Reaktion ist ___.', ['entschlossen', 'begeistert', 'zustimmend'], 'Zurückhaltung bedeutet hier, sich noch nicht festzulegen. Eine begeisterte oder entschlossene Zustimmung wäre bereits eine klare Position.'],
  Voraussetzung: ['Ohne dokumentierte Ergebnisse wird das Modell nicht verlängert. Die Dokumentation ist daher eine notwendige ___.', ['Folge', 'Auswirkung', 'Nebenerscheinung'], 'Eine Voraussetzung muss erfüllt sein, damit etwas anderes möglich wird. Eine Folge entsteht dagegen erst als Ergebnis.'],
  durchsetzen: ['Trotz des Widerstands will sie ihren eigenen Vorschlag gegen die anderen ___.', ['zurücknehmen', 'aufgeben', 'anzweifeln'], '„Etwas durchsetzen“ heißt, eine Forderung oder einen Vorschlag trotz Widerstands zu verwirklichen. Aufgeben oder Zurücknehmen würde das Gegenteil bedeuten.'],
}
for (const [term, [question, distractors, explanation]] of Object.entries(workExercises)) vocabulary[term] = [distractors, explanation]

const vocabularyQuestions = {
  reklamieren: 'Die neue Kaffeemaschine ist undicht. Beim Händler möchte ich diesen Mangel ___ und eine Lösung verlangen.',
  Originalverpackung: 'Den Karton, in dem das Handy beim Kauf lag, habe ich weggeworfen. Mir fehlt deshalb die ___.',
  Rückerstattung: 'Ich möchte kein Guthaben für den nächsten Einkauf, sondern mein Geld zurück. Ich bitte daher um eine ___.',
  erstatten: 'Die bereits doppelt abgebuchte Gebühr überweisen wir Ihnen zurück: Wir werden sie vollständig ___.',
  Geräusch: 'Die Maschine sendet kein Warnsignal; beim Schleudern ist aber ein ungewöhnliches Rattern zu hören. Dieses ___ gab es vorher nicht.',
  erreichbar: 'Mein Telefon ist eingeschaltet und ich nehme Anrufe an; zwischen zehn und zwölf Uhr bin ich direkt ___.',
  'unterscheiden sich': 'Das eine Angebot kostet 20 Euro, das andere 35 Euro pro Monat. Die Angebote ___ also beim Preis.',
  konsequent: 'Auch wenn eine Ausnahme bequem wäre, hält sie sich ___ an die vereinbarte Regel.',
  unbeantwortet: 'Ich habe um eine schriftliche Rückmeldung gebeten, aber keine Antwort erhalten. Meine Bitte blieb ___.',
  entsteht: 'Weil bisher niemand für diese neue Aufgabe zuständig war, ___ nun zusätzlicher Abstimmungsbedarf.',
  offiziell: 'Die Leitung hat den Beschluss unterschrieben und veröffentlicht; die Änderung wurde damit ___ bestätigt.',
  Anfrage: 'Ich weiß noch nicht, ob ein Termin frei ist, und schicke deshalb eine ___ an die Praxis.',
  verbindlich: 'Wir planen fest mit Ihrer Teilnahme. Bitte sagen Sie uns deshalb ___ zu.',
}

export function getReviewedVocabulary(term) {
  const entry = vocabulary[term]
  return entry ? { distractors: entry[0], question: healthExercises[term]?.[0] || workExercises[term]?.[0] || vocabularyQuestions[term] } : null
}

export function reviseVocabulary(item) {
  const correct = item.options?.[item.answer]
  const entry = vocabulary[correct]
  if (!entry) return item
  const options = [...entry[0]]
  options.splice(item.answer, 0, correct)
  return { ...item, question: healthExercises[correct]?.[0] || workExercises[correct]?.[0] || vocabularyQuestions[correct] || item.question, options, explanation: entry[1] }
}

// Replace malformed distractors with real German forms and disambiguating contexts.
const grammarRevisions = [
  ['Seit drei Wochen ___ wir auf eine Antwort.', 'Wir haben vor drei Wochen angefragt und ___ noch immer auf eine Antwort.', ['warteten', 'gewartet', 'warten', 'wartet'], 2, '„Noch immer“ zeigt, dass der Zustand jetzt andauert. Das Subjekt „wir“ verlangt die Präsensform „warten“.'],
  ['Wenn ich mehr Zeit ___, würde ich ausführlicher antworten.', 'Leider fehlt mir die Zeit. Wenn ich mehr Zeit ___, würde ich ausführlicher antworten.', ['habe', 'hatte', 'hätte', 'hätten'], 2, 'Es geht um eine gegenwärtige, nicht erfüllte Bedingung. Dafür steht der Konjunktiv II: Wenn ich mehr Zeit hätte, würde ich ausführlicher antworten.'],
  ['Seit Montag ___ der Heizkörper nicht richtig warm.', 'Der Heizkörper ist noch immer kalt. Seit Montag ___ er trotz laufender Heizung nicht richtig warm.', ['wurde', 'geworden', 'wird', 'werden'], 2, 'Der Zustand dauert bis jetzt an, deshalb steht das Präsens. Das Subjekt „er“ ist Singular: er wird nicht richtig warm.'],
  ['Meine Nachbarin könnte öffnen, wenn sie morgen Zeit ___.', 'Meine Nachbarin hat morgen leider keine Zeit. Sie könnte öffnen, wenn sie Zeit ___.', ['hätte', 'hatte', 'habe', 'hätten'], 0, 'Die Bedingung ist nicht erfüllt. Deshalb verwendet man den Konjunktiv II; zu „sie“ im Singular gehört „hätte“.'],
  ['Wenn das Modell verfügbar ___, würde ich es direkt mitnehmen.', 'Leider ist das Modell ausverkauft. Wenn es verfügbar ___, würde ich es direkt mitnehmen.', ['ist', 'wäre', 'war', 'wären'], 1, 'Das Modell ist tatsächlich nicht verfügbar. Der Konjunktiv II drückt diese nicht erfüllte Bedingung aus: wenn es verfügbar wäre.'],
  ['Ich räume den Bereich frei, ___ der Techniker an das Ventil kommt.', 'Der Techniker soll das Ventil erreichen können. Ich räume den Bereich frei, ___ er an das Ventil kommt.', ['obwohl', 'sodass nicht', 'trotzdem', 'damit'], 3, 'Das Freiräumen hat einen Zweck: Der Techniker soll an das Ventil gelangen. Ein beabsichtigter Zweck wird hier mit „damit“ ausgedrückt.'],
]
export function reviseGrammar(item) {
  const revision = grammarRevisions.find(entry => entry[0] === item.question)
  return revision ? { ...item, question: revision[1], options: revision[2], answer: revision[3], explanation: revision[4] } : item
}
