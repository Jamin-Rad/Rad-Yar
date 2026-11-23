const q=(topic,prompt,example,answer,explanation,options)=>({topic,prompt,example,answer,explanation,options})
const people=['ich','du','er/sie/es','wir','ihr','sie (Plural)']
const verbs=[['salutare','begrüßen',['saluto','salutas','salutat','salutamus','salutatis','salutant']],['exspectare','warten',['exspecto','exspectas','exspectat','exspectamus','exspectatis','exspectant']],['timere','fürchten',['timeo','times','timet','timemus','timetis','timent']],['venire','kommen',['venio','venis','venit','venimus','venitis','veniunt']],['clamare','rufen',['clamo','clamas','clamat','clamamus','clamatis','clamant']],['parare','vorbereiten',['paro','paras','parat','paramus','paratis','parant']],['esse','sein',['sum','es','est','sumus','estis','sunt']],['audire','hören',['audio','audis','audit','audimus','auditis','audiunt']]]
const verbQuestions=verbs.flatMap(([inf,meaning,forms],v)=>forms.map((answer,i)=>q('Personalendungen',`Bilde die Form für „${people[i]}“. Schreibe nur die Verbform.`,`${inf} · ${meaning}`,answer,`${people[i]}: ${answer}. ${inf==='esse'?'Esse bildet unregelmäßige Formen.':`Personalendung: ${['-o','-s','-t','-mus','-tis','-nt'][i]}.`}`, (v+i)%2 ? undefined : [answer,forms[(i+1)%6],forms[(i+2)%6],forms[(i+3)%6]])))
const nouns=[['amica',['amica','amicam','amicae','amicas']],['serva',['serva','servam','servae','servas']],['villa',['villa','villam','villae','villas']],['provincia',['provincia','provinciam','provinciae','provincias']],['amicus',['amicus','amicum','amici','amicos']],['servus',['servus','servum','servi','servos']],['equus',['equus','equum','equi','equos']],['donum',['donum','donum','dona','dona']],['periculum',['periculum','periculum','pericula','pericula']]]
const cases=['Nominativ Singular','Akkusativ Singular','Nominativ Plural','Akkusativ Plural']
const nounQuestions=nouns.flatMap(([word,forms],n)=>forms.map((answer,i)=>q('Nominativ & Akkusativ',`Bilde den ${cases[i]}.`,word,answer,`${word}: ${cases[i]} lautet ${answer}.${n>6?' Beim Neutrum sind Nominativ und Akkusativ jeweils gleich.':''}`,n%2===0&&n<7?[...forms]:undefined)))
const facts=[
 ['Welche Stadt war das Zentrum des Reiches zur Zeit Hadrians?','Rom','Athen','Karthago','Alexandria','Rom war die Hauptstadt des Römischen Reiches.'],
 ['Wie heißen die Verwaltungsgebiete außerhalb Italiens?','Provinzen','Legionen','Familien','Tempel','Die Gebiete wurden in Provinzen (provinciae) eingeteilt.'],
 ['Was ist ein procurator im Lesetext?','Ein Verwalter oder Statthalter','Ein Reiter','Ein Diener','Ein Händler','Der Statthalter übernimmt Verwaltungsaufgaben; der Text nennt auch Steuern.'],
 ['Wer erwartet Flavius Lepidus?','Kaiser Hadrian','Quintus','Aulus','Galla','Der Bote sagt: Imperator Hadrianus te exspectat.'],
 ['Wohin soll Flavius Lepidus reisen?','Nach Kreta','Nach Spanien','Nach Ägypten','Nach Syrien','Er soll als procurator nach Kreta segeln.'],
 ['Warum freut sich Flavius Lepidus?','Er verwaltet gern eine Provinz.','Er bleibt in Rom.','Er fürchtet das Meer.','Er bekommt ein Pferd.','Er sagt, dass ihm die Verwaltung einer Provinz gefällt.'],
 ['Wie reagiert Caecilia auf den Reiseplan?','Sie fürchtet Gefahr.','Sie lacht.','Sie ruft den Kaiser.','Sie schläft.','Periculum timeo bedeutet: Ich fürchte die Gefahr.'],
 ['Was tun die Diener am Ende?','Sie gehorchen, kommen und bereiten den Wagen vor.','Sie fliehen.','Sie kaufen Seide.','Sie begrüßen Hadrian.','Paremus, venimus und paramus bezeichnen die Tätigkeiten der Diener.'],
 ['Was bedeutet „Servos exspecto“?','Ich erwarte die Diener.','Die Diener erwarten mich.','Du erwartest den Diener.','Wir erwarten die Diener.','Exspecto ist 1. Person Singular; servos ist Akkusativ Plural.'],
 ['Welches Wort ist das Subjekt: „Dona amici apportant“?','amici','dona','apportant','Keines','Amici ist Nominativ Plural: Die Freunde bringen Geschenke. Dona ist das Objekt.'],
 ['Warum ist „dona“ ohne Kontext mehrdeutig?','Nominativ und Akkusativ Plural sind beim Neutrum gleich.','Es ist eine Verbform.','Es kann Singular sein.','Es ist immer Genitiv.','Donum hat im Nominativ und Akkusativ Plural die Form dona.'],
].map(([prompt,answer,...rest],i)=>{const explanation=rest.pop();const opts=[answer,...rest];const k=i%4;return q('Römisches Reich & Textverständnis',prompt,'Nach deinen Buchseiten 22–24 und „Ein Befehl des Kaisers“.',answer,explanation,[...opts.slice(k),...opts.slice(0,k)])})
export const probeRounds=Object.fromEntries([15,15,15,15,15,10,10].flatMap((count,i)=>{
 const id=`probe24-${i+1}`, questions=[...verbQuestions.splice(0,i<5?8:4),...nounQuestions.splice(0,i<5?6:3),...facts.splice(0,i<5?1:3)].map((q,n)=>({q,n})).sort((a,b)=>(a.n*7%count)-(b.n*7%count)).map((x,n)=>({...x.q,options:x.q.options?[...x.q.options.slice(n%4),...x.q.options.slice(0,n%4)]:undefined})), title=i<5?`Übung ${i+1}`:`Prüfung ${i-4}`
 const entry={title,kind:i<5?'training':'test',questions,detail:`${count} Aufgaben`,description:'Ein Versuch und einmalige Fehlerwiederholung.'}
 return [[id,entry],[`${id}-review`,{...entry,title:`${title} · Fehlerwiederholung`}]]
}))

