const present = 'Personalendungen'
const esse = 'esse'
const cases = 'Nominativ & Akkusativ'

function question(topic, prompt, example, answer, explanation, options) {
  return { topic, prompt, example, answer, explanation, options }
}

const training = [
  question(present, 'Welche Endung steht für „wir“?', '1. Person Plural', '-mus', 'Die 1. Person Plural endet auf -mus, zum Beispiel salutamus.', ['-tis', '-mus', '-nt']),
  question(present, 'Welche Person erkennst du an -s?', 'properas', 'du', 'Die Endung -s zeigt die 2. Person Singular an.', ['ich', 'ihr', 'du']),
  question(present, 'Ergänze nur die Personalendung für „ihr“.', 'tace___', 'tis', 'Mit -tis wird daraus tacetis („ihr schweigt“).'),
  question(esse, 'Setze die passende Form von esse ein.', 'Ibi ___. · Dort bin ich.', 'sum', '„Ich bin“ heißt sum.', ['sum', 'es', 'est']),
  question(esse, 'Schreibe „wir sind“ auf Latein.', 'esse · 1. Person Plural', 'sumus', 'Die Form für „wir sind“ lautet sumus.'),
  question(cases, 'Bilde den Akkusativ Singular.', 'amica · die Freundin', 'amicam', 'In der a-Deklination wird aus -a im Akkusativ Singular -am.', ['amicum', 'amicam', 'amicas']),
  question(cases, 'Bilde den Akkusativ Plural.', 'servus · der Diener', 'servos', 'Die maskuline o-Deklination bildet den Akkusativ Plural mit -os.'),
  question(cases, 'Bilde den Nominativ Plural.', 'villa · das Landhaus', 'villae', 'Der Nominativ Plural der a-Deklination endet auf -ae.'),
  question(cases, 'Welches Wort ist das Akkusativobjekt?', 'Serva equum exspectat.', 'equum', 'Wen erwartet die Dienerin? Das Pferd. equum ist daher das Objekt.', ['Serva', 'equum', 'exspectat']),
  question(cases, 'Bilde den Akkusativ Plural.', 'donum · das Geschenk', 'dona', 'Bei donum lauten Nominativ und Akkusativ im Plural gleich: dona.'),
  question(present, 'Setze den Satz ins „wir“. Schreibe nur die neue Verbform.', 'Nunc properat. → Nunc ___.', 'properamus', 'properat bedeutet „er/sie eilt“. Für „wir eilen“ setzt du -mus an propera-.'),
  question(present, 'Schreibe „ich begrüße“ als eine lateinische Verbform.', 'salutare', 'saluto', 'Bei salutare wird aus saluta- mit der Endung -o die Form saluto.'),
  question(present, 'Ergänze die Verbform für das Subjekt amici.', 'Amici subito ___. · Die Freunde lachen plötzlich.', 'rident', 'amici ist Nominativ Plural. ridere steht deshalb in der 3. Person Plural: rident.'),
  question(esse, 'Wechsle von „du“ zu „ihr“. Schreibe nur die neue Verbform.', 'Ibi es. → Ibi ___.', 'estis', 'es heißt „du bist“. Die Form für „ihr seid“ lautet estis.'),
  question(esse, 'Ergänze die passende Form von esse.', 'Dona ibi ___. · Die Geschenke sind dort.', 'sunt', 'dona ist hier das Subjekt im Plural. Dazu passt sunt.'),
  question(cases, 'Bestimme Kasus und Numerus von dona.', 'Dona servus apportat.', 'Akkusativ Plural', 'servus bringt etwas. dona beantwortet „Was bringt er?“ und ist daher Akkusativ Plural.', ['Nominativ Plural', 'Akkusativ Singular', 'Akkusativ Plural']),
  question(cases, 'Bestimme Kasus und Numerus von silentium.', 'Silentium est.', 'Nominativ Singular', 'Was ist da? Stille. silentium ist hier das Subjekt im Nominativ Singular.', ['Akkusativ Singular', 'Nominativ Singular', 'Nominativ Plural']),
  question(cases, 'Setze das Objekt in den Plural. Schreibe nur dieses Wort.', 'Matrona servam salutat.', 'servas', 'Das Objekt bleibt im Akkusativ. In der a-Deklination wechselt -am zu -as.'),
  question(cases, 'Wer begrüßt wen?', 'Servum salutant amicae.', 'Die Freundinnen begrüßen den Diener.', 'amicae ist das Subjekt im Nominativ Plural. servum ist das Akkusativobjekt.', ['Der Diener begrüßt die Freundinnen.', 'Die Freundinnen begrüßen den Diener.', 'Die Freundin begrüßt die Diener.']),
  question(cases, 'Ergänze das Objekt im Singular.', 'Servi ___ timent. · Die Diener fürchten den Esel.', 'asinum', 'asinus ist maskulin. Im Akkusativ Singular wird -us zu -um.'),
]

