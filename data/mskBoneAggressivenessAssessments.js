const L = (de, en, fa) => ({ de, en, fa })
const languages = ['de', 'en', 'fa']

const question = {
  id: 'riesenzelltumor-lodwick-source-example-01',
  tags: ['riesenzelltumor'],
  fach: 'msk',
  question: L(
    'Welchen Tumor nennt MSK.pdf als Beispiel für ein geographisches Lodwick-Muster Typ Ib (scharfer Rand ohne Sklerosesaum)?',
    'Which tumour does MSK.pdf list as an example of geographic Lodwick Type Ib (sharp margin without a sclerotic rim)?',
    'MSK.pdf کدام تومور را به‌عنوان نمونهٔ الگوی جغرافیایی لودویک نوع Ib (حاشیهٔ واضح بدون حاشیهٔ اسکلروتیک) نام می‌برد؟',
  ),
  options: [
    L('Riesenzelltumor', 'Giant cell tumour', 'تومور سلول غول‌آسا'),
    L('Enchondrom', 'Enchondroma', 'انکندروم'),
    L('Niedriggradiges Chondrosarkom', 'Low-grade chondrosarcoma', 'کندروسارکوم کم‌درجه'),
    L('Osteosarkom', 'Osteosarcoma', 'استئوسارکوم'),
  ],
  correct: 'A',
  explanation: L(
    'MSK.pdf nennt den Riesenzelltumor als Beispiel und bezeichnet Typ Ib in seiner vereinfachten Tabelle als wenig aggressiv. Diese verkürzte Quellenangabe erlaubt keine individuelle Risikoeinstufung oder Diagnose aus dem Rand allein.',
    'MSK.pdf lists giant cell tumour as an example and labels Type Ib low aggressiveness in its simplified table. This abbreviated source statement does not support individual risk classification or diagnosis from the margin alone.',
    'MSK.pdf تومور سلول غول‌آسا را نمونه می‌داند و نوع Ib را در جدول ساده‌شدهٔ خود کم‌تهاجمی می‌خواند. این عبارت کوتاه منبع برای ارزیابی خطر فردی یا تشخیص فقط بر پایهٔ حاشیه کافی نیست.',
  ),
}

export const MSK_BONE_AGGRESSIVENESS_QUESTIONS = Object.fromEntries(languages.map(lang => [lang, [{
  id: `${question.id}-${lang}`,
  tags: question.tags,
  fach: question.fach,
  question: question.question[lang],
  options: question.options.map((option, index) => ({ id: String.fromCharCode(65 + index), text: option[lang] })),
  correct: question.correct,
  explanation: question.explanation[lang],
}]]))

export const MSK_BONE_AGGRESSIVENESS_TOPIC_GROUP = {
  fachId: 'msk',
  kapitelId: 'msk-knochentumoren',
  title: L('Knochentumoren', 'Bone tumours', 'تومورهای استخوان'),
  topics: [{ id: 'riesenzelltumor', title: L('Riesenzelltumor · Quellenbeispiel', 'Giant cell tumour · source example', 'تومور سلول غول‌آسا · نمونهٔ منبع') }],
}

export const MSK_BONE_AGGRESSIVENESS_FLASHCARD_TOPIC = {
  id: 'riesenzelltumor',
  area: 'MSK',
  chapter: L('Begrenztes Lodwick-Beispiel', 'Bounded Lodwick example', 'نمونهٔ محدود لودویک'),
  icon: 'MR',
  color: '#286451',
  href: '/flashcards/riesenzelltumor',
  title: L('Riesenzelltumor · Quellenbeispiel', 'Giant cell tumour · source example', 'تومور سلول غول‌آسا · نمونهٔ منبع'),
}

export const MSK_BONE_AGGRESSIVENESS_FLASHCARDS = [{
  id: 'riesenzelltumor-lodwick-source-example',
  topicId: 'riesenzelltumor',
  category: L('Begrenztes Quellenbeispiel', 'Bounded source example', 'نمونهٔ محدود منبع'),
  front: L('Welches Beispiel nennt MSK.pdf für Lodwick Typ Ib?', 'Which example does MSK.pdf give for Lodwick Type Ib?', 'MSK.pdf چه موردی را برای نوع Ib لودویک مثال می‌زند؟'),
  answer: L(
    'Riesenzelltumor (GCT): scharfe Grenze ohne Sklerosesaum. Das PDF nennt dies in seiner vereinfachten Tabelle ein wenig aggressives Muster; daraus folgt keine individuelle Risikoeinstufung.',
    'Giant cell tumour (GCT): a sharp margin without a sclerotic rim. The PDF calls this a low-aggressiveness pattern in its simplified table; that does not provide an individual risk classification.',
    'تومور سلول غول‌آسا (GCT): حاشیهٔ واضح بدون حاشیهٔ اسکلروتیک. PDF در جدول ساده‌شدهٔ خود آن را کم‌تهاجمی می‌خواند؛ از این عبارت ارزیابی خطر فردی نتیجه نمی‌شود.',
  ),
  explanation: L(
    'Das Quellenbeispiel erlaubt keine Diagnose und stellt keine vollständige GCT-Lektion dar.',
    'The source example does not establish a diagnosis or provide a full GCT lesson.',
    'نمونهٔ منبع تشخیص را ثابت نمی‌کند و درس جامع GCT هم نیست.',
  ),
  source: 'MSK.pdf p. 76 (printed p. 75)',
}]
