const L = (de, en, fa) => ({ de, en, fa })

export const TECHNIK_CINE_TOPIC_GROUP = {
  fachId: 'technik',
  kapitelId: 'technik-mrt',
  title: L('MRT-Spezialtechniken', 'Special MRI techniques', 'تکنیک‌های ویژهٔ MRI'),
  topics: [{ id: 'mrt-cine', title: L('CINE-MRT', 'Cine MRI', 'MRI سینمایی (CINE)') }],
}

export const TECHNIK_CINE_QUESTIONS = ['de', 'en', 'fa'].map(lang => ({
  id: `mrt-cine-${lang}-motion-flow`,
  fach: 'technik',
  tags: ['mrt-cine'],
  source: 'Technik.pdf, PDF p.117 (printed p.116); Hundley et al. J Cardiovasc Magn Reson. 2022;24:29. doi:10.1186/s12968-021-00827-z',
  question: L('Welche Aussage zu CINE-MRT trifft zu?', 'Which statement about cine MRI is correct?', 'کدام گزاره دربارهٔ CINE-MRI درست است؟')[lang],
  options: [
    L('Zeitlich aufeinander bezogene Bilder können Wand- und Klappenbewegung zeigen; Volumina unterstützen die Bestimmung der Ejektionsfraktion.', 'Time-resolved images can show wall and valve motion; volumes support assessment of ejection fraction.', 'تصاویر دارای توالی زمانی می‌توانند حرکت دیواره و دریچه را نشان دهند؛ حجم‌ها به ارزیابی کسر جهشی کمک می‌کنند.')[lang],
    L('Jede CINE-Bewegungsdarstellung quantifiziert die Flussgeschwindigkeit direkt.', 'Every cine motion sequence directly quantifies flow velocity.', 'هر توالی نمایش حرکت CINE سرعت جریان را مستقیماً کمّی می‌کند.')[lang],
    L('CINE ist eine einzelne statische Aufnahme ohne zeitliche Information.', 'Cine is a single static acquisition without temporal information.', 'CINE یک برداشت ثابت و منفرد بدون اطلاعات زمانی است.')[lang],
    L('CINE und BOLD sind austauschbare Bezeichnungen für dieselbe Kontrastmethode.', 'Cine and BOLD are interchangeable names for the same contrast method.', 'CINE و BOLD نام‌های جایگزین برای یک روش کنتراست یکسان هستند.')[lang],
  ].map((text, index) => ({ id: String.fromCharCode(65 + index), text })),
  correct: 'A',
  explanation: L('CINE bildet zeitliche Bewegungsphasen ab. Quantitative Flussgeschwindigkeit wird mit phasenkontrastbasierten Verfahren gemessen; BOLD ist eine andere MRT-Kontrastmethode.', 'Cine depicts motion across time phases. Quantitative flow velocity is measured with phase-contrast methods; BOLD is a different MRI contrast technique.', 'CINE حرکت را در فازهای زمانی نشان می‌دهد. سرعت جریان کمّی با روش‌های phase-contrast اندازه‌گیری می‌شود؛ BOLD روش کنتراست دیگری در MRI است.')[lang],
  wrongExplanations: {
    B: L('Quantitative Geschwindigkeit wird mit einer dafür vorgesehenen Phasenkontrast-Sequenz bestimmt; nicht jede Cine-Bewegungsfolge misst Fluss.', 'Quantitative velocity is measured with a dedicated phase-contrast sequence; not every cine motion sequence measures flow.', 'سرعت کمّی با توالی اختصاصی phase-contrast اندازه‌گیری می‌شود؛ هر توالی نمایش حرکت CINE جریان را نمی‌سنجد.')[lang],
    C: L('CINE besteht aus zeitlich zugeordneten Bildern, die als Bewegungsfolge betrachtet werden.', 'Cine uses time-resolved images that are viewed as a sequence of motion.', 'CINE از تصاویر دارای توالی زمانی تشکیل می‌شود که به‌صورت توالی حرکت بررسی می‌شوند.')[lang],
    D: L('BOLD beruht auf sauerstoffabhängigen Suszeptibilitätsänderungen mit T2*-Kontrast und ist nicht gleichbedeutend mit CINE.', 'BOLD uses oxygenation-related susceptibility changes with T2* contrast and is not synonymous with cine.', 'BOLD بر تغییرات susceptibility مرتبط با اکسیژن‌رسانی و کنتراست T2* متکی است و مترادف CINE نیست.')[lang],
  },
}))