const medium = [
  question(present, 'Welche Endung passt zu „du“?', '2. Person Singular', '-s', 'Die 2. Person Singular trägt -s.', ['-t', '-s', '-tis']),
  question(present, 'Schreibe „wir rufen“ als eine lateinische Verbform.', 'clamare', 'clamamus', 'clama- + -mus ergibt clamamus.'),
  question(present, 'Ergänze nur die Personalendung.', 'Equi sta___. · Die Pferde stehen.', 'nt', 'equi steht hier im Plural. Die 3. Person Plural hat die Endung -nt.'),
  question(esse, 'Schreibe „du bist“ auf Latein.', 'esse · 2. Person Singular', 'es', '„Du bist“ heißt es.'),
  question(esse, 'Wähle die passende Form.', 'Ibi ___. · Dort seid ihr.', 'estis', '„Ihr seid“ ist die 2. Person Plural: estis.', ['es', 'sunt', 'estis']),
  question(cases, 'Bilde den Akkusativ Singular.', 'familia · die Familie', 'familiam', 'Die a-Deklination hat im Akkusativ Singular die Endung -am.'),
  question(cases, 'Bilde den Nominativ Plural.', 'amicus · der Freund', 'amici', 'Maskuline Wörter der o-Deklination enden im Nominativ Plural auf -i.'),
  question(cases, 'Bilde den Akkusativ Plural.', 'matrona · die Frau', 'matronas', 'Die a-Deklination bildet den Akkusativ Plural mit -as.'),
  question(cases, 'Welches Wort ist das Akkusativobjekt?', 'Amicus donum apportat.', 'donum', 'Was bringt der Freund? Das Geschenk. donum ist das Akkusativobjekt.', ['amicus', 'donum', 'apportat']),
  question(cases, 'Bestimme Kasus und Numerus von dona.', 'Dona iacent.', 'Nominativ Plural', 'Die Geschenke liegen da. dona ist das Subjekt im Nominativ Plural.', ['Akkusativ Plural', 'Akkusativ Singular', 'Nominativ Plural']),
]