const transferRows=[
 ['Welche Person spricht?','Servos exspecto.','ich','Exspecto endet auf -o: ich erwarte die Diener.',['ich','du','wir','sie (Plural)']],
 ['Ergänze nur das Verb für „ihr“.','Cur non ___? (venire)','venitis','Ihr kommt heißt venitis; veniunt bedeutet sie kommen.'],
 ['Wer ruft wen?','Servas vocat matrona.','Die Herrin ruft die Dienerinnen.','Matrona ist Nominativ Singular, servas Akkusativ Plural.',['Die Herrin ruft die Dienerinnen.','Die Dienerinnen rufen die Herrin.','Die Herrinnen rufen die Dienerin.','Die Dienerin ruft die Herrinnen.']],
 ['Setze nur das Objekt in den Plural.','Amicus donum apportat.','dona','Donum ist Neutrum. Im Akkusativ Plural lautet es dona.'],
 ['Schreibe die Form im Nominativ Singular.','provinciae','provincia','Die Grundform der a-Deklination ist provincia.'],
 ['Welche beiden Kasus kommen ohne Satzkontext infrage?','pericula','Nominativ und Akkusativ Plural','Periculum ist neutral: beide Fälle enden im Plural auf -a.',['Nominativ und Akkusativ Plural','Nominativ und Akkusativ Singular','Nur Akkusativ Singular','Nur Nominativ Plural']],
 ['Ergänze esse.','Servi, ubi ___? · Diener, wo seid ihr?','estis','Die Diener werden mit ihr angesprochen: estis.'],
 ['Schreibe nur das Subjekt.','Servum salutant amicae.','amicae','Amicae sind die handelnden Freundinnen; servum ist das Objekt.'],
 ['Ergänze die passende Objektform.','Serva ___ timet. · Die Dienerin fürchtet die Gefahren.','pericula','Gefahren ist Plural und Objekt: pericula.'],
 ['Ergänze das Verb im Singular.','Amicus ___. · Der Freund hört. (audire)','audit','Amicus ist Singular, deshalb audit; audiunt ist Plural.'],
 ['Welche Übersetzung passt?','Iam paremus.','Wir gehorchen schon.','Paremus kommt von parere und hat die Endung -mus.',['Wir gehorchen schon.','Wir bereiten schon vor.','Ihr gehorcht schon.','Sie gehorchen schon.']],
 ['Welche Übersetzung passt?','Iam paramus.','Wir bereiten schon vor.','Paramus kommt von parare, nicht von parere.',['Wir bereiten schon vor.','Wir gehorchen schon.','Ihr bereitet schon vor.','Du bereitest schon vor.']],
 ['Bestimme den Kasus im Satz.','Dona [amici] apportant.','Nominativ Plural','Wer bringt die Geschenke? Die Freunde.',['Nominativ Plural','Akkusativ Plural','Nominativ Singular','Akkusativ Singular']],
 ['Bestimme den Kasus im Satz.','[Dona] amici apportant.','Akkusativ Plural','Was bringen die Freunde? Geschenke. Dona ist das Objekt.',['Akkusativ Plural','Nominativ Plural','Akkusativ Singular','Nominativ Singular']],
 ['Ergänze nur die Verbform.','Ego pericula non ___. · Ich fürchte Gefahren nicht. (timere)','timeo','Ego bedeutet ich, dazu passt timeo.'],
]
const transfer={title:'Zusatzübung · Endungen im Satz',kind:'training',questions:transferRows.map(([prompt,example,answer,explanation,options])=>q('Anwendung im Satz',prompt,example,answer,explanation,options)),detail:'15 zusätzliche Aufgaben',description:'Freiwillig · bekannte Wörter in neuen Aufgaben.'}
probeRounds['probe24-8']=transfer
probeRounds['probe24-8-review']={...transfer,title:'Zusatzübung · Fehlerwiederholung'}

