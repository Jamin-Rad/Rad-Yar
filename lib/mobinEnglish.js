// Original practice questions based on Mobin's earlier test format and the Unit 2 London word list.
// The source sheets themselves are intentionally not published.
export const MOCK_TESTS = [
  {
    id: 'probe-a', title: 'Probetest A', subtitle: 'London entdecken',
    questions: [
      { id: 'a1', group: 'Übersetze', prompt: 'Statue, Standbild', answer: 'statue', explain: 'A statue is a figure made of stone, metal or another material.' },
      { id: 'a2', group: 'Übersetze', prompt: 'Säule', answer: 'column', explain: 'Nelson’s Column is the tall monument in Trafalgar Square.' },
      { id: 'a3', group: 'Übersetze', prompt: 'Brücke', answer: 'bridge', explain: 'The Millennium Bridge goes across the River Thames.' },
      { id: 'a4', group: 'Übersetze', prompt: 'Aussicht, Ausblick', answer: 'view', explain: 'A view is what you can see from a place.' },
      { id: 'a5', group: 'Übersetze', prompt: 'Kathedrale', answer: 'cathedral', explain: 'St Paul’s Cathedral is a large church in London. Watch the spelling: cathedral.' },
      { id: 'a6', group: 'Complete the sentence', prompt: 'You can see Nelson’s statue at the ___ of the column.', answer: 'top', explain: 'At the top means at the highest point.' },
      { id: 'a7', group: 'Complete the sentence', prompt: 'An ___ paints pictures or performs in the street.', answer: 'artist', explain: 'Artist is the person; art is what they make.' },
      { id: 'a8', group: 'Complete the sentence', prompt: 'You can cross the Thames on the Millennium ___.', answer: 'Bridge', explain: 'A bridge lets people cross a river. Millennium Bridge is a name.' },
      { id: 'a9', group: 'Complete the sentence', prompt: 'A ___ wedding is a wedding in the king’s or queen’s family.', answer: 'royal', explain: 'Royal means königlich; wedding means Hochzeit.' },
      { id: 'a10', group: 'Past tense', prompt: 'Write the simple past of “go”: We ___ to London yesterday.', answer: 'went', explain: 'Go → went is irregular, as in the earlier Vokabeltests.' },
    ],
  },
  {
    id: 'probe-b', title: 'Probetest B', subtitle: 'Unterwegs in London',
    questions: [
      { id: 'b1', group: 'Übersetze', prompt: 'Verkehrsmittel, Transport', answer: 'transport', explain: 'Public transport includes buses and the Tube.' },
      { id: 'b2', group: 'Übersetze', prompt: 'preiswert, billig', answer: 'cheap', explain: 'Cheap describes a low price; it does not mean free.' },
      { id: 'b3', group: 'Übersetze', prompt: 'Taxi (Wort aus der Unit-2-Liste)', answer: 'cab', explain: 'A black cab is a familiar London taxi.' },
      { id: 'b4', group: 'Übersetze', prompt: 'Hochzeit', answer: 'wedding', explain: 'Wedding has two d’s: wed-ding.' },
      { id: 'b5', group: 'Übersetze', prompt: 'Haltestelle, Halt', answer: 'stop', explain: 'A bus stop is where a bus picks up passengers.' },
      { id: 'b6', group: 'Complete the sentence', prompt: 'The Tube is part of London’s public ___.', answer: 'transport', explain: 'The word pair is public transport.' },
      { id: 'b7', group: 'Complete the sentence', prompt: 'The bus ___ near our hotel.', answer: 'stops', explain: 'With “the bus” in the present tense, add -s: stops.' },
      { id: 'b8', group: 'Complete the sentence', prompt: 'Trafalgar Square is in ___ London.', answer: 'central', explain: 'Central means in or near the centre.' },
      { id: 'b9', group: 'Complete the sentence', prompt: 'We want to ___ by train, not by car.', answer: 'travel', explain: 'Travel is the verb “reisen/fahren”; trip is the noun “Reise”.' },
      { id: 'b10', group: 'Past tense', prompt: 'Write the simple past of “see”: We ___ St Paul’s Cathedral yesterday.', answer: 'saw', explain: 'See → saw is irregular.' },
    ],
  },
]