const hard = [
  question(present, 'Bilde die Verbform für „ihr wartet“.', 'exspectare', 'exspectatis', 'exspecta- + -tis ergibt exspectatis.'),
  question(present, 'Wechsle von „sie“ (Plural) zu „ich“. Schreibe nur die neue Verbform.', 'Nunc gaudent. → Nunc ___.', 'gaudeo', 'gaudent bedeutet „sie freuen sich“. gaudeo mit der Endung -o bedeutet „ich freue mich“.'),
  question(present, 'Schreibe die passende Form des Verbs.', 'Amicae cito ___. · Die Freundinnen kommen schnell. (venire)', 'veniunt', 'Amicae ist Plural. Die 3. Person Plural von venire lautet veniunt.'),
  question(esse, 'Wechsle vom Singular zum Plural. Schreibe nur die neue Verbform.', 'Ibi sum. → Ibi ___.', 'sumus', 'Aus „ich bin“ (sum) wird „wir sind“ (sumus).'),
  question(esse, 'Ergänze die passende Form von esse.', 'Ibi asinus ___. · Dort ist ein Esel.', 'est', 'asinus ist hier Singular. Die 3. Person Singular von esse lautet est.'),
  question(cases, 'Setze das Objekt in den Plural. Schreibe nur dieses Wort.', 'Servus equum exspectat.', 'equos', 'equum ist das Objekt im Akkusativ Singular. Im Akkusativ Plural steht equos.'),
  question(cases, 'Welche Form braucht das Objekt?', 'Servi ___ salutant. · Die Diener begrüßen die Freundinnen.', 'amicas', '„Die Freundinnen“ ist das Objekt im Plural. Die a-Deklination verlangt -as.', ['amicae', 'amicam', 'amicas']),
  question(cases, 'Wer fürchtet wen?', 'Equum timent asini.', 'Die Esel fürchten das Pferd.', 'asini ist das Subjekt im Nominativ Plural. equum ist das Objekt.', ['Das Pferd fürchtet die Esel.', 'Die Esel fürchten das Pferd.', 'Der Esel fürchtet die Pferde.']),
  question(cases, 'Welche Funktion hat dona im ersten und im zweiten Satz?', 'Dona ibi sunt. / Dona apportamus.', 'Subjekt → Akkusativobjekt', 'Im ersten Satz sind die Geschenke das Subjekt. Im zweiten steckt „wir“ in -mus und dona beantwortet „Was bringen wir?“', ['Akkusativobjekt → Subjekt', 'Subjekt → Akkusativobjekt', 'In beiden Sätzen Subjekt']),
  question(cases, 'Setze den Satz in den Plural. Schreibe den ganzen lateinischen Satz.', 'Serva donum apportat. · Die Dienerinnen bringen Geschenke.', 'servae dona apportant', 'Subjekt: servae. Objekt: dona. Verb zur 3. Person Plural: apportant.'),
]

const extraTraining = [
  question(present, 'Ergänze die Personalendung für „er“.', 'clama___', 't', 'clama- + -t ergibt clamat. -t steht für die 3. Person Singular.'),
  question(present, 'Schreibe „ihr lacht“ auf Latein.', 'ridere', 'ridetis', 'ride- + -tis ergibt ridetis.'),
  question(present, 'Wähle die Form für „du wartest“.', 'exspectare', 'exspectas', 'An -s erkennst du die 2. Person Singular.', ['exspectat', 'exspectas', 'exspectatis']),
  question(present, 'Welche Person steckt in apportamus?', 'apportare · bringen', 'wir', '-mus steht für die 1. Person Plural.', ['ihr', 'sie (Plural)', 'wir']),
  question(esse, 'Wie heißt „ich bin“?', 'esse', 'sum', 'Die 1. Person Singular von esse lautet sum.'),
  question(esse, 'Wie heißt „sie sind“?', 'esse · Mehrzahl', 'sunt', 'In der 3. Person Plural steht sunt.'),
  question(cases, 'Bilde den Akkusativ Singular.', 'matrona', 'matronam', 'Die a-Deklination bildet den Akkusativ Singular mit -am.'),
  question(cases, 'Bilde den Nominativ Plural.', 'asinus', 'asini', 'Maskuline Wörter der o-Deklination haben hier -i.'),
  question(cases, 'Bilde den Akkusativ Plural.', 'amica', 'amicas', 'Die a-Deklination bildet den Akkusativ Plural mit -as.'),
  question(cases, 'Bilde den Akkusativ Singular.', 'silentium', 'silentium', 'Beim Neutrum sind Nominativ und Akkusativ gleich.'),
  question(present, 'Ersetze „ihr“ durch „wir“. Schreibe nur das Verb.', 'Tum clamatis. → Tum ___.', 'clamamus', 'Tausche -tis gegen -mus.'),
  question(present, 'Ergänze das Verb im Präsens.', 'Matronae cito ___. · Die Frauen eilen schnell. (properare)', 'properant', 'Matronae steht im Plural. properant ist die 3. Person Plural.'),
  question(present, 'Schreibe „ich warte“ auf Latein.', 'exspectare', 'exspecto', 'Die Form der 1. Person Singular lautet exspecto.'),
  question(esse, 'Ersetze „wir“ durch „du“. Schreibe nur das Verb.', 'Ibi sumus. → Ibi ___.', 'es', 'sumus steht für „wir sind“, es für „du bist“.'),
  question(esse, 'Ergänze die Form von esse.', 'Ibi equi ___. · Dort sind Pferde.', 'sunt', 'equi steht im Nominativ Plural und braucht sunt.'),
  question(cases, 'Welches Wort ist das Akkusativobjekt?', 'Amicam servae salutant.', 'amicam', 'amicam beantwortet „Wen begrüßen die Dienerinnen?“', ['amicam', 'servae', 'salutant']),
  question(cases, 'Setze nur das Objekt in den Plural.', 'Amicus asinum timet.', 'asinos', 'Aus -um im Akkusativ Singular wird -os im Akkusativ Plural.'),
  question(cases, 'Setze nur das Subjekt in den Plural.', 'Serva donum apportat.', 'servae', 'Das Subjekt bleibt im Nominativ. Die Pluralendung lautet -ae.'),
  question(cases, 'Welche Rolle hat donum?', 'Donum iacet.', 'Subjekt', 'Was liegt da? Das Geschenk. donum ist hier das Subjekt.', ['Akkusativobjekt', 'Subjekt', 'Prädikat']),
  question(cases, 'Welche Rolle hat donum?', 'Donum apportatis.', 'Akkusativobjekt', 'In apportatis steckt „ihr“. donum beantwortet „Was bringt ihr?“', ['Subjekt', 'Prädikat', 'Akkusativobjekt']),
]

