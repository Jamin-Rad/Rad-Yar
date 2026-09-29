const L = de => ({ de })
const TOPIC_ID = 'myokardinfarkt-differentialdiagnosen'

const QUESTIONS = [
  {
    id: 'acute-pathway',
    question: 'Thoraxschmerz, Troponinanstieg und ST-Hebung: Was ist der nächste Schritt?',
    options: ['Kardio-MRT als erste Untersuchung', 'Herzkatheterlabor', 'Stressperfusion', 'Kontrolle nach 24 Stunden'],
    correct: 'B',
    explanation: 'Bei ST-Hebung darf die Akutversorgung nicht durch eine CMR verzögert werden. Die sofortige invasive Abklärung hat Vorrang.',
  },
  {
    id: 'ischaemic-lge',
    question: 'Welches LGE-Muster spricht am stärksten für eine ischämische Myokardschädigung?',
    options: ['Subepikardial inferolateral', 'Fleckig basal-septal', 'Subendokardial in einem Koronarterritorium', 'Kein LGE bei apikalem Ballooning'],
    correct: 'C',
    explanation: 'Infarkt-LGE beginnt subendokardial und kann sich je nach Infarkttiefe bis transmural ausbreiten.',
  },
  {
    id: 'takotsubo',
    question: 'Nichtobstruktive Koronarien, apikales Ballooning und typischerweise kein LGE: Welche Diagnose ist am wahrscheinlichsten?',
    options: ['Chronischer Infarkt', 'Takotsubo-Syndrom', 'Kardiale Sarkoidose', 'Amyloidose'],
    correct: 'B',
    explanation: 'Das territoriumsübergreifende Bewegungsmuster in Cine bei typischerweise fehlendem LGE spricht für Takotsubo.',
  },
  {
    id: 'myocarditis',
    question: 'Welche Kombination passt am besten zu einer akuten Myokarditis?',
    options: ['Subendokardiales LGE ohne Ödem', 'Subepikardiales LGE plus T2-Ödem', 'Transmurales LGE im LAD-Territorium', 'Apikale Wandverdünnung ohne Ödem'],
    correct: 'B',
    explanation: 'Myokarditis zeigt typischerweise ein nichtischämisches subepikardiales oder midmyokardiales LGE und bei Aktivität ein T2-basiertes Ödemzeichen.',
  },
  {
    id: 'chronic-infarct',
    question: 'Welcher Befund spricht eher für einen chronischen als für einen akuten Infarkt?',
    options: ['Deutlich erhöhtes T2-Signal', 'Mikrovaskuläre Obstruktion', 'Persistierendes LGE mit Wandverdünnung ohne Ödem', 'Intramyokardiale Einblutung'],
    correct: 'C',
    explanation: 'Chronische Narben zeigen persistierendes LGE, häufig Wandverdünnung und kein relevantes T2-Ödem.',
  },
  {
    id: 'mvo',
    question: 'Wie erscheint eine mikrovaskuläre Obstruktion im LGE?',
    options: ['Als dunkler Kern im hellen Infarktareal', 'Als diffuse perikardiale Anreicherung', 'Als homogen helles Blutpool-Signal', 'Als isoliertes subepikardiales LGE'],
    correct: 'A',
    explanation: 'MVO ist eine dunkle Aussparung innerhalb des hell kontrastierenden Infarktareals und prognostisch relevant.',
  },
]

export const MYOCARDIAL_INJURY_QUESTIONS = {
  de: QUESTIONS.map((item, index) => ({
    id: `${TOPIC_ID}-de-${String(index + 1).padStart(2, '0')}`,
    tags: [TOPIC_ID, 'kardio-mrt'],
    fach: 'thorax',
    question: item.question,
    options: item.options.map((text, optionIndex) => ({ id: String.fromCharCode(65 + optionIndex), text })),
    correct: item.correct,
    explanation: item.explanation,
  })),
}

const CARDS = [
  ['LGE-Grundlagen', 'Was zeigt LGE?', 'Eine Vergrößerung des Extrazellulärraums bei Nekrose oder Fibrose.', 'Entscheidend sind Wandschicht und Verteilung.'],
  ['Ischämie', 'Wie sieht ischämisches LGE aus?', 'Es beginnt subendokardial, folgt einem Koronarterritorium und kann bis transmural reichen.', 'Die subendokardiale Beteiligung ist der zentrale Hinweis auf eine ischämische Schädigung.'],
  ['Myokarditis', 'Wie sieht Myokarditis typischerweise aus?', 'Subepikardiales oder midmyokardiales LGE, häufig inferolateral, plus T2-Ödem bei aktiver Entzündung.', 'Das Muster hält sich nicht an ein Koronarterritorium.'],
  ['Takotsubo', 'Was ist für Takotsubo entscheidend?', 'Das Cine-Muster: apikales, midventrikuläres, basales oder fokales Ballooning – typischerweise ohne LGE.', 'Die Wandbewegungsstörung überschreitet meist ein einzelnes Koronarterritorium.'],
  ['Infarktalter', 'Akuter vs. chronischer Infarkt?', 'Akut: T2-Ödem. Chronisch: kein Ödem, persistierende Narbe und häufig Wandverdünnung.', 'T2 hilft, die Aktivität beziehungsweise das Alter der Schädigung einzuordnen.'],
  ['MINOCA', 'Was bedeutet MINOCA?', 'Myokardinfarkt ohne obstruktive KHK – zunächst eine Arbeitsdiagnose.', 'CMR hilft, Infarkt, Myokarditis, Takotsubo und andere Myokardschädigungen zu unterscheiden.'],
  ['Komplikationen', 'Was ist MVO?', 'Eine dunkle Aussparung im hellen Infarkt-LGE als Zeichen fehlender mikrovaskulärer Reperfusion.', 'MVO ist prognostisch relevant; zusätzlich auf intramyokardiale Einblutung und LV-Thrombus achten.'],
  ['Indikation', 'Wann hilft CMR bei Troponinanstieg?', 'Nach Ausschluss einer dringlichen koronaren Ursache, wenn die Ursache der Myokardschädigung unklar bleibt.', 'Bei STEMI oder hämodynamischer Instabilität darf CMR die Akutversorgung nicht verzögern.'],
]

export const MYOCARDIAL_INJURY_FLASHCARDS = CARDS.map((item, index) => ({
  id: `${TOPIC_ID}-${String(index + 1).padStart(2, '0')}`,
  topicId: TOPIC_ID,
  category: L(item[0]),
  front: L(item[1]),
  answer: L(item[2]),
  explanation: L(item[3]),
}))

export const MYOCARDIAL_INJURY_FLASHCARD_TOPIC = {
  id: TOPIC_ID,
  area: 'Thorax',
  chapter: 'Kardiale Bildgebung · Kardio-MRT',
  icon: 'MR',
  iconImage: '/fach/thorax.png',
  color: '#8f204f',
  href: `/flashcards/${TOPIC_ID}`,
  title: L('Kardio-MRT bei Troponinanstieg'),
  subtitle: L('Akutpfad · LGE-Muster · Infarkt · Myokarditis · Takotsubo · MINOCA'),
}
