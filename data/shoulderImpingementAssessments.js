const L = (de, en, fa) => ({ de, en, fa })

const seeds = [
  {
    id: 'measurement-limit',
    question: L('Welche Schlussfolgerung ist bei einem verminderten Coracohumeralintervall am besten begründet?', 'Which conclusion is best supported by a reduced coracohumeral interval?', 'کدام نتیجه‌گیری دربارهٔ کاهش فاصلهٔ کوراکوهومرال مستندتر است؟'),
    options: [
      L('Der Messwert beweist allein ein symptomatisches subkorakoidales Impingement.', 'The measurement alone proves symptomatic subcoracoid impingement.', 'این اندازه‌گیری به‌تنهایی ایمپینجمنت علامت‌دار زیرکوراکوئید را ثابت می‌کند.'),
      L('Der Messwert kann die Beurteilung stützen, muss aber mit direkten Weichteilbefunden und Kontext eingeordnet werden.', 'The measurement may support the assessment but must be interpreted with direct soft-tissue findings and context.', 'این اندازه‌گیری می‌تواند به ارزیابی کمک کند، اما باید همراه یافته‌های مستقیم بافت نرم و زمینهٔ بالینی تفسیر شود.'),
      L('Der Messwert beweist eine Subscapularisruptur.', 'The measurement proves a subscapularis tear.', 'این اندازه‌گیری پارگی ساب‌اسکاپولاریس را ثابت می‌کند.'),
      L('Der Messwert unterscheidet zuverlässig symptomatische von asymptomatischen Schultern.', 'The measurement reliably distinguishes symptomatic from asymptomatic shoulders.', 'این اندازه‌گیری شانهٔ علامت‌دار را با اطمینان از شانهٔ بدون علامت افتراق می‌دهد.'),
    ],
    correct: 1,
    explanation: L('Ein einzelner Abstandswert hat begrenzte diagnostische Aussagekraft. Er sollte zusammen mit direkter Sehnen-/Bursamorphologie, Positionierung und klinischem Kontext beurteilt werden.', 'A single interval measurement has limited diagnostic value. Assess it with direct tendon/bursal morphology, positioning and clinical context.', 'ارزش تشخیصی یک اندازه‌گیری منفرد محدود است. آن را همراه مورفولوژی مستقیم تاندون یا بورس، وضعیت تصویربرداری و زمینهٔ بالینی ارزیابی کنید.'),
  },
  {
    id: 'bigliani-limit',
    question: L('Was lässt sich aus einem Bigliani-Typ III allein ableiten?', 'What can be inferred from a Bigliani type III alone?', 'از Bigliani نوع III به‌تنهایی چه نتیجه‌ای می‌توان گرفت؟'),
    options: [
      L('Eine symptomatische Sehnenruptur ist bewiesen.', 'A symptomatic tendon tear is proven.', 'پارگی علامت‌دار تاندون ثابت شده است.'),
      L('Die Akromionform ist hakenförmig; daraus allein folgen weder Schmerzursache noch individuelle Sehnenläsion.', 'The acromion is hooked; this alone establishes neither the cause of pain nor an individual tendon lesion.', 'شکل آکرومیون قلابی است؛ این یافته به‌تنهایی نه علت درد و نه ضایعهٔ تاندونی فرد را ثابت می‌کند.'),
      L('Ein subkorakoidales Impingement ist diagnostiziert.', 'Subcoracoid impingement is diagnosed.', 'ایمپینجمنت زیرکوراکوئید تشخیص داده شده است.'),
      L('Eine Os-acromiale-Variante ist ausgeschlossen.', 'An os acromiale variant is excluded.', 'وجود واریانت Os acromiale رد می‌شود.'),
    ],
    correct: 1,
    explanation: L('Bigliani III beschreibt eine hakenförmige Akromionkontur. Die Klassifikation zeigt begrenzte Übereinstimmung zwischen Beurteilenden und beweist keine individuelle Symptomursache oder Sehnenläsion.', 'Bigliani type III describes a hooked acromial contour. Interobserver agreement is limited, and the classification does not prove an individual cause of symptoms or a tendon lesion.', 'Bigliani نوع III شکل قلابی آکرومیون را توصیف می‌کند. توافق بین ارزیابان محدود است و این طبقه‌بندی علت علائم یا ضایعهٔ تاندونی فرد را ثابت نمی‌کند.'),
  },
]