const quick = [
  question(present, 'Bilde die Form für „wir schweigen“.', 'tacere', 'tacemus', 'tace- + -mus ergibt tacemus.'),
  question(esse, 'Ergänze die Form von esse.', 'Ibi ___. · Dort bist du.', 'es', 'In der 2. Person Singular lautet die Form es.'),
  question(cases, 'Bilde den Akkusativ Plural.', 'villa', 'villas', 'Die a-Deklination hat im Akkusativ Plural -as.'),
  question(cases, 'Bestimme Kasus und Numerus von dona.', 'Dona apportatis.', 'Akkusativ Plural', 'Ihr bringt die Geschenke. dona ist das Objekt und steht im Plural.', ['Nominativ Plural', 'Akkusativ Plural', 'Akkusativ Singular']),
  question(present, 'Ergänze die passende Verbform.', 'Servi familiam ___. · Die Diener begrüßen die Familie. (salutare)', 'salutant', 'Servi steht im Plural. Die passende Endung ist -nt.'),
]

export const rounds = {
  training: { kind: 'training', title: 'Endungen trainieren', questions: training, detail: '20 Aufgaben · 10 mittel, 10 schwer', description: 'Übe mit Merkhilfe und einer Erklärung nach jeder Antwort.' },
  extra: { kind: 'training', title: 'Endungen vertiefen', questions: extraTraining, detail: '20 neue Aufgaben · 10 mittel, 10 schwer', description: 'Wechsle die Person und bestimme die Rolle eines Worts im Satz.' },
  quick: { title: 'Kurztest · Endungen', questions: quick, detail: '5 Aufgaben', description: 'Prüfe in einer kurzen Runde, welche Endungen du schon sicher kannst.' },
  medium: { title: 'Probetest · Mittel', questions: medium, detail: '10 Aufgaben', description: 'Erkenne Endungen und bilde passende Formen.' },
  hard: { title: 'Probetest · Schwer', questions: hard, detail: '10 Aufgaben', description: 'Wechsle zwischen Formen und bestimme ihre Rolle im Satz.' },
}

function normalize(answer) {
  return answer.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '')
    .trim().replace(/^[-–−]/, '').replace(/[.!?]+$/, '').replace(/\s+/g, ' ')
}

export function isCorrect(question, answer) {
  const normalized = normalize(answer)
  if (question.answer === 'servae dona apportant') {
    return ['servae dona apportant', 'servae apportant dona', 'dona servae apportant',
      'dona apportant servae', 'apportant servae dona', 'apportant dona servae'].includes(normalized)
  }
  return normalized === normalize(question.answer)
}
