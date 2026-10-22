const L = (de, en, fa) => ({ de, en, fa })

const makeOptions = (values) => values.map((text, index) => ({
  id: String.fromCharCode(65 + index),
  text,
}))

export const PULMONARY_HYPERTENSION_QUESTIONS = ['de', 'en', 'fa'].flatMap((lang) => {
  const l = (de, en, fa) => L(de, en, fa)[lang]
  return [
    {
      id: `pulmonale-hypertonie-${lang}-haemodynamics`,
      fach: 'thorax',
      tags: ['pulmonale-hypertonie'],
      question: l(
        'Welche Aussage zu Definition und hämodynamischer Einordnung der pulmonalen Hypertonie ist korrekt?',
        'Which statement about the definition and haemodynamic classification of pulmonary hypertension is correct?',
        'کدام عبارت دربارهٔ تعریف و طبقه‌بندی همودینامیک پرفشاری ریوی درست است؟',
      ),
      options: makeOptions([
        l(
          'Ein CT-Zeichen einer vergrößerten Pulmonalarterie definiert eine PAH.',
          'A CT sign of pulmonary-artery enlargement defines PAH.',
          'علامت CT بزرگ‌شدن شریان ریوی، PAH را تعریف می‌کند.',
        ),
        l(
          'Ein mPAP >20 mmHg in Ruhe definiert PH; für präkapilläre PH kommen PAWP ≤15 mmHg und PVR >2 WU hinzu.',
          'An mPAP >20 mmHg at rest defines PH; pre-capillary PH additionally requires PAWP ≤15 mmHg and PVR >2 WU.',
          'mPAP بیش از ۲۰ mmHg در استراحت PH را تعریف می‌کند؛ برای PH پیش‌مویرگی، PAWP ≤15 mmHg و PVR >2 WU نیز لازم‌اند.',
        ),
        l(
          'Ein mPAP >20 mmHg genügt, um eine PH als Gruppe 1 einzuordnen.',
          'An mPAP >20 mmHg is sufficient to classify PH as group 1.',
          'mPAP بیش از ۲۰ mmHg برای طبقه‌بندی PH به‌عنوان گروه ۱ کافی است.',
        ),
        l(
          'Ein normales Thoraxröntgen schließt eine PH aus.',
          'A normal chest radiograph excludes PH.',
          'رادیوگرافی طبیعی قفسهٔ سینه PH را رد می‌کند.',
        ),
      ]),
      correct: 'B',
      explanation: l(
        'Die Definition beruht auf dem invasiv gemessenen mPAP. Die präkapilläre Einordnung benötigt zusätzlich PAWP und PVR; weder Bildzeichen noch mPAP allein weisen Gruppe 1 nach.',
        'The definition uses invasively measured mPAP. Pre-capillary classification also needs PAWP and PVR; neither imaging signs nor mPAP alone establishes group 1.',
        'تعریف بر mPAP اندازه‌گیری‌شده به‌صورت تهاجمی استوار است. طبقه‌بندی پیش‌مویرگی به PAWP و PVR نیز نیاز دارد؛ نه نشانه‌های تصویری و نه mPAP به‌تنهایی گروه ۱ را ثابت نمی‌کنند.',
      ),
      wrongExplanations: {
        A: l(
          'Eine vergrößerte Pulmonalarterie ist ein Bildhinweis und definiert keine PAH.',
          'Pulmonary-artery enlargement is an imaging clue; it does not define PAH.',
          'اتساع شریان ریوی سرنخ تصویری است و PAH را تعریف نمی‌کند.',
        ),
        C: l(
          'Ein mPAP >20 mmHg definiert PH, nicht deren Ursache oder Gruppe.',
          'An mPAP >20 mmHg defines PH, not its cause or group.',
          'mPAP بیش از ۲۰ mmHg وجود PH را تعریف می‌کند، نه علت یا گروه آن را.',
        ),
        D: l(
          'Ein normales Röntgenbild schließt PH nicht aus.',
          'A normal radiograph does not exclude PH.',
          'رادیوگرافی طبیعی PH را رد نمی‌کند.',
        ),
      },
      source: 'Thorax.pdf pp. 46–47; 2022 ESC/ERS Guidelines, haemodynamic definitions.',
    },
    {
      id: `pulmonale-hypertonie-${lang}-ct-signs`,
      fach: 'thorax',
      tags: ['pulmonale-hypertonie'],
      question: l(
        'Im CT sind der Truncus pulmonalis erweitert und das PA/Ao-Verhältnis beträgt 1,05. Welche Schlussfolgerung ist am besten begründet?',
        'CT shows an enlarged main pulmonary artery and a PA/Ao ratio of 1.05. Which conclusion is best supported?',
        'در CT تنهٔ شریان ریوی بزرگ است و نسبت PA/Ao برابر ۱٫۰۵ است. کدام نتیجه بهتر پشتیبانی می‌شود؟',
      ),
      options: makeOptions([
        l(
          'Die Befunde beweisen PH und ordnen sie Gruppe 1 zu.',
          'The findings prove PH and assign it to group 1.',
          'این یافته‌ها PH را ثابت و آن را در گروه ۱ قرار می‌دهند.',
        ),
        l(
          'Die Befunde stützen den Verdacht; hämodynamische Bestätigung und Ursachenklärung benötigen den klinischen Kontext und gegebenenfalls weitere Abklärung.',
          'The findings support suspicion; haemodynamic confirmation and cause assessment require clinical context and, when appropriate, further work-up.',
          'این یافته‌ها ظن را تقویت می‌کنند؛ تأیید همودینامیک و تعیین علت به زمینهٔ بالینی و در صورت لزوم بررسی بیشتر نیاز دارد.',
        ),
        l(
          'Das PA/Ao-Verhältnis spricht spezifisch für eine postkapilläre PH.',
          'The PA/Ao ratio specifically indicates post-capillary PH.',
          'نسبت PA/Ao به‌طور اختصاصی نشان‌دهندهٔ PH پس‌مویرگی است.',
        ),
        l(
          'Ein RV/LV-Verhältnis >1 wäre ein Beweis für CTEPH.',
          'An RV/LV ratio >1 would prove CTEPH.',
          'نسبت RV/LV بیش از ۱، CTEPH را ثابت می‌کند.',
        ),
      ]),
      correct: 'B',
      explanation: l(
        'PA-Vergrößerung und PA/Ao >0,9 sind unterstützende CT-Zeichen, aber keine definitive Diagnose und keine sichere Gruppen- oder Ursachenbestimmung.',
        'Pulmonary-artery enlargement and PA/Ao >0.9 are supportive CT signs, not a definitive diagnosis or reliable assignment of group or cause.',
        'بزرگ‌شدن شریان ریوی و PA/Ao بیش از ۰٫۹ نشانه‌های حمایتی CT هستند، نه تشخیص قطعی یا تعیین مطمئن گروه و علت.',
      ),
      wrongExplanations: {
        A: l(
          'CT-Zeichen allein bestätigen die Hämodynamik nicht und bestimmen keine WHO-Gruppe.',
          'CT signs alone do not confirm haemodynamics or determine a WHO group.',
          'نشانه‌های CT به‌تنهایی همودینامیک را تأیید یا گروه WHO را تعیین نمی‌کنند.',
        ),
        C: l(
          'Das Verhältnis weist nicht spezifisch auf eine prä- oder postkapilläre Ursache hin.',
          'The ratio does not specifically indicate a pre- or post-capillary cause.',
          'این نسبت به‌طور اختصاصی علت پیش‌مویرگی یا پس‌مویرگی را مشخص نمی‌کند.',
        ),
        D: l(
          'RV/LV >1 ist ein Hinweis auf Rechtsherzbelastung; für CTEPH braucht es passende Gefäßzeichen und gezielte Abklärung.',
          'RV/LV >1 suggests right-heart load; CTEPH requires compatible vascular signs and dedicated evaluation.',
          'RV/LV بیش از ۱ سرنخی از بار قلب راست است؛ CTEPH به نشانه‌های عروقی سازگار و ارزیابی اختصاصی نیاز دارد.',
        ),
      },
      source: 'Thorax.pdf pp. 46–47; 2022 ESC/ERS Guidelines, CT signs suggesting PH and CTEPH.',
    },
  ]
})