// Each MC item deliberately has four distinct answers and exactly one correct index.
export const WORD_CHALLENGE = [
  { id: 'm01', skill: 'Schreibweise', prompt: 'Welche Schreibweise bedeutet „Kathedrale“?', options: ['cathedrale', 'cathedral', 'catherdral', 'cathedrol'], correct: 1, explain: 'cathedral — nach „cathe“ folgt „dral“.' },
  { id: 'm02', skill: 'Bedeutung', prompt: 'Was ist eine „column“ am Trafalgar Square?', options: ['eine Säule', 'eine Brücke', 'eine Statue', 'eine Treppe'], correct: 0, explain: 'Eine column ist eine Säule; die statue steht oben darauf.' },
  { id: 'm03', skill: 'Schreibweise', prompt: 'Wie schreibt man „Aussicht“ auf Englisch?', options: ['veiw', 'view', 'vieu', 'vieuw'], correct: 1, explain: 'view wird v-i-e-w geschrieben; „veiw“ vertauscht i und e.' },
  { id: 'm04', skill: 'Bedeutung', prompt: 'Was bedeutet „cheap“?', options: ['kostenlos', 'teuer', 'preiswert', 'schnell'], correct: 2, explain: 'Cheap ist preiswert. Kostenlos heißt free.' },
  { id: 'm05', skill: 'Schreibweise', prompt: 'Welche Form bedeutet „Hochzeit“?', options: ['weding', 'wedding', 'weeding', 'weddinng'], correct: 1, explain: 'wedding hat zwei d; weeding bedeutet Unkraut jäten.' },
  { id: 'm06', skill: 'Bedeutung', prompt: 'Welche Wortgruppe bedeutet „öffentliche Verkehrsmittel“?', options: ['public way', 'public transport', 'central transport', 'cheap travel'], correct: 1, explain: 'Public transport umfasst Busse, U-Bahn und andere öffentliche Verkehrsmittel.' },
  { id: 'm07', skill: 'Schreibweise', prompt: 'Welche Schreibweise bedeutet „Statue“?', options: ['statue', 'statuee', 'statu', 'status'], correct: 0, explain: 'statue endet auf -ue; status ist ein anderes Wort.' },
  { id: 'm08', skill: 'Bedeutung', prompt: 'Eine „bridge“ führt dich …', options: ['über einen Fluss', 'in ein Taxi', 'auf eine Hochzeit', 'in eine Schlacht'], correct: 0, explain: 'Eine bridge ist eine Brücke.' },
  { id: 'm09', skill: 'Schreibweise', prompt: 'Welche Form bedeutet „königlich“?', options: ['royel', 'royale', 'royal', 'roial'], correct: 2, explain: 'royal — wie in royal wedding.' },
  { id: 'm10', skill: 'Bedeutung', prompt: 'Was bezeichnet „top“ in „at the top of the column“?', options: ['den Fuß', 'die Mitte', 'die Spitze', 'die Treppe'], correct: 2, explain: 'Top ist die Spitze oder der oberste Teil.' },
  { id: 'm11', skill: 'Schreibweise', prompt: 'Wie schreibt man „Verkehrsmittel/Transport“?', options: ['tranport', 'transport', 'transporte', 'transpot'], correct: 1, explain: 'transport enthält s nach „tran“ und endet auf t.' },
  { id: 'm12', skill: 'Bedeutung', prompt: 'Was ist ein „black cab“?', options: ['ein schwarzer Bus', 'ein schwarzes Taxi', 'eine U-Bahn', 'eine Haltestelle'], correct: 1, explain: 'Cab ist das englische Wort für Taxi.' },
  { id: 'm13', skill: 'Schreibweise', prompt: 'Welche Schreibweise bedeutet „Schlacht“?', options: ['batle', 'battel', 'battle', 'battlle'], correct: 2, explain: 'battle hat zwei t und endet auf -le.' },
  { id: 'm14', skill: 'Bedeutung', prompt: 'Wer ist ein „artist“?', options: ['ein Fahrer', 'ein Künstler', 'ein König', 'ein Besucher'], correct: 1, explain: 'Artist bedeutet Künstler oder Künstlerin.' },
  { id: 'm15', skill: 'Schreibweise', prompt: 'Welche Form bedeutet „zentral“?', options: ['central', 'centrall', 'sentral', 'centeral'], correct: 0, explain: 'central beginnt mit c und endet auf -al.' },
  { id: 'm16', skill: 'Bedeutung', prompt: '„Both bridges“ heißt …', options: ['die beste Brücke', 'beide Brücken', 'zwei Haltestellen', 'alle Brücken'], correct: 1, explain: 'Both meint genau zwei: beide.' },
  { id: 'm17', skill: 'Schreibweise', prompt: 'Welche Schreibweise bedeutet „Brücke“?', options: ['brige', 'bridge', 'bridg', 'brigde'], correct: 1, explain: 'bridge enthält d vor g.' },
  { id: 'm18', skill: 'Bedeutung', prompt: 'Was passt in „a bus ___“?', options: ['battle', 'stop', 'wedding', 'view'], correct: 1, explain: 'Bus stop ist eine Bushaltestelle.' },
  { id: 'm19', skill: 'Schreibweise', prompt: 'Welche Form ist das Verb „reisen“?', options: ['to travell', 'to travele', 'to travel', 'to trabel'], correct: 2, explain: 'to travel hat ein l am Ende; travelled ist die britische Vergangenheitsform.' },
  { id: 'm20', skill: 'Bedeutung', prompt: 'Eine „view“ ist …', options: ['ein Verkehrsmittel', 'eine Aussicht', 'eine Hochzeit', 'eine Haltestelle'], correct: 1, explain: 'View bedeutet Aussicht, Sicht oder Ausblick.' },
  { id: 'm21', skill: 'Schreibweise', prompt: 'Wie schreibt man „billig/preiswert“?', options: ['cheep', 'cheap', 'cheape', 'chep'], correct: 1, explain: 'cheap hat ea; cheep ist ein Vogelgeräusch.' },
  { id: 'm22', skill: 'Bedeutung', prompt: 'Welche Übersetzung passt zu „way“ auf der Vokabelliste?', options: ['Art und Weise', 'Säule', 'Aussicht', 'Künstler'], correct: 0, explain: 'Way kann auch Weg heißen; auf dieser Liste steht „Art und Weise“.' },
  { id: 'm23', skill: 'Schreibweise', prompt: 'Welche Form bedeutet „beide“?', options: ['booth', 'bothe', 'both', 'bouth'], correct: 2, explain: 'both wird b-o-t-h geschrieben.' },
  { id: 'm24', skill: 'Bedeutung', prompt: 'Eine „cathedral“ ist …', options: ['eine Kathedrale', 'eine Statue', 'eine Säule', 'eine Galerie'], correct: 0, explain: 'Eine cathedral ist eine große Kirche, z. B. St Paul’s Cathedral.' },
  { id: 'm25', skill: 'Schreibweise', prompt: 'Welche Form bedeutet „Haltestelle“?', options: ['stop', 'stoop', 'stopp', 'stope'], correct: 0, explain: 'stop hat nur ein p.' },
  { id: 'm26', skill: 'Bedeutung', prompt: 'Was ist „a royal wedding“?', options: ['eine billige Reise', 'eine königliche Hochzeit', 'eine große Schlacht', 'eine zentrale Brücke'], correct: 1, explain: 'Royal = königlich, wedding = Hochzeit.' },
  { id: 'm27', skill: 'Schreibweise', prompt: 'Welche Form bedeutet „Taxi“?', options: ['cab', 'cabb', 'cabe', 'cap'], correct: 0, explain: 'Cab hat nur drei Buchstaben: c-a-b.' },
  { id: 'm28', skill: 'Bedeutung', prompt: 'Welches Wort ergänzt „Tube ___“ für U-Bahn-Station?', options: ['column', 'station', 'battle', 'artist'], correct: 1, explain: 'Tube station ist eine U-Bahn-Station.' },
  { id: 'm29', skill: 'Schreibweise', prompt: 'Welche Form bedeutet „Säule“?', options: ['colum', 'collumn', 'column', 'colomn'], correct: 2, explain: 'column enthält ein stummes n am Ende.' },
  { id: 'm30', skill: 'Bedeutung', prompt: 'Was bedeutet „to travel“, im Gegensatz zu „a trip“?', options: ['die Reise (Nomen)', 'reisen (Verb)', 'die Haltestelle', 'die Aussicht'], correct: 1, explain: 'To travel ist das Verb reisen; a trip ist eine Reise.' },
]

export function isTypedAnswerCorrect(question, response) {
  const clean = value => value.normalize('NFKC').trim().replace(/\s+/g, ' ').toLocaleLowerCase('en')
  return [question.answer, ...(question.accept || [])].some(answer => clean(answer) === clean(response))
}
