const L = (de, en, fa) => ({ de, en, fa })

export const TECHNIK_ENTRANCE_KERMA_TOPIC_GROUP = {
  fachId: 'technik',
  kapitelId: 'technik-roentgen',
  title: L('Dosisgrößen und Dosimetrie', 'Dose quantities and dosimetry', 'کمیت‌های دوز و دوزیمتری'),
  topics: [{ id: 'dosisgroessen-dosimetrie', title: L('Dosisgrößen & Dosimetrie', 'Dose quantities & dosimetry', 'کمیت‌های دوز و دوزیمتری') }],
}

export const TECHNIK_ENTRANCE_KERMA_QUESTIONS = ['de', 'en', 'fa'].map(lang => ({
  id: `entrance-kerma-${lang}-backscatter`,
  fach: 'technik',
  tags: ['dosisgroessen-dosimetrie'],
  source: 'Technik.pdf, PDF p.7 / printed p.6; IAEA TRS 457 (2007), §§8.4.3.3–8.4.3.4',
  question: L('Welche Aussage zu Kᵢ und Kₑ trifft zu?', 'Which statement about Kᵢ and Kₑ is correct?', 'کدام گزاره دربارهٔ Kᵢ و Kₑ درست است؟')[lang],
  options: [
    L('Kᵢ schließt die Rückstreuung des Patienten aus; Kₑ berücksichtigt sie.', 'Kᵢ excludes patient backscatter; Kₑ includes it.', 'Kᵢ پس‌پراکندگی بیمار را شامل نمی‌شود؛ Kₑ آن را در نظر می‌گیرد.')[lang],
    L('DFP/KAP ist unabhängig von Geometrie und Rückstreuung direkt die individuelle Hautdosis.', 'DFP/KAP is the individual skin dose directly, regardless of geometry and backscatter.', 'DFP/KAP مستقل از هندسه و پس‌پراکندگی، مستقیماً دوز پوست فرد است.')[lang],
    L('Kₑ ist stets kleiner als Kᵢ, weil Rückstreuung den Wert vermindert.', 'Kₑ is always lower than Kᵢ because backscatter reduces the value.', 'Kₑ همیشه از Kᵢ کمتر است، چون پس‌پراکندگی مقدار را کاهش می‌دهد.')[lang],
    L('Entrance-surface air kerma ist gleichbedeutend mit der absorbierten Organdosis.', 'Entrance-surface air kerma is synonymous with absorbed organ dose.', 'کرمای هوای سطح ورودی همان دوز جذب‌شدهٔ اندام است.')[lang],
  ].map((text, index) => ({ id: String.fromCharCode(65 + index), text })),
  correct: 'A',
  explanation: L('Kᵢ bezeichnet die Kerma in Luft am Eintrittspunkt ohne Patientenrückstreuung. Kₑ berücksichtigt die Rückstreuung; IAEA beschreibt sowohl eine direkte Erfassung mit TLD als auch eine indirekte Abschätzung mit Rückstreufaktor. DFP/KAP allein liefert keine individuelle Haut- oder Organdosis.', 'Kᵢ is air kerma at the entry point without patient backscatter. Kₑ includes backscatter; IAEA describes direct assessment with TLDs and indirect estimation using a backscatter factor. DFP/KAP alone does not give an individual skin or organ dose.', 'Kᵢ کرمای هوا در نقطهٔ ورود و بدون پس‌پراکندگی بیمار است. Kₑ پس‌پراکندگی را دربر می‌گیرد؛ IAEA سنجش مستقیم با TLD و برآورد غیرمستقیم با ضریب پس‌پراکندگی را شرح می‌دهد. DFP/KAP به‌تنهایی دوز پوست یا اندام فرد را نمی‌دهد.')[lang],
  wrongExplanations: {
    B: L('KAP/DFP مقدار کرما در سطح میدان را انتگرال می‌گیرد؛ برای برآورد سطح ورود به هندسه و backscatter هم نیاز است.', 'KAP/DFP integrates air kerma over beam area; an entrance-surface estimate also needs geometry and backscatter.', 'KAP/DFP کرما را روی سطح میدان انتگرال می‌گیرد؛ برآورد سطح ورود به هندسه و پس‌پراکندگی نیز نیاز دارد.')[lang],
    C: L('با افزودن سهم پس‌پراکندگی، Kₑ معمولاً از Kᵢ بیشتر می‌شود.', 'Including backscatter generally makes Kₑ higher than Kᵢ.', 'با افزودن سهم پس‌پراکندگی، Kₑ معمولاً از Kᵢ بیشتر می‌شود.')[lang],
    D: L('این کمیت به سطح ورود مربوط است و نباید با دوز جذب‌شدهٔ اندام یکی گرفته شود.', 'This quantity refers to the entrance surface and should not be equated with absorbed organ dose.', 'این کمیت مربوط به سطح ورود است و نباید با دوز جذب‌شدهٔ اندام یکی گرفته شود.')[lang],
  },
}))