export const SHOULDER_IMPINGEMENT_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang,
  seeds.map(seed => ({
    id: `shoulder-impingement-${seed.id}-${lang}`,
    question: seed.question[lang],
    options: seed.options.map((option, index) => ({ id: ['A', 'B', 'C', 'D'][index], text: option[lang] })),
    correct: ['A', 'B', 'C', 'D'][seed.correct],
    explanation: seed.explanation[lang],
    tags: ['impingement-kalkschulter'],
    fach: 'msk',
  })),
]))

export const SHOULDER_IMPINGEMENT_FLASHCARDS = [
  { id: 'shoulder-impingement-coracohumeral-interval', topicId: 'impingement-kalkschulter', category: L('Diagnostische Grenzen', 'Diagnostic limits', 'محدودیت‌های تشخیصی'), front: L('Wie ist ein vermindertes Coracohumeralintervall einzuordnen?', 'How should a reduced coracohumeral interval be interpreted?', 'کاهش فاصلهٔ کوراکوهومرال چگونه باید تفسیر شود؟'), answer: L('Als unterstützender Befund; allein beweist es kein Impingement und keine Sehnenruptur.', 'As a supportive finding; alone it proves neither impingement nor a tendon tear.', 'به‌عنوان یافته‌ای حمایتی؛ به‌تنهایی ایمپینجمنت یا پارگی تاندون را ثابت نمی‌کند.'), explanation: L('Direkte Weichteilbefunde, Positionierung und klinischer Kontext mitbeurteilen.', 'Assess direct soft-tissue findings, positioning and clinical context as well.', 'یافته‌های مستقیم بافت نرم، وضعیت تصویربرداری و زمینهٔ بالینی را نیز ارزیابی کنید.') },
  { id: 'shoulder-impingement-bigliani', topicId: 'impingement-kalkschulter', category: L('Morphologie', 'Morphology', 'مورفولوژی'), front: L('Was beschreibt Bigliani Typ III?', 'What does Bigliani type III describe?', 'Bigliani نوع III چه چیزی را توصیف می‌کند؟'), answer: L('Eine hakenförmige Akromionkontur; keine individuelle Schmerzursache oder Sehnenläsion.', 'A hooked acromial contour; not an individual cause of pain or a tendon lesion.', 'شکل قلابی آکرومیون؛ نه علت درد فرد و نه ضایعهٔ تاندونی را به‌تنهایی مشخص نمی‌کند.'), explanation: L('Die Einteilung beschreibt eine morphologische Assoziation mit begrenzter Beurteilerübereinstimmung.', 'The classification describes a morphologic association with limited interobserver agreement.', 'این طبقه‌بندی یک ارتباط مورفولوژیک را توصیف می‌کند و توافق ارزیابان دربارهٔ آن محدود است.') },
]

export const SHOULDER_IMPINGEMENT_FLASHCARD_TOPIC = {
  id: 'impingement-kalkschulter', title: L('Schulter-Impingement', 'Shoulder impingement', 'ایمپینجمنت شانه'),
  subtitle: L('Muster · Morphologie · diagnostische Grenzen', 'Patterns · morphology · diagnostic limits', 'الگوها · مورفولوژی · محدودیت تشخیصی'),
  area: 'MSK', chapter: L('Schulter', 'Shoulder', 'شانه'), icon: 'MRI', iconImage: '/fach/msk.png',
  color: '#d48b58', href: '/flashcards/impingement-kalkschulter',
}