// Published attempts retain their original question order for grading and review.
function addRound(number, title, kind, questions) {
 const round = {title, kind, questions, detail: questions.length + ' Aufgaben'}
 probeRounds['probe24-' + number] = round
 probeRounds['probe24-' + number + '-review'] = {...round, title: title + ' · Fehlerwiederholung'}
}

const wordGroups = [
 [
  ['eques','der Reiter'], ['statim','sofort'], ['rogare','fragen'], ['unde','woher'],
  ['respondere','antworten'], ['nuntius','der Bote'], ['debere','müssen'], ['ego','ich'],
  ['me','mich'], ['audire','hören'], ['imperator','der Kaiser'], ['tu','du'],
  ['te','dich'], ['iubere','befehlen'], ['hic','hier'],
 ],
 [
  ['in','nach'], ['insula','die Insel'], ['navigare','segeln'], ['valde','sehr'],
  ['provincia','die Provinz'], ['administrare','verwalten'], ['periculum','die Gefahr'],
  ['vocare','rufen'], ['parere','gehorchen'], ['parare','vorbereiten'], ['lacrima','die Träne'],
  ['tenere','halten'], ['apportare','bringen'], ['equus','das Pferd'], ['nunc','jetzt'],
 ],
]
for (const [group, words] of wordGroups.entries()) {
 const questions = words.map(([latin, german], i) => {
  const clue = latin === 'in' ? 'nach (Richtung, mit Akkusativ)' : german
  const explanation = '„' + latin + '“ bedeutet hier „' + german + '“.'
  if (i % 2) return q('Wortschatz · Lektion 3','Schreibe das lateinische Wort.',clue,latin,explanation)
  const choices = [0, 3, 7, 10].map(offset => words[(i + offset) % words.length][1])
  return q('Wortschatz · Lektion 3','Welche Bedeutung passt?',latin,german,explanation,[...choices.slice(i%4), ...choices.slice(0,i%4)])
 })
 addRound(9+group, ['Boten und Befehle','Reise und Verwaltung'][group], 'training', questions)
}