export const TECHNIK_ENTRANCE_KERMA_FLASHCARD_TOPIC = {
  id: 'dosisgroessen-dosimetrie', area: 'Technik', chapter: 'Dosimetrie', icon: 'Physics', color: '#0891b2', href: '/flashcards/dosisgroessen-dosimetrie',
  title: L('Dosisgrößen & Dosimetrie', 'Dose quantities & dosimetry', 'کمیت‌های دوز و دوزیمتری'),
  subtitle: L('Kᵢ · Kₑ · Rückstreuung · DFP/KAP', 'Kᵢ · Kₑ · backscatter · DFP/KAP', 'Kᵢ · Kₑ · پس‌پراکندگی · DFP/KAP'),
}

export const TECHNIK_ENTRANCE_KERMA_FLASHCARDS = [{
  id: 'dosisgroessen-dosimetrie-entrance-kerma', topicId: 'dosisgroessen-dosimetrie', category: 'Projection imaging',
  front: L('Wie unterscheiden sich incident air kerma Kᵢ und entrance-surface air kerma Kₑ?', 'How do incident air kerma Kᵢ and entrance-surface air kerma Kₑ differ?', 'کرمای فرودی هوا Kᵢ و کرمای هوای سطح ورودی Kₑ چه تفاوتی دارند؟'),
  answer: L('Kᵢ schließt Patientenrückstreuung aus; Kₑ berücksichtigt sie und ist deshalb im Allgemeinen höher. Kₑ lässt sich direkt mit geeignetem TLD erfassen oder mit Rückstreufaktor abschätzen. DFP/KAP allein ist keine individuelle Hautdosis.', 'Kᵢ excludes patient backscatter; Kₑ includes it and is generally higher. Kₑ can be assessed directly with a suitable TLD or estimated using a backscatter factor. DFP/KAP alone is not an individual skin dose.', 'Kᵢ پس‌پراکندگی بیمار را شامل نمی‌شود؛ Kₑ آن را دربر می‌گیرد و معمولاً بیشتر است. Kₑ را می‌توان با TLD مناسب مستقیم سنجید یا با ضریب پس‌پراکندگی برآورد کرد. DFP/KAP به‌تنهایی دوز پوست فرد نیست.'),
  explanation: L('IAEA TRS 457 §8.4.3.4 unterscheidet direkte TLD-Messung und indirekte Abschätzung aus incident air kerma mit Rückstreufaktor. Die Methode der Schätzung braucht passende Angaben zu Strahlqualität und Feld.', 'IAEA TRS 457 §8.4.3.4 distinguishes direct TLD measurement from indirect estimation using incident air kerma and a backscatter factor. The estimate needs suitable beam-quality and field information.', 'بخش 8.4.3.4 از IAEA TRS 457 سنجش مستقیم با TLD را از برآورد غیرمستقیم با کرمای فرودی و ضریب پس‌پراکندگی جدا می‌کند. برآورد به اطلاعات مناسب دربارهٔ کیفیت پرتو و میدان نیاز دارد.'),
  source: 'Technik.pdf, PDF p.7 / printed p.6; IAEA TRS 457 (2007), §8.4.3.4',
}]
