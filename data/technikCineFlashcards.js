const L = (de, en, fa) => ({ de, en, fa })

export const TECHNIK_CINE_FLASHCARD_TOPIC = {
  id: 'mrt-cine', area: 'Technik', chapter: 'MRT-Spezialtechniken', icon: 'MRT',
  color: '#397f8d', href: '/flashcards/mrt-cine',
  title: L('CINE-MRT', 'Cine MRI', 'MRI سینمایی (CINE)'),
  subtitle: L('Bewegung · Herzfunktion · Flussmessung', 'Motion · cardiac function · flow measurement', 'حرکت · عملکرد قلب · اندازه‌گیری جریان'),
}

export const TECHNIK_CINE_FLASHCARDS = [
  {
    id: 'mrt-cine-motion', topicId: 'mrt-cine', category: L('CINE-MRT', 'Cine MRI', 'MRI سینمایی (CINE)'),
    front: L('Was macht CINE-Bildgebung sichtbar?', 'What does cine imaging make visible?', 'تصویربرداری CINE چه چیزی را نمایان می‌کند؟'),
    answer: L('Mehrere zeitlich zugeordnete Bilder als Bewegungsfolge, zum Beispiel Herz-Wand- und Klappenbewegung; Volumina unterstützen die Bestimmung der Ejektionsfraktion.', 'A sequence of time-resolved images, such as cardiac wall and valve motion; volumes support assessment of ejection fraction.', 'توالی‌ای از تصاویر دارای فاز زمانی، مانند حرکت دیواره و دریچهٔ قلب؛ حجم‌ها به ارزیابی کسر جهشی کمک می‌کنند.'),
    explanation: L('Die konkrete Untersuchung und Auswertung richten sich nach der klinischen Frage und dem Protokoll.', 'The specific acquisition and analysis depend on the clinical question and protocol.', 'روش تصویربرداری و تحلیل به پرسش بالینی و پروتکل بستگی دارد.'),
  },
  {
    id: 'mrt-cine-flow', topicId: 'mrt-cine', category: L('CINE-MRT', 'Cine MRI', 'MRI سینمایی (CINE)'),
    front: L('Welches Verfahren wird für quantitative Flussgeschwindigkeit in der MRT eingesetzt?', 'Which MRI method is used for quantitative flow velocity?', 'برای اندازه‌گیری کمّی سرعت جریان در MRI از چه روشی استفاده می‌شود؟'),
    answer: L('Phasenkontrastbasierte Verfahren; eine allgemeine CINE-Bewegungsdarstellung ist nicht automatisch eine quantitative Flussmessung.', 'Phase-contrast methods; general cine motion depiction is not automatically a quantitative flow measurement.', 'روش‌های phase-contrast؛ نمایش عمومی حرکت در CINE خودبه‌خود اندازه‌گیری کمّی جریان نیست.'),
    explanation: L('CINE zeigt zeitliche Bewegung; quantitative Flussparameter werden mit dafür vorgesehenen Sequenzen erfasst.', 'Cine shows motion over time; quantitative flow parameters are acquired with dedicated sequences.', 'CINE حرکت را در طول زمان نشان می‌دهد؛ پارامترهای کمّی جریان با توالی‌های اختصاصی ثبت می‌شوند.'),
  },
]
