const L = (de, en, fa) => ({ de, en, fa })

export const MESENTERIC_ISCHAEMIA_FLASHCARD_TOPIC = {
  id: 'mesenteriale-ischaemie',
  area: 'Abdomen',
  chapter: 'Gastrointestinaltrakt',
  icon: 'CT',
  iconImage: '/fach/abdomen.png',
  color: '#0e7490',
  href: '/flashcards/mesenteriale-ischaemie',
  title: L('Mesenteriale Ischämie', 'Mesenteric ischaemia', 'ایسکمی مزانتریک'),
  subtitle: L('CTA-Protokoll · arterielle und venöse Phase', 'CTA protocol · arterial and venous phases', 'پروتکل CTA · فازهای شریانی و وریدی'),
}

export const MESENTERIC_ISCHAEMIA_FLASHCARDS = [
  {
    id: 'mesenteriale-ischaemie-cta-protocol',
    topicId: 'mesenteriale-ischaemie',
    category: L('CTA-Protokoll', 'CTA protocol', 'پروتکل CTA'),
    front: L('Welche Phasen umfasst die dringliche CTA bei Verdacht auf akute mesenteriale Ischämie?', 'Which phases are included in urgent CTA for suspected acute mesenteric ischaemia?', 'در CTA فوری برای شک به ایسکمی حاد مزانتریک، کدام فازها انجام می‌شوند؟'),
    answer: L('Arterielle und venöse Phase mit dünnen Schichten (≤ 1 mm); eine native Phase kann ergänzt werden. Die Empfehlung gilt unabhängig von der Nierenfunktion.', 'Arterial and venous phases with thin sections (≤ 1 mm); a non-contrast phase may be added. The recommendation applies regardless of renal function.', 'فازهای شریانی و وریدی با برش‌های نازک (≤ ۱ میلی‌متر)؛ می‌توان فاز بدون تزریق را افزود. این توصیه مستقل از عملکرد کلیه است.'),
    explanation: L('ESVS 2025, Empfehlung 33. Die Phasen erfassen arterielle Zufuhr und venösen Abfluss; die native Phase ergänzt sie, ersetzt sie aber nicht.', 'ESVS 2025, Recommendation 33. The phases assess arterial inflow and venous outflow; an unenhanced phase supplements but does not replace them.', 'راهنمای ESVS 2025، توصیهٔ ۳۳. این فازها ورود شریانی و تخلیهٔ وریدی را ارزیابی می‌کنند؛ فاز بدون تزریق مکمل آن‌هاست و جایگزینشان نمی‌شود.'),
    source: 'ESVS 2025 Clinical Practice Guidelines, Recommendation 33; DOI 10.1016/j.ejvs.2025.06.010',
  },
]