const examVocabulary = [
 [
  ['Unde venis?','Welches deutsche Fragewort passt?','Woher','Wohin','Warum','Wann','Unde fragt nach der Herkunft.'],
  ['Statim responde!','Welches Wort bedeutet „sofort“?','statim'],
  ['Imperator me vocat.','Wen ruft der Kaiser?','mich','dich','uns','euch','Me bezeichnet die sprechende Person als Objekt.'],
  ['Nuntius respondet.','Schreibe den Infinitiv für „antworten“.','respondere'],
  ['Flavius provinciam administrat.','Was tut Flavius mit der Provinz?','Er verwaltet sie.','Er verlässt sie.','Er gründet sie.','Er teilt sie.','Administrare heißt verwalten.'],
  ['Periculum timeo.','Schreibe das lateinische Nomen für „Gefahr“.','periculum'],
 ],
 [
  ['Eques equum videt.','Was bedeutet das erste Wort?','der Reiter','das Pferd','der Wagen','der Kaiser','Eques ist der Reiter, equus das Pferd.'],
  ['Der Kaiser befiehlt.','Schreibe den Infinitiv für „befehlen“.','iubere'],
  ['In insulam navigamus.','Wie reisen wir zur Insel?','mit dem Schiff','zu Pferd','im Wagen','zu Fuß','Navigare heißt segeln oder mit dem Schiff fahren.'],
  ['Die Diener gehorchen.','Schreibe den Infinitiv für „gehorchen“.','parere'],
  ['Valde gaudeo.','Welches Wort gibt valde wieder?','sehr','schon','hier','sofort','Valde verstärkt gaudeo: Ich freue mich sehr.'],
  ['Flavia hält eine Träne zurück.','Schreibe das lateinische Nomen für „Träne“ im Nominativ Singular.','lacrima'],
 ],
]
for (const [i, rows] of examVocabulary.entries()) {
 const vocab = rows.map(([example,prompt,answer,...rest],n) => {
  const explanation = rest.pop() || ('Die gesuchte Form ist „' + answer + '“.')
  const choices = [answer,...rest], shift = (n+i)%4
  return q('Wortschatz · Lektion 3',prompt,example,answer,explanation,rest.length ? [...choices.slice(shift),...choices.slice(0,shift)] : undefined)
 })
 const pool = probeRounds['probe24-'+(6+i)].questions
 const other = ['Personalendungen','Nominativ & Akkusativ','Römisches Reich & Textverständnis'].flatMap(topic=>pool.filter(item=>item.topic===topic).slice(0,2))
 addRound(11+i,'Prüfung '+(i+1),'test',other.flatMap((item,n)=>[item,vocab[n]]))
}
const practicePool = [1,2,3,4,5].flatMap(n=>probeRounds['probe24-'+n].questions)
const verbItems = practicePool.filter(item=>item.topic==='Personalendungen')
const nounItems = practicePool.filter(item=>item.topic==='Nominativ & Akkusativ')
addRound(13,'Personalformen bilden','training',verbItems.slice(0,15))
addRound(14,'Verben und Personen zuordnen','training',verbItems.slice(15,30))
addRound(15,'Kasus und Numerus bestimmen','training',nounItems.slice(0,15))
addRound(16,'Nomen richtig beugen','training',nounItems.slice(15))
addRound(17,'Verbformen und das Römische Reich','training',[...verbItems.slice(30),...practicePool.filter(item=>item.topic.startsWith('Römisches'))])
