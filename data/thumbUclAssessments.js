const L = (de, en, fa) => ({ de, en, fa })
const Q = (id, q, options, correct, explanation) => ({
  id: `thumb-ucl-${id}`,
  question: q,
  options: options.map((text, index) => ({ id: ['A', 'B', 'C', 'D'][index], text })),
  correct: ['A', 'B', 'C', 'D'][correct],
  explanation,
  tags: ['bandverletzungen-daumen'],
  fach: 'msk',
})

const items = [
  {
    id: 'stener',
    q: L('Welche Beziehung definiert eine Stener-Läsion?', 'Which relationship defines a Stener lesion?', 'کدام رابطه ضایعهٔ استنر را تعریف می‌کند؟'),
    options: [L('Die Aponeurose liegt zwischen retrahiertem UCL-Stumpf und Ansatz.', 'The aponeurosis lies between the retracted UCL stump and its insertion.', 'آپونوروز بین انتهای رتراکتهٔ UCL و محل اتصال آن قرار می‌گیرد.'), L('Das intakte UCL liegt tief zur Aponeurose.', 'The intact UCL lies deep to the aponeurosis.', 'UCL سالم در عمق آپونوروز قرار دارد.'), L('Ein Ausrissfragment entspringt radial an der Grundphalanx.', 'An avulsion fragment arises from the radial proximal phalanx.', 'قطعهٔ کنده‌شده از سمت رادیال فالانژ پروگزیمال منشأ می‌گیرد.'), L('Die Aponeurose liegt oberflächlich zum unverletzten UCL.', 'The aponeurosis lies superficial to the intact UCL.', 'آپونوروز سطحی‌تر از UCL سالم قرار می‌گیرد.')],
    correct: 0,
    explanation: L('Bei der Stener-Läsion liegt die Adduktorenaponeurose zwischen dem retrahierten Bandstumpf und seinem Ansatz. Beurteile die Beziehung in den verfügbaren Ebenen.', 'In a Stener lesion, the adductor aponeurosis lies between the retracted ligament stump and its insertion. Assess the relationship across the available planes.', 'در ضایعهٔ استنر، آپونوروز اداکتور بین انتهای رتراکتهٔ رباط و محل اتصال آن قرار می‌گیرد. این رابطه را در نماهای موجود بررسی کنید.'),
  },
  {
    id: 'radiograph-avulsion',
    q: L('Wo suchst du im Röntgenbild nach einem knöchernen UCL-Ausriss?', 'Where do you look for an osseous UCL avulsion on radiographs?', 'در رادیوگرافی برای کنده‌شدگی استخوانی UCL کجا را بررسی می‌کنید؟'),
    options: [L('An der ulnaren Basis der Grundphalanx des Daumens.', 'At the ulnar base of the thumb proximal phalanx.', 'در قاعدهٔ اولنار فالانژ پروگزیمال شست.'), L('Am radialen Ende des distalen Radius.', 'At the radial end of the distal radius.', 'در انتهای رادیال دیستال رادیوس.'), L('Am Köpfchen des fünften Mittelhandknochens.', 'At the head of the fifth metacarpal.', 'در سر متاکارپ پنجم.'), L('Am Os scaphoideum.', 'At the scaphoid.', 'در استخوان اسکافوئید.')],
    correct: 0,
    explanation: L('Ein knöchernes UCL-Ausrissfragment kann an der ulnaren Basis der Daumengrundphalanx liegen. Unauffällige Knochenkonturen schließen eine reine Bandverletzung nicht aus.', 'An osseous UCL avulsion may arise from the ulnar base of the thumb proximal phalanx. Normal bone contours do not exclude an isolated ligament injury.', 'قطعهٔ کنده‌شدهٔ استخوانی UCL ممکن است از قاعدهٔ اولنار فالانژ پروگزیمال شست جدا شود. طبیعی‌بودن حاشیهٔ استخوان‌ها آسیب منفرد رباط را رد نمی‌کند.'),
  },
]

export const THUMB_UCL_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang,
  items.map(item => Q(item.id, item.q[lang], item.options.map(option => option[lang]), item.correct, item.explanation[lang])),
]))

export const THUMB_UCL_FLASHCARDS = [
  { id: 'thumb-ucl-fc-stener', topicId: 'bandverletzungen-daumen', category: L('MRT-Morphologie', 'MRI morphology', 'مورفولوژی MRI'), front: L('Was kennzeichnet die Beziehung bei einer Stener-Läsion?', 'What relationship defines a Stener lesion?', 'چه رابطه‌ای ضایعهٔ استنر را مشخص می‌کند؟'), answer: L('Die Adduktorenaponeurose liegt zwischen retrahiertem UCL-Stumpf und Ansatz.', 'The adductor aponeurosis lies between the retracted UCL stump and its insertion.', 'آپونوروز اداکتور بین انتهای رتراکتهٔ UCL و محل اتصال قرار می‌گیرد.'), explanation: L('Diese Interposition ist das entscheidende morphologische Merkmal.', 'This interposition is the defining morphological feature.', 'این قرارگیری بینابینی ویژگی مورفولوژیک تعیین‌کننده است.') },
  { id: 'thumb-ucl-fc-avulsion', topicId: 'bandverletzungen-daumen', category: L('Röntgen', 'Radiography', 'رادیوگرافی'), front: L('Wo liegt der typische knöcherne UCL-Ausriss?', 'Where is a typical osseous UCL avulsion located?', 'کنده‌شدگی استخوانی تیپیک UCL کجا قرار دارد؟'), answer: L('An der ulnaren Basis der Daumengrundphalanx.', 'At the ulnar base of the thumb proximal phalanx.', 'در قاعدهٔ اولنار فالانژ پروگزیمال شست.'), explanation: L('Ein unauffälliges Röntgenbild schließt eine reine Bandruptur nicht aus.', 'Normal radiographs do not exclude an isolated ligament tear.', 'رادیوگرافی طبیعی پارگی منفرد رباط را رد نمی‌کند.') },
]

export const THUMB_UCL_FLASHCARD_TOPIC = {
  id: 'bandverletzungen-daumen', title: L('UCL-Verletzung am Daumen', 'Thumb UCL injury', 'آسیب UCL شست'),
  subtitle: L('Stener-Läsion · Avulsion', 'Stener lesion · avulsion', 'ضایعهٔ استنر · کنده‌شدگی'), area: 'MSK',
  chapter: L('Hand & Handgelenk', 'Hand & wrist', 'دست و مچ'), icon: '🦴', iconImage: '/fach/msk.png',
  color: '#65c9be', href: '/flashcards/bandverletzungen-daumen',
}
