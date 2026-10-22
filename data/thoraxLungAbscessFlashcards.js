const L = (de, en, fa) => ({ de, en, fa })

export const THORAX_LUNG_ABSCESS_FLASHCARD_TOPIC = {
  id: 'lungenabszess',
  area: 'Thorax',
  chapter: 'Pulmonale Kavitäten',
  icon: 'CT',
  iconImage: '/fach/thorax.png',
  color: '#70bdc8',
  href: '/flashcards/lungenabszess',
  title: L('Lungenabszess', 'Lung abscess', 'آبسهٔ ریه'),
  subtitle: L('Abszess und Empyem abgrenzen', 'Distinguishing abscess and empyema', 'افتراق آبسه و آمپیم'),
}

export const THORAX_LUNG_ABSCESS_FLASHCARDS = [{
  id: 'lungenabszess-empyem-differential',
  topicId: 'lungenabszess',
  category: L('Differenzialdiagnose', 'Differential diagnosis', 'تشخیص افتراقی'),
  front: L('Was hilft bei der Abgrenzung von Lungenabszess und Pleuraempyem?', 'What helps distinguish lung abscess from pleural empyema?', 'چه چیزی به افتراق آبسهٔ ریه از آمپیم پلور کمک می‌کند؟'),
  answer: L('Lokalisation im Lungenparenchym oder Pleuraspalt und Morphologie gemeinsam beurteilen. Ein Luft-Flüssigkeitsspiegel allein ist nicht spezifisch.', 'Assess whether the process is in lung parenchyma or the pleural space and consider morphology. An air-fluid level alone is not specific.', 'محل فرایند در پارانشیم ریه یا فضای پلور را همراه با مورفولوژی ارزیابی کنید. سطح هواـمایع به‌تنهایی اختصاصی نیست.'),
  explanation: L('Der Kontext und die Beziehung zur Pleura sind entscheidend; Bildgebung kann in Einzelfällen überlappen.', 'Context and the relationship to the pleura matter; imaging may overlap in individual cases.', 'زمینه و ارتباط با پلور اهمیت دارند؛ یافته‌های تصویربرداری در برخی موارد هم‌پوشانی دارند.'),
  source: 'Thorax.pdf p. 26; Williford & Godwin, Radiol Clin North Am. 1983;21(3):575–583. PMID 6635173',
}]