export const PULMONARY_HYPERTENSION_FLASHCARD_TOPIC = {
  id: 'pulmonale-hypertonie',
  area: 'Thorax',
  chapter: 'Pulmonale Gefäßerkrankungen',
  icon: 'CT',
  color: '#38c8c0',
  href: '/flashcards/pulmonale-hypertonie',
  title: L('Pulmonale Hypertonie', 'Pulmonary hypertension', 'پرفشاری ریوی'),
  subtitle: L('Hämodynamik · CXR · CT-Zeichen', 'Haemodynamics · radiography · CT signs', 'همودینامیک · رادیوگرافی · نشانه‌های CT'),
}

export const PULMONARY_HYPERTENSION_FLASHCARDS = [
  {
    id: 'pulmonale-hypertonie-haemodynamics',
    topicId: 'pulmonale-hypertonie',
    category: L('Hämodynamik', 'Haemodynamics', 'همودینامیک'),
    front: L('Welche Werte definieren PH und präkapilläre PH?', 'Which values define PH and pre-capillary PH?', 'چه مقادیری PH و PH پیش‌مویرگی را تعریف می‌کنند؟'),
    answer: L('PH: mPAP >20 mmHg in Ruhe. Präkapillär zusätzlich PAWP ≤15 mmHg und PVR >2 WU.', 'PH: mPAP >20 mmHg at rest. Pre-capillary PH additionally requires PAWP ≤15 mmHg and PVR >2 WU.', 'PH: ‏mPAP بیش از ۲۰ mmHg در استراحت. در نوع پیش‌مویرگی، PAWP ≤15 mmHg و PVR >2 WU نیز لازم‌اند.'),
    explanation: L('Messung und Klassifikation erfolgen hämodynamisch; Bildgebung allein genügt nicht.', 'Diagnosis and classification are haemodynamic; imaging alone is insufficient.', 'تشخیص و طبقه‌بندی همودینامیک‌اند؛ تصویربرداری به‌تنهایی کافی نیست.'),
    source: '2022 ESC/ERS Guidelines; Kovacs et al., ERS 2024 review.',
  },
  {
    id: 'pulmonale-hypertonie-ct-signs',
    topicId: 'pulmonale-hypertonie',
    category: L('CT-Zeichen', 'CT signs', 'نشانه‌های CT'),
    front: L('Was sagen PA/Ao >0,9 und RV/LV >1 im passenden CT-Kontext aus?', 'What do PA/Ao >0.9 and RV/LV >1 suggest in the appropriate CT context?', 'نسبت PA/Ao بیش از ۰٫۹ و RV/LV بیش از ۱ در زمینهٔ مناسب CT چه چیزی را مطرح می‌کنند؟'),
    answer: L('Sie können eine PH bzw. Rechtsherzbelastung stützen, sind einzeln aber weder diagnostisch noch ursachenspezifisch.', 'They may support PH or right-heart load, but neither is diagnostic alone or cause-specific.', 'این نسبت‌ها ممکن است از PH یا بار قلب راست حمایت کنند، اما به‌تنهایی تشخیصی یا اختصاصی علت نیستند.'),
    explanation: L('Mit Morphologie, weiteren Zeichen, klinischem Kontext und hämodynamischer Abklärung zusammenführen.', 'Integrate them with morphology, other signs, clinical context and haemodynamic assessment.', 'آن‌ها را با مورفولوژی، سایر نشانه‌ها، زمینهٔ بالینی و ارزیابی همودینامیک تلفیق کنید.'),
    source: '2022 ESC/ERS Guidelines, CT signs suggesting PH; Thorax.pdf p.47.',
  },
]

export const PULMONARY_HYPERTENSION_TOPIC_GROUP = {
  fachId: 'thorax',
  kapitelId: 'thorax-gefaesse-pulmonal',
  title: L('Pulmonale Gefäßerkrankungen', 'Pulmonary vascular diseases', 'بیماری‌های عروقی ریه'),
  topics: [{
    id: 'pulmonale-hypertonie',
    title: L('Pulmonale Hypertonie', 'Pulmonary hypertension', 'پرفشاری ریوی'),
  }],
}
