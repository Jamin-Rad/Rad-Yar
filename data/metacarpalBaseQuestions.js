const L = (de, en, fa) => ({ de, en, fa })

const question = {
  id: 'metacarpal-base-pattern-01',
  tags: ['metakarpale-frakturen'],
  fach: 'msk',
  question: L(
    'Welche Konstellation passt am besten zu einer Rolando-Fraktur?',
    'Which pattern best fits a Rolando fracture?',
    'کدام الگو بیشترین تطابق را با شکستگی رولاندو دارد؟'
  ),
  options: [
    L('Intraartikuläre Schrägfraktur mit zwei Hauptfragmenten', 'Intra-articular oblique fracture with two main fragments', 'شکستگی مایل داخل‌مفصلی با دو قطعهٔ اصلی'),
    L('Intraartikuläre Mehrfragmentfraktur, oft T- oder Y-förmig', 'Intra-articular comminuted fracture, often T- or Y-shaped', 'شکستگی چندقطعه‌ای داخل‌مفصلی، اغلب T یا Y شکل'),
    L('Einfache basisnahe Fraktur ohne Gelenkbeteiligung', 'Simple fracture near the base without joint involvement', 'شکستگی ساده نزدیک قاعده، بدون درگیری مفصل'),
    L('Extraartikuläre Fraktur am Collum metacarpale V', 'Extra-articular fracture at the neck of metacarpal V', 'شکستگی خارج‌مفصلی در گردن متاکارپ پنجم'),
  ],
  correct: 'B',
  explanation: L(
    'Rolando bezeichnet die intraartikuläre Mehrfragmentfraktur an der Basis von Metakarpale I, laut PDF mit drei Hauptfragmenten und häufig T- oder Y-förmiger Grundkonfiguration. Zwei Fragmente sprechen für Bennett; eine einfache extraartikuläre Fraktur nahe der Basis für Winterstein.',
    'Rolando describes an intra-articular comminuted fracture at the base of metacarpal I, with three main fragments and often a T- or Y-shaped basic configuration in the PDF. Two fragments suggest Bennett; a simple extra-articular fracture near the base suggests Winterstein.',
    'رولاندو به شکستگی چندقطعه‌ای داخل‌مفصلی در قاعدهٔ متاکارپ اول گفته می‌شود؛ PDF سه قطعهٔ اصلی و اغلب آرایش پایهٔ T یا Y شکل را توصیف می‌کند. دو قطعه به نفع بنت است؛ شکستگی سادهٔ خارج‌مفصلی نزدیک قاعده با وینترشتاین تطبیق دارد.'
  ),
}

export const METACARPAL_BASE_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang, [{
  id: question.id.replace('-01', `-${lang}-01`),
  tags: question.tags,
  fach: question.fach,
  question: question.question[lang],
  options: question.options.map((text, index) => ({ id: ['A', 'B', 'C', 'D'][index], text: text[lang] })),
  correct: question.correct,
  explanation: question.explanation[lang],
}]]))
